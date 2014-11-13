// Navigation
define(function(require, exports, module) {
  "use strict";


    var app = require("app");

    var logger = require("lib/console");

	var OptionsGrid = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		el:false,

		tagName: 'table',


		beforeRender: function() {
			this.$el.empty();
		},

		afterRender: function() {
			
			this.$el.empty();

			var me = this;

			 this.collection.each(function(model) {
			 	console.debug('iterate model', model.attributes);
			 	me.$el.append($('<tr><td>'+model.getId()+'</td><td>'+model.getLabel()+'</td></tr>'));
		    }, this);
		},


		<% }else{ %>

		manage: false,

		<% } %>


		initialize: function() {
			this.listenTo(this.collection, 'sync', this.render, this);
			this.collection.fetch();
		}

	});

	module.exports  = OptionsGrid;
});