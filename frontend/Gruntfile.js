module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                cwd: 'html/',
                src: '*',
                dest: '../public/',
                expand: true
            }
        },

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
            htmlCopy: {
                files: ['html/**/*'],
                tasks: ['copy']
            },
            jsBrowserify: {
                files: ['js/**/*.js'],
                tasks: ['browserify']
            },
            cssLess: {
                files: ['css/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['copy', 'browserify', 'less']);
};

