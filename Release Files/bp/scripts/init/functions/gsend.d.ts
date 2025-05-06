/**
 * Sends a JSON-formatted message to every player with formatting.
 *
 * @param {any} value - The value to be serialized into a JSON string and sent as a message.
 * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
 *
 * @remarks
 * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
 * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
 * The resulting JSON string is then sent as a message to every player.
 */
export declare function gsend(value: any, space?: string | number): void;
declare global {
    /**
     * Sends a JSON-formatted message to every player with formatting.
     *
     * @param {any} value - The value to be serialized into a JSON string and sent as a message.
     * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
     *
     * @remarks
     * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
     * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
     * The resulting JSON string is then sent as a message to every player.
     */
    function gsend(value: any, space?: string | number): void;
}
