$(function() {'use strict';

    test( 'CharFunk basic tests', function() {
        ok( typeof CharFunk=='object', 'basic existence check');
        ok( typeof CharFunk._GTYPE=='undefined', 'invisible GTYPE');
        ok( typeof CharFunk._CASE=='undefined', 'invisible CASE');
        ok( typeof CharFunk._DIRECTIONALITY=='undefined', 'invisible DIRECTIONALITY');
        ok( typeof CharFunk._MIRRORED=='undefined', 'invisible MIRRORED');
        ok( typeof CharFunk._WHITESPACE=='undefined', 'invisible WHITESPACE');
    });

    test( 'CharFunk error test', function() {
        throws( function() { CharFunk.isDigit(); }, "error expected for missing char argument" );
        throws( function() { CharFunk.isDigit(1); }, "error expected for Number char argument" );
        throws( function() { CharFunk.isDigit({}); }, "error expected for Object char argument" );
        throws( function() { CharFunk.isDigit([]); }, "error expected for Array char argument" );
        throws( function() { CharFunk.isDigit(null); }, "error expected for null char argument" );
        throws( function() { CharFunk.isDigit("string"); }, "error expected for String length>1 char argument" );

        throws( function() { CharFunk.isAllLettersOrDigits(); }, "error expected for missing string argument" );
        throws( function() { CharFunk.isAllLettersOrDigits(1); }, "error expected for Number string argument" );
        throws( function() { CharFunk.isAllLettersOrDigits({}); }, "error expected for Object string argument" );
        throws( function() { CharFunk.isAllLettersOrDigits([]); }, "error expected for Array string argument" );
        throws( function() { CharFunk.isAllLettersOrDigits(null); }, "error expected for null string argument" );

        ok( CharFunk.isAllLettersOrDigits(""), "ok with length 0 string" );
    });

    test( 'CharFunk isDigit', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==2) {
                ok( CharFunk.isDigit(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isDigit(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isLetter', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==1) {
                ok( CharFunk.isLetter(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isLetter(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isLetterOrDigit', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]>2) {
                ok( !CharFunk.isLetterOrDigit(ch), 'test no for '+ii);
            }
            else {
                ok( CharFunk.isLetterOrDigit(ch), 'test yes for '+ii);
            }
        }
    });
    test( 'CharFunk isLetterNumber', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.GTYPE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.GTYPE[ii]==3) {
                ok( CharFunk.isLetterNumber(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isLetterNumber(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isLowerCase', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.CASE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.CASE[ii]==2) {
                ok( CharFunk.isLowerCase(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isLowerCase(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isMirrored', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.MIRRORED.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.MIRRORED[ii]==1) {
                ok( CharFunk.isMirrored(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isMirrored(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isUpperCase', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.CASE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.CASE[ii]==1) {
                ok( CharFunk.isUpperCase(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isUpperCase(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk isValidFirstForName', function() {
        ok( CharFunk.isValidFirstForName('A'), 'test yes for A');
        ok( CharFunk.isValidFirstForName('z'), 'test yes for z');
        ok( CharFunk.isValidFirstForName('_'), 'test yes for _');
        ok( CharFunk.isValidFirstForName('$'), 'test yes for $');
        ok( CharFunk.isValidFirstForName(String.fromCharCode(5870)), 'test yes for $');

        ok( !CharFunk.isValidFirstForName('1'), 'test no for 1');
        ok( !CharFunk.isValidFirstForName('?'), 'test no for ?');
        ok( !CharFunk.isValidFirstForName('\u2000'), 'test no for \u2000');       
    });

    test( 'CharFunk isValidMidForName', function() {
        ok( CharFunk.isValidMidForName('A'), 'test yes for A');
        ok( CharFunk.isValidMidForName('z'), 'test yes for z');
        ok( CharFunk.isValidMidForName('_'), 'test yes for _');
        ok( CharFunk.isValidMidForName('$'), 'test yes for $');
        ok( CharFunk.isValidMidForName(String.fromCharCode(5870)), 'test yes for $');
        ok( CharFunk.isValidMidForName('1'), 'test yes for 1');

        ok( !CharFunk.isValidMidForName('?'), 'test no for ?');
        ok( !CharFunk.isValidMidForName('\u2000'), 'test no for \u2000');       
    });

    test( 'CharFunk isValidName', function() {
        var ii, pi, ch, vld, nam, obj;
        ok( CharFunk.isValidName('Apple'), 'test yes for Apple');
        ok( CharFunk.isValidName('banana_cherry'), 'test yes for banana_cherry');
        ok( CharFunk.isValidName('date1'), 'test yes for date1');
        ok( !CharFunk.isValidName('2elderberry'), 'test no for 2elderberry');
        ok( !CharFunk.isValidName('fig grapefruit'), 'test no for "fig grapefruit"');
        
        ok( CharFunk.isValidName('function'), 'test yes for function when not checking reserved keywords');
        ok( !CharFunk.isValidName('function',true), 'test no for function when checking reserved keywords');
    }); 

    test( 'CharFunk isWhitespace', function() {
        var ii, ch;
        for(ii=0; ii<TEST_DATA.WHITESPACE.length; ii++) {
            ch=String.fromCharCode(ii);
            if(TEST_DATA.WHITESPACE[ii]==1) {
                ok( CharFunk.isWhitespace(ch), 'test yes for '+ii);
            }
            else {
                ok( !CharFunk.isWhitespace(ch), 'test no for '+ii);
            }
        }
    });

    test( 'CharFunk indexOf', function() {
        ok( CharFunk.indexOf('This is 1 test', CharFunk.isWhitespace)==4, 'test finding first ascii whitespace');
        ok( CharFunk.indexOf('This\u1680is 1 test', CharFunk.isWhitespace)==4, 'test finding first unicode whitespace');
        ok( CharFunk.indexOf('Thisis1test', CharFunk.isWhitespace)==-1, 'test finding whitespace but no match exists');
    });

    test( 'CharFunk lastIndexOf', function() {
        ok( CharFunk.lastIndexOf('This is 1 test', CharFunk.isWhitespace)==9, 'test finding last ascii whitespace');
        ok( CharFunk.lastIndexOf('a b c d\u1680e', CharFunk.isWhitespace)==7, 'test finding last unicode whitespace');
        ok( CharFunk.lastIndexOf('Thisis1test', CharFunk.isWhitespace)==-1, 'test finding whitespace but no match exists');
    });


    test( 'CharFunk matchesAll', function() {
        var 
            check1=function(ch) {
                return CharFunk.isWhitespace(ch) || CharFunk.isLetterOrDigit(ch);
            },
            check2=function(ch) {
                return CharFunk.isMirrored(ch) || CharFunk.isLetterNumber(ch);
            },
            check3=function(ch,idx,len) {
                if(idx===0 || idx==len-1) return true; //accept anything for first and last position
                return CharFunk.isWhitespace(ch) || CharFunk.isLetterOrDigit(ch);
            }
            ;
        ok( CharFunk.matchesAll('This is 1 test', check1), 'test yes for matchesAll whitespace or letters or digits');
        ok( !CharFunk.matchesAll('This is 1 test.', check1), 'test no for matchesAll whitespace or letters or digits');
        ok( !CharFunk.matchesAll('This is 1 test', check2), 'test no for matchesAll mirrored or letternumber');
        ok( CharFunk.matchesAll('!This is 1 test!', check3), 'test yes for matchesAll whitespace or letters or digits but accept any start and end');
    });

    test( 'CharFunk replaceMatches', function() {
        var 
            replace1=function(ch) {
                return CharFunk.isLetterOrDigit(ch);
            },
            replace2=function(ch) {
                return CharFunk.isLetterOrDigit(ch);
            },
            replace3=function(ch,idx,len) {
                return '['+idx+' '+len+']';
            }
            ;
        ok( CharFunk.replaceMatches('This is 1 test!', replace1)=='Thisis1test', 'test removing non letterordigits');
        ok( CharFunk.replaceMatches('This is 1 test!', replace2, '_')=='This_is_1_test_', 'test replacing non letterordigits with underscore');
        ok( CharFunk.replaceMatches('Test', replace3)=='[0 4][1 4][2 4][3 4]', 'test replacing with custom string');
    });

    test( 'CharFunk getMatches', function() {
        ok( CharFunk.getMatches('This is a sentence',CharFunk.isLetterOrDigit).join(':')=='This:is:a:sentence', 'getMatches returns array');
        ok( CharFunk.getMatches('هذا اختبار',CharFunk.isLetterOrDigit).join(':')=="هذا:اختبار", 'getMatches returns array');
        ok( CharFunk.getMatches('This is a sentence',CharFunk.isMirrored).join(':')==='', 'getMatches returns array');
        ok( CharFunk.getMatches('Encyclopedia',CharFunk.isLetterOrDigit).join(':')=='Encyclopedia', 'getMatches returns array');
    });

    test( 'CharFunk splitOnMatches', function() {
        ok( CharFunk.splitOnMatches('This is a sentence',CharFunk.isWhitespace).join(':')=='This:is:a:sentence', 'splitOnMatches returns array');
        ok( CharFunk.splitOnMatches('هذا اختبار',CharFunk.isWhitespace).join(':')=="هذا:اختبار", 'splitOnMatches returns array');
        ok( CharFunk.splitOnMatches('Encyclopedia',CharFunk.isWhitespace).join(':')=='Encyclopedia', 'splitOnMatches returns array');
    });


});
