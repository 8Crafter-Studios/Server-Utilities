export function strToFlt(string, radix = 10) {
    return Number(string
        .split(".")
        .map((v) => String(Number.parseInt(v, radix)))
        .join("."));
}
//# sourceMappingURL=strToFlt.js.map