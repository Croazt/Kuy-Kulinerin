const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");

const diskStorage = multer.diskStorage({
  destination: "./resource/image",
  filename: function (req, file, cb) {
    const randomPart = randomstring.generate(8); // use whatever random you want.
    const extension = file.mimetype.split('/')[1];
    cb(null, 'PlaceImage-'+ randomPart + `.${extension}`)
  }
});

module.exports = {
    upload: multer({ storage: diskStorage }),
    createPlace: async(req,res,next)=>{
        if (req.file) {
            console.log('Uploading file...');
            var filename = req.file.filename;
            var uploadStatus = 'File Uploaded Successfully';
        } else {
            console.log('No File Uploaded');
            var filename = 'FILE NOT UPLOADED';
            var uploadStatus = 'File Upload Failed';
        }
        
        const nama = req.body.nama;
        const location = req.body.location;
        const rating = req.body.rating;
        const coworking = req.body.coworking;
        const restaurant = req.body.restaurant;
        const cafe = req.body.cafe;
        const image = "resource/image/"+filename;
        const googlemap = req.body.googlemap;
        const lowprice =req.body.lowprice;
        const highprice =req.body.highprice;
        const opentime = req.body.opentime;
        const closetime = req.body.closetime;
        const description = req.body.description;
        const alamat = req.body.alamat;
        const recomend = 0;
        db.query(
            'insert into places( nama, location, rating, coworking, restaurant, cafe, image, googlemap,lowprice,highprice,opentime,closetime,description,alamat) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nama,location,rating,coworking,restaurant,cafe,image,googlemap,lowprice,highprice,opentime,closetime,description,alamat,recomend])
        .then(()=>{
            res.json({
                "success" : "true",
                "message" : "berhasil upload",
                status: uploadStatus, 
                filename: `Name Of File: ${filename}` 
            })
        }).catch((err)=>{
            console.log(err)
            next(err)
        })
    },

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
