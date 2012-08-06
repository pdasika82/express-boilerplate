var users = require('../models/user');

var partials = {};
var db = require('../dao');
var logger = require('../genlib/logger.js');

var renderer = require('../genlib/render.js');
var renderError = renderer.renderError;
var commonRender = renderer.commonRender;


module.exports = {

	get: {
		signup: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'signup');
		},
		test: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'test');
		},

		homepage: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'homepage');
		},
		tablepager: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'table-pager');
		},
		table: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'table');
		},

		index: function(req, res) {
			commonRender(req, res, {
				title: 'company home',
				message: 'using Hogan templating system'
			},
			'index');
		},

		session_destroy: function(req, res) {
			delete req.session.user;
			res.redirect('login');
		},

		account: function(req, res) {
			commonRender(req, res, {
				user: req.user
			},
			'account');
		},

		login: function(req, res) {
			commonRender(req, res, {
				redir: req.query.redir,
				user: req.user
			},
			'login');
		},

		logout: function(req, res) {
			req.logout();
			res.redirect('/');
		}

	},

	post: {

		signup: function(req, res) {
			logger.debug(JSON.stringify(req.param));
			db.saveUser({
				fname: req.param('firstname'),
				lname: req.param('lastname'),
				email: req.param('email'),
				password: req.param('password')
			},
			function(err, docs) {
				res.redirect('/homepage');
			});
		},
		sessions: function(req, res) {
			//logger.debug('User: ' + req.body.login + '; Pwd: ' + req.body.password);
			User.authenticate(req.body.login, req.body.password, function(user) {
				if (user) {
					req.session.user = user;
					res.redirect(req.body.redir || '/');
				} else {
					logger.debug(user);
					req.flash('warn', 'Login failed');
					commonRender(req, res, {
						redir: req.query.redir
					},
					'login');
				}
			});
		}
	}

};

