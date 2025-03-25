import { system, world } from "@minecraft/server";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcServerNet from "@minecraft/server-net";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
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
import mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
import * as ipc from "ipc";
import moment from "moment";
import "intl";
import "intl.locales";
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
    }
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
// import * as errors from "legacyModuleAliases/errors";
const main = await moduleImportsConfig.import("main");
const coords = await moduleImportsConfig.import("coordinates");
const cmds = await moduleImportsConfig.import("commands");
const bans = await moduleImportsConfig.import("ban");
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
export const modulesMap = {
    mcServer: mcServer,
    mcServerUi,
    GameTest /*
    mcServerAdmin,
    mcDebugUtilities,
    mcCommon,
    mcVanillaData,*/,
    main,
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes,
    coords,
    cmds,
    bans,
    uis,
    playersave,
    spawnprot,
    mcMath,
    colorCore,
    Color,
    Decimal,
    semver,
    ipc,
    moment,
    ["@minecraft/server"]: mcServer,
    ["@minecraft/server-ui"]: mcServerUi,
    ["@minecraft/server-gametest"]: GameTest /*
    ["@minecraft/common"]: mcCommon,
    ["@minecraft/server-admin"]: mcServerAdmin,
    ["@minecraft/server-net"]: mcServerNet
    ["@minecraft/debug-utilities"]: mcDebugUtilities
    ["@minecraft/vanilla-data"]: mcVanillaData,*/,
    ["@minecraft/math"]: mcMath,
    chat,
    cmdutils,
    cmdslist,
    cmdsdocs,
    utils,
    errors,
    shopmain,
    servershop,
    playershop,
    moneysystem,
    assets: {
        classes: {
            JSONB,
        },
        constants: {
            charMaps: await import("Assets/constants/charMaps"),
            structuremappings,
            transformrecipes,
        },
    },
};
globalThis.modules = modulesMap;
// import "Main";
import { undoClipboard } from "modules/coordinates/classes/undoClipboard";
globalThis.scriptStartTick = system.currentTick;
world.setDynamicProperty("format_version", format_version);
system.runTimeout(() => undoClipboard.cullItemsMissingStructure(), 50);
// ${se}srun(async()=>console.log(JSON.stringify(Object.fromEntries((await import("directoryTree")).scripts.filter(s=>!!s.match(/^BP\/scripts\/modules\/[^\/]+\/.+\/[^\/]+\.js$/)).map(s=>[s, 0])), undefined, 4)))
// ${se}srun(async()=>console.log("{"+(await import("directoryTree")).scripts.filter(s=>!!s.match(/^BP\/scripts\/modules\/[^\/]+\/.+\/[^\/]+\.js$/)).map(v=>`\n    ${JSON.stringify(v)}: typeof import("./${JSON.stringify(v.slice(11, -3)).slice(1)})`)+"\n}"))
/*
${se}srun(async()=>{console.log(JSON.stringify(Object.fromEntries(await [
    "ban",
    "chat",
    "command_utilities",
    "commands",
    "commands_documentation",
    "commands_list",
    "coordinates",
    "errors",
    "main",
    "player_save",
    "spawn_protection",
    "ui",
    "utilities",
].mapAsync(async v=>[v, (await import("directoryTree")).optionalModuleObjectImportFilePaths.filter(f=>f.startsWith(`BP/scripts/modules/${v}/`))])), undefined, 4))})
*/
//# sourceMappingURL=index.js.map