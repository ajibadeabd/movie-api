const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User  = require("../models/User");
const config = require('./parameters')
// const key = config.jwtSecret;
const security = {}
security.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
security.secretOrKey=config.jwtSecret
module.exports = passport=>{
    passport.use(
        new JwtStrategy(security,(jwt_payload,done)=>{
   User.findById(jwt_payload.id)
   .then((user)=>{
       if(user)
          return done(null,user)
       return done(null,false);
       
   })
   .catch(err=>{
       console.log(err)
   })
        })
    )
}
