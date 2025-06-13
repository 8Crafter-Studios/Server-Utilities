import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Manages the commands UI for a given source entity.
 *
 * @todo update this function to use the new async ui system
 * @param sourceEntitya - The source entity which can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to a number indicating the result of the operation.
 *
 * This function performs the following tasks:
 * - Checks if ultra security mode is enabled and verifies if the player has the necessary permissions to access the manage commands UI.
 * - Displays a form to manage commands, including built-in and custom commands.
 * - Allows adding, editing, and deleting custom commands.
 * - Provides detailed information and settings for each command.
 * - Handles various user interactions with the UI, such as confirming deletions and saving changes.
 */
export declare function manageCommands(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | undefined>;
