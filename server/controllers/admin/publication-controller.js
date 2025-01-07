const Publication = require("../../models/Publication");

const addPublication = async (req, res) => {
  const { title, published, category, research_id, authors, link } = req.body;

  try {
    const newlyCreatedPublication = new Publication({
      title,
      published,
      category,
      research_id,
      authors,
      link,
    });

    await newlyCreatedPublication.save();

    res.status(201).json({ success: true, data: newlyCreatedPublication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllPublicationsByResearch = async (req, res) => {
  const { research_id } = req.params;

  try {
    const listOfPublication = await Publication.find({ research_id });
    res.status(200).json({ success: true, data: listOfPublication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllPublicationsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const listOfPublication = await Publication.find({ category });
    res.status(200).json({ success: true, data: listOfPublication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const editPublication = async (req, res) => {
  const { title, published, category, research_id, authors, link } = req.body;
  const { id } = req.params;

  try {
    const updatedPublication = await Publication.findByIdAndUpdate(
      id,
      {
        title,
        published,
        category,
        research_id,
        authors,
        link,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedPublication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deletePublication = async (req, res) => {
  const { id } = req.params;

  try {
    await Publication.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Publication deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  addPublication,
  fetchAllPublicationsByResearch,
  fetchAllPublicationsByCategory,
  editPublication,
  deletePublication,
};