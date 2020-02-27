const router = require('express').Router()
const userController = require('../controller/userController')
const { checkuser } = require('../middleware/')
const { checkadmin } = require('../middleware/')
const {validateBody,schemas} = require('../helper/registerHelper')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/register', validateBody(schemas.authSchema), userController.regUser)
router.post('/login', userController.loginUser)
router.post('/:id/update', checkuser,validateBody(schemas.authSchema), userController.upUser)
router.get('/:id', userController.reqUser)
router.delete('/:id/delete', checkuser, userController.delUser)

module.exports = router