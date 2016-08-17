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

  function registerNewUser(newUser, cb) {
    connection.query('INSERT INTO users SET ?;', newUser, function(err, row) {
      errorHandler(err);
      cb(err, row);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat,
    getYourData: getYourData,
    registerNewUser: registerNewUser
  };
};

module.exports = Database;
