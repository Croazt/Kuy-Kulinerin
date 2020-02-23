const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')

module.exports={
    upSeller : async (req, res, next) =>{
        const id_user = req.user.username
        const id = req.params.id
        console.log(id)
        if(id_user === id){
            const nama = req.body.nama
            const email = req.body.email
            const phon = req.body.phon
            const username = req.body.username
            const isEmail = validator.isEmail(email)
            
            var password = req.body.password
            const [rows] = await db.query('select * from users where username = ?',
            [id])
            console.log(rows)
            const isVerified = await bcrypt.compare(password, rows[0].password)
            console.log(isVerified)
            if(isVerified){
                if(isEmail){
                        db.query('update users set nama = ?, email = ?, phone= ?, username = ? where username = ?',[nama,email,phon,username,id_user])
                        .then(()=>{
                            res.status(202).json({
                                "success" : true,
                                "message" : "Update success"
                            })
                        })
                        .catch((err)=>{
                            res.status(500)
                            res.json({
                                "success" : false,
                                "error" : err
                            })
                        })
                }else{
                    res.status(409)
                    const error = new Error("Not a valid email")
                    next(error)
                }
            }else{
                res.status()
                const error = new Error("Password didn't match")
                next(error)
            }
        }else{
            res.status(410)
            const error = new Error("You are not recognized as " + id)
            next(error)
        }
        
    },
    
    regSeller : async (req,res,next)=>{ 
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
                const role = 2;
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
                const error = new Error("UserAlready Registered")
                next(error)
            }
        }else{
            res.status(409)
            const error = new Error("Not a valid email")
            next(error)
        }
    },
}
