const router = require('express').Router()
const transactionController = require('../controller/transactionController')

const { checkuser } = require('../middleware/')
const { checkadmin } = require('../middleware/')

router.post('/:id_places/reqmenu/:id_menu', checkuser, transactionController.createTrans)
router.post('/:id_places/accept/:id_transaction', checkuser, transactionController.acceptTransaction)
router.post('/:id_places/acceptSeller/:id_transaction', checkadmin, transactionController.acceptTransactionSeller)
router.post('/:id_places/cancel/:id_transaction', checkuser, transactionController.cancelTransaction)
module.exports = router
