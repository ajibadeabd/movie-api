const mongoose= require('mongoose')
const Movie= require('../models/movie')
const CustomError = require('../utils/errorResponse')
const _ = require("lodash");
const cheerio = require("cheerio");
const axios= require("axios");
const unirest= require("unirest");
const config= require("../config/parameters");
const movie = require('../models/movie');







class movieServices {
    async getAllMovies(req, res) {
   try{

    let url1= ` https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=10749&append_to_response=videos`;
    let url2= ` https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=27&append_to_response=videos`;
    let url3=  `https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=28&append_to_response=videos`;
    let url4=   `https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=9648&append_to_response=videos`;
    let url5=   `https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=10749&append_to_response=videos`;
    let url6=   `https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=with_genres=878&append_to_response=videos`;
    let url7=   `https://api.themoviedb.org/3/discover/movie/?api_key=${config.mvdb_api_key}&with_genres=16&append_to_response=videos`;
     let list1 = await axios.get(url1)
      let list2 = await axios.get(url2)
      let list3 = await axios.get(url3)
      let list4 = await axios.get(url4)
      let list5 = await axios.get(url5)
      let list6 = await axios.get(url6)
      let list7 = await axios.get(url7)
      
     const allMovie=[...list1.data.results,
      ...list2.data.results,
      ...list3.data.results,
     ... list4.data.results,
     ... list5.data.results,
      ...list6.data.results,
      ...list7.data.results
    ]

        return   {status:200,data:allMovie,message:"all movie fetch"}
   }catch(error){
    return new CustomError(error.message)
   }
      
    }




    //add movie to list
    async addMovie(req, res,data) {
      // pick rating and the title
       data = _.pick(data,['title','rating'])
       
       //check if rating is between 1 to 5
       if(data.rating>5 || data.rating<0 ){return new CustomError("please rating should be in the range  of 1-5");}

       //checkif rating is provided
       if(!data.title){return new CustomError("please provide a title ratings");}

       //check if rating exist in the data base
       let ifAdded = await Movie.findOne({title:data.title,user:req.user.id})
       if(ifAdded){return new CustomError(`${data.title} has been added earlier on `);}

       //check if rating is a number
       if(isNaN(data.rating) || !data.rating){return new CustomError("please provide a valid rating");}
       data.user=req.user._id
       //save movie in database
       let saveMovie = await new Movie(data).save()
       
       //return response
      return   {status:200,data:saveMovie,message:`${data.title} has been added to your list`}

    }



    // edit rating of each movie
    async editMovie(req, res,data) {
      const id =req.params.movieId
      // check if user own the posted movie
     let isYours = await Movie.findOne({_id:id,user:req.user._id})

     if(!isYours){return new CustomError("you cant edit what you didnt save",404);}
      // pick rating and the title
       data = _.pick(data,['rating'])

      //check if movie id is valid
       let isValid= mongoose.Types.ObjectId.isValid(id)
    if(!isValid){return new CustomError("invalid movie id,please provide a valid movie id");}
     
       //check if rating is a number
      if(isNaN(data.rating) || !data.rating){return new CustomError("please provide a valid rating");}

       //check if rating is between 1 to 5
       if(data.rating>5 || data.rating<0 ){return new CustomError("please rating should be in the range  of 1-5");}

      //check if movie exist
    let movieId = await Movie.findById(id);
    if(!movieId){return new CustomError("movie does not exist");}

    //set movie rating to a new rating
    movieId.rating=data.rating
    //save the new rating
    let saveMovie = await  movieId.save();

       //return response
    return   {status:200,data:saveMovie,message:`${movieId.title} has been updated`}
    }





    async deleteMovie(req, res,data) {
      const id =req.params.eachMovieId
      
      // check if user own the posted movie
     let isYours = await Movie.findOne({_id:id,user:req.user._id})
    if(!isYours){return new CustomError("you cant delete what you didnt save",404);}

      //check if movie id is valid
       let isValid= mongoose.Types.ObjectId.isValid(id)
    if(!isValid){return new CustomError("invalid movie id,please provide a valid movie id");}

      //check if movie exist
    let deleteMovie = await Movie.findByIdAndDelete(id);
    if(!deleteMovie){return new CustomError("you cant delete a movie that does not exist");}
    
       //return response
    return   {status:200,data:null,message:`${deleteMovie.title} has been deleted`}
    }
  
  
  }
  module.exports = new movieServices();
  