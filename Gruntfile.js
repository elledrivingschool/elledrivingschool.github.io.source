module.exports = function (grunt) {

    grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'development');
    grunt.config('inProduction', grunt.config('env') === 'production');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'http-server': {
            dev: {
                root: './build',
                port: 3000,
                host: "0.0.0.0",
                cache: 1,
                showDir: true,
                autoIndex: true,
                ext: 'html',
                runInBackground: true,
                logFn: function () {}
            }
        },
        clean: {
            mapping: ['source/assets/css/*.css.map', 'build/assets/css/*.css.map']
        },
        sync: {
            assets: {
                updateAndDelete: true,
                files: [{
                    cwd: 'source/assets/',
                    src: ['**/*', '!**/scss/**'],
                    dest: 'build/assets/'
                }]
            }
        },
        watch: {
            sass: {
                files: ['source/assets/scss/**/*.{scss,sass}'],
                tasks: ['sass:dist', 'sync:assets', 'notify:sass']
            },
            jade: {
                files: ['source/**/*.jade','source/partials/**/*.jade','source/layouts/**/*.jade'],
                tasks: ['jade:release', 'sync:assets', 'notify:jade']
            },
            uglify: {
                files: ['source/assets/js/*', '!**/*.min.js'],
                tasks: ['uglify:dist', 'sync:assets', 'notify:sync']
            },
            sync: {
                files: ['source/assets/fonts/*', 'source/assets/images/*'],
                tasks: ['sync:assets', 'notify:sync']
            }
        },
        sass: {
            dist: {
                options: {
                    sourceMap: grunt.config('inProduction') ? false : true,
                    outputStyle: grunt.config('inProduction') ? 'compressed' : 'expanded',
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: 'source/assets/scss/',
                    src: ['*.scss'],
                    dest: 'source/assets/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: {
                    unused: false,
                    dead_code: false
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/assets/js/',
                    src: ['*.js', '!*.min.js', '!**/vendor/**'],
                    dest: 'source/assets/js',
                    ext: '.min.js'
                }]
            }
        },
        jade: {
            options: {
                pretty: true,
                basedir: 'source/'
            },
            release: {
                files: [{
                    cwd: 'source/pages',
                    src: '**/*.jade',
                    dest: 'build',
                    expand: true,
                    ext: '.html'
                }]
            }
        },
        notify: {
            init: {
                
            },
            sass: {
                options: {
                    title: 'SASS Compiled',
                    message: 'SASS has compiled the latest version of the assets.'
                }
            },
            jade: {
                options: {
                    title: 'Jade HTML Compiled',
                    message: 'Jade has compiled the latest version of the HTML.'
                }
            },
            sync: {
                options: {
                    title: 'Assets Updated',
                    message: 'New assets copied into the build directory.'
                }
            }
        }
    });
    grunt.registerTask('default', ['clean:mapping', 'sass:dist', 'jade:release', 'sync:assets', 'http-server', 'watch']);
    grunt.registerTask('commit-state', ['clean:mapping', 'sass:dist', 'jade:release', 'sync:assets']);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-notify');
};