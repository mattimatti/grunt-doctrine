/*This includes or excludes all modules */

define(['modules/MyModule'], function(MyModule) {

	var Modules = {};

	Modules.MyModule =  new MyModule();



	return Modules;
});