module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> - Copyright (c) <%= grunt.template.today("yyyy") %> by Joe Larson (http://joewlarson.com), MIT License - minified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/charFunk-1.1.0.js',
                dest: 'charFunk-1.1.0.min.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/charFunk-1.1.0.js']
        },
        qunit: {
            files: ['tests/index.html']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    /*Currently cannot run qunit tests to error https://github.com/gruntjs/grunt-contrib-qunit/issues/26

        Running "qunit:files" (qunit) task
        Testing tests/index.html
        Running PhantomJS...ERROR
        >> In order for this task to work properly, PhantomJS must be installed locally
        >> via NPM. If you're seeing this message, generally that means the NPM install
        >> has failed. Please submit an issue providing as much detail as possible at:
        >> https://github.com/gruntjs/grunt-lib-phantomjs/issues
        Warning: PhantomJS not found. Use --force to continue.

        If I can't sort that out soon or get a fix, I can probably get it to run in grunt some other way...
        ...in the meantime, run tests manually by opening tests/index.html in a browser!
    */

    // Default task(s).
    grunt.registerTask('default', ['jshint','uglify']);//,'qunit']);

};