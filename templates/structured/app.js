define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var _ = require("lodash");
  var $ = require("jquery");
  var Backbone = require("backbone");
  var Layout = require("layoutmanager");

  // Alias the module for easier identification.
  var app = module.exports;


   // API endpoint.
  app.api = "<%= options.api.baseuri %>";


  // A model storage
  app.dataModel = {};


  // The root path to run the application through.
  app.root = "/";

});