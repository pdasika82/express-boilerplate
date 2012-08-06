schema  = require('./schema');
logger  = require('../genlib/logger');

schema.create(function(err){
if(err){
	logger.error("Unable to create schema"+err)	
}else{
	logger.info("Schema created successfully")
}
})

/*
sequelize.sync({force: true}).on('success', function() {
	console.log("Connected to mysql");
}).error(function(err){
	console.error("ERROR connecting: "+err);
});
*/
