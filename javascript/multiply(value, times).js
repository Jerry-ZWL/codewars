function multiply(value, times) {
    if (typeof value === 'number') {
        console.log('number');
        return value * times;
    }
    if (typeof value === "string") {
        console.log('string');
        if (typeof times == 'number' && Number.isInteger(times)) {
            return value.repeat(times);
        } else {
            throw new Error('who');
        }
    }
    if (typeof value === 'function') {
        console.log('value', value, 'time', times);
        return function() {
            var counter = 0;
            while (counter < times) {
                value.apply(this, Array.prototype.slice.call(arguments, 0));
                counter++;
            }
        };
    }
    if (typeof value === 'object' && value !== null && value != undefined) {
        console.log('object');
        return Array.from(Array(times), () => value);
    }
    return value;
}



var i = 0;
var fn = multiply(function(a, b) {
    if (this.is_context && (a === 1) && (b === "2")) {
        console.log(i);
        i++;
    }
}, 3);
fn.call({ is_context: true }, 1, "2");