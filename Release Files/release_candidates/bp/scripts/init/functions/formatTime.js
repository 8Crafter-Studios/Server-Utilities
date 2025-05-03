/**
 * Formats a date object to a time string formatted as 12:37:01 PM.
 * @since 1.18.2-development.3
 * @version 1.1.1
 */
globalThis.formatTime = function formatTime(date, timeZoneOffset = 0, includeMs = false) {
    const dateb = new Date(date.valueOf() + timeZoneOffset * 3600000);
    return `${clamp24HoursTo12Hours(dateb.getUTCHours())
        .toString()
        .padStart(2, "0")}:${dateb
        .getUTCMinutes()
        .toString()
        .padStart(2, "0")}:${dateb
        .getUTCSeconds()
        .toString()
        .padStart(2, "0")}${includeMs
        ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`
        : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`;
};
import "init/meta/importToMakeValidModule";
//# sourceMappingURL=formatTime.js.map