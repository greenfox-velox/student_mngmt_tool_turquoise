'use strict';

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
  app.post('/api/log', function(req, res) {
    switch (req.body.level) {
      case 'debug':
        logger.debug(req.body.text, req.body.date);
        break;
      case 'info':
        logger.info(req.body.text, req.body.date);
        break;
      case 'warn':
        logger.warn(req.body.text, req.body.date);
        break;
      case 'error':
        logger.error(req.body.text, req.body.date);
        break;
      default:
        logger.info(req.body.text);
        break;
    }
  });
  return app;
}

module.exports = newApp;
