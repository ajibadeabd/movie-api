const express = require('express');
const router = express.Router();
const {getAllMovies,addMovie,editMovie,deleteMovie} = require('../controller/movieController');
var passport = require('passport');
var jwt = require('jsonwebtoken');
/* GET home page. */


//router to get all movies
router.get('/all_movie',
getAllMovies);



//router to add movies and rating to list 
router.post('/add_movie', 
passport.authenticate('jwt', {session: false}),
addMovie);

//router to edit rating of each movies
router.put('/all_movie/:movieId', 
passport.authenticate('jwt', {session: false}),
editMovie);
//router to delete each movies
router.delete('/all_movie/:eachMovieId',
passport.authenticate('jwt', {session: false}),
 deleteMovie);


module.exports = router;
