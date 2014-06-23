define(function(require, exports, module) {
	"use strict";

	var logger = require('lib/console');
	var app = require('app');
	var BaseModel = require('doctrine/model/<%= model.moduleName %>Base');

	var Model = BaseModel.extend({

		initialize: function() {
			
		},

		validate: function(attrs, options) {

		}

	});

	module.exports = Model;
});