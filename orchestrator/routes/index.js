const express = require('express')
const router = express.Router()

const { UsersRouter } = require('./users.route')
const { AuthRouter } = require('./auth.route')

router.get('/hello', (_, res) => {
  return res.send({ message: 'kecoa terbang di orchestrator '})
})

router.use('/users',UsersRouter)
router.use('/auth', AuthRouter)

module.exports = router