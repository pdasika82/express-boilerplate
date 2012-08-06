var logger = require('./logger.js');
var hbs = require('hbs');
var partials = {};
var fs = require('fs');

function setDynamicHelpers(req, res, params) {
	/** These are replacement for dynamic helpers **/
	params.username = (function() {
		if (req.user) {
			return req.user.email || req.user.username;
		} else {
			return null;
		}
	})();
	
	params.csrfToken = req.session._csrf;

	params.session = req.session;

	params.picture = (function() {
		if (req.user && req.user.picture) {
			return req.user.picture;
		} else {
			return null;
		}
	})();

	params.flash = req.flash();
	/** Dynamic Helpers End **/
}

function setHelpers() {
}

function readPartials(path) {
	var files = fs.readdirSync(path);
	var partials = [];
	var i = 0;
	for (i in files) {
		if (files[i].indexOf("_") === 0) {
			var partialName = files[i].substr(0, files[i].lastIndexOf('.'));
			var partialFile = path + '/' + files[i];
			var partialTemplate = fs.readFileSync(partialFile, 'utf8');
			hbs.registerPartial(partialName, partialTemplate);
			//console.log("Partial: "+partialName);
			//console.log("Tempalte: "+partialTemplate);
		}
	}
	return partials;
}

module.exports = {
	engine: hbs,

	init: function(viewDir) {
		readPartials(viewDir);
		setHelpers();
	},

	setPartials: function(partial) {
		partials = partial;
	},
	renderError: function(err, res) {
		setDynamicHelpers(req, res, params);
		res.render('error', {
			locals: {
				title: 'company home',
				msg: err.msg,
				status: err.code
			},
			status: err.code,
			partials: partials
		});
	},

	/**
Use this common render function. 
**/
	commonRender: function(req, res, params, view) {
		setDynamicHelpers(req, res, params);
		logger.debug("VIEWNAME: " + view + " PARAMS: " + JSON.stringify(params));

		return res.render(view, {
			locals: params,
			partials: partials
		});
	}

};

