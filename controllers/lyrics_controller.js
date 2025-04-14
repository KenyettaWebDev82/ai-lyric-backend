const { generateLyricsFromMood } = require("../services/gemini.services")
const db = require("../db")

exports.handleMoodInput = async (req, res, next) => {
  try {
    const { mood, genre, singingMode } = req.body

    if (!mood || !genre) {
      return res.status(400).json({ error: "Mood and Genre are required." })
    }

    const lyrics = await generateLyricsFromMood(mood, genre, singingMode)
    res.json({ mood, genre, singingMode, lyrics })
  } catch (error) {
    next(error)
  }
}

exports.saveLyrics = async (req, res, next) => {
  try {
    const { user_id, title, content, mood, genre } = req.body

    if (!user_id || !title || !content || !mood || !genre) {
      return res.status(400).json({ error: "All fields are required." })
    }

    const result = await db.query(
      'INSERT INTO lyrics (user_id, title, content, mood, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, title, content, mood, genre]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

exports.getLyrics = async (req, res, next) => {
  try {
    const { user_id } = req.params

    const result = await db.query(
      'SELECT * FROM lyrics WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    )

    res.status(200).json(result.rows)
  } catch (error) {
    next(error)
  }
}

exports.getOneLyricByName = async (req, res, next) => {
  try {
    const { user_id, title } = req.params

    const result = await db.query(
      'SELECT * FROM lyrics WHERE user_id = $1 AND title = $2',
      [user_id, title]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Lyric not found." })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

exports.deleteLyrics = async (req, res, next) => {
  try {
    const { id } = req.params

    const result = await db.query('DELETE FROM lyrics WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Lyric not found to delete." })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

