var bcrypt = require('bcrypt');
var logger = require('../genlib/logger');
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('Users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: DataTypes.STRING,
		description: DataTypes.TEXT,
		signupIp: DataTypes.STRING,
		approved: DataTypes.BOOLEAN,
		createdOn: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: DataTypes.STRING,
		activationKey: DataTypes.STRING,
		resetPasswordKey: DataTypes.STRING,
		role : {
			type: DataTypes.STRING,
			defaultValue: "USER" 
		},
		age: DataTypes.INTEGER,
		lastAuthProvider: {
			type: DataTypes.STRING,
			validate: {
				is: OAUTH_PROVIDERS
			},
			defaultValue: 'local'
		},
		settings: DataTypes.TEXT
	},
	{
		timestamps: true,

		classMethods: {
			authenticate: function(email, password, callback) {
				logger.debug("Authenticating");
				this.find({
					where: {
						email: email
					}
				}).success(function(user) {
					if (!user) {
						return callback(null, false, 'Username doesnt exist');
					}
					user.verifyPassword(password, function(err, passwordCorrect) {
						if (err) {
							return callback(err);
						}
						if (!passwordCorrect) {
							return callback(null, false, 'Incorrect password');
						}
						logger.debug("User authenticated");
						return callback(null, user);
					});
				}).error(function(err) {
					if (err) {
						return callback(err);
					}
				});
			},

			verifyPassword: function(enteredPassword, actualPassword, callback) {
				logger.debug("User authenticating");
				bcrypt.compare(enteredPassword, actualPassword, callback);
			},
			getSalt: function() {
				return bcrypt.genSaltSync(10);
			},
			getHash: function(password, salt) {
				return bcrypt.hashSync(password, salt);
			}
		},

		instanceMethods: {
			printAll: function() {
				console.log(JSON.stringify(this));
			},
			verifyPassword: function(password, callback) {
				bcrypt.compare(password, this.password, callback);
			}
		}
	});
}

