function isSameLanguage(list) {
    var same;
    var result = list.reduce(
        (pre, cur) => {
            var key = cur["language"];
            console.log('key', key, 'pre', pre);
            if (pre[key] === undefined) {
                pre[key] = 1;
            } else {
                pre[key] += 1;
            }
            return pre;
        }, {});
    console.log('result', result);
    if (Object.keys(result).length === 1) {
        return true;
    } else {
        return false;
    }
}