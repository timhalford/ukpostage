module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            main: {
                src: 'src/js/app.js',
                dest: 'assets/js/app.js'
            }
        },
        compass: {
            main: {
                options: {
                    httpPath: '/',
                    cssDir: 'assets/css',
                    sassDir: 'src/scss',
                    imagesDir: 'assets/images',
                    fontsDir: 'assets/fonts',
                    relativeAssets: true,
                    outputStyle: 'compressed'
                }
            }
        },
        uglify: {
            main: {
              files: {
                'assets/js/app.js': ['assets/js/app.js']
              }
            }
        },
        exec: {
            main: '(cd app; cordova build)'
        },
        copy: {
            main: {
                files: [
                    {
                        cwd: 'assets',
                        src: ['**/*'],
                        dest: 'app/www/assets',
                        expand: true
                    },
                    {
                        src: ['index.html'],
                        dest: 'app/www/index.html'
                    }
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['browserify', 'uglify', 'compass', 'copy', 'exec']);
    grunt.registerTask('default', ['build']);

}
