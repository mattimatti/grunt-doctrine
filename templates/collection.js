/* Generated <%= moduleName %> Collection */

define(['app', 'backbone','model/<%= moduleName %>Model'], function(app, Backbone, <%= moduleName %>Model) {

    var <%= moduleName %>Col = Backbone.Collection.extend({

        url: "<%= defaultUrl %>",

        model: <%= moduleName %>Model ,

        comparator: function(o1, o2) {
            //return o1.get('title' ) > o2.get('title');
        }

    });


    return <%=moduleName %>Col ;
});