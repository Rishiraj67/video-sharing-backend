import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist
    if(!name?.trim()){
        throw new ApiError(400, "Playlist name is required")
    }

    if(!description?.trim()){
        throw new ApiError(400, "Playlist description is required")
    }

    const createdPlaylist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if(!createdPlaylist){
        throw new ApiError(500, "Failed to create playlist")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdPlaylist,
            "Playlist created successfully"
        )
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400, "Invalid user ID")
    }

    const playlist = await Playlist.find({
        owner: userId
    }).populate("videos")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findById(playlistId)
    .populate("videos")

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400, "Invalid playlist ID")
    }

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID")
    }

    const addedVideoToPlaylist = await Playlist.findOneAndUpdate(
    {
        _id: playlistId,
        owner: req.user._id
    },
    {
        $addToSet: {
        videos: videoId
        }
    },
    {
        new: true
    }
    ).populate("videos");

    if(!addedVideoToPlaylist){
        throw new ApiError(404, "playlist not found or you are not authorized to update it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            addedVideoToPlaylist,
            "video added to playlist successfully"
        )
    )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400, "Invalid playlist ID")
    }

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID")
    }

     const removedVideo = await Playlist.findOneAndUpdate(
    {
        _id: playlistId,
        owner: req.user._id
    },
    {
        $pull: {
        videos: videoId
        }
    },
    {
        new: true
    }
    ).populate("videos");

    if(!removedVideo){
        throw new ApiError(404, "Video not found or you're not authorized to remove it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            removedVideo,
            "Video removed from playlist successfully"
        )
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400, "Invalid playlist ID")
    }

    const deletedPlaylist = await Playlist.findOneAndDelete({
        _id: playlistId,
        owner: req.user._id
    })

    if(!deletedPlaylist){
        throw new ApiError(404, "Playlist not found or you're not authorized to delete it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedPlaylist,
            "Playlist deleted successfully"
        )
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400, "Invalid playlist ID")
    }

    if (!name?.trim()) {
    throw new ApiError(400, "Playlist name is required");
    }

    if (!description?.trim()) {
    throw new ApiError(400, "Playlist description is required");
    }

    const updatedPlaylist = await Playlist.findOneAndUpdate(
    {
        _id: playlistId,
        owner: req.user._id
    },
    {
        $set: {
          name,
          description
        }
    },
    {
        new: true
    }
    )

    if(!updatedPlaylist){
        throw new ApiError(404, "playlist not found or you are not authorized to update it")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedPlaylist,
            "Playlist updated successfully"
        )
    )

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}