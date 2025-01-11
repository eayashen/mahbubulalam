const Funding = require("../../models/Funding");

const addFunding = async (req, res) => {
  const { year, title, role, awarded_amount, time_period, donor } = req.body;

  try {
    const newlyCreatedFunding = new Funding({
      year,
      title,
      role,
      awarded_amount,
      time_period,
      donor,
    });

    await newlyCreatedFunding.save();

    res.status(201).json({ success: true, data: newlyCreatedFunding });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//fetch all fundings
const fetchAllFundings = async (req, res) => {
  try {
    const listOfFunding = await Funding.aggregate([
      {
        $addFields: {
          yearAsNumber: { $toInt: "$year" }, // Convert `year` to an integer
        },
      },
      {
        $sort: { yearAsNumber: -1 }, // Sort by the converted field
      },
    ]);
    res.status(200).json({ success: true, data: listOfFunding });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//edit a funding
const updateFunding = async (req, res) => {
  const { year, title, role, awarded_amount, time_period, donor } = req.body;
  const { id } = req.params;

  try {
    const updatedFunding = await Funding.findByIdAndUpdate(
      id,
      { year, title, role, awarded_amount, time_period, donor },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedFunding });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//delete a funding
const deleteFunding = async (req, res) => {
  const { id } = req.params;

  try {
    await Funding.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Funding deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { addFunding, fetchAllFundings, updateFunding, deleteFunding };
