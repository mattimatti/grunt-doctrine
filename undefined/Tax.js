/* Generated Tax module */
define( ['app'], function(app){

	var Tax = {};


	Tax.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Tax.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Tax.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Tax.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'tax/create':'createItem',
            'tax/:id': 'viewItem'
        },


		/**
         * url update causes to show all tax
         */
        listItems:function(){
          this.cached = { state:'tax:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'tax:edit', id:id };
            app.trigger('tax:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'tax:create' };
            app.trigger( 'tax:create' );
        }

	});


	var router = new Tax.Router;


   return Tax;
});