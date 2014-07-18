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
			logger.debug('bind model',this.model);
			this.modelBinder.bind(this.model, this.$('.form'));
		},


		serialize: function() {
		   return { model: this.model };
		},


		<% }else{ %>

		manage: false,

		<% } %>


		/************ Backbone.View *****************/

		submitForm: function() {
			logger.debug('submitForm');
			this.listenToOnce(this.model,'sync',this.onSaveSuccess,this);
			this.model.save();
		},

		onSaveSuccess: function(){
			logger.debug('onSaveSuccess', this.model);
			this.render();
		},


		initialize: function() {
			logger.debug('initialize');

			this.modelBinder = new Backbone.ModelBinder();
			logger.debug('modelBinder',this.modelBinder);
			
			this.listenTo(this.model, 'change', this.onModelChanged, this);
		},


		onModelChanged: function(){
			logger.debug('onModelChanged',this.model);

		},

		events : {
			"click .submitForm": "submitForm"
	    }


	});

	module.exports  = Layout;
});