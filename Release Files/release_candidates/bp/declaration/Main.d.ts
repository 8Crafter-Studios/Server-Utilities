export declare const format_version = "1.26.0-rc.3+BUILD.1";
export declare const supported_minecraft_version = "1.21.4x";
import "Assets/classes/JSONB";
import "Global";
import "BlockEventTests.js";
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js";
import "GameTestExtensions.js";
import "SimulatedPlayerTests.js";
import "ItemEnchantmentsTests.js";
import "Main/commands_documentation.js";
import "Main/commands.js";
import "Main/coordinates.js";
import "Main/ban.js";
import "Main/ui.js";
import "Main/player_save.js";
import "Main/spawn_protection.js";
import "Main/chat.js";
import "Main/command_utilities.js";
import "Main/commands_list.js";
import "Main/errors.js";
import "Main/utilities.js";
import "@minecraft/math.js";
import "GlobalDecorators";
export declare const mainmetaimport: ImportMeta;
export declare const editorStickMenuOpeningAsyncCancelActionNumbers: {
    [id: string]: number;
};
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as errors from "Main/errors";
import { Block, BlockPermutation, BlockType, Dimension, Entity, ItemStack, Player, MolangVariableMap, type Vector3, type DimensionLocation, ContainerSlot, StructureSaveMode } from "@minecraft/server";
import { BlockMask } from "Main/commands";
import { ban } from "Main/ban";
import { savedPlayer } from "Main/player_save.js";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
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
import * as utils from "Main/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import mcMath from "@minecraft/math.js";
import colorCore from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export declare const modules: {
    mcServer: typeof mcServer;
    mcServerUi: typeof mcServerUi;
    GameTest: typeof GameTest;
    main: typeof main;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes: typeof transformrecipes;
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
    errors: typeof errors;
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
        var modules: typeof main.modules;
        var tempSavedVariables: any[];
        var crashEnabled: boolean;
    }
}
export declare function checkIfCompatibleEntityScaleIsActive(init?: boolean, maxWaitTicks?: number): Promise<false | `${bigint}.${bigint}.${bigint}` | `${bigint}.${bigint}.${bigint}+${string}` | `${bigint}.${bigint}.${bigint}-${string}` | `${bigint}.${bigint}.${bigint}-${string}+${string}`>;
export declare function mainEval(x: string): any;
export declare function indirectMainEval(x: string): any;
export declare function mainRun(x: (...args: any[]) => any, ...args: any[]): any;
export declare function spawnBlockSurroundingParticleForPlayer(player: Player, location: Vector3, textures: {
    default?: string;
    up?: string;
    down?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
}): void;
export declare function spawnBlockSurroundingParticle(dimension: Dimension, location: Vector3, textures: {
    default?: string;
    up?: string;
    down?: string;
    north?: string;
    south?: string;
    east?: string;
    west?: string;
}): void;
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
};
export type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
};
export type test1a = [name: number, id: `ID:${number}`, hi: "text"];
export declare const timeZones: (string[] | number[])[];
/**
 * This is an alias of {@link system.run}.
 * @remarks
 * Runs a specified function at the next available future time.
 * This is frequently used to implement delayed behaviors and
 * game loops. When run within the context of an event handler,
 * this will generally run the code at the end of the same tick
 * where the event occurred. When run in other code (a
 * system.run callout), this will run the function in the next
 * tick. Note, however, that depending on load on the system,
 * running in the same or next tick is not guaranteed.
 *
 * @param callback
 * Function callback to run at the next game tick.
 * @returns
 * An opaque identifier that can be used with the `clearRun`
 * function to cancel the execution of this run.
 * @example trapTick.ts
 * ```typescript
 * import { system, world } from '@minecraft/server';
 *
 * function printEveryMinute() {
 *     try {
 *         // Minecraft runs at 20 ticks per second.
 *         if (system.currentTick % 1200 === 0) {
 *             world.sendMessage('Another minute passes...');
 *         }
 *     } catch (e) {
 *         console.warn('Error: ' + e);
 *     }
 *
 *     system.run(printEveryMinute);
 * }
 *
 * printEveryMinute();
 * ```
 */
export declare const srun: (callback: () => void) => number;
export declare const gt: typeof globalThis;
/**
 * A class containing the configuration information for the add-on.
 */
export declare class config {
    static get chatCommandsEnabled(): boolean | undefined;
    static set chatCommandsEnabled(enabled: boolean | undefined);
    static get chatCommandPrefix(): string | undefined;
    static set chatCommandPrefix(prefix: string | undefined);
    static get validChatCommandPrefixes(): string | undefined;
    static set validChatCommandPrefixes(prefixes: string | undefined);
    static get invalidChatCommandAction(): number | undefined;
    static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
    static get undoClipboardMode(): StructureSaveMode | undefined;
    static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
    static get spawnCommandLocation(): DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    } | undefined;
    static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    } | undefined);
    static get worldBorder(): {
        readonly overworld: {
            enabled: boolean;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * d
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * b
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
        readonly nether: {
            enabled: boolean;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
        readonly the_end: {
            enabled: boolean;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
    };
    static get shopSystem(): {
        readonly server: {
            enabled: boolean;
        };
        readonly player: {
            enabled: boolean;
            maxShopsPerPlayer: number;
            allowSellingLockInSlotItems: boolean;
            allowSellingLockInInventoryItems: boolean;
            allowSellingKeepOnDeathItems: boolean;
        };
        readonly sign: {
            enabled: boolean;
        };
    };
    static get homeSystem(): {
        homeSystemEnabled: boolean;
        maxHomesPerPlayer: number;
    };
    static get tpaSystem(): {
        tpaSystemEnabled: boolean;
        /**
         * The number of seconds after a teleport request is sent before it will time out.
         */
        timeoutDuration: number;
    };
    static get chatRanks(): {
        chatDisplayTimeStamp: boolean;
        showRanksOnPlayerNameTags: boolean;
        rankMode: string;
        rankDisplayPrefix: string;
        rankDisplaySuffix: string;
        nameDisplayPrefix: string;
        nameDisplaySuffix: string;
        chatNameAndMessageSeparator: string;
        rankDisplaySeparator: string;
        rankTemplateString: string;
        messageTemplateString: string;
        defaultRankTemplateString: string;
        defaultMessageFormatting: string;
        defaultNameFormatting: string;
        defaultSeparatorFormatting: string;
        disableCustomChatMessages: boolean;
        allowCustomChatMessagesMuting: boolean;
        autoEscapeChatMessages: boolean;
        autoURIEscapeChatMessages: boolean;
        allowChatEscapeCodes: boolean;
    };
    static get antiSpamSystem(): {
        antispamEnabled: boolean;
        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
        waitTimeAfterAntispamActivation: number;
        maxTimeBewteenMessagesToTriggerAntiSpam: number;
        antispamTriggerMessageCount: number;
    };
    static get ui(): {
        readonly main: {};
        readonly pages: {
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxPlayersPerManagePlayersPage: number;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxBansPerManageBansPage: number;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxHomesPerManageHomesPage: number;
        };
        readonly other: {
            useStarWarsReference404Page: boolean;
        };
    };
    static get system(): {
        artificialLagMS: number;
        timeZone: number;
        playerDataRefreshRate: number;
        protectedAreasRefreshRate: number;
        bannedPlayersRefreshRate: number;
        debugMode: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        allowWatchdogTerminationCrash: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
        /**
         * It is reccommended to leave this set to false.
         * @default false
         * @decorator
         * also
         * false
         */
        useLegacyPlayerInventoryDataSaveSystem: boolean;
        playerInventoryDataSaveSystemEnabled: boolean;
        spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
        showEntityScaleNotFoundConsoleLog: boolean;
        showEntityScaleFoundConsoleLog: boolean;
        showEntityScaleNotFoundChatLog: boolean;
        showEntityScaleFoundChatLog: boolean;
    };
    static reset(): void;
    static toJSON(): {
        [k: string]: any;
    };
}
export declare class worldPlayers {
    rotx: number;
    roty: number;
    dimension?: Dimension;
    entity?: Entity;
    block?: Block;
    static get savedPlayers(): savedPlayer[];
    static get bans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
}
/**
 * @since 1.20.0-development.63
 */
export declare class SemVerString {
    major: number;
    minor: number;
    patch: number;
    private pre_release_stage_internal;
    private pre_release_version_internal;
    build: string;
    constructor(major: number, minor: number, patch: number, pre_release?: string, build?: string);
    get pre_release(): string;
    set pre_release(pre_release: string);
    get pre_release_stage(): string;
    set pre_release_stage(pre_release_stage: string);
    get pre_release_version(): string;
    set pre_release_version(pre_release_version: string);
    get raw(): string;
    toString(): string;
    toPrimitive(): string;
    toJSON(): {
        major: number;
        minor: number;
        patch: number;
        pre_release_stage: string;
        pre_release_version: string;
        build: string;
        type: string;
    };
    static pre_release_regex: RegExp;
    static build_regex: RegExp;
    static semver_regex: RegExp;
    static fromJSON(json: {
        major: number;
        minor: number;
        patch: number;
        pre_release_stage: string;
        pre_release_version: string;
        build: string;
        type: string;
    }): main.SemVerString;
    static fromString(string: string): main.SemVerString;
}
export declare function SemVerValidator(string: string): boolean;
export declare function SemVerMatcher(string: string): RegExpMatchArray;
export declare function flatPath(directoryObject: {
    [k: string]: any;
}, startingPath?: string[]): {
    [k: string]: any;
    path: string[];
    name: string;
    index?: number;
    arrayindex?: number;
    objectindex?: number;
}[];
export declare function getPathInObject(directoryObject: {
    [k: string]: any;
} | any[], path?: (string | number)[]): any;
export declare function scanForBlockType(from: Vector3, to: Vector3, dimension: Dimension, block: string, returnMode?: "" | "Vector3" | "Block"): Block[] | Vector3[];
export declare function scanForContainerBlocks(from: Vector3, to: Vector3, dimension: Dimension, returnMode?: "" | "Vector3" | "Block"): Block[] | Vector3[];
export declare function clearAllContainerBlocks(blocks: Block[]): Block[];
/**
 * @deprecated
 */
export declare function fillBlocks(from: Vector3, to: Vector3, dimension: Dimension, block: string | BlockPermutation | BlockType, options?: mcServer.BlockFillOptions): number;
/**
 * @deprecated
 */
export declare function fillBlocksB(from: Vector3, to: Vector3, dimension: Dimension, block: string | BlockPermutation | BlockType, options?: mcServer.BlockFillOptions): number;
/**
 * @deprecated
 */
export declare function fillBlocksF(from: Vector3, to: Vector3, dimension: Dimension, block: string | BlockPermutation | BlockType, options?: {
    matchingBlock?: BlockPermutation | BlockType | string;
}): number;
/**
 * @deprecated
 */
export declare function fillBlocksH(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string): number;
/**
 * @deprecated
 */
export declare function fillBlocksHB(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}): number;
/**
 * @deprecated
 */
export declare function fillBlocksHW(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksHWG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @deprecated
 */
export declare function fillBlocksHHG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @deprecated
 */
export declare function fillBlocksHOTG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @deprecated
 */
export declare function fillBlocksHH(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksHO(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksHP(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksHC(center: Vector3, radius: number, dimension: Dimension, axis: string, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * Generates a sphere.
 * @deprecated Legacy function that may cause script hang errors. Superceeded by fillBlocksHSGB().
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius Radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHS(center: Vector3, radius: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
/**
 * Generates a sphere.
 * @deprecated Legacy function. Superceeded by fillBlocksHSGB().
 * @async
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius Radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the sphere generation.
 * @returns A promise that resolves with the details of the sphere generation once the sphere generation is complete.
 */
export declare function fillBlocksHSG(center: Vector3, radius: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a sphere.
 * @since 1.18.0-development.26
 * @version 1.0.0
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius Radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the sphere in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the sphere generation.
 * @returns A promise that resolves with the details of the sphere generation once the sphere generation is complete.
 */
export declare function fillBlocksHSGB(center: Vector3, radius: number, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
    verifyBlockActuallyChanged?: boolean;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a hollow sphere.
 * @since 1.18.0-development.27
 * @version 1.0.0
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHHSGB(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
    verifyBlockActuallyChanged?: boolean;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a cone.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @param {Vector3} center The location of the bottom center of the cone.
 * @param {boolean} radius Radius of the cone.
 * @param {boolean} height Height of the cone.
 * @param {Dimension} dimension The dimension to generate the cone in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the cone generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the cone generation.
 * @returns A promise that resolves with the details of the cone generation once the cone generation is complete.
 */
export declare function fillBlocksHCGB(center: Vector3, radius: number, height: number, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a skygrid.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the skygrid generation.
 * @returns A promise that resolves with the details of the skygrid generation once the skygrid generation is complete.
 */
export declare function fillBlocksHSGGB(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates an inverse skygrid.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the inverse skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the inverse skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the inverse skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the inverse skygrid generation.
 * @returns A promise that resolves with the details of the inverse skygrid generation once the inverse skygrid generation is complete.
 */
export declare function fillBlocksHISGGB(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export declare function fillBlocksHSSG(center: Vector3, radius: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function that may cause script hang errors. Superceeded by fillBlocksHHSGB().
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHHS(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): number;
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function. Superceeded by fillBlocksHHSGB().
 * @async
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHHSG(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export declare function fillBlocksHDG(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: string | Function, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export declare function fillBlocksHHOG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export declare function fillBlocksHOG(center: Vector3, radius: Vector3, offset: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a skygrid.
 * @deprecated
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the skygrid generation.
 * @returns A promise that resolves with the details of the skygrid generation once the skygrid generation is complete.
 */
export declare function fillBlocksHSGG(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: FillOptions2, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates an inverse skygrid.
 * @deprecated
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the inverse skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the inverse skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the inverse skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the inverse skygrid generation.
 * @returns A promise that resolves with the details of the inverse skygrid generation once the inverse skygrid generation is complete.
 */
export declare function fillBlocksHISGG(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: FillOptions2, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
export type FillOptions1 = {
    /**
     * @remarks The type of the block mask to match.
     */
    matchingBlock?: string;
    /**
     * @remarks The block states of the block mask to match.
     */
    matchingBlockStates?: Record<string, string | number | boolean>;
};
export type FillOptions2 = {
    /**
     * @remarks The type of the block mask to match.
     */
    matchingBlock?: string;
    /**
     * @remarks The block states of the block mask to match.
     */
    matchingBlockStates?: Record<string, string | number | boolean>;
    /**
     * @remarks The shortest the generation can run for before pausing until the next tick.
     */
    minMSBetweenYields?: number;
};
/**
 * Generates a tunnel.
 * @deprecated Legacy function that may cause script hang errors.
 * @param {Vector3} center The location of the center of the tunnel.
 * @param {number} radius The radius of the tunnel.
 * @param {number} length The length of the tunnel.
 * @param {number} axis The axis of the tunnel.
 * @param {Dimension} dimension The dimension to generate the tunnel in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} [blockStates] - The block states of the block permutation to generate.
 * @param {FillOptions1} [options] - Optional extra options for the tunnel generation execution.
 * @param {string} [placeholderid] The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} [replacemode] Whether or not to clear container blocks before replacing them.
 * @param {number} [integrity] The integrity of the tunnel generation.
 * @returns A promise that resolves with the details of the tunnel generation once the tunnel generation is complete.
 */
export declare function fillBlocksHT(center: Vector3, radius: number, length: number, axis: string, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: FillOptions1, placeholderid?: string, replacemode?: boolean, integrity?: number): number;
/**
 * Generates a fill.
 * @deprecated Legacy function. Superceeded by fillBlocksHFGB().
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block A string representing the block type to generate or a function to determine the BlockType to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export declare function fillBlocksHFG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation, index: bigint) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export declare function fillBlocksHFGB(begin: Vector3, end: Vector3, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a fill. Supports block masks.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export declare function fillBlocksHFGBM(begin: Vector3, end: Vector3, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    blockMask: BlockMask;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a flood fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to flood.
 * @param {Vector3} end The location of the opposite corner of the area to flood.
 * @param {Dimension} dimension The dimension to generate the flood fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param integrity The integrity of the flood fill generation.
 * @returns A promise that resolves with the details of the flood fill generation once the flood fill generation is complete.
 */
export declare function fillBlocksHFFGB(begin: Vector3, end: Vector3, dimension: Dimension, options?: {
    minMSBetweenYields?: number;
}, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a drain fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to flood.
 * @param {Vector3} end The location of the opposite corner of the area to flood.
 * @param {Dimension} dimension The dimension to generate the flood fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param integrity The integrity of the flood fill generation.
 * @returns A promise that resolves with the details of the flood fill generation once the flood fill generation is complete.
 */
export declare function fillBlocksHDFGB(begin: Vector3, end: Vector3, dimension: Dimension, options?: {
    minMSBetweenYields?: number;
}, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a walls fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to have its walls filled in.
 * @param {Vector3} end The location of the opposite corner of the area to have its walls filled in.
 * @param {Dimension} dimension The dimension to generate the walls fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the walls fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the walls fill generation.
 * @returns A promise that resolves with the details of the walls fill generation once the walls fill generation is complete.
 */
export declare function fillBlocksHWFGB(begin: Vector3, end: Vector3, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a hollow fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to have its edges filled in.
 * @param {Vector3} end The location of the opposite corner of the area to have its edges filled in.
 * @param {Dimension} dimension The dimension to generate the hollow fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the hollow fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the hollow fill generation.
 * @returns A promise that resolves with the details of the hollow fill generation once the hollow fill generation is complete.
 */
export declare function fillBlocksHHFGB(begin: Vector3, end: Vector3, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * Generates a outline fill.
 * @async
 * @param {Vector3} begin The location of a corner of the area to have its outline filled in.
 * @param {Vector3} end The location of the opposite corner of the area to have its outline filled in.
 * @param {Dimension} dimension The dimension to generate the outline fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the outline fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the outline fill generation.
 * @returns A promise that resolves with the details of the outline fill generation once the outline fill generation is complete.
 */
export declare function fillBlocksHOFGB(begin: Vector3, end: Vector3, dimension: Dimension, block: ((location: DimensionLocation, index: bigint) => BlockPermutation), options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
/**
 * @deprecated
 */
export declare function fillBlocksC(begin: Vector3, end: Vector3, dimension: Dimension, blocktype?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksCG(begin: Vector3, end: Vector3, dimension: Dimension, blocktype?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean, onComplete?: (counter?: number, startTime?: number, completeTime?: number, totalTime?: number, argsObject?: any, ...args: any[]) => any, onCompleteArgsObject?: any, ...onCompleteArgs: any[]): Generator<any, void, unknown>;
export declare function v3Multiply(a: Vector3, b: number | Vector3): {
    x: number;
    y: number;
    z: number;
};
/**
 * @deprecated
 */
export declare function fillBlocksD(from: Vector3, to: Vector3, dimension: Dimension, block?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean): number;
/**
 * @deprecated
 */
export declare function fillBlocksE(from: Vector3, to: Vector3, dimension: Dimension, block?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean): Promise<number>;
export declare function gwdp(propertyId: string): string | number | boolean | Vector3;
export declare function swdp(propertyId: string, newValue?: string | number | boolean | undefined): void;
export declare function gedp(entity: Entity | Player, propertyId: string): string | number | boolean | Vector3;
export declare function sedp(entity: Entity | Player, propertyId: string, newValue?: string | number | boolean | undefined): void;
export declare function gidp(item: ItemStack | ContainerSlot, propertyId: string): string | number | boolean | Vector3;
export declare function sidp(item: ItemStack | ContainerSlot, entity: Entity | Player, propertyId: string, newValue?: string | number | boolean | undefined): void;
export declare class interactable_blockb {
    id: string;
    delay: number;
    holdDuration?: number;
}
export declare let interactable_block: interactable_blockb[];
export declare class customFormUIElement {
    index: number;
    type: String;
    args: String[];
    code: String;
    typeIndex: number;
    constructor(index: number, type: String, args: String[]);
}
export declare function strToCustomFormUIElement(string: string): main.customFormUIElement;
export declare function arrayToElementList(ids: String[], array: String[]): main.customFormUIElement[];
export declare function getUICustomForm(optionsids: string, codeids: string): {
    optionPropertyIds: string[];
    optionPropertyValues: string[];
    optionElements: main.customFormUIElement[];
    codeIds: string[];
    codeValues: string[];
    code: string;
};
export declare function debugActionb(block: Block, player: Player, mode: number, direction?: number): void;
export declare function debugAction(block: Block, player: Player, mode: number, direction?: number): void;
export declare function getNextTopSolidBlockAbovePosition(location: Vector3, dimension: Dimension, onlySolid?: boolean, allowLiquidAbove?: boolean, allowNonSolidBlocksAbove?: boolean, allowLiquidBelow?: boolean): Block;
export declare function getNextTopSolidBlockBelowPosition(location: Vector3, dimension: Dimension, onlySolid?: boolean, allowLiquidAbove?: boolean, allowNonSolidBlocksAbove?: boolean, allowLiquidBelow?: boolean): Block;
export declare function getGroundSolidBlock(location: Vector3, dimension: Dimension, onlySolid?: boolean): Block;
export declare function getTopSolidBlock(location: Vector3, dimension: Dimension, onlySolid?: boolean): Block;
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: the overworld
 * @property minecraft:overworld: the overworld
 * @property nether: the nether
 * @property minecraft:nether: the nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export declare const dimensionTypeDisplayFormatting: {
    "minecraft:overworld": "the overworld";
    overworld: "the overworld";
    "minecraft:nether": "the nether";
    nether: "the nether";
    "minecraft:the_end": "the end";
    the_end: "the end";
};
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export declare const dimensionTypeDisplayFormattingB: {
    "minecraft:overworld": "overworld";
    overworld: "overworld";
    "minecraft:nether": "nether";
    nether: "nether";
    "minecraft:the_end": "the end";
    the_end: "the end";
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: The Overworld
 * @property minecraft:overworld: The Overworld
 * @property nether: The Nether
 * @property minecraft:nether: The Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export declare const dimensionTypeDisplayFormattingC: {
    "minecraft:overworld": "The Overworld";
    overworld: "The Overworld";
    "minecraft:nether": "The Nether";
    nether: "The Nether";
    "minecraft:the_end": "The End";
    the_end: "The End";
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types.
 * @property overworld: Overworld
 * @property minecraft:overworld: Overworld
 * @property nether: Nether
 * @property minecraft:nether: Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export declare const dimensionTypeDisplayFormattingD: {
    "minecraft:overworld": "Overworld";
    overworld: "Overworld";
    "minecraft:nether": "Nether";
    nether: "Nether";
    "minecraft:the_end": "The End";
    the_end: "The End";
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that have formatting codes.
 * @property overworld: §aOverworld
 * @property minecraft:overworld: §aOverworld
 * @property nether: §cNether
 * @property minecraft:nether: §cNether
 * @property the_end: §dThe End
 * @property minecraft:the_end: §dThe End
 */
export declare const dimensionTypeDisplayFormattingE: {
    "minecraft:overworld": "§aOverworld";
    overworld: "§aOverworld";
    "minecraft:nether": "§cNether";
    nether: "§cNether";
    "minecraft:the_end": "§dThe End";
    the_end: "§dThe End";
};
/**
 * @remarks Maps the dimension IDs to their non-namespaces versions.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the_end
 * @property minecraft:the_end: the_end
 */
export declare const dimensionTypeDisplayFormattingF: {
    "minecraft:overworld": "overworld";
    overworld: "overworld";
    "minecraft:nether": "nether";
    nether: "nether";
    "minecraft:the_end": "the_end";
    the_end: "the_end";
};
/**
 * @remarks An array containing all of the dimension objects.
 * @property 0: Overworld
 * @property 1: Nether
 * @property 2: The End
 */
export declare const dimensions: [Dimension, Dimension, Dimension];
/**
 * @remarks Maps the namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 */
export declare const dimensionsb: {
    "minecraft:overworld": Dimension;
    "minecraft:nether": Dimension;
    "minecraft:the_end": Dimension;
};
/**
 * @remarks Maps the non-namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export declare const dimensionsc: {
    overworld: Dimension;
    nether: Dimension;
    the_end: Dimension;
};
/**
 * @remarks An array containing all of the namespaced dimension IDs.
 * ```typescript
 * 0: "minecraft:overworld"
 * 1: "minecraft:nether"
 * 2: "minecraft:the_end"
 * ```
 */
export declare const dimensionsd: ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
/**
 * @remarks An array containing all of the non-namespaced dimension IDs.
 * ```typescript
 * 0: "overworld"
 * 1: "nether"
 * 2: "the_end"
 * ```
 */
export declare const dimensionse: ["overworld", "nether", "the_end"];
/**
 * @remarks Maps the dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export declare const dimensionsf: {
    "minecraft:overworld": Dimension;
    "minecraft:nether": Dimension;
    "minecraft:the_end": Dimension;
    overworld: Dimension;
    nether: Dimension;
    the_end: Dimension;
};
/**
 * @remarks The overworld dimension object.
 */
export declare const overworld: Dimension;
/**
 * @remarks The nether dimension object.
 */
export declare const nether: Dimension;
/**
 * @remarks The end dimension object.
 */
export declare const the_end: Dimension;
export declare const outsideBorderTintShownTimes: {
    [id: string]: number;
};
export declare const outsideBorderTintParticleMolangVariableMapObject: MolangVariableMap;
