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

  function registerNewUser(newUser, cb) {
    connection.query('INSERT INTO users SET ?;', newUser, function(err, row) {
      errorHandler(err);
      cb(err, row);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat,
    registerNewUser: registerNewUser
  };
};

module.exports = Database;
