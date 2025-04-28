const pool = require('../services/db');

async function registerUser(req, res) {
  const { firebase_uid, email } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE firebase_uid = $1', [firebase_uid]);

    if (userResult.rows.length === 0) {
      await pool.query('INSERT INTO users (firebase_uid, email) VALUES ($1, $2)', [firebase_uid, email]);
      console.log(`New user inserted: ${email}`);
    } else {
      console.log(`User already exists: ${email}`);
    }

    res.status(200).json({ message: 'User check/insert complete' });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ error: 'Server error during user registration' });
  }
}

async function getAllUsers(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getOneUser(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getOneUser
};
