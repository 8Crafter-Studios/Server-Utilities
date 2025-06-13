import type { Player, Entity } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Gets the help page for a built-in command, with even more extra debug information.
 *
 * @param {string} commandName The name of the command to get the help page for.
 * @param {loosePlayerType} [player] The player to check permissions for. If not specified, no permission check will be performed.
 * @returns {string} The help page for the command, or if the command does not exist, an instructional error message.
 */
export declare function getCommandHelpPageDebugPlus(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing?: number): string;
