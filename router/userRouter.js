const router = require('express').Router()
const userController = require('../controller/userController')
const { checkuser } = require('../middleware/')
const { checkadmin } = require('../middleware/')
router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})
router.post('/register', userController.regUser)
router.post('/login', userController.loginUser)
router.post('/:id/update', checkuser, userController.upUser)
router.get('/:id', userController.reqUser)
router.delete('/:id/delete', checkuser, userController.delUser)

module.exports = router