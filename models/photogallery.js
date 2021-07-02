const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Thumbnail: {
        type: String,
    },
},
    { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
