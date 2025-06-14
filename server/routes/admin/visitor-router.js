const express = require('express');
const { addVisitor, fetchVisitors } = require('../../controllers/admin/visitor-controller');
const router = express.Router();

router.post('/add', addVisitor);
router.get('/count', fetchVisitors);

module.exports = router;