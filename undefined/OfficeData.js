/* Generated OfficeData module */
define( ['app'], function(app){

	var OfficeData = {};


	OfficeData.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	OfficeData.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: OfficeData.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	OfficeData.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'office_data/create':'createItem',
            'office_data/:id': 'viewItem'
        },


		/**
         * url update causes to show all office_data
         */
        listItems:function(){
          this.cached = { state:'office_data:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'office_data:edit', id:id };
            app.trigger('office_data:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'office_data:create' };
            app.trigger( 'office_data:create' );
        }

	});


	var router = new OfficeData.Router;


   return OfficeData;
});