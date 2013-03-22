#CharFunk contributors

If you can help, please do.  The source files of interest are:

+ `charFunk-1.1.0.js` - the actual library
+ `java/GenCharFunkData.java` - this uses java.lang.Character methods to build up and output CharFunk data into the marked sections of charFunk-1.1.0.js and charFunk-test-data.js
+ `java/GenDoco.java` - chews up the comments in charFunk-1.1.0.js and outputs documentation markdown into readme.md
+ `tests/charFunk-tests.js` - all the qunit tests for CharFunk

Once you've made any changes, you can build everything using 

    > ./build.sh

At the end it will open up the two test files in your browser -- unless open *.html does something else on your machine.  That's your clue anyway to run those test files.  Eventually we want these to run using grunt, but... see the issue below.

###Some areas needing help:

+ Why isn't qunit + phantomjs working? In Gruntfile.js, include qunit in the tasks and watch it break.  See https://github.com/gruntjs/grunt-contrib-qunit/issues/26.
+ Is there a better way to generate the doco?  I want something that takes JSDoc type comments and turns them into usable markdown.  
+ Is isValidName actually working correctly?  I have circumstantial evidence it isn't quite right... but unsure how to improve.
+ Am I wrappering this for AMD & CommonJS properly?  I copied some patterns I've seen elsewhere... unsure if I got it right.

###Miscellaneous notes:

+ Grunt-contrib-qunit includes v1.4.0 qunit, but we need v1.11.0 for throws() support
