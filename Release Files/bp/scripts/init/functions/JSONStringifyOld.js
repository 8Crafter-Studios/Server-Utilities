import "init/meta/importToMakeValidModule";
/**
 * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values.
 * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false.
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns {any} The JSON string.
 */
globalThis.JSONStringifyOld = function JSONStringifyOld(value, keepUndefined = false, space) {
    return JSON.stringify(value, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space)
        .replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, "$1")
        .replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
};
//# sourceMappingURL=JSONStringifyOld.js.map