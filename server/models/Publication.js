const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  published: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  research_id: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Publication", userSchema);