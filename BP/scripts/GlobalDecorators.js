function loggedMethod(originalMethod, propertyKey, descriptor) {
    const methodName = originalMethod?.name;
    if (!!descriptor.value) {
        console.log(1);
        const originalValue = descriptor.value;
        descriptor.value = function replacementMethod(...args) {
            console.log(`LOG: Entering method ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            const result = originalValue.call(this, ...args);
            console.log(`LOG: Exiting method ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            return result;
        };
    }
    if (!!descriptor.get) {
        console.log(2);
        const originalGet = descriptor.get;
        descriptor.get = function replacementMethod(...args) {
            console.log(`LOG: Entering getter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            const result = originalGet.call(this, ...args);
            console.log(`LOG: Exiting getter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            return result;
        };
    }
    if (!!descriptor.set) {
        console.log(3);
        const originalSet = descriptor.set;
        descriptor.set = function replacementMethod(...args) {
            console.log(`LOG: Entering setter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            const result = originalSet.call(this, ...args);
            console.log(`LOG: Exiting setter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            return result;
        };
    } /*
    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}: Exiting method '${methodName}'.`)
        return result;
    }
    return replacementMethod as typeof originalMethod;*/
}
globalThis.loggedMethod = loggedMethod;
function log(value, propertyKey) {
    console.log(`LOG ${!!propertyKey ? `<${propertyKey}>` : ""}: ${JSONB.stringify(value, undefined, 0, { bigint: true, function: true, get: true, set: true, Infinity: true, NaN: true, NegativeInfinity: true, undefined: true })}`);
}
globalThis.log = log;
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.configurable = value;
    };
}
globalThis.configurable = configurable;
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
globalThis.enumerable = enumerable;
function writable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.writable = value;
    };
}
globalThis.writable = writable;
//# sourceMappingURL=GlobalDecorators.js.map