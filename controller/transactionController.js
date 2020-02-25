const db = require('../database')

module.exports={
    createTrans : async (req,res,next)=>{
        console.log("rows.length")
        const id_places = req.params.id_places
        const id_menu = req.params.id_menu
        const id = req.user.username
        const booking = req.body.booking
        var [rows] = await db.query('select * from transactions where id_users = ? and id_places = ?',[id,id_places])
        console.log(rows.length)
        if(rows.length === 0){
            var [rows2] = await db.query('select * from menus where id_places = ? and id = ?',[id_places,id_menu])
            if(rows2.length != 0){
                await db.query('insert into transactions(id_users,id_places,booking) values(?,?,?)',[id,id_places,booking])
                var [rows] = await db.query('select * from transactions where id_users = ? and id_places = ?', [id,id_places])
                console.log(rows2[0].nama)
                console.log(rows2[0])
                await db.query('insert into details(id_transaction,id_users,id_places,id_menu,price,namamenu) values(?,?,?,?,?,?)',[rows[0].id,id,id_places,id_menu,rows2[0].price,rows2[0].nama])
                db.query('update details set jumlah = jumlah + 1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                var [sum] = await db.query('select SUM(totalPrice) as totalPrice from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                await db.query('update transactions set price = ? where id_users = ? and id_places = ?',[sum[0].totalPrice,id,id_places])
                .then(()=>{
                    res.json({
                        "success" : true,
                        "message" : "Add success"
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
                res.status(404)
                const err = new Error("No menus found")
            }
        }else{
            var [rows2] = await db.query('select * from menus where id_places = ? and id = ?',[id_places,id_menu])
            if(rows2.length != 0){
                var [rows] = await db.query('select * from transactions where id_users = ? and id_places = ?', [id,id_places])
                var [rows3] = await db.query('select * from details where id_transaction = ? and id_places = ? and id_menu = ?',[rows[0].id,id_places,id_menu])
                if(rows3.length === 0){
                    await db.query('insert into details(id_transaction,id_users,id_places,id_menu,price,namamenu) values(?,?,?,?,?,?)',[rows[0].id,id,id_places,id_menu,rows2[0].price,rows2[0].nama])
                    db.query('update details set jumlah = jumlah + 1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    var [sum] = await db.query('select SUM(totalPrice) as totalPrice from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    await db.query('update transactions set price = ? where id_users = ? and id_places = ?',[sum[0].totalPrice,id,id_places])
                    .then(()=>{
                        
                        res.json({
                            "success" : true,
                            "message" : "Add success"
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
                    db.query('update details set jumlah = jumlah + 1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    var [sum] = await db.query('select SUM(totalPrice) as totalPrice from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    await db.query('update transactions set price = ? where id_users = ? and id_places = ?',[sum[0].totalPrice,id,id_places])
                    .then(()=>{
                        res.json({
                            "success" : true,
                            "message" : "Add success"
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
            }else{
                res.status(404)
                const err = new Error("No menus found")
            }
        }   
    }
}