import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { defaultPlayerMenuLeaderboardStatistics } from "../constants/defaultPlayerMenuLeaderboardStatistics";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(sourceEntity: loosePlayerType): Promise<0 | 1>;
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards_addLeaderboard(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics_addStatistic(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_statistic(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: (typeof defaultPlayerMenuLeaderboardStatistics)[number]): Promise<0 | 1>;
/**
 * Displays and handles the edit built-in statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_editStatistic(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: (typeof defaultPlayerMenuLeaderboardStatistics)[number]): Promise<1 | 0>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">): Promise<0 | 1>;
/**
 * Displays and handles the custom statistic formatting options form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticFormattingOptions(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">): Promise<1 | 0>;
/**
 * Displays and handles the edit custom statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatistic(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">): Promise<1 | 0>;
/**
 * Displays and handles the advanced statistic options form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticAdvancedOptions(sourceEntitya: Entity | executeCommandPlayerW | Player, statistic: playerMenuLeaderboardStatistic<"customAdvanced">): Promise<1 | 0>;
/**
 * Displays and handles the new statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export declare function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_newStatistic(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0>;
