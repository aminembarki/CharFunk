/*

CharFunk v1.1.0

*********************************** License ************************************

Copyright (c) 2013 by Joe Larson (http://joewlarson.com), MIT License
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

************************************ Doco *************************************

See: https://github.com/joelarson4/CharFunk (previously http://code.google.com/p/charfunk/)

Intended to support:
 1) Supporting a "General Type", avoiding more specific proper unicode charpoint type
 2) Supporting isWhiteSpace test

Not intending to support:
 1) Not supporting directionality test right now, just adding a table to support that would double the size of this library.    However, the way to do that would be very similar to _GTYPE.
 2) Deliberately ignoring complexity at the higher end of unicode, because frankly I don't have time or need to understand it yet...

Each key in "_GTYPE_TABLE" represents the lower bound charcode of a range of characters, the value being the type of character.
These were harvested using Java's Character.isLetter() and .isDigit()

*/

(function(root) {'use strict';
    var 
        //!start data
        _GTYPE={
            LETTER:[65,32,73,11,5,6,24,32,344,118,26,14,140,12,2,4,2,21,45,39,9,138,70,40,8,49,40,8,111,32,49,31,46,3,100,16,9,12,5,17,2,59,51,49,339,57,19,8,45,10,4,23,8,4,7,31,3,17,21,10,4,23,8,3,3,33,5,20,19,10,4,23,8,3,8,19,16,37,10,4,23,8,3,8,31,3,18,18,2,9,4,7,3,2,5,5,6,9,78,9,4,24,11,43,37,9,4,24,11,8,33,2,37,9,4,24,54,37,21,25,10,3,65,49,14,65,3,3,3,3,7,5,8,4,2,3,3,5,11,3,6,22,36,64,9,63,120,35,6,39,80,48,48,95,73,88,8,64,2,6,8,2,6,40,2,6,32,2,6,8,2,6,8,8,24,32,2,6,8,40,88,97,622,18,31,96,14,18,32,32,14,18,87,5,68,96,128,80,32,912,256,160,96,24,8,40,8,9,2,2,2,33,54,8,4,4,10,6,10,18,4,123,14,131,5,3,11,4,11,2,2,2,5,4,10,8,3776,44,10,6,92,4,91,9,44,111,80,528,6656,20992,3072,19712,304,208,19,10,2,11,14,6,2,3,3,141,381,66,94,128,6,171,32,37,92,8,8,8],
            DIGIT:[48,1584,144,630,128,128,128,128,129,127,128,128,234,128,80,288,809,1143,48,310,58826],
            LETTER_NUMBER:[5870,2674,3751,26,23],
            OTHER:[0,58,33,32,48,11,5,28,32,320,139,16,19,10,140,12,4,2,21,45,39,6,134,77,39,4,22,71,3,46,99,8,72,16,31,6,100,2,17,22,3,17,31,32,86,12,392,4,19,17,14,29,4,24,8,2,7,4,32,4,16,25,6,24,8,3,3,3,35,2,17,5,25,4,23,8,3,6,4,19,17,14,29,4,24,8,3,6,4,32,4,14,2,18,7,6,5,5,2,3,5,6,11,4,54,29,4,24,11,6,40,14,29,4,24,11,6,4,33,3,14,29,4,24,17,40,14,39,27,10,2,9,106,3,19,19,41,2,4,2,3,10,8,4,2,2,4,5,3,10,7,2,19,4,35,41,30,35,33,150,6,3,31,12,112,51,97,73,87,13,64,2,5,9,2,5,41,2,5,33,2,5,9,2,5,9,8,24,32,2,5,9,40,20,23,131,632,10,36,80,6,28,5,32,32,27,4,67,36,5,13,48,94,49,116,81,7,1015,304,94,28,8,40,8,10,2,2,2,32,55,8,2,6,8,7,8,17,8,8,117,14,131,5,12,2,8,7,2,2,5,4,8,6,10,58,3716,34,12,7,90,9,91,5,45,98,41,72,7094,20976,1255,13079,8842,61,156,17,6,11,14,6,2,3,3,109,396,82,56,52,121,136,29,33,32,100,9,8,8,5]
            },
        _CASE={
            UPPER:[65,127,24,40,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,4,3,2,3,5,5,3,6,3,3,2,2,3,3,2,3,4,2,5,8,3,3,3,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,3,3,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,340,2,4,2,3,18,47,6,2,2,2,2,2,2,2,2,2,2,2,6,3,2,7,96,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,8,2,2,2,2,2,2,2,35,2927,3424,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,12,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,16,16,16,16,16,17,2,2,2,9,80,16,16,16,16,266,5,4,5,5,4,11,2,2,2,6,3,11,7,56796],
            LOWER:[97,73,11,5,37,25,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,5,2,3,4,6,3,4,5,3,2,2,3,2,3,3,4,2,3,4,9,3,3,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,4,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,320,28,36,5,4,2,2,2,2,2,2,2,2,2,2,2,6,3,3,53,49,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,8,2,2,2,2,2,2,2,82,6047,98,159,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,12,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,16,16,16,16,16,16,16,16,16,16,16,6,8,4,4,10,6,10,18,4,123,14,139,4,5,28,5,5,4,9,55738,19,1070],
            OTHER:[0,91,32,48,11,5,28,32,196,5,5,3,3,39,69,121,215,4,2,21,45,39,6,134,77,39,4,22,71,49,2878,3174,64,304,94,28,8,40,8,10,2,2,2,32,10,16,16,13,7,3,6,7,8,8,17,8,7,118,14,131,5,12,2,8,7,2,2,5,4,3,5,6,10,55741,17,1059,32]
            },
        _DIRECTIONALITY={
            UNDEFINED:[567,289,24,6,5,4,12,2,21,45,45,139,72,39,4,22,71,9,40,3,23,24,11,38,10,15,18,6,4,27,30,181,61,5,98,392,20,7,28,19,9,4,24,8,2,7,11,4,5,10,6,6,23,9,7,6,24,8,3,3,3,3,6,6,5,15,2,22,15,10,4,23,8,3,6,12,4,4,3,19,12,2,18,9,4,24,8,3,6,10,5,5,10,6,4,16,18,7,6,5,5,2,3,5,6,11,4,9,6,5,10,35,9,9,4,24,11,6,11,4,5,9,11,14,20,9,4,24,11,6,11,4,5,9,8,3,14,20,9,4,24,17,10,5,5,10,10,14,20,19,27,10,2,9,4,10,2,9,21,70,33,39,2,4,2,3,10,8,4,2,2,4,14,4,7,2,7,12,4,106,35,33,12,37,16,3,82,6,3,8,7,32,108,51,3,94,73,87,13,64,2,5,9,2,5,41,2,5,33,2,5,9,2,5,9,8,24,32,2,5,9,40,20,34,120,642,38,84,28,8,34,29,25,4,3,106,12,16,21,11,94,50,115,15,16,5,45,7,139,876,304,94,28,8,40,8,10,2,2,2,32,55,16,15,8,20,5,10,86,3,12,14,29,35,57,81,16,56,589,86,36,461,102,20,16,99,5,30,36,2,5,4,8,54,27,15,45,802,908,90,226,38,68,87,105,45,98,41,103,37,58,129,6839,20976,1255,58,13021,8842,61,156,17,31,6,2,3,3,109,398,80,56,54,18,20,47,20,5,9,136,3,191,9,8,8,5,10,8,15],
            L:[65,32,73,11,5,6,24,32,344,107,21,16,14,140,12,2,4,2,21,45,39,9,138,70,40,8,49,40,8,40,890,58,12,7,8,12,30,3,10,4,23,8,4,7,10,4,12,5,3,7,14,15,2,10,4,23,8,3,3,6,27,5,8,12,17,2,10,4,23,8,3,8,12,2,5,16,6,28,3,10,4,23,8,3,8,3,7,4,12,5,3,7,29,2,9,4,7,3,2,5,5,6,9,7,3,5,4,13,16,26,4,9,4,24,11,12,31,6,28,3,9,4,24,11,8,9,4,11,9,2,6,28,3,9,4,24,20,8,4,13,9,6,28,3,21,25,10,3,15,9,26,15,49,14,15,50,3,3,3,3,7,5,8,4,2,3,3,5,11,3,6,10,12,36,26,28,2,6,11,54,6,3,54,9,8,49,35,6,3,5,7,8,96,48,43,5,95,73,88,8,64,2,6,8,2,6,40,2,6,32,2,6,8,2,6,8,8,24,32,2,6,8,40,25,63,97,640,31,96,14,18,21,11,32,14,18,62,9,13,8,4,48,16,96,128,35,13,3,19,42,912,256,160,96,24,8,40,8,9,2,2,2,33,54,8,4,4,10,6,10,18,4,24,99,14,131,5,3,11,4,11,2,2,2,5,4,10,8,27,470,95,263,2921,28,16,7,9,92,4,91,9,44,95,96,48,64,31,65,16,48,123,101,32,6656,20992,3072,11264,8752,208,19,1038,32,37,92,8,8,8],
            R:[1470,2,3,13,32,6687,56078,2,11,14,6,2,3,3],
            AL:[1536,13,14,4,2,31,45,4,108,8,9,12,22,2,59,51,49,62367,131,381,66,94,128,6],
            EN:[48,130,7,1591,6528,4,12,992,138,55846],
            ES:[47,65248],
            ET:[35,8,2,117,14,1466,904,255,264,582,2460,2133,74,16,22,142,228,55575,822,3,7,154,8,2,211,5],
            AN:[1632,11],
            CS:[44,2,12,102,1388,63556,2,3,183,2,12],
            NSM:[768,93,294,5,265,18,24,4,2,3,76,59,37,102,8,9,3,39,31,118,347,59,5,12,4,17,31,59,5,12,21,31,59,5,6,4,37,17,59,5,6,6,21,31,59,3,2,12,9,44,62,13,113,8,4,11,103,16,117,12,125,8,4,91,3,19,106,3,7,13,80,29,2,2,56,15,6,10,9,45,103,5,4,3,31,1722,32,32,32,69,15,3,20,46,158,119,7,11,7,1943,3930,111,51845,738,32],
            BN:[0,14,113,7,1673,6396,85,10,56981,250],
            B:[10,3,15,105,8100],
            S:[9,2,20],
            WS:[12,20,5728,398,2034,40,7,48,4001],
            ON:[33,5,21,32,32,38,5,5,9,2,5,28,32,450,9,16,19,10,133,10,6,3,111,404,132,219,1290,7,832,1889,341,16,320,4,156,1501,2,14,16,16,16,19,37,34,37,16,116,3,5,12,2,8,7,2,2,9,8,6,10,9,61,132,359,27,106,64,171,302,103,32,97,5,6,29,36,2,7,2,9,55,25,31,32,1680,27,101,240,17,7,40,6,7,94,5,91,290,51,44,53,27,171,103,33,6593,22224,22702,191,51,33,3,2,10,4,4,3,150,5,21,32,32,135,6,20],
            LRE:[8234],
            LRO:[8237],
            RLE:[8235],
            RLO:[8238],
            PDF:[8236]
            },
        _MIRRORED={
            YES:[40,20,2,29,2,30,2,46,16,8062,12,56,16,179,193,7,9,4,5,5,5,2,5,14,2,23,13,3,2,10,33,9,10,4,24,11,7,6,26,24,24,9,1087,107,9,6,417,24,29,8,9,5,6,4,9,2,5,12,8,14,20,6,2,3,2,9,8,27,13,6,5,4,6,45,9,45,2,4,10,7,4,6,1291,12,52980,20,2,29,2,30,2,2,3],
            NO:[0,42,19,2,29,2,30,2,46,16,8063,12,56,16,178,196,9,4,5,7,5,2,2,13,6,19,9,11,2,9,33,6,6,11,21,7,14,4,28,18,12,22,9,1099,97,8,13,429,23,9,13,4,9,3,7,5,4,4,16,4,31,5,3,2,3,5,7,9,26,13,8,3,4,47,10,41,6,2,8,8,5,8,2,1300,10,52974,19,2,29,2,30,2,3,3]
            },
        _NAMEMID={
            YES:[36,12,17,30,2,73,11,5,6,24,32,344,118,26,14,18,93,29,12,2,4,2,21,45,39,9,131,7,70,40,8,49,40,8,48,18,24,4,2,3,12,32,32,17,31,32,14,103,10,11,21,17,61,51,385,59,20,8,14,27,4,10,4,23,8,4,6,11,4,12,5,3,7,27,4,10,4,23,8,3,3,4,2,9,4,14,5,8,27,4,10,4,23,8,3,7,11,4,5,16,6,27,4,10,4,23,8,3,7,11,4,11,6,3,7,11,17,3,9,4,7,3,2,5,5,6,9,7,8,4,13,16,26,4,9,4,24,11,9,8,4,11,11,6,28,3,9,4,24,11,7,10,4,11,9,2,6,28,3,9,4,24,20,8,4,13,9,6,28,3,21,25,10,3,10,5,7,2,26,15,63,16,49,3,3,3,3,7,5,8,4,2,3,3,14,5,6,2,8,12,36,24,8,21,2,2,5,11,40,21,10,9,45,58,35,6,3,10,10,16,80,48,48,95,73,88,8,64,2,6,8,2,6,40,2,6,32,2,6,8,2,6,8,8,24,32,2,6,8,40,33,55,97,622,18,31,78,18,14,18,32,32,14,4,14,54,33,5,4,43,5,16,96,128,32,16,22,42,912,256,160,96,24,8,40,8,9,2,2,2,33,54,8,4,4,10,6,10,18,4,22,51,21,29,14,81,17,4,29,5,3,11,4,11,2,2,2,5,4,10,8,27,3749,28,16,7,9,88,4,4,100,44,111,80,528,6656,20992,3072,19712,304,208,19,10,13,14,6,2,3,3,141,381,66,94,16,32,19,26,35,6,154,17,30,2,36,93,8,8,8],
            NO:[0,37,21,33,5,27,48,11,5,28,32,320,139,16,19,10,105,24,11,12,4,2,21,45,39,6,134,5,72,39,4,22,71,3,46,26,24,4,2,3,2,38,8,35,37,30,17,106,9,12,20,3,75,5,98,392,20,7,15,12,20,9,4,24,8,2,7,11,4,5,10,6,6,14,18,7,6,24,8,3,3,3,3,6,6,5,15,2,22,15,10,4,23,8,3,6,12,4,4,3,19,12,20,9,4,24,8,3,6,10,5,5,10,6,4,14,2,18,7,6,5,5,2,3,5,6,11,4,9,6,5,10,24,20,9,4,24,11,6,11,4,5,9,11,14,20,9,4,24,11,6,11,4,5,9,8,3,14,20,9,4,24,17,10,5,5,10,10,14,20,19,27,10,2,9,4,10,2,9,20,71,20,11,41,2,4,2,3,10,8,4,2,2,4,14,4,7,2,7,12,4,35,25,16,12,2,2,14,35,26,7,12,37,10,91,6,3,8,7,16,16,108,51,97,73,87,13,64,2,5,9,2,5,41,2,5,33,2,5,9,2,5,9,8,24,32,2,5,9,40,20,23,131,632,10,36,80,6,28,8,32,31,25,4,3,64,32,4,6,12,36,12,94,50,115,15,16,50,7,1015,304,94,28,8,40,8,10,2,2,2,32,55,8,2,6,8,7,8,17,8,8,17,51,20,29,14,93,5,9,24,5,12,2,8,7,2,2,5,4,8,6,10,58,3716,40,6,7,90,4,5,96,45,98,41,72,7094,20976,1255,13079,8842,61,156,17,17,14,6,2,3,3,109,396,82,56,52,20,20,17,27,37,136,29,33,5,27,100,9,8,8,5]
            },
        _WHITESPACE={
            YES:[9,19,5732,398,2034,8,32,55,4001],
            NO:[0,14,19,5728,398,2040,5,30,54,4001]
            },
        //!end data
        /*
        Objective of inflateProperty is to inflate set argument into a usable data structure.
        The set argument is an object:
          Each property in the set is an array.  
          Each number in the array represents a codepoint where that property is turned on (the codepoint before being off).  
          Instead of representing the codepoint in unicode, it represents the distance from the last switch on.
        
        Inflated structure for _GTYPE would look like this:
         _GTYPE:{ LETTER:1, DIGIT: 2, OTHER: 3, CODEPOINTS: [ [0,3],[48,2],[58,3],[65,1]... } } 
        where in CODEPOINTS array of arrays the first element is the position and the second element is the type
        */          
        inflateProperty=function(set) {
            var 
                di,
                ci, 
                prpnam,
                prpmap={}, //maps the property to a number
                prpcnt=0,
                prppos={}, //the next position of this property
                codpnt=[]; //the final output we want

            for(prpnam in set) {
                prpmap[prpnam]=++prpcnt;
                prppos[prpnam]=set[prpnam].shift();
                if(prppos[prpnam]==0) {
                    codpnt.push([0,prpmap[prpnam]]);
                    prppos[prpnam]=set[prpnam].shift();
                    }
                }

            for(ci=1; ci<65535; ci++) {
                for(prpnam in set) {
                    if(ci==prppos[prpnam]) {
                        codpnt.push([ci,prpmap[prpnam]]);
                        prppos[prpnam]=ci+set[prpnam].shift();
                        }
                    }
                }

            set.CODEPOINTS=codpnt;
            for(prpnam in prpmap) {
                set[prpnam]=prpmap[prpnam];
                }
            },
        /*
        Returns the value of this character according to the map in question
        */
        getProperty=function(map,ch) {
            if(!map.CODEPOINTS) { inflateProperty(map); } //only done when needed.  this is pretty fast so ok to do it inline
            return findProperty(ch.charCodeAt(0),map.CODEPOINTS,0,map.CODEPOINTS.length);
            },
        /*
        Helper function for getProperty which navigates the CODEPOINT structure
        */
        findProperty=function(ci,codpnt,str,end) {
            var mid=Math.floor((str+end)/2);
            if(codpnt[mid][0]<=ci && ( mid>=codpnt.length-1 || codpnt[mid+1][0]>ci )) {
                return codpnt[mid][1];
                }
            else if(codpnt[mid][0]>ci) {
                return findProperty(ci,codpnt,str,mid);
                }
            else {
                return findProperty(ci,codpnt,mid,end);
                }
            },
        /*
        Used to find the directionality, which is handled a bit differently than the other sets of properties since we need a value back, not just true/false.
        Returns one of the following:
            UNDEFINED
            L   for LEFT_TO_RIGHT
            R   for RIGHT_TO_LEFT
            AL  for RIGHT_TO_LEFT_ARABIC
            EN  for EUROPEAN_NUMBER
            ES  for EUROPEAN_NUMBER_SEPARATOR
            ET  for EUROPEAN_NUMBER_TERMINATOR
            AN  for ARABIC_NUMBER
            CS  for COMMON_NUMBER_SEPARATOR
            NSM for NONSPACING_MARK
            BN  for BOUNDARY_NEUTRAL
            B   for PARAGRAPH_SEPARATOR
            S   for SEGMENT_SEPARATOR
            WS  for WHITESPACE
            ON  for OTHER_NEUTRALS
            LRE for LEFT_TO_RIGHT_EMBEDDING
            LRO for LEFT_TO_RIGHT_OVERRIDE
            RLE for RIGHT_TO_LEFT_EMBEDDING
            RLO for RIGHT_TO_LEFT_OVERRIDE
            PDF for POP_DIRECTIONAL_FORMAT
        */
        getDirectionality=function(ch) {
            var dir, pi;
            dir=getProperty(_DIRECTIONALITY,ch);
            for(pi in _DIRECTIONALITY) {
                if(_DIRECTIONALITY[pi]==dir) {
                    return pi;   
                    }
                }
            },
        isAllLettersOrDigits=function(str,frm) {
            for(var ci=frm || 0; ci<str.length; ci++) {
                if(!isLetterOrDigit(str.charAt(ci))) { return false; }
                }
            return true;
            },
        isDigit=function(ch) {
            return ( getProperty(_GTYPE,ch)==_GTYPE.DIGIT );
            },
        isLetter=function(ch) {
            return ( getProperty(_GTYPE,ch)==_GTYPE.LETTER );
            },
        isLetterNumber=function(ch) {
            return ( getProperty(_GTYPE,ch)==_GTYPE.LETTER_NUMBER );
            },
        isLetterOrDigit=function(ch) {
            var typ=getProperty(_GTYPE,ch);
            return ( typ==_GTYPE.LETTER || typ==_GTYPE.DIGIT );
            },
        isLowerCase=function(ch) {
            return ( getProperty(_CASE,ch)==_CASE.LOWER );
            },
        isMirrored=function(ch) {
            return ( getProperty(_MIRRORED,ch)==_MIRRORED.YES );
            },
        isUpperCase=function(ch) {
            return ( getProperty(_CASE,ch)==_CASE.UPPER );
            },
        isValidFirstForName=function(ch) {
            //From the excellent http://mathiasbynens.be/notes/javascript-identifiers
            //  An identifier must start with $, _, or any character in the Unicode categories 
            //  “Uppercase letter (Lu)”, “Lowercase letter (Ll)”, “Titlecase letter (Lt)”, 
            //  “Modifier letter (Lm)”, “Other letter (Lo)”, or “Letter number (Nl)”.
            //Which matches Java *EXCEPT*FOR* the lead $ and _ ... but also the Letter number being allowed.
            return ( ch.charAt(0)=='_' || ch.charAt(0)=='$' || isLetter(ch.charAt(0)) || isLetterNumber(ch.charAt(0)) );
            },
        isValidMidForName=function(ch) {
            //see the GenCharFunkData.java explanation for namemid
            return ( getProperty(_NAMEMID,ch)==_NAMEMID.YES );
            },
        /*
        Returns true if the string is a valid JavaScript identifier.  
        This is a bit more restrictive than browsers tend to be, using the actual rules http://www.ecma-international.org/ecma-262/5.1/
        */
        isValidName=function(str) {
            if(!isValidFirstForName(str)) { return false; }
            for(var ci=1; ci<str.length; ci++) {
                if(!isValidMidForName(str.charAt(ci))) { return false; }
                }
            return true;
            },
        isWhitespace=function(ch) {
            return ( getProperty(_WHITESPACE,ch)==_WHITESPACE.YES );
            }
        ;

    
    root.CharFunk={  
        getDirectionality:getDirectionality,
        isAllLettersOrDigits:isAllLettersOrDigits,
        isDigit:isDigit,
        isLetter:isLetter,
        isLetterOrDigit:isLetterOrDigit,
        isLetterNumber:isLetterNumber,
        isLowerCase:isLowerCase,
        isMirrored:isMirrored,
        isUpperCase:isUpperCase,
        isValidFirstForName:isValidFirstForName,
        isValidMidForName:isValidMidForName,
        isValidName:isValidName,
        isWhitespace:isWhitespace
        };
    })(this);
