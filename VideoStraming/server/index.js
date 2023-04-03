const mongoose = require('mongoose');
const express =require('express');
const app =express();
const cors = require('cors');
// const authRoutes = require("./Routes/userRoutes")
const {register , uploads , search , video , details , userinfo , allvideo,like , posts , pst , plot , postdel,videoviewupdate,unique , viewcount} = require("./userControll/usercontroller")
const {create,list,update}=require("./userControll/videoCommentController");
const {toggle_like }=require("./userControll/videoLikeController");
const {protect}= require("./middleware/authMiddleware");
const {viewCount , view}= require("./userControll/videoViewController");
app.use(cors());
app.use(express.json());
// app.use("",authRoutes);
// app.use("/api/upload" );
// app.use("/api/user");
// app.use("/api/view");
// app.use("/api/comment",commentRoutes);
// app.use("/api/like",viewRoutes);

const connect =()=>{
    mongoose.connect('mongodb+srv://lama:lama@cluster0.iy5pupz.mongodb.net/videostream?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("working");
    }).catch((e)=>{
        console.log(e);
    })
}
app.post("/register" , register);
app.post("/upload" ,uploads );
app.get("/search/:key" , search);
app.get("/video/:id" , video);
app.put("/details/:id" , details);
app.get("/users/:id" ,userinfo );
app.get("/allvideos" ,allvideo);
app.put("/like" , like);
app.post("/post" , posts);
app.get("/post" , pst);
app.get("/plot" , plot);
app.delete("/plot/:id" , postdel);
app.get("/post/:id",unique);

app.post("/:video_id/toggle-like",protect,toggle_like);
// app.post("/:video_id/likeCount",likeCount);
app.put("/:video_id/view",viewCount);
app.post("/:video_id/comments/create",protect,create);
app.get("/:video_id/comments",list);
app.put("/comments/:comment_id/update",protect,update);
app.get("/viewcount/:id", viewcount);
app.put("/:id/viewcount" , view);

app.listen(5000 , ()=>{
    console.log("server is ready");
    connect();
})

module.exports=app;
