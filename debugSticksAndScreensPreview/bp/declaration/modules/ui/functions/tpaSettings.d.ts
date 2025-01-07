import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the TPA System Settings form for the given entity.
 *
 * @param sourceEntitya - The entity for which the settings form is displayed. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully handled or canceled.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred while handling the form.
 *
 * @remarks
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission. If the player lacks this permission, an access denied message is shown.
 *
 * The form includes options to enable/disable the TPA system and set the timeout duration for TPA requests.
 *
 * @example
 * ```typescript
 * const result = await tpaSettings(player);
 * if (result === 1) {
 *     console.log("Settings updated or form canceled.");
 * } else if (result === 0) {
 *     console.log("Access denied.");
 * } else {
 *     console.error("An error occurred.");
 * }
 * ```
 */
export declare function tpaSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
