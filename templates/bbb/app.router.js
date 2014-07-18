define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var logger = require("lib/console");

  var MainLayout = require("view/layout");

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function() {

      logger.debug('initialize');

      this.initLayout();

      this.initModules();

    },


    // Initialize modules or routers or bundles
    // and set a reference to the app.
    initModules: function() {

      logger.debug('initModules');

      app.modules.dashboard = require("modules/dashboard/Module");

      // Every module router
      <%  var count = collection.length; var index = 0;
        _.each(collection, function(module) { %>
          app.modules.<%= module.collectionInstanceName %> = require("modules/<%= module.modulePrefix %>/Module");
          <% }); %>

    },


    // initilaize the layout.
    initLayout: function() {

      logger.debug('initLayout');

      // Use main layout and set Views.
      var main = new MainLayout();

      app.view = main;
      $("body").empty().append(main.el);
      main.render();

    },


    //routes: {
    //  "/": "indexAction"
    //},

    //indexAction: function() {
    //  console.debug('indexAction');
    //  // Reset the state and render.
    //  this.reset();
    //},

    // Shortcut for building a url.
    go: function() {
      return this.navigate(_.toArray(arguments).join("/"), true);
    },


    reset: function() {
      // Reset collections to initial state.


      _.each(app.dataModel, function(collection){
        collection.fetch({cache: true});
      });

      // Reset active model.
      app.active = false;
      //this.commits.repo = false;
    }

  });

  module.exports = Router;
});