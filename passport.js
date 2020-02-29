const passport = require('passport')
const db = require('./database')
const GooglePlusTokenStrategy = require('passport-google-plus-token')

passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID : '519640106820-uosd45v96rd9qgc8872s21adq0au78c7.apps.googleusercontent.com',
    clientSecret:'cN_-ikMSZztSo7akyn_yuIjE'
},async(accessToken,refreshToken,profile,done)=>{
    try{
        if(profile){
            var [user] = await db.query('select * from users where email = ?',[profile.emails[0].value])
        if(user.length !=0){
            console.log("user already exist")
            if(!user[0].google_id){
                await db.query('update users set google_id = ? where email = ?',[profile.id,profile.emails[0].value])   
                return done(null,user)
            }

            return done(null,user)
        }
    
        await db.query('insert into users(google_id,email,nama) values(?,?,?)',[profile.id,profile.emails[0].value,profile.displayName]);
        [user] = await db.query('select * from users where google_id = ?',[profile.id])
        console.log(" created")
        done(null,user)
        }else{
            done(err,false,err.message)
        }
        
    }catch(err){
        done(err,false,err.message)
    }

}))