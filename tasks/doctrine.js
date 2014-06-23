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

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('doctrine', 'A plugin to convert doctrine xml annotations intto backbone models and collections. useful in conjunction with doctrine apigility', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode: 'module',
      appName: 'app',
      root: 'tmp',
      defaultModuleName: 'ApplicationModule',
      separator: ',',
      apigility: {
        baseuri: 'http://beconcierge.local/v1',
      },
      backbone: {
        relational: false,
        form: true,
        layoutmanager: true,
        modeldefaults: false
      },
      structured: {
        scaffold: true,
        app: true,
        tests : true
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

      var entityData = _parseJson(json, options);


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


    //console.dir(options);

    // ORM Base
    _createFromTemplate(entityData, 'model/basemodel.js', options.root + '/'+options.appName + '/doctrine/model', entityData.moduleName + 'Base.js', options, allEntities);


    // Model and collection
    _createFromTemplate(entityData, 'model/model.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix , 'Model.js', options, allEntities);
    _createFromTemplate(entityData, 'model/collection.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix , 'Collection.js', options, allEntities);

  };



  var _createStructured = function(allEntities, entityData, options) {


    // Router
    _createFromTemplate(entityData, 'structured/router.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix, 'Router.js', options, allEntities);


     // Views
    _createFromTemplate(entityData, 'structured/views/listview.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/list', 'list.js', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/listview.html', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/list', 'template.html', options, allEntities);


    _createFromTemplate(entityData, 'structured/views/createform.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/create', 'create.js', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/createform.html', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/create', 'template.html', options, allEntities);


    _createFromTemplate(entityData, 'structured/views/editform.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/edit', 'edit.js', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/editform.html', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/edit', 'template.html', options, allEntities);


    _createFromTemplate(entityData, 'structured/views/item.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/item', 'view.js', options, allEntities);
    _createFromTemplate(entityData, 'structured/views/item.html', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/item', 'template.html', options, allEntities);



    // Module
    _createFromTemplate(entityData, 'structured/module.js', options.root + '/'+options.appName + '/modules/' + entityData.modulePrefix + '/', 'Module.js', options, allEntities);

    if (options.structured.app) {


      // Some lib classes
     // _copyFromTemplate('structured/lib/baserouter.js', options.root + '/'+options.appName + '/lib', 'BaseRouter.js', options, allEntities);
     // _copyFromTemplate('structured/lib/basecollection.js', options.root + '/'+options.appName + '/lib', 'BaseCollection.js', options, allEntities);
      _copyFromTemplate('structured/lib/console.js', options.root + '/'+options.appName + '/lib', 'console.js', options, allEntities);




      // A Backbone Boilerplate App
      _copyFromTemplate('structured/app.js', options.root + '/'+options.appName , 'app.js', options, allEntities);
      _copyFromTemplate('structured/main.js', options.root + '/'+options.appName, 'main.js', options, allEntities);
      _copyFromTemplate('structured/require.config.js', options.root + '/'+options.appName, 'require.config.js', options, allEntities);
      _copyFromTemplate('structured/main.html', options.root + '/'+options.appName, 'templates/main.html', options, allEntities);
      _copyFromTemplate('structured/app.router.js', options.root + '/'+options.appName, 'router.js', options, allEntities);


      // Css
      _copyFromTemplate('structured/css/index.css', options.root + '/'+options.appName , 'styles/index.css', options, allEntities);
      _copyFromTemplate('structured/css/app.styl', options.root + '/'+options.appName , 'styles/app.styl', options, allEntities);



      // Builder
       _copyFromTemplate('structured/.gitkeep', options.root + '/'+ 'vendor', '.gitkeep', options, allEntities);
       _copyFromTemplate('structured/.gitignore', options.root, '.gitignore', options, allEntities);
       _copyFromTemplate('structured/package.json', options.root, 'package.json', options, allEntities);
       _copyFromTemplate('structured/bower.json', options.root, 'bower.json', options, allEntities);


       grunt.file.copy('templates/structured/GruntFile.js',options.root + '/Gruntfile.js' );
       grunt.file.copy('templates/structured/index.html',options.root + '/index.html' );
      
     
    }


     if (options.structured.tests) {

        grunt.file.copy('templates/structured/test/runner.js',options.root + '/test/runner.js' );
        grunt.file.copy('templates/structured/test/runner.js',options.root + '/test/jasmine/specs/example.spec.js' );
        grunt.file.copy('templates/structured/test/runner.js',options.root + '/test/qunit/specs/example.spec.js' );
        grunt.file.copy('templates/structured/test/runner.js',options.root + '/test/mocha/specs/example.spec.js' );
        grunt.file.copy('templates/structured/test/runner.js',options.root + '/test/runner.js' );

     }



  };



  // Create a full module
  var _createFullModule = function(allEntities, entityData, options) {

    var template = _.template(grunt.file.read('templates/module/fullmodule.js'));

    var fileCont = template(entityData);

    fileCont = beautify(fileCont, options.beautify);

    grunt.file.write(options.root + '/'+ options.appName + '/allinone/' + entityData.moduleFileName, fileCont);

  };



  // copy from template
  var _copyFromTemplate = function(template, folder, name, options,collection) {

    var templateFunc = _.template(grunt.file.read('templates/' + template));

    var fileCont = templateFunc({
      options: options,
      collection: collection
    });

    if(template.indexOf('.js')> -1){
      fileCont = beautify(fileCont, options.beautify);
    }
     

    grunt.file.write(folder + '/' + name , fileCont);
  };



  var _createFromTemplate = function(entityData, template, folder, filenameWithExtension, options, collection) {

    var templateFunc = _.template(grunt.file.read('templates/' + template));

    var fileCont = templateFunc({
      model: entityData,
      options: options,
      collection: collection
    });

    if(filenameWithExtension.indexOf('.js')> -1){
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


    entityData.collectionInstanceName  = _s.camelize(modulePrefix);



    var name = _.getPath(entity, "name");
    entityData.name = name;

    // get the modulename
    entityData.moduleName = _removePHPNamespace(name);

    var idAttribute = _.getPath(entity, "id.name");
    entityData.idAttribute = idAttribute;


    if (options.apigility) {
      entityData.defaultUrl = modulePrefix;
    }



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
        elm.LinkedModel = theLinkedModel + 'Model';
        elm.LinkedCol = theLinkedModel + 'Col';

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
      HasMany = (_.isArray(HasMany)) ? HasMany : [HasMany];
      _.each(HasMany, function(elm) {
        var theLinkedModel = _removePHPNamespace(_.getPath(elm, "target-entity"));
        elm.LinkedModel = theLinkedModel + 'Model';
        elm.LinkedCol = theLinkedModel + 'Col';

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



    return optionErrors.length === 0;
  };



};