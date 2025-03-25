import { Player, type Entity } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare const customAreaCategoryIDPlaceholders: ["noTrapdoorFlippingArea", "spawn", "noChatZone", "indestructableGlassArea"];
/**
 * Creates a new custom area category for protected areas.
 *
 * @param {executeCommandPlayerW | Entity | Player} sourceEntitya The source entity, which can be an instance of `executeCommandPlayerW`, `Entity`, or `Player`.
 * @returns A promise that resolves to a number indicating the result of the operation.
 *
 * @throws {TypeError} If the number of arguments is incorrect or if the provided entity is not a valid `Player`.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Displays a form to the player to input the category ID and icon path.
 * 4. Validates the uniqueness of the category ID and prompts the player to overwrite if a duplicate is found.
 * 5. Saves the new category.
 * 6. Calls `editCustomAreaCategory` to allow further editing of the newly created category.
 */
export declare function newCustomAreaCategory(sourceEntitya: executeCommandPlayerW | Entity | Player): Promise<0 | 1>;
