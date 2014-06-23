/* Generated <%= model.moduleName %> Base Model */

define(['app', 'backbone'], function(app, Backbone) {


	<%  if(options.backbone.relational){ %>
	var <%= model.moduleName %>Base = Backbone.RelationalModel.extend({
	<% }else{ %>
	var <%= model.moduleName %>Base = Backbone.Model.extend({
	<% } %>



		// ********* Backbone.Model **************


		idAttribute: '<%= model.idAttribute %>',



		<%  if(options.backbone.modeldefaults){ %>

		defaults: {
			<%  var count = model.fields.length; var index = 0;
				_.each(model.fields, function(field) { %>  
					<%= field.name %>: ''<% if(++index !== count ){ %>,<% }; %>  
			<% }); %>  
		},

		<% } %>






		<%  if(options.backbone.relational){ %>

		<%  var count = model.HasOne.length + model.HasMany.length; var index = 0;%>
		<%  var useBoth = count > model.HasOne.length; %>


		// ********* Backbone.Relational **************

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
		<% } %>

		<%  if(options.backboneForm){ %>


		// ********* Backbone.Form **************


		 template: _.template($('#formTemplate').html()),

		/**
			title:      { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
	        name:       'Text',
	        email:      { validators: ['required', 'email'] },
	        birthday:   'Date',
	        password:   'Password',
	        address:    { type: 'NestedModel', model: Address },
	        notes:      { type: 'List', itemType: 'Text' }
		*/

		 schema: {

		 		<%  var count = model.fields.length; var index = 0;
					_.each(model.fields, function(field) { %>  
						<%= field.name %>: 'Text'<% if(++index !== count ){ %>,<% }; %>  
				<% }); %>  



		 },

		<% } %>


		// Last generated property
		url: '<%= model.defaultUrl %>'


	});

	return <%= model.moduleName %>Base;
});