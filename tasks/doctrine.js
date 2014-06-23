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
var beautify = require('js-beautify').js_beautify;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('doctrine', 'A plugin to convert doctrine xml annotations intto backbone models and collections. useful in conjunction with doctrine apigility', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode: 'module',
      separator: ',',
      structured: {
        scaffold: false
      },
      beautify : { indent_size: 2 }
    });


    // validate the options
    if (!_validateOptions(options)) {
      return;
    }


    var allEntities = [];


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


      // add as indexed
      allEntities.push(entityData);



    }); // end foreach



    // Now all the model has been parsed
    _.each(allEntities, function(entityData) {


      // build files
      switch (options.mode) {

        case 'structured':
          _createModels(allEntities, entityData, options);
          if (options.structured.scaffold) {
            _createStructured(allEntities, entityData, options);
          }
          break;

        case 'module':
          //_createFullModule(entityData, options);
          break;

      }

    });



    // Print a success message.
    grunt.log.writeln('Done!');


  });



  var _createModels = function(allEntities, entityData, options) {


    //console.dir(entityData);

    // ORM Base
    _createFromTemplate(entityData, 'model/basemodel', 'doctrine/model', 'Base', options, allEntities);


    // Model and collection
    _createFromTemplate(entityData, 'model/model', 'modules/' + entityData.moduleName + '/model', 'Model', options, allEntities);
    _createFromTemplate(entityData, 'model/collection', 'modules/' + entityData.moduleName + '/model', 'Col', options, allEntities);

  };



  var _createStructured = function(allEntities, entityData, options) {


    // Router
    _createFromTemplate(entityData, 'structured/router', 'modules/' + entityData.moduleName, 'Router', options, allEntities);


    _createFromTemplate(entityData, 'structured/views/listview', 'modules/' + entityData.moduleName + '/view', 'List', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/createform', 'modules/' + entityData.moduleName + '/view', 'Create', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/editform', 'modules/' + entityData.moduleName + '/view', 'Edit', options, allEntities);



    if (options.structured.all) {


      // Module
      _createFromTemplate(entityData, 'structured/module', 'modules/' + entityData.moduleName + '/', 'Module', options, allEntities);

      // Common Application stuff... Optional.
      _copyFromTemplate('structured/baserouter', 'doctrine/base', 'BaseRouter', options, allEntities);
      _copyFromTemplate('structured/basecollection', 'doctrine/base', 'BaseCollection', options, allEntities);
      _copyFromTemplate('structured/baseapp', '', 'app', options);
      _copyFromTemplate('structured/basemain', '', 'main', options);
      _copyFromTemplate('structured/modules', '', 'importmodules', options);
      _copyFromTemplate('structured/approuter', '', 'router', options);
      _copyFromTemplate('structured/requireconfig', '', 'config', options);
    }



  };



  // Create a full module
  var _createFullModule = function(allEntities, entityData, options) {

    var template = _.template(grunt.file.read('templates/module/fullmodule.js'));

    var fileCont = template(entityData);

    fileCont = beautify(fileCont, options.beautify);

    grunt.file.write(options.appname + '/allinone/' + entityData.moduleFileName, fileCont);

  };



  // copy from template
  var _copyFromTemplate = function(template, folder, name, options) {

    var templateFunc = _.template(grunt.file.read('templates/' + template + '.js'));

    var fileCont = templateFunc(options);

    grunt.file.write(options.appname + '/' + folder + '/' + name + '.js', fileCont);
  };



  var _createFromTemplate = function(entityData, template, folder, suffix, options, collection) {

    var templateFunc = _.template(grunt.file.read('templates/' + template + '.js'));

    var fileCont = templateFunc({
      model: entityData,
      options: options,
      collection: collection
    });

    fileCont = beautify(fileCont, options.beautify);

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
    entityData.moduleName = _removePHPNamespace(name);

    var idAttribute = _.getPath(entity, "id.name");
    entityData.idAttribute = idAttribute;



    entityData.defaultUrl = "api/" + modulePrefix;



    entityData.moduleFileName = 'modules/' + modulePrefix + '.js';



    var fields = _.getPath(entity, "field");
    if (fields !== undefined) {
      entityData.fields = (_.isArray(fields)) ? fields : [fields];
    } else {
      entityData.fields = [];
    }



    // Relations manyToOne
    var HasOne = _.getPath(entity, "many-to-one");
       

    if (HasOne !== undefined) {
       HasOne = (_.isArray(HasOne)) ? HasOne : [HasOne];
      _.each(HasOne, function(elm) {
        var theLinkedModel = _removePHPNamespace(_.getPath(elm, "target-entity"));
        elm.LinkedModel = theLinkedModel+'Model';
        elm.LinkedCol = theLinkedModel+'Col';

        elm.isInversed = _.getPath(elm, "inversed-by")!== undefined;
        elm.inversedBy = _.getPath(elm, "inversed-by");

        elm.includeInJSON = 'id';

      });
      entityData.HasOne = HasOne;
    } else {
      entityData.HasOne = [];
    }



     // Relations oneTOMany
    var HasMany = _.getPath(entity, "one-to-many");
    
    if (HasMany !== undefined) {
      HasMany = (_.isArray(HasMany)) ? HasMany : [HasMany];
      _.each(HasMany, function(elm) {
        var theLinkedModel = _removePHPNamespace(_.getPath(elm, "target-entity"));
        elm.LinkedModel = theLinkedModel+'Model';
        elm.LinkedCol = theLinkedModel+'Col';

        elm.isMapped = _.getPath(elm, "mapped-by")!== undefined;
        elm.mappedBy = _.getPath(elm, "mapped-by");

        elm.includeInJSON = 'id';

      });
      entityData.HasMany = HasMany;
    } else {
      entityData.HasMany = [];
    }


    //console.dir(entityData);

    return entityData;
  };


  var _removePHPNamespace = function(name) {
    if (name === undefined) {
      return '';
    }
    var namearr = name.split('\\');
    return namearr.reverse()[0];
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