const express = require('express');
const summaryController = require('../controllers/summaryController');

const router = express.Router();

router.post('/', summaryController.summarizeAndSend);

module.exports = router;
