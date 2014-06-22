/* Generated Expense module */
define( ['app'], function(app){

	var Expense = {};


	Expense.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Expense.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Expense.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Expense.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'expense/create':'createItem',
            'expense/:id': 'viewItem'
        },


		/**
         * url update causes to show all expense
         */
        listItems:function(){
          this.cached = { state:'expense:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'expense:edit', id:id };
            app.trigger('expense:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'expense:create' };
            app.trigger( 'expense:create' );
        }

	});


	var router = new Expense.Router;


   return Expense;
});