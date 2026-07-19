import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body

    if(!content?.trim()){
        throw new ApiError(400, "Tweet content is required")
    }

    const tweet = await Tweet.create({
        content,    // content: content
        owner: req.user._id
    })

    if(!tweet){
        throw new ApiError(500,"Failed to create tweet")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            tweet,
            "Tweet created successfully"
        )
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const { userId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400,"Invalid user ID")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(404, "user not found")
    }

    const tweets = await Tweet.find({
        owner: userId
    }). populate("owner", "username fullName avatar")


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tweets,
            "User tweets fetched successfully"
        )
    )

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;
    const { content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(tweetId)){
        throw new ApiError(400,"Invalid tweet ID")
    }

    if(!content?.trim()){
        throw new ApiError(400, "tweet content is required")
    }

    const updatedTweet = await Tweet.findOneAndUpdate({
        _id: tweetId,
        owner: req.user._id
    },
    {
    $set:{
        content   
    }
},
    {new: true}
)

    if(!updatedTweet){
        throw new ApiError(404, "Tweet not found or you are not authorized to update it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedTweet,
            "Tweet updated successfully"
        )
    )

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params

    if(!mongoose.Types.ObjectId.isValid(tweetId)){
        throw new ApiError(400,"Invalid tweet ID")
    }

    const deletedTweet = await Tweet.findOneAndDelete({
        _id: tweetId,
        owner: req.user._id
    })

    if(!deletedTweet){
        throw new ApiError(404, "Tweet not found or you're not authorized to delete it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedTweet,
            "Tweet deleted successfully"
        )
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}