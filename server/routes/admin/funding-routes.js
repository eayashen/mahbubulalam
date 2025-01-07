const express = require("express");
const { addFunding, fetchAllFundings, updateFunding, deleteFunding } = require("../../controllers/admin/funding-controller");

const router = express.Router();

router.post("/add-funding", addFunding);
router.get("/get-fundings", fetchAllFundings);
router.put("/update-funding/:id", updateFunding);
router.delete("/delete-funding/:id", deleteFunding);

module.exports = router;