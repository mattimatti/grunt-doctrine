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
var _s = require('underscore.string');
var beautify = require('js-beautify').js_beautify;

var path = require('path');
var fs = require('fs');

var thismodule = path.dirname(fs.realpathSync(__filename))+'/../';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('doctrine', 'A plugin to convert doctrine xml annotations intto backbone models and collections. useful in conjunction with doctrine apigility', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode: 'module',
      appName: 'app',
      root: 'tmp',
      endpoint: null,
      backbone: {
        relational: false,
        form: false,
        layoutmanager: true,
        fetchcache: false,
        modelDefaults: false,
        pushState: false
      },
      modular: {
        scaffold: true,
        tests: false
      },
      beautify: {
        "indent_size": 4,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 2,
        "jslint_happy": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0
      }
    });



    // VALIDATE


    // validate the options
    if (!_validateOptions(options)) {
      return;
    }


    // PARSE

    var allEntities = [];


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

      var entityData = _parseJson(json, options);

      allEntities.push(entityData);

      //console.dir(allEntities[2]);

    });


    // ITERATE


    // Now all the model has been parsed
    _.each(allEntities, function(entityData) {


      // build files
      switch (options.mode) {

        case 'structured':

          // build the models
          _createModels(allEntities, entityData, options);


          // optionally scaffold the app
          if (options.modular.scaffold) {
            _createBBB(allEntities, entityData, options);
          }


          break;

        case 'module':
          //_createFullModule(entityData, options);
          break;

      }

    });


  });



  var _createModels = function(allEntities, entityData, options) {

    // ORM Base
    //_createFromTemplate(entityData, 'model/basemodel.js', options.root + '/'+options.appName + '/doctrine/model', entityData.moduleName + 'Base.js', options, allEntities);


    // Model and collection
    _createFromTemplate(entityData, 'model/model.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix, 'Model.js', options, allEntities);
    _createFromTemplate(entityData, 'model/collection.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix, 'Collection.js', options, allEntities);

  };



  var _createBBB = function(allEntities, entityData, options) {


    // Router
    _createFromTemplate(entityData, 'bbb/router.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix, 'Router.js', options, allEntities);


    // List View
    _createFromTemplate(entityData, 'bbb/views/listview.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/list', 'view.js', options, allEntities);
    _createFromTemplate(entityData, 'bbb/views/listview.html', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/list', 'template.html', options, allEntities);
    _createFromTemplate(entityData, 'bbb/views/row.html', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/list', 'row.html', options, allEntities);

    // Create View
    _createFromTemplate(entityData, 'bbb/views/createform.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/create', 'view.js', options, allEntities);
    _createFromTemplate(entityData, 'bbb/views/createform.html', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/create', 'template.html', options, allEntities);


    // Edit View
    _createFromTemplate(entityData, 'bbb/views/editform.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/edit', 'view.js', options, allEntities);
    _createFromTemplate(entityData, 'bbb/views/editform.html', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/edit', 'template.html', options, allEntities);


    // Item View
    _createFromTemplate(entityData, 'bbb/views/item.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/item', 'view.js', options, allEntities);
    _createFromTemplate(entityData, 'bbb/views/item.html', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/item', 'template.html', options, allEntities);




    // Module
    _createFromTemplate(entityData, 'bbb/module.js', options.root + '/' + options.appName + '/modules/' + entityData.modulePrefix + '/', 'Module.js', options, allEntities);


    // Lib classes
    // _copyFromTemplate('bbb/lib/baserouter.js', options.root + '/'+options.appName + '/lib', 'BaseRouter.js', options, allEntities);
    // _copyFromTemplate('bbb/lib/basecollection.js', options.root + '/'+options.appName + '/lib', 'BaseCollection.js', options, allEntities);

    _copyFromTemplate('bbb/lib/console.js', options.root + '/' + options.appName + '/lib', 'console.js', options, allEntities);
    _copyFromTemplate('bbb/lib/selectbox.js', options.root + '/' + options.appName + '/lib', 'selectbox.js', options, allEntities);
    _copyFromTemplate('bbb/lib/optionsgrid.js', options.root + '/' + options.appName + '/lib', 'optionsgrid.js', options, allEntities);



    // A Backbone Boilerplate App
    _copyFromTemplate('bbb/app.js', options.root + '/' + options.appName, 'app.js', options, allEntities);
    _copyFromTemplate('bbb/main.js', options.root + '/' + options.appName, 'main.js', options, allEntities);
    _copyFromTemplate('bbb/require.config.js', options.root + '/' + options.appName, 'config.js', options, allEntities);
    _copyFromTemplate('bbb/templates/main.html', options.root + '/' + options.appName, 'templates/main.html', options, allEntities);
    _copyFromTemplate('bbb/app.router.js', options.root + '/' + options.appName, 'router.js', options, allEntities);


    _copyFromTemplate('bbb/app.layout.js', options.root + '/' + options.appName, 'view/layout.js', options, allEntities);
    _copyFromTemplate('bbb/app.navigation.js', options.root + '/' + options.appName, 'view/navigation.js', options, allEntities);
    _copyFromTemplate('bbb/navigation.html', options.root + '/' + options.appName, 'templates/navigation.html', options, allEntities);





    // Styles
    _copyFromTemplate('bbb/css/index.css', options.root + '/' + options.appName, 'styles/index.css', options, allEntities);
    _copyFromTemplate('bbb/css/app.styl', options.root + '/' + options.appName, 'styles/app.styl', options, allEntities);



    // Build Tools
    _copyFromTemplate('bbb/.gitkeep', options.root + '/' + 'vendor', '.gitkeep', options, allEntities);
   // _copyFromTemplate('bbb/.gitignore', options.root, '.gitignore', options, allEntities);
    _copyFromTemplate('bbb/package.json', options.root, 'package.json', options, allEntities);
    _copyFromTemplate('bbb/bower.json', options.root, 'bower.json', options, allEntities);
    _copyFromTemplate('bbb/.bowerrc', options.root, '.bowerrc', options, allEntities);

    grunt.file.copy('templates/bbb/GruntFile.js', options.root + '/Gruntfile.js');
    grunt.file.copy('templates/bbb/index.html', options.root + '/index.html');


    // Tests
    if (options.modular.tests) {

      grunt.file.copy('templates/bbb/test/runner.js', options.root + '/test/runner.js');
      grunt.file.copy('templates/bbb/test/runner.js', options.root + '/test/jasmine/specs/example.spec.js');
      grunt.file.copy('templates/bbb/test/runner.js', options.root + '/test/qunit/specs/example.spec.js');
      grunt.file.copy('templates/bbb/test/runner.js', options.root + '/test/mocha/specs/example.spec.js');
      grunt.file.copy('templates/bbb/test/runner.js', options.root + '/test/runner.js');

    }



  };



  // Create a full module
  var _createFullModule = function(allEntities, entityData, options) {

    var template = _.template(grunt.file.read('templates/module/fullmodule.js'));

    var fileCont = template(entityData);

    fileCont = beautify(fileCont, options.beautify);

    grunt.file.write(options.root + '/' + options.appName + '/allinone/' + entityData.moduleFileName, fileCont);

  };



  // copy from template
  var _copyFromTemplate = function(template, folder, name, options, collection) {

    var templateFunc = _.template(grunt.file.read(thismodule+'templates/' + template));

    var fileCont = templateFunc({
      options: options,
      collection: collection
    });

    if (template.indexOf('.js') > -1) {
      fileCont = beautify(fileCont, options.beautify);
    }


    grunt.file.write(folder + '/' + name, fileCont);
  };



  var _createFromTemplate = function(entityData, template, folder, filenameWithExtension, options, collection) {

    var templateFunc = _.template(grunt.file.read(thismodule+'templates/' + template));

    var fileCont = templateFunc({
      model: entityData,
      options: options,
      collection: collection
    });

    if (filenameWithExtension.indexOf('.js') > -1) {
      fileCont = beautify(fileCont, options.beautify);
    }

    grunt.file.write(folder + '/' + filenameWithExtension, fileCont);
  };



  var _parseJson = function(jsonData, options) {

    var entityData = {};

    // the entity node.
    var entity = _.getPath(jsonData, "doctrine-mapping.entity");

    // the table
    var modulePrefix = _.getPath(entity, "table");
    entityData.modulePrefix = modulePrefix;


    entityData.collectionInstanceName = _s.camelize(modulePrefix);



    var name = _.getPath(entity, "name");
    entityData.name = name;

    // get the modulename
    entityData.moduleName = _removePHPNamespace(name);

    var idAttribute = _.getPath(entity, "id.name");
    entityData.idAttribute = idAttribute;


    entityData.defaultUrl = modulePrefix;


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
        elm.LinkedModel = 'modules/' + _s.underscored(theLinkedModel) + '/Model';
        elm.LinkedCol = 'modules/' + _s.underscored(theLinkedModel) + '/Collection';

        elm.isInversed = _.getPath(elm, "inversed-by") !== undefined;
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

       //console.log(HasMany);
      
      HasMany = (_.isArray(HasMany)) ? HasMany : [HasMany];

      _.each(HasMany, function(elm) {

        var theLinkedModel = _removePHPNamespace(_.getPath(elm, "target-entity"));

        elm.LinkedModel = 'modules/' + _s.underscored(theLinkedModel) + '/Model';
        elm.LinkedCol = 'modules/' + _s.underscored(theLinkedModel) + '/Collection';

        elm.isMapped = _.getPath(elm, "mapped-by") !== undefined;
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
    if (options.appName === null) {
      optionErrors.push("Missing appname. Please specify a name for the application");
    }
    if (options.root === null || options.endpoint === '') {
      optionErrors.push("Missing root");
    }
    if (options.endpoint === null || options.endpoint === '') {
      optionErrors.push("Missing endpoint");
    }


    return optionErrors.length === 0;
  };



};