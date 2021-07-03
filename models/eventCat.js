const mongoose = require("mongoose");

const EventCatSchema = new mongoose.Schema({
    event_category: {
        type: String,
        required: true,
    },
});

const EventCat = mongoose.model("EventCat", EventCatSchema);

module.exports = EventCat;
