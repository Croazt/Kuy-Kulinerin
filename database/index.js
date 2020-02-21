const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'tempatkuliner'
});

db.query('select 1 + 1 as result', (err, results)=>{
    if(err)console.log(err)
    else console.log("Connected to Database")
}) 

module.exports = db