const { imageUploadUtil } = require("../../helper/cloudinary");
const Consultancy = require("../../models/Consultancy");

const handleImageUpload = async (req, res) => {
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

const addConsultancy = async (req, res) => {
  try {
    const { title, duration, client, image } = req.body;
    const newConsultancy = new Consultancy({
      title,
      duration,
      client,
      image,
    });
    await newConsultancy.save();
    res
      .status(201)
      .json({ success: true, message: "Consultancy added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getConsultancies = async (req, res) => {
  try {
    const consultancies = await Consultancy.find({}).sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.status(200).json({ success: true, data: consultancies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateConsultancy = async (req, res) => {
  try {
    const { title, duration, client, image } = req.body;
    const consultancy = await Consultancy.findById(req.params.id);

    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy not found" });
    }

    consultancy.title = title;
    consultancy.duration = duration;
    consultancy.client = client;
    consultancy.image = image;

    await consultancy.save();
    res.status(200).json({ success: true, message: "Consultancy updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteConsultancy = async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);

    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy not found" });
    }

    await Consultancy.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Consultancy deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleImageUpload,
  addConsultancy,
  getConsultancies,
  updateConsultancy,
  deleteConsultancy,
};
