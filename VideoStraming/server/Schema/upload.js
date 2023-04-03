const mongoose = require("mongoose")

const uploadModel = mongoose.Schema(
    {
        title:
        {
            type: String,
            trim: true,
            required: true,
        },
        description:
        {
            type: String,
            trim: true,
            required: true,
        },
        category:
        {
            type: String,
            trim: true,
            required: true,
        },
        thumbnail:
        {
            type: String,

        },
        video:
        {
            type: String,

        },
        views : {
            type:Number,
            default:0,
        },
        video_comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "VideoComment",
        },],
        video_likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "VideoLike",
        },],
        video_views: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "VideoView",
        },],
    },

    {
        timestamps: true,
    }
)

const Upload = mongoose.model("Upload", uploadModel);

module.exports = Upload;
