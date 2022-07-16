const express = require('express')
const router = express.Router()

const Controller = require('../controllers/index')

router.get('/hello', Controller.hello)

router.post('/', Controller.upsert) // bawa body
router.get('/', Controller.findOne) // bawa body
router.delete('/', Controller.delete) // bawa body


module.exports = router