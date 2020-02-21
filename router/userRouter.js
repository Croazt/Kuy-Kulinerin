const router = require('express').Router()
const userController = require('../controller/userController')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})
router.post('/register', userController.regUser)
router.post('/login', userController.loginUser)
router.post('/:id/update', userController.upUser)
router.get('/:id', userController.reqUser)
module.exports = router