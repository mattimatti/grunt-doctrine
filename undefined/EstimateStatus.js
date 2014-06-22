/* Generated EstimateStatus module */
define( ['app'], function(app){

	var EstimateStatus = {};


	EstimateStatus.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	EstimateStatus.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: EstimateStatus.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	EstimateStatus.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'estimate_status/create':'createItem',
            'estimate_status/:id': 'viewItem'
        },


		/**
         * url update causes to show all estimate_status
         */
        listItems:function(){
          this.cached = { state:'estimate_status:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'estimate_status:edit', id:id };
            app.trigger('estimate_status:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'estimate_status:create' };
            app.trigger( 'estimate_status:create' );
        }

	});


	var router = new EstimateStatus.Router;


   return EstimateStatus;
});