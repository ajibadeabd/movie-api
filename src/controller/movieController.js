let movieSevr = require("../services/movieServices")


class movieContoller {
  async getAllMovies(req, res) {
    let {data,status,message} = await movieSevr.getAllMovies(req,res,req.body)
    res.status(status).json({data,message,status});
  }
  async addMovie(req, res) {
    let {data,status,message} = await movieSevr.addMovie(req,res,req.body)
    res.status(status).json({data,message,status});
  }


}
module.exports = new movieContoller();
