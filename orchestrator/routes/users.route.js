const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users.controller')
const Middleware = require('../middlewares/index')

router.get('/hello', UsersController.hello)

router.post('/', UsersController.register)

router.use(Middleware.authentication)

router.get('/profile', UsersController.getMyProfile)

router.use(Middleware.adminAuthorization)

router.get('/', UsersController.getUsers)
router.get('/:userId', UsersController.getUser)
router.put('/:userId', UsersController.editUser)
router.delete('/:userId', UsersController.deleteUser)


module.exports = { UsersRouter: router }