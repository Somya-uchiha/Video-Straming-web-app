const asyncHandler=require("express-async-handler");
const { default: mongoose } = require("mongoose");
const connectDB = require("../config/db");
// const { db } = require("../Schema/upload");
const Upload = require("../Schema/upload");
const VideoView = require("../Schema/videoViewModel");

const viewCount = asyncHandler(async(req,res)=>{
   try {
   const video_id=req.params.video_id;
   if(!mongoose.Types.ObjectId.isValid(video_id)){
      return res.status(400).send({ 
         message:"Invalid video id",
         
      })
   }
   Upload.findById(req.params.video_id).then(async(video)=>{
      if(!video){
         return res.status(400).send({
            message:"No video found",
            
         })
      }else {
         VideoView.findOne({video_id:video_id,})
    .then(async(video) => {
        if(!video)
        {
            const videoViewDoc=new VideoView({
                video_id:video_id,
            })
            let viewData=await videoViewDoc.save()
              await Upload.updateOne({
                  _id:video_id
               },{
                  $push:{video_views:viewData._id}
               })
               return res.status(200).send({
                  message:"View Added",
                  
               })
        } else {
      video.views = video.views + 1;

      video
        .save()
        .then(() => res.json('View Added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
        }
    })

      }
   }).catch((err)=>{
      return res.status(400).send({
         message:err.message,
         data:{}
      })
   })
   } catch (error) {
      next(error)
   }

})
const view=asyncHandler(async(req,res)=>{
   Upload.findById(req.params.id)
   .then((video) => {
      video.views = video.views + 1;

      video
        .save()
        .then(() => res.json('Video updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports={viewCount , view};