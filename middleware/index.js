const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const ADMIN_KEY = process.env.ADMIN_KEY
const VERIF_KEY = process.env.VERIF_KEY
module.exports= {
    checkuser : async(req,res,next)=>{
        const authHeader = req.headers.authorization
        if(authHeader){
            console.log('get in middleware')
            const token = authHeader.split(' ')[1]
            if(token){
                try{
                    const payload = await jwt.verify(token,JWT_KEY,function(err, decoded) {
                        if (err) {
                            res.json({
                                "err" : err
                            })
                        }
                        
                        return decoded
                    })
                    if(payload){
                        req.user = payload
                        next()
                    }else if(token!=null){
                        const error = new Error('Wrong Token');
                        next(error)
                    }
                }
                catch(err){
                    res.status(403)
                    next(err)
                }
            }
        }
    },

    checkadmin : async(req,res,next)=>{
        const authHeader = req.headers.authorization
        if(authHeader){
            console.log('get in middleware')
            const token = authHeader.split(' ')[1]
            if(token){
                try{
                    const payload = await jwt.verify(token,ADMIN_KEY,function(err, decoded) {
                        if (err) {
                            res.json({
                                "err" : err
                            })
                        }
                        return decoded
                    })
                    if(payload){
                        req.user = payload;
                        next()
                    }else if(token!=null){
                        const error = new Error('Wrong Token');
                        next(error)
                    }
                }
                catch(err){
                    res.status(403)
                    next(err)
                }
            }
        }
    },

    checkToken : async (req,res,next)=>{
        const authHeader = "Bearer " + req.params.id
        if(authHeader){
            console.log('get in middleware')
            const token = authHeader.split(' ')[1]
            if(token){
                try{
                    const payload = await jwt.verify(token,VERIF_KEY,function(err, decoded) {
                        if (err) {
                            res.json({
                                "err" : err
                            })
                        }
                        return decoded
                    })
                    if(payload){
                        req.user = payload;
                        next()
                    }else if(token!=null){
                        const error = new Error('Wrong Token');
                        next(error)
                    }
                }
                catch(err){
                    res.status(403)
                    next(err)
                }
            }
        }
    }
}