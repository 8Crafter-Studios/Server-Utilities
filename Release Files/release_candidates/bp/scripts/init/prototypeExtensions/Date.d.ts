declare global {
    interface Date {
        /**
         * The timezone, specified as the hours offset from UTC.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number;
        /**
         * Sets the timezone property of this Date object.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        toTimezone(timezone?: number | string | boolean | null | undefined): this;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDateTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDate(timezone?: number | string | boolean | null | undefined, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatDateTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        formatDate(timeZoneOffset?: number, includeTimeZoneOffset?: boolean): string;
    }
}
export {};
