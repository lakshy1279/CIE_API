const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema(
  {
    frontendImage: {
      type: String,
    },
    backendImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Logo = mongoose.model("Logo", LogoSchema);

module.exports = Logo;
