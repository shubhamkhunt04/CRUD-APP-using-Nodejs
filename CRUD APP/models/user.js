var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); // for storing username and password(hash formate)

var User = new Schema({

    email: {
        type: String,
        maxlength:40

    },
    mobile: {
        type: Number,
        maxlength:10

    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/