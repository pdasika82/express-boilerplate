var express = require('express'),
form = require('./node_modules/connect-form/lib/connect-form.js'),
Errors = require('./errors/errors.js'),
passport = require('passport'),
config = require('./config/env.js'),
mongoStore = require('connect-mongodb'),
Db = require('mongodb').Db,
Server = require('mongodb').Server;

//TODO : Handle error while connecting to the DB
var server_config = new Server(config.SESSIONDB.HOST, config.SESSIONDB.PORT, {
	auto_reconnect: true,
	native_parser: true
}),
db = new Db(config.SESSIONDB.DB, server_config, {});

var logger = require('./genlib/logger.js');

renderEngine = require('./genlib/render.js');
renderEngine.init(__dirname + '/views');

var mongoConn = "mongodb://" + config.MASTER.HOST + ":" + config.MASTER.PORT + "/" + config.MASTER.DB;
var DB = require('./dao');

var MemStore = express.session.MemoryStore;

var app = module.exports = express.createServer(
form({
	keepExtensions: true
}));

app.configure(function() {
	app.use(express.logger());
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.set('view options', {
		layout: false
	});
	app.register('.html', renderEngine.engine);
	app.use(express.bodyParser({
		uploadDir: './public/files'
	}));
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	/**Session expiry **/
	if (process.env.NODE_ENV == 'production') {
		app.use(express.session({
			cookie: {
				maxAge: 60000 * 60 * 24
			},
			// 24 hours 
			secret: 'foo',
			store: new mongoStore({
				db: db,
				reapInterval: 60000 * 10
			}) // 10 minutes
		}));
	} else {
		app.use(express.session({
			secret: 'foo',
			store: MemStore({
				reapInterval: 60000 * 60 *24
			})
		}));
	}

	app.use(passport.initialize());
	app.use(passport.session());

	/**Error handling **/
	app.error(function(err, req, res, next) {
		if (err instanceof Errors.NotFound) {
			logger.error("404 ERRORS");
			res.render('404', {
				locals: {
					title: '404 - Not Found',
					msg: err.message,
					analyticssiteid: config.GOOGLE_ANALYTICS_SITE_ID
				},
				status: 404
			});
		} else if (err instanceof Errors.UserNotFound) {
			res.render('login', {
				locals: {
					title: '404 - Not Found',
					msg: err.message,
					analyticssiteid: config.GOOGLE_ANALYTICS_SITE_ID
				},
				status: 200
			});
		} else {
			logger.error("500 ERRORS");
			res.render('500', {
				locals: {
					title: 'The Server Encountered an Error',
					description: '',
					author: '',
					analyticssiteid: config.GOOGLE_ANALYTICS_SITE_ID,
					error: err
				},
				status: 500
			});
		}
	});
	/**Routing **/
	app.use(app.router);
	/**Static content **/
	app.use(express.static(__dirname + '/static'));
	app.use(express.csrf());
});

db = new DB.startup(mongoConn);

app.configure('development', 'test', function() {
	return app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	return app.use(express.errorHandler());
});

var router = require('./routes.js');
router.route(app, passport);

var templateDirectory = __dirname + "/views/client",
clientSideRenderEngine = require('./genlib/client-renderer.js')(app, {
	layoutsDirectory: templateDirectory + "/layouts",
	partialsDirectory: templateDirectory + "/partials"
});

