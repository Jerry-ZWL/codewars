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
    var len = cells.length;
    var possbileValue = [...Array(len)].map((u, i) => i);
    var allPoints = possbileValue.reduce(function(prev, curr) {
        return prev.concat(possbileValue.map((u, i) => [curr, u]));
    }, []);
    var pointsValueMap = allPoints.reduce((p, c) => {
        var obj = p;
        obj[c] = cells[c[0]][c[1]];
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
   
    // var mutableMap = Object.assign({}, pointsValueMap)
    var CopyCells = cells.map(function(arr) {
        return  arr.slice();
    })
    var CopyPointsValueMap = Object.assign({}, pointsValueMap); 
    console.log('cells', cells);
    console.log('CopyCells', CopyCells);
    console.log('CopyPointsValueMap', CopyPointsValueMap);
    function evolve (CopyPointsValueMap){
        var mutableMap = Object.assign({}, CopyPointsValueMap);
        console.log('allPoints ', allPoints);
        allPoints.reduce(function(pre, curr) {
            valueNow(curr, CopyPointsValueMap, mutableMap);
        }, 0);
        allPoints.map((v, i) => { CopyCells[v[0]][v[1]] = mutableMap[v]; });
    }

    if (generations == 1) {
       evolve(CopyPointsValueMap);
       return CopyCells;
    } else if (generations == 0){
        return cells;
    }
    else{
        evolve(CopyPointsValueMap);
        console.log('inCursive ',  CopyCells);
        return getGeneration (CopyCells, generations -1);
    }
}

//  var resp = getGeneration(gliders[0],1);