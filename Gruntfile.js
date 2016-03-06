

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');

    var path = require('path');

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false,
                presets: ['react']
            },
            dist: {
                files: [
                    {
                        "expand": true,
                        "cwd": "static/dev/js/",
                        "src": ["**/component.js", "**/client.js"],
                        "dest": "static/dev/js/",
                        "ext": ".babel.js"
                    },
                    {
                        "expand": true,
                        "cwd": "static/dev/js/",
                        "src": ["**/component.js"],
                        "dest": "static/dev/build/js/",
                        "ext": ".js"
                    }
                ]
            }
        },

        webpack: {
            build: {
                entry: {
                    "example": path.resolve("static/dev/js/example/client.babel.js")
                },
                output: {
                    path: "static/dev/build/js",
                    filename: "[name]/client.js"
                }
            }
        },

        concat: {
            css: {
                src: [
                    'static/dev/css/example/*.css'
                ],
                dest: 'static/dev/build/css/main.css'
            }
        },

        cssmin: {
            options: {
                roundingPrecision: -1,
                shorthandandCompacting: false
            },
            target: {
                files: {
                    'static/dev/build/css/main.css': ['static/dev/build/css/main.css']
                }
            }
        },

        uglify: {
            js: {
                files: {
                    "static/dev/build/js/example/client.js": ['static/dev/build/js/example/client.js']
                }
            }
        },

        watch : {
            css: {
                files: ['static/dev/css/**/*.css'],
                tasks: ['default']
            },
            js: {
                files: ['static/dev/js/**/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.registerTask('minify', [
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'babel',
        'webpack',
        'concat',
        'minify'
    ]);
};