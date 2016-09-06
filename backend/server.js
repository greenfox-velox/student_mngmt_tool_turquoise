'use strict';

require('newrelic');
var db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./backend_logger')();
var session = require('express-session');
var authentication = require('./authentication');

function newApp(connection) {
  var app = express();
  var passport = authentication(connection);
  app.use(bodyParser.json());
  app.use(express.static('frontend'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  });
  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  var studentDataBase = db(connection);
  var validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  app.get('/heartbeat', function(req, res) {
    studentDataBase.checkHeartBeat(function(err, result) {
      if (!err && result.length !== 0) {
        res.send(result);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.get('/your', function(req, res) {
    studentDataBase.getYourData(req.user.id, function(err, result) {
      if (!err && result.length !== 0) {
        res.send(result);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.post('/your', function(req, res) {
    req.body.queryUserId = req.user.id;
    studentDataBase.updateYourData(req.body, function(err, result) {
      if (!err && result.length !== 0) {
        res.send(result);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.post('/api/log', function(req, res) {
    if (logger[req.body.level]) {
      logger[req.body.level](req.body.text, req.body.date);
    } else {
      logger.info(req.body.text);
    }
    res.send(200);
  });

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send(200);
  });

  app.get('/api/loggedin', function(req, res) {
    if (req.user) {
      res.status(200).json({
        status: 'logged in'
      });
    } else {
      res.status(200).json({
        status: 'not logged in'
      });
    }
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
  });

  app.post('/api/register', function(req, res) {
    if (!validEmail.test(req.body.email)) {
      res.sendStatus(500);
      return;
    }
    studentDataBase.registerNewUser(req.body, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      req.login({id: result.insertId}, function(error) {
        if (error) {
          logger.error(error);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    });
  });
  return app;
}

module.exports = newApp;
