import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
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
import mcMath from "@minecraft/math.js";
import colorCore from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
export declare const modulesMap: {
    mcServer: typeof mcServer;
    mcServerUi: typeof mcServerUi;
    GameTest: typeof GameTest;
    main: any;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes: typeof transformrecipes;
    coords: any;
    cmds: any;
    bans: any;
    uis: any;
    playersave: any;
    spawnprot: any;
    mcMath: typeof mcMath;
    colorCore: typeof colorCore;
    Color: typeof colorCore.Color;
    Decimal: typeof Decimal;
    semver: typeof semver;
    "@minecraft/server": typeof mcServer;
    "@minecraft/server-ui": typeof mcServerUi;
    "@minecraft/server-gametest": typeof GameTest;
    "@minecraft/math": typeof mcMath;
    chat: any;
    cmdutils: any;
    cmdslist: any;
    cmdsdocs: any;
    utils: any;
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
            transformrecipes: typeof transformrecipes;
        };
    };
};
declare global {
    namespace globalThis {
        var modules: typeof modulesMap;
    }
}
