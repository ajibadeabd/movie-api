const mongoose= require('mongoose')
const Movie= require('../models/movie')
const CustomError = require('../utils/errorResponse')
const _ = require("lodash");
const cheerio = require("cheerio");
const axios= require("axios");
const unirest= require("unirest");
const config= require("../config/parameters");







class movieServices {
    async getAllMovies(req, res) {
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
    }
    
    async addMovie(req, res,data) {
       data = _.pick(data,['title','rating'])
       if(data.rating>5 || data.rating<0 ){return new CustomError("please rating should be in the range  of 1-5");}
       if(!data.title){return new CustomError("please provide a title ratings");}
       let ifAdded = await Movie.findOne({title:data.title})
       if(ifAdded){return new CustomError(`${data.title} has been added earlier on `);}
       if(isNaN(data.rating) || !data.rating){return new CustomError("please provide a valid rating");}
       let saveMovie = await new Movie({title:data.title,rating:data.rating}).save()
      return   {status:200,data:saveMovie,message:`${data.title} has been added to your list`}

    }
  
  
  }
  module.exports = new movieServices();
  