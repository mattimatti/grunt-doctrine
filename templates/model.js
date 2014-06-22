/* Generated <%= moduleName %> Model. Override this model with your custom code.*/

define(['app', 'doctrine/model/<%= moduleName %>Base'], function(app, <%= moduleName %>Base) {

    var <%= moduleName %>Model = <%= moduleName %>Base.extend({


        initialize: function() {

        },

        validate: function(attrs, options) {


        }

    });

    return <%=moduleName %>Model;
});