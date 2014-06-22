/* Generated Estimate module */
define( ['app'], function(app){

	var Estimate = {};


	Estimate.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Estimate.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Estimate.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Estimate.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'estimate/create':'createItem',
            'estimate/:id': 'viewItem'
        },


		/**
         * url update causes to show all estimate
         */
        listItems:function(){
          this.cached = { state:'estimate:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'estimate:edit', id:id };
            app.trigger('estimate:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'estimate:create' };
            app.trigger( 'estimate:create' );
        }

	});


	var router = new Estimate.Router;


   return Estimate;
});