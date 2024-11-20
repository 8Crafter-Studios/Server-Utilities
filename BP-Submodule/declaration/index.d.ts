import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import 'init/index';
import * as main from "Main";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
import * as chat from "Main/chat";
import * as cmdutils from "Main/command_utilities";
import * as cmdslist from "Main/commands_list";
import * as cmdsdocs from "Main/commands_documentation";
import * as utils from "legacyModuleAliases/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import mcMath from "@minecraft/math.js";
import colorCore from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export declare const modulesMap: {
    mcServer: typeof mcServer;
    mcServerUi: typeof mcServerUi;
    GameTest: typeof GameTest;
    main: typeof main;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes: any;
    coords: typeof coords;
    cmds: typeof cmds;
    bans: typeof bans;
    uis: typeof uis;
    playersave: typeof playersave;
    spawnprot: typeof spawnprot;
    mcMath: typeof mcMath;
    colorCore: typeof colorCore;
    Decimal: typeof Decimal;
    semver: typeof semver;
    "@minecraft/server": typeof mcServer;
    "@minecraft/server-ui": typeof mcServerUi;
    "@minecraft/server-gametest": typeof GameTest;
    "@minecraft/math": typeof mcMath;
    chat: typeof chat;
    cmdutils: typeof cmdutils;
    cmdslist: typeof cmdslist;
    cmdsdocs: typeof cmdsdocs;
    utils: typeof utils;
    errors: any;
    shopmain: typeof shopmain;
    servershop: typeof servershop;
    playershop: typeof playershop;
    moneysystem: typeof moneysystem;
    assets: {
        classes: {
            JSONB: JSONB;
        };
        constants: {
            charMaps: typeof import("Assets/constants/charMaps");
            structuremappings: typeof structuremappings;
            transformrecipes: any;
        };
    };
};
declare global {
    namespace globalThis {
        var modules: typeof modulesMap;
        var tempSavedVariables: any[];
        var crashEnabled: boolean;
    }
}
import 'Main';
