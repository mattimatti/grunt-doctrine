/* Generated Contact module */
define( ['app'], function(app){

	var Contact = {};


	Contact.Model = Backbone.Model.extend({

		idAttribute: '',

		initialize:function(){

        },

         validate:function( attrs, options ){


         }

	});



	Contact.Collection = Backbone.Collection.extend({

		url:"server_side/collection.php",

		model: Contact.Model,

		comparator:function( o1, o2 ){
            //return o1.get('title' ) > o2.get('title');
        }

	});




	/*
		The router orchestrates what should be displayed in the application.
		Any controler can request a url update, when it takes effect, router notifies the application
		by using app as the dispatcher.
 	*/
	Contact.Router = Backbone.Router.extend({

		 routes: {
            'view/all':'listItems',
            'contact/create':'createItem',
            'contact/:id': 'viewItem'
        },


		/**
         * url update causes to show all contact
         */
        listItems:function(){
          this.cached = { state:'contact:viewall' };

          app.trigger( 'recipe:viewall' );
        },
        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function (id) {
            this.cached = { state:'contact:edit', id:id };
            app.trigger('contact:edit', id );
        },
        /**
         * url update cause to create a new recipe
         */
        createItem:function(){
            this.cached = { state:'contact:create' };
            app.trigger( 'contact:create' );
        }

	});


	var router = new Contact.Router;


   return Contact;
});