const express = require('express');
const { upsertUserAbout, getUserAbout, handleProPicUpload, handleBannerUpload } = require('../../controllers/admin/about-controller');

const router = express.Router();

router.post('/upsert-user-about', upsertUserAbout);
router.get('/get-user-about', getUserAbout);
router.post('/upload-pro-pic', handleProPicUpload);
router.post('/upload-banner', handleBannerUpload);

module.exports = router;