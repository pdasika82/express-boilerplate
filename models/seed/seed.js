model = require('../schema');

sequelize = model.sequelize;

var User = model.User;
var Question = model.Question;

var salt = User.getSalt();
User.create({
	email: 'admin@company.com',
	password: User.getHash('admin123', salt),
	salt: salt,
	role: 'ADMIN',
	lastAuthProvider: 'local'
}).success(function() {
	console.log("Success");
}).error(function(err){
	console.log("ERROR: "+err);
});
//assert.equal(user.username ,'pranil'), "This should be equal";

var salt = User.getSalt();
User.create({
	email: 'user@company.com',
	password: User.getHash('user123', salt),
	salt: salt,
	lastAuthProvider: 'local'
}).success(function() {
	console.log("Success");
}).error(function(err){
	console.log("ERROR: "+err);
});
