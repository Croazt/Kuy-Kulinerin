const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 99
const router = require('./router')
const morgan = require('morgan')

/*
app.get('/', (req, res) => {
    res.send("FACHRY LOLOS BCC");
});
*/
app.use(morgan('dev'))
app.use(bodyParser.json())

//database connection   
require('./database')


app.listen(port, () => {
    console.log("Listen to", port)
})




app.use('/',router)


