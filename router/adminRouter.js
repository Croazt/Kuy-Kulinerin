const router = require('express').Router()  
const adminController = require('../controller/adminController')
const { checkadmin } = require('../middleware/')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/createplace', checkadmin, adminController.upload.single('myFile'), adminController.createPlace)
router.post('/registerAdmin',checkadmin, adminController.regAdmin)
module.exports = router
