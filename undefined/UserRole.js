/* Generated UserRole module */
define( ['app'], function(app){

	var UserRole = {};


	UserRole.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	UserRole.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: UserRole.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	UserRole.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'user_role/create':'createItem',
            'user_role/:id': 'viewItem'
        },


		/**
         * url update causes to show all user_role
         */
        listItems:function(){
          this.cached = { state:'user_role:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'user_role:edit', id:id };
            app.trigger('user_role:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'user_role:create' };
            app.trigger( 'user_role:create' );
        }

	});


	var router = new UserRole.Router;


   return UserRole;
});