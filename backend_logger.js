'use strict';

var dotenv = require('dotenv');
dotenv.load();

var logger = function(targetConsole, inputLoggingLevel) {
  var levelsOfLogging = {debug: 0, info: 1, warn: 2, error: 3};
  var loggingLevel = inputLoggingLevel || process.env.LOGGING_LEVEL || levelsOfLogging.info;
  var currentConsole = targetConsole || console.log;

  function setDate(date) {
    return date || new Date();
  }

  function debug(text, date) {
    if (loggingLevel <= levelsOfLogging.debug) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function info(text, date) {
    if (loggingLevel <= levelsOfLogging.info) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function warn(text, date) {
    if (loggingLevel <= levelsOfLogging.warn) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  function error(text, date) {
    if (loggingLevel <= levelsOfLogging.error) {
      currentConsole(setDate(date) + ' ' + text);
    }
  }

  return {
    debug: debug,
    info: info,
    warn: warn,
    error: error,
    levelsOfLogging: levelsOfLogging
  };
};

module.exports = logger;
