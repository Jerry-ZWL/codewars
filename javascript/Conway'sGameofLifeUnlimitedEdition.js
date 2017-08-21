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
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
    ]
];



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

    function same(arr1, arr2) {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            if (arr1.sort().join(',') === arr2.sort().join(',')) {
                return true;
            } else {
                return false;
            }
        } else {
            if (arr1 == arr2) return true;
            else return false;
        }
    }
    function firstNonZero (arr){ 
        var n = 0;
        var i = 0;
        while(arr[i] == 0){ n +=1;i +=1;}
        return n;}

    function findRepeatTimes(arrs) {
        var temp = [];
        var leftToRight = arrs.reduce((pr, cr) => {var firstHit = firstNonZero(cr);
                                                    pr = pr < firstHit ? pr : firstHit;
                                                    return pr;})
        temp.push(leftToRight);
        var leftToRight = arrs.reduce((pr, cr) => {var firstHit = firstNonZero(cr.reverse());
            pr = pr < firstHit ? pr : firstHit;
            return pr;})
        temp.push(rightToLeft);
        return temp;
    }
    //var za  =[[0, 0, 0, 1, 2, 3, 0, 0], [0, 5, 4, 1, 2, 3, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0]]
    // var arr = [[0, 0, 0], [1, 2, 3], [0, 1, 0], [0, 0, 1], [0, 0, 0], [0, 0, 0]]
    //for [1, 2, 3], [0, 1, 0], [0, 0, 1] need to think about the edge first befor croping
    function croppedArray(arr) {
        var deadArray = Array(len + 2).fill(0);
        var i = 0;
        var n = len + 2;
        while (same(deadArray, arr[0])) {
            arr.shift();
        }
        while (same(deadArray, arr[arr.length - 1])) {
            arr.pop();
        }
        arr.map((u, i) => {
            while (same(0, u[0])) {
                u.shift();
            }
            while (same(0, u[u.length - 1])) {
                u.pop();
            }
        });
    }



    var valueNow = function(coord, fixmap, mutablemap) {
        var neighborhoodCells = neighborhoodPoints(coord);
        var it = fixmap[coord];
        console.log('it' + it);
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
    };

    var edgedCells = mapToArray(pointsValueMap);

    // var mutableMap = Object.assign({}, pointsValueMap)
    var CopyCells = cells.map(function(arr) {
        return arr.slice();
    })
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
    }

    if (generations == 1) {
        evolve(CopyPointsValueMap);
        return CopyCells;
    } else if (generations == 0) {
        return cells;
    } else {
        evolve(CopyPointsValueMap);
        console.log('inCursive ', CopyCells);
        return getGeneration(CopyCells, generations - 1);
    }
}

//  var resp = getGeneration(gliders[0],1);