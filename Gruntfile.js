/*
 * grunt-doctrine
 *
 *
 * Copyright (c) 2014 mattimatti
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      generated: [
        'Gruntfile.js',
        'tmp/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'modules', 'model', 'app']
    },

    // Configuration to be run (and then tested).
    doctrine: {

      module: {
        options: {
          mode: 'module',
          appName: 'app',
          root: 'tmp'
        },
        src: ['test/fixtures/**/*.xml']
      },
      structured: {
        options: {
          mode: 'structured',
          appName: 'app',
          root: 'tmp'
        },
        src: ['test/fixtures/**/*.xml']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Bump version
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: '<%=pkg.repository.url%>',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }

  });


  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-bump');

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'doctrine', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint:all', 'test', 'jshint:generated']);

};