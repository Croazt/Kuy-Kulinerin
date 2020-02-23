const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')


module.exports = {

    regAdmin : async (req,res,next)=>{ 
        console.log("masook")
        const nama = req.body.nama
        const email = req.body.email
        const phone = req.body.phone
        const username = req.body.username
        const isEmail = validator.isEmail(email)
        if(isEmail){
            const [rows] = await db.query('select * from users where email = ? or  username = ? or phone = ? limit 1',[email,username,phone])
            if(rows.length == 0){
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
    },

    deleteUsers :  async (req,res,next)=>{
        const username = req.body.username;
        const superadmin = req.user.superadmin;
        const role = req.user.role;
        const users = req.user.username;
        const email = req.body.email;
        const phone = req.body.phone;
        
        const [rows] = await db.query('select id, nama, email, username, phone, role from users where username = ? and email = ? and phone = ?',[username, email, phone])
        console.log(superadmin)
        console.log(role)
        console.log(users)
        console.log(username)
        console.log(rows)
        if(rows.length != 0){
            if(superadmin === 0 && role === 0 && rows[0].role === 0||role === 2||role===1){
                res.status(401)
                const error = new Error("You have no right to do that")
                next(error)
            }else if (role === 0 && username === users){
                res.status(403)
                const error = new Error("You cannot delete yourself")
                next(error)
            }else if(rows[0].superadmin === 0 && role === 0 && rows[0].role!=0 || superadmin === 1){
                db.query('delete from places where id_users = ?',[username])
                .then(()=>{

                })
                .catch(()=>{
                    
                })
                db.query('delete from users where email = ? and phone = ? and username = ?',[email,phone,username])
                .then(()=>{
                    res.status(202).json({
                        "Success" : true,
                        "Message" : "Delete users success"
                    })
                })
                .catch((err)=>{
                    const error = new Error("Something wrong")
                    next(err)
                })
            }
        }else{
            res.status(404)
            const err = new Error("No user found");
            next(err)
        }
    }
}
