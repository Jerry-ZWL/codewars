function getAverageAge(list) {
    var agesArray = list.reduce(
        (pre, cur) => {
            var age = cur["age"];
            pre = pre.concat(age);
            return pre;
        }, []);

    console.log('ageArray', agesArray);
    var sum = agesArray.reduce(
        (pre, cur) => { return pre += cur; });
    console.log('sum', sum);

    return Math.round(sum / agesArray.length);
}