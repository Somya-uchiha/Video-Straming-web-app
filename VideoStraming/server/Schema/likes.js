const mongoose = require("mongoose");

const likes = new mongoose.Schema({
    userid: {
        require: true,
        type: String,

    },
    like: {
        type: String,
        default: 0,
    },
    videoid: {
        require: true,
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("likes", likes);