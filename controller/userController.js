require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const  ADMIN_KEY = process.env.ADMIN_KEY
const login = require('../services/userServices')

const regUser = async (req,res,next)=>{
    const {email,password,phone,username,nama} = req.value.body
        const [rows] = await db.query('select * from users where email = ? or  username = ? or phone = ? limit 1',[email,username,phone])
        if(rows.length == 0){
            //daftar
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
                res.status(500).json({
                    "success" : false,
                    "error" : err
                })
            })
        }     
        else{
            res.status(409)
            const error = new Error("User Already Registered")
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
    }else{
        res.status(406)
        const error = new Error("Please input valid email or username")
        next(error)
    }
}


const upUser = async (req, res, next) =>{
    const [rows] = await db.query('select * from users where username = ?',
    [req.params.id])
    if(rows.length != 0){
        const id_user = req.user.username
    if(id_user === req.params.id){
        const {email,password,phone,username,nama} = req.value.body
        console.log(rows)
            const isVerified = await bcrypt.compare(password, rows[0].password)
            if(isVerified){
             db.query('update users set nama = ?, email = ?, phone= ?, username = ? where username = ?',[nama,email,phone,username,id_user])
                .then(()=>{
                    res.status(202).json({
                        "success" : true,
                        "message" : "Update success"
                        })
                    })
                    .catch((err)=>{
                        res.status(500).json({
                            "success" : false,
                            "error" : err
                        })
                    })
            }else{
                res.status()
                const error = new Error("Password didn't match")
                next(error)
            }
    }else{
        res.status(410)
        const error = new Error("You are not recognized as " + req.params.id)
        next(error)
    }
    }else{
        res.status()
        const error = new Error("User not Found")
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

const delUser = async (req,res,next)=>{
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
    reqUser,
    delUser
}

module.exports = userController