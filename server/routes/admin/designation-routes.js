const express = require("express");
const {
  addDesignation,
  fetchAllDesignations,
  updateDesignation,
  deleteDesignation,
} = require("../../controllers/admin/designation-controller");

const router = express.Router();

router.post("/", addDesignation);
router.get("/", fetchAllDesignations);
router.put("/:id", updateDesignation);
router.delete("/:id", deleteDesignation);

module.exports = router;
