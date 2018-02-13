module.exports = function(grunt) {

    let webpack = require("webpack");
    let webpackConfig = require("./webpack.config.js");

    grunt.initConfig({
        pkg: grunt.file.readJSON("./package.json"),
        uglify: {
            dist: {
                src: "base/assets/js/transpiled/app.es6c.js",
                dest: "base/assets/js/app.min.js"
            }
        },
        cssmin: {
            dist: {
                src: ["base/assets/css/custom/main.css"],
                dest: "base/assets/css/main.min.css"
            }
        },
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'base/assets/css/custom/main.css': 'base/assets/sass/modules.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['base/assets/**/*.js'],
                tasks: ['uglify', 'clean'],
                options: {
                    livereload: false,
                } 
            },
            css: {
                files: ['base/**/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: false,
                }
            }
        },
        clean: {
            dist: {
                src: ['base/assets/js/transpiled']
            }
        }
    });

    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["uglify", "sass", "cssmin", "clean", "watch"]);

    grunt.registerTask("js", ["uglify", "watch:js"]);
    grunt.registerTask("css", ['sass', 'cssmin', "watch:css"]);
}