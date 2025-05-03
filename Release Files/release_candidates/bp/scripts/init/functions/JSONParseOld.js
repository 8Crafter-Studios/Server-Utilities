import "init/meta/importToMakeValidModule";
/**
 * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values.
 * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true.
 * @returns {any} The parsed JSON data.
 */
globalThis.JSONParseOld = function JSONParseOld(text, keepUndefined = true) {
    let g = [];
    let h = [];
    let a = JSON.parse(text
        .replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"')
        .replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"'), function (k, v) {
        if (v === "{{Infinity}}")
            return Infinity;
        else if (v === "{{-Infinity}}")
            return -Infinity;
        else if (v === "{{NaN}}")
            return NaN;
        else if (v === "{{undefined}}") {
            g.push(k);
            if (keepUndefined) {
                return v;
            }
            else {
                undefined;
            }
        }
        h.push(k);
        return v;
    });
    g.forEach((v, i) => {
        let b = Object.entries(a);
        b[b.findIndex((b) => b[0] == v)] = [v, undefined];
        a = Object.fromEntries(b);
    });
    {
        let b = Object.entries(a);
        b.filter((b) => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined)}}"}}$/)).forEach((v, i) => {
            console.log(v, i);
            b[b.findIndex((b) => b[0] == v[0])] = [
                v[0],
                String(v[1]).replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined)(?:}}"}})$/g, "{{$1}}"),
            ];
            a = Object.fromEntries(b);
        });
    }
    return a;
};
//# sourceMappingURL=JSONParseOld.js.map