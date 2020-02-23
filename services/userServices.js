require('dotenv').config()
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const  ADMIN_KEY = process.env.ADMIN_KEY
const  SELLER_KEY = process.env.SELLER_KEY
const login = async (req,pass,res,next)=>{
    const user = req
    const password = pass
    const isVerified = await bcrypt.compare(password, user.password)
    if (isVerified) {
        var payload = {
            "id_user": user.id,
            "email": user.email,
            "username" : user.username,
        }
            var token;
            var admin = "YOU LOGIN AS USER"
        if(user.role === 1){
            token = await jwt.sign(payload, JWT_KEY)
        }else if(user.role === 0 || user.role === 2){
            token = await jwt.sign(payload = {
                "id_user": user.id,
                "email": user.email,
                "username" : user.username,
                "role" : user.role,
                "superadmin" : user.superadmin
            }, ADMIN_KEY)

            if(user.role === 0){
                admin = "YOU LOGIN AS ADMIN"
            }else if(user.role === 2){
                admin = "YOU LOGIN AS SELLER"
            }
            
        }else{
            console.log("wrong token")
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