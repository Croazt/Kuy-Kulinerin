const nodemailer = require('nodemailer')
require('dotenv').config()




const sendEmail = async (req,email,res,next)=>{
    console.log(req,email)
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    
    let mailOptions = {
        from : 'inc.kuykulinern@gmail.com',
        to: email,
        subject : "Email Verification" ,
        text : 'itworks',
        html : '<p>Click <a href="'+req+'">here</a> to verify your email</p><p>Your token will expired in 2 days<p>'
    }
    
    transporter.sendMail(mailOptions, function(err,data){
        if(err){
            next(err)
        }else{
            next()
        }
    })
}

module.exports={
    sendEmail
}