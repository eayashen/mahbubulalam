const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    duration: {
      type: String,
      required: true,
      trim: true,
    },
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
    image: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },

    publications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Research", researchSchema);