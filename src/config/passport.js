const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User  = require("../models/User");
const config = require('./parameters')

const key = config.jwtSecret;
const security = {}
security.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
security.secretOrKey=key
// console.log('jwt_payload',security)

    module.exports = passport=>{
        passport.use(
            new JwtStrategy(security,(jwt_payload,done)=>{
                console.log(jwt_payload)
       User.findById(jwt_payload._id)
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

