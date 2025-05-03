import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Sends a JSON-formatted message to a player with formatting and colorization.
 *
 * @param {Player | executeCommandPlayerW} player - The player to whom the message will be sent. Can be a `Player` or `executeCommandPlayerW` instance.
 * @param {any} value - The value to be serialized into a JSON string and sent as a message.
 * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
 * @param {Parameters<typeof colorizeJSONString>[1]} [options] - Optional. Additional options for colorizing the JSON string. These options are passed to the `colorizeJSONString` function.
 *
 * @remarks
 * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
 * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
 * The resulting JSON string is then colorized and sent as a message to the specified player.
 */
export declare function pgcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
declare global {
    /**
     * Sends a JSON-formatted message to a player with formatting and colorization.
     *
     * @param {Player | executeCommandPlayerW} player - The player to whom the message will be sent. Can be a `Player` or `executeCommandPlayerW` instance.
     * @param {any} value - The value to be serialized into a JSON string and sent as a message.
     * @param {string|number} [space] - Optional. Specifies the number of spaces or a string to use for indentation in the JSON output.
     * @param {Parameters<typeof colorizeJSONString>[1]} [options] - Optional. Additional options for colorizing the JSON string. These options are passed to the `colorizeJSONString` function.
     *
     * @remarks
     * The function attempts to serialize the `value` into a JSON string after making all of its properties enumerable. It uses the {@link JSONB} library which provides custom handling for various data types
     * (e.g., `bigint`, `Infinity`, `NaN`, etc.). If the serialization fails, it falls back to not make the properties enumerable.
     * The resulting JSON string is then colorized and sent as a message to the specified player.
     */
    function pgcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
}
