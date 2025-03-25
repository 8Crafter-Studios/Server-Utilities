const numberFormatter_compact_map = [
    { suffix: "Vg", threshold: 10n ** 63n },
    { suffix: "NDc", threshold: 10n ** 60n },
    { suffix: "ODc", threshold: 10n ** 57n },
    { suffix: "SpDc", threshold: 10n ** 54n },
    { suffix: "SxDc", threshold: 10n ** 51n },
    { suffix: "QiDc", threshold: 10n ** 48n },
    { suffix: "QaDc", threshold: 10n ** 45n },
    { suffix: "TDc", threshold: 10n ** 42n },
    { suffix: "DDc", threshold: 10n ** 39n },
    { suffix: "UDc", threshold: 10n ** 36n },
    { suffix: "Dc", threshold: 10n ** 33n },
    { suffix: "No", threshold: 10n ** 30n },
    { suffix: "Oc", threshold: 10n ** 27n },
    { suffix: "Sp", threshold: 10n ** 24n },
    { suffix: "Sx", threshold: 10n ** 21n },
    { suffix: "Qi", threshold: 10n ** 18n },
    { suffix: "Qa", threshold: 10n ** 15n },
    { suffix: "T", threshold: 10n ** 12n },
    { suffix: "B", threshold: 10n ** 9n },
    { suffix: "M", threshold: 10n ** 6n },
    { suffix: "K", threshold: 10n ** 3n },
    { suffix: "", threshold: 1n },
];
export function numberFormatter_compact(number, isMoneyOrCurrecyPrefix, compressedDigitsNumDecimalsOptions = { 3: 0, 2: 1, 1: 2 }, decimalPlaces = 0, precision = 100) {
    // Convert the number to a Decimal instance with the specified precision and a rounding mode of always rounding down.
    let dec = new (Decimal.clone({ precision: precision, rounding: Decimal.ROUND_DOWN }))(String(number));
    const negative = dec.lessThan(0);
    dec = dec.abs();
    const found = numberFormatter_compact_map.find((x) => dec.greaterThanOrEqualTo(x.threshold.toString()));
    if (found) {
        const dec2 = dec.div(found.threshold.toString());
        const formatted = dec2.toFixed(found.threshold === 1n
            ? decimalPlaces
            : dec2.greaterThanOrEqualTo(100)
                ? compressedDigitsNumDecimalsOptions[3] ?? 0
                : dec2.greaterThanOrEqualTo(10)
                    ? compressedDigitsNumDecimalsOptions[2] ?? 1
                    : compressedDigitsNumDecimalsOptions[1] ?? 2) + found.suffix;
        return (negative ? "-" : "") + (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") + formatted;
    }
    return (negative ? "-" : "") + (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") + dec.toFixed(decimalPlaces);
}
export function numberFormatter_compact_lite(number, isMoneyOrCurrecyPrefix, compressedDigitsNumDecimalsOptions = { 3: 0, 2: 1, 1: 2 }, decimalPlaces = 0) {
    let baseNum = decimalPlaces !== 0
        ? typeof number === "string"
            ? /^\d+$/.test(number)
                ? BigInt(number)
                : Number(number)
            : typeof number === "bigint"
                ? number
                : Number(number)
        : typeof number === "bigint"
            ? number
            : BigInt(typeof number === "string" ? number.match(/^\d+$/)?.[0] ?? 0 : Math.floor(Number(number)));
    const negative = baseNum < 0;
    const num = typeof baseNum === "bigint" ? (negative ? -baseNum : baseNum) : Math.abs(baseNum);
    const found = numberFormatter_compact_map.find((x) => num >= x.threshold);
    if (found) {
        if (typeof num === "bigint") {
            const num2 = num / found.threshold;
            const divisor = 10n **
                BigInt(found.threshold === 1n
                    ? decimalPlaces
                    : num2 >= 100
                        ? compressedDigitsNumDecimalsOptions[3] ?? 0
                        : num2 >= 10
                            ? compressedDigitsNumDecimalsOptions[2] ?? 1
                            : compressedDigitsNumDecimalsOptions[1] ?? 2);
            const num3 = num / (found.threshold / divisor);
            const formatted = num2.toString() + "." + (num3 % divisor).toString() + found.suffix;
            return ((negative ? "-" : "") + (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") + formatted);
        }
        else {
            const num2 = num / Number(found.threshold);
            const formatted = num2.toFixed(found.threshold === 1n
                ? decimalPlaces
                : num2 >= 100
                    ? compressedDigitsNumDecimalsOptions[3] ?? 0
                    : num2 >= 10
                        ? compressedDigitsNumDecimalsOptions[2] ?? 1
                        : compressedDigitsNumDecimalsOptions[1] ?? 2) + found.suffix;
            return ((negative ? "-" : "") + (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") + formatted);
        }
    }
    return ((negative ? "-" : "") +
        (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") +
        (typeof num === "bigint" ? num.toString() : num.toFixed(decimalPlaces)));
}
export function numberFormatter(number, options = { addCommaSeparators: true }, decimalPlaces = 0, precision = 100) {
    // Convert the number to a Decimal instance with the specified precision and a rounding mode of always rounding down.
    let str = new (Decimal.clone({ precision: precision, rounding: Decimal.ROUND_DOWN }))(String(number)).toFixed(decimalPlaces);
    if (options.currencyPrefix !== undefined) {
        if (str.startsWith("-")) {
            str = "-" + options.currencyPrefix + str.slice(1);
        }
        else {
            str = options.currencyPrefix + str;
        }
    }
    if (options.addCommaSeparators ?? true) {
        const strs = str.split(".");
        strs[0] = strs[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        str = strs.join(".");
    }
    return str;
}
//# sourceMappingURL=numberFormatter.js.map