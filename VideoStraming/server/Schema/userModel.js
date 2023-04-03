const mongoose=require("mongoose");

const userModel = mongoose.Schema({
    name:{type:String, trim:true},
    email:{type:String,trim:true, unique:true},
},{
    timestamps:true,
})

const User=mongoose.model("User",userModel);
module.exports=User;