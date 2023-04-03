const asyncHandler=require("express-async-handler");
const UploadD = require("../Schema/upload")

const upload = asyncHandler(async (req, res) => {
    const {title, description, category, thumbnail, video} = req.body;

    if(!title || !description || !category){
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const uploadD = await UploadD.create({
        title,
        description,
        category,
        thumbnail,
        video,
    })
    if(uploadD) {
        res.status(201).json({
            _id:uploadD._id,
            title:uploadD.title,
            description:uploadD.description,
            category:uploadD.category,
            thumbnail:uploadD.thumbnail,
            video:uploadD.video,
        })
    } else {
        res.status(400);
        throw new Error("Failed to upload the video");
    }
})

module.exports = {upload};