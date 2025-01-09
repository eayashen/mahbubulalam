const Designation = require("../../models/Designation");

const addDesignation = async (req, res) => {
  const { title, company, location } = req.body;
  console.log(req.body);
  try {
    const designation = new Designation({ title, company, location });
    await designation.save();
    res.status(201).json({ success: true, message: "Designation added successful", data: designation});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json({ success: true, data: designations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDesignation = async (req, res) => {
  const { title, company, location } = req.body;
  const { id } = req.params;
  try {
    const designation = await Designation.findById(id);
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    designation.title = title;
    designation.company = company;
    designation.location = location;
    await designation.save();
    res.status(200).json({ success: true, message: "Designation added successful", data: designation});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDesignation = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const designation = await Designation.findByIdAndDelete(id);
    if (!designation) {
      return res.status(404).json({ success: true, message: "Designation not found" });
    }
    res.status(200).json({ success: true, message: "Designation deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addDesignation,
  fetchAllDesignations,
  updateDesignation,
  deleteDesignation,
};
