import { world } from "@minecraft/server";
/**
 * Sends a JSON-formatted message to every player with formatting and colorization.
 *
 * @param {any} value - The value to be serialized into a JSON string and sent as a message.
 * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
 * @param {Parameters<typeof colorizeJSONString>[1]} [options] - Optional. Additional options for colorizing the JSON string. These options are passed to the `colorizeJSONString` function.
 *
 * @remarks
 * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
 * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
 * The resulting JSON string is then colorized and sent as a message to every player.
 */
export function gcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(tryget(() => JSONB.stringify(Object.defineProperties({}, Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(value)).map((d) => [d[0], { ...d[1], enumerable: true }]))), undefined, space, {
        bigint: true,
        class: false,
        function: true,
        Infinity: true,
        get: true,
        NaN: true,
        NegativeInfinity: true,
        set: true,
        undefined: true,
    })) ??
        JSONB.stringify(value, undefined, space, {
            bigint: true,
            class: false,
            function: true,
            Infinity: true,
            get: true,
            NaN: true,
            NegativeInfinity: true,
            set: true,
            undefined: true,
        }), options));
}
;
Object.defineProperty(globalThis, 'gcsend', {
    value: gcsend,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=gcsend.js.map