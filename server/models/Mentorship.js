const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    present_title: {
      type: String,
      trim: true,
    },
    university_name: {
      type: String,
      trim: true,
    },
    previous_title: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mentorship", mentorshipSchema);
