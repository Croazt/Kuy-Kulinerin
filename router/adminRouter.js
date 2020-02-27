const router = require('express').Router()  
const adminController = require('../controller/adminController')
const { checkadmin } = require('../middleware/')
const {validateBody,schemas} = require('../helper/registerHelper')
router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/registerAdmin',checkadmin, validateBody(schemas.authSchema), adminController.regAdmin)
router.post('/deleteUser',checkadmin, adminController.deleteUsers)
module.exports = router
