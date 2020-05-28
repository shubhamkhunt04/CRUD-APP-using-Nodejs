/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var Filestore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const cors = require("cors");

// my own router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const admin = require('./routes/adminlogin');

const mongoose = require('mongoose');


const url = config.mongoUrl;
const connect = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(express.static(path.join(__dirname, 'public/anyuser')));
// app.use(authenticate.verifyUser);

app.use(express.static(path.join(__dirname, 'public'))); // open for any user to access without authentication.


app.use('/adminlogin', admin);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;