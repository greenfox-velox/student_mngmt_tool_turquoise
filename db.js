'use strict';

var logger = require('./backend_logger')();

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

  function getYourData(queryEmail, cb) {
    // final email change to user id if login works
    connection.query('SELECT * FROM users WHERE users.email LIKE ?;', queryEmail, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat,
    getYourData: getYourData
  };
};

module.exports = Database;
