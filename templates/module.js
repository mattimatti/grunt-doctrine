/*This includes or excludes all modules */

define([, 'model/<%= moduleName %>Model', 'model/<%= moduleName %>Col', 'router/<%= moduleName %>Router'], function( <%= moduleName %>Model, <%= moduleName %>Col, <%= moduleName %>Router) {

	var <%= moduleName %>Module = {

		Model : <%= moduleName %>Model,
		Collection : <%= moduleName %>Col,
		router : new <%= moduleName %>Router

	};


	return <%= moduleName %>Module;
});