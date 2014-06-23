/* Generated <%= model.moduleName %> Collection */

define(['app', 'backbone','model/<%= model.moduleName %>Model'], function(app, Backbone, <%= model.moduleName %>Model) {

    var <%= model.moduleName %>Col = Backbone.Collection.extend({

        url: "<%= model.defaultUrl %>",

        model: <%= model.moduleName %>Model ,

        comparator: function(o1, o2) {
            //return o1.get('title' ) > o2.get('title');
        }

    });


    return <%= model.moduleName %>Col ;
});