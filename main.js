'use strict';

var newApp = require('./server');
var connect = require('./connect');

var app = newApp(connect.connection);

var logger = require('./logger')();

app.listen(process.env.PORT || 3000, function() {logger.info('Server is started');});
