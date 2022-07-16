const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth.controller')
const Middleware = require('../middlewares/index')

router.get('/hello', AuthController.hello)

router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshToken)

router.use(Middleware.authentication)

router.delete('/logout', AuthController.logout)


module.exports = { AuthRouter: router }