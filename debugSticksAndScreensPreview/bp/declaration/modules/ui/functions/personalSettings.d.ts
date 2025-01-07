import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the personal settings form for a player.
 *
 * @param sourceEntitya - The entity or player invoking the settings. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the user cancels the form,
 * - `1` if the form is successfully submitted.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and if the player has the necessary permissions to access the settings.
 * 2. Displays a modal form with various personal settings fields.
 * 3. Handles the form submission, updating the player's dynamic properties based on the form values.
 * 4. Returns the appropriate status code based on the outcome.
 */
export declare function personalSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
