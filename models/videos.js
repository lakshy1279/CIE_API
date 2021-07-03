const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Video: {
        type: String,
    },
},
    { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
