/* Generated <%= model.moduleName %> Base Model */

define(function(require, exports, module) {
  "use strict";


   var Backbone =  require("backbone");


	<%  if(options.backbone.relational){ %>
	var Model = Backbone.RelationalModel.extend({
	<% }else{ %>
	var Model = Backbone.Model.extend({
	<% } %>



		// ********* Backbone.Model **************


		idAttribute: '<%= model.idAttribute %>',



		<%  if(options.backbone.modeldefaults){ %>

		defaults: {
			<%  var count = model.fields.length; var index = 0;
				_.each(model.fields, function(field) { %>  
					<%= field.name %>: ''<% if(++index !== count ){ %>,<% }; %><% }); %>},
		<% } %>


		// Last generated property
		url: '<%= model.defaultUrl %>'


	});

	
    module.exports = Model;
});