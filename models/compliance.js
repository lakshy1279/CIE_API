const mongoose = require("mongoose");

const ComplianceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Compliance = mongoose.model("Compliance", ComplianceSchema);

module.exports = Compliance;
