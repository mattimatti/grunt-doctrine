/* Generated Language module */
define( ['app'], function(app){

	var Language = {};


	Language.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Language.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Language.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Language.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'language/create':'createItem',
            'language/:id': 'viewItem'
        },


		/**
         * url update causes to show all language
         */
        listItems:function(){
          this.cached = { state:'language:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'language:edit', id:id };
            app.trigger('language:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'language:create' };
            app.trigger( 'language:create' );
        }

	});


	var router = new Language.Router;


   return Language;
});