/* Generated <%= model.moduleName %> ListView */

define(function(require, exports, module) {
  "use strict";

  var app = require("app");


	var Layout = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,


		beforeRender: function() {


		},

		afterRender: function() {


		},


		serialize: function() {
		   return { model: this.model };
		},


		<% }else{ %>

		manage: false,

		<% } %>


		/************ Backbone.View *****************/

		template: require("ldsh!./template"),

		events: {
      		click: "sayHello"
    	},

    	sayHello: function() {


		},

		initialize: function() {


		}

	});

	module.exports  = Layout;
});