var abc, key;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password";
c = new VigenèreCipher(key, abc);

// Test.assertEquals(c.encode('codewars'), 'rovwsoiv');
// Test.assertEquals(c.encode('srawedoc'), 'hrsoarff');

function VigenèreCipher(key, abc) {
    // var key = "password";
    // var abc = "abcdefghijklmnopqrstuvwxyz";
    var alphabetArr = abc.split('');
    var NtoAobject = alphabetArr.reduce((p, c, i) => {
        p[i] = c;
        return p;
    }, {});
    var AtoNobject = alphabetArr.reduce((p, c, i) => {
        p[c] = i;
        return p;
    }, {});
    var numbersArr = Array(abc.length).fill(0).map((u, i) => i);
    var searchTable = numbersArr.reduce((p, c, i) => {
        var putIn = numbersArr.slice(i).concat(numbersArr.slice(0, i));
        return p.concat([putIn]);
    }, []);

    var passwordLen = key.length;


    this.encode = function(str) {
        var len = str.length;
        var keyStr = key.repeat(Math.floor(len / passwordLen) + 1).slice(0, len).split('');
        return str.split('').reduce((p, c, i) => {
            c = NtoAobject[searchTable[AtoNobject[keyStr[i]]][AtoNobject[c]]] !== undefined ? NtoAobject[searchTable[AtoNobject[keyStr[i]]][AtoNobject[c]]] : c;
            return p += c;
        }, '');

    };
    this.decode = function(str) {
        //... key  password
        //... code rovwsoiv
        var len = str.length;
        var keyStr = key.repeat(Math.floor(len / passwordLen) + 1).slice(0, len).split('');
        return str.split('').reduce(
            (p, c, i) => {
                var cToN = AtoNobject[c];
                if (cToN !== undefined) {
                    // console.log('cToN', cToN);
                    var row = searchTable[AtoNobject[keyStr[i]]];
                    // console.log('row', row);
                    var index = row.indexOf(cToN);
                    return p += NtoAobject[index];
                } else {
                    return p += c;
                }
            }, '');
    };
}


// best practice
function VigenèreCipher(key, alphabet) {
    function encode(direction, inStr) {
        var inChar, inIdx, outIdx, outChar, keyChar, offset;

        var outStr = '';

        // Process each character of the input string sequentially
        for (var pos = 0; pos < inStr.length; ++pos) {

            // Look up input character in the alphabet
            inChar = inStr.charAt(pos);
            inIdx = alphabet.indexOf(inChar);

            // If character isn't in alphabet, just copy it to output
            if (inIdx < 0)
                outChar = inChar;
            else {
                // Get the key character for the current position
                // and determine the shift distance
                keyChar = key.charAt(pos % key.length);
                offset = alphabet.indexOf(keyChar);

                // Shift the character forwards or backwards in
                // the alphabet, wrapping around if necessary
                outIdx = inIdx + direction * offset;
                if (outIdx >= alphabet.length)
                    outIdx = outIdx - alphabet.length;
                else if (outIdx < 0)
                    outIdx = outIdx + alphabet.length;

                outChar = alphabet.charAt(outIdx);
            }

            outStr += outChar;
        }

        return outStr;
    }

    // Encode by shifting characters forward in the alphabet
    this.encode = function(string) {
        return encode(1, string);
    };

    // Decode by shifting characters backwards in the alphabet
    this.decode = function(string) {
        return encode(-1, string);
    };
}