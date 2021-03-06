// Navigation
define(function(require, exports, module) {
  "use strict";


    var app = require("app");

    var logger = require("lib/console");

	var Layout = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		template: require("ldsh!../templates/navigation"),

		el:false,


		beforeRender: function() {
			logger.debug('beforeRender');

		},

		afterRender: function() {
			logger.debug('afterRender');
		},


		<% }else{ %>

		manage: false,

		<% } %>


		initialize: function() {
			logger.debug('initialize');
		}

	});

	module.exports  = Layout;
});