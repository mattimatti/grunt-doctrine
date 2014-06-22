/* Generated User module */
define( ['app'], function(app){

	var User = {};


	User.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	User.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: User.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	User.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'user/create':'createItem',
            'user/:id': 'viewItem'
        },


		/**
         * url update causes to show all user
         */
        listItems:function(){
          this.cached = { state:'user:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'user:edit', id:id };
            app.trigger('user:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'user:create' };
            app.trigger( 'user:create' );
        }

	});


	var router = new User.Router;


   return User;
});