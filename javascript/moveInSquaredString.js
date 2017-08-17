function rot(strng) {
    return strng.split('').reverse().join('');
}

function reduceMake(arr, noRot) {
    if (noRot) {
        return arr.reduce((p, c) => p + c + '.'.repeat(c.length) + '\n', "");
    } else {
        return arr.reduce((p, c) => p + '.'.repeat(c.length) + c + '\n', "");
    }
}

function selfieAndRot(strng) {
    var strngArr = strng.split('\n');
    var rotStrngArr = rot(strng).split('\n');
    console.log("strngArr ", strngArr);
    console.log(" rotStrn ", rotStrngArr);
    var wholeStr = reduceMake(strngArr, true) + reduceMake(rotStrngArr, false);
    return wholeStr.trim();
}

function oper(fct, s) {
    return fct(s);
}


//best practice
function rot(s) {
    return s.split("").reverse().join("");
}

function selfieAndRot(s) {
    return (s = s.replace(/.+/g, t => t + t.replace(/./g, "."))) + "\n" + rot(s);
}

function oper(fn, s) {
    return fn(s);
}