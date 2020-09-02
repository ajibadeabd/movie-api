let userSevr = require("../services/userServices")



class UserContoller {

  // signup 
  async userSignUp(req, res) {
    let {data,status,success,message} = await userSevr.userSignUp(req,res,req.body)
    res.status(status).json({message,...data,status,success});
  }
  //sign in
  
  async userSignIn(req, res) {
    let {data,status,success,message} = await userSevr.userSignIn(req,res,req.body)
    res.status(status).json({message,...data,status,success});

  }


}
module.exports = new UserContoller();
