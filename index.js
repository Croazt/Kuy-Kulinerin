  
const express = require('express')
const app = express()
const port = 99
const router = require('./router')

/*
app.get('/', (req, res) => {
    res.send("FACHRY LOLOS BCC");
});
*/


//database connection   
require('./database')


app.listen(port, () => {
    console.log("Listen to", port)
})


app.use(express.json())

app.use('/',router)


