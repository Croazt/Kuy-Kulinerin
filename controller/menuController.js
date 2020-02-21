const db = require('../database')

module.exports={
    createMenu : async(req,res,next)=>{
        const place_id = req.params.id_place
        const nama = req.body.nama
        const harga = req.body.harga
        db.query('insert into transactions(id_places,nama,harga) values(?,?,?)',[place_id,nama,harga])
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
    },
    updateMenu : async(req,res,next)=>{
        const id_place = req.params.id_place
        const id = req.params.id
        const nama = req.body.nama
        const harga = req.body.harga
        db.query('update transactions SET nama = ?, harga = ?   where id_places = ? and id = ?',[nama,harga,id_place,id])
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
            const [rows] = await db.query('select id, nama, harga from transactions where id_places = ? order by '+ input ,[id_place])
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