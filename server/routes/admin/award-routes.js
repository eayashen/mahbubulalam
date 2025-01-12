const express = require('express');
const { addAward, getAwards, updateAward, deleteAward, handleImageUpload } = require('../../controllers/admin/award-controller');
const { upload } = require('../../helper/cloudinary');

const router = express.Router();

router.post('/add-award', addAward);
router.get('/get-awards', getAwards);
router.put('/update-award/:id', updateAward);
router.delete('/delete-award/:id', deleteAward);
router.post('/upload-image', upload.single("image"), handleImageUpload);

module.exports = router;