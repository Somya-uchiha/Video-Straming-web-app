const mongoose = require("mongoose");
const post = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    userid: {
        type: String,
        trim: true,
    },
    images: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    hashtags: {
        type: String,
        trim: true,
    },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
})
module.exports = mongoose.model("post", post);