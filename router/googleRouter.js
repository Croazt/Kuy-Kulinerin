// const router = require('express').Router()
// const googleController = require('../controller/googleController')

// const { checkuser } = require('../middleware/')
// const { checkadmin } = require('../middleware/')

// module.exports = router

const nodemailer = require('nodemailer')
require('dotenv').config()
//step 1
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

let mailOptions = {
    from : 'inc.kuykulinern@gmail.com',
    to: 'fachry.croazt@gmail.com',
    subject : 'testing',
    text : 'itworks'
}

transporter.sendMail(mailOptions, function(err,data){
    if(err){
        console.log('err')
    }else{
        console.log('hmm')
    }
})