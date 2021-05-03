function pick(object, properties) {
    const result = {};
    for (const prop of properties) {
        if (object[prop] != undefined) {
            result[prop] = object[prop];
        }
    }
    return result;
}

function pickAllExcept(object, properties) {
    const result = {};
    for (const prop in object) {
        if (!properties.includes(prop)) {
            result[prop] = object[prop];
        }
    }
    return result;
}

module.exports = { pick, pickAllExcept };