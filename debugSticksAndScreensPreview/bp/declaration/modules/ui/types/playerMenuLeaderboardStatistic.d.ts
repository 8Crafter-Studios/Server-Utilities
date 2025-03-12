import type { ObjectiveSortOrder } from "@minecraft/server";
import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { ReplaceTypeOfKey } from "modules/utilities/functions/filterProperties";
/**
 * Represents a leaderboard statistic in the player menu.
 *
 * @template T - The type of the leaderboard statistic, which can be "built-in", "custom", or "customAdvanced".
 *
 * @property {string} id - The unique identifier for the statistic.
 * @property {string} buttonDisplayName - The display name for the button associated with this statistic.
 * @property {string} [buttonIcon] - The optional icon for the button associated with this statistic.
 * @property {string} menuTitle - The title of the menu where this statistic is displayed.
 * @property {string} statsListDisplayName - The display name for the statistic in the stats list.
 * @property {T extends "custom" ? "bigint" : "string" | "number" | "bigint"} valueType - The type of value for the statistic, which varies based on the type of statistic.
 * @property {Object} displayOptions - Options for displaying the statistic.
 * @property {(value: string) => string} [displayOptions.valueDisplayTransformer_statsList] - A function to transform the value for display in the stats list.
 * @property {(value: string) => string} [displayOptions.valueDisplayTransformer_button] - A function to transform the value for display on the button.
 * @property {boolean} [displayOptions.addCommaSeparators=true] - Whether to add comma separators to the value when displayed.
 * @property {boolean} [displayOptions.prefixWithDollarSign=false] - Whether to prefix the value with a dollar sign when displayed.
 * @property {number} [displayOptions.toFixed] - The number of decimal places to display.
 * @property {string} [displayOptions.valueDisplayColor] - The color to use for displaying the value.
 *
 * @property {string} type - The type of the statistic, which can be "built-in", "custom", or "customAdvanced".
 * @property {(a: string, b: string) => number} sorter - The function to sort the statistics.
 * @property {string} [scoreboardObjective] - The scoreboard objective for custom statistics.
 * @property {"function" | "order"} [sortType] - The type of sorting for customAdvanced statistics.
 * @property {(player: savedPlayer) => string | undefined} [getterFunction] - The function to get the score for a savedPlayer instance.
 */
export interface playerMenuLeaderboardStatistic<T extends "built-in" | "custom" | "customAdvanced", SortType extends "function" | "order" | never = "function" | "order"> {
    /**
     * The type of the statistic, which can be "built-in", "custom", or "customAdvanced".
     */
    type: T;
    /**
     * The unique identifier for the statistic.
     */
    id: string;
    /**
     * The display name for the button associated with this statistic.
     */
    buttonDisplayName: string;
    /**
     * The optional icon for the button associated with this statistic.
     */
    buttonIcon?: string;
    /**
     * The title of the menu where this statistic is displayed.
     */
    menuTitle: string;
    /**
     * The display name for the statistic in the stats list.
     */
    statsListDisplayName: string;
    /**
     * The type of value for the statistic, which varies based on the type of statistic.
     */
    valueType: T extends "built-in" | "customAdvanced" ? "string" | "number" | "bigint" : "bigint";
    displayOptions: {
        /**
         * A function to transform the value for display in the stats list.
         */
        valueDisplayTransformer_statsList?: (value: string) => string;
        /**
         * A function to transform the value for display on the button.
         */
        valueDisplayTransformer_button?: (value: string) => string;
        /**
         * Whether to add comma separators to the value when displayed.
         *
         * @default true
         */
        addCommaSeparators?: boolean;
        /**
         * A currency symbol to prefix the displayed value with.
         *
         * @default ""
         */
        currencyPrefix?: string;
        /**
         * The number of decimal places to display.
         */
        toFixed?: number;
        /**
         * The color to use for displaying the value.
         */
        valueDisplayColor?: string;
    };
    /**
     * The function that gets the score for a savedPlayer instance for this leaderboard statistic.
     * @param player The savedPlayer instance for the player to get the score for.
     * @returns A string representing the value of the player's score, or undefined, which will exclude the player from the scoreboard.
     */
    getterFunction?: T extends "customAdvanced" | "built-in" ? (player: savedPlayer) => string | undefined : undefined;
    /**
     * The type of sorting for customAdvanced statistics, which must be either "function" or "order".
     */
    sortType?: SortType;
    /**
     * If the type is "built-in" then the function to sort the statistics.
     * If the type is "custom" then the order in which to sort the statistics.
     * If the type is "customAdvanced" and the sortType is "function" then the function to sort the statistics.
     * If the type is "customAdvanced" and the sortType is "order" then the order in which to sort the statistics.
     */
    sorter: T extends "built-in" ? (a: string, b: string) => number : T extends "customAdvanced" ? SortType extends "function" ? (a: string, b: string) => number : ObjectiveSortOrder : ObjectiveSortOrder;
    /**
     * The scoreboard objective for custom statistics.
     */
    scoreboardObjective?: T extends "custom" ? string : undefined;
}
export type playerMenuLeaderboardStatistic_JSONB<T extends "built-in" | "custom" | "customAdvanced", SortType extends T extends "customAdvanced" ? "function" | "order" : never = T extends "customAdvanced" ? "function" | "order" : never> = T extends "built-in" | "customAdvanced" ? ReplaceTypeOfKey<ReplaceTypeOfKey<playerMenuLeaderboardStatistic<T>, ["valueDisplayTransformer_button", "valueDisplayTransformer_statsList", T extends "built-in" | "customAdvanced" ? "getterFunction" : never], string>, "sorter", T extends "built-in" ? string : SortType extends "function" ? string : ObjectiveSortOrder> : ReplaceTypeOfKey<playerMenuLeaderboardStatistic<T>, ["valueDisplayTransformer_button", "valueDisplayTransformer_statsList", T extends "built-in" | "customAdvanced" ? "getterFunction" : never], string>;
