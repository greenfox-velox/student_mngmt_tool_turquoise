'use strict';

var config = require('./CONFIG');

var mysql = require('mysql');
var connection = mysql.createConnection(config.sqlEntry);

var logger = require('./logger')(console.log, process.env.LOGGING_LEVEL);

connection.connect(function(err) {
  if (err) {
    logger.error('Error connecting to Db');
    logger.error(err);
    return;
  }
  logger.info('Connection established');
});

module.exports.connection = connection;
