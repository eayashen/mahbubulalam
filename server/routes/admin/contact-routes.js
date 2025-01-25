const express = require('express');
const { getContact, upsertContact } = require('../../controllers/admin/contact-controller');

const router = express.Router();

router.get('/get-contact', getContact);
router.post('/upsert-contact', upsertContact);

module.exports = router;