import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays the Money System Settings UI and handles user interactions.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the user canceled the operation.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred during the operation.
 */
export declare function moneySystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
