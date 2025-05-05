const express = require('express');
const { addResearch, fetchAllResearch, fetchAllPublications, editResearch, deleteResearch } = require('../../controllers/admin/research-controller');

const router = express.Router();

router.post('/add', addResearch);
router.get('/all', fetchAllResearch);
router.get('/publications', fetchAllPublications);
router.put('/edit/:id', editResearch);
router.delete('/delete/:id', deleteResearch);

module.exports = router;