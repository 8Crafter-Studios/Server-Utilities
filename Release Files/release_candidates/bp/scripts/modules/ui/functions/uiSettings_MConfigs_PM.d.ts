import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the player menu settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu(sourceEntity: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
