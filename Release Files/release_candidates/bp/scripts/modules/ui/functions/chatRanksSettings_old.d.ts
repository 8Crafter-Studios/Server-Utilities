import "init/classes/config";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays and handles the chat ranks settings form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
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
 */
export declare function chatRanksSettings_old(sourceEntity: loosePlayerType): Promise<0 | 1>;
