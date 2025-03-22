exports.handleMoodInput = (req, res, next) => {
    try {
      const { mood } = req.body;
  
      if (!mood || mood.trim() === '') {
        return res.status(400).json({ error: 'Mood is required.' });
      }
  
      res.json({ message: `You selected the mood: ${mood}` });
  
    } catch (error) {
      next(error);
    }
  };
  