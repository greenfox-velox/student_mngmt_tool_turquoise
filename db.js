'use strict';

var logger = require('./logger')();

var Database = function(connection) {
  function errorHandler(err) {
    if (err) {
      logger.error(err.toString());
      return;
    }
  }

  function checkHeartBeat(cb) {
    connection.query('SELECT * FROM heartbeat;', function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat
  };
};

module.exports = Database;
