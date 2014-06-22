/* Generated Address module */
define( ['app'], function(app){

	var Address = {};


	Address.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Address.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Address.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Address.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'address/create':'createItem',
            'address/:id': 'viewItem'
        },


		/**
         * url update causes to show all address
         */
        listItems:function(){
          this.cached = { state:'address:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'address:edit', id:id };
            app.trigger('address:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'address:create' };
            app.trigger( 'address:create' );
        }

	});


	var router = new Address.Router;


   return Address;
});