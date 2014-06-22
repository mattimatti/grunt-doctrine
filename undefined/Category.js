/* Generated Category module */
define( ['app'], function(app){

	var Category = {};


	Category.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Category.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Category.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Category.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'category/create':'createItem',
            'category/:id': 'viewItem'
        },


		/**
         * url update causes to show all category
         */
        listItems:function(){
          this.cached = { state:'category:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'category:edit', id:id };
            app.trigger('category:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'category:create' };
            app.trigger( 'category:create' );
        }

	});


	var router = new Category.Router;


   return Category;
});