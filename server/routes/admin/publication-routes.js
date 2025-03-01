const express = require("express");
const {
  addPublication,
  fetchAllPublicationsByCategory,
  editPublication,
  deletePublication,
  fetchAllPublications
} = require("../../controllers/admin/publication-controller");

const router = express.Router();

router.post("/add", addPublication);
router.get("/:category", fetchAllPublicationsByCategory);
router.get("/", fetchAllPublications);
router.put("/edit/:id", editPublication);
router.delete("/delete/:id", deletePublication);

module.exports = router;
