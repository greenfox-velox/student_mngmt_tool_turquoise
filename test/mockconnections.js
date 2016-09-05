'use strict';

var mockConnection = {
  query: function(sql, cb) {
    cb(null, [{}]);
  }
};

var mockConnectionError = {
  query: function(sql, cb) {
    cb('error', [{}]);
  }
};

var mockConnectionRegister = {
  query: function(sql, item, cb) {
    cb(null, {insertId: 1});
  }
};

var mockConnectionRegisterError = {
  query: function(sql, item, cb) {
    cb('error', [{}]);
  }
};

module.exports = {
  mockConnection: mockConnection,
  mockConnectionError: mockConnectionError,
  mockConnectionRegister: mockConnectionRegister,
  mockConnectionRegisterError: mockConnectionRegisterError
};
