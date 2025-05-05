const Publication = require("../../models/Publication");

const addPublication = async (req, res) => {
  const { title, published, category, authors, link, keywords } =
    req.body;
  try {
    const newlyCreatedPublication = new Publication({
      title,
      published,
      category,
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
    const publications = await Publication.find({ category }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: publications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const fetchAllPublications = async (req, res) => {
  try {
    // Define custom sorting order
    const categoryOrder = ["journal", "working-paper", "policy-paper"];

    // Fetch all publications sorted by createdAt (descending)
    const publications = await Publication.find({}).sort({ createdAt: -1 });

    // Count publications by category
    const categoryCounts = await Publication.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert categoryCounts into an array of objects
    let counts = categoryCounts.map((item) => ({
      category: item._id || "unknown", // Handle possible null values
      count: item.count,
    }));

    // Sorting function for custom order
    const sortByCategoryOrder = (a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      return (
        (indexA === -1 ? Infinity : indexA) -
        (indexB === -1 ? Infinity : indexB)
      );
    };

    // Sort counts based on categoryOrder
    counts.sort(sortByCategoryOrder);

    // Sort publications based on categoryOrder
    publications.sort(sortByCategoryOrder);

    res.status(200).json({ success: true, data: publications, counts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const editPublication = async (req, res) => {
  const { title, published, category, authors, link, keywords } =
    req.body;
  const { id } = req.params;

  try {
    const updatedPublication = await Publication.findByIdAndUpdate(
      id,
      {
        title,
        published,
        category,
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
