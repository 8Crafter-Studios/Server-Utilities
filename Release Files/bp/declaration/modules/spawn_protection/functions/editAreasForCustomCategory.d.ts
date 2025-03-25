import { ProtectedAreas } from "init/variables/protectedAreaVariables";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * A function that shows a menu of all protected areas for a given custom category. The menu has buttons for each protected area, and a button to add a new protected area.
 * @todo Make this menu have pages.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {string} prefix The custom category to show the protected areas for.
 * @returns {Promise<0 | 1>} A promise that resolves to 0 or 1. If the promise resolves to 0, the previous menu should closed. If the promise resolves to 1, the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function editAreasForCustomCategory(sourceEntity: loosePlayerType, prefix: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
/**
 * Shows a menu for managing a single protected area.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {string} areaID The identifier name of the protected area.
 * @param {string} prefix A prefix for the advanced protected area category.
 * @returns {Promise<0 | 1>} A promise that resolves to one of two values: 0 or 1. 0 means the previous menu should be closed. 1 means the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageAreaForCustomCategory(sourceEntity: loosePlayerType, areaID: string, prefix: string): Promise<0 | 1>;
/**
 * Edits a protected area for a specified custom category.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {string} areaID - The identifier for the area to be edited.
 * @param {string} prefix - The prefix associated with the custom category.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * This function presents a form to the player allowing them to edit the coordinates, dimension, mode, and optional icon path of a protected area.
 *
 * Updates the protected area details based on user input and saves the changes.
 *
 * Handles errors by displaying a message to the player.
 */
export declare function editAreaForCustomCategory(sourceEntity: loosePlayerType, areaID: string, prefix: string): Promise<0 | 1>;
