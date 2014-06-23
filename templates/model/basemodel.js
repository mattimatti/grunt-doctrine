/* Generated <%= model.moduleName %> Base Model */

define(['app', 'backbone'], function(app, Backbone) {

	var <%= model.moduleName %>Base = Backbone.RelationalModel.extend({

		url: "<%= model.defaultUrl %>",

		<%  var count = model.HasOne.length + model.HasMany.length; var index = 0;%>
		<%  var useBoth = count > model.HasOne.length; %>

		relations: [
					<%  _.each(model.HasOne, function(relation) { 
					%>{
							type: Backbone.HasOne,
							key: '<%= relation.field %>',
							relatedModel: '<%= relation.LinkedModel %>'
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
							relatedModel: '<%= relation.LinkedModel %>',
							includeInJSON: Backbone.Model.prototype.idAttribute,
							collectionType: '<%= relation.LinkedCol %>'
							<%  if(relation.isMapped){ %>,
							reverseRelation: {
								type: Backbone.HasOne,
								key: '<%= relation.mappedBy %>'
							}
							<% }; %>  
						}<% if(++index !== count ){ %>,<% }; %>  
					<% }); %>
		],

		idAttribute: '<%= model.idAttribute %>',


		defaults: {
			<%  var count = model.fields.length; var index = 0;
				_.each(model.fields, function(field) { %>  
					<%= field.name %>: ''<% if(++index !== count ){ %>,<% }; %>  
			<% }); %>  
		}

	});

	return <%= model.moduleName %>Base;
});