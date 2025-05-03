import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays and handles the security settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function securitySettings(sourceEntity: loosePlayerType): Promise<-2 | 0 | 1>;
/**
 * Displays and handles the settings section of the security settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function securitySettings_settingsSelection(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * Displays and handles the players with permissions form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, gives an error that it is disabled when Ultra Security Mode is on, otherwise displays the UI settings form.
 * 3. Updates the configuration based on the form input.
 * 4. Returns the appropriate status code based on the outcome.
 */
export declare function securitySettings_playersWithPermissions(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * @todo Convert this to the new manage players UI style.
 */
export declare function securitySettings_playersWithPermissions_permission(sourceEntitya: Entity | executeCommandPlayerW | Player, permission: [permissionKey: keyof savedPlayer["playerPermissions"], permissionValue: any], pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
export declare function securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * @todo Convert this to the new manage players UI style.
 */
export declare function securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntitya: Entity | executeCommandPlayerW | Player, permission: permissionType, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
/**
 * @todo Convert this to the new manage players UI style.
 */
export declare function securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
