const express = require('express');
const router = express.Router();
const {getAllMovies,addMovie} = require('../controller/movieController');

/* GET home page. */
router.get('/', function(req, res, next) {
res.send('working')
});
//router to get all movies
router.get('/all_movie', getAllMovies);

//router to add movies to list 
router.post('/add_movie', addMovie);

//router to add rating to each movies
// router.post('/all_movie', getAllMovies);


module.exports = router;
