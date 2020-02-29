const express = require('express')
const router = require('express-promise-router')()
const oAuthController = require('../controller/oAuthController')
const passport = require('passport')
const { checkuser } = require('../middleware/')
const { checkadmin } = require('../middleware/')
const {validateBodyGoogle,schemas} = require('../helper/registerHelper')
const passportConf = require('../passport')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.post('/oAuth/google',passport.authenticate('googleToken',{session:false}),oAuthController.signInGoogle)

module.exports = router