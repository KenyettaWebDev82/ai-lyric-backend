const express = require('express');
const router = express.Router();
const { handleMoodInput } = require('../controllers/lyrics.controller');

router.post('/', handleMoodInput);

module.exports = router;
