const db = require('../database')
const path = require("path");

module.exports={
    getFile: async (req, res, next) => {
        const id = req.params.id;
        try{
            const [rows] = await db.query('select * from places where id=?',[id])
            var jsonPath =  "C:/Users/Croazt/Documents/yeah/" + rows[0].image;
            console.log(jsonPath)
            res.sendFile(jsonPath);
        }
        catch(err){
            next(err)
        }
      }
}