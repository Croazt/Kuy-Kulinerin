const db = require('../database')
const bcrypt = require('bcryptjs')
const {validateBodyGoogle,schemas} = require('../helper/registerHelper')
const login = require('../services/userServices')

module.exports={
    signInGoogle : async (req,res,next)=>{
        if(!req.user[0].username){
            console.log(req.user)
            const {username,password,phone} = req.body
            const role = 1;
            const hashedPassword = await bcrypt.hash(password, 11)
            db.query('update users set  password = ?, username = ?, role = ?,phone = ? where google_id = ?',[hashedPassword,username,role,phone, req.user[0].google_id])
            .then(async ()=>{
                const [rows] = await db.query('select * from users where username = ?',[username])
                login.login(rows[0],password,res,next)
            })
        .   catch((err)=>{
                res.status(500)
                next(err)
            })
        }else{
            const [rows] = await db.query('select * from users where username = ?',[req.user[0].username])
            console.log(rows[0])
            login.login2(rows[0],res,next)
        }
        
    }
}