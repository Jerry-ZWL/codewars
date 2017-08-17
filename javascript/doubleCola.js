function whoIsNext(names, r) {
    if (r <= 5) {
        return names[r - 1];
    } else {
        var n = Math.floor((r - names.length + 1) / 2);
        return whoIsNext(names, n);
    }
}

//Function, Object, Array, Number, String,boolean,Null