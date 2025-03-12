import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays and handles the TPA System Settings form for the given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission. If the player lacks this permission, an access denied message is shown.
 *
 * The form includes options to enable/disable the TPA system and set the timeout duration for TPA requests.
 *
 * @example
 * ```typescript
 * if((await tpaSettings(player)) === 1){
 *     continue;
 * }else{
 *     return 0;
 * };
 * ```
 */
export declare function tpaSettings(sourceEntity: loosePlayerType): Promise<0 | 1>;
