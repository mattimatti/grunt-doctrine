/*
 * grunt-doctrine
 *
 *
 * Copyright (c) 2014 mattimatti
 * Licensed under the MIT license.
 */

'use strict';

var xml2js = require('xml2js');
var _ = require('underscore-contrib');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('doctrine', 'A plugin to convert doctrine xml annotations intto backbone models and collections. useful in conjunction with doctrine apigility', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode: 'module',
      separator: ',',
      structured: {
        all: false,
        crud: true
      }
    });


    // validate the options
    if (!_validateOptions(options)) {
      return;
    }

    // Iterate over all specified file groups.
    this.filesSrc.forEach(function(file) {


      var xmlData = grunt.file.read(file);

      var json = {};

      var parseString = require('xml2js').parseString;
      parseString(xmlData, {
        trim: true,
        mergeAttrs: true,
        explicitArray: false
      }, function(err, result) {
        json = result;
      });


      // parse entitydata

      var entityData = _parseJson(json);

      // build files
      switch (options.mode) {

        case 'structured':
          _createStructured(entityData, options);
          break;

        case 'module':
          //_createFullModule(entityData, options);
          break;

      }



    }); // end foreach


    // Print a success message.
    grunt.log.writeln('Done!');


  });



  // Create a full module
  var _createFullModule = function(entityData, options) {

    var template = _.template(grunt.file.read('templates/fullmodule.js'));

    var fileCont = template(entityData);

    grunt.file.write(options.appname + '/allinone/' + entityData.moduleFileName, fileCont);

  };



  var _createStructured = function(entityData, options) {

    // ORM Base
    _createFromTemplate(entityData, 'basemodel', 'doctrine/model', 'Base', options);


    // Model and collection
    _createFromTemplate(entityData, 'model', 'model', 'Model', options);
    _createFromTemplate(entityData, 'collection', 'model', 'Col', options);


     if (options.structured.crud) {
      // Router
      _createFromTemplate(entityData, 'router', 'router', 'Router', options);
     }



    // Module
    _createFromTemplate(entityData, 'module', 'modules', 'Module', options);


    if (options.structured.all) {

      // Common Application stuff... Optional.
      _copyFromTemplate('baserouter', 'doctrine/base', 'BaseRouter', options);
      _copyFromTemplate('basecollection', 'doctrine/base', 'BaseCollection', options);
      _copyFromTemplate('baseapp', '', 'app', options);
      _copyFromTemplate('basemain', '', 'main', options);
      _copyFromTemplate('modules', '', 'importmodules', options);
    }



  };



  // copy from template
  var _copyFromTemplate = function(template, folder, name, options) {

    var templateFunc = _.template(grunt.file.read('templates/' + template + '.js'));

    var fileCont = templateFunc(options);

    grunt.file.write(options.appname + '/' + folder + '/' + name + '.js', fileCont);
  };



  var _createFromTemplate = function(entityData, template, folder, suffix, options) {

    var templateFunc = _.template(grunt.file.read('templates/' + template + '.js'));

    var fileCont = templateFunc(entityData);

    grunt.file.write(options.appname + '/' + folder + '/' + entityData.moduleName + suffix + '.js', fileCont);
  };



  var _parseJson = function(jsonData) {

    var entityData = {};

    // the entity node.
    var entity = _.getPath(jsonData, "doctrine-mapping.entity");

    // the table
    var modulePrefix = _.getPath(entity, "table");
    entityData.modulePrefix = modulePrefix;


    var name = _.getPath(entity, "name");
    entityData.name = name;

    // get the modulename
    var namearr = name.split('\\');
    entityData.moduleName = namearr.reverse()[0];

    var idAttribute = _.getPath(entity, "id.name");
    entityData.idAttribute = idAttribute;



    entityData.defaultUrl = "api/" + modulePrefix;



    entityData.moduleFileName = 'modules/' + modulePrefix + '.js';



    var fields = _.getPath(entity, "field");
    entityData.fields = fields;


    //console.dir(entityData);

    return entityData;
  };



  var _validateOptions = function(options) {
    var optionErrors = [];
    if (options.mode === null) {
      optionErrors.push("Missing mode. Please specify module or structured");
    }
    if (options.appname === null) {
      optionErrors.push("Missing appname. Please specify a name for the application");
    }



    return optionErrors.length === 0;
  };



};