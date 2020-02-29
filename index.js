const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 99
const router = require('./router')
const morgan = require('morgan')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const cors = require('cors')

/*
app.get('/', (req, res) => {
    res.send("FACHRY LOLOS BCC");
});
*/
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(function(req,res,next){
    req.io = io;
    next();
});

//database connection   
require('./database')

app.use(express.static(__dirname+"/resource/image"))


app.listen(port, () => {
    console.log("Listen to", port)
})




app.use('/',router)


