Object.defineProperties(Number.prototype, {
    toNumber: {
        value: function toNumber() {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function toBigInt() {
            return BigInt(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function toBoolean() {
            return Number.isNaN(this) ? false : (this % 2).round() == 1;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits = [1, 10], valueFor0 = "0") {
            if (this > limits[1] ||
                this < limits[0] ||
                !this.isInteger() ||
                this.isNaN()) {
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
                    return valueFor0;
                }
                /**
                 * The absolute value of the provided number.
                 *
                 * @type {bigint}
                 */
                const absNum = num < 0n ? -num : num;
                for (var i = 0; i < romanMatrix.length; i++) {
                    if (absNum >= romanMatrix[i][0]) {
                        return (romanMatrix[i][1] +
                            convertToRoman(num - romanMatrix[i][0]));
                    }
                }
                throw new InternalError(`Something went wrong while converting the bigint to a roman numeral, this should not have happened, please notify 8Crafter.`);
            }
            return ((this < 0 ? "-" : "") +
                convertToRoman(this.toBigInt()));
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isNaN: {
        value: function isNaN() {
            return Number.isNaN(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isFinite: {
        value: function isFinite() {
            return Number.isFinite(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isInteger: {
        value: function isInteger() {
            return Number.isInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isSafeInteger: {
        value: function isSafeInteger() {
            return Number.isSafeInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isEven: {
        value: function isEven() {
            return Number.isNaN(this) ? false : (this % 2).round() == 0;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isOdd: {
        value: function isOdd() {
            return Number.isNaN(this) ? false : (this % 2).round() == 1;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    floor: {
        value: function () {
            return Math.floor(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    round: {
        value: function () {
            return Math.round(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    ceil: {
        value: function () {
            return Math.ceil(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=Number.js.map