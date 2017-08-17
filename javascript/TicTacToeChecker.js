function testEqual(arr, value) {
    var mid;
    for (var i = 0; i < arr.length; i++) {
        mid = arr[i];
        if (mid != value) {
            return false;
        }
    }
    return true;
}

function flat(a) {
    var b = [];
    a.forEach(function(c) {
        if (Array.isArray(c)) {
            b = b.concat(flat(c));
        } else {
            b.push(c);
        }
    });
    return b;
}

function isSolved(board) {
    var len = board.length;
    var tem1, tem2;
    var boardT = board;
    var cross1 = [];
    var cross2 = [];

    for (var i = 0; i < len; i++) {
        var el = board[i];
        if (testEqual(el, 1)) {
            return 1;
        } else if (testEqual(el, 2)) {
            return 2;
        }
    }

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (i == j) {
                cross1.push(board[i][j]);
                var j2 = len - j;
                cross2.push(board[i][j2]);
            }
        }
    }

    if (testEqual(cross1, 1)) { return 1; } else if (testEqual(cross1, 2)) { return 2; }
    if (testEqual(cross2, 1)) { return 1; } else if (testEqual(cross2, 2)) { return 2; }


    for (var i = 0; i < len; i++) {
        for (var j = i; j < len; j++) {
            console.log("(i,j) -> " + "(" + i + ', ' + j + ")");
            tem1 = boardT[i][j];
            console.log(" tem1 " + tem1);
            tem2 = boardT[j][i];
            console.log(" tem2 " + tem2);
            boardT[i][j] = tem2;
            boardT[j][i] = tem1;
        }
    }

    for (var i = 0; i < len; i++) {
        var el = boardT[i];
        if (testEqual(el, 1)) {
            return 1;
        } else if (testEqual(el, 2)) {
            return 2;
        }
    }

    var elList = flat(board);
    if (elList.includes(0)) {
        return -1;
    } else {
        return 0;
    }
}

var board = [
    [0, 0, 1],
    [0, 1, 2],
    [2, 1, 0]
];
//Best Practice
function isSolved(board) {
    board = board.join('-').replace(/,/g, '');
    if (/222|2...2...2|2....2....2|2..2..2/.test(board)) return 2;
    if (/111|1...1...1|1....1....1|1..1..1/.test(board)) return 1;
    if (/0/.test(board)) return -1;
    return 0;
}