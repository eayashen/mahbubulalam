const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  time_period: {
    type: String,
    required: true,
    trim: true,
  },
  doner: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Funding", userSchema);