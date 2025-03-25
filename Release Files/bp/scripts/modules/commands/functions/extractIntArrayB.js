export function extractIntArrayB(s, revivement = "-1") {
    s = s
        .replaceAll(/,(?=[,\]\^])/g, "," + revivement)
        .replace(/\[(?=[,\^])/, "[" + revivement);
    s = s.slice(0, -1) + "," + "]";
    Array.from(s.matchAll(/([\-\+]?[a-zA-Z0-9]+)\^([a-zA-Z0-9]+),/g)).forEach((v) => (s = s.replace(v[0], (v[1] + ",").repeat(Number(v[2])))));
    s = s.slice(0, -2) + "]";
    return s;
}
//# sourceMappingURL=extractIntArrayB.js.map