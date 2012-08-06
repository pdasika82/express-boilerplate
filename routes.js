var err = require('./errors/errors.js');
var NotFound = err.NotFound;
var nav = require('./routes/nav.js');
var logger = require('./genlib/logger.js');

exports.route = function(app, passport, partials) {
	app.param('id', function(req, res, next, id) {
		if (!isNaN(parseInt(id,10))) {
			next();
		}
		else {
			throw new NotFound("Bad params");	
		}
	});

	app.get('/', nav.get.index);

	app.get('/test', nav.get.test);

	app.post('/sessions', nav.post.sessions);

	app.get('/account', ensureAuthenticated, nav.get.account);
	
	app.get('/table', nav.get.table);
	app.get('/table-pager', nav.get.tablepager);

	app.get('/login', nav.get.login);
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', nav.get.signup);
	app.post('/signup', nav.post.signup);


	app.get('/logout', nav.get.logout);

	/*app.get('/*',function(req,res){
		throw new NotFound("404");	
	});*/

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login')
	}
};

