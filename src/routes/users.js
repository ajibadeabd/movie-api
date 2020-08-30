const express = require('express');
const router = express.Router();
const {userSignUp,userSignIn} = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//route for user to register
router.post('/signUp',userSignUp);
//route for user to login
router.post('/signIn', userSignIn);

module.exports = router;
