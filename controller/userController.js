require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const  ADMIN_KEY = process.env.ADMIN_KEY
const login = require('../services/userServices')

const regUser = async (req,res,next)=>{ 
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
            const role = 1;
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



const loginUser = async (req, res, next) =>{
    const email = req.body.email
    const username = req.body.username
    const [rows] = await db.query('select * from users where email = ? or username = ?',
    [email,username])
    if(rows.length != 0){
        const password = req.body.password
        login.login(rows[0],password,res,next)
    }else if(rows.username||rows.email){
        res.status(409)
        const error = new Error("You seems not registered yet")
        next(error)
    }else if(username==null||email==null){
        res.status(406)
        const error = new Error("Please input valid email or username")
        next(error)
    }
}


const upUser = async (req, res, next) =>{
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
        if(isVerified){1
            if(isEmail){
                    db.query('update users set nama = ?, email = ?, phone= ?, username = ?',[nama,email,phon,username])
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
    
}

const reqUser = async (req,res,next)=>{
    const id = req.params.id;
    const [rows] = await db.query('select id,nama,username, email,phone from users where username = ?',[id]);
    if(rows.length>0){
        res.json({
            'success' : true,
            'users' : rows[0]
        })
    }else{
        res.status(404);
        const error = new error("user not found");
        next(error);
    }

}

const userController = {
    regUser,
    loginUser,
    upUser,
    reqUser
}

module.exports = userController