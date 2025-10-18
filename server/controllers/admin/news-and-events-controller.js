const { imageUploadUtil } = require("../../helper/cloudinary");
const NewsAndEvents = require("../../models/NewsAndEvents");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "news-and-events");

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const addNewsOrEvent = async (req, res) => {
  try {
    const { title, description, date, image, link } = req.body;
    const newNewsOrEvent = new NewsAndEvents({
        title,
        description,
        date,
        image,
        link,
    });
    await newNewsOrEvent.save();
    res
      .status(201)
      .json({ success: true, message: "News/Event added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNewsAndEvents = async (req, res) => {
  try {
    const newsAndEvents = await NewsAndEvents.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: newsAndEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNewsOrEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, image, link } = req.body;
    const findNewsOrEvent = await NewsAndEvents.findById(id);
    if (!findNewsOrEvent) {
      return res
        .status(404)
        .json({ success: false, message: "News/Event not found" });
    }
    findNewsOrEvent.title = title || findNewsOrEvent.title;
    findNewsOrEvent.description = description || findNewsOrEvent.description;
    findNewsOrEvent.date = date || findNewsOrEvent.date;
    findNewsOrEvent.image = image || findNewsOrEvent.image;
    findNewsOrEvent.link = link || findNewsOrEvent.link;
    await findNewsOrEvent.save();
    res
      .status(200)
      .json({ success: true, message: "News/Event updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNewsOrEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const newsOrEvent = await NewsAndEvents.findByIdAndDelete(id);
    if (!newsOrEvent) {
      return res
        .status(404)
        .json({ success: false, message: "News/Event not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "News/Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleImageUpload,
  addNewsOrEvent,
  getNewsAndEvents,
  updateNewsOrEvent,
  deleteNewsOrEvent,
};