const router = require('express').Router()
const sellerController = require('../controller/sellerController')
const { checkadmin } = require('../middleware/')
const {validateBody,schemas} = require('../helper/registerHelper')
router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/:id/updateSeller', checkadmin, validateBody(schemas.authSchema), sellerController.upSeller)
router.post('/registerSeller', validateBody(schemas.authSchema), sellerController.regSeller)

module.exports = router