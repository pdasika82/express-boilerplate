var Sequelize = require("sequelize");
var bcrypt = require('bcrypt');
var config = require('../config/env');
var logger = require('../genlib/logger');


var sequelize = new Sequelize(config.MYSQL.DB, config.MYSQL.USERNAME, config.MYSQL.PASSWORD, {
  // use other database server or port
  host: config.MYSQL.HOST, 
  port: config.MYSQL.PORT,
  dialect: 'mysql',
  define: { engine: 'MYISAM' },

 
  // use pooling in order to reduce db connection overload and to increase speed
  // currently only for mysql
  pool: { maxConnections: 5, maxIdleTime: 30},

  freezeTableName: true,

  
  // disable logging
  logging: false
});


GLOBAL.OAUTH_PROVIDERS = ['FACEBOOK', 'TWITTER','GOOGLE','LOCAL'];
GLOBAL.STATUS = ['NEW', 'VERIFIED','APPROVED', 'LATER'];
GLOBAL.SCOPE = ['PRIVATE', 'PUBLIC','SHARED'];
GLOBAL.ROLE = ['USER', 'ADMIN','EDITOR'];

Users   = sequelize.import(__dirname + "/user")




sequelize.sync().on('success', function() {
	logger.info("Connected to mysql");
}).error(function(err){
	logger.error("ERROR connecting: "+err);
});

create = function(cb){
sequelize.sync({force: true}).on('success', function() {
	cb(null);
}).error(function(err){
	cb(err);
});
}

module.exports = {
sequelize : sequelize,
create:create,
User :  Users
}
