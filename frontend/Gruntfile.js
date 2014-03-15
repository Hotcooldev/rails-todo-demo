module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                files: {
                    '../public/app.js': ['js/**/*.js']
                },
                options: {
                    transform: ['debowerify']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "../public/style.css": "css/main.less"
                }
            }
        },

        watch: {
            browserify: {
                files: ['js/**/*.js'],
                tasks: ['browserify']
            },
            less: {
                files: ['css/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};

