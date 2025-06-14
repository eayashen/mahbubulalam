const Visitor = require("../../models/Visitor");

const addVisitor = async (req, res) => {
  try {
    await Visitor.create({ visitedAt: new Date() });
    return res.status(200).json({ message: "Visit recorded." });
  } catch (error) {
    console.error("❌ Error logging visit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchVisitors = async (req, res) => {
  try {
    const count = await Visitor.countDocuments();

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  addVisitor,
  fetchVisitors,
};
