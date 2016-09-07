'use strict';

var config = require('./CONFIG');

var mysql = require('mysql');
var connection = mysql.createConnection(config.sqlEntry);

var logger = require('./backend_logger')();

connection.connect(function(err) {
  if (err) {
    logger.error('Error connecting to Db' + err);
    return;
  }
  logger.info('Connection established');
});

module.exports.connection = connection;
