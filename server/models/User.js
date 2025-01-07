const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  motto: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  pro_pic: String,
  cv: String,
  banner: {
    type: [String],
    default: [],
  }
});

module.exports = mongoose.model("User", userSchema);