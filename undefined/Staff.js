/* Generated Staff module */
define( ['app'], function(app){

	var Staff = {};


	Staff.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Staff.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Staff.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Staff.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'staff/create':'createItem',
            'staff/:id': 'viewItem'
        },


		/**
         * url update causes to show all staff
         */
        listItems:function(){
          this.cached = { state:'staff:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'staff:edit', id:id };
            app.trigger('staff:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'staff:create' };
            app.trigger( 'staff:create' );
        }

	});


	var router = new Staff.Router;


   return Staff;
});