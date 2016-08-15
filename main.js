'use strict';

var newApp = require('./server');
var connect = require('./connect');

var app = newApp(connect.connection);

var logger = require('./backend_logger')();

app.listen(process.env.PORT || 3000, function() {logger.info('Server is started');});
