define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var logger = require("lib/console");


	var Layout = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		template: require("ldsh!./template"),


		beforeRender: function() {
			logger.debug('beforeRender');

		},

		afterRender: function() {
			logger.debug('afterRender');

		},


		serialize: function() {
		   return { model: this.model };
		},


		<% }else{ %>

		manage: false,

		<% } %>


		/************ Backbone.View *****************/


		events: {
      		click: "clickAction"
    	},

    	clickAction: function() {
			logger.debug('clickAction');

		},

		initialize: function() {
			logger.debug('initialize');
			this.listenTo(this.model,'all',this.render,this);
		}

	});

	module.exports  = Layout;
});