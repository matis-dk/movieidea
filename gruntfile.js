module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ================== FOR WATCHER  ================== \\

        watch: {
            sassWatcher: {
                files: ['dev/sass/**/*.scss'],
                tasks: ['sass', 'postcss', 'cssmin'],    //  tasks: ['sass', 'uncss', 'postcss', 'cssmin'], uncss fjernet pga bug.
                option: {
                    interrupt: true,
                },
            },
            jsWatcher: {
                files: ['dev/js/*.js'],
                tasks: ['babel', 'concat', 'uglify', 'clean'],
                option: {
                    interrupt: true,
                }
            }
        },


        // ================== FOR CSS ONLY ================== \\

        sass: {
    	    options: {
                sourceMap: false
    	    },
    		dist: {
    			files: {
    				'dev/sass/style.css': 'dev/sass/style.scss'
    			}
    		}
        },

        postcss: {
            options: {
              map: false, // inline sourcemaps

              processors: [
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
              ]
            },
            dist: {
              src: 'dev/sass/style.css'
            }
        },

        cssmin: {
          mytarget: {
              files: [{
                  expand: true,
                  cwd: 'dev/sass/',
                  src: 'style.css',
                  dest:'public/assets/css/',
                  ext: '.min.css'
              }]
          }
      },


        // ================== FOR JS ONLY ================== \\

        babel: {
    		options: {
    			sourceMap: false,
    			presets: ['env']
    		},
    		dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/js',
                    src: ['*.js'],
                    dest: 'public/assets/js',
                    ext: '.js'
                }]
    		}
    	},

        concat: {
            dist: {
              src: ['public/assets/js/*.js', '!public/assets/js/main.js'],
              dest: 'public/assets/js/main.js',
            },
        },

        uglify: {
            my_target: {
                files: [{
                    cwd: '',
                    src: 'public/assets/js/main.js',
                    dest: 'public/assets/js/main.js'
                }]
            }
        },

        clean: {
          js: ['public/assets/js/*.js', '!public/assets/js/main.js']
        },

        // ================== FOR BROWSERSYNC ================== \\

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'public/assets/css/style.min.css',
                        'public/index.html',
                        'public/assets/js/main.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: 'public'
                    }
                }
            }
        },


    });
/*

      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-browser-sync');

      grunt.loadNpmTasks('grunt-uncss')
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-postcss');

      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-concat')

*/
      // DEFAULT
      grunt.registerTask('default', ['browserSync', 'watch', 'grunt']);


};
