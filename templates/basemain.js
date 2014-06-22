requirejs.config({
   baseUrl:'app',
   paths:{
      'jquery':'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
       'underscore':'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
       'backbone':'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
       'ts':'../templates'
   },
    shim:{

        'underscore':{
            exports:'_'
        },
        'backbone':{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        'imports/bootstrap':{
            deps:['jquery'],
            exports:'Bootstrap'
        }
    }
});






/**
 * Main file creates models and assigns them to their respective view. It initializes router operations once the first fetch
 * takes place.
 */
requirejs( [  'app', 'modules' ], function( app, modules ){
    $(function(){


    });
});