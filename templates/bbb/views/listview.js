/* Generated <%= model.moduleName %> ListView */

define(function(require, exports, module) {
  "use strict";

  var app = require("app");


	var Layout = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		el: false,
		

		template: require(["ldsh!./template"]),


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