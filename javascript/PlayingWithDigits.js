function digPow(n, p) {
    nStr = n.toString();
    len = nStr.length;
    powSum = 0;
    for (var i = 0; i < len; i++) {
        powSum += Math.pow(nStr[i], p + i);
    }
    if (powSum % n == 0) {
        return powSum / n;
    } else {
        return -1;
    }
}


//best practice
function digPow(n, p) {
    var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0);
    // s previous d current i index
    return x % n ? -1 : x / n;
}
//most clever
function digPow(n, p) {
    var ans = ('' + n).split('')
        .map(function(d, i) { return Math.pow(+d, i + p); })
        .reduce(function(s, v) { return s + v }) / n;
    return ans % 1 ? -1 : ans
} //z.