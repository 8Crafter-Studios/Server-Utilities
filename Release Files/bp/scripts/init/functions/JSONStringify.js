import "init/meta/importToMakeValidModule";
globalThis.JSONStringify = function JSONStringify(JSONObject, keepUndefined = false, space) {
    if (JSONObject == undefined) {
        return keepUndefined ? "undefined" : "";
    }
    return JSON.stringify(JSONObject, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        else if (typeof v === "function")
            return { $function: v.toString() };
        else if (typeof v === "bigint")
            return "{{" + v.toString() + "n}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space)
        .replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, "$1")
        .replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
};
//# sourceMappingURL=JSONStringify.js.map