const db = require('../database')
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

module.exports={
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
    
    getAllPlaceBy: async(req,res,next)=>{
        const input = req.body.input;
        const order = req.body.order;
        const keyword = req.body.keyword;
        const coworking = req.body.coworking;
        const restaurant = req.body.restaurant;
        const cafe = req.body.cafe;
        try{
            if(coworking === 1 || cafe === 1||restaurant === 1){
                const [rows] = await db.query("select id, nama, alamat,lowprice,highprice,opentime,closetime, image from places WHERE coworking = ? and cafe=? andrestaurant = ?and nama LIKE '%"+ keyword+"or alamat LIKE '%"+ keyword+"%'" + "order by "+ input + " " + order, [coworking,cafe,restaurant])
                
                res.json({
                    "success" : "true",
                    "data" : rows
                })
            }else{
                const [rows] = await db.query("select id, nama alamat,lowprice,highprice,opentime,closetime, image from places WHERE nama LIKE '%"+ keyword+"%'" + "order by "+ input + " " + order)

                res.json({
                    "success" : "true",
                    "data" : rows
                })
            }
            
        }
        catch(err){
            console.log(err)
            next(err)
        }
    },
    getRecomended : async (req,res,next)=>{
        try{
            const [rows] = await db.query('select id, nama, rating, kuliner, alamat, image from places where recomended = 1')
            const [rows2] = await db.query('select id, nama, rating, kuliner, alamat, image from places where recomended = 0 order by rand()')
            res.json({
                "success" : "true",
                "data" : rows,
                "data2" : rows2
            })
        }
        catch(err){
            console.log(err)
            next(err)
        }
    },   
    
    getPlaceByid : async (req,res,next)=>{
        const id = req.params.id;
        const [rows] = await db.query('select * from places where id=?',[id])
        if(rows.length>0){
            res.json({
                "success" : true,
                "user" : rows[0]
            })
        }else{
            res.status(404)
            const error = new Error("Place Not Found")
            next(error)
        }

    },
    
}