import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Gets the help page for a custom command, with extra debug information.
 *
 * @param {string} commandName The name of the command to get the help page for.
 * @param {loosePlayerType} [player] The player to check permissions for. If not specified, no permission check will be performed.
 * @returns {string} The help page for the command, or if the command does not exist, an instructional error message.
 */
export declare function getCommandHelpPageCustomDebug(commandName: string, player?: loosePlayerType, spacing?: number): string;
