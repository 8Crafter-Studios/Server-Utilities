import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays and handles the chat ranks settings form for a given player or entity.
 *
 * @param sourceEntitya - The entity or player to display the form to. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player cancels the form,
 * - `1` if the form is successfully submitted.
 *
 * The form allows the user to configure various chat rank settings such as:
 * - Rank style/mode
 * - Rank display prefix and suffix
 * - Name display prefix and suffix
 * - Chat name and message separator
 * - Rank display separator
 * - Rank template string
 * - Message template string
 * - Default rank template string for players with no rank
 * - Default message formatting
 * - Default name formatting
 * - Default separator formatting
 * - Disabling custom chat messages
 * - Allowing custom chat messages muting
 * - Auto escaping chat messages
 * - Auto URI escaping chat messages
 * - Allowing chat escape codes
 * - Displaying timestamps in chat
 * - Showing ranks on player name tags
 *
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the required permission to access the settings. If not, an access denied message is shown.
 *
 * The function uses `world.getDynamicProperty` to get the current settings and `world.setDynamicProperty` to save the updated settings.
 *
 * @throws Will log an error and return `-2` if an exception occurs during form submission.
 */
export declare function chatRanksSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
