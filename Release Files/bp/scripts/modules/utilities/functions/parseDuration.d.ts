/**
 * Parses a duration string and converts it to milliseconds.
 *
 * The duration string can contain multiple time units, such as "1h 30m" or "2 days 3 hours".
 * Supported time units are:
 * - ms, s, sec, secs, second, seconds
 * - m, min, mins, minute, minutes
 * - h, hr, hrs, hour, hours
 * - d, day, days
 * - w, wk, wks, week, weeks
 * - mo, month, months
 * - y, yr, yrs, year, years
 *
 * @param {string} durationString - The duration string to parse.
 * @returns {number} The total duration in milliseconds.
 * @throws {SyntaxError} Throws a syntax error if an unknown time unit is encountered.
 * @throws {SyntaxError} Throws a syntax error if no valid duration is found inside of the duration string.
 */
export declare function parseDuration(durationString: string): number;
export declare function parseDurationRelative(durationString: string, relativeTo?: number): number;
export declare function formatDuration(startTime: number, endTime: number, options?: {
    includeMilliseconds?: boolean;
}): string;
export declare function formatDuration_compact(startTime: number, endTime: number, options?: {
    includeMilliseconds?: boolean;
}): string;
