module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.js": ["src/_init.coffee", "src/*.coffee"],
          'spec/js/specs.js' : ['spec/*Spec.coffee']
        }
      }
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.min.js" : ["dist/<%= pkg.name %>-<%= pkg.version %>.js"]
        }
      }
    },

    jasmine: {
      pivotal: {
        src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          specs: 'spec/js/specs.js',
          vendor: 'lib/*.js',
          keepRunner: true,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/coverage.json',
            report: 'coverage',
            thresholds: {
              lines: 0,
              statements: 0,
              branches: 0,
              functions: 0
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  grunt.registerTask("test", ["jasmine"]);
  grunt.registerTask("default", ["coffee", "uglify", "jasmine"]);
};