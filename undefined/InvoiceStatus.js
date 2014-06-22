/* Generated InvoiceStatus module */
define( ['app'], function(app){

	var InvoiceStatus = {};


	InvoiceStatus.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	InvoiceStatus.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: InvoiceStatus.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	InvoiceStatus.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'invoice_status/create':'createItem',
            'invoice_status/:id': 'viewItem'
        },


		/**
         * url update causes to show all invoice_status
         */
        listItems:function(){
          this.cached = { state:'invoice_status:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'invoice_status:edit', id:id };
            app.trigger('invoice_status:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'invoice_status:create' };
            app.trigger( 'invoice_status:create' );
        }

	});


	var router = new InvoiceStatus.Router;


   return InvoiceStatus;
});