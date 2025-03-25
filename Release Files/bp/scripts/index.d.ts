import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import * as mcServerAdmin from "@minecraft/server-admin";
import * as mcCommon from "@minecraft/common";
import * as mcVanillaData from "@minecraft/vanilla-data.js";
import "initializeMainGlobalVariables";
import "Assets/classes/JSONB";
import "Global";
import "init/index.js";
import "GameTestScripts/BlockEventTests.js";
import "GameTestScripts/ComponentTests.js";
import "GameTestScripts/CommandTests.js";
import "GameTestScripts/DebugTests.js";
import "GameTestScripts/GameTestExtensions.js";
import "GameTestScripts/SimulatedPlayerTests.js";
import "GameTestScripts/ItemEnchantmentsTests.js";
import "@minecraft/math.js";
import "GlobalDecorators";
import * as mcMath from "@minecraft/math.js";
import * as ipc from "ipc";
import "intl";
import "intl.locales";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
/**
 * @see {@link modules}
 * @ignore
 */
declare const modulesMap: {
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    mcServer: typeof mcServer;
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    mcServerUi: typeof mcServerUi;
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    GameTest: typeof GameTest;
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    mcServerAdmin: typeof mcServerAdmin;
    /**
     * The `@minecraft/server-net` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    /**
     * The `@minecraft/diagnostics` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    mcCommon: typeof mcCommon;
    /**
     * The `@minecraft/vanilla-data` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    mcVanillaData: typeof mcVanillaData;
    /**
     * This module contains the main classes, constants, and functions of the add-one, as well as other miscellaneous classes, constants, and functions.
     * @namespace
     */
    main: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["main"][number]]>;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}.
     * @see {@link modules.assets.constants.transformrecipes}
     * @namespace
     */
    transformrecipes: typeof transformrecipes;
    /**
     * This module contains classes, constants, functions, and interfaces for working with coordinates.
     * @namespace
     * @path `modules/coordinates/`
     */
    coords: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["coordinates"][number]]>;
    /**
     * This module contains classes, constants, functions, and types for working with commands.
     * @namespace
     * @path `modules/commands/`
     */
    cmds: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands"][number]]>;
    /**
     * This module contains classes, constants, functions, and types for working with the ban system.
     * @namespace
     * @path `modules/ban/`
     */
    bans: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["ban"][number]]>;
    /**
     * This module contains constants, functions, and types for working with the UI system.
     * @namespace
     * @path `modules/ui/`
     * @primaryExport
     */
    uis: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["ui"][number]]>;
    /**
     * This module contains classes, constants, and functions for working with the player data save system.
     * @namespace
     * @path `modules/player_save/`
     */
    playersave: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["player_save"][number]]>;
    /**
     * This module contains constants and functions for working with the spawn protection system.
     * @namespace
     * @path `modules/spawn_protection/`
     */
    spawnprot: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["spawn_protection"][number]]>;
    /**
     * The `@minecraft/math` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    mcMath: typeof mcMath;
    /**
     * The `color-core` module.
     * @see {@link https://www.npmjs.com/package/color-core}
     * @namespace
     */
    colorCore: typeof import("color-core");
    /**
     * The Color class of the `color-core` module.
     * @see {@link modules.colorCore.Color}
     * @kindOverride Namespace
     */
    Color: typeof import("color-core").Color;
    /**
     * The `decimal.js` module.
     * @see {@link https://www.npmjs.com/package/decimal.js}
     * @namespace
     */
    Decimal: typeof import("decimal.js").default;
    /**
     * The `semver` module.
     * @see {@link https://www.npmjs.com/package/semver}
     * @namespace
     */
    semver: typeof import("semver");
    /**
     * The `mcbe-ipc` module.
     * @see {@link https://www.npmjs.com/package/mcbe-ipc}
     * @namespace
     */
    ipc: typeof ipc;
    /**
     * The `moment` module.
     * @see {@link https://momentjs.com/}
     * @see {@link https://www.npmjs.com/package/moment}
     * @namespace
     */
    moment: typeof import("moment");
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    "@minecraft/server": typeof mcServer;
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    "@minecraft/server-ui": typeof mcServerUi;
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    "@minecraft/server-gametest": typeof GameTest;
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    "@minecraft/common": typeof mcCommon;
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    "@minecraft/server-admin": typeof mcServerAdmin;
    /**
     * The `@minecraft/server-net` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    /**
     * The `@minecraft/diagnostics` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    /**
     * The `@minecraft/vanilla-data` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    "@minecraft/vanilla-data": typeof mcVanillaData;
    /**
     * The `@minecraft/math` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    "@minecraft/math": typeof mcMath;
    /**
     * This module contains constants and functions for working with chat.
     * @namespace
     * @path `modules/chat/`
     */
    chat: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["chat"][number]]>;
    /**
     * This module contains utility constants, enums, and functions for working with commands.
     * @namespace
     * @path `modules/command_utilities/`
     */
    cmdutils: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["command_utilities"][number]]>;
    /**
     * This module contains the list of commands.
     * @namespace
     * @path `modules/commands_list/`
     */
    cmdslist: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands_list"][number]]>;
    /**
     * This module contains documentation for commands.
     * @namespace
     * @path `modules/commands_documentation/`
     */
    cmdsdocs: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands_documentation"][number]]>;
    /**
     * This module contains utility classes, functions, and types.
     * @namespace
     * @path `modules/utilities/`
     */
    utils: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["utilities"][number]]>;
    /**
     * This module contains error classes.
     * @namespace
     * @path `modules/errors/`
     */
    errors: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["errors"][number]]>;
    /**
     * This module contains functions and types for working with the shop system.
     * @namespace
     * @path `ExtraFeatures/shop_main`
     */
    shopmain: typeof shopmain;
    /**
     * This module contains classes, functions, and types for working with the server shop system.
     * @namespace
     * @path `ExtraFeatures/server_shop`
     */
    servershop: typeof servershop;
    /**
     * This module contains classes, functions, and types for working with the player shop system.
     * @namespace
     * @path `ExtraFeatures/player_shop`
     */
    playershop: typeof playershop;
    /**
     * This module contains classes for working with the money system.
     * @namespace
     * @path `ExtraFeatures/money`
     */
    moneysystem: typeof moneysystem;
    /**
     * This module contains miscellaneous classes, constants, functions, types, and interfaces.
     * @namespace
     * @path `Assets/`
     */
    assets: {
        /**
         * This module contains miscellaneous classes.
         * @namespace
         * @path `Assets/classes/`
         */
        classes: {
            /**
             * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
             * @see {@link JSONB}
             * @path `Assets/classes/JSONB`
             */
            JSONB: JSONB;
        };
        /**
         * This module contains miscellaneous constants.
         * @namespace
         * @path `Assets/constants/`
         */
        constants: {
            /**
             * This module contains constants containing character maps.
             * @namespace
             * @path `Assets/constants/charMaps`
             */
            charMaps: typeof import("Assets/constants/charMaps");
            /**
             * This module contians mappings for structures for the `\enchantmentbarrels` command.
             * @namespace
             * @path `Assets/constants/structure_mappings`
             */
            structuremappings: typeof structuremappings;
            /**
             * This module contains constants and types for texture presets.
             * @namespace
             * @path `Assets/constants/texturePresets`
             */
            texturePresets: typeof import("Assets/constants/texturePresets");
            /**
             * This module contains mappings for recipes for the `\gettransformsmithingtemplate` command.
             * @namespace
             * @path `Assets/constants/transformrecipes`
             */
            transformrecipes: typeof transformrecipes;
        };
    };
};
declare global {
    namespace globalThis {
        /**
         * This namespace contains all the modules.
         * @namespace
         * @global
         */
        var modules: typeof modulesMap;
    }
}
import type { moduleOptionalImportPathMap, optionalModuleObjectImportFilePathsImportMap } from "directoryTree";
/**
 * The `@minecraft/server` module.
 *
 * @beta
 * Contains many types related to manipulating a Minecraft
 * world, including entities, blocks, dimensions, and more.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server",
 *   "version": "1.18.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server}
 */
export type * as "@minecraft/server" from "@minecraft/server";
/**
 * The `@minecraft/server-ui` module.
 *
 * @beta
 * The `@minecraft/server-ui` module contains types for
 * expressing simple dialog-based user experiences.
 *
 *   * {@link ActionFormData} contain a list of buttons with
 * captions and images that can be used for presenting a set of
 * options to a player.
 *   * {@link MessageFormData} are simple two-button message
 * experiences that are functional for Yes/No or OK/Cancel
 * questions.
 *   * {@link ModalFormData} allow for a more flexible
 * "questionnaire-style" list of controls that can be used to
 * take input.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-ui",
 *   "version": "1.4.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
 */
export type * as "@minecraft/server-ui" from "@minecraft/server-ui";
/**
 * The `@minecraft/server-gametest` module.
 *
 * @beta
 * The @minecraft/server-gametest module provides scriptable
 * APIs for scaffolding and testing content experiences in
 * Minecraft.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-gametest",
 *   "version": "1.0.0-internal.1.20.80-stable"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
 * @kindOverride Module
 */
export type * as "@minecraft/server-gametest" from "@minecraft/server-gametest";
/**
 * The `@minecraft/server-admin` module.
 *
 * @beta
 * Contains types related to administering a Bedrock Dedicated
 * Server. These types allow for the configuration of variables
 * and secrets in JSON files in the Bedrock Dedicated Server
 * folder. These types cannot be used on Minecraft clients or
 * within Minecraft Realms.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-admin",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
 * @kindOverride Module
 */
export type * as "@minecraft/server-admin" from "@minecraft/server-admin";
/**
 * The `@minecraft/server-net` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types.
 *
 * @beta
 * The `@minecraft/server-net` module contains types for
 * executing HTTP-based requests. This module can only be used
 * on Bedrock Dedicated Server. These APIs do not function
 * within the Minecraft game client or within Minecraft Realms.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-net",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
 * @kindOverride Module
 */
/**
 * The `@minecraft/debug-utilities` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types.
 *
 * @beta
 * Contains debug utility functions.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/debug-utilities",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
 * @kindOverride Module
 */
/**
 * The `@minecraft/diagnostics` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
 * @kindOverride Module
 */
/**
 * The `@minecraft/common` module.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/common",
 *   "version": "1.1.0"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/common}
 * @kindOverride Module
 */
export type * as "@minecraft/common" from "@minecraft/common";
/**
 * The `@minecraft/vanilla-data` module.
 *
 * This module contains type definitions and enumarations for vanilla content
 * within the game, such as Blocks, Items, Entities, and more. This module is
 * versioned accordingly with Minecraft release and preview versions, and
 * contain the up to date types available in the game.
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
 * @kindOverride Module
 */
export type * as "@minecraft/vanilla-data" from "@minecraft/vanilla-data";
/**
 * The `@minecraft/math` module.
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/math}
 * @version v2.2.1
 * @kindOverride Module
 * @external
 */
export type * as "@minecraft/math" from "@minecraft/math";
