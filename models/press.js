const mongoose = require("mongoose");

const PressSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
    },
    description:{
        type:String
    }
},
    { timestamps: true }
);

const Press = mongoose.model("Press", PressSchema);

module.exports = Press;
