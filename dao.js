// Module dependencies
var logger = require('./genlib/logger.js');

var mongoose = require('mongoose');
// dependencies for authentication
var config = require('./config/env.js'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

//var Event = require('./models/event');
var model = require('./models/schema'),
User = model.User; 
// Define local strategy for Passport
passport.use(new LocalStrategy({
	usernameField: 'email'
},
function(email, password, done) {
	User.authenticate(email, password, function(err, user, mesg) {
		if (mesg) {
			return done(err, user, {
				message: mesg
			});
		}
		else return done(err, user);
	});
}));


//serialize user on login
passport.serializeUser(function(user, done) {
	logger.debug("SERIALL");
	done(null, user.id);
});

// deserialize user on logout
passport.deserializeUser(function(id, done) {
	//	done(null, id);
	User.find(parseInt(id, 10)).success(function(user) {
		if (user) {
			done(null, user);
		} else {
			logger.error("NOUSERFOUND:  ");
			done(new Errors.UserNotFound("Invalid user"), null);
		}
	}).error(function(err) {
		logger.error("FINDUSER:  " + err);
		done(err, null);
	});
});

// connect to database
module.exports = {

	// initialize DB
	startup: function(dbToUse) {
		mongoose.connect(dbToUse);
		// Check connection to mongoDB
		mongoose.connection.on('open', function() {
			logger.debug('We have connected to mongodb');
		});

	},


	// save a user
	saveUser: function(userInfo, callback) {
		logger.debug(JSON.stringify(userInfo));
		var newUser = new User({
			name: {
				first: userInfo.fname,
				last: userInfo.lname
			},
			email: userInfo.email,
			password: userInfo.password,
			lastAuthProvider: 'local'
		});

		newUser.save(function(err) {
			if (err) {
				throw err;
			}
			//logger.debug('Name: ' + newUser.name + '\nEmail: ' + newUser.email);
			callback(null, userInfo);
		});
	},

	// disconnect from database
	closeDB: function() {
		mongoose.disconnect();
	},

}

