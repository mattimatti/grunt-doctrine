/* Generated InvoiceLine module */
define( ['app'], function(app){

	var InvoiceLine = {};


	InvoiceLine.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	InvoiceLine.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: InvoiceLine.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	InvoiceLine.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'invoice_line/create':'createItem',
            'invoice_line/:id': 'viewItem'
        },


		/**
         * url update causes to show all invoice_line
         */
        listItems:function(){
          this.cached = { state:'invoice_line:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'invoice_line:edit', id:id };
            app.trigger('invoice_line:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'invoice_line:create' };
            app.trigger( 'invoice_line:create' );
        }

	});


	var router = new InvoiceLine.Router;


   return InvoiceLine;
});