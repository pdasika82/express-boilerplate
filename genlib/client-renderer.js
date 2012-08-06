var HoganTemplateRenderer = require('hogan-template-compiler');

module.exports =  function (app, options) {
		var layouts = options.layoutsDirectory || __dirname + '../views/client/layouts';
		var partials = options.partialsDirectory || __dirname + '../views/client/partials';
		hoganTemplateRenderer = new HoganTemplateRenderer({
			layoutsDirectory: layouts, 
			partialsDirectory: partials 
		});

		app.get("/templates.js", function(req, res) {
			res.contentType("templates.js");
			res.send(hoganTemplateRenderer.getSharedTemplates());
		});
};

