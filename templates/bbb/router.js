define(function(require, exports, module) {
    "use strict";

    var app = require('app');

    var console = require('lib/console');
    
    var Backbone = require('backbone');

    var Router = Backbone.Router.extend({

        routes: {
            '<%=model.modulePrefix %>/list': 'listItems',
            '<%=model.modulePrefix %>/create': 'createItem',
            '<%=model.modulePrefix %>/:id': 'viewItem'
        },



        /**
         * url update causes to show all <%=model.modulePrefix %>
         */
        listItems: function() {
            this.cached = {
                state: '<%=model.modulePrefix %>:viewall'
            };

            app.trigger('recipe:viewall');
        },



        /**
         * url update causes to edit one recipe
         * @param id
         */
        viewItem: function(id) {
            this.cached = {
                state: '<%=model.modulePrefix %>:edit',
                id: id
            };
            app.trigger('<%=model.modulePrefix %>:edit', id);
        },



        /**
         * url update cause to create a new recipe
         */
        createItem: function() {
            this.cached = {
                state: '<%=model.modulePrefix %>:create'
            };
            app.trigger('<%=model.modulePrefix %>:create');
        }



    });


    module.exports = Router;
});