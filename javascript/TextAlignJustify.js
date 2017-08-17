/**
 * @param {String} str - inital string
 * @param {Number} len - line length
 */

function spacesVec(words, emptyLen) {
    var base = Math.floor(emptyLen / (words - 1));
    //console.log ('base' + base);
    var reminder = emptyLen % (words - 1);
    // console.log ('reminder ' + reminder);
    var result = [];
    for (var i = 0; i < words - 1; i++) {
        if (i < reminder) {
            result.push(base + 1);
        } else {
            result.push(base);
        }
    }
    return result;
}

function makeString(preStr, strArr, spacesArr, startInd, len) {
    result = preStr;
    if (startInd == 0) {
        for (var i = startInd; i < startInd + len; i++) {
            result += strArr[i] + " ".repeat(spacesArr[i - startInd]);
        }
    } else {
        for (var i = startInd + 1; i < startInd + 1 + len; i++) {
            result += strArr[i] + " ".repeat(spacesArr[i - startInd - 1]);
        }
    }

    return result + "\n";
}

var justify = function(str, len) {
    var cache = {};
    var strToArray = str.split(" ");
    console.log("strToArray " + strToArray);
    strToArray.reduce((pre, cur, ind) => {
        cache[ind] = cache[ind - 1] ? cache[ind - 1] + cur.length : cur.length;
    }, {});
    console.log("cache ", cache);
    var result = "";
    var wordPointer = 0;
    var lastend = 0;
    var wordsOneLine = 0;
    for (var i = 0; i < strToArray.length; i++) {
        var currentLen = cache[i];
        console.log("currentLen " + currentLen);
        wordsOneLine += 1;
        console.log(" wordsOneLine->> " + wordsOneLine + " lastend " + lastend);
        if (
            currentLen - lastend < len - wordsOneLine + 1 &&
            cache[i + 1] - lastend > len - wordsOneLine
        ) {
            console.log("wordPointer " + wordPointer);
            if (len - (currentLen - lastend) >= wordsOneLine - 1) {
                var spaces = spacesVec(wordsOneLine, len - (currentLen - lastend));
                console.log("spaces", spaces);
                console.log("worldPointer " + wordPointer);
                console.log("wordsOneLine " + wordsOneLine);
                result = makeString(
                    result,
                    strToArray,
                    spaces,
                    wordPointer,
                    wordsOneLine
                );
                console.log("result-> " + result);
                wordsOneLine = 0;
                wordPointer = i;
                lastend = cache[i];
                console.log(
                    "wordsOneLine " +
                    wordsOneLine +
                    " wordPointer " +
                    wordPointer +
                    " lasend " +
                    lastend
                );
            }
        }
    }
    while (wordPointer != strToArray.length - 1) {
        for (var j = wordPointer + 1; j < strToArray.length; j++) {
            result += strToArray[j] + " ";
            wordPointer = j;
        }
    }

    console.log(" outsider wordPointer " + wordPointer);
    return result.trimRight();
};

//justify(str, 30)

//best practice

function justify(str, len) {
    var words = str.split(' ');
    var lines = [];
    var lastLine = words.reduce(function(line, word) {
        if (line) {
            if (line.length + word.length + 1 <= len)
                return line + ' ' + word;
            lines.push(line);
        }
        return word;
    });
    lines = lines.map(function(line) {
        if (line.indexOf(' ') >= 0)
            for (var lineLen = line.length; lineLen < len;)
                line = line.replace(/ +/g, function(spaces) {
                    return spaces + (lineLen++ < len ? ' ' : '');
                });
        return line;
    });
    lastLine && lines.push(lastLine);
    return lines.join('\n');
}


//second
var justify = function(str, len) {
    var words = str.split(' ');
    var output = [];
    while (words.length) {
        // Collect as many words as possible for the current line
        var lineWords = [];
        while (words.length > 0 && (lineWords + ',' + words[0]).length <= len)
            lineWords.push(words.shift());

        if (words.length) { // No last line, so justify it
            // Compute the holes between the words
            var spaces = len - ('' + lineWords).length;
            for (var i = 0; i < spaces; i++)
                lineWords[i % (lineWords.length - 1)] += ' ';
        }

        // Build the line
        output.push(lineWords.join(' '));
    }

    return output.join('\n');
};