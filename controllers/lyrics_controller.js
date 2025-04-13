const { generateLyricsFromMood } = require('../services/gemini.services');

exports.handleMoodInput = async (req, res, next) => {
  try {
    const { mood, genre, singingMode } = req.body;

    if (!mood || !genre) {
      return res.status(400).json({ error: 'Mood and Genre are required.' });
    }

    const lyrics = await generateLyricsFromMood(mood, genre, singingMode); // Pass it to the service

    res.json({ mood, genre, singingMode, lyrics });

  } catch (error) {
    next(error);
  }
};
