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
        const role_user = req.user.role
        const nama = req.body.nama;
        const location = req.body.location;
        const rating = req.body.rating;
        const coworking = req.body.coworking;
        const restaurant = req.body.restaurant;
        const cafe = req.body.cafe;
        const image = filename;
        const googlemap = req.body.googlemap;
        const lowprice =req.body.lowprice;
        const highprice =req.body.highprice;
        const opentime = req.body.opentime;
        const closetime = req.body.closetime;
        const description = req.body.description;
        const recomend = 0;
        const username = req.user.username
        console.log(username)
        if(role_user === 0){
            db.query(
                'insert into places( nama, location, rating, coworking, restaurant, cafe, image, googlemap, lowprice, highprice, opentime, closetime, description, recomended,id_users) value ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[nama,location,rating,coworking,restaurant,cafe,image,googlemap,lowprice,highprice,opentime,closetime,description,recomend,username])
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
        }else if(role_user === 2){
            const [rows] = await db.query('select * from places where id_users = ?',[username])
            if(rows.length === 0){
                db.query(
                    'insert into places( nama, location, rating, coworking, restaurant, cafe, image, googlemap, lowprice, highprice, opentime, closetime, description, recomended,id_users) value ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[nama,location,rating,coworking,restaurant,cafe,image,googlemap,lowprice,highprice,opentime,closetime,description,recomend,username])
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
            }
            else{
                res.status(403)
                const err = new Error("YOU CANNOT ADD MORE PLACE ANYMORE")
                next(err)
            }
        }
        
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
                const [rows] = await db.query("select id, nama, location,lowprice,highprice,opentime,closetime, image, rating from places WHERE coworking = ? and cafe= ? and restaurant = ? and nama LIKE '%"+ keyword+"%'"+ "or location LIKE '%"+ keyword+"%'" + "order by "+ input + " " + order, [coworking,cafe,restaurant])
                res.json({
                    "success" : "true",
                    "data" : rows
                })
            }else{
                const [rows] = await db.query("select id, nama location,lowprice,highprice,opentime,closetime, image, rating from places WHERE nama LIKE '%"+ keyword+"%'" + "order by "+ input + " " + order)

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
            const [rows] = await db.query('select id, nama, rating, location, image from places where recomended = 1')
            const [rows2] = await db.query('select id, nama, rating, location, image from places where recomended = 0 order by rand()')
            res.json({
                "success" : "true",
                "data" : rows,
                "data2" : rows2      
            })
        }
        catch(err){
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

    delPlaceByid : async (req,res,next)=>{
        const user_id = req.user.username
        const id = req.params.id;
        const role = req.user.role
        console.log(user_id)
        const [rows] = await db.query('select * from places where id = ?',[id])
        if(rows.length != 0){
            if(role === 0){
                db.query('delete from places where id = ? and id_users = ?',[id])
                .then(()=>{
                    res.json({
                        "success" : true,
                        "message" : "Place with id = "+ id +" has been deleted"
                    })
                })
                .catch((err)=>{
                    next(err)              
                })
            }else if(role === 2){
                if(id_users === user_id){
                    db.query('delete from places where id = ? and id_users = ?',[id,id_users])
                    .then(()=>{
                        res.json({
                            "success" : true,
                            "message" : "Place with id = "+ id +" and id_users = "+id_users+" has been deleted"
                        })
                    })
                    .catch((err)=>{
                        next(err)              
                    })
                }else{
                    res.status(403)
                    const error = new Error("You are not place owner")
                    next(error)       
                }
                
            }
    
        }else{
            res.status(404)
            const error = new Error("Place Not Found")
            next(error)
        }
    },

    ratePlace : async (req,res,next)=>{
        const {username} = req.user
        const id_places = req.params.id
        const rating = req.body.rating
        var [rows] = await db.query('select * from ratings where id_users = ? and id_places = ?',[username,id_places])
        if(rows.length !== 0){
            await db.query('update ratings set userRating = ? where id_users = ? and id_places = ?',[rating,username,id_places]);
            [rows] = await db.query('select AVG(userRating) as  avgRating from (select * from ratings where id_users = ? and id_places = ?) as lim group by userRating',[username,id_places,])
            db.query('update places set rating = ? where id = ?',[rows[0].avgRating,id_places])
            .then(()=>{
                res.status(201).json({
                    "success" : true,
                    "message" : `rating on place with id ${id_places} has updated to ${rows[0].avgRating}`
                })
            })
            .catch((err)=>{
                next(err)
            })
        }else{
            await db.query('insert into ratings(userRating,id_users,id_places) value (?,?,?)' ,[rating,username,id_places]);
            [rows] = await db.query('select AVG(userRating) as  avgRating from (select * from ratings where id_users = ? and id_places = ?) as lim group by userRating',[username,id_places,])
            db.query('update places set rating = ? where id = ?',[rows[0].avgRating,id_places])
            .then(()=>{
                res.status(201).json({
                    "success" : true,
                    "message" : `rating on place with id ${id_places} has updated to ${rows[0].avgRating}`
                })
            })
            .catch((err)=>{
                next(err)
            })
        }
    },

    commentPlace : async (req,res,next)=>{
        const {username} = req.user
        const id_places = req.params.id
        const comment = req.body.comment
            db.query('insert into comment(userComment,id_users,id_places) value (?,?,?)' ,[comment,username,id_places])
            .then(()=>{
                res.status(201).json({
                    "success" : true,
                    "message" : `You have posted a comment on place with id ${id_places}`
                })
            })
            .catch((err)=>{
                next(err)
            })
        }
}