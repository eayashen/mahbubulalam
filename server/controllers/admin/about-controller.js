const { imageUploadUtil } = require("../../helper/cloudinary");
const User = require("../../models/User");

const handleProPicUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "mahbubulalam", "image");

    const updatedUser = await User.findOneAndUpdate(
      {}, // Assuming user ID is available in `req.user`
      { pro_pic: result.secure_url },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile picture uploaded successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const handleCvUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    console.log("Uploaded File MIME Type:", req.file.mimetype);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "mahbubulalam", "pdf");
    console.log("Cloudinary Upload Result:", result);
    const updatedUser = await User.findOneAndUpdate(
      {}, // Assuming user ID is available in `req.user`
      { cv: result.secure_url },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "CV uploaded successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const handleBannerUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "mahbubulalam");

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const upsertUserAbout = async (req, res) => {
  try {
    const { name, motto, bio } = req.body;

    // Find and update the single user or create it if not exists
    const updatedUser = await User.findOneAndUpdate(
      {}, // No filter to target the single user record
      { $set: { name, motto, bio } }, // Fields to update
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserAbout = async (req, res) => {
  try {
    const user = await User.findOne({}, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { upsertUserAbout, getUserAbout, handleProPicUpload, handleBannerUpload, handleCvUpload };
