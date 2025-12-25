const Membership = require("../../models/Membership");
const { imageUploadUtil } = require("../../helper/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "memberships");

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const addMembership = async (req, res) => {
  try {
    const { hoverText, imageLink } = req.body;
    const newMembership = new Membership({ hoverText, imageLink });
    await newMembership.save();
    res.status(201).json({ success: true, message: "Membership added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { hoverText, imageLink } = req.body;
    const findMembership = await Membership.findById(id);
    if (!findMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    findMembership.hoverText = hoverText || findMembership.hoverText;
    findMembership.imageLink = imageLink || findMembership.imageLink;
    await findMembership.save();
    res.status(200).json({ success: true, message: "Membership updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const findMembership = await Membership.findByIdAndDelete(id);
    if (!findMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.status(200).json({ success: true, message: "Membership deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleImageUpload,
  addMembership,
  updateMembership,
  deleteMembership,
};