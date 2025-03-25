import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the script settings form for the given entity.
 *
 * @param sourceEntitya - The entity that is requesting the script settings. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully submitted or access was denied and the user chose to go back.
 * - `0` if access was denied and the user chose to cancel.
 * - `-2` if an error occurred.
 *
 * The form includes various settings related to script behavior, such as refresh rates for player data, protected areas, and banned players,
 * as well as options for logging, debug mode, and undo history storage.
 *
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission.
 * If the player does not have the required permission, an access denied message is shown.
 *
 * The form dynamically adjusts based on whether debug mode is enabled, showing additional debug-related settings if it is.
 *
 * The function uses `forceShow` to display the form and handle the response, updating the configuration based on the user's input.
 */
export declare function scriptSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
