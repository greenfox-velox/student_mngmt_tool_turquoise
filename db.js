// 'use strict';

var Database = function(connection) {
  function errorHandler(err) {
    if (err) {
      console.log(err.toString());
      return;
    }
  }

  function checkHeartBeat(cb) {
    connection.query('SELECT * FROM heartbeat;', function(err, rows) {
      errorHandler(err);
      cb(rows);
    });
  }

  return {
    checkHeartBeat: checkHeartBeat
  };
};

module.exports = Database;
