const express = require('express');
const { handleImageUpload,
  addNewsOrEvent,
  getNewsAndEvents,
  updateNewsOrEvent,
  deleteNewsOrEvent, } = require('../../controllers/admin/news-and-events-controller');
const { upload } = require('../../helper/cloudinary');

const router = express.Router();

router.post('/add-news-event', addNewsOrEvent);
router.get('/get-news-events', getNewsAndEvents);
router.put('/update-news-event/:id', updateNewsOrEvent);
router.delete('/delete-news-event/:id', deleteNewsOrEvent);
router.post('/upload-image', upload.single("image"), handleImageUpload);

module.exports = router;