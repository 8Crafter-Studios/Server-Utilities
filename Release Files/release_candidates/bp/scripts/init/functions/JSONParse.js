import "init/meta/importToMakeValidModule";
globalThis.JSONParse = function JSONParse(JSONString, keepUndefined = true) {
    let g = [];
    let h = [];
    if (JSONString == undefined) {
        let nothing;
        return nothing;
    }
    if (JSONString == "undefined") {
        return undefined;
    }
    if (JSONString == "Infinity") {
        return Infinity;
    }
    if (JSONString == "-Infinity") {
        return -Infinity;
    }
    if (JSONString == "NaN") {
        return NaN;
    }
    if (JSONString == "null") {
        return null;
    }
    if (JSONString.match(/^\-?\d+n$/g)) {
        return BigInt(JSONString.slice(0, -1));
    }
    let a = JSON.parse(JSONString.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"')
        .replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"')
        .replace(/(?<=(?:[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\[)[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*),(?:\s*)|[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*)\[(?:\s*)))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,\]](?:\s*))/g, '"{{$1}}"')
        .replace(/^(Infinity|NaN|-Infinity|undefined|\-?\d+n)$/g, '"{{$1}}"'), function (k, v) {
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
        else if (tryget(() => v.match(/^{{\-?\d+n}}$/g)) ?? false)
            return BigInt(v.slice(2, -3));
        h.push(k);
        return v;
    });
    function recursiveFind(a) {
        if (a instanceof Array) {
            let b = a;
            b.forEach((v, i) => {
                if (v instanceof Array || v instanceof Object) {
                    b[i] = recursiveFind(v);
                    return;
                }
                if (String(v) == "{{undefined}}") {
                    b[i] = undefined;
                    return;
                }
            });
            a = b;
            {
                let b = a;
                b.forEach((va, i) => {
                    if (String(va).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                        b[Number(i)] = va.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, "{{$1}}");
                    }
                    a = b;
                });
            }
        }
        else if (a instanceof Object) {
            let b = Object.entries(a);
            b.forEach((v, i) => {
                if (v[1] instanceof Object || v[1] instanceof Array) {
                    b[i] = [v[0], recursiveFind(v[1])];
                    return;
                }
                if (String(v[1]) == "{{undefined}}") {
                    b[i] = [v[0], undefined];
                    return;
                }
            });
            a = Object.fromEntries(b);
            {
                let b = Object.entries(a);
                b.filter((b) => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)).forEach((v, i) => {
                    b[b.findIndex((b) => b[0] == v[0])] = [
                        v[0],
                        v[1].replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, "{{$1}}"),
                    ];
                    a = Object.fromEntries(b);
                });
            }
        }
        else if (typeof a === "string") {
            if (a == "{{undefined}}") {
                a = undefined;
            }
            else {
                if (a.match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                    a = a.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, "{{$1}}");
                }
            }
        }
        return a;
    }
    a = recursiveFind(a);
    return a;
};
//# sourceMappingURL=JSONParse.js.map