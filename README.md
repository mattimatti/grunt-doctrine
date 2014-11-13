# grunt-doctrine

> Grunt plugin to convert doctrine xml annotations into backbone models and collections. useful in conjunction with doctrine apigility. Includes option to scaffold a complete BBB crud application.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-doctrine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-doctrine');
```

## The "doctrine" task

### Overview
In your project's Gruntfile, add a section named `doctrine` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  doctrine: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.appName
Type: `String`
Default value: `'app'`

The application name and folder that will contain the javascript application.

#### options.root
Type: `String`
Default value: `'/'`

The destination folder where the code will be generated. `'appName'` will be appended.


#### options.endpoint
Type: `String`
Default value: `'null'`

The api endpoint for example http://example.com/v1/

#### options.backbone
Type: `Object`
Default value: `'{}'`

Options for the backbone modules to use. Options will be described later in this module.


#### options.backbone.relational
Type: `Boolean`
Default value: `'false'`

Use Backbone.Relational


#### options.backbone.fetchcache
Type: `Boolean`
Default value: `'false'`

Use Backbone.Fetch cache plugin to cache resources?


#### options.backbone.modelDefaults
Type: `Boolean`
Default value: `'false'`

Declare defaults in Backbone models.


#### options.backbone.pushState
Type: `Boolean`
Default value: `'false'`

Enables pushState for Backbone.History



### Usage Examples

#### Default Options
In this example, We create a complete module application

```js
grunt.initConfig({
  doctrine: {
    options: {
          appName: 'app',
          root: 'tmp',
          endpoint: 'http://example.com/v1/'
        },
    src: ['test/fixtures/**/*.xml']
  },
})
```

#### Custom Options
in this example, we create a bbb modular application

```js
grunt.initConfig({
  doctrine: {
    options: {
          appName: 'app',
          root: 'tmp',
          endpoint: 'http://example.com/v1/'
        },
    src: ['test/fixtures/**/*.xml']
  },
})
```

## Contributing
Actually contributing is not permitted.

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 mattimatti. Licensed under the MIT license.
