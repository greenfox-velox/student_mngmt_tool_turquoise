'use strict';

var dotenv = require('dotenv');
dotenv.load();

var logger = function(consol, envLogging) {
  function setDate(date) {
    var logDate = new Date();
    if (date) {
      logDate = date;
    }
    return logDate;
  }

  function debug(text, date) {
    if (envLogging <= 0) {
      consol(setDate(date) + ' ' + text);
    }
  }

  function info(text, date) {
    if (envLogging <= 1) {
      consol(setDate(date) + ' ' + text);
    }
  }

  function warn(text, date) {
    if (envLogging <= 2) {
      consol(setDate(date) + ' ' + text);
    }
  }

  function error(text, date) {
    if (envLogging <= 3) {
      consol(setDate(date) + ' ' + text);
    }
  }

  return {
    debug: debug,
    info: info,
    warn: warn,
    error: error
  };
};

module.exports = logger;
