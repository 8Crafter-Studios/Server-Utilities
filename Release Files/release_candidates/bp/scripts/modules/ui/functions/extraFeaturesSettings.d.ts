import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays the Extra Features Settings menu to the specified player or entity.
 *
 * @param sourceEntitya - The entity or player to whom the settings menu will be shown. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player chooses to close the menu,
 * - `1` if the player navigates back or cancels the form.
 *
 * The function first checks if ultra security mode is enabled and if the player has the necessary permissions to access the settings menu. If the player lacks the required permissions, an access denied message is shown. Otherwise, the Extra Features Settings menu is displayed, allowing the player to navigate through different settings options.
 */
export declare function extraFeaturesSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
