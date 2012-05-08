CharFunk
========

CharFunk provides some of the functionality that Java's Character class does, specifically for testing whether characters are letters or digits.

I needed a way to test whether strings in JavaScript were valid names in a Java/C/Javascript sense (leading letter or underscore; the rest letter, digit, underscore, dash).  I needed this to work in a internationally compatible way (so a regex like "\W" will not work unfortunately).  I could not find any existing solutions on the web (though if they exist, I would love to see them).

The utility class I came up with supports some basic char testing facilities.  It's general type ranges were harvested using Java's Character .isLetter(ch) and .isNumber(ch) methods.  The functions it contains are as follows:

    CharFunk.isLetterOrDigit(char)
      - Returns true if the char is a letter or digit

    CharFunk.isLetter(char)
      - Returns true if the char is a letter

    CharFunk.isDigit(char)
      - Returns true if the char is a digit

    CharFunk.isValidName(string[, allowed])
      - Supply a string to test as well as an optional additional 
        string of allowed additional characters, and it will return 
        true/false indicating if this is a valid name string

    CharFunk.isValidFirst(char)
      - Returns true or false depending on if the supplied char (or 
        first character of a string) is a valid name first character.

    CharFunk.isWhiteSpace(char)
      - Returns true if the char is whitespace
      
I cannot guarantee correctness and do not have the necessary Unicode expertise to make more improvements, but now this is on GitHub so anybody can help fix and make improvements.