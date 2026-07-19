import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription 

    if(!mongoose.Types.ObjectId.isValid(channelId)){
        throw new ApiError(400, "Invalid channel ID")
    }

    const channel = await User.findById(channelId);

    if(!channel){
        throw new ApiError(404, "Channel not found")
    }

    if (req.user._id.toString() === channelId) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
    }

    const subscribed = await Subscription.findOne({
        subscriber : req.user._id,
        channel: channelId
    })

    if(subscribed){
        await Subscription.findByIdAndDelete(subscribed._id)

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Channel Unsubscribed successfully"
            )
        )
    }

    const subscription = await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            subscription,
            "Channel subscribed successfully"
        )
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(!mongoose.Types.ObjectId.isValid(channelId)){
        throw new ApiError(400, "Invalid channel ID")
    }

    const channel = await User.findById(channelId);

    if(!channel){
        throw new ApiError(404, "Channel not found");
    }

    const subscribers = await Subscription.find({
        channel: channelId
    }).populate("subscriber", "username fullName avatar")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscribers,
            "Subscribers fetched successfully"
        )
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if(!mongoose.Types.ObjectId.isValid(subscriberId)){
        throw new ApiError(400, "Invalid subscriber ID")
    }

    const subscriber = await User.findById(subscriberId)

    if(!subscriber){
        throw new ApiError(404, "subscriber not found")
    }

    const subscribedChannels = await Subscription.find({
        subscriber : subscriberId
    }).populate("channel", "username fullName avatar")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscribedChannels,
            "Subscribed channels fetched successfully"
        )
    )
})

export {        
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}