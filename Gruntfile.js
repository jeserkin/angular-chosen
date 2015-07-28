module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['example/index.html']
      },
      test: {
        src: 'karma.conf.js',
        ignorePath:  /\.\.\//
      }
    },

    ngAnnotate: {
      options: {},
      'angular-chosen': {
        files: {
          'build/angular-chosen.min.js': ['build/angular-chosen.js']
        }
      }
    },

    uglify: {
      options: {
        banner: "/**\n * angular-chosen <%=pkg.version%>\n * @author Eugene Serkin\n * @license MIT License http://opensource.org/licenses/MIT\n */\n"
      },
      'angular-chosen': {
        options: {
          mangle: false,
          compress: false,
          preserveComments: false,
          beautify: true
        },
        files: {
          'build/angular-chosen.js': ['build/angular-chosen.js']
        }
      },
      'angular-chosen-min': {
        files: {
          'build/angular-chosen.min.js': ['build/angular-chosen.min.js']
        }
      }
    },

    concat: {
      options: {
        banner: "/**\n * angular-chosen <%=pkg.version%>\n * @author Eugene Serkin\n * @license MIT License http://opensource.org/licenses/MIT\n */\n"
      },
      prod: {
        src: ['src/*.js'],
        dest: 'build/angular-chosen.js'
      }
    },

    karma: {
      options: {
        keepalive: false,
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', ['wiredep', 'concat:prod', 'ngAnnotate', 'uglify']);
};