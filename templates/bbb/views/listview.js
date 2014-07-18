/* Generated <%= model.moduleName %> ListView */

define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var logger = require("lib/console");

  var ItemView = require("../item/view");

	var Layout = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,

		template: require("ldsh!./template"),

		beforeRender: function() {
			logger.debug('beforeRender', this.collection);

		},

		afterRender: function() {
			logger.debug('afterRender', this.collection);

			 this.collection.each(function(model) {
			 	console.debug('iterate model', model.attributes);
		      	var row = this.insertView('.<%= model.moduleName %>-body',new ItemView({tagName:'tr',model:model, template:require("ldsh!./row")}));
		      		row.render();

 				this.listenTo(row,'edit', this.editAction, this);
 				this.listenTo(row,'delete', this.deleteAction, this);

		    }, this);




		},


		serialize: function() {
		   return { model: this.model };
		},


		<% }else{ %>

		manage: false,

		<% } %>


		/************ Backbone.View *****************/


		events: {
    	},

    	deleteAction: function(model) {
			logger.debug('deleteAction',model);
			this.listenToOnce(model,'sync',this.render,this);
			model.destroy({wait:true});
		},

    	editAction: function(model) {
			logger.debug('editAction',model);
			app.router.navigate('#<%=model.modulePrefix %>/edit/' + model.getId() , true);
		},

		initialize: function() {
			logger.debug('initialize');
			this.listenTo(this.collection,'sync',this.render,this);
		}

	});

	module.exports  = Layout;
});