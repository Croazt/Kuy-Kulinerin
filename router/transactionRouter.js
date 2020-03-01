const router = require('express').Router()
const transactionController = require('../controller/transactionController')

const { checkuser } = require('../middleware/')
const { checkadmin } = require('../middleware/')

router.post('/:id_places/reqmenu/:id_menu', checkuser, transactionController.createTrans)
router.delete('/:id_places/deletemenu/:id_transaction/:id_menu', checkuser, transactionController.deleteDetails)
router.post('/:id_places/accept/:id_transaction', checkuser, transactionController.acceptTransaction)
router.post('/:id_places/acceptSeller/:id_user/:id_transaction', checkadmin, transactionController.acceptTransactionSeller)
router.post('/:id_places/ready/:id_user/:id_transaction', checkadmin, transactionController.bookingReady)
router.post('/:id_places/cancel/:id_transaction', checkuser, transactionController.cancelTransaction)
router.get('/:id_places/done/:id_transaction', checkuser, transactionController.transactionsDone)
router.get('/:id/gettransaction', checkadmin, transactionController.getTransactionSeller)
module.exports = router
