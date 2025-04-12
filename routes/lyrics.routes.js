const express = require('express');
const { handleMoodInput } = require('../controllers/lyrics_controller');

const router = express.Router();

router.post('/', handleMoodInput);

module.exports = router;
