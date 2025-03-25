/**
 * Formats a date object to a date string formatted as 07/21/2024.
 * @since 1.26.0-preview.20+BUILD.2
 * @version 1.0.0
 */
globalThis.formatDate = function formatDate(date, timeZoneOffset = 0) {
    const dateb = new Date(date.valueOf() + timeZoneOffset * 3600000);
    return `${(dateb.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateb
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${dateb.getUTCFullYear().toString()}`;
};
import "init/meta/importToMakeValidModule";
//# sourceMappingURL=formatDate.js.map