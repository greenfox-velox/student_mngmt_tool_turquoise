'use strict';

var logger = require('./backend_logger')();
var mysql = require('mysql');

var Database = function(connection) {
  function errorHandler(err) {
    if (err) {
      logger.error(err.toString());
      return;
    }
  }

  function getQuery(newQuery, table, callback) {
    var fullQuery = mysql.format(newQuery, table);
    connection.query(fullQuery, function(err, result) {
      errorHandler(err);
      callback(err, result);
    });
  }

  function checkHeartBeat(cb) {
    connection.query('SELECT * FROM heartbeat;', function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

<<<<<<< HEAD
  function getYourData(queryEmail, cb) {
    connection.query('SELECT * FROM users WHERE users.email LIKE ?;', queryEmail, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
=======
  function getYourData(queryEmail, callback) {
    // final email change to user id if login works
    var newQuery = 'SELECT * FROM users WHERE users.email LIKE (?);';
    var table = [queryEmail];
    getQuery(newQuery, table, callback);
  }

  function updateYourData(inputData, callback) {
    // final email change to user id if login works
    var newQuery = 'UPDATE users SET ?? = ? WHERE users.email LIKE ?;';
    var table = [inputData.whatChange, inputData.changedData, inputData.queryEmail];
    getQuery(newQuery, table, callback);
>>>>>>> 67bfea65f26e4612f79430d8130da940e697993b
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
    updateYourData: updateYourData,
    getYourData: getYourData,
    registerNewUser: registerNewUser,
    loginUser: loginUser,
    getUserById: getUserById
  };
};

module.exports = Database;
