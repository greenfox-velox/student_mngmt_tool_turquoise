'use strict';

// var LOG_LEVEL = { debug: 1, info: 2, warn: 3, error: 4 };
var loggingLevel = 1;

var logger = function() {
  function debug(debugLogText, level) {
    if (loggingLevel >= level) {
      console.log(new Date() + debugLogText);
    }
  }

  function info(infoLogText, level) {
    if (loggingLevel >= level) {
      console.log(new Date() + infoLogText);
    }
  }

  function warn(warnLogText, level) {
    if (loggingLevel >= level) {
      console.log(new Date() + warnLogText);
    }
  }

  function error(errorLogText, level) {
    if (loggingLevel >= level) {
      console.log(new Date() + errorLogText);
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
