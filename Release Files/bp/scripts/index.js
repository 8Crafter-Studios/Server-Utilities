/**
 * index.ts
 * @module index
 * @description This file is the main file of the project.
 * @mergeModuleWith <project>
 */
import { system, world } from "@minecraft/server";
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
/*
import "GameTestScripts/AllayTests.js";
import "GameTestScripts/APITests.js";*/
import "GameTestScripts/BlockEventTests.js"; /*
import "GameTestScripts/BlockTests.js";*/
import "GameTestScripts/ComponentTests.js";
import "GameTestScripts/CommandTests.js";
import "GameTestScripts/DebugTests.js"; /*
import "GameTestScripts/DispenserTests.js";
import "GameTestScripts/DoorTests.js";
import "GameTestScripts/DripstoneTests.js";
import "GameTestScripts/DuplicationTests.js";
import "GameTestScripts/EntityQueryTests.js";
import "GameTestScripts/EntityTests.js";
import "GameTestScripts/ExtensionTests.js";
import "GameTestScripts/FireAvoidTests.js";
import "GameTestScripts/FrogTests.js";*/
import "GameTestScripts/GameTestExtensions.js"; /*
import "GameTestScripts/MinecartTests.js";
import "GameTestScripts/MobTests.js";
import "GameTestScripts/MultifaceTests.js";
import "GameTestScripts/PathFindingTests.js";
import "GameTestScripts/FlyingMachineTests.js";
import "GameTestScripts/PistonTests.js";
import "GameTestScripts/TntTests.js";
import "GameTestScripts/WaterPathfindingTests.js";
import "GameTestScripts/WardenTests.js";
import "GameTestScripts/SmallMobTests.js";
import "GameTestScripts/BigMobTests.js";
import "GameTestScripts/RaycastingTests.js";
import "GameTestScripts/RedstoneTests.js";*/
import "GameTestScripts/SimulatedPlayerTests.js"; /*
import "GameTestScripts/RespawnAnchorTests.js";
import "GameTestScripts/PlaceSeedsTests.js";
import "GameTestScripts/ItemTests.js";*/
import "GameTestScripts/ItemEnchantmentsTests.js"; /*
import "GameTestScripts/SculkTests.js";
import "GameTestScripts/VibrationTests.js";
import "GameTestScripts/EnchantmentTests.js";*/ /*
import "Eval.js";*/ /*
import "legacyModuleAliases/commands_documentation.js";
import "legacyModuleAliases/commands.js";
import "legacyModuleAliases/coordinates.js";
import "legacyModuleAliases/ban.js";
import "legacyModuleAliases/ui.js";
import "legacyModuleAliases/player_save.js";
import "legacyModuleAliases/spawn_protection.js";
import "legacyModuleAliases/chat.js";
import "legacyModuleAliases/command_utilities.js";
import "legacyModuleAliases/commands_list.js";
import "legacyModuleAliases/errors.js";
import "legacyModuleAliases/utilities.js"; */
import "@minecraft/math.js";
import "GlobalDecorators";
import * as mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
import * as ipc from "ipc";
import moment from "moment";
import "intl";
import "intl.locales";
import alea from "alea";
import * as simplexNoise from "simplex-noise";
Object.defineProperties(globalThis, {
    IPC: {
        value: ipc.IPC,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    IPC_NET: {
        value: ipc.NET,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    IPC_PROTO: {
        value: ipc.PROTO,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    moment: {
        value: moment,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});
// semver
// import * as main from "legacyModuleAliases/Main";
// import * as coords from "legacyModuleAliases/coordinates";
// import * as cmds from "legacyModuleAliases/commands";
// import * as bans from "legacyModuleAliases/ban";
// import * as uis from "legacyModuleAliases/ui";
// import * as playersave from "legacyModuleAliases/player_save";
// import * as spawnprot from "legacyModuleAliases/spawn_protection";
// import * as chat from "legacyModuleAliases/chat";
// import * as cmdutils from "legacyModuleAliases/command_utilities";
// import * as cmdslist from "legacyModuleAliases/commands_list";
// import * as cmdsdocs from "legacyModuleAliases/commands_documentation";
// import * as utils from "legacyModuleAliases/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
var mcDebugUtilities;
try {
    mcDebugUtilities = await import("@minecraft/debug-utilities");
}
catch { }
var mcDiagnostics;
try {
    mcDiagnostics = await import("@minecraft/diagnostics");
}
catch { }
var mcServerNet;
try {
    mcServerNet = await import("@minecraft/server-net");
}
catch { }
var mcServerEditor;
var mcServerEditorBindings;
var mcServerEditorPrivateBindings;
try {
    mcServerEditor = await import("@minecraft/server-editor");
    mcServerEditorBindings = await import("@minecraft/server-editor-bindings");
    mcServerEditorPrivateBindings = await import("@minecraft/server-editor-private-bindings");
}
catch { }
// import * as errors from "legacyModuleAliases/errors";
const main = await moduleImportsConfig.import("main");
const coords = await moduleImportsConfig.import("coordinates");
const cmds = await moduleImportsConfig.import("commands");
const bans = await moduleImportsConfig.import("ban");
const moderation = await moduleImportsConfig.import("moderation");
const uis = await moduleImportsConfig.import("ui");
const playersave = await moduleImportsConfig.import("player_save");
const spawnprot = await moduleImportsConfig.import("spawn_protection");
const chat = await moduleImportsConfig.import("chat");
const cmdutils = await moduleImportsConfig.import("command_utilities");
const cmdslist = await moduleImportsConfig.import("commands_list");
const cmdsdocs = await moduleImportsConfig.import("commands_documentation");
const utils = await moduleImportsConfig.import("utilities");
const errors = await moduleImportsConfig.import("errors");
// const main = {};
// const coords = {};
// const cmds = {};
// const bans = {};
// const uis = {};
// const playersave = {};
// const spawnprot = {};
// const chat = {};
// const cmdutils = {};
// const cmdslist = {};
// const cmdsdocs = {};
// const utils = {};
// const errors = {};
// const shopmain = {};
// const servershop = {};
// const playershop = {};
// const moneysystem = {};
// const mcMath = {};
/**
 * @see {@link modules}
 * @ignore
 */
const modulesMap = {
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    mcServer: mcServer,
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    mcServerUi,
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    GameTest,
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    mcServerAdmin,
    /**
     * The `@minecraft/server-net` module.
     *
     * Note: This is only available when on a dedicated server and `@minecraft/server-net` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    mcServerNet,
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * Note: This is only available when on a world (not a realm or dedicated server) and `@minecraft/debug-utilities` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    mcDebugUtilities,
    /**
     * The `@minecraft/diagnostics` module.
     *
     * Note: This is only available when on a dedicated server and `@minecraft/diagnostics` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    mcDiagnostics,
    /**
     * The `@minecraft/server-editor` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor}
     * @namespace
     */
    mcServerEditor,
    /**
     * The `@minecraft/server-editor-bindings` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor-bindings}
     * @namespace
     */
    mcServerEditorBindings,
    /**
     * The `@minecraft/server-editor-private-bindings` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor-private-bindings}
     * @namespace
     */
    mcServerEditorPrivateBindings,
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    mcCommon,
    /**
     * The `@minecraft/vanilla-data` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    mcVanillaData,
    /**
     * This module contains the main classes, constants, and functions of the add-one, as well as other miscellaneous classes, constants, and functions.
     * @namespace
     */
    main: main,
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}.
     * @see {@link modules.assets.constants.transformrecipes}
     * @namespace
     */
    transformrecipes,
    /**
     * This module contains classes, constants, functions, and interfaces for working with coordinates.
     * @namespace
     * @path `modules/coordinates/`
     */
    coords: coords,
    /**
     * This module contains classes, constants, functions, and types for working with commands.
     * @namespace
     * @path `modules/commands/`
     */
    cmds: cmds,
    /**
     * This module contains classes, constants, functions, and types for working with the ban system.
     * @namespace
     * @path `modules/ban/`
     */
    bans: bans,
    /**
     * This module contains classes, constants, functions, and types for working with the moderation system.
     * @namespace
     * @path `modules/moderation/`
     */
    moderation: moderation,
    /**
     * This module contains constants, functions, and types for working with the UI system.
     * @namespace
     * @path `modules/ui/`
     * @primaryExport
     */
    uis: uis,
    /**
     * This module contains classes, constants, and functions for working with the player data save system.
     * @namespace
     * @path `modules/player_save/`
     */
    playersave: playersave,
    /**
     * This module contains constants and functions for working with the spawn protection system.
     * @namespace
     * @path `modules/spawn_protection/`
     */
    spawnprot: spawnprot,
    /**
     * The `@minecraft/math` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    mcMath,
    /**
     * The `color-core` module.
     * @see {@link https://www.npmjs.com/package/color-core}
     * @namespace
     */
    colorCore,
    /**
     * The Color class of the `color-core` module.
     * @see {@link modules.colorCore.Color}
     * @kindOverride Namespace
     */
    Color,
    /**
     * The `decimal.js` module.
     * @see {@link https://www.npmjs.com/package/decimal.js}
     * @namespace
     */
    Decimal,
    /**
     * The `semver` module.
     * @see {@link https://www.npmjs.com/package/semver}
     * @namespace
     */
    semver,
    /**
     * The `mcbe-ipc` module.
     * @see {@link https://www.npmjs.com/package/mcbe-ipc}
     * @namespace
     */
    ipc,
    /**
     * The `moment` module.
     * @see {@link https://momentjs.com/}
     * @see {@link https://www.npmjs.com/package/moment}
     * @namespace
     */
    moment,
    /**
     * The `alea` module.
     * @see {@link https://www.npmjs.com/package/alea}
     * @namespace
     */
    alea,
    /**
     * The `simplex-noise` module.
     * @see {@link https://www.npmjs.com/package/simplex-noise}
     * @namespace
     */
    simplexNoise,
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    ["@minecraft/server"]: mcServer,
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    ["@minecraft/server-ui"]: mcServerUi,
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    ["@minecraft/server-gametest"]: GameTest,
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    ["@minecraft/common"]: mcCommon,
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    ["@minecraft/server-admin"]: mcServerAdmin,
    /**
     * The `@minecraft/server-net` module.
     *
     * Note: This is only available when on a dedicated server and `@minecraft/server-net` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    ["@minecraft/server-net"]: mcServerNet,
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * Note: This is only available when on a world (not a realm or dedicated server) and `@minecraft/debug-utilities` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    ["@minecraft/debug-utilities"]: mcDebugUtilities,
    /**
     * The `@minecraft/diagnostics` module.
     *
     * Note: This is only available when on a dedicated server and `@minecraft/diagnostics` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    ["@minecraft/diagnostics"]: mcDiagnostics,
    /**
     * The `@minecraft/server-editor` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor}
     * @namespace
     */
    ["@minecraft/server-editor"]: mcServerEditor,
    /**
     * The `@minecraft/server-editor-bindings` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor-bindings}
     * @namespace
     */
    ["@minecraft/server-editor-bindings"]: mcServerEditorBindings,
    /**
     * The `@minecraft/server-editor-private-bindings` module.
     *
     * Note: This is only available when in [editor mode](https://minecraft.wiki/w/Bedrock_Editor) and `@minecraft/server-editor` is added into the `manifest.json`.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-editor-private-bindings}
     * @namespace
     */
    ["@minecraft/server-editor-private-bindings"]: mcServerEditorPrivateBindings,
    /**
     * The `@minecraft/vanilla-data` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    ["@minecraft/vanilla-data"]: mcVanillaData,
    /**
     * The `@minecraft/math` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    ["@minecraft/math"]: mcMath,
    /**
     * This module contains constants and functions for working with chat.
     * @namespace
     * @path `modules/chat/`
     */
    chat: chat,
    /**
     * This module contains utility constants, enums, and functions for working with commands.
     * @namespace
     * @path `modules/command_utilities/`
     */
    cmdutils: cmdutils,
    /**
     * This module contains the list of commands.
     * @namespace
     * @path `modules/commands_list/`
     */
    cmdslist: cmdslist,
    /**
     * This module contains documentation for commands.
     * @namespace
     * @path `modules/commands_documentation/`
     */
    cmdsdocs: cmdsdocs,
    /**
     * This module contains utility classes, functions, and types.
     * @namespace
     * @path `modules/utilities/`
     */
    utils: utils,
    /**
     * This module contains error classes.
     * @namespace
     * @path `modules/errors/`
     */
    errors: errors,
    /**
     * This module contains functions and types for working with the shop system.
     * @namespace
     * @path `ExtraFeatures/shop_main`
     */
    shopmain,
    /**
     * This module contains classes, functions, and types for working with the server shop system.
     * @namespace
     * @path `ExtraFeatures/server_shop`
     */
    servershop,
    /**
     * This module contains classes, functions, and types for working with the player shop system.
     * @namespace
     * @path `ExtraFeatures/player_shop`
     */
    playershop,
    /**
     * This module contains classes for working with the money system.
     * @namespace
     * @path `ExtraFeatures/money`
     */
    moneysystem,
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
            JSONB,
        },
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
            charMaps: await import("Assets/constants/charMaps"),
            /**
             * This module contians mappings for structures for the `\enchantmentbarrels` command.
             * @namespace
             * @path `Assets/constants/structure_mappings`
             */
            structuremappings,
            /**
             * This module contains constants and types for texture presets.
             * @namespace
             * @path `Assets/constants/texturePresets`
             */
            texturePresets: await import("Assets/constants/texturePresets"),
            /**
             * This module contains mappings for recipes for the `\gettransformsmithingtemplate` command.
             * @namespace
             * @path `Assets/constants/transformrecipes`
             */
            transformrecipes,
        },
    },
};
globalThis.modules = modulesMap;
/**
 * This is an alias of {@link globalThis}.
 * @namespace
 * @see {@link Globals}
 * @hideconstructor
 * @readonly
 */
// export const gt = globalThis;
// import "Main";
import { UndoClipboard } from "modules/coordinates/classes/undoClipboard";
globalThis.scriptStartTick = system.currentTick;
world.setDynamicProperty("format_version", format_version);
system.runTimeout(() => UndoClipboard.cullItemsMissingStructure(), 50);
//# sourceMappingURL=index.js.map