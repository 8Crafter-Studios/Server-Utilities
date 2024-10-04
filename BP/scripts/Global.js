import { system } from "@minecraft/server";
import { Entity } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "Main/ui";
;
Object.defineProperty(String.prototype, 'escapeCharacters', {
    value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s) {
        //:Get primitive copy of string:
        var str = this.valueOf(); /*
        console.warn(unescape(str))*/
        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", "\"");
            str = str.replaceAll("\\qs", "\'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", "\;");
            str = str.replaceAll("\\cf", "\:");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                if ((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)) { /*
                    console.warn((values.slice(0, 6))); */
                    strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6);
                }
                else {
                    if ((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)) {
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8);
                    }
                    else {
                        if ((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)) {
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7);
                        }
                        else {
                            if ((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)) {
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6);
                            }
                            else {
                                if ((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)) {
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5);
                                }
                                else {
                                    if ((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)) {
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4);
                                    }
                                    else {
                                        if ((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)) {
                                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3);
                                        }
                                        else {
                                            if ((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)) {
                                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2);
                                            }
                                            else {
                                                if (index !== 0) {
                                                    strarray[index] = "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }
        //:Return modified copy:
        return (str);
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(String.prototype, 'escapeCharactersB', {
    value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s) {
        //:Get primitive copy of string:
        var str = this.valueOf(); /*
        console.warn(unescape(str))*/
        var eb;
        eb = undefined;
        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            }
            catch (e) {
                eb.push(e);
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", "\"");
            str = str.replaceAll("\\qs", "\'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", "\;");
            str = str.replaceAll("\\cf", "\:");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                if ((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)) { /*
                    console.warn((values.slice(0, 6))); */
                    strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6);
                }
                else {
                    if ((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)) {
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8);
                    }
                    else {
                        if ((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)) {
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7);
                        }
                        else {
                            if ((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)) {
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6);
                            }
                            else {
                                if ((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)) {
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5);
                                }
                                else {
                                    if ((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)) {
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4);
                                    }
                                    else {
                                        if ((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)) {
                                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3);
                                        }
                                        else {
                                            if ((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)) {
                                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2);
                                            }
                                            else {
                                                if (index !== 0) {
                                                    strarray[index] = "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }
        //:Return modified copy:
        return ({ v: str, e: eb });
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperties(String.prototype, {
    toNumber: {
        value: function () {
            var str = this;
            return Number.isNaN(Number(str)) ? str.toLowerCase() == "infinity" ? Infinity : str.toLowerCase() == "-infinity" ? -Infinity : undefined : Number(str);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt() {
            var str = this;
            return Number.isNaN(Number(str)) ? undefined : BigInt(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function () {
            var simplified = this.toLowerCase().trim();
            var numberified = simplified.toNumber();
            return simplified.startsWith("t")
                ? true
                : simplified.startsWith("f")
                    ? false
                    : simplified.startsWith("y")
                        ? true
                        : simplified.startsWith("n")
                            ? false
                            : !!numberified
                                ? numberified.toBoolean()
                                : Boolean(simplified);
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(Number.prototype, {
    toNumber: {
        value: function toNumber() {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt() {
            return BigInt(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean() {
            return Number.isNaN(this) ? false : ((this % 2).round() == 1);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits = [1, 10], valueFor0 = "0") {
            if ((this > limits[1]) || (this < limits[0]) || !this.isInteger() || this.isNaN()) {
                return this.toString();
            }
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
            ];
            function convertToRoman(num) {
                if (num === 0n) {
                    return valueFor0;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                    if (num >= romanMatrix[i][0]) {
                        return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                    }
                }
            }
            return ((this < 0) ? "-" : "") + convertToRoman(this.toBigInt());
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isNaN: {
        value: function isNaN() {
            return Number.isNaN(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isFinite: {
        value: function isFinite() {
            return Number.isFinite(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isInteger: {
        value: function isInteger() {
            return Number.isInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isSafeInteger: {
        value: function isSafeInteger() {
            return Number.isSafeInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven() {
            return Number.isNaN(this) ? false : ((this % 2).round() == 0);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd() {
            return Number.isNaN(this) ? false : ((this % 2).round() == 1);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    floor: {
        value: function () {
            return Math.floor(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function () {
            return Math.round(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function () {
            return Math.ceil(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(BigInt.prototype, {
    toNumber: {
        value: function toNumber() {
            return Number(this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt() {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean() {
            return (this % 2n) == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits = [1n, 10n], valueFor0n = "0") {
            if ((this > limits[1]) || (this < limits[0])) {
                return this.toString();
            }
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
            ];
            function convertToRoman(num) {
                if (num === 0n) {
                    return valueFor0n;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                    if (num >= romanMatrix[i][0]) {
                        return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                    }
                }
            }
            return ((this < 0) ? "-" : "") + convertToRoman(this.toBigInt());
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven() {
            return (this % 2n) == 0n;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd() {
            return (this % 2n) == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true
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
    }*/
});
Object.defineProperties(Boolean.prototype, {
    toNumber: {
        value: function () {
            return +this;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function () {
            return BigInt(+this);
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function () {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedString: {
        value: function () {
            return this.valueOf() ? "§aTrue" : "§cFalse";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringB: {
        value: function () {
            return this.valueOf() ? "§2True" : "§4False";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringED: {
        value: function () {
            return this.valueOf() ? "§aEnabled" : "§cDisabled";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringEDB: {
        value: function () {
            return this.valueOf() ? "§2Enabled" : "§4Disabled";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIO: {
        value: function () {
            return this.valueOf() ? "§aON" : "§cOFF";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOB: {
        value: function () {
            return this.valueOf() ? "§2ON" : "§4OFF";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOL: {
        value: function () {
            return this.valueOf() ? "§aOn" : "§cOff";
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOLB: {
        value: function () {
            return this.valueOf() ? "§2On" : "§4Off";
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperty(Error.prototype, 'stringify', {
    value: function stringify() {
        return this + " " + this.stack;
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(ActionFormData.prototype, 'forceShow', {
    value: async function forceShow(player, timeout) {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        while (system.currentTick <= timeoutTicks) {
            const r = await this.show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(ModalFormData.prototype, 'forceShow', {
    value: async function forceShow(player, timeout) {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        while (system.currentTick <= timeoutTicks) {
            const r = await this.show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(MessageFormData.prototype, 'forceShow', {
    value: async function forceShow(player, timeout) {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        while (system.currentTick <= timeoutTicks) {
            const r = await this.show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
});
//# sourceMappingURL=Global.js.map