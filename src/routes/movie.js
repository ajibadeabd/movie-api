const express = require('express');
const router = express.Router();
const {getAllMovies,addMovie,editMovie,deleteMovie} = require('../controller/movieController');
var passport = require('passport');
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', 
passport.authenticate('jwt', {session: false}),
function(req, res, next) {
res.send('working')
});
//router to get all movies
router.get('/all_movie',
passport.authenticate('jwt', {session: false}),
getAllMovies);



//router to add movies to list 
router.post('/add_movie', addMovie);

//router to add rating to each movies
router.put('/all_movie/:movieId', editMovie);
//router to delete each movies
router.delete('/all_movie/:movieId', deleteMovie);


module.exports = router;
