import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Shows the manage warps UI to the player.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Checks if the warps system is enabled.
 * 4. Shows the manage warps UI to the player.
 * 5. Handles the player's response to the UI, and calls the function according to the response.
 */
export declare function manageWarps(sourceEntity: loosePlayerType): Promise<0 | 1>;
