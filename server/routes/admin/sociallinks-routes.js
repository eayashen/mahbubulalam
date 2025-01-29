const express = require('express');
const { getSocialLinks, upsertSocialLinks } = require('../../controllers/admin/sociallinks-controller');

const router = express.Router();

router.get('/get-social-links', getSocialLinks);
router.post('/upsert-social-links', upsertSocialLinks);

module.exports = router;