const router = require('express').Router()
const transactionController = require('../controller/transactionController')

const { checkuser } = require('../middleware/')

router.post('/:id_places/reqmenu/:id_menu', checkuser, transactionController.createTrans)

module.exports = router
