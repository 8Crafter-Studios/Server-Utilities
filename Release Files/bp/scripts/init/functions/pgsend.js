/**
 * Sends a JSON-formatted message to a player with formatting.
 *
 * @param {Player | executeCommandPlayerW} player - The player to whom the message will be sent. Can be a `Player` or `executeCommandPlayerW` instance.
 * @param {any} value - The value to be serialized into a JSON string and sent as a message.
 * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
 *
 * @remarks
 * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
 * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
 * The resulting JSON string is then sent as a message to the specified player.
 */
export function pgsend(player, value, space) {
    player.sendMessage(tryget(() => JSONB.stringify(Object.defineProperties({}, Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(value)).map((d) => [d[0], { ...d[1], enumerable: true }]))), undefined, space, {
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
        }));
}
Object.defineProperty(globalThis, "pgsend", {
    value: pgsend,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=pgsend.js.map