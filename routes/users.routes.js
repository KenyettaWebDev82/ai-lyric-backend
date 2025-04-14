const express = require('express');
const { getAllUsers, getOneUser } = require('../controllers/users_controller')

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getOneUser)

module.exports = router
