/* Generated InvoiceType module */
define( ['app'], function(app){

	var InvoiceType = {};


	InvoiceType.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	InvoiceType.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: InvoiceType.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	InvoiceType.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'invoice_type/create':'createItem',
            'invoice_type/:id': 'viewItem'
        },


		/**
         * url update causes to show all invoice_type
         */
        listItems:function(){
          this.cached = { state:'invoice_type:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'invoice_type:edit', id:id };
            app.trigger('invoice_type:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'invoice_type:create' };
            app.trigger( 'invoice_type:create' );
        }

	});


	var router = new InvoiceType.Router;


   return InvoiceType;
});