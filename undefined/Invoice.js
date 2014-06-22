/* Generated Invoice module */
define( ['app'], function(app){

	var Invoice = {};


	Invoice.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Invoice.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Invoice.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Invoice.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'invoice/create':'createItem',
            'invoice/:id': 'viewItem'
        },


		/**
         * url update causes to show all invoice
         */
        listItems:function(){
          this.cached = { state:'invoice:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'invoice:edit', id:id };
            app.trigger('invoice:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'invoice:create' };
            app.trigger( 'invoice:create' );
        }

	});


	var router = new Invoice.Router;


   return Invoice;
});