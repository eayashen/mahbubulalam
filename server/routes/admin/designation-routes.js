const express = require('express');
const { upsertDesignation, getDesignations } = require('../../controllers/admin/designation-controller');

const router = express.Router();

router.post('/upsert-designation', upsertDesignation);
router.get('/get-designations', getDesignations);

module.exports = router;