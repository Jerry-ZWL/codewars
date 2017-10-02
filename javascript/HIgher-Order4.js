function getFirstPython(list) {
    var result = list.reduce(
        (pre, cur) => {
            if (cur.language === 'Python') {
                if (pre === '') {
                    pre = cur.firstName + ', ' + cur.country;
                    return pre;
                } else {
                    return pre;
                }

            } else {
                return pre;
            }
        }, '');
    return result === '' ? 'There will be no Python developers' : result;
}