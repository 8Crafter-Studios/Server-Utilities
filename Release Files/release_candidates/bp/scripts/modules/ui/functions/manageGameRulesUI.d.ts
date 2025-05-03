import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Manages the game rules UI for a given source entity.
 *
 * @param sourceEntitya - The source entity which can be of type Entity, executeCommandPlayerW, or Player.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or if the user canceled the form.
 * - `0` if the user does not have permission to access the menu.
 * - `-2` if an error occurred during the operation.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, shows an access denied message and returns `0` or `1` based on user selection.
 * 4. If the player has permission, displays a form to manage game rules.
 * 5. The form allows the user to modify game rules, either as text fields for numeric values or toggles for boolean values.
 * 6. Submits the form and updates the game rules based on user input.
 * 7. Handles any errors that occur during the form submission and updates.
 */
export declare function manageGameRulesUI(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | -2 | 0>;
