const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  year: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  awarded_amount: {
    type: String,
    trim: true,
  },
  donor: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Funding", userSchema);