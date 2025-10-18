const mongoose = require("mongoose");

const newsAndEventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("NewsAndEvents", newsAndEventsSchema);
