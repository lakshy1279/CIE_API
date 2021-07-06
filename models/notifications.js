const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
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

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
