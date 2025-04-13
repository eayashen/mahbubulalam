const express = require("express");
const {
  addMentorship,
  getMentorships,
  updateMentorship,
  deleteMentorship,
} = require("../../controllers/admin/mentorship-controller");
const { upload } = require("../../helper/cloudinary");

const router = express.Router();

router.post("/add-mentorship", addMentorship);
router.get("/get-mentorships", getMentorships);
router.put("/update-mentorship/:id", updateMentorship);
router.delete("/delete-mentorship/:id", deleteMentorship);

module.exports = router;
