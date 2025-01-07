const express = require("express");
const {
  addPublication,
  fetchAllPublicationsByResearch,
  fetchAllPublicationsByCategory,
  editPublication,
  deletePublication,
} = require("../../controllers/admin/publication-controller");

const router = express.Router();

router.post("/add", addPublication);
router.get("/fetch/:research_id", fetchAllPublicationsByResearch);
router.get("/fetch/category/:category", fetchAllPublicationsByCategory);
router.put("/edit/:id", editPublication);
router.delete("/delete/:id", deletePublication);

module.exports = router;
