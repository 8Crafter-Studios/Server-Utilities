import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays a dimension selector form for world border settings to the specified entity.
 *
 * @param sourceEntitya - The entity to which the form will be shown. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the user cancels the form or selects "Back".
 * - `0` if the user completes the form without issues.
 * - `-2` if an error occurs.
 *
 * The function first checks if ultra security mode is enabled and if the player has the required permission to access the settings.
 * If the player does not have the required permission, an access denied message is shown.
 *
 * The form allows the user to select between "Overworld", "Nether", "The End", and "Back".
 * If the user selects a dimension, the `worldBorderSettings` function is called with the selected dimension.
 * If the user selects "Back" or cancels the form, the function returns `1`.
 * If an error occurs, the function returns `-2`.
 */
export declare function worldBorderSettingsDimensionSelector(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
