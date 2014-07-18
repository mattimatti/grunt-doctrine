define(function(require, exports, module) {
    "use strict";

    var app = require('app');

    var logger = require("lib/console");

    var Backbone = require('backbone');

    var Collection = require("./Collection");

    var ItemView = require("./item/view");

    var EditView = require("./edit/view");

    var CreateView = require("./create/view");

    var ListView = require("./list/view");


    var Router = Backbone.Router.extend({

        cached : {},

        view : null,

        el: '.main',

        initialize: function() {
            logger.debug('initialize');

            this.collection = app.dataModel.<%= model.modulePrefix %> = new Collection();

            // Listen to app events
            // this.listenTo(app, '', this.onEvent, this);

        },


        routes: {
            '<%=model.modulePrefix %>/list': 'listAction',
            '<%=model.modulePrefix %>/create': 'createAction',
            '<%=model.modulePrefix %>/edit/:id': 'editAction',
            '<%=model.modulePrefix %>/:id': 'viewAction'
        },



        /**
         * url update causes to show all <%=model.modulePrefix %>
         */
        listAction: function() {
            logger.debug('listAction');
            this.cached = {
                state: '<%=model.modulePrefix %>:viewall'
            };

            app.trigger('<%=model.modulePrefix %>:viewall');

            this.render(ListView,{collection:this.collection});

        },



        /**
         * url update causes to edit one <%=model.modulePrefix %>
         * @param id
         */
        viewAction: function(id) {
            logger.debug('viewAction');
            this.cached = {
                state: '<%=model.modulePrefix %>:edit',
                id: id
            };
            app.trigger('<%=model.modulePrefix %>:edit', id);


            var viewModel = this.collection.get(id);

           
            this.render(ItemView,{model:viewModel});
        },



        /**
         * url update cause to create a new <%=model.modulePrefix %>
         */
        createAction: function() {
            logger.debug('createAction');
            this.cached = {
                state: '<%=model.modulePrefix %>:create'
            };
            app.trigger('<%=model.modulePrefix %>:create');

            this.render(CreateView,{model:this.collection.create()});
        },


        /**
         * url update cause to edit a  <%=model.modulePrefix %>
         * @param id
         */
        editAction: function(id) {
            logger.debug('editAction');
            this.cached = {
                state: '<%=model.modulePrefix %>:create'
            };
            app.trigger('<%=model.modulePrefix %>:create');

            var editableModel = this.collection.get(id);

            this.render(EditView,{model:editableModel});
        },


        /**
         * Render a view
         */
        render: function(ViewClass, dataObj) {
            this.view = app.view.setView(this.el, new ViewClass(dataObj));
            this.view.render();
        }



    });


    module.exports = Router;
});