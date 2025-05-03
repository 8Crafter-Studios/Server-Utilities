export function splitTextByMaxProperyLength(string) { let length = string.length / 32767; let substringlist; substringlist = []; for (let i = 0; i < Math.ceil(length); i++) {
    substringlist.push(string.slice((i - 1) * 32767, i == Math.ceil(length) ? string.length : i * 32767));
} ; return substringlist; }
;
//# sourceMappingURL=splitTextByMaxProperyLength.js.map