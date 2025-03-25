function loggedMethod(originalMethod, propertyKey, descriptor) {
    const methodName = originalMethod?.name;
    if (!!descriptor.value) {
        const originalValue = descriptor.value;
        descriptor.value = function replacementMethod(...args) {
            console.log(`LOG: Entering method ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            const result = originalValue.call(this, ...args);
            console.log(`LOG: Exiting method ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}. Value type is ${typeof result == "object" ? result?.constructor?.name ?? "null" : typeof result}. ${tryget(() => "Value is " +
                JSONB.stringify(result, undefined, 0, {
                    bigint: true,
                    function: true,
                    get: true,
                    set: true,
                    Infinity: true,
                    NaN: true,
                    NegativeInfinity: true,
                    undefined: true,
                })) ?? "Unable to get the returned value"}.`);
            return result;
        };
    }
    if (!!descriptor.get) {
        const originalGet = descriptor.get;
        descriptor.get = function replacementMethod(...args) {
            console.log(`LOG: Entering getter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}.`);
            const result = originalGet.call(this, ...args);
            console.log(`LOG: Exiting getter ${!!methodName ? ` <(${methodName})${!!propertyKey ? ` ${propertyKey}` : ""}>` : !!propertyKey ? ` <${propertyKey}>` : ""}. Value type is ${typeof result == "object" ? result?.constructor?.name ?? "null" : typeof result}. ${tryget(() => "Value is " +
                JSONB.stringify(result, undefined, 0, {
                    bigint: true,
                    function: true,
                    get: true,
                    set: true,
                    Infinity: true,
                    NaN: true,
                    NegativeInfinity: true,
                    undefined: true,
                })) ?? "Unable to get the returned value"}.`);
            return result;
        };
    }
    if (!!descriptor.set) {
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
    console.log(`LOG ${!!propertyKey ? `<${propertyKey}>` : ""}: ${JSONB.stringify(value, undefined, 0, {
        bigint: true,
        function: true,
        get: true,
        set: true,
        Infinity: true,
        NaN: true,
        NegativeInfinity: true,
        undefined: true,
    })}`);
}
globalThis.log = log;
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        if (descriptor != undefined) {
            descriptor.configurable = value;
        }
        else {
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                configurable: value,
            });
        }
    };
}
globalThis.configurable = configurable;
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        if (descriptor != undefined) {
            descriptor.enumerable = value;
        }
        else {
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                enumerable: value,
            });
        }
    };
}
globalThis.enumerable = enumerable;
function writable(value) {
    return function (target, propertyKey, descriptor) {
        if (descriptor != undefined) {
            descriptor.writable = value;
        }
        else {
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                writable: value,
            });
        }
    };
}
globalThis.writable = writable;
const readonlifyMap = new Map();
// CLASS DECORATOR
function readonlify(constructor) {
    const c = class extends constructor {
        constructor(...args) {
            super(...args);
            if (new.target === c)
                readonlifyMap.set(this, true);
        }
    };
    return c;
}
globalThis.readonlify = readonlify;
// PROPERTY DECORATOR
function readonly(target, key, propertyDescriptor) {
    let z = undefined;
    Object.defineProperty(target, key, {
        get() {
            return z;
        },
        set(value) {
            console.log("Set ", value);
            if (readonlifyMap.get(this))
                throw new Error();
            z = value;
        },
    });
}
globalThis.readonly = readonly;
// PROPERTY DECORATOR
function propToGetter(target, key, propertyDescriptor) {
    let z = undefined;
    Object.defineProperty(target, key, {
        get() {
            return Object.getOwnPropertyDescriptor(target, key).value;
        },
    });
}
Object.defineProperty(globalThis, "propToGetter", { value: propToGetter, writable: false, enumerable: false, configurable: false });
//# sourceMappingURL=GlobalDecorators.js.map