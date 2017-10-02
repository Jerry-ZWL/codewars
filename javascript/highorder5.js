function countLanguages(list) {
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
    return result;
}