import { system, Entity, world, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, EquipmentSlot, ContainerSlot, Player, Dimension } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import Decimal from "decimal.js";
import { MoneySystem } from "ExtraFeatures/money";
;
globalThis.subscribedEvents = {};
globalThis.repeatingIntervals = {};
globalThis.tempVariables = {};
// §ess§gss§6ss§pss§ass§qss§2ss§4ss§5ss§dss§1ss§3ss§7ss§8ss§9ss§0ss§mss§nss§bss§sss§rss§fss§tss§uss§iss§hss§jss
Object.defineProperty(globalThis, 'stack', { get: function stack() { return new Error().stack; } });
Object.defineProperty(Array.prototype, 'forEachB', {
    value: function forEachB(callbackfn, thisArg) {
        this.forEach((v, i, a) => {
            Object.defineProperty(function b() { callbackfn(v, i, a); }, 'name', { value: `Array[${i}]` })();
        }, thisArg);
    }
});
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
globalThis.twoWayModulo = function twoWayModulo(number, modulo) { if (number < 0) {
    return modulo + (number % modulo);
}
else {
    return number % modulo;
} };
globalThis.clamp24HoursTo12Hours = function clamp24HoursTo12Hours(hours) { return twoWayModulo(hours - 1, 12) + 1; };
/**
 * Formats a date object to a time string formatted as 12:37:01 PM.
 * @since 1.18.2-development.3
 * @version 1.1.1
 */
globalThis.formatTime = function formatTime(date, timeZoneOffset = 0, includeMs = false) { const dateb = new Date(date.valueOf() + (timeZoneOffset * 3600000)); return `${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`; };
/**
 * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM.
 * @since 1.18.2-development.10
 * @version 1.1.1
 */
globalThis.formatDateTime = function formatDateTime(date, timeZoneOffset = 0, includeMs = false) { const dateb = new Date(date.valueOf() + (timeZoneOffset * 3600000)); return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`; };
/**
 * Formats a date object to a date string formatted as 07/21/2024.
 * @since 1.26.0-preview.20+BUILD.2
 * @version 1.0.0
 */
globalThis.formatDate = function formatDate(date, timeZoneOffset = 0) { const dateb = new Date(date.valueOf() + (timeZoneOffset * 3600000)); return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()}`; };
Object.defineProperties(Date.prototype, {
    timezone: {
        value: typeof world.getDynamicProperty("andexdbSettings:timeZone") == "object" ? 0 : (world.getDynamicProperty("andexdbSettings:timeZone") ?? 0).toNumber() ?? 0,
        configurable: true,
        enumerable: true,
        writable: true
    },
    toTimezone: {
        value: function toTimezone(UTCHourOffset) {
            this.timezone = !!UTCHourOffset ? UTCHourOffset.toNumber() : config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneDate: {
        value: function (UTCHourOffset, includeTimeZoneOffset = false) {
            return this.formatDate(!!UTCHourOffset ? UTCHourOffset.toNumber() : this.timezone ?? config.system.timeZone, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneDateTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(!!UTCHourOffset ? UTCHourOffset.toNumber() : this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(!!UTCHourOffset ? UTCHourOffset.toNumber() : this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatTime: {
        value: function formatTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + (timeZoneOffset * 3600000));
            return `${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatDateTime: {
        value: function formatDateTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + (timeZoneOffset * 3600000));
            return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatDate: {
        value: function formatDate(timeZoneOffset = this.timezone ?? config.system.timeZone, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + (timeZoneOffset * 3600000));
            return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()}${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    }
});
Object.defineProperties(Entity.prototype, {
    inventory: {
        get: function inventory() {
            return this.getComponent("inventory");
        },
        configurable: true,
        enumerable: true
    },
    equippable: {
        get: function equippable() {
            return this.getComponent("equippable");
        },
        configurable: true,
        enumerable: true
    },
    cursorInventory: {
        get: function cursorInventory() {
            return this.getComponent("cursor_inventory");
        },
        configurable: true,
        enumerable: true
    },
    heldItem: {
        get: function heldItem() {
            if (!!!this.getComponent("equippable")) {
                return undefined;
            }
            else {
                return this.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true
    },
    activeSlot: {
        get: function activeSlot() {
            if (!!!this.getComponent("equippable")) {
                return undefined;
            }
            else {
                return this.getComponent("equippable").getEquipmentSlot(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true
    },
    moneySystem: {
        get: function moneySystem() {
            return MoneySystem.get(this);
        },
        configurable: true,
        enumerable: true
    },
    dimensionLocation: {
        get: function dimensionLocation() { return { x: this.x, y: this.y, z: this.z, dimension: this.dimension }; },
        configurable: true,
        enumerable: true
    },
    locationstring: {
        get: function locationstring() {
            return this.x + " " + this.y + " " + this.z;
        },
        configurable: true,
        enumerable: true
    },
    rotationstring: {
        get: function rotationstring() {
            return this.rotx + " " + this.roty;
        },
        configurable: true,
        enumerable: true
    },
    locationrotation: {
        get: function locationrotation() {
            return { x: this.x, y: this.y, z: this.z, rotX: this.rotx, rotY: this.roty };
        },
        configurable: true,
        enumerable: true
    },
    xy: {
        get: function xy() {
            return { x: this.x, y: this.y };
        },
        configurable: true,
        enumerable: true
    },
    yz: {
        get: function yz() {
            return { y: this.y, z: this.z };
        },
        configurable: true,
        enumerable: true
    },
    xz: {
        get: function xz() {
            return { x: this.x, z: this.z };
        },
        configurable: true,
        enumerable: true
    },
    x: {
        get: function x() { return this.location.x; },
        configurable: true,
        enumerable: true
    },
    y: {
        get: function y() { return this.location.y; },
        configurable: true,
        enumerable: true
    },
    z: {
        get: function z() { return this.location.z; },
        configurable: true,
        enumerable: true
    },
    rotx: {
        get: function rotx() { return this.getRotation().x; },
        configurable: true,
        enumerable: true
    },
    roty: {
        get: function roty() { return this.getRotation().y; },
        configurable: true,
        enumerable: true
    },
    timeZone: {
        get: function timeZone() { return (this.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? config.system.timeZone).toString().toNumber(); },
        set: function timeZone(timezone) { this.setDynamicProperty("andexdbPersonalSettings:timeZone", !!timezone ? timezone.toString() : undefined); },
        configurable: true,
        enumerable: true
    }
});
Object.defineProperties(Player.prototype, {});
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
Object.defineProperty(globalThis, 'players', {
    get: function player() {
        return Object.fromEntries(world.getAllPlayers().map(p => [p.name, p]));
    },
    configurable: true,
    enumerable: true
});
/**
 * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values.
 * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true.
 * @returns {any} The parsed JSON data.
 */
globalThis.JSONParseOld = function JSONParseOld(text, keepUndefined = true) {
    let g = [];
    let h = [];
    let a = JSON.parse(text.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"'), function (k, v) {
        if (v === '{{Infinity}}')
            return Infinity;
        else if (v === '{{-Infinity}}')
            return -Infinity;
        else if (v === '{{NaN}}')
            return NaN;
        else if (v === '{{undefined}}') {
            g.push(k);
            if (keepUndefined) {
                return v;
            }
            else {
                undefined;
            }
        }
        ;
        h.push(k);
        return v;
    });
    g.forEach((v, i) => { let b = Object.entries(a); b[b.findIndex(b => b[0] == v)] = [v, undefined]; a = Object.fromEntries(b); });
    {
        let b = Object.entries(a);
        b.filter(b => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined)}}"}}$/)).forEach((v, i) => { console.log(v, i); b[b.findIndex(b => b[0] == v[0])] = [v[0], String(v[1]).replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined)(?:}}"}})$/g, '{{$1}}')]; a = Object.fromEntries(b); });
    }
    ;
    return a;
};
/**
 * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values.
 * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false.
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns {any} The JSON string.
 */
globalThis.JSONStringifyOld = function JSONStringifyOld(value, keepUndefined = false, space) {
    return JSON.stringify(value, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
};
globalThis.JSONParse = function JSONParse(JSONString, keepUndefined = true) {
    let g = [];
    let h = [];
    if (JSONString == undefined) {
        let nothing;
        return nothing;
    }
    if (JSONString == "undefined") {
        return undefined;
    }
    if (JSONString == "Infinity") {
        return Infinity;
    }
    if (JSONString == "-Infinity") {
        return -Infinity;
    }
    if (JSONString == "NaN") {
        return NaN;
    }
    if (JSONString == "null") {
        return null;
    }
    if (JSONString.match(/^\-?\d+n$/g)) {
        return BigInt(JSONString.slice(0, -1));
    }
    let a = JSON.parse(JSONString.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"').replace(/(?<=(?:[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\[)[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*),(?:\s*)|[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*)\[(?:\s*)))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,\]](?:\s*))/g, '"{{$1}}"').replace(/^(Infinity|NaN|-Infinity|undefined|\-?\d+n)$/g, '"{{$1}}"'), function (k, v) {
        if (v === '{{Infinity}}')
            return Infinity;
        else if (v === '{{-Infinity}}')
            return -Infinity;
        else if (v === '{{NaN}}')
            return NaN;
        else if (v === '{{undefined}}') {
            g.push(k);
            if (keepUndefined) {
                return v;
            }
            else {
                undefined;
            }
        }
        else if (tryget(() => v.match(/^{{\-?\d+n}}$/g)) ?? false)
            return BigInt(v.slice(2, -3));
        h.push(k);
        return v;
    });
    function recursiveFind(a) {
        if (a instanceof Array) {
            let b = a;
            b.forEach((v, i) => {
                if (v instanceof Array || v instanceof Object) {
                    b[i] = recursiveFind(v);
                    return;
                }
                ;
                if (String(v) == "{{undefined}}") {
                    b[i] = undefined;
                    return;
                }
                ;
            });
            a = b;
            {
                let b = a;
                !!b.forEach((va, i) => {
                    if (String(va).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                        b[i] = va.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                    }
                    a = b;
                });
            }
            ;
        }
        else if (a instanceof Object) {
            let b = Object.entries(a);
            b.forEach((v, i) => {
                if (v[1] instanceof Object || v[1] instanceof Array) {
                    b[i] = [v[0], recursiveFind(v[1])];
                    return;
                }
                ;
                if (String(v[1]) == "{{undefined}}") {
                    b[i] = [v[0], undefined];
                    return;
                }
                ;
            });
            a = Object.fromEntries(b);
            {
                let b = Object.entries(a);
                b.filter(b => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)).forEach((v, i) => {
                    b[b.findIndex(b => b[0] == v[0])] = [v[0], v[1].replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}')];
                    a = Object.fromEntries(b);
                });
            }
            ;
        }
        else if (typeof a === "string") {
            if (a == "{{undefined}}") {
                a = undefined;
            }
            else {
                if (a.match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                    a = a.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                }
            }
        }
        ;
        return a;
    }
    a = recursiveFind(a);
    return a;
};
globalThis.JSONStringify = function JSONStringify(JSONObject, keepUndefined = false, space) {
    if (JSONObject == undefined) {
        return keepUndefined ? "undefined" : "";
    }
    return JSON.stringify(JSONObject, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        else if (typeof v === "function")
            return { $function: v.toString() };
        else if (typeof v === "bigint")
            return "{{" + v.toString() + "n}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
};
globalThis.cullNull = function cullNull(array) {
    return array.filter(v => v !== null);
};
globalThis.cullUndefined = function cullUndefined(array) {
    return array.filter(v => v !== undefined);
};
globalThis.cullEmpty = function cullEmpty(array) {
    return array.filter(v => !!v);
};
globalThis.tryget = function tryget(callbackfn) {
    try {
        return callbackfn();
    }
    catch { }
};
globalThis.tryrun = function tryrun(callbackfn) {
    try {
        callbackfn();
    }
    catch { }
};
globalThis.catchtry = function catchtry(trycallbackfn, catchcallbackfn = (e) => console.error(e, e?.stack), finallycallbackfn = (v) => { return v; }) {
    let v;
    v = undefined;
    try {
        v = trycallbackfn();
    }
    catch (e) {
        v = catchcallbackfn(e) ?? v;
    }
    finally {
        return finallycallbackfn(v) ?? v;
    }
};
globalThis.cinfo = function cinfo(...data) {
    console.info(data);
};
globalThis.clog = function clog(...data) {
    console.log(data);
};
globalThis.cwarn = function cwarn(...data) {
    console.warn(data);
};
globalThis.cerror = function cerror(...data) {
    console.error(data);
};
globalThis.send = function send(message) {
    world.sendMessage(message);
};
globalThis.asend = function asend(value) {
    world.sendMessage(String(value));
};
globalThis.bsend = function bsend(value, space) {
    world.sendMessage(JSONStringify(value, true, space));
};
globalThis.csend = function csend(value, space) {
    world.sendMessage(JSON.stringify(value, undefined, space));
};
globalThis.dsend = function dsend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true }));
};
globalThis.esend = function esend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true }));
};
globalThis.fsend = function fsend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false }));
};
globalThis.bcsend = function bcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options));
};
globalThis.ccsend = function ccsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options));
};
globalThis.dcsend = function dcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true }), options));
};
globalThis.ecsend = function ecsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true }), options));
};
globalThis.fcsend = function fcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false }), options));
};
globalThis.psend = function psend(player, value) {
    player.sendMessage(value);
};
globalThis.pasend = function pasend(player, value) {
    player.sendMessage(String(value));
};
globalThis.pbsend = function pbsend(player, value, space) {
    player.sendMessage(JSONStringify(value, true, space));
};
globalThis.pcsend = function pcsend(player, value, space) {
    player.sendMessage(JSON.stringify(value, undefined, space));
};
globalThis.pdsend = function pdsend(player, value, space) {
    player.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true }));
};
globalThis.pesend = function pesend(player, value, space) {
    player.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true }));
};
globalThis.pfsend = function pfsend(player, value, space) {
    player.sendMessage(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false }));
};
globalThis.pbcsend = function pbcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options));
};
globalThis.pccsend = function pccsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options));
};
globalThis.pdcsend = function pdcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true }), options));
};
globalThis.pecsend = function pecsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true }), options));
};
globalThis.pfcsend = function pfcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, { bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false }), options));
};
globalThis.perror = function perror(player, error, prefix = "§c") {
    player.sendMessage(prefix + (tryget(() => error.stringify()) ?? (error + " " + error.stack)));
};
globalThis.breakpoint = function breakpoint() {
    undefined; // Has a hit count type breakpoint with a value of 2.
};
globalThis.iterateGenerator = function iterateGenerator(extractorGenerator, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    async function iterateGeneratorB(extractorGenerator, lastYieldTime) {
        let finalResult;
        while (whileConditions) {
            const result = extractorGenerator.next();
            finalResult = result.value;
            if (!result.done) {
                // console.log(result.value); // Handle the yielded value
                if (Date.now() - lastYieldTime >= maxTimePerTick) {
                    lastYieldTime = Date.now();
                    await new Promise(resolve => system.run(() => resolve(void null))); // Asynchronously wait for next iteration
                }
            }
            else {
                break;
            }
        }
        return finalResult;
    }
    return iterateGeneratorB(extractorGenerator, lastYieldTime);
};
globalThis.completeGenerator = async function completeGenerator(g, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    let finalResult;
    let returnResult;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            finalResult = result.value;
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise(resolve => system.run(() => resolve(void null)));
            }
        }
        else {
            returnResult = result.value;
            break;
        }
    }
    return { yield: finalResult, return: returnResult };
};
globalThis.completeGeneratorB = async function completeGeneratorB(g, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now();
    var yieldResults = [];
    let returnResult;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            yieldResults.push(result.value);
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise(resolve => system.run(() => resolve(void null)));
            }
        }
        else {
            returnResult = result.value;
            break;
        }
    }
    return { yield: yieldResults, return: returnResult };
};
globalThis.waitTick = async function waitTick() { return new Promise(resolve => system.run(() => resolve(void null))); };
globalThis.waitTicks = async function waitTicks(ticks = 1) { return new Promise(resolve => system.runTimeout(() => resolve(void null), ticks)); };
globalThis.testForObjectExtension = function testForObjectExtension(objectToTest, base) { return Object.entries(base).every(v => Object.keys(objectToTest).includes(v[0]) ? Object.entries(objectToTest).find(c => c[0] == v[0])[1] == v[1] : false); };
globalThis.testForObjectTypeExtension = function testForObjectTypeExtension(objectToTest, base) {
    return Object.entries(base).every((v) => Object.keys(objectToTest).includes(v[0])
        ? v[1].startsWith("[object ") ? Object.entries(objectToTest).find((c) => c[0] == v[0])[1]?.constructor?.name == v[1].slice(8, -1) : typeof Object.entries(objectToTest).find((c) => c[0] == v[0])[1] == v[1]
        : false);
};
//# sourceMappingURL=Global.js.map