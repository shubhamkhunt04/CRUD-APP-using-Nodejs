var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');


var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // support for session
passport.deserializeUser(User.deserializeUser());


exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    }); // valid -> 1 hour 
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    function (jwt_payload, done) {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({
            _id: jwt_payload._id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            } else if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {
    session: false
});

exports.verifyAdmin = (req, res, next) => {
    // console.log(req.user.admin)
    if (req.user.admin == true) {
        next();
    } else {
        let err = new Error("You are not authorized to perform this operation because You are not Admin !!)")
        err.statusCode = 403;
        next(err);
        return;
    }
}

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/