import type { Block, ChatSendBeforeEvent, EffectAddBeforeEvent, GameMode } from "@minecraft/server";
import { Dimension, ExplosionBeforeEvent, ItemUseBeforeEvent, PlayerBreakBlockBeforeEvent, PlayerGameModeChangeBeforeEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityBeforeEvent, PlayerPlaceBlockBeforeEvent, type Vector3 } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
/**
 * A class that contains variables that are used for the spawn protection system.
 *
 * @deprecated This class is deprecated and will be removed in a future version. This is due to a rework of the spawn protection system. These variables are no longer used.
 */
export declare class protectedAreaVariables {
    static noPistonExtensionAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noExplosionAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockInteractAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noInteractAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static protectedAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockBreakAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockPlaceAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static advancedAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static advancedAreaTypes: {}[];
}
export interface AdvancedProtectedAreaCategory<JSONMode extends boolean = false> {
    /**
     * Whether or not this protected area category is enabled.
     * If set to false, then any areas in this category will cease to function until this is set to true.
     * If undefined, will act like it is set to true.
     */
    enabled?: boolean;
    id: string;
    icon_path?: string;
    playerPlaceBlock?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be placed by players.
         *
         * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being placed by players.
         */
        mode: "exclude" | "include";
        /**
         * The block types to allow or block.
         */
        mask: JSONMode extends true ? string : BlockMask;
        /**
         * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
         */
        rawmask?: JSONMode extends true ? undefined : string;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    playerBreakBlock?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be broken by players.
         *
         * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being broken by players.
         */
        mode: "exclude" | "include";
        /**
         * The block types to allow or block.
         */
        mask: JSONMode extends true ? string : BlockMask;
        /**
         * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
         */
        rawmask?: JSONMode extends true ? undefined : string;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    playerInteractWithBlock?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be broken by players.
         *
         * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being broken by players.
         */
        mode: "exclude" | "include";
        /**
         * The block types to allow or block.
         */
        mask: JSONMode extends true ? string : BlockMask;
        /**
         * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
         */
        rawmask?: JSONMode extends true ? undefined : string;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    playerInteractWithEntity?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A filter that determines whether or not the source entity will be affected by this area type.
         */
        targetEntityFilter: {
            /**
             * A list of entity types to block.
             *
             * Mutually exclusive with `excludeTypes`.
             */
            includeTypes?: string[];
            /**
             * A list of entity types to allow.
             *
             * Mutually exclusive with `includeTypes`.
             */
            excludeTypes?: string[];
            /**
             * A list of entity tags to block.
             *
             * Mutually exclusive with `excludeTags`.
             */
            includeTags?: string[];
            /**
             * A list of entity tags to allow.
             *
             * Mutually exclusive with `includeTags`.
             */
            excludeTags?: string[];
        };
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    itemUse?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    explosion?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * If the mode is set to `include`, then only blocks matching the specified block mask will be able to explode.
         *
         * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from exploding.
         */
        mode: "exclude" | "include";
        /**
         * The block types to allow or block.
         */
        mask: JSONMode extends true ? string : BlockMask;
        /**
         * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
         */
        rawmask?: JSONMode extends true ? undefined : string;
        /**
         * A filter that determines whether or not this area type will affect explosions with the specified source entities.
         */
        sourceEntityFilter: {
            /**
             * A list of entity types to block.
             *
             * Mutually exclusive with `excludeTypes`.
             */
            includeTypes?: string[];
            /**
             * A list of entity types to allow.
             *
             * Mutually exclusive with `includeTypes`.
             */
            excludeTypes?: string[];
            /**
             * A list of entity tags to block.
             *
             * Mutually exclusive with `excludeTags`.
             */
            includeTags?: string[];
            /**
             * A list of entity tags to allow.
             *
             * Mutually exclusive with `includeTags`.
             */
            excludeTags?: string[];
        };
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    playerGameModeChange?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
        /**
         * A list of game modes to block changing from.
         */
        fromGameModes?: GameMode[];
        /**
         * A list of game modes to block changing to.
         */
        toGameModes?: GameMode[];
        /**
         * A list of game mode from and to pairs to block.
         */
        fromGameModesToGameModes?: [fromGameMode: GameMode, toGameMode: GameMode][];
    };
    chatSend?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A list of tags that allow players to bypass this area type.
         */
        allowedBypassTags: string[];
        /**
         * Filters for held items that determine whether or not this area type will affect that player.
         */
        heldItemFilters: false | {
            /**
             * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
             *
             * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
             */
            mode: "exclude" | "include";
            /**
             * The item types to allow or block.
             */
            items: string[];
        };
    };
    effectAdd?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A filter that determines whether or not the source entity will be affected by this area type.
         */
        sourceEntityFilter: {
            /**
             * A list of entity types to block.
             *
             * Mutually exclusive with `excludeTypes`.
             */
            includeTypes?: string[];
            /**
             * A list of entity types to allow.
             *
             * Mutually exclusive with `includeTypes`.
             */
            excludeTypes?: string[];
            /**
             * A list of entity tags to block.
             *
             * Mutually exclusive with `excludeTags`.
             */
            includeTags?: string[];
            /**
             * A list of entity tags to allow.
             *
             * Mutually exclusive with `includeTags`.
             */
            excludeTags?: string[];
        };
        effectFilter?: {
            /**
             * A list of effect types to block.
             *
             * Mutually exclusive with `excludeTypes`.
             */
            includeTypes?: string[];
            /**
             * A list of effect types to allow.
             *
             * Mutually exclusive with `includeTypes`.
             */
            excludeTypes?: string[];
            /**
             * The minimum duration of the effect for this area type to be applied.
             *
             * Set it to undefined or don't set it to disable the check.
             */
            minDuration?: number;
            /**
             * The maximum duration of the effect for this area type to be applied.
             *
             * Set it to undefined or don't set it to disable the check.
             */
            maxDuration?: number;
        };
    };
    noPVPZone?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
    };
    /**
     * @todo This one is still a little bit buggy.
     */
    tagZone?: false | {
        /**
         * Whether or not this area effect is enabled.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * A list of tags to apply to entities in this area.
         */
        tags: string[];
        /**
         * Whether or not to remove all of the listed tags on exit.
         *
         * @default false
         */
        removeOnExit?: boolean;
        /**
         * @todo Disabling this is currently buggy, and possibly laggy.
         *
         * @default true
         */
        playersOnly?: boolean;
    };
}
/**
 * Default values for an enabled area category property.
 */
export declare const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults: Mutable<{
    readonly enabled: true;
    readonly id: "";
    readonly icon_path: undefined;
    readonly chatSend: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly effectAdd: {
        readonly enabled: true;
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly effectFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly minDuration: undefined;
            readonly maxDuration: undefined;
        };
    };
    readonly explosion: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
    };
    readonly playerBreakBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerInteractWithBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerInteractWithEntity: {
        readonly enabled: true;
        readonly targetEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly playerPlaceBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerGameModeChange: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly itemUse: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly noPVPZone: {
        readonly enabled: true;
    };
    readonly tagZone: {
        readonly enabled: true;
        readonly tags: [];
        readonly removeOnExit: false;
        readonly playersOnly: true;
    };
}>;
/**
 * Default values for an enabled area category property, in JSON format.
 */
export declare const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON: Mutable<{
    readonly enabled: true;
    readonly id: "";
    readonly icon_path: undefined;
    readonly chatSend: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly effectAdd: {
        readonly enabled: true;
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly effectFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly minDuration: undefined;
            readonly maxDuration: undefined;
        };
    };
    readonly explosion: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
    };
    readonly playerBreakBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerInteractWithBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerInteractWithEntity: {
        readonly enabled: true;
        readonly targetEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly playerPlaceBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerGameModeChange: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly itemUse: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly noPVPZone: {
        readonly enabled: true;
    };
    readonly tagZone: {
        readonly enabled: true;
        readonly tags: [];
        readonly removeOnExit: false;
        readonly playersOnly: true;
    };
}>;
/**
 * Converts an `AdvancedProtectedAreaCategory` object with raw mask properties to a JSON-compatible format.
 *
 * @param {AdvancedProtectedAreaCategory<false>} category - The category object to convert, which has the `rawmask` properties.
 * @returns {AdvancedProtectedAreaCategory<true>} A JSON-compatible `AdvancedProtectedAreaCategory` object with `mask` properties and without `rawmask`.
 *
 * This function processes specific properties (`playerBreakBlock`, `playerPlaceBlock`, `playerInteractWithBlock`, `explosion`)
 * by setting their `mask` to the value of `rawmask` and then removing the `rawmask` property.
 */
export declare function convertAdvancedPropertedAreaCategoryToJSON(category: AdvancedProtectedAreaCategory<false>): AdvancedProtectedAreaCategory<true>;
/**
 * Represents a protected area.
 */
export interface ProtectedArea {
    id: string;
    dimension: number;
    from: Vector3;
    to: Vector3;
    mode: 0 | 1;
    icon_path?: string;
}
/**
 * Built-in protected area categories.
 */
export declare const protectedAreaCategories: readonly ["noPistonExtensionArea", "noExplosionArea", "noBlockInteractArea", "noInteractArea", "protectedArea", "noBlockBreakArea", "noBlockPlaceArea"];
/**
 * Loads and stores protected areas.
 */
export declare class ProtectedAreas {
    /**
     * A static class containing various protected areas categorized by different types of restrictions.
     * Each category contains separate lists for the overworld, nether, and the end dimensions.
     *
     * @static
     * @memberof ProtectedAreas
     *
     * @property noPistonExtensionArea - Areas where piston extensions are not allowed.
     * @property noExplosionArea - Areas where explosions are not allowed.
     * @property noBlockInteractArea - Areas where block interactions are not allowed.
     * @property noInteractArea - Areas where interactions are not allowed.
     * @property protectedArea - General protected areas.
     * @property noBlockBreakArea - Areas where block breaking is not allowed.
     * @property noBlockPlaceArea - Areas where block placing is not allowed.
     * @property advancedArea - Advanced areas categorized by a unique ID, each containing separate lists for the overworld, nether, and the end dimensions.
     * @property advancedAreaCategories - List of advanced protected area categories.
     */
    static areas: {
        noPistonExtensionArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noExplosionArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockInteractArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noInteractArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        protectedArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockBreakArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockPlaceArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        advancedArea: {
            [advancedCategoryID: string]: {
                overworld: ProtectedArea[];
                nether: ProtectedArea[];
                the_end: ProtectedArea[];
            };
        };
        advancedAreaCategories: AdvancedProtectedAreaCategory[];
    };
    /**
     * Loads all protected areas for all built-in categories and advanced categories.
     * This should be called once on startup.
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     */
    static load(): void;
    /**
     * Loads areas for all built-in categories.
     * Iterates over each category in `protectedAreaCategories` and calls
     * `loadAreasForBuiltInCategory` for each one.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * This method is static and does not require an instance of the class to be called.
     */
    static loadAreasForAllBuiltInCategories(): void;
    /**
     * Loads all advanced categories and their respective areas.
     *
     * This method retrieves all advanced category IDs and iterates over each category.
     * For each category, it loads the advanced category and its associated areas.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * The category ID is sliced to remove the first 30 characters before loading the category and its areas.
     */
    static loadAllAdvancedCategoriesAndTheirAreas(): void;
    /**
     * Loads areas for all loaded advanced categories.
     * Iterates through each advanced area category and loads the areas associated with that category.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * This method assumes that `this.areas.advancedAreaCategories` is an array of category objects,
     * each containing an `id` property.
     */
    static loadAreasForAllLoadedAdvancedCategories(): void;
    /**
     * Loads all protected areas for the given built-in category.
     * This will upgrade old format areas to the new format.
     *
     * @static
     * @param {(typeof protectedAreaCategories)[number]} category The built-in category for which to load all protected areas.
     * @returns {void}
     * @memberof ProtectedAreas
     */
    static loadAreasForBuiltInCategory(category: (typeof protectedAreaCategories)[number]): void;
    /**
     * Loads the protected areas for a given advanced category ID.
     *
     * This method retrieves dynamic property IDs that start with the specified advanced category ID,
     * parses the properties into area objects, and categorizes them based on their dimension.
     *
     * @static
     * @param {string} advancedCategoryID - The ID of the advanced category for which to load protected areas.
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * The method performs the following steps:
     * 1. Filters dynamic property IDs that start with "advancedProtectedArea:" followed by the advanced category ID.
     * 2. Maps the filtered property IDs to area objects by extracting the ID and parsing the JSON property value.
     * 3. Ensures the `mode` property of each area object is either 0 or 1, defaulting to 0 if invalid.
     * 4. Categorizes the area objects into `overworld`, `nether`, and `the_end` based on their dimension.
     * 5. Stores the categorized areas in the `areas.advancedArea` object under the specified advanced category ID.
     *
     * The area objects have the following structure:
     * - `id`: The unique identifier of the area.
     * - `dimension`: The dimension of the area (0 for overworld, 1 for nether, 2 for the end).
     * - `from`: The starting coordinates of the area.
     * - `to`: The ending coordinates of the area.
     * - `mode`: The mode of the area (0 or 1).
     * - `icon_path` (optional): The path to the icon representing the area.
     */
    static loadAreasForAdvancedCategory(advancedCategoryID: string): void;
    /**
     * Loads an advanced protected area category by its ID.
     *
     * @static
     * @param {string} advancedCategoryID - The ID of the advanced protected area category to be loaded.
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks This function retrieves raw data for a specific advanced protected area category,
     * parses it into a structured format, and updates the internal list of advanced area categories.
     * It skips processing for properties like "id" and "icon_path" and handles raw mask data conversion.
     * If the data type is not a string, the function returns without making any updates.
     */
    static loadAdvancedCategory(advancedCategoryID: string): void;
    /**
     * Returns an array of strings representing the IDs of all advanced protected area categories.
     *
     * This function works by checking all dynamic properties on the world object and filtering for those that start with the string "advancedProtectedAreaCategory:".
     *
     * @static
     * @returns {string[]} An array of strings representing the IDs of all advanced protected area categories.
     * @memberof ProtectedAreas
     */
    static getAdvancedCategoryIDs(): string[];
}
/**
 * A map of event types to their corresponding event objects that can be prevented.
 *
 * @interface preventableEventTypeMap
 *
 * @property {PlayerPlaceBlockBeforeEvent} playerPlaceBlock - Event triggered before a player places a block.
 * @property {PlayerBreakBlockBeforeEvent} playerBreakBlock - Event triggered before a player breaks a block.
 * @property {PlayerInteractWithBlockBeforeEvent} playerInteractWithBlock - Event triggered before a player interacts with a block.
 * @property {ExplosionBeforeEvent} explosion - Event triggered before an explosion occurs.
 * @property {PlayerInteractWithEntityBeforeEvent} playerInteractWithEntity - Event triggered before a player interacts with an entity.
 * @property {ItemUseBeforeEvent} itemUse - Event triggered before an item is used.
 * @property {PlayerGameModeChangeBeforeEvent} playerGameModeChange - Event triggered before a player's game mode is changed.
 * @property {ChatSendBeforeEvent} chatSend - Event triggered before a chat message is sent.
 * @property {EffectAddBeforeEvent} effectAdd - Event triggered before an effect is added to an entity.
 */
interface preventableEventTypeMap {
    playerPlaceBlock: PlayerPlaceBlockBeforeEvent;
    playerBreakBlock: PlayerBreakBlockBeforeEvent;
    playerInteractWithBlock: PlayerInteractWithBlockBeforeEvent;
    explosion: ExplosionBeforeEvent;
    playerInteractWithEntity: PlayerInteractWithEntityBeforeEvent;
    itemUse: ItemUseBeforeEvent;
    playerGameModeChange: PlayerGameModeChangeBeforeEvent;
    chatSend: ChatSendBeforeEvent;
    effectAdd: EffectAddBeforeEvent;
}
/**
 * A constant object that maps advanced category property keys to their display names.
 * This object is used to provide human-readable names for various prevention and interaction
 * properties within a protected area.
 *
 * @constant
 */
export declare const advancedCategoryPropertyDisplayNames: {
    readonly playerPlaceBlock: "Block Placement Prevention";
    readonly playerBreakBlock: "Block Breaking Prevention";
    readonly playerInteractWithBlock: "Block Interaction Prevention";
    readonly explosion: "Explosion Prevention";
    readonly playerInteractWithEntity: "Entity Interaction Prevention";
    readonly itemUse: "Item Use Prevention";
    readonly playerGameModeChange: "Game Mode Change Prevention";
    readonly chatSend: "Player Chat Message Send Prevention";
    readonly effectAdd: "Entity Effect Add Prevention";
    readonly noPVPZone: "PVP Prevention";
    readonly tagZone: "Tag Zone";
};
/**
 * The `ProtectedAreaTester` class is used to test if certain events occur within a protected area.
 *
 * @template {T extends "playerPlaceBlock" | "playerBreakBlock" | "playerInteractWithBlock" | "explosion" | "playerInteractWithEntity" | "itemUse" | "playerGameModeChange" | "chatSend" | "effectAdd"} T
 * The type of event that can be prevented. It can be one of the following:
 * - "playerPlaceBlock"
 * - "playerBreakBlock"
 * - "playerInteractWithBlock"
 * - "explosion"
 * - "playerInteractWithEntity"
 * - "itemUse"
 * - "playerGameModeChange"
 * - "chatSend"
 * - "effectAdd"
 */
export declare class ProtectedAreaTester<T extends "playerPlaceBlock" | "playerBreakBlock" | "playerInteractWithBlock" | "explosion" | "playerInteractWithEntity" | "itemUse" | "playerGameModeChange" | "chatSend" | "effectAdd"> {
    /**
     * Represents an event that can be prevented.
     *
     * @type {T} The type of the event.
     */
    preventableEvent: T;
    /**
     * Constructs an instance of the class with a preventable event.
     *
     * @param {T} preventaleEvent - The event that can be prevented.
     */
    constructor(preventaleEvent: T);
    /**
     * Tests if the given event is in a protected area.
     * @param {preventableEventTypeMap[T]} event The event to test.
     * @param {Vector3} location The location to test.
     * @param {Dimension} dimension The dimension to test.
     * @param {{ block?: Block }} extraData Additional data for the test, such as the block involved in the event.
     * @returns True if the event occurs within a protected area, otherwise false.
     */
    testIsInArea(event: preventableEventTypeMap[T], location: Vector3, dimension: Dimension, extraData?: {
        block?: Block;
    }): boolean;
}
/**
 * Represents a category of protected areas with various restrictions.
 *
 * @remarks
 * This class provides methods to manage and query protected areas based on different categories.
 *
 * @example
 * ```typescript
 * const protectedArea = new ProtectedAreaCategory("noBlockBreakArea");
 * protectedArea.loadAreas();
 * const isInProtectedArea = protectedArea.testIsInArea(location, "overworld");
 * ```
 *
 * @public
 */
export declare class ProtectedAreaCategory {
    /**
     * Represents the category of a protected area.
     *
     * Possible values:
     * - "noPistonExtensionArea": An area where pistons cannot extend.
     * - "noExplosionArea": An area protected from explosions.
     * - "noBlockInteractArea": An area where block interactions are not allowed.
     * - "noInteractArea": An area where interactions are not allowed.
     * - "protectedArea": A general protected area.
     * - "noBlockBreakArea": An area where blocks cannot be broken.
     * - "noBlockPlaceArea": An area where blocks cannot be placed.
     * - "advancedArea": An area with advanced protection settings.
     */
    category: "noPistonExtensionArea" | "noExplosionArea" | "noBlockInteractArea" | "noInteractArea" | "protectedArea" | "noBlockBreakArea" | "noBlockPlaceArea" | "advancedArea";
    /**
     * Optional identifier for the advanced category.
     * This can be used to reference a specific category within the advanced settings or configurations.
     *
     * @type {string}
     */
    advancedCategoryID?: string;
    /**
     * Constructs a new instance of the class with the specified category and optional advanced category ID.
     *
     * @param {ProtectedAreaCategory["category"]} category The category of the protected area.
     * @param {ProtectedAreaCategory["advancedCategoryID"]} advancedCategoryID (Optional) The advanced category ID of the protected area.
     */
    constructor(category: ProtectedAreaCategory["category"], advancedCategoryID?: ProtectedAreaCategory["advancedCategoryID"]);
    /**
     * Retrieves the protected areas based on the current category.
     *
     * @returns An object containing arrays of `ProtectedArea` for each dimension:
     * - `overworld`: An array of protected areas in the overworld.
     * - `nether`: An array of protected areas in the nether.
     * - `the_end`: An array of protected areas in the end.
     */
    getAreas(): {
        overworld: ProtectedArea[];
        nether: ProtectedArea[];
        the_end: ProtectedArea[];
    };
    /**
     * Retrieves the protected areas based on the current category and the specified dimension.
     *
     * @param {Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]} dimension - The dimension to retrieve the protected areas for.
     * This can be a string ("overworld", "nether", or "the_end") or a `Dimension` object.
     *
     * @returns {ProtectedArea[]} An array of `ProtectedArea` for the specified dimension.
     */
    getAreasInDimension(dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): ProtectedArea[];
    /**
     * Loads the protected areas for the current category.
     *
     * If the category is not "advancedArea", it loads areas using the built-in category.
     * Otherwise, it loads areas using the advanced category ID.
     */
    loadAreas(): void;
    /**
     * Checks if the specified location is within a protected area of the current category.
     *
     * @param {Vector3} location - The location to check.
     * @param {Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]} dimension - The dimension to check in.
     * This can be a string ("overworld", "nether", or "the_end") or a `Dimension` object.
     *
     * @returns {boolean} `true` if the location is within a protected area, `false` otherwise.
     */
    testIsInArea(location: Vector3, dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): boolean;
}
export {};
