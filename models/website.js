const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Website = mongoose.model("Website", WebsiteSchema);

module.exports = Website;
