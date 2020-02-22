const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')


module.exports = {

    regAdmin : async (req,res,next)=>{ 
        const nama = req.body.nama
        const email = req.body.email
        const phone = req.body.phone
        const username = req.body.username
        const isEmail = validator.isEmail(email)
        if(isEmail){
            const [rows] = await db.query('select * from users where email = ? or  username = ? or phone = ? limit 1',[email,username,phone])
            if(rows.length == 0){
                //daftar
                const password = req.body.password
                const role = 0;
                const hashedPassword = await bcrypt.hash(password, 11)
                db.query('insert into users(nama, email, password,phone,username,role) values ( ?, ?, ?, ?, ? ,?)',[nama,email,hashedPassword,phone,username,role])
                .then(()=>{
                    res.json({
                        "success" : true,
                        "message" : "Register success"
                    })
                })
                .catch((err)=>{
                    res.status(500)
                    res.json({
                        "success" : false,
                        "error" : err
                    })
                })
            }     
            else{
                res.status(409)
                const error = new Error("Email Already Registered")
                next(error)
            }
        }else{
            res.status(409)
            const error = new Error("Not a valid email")
            next(error)
        }
    }
}
