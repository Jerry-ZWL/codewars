function isRubyComing(list) {
    var result = list.reduce(
        (pre, cur) => {
            if (cur.language === 'Ruby') {
                return pre += 1;
            } else {
                return pre;
            }
        }, 0);
    return result === 0 ? false : true;
}