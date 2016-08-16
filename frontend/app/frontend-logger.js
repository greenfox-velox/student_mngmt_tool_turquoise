'use strict';
var managementApp = angular.module('managementApp');
var logLevel = 1;

managementApp.factory('logger', function($http) {
  var loggerPost = function(debugLogText, level) {
    $http.post('https://student-mngmt-tool.herokuapp.com/api/log', { level: level, debugLogText: debugLogText, date: new Date(), location: 'frontend' });
  };
  return {
    debug: function(text) {
      if (logLevel <= 0) {
        loggerPost(text, 'debug');
      }
    },
    info: function(text) {
      if (logLevel <= 1) {
        loggerPost(text, 'info');
      }
    },
    warn: function(text) {
      if (logLevel <= 2) {
        loggerPost(text, 'warn');
      }
    },
    error: function(text) {
      if (logLevel <= 3) {
        loggerPost(text, 'error');
      }
    }
  };
});
