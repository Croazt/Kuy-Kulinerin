const db = require('../database')

module.exports={

    
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