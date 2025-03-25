/**
 * init/prototypeExtensions/Date.ts
 * This requires that {@link module:init/prototypeExtensions/Number} be imported first.
 * @requires init/prototypeExtensions/Number
 * @module
 * @description This file adds some useful functions and properties to the `Date` prototype.
 */
import { world } from "@minecraft/server";
await (async () => {
    if (!("toNumber" in Number.prototype)) {
        await import("./Number");
    }
})();
Object.defineProperties(Date.prototype, {
    timezone: {
        value: config.system.timeZone,
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toTimezone: {
        value: function toTimezone(UTCHourOffset) {
            this.timezone = !!UTCHourOffset
                ? UTCHourOffset.toNumber()
                : config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDate: {
        value: function (UTCHourOffset, includeTimeZoneOffset = false) {
            return this.formatDate(!!UTCHourOffset
                ? UTCHourOffset.toNumber()
                : this.timezone ?? config.system.timeZone, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDateTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(!!UTCHourOffset
                ? UTCHourOffset.toNumber()
                : this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(!!UTCHourOffset
                ? UTCHourOffset.toNumber()
                : this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatTime: {
        value: function formatTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${clamp24HoursTo12Hours(dateb.getUTCHours())
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${includeMs
                ? `.${dateb
                    .getUTCMilliseconds()
                    .toString()
                    .padStart(3, "0")}`
                : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset
                ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}`
                : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDateTime: {
        value: function formatDateTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateb.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCDate()
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCFullYear()
                .toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours())
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${includeMs
                ? `.${dateb
                    .getUTCMilliseconds()
                    .toString()
                    .padStart(3, "0")}`
                : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset
                ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}`
                : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDate: {
        value: function formatDate(timeZoneOffset = this.timezone ?? config.system.timeZone, includeTimeZoneOffset = false) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateb.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCDate()
                .toString()
                .padStart(2, "0")}/${dateb.getUTCFullYear().toString()}${includeTimeZoneOffset
                ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}`
                : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=Date.js.map