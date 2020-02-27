const joi = require('joi')

module.exports={
    validateBody : (schema) =>{
        return (req,res,next) =>{
            const result = joi.validate(req.body, schema)
            if(result.error){
                return res.status(400).json(result.error)
            }
            if(!req.value){
                req.value = {}
            }
            req.value['body'] = result.value
            //req.value.body instead req.body
            next();
        }
    },

    schemas : {
        authSchema : joi.object().keys({
            email : joi.string().email().required(),
            password :  joi.string().alphanum().required(),
            phone : joi.string().regex(/^[0-9]{3,30}$/).required(),
            username : joi.string().alphanum().required().min(3).max(40).required(),
            nama : joi.string().min(3).max(40).required()
        })
    }
}