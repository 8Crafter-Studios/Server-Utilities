/**
 * Colorizes a JSON string or object.
 *
 * @param {string | object | number | boolean} json The JSON string or object to colorize.
 * @param {object} [options] The options for colorizing the JSON string.
 * @param {string} [options.number="§6"] The color to use for numbers.
 * @param {string} [options.key="§e"] The color to use for keys.
 * @param {string} [options.string="§q"] The color to use for strings.
 * @param {string} [options.true="§a"] The color to use for true.
 * @param {string} [options.false="§c"] The color to use for false.
 * @param {string} [options.null="§d"] The color to use for null.
 * @param {string} [options.undefined="§d"] The color to use for undefined.
 * @param {string} [options.bigint="§g"] The color to use for bigints.
 * @param {string} [options.leftCurlyBracket="§9"] The color to use for left curly brackets.
 * @param {string} [options.rightCurlyBracket="§9"] The color to use for right curly brackets.
 * @param {string} [options.leftSquareBracket="§5"] The color to use for left square brackets.
 * @param {string} [options.rightSquareBracket="§5"] The color to use for right square brackets.
 * @param {string} [options.comma="§f"] The color to use for commas.
 * @returns {string} The colorized JSON string.
 * @throws {any} If an error occurs while running {@link JSON.stringify}. Only applies the the `json` parameter is not a string.
 *
 * @default
 * enum options = {
 *     number = "§6",
 *     key = "§e",
 *     string = "§q",
 *     true = "§a",
 *     false = "§c",
 *     null = "§d",
 *     undefined = "§d"
 *     bigint = "§g",
 *     leftCurlyBracket = "§9",
 *     rightCurlyBracket = "§9",
 *     leftSquareBracket = "§5",
 *     rightSquareBracket = "§5",
 *     comma = "§f",
 * }
 */
export function colorizeJSONString(json, options) {
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
}
Object.defineProperty(globalThis, 'colorizeJSONString', {
    value: colorizeJSONString,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=colorizeJSONString.js.map