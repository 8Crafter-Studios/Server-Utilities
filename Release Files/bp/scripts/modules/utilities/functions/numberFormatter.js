/**
 * An array of objects representing number suffixes and their corresponding thresholds.
 */
export const numberFormatter_compact_map = Object.freeze([
    { suffix: "Mn", threshold: 10n ** 3003n }, // Millinillion
    { suffix: "Ce", threshold: 10n ** 303n }, // Centillion
    { suffix: "NOg", threshold: 10n ** 300n }, // Novenonagintillion
    { suffix: "OOg", threshold: 10n ** 297n }, // Octononagintillion
    { suffix: "SpOg", threshold: 10n ** 294n }, // Septenonagintillion
    { suffix: "SxOg", threshold: 10n ** 291n }, // Sesnonagintillion
    { suffix: "QnOg", threshold: 10n ** 288n }, // Quinnonagintillion
    { suffix: "QdOg", threshold: 10n ** 285n }, // Quattuornonagintillion
    { suffix: "TOg", threshold: 10n ** 282n }, // Tresnonagintillion
    { suffix: "DOg", threshold: 10n ** 279n }, // Duononagintillion
    { suffix: "UOg", threshold: 10n ** 276n }, // Unnonagintillion
    { suffix: "Og", threshold: 10n ** 273n }, // Nonagintillion
    { suffix: "NOg", threshold: 10n ** 270n }, // Novemoctogintillion
    { suffix: "OOg", threshold: 10n ** 267n }, // Octoctogintillion
    { suffix: "SpOg", threshold: 10n ** 264n }, // Septenoctogintillion
    { suffix: "SxOg", threshold: 10n ** 261n }, // Sesoctogintillion
    { suffix: "QnOg", threshold: 10n ** 258n }, // Quinoctogintillion
    { suffix: "QdOg", threshold: 10n ** 255n }, // Quattuoroctogintillion
    { suffix: "TOg", threshold: 10n ** 252n }, // Tresoctogintillion
    { suffix: "DOg", threshold: 10n ** 249n }, // Duoctogintillion
    { suffix: "UOg", threshold: 10n ** 246n }, // Unoctogintillion
    { suffix: "Og", threshold: 10n ** 243n }, // Octogintillion
    { suffix: "NSt", threshold: 10n ** 240n }, // Novemseptuagintillion
    { suffix: "OSt", threshold: 10n ** 237n }, // Octoseptuagintillion
    { suffix: "SpSt", threshold: 10n ** 234n }, // Septenseptuagintillion
    { suffix: "SxSt", threshold: 10n ** 231n }, // Sesseptuagintillion
    { suffix: "QnSt", threshold: 10n ** 228n }, // Quinseptuagintillion
    { suffix: "QdSt", threshold: 10n ** 225n }, // Quattuorseptuagintillion
    { suffix: "TSt", threshold: 10n ** 222n }, // Tresseptuagintillion
    { suffix: "DSt", threshold: 10n ** 219n }, // Duoseptuagintillion
    { suffix: "USt", threshold: 10n ** 216n }, // Unseptuagintillion
    { suffix: "St", threshold: 10n ** 213n }, // Septuagintillion
    { suffix: "NSg", threshold: 10n ** 210n }, // Novemsexagintillion
    { suffix: "OSg", threshold: 10n ** 207n }, // Octosexagintillion
    { suffix: "SpSg", threshold: 10n ** 204n }, // Septensexagintillion
    { suffix: "SxSg", threshold: 10n ** 201n }, // Sesexagintillion
    { suffix: "QnSg", threshold: 10n ** 198n }, // Quinsexagintillion
    { suffix: "QdSg", threshold: 10n ** 195n }, // Quattuorsexagintillion
    { suffix: "TSg", threshold: 10n ** 192n }, // Tressexagintillion
    { suffix: "DSg", threshold: 10n ** 189n }, // Duosexagintillion
    { suffix: "USg", threshold: 10n ** 186n }, // Unsexagintillion
    { suffix: "Sg", threshold: 10n ** 183n }, // Sexagintillion
    { suffix: "NQqt", threshold: 10n ** 180n }, // Novemquinquagintillion
    { suffix: "OQqt", threshold: 10n ** 177n }, // Octoquinquagintillion
    { suffix: "SpQqt", threshold: 10n ** 174n }, // Septenquinquagintillion
    { suffix: "SxQqt", threshold: 10n ** 171n }, // Sesquinquagintillion
    { suffix: "QnQqt", threshold: 10n ** 168n }, // Quinquinquagintillion
    { suffix: "QdQqt", threshold: 10n ** 165n }, // Quattuorquinquagintillion
    { suffix: "TQqt", threshold: 10n ** 162n }, // Tresquinquagintillion
    { suffix: "DQqt", threshold: 10n ** 159n }, // Duoquinquagintillion
    { suffix: "UQqt", threshold: 10n ** 156n }, // Unquinquagintillion
    { suffix: "Qqt", threshold: 10n ** 153n }, // Quinquagintillion
    { suffix: "NQdt", threshold: 10n ** 150n }, // Novemquadragintillion
    { suffix: "OQdt", threshold: 10n ** 147n }, // Octoquadragintillion
    { suffix: "SpQdt", threshold: 10n ** 144n }, // Septenquadragintillion
    { suffix: "SxQdt", threshold: 10n ** 141n }, // Sesquadragintillion
    { suffix: "QnQdt", threshold: 10n ** 138n }, // Quinquadragintillion
    { suffix: "QdQdt", threshold: 10n ** 135n }, // Quattuorquadragintillion
    { suffix: "TQdt", threshold: 10n ** 132n }, // Tresquadragintillion
    { suffix: "DQdt", threshold: 10n ** 129n }, // Duoquadragintillion
    { suffix: "UQdt", threshold: 10n ** 126n }, // Unquadragintillion
    { suffix: "Qdt", threshold: 10n ** 123n }, // Quadragintillion
    { suffix: "NTg", threshold: 10n ** 120n },
    { suffix: "OTg", threshold: 10n ** 117n },
    { suffix: "SpTg", threshold: 10n ** 114n },
    { suffix: "SxTg", threshold: 10n ** 111n },
    { suffix: "QnTg", threshold: 10n ** 108n },
    { suffix: "QdTg", threshold: 10n ** 105n },
    { suffix: "TTg", threshold: 10n ** 102n },
    { suffix: "G", threshold: 10n ** 100n },
    { suffix: "DTg", threshold: 10n ** 99n },
    { suffix: "UTg", threshold: 10n ** 96n },
    { suffix: "Tg", threshold: 10n ** 93n },
    { suffix: "NVg", threshold: 10n ** 90n },
    { suffix: "OVg", threshold: 10n ** 87n },
    { suffix: "SpVg", threshold: 10n ** 84n },
    { suffix: "SxVg", threshold: 10n ** 81n },
    { suffix: "QnVg", threshold: 10n ** 78n },
    { suffix: "QdVg", threshold: 10n ** 75n },
    { suffix: "TVg", threshold: 10n ** 72n },
    { suffix: "DVtg", threshold: 10n ** 69n },
    { suffix: "UVg", threshold: 10n ** 66n },
    { suffix: "Vg", threshold: 10n ** 63n },
    { suffix: "NDc", threshold: 10n ** 60n },
    { suffix: "ODc", threshold: 10n ** 57n },
    { suffix: "SpDc", threshold: 10n ** 54n },
    { suffix: "SxDc", threshold: 10n ** 51n },
    { suffix: "QnDc", threshold: 10n ** 48n },
    { suffix: "QdDc", threshold: 10n ** 45n },
    { suffix: "TDc", threshold: 10n ** 42n },
    { suffix: "DDc", threshold: 10n ** 39n },
    { suffix: "UDc", threshold: 10n ** 36n },
    { suffix: "Dc", threshold: 10n ** 33n },
    { suffix: "No", threshold: 10n ** 30n },
    { suffix: "Oc", threshold: 10n ** 27n },
    { suffix: "Sp", threshold: 10n ** 24n },
    { suffix: "Sx", threshold: 10n ** 21n },
    { suffix: "Qn", threshold: 10n ** 18n },
    { suffix: "Qd", threshold: 10n ** 15n },
    { suffix: "T", threshold: 10n ** 12n },
    { suffix: "B", threshold: 10n ** 9n },
    { suffix: "M", threshold: 10n ** 6n },
    { suffix: "K", threshold: 10n ** 3n },
    { suffix: "", threshold: 1n },
]);
/**
 * Formats a number into a compact string representation.
 *
 * @param {string | number | bigint | boolean} number The number to format.
 * @param {boolean | string} isMoneyOrCurrecyPrefix If true, adds a dollar sign prefix. If a string, uses it as the prefix.
 * @param {object} compressedDigitsNumDecimalsOptions Options for decimal places.
 * @param {number} [decimalPlaces=0] The number of decimal places to use when there is no suffix.
 * @param {number} [precision=100] The precision to use for the {@link Decimal} instance. Defaults to 100.
 * @returns {string} The formatted number.
 *
 * @example
 * ```typescript
 * numberFormatter_compact(123456789, true); // "$123M"
 * numberFormatter_compact(123456789, "€"); // "€123M"
 * numberFormatter_compact(12345678); // "12.3M"
 * numberFormatter_compact(123456789, false, { 3: 5 }); // "123.45678M"
 * numberFormatter_compact(12345678, false, { 3: 5 }); // "12.3M"
 * numberFormatter_compact(12345678, false, { 2: 3 }); // "12.345M"
 */
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
    return ((negative ? "-" : "") +
        (typeof isMoneyOrCurrecyPrefix === "string" ? isMoneyOrCurrecyPrefix : isMoneyOrCurrecyPrefix ? "$" : "") +
        dec.toFixed(decimalPlaces));
}
/**
 * Formats a number into a compact string representation.
 *
 * This is a lightweight version of the {@link numberFormatter_compact} function, which does not use a {@link Decimal} instance.
 *
 * @param {string | number | bigint | boolean} number The number to format.
 * @param {boolean | string} isMoneyOrCurrecyPrefix If true, adds a dollar sign prefix. If a string, uses it as the prefix.
 * @param {NumberFormatterCompactCompressedDigitsNumDecimalsOptions} compressedDigitsNumDecimalsOptions Options for decimal places.
 * @param {number} [decimalPlaces=0] The number of decimal places to use when there is no suffix.
 * @returns {string} The formatted number.
 *
 * @example
 * ```typescript
 * numberFormatter_compact_lite(123456789, true); // "$123M"
 * numberFormatter_compact_lite(123456789, "€"); // "€123M"
 * numberFormatter_compact_lite(12345678); // "12.3M"
 * numberFormatter_compact_lite(123456789, false, { 3: 5 }); // "123.45678M"
 * numberFormatter_compact_lite(12345678, false, { 3: 5 }); // "12.3M"
 * numberFormatter_compact_lite(12345678, false, { 2: 3 }); // "12.345M"
 * ```
 */
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
            const decimalPlaceCount = BigInt(found.threshold === 1n
                ? decimalPlaces
                : num2 >= 100
                    ? compressedDigitsNumDecimalsOptions[3] ?? 0
                    : num2 >= 10
                        ? compressedDigitsNumDecimalsOptions[2] ?? 1
                        : compressedDigitsNumDecimalsOptions[1] ?? 2);
            const divisor = 10n ** decimalPlaceCount;
            const num3 = decimalPlaceCount === 0n ? 0n : num / (found.threshold / divisor);
            const formatted = num2.toString() + (decimalPlaceCount === 0n ? "" : "." + (num3 % divisor).toString()) + found.suffix;
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
/**
 * Formats a number into a string representation with optional currency prefix and comma separators.
 *
 * @param {string | number | bigint | boolean} number The number to format.
 * @param {NumberFormatterOptions} [options] Options for formatting.
 * @param {number} [decimalPlaces=0] The number of decimal places to use. Defaults to `0`.
 * @param {number} [precision=100] The precision to use for the {@link Decimal} instance. Defaults to `100`.
 * @returns {string} The formatted number.
 *
 * @example
 * ```typescript
 * numberFormatter(123456789); // "123,456,789"
 * numberFormatter(123456789, { currencyPrefix: "$" }); // "$123,456,789"
 * numberFormatter(123456789, { addCommaSeparators: false }); // "123456789"
 * numberFormatter(123456789, { currencyPrefix: "$", addCommaSeparators: false }); // "$123456789"
 * ```
 */
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