import "init/meta/importToMakeValidModule";
globalThis.colorizeJSONString = function colorizeJSONString(json, options) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|,|-?Infinity|NaN|undefined|\b(true|false|null)\b|\{|\}|\[|\]|-?\d+n|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = options?.number ?? "§6";
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = options?.key ?? "§e";
            }
            else {
                cls = options?.string ?? "§q";
            }
        }
        else if (/true/.test(match)) {
            cls = options?.true ?? "§a";
        }
        else if (/false/.test(match)) {
            cls = options?.false ?? "§c";
        }
        else if (/null/.test(match)) {
            cls = options?.null ?? "§d";
        }
        else if (/-?\d+n/.test(match)) {
            cls = options?.bigint ?? "§g";
        }
        else if (/\{/.test(match)) {
            cls = options?.leftCurlyBracket ?? "§9";
        }
        else if (/\}/.test(match)) {
            cls = options?.rightCurlyBracket ?? "§9";
        }
        else if (/\[/.test(match)) {
            cls = options?.leftSquareBracket ?? "§5";
        }
        else if (/\]/.test(match)) {
            cls = options?.rightSquareBracket ?? "§5";
        }
        else if (/,/.test(match)) {
            cls = options?.comma ?? "§f";
        }
        else if (/undefined/.test(match)) {
            cls = options?.undefined ?? "§d";
        }
        return cls + match;
    });
};
//# sourceMappingURL=colorizeJSONString.js.map