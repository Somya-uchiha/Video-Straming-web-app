const mongoose=require("mongoose");
const videoLikeModel = mongoose.Schema ({
    video_id:{type:mongoose.Schema.Types.ObjectId, ref:"Upload"},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    likecount: {
        type:Number,
        trim: true,
        default: 0 , 
    }
},{timestamps:true})

const VideoLike = mongoose.model("VideoLike",videoLikeModel);
module.exports=VideoLike;