function powerSumDigTerm(n) {
    function DigitSum(value) {
        value += '';
        var result = 0;
        for (var i = 0; i < value.length; i++) {
            result += parseInt(value[i]);
        }
        return result;
    }

    function sortNumber(a, b) {
        return a - b;
    }
    var result = [];
    for (var b = 2; b < 400; b++) {
        var value = b;
        for (var e = 2; e < 50; e++) {
            value *= b;
            if (DigitSum(value) == b) {
                result.push(value);
            }
            if (result.length > 50) break;
        }
        if (result.length > 50) break;
    }
    console.log(result);
    console.log(result.sort(sortNumber));
    return result.sort(sortNumber)[n - 1];
}