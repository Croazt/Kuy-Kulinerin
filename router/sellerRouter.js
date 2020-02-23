const router = require('express').Router()
const sellerController = require('../controller/sellerController')
const { checkadmin } = require('../middleware/')
router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/:id/updateSeller', checkadmin, sellerController.upSeller)
router.post('/registerSeller', sellerController.regSeller)

module.exports = router