const Mentorship = require("../../models/Mentorship");

const addMentorship = async (req, res) => {
  try {
    const {
      name,
      present_title,
      university_name,
      previous_title,
      email,
      gender,
      year,
    } = req.body;
    const newMontorship = new Mentorship({
      name,
      present_title,
      university_name,
      previous_title,
      email,
      gender,
      year,
    });
    await newMontorship.save();
    res
      .status(201)
      .json({ success: true, message: "Mentorship added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getMentorships = async (req, res) => {
//   try {
//     const mentorships = await Mentorship.find({}).collation({ locale: 'en' }).sort({ name: 1 });
//     res.status(200).json({ success: true, data: mentorships });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({})
      .collation({ locale: "en" })
      .sort({ name: 1 });

    const groupedByYear = mentorships.reduce((acc, mentorship) => {
      const year = mentorship.year || "Unknown Year";
      if (!acc[year]) acc[year] = [];
      acc[year].push(mentorship);
      return acc;
    }, {});

    // Return as array (guaranteed order)
    const sortedGroupedArray = Object.entries(groupedByYear)
      .sort(([yearA], [yearB]) => {
        const numA = isNaN(Number(yearA)) ? -Infinity : Number(yearA);
        const numB = isNaN(Number(yearB)) ? -Infinity : Number(yearB);
        return numB - numA; // descending
      })
      .map(([year, mentors]) => ({ year, mentors }));

    res.status(200).json({
      success: true,
      data: sortedGroupedArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMentorship = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      present_title,
      university_name,
      previous_title,
      email,
      gender,
      year,
    } = req.body;
    
    const findMentorship = await Mentorship.findById(id);
    if (!findMentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }
    findMentorship.name = name || findMentorship.name;
    findMentorship.present_title =
      present_title || findMentorship.present_title;
    findMentorship.university_name =
      university_name || findMentorship.university_name;
    findMentorship.previous_title =
      previous_title || findMentorship.previous_title;
      findMentorship.email = email ?? findMentorship.email;
    findMentorship.gender = gender || findMentorship.gender;
    findMentorship.year = year || findMentorship.year;

    await findMentorship.save();
    res
      .status(200)
      .json({ success: true, message: "Mentorship updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMentorship = async (req, res) => {
  try {
    const { id } = req.params;
    const findMentorship = await Mentorship.findByIdAndDelete(id);
    if (!findMentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Mentorship deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addMentorship,
  getMentorships,
  updateMentorship,
  deleteMentorship,
};
