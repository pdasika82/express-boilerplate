var log4js = require('log4js');
var config = require('../config/env.js');
log4js.configure({
	appenders: [{
		type: 'console'
	},
	{
		type: 'file',
		filename: '/logs/cheese.log',
		category: 'cheese'
	}]
});

var logger =exports.logger =  log4js.getLogger();
logger.setLevel(config.LOG_LEVEL);

module.exports = logger;
