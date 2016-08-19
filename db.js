'use strict';

var logger = require('./backend_logger')();
var mysql = require('mysql');

var Database = function(connection) {
  function errorHandler(err) {
    if (err) {
      logger.error(err.toString());
    }
    return;
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
  }

  function registerNewUser(newUser, cb) {
    connection.query('INSERT INTO users SET ?;', newUser, function(err, row) {
      errorHandler(err);
      cb(err, row);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat,
    updateYourData: updateYourData,
    getYourData: getYourData,
    registerNewUser: registerNewUser
  };
};

module.exports = Database;
