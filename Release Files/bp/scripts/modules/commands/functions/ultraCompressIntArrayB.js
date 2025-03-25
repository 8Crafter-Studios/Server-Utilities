export function ultraCompressIntArrayB(s, replacement = "-1") {
    Array.from(s.matchAll(/([\-\+]?[a-zA-Z0-9]+)([\s\n]*,[\s\n]*\1){2,}/g)).forEach((v) => (s = s.replace(v[0], v[1] +
        "^" +
        ((v[0].length + 1) / (v[1].length + 1)).toString(36))));
    s = s.replaceAll(replacement, "");
    return s;
}
//# sourceMappingURL=ultraCompressIntArrayB.js.map