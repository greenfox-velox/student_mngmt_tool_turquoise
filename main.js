'use strict';

var newApp = require('./backend/server');
var connect = require('./backend/connect');

var app = newApp(connect.connection);

var logger = require('./backend/backend_logger')();

app.listen(process.env.PORT || 3000, function() {logger.info('Server is started');});
