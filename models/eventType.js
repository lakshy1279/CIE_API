const mongoose = require("mongoose");

const EventTypeSchema = new mongoose.Schema({

    event_type: {
        type: String,
        required: true,
    },
});

const EventType = mongoose.model("EventType", EventTypeSchema);

module.exports = EventType;
