const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const movieRouter = require('./src/routes/movie');
const usersRouter = require('./src/routes/users');
const app = express();
const cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// app.use(passport.initialize());
// require("./src/config/passport")(passport)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/',(req,res,next)=>{     res.redirect('/api-docs')  })

app.use(passport.initialize());
require("./src/config/passport")(passport)
app.use('/Api/v1', movieRouter);
app.use('/Api/v1/user', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
res.status(404).json({message:'invaid request',status:404})
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
res.status(404).json(err.message)

});

module.exports = app;
