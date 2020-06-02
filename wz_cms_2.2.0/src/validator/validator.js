

export function isGoodBoy(rule, value, callback) {
    if (isNaN(value)) {
        callback(new Error('Not a good boy'));
    }
    else if (value.length > 10) {
        callback(new Error('Have a toast'));
    }
    callback();
}