const mongoose = require("mongoose");
const userInfo = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
      },
      password: {
        type: String,
        required: true,
        min: 8,
      },
      isAvatarImageSet: {
        type: Boolean,
        default: false, 
      },
      images: {
        type: String,
        default: "https://cdn.vox-cdn.com/thumbor/LcWgMN2KXuIOiPN6CajkD-CWS24=/0x0:1280x960/1400x1400/filters:focal(0x0:1280x960):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/44251740/peaky_s1_009_h.0.0.jpg",
      },
},{
  timestamps:true,
})
module.exports=mongoose.model("userinfo" , userInfo);