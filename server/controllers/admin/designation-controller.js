const Designation = require("../../models/Designation");

const upsertDesignation = async (req, res) => {
  try {
    const { name, company, location } = req.body;

    // Find and update the single designation or create it if not exists
    const designation = await Designation.findOneAndUpdate(
      {}, // Empty criteria to match the single record
      { name, company, location }, // Data to update
      { new: true, upsert: true } // Return updated document, create if not found
    );

    res.status(200).json({
      message: "Designation saved successfully",
      designation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  upsertDesignation,
  getDesignations,
};