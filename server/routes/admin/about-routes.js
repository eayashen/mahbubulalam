const express = require('express');
const { upsertUserAbout, getUserAbout, handleProPicUpload, handleBannerUpload, handleCvUpload, deleteBannerImage, getHomePageData } = require('../../controllers/admin/about-controller');
const { upload } = require('../../helper/cloudinary');

const router = express.Router();

router.post('/upsert-user-about', upsertUserAbout);
router.get('/get-user-about', getUserAbout);
router.get('/get-home-page-data', getHomePageData);
router.post('/upload-pro-pic', upload.single("image"), handleProPicUpload);
router.post('/upload-banner', upload.single("image"), handleBannerUpload);
router.post('/delete-banner-image', deleteBannerImage);
router.post('/upload-cv', upload.single("cv"), handleCvUpload);

module.exports = router;