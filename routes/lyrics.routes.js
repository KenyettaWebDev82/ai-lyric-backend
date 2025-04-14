const express = require('express');
const { 
  handleMoodInput, 
  saveLyrics, 
  getLyrics, 
  getOneLyricByName, 
  deleteLyrics 
} = require('../controllers/lyrics_controller');

const router = express.Router();

router.post('/', handleMoodInput)
router.post('/save', saveLyrics)
router.get('/user/:user_id', getLyrics)
router.get('/user/:user_id/title/:title', getOneLyricByName)
router.delete('/:id', deleteLyrics)

module.exports = router
