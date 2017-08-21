// lvie < 2  die
// live > 3  die
// live 2 3 live to next generation
// dead with exactly 3 live neighborhood become live
// (0,0) (0,1) (0,2)
// (1,0) (1,1) (1,2)
// (2,0) (2,1) (2,2)

// https://stackoverflow.com/questions/28762377/javascript-arrays-given-arrayn-get-arraynm
var array2 = array1.reduce(function(prev, curr) {
    return prev.concat(curr.tels.map(function(tel) {
        return { name: curr.name, tel: tel };
    }));
}, []);

var example = [
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0], // 0 0 0 0 0
        [0, 1, 0, 1, 0], // 0 0 0 1 0   
        [0, 0, 1, 1, 0], // 0 1 0 1 0  
        [0, 0, 1, 0, 0], // 0 0 1 1 0  
        [0, 0, 0, 0, 0] // 0 0 0 0 0
    ],
    [
        [0, 0, 0, 0, 0], //0 0 0 0 0 
        [0, 0, 0, 1, 0], //0 0 1 0 0
        [0, 1, 0, 1, 0], //0 0 0 1 1
        [0, 0, 1, 1, 0], //0 0 1 1 0
        [0, 0, 0, 0, 0] //0 0 0 0 0
    ]
];

// 1 0 0
// 0 1 1
// 1 1 0

var gliders = [
    [
        [1, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 0, 1],
        [0, 1, 1]
    ]
];

function getGeneration(cells, generations) {
    if (cells == 0) return [
        []
    ];
    var rows = cells.length;
    var columns = cells[0].length;
    var len = rows > columns ? rows : columns;
    var possbileValue = [...Array(len + 2)].map((u, i) => i);
    var allPoints = possbileValue.reduce(function(prev, curr) {
        return prev.concat(possbileValue.map((u, i) => [curr, u]));
    }, []);
    var pointsValueMap = allPoints.reduce((p, c) => {
        var obj = p;
        obj[c] = cells[c[0] - 1] && cells[c[0] - 1][c[1] - 1] ? cells[c[0] - 1][c[1] - 1] : 0;
        return p;
    }, {});

    console.log("pointsValueMap", pointsValueMap);
    // Given point [x, y], find the neighborhoodPoints 
    var neighborhoodPoints = function(coord) {
        var x = coord[0];
        var y = coord[1];
        return [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1]
        ];
    };

    function mapToArray(map) {
        var singleArray = Object.keys(map).map((key) => map[key]);
        var temp = [];
        var n = len + 2;
        for (var i = 0; i < singleArray.length; i += n) {
            temp.push(singleArray.slice(i, i + n));
        }
        return temp;
    }
    console.log('addedArrays', mapToArray(pointsValueMap));

    function same(arr1, arr2) {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            var arr1Copy = [...arr1];
            var arr2Copy = [...arr2];
            if (arr1Copy.sort().join(',') === arr2Copy.sort().join(',')) {
                return true;
            } else {
                return false;
            }
        } else {
            if (arr1 == arr2) return true;
            else return false;
        }
    }

    function firstNonZero(arr) {
        if (arr[0] == 0) {
            var n = 0;
            while (arr[n] == 0) { n += 1; }
            return n;
        } else { return 0; }
    }
    //[ [ 0, 0, 1, 0, 0 ], [ 0, 0, 0, 1, 1 ], [ 0, 0, 1, 1, 0 ] ]
    function findRepeatTimes(arrs) {
        var copyArrs = arrs.map(function(arr) {
            return arr.slice();
        })
        var temp = [];
        var leftToRight = copyArrs.reduce((pr, cr) => {
            var firstHit1 = firstNonZero(cr);
            // console.log('fisthit1 ' + firstHit1)
            pr = pr < firstHit1 ? pr : firstHit1;
            // console.log('ltr ' + pr);
            return pr;
        }, firstNonZero(copyArrs[0]))
        console.log(leftToRight);
        temp.push(leftToRight);
        var rightToLeft = copyArrs.reduce((pr, cr) => {
            var firstHit2 = firstNonZero(cr.reverse());
            // console.log('firsthit2 ' + firstHit2)
            pr = pr < firstHit2 ? pr : firstHit2;
            // console.log('rtl ' + pr)
            return pr;
        }, firstNonZero(copyArrs[0].reverse()))
        console.log(rightToLeft);
        temp.push(rightToLeft);
        return temp;
    }
    //var za  =[[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 1, 2, 3, 0, 0], [0, 5, 4, 1, 2, 3, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]]
    // var arr = [[0, 0, 0], [1, 2, 3], [0, 1, 0], [0, 0, 1], [0, 0, 0], [0, 0, 0]]
    //for [1, 2, 3], [0, 1, 0], [0, 0, 1] need to think about the edge first befor croping
    function croppedArray(arrs) {
        console.log('len' + len);
        console.log('arrs', arrs)
        var n = len + 2;
        var deadArray = Array(n).fill(0);
        while (same(deadArray, arrs[0])) {
            console.log(same(deadArray, arrs[0]));
            arrs.shift();
        }
        while (same(deadArray, arrs[arrs.length - 1])) {
            console.log(same(deadArray, arrs[arrs.length - 1]));
            arrs.pop();
        }
        if (arrs == 0) return [
            []
        ];
        var repeatTimesArr = findRepeatTimes(arrs);
        console.log("arr", repeatTimesArr);
        console.log("before", arrs);
        arrs.map((u, i) => {
            for (var j = 0; j < repeatTimesArr[0]; j++) { u.shift(); }
            for (var j = 0; j < repeatTimesArr[1]; j++) { u.pop(); }
        });
        console.log("after", arrs);
    }
    var valueNow = function(coord, fixmap, mutablemap) {
        var neighborhoodCells = neighborhoodPoints(coord);
        var it = fixmap[coord];
        console.log('it ' + it);
        console.log('coord', coord);
        var liveCells = neighborhoodCells.reduce((pr, cr) => {
            if (fixmap[cr] == 1) {
                pr += 1;
            }
            return pr;
        }, 0);
        console.log('liveCells ' + liveCells);
        if (it == 1) {
            if (liveCells < 2 || liveCells > 3) {
                mutablemap[coord] = 0;
            }
        } else if (it == 0) {
            if (liveCells == 3) {
                mutablemap[coord] = 1;
            }
        }
        // console.log('mutable', mutablemap);
    };

    var edgedCells = mapToArray(pointsValueMap);
    var CopyPointsValueMap = Object.assign({}, pointsValueMap);
    console.log('edgedCells', edgedCells);
    console.log('CopyPointsValueMap', CopyPointsValueMap);

    function evolve(CopyPointsValueMap) {
        var mutableMap = Object.assign({}, CopyPointsValueMap);
        console.log('allPoints ', allPoints);
        allPoints.reduce(function(pre, curr) {
            valueNow(curr, CopyPointsValueMap, mutableMap);
        }, 0);
        allPoints.map((v, i) => { edgedCells[v[0]][v[1]] = mutableMap[v]; });
        console.log('edgedCellsFinal', edgedCells)
        croppedArray(edgedCells);
    }

    if (generations == 1) {
        evolve(CopyPointsValueMap);
        return edgedCells;
    } else if (generations == 0) {
        return cells;
    } else {
        evolve(CopyPointsValueMap);
        console.log('inCursive ', edgedCells);
        return getGeneration(edgedCells, generations - 1);
    }
}

//  var resp = getGeneration(gliders[0],1);



//best practice
function getGeneration(cells, generations) {

    var ce = JSON.parse(JSON.stringify(cells));
    console.log('ce', ce);
    var minY;
    var maxY;
    var minX;
    var maxX;

    for (var i = 1; i <= generations; i++) {
        expandUniverse();

        ce = ce.map(function(r, row) { return r.map(function(c, col) { return setValue(row, col, -c); }); });

        getBoundaries();
        shrinkUniverse();
    }

    function setValue(row, col, sum) {
        for (var r = row - 1; r <= row + 1; r++)
            for (var c = col - 1; c <= col + 1; c++)
                sum += (ce[r] && ce[r][c]) | 0;
        console.log('sum' + sum);

        return +(sum == 3 || sum == 2 && ce[row][col]);
    }

    //   > +0           0
    //   > +true        1
    //   > true && 1    1
    //   > false && 1   false
    //   > +false       0

    function getBoundaries() {
        minY = maxY = minX = maxX = -1;

        ce.forEach(function(r, row) {
            r.forEach(function(c, col) {
                if (c == 1) {
                    minY = minY == -1 ? row : Math.min(minY, row);
                    maxY = maxY == -1 ? row : Math.max(maxY, row);
                    minX = minX == -1 ? col : Math.min(minX, col);
                    maxX = maxX == -1 ? col : Math.max(maxX, col);
                }
            });
        });
    }

    function expandUniverse() {
        var a = [],
            b = [];

        ce[0].forEach(function() { a.push(0);
            b.push(0); });
        console.log('a', a, ' b ', b, ' ce ', ce);
        ce.unshift(a);
        console.log('ce-unshift ', ce);
        ce.push(b);
        console.log('ce-push', ce);
        ce.map(function(i) { i.unshift(0);
            i.push(0); });
        console.log('ce-map ', ce);
    }

    function shrinkUniverse() {
        ce = ce.map(function(e) { return e.slice(minX, maxX + 1); });
        console.log('ce-shrink1 ', ce);
        ce = ce.slice(minY, maxY + 1);
        console.log('ce-shrink2 ', ce);
    }

    return ce;
}