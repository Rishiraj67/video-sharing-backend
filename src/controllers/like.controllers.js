import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID")
    }
    
    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })

    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id)

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Video unliked successfully"
            )
        )
    }

    const likedVideo = await Like.create({
        video: videoId,
        likedBy: req.user._id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            likedVideo,
            "Video liked successfully"
        )
    )

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400, "Invalid comment ID")
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })

    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id)

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment unliked successfully"
            )
        )
    }

    const likedComment = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            likedComment,
            "Comment liked successfully"
        )
    )

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    if(!mongoose.Types.ObjectId.isValid(tweetId)){
        throw new ApiError(400, "Invalid tweet ID")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })

    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id)

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Tweet unliked successfully"
            )
        )
    }

    const likedTweet = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            likedTweet,
            "Tweet liked successfully"
        )
    )
})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const likedVideos = await Like.find({
        likedBy: req.user._id,
        video: { $ne: null }
    }).populate("video")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            likedVideos,
            "Liked Videos fetched successfully"
        )
    )

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}   