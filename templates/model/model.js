define(function(require, exports, module) {
	"use strict";

	var logger = require('lib/console');
	var app = require('app');
	//var BaseModel = require('doctrine/model/<%= model.moduleName %>Base');

	var Backbone =  require("backbone");

	//var Model = BaseModel.extend({

	<%  if(options.backbone.relational){ %>
	var Model = Backbone.RelationalModel.extend({
	<% }else{ %>
	var Model = Backbone.Model.extend({
	<% } %>

		idAttribute: '<%= model.idAttribute %>',

		<%  if(options.backbone.modeldefaults){ %>

		defaults: {
			<%  var count = model.fields.length; var index = 0;
				_.each(model.fields, function(field) { %>  
					<%= field.name %>: ''<% if(++index !== count ){ %>,<% }; %><% }); %>},
		<% } %>


		url: app.api + '<%= model.defaultUrl %>',


		initialize: function() {
			
		},


		<%  if(options.backbone.relational){ %>

		<%  var count = model.HasOne.length + model.HasMany.length; var index = 0;%>
		<%  var useBoth = count > model.HasOne.length; %>

		relations: [
					<%  _.each(model.HasOne, function(relation) { 
					%>{
							type: Backbone.HasOne,
							key: '<%= relation.field %>',
							relatedModel: require('<%= relation.LinkedModel %>')
							<%  if(relation.isInversed){ %>,
							reverseRelation: {
								type: Backbone.HasMany,
								key: '<%= relation.inversedBy %>',
								includeInJSON: '<%= relation.includeInJSON %>'
							}
							<%  }// end if isinversed %>
						}<% if(!useBoth && ++index !== count ){ %>,<% }; %>  
						 <% if(useBoth){ %>,<% }; %>  
					<% }); %>


					<%  _.each(model.HasMany, function(relation) {  %>  
					<%  //console.log('HasMany');  %>  
					<%  //console.dir(relation);  %>  
					  {
							type: Backbone.HasMany,
							key: '<%= relation.field %>',
							relatedModel: require('<%= relation.LinkedModel %>'),
							includeInJSON: Backbone.Model.prototype.idAttribute,
							collectionType: require('<%= relation.LinkedCol %>')
							<%  if(relation.isMapped){ %>,
							reverseRelation: {
								type: Backbone.HasOne,
								key: '<%= relation.mappedBy %>'
							}
							<% }; %>  
						}<% if(++index !== count ){ %>,<% }; %>  
					<% }); %>
		],
		<% } %>

		<%  if(options.backbone.form){ %>


		// ********* Backbone.Form **************


		 template: _.template($('#formTemplate').html()),

		 schema: {

		 		<%  var count = model.fields.length; var index = 0;
					_.each(model.fields, function(field) { %>  
						<%= field.name %>: 'Text'<% if(++index !== count ){ %>,<% }; %><% }); %>  



		 },

		<% } %>




		validate: function(attrs, options) {

		}

	});

	module.exports = Model;
});