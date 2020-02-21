require('dotenv').config()
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const  ADMIN_KEY = process.env.ADMIN_KEY

const login = async (req,pass,res,next)=>{
    const user = req
    console.log(user)
    const password = pass
    const isVerified = await bcrypt.compare(password, user.password)
    if (isVerified) {
        const payload = {
            "id_user": user.id,
            "email": user.email,
            "username" : user.username
        }
            var token;
            var admin = "YOU LOGIN AS USER"
        if(user.role === 1){
            token = await jwt.sign(payload, JWT_KEY)
        }else{
            token = await jwt.sign(payload, ADMIN_KEY)
            admin = "YOU LOGIN AS ADMIN"
        }
        
        if (token) {
            res.status(202).json({
                "success": true,
                "token": token,
                "message" : admin
            })
        } else {
            res.status(406)
            const error = new Error("JWT Error, cant create token")
            next(error)
        }
    }
    else {
        res.status(412)
        const error = new Error("Wrong password")
        next(error)
    }
}

const userServices={
    login

} 
module.exports = userServices