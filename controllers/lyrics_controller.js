exports.handleMoodInput = async (req, res, next) => {
  try {
    const { mood, genre } = req.body;

    if (!mood || !genre) {
      return res.status(400).json({ error: 'Mood and Genre are required.' });
    }

    const lyrics = await generateLyricsFromMood(mood, genre);
    res.json({ mood, genre, lyrics });

  } catch (error) {
    next(error);
  }
};
