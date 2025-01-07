export function toBase(num, radix = 10, keysa = radix > 62
    ? "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
    : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/") {
    // only i64 numbers
    /*  var keys = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];*/
    var keys = keysa.split("");
    if (radix == 1)
        return keys[0].repeat(num);
    if (!(radix >= 2 && radix <= keys.length))
        throw new RangeError("toBase() radix argument must be between 2 and " + keys.length);
    if (num < 0)
        var isNegative = true;
    if (isNaN((num = Math.abs(+num))))
        return NaN;
    let output = [];
    do {
        let index = num % radix;
        output.unshift(keys[index]);
        num = Math.trunc(num / radix);
    } while (num != 0);
    if (isNegative ?? false)
        output.unshift("-");
    return output.join("");
}
//# sourceMappingURL=toBase.js.map