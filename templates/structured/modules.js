/*This includes or excludes all modules */

define([<%  var count = collection.length; var index = 0;
				_.each(collection, function(module) { %>
					'modules/<%= module.moduleName %>/<%= module.moduleName %>Module'<% if(++index !== count ){ %>,<% }; %>
					<% }); %>]

	, function(
		<%  var count = collection.length; var index = 0;
				_.each(collection, function(module) { %><%= module.moduleName %>Module<% if(++index !== count ){ %>,<% }; %>
					<% }); %>) 
	{

	var Modules = {};


<%  var count = collection.length; var index = 0;
				_.each(collection, function(module) { %>Modules.<%= module.moduleName %> = <%= module.moduleName %>Module.bootstrap();<% }); %> 

	return Modules;
});