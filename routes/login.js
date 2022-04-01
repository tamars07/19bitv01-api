//receive all login, logout, register request
const express = require('express')

const {registerView, loginView} = require('../controllers/LoginController')

const router = express.Router()

router.get('/register',registerView)
router.get('/login',loginView)

module.exports = router