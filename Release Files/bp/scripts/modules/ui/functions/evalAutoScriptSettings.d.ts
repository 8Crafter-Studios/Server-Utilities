import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Evaluates and displays the auto script settings form to the specified entity.
 *
 * @todo Replace this menu with an action form with buttons for each of the script dynamic properties, allowing the player to edit them directly.
 *
 * @param sourceEntitya - The entity that will receive the form. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully shown and processed.
 * - `0` if the form was canceled by the user.
 * - `-2` if an error occurred during the process.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and verifies the player's permission to access the settings.
 * 2. Constructs a form with multiple text fields for various script API codes.
 * 3. Displays the form to the player and processes the input values.
 * 4. Updates the dynamic properties of the world based on the input values.
 *
 * @throws Will log an error and return `-2` if an exception occurs during form processing.
 */
export declare function evalAutoScriptSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
