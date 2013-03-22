$(function() {'use strict';

    test( "CharFunk basic tests", function() {
        ok( typeof CharFunk=="object", "basic existence check");
        ok( typeof CharFunk.GTYPE=="undefined", "invisible GTYPE");
        ok( typeof CharFunk.CASE=="undefined", "invisible CASE");
        ok( typeof CharFunk.DIRECTIONALITY=="undefined", "invisible DIRECTIONALITY");
        ok( typeof CharFunk.MIRRORED=="undefined", "invisible MIRRORED");
        ok( typeof CharFunk.WHITESPACE=="undefined", "invisible WHITESPACE");
        });

    test( "CharFunk isDigit", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==2) {
                ok( CharFunk.isDigit(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isDigit(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isLetter", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==1) {
                ok( CharFunk.isLetter(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isLetter(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isLetterOrDigit", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]>2) {
                ok( !CharFunk.isLetterOrDigit(ch), "test no for "+ii);
                }
            else {
                ok( CharFunk.isLetterOrDigit(ch), "test yes for "+ii);
                }
            }
        });
    test( "CharFunk isLetterNumber", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==3) {
                ok( CharFunk.isLetterNumber(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isLetterNumber(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isLowerCase", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.CASE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.CASE[ii]==2) {
                ok( CharFunk.isLowerCase(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isLowerCase(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isLowerCase", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.CASE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.CASE[ii]==2) {
                ok( CharFunk.isLowerCase(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isLowerCase(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isMirrored", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.MIRRORED.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.MIRRORED[ii]==1) {
                ok( CharFunk.isMirrored(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isMirrored(ch), "test no for "+ii);
                }
            }
        });

    test( "CharFunk isUpperCase", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.CASE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.CASE[ii]==1) {
                ok( CharFunk.isUpperCase(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isUpperCase(ch), "test no for "+ii);
                }
            }
        });
    
    test( "CharFunk isValidFirstForName", function() {
        ok( CharFunk.isValidFirstForName("A"), "test yes for A");
        ok( CharFunk.isValidFirstForName("z"), "test yes for z");
        ok( CharFunk.isValidFirstForName("_"), "test yes for _");
        ok( CharFunk.isValidFirstForName("$"), "test yes for $");
        ok( CharFunk.isValidFirstForName(String.fromCharCode(5870)), "test yes for $");

        ok( !CharFunk.isValidFirstForName("1"), "test no for 1");
        ok( !CharFunk.isValidFirstForName("?"), "test no for ?");
        ok( !CharFunk.isValidFirstForName("\u2000"), "test no for \u2000");       
        });

    test( "CharFunk isValidMidForName", function() {
        ok( CharFunk.isValidMidForName("A"), "test yes for A");
        ok( CharFunk.isValidMidForName("z"), "test yes for z");
        ok( CharFunk.isValidMidForName("_"), "test yes for _");
        ok( CharFunk.isValidMidForName("$"), "test yes for $");
        ok( CharFunk.isValidMidForName(String.fromCharCode(5870)), "test yes for $");
        ok( CharFunk.isValidMidForName("1"), "test yes for 1");

        ok( !CharFunk.isValidMidForName("?"), "test no for ?");
        ok( !CharFunk.isValidMidForName("\u2000"), "test no for \u2000");       
        });

    test( "CharFunk isValidName", function() {
        var ii, pi, ch, vld, nam, obj;
        ok( CharFunk.isValidName("Apple"), "test yes for Apple");
        ok( CharFunk.isValidName("banana_cherry"), "test yes for banana_cherry");
        ok( CharFunk.isValidName("date1"), "test yes for date1");
        ok( !CharFunk.isValidName("2elderberry"), "test no for 2elderberry");
        ok( !CharFunk.isValidName("fig grapefruit"), "test no for 'fig grapefruit'");
        
        /*FIXME: This isn't working, and I don't fully understand why.  Lots of false negatives and positives.
        for(ii=0; ii<6553; ii++) {
            obj={};
            nam="";
            for(pi=0; pi<10;pi++) {
                nam+=String.fromCharCode(ii*10+pi);
                }
            vld=false;
            try { 
                eval("var "+nam+"=1"); 
                vld=true;
                } 
            catch(e) { };//we'lL assume all failures here are due to invalid characters
            ok( vld==CharFunk.isValidName(nam), "test "+( vld ? "yes" : "no" )+" for generated "+ii*10+": '"+nam+"'");
            }*/
        }); 
  

    test( "CharFunk isWhitespace", function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.WHITESPACE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.WHITESPACE[ii]==1) {
                ok( CharFunk.isWhitespace(ch), "test yes for "+ii);
                }
            else {
                ok( !CharFunk.isWhitespace(ch), "test no for "+ii);
                }
            }
        });

    });
