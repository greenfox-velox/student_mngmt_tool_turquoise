'use strict';

var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var authentication = function(connection) {
  var studentDataBase = db(connection);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    studentDataBase.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {
      studentDataBase.loginUser(email, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  return passport;
};

module.exports = authentication;
