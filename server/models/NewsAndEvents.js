const mongoose = require("mongoose");

const newsAndEventsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["news", "photo", "video", "event"], // ✅ allowed values
    default: "news",
    required: true,
  },
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
  videoLink: {
    type: String,
    trim: true,
    default: "",
  },
});

module.exports = mongoose.model("NewsAndEvents", newsAndEventsSchema);
