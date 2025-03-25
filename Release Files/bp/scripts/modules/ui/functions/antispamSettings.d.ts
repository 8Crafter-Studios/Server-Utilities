import "init/classes/config";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Configures and displays the anti-spam settings form to the specified player.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and if the player has the required permission to access the settings.
 * 2. If the player lacks permission, shows an access denied message.
 * 3. Creates and configures a modal form for anti-spam settings.
 * 4. Displays the form to the player and processes the form response.
 * 5. Updates the configuration based on the form input.
 *
 * The form includes the following settings:
 * - Toggle for enabling/disabling anti-spam.
 * - Toggle for resetting the anti-spam mute timer upon attempted message send while muted.
 * - Text field for setting the wait time before a player can send another chat message.
 * - Text field for setting the maximum time between messages to trigger anti-spam.
 * - Slider for setting the message count to trigger anti-spam.
 */
export declare function antispamSettings(sourceEntity: loosePlayerType): Promise<0 | 1>;
