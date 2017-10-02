/*
points = [[1, 1], [3, 1], [3, 2], [3, 3],
    [1, 3], [2, 5], [1, 5], [-1, -1],
    [-1, -2], [-2, -3], [-4, -4]]

for tese should be 6
*/

function findCCW(i, c, ccw, arr) {
    var count = 1;
    // console.log('range from ' + c + ' range to ' + ccw);
    for (var j = i + 1; j != i && j != arr.length;) {
        var tangValue = arr[j][1]/arr[j][0];
        var x = arr[j][0] * arr[i][0];
        var y = arr[j][1] * arr[i][1];
        if ((0 <= c <= 1 &&  x>= 0 ) || (c <= -1 &&  y>= 0)) {
            if (c <= tangValue && tangValue <= ccw) {
                // console.log('find point:', arr[j]);
                count++;
            }else {
                break;
            }
        } else if ((c > 1 && y >= 0) || (-1 <= c <= 0 && x >= 0)) {
            if (ccw >= tangValue || tangValue >= c) {
                // console.log('find point:', arr[j]);
                count++;
            } else {
                break;
            }
        }

        if (j < arr.length - 1) {
            j++;
        } else {
            j = 0;
        }
    }
    return count;
}

function findCW(i, a, b, arr) {
    var count = 1;
    // console.log('range from ' + a + ' range to ' + b);
    for (var j = i - 1; j != i && j >=0;) {
        var tangValue = arr[j][1]/arr[j][0];
        var x = arr[j][0] * arr[i][0];
        var y = arr[j][1] * arr[i][1];
        if ((0 <= a <= 1 &&  x>= 0 ) || (a <= -1 &&  y>= 0)) {
            if (a <= tangValue && tangValue <= b) {
                // console.log('find point:', arr[j]);
                count++;
            }else {
                break;
            }
        } else if ((a > 1 && y >= 0) || (-1 <= a <= 0 && x >= 0)) {
            if (b >= tangValue || tangValue >= a) {
                // console.log('find point:', arr[j]);
                count++;
            } else {
                break;
            }
        }

        if (j > 0 ) {
            j--;
        } else {
            j = arr.length-1;
        }
    }
    return count;
}
function visiblePoints(points) {
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    for (var i = 0; i < points.length; i++) {
        var x = points[i][0];
        var y = points[i][1];
        if (x >= 0 && y >= 0) {
            arr1.push(points[i]);
        } else if (x <= 0 && y >= 0) {
            arr2.push(points[i]);
        } else if (x <= 0 && y <= 0) {
            arr3.push(points[i]);
        } else {
            arr4.push(points[i]);
        }
    }

    var sortFun = function (a, b) {
        var v1 = a[1] / a[0];
        var v2 = b[1] / b[0];

        if (a[0] == 0) {
            v1 = Math.tan(Math.PI / 2);
        }
        if (b[0] == 0) {
            v2 = Math.tan(Math.PI / 2);
        }
        return v1 - v2;
    };

    arr1.sort(sortFun);
    arr2.sort(sortFun);
    arr3.sort(sortFun);
    arr4.sort(sortFun);

    var arr = arr1.concat(arr2).concat(arr3).concat(arr4);
    console.log('arr ', arr);
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        var current = arr[i];
        var currentTang = getPreciseValue(current[1] / current[0]);
        if (current[0] == 0) {
            currentTang = Math.tan(Math.PI / 2);
        }
        var rccw = getPreciseValue(Math.tan(Math.atan(currentTang) + Math.PI / 4));
        var rcw = getPreciseValue(Math.tan(Math.atan(currentTang) - Math.PI / 4));
        var count = findCCW(i, currentTang, rccw, arr);
        if (count > result) {
            result = count;
            // console.log('result ' + result);
        }

        var count = findCW(i, rcw, currentTang, arr);
        if (count > result) {
            result = count;
            // console.log('result ' + result);
        }
    }
    return result;
}

function getPreciseValue(rawX) {
    roundedX = Math.round(100000000*rawX)/100000000;
    resultStr = roundedX.toFixed(8);
    return resultStr;
}

