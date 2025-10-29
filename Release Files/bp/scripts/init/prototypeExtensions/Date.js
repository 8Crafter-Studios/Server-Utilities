/**
 * init/prototypeExtensions/Date.ts
 * This requires that {@link module:init/prototypeExtensions/Number} be imported first.
 * @requires init/prototypeExtensions/Number
 * @module
 * @description This file adds some useful functions and properties to the `Date` prototype.
 */
import { TimeOfDay, world } from "@minecraft/server";
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
            this.timezone = UTCHourOffset?.toNumber() ?? config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDate: {
        value: function (UTCHourOffset, includeTimeZoneOffset = false) {
            return this.formatDate(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDateTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneTime: {
        value: function (UTCHourOffset, includeMs = false, includeTimeZoneOffset = false) {
            return this.formatDateTime(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatTime: {
        value: function formatTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${clamp24HoursTo12Hours(dateB.getUTCHours()).toString().padStart(2, "0")}:${dateB.getUTCMinutes().toString().padStart(2, "0")}:${dateB
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${includeMs ? `.${dateB.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateB.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDateTime: {
        value: function formatDateTime(timeZoneOffset = this.timezone ?? config.system.timeZone, includeMs = false, includeTimeZoneOffset = false) {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateB.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateB.getUTCDate().toString().padStart(2, "0")}/${dateB
                .getUTCFullYear()
                .toString()} ${clamp24HoursTo12Hours(dateB.getUTCHours()).toString().padStart(2, "0")}:${dateB
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateB.getUTCSeconds().toString().padStart(2, "0")}${includeMs ? `.${dateB.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateB.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDate: {
        value: function formatDate(timeZoneOffset = this.timezone ?? config.system.timeZone, includeTimeZoneOffset = false) {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateB.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateB.getUTCDate().toString().padStart(2, "0")}/${dateB
                .getUTCFullYear()
                .toString()}${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimeOfDay: {
        value: function toTimeOfDay(UTCHourOffset, floor = true) {
            const dateB = new Date(this.valueOf() + ((UTCHourOffset ?? this.timezone ?? config.system.timeZone)?.toNumber() ?? 0) * 3600000);
            const dateC = new Date(1970, 0, 1, 
            // Subtract 6 from the hours because a time of day of 0 in Minecraft is 6 AM.
            twoWayModulo(dateB.getUTCHours() - 6, 24), dateB.getUTCMinutes(), dateB.getUTCSeconds(), dateB.getUTCMilliseconds());
            const timeOfDay = dateC.valueOf() / 3600;
            return floor ? Math.floor(timeOfDay) : timeOfDay;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
Object.defineProperties(Date, {
    fromTimeOfDay: {
        value: function fromTimeOfDay(timeOfDay, baseTime = Date.now(), UTCHourOffset) {
            const timeOfDayMs = timeOfDay * 3600;
            return new Date(baseTime.valueOf() -
                // Reset base time to the start of the day.
                Math.abs(baseTime.valueOf() % 86400000) +
                // Apply the time of day offset.
                timeOfDayMs +
                // Apply the UTC hour offset.
                (UTCHourOffset?.toNumber() ?? config.system.timeZone) * 3600000);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=Date.js.map