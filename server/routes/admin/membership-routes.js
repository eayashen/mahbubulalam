const express = require('express');
const { handleImageUpload,
  addMembership,
  updateMembership,
  deleteMembership } = require('../../controllers/admin/membership-controller');
const { upload } = require('../../helper/cloudinary');

const router = express.Router();

router.post('/add-membership', addMembership);
router.put('/update-membership/:id', updateMembership);
router.delete('/delete-membership/:id', deleteMembership);
router.post('/upload-image', upload.single("image"), handleImageUpload);

module.exports = router;