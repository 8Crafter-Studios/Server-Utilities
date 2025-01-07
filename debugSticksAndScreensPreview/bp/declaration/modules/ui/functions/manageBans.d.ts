import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Manages the bans for a given source entity. This function displays a UI for managing bans,
 * including viewing valid and expired bans, adding new bans by ID or name, and unbanning players.
 *
 * @param sourceEntitya - The entity that is invoking the manage bans function. This can be an Entity, executeCommandPlayerW, or Player.
 *
 * @returns A promise that resolves to one of the following values:
 * - `1` if the operation was successful or canceled by the user.
 * - `0` if the user does not have the required permissions.
 * - `-2` if an error occurred during the operation.
 */
export declare function manageBans(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2>;
