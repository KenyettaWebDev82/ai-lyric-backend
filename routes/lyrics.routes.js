const express = require('express');
const { 
  handleMoodInput, 
  saveLyrics, 
  getLyrics, 
  getOneLyricByName, 
  deleteLyrics 
} = require('../controllers/lyrics_controller');

const router = express.Router();

router.get('/user/:firebase_uid/title/:title', getOneLyricByName);
router.get('/user/:firebase_uid', getLyrics); 

router.post('/', handleMoodInput)
router.post('/save', saveLyrics)
router.delete('/:id', deleteLyrics);

module.exports = router
