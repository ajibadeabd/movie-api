const mongoose= require('mongoose')
const User= require('../models/User')
const  bcrypt = require('bcryptjs')
const  jwt = require('jsonwebtoken')
const CustomError = require('../utils/errorResponse')
const response = require('../utils/successResponse')
const config = require('../config/parameters')
const _ = require("lodash");




class UserServices {
    //user sign up 
    async userSignUp(req, res,data) {
        // pick only the data need from req.body
            data=_.pick(data,['email','password','userName','confirm_password'])
            // validate userName
            if(!data.userName) return new CustomError("please provide your userName", 400,false); 
            //validate email
            const emailRegex = /[\w|.]+[@]+\w+[.]+[\w|.]*$/gm;
            if (!data.email) return new CustomError("please provide your email");
            const isEmailValid = emailRegex.test(data.email);
            if (!isEmailValid) {return new CustomError("please provide a valid email"); }
            //validate password
            if(!data.password) return new CustomError("enter your password", 400,false);
            if(!data.confirm_password) return new  CustomError("please confirm  your password", 400,false);
            //trim any spaces beside all inputs
            data.email=data.email.trim()
            data.userName=data.userName.trim()
            data.password=data.password.trim()
            data.confirm_password=data.confirm_password.trim()
            //check if password matches with each other
            if(data.password  !== data.confirm_password) return new CustomError("password dont match", 400,false);
            //check if userName is taken
            if(await User.findOne({userName:data.userName})) return new  CustomError("userName already Taken", 400,false); 
            //check if email is taken
            if(await User.findOne({email:data.email})) return new  CustomError("email already exist", 400,false); 
            
            else{
                //save password
              const newUser= await new User(data)
              await  newUser.save()
              //return back a suucess message afer login
              return{status:201,success:true,
              message:`an account has been created by ${data.userName} `}}
        
    }
    async userSignIn(req, res,data) {
        // pick only the data need from req.body
        data=_.pick(data,['email','password'])
        //validate email
        if (!data.email)return new CustomError("please provide your email");
        //validate password
        if(!data.password) return new CustomError("enter your password", 400,false);
        //trim any spaces beside all inputs
        data.email=data.email.trim()
        data.password=data.password.trim()
        //find and check if user exist or not
        const userExist = await User.findOne({email: data.email});
        if (!userExist) return new CustomError("An incorrect login details");
        //compare the supplied password with the database password
        const isCorrect = await bcrypt.compare(data.password, userExist.password);
        if (!isCorrect) return new CustomError("Incorrect password");
        //sign in an accessToken
        const accessToken = jwt.sign({ _id: userExist._id,name:userExist.userName }, 
        process.env.jwtSecret, { expiresIn:config.accessTokenexpires_expiresIn, });
        //sign in an refreshToken
        console.log(config.accessTokenexpires_expiresIn)
        const refreshToken = jwt.sign({ _id: userExist._id,name:userExist.userName },
        process.env.jwtSecret, { expiresIn:config.refreshToken_expiresIn, });
        let user = _.pick(userExist,['email','_id','userName'])
        // return back accestoken and refreshtoken with the user details after successful login
        return {status:200,success:true,message:"you have  been logged in ",
            data:{accessToken:`Bearer ${accessToken}`,
                refreshToken:`Bearer ${refreshToken}`,
                user}}
}
  
  }
  module.exports = new UserServices();
  