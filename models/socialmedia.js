const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SocialMedia = mongoose.model("SocialMedia", SocialMediaSchema);

module.exports = SocialMedia;
