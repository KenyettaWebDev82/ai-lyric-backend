const express = require('express');
const { getAllUsers, getOneUser, registerUser  } = require('../controllers/users_controller')

const router = express.Router()

router.post('/register', registerUser);
router.get('/', getAllUsers)
router.get('/:id', getOneUser)


module.exports = router
