/* Generated Role module */
define( ['app'], function(app){

	var Role = {};


	Role.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Role.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Role.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Role.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'role/create':'createItem',
            'role/:id': 'viewItem'
        },


		/**
         * url update causes to show all role
         */
        listItems:function(){
          this.cached = { state:'role:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'role:edit', id:id };
            app.trigger('role:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'role:create' };
            app.trigger( 'role:create' );
        }

	});


	var router = new Role.Router;


   return Role;
});