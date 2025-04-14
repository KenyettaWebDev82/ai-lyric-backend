const db = require('../db')

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (error) {
    next(error)
  }
}

exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}
