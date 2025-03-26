import "init/functions/breakpoint";
/**
 * The main global variables.
 */
export declare namespace mainGlobalVariables {
    /**
     * The version of the add-on.
     */
    const current_format_version = "1.34.0-preview.20+BUILD.1";
    /**
     * The version of Minecraft Bedrock Edition supported by the add-on.
     */
    const current_supported_minecraft_version = "1.21.6x";
    /**
     * The tick that the `initializeMainGlobalVariables` script was run.
     */
    const beforeScriptStartTick: number;
}
declare global {
    namespace globalThis {
        /**
         * Temporary saved variables.
         */
        var tempSavedVariables: any[];
        /**
         * If set to true, will stop watchdog termination events from being cancelled.
         */
        var crashEnabled: boolean;
        export import format_version = mainGlobalVariables.current_format_version;
        export import supported_minecraft_version = mainGlobalVariables.current_supported_minecraft_version;
        /**
         * Used internally for making sure that the editor stick menus will not open multiple times when using the items.
         */
        var editorStickMenuOpeningAsyncCancelActionNumbers: {
            /**
             * The ID of the editor stick menu.
             */
            [id: string]: number;
        };
        /**
         * The tick that the {@link system.beforeEvents.startup} event was triggered.
         *
         * It will be set to `-1` until the {@link system.beforeEvents.startup} event is triggered.
         */
        var beforeInitializeTick: number;
        /**
         * The tick that the {@link world.afterEvents.worldLoad} event was triggered.
         *
         * It will be set to `-1` until the {@link world.afterEvents.worldLoad} event is triggered.
         */
        var initializeTick: number;
        export import beforeScriptStartTick = mainGlobalVariables.beforeScriptStartTick;
        /**
         * The tick that the `index` file finished running.
         *
         * It will be set to `-1` until the `index` file finishes running.
         */
        var scriptStartTick: number;
        /**
         * Temporary variables.
         */
        var tempVariables: {
            [key: PropertyKey]: any;
        };
        /**
         * Events that have been subscribed to, and their callbacks that can be used to unsubscribe them.
         */
        var subscribedEvents: {
            [eventName: string]: Function;
        };
        /**
         * Repeating intervals, and the IDs that can be used to cancel them with {@link system.run}.
         */
        var repeatingIntervals: {
            /**
             * The world border system, stopping this will stop the world border system.
             */
            worldBorderSystem?: number;
            /**
             * The protected areas system, stopping this used to stop the protected areas system.
             *
             * @deprecated This is no longer used as of `v1.33.0`.
             */
            protectedAreasRefresher?: number;
            /**
             * The ban system, this checks online players to see if they are banned, stopping this will stop it from checking online players, players will still be checked when they join.
             */
            bannedPlayersChecker?: number;
            /**
             * The player data auto save system, stopping this will stop player data from being saved, which means that you won't be able to check offline player's inventories, ban offline players, see their other info, etc.
             */
            playerDataAutoSave?: number;
            /**
             * Other intervals.
             */
            [intervalName: string]: number;
        };
        /**
         * The version of {@link https://modbay.org/mods/1218-8crafters-entity-scale-and-morph-addon.html Entity Scale} that is active on the world/realm/server, will only detect versions `v1.14.0` and above.
         *
         * If no version is detected, it will be set to `null`.
         */
        var entity_scale_format_version: string | null;
        /**
         * The version of {@link https://bluemods.neocities.org/ BlueMods Anticheat} that is active on the world/realm/server, will only detect versions `v5.7.0` and above.
         */
        var bluemods_anticheat_format_version: string | null;
        /**
         * If multiple versions of {@link https://bluemods.neocities.org/ BlueMods Anticheat} are detected, this will be set to `true`.
         */
        var multipleBlueModsAnticheatVersionsDetected: boolean;
        /**
         * If multiple versions of {@link https://modbay.org/mods/1218-8crafters-entity-scale-and-morph-addon.html Entity Scale} are detected, this will be set to `true`.
         */
        var multipleEntityScaleVersionsDetected: boolean;
        /**
         * Error logs.
         *
         * @readonly
         */
        var errorLog: {
            /**
             * Error logs for the player data auto save system.
             */
            playerDataAutoSave: {
                time: number;
                error: Error;
            }[];
            /**
             * Error logs for other things.
             */
            [logCategory: string]: {
                time: number;
                error: Error;
            }[];
        };
        /**
         * The config for BlueMods Anticheat.
         */
        var blueModsAnticheatConfig: {
            /**
             * The commands prefix for {@link https://bluemods.neocities.org/ BlueMods Anticheat}.
             */
            prefix?: string;
            /**
             * The version of {@link https://bluemods.neocities.org/ BlueMods Anticheat}.
             */
            bmversion?: string;
        };
        /**
         * If set to `true`, will stop the player data auto save system's interval.
         */
        var stopPlayerDataAutoSaveAsync: boolean | undefined;
    }
}
