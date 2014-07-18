define(function(require, exports, module) {
  "use strict";

  var Namespace = {
    Collection: require("./Collection"),
    Model: require("./Model"),
    Router: require("./Router"),

    Views: {
      Item: require("./item/view"),
      EditForm: require("./edit/view"),
      CreateFrom: require("./create/view"),
      List: require("./list/view")
    }
  };


  var initialize = function(){
    var router = new Namespace.Router();
      return router;
  };

  module.exports = initialize();


});