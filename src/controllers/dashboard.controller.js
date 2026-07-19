import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const ownerId = req.user._id;

    // Total videos uploaded by the channel
    const totalVideos = await Video.countDocuments({
        owner: ownerId
    })

    // Total subscribers of the channel
    const totalSubscribers = await Subscription.countDocuments({
        channel: ownerId
    })

    // Total views across all videos
    const viewsResult = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(ownerId)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: {
                    $sum: "$views"
                }
            }
        }
    ])

    const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

    // Get all video IDs of the channel
    const videos = await Video.find(
        { owner: ownerId },
        { _id: 1 }
    );

    const videoIds = videos.map(video => video._id);

    // Total likes on all channel videos
    const totalLikes = await Like.countDocuments({
        video: {
            $in: videoIds
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos,
                totalSubscribers,
                totalViews,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    );
})


const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    const ownerId = req.user._id;

    const videos = await Video.find(
        { owner: ownerId }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
                videos,
            "Channel videos fetched successfully"
        )
    );
})

export {
    getChannelStats, 
    getChannelVideos
    }