import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the world border settings form for a specified dimension.
 *
 * @param sourceEntitya - The entity or player who initiated the request.
 * @param dimension - The dimension for which the world border settings are to be displayed (0: Overworld, 1: Nether, 2: The End). Default is 0.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully submitted or the user canceled the form.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred.
 */
export declare function worldBorderSettings(sourceEntitya: Entity | executeCommandPlayerW | Player, dimension?: number): Promise<1 | 0 | -2>;
