const asyncHandler=require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Upload=require("../Schema/upload");
const VideoComment=require("../Schema/videoCommentModel");

const create = asyncHandler(async(req,res)=>{
    try {
        
    const {comment}=req.body;
    let video_id=req.params.video_id;
    if(!mongoose.Types.ObjectId.isValid(video_id)){
        return res.status(400).send({
            message:"Invalid video id",
            data:{}
        })
    }
    Upload.findOne({_id:video_id}).then(async(video)=>{
        if(!video){
            return res.status(400).send({
                message:"No video found",
                data:{},
            })
        } else {
            if(!comment){
                res.status(400);
                throw new Error("Please enter a comment");
            }
            let newCommentDocument = new VideoComment({
                comment:req.body.comment,
                video_id:video_id,
                user_id:req.user._id
            });
            let commentData=await newCommentDocument.save();
            await Upload.updateOne({_id:video_id},
                {
                    $push:{video_comments:commentData._id}
                }
                )

        return res.status(200).send({
        message:"Comment Successfully added",
        data:{},
    })
        }
    }).catch((err)=>{
        return res.status(400).send({
            message:err.message,
            data:err
        })
    })
    } catch (error) {
        next(error)
    }
})

const list = asyncHandler(async(req,res)=>{
    try {
        
    
    let video_id=req.params.video_id;
    if(!mongoose.Types.ObjectId.isValid(video_id)){
        return res.status(400).send({
            message:"Invalid video id",
            data:{}
        })
    }
    Upload.findOne({_id:video_id}).then(async(video)=>{
        if(!video){
            return res.status(400).send({
                message:"No video found",
                data:{}
            })
        } else {
            let query = [
                {
                    $lookup:
                    {
                        from:"users",
                        localField:"user_id",
                        foreignField:"_id",
                        as:"user"
                    }
                },
                {$unwind:"$user"},
                {
                    $match:{
                        'video_id':new mongoose.Types.ObjectId(video_id)
                    }
                },
                {
                    $sort:{
                        createdAt:-1,
                    }
                }
                
            ]
            // Pagenation Logic if needed

            let comments= await VideoComment.aggregate(query)
            return res.send({
                message:"Comments successfully fetched",
                data:{
                    comments:comments
                }
            })
        }

    })
    } catch (error) {
        next(error)
    }
})

const update=asyncHandler(async(req,res)=>{
    try {    
    let comment_id=req.params.comment_id;
    if(!mongoose.Types.ObjectId.isValid(comment_id)){
        return res.status(400).send({
            message:"Invalid comment id",
            data:{}
        })
    }
    VideoComment.findOne({
        _id:comment_id
    }).then(async(comment)=>{
        if(!comment){
            return res.status(400).send({
                message:"No comment found",
                data:{},
            })
        } else {
            let current_user=req.user;
            if(comment.user_id!=current_user._id){
                 return res.status(400).send({
                    message:"Access denied",
                    data:{},
                })
            } else {
              if(!comment){
                res.status(400);
                throw new Error("Please enter a comment");
            }
            await VideoComment.updateOne({
                _id:comment_id,
            },{
                comment:req.body.comment
            }) 

            let query=[
                {
                    $lookup:
                    {
                        from:"users",
                        localField:"user_id",
                        foreignField:"_id",
                        as:"user"
                    }
                },
                {
                    $unwind:"$user"
                },
                {
                    $match:{
                        "_id":new mongoose.Types.ObjectId(comment_id)
                    }
                },
            ]
            let comments= await VideoComment.aggregate(query);
            return res.status(200).send({
                message:"Comment successfully updated",
                data:comments[0]
            })
            } 
        } 
    }).catch((error)=>{
         return res.status(400).send({
            message:err.message,
            data:err,
         })
    })
    } catch (error) {
        next(error);   
    }
})




module.exports={create, list,update};