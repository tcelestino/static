module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.config('pkg', grunt.file.readJSON('package.json'));
  grunt.initConfig({

    // Ejs render
    render: {
      dev: {
        files: {
          'dist/index.html': ['src/index.html']
        },
        options: {
          data: {
            dev: true,
            pkg: grunt.config('pkg')
          }
        }
      },
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        },
        options: {
          data: {
            dev: false,
            pkg: grunt.config('pkg'),
            seo: 'src/data/seo.json'
          }
        }
      }
    },

    // Image minification
    imagemin: {
      main: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'assets/images/*.{png,jpg,gif,svg}',
          dest: 'dist'
        }]
      }
    },

    // Compass render
    compass: {
      dev: {
        options: {
          sassDir: 'src/assets/sass',
          cssDir: 'src/assets/css',
          imagesDir: 'assets/images',
          outputStyle: 'nested',
          environment: 'development',
          force: true
        }
      },
      dist: {
        options: {
          sassDir: 'src/assets/sass',
          cssDir: 'src/assets/css',
          imagesDir: 'assets/images',
          outputStyle: 'compressed',
          noLineComments: true,
          environment: 'production'
        }
      }
    },

    // Watch dev tasks
    watch: {
      templates: {
        files: ['src/templates/*'],
        tasks: ['render:dev']
      },

      sass: {
        files: [
          'src/assets/sass/*.sass',
          'src/assets/sass/**/*.sass',
        ],
        tasks: ['compass:dev']
      }
    },

    // Static Webserver
    connect: {
      server: {
        options: {
          port: 8180,
          base: 'dist'
        }
      }
    },

    // HTML Minify
    htmlmin: {
      compile: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          keepClosingSlash: false,
          caseSensitive: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'src/',
        src: 'assets/fonts/*',
        dest: 'dist/'
      },
      css: {
        expand: true,
        cwd: 'src/',
        src: [
          'assets/css/*', 
          'assets/css/**/*.css', 
        ],
        dest: 'dist/'
      },
      images: {
        expand: true,
        cwd: 'src/',
        src: 'assets/images/*',
        dest: 'dist/'
      },
      misc: {
        expand: true,
        cwd: 'src/',
        src: [
          'favicon.ico',
          'robots.txt'
        ],
        dest: 'dist/'
      }
    },

    // CSS Minify
    cssmin: {
      compile: {
        files: {
          'dist/assets/css/main.min.css': ['src/assets/css/*.css', 'src/assets/css/**/*.css']
        }
      }
    },

    // Uglify
    uglify: {
      compile: {
        files: {
          // common files
          'dist/assets/javascripts/main.js': [
            // keep your javascript order here
            'src/assets/javascripts/*.js',
          ],

          // vendor files
          'dist/assets/javascripts/vendor.js': [
            // keep your javascript order here
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js'
          ]
        }
      }
    },

    clean: [
      'dist'
    ]
  });

  // Tasks
  grunt.registerTask('develop', [
    'render:dev',
    'compass:dev',
    'copy',
    'connect',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'render:dist',
    'compass:dist',
    'uglify'
  ]);

};
