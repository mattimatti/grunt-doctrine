define(function(require, exports, module) {
  "use strict";

  module.exports = {
    Collection: require("./Collection"),
    Model: require("./Model"),

    Views: {
      Item: require("./item/view"),
      EditForm: require("./item/edit"),
      CreateFrom: require("./item/create"),
      List: require("./list/list")
    }
  };
});