const mongoose = require("mongoose");

const CarousalSchema = new mongoose.Schema({
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

const Carousal = mongoose.model("Carousal", CarousalSchema);

module.exports = Carousal;
