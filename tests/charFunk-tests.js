$(function() {'use strict';

    var 
        //chosing first, middle and last letters in a few blocks
        letters=[
            "A",
            "M",
            "Z",
            "a",
            "m",
            "z",
            "\u00C0",//Latin Capital Letter A with Grave
            "\u00F6",//Latin Small Letter O with Diaeresis
            "\u0F00",//Tibetan Syllable Om
            "\u0FBC",//Tibetan Subjoined Letter Fixed-form Ra
            "\u2DE0",//Combining Cyrillic Letter Be
            "\u2DFF",//Combining Cyrillic Letter Iotified Big Yus
            ],
        //chosing first, middle and last numbers in a few blocks
        numbers=[
            ],
        //chosing non-letters right before or after blocks of letters, and others deeper in non-letter ranges
        notLetters=[
            "@",
            "[",
            "`",
            "{",
            "\u00BF",//Inverted Question Mark
            "\u00F7",//Division Sign
            "\u0EFF",//Undefined Codepoint
            "\u0FBD",//Undefined Codepoint
            "\u2DDF",//Undefined Codepoint
            "\u2E00",//Right Angle Substitution Marker
            "\u2E80",//CJK Radical Repeat
            ],
        //chosing non-numbers right before or after blocks of numbers, and others deeper in non-numbers ranges
        notNumbers=[
            ],
        unicodePrint=function(ch) {
            return "  "+ch.charCodeAt(0).toString(16).toUpperCase();
            };
        ;



    test( "CharFunk basic tests", function() {

        ok( typeof CharFunk=="object", "basic existence check");
        ok( typeof CharFunk._GTYPE_LETTER=="undefined", "invisible _GTYPE_LETTER");
        ok( typeof CharFunk._GTYPE_DIGIT=="undefined", "invisible _GTYPE_DIGIT");
        ok( typeof CharFunk._GTYPE_OTHER=="undefined", "invisible _GTYPE_OTHER");
        ok( typeof CharFunk._NAME_ALLOW_STANDARD=="undefined", "invisible _NAME_ALLOW_STANDARD");
        ok( typeof CharFunk._GTYPE_TABLE=="undefined", "invisible _GTYPE_TABLE");
        ok( typeof CharFunk._WSPACE_TABLE=="undefined", "invisible _WSPACE_TABLE");
        ok( typeof CharFunk._getGeneralType=="undefined", "invisible _getGeneralType");

        });

    test( "CharFunk isLetterOrDigit", function() {
        var ii;
        for(ii=0; ii<letters.length; ii++) {
            ok( CharFunk.isLetterOrDigit(letters[ii]), "test yes for "+letters[ii]+" "+unicodePrint(letters[ii]));
            }
        for(ii=0; ii<notLetters.length; ii++) {
            ok( !CharFunk.isLetterOrDigit(notLetters[ii]), "test no for "+notLetters[ii]+" "+unicodePrint(notLetters[ii]));
            }

        ok( CharFunk.isLetterOrDigit("1"), "test 1");
        });


    });
