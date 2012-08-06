var app = require('./app.js')
var config = require('./config/env.js')
var logger = require('./genlib/logger.js')
app.listen(config.APP_PORT);
logger.info('Express server listening on port '+ app.address().port);
