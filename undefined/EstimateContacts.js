/* Generated EstimateContacts module */
define( ['app'], function(app){

	var EstimateContacts = {};


	EstimateContacts.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	EstimateContacts.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: EstimateContacts.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	EstimateContacts.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'estimate_contacts/create':'createItem',
            'estimate_contacts/:id': 'viewItem'
        },


		/**
         * url update causes to show all estimate_contacts
         */
        listItems:function(){
          this.cached = { state:'estimate_contacts:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'estimate_contacts:edit', id:id };
            app.trigger('estimate_contacts:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'estimate_contacts:create' };
            app.trigger( 'estimate_contacts:create' );
        }

	});


	var router = new EstimateContacts.Router;


   return EstimateContacts;
});