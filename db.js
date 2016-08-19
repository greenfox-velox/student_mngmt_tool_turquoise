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
    connection.query('SELECT * FROM users WHERE users.email LIKE ?;', queryEmail, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function getUserById(id, cb) {
    connection.query('SELECT * FROM users WHERE users.id LIKE ?;', id, function(err, rows) {
      errorHandler(err);
      cb(err, rows[0]);
    });
  }

  function registerNewUser(newUser, cb) {
    connection.query('INSERT INTO users SET ?;', newUser, function(err, row) {
      errorHandler(err);
      cb(err, row);
    });
  }

  function loginUser(email, cb) {
    connection.query('SELECT * FROM users WHERE users.email LIKE ?;', email, function(err, rows) {
      errorHandler(err);
      cb(err, rows[0]);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat,
    getYourData: getYourData,
    registerNewUser: registerNewUser,
    loginUser: loginUser,
    getUserById: getUserById
  };
};

module.exports = Database;
