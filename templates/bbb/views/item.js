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
			logger.debug('afterRender', this.model);
			this.modelBinder.bind(this.model, this.el);
		},


		serialize: function() {
		   return { model: this.model };
		},


		<% }else{ %>

		manage: false,

		<% } %>


		/************ Backbone.View *****************/


		events: {
      		'click .delete-item': "deleteAction",
      		'click .edit-item': "editAction"
    	},

    	deleteAction: function() {
			this.trigger('delete', this.model);
		},

    	editAction: function() {
			logger.debug('editAction');
			this.trigger('edit', this.model);
		},

		initialize: function() {
			logger.debug('initialize');
			this.modelBinder = new Backbone.ModelBinder();
			
		}

	});

	module.exports  = Layout;
});