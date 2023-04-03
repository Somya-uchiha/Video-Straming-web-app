const user = require("../Schema/userinfo");
const uploadD = require("../Schema/upload");
const likes = require("../Schema/likes");
const post = require("../Schema/post");
const viewsdata = require("../Schema/videoViewModel");
module.exports.register = async (req,resp , next)=>{
    try {
        let { username, email, password } = req.body;
        const checkuser = await user.findOne({ username })
        if (checkuser) {
            resp.send("user aleready exist");
            console.log("user aleready exist");
            return resp.json({ msg: "Username already used", status: false });
        }

        const checkemail = await user.findOne({ email });
        if (checkemail) {
            resp.send("email aleready exist");
            console.log("email aleready exist");
            return resp.json({ msg: "Email already used", status: false });
        }
        let result = await user(req.body);
        result = await result.save();
        return resp.send({ status: true,result});
    } catch (err) {
        next(err);
    }
}


module.exports.uploads = async(req,resp ,next)=>{
    try {    
    const {title, description, category, thumbnail, video} = req.body;
        let result = await uploadD(req.body);
    result = await result.save();
return resp.send({msg :" working", result})
} catch (error) {
       next(error); 
}
}


module.exports.search = async( req , resp , next)=>{
try{
   let data =await uploadD.find(
    {
        "$or":[
            {"title":{$regex:req.params.key}},
            {"description":{$regex:req.params.key}},
            {"category":{$regex:req.params.key}}
        ]
    }
   ).sort({views:-1})
   if(data){
    return resp.json(data);
   }
}catch(error){
next(error);
}
}


module.exports.video = async(req , resp , next)=>{
    try{
let result = await uploadD.findOne({_id:req.params.id});
resp.send(result);
    }catch(e){
next(e);
    }
}

module.exports.details = async (req,resp , next)=>{
    try{
let result = await user.updateOne(
    {_id:req.params.id},{
        $set:req.body
    }
)
resp.send(result);
    }
    catch(e){
next(e)
    }
}


module.exports.userinfo = async(req,resp,next)=>{
    try{
        let result = await user.findOne({_id:req.params.id});
resp.send(result);
    }
    catch(e){
        next(e);
    }
}

module.exports.allvideo = async (req,resp,next)=>{
    try{
let result = await uploadD.find().sort({views:-1});
resp.send(result);
    }
    catch(e){
        next(e);
    }
}


module.exports.like= async (req , resp , next)=>{
    try{
        let result = await likes(req.body);
        result = await result.save();
        resp.send(result);
    }catch(e){
        next(e);
    }
}

module.exports.posts = async(req, resp , next)=>{
    try{
let result =await post(req.body);
result = await result.save();
resp.send({result , status:true});
    }
    catch(e){
        next(e);
    }
}

module.exports.pst =async(req, resp , next)=>{
    try{
        
        var mysort ={"createdAt":-1};
let result = await post.find().sort(mysort).limit(5);
resp.send(result);
    }
    catch(e){
        next(e);
    }
}


module.exports.plot =async(req, resp , next)=>{
    try{
        var mysort ={"createdAt":-1};
let result = await post.find().sort(mysort);
resp.send(result);
    }
    catch(e){
        next(e);
    }
}

module.exports.postdel = async(req,resp,next)=>{
    try{
        const result = await post.deleteOne({_id:req.params.id});
        resp.send(result);
        console.log(result);
    }
    catch(e){
next(e);
    }
}


module.exports.unique = async(req,resp ,next)=>{
    try{
        var mysort ={"createdAt":-1};
        let result = await post.find({userid:req.params.id}).sort(mysort);
        resp.send(result);
    }
    catch(e){
        next(e);
    }

}



module.exports.viewcount =async(req, resp , next)=>{
    try{
let result = await viewsdata.findOne({video_id:req.params.id})
resp.send(result);
console.log(result , "working");
    }
    catch(e){
        next(e);
    }
}


module.exports.videoviewupdate =async (req, resp , next)=>{
try{
let data  = await uploadD.updateOne({
    // {$regex:$set}:
})
}
catch(e){
    next(e);
}
}
