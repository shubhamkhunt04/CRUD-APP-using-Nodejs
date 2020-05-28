var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var adminrouter = express.Router();
adminrouter.use(bodyParser.json());


/* GET users listing. */
adminrouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  console.log("ok");
  User.find({})
    .then((userdata) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(userdata);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//Login..............................................

adminrouter.post('/login', passport.authenticate('local'), (req, res, next) => { // if successfully authenticated then load req.user property.

  //create token by server

  if (req.user.admin) {
    let token = authenticate.getToken({
      _id: req.user._id
    }); // payload
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      token: token,
      status: 'You are successfully logged in ! '
    });
  } else {
    let err = new Error("Authentication failed");
    err.status = 403;
    return next(err);
  }

});


//Logout.......................................................

adminrouter.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(); // destroy session on serverside
    res.clearCookie('session-id'); // clear cookies on clientside
    res.redirect('/');
  } else {

    var err = new Error('You are not logged in !');
    err.status = 403;
    return next(err);
  }
})

module.exports = adminrouter;

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/