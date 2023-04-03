const mongoose=require("mongoose");
const videoCommentModel=mongoose.Schema({
    comment: {
        type:String,
    },
    video_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Upload",
    },
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},{
    timestamps:true,
})

const VideoComment=mongoose.model("VideoComment",videoCommentModel)
module.exports=VideoComment;