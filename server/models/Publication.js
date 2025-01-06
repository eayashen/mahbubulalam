const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  published: {
    type: String,
    required: true,
    trim: true,
  },
  publications_type: {
    type: String,
    required: true,
    trim: true,
  },
  research_id: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Publication", userSchema);