import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the UI settings form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message.
 * - `-2` if an error occurred.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
