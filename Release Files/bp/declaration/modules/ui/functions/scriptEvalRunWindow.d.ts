import { Player, type Entity } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays a modal form to the player for evaluating and running a script.
 *
 * @param sourceEntitya - The entity that initiated the script evaluation. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to `0` if the previous menu should not be re-opened, or `1` if the previous menu should be re-opened.
 * @throws {TypeError} If the provided `sourceEntitya` is not an instance of `Player` or `executeCommandPlayerW` with a linked `Player`.
 */
export declare function scriptEvalRunWindow(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
