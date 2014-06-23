/* Generated <%= model.moduleName %> ListView */

define(['app', 'backbone'], function(app, Backbone) {

	var <%= model.moduleName %>ListView = Backbone.View.extend({

		<%  if(options.backbone.layoutmanager){ %>

		/************ Backbone.LayoutManager *****************/

		manage: true,


		beforeRender: function() {


		},

		afterRender: function() {


		},

		<% } %>


		/************ Backbone.View *****************/

		template: '',

		initialize: function() {


		}

	});

	return <%=model.moduleName %>ListView;
});