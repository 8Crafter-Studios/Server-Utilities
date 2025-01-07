import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Configures and displays the anti-spam settings form to the specified player or entity.
 *
 * @param sourceEntitya - The entity or player requesting the anti-spam settings. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully shown and handled.
 * - `0` if the user canceled the form.
 * - `-2` if an error occurred.
 *
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
export declare function antispamSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | -2 | 0>;
