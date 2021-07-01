const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
