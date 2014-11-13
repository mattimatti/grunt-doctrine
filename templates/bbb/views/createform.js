define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var logger = require("lib/console");

  var SelectBox  = require("lib/selectbox");

  var OptionsGrid = require("lib/optionsgrid");


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




			<% 
			_.each(model.HasOne, function(relation) { %>  
			  this.setView('.selectbox-<%= relation.field %>', new SelectBox({el: this.$el.find('.selectbox-<%= relation.field %>'), collection: app.dataModel.<%= relation.field %>}));
			<% }) %>


						<% 
			_.each(model.HasMany, function(relation) { %>  

				this.setView('.grid-<%= relation.field %>', new OptionsGrid({el: this.$el.find('.grid-<%= relation.field %>'), collection: app.dataModel.<%= relation.field %>}));


			<% }) %>


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
			app.router.navigate('<%=model.modulePrefix %>/list', true );
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