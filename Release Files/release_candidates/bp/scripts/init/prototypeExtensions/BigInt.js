Object.defineProperties(BigInt.prototype, {
    toNumber: {
        value: function toNumber() {
            return Number(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function toBigInt() {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function toBoolean() {
            return this % 2n == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits = [1n, 10n], valueFor0n = "0") {
            if (this > limits[1] || this < limits[0]) {
                return this.toString();
            }
            var romanMatrix = [
                [1000n, "M"],
                [900n, "CM"],
                [500n, "D"],
                [400n, "CD"],
                [100n, "C"],
                [90n, "XC"],
                [50n, "L"],
                [40n, "XL"],
                [10n, "X"],
                [9n, "IX"],
                [5n, "V"],
                [4n, "IV"],
                [1n, "I"],
            ];
            function convertToRoman(num) {
                if (num === 0n) {
                    return valueFor0n;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                    if (num >= romanMatrix[i][0]) {
                        return (romanMatrix[i][1] +
                            convertToRoman(num - romanMatrix[i][0]));
                    }
                }
            }
            return ((this < 0 ? "-" : "") +
                convertToRoman(this.toBigInt()));
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isEven: {
        value: function isEven() {
            return this % 2n == 0n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isOdd: {
        value: function isOdd() {
            return this % 2n == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    } /*,
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }*/,
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=BigInt.js.map