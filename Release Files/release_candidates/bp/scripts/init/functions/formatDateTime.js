/**
 * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM.
 * @since 1.18.2-development.10
 * @version 1.1.1
 * @param {Date} date - The date object to format.
 * @param {number} [timeZoneOffset=0] - The time zone offset in minutes. Default is 0 (UTC).
 * @param {boolean} [includeMs=false] - Whether to include milliseconds in the formatted string. Default is false.
 * @returns {string} The formatted date time string.
 */
globalThis.formatDateTime = function formatDateTime(date, timeZoneOffset = 0, includeMs = false) {
    const dateb = new Date(date.valueOf() + timeZoneOffset * 3600000);
    return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb
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
        ? `.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`
        : ""} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`;
};
import "init/meta/importToMakeValidModule";
//# sourceMappingURL=formatDateTime.js.map