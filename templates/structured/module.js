/*This includes or excludes all modules */

define(['modules/<%= moduleName %>/model/<%= moduleName %>Model', 'modules/<%= moduleName %>/model/<%= moduleName %>Col', 'modules/<%= moduleName %>/<%= moduleName %>Router'], function( <%= moduleName %>Model, <%= moduleName %>Col, <%= moduleName %>Router) {

	var <%= moduleName %>Module = {

		Model : <%= moduleName %>Model,
		Collection : <%= moduleName %>Col,
		router : new <%= moduleName %>Router

	};


	return <%= moduleName %>Module;
});