/* Generated EstimateLine module */
define( ['app'], function(app){

	var EstimateLine = {};


	EstimateLine.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	EstimateLine.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: EstimateLine.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	EstimateLine.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'estimate_line/create':'createItem',
            'estimate_line/:id': 'viewItem'
        },


		/**
         * url update causes to show all estimate_line
         */
        listItems:function(){
          this.cached = { state:'estimate_line:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'estimate_line:edit', id:id };
            app.trigger('estimate_line:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'estimate_line:create' };
            app.trigger( 'estimate_line:create' );
        }

	});


	var router = new EstimateLine.Router;


   return EstimateLine;
});