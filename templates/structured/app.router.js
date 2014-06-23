define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var logger = require("lib/console");


  // Import the modules
  // Comment out the ones you don't want to initilaize
  <%  var count = collection.length; var index = 0;
        _.each(collection, function(module) { %>var <%= module.moduleName %>Module = require("modules/<%= module.modulePrefix %>/Module");
          <% }); %> 


  require("bootstrap");


  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {



      <%  var count = collection.length; var index = 0;
        _.each(collection, function(module) { %>
          // app.dataModel.<%= module.collectionInstanceName %> = new <%= module.moduleName %>Module.Collection();
          <% }); %> 

      // Use main layout and set Views.
      var Layout = Backbone.Layout.extend({
        el: "main",

        template: require("ldsh!./templates/main"),

        /*
        views: {
          ".users": new User.Views.List({
            collection: this.users
          }),
          ".repos": new Repo.Views.List({
            collection: this.repos
          }),
          ".commits": new Commit.Views.List({
            collection: this.commits
          })
        }*/
      });

      // Render to the page.
      new Layout().render();
    },

    routes: {
      "": "index",

    },

    index: function() {
      console.debug('index');
      // Reset the state and render.
      this.reset();
    },

    // Shortcut for building a url.
    go: function() {
      return this.navigate(_.toArray(arguments).join("/"), true);
    },


    reset: function() {
      // Reset collections to initial state.


      _.each(app.dataModel, function(collection){
        console.debug(arguments);
        collection.fetch();
      });

      // Reset active model.
      app.active = false;
      //this.commits.repo = false;
    }

  });

  module.exports = Router;
});