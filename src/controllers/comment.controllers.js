import mongoose from "mongoose";
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID")
    }

    const comments = await Comment.find({
        video : videoId
    })
    .sort({ createdAt: -1 })
    .skip((page -1) * limit)
    .limit(limit);

    return res.status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully "))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const { content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video ID")
    }

    if(!content?.trim()){
        throw new ApiError(400, "Comment content is required")
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    })

    if(!comment){
        throw new ApiError(500, "Failed to add comment")
    }

    return res.status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params
    const { content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400, "Invalid comment ID")
    }

    if(!content?.trim()){
        throw new ApiError(400, "Comment content is required")
    }

    const updatedComment = await Comment.findOneAndUpdate(
    {
        _id: commentId,
        owner: req.user._id
    }, 
    {
    $set:{
        content
    }
},
    { new: true }
)

    if(!updatedComment){
        throw new ApiError(404, "Comment not found or you're not authorized to update it")
    }

    return res.status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params

    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400, "Invalid comment ID")
    }

    const deletedComment = await Comment.findOneAndDelete(
    {
        _id: commentId,
        owner: req.user._id
    }
)

    if(!deletedComment){
        throw new ApiError(404, "Comment not found or you're not authorized to delete it")
    }

    return res.status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}