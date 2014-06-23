/* Generated <%= model.moduleName %> Model. Override this model with your custom code.*/

define(['app', 'doctrine/model/<%= model.moduleName %>Base'], function(app, <%= model.moduleName %>Base) {

	var <%= model.moduleName %>Model = <%= model.moduleName %>Base.extend({

		initialize: function() {

		},

		validate: function(attrs, options) {


		}

	});

	return <%=model.moduleName %>Model;
});