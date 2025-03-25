import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays a modal form to the player for running a command with an optional delay.
 *
 * @param sourceEntitya - The entity that will receive the form. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to `0` if the previous menu should not be re-opened, or `1` if the previous menu should be re-opened.
 * @throws {TypeError} If the provided entity is not an instance of `Player` or `executeCommandPlayerW` with a linked `Player`.
 */
export declare function terminal(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
