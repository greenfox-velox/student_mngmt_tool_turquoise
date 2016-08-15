'use strict';

var dotenv = require('dotenv');
dotenv.load();

var logger = function(targetConsole, envLoggingLevel) {
  var loggingLevel = envLoggingLevel || 1;
  var currentConsole = targetConsole || console.log;

  function setDate(date) {
    return date || new Date();
  }

  function debug(text, date) {
    if (loggingLevel <= 0) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function info(text, date) {
    if (loggingLevel <= 1) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function warn(text, date) {
    if (loggingLevel <= 2) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function error(text, date) {
    if (loggingLevel <= 3) {
      currentConsole(setDate(date) + ' ' + text);
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
