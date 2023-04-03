const mongoose=require("mongoose");
const videoViewModel = mongoose.Schema ({
    video_id:{type:mongoose.Schema.Types.ObjectId, ref:"Upload"},
    views: { type: Number, default: 0 },
},{timestamps:true})

const VideoView = mongoose.model("VideoView",videoViewModel);
module.exports=VideoView;