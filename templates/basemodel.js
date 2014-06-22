/* Generated <%= moduleName %> Base Model */

define(['app', 'backbone'], function(app, Backbone) {

    var <%= moduleName %>Base = Backbone.Model.extend({

    	url: "<%= defaultUrl %>",

        idAttribute: '<%= idAttribute %>'

    });

    return <%=moduleName %>Base;
});