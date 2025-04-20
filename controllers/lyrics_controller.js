const { generateLyricsFromMood } = require("../services/gemini.services");
const db = require("../db");

// POST /api/lyrics/generate — AI Lyrics Generator
exports.handleMoodInput = async (req, res, next) => {
  try {
    const { mood, genre, singingMode } = req.body;

    if (!mood || !genre) {
      return res.status(400).json({ error: "Mood and Genre are required." });
    }

    const lyrics = await generateLyricsFromMood(mood, genre, singingMode);
    res.json({ mood, genre, singingMode, lyrics });
  } catch (error) {
    next(error);
  }
};

// POST /api/lyrics — Save Lyric
exports.saveLyrics = async (req, res, next) => {
  try {
    const { firebase_uid, title, content, mood, genre } = req.body;

    console.log("📝 Incoming SAVE request:", req.body); // ✅ log request

    if (!firebase_uid || !title || !content || !mood || !genre) {
      console.warn("⚠️ Missing required fields in saveLyrics");
      return res.status(400).json({ error: "All fields are required." });
    }

    const userResult = await db.query(
      "SELECT id FROM users WHERE firebase_uid = $1",
      [firebase_uid]
    );

    console.log("🧑 User lookup result:", userResult.rows); // ✅ log user lookup

    if (userResult.rows.length === 0) {
      console.warn("⚠️ User not found in saveLyrics");
      return res.status(404).json({ error: "User not found." });
    }

    const user_id = userResult.rows[0].id;

    const result = await db.query(
      `INSERT INTO lyrics (user_id, title, content, mood, genre)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, title, content, mood, genre]
    );

    console.log("✅ Lyric saved:", result.rows[0]); // ✅ log saved result

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ saveLyrics error:", error); // ✅ catch and log full error
    res.status(500).json({ error: "Something went wrong on the server." });
  }
};


// GET /api/lyrics/:firebase_uid — Get All Lyrics for User
exports.getLyrics = async (req, res, next) => {
  try {
    const { firebase_uid } = req.params;

    const userResult = await db.query(
      "SELECT id FROM users WHERE firebase_uid = $1",
      [firebase_uid]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user_id = userResult.rows[0].id;

    const result = await db.query(
      "SELECT * FROM lyrics WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/lyrics/:firebase_uid/:title — Get One Lyric by Title
exports.getOneLyricByName = async (req, res, next) => {
  try {
    const { firebase_uid, title } = req.params;

    const userResult = await db.query(
      "SELECT id FROM users WHERE firebase_uid = $1",
      [firebase_uid]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user_id = userResult.rows[0].id;

    const result = await db.query(
      "SELECT * FROM lyrics WHERE user_id = $1 AND title = $2",
      [user_id, title]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Lyric not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/lyrics/:id — Delete Lyric
exports.deleteLyrics = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM lyrics WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Lyric not found to delete." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
