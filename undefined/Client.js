/* Generated Client module */
define( ['app'], function(app){

	var Client = {};


	Client.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Client.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Client.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Client.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'client/create':'createItem',
            'client/:id': 'viewItem'
        },


		/**
         * url update causes to show all client
         */
        listItems:function(){
          this.cached = { state:'client:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'client:edit', id:id };
            app.trigger('client:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'client:create' };
            app.trigger( 'client:create' );
        }

	});


	var router = new Client.Router;


   return Client;
});