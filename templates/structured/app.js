define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var _ = require("lodash");
  
  var $ = require("jquery");
  
  var Backbone = require("backbone");
  
  var Layout = require("layoutmanager");

  var Relational = require("backbone-relational");


<%  if(options.backbone.fetchcache){ %>
  // Installed with npm postinstall
  //var FetchCache = require("backbone-fetch-cache");

  // Backbone.fetchCache.localStorage = false;
  <% } %>







  // Alias the module for easier identification.
  var app = module.exports;


   // API endpoint.
  app.api = "<%= options.endpoint %>";


  // A model storage
  app.dataModel = {};


  // The root path to run the application through.
  app.root = "/";

});