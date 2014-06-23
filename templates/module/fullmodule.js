/* Generated <%= moduleName %> module */
define( ['app'], function(app){

	var <%= moduleName %> = {};


	/*
	This is the model use for each <%= moduleName %>View
	 */
	<%= moduleName %>.Model = Backbone.Model.extend({

		idAttribute: '<%= idAttribute %>',

		initialize:function(){

        },

        validate:function( attrs, options ){


        }

	});


	/**
	 * <%= moduleName %>.Collection has a list of models
	 */
	<%= moduleName %>.Collection = Backbone.Collection.extend({

		url:"<%= defaultUrl %>",

		model: <%= moduleName %>,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	<%= moduleName %>Module.Router = Backbone.Router.extend({

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


	var router = new <%= moduleName %>.Router;


   return <%= moduleName %>;
});