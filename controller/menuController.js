const db = require('../database')

module.exports={
    createMenu : async(req,res,next)=>{
        const place_id = req.params.id_place
        console.log(place_id)
        const nama = req.body.nama
        const harga = req.body.harga
        const username = req.user.username
        const [rows] = await db.query('select * from menus where id_places = ?',[place_id])
        if(rows.length != 0){
        db.query('insert into menus(id_places,nama,price,id_user) values(?,?,?,?)',[place_id,nama,harga,username])
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
        }else{
            res.status(404).json({
                "success" : false,
                "message" : "place not found"
            })
            
        }
        
        
    },
    
    updateMenu : async(req,res,next)=>{
        const id_place = req.params.id_place
        const id = req.params.id
        const nama = req.body.nama
        const harga = req.body.harga
        var [rows] = await db.query('select * from menus where id_places = ? and id=?',[id_place,id])
        if(rows.length != 0){
        db.query('update menus SET nama = ?, price = ?   where id_places = ? and id = ?',[nama,harga,id_place,id])
        .then(()=>{
            res.json({
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
        res.status(404).json({
            "success" : false,
            "message" : "menu not found"
        })
        
    }
    },

    getAllMenu: async (req,res,next)=>{
        const id_place = req.params.id_place
        var input = req.body.input
        if(!input){
            input = "id"
        }else{
            input = input
        }
        try{
            const [rows] = await db.query('select id, nama, price from menus where id_places = ? order by '+ input ,[id_place])
            res.json({
                "success" : true,
                "data" : rows
            })
        }
        catch(err){
            next(err)
        }
    },

}