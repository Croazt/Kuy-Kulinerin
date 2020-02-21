const controller = require('../controller/ImageController')
const router = require('express').Router()

router.post('/upload', controller.upload.single('photo'), controller.uploadFile)
router.get('/:url', controller.getFile)

module.exports = router
