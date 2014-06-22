/* Generated <%= moduleName %> Router */

define(['app', 'backbone','model/<%= moduleName %>Model','model/<%= moduleName %>Col'], function(app, Backbone, <%= moduleName %>Model,, <%= moduleName %>Col) {

    var <%= moduleName %>Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            '<%=modulePrefix %>/create':'createItem',
            '<%=modulePrefix %>/:id': 'viewItem'
        },



		/**
         * url update causes to show all <%=modulePrefix %>
         */
        listItems:function(){
          this.cached = { state:'<%=modulePrefix %>:viewall' };

          app.trigger( 'recipe:viewall' );
        },



        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'<%=modulePrefix %>:edit', id:id };
            app.trigger('<%=modulePrefix %>:edit', id );
        },




        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'<%=modulePrefix %>:create' };
            app.trigger( '<%=modulePrefix %>:create' );
        }

        

    });


    return <%=moduleName %>Router;
});