'use strict';

var db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');

function newApp(connection) {
  var app = express();

  app.use(bodyParser.json());
  app.use(express.static('frontend'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  var myDataBase = db(connection);

  app.get('/heartbeat', function(req, res) {
      myDataBase.checkHeartBeat(function(err, result) {
        if (!err && result.length !== 0) {
          res.send(result);
        } else {
          res.sendStatus(500)
        }
      });
  });

  return app;
}

module.exports = newApp;
