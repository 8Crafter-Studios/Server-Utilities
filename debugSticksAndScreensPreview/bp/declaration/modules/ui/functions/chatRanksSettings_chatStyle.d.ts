import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays and handles the select chat style mode form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function chatRanksSettings_chatStyle(sourceEntity: loosePlayerType): Promise<0 | 1>;
