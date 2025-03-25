export function parseJSONifiedNBTData(nbt) {
    function parseObject(object) {
        switch (object.type) {
            case "compound":
                return Object.fromEntries(Object.entries(object.value).map((t) => [
                    t[0],
                    parseObject(t[1]),
                ]));
                break;
            case "list":
                return object.value instanceof Array
                    ? object.value.map((v) => parseList(v))
                    : parseList(object.value);
                break;
            case "int":
                return object.value;
                break;
            case "string":
                return object.value;
                break;
            case "byte":
                return Boolean(object.value);
                break;
            case "end":
                return object.value;
                break;
            default:
                return object;
        }
    }
    function parseList(object) {
        switch (object.type) {
            case "compound":
                return object.value.map((t) => Object.fromEntries(Object.entries(t).map((t) => [t[0], parseObject(t[1])])));
                break;
            case "list":
                return object.value.map((t) => parseList(t));
                break;
            case "int":
                return object.value;
                break;
            case "string":
                return object.value;
                break;
            case "byte":
                return Boolean(object.value);
                break;
            case "end":
                return object.value;
                break;
            default:
                let a = undefined;
                try {
                    a = object.map((t) => parseList(t));
                }
                catch {
                    a = object;
                }
                return a;
        }
    }
    return parseObject(nbt);
}
//# sourceMappingURL=parseJSONifiedNBTData.js.map