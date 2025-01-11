const Research = require("../../models/Research");
const Publication = require("../../models/Publication");

const addResearch = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newlyCreatedResearch = new Research({
      title,
      description,
      status,
    });

    await newlyCreatedResearch.save();

    res.status(201).json({ success: true, data: newlyCreatedResearch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllResearch = async (req, res) => {
  try {
    const listOfResearch = await Research.aggregate([
      {
        $lookup: {
          from: "publications",
          let: { researchId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$research_id", { $toString: "$$researchId" }], // Convert ObjectId to String
                },
              },
            },
            {
              $sort: { createdAt: -1 }, // Sort publications in reverse order by _id
            },
          ],
          as: "publications",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({ success: true, data: listOfResearch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const editResearch = async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    const updatedResearch = await Research.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedResearch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteResearch = async (req, res) => {
  const { id } = req.params;

  try {
    await Research.findByIdAndDelete(id);

    // also delete related publications
    await Publication.deleteMany({ research_id: id });

    res.status(200).json({ success: true, message: "Research deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  addResearch,
  fetchAllResearch,
  editResearch,
  deleteResearch,
};
