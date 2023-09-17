const express = require('express')
const router = express.Router()

const offer_projectController = require('../controller/offer_projectController')

router.post('/add',offer_projectController.add)

module.exports = router