import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Opens the player menu.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0>} A promise that resolves to `0` once the player menu has been closed.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function playerMenu(sourceEntity: loosePlayerType): Promise<0>;
