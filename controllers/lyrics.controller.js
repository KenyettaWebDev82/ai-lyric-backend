const { generateLyricsFromMood } = require('../services/gemini.services');

exports.handleMoodInput = async (req, res, next) => {
  try {
    const { mood } = req.body;

    if (!mood || mood.trim() === '') {
      return res.status(400).json({ error: 'Mood is required.' });
    }

    const lyrics = await generateLyricsFromMood(mood);
    res.json({ mood, lyrics });

  } catch (error) {
    next(error);
  }
};
