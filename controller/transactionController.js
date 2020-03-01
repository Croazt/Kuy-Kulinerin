const db = require('../database')

module.exports={
    createTrans : async (req,res,next)=>{
        console.log("rows.length")
        const id_places = req.params.id_places  
        const id_menu = req.params.id_menu
        const id = req.user.username
        const booking = req.body.booking
        var [rows] = await db.query('select * from transactions where id_users = ? and id_places = ? and accepted = 0',[id,id_places])
        console.log(rows.length)
        if(rows.length === 0){
            var [rows2] = await db.query('select * from menus where id_places = ? and id = ?',[id_places,id_menu])
            if(rows2.length != 0){  
                await db.query('insert into transactions(id_users,id_places,booking,id_seller) values(?,?,?,?)',[id,id_places,booking,rows2[0].id_user])
                var [rows] = await db.query('select SUM(totalPrice) as totalPrice from (select * from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?) as lim group by price',[id,id_places,id_menu,rows[0].id])
                await db.query('update transactions set price = ? where id_users = ? and id_places = ? and accepted = 0',[sum[0].totalPrice,id,id_places])
                .then(()=>{``
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
                var [rows] = await db.query('select * from transactions where id_users = ? and id_places = ? and accepted = 0', [id,id_places])
                var [rows3] = await db.query('select * from details where id_transaction = ? and id_places = ? and id_menu = ?',[rows[0].id,id_places,id_menu])
                if(rows3.length === 0){
                    await db.query('insert into details(id_transaction,id_users,id_places,id_menu,price,namamenu) values(?,?,?,?,?,?)',[rows[0].id,id,id_places,id_menu,rows2[0].price,rows2[0].nama])
                    await db.query('update details set jumlah = jumlah + 1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    var [rows] = await db.query('select SUM(totalPrice) as totalPrice from (select * from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?) as lim group by price',[id,id_places,id_menu,rows[0].id])
                    console.log(rows)
                    await db.query('update transactions set price = ? where id_users = ? and id_places = ? and accepted = 0',[rows[0].totalPrice,id,id_places])
                    .then(()=>{
                        
                        res.json({
                            "success" : true,
                            "message" : "Add success"
                        })
                    })
                    .catch((err)=>{
                        res.status(500).json({
                            "success" : false,
                            "error" : err
                        })
                    })
                }else{
                    await db.query('update details set jumlah = jumlah + 1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction',[id,id_places,id_menu,rows[0].id])
                    var [rows] = await db.query('select SUM(totalPrice) as totalPrice from (select * from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?) as lim group by price',[id,id_places,id_menu,rows[0].id])
                    await db.query('update transactions set price = ? where id_users = ? and id_places = ? and accepted = 0',[rows[0].totalPrice,id,id_places])
                    .then(()=>{
                        res.json({
                            "success" : true,
                            "message" : "Add success"
                        })
                    })
                    .catch((err)=>{
                        res.status(500).json({
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
    },

    acceptTransaction : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id = req.user.username
        const id_transaction = req.params.id_transaction
        const [rows] = await db.query('select * from transactions where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
        const [userData] = await db.query('select * from users where username = ?',[id])
        console.log(userData)
        if(rows.length != 0&& rows[0].accepted === 0){
            balance = userData[0].balance - rows[0].price
            if(balance > 0){
                // await db.query('update users set balance = ?, tempBalance = tempBalance + ? where username = ?',[balance,rows[0].price,id])
                db.query('update transactions set accepted = 1 where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
                .then(()=>{
                    res.status(202).json({
                        "success" : true,
                        "message" : "Transaction accepted, waiting your payment accepted"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else{
                res.status(402)
                const err = new Error("Insuficient balance")
                next(err)
            }
        }else if(rows.length != 0&& rows[0].accepted != 0){
            res.status(409)
            const err = new Error("Transaction has been accepted")
            next(err)
        }else{
            res.status(404)
            const err = new Error("Transaction not found")
            next(err)
        }
    },

    acceptTransactionSeller : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id = req.params.id_user
        const id_transaction = req.params.id_transaction
        const user = req.user.username
        var [rows] = await db.query('select * from places where id_users = ? and id = ?',[user,id_places])
        if(rows.length != 0 && rows[0].id == id_places){
            [rows] = await db.query('select * from transactions where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
            if(rows.length != 0&& rows[0].accepted === 1){
                [rows2] = await db.query('select * from users where username = ?',[id])
                balance = rows2[0].balance - rows[0].price
                await db.query('update users set balance = ?, tempBalance = tempBalance + ? where username = ?',[balance,rows[0].price,id])
                // await db.query('update users set tempBalance = balance + ? where username = ?',[rows[0].price,user])
                db.query('update transactions set accepted = 2 where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
                .then(()=>{
                    res.status(202).json({
                        "success" : true,
                        "message" : "Transaction accepted"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else if (rows.length != 0&& rows[0].accepted === 2){
                res.status(409)
                const err = new Error("Transaction already accepted")
                next(err)
            }else if (rows.length != 0&& rows[0].accepted === 0){
                res.status(409)
                const err = new Error("Transaction is not accepted by user")
                next(err)
            }else{
                res.status(404)
                const err = new Error("Transaction Not Found")
                next(err)
            }
        }else{
            res.status(405)
            const err = new Error("You not allowed to do that")
            next(err)
        }
    },

    bookingReady : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id = req.params.id_user
        const id_transaction = req.params.id_transaction
        const user = req.user.username
        var [rows] = await db.query('select * from places where id_users = ? and id = ?',[user,id_places])
        if(rows.length != 0 && rows[0].id == id_places){
            [rows] = await db.query('select * from transactions where id = ? and id_places = ? and id_seller = ? and id_users = ?',[id_transaction,id_places,user,id])
            if(rows.length != 0&& rows[0].accepted === 2){
                [rows2] = await db.query('select * from users where username = ?',[id])
                balance = rows2[0].balance - rows[0].price
                await db.query('update users set tempBalance = tempBalance - ? where username = ?',[rows[0].price,id])
                await db.query('update users set tempBalance = tempbalance + ? where username = ?',[rows[0].price,user])
                db.query('update transactions set accepted = 3 where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
                .then(()=>{
                    res.status(202).json({
                        "success" : true,
                        "message" : "Transaction accepted"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else if (rows.length != 0&& rows[0].accepted === 3){
                res.status(409)
                const err = new Error("Transaction has been ready")
                next(err)
            }else if (rows.length != 0&& rows[0].accepted === 1){
                res.status(409)
                const err = new Error("Accept the transaction first")
                next(err)
            }else if (rows.length != 0&& rows[0].accepted === 0){
                res.status(409)
                const err = new Error("Transaction is not accepted by user")
                next(err)
            }else{
                res.status(404)
                const err = new Error("Transaction Not Found")
                next(err)
            }
        }else{
            res.status(405)
            const err = new Error("You not allowed to do that")
            next(err)
        }
    },

    transactionsDone : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id_transaction = req.params.id_transaction
        const user = req.user.username
        const [rows2] = await db.query('select * from places where id    = ?',[id_places])
        if(rows2.length != 0){
            const [rows] = await db.query('select * from transactions where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,user])
            if(rows.length != 0&& rows[0].accepted === 3){
                await db.query('update users set tempBalance = tempbalance - ? where username = ?',[rows[0].price,rows[0].id_seller])
                await db.query('update users set balance = balance + ? where username = ?',[rows[0].price,rows[0].id_seller])
                db.query('update transactions set accepted = 4 where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,user])
                .then(()=>{
                    res.status(202).json({
                        "success" : true,
                        "message" : "Transaction done and successed"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else if (rows.length != 0&& rows[0].accepted <3){
                res.status(409)
                const err = new Error("Transaction is not ready yet")
                next(err)
            }else if (rows.length != 0&& rows[0].accepted <5){
                res.status(409)
                const err = new Error("Transaction has been done")
                next(err)
            }else{
                res.status(404)
                const err = new Error("Transaction Not Found")
                next(err)
            }
        }else{
            res.status(404)
            const err = new Error("Place not found")
            next(err)
        }
    },

    cancelTransaction : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id_transaction = req.params.id_transaction
        const user = req.user.username
        const [rows] = await db.query('select * from transactions where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,user])
        if(rows.length != 0&& rows[0].accepted < 2){
            [rows2] = await db.query('select * from users where username = ?',[user])
            balance = rows2[0].tempBalance - rows[0].price
            await db.query('update users set balance = balance + ? where username = ?',[balance,user])
            db.query('delete from transactions where id = ? and id_places = ? and id_users = ?',[id_transaction,id_places,id])
            .then(()=>{
                res.status(202).json({
                    "success" : true,
                    "message" : "Transaction canceled"
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    "success" : false,
                    "error" : err
                })
            })
        }else if (rows.length != 0&& rows[0].accepted > 1){
                res.status(409)
                const err = new Error("Transaction cannot canceled")
                next(err)
        }else{
                res.status(404)
                const err = new Error("Transaction Not Found")
                next(err)
        }
    },

    deleteDetails : async (req,res,next)=>{
        const id_places = req.params.id_places
        const id_transaction = req.params.id_transaction
        const id = req.user.username
        const id_menu = req.params.id_menu
        const [rows] =  await db.query('select * from transactions where id_places = ? and id = ?',[id_places,id_transaction])
        console.log(id,id_menu,id_places,rows)
        if(rows[0].accepted<2){
            var [rows2] = await db.query('select * from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?',[id,id_places,id_menu,rows[0].id])
            if(rows2.length!==0&&rows2[0].jumlah>1){
                await db.query('update details set jumlah = jumlah -  1, totalPrice  = price * jumlah where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?',[id,id_places,id_menu,rows[0].id])
                var [rows2] = await db.query('select SUM(totalPrice) as totalPrices from (select * from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?) as lim group by price',[id,id_places,id_menu,rows[0].id])
                db.query('update transactions set price = ? where id_users = ? and id_places = ? and accepted = ?',[rows2[0].totalPrices,id,id_places,rows[0].accepted])
                .then(()=>{
                    res.json({
                        "success" : true,
                        "message" : "Delete success"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else if(rows2.length!==0&&rows2[0].jumlah<=1){
                await db.query('delete from details where id_users = ? and id_places = ? and id_menu = ? and id_transaction = ?',[id,id_places,id_menu,rows[0].id])
                db.query('update transactions set price = ? where id_users = ? and id_places = ? and accepted = ?',[0,id,id_places,rows[0].accepted])
                .then(()=>{
                    res.json({
                        "success" : true,
                        "message" : "Delete success"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        "success" : false,
                        "error" : err
                    })
                })
            }else{
                res.status(404).json({
                    "success" : false,
                    "Mesage" : `transaction not found by menu with id ${id_menu}`
                })
            }
        }else{
            res.status(403).json({
                "success" : false,
                "Mesage" : "Cannot update details that already accepted by seller"
            })
        }
        
    },
    
    getTransactionSeller : async (req,res,next)=>{
        const id = req.params.id
        const {username} = req.user
        if(username === id){
            const [rows] = await db.query('select * from transactions where id_seller = ? and accepted > 0 order by accepted asc',[username])
            if(rows.length === 0){
                res.status(404).json({
                    "success" : true,
                    "message" : "You have no transactions"
            })
            }else{
                res.status(202).json({
                    "success" : true,
                    "message" : rows
                })
            }
        }else{
            res.status(404).json({
                "success" : true,
                "message" : "Not found"
            })
        }
        
    }
        
}