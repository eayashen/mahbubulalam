const { imageUploadUtil } = require("../../helper/cloudinary");
const Awards = require("../../models/Awards");

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

const addAward = async (req, res) => {
  try {
    const { title, year, image } = req.body;
    const newAward = new Awards({
      title,
      year,
      image,
    });
    await newAward.save();
    res.status(201).json({ message: "Award added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAwards = async (req, res) => {
  try {
    const awards = await Awards.find({}).aggregate([
      {
        $addFields: {
          yearAsNumber: { $toInt: "$year" }, // Convert `year` to an integer
        },
      },
      {
        $sort: { yearAsNumber: -1 }, // Sort by the converted field
      },
    ]);
    res.status(200).json({ awards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAward = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, image } = req.body;
    const findAward = await Awards.findById(id);
    if (!findAward) {
      return res.status(404).json({ message: "Award not found" });
    }
    findAward.title = title || findAward.title;
    findAward.year = year || findAward.year;
    findAward.image = image || findAward.image;

    await findAward.save();
    res.status(200).json({ message: "Award updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAward = async (req, res) => {
  try {
    const { id } = req.params;
    const award = await Awards.findByIdAndDelete(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }
    res.status(200).json({ message: "Award deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addAward,
  getAwards,
  updateAward,
  deleteAward,
  handleImageUpload,
};
