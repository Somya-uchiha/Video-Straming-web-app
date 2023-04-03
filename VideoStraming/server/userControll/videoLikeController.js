const asyncHandler=require("express-async-handler");
const { default: mongoose } = require("mongoose");
const connectDB = require("../config/db");
const { db } = require("../Schema/upload");
const Upload = require("../Schema/upload");
const User=require("../Schema/userModel");
const VideoLike = require("../Schema/videoLikeModel");

const toggle_like = asyncHandler(async(req,res)=>{
   try {
   let video_id=req.params.video_id;
   if(!mongoose.Types.ObjectId.isValid(video_id)){
      return res.status(400).send({ 
         message:"Invalid video id",
         
      })
   }
   Upload.findOne({_id:video_id}).then(async(video)=>{
      if(!video){
         return res.status(400).send({
            message:"No video found",
            
         })
      }else {
         let current_user=req.user;
         VideoLike.findOne({
            video_id:video_id,
            user_id:current_user._id
         }).then(async(video_like)=>{
            if(!video_like) {
               let videoLikeDoc=new VideoLike({
                  video_id:video_id,
                  user_id:current_user._id
               })
               let likeData=await videoLikeDoc.save()
              await Upload.updateOne({
                  _id:video_id
               },{
                  $push:{video_likes:likeData._id}
               })
               return res.status(200).send({
                  message:"Like added",
                  
               })
            } else {
               await VideoLike.deleteOne({
                  _id:video_like._id
               })
               await Upload.updateOne({
                  _id:video_like.video_id
               },{
                  $pull:{video_likes:video_like._id}
               })
               return res.status(200).send({
                  message:"Like Successfully removed",
                  
               })
            }
         }).catch((err)=>{
            return res.status(400).send({
               message:err.message,
               data:{},
            })
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


const likeCount = asyncHandler(async(req,res)=>{
   try {
   let video_id=req.params.video_id;
   if(!mongoose.Types.ObjectId.isValid(video_id)){
      return res.status(400).send({
         message:"Invalid video id",
         
      })
   }
   Upload.findOne({_id:video_id}).then(async(video)=>{
      if(!video){
         return res.status(400).send({
            message:"No video found",
            
         })
      }else {
      connectDB.uploads.aggregate([{
         $project:{count:{$size:"$video_likes"}}
      }])
      console.log(size);
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

module.exports={toggle_like, likeCount}