const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "onGoing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Research", userSchema);
