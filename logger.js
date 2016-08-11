'use strict';

var loggingLevel = 1;

var logger = function(consol) {
  function setDate(date) {
    var logDate = new Date();
    if (date) {
      logDate = date;
    }
    return logDate;
  }

  function debug(text, level, date) {
    if (loggingLevel <= level) {
      consol(setDate(date) + text);
    }
  }

  function info(text, level, date) {
    if (loggingLevel <= level) {
      consol(setDate(date) + text);
    }
  }

  function warn(text, level, date) {
    if (loggingLevel <= level) {
      consol(setDate(date) + text);
    }
  }

  function error(text, level, date) {
    if (loggingLevel <= level) {
      consol(setDate(date) + text);
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
