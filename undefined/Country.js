/* Generated Country module */
define( ['app'], function(app){

	var Country = {};


	Country.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Country.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Country.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Country.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'country/create':'createItem',
            'country/:id': 'viewItem'
        },


		/**
         * url update causes to show all country
         */
        listItems:function(){
          this.cached = { state:'country:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'country:edit', id:id };
            app.trigger('country:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'country:create' };
            app.trigger( 'country:create' );
        }

	});


	var router = new Country.Router;


   return Country;
});