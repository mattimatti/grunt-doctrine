/* Generated Office module */
define( ['app'], function(app){

	var Office = {};


	Office.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Office.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Office.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Office.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'office/create':'createItem',
            'office/:id': 'viewItem'
        },


		/**
         * url update causes to show all office
         */
        listItems:function(){
          this.cached = { state:'office:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'office:edit', id:id };
            app.trigger('office:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'office:create' };
            app.trigger( 'office:create' );
        }

	});


	var router = new Office.Router;


   return Office;
});