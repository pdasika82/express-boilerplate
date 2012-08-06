SearchView = Backbone.View.extend({

el: $('#typeahead'),

initialize: function(){
	this.el.typeahead({
		source: ['Google','Yahoo','Linkedin','Facebook']
	});
}

});
