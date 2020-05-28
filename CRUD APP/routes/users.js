var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
// for admin to get all users
router.get('/', authenticate.verifyUser,(req, res, next) => {
  console.log("ok");
  User.find({})
    .then((userdata) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(userdata);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// This endpoint show the perticular user detaile.
router.get('/:userId', authenticate.verifyUser,(req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.put('/:userId', authenticate.verifyUser,(req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      console.log(user);
      user.username = req.body.username;
      user.email = req.body.email;
      user.mobile = req.body.mobile;
      user.save();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.delete('/:userId', authenticate.verifyUser,(req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Signup.............................................

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username })
  ,req.body.password,(err,user)=> {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else if (user) {
      user.email = req.body.email;
      user.mobile = req.body.mobile;

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            err: err
          });
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registrations successful ! '
          });
        });
      });
    }
  });
});

//Login..............................................

router.post('/login', passport.authenticate('local'), (req, res) => { // if successfully authenticated then load req.user property.

  //create token by server
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
});


//Logout.......................................................

router.get('/logout', (req, res, next) => {
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

module.exports = router;

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/