'use strict';

require('newrelic');
var db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./backend_logger')();

function newApp(connection) {
  var app = express();
  app.use(bodyParser.json());
  app.use(express.static('frontend'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  });

  var studentDataBase = db(connection);

  function emailValidator(email) {
    return (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email));
  }

  app.get('/heartbeat', function(req, res) {
    studentDataBase.checkHeartBeat(function(err, result) {
      if (!err && result.length !== 0) {
        res.send(result);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.get('/your/:id', function(req, res) {
    // final email change to user id if login works in db.js
    studentDataBase.getYourData(req.params.id, function(err, result) {
      if (!err && result.length !== 0) {
        res.send(result);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.post('/your', function(req, res) {
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

  app.post('/api/login', function(req, res) {
    studentDataBase.loginUser(req.body.email, function(err, result) {
      if (!err) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });

  app.post('/api/register', function(req, res) {
    if (emailValidator(req.body.email)) {
      studentDataBase.registerNewUser(req.body, function(err, result) {
        if (!err) {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
  return app;
}

module.exports = newApp;
