/* Generated Currency module */
define( ['app'], function(app){

	var Currency = {};


	Currency.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Currency.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Currency.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Currency.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'currency/create':'createItem',
            'currency/:id': 'viewItem'
        },


		/**
         * url update causes to show all currency
         */
        listItems:function(){
          this.cached = { state:'currency:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'currency:edit', id:id };
            app.trigger('currency:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'currency:create' };
            app.trigger( 'currency:create' );
        }

	});


	var router = new Currency.Router;


   return Currency;
});