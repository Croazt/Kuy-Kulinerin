const router = require('express').Router()
const imageController = require('../controller/imageController')

router.get('/place/:id', imageController.getFile)

module.exports = router
