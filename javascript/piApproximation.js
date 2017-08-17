function iterPi(epsilon) {
    +
    var totalSum = 0.0;
    var pi = Math.PI;
    var err = epsilon + 1.0;
    var i = 0;
    var approxPi;
    while (err > epsilon) {
        var term = Math.pow(-1.0, (i * 1.0)) * (1 / ((2.0 * i) + 1.0));
        totalSum += term;
        approxPi = 4.0 * totalSum;
        i += 1;
        err = Math.abs(pi - approxPi);
    }
    return [i, Number(approxPi.toFixed(10))];
}