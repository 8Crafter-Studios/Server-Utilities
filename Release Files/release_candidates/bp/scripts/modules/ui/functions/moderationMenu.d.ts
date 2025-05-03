import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays and handles the moderation menu for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the UI.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI.
 * 5. Returns the appropriate status code based on the outcome.
 */
export declare function moderationMenu(sourceEntity: loosePlayerType): Promise<-2 | 0 | 1>;
