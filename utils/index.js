export function pick(object, properties) {
    const result = {};
    for (const prop of properties) {
        result[prop] = object[prop];
    }
    return result;
}

export function pickAllExcept(object, properties) {
    const result = {};
    for (const prop in object) {
        if (!properties.includes(prop)) {
            result[prop] = object[prop];
        }
    }
    return result;
}