import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcServerNet from "@minecraft/server-net";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import 'init/index';
import * as main from "Main";
globalThis.modules.main = main;
import * as coords from "Main/coordinates";
globalThis.modules.coords = coords;
import * as cmds from "Main/commands";
globalThis.modules.cmds = cmds;
import * as bans from "Main/ban";
globalThis.modules.bans = bans;
import * as uis from "Main/ui";
globalThis.modules.uis = uis;
import * as playersave from "Main/player_save";
globalThis.modules.playersave = playersave;
import * as spawnprot from "Main/spawn_protection";
globalThis.modules.spawnprot = spawnprot;
import * as chat from "Main/chat";
globalThis.modules.chat = chat;
import * as cmdutils from "Main/command_utilities";
globalThis.modules.cmdutils = cmdutils;
import * as cmdslist from "Main/commands_list";
globalThis.modules.cmdslist = cmdslist;
import * as cmdsdocs from "Main/commands_documentation";
globalThis.modules.cmdsdocs = cmdsdocs;
import * as utils from "legacyModuleAliases/utilities";
globalThis.modules.utils = utils;
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export const modulesMap = {
    mcServer,
    mcServerUi,
    GameTest,
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
    Decimal,
    semver,
    ["@minecraft/server"]: mcServer,
    ["@minecraft/server-ui"]: mcServerUi,
    ["@minecraft/server-gametest"]: GameTest,
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
        }
    }
};
globalThis.modules = modulesMap;
import 'Main';
//# sourceMappingURL=index.js.map