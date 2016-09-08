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

  function getCompanyData(cb) {
    connection.query('SELECT * FROM companies;', function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function postCompanyData(newCompany, cb) {
    connection.query('INSERT INTO companies SET ?;', newCompany, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function updateCompanyData(company, cb) {
    connection.query('UPDATE companies SET companies.name = ? WHERE companies.id = ?;', [company.name, company.id], function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function deleteCompany(company, cb) {
    connection.query('UPDATE companies SET companies.available = 0 WHERE companies.id = ?;', company, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function undoDeleteCompany(company, cb) {
    connection.query('UPDATE companies SET companies.available = 1 WHERE companies.id = ?;', company.id, function(err, rows) {
      errorHandler(err);
      cb(err, rows);
    });
  }

  function getYourData(queryUserId, callback) {
    var newQuery = 'SELECT * FROM users WHERE id LIKE (?);';
    var table = [queryUserId];
    getQuery(newQuery, table, callback);
  }

  function updateYourData(inputData, callback) {
    var newQuery = 'UPDATE users SET ?? = ? WHERE id = ?;';
    var table = [inputData.whatChange, inputData.changedData, inputData.queryUserId];
    getQuery(newQuery, table, callback);
  }

  function getUserById(id, cb) {
    connection.query('SELECT * FROM users WHERE id LIKE ?;', id, function(err, rows) {
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
    connection.query('SELECT * FROM users WHERE email LIKE ?;', email, function(err, rows) {
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
    getUserById: getUserById,
    getCompanyData: getCompanyData,
    postCompanyData: postCompanyData,
    updateCompanyData: updateCompanyData,
    deleteCompany: deleteCompany,
    undoDeleteCompany: undoDeleteCompany
  };
};

module.exports = Database;
