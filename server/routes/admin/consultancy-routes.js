const express = require('express');
const { addConsultancy, getConsultancies, updateConsultancy, deleteConsultancy, handleImageUpload } = require('../../controllers/admin/consultancy-controller');
const { upload } = require('../../helper/cloudinary');

const router = express.Router();

router.post('/add-consultancy', addConsultancy);
router.get('/get-consultancies', getConsultancies);
router.put('/update-consultancy/:id', updateConsultancy);
router.delete('/delete-consultancy/:id', deleteConsultancy);
router.post('/upload-image', upload.single("image"), handleImageUpload);

module.exports = router;