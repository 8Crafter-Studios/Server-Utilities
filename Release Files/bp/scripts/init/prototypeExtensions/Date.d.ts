declare global {
    interface Date {
        /**
         * The timezone, specified as the hours offset from UTC.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number;
        /**
         * Sets the timezone property of this Date object.
         *
         * @param timezone The timezone, specified as the hours offset from UTC.
         * @returns This Date object.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.1
         */
        toTimezone(timezone?: number | string | boolean | null | undefined): this;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneDateTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneDate(timezone?: number | string | boolean | null | undefined, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.2
         */
        formatTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.2
         */
        formatDateTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        formatDate(timeZoneOffset?: number, includeTimeZoneOffset?: boolean): string;
        /**
         * Converts a date to a Minecraft time of day value.
         *
         * @param UTCHourOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param floor Whether to floor the time of day to an integer. Defaults to `true`.
         * @returns An integer representing the time of day in Minecraft, between 0 (inclusive) and 24000 (exclusive).
         *
         * @since 1.41.0-preview.20+BUILD.1
         * @version 1.0.0
         */
        toTimeOfDay(UTCHourOffset?: string | number | boolean | null | undefined, floor?: boolean): number;
    }
    interface DateConstructor {
        /**
         * Creates a new Date object from a Minecraft time of day value.
         *
         * @param timeOfDay The time of day in Minecraft, between 0 (inclusive) and 24000 (exclusive).
         * @param baseTime The base date to use for the conversion. If not provided, the current date will be used.
         * @param UTCHourOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @returns A new Date object representing the time of day in Minecraft.
         *
         * @since 1.41.0-preview.20+BUILD.1
         * @version 1.0.0
         */
        fromTimeOfDay(timeOfDay: number, baseTime?: Date | number, UTCHourOffset?: string | number | boolean | null | undefined): Date;
    }
}
export {};
