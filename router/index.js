const router = require('express').Router();
const userRouter = require('./userRouter')
const placeRouter = require('./placeRouter')
const adminRouter = require('./adminRouter')
const createMenuRouter = require('./createMenuRouter')

router.get('/', (req,res)=>{
    res.send('Fachry Lolos BCC');
})

router.use('/user',userRouter)
router.use('/place',placeRouter)
router.use('/place',createMenuRouter)
router.use('/admin',adminRouter)
router.use(notFound);
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const err = new Error("Page not found")
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500)
    const message = err.message || "Internal server error"
    res.json({
        "message": message
    })
}

module.exports = router