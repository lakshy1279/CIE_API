const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
);

const Event = mongoose.model("Events", EventSchema);

module.exports = Event;
