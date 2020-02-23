const router = require('express').Router()  
const adminController = require('../controller/adminController')
const { checkadmin } = require('../middleware/')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/registerAdmin',checkadmin, adminController.regAdmin)
router.post('/deleteUser',checkadmin, adminController.deleteUsers)
module.exports = router
