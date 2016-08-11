'use strict';

var mockConnection = {
  query: function(sql, cb) {
    cb(null, [{}])
  }
};

var mockConnectionError = {
  query: function(sql, cb) {
    cb('error', [{}])
  }
};

module.exports = {
  mockConnection: mockConnection,
  mockConnectionError: mockConnectionError
};
