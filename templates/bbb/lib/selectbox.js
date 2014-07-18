// Navigation
define(function(require, exports, module) {
  "use strict";


    var app = require("app");

    var logger = require("lib/console");

	var SelectBox = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		el:false,


		beforeRender: function() {
			this.$el.empty();
		},

		afterRender: function() {
			
			this.$el.empty();

			var me = this;

			 this.collection.each(function(model) {
			 	console.debug('iterate model', model.attributes);
			 	me.$el.append($('<option/>').attr('value',model.getId()).text(model.getLabel()));
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

	module.exports  = SelectBox;
});