export function fltToStr(float, radix = 10) {
    return String(float)
        .split(".")
        .map((v) => Number(v).toString(radix))
        .join(".");
}
//# sourceMappingURL=fltToStr.js.map