define(function(require, exports, module) {
  "use strict";

  module.exports = {
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
});