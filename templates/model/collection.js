define(function(require, exports, module) {
  "use strict";

    var app = require("app");

    var Backbone =  require("backbone");

	var logger = require("lib/console");

    var Model = require("./Model");

    var Collection = Backbone.Collection.extend({

        url: app.api + '<%= model.defaultUrl %>',

        model: Model ,

        comparator: function(o1, o2) {
            //return o1.get('title' ) > o2.get('title');
        },

        initialize: function() {
          	logger.info('initialized');
        }

    });

    module.exports = Collection;

});