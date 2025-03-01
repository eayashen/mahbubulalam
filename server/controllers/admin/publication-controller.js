const Publication = require("../../models/Publication");

const addPublication = async (req, res) => {
  const { title, published, category, research_id, authors, link, keywords } =
    req.body;
  try {
    const newlyCreatedPublication = new Publication({
      title,
      published,
      category,
      research_id,
      authors,
      link,
      keywords,
    });

    await newlyCreatedPublication.save();

    res.status(201).json({ success: true, data: newlyCreatedPublication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllPublicationsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const publications = await Publication.find({ category }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: publications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: publications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

const editPublication = async (req, res) => {
  const { title, published, category, research_id, authors, link, keywords } = req.body;
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
        keywords,
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
  fetchAllPublicationsByCategory,
  fetchAllPublications,
  editPublication,
  deletePublication,
};
