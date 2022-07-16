const express = require('express')
const router = express.Router()

const Controller = require('../controllers/index')

router.get('/hello', Controller.hello)

router.get('/', Controller.findOne) // bawa body.username
router.post('/', Controller.create) // bawa body
router.get('/list', Controller.find)
router.get('/:userId', Controller.findById) // bawa params.userId
router.put('/:userId', Controller.update) // bawa body and params.userId
router.delete('/:userId', Controller.delete) // bawa params.userId


module.exports = router