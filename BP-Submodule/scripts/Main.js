// Copyright (c) Microsoft Corporation.  All rights reserved.
import { system } from "@minecraft/server";
globalThis.beforeScriptStartTick = system.currentTick;
export const format_version = "1.26.0-rc.3+BUILD.1";
export const supported_minecraft_version = "1.21.4x";
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
globalThis.modules = {
    assets: {
        classes: {},
        constants: {},
    },
};
import "Assets/classes/JSONB";
import "Global";
/*
import "AllayTests.js";
import "APITests.js";*/
import "BlockEventTests.js"; /*
import "BlockTests.js";*/
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js"; /*
import "DispenserTests.js";
import "DoorTests.js";
import "DripstoneTests.js";
import "DuplicationTests.js";
import "EntityQueryTests.js";
import "EntityTests.js";
import "ExtensionTests.js";
import "FireAvoidTests.js";
import "FrogTests.js";*/
import "GameTestExtensions.js"; /*
import "MinecartTests.js";
import "MobTests.js";
import "MultifaceTests.js";
import "PathFindingTests.js";
import "FlyingMachineTests.js";
import "PistonTests.js";
import "TntTests.js";
import "WaterPathfindingTests.js";
import "WardenTests.js";
import "SmallMobTests.js";
import "BigMobTests.js";
import "RaycastingTests.js";
import "RedstoneTests.js";*/
import "SimulatedPlayerTests.js"; /*
import "RespawnAnchorTests.js";
import "PlaceSeedsTests.js";
import "ItemTests.js";*/
import "ItemEnchantmentsTests.js"; /*
import "SculkTests.js";
import "VibrationTests.js";
import "EnchantmentTests.js";*/ /*
import "Eval.js";*/
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
export const mainmetaimport = import.meta;
export const editorStickMenuOpeningAsyncCancelActionNumbers = {};
import * as transformrecipes from "Assets/constants/transformrecipes";
globalThis.modules.assets.constants.transformrecipes = transformrecipes;
import * as errors from "Main/errors";
globalThis.modules.errors = errors;
import { Block, BlockEvent, BlockPermutation, BlockStateType, BlockType /*, MinecraftBlockTypes*/ /*, Camera*/, Dimension, Entity, EntityInventoryComponent, EntityScaleComponent, ItemDurabilityComponent, ItemLockMode, ItemStack, Player, PlayerIterator, ScriptEventCommandMessageAfterEventSignal, ScriptEventSource, WeatherType, world, BlockInventoryComponent /*, EntityEquipmentInventoryComponent*/, EntityComponent, /*PropertyRegistry, DynamicPropertiesDefinition, */ EntityType, EntityTypes /*, MinecraftEntityTypes*/, EquipmentSlot, Container, EntityEquippableComponent, BlockTypes, MolangVariableMap, Scoreboard, ScoreboardObjective, DimensionType, DimensionTypes, MinecraftDimensionTypes, EnchantmentType, EnchantmentTypes, BlockStates, BlockVolume, CompoundBlockVolume /*, BlockVolumeUtils*/ /*, BlockVolumeBaseZ*/, EntityBreathableComponent, EntityColorComponent, EntityFlyingSpeedComponent, EntityFrictionModifierComponent, EntityGroundOffsetComponent, EntityHealthComponent, EntityMarkVariantComponent, EntityPushThroughComponent, EntitySkinIdComponent, EntityTameableComponent, SignSide, ItemEnchantableComponent, DyeColor, GameMode, ContainerSlot, EntityProjectileComponent, BlockVolumeBase, System, CompoundBlockVolumeAction, EntityDamageCause, LocationInUnloadedChunkError, UnloadedChunksError, StructureSaveMode, LocationOutOfWorldBoundariesError } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, FormCancelationReason, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { SimulatedPlayer, Test } from "@minecraft/server-gametest";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d, generateCircleCoordinatesB, drawMinecraftCircle, drawMinecraftSphere, generateMinecraftSphere, generateHollowSphere, degradeArray, generateMinecraftTunnel, generateMinecraftSphereB, generateMinecraftSphereBG, generateMinecraftSphereBGIdGenerator, generateMinecraftSphereBGProgress, generateHollowSphereBG, generatorProgressIdGenerator, generatorProgress, generateMinecraftSemiSphereBG, generateDomeBG, generateMinecraftOvoidBG, generateMinecraftOvoidCG, generateSolidOvoid, generateSolidOvoidBG, generateSkygridBG, generateInverseSkygridBG, generateFillBG, generateWallsFillBG, generateHollowFillBG, generateOutlineFillBG, Vector, dirmap, diroffsetmap, diroffsetothersmap, generateMinecraftConeBG } from "Main/coordinates";
import { commands_format_version, chatCommands, evaluateParameters, evaluateParametersOld, getPlayersWithTags, vTStr, getPlayersWithAnyOfTags, disconnectingPlayers, BlockPattern, testBlockForMatch, executeCommandPlayerW, BlockMask, testBlockForMatchToMask } from "Main/commands";
import { ban, ban_format_version } from "Main/ban";
import { player_save_format_version, savedPlayer } from "Main/player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "Main/spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, PlayerNotifications } from "Main/ui.js";
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
import * as utils from "Main/utilities";
globalThis.modules.utils = utils;
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver"; /*
import { disableWatchdog } from "@minecraft/debug-utilities";*/
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import { chatMessage, patternColors, patternColorsMap, patternFunctionList, evaluateChatColorType, chatSend } from "Main/chat";
import { targetSelectorAllListE, targetSelectorB, targetSelectorAllListC, clearContainer } from "Main/command_utilities";
import { customModulo } from "Main/utilities";
import { TimeoutError } from "Main/errors.js";
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
transformrecipes;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
SimulatedPlayer;
Test;
mcMath;
globalThis.scriptStartTick = system.currentTick;
globalThis.crashEnabled = false;
globalThis.tempSavedVariables = [];
export async function checkIfCompatibleEntityScaleIsActive(init = false, maxWaitTicks = 20) {
    const promise1Result = await new Promise((resolve, reject) => {
        overworld.runCommand(`/scriptevent andexsa:debugSticks${init ? "Init" : "Test"}Signal ${format_version}`);
        const rId1 = system.afterEvents.scriptEventReceive.subscribe(event => {
            if (event.id == `andexdb:debugSticks${init ? "Init" : "Test"}SignalReceivedByEntityScale`) {
                system.afterEvents.scriptEventReceive.unsubscribe(rId1);
                resolve(event.message);
            }
            ;
        });
        if (maxWaitTicks != Infinity) {
            system.waitTicks(maxWaitTicks).then(v => reject(new TimeoutError(`The request to see if a compatible version of entity scale is active timed out. It took longer than ${maxWaitTicks} ticks.`)));
        }
    }).then(v => v, v => { return false; });
    return promise1Result;
}
;
// const a = ((a: `${bigint}.${bigint}.${bigint}${`-${string}`|""}${`+${string}`|""}`)=>{})("1.1.1-preview.20+BUILD.1");
export function mainEval(x) { return eval(x); }
export function indirectMainEval(x) { return eval?.(x); }
export function mainRun(x, ...args) { return x(...args); }
export function spawnBlockSurroundingParticleForPlayer(player, location, textures) {
    player.spawnParticle(textures.up ?? textures.default, Vector.add(location, { x: 0.5, y: 1.005, z: 0.5 }));
    player.spawnParticle(textures.north ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: -0.005 }));
    player.spawnParticle(textures.east ?? textures.default, Vector.add(location, { x: -0.005, y: 0.5, z: 0.5 }));
    player.spawnParticle(textures.down ?? textures.default, Vector.add(location, { x: 0.5, y: -0.005, z: 0.5 }));
    player.spawnParticle(textures.south ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: 1.005 }));
    player.spawnParticle(textures.west ?? textures.default, Vector.add(location, { x: 1.005, y: 0.5, z: 0.5 }));
}
export function spawnBlockSurroundingParticle(dimension, location, textures) {
    dimension.spawnParticle(textures.up ?? textures.default, Vector.add(location, { x: 0.5, y: 1.005, z: 0.5 }));
    dimension.spawnParticle(textures.north ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: -0.005 }));
    dimension.spawnParticle(textures.east ?? textures.default, Vector.add(location, { x: -0.005, y: 0.5, z: 0.5 }));
    dimension.spawnParticle(textures.down ?? textures.default, Vector.add(location, { x: 0.5, y: -0.005, z: 0.5 }));
    dimension.spawnParticle(textures.south ?? textures.default, Vector.add(location, { x: 0.5, y: 0.5, z: 1.005 }));
    dimension.spawnParticle(textures.west ?? textures.default, Vector.add(location, { x: 1.005, y: 0.5, z: 0.5 }));
}
export const timeZones = [["BIT", "IDLW", "NUT", "SST", "CKT", "HST", "SDT", "TAHT", "MART", "MIT", "AKST", "GAMT", "GIT", "HDT", "AKDT", "CIST", "PST", "MST", "PDT", "CST", "EAST", "GALT", "MDT", "ACT", "CDT", "COT", "CST"], [-12, -12, -11, -11, -10, -10, -10, -10, -9.5, -9.5, -9, -9, -9, -9, -8, -8, -8, -7, -7, -6, -6, -6, -6, -5, -5, -5, -5]]; /*
disableWatchdog(Boolean(world.getDynamicProperty("andexdbSettings:disableWatchdog")??(!((world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash")??false))??false)??true)??true);  */
subscribedEvents.beforeWatchdogTerminate = system.beforeEvents.watchdogTerminate.subscribe(e => {
    try {
        if (crashEnabled == true) {
            return;
        }
        else {
            if (world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") == true) {
                return;
            }
            else {
                e.cancel = true;
                console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`);
                try {
                    world.getAllPlayers().filter(p => p.hasTag("getWatchdogTerminationCancelWarnings")).forEach(p => p.sendMessage(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`));
                }
                catch { }
                ;
            }
        }
    }
    catch {
        e.cancel = true;
        console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`);
        try {
            world.getAllPlayers().filter(p => p.hasTag("getWatchdogTerminationCancelWarnings")).forEach(p => p.sendMessage(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`));
        }
        catch { }
        ;
    }
});
world.setDynamicProperty("format_version", format_version);
try {
    eval(String(world.getDynamicProperty("evalEvents:scriptInitialize")));
}
catch (e) {
    console.error(e, e.stack);
}
const srununbound = system.run;
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
export const srun = srununbound.bind(system);
export const gt = globalThis;
/**
 * A class containing the configuration information for the add-on.
 */
export class config {
    static get chatCommandsEnabled() { return Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") ?? true); }
    static set chatCommandsEnabled(enabled) { world.setDynamicProperty("andexdbSettings:chatCommandsEnabled", enabled ?? true); }
    static get chatCommandPrefix() { return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"); }
    static set chatCommandPrefix(prefix) { world.setDynamicProperty("andexdbSettings:chatCommandPrefix", prefix ?? "\\"); }
    static get validChatCommandPrefixes() { return String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""); }
    static set validChatCommandPrefixes(prefixes) { world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", prefixes ?? ""); }
    static get invalidChatCommandAction() { return isNaN(Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction"))) ? 3 : Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3); }
    static set invalidChatCommandAction(invalidChatCommandAction) { world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction ?? 3); }
    static get undoClipboardMode() { return String(world.getDynamicProperty("andexdbSettings:undoClipboardMode") ?? StructureSaveMode.Memory); }
    static set undoClipboardMode(undoClipboardMode) { world.setDynamicProperty("andexdbSettings:undoClipboardMode", undoClipboardMode ?? StructureSaveMode.Memory); }
    static get spawnCommandLocation() { const v = tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbSettings:spawnCommandLocation") ?? '{x: null, y: null, z: null, dimension: "overworld"}'))) ?? { x: null, y: null, z: null, dimension: "overworld" }; return tryget(() => ({ x: v.x, y: v.y, z: v.z, dimension: dimensionsb[String(v.dimension)] ?? overworld })) ?? { x: null, y: null, z: null, dimension: overworld }; }
    static set spawnCommandLocation(spawnCommandLocation) { world.setDynamicProperty("andexdbSettings:spawnCommandLocation", JSON.stringify({ x: spawnCommandLocation.x, y: spawnCommandLocation.y, z: spawnCommandLocation.z, dimension: spawnCommandLocation.dimension ?? overworld })); }
    static get worldBorder() {
        return {
            get overworld() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.enabled", enabled ?? false); },
                    get from() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.from") ?? '{x: -29999984, z: -29999984}'))) ?? { x: -29999984, z: -29999984 }; },
                    set from(from) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 })); },
                    get to() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.to") ?? '{x: 29999984, z: 29999984}'))) ?? { x: 29999984, z: 29999984 }; },
                    set to(to) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 })); },
                    get mode() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1); },
                    set mode(mode) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1); },
                    get damage() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1); },
                    set damage(damage) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1); },
                    get knockbackH() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5); },
                    set knockbackH(horizontalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5); },
                    get knockbackV() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25); },
                    set knockbackV(verticalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25); },
                    get preventWorldInteractionOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false); },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false); },
                    get tintIntensity() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1); },
                    set tintIntensity(tintIntensity) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1); },
                    /**
                     * d
                     * @todo
                     */
                    get warnPlayersInChat() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false); },
                    /**
                     * c
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false); },
                    /**
                     * b
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false); },
                    /**
                     * a
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false); },
                    get showRedScreenOutlineWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true); },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true); },
                    get showBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true); },
                    set showBorderParticles(showBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true); },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false); },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false); },
                    get buffer() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5); },
                    set buffer(buffer) { world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5); }
                };
            },
            get nether() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false); },
                    get from() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? '{x: -29999984, z: -29999984}'))) ?? { x: -29999984, z: -29999984 }; },
                    set from(from) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 })); },
                    get to() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? '{x: 29999984, z: 29999984}'))) ?? { x: 29999984, z: 29999984 }; },
                    set to(to) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 })); },
                    get mode() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1); },
                    set mode(mode) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1); },
                    get damage() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1); },
                    set damage(damage) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1); },
                    get knockbackH() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5); },
                    set knockbackH(horizontalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5); },
                    get knockbackV() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25); },
                    set knockbackV(verticalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25); },
                    get preventWorldInteractionOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false); },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false); },
                    get tintIntensity() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1); },
                    set tintIntensity(tintIntensity) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1); },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false); },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false); },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false); },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false); },
                    get showRedScreenOutlineWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true); },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true); },
                    get showBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true); },
                    set showBorderParticles(showBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true); },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false); },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false); },
                    get buffer() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5); },
                    set buffer(buffer) { world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5); }
                };
            },
            get the_end() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false); },
                    get from() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? '{x: -29999984, z: -29999984}'))) ?? { x: -29999984, z: -29999984 }; },
                    set from(from) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 })); },
                    get to() { return tryget(() => JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? '{x: 29999984, z: 29999984}'))) ?? { x: 29999984, z: 29999984 }; },
                    set to(to) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 })); },
                    get mode() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1); },
                    set mode(mode) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1); },
                    get damage() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1); },
                    set damage(damage) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1); },
                    get knockbackH() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5); },
                    set knockbackH(horizontalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5); },
                    get knockbackV() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25); },
                    set knockbackV(verticalKnockback) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25); },
                    get preventWorldInteractionOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false); },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder", preventWorldInteractionOutsideBorder ?? false); },
                    get tintIntensity() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1); },
                    set tintIntensity(tintIntensity) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1); },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false); },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false); },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false); },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder", showActionbarWarningWhenOutsideBorder ?? false); },
                    get showRedScreenOutlineWhenOutsideBorder() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true); },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder", showRedScreenOutlineWhenOutsideBorder ?? true); },
                    get showBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true); },
                    set showBorderParticles(showBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true); },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() { return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false); },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles", useShadersCompatibleBorderParticles ?? false); },
                    get buffer() { return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5); },
                    set buffer(buffer) { world.setDynamicProperty("andexdbWorldBorderSettings:the_end.buffer", buffer ?? 5); }
                };
            }
        };
    }
    static get shopSystem() {
        return {
            get server() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false); }
                };
            },
            get player() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false); },
                    get maxShopsPerPlayer() { return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber(); },
                    set maxShopsPerPlayer(maxShopsPerPlayer) { world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5); },
                    get allowSellingLockInSlotItems() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false); },
                    set allowSellingLockInSlotItems(allowSellingLockInSlotItems) { world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false); },
                    get allowSellingLockInInventoryItems() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false); },
                    set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems) { world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems", allowSellingLockInInventoryItems ?? false); },
                    get allowSellingKeepOnDeathItems() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true); },
                    set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems) { world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems", allowSellingKeepOnDeathItems ?? true); }
                };
            },
            get sign() {
                return {
                    get enabled() { return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false); },
                    set enabled(enabled) { world.setDynamicProperty("andexdbShopSystemSettings:sign.enabled", enabled ?? false); }
                };
            }
        };
    }
    static get homeSystem() {
        return {
            get homeSystemEnabled() { return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? false); },
            set homeSystemEnabled(enabled) { world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? false); },
            get maxHomesPerPlayer() { return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1 ? Infinity : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity); },
            set maxHomesPerPlayer(maxHomes) { world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes); }
        };
    }
    static get tpaSystem() {
        return {
            get tpaSystemEnabled() { return Boolean(world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? false); },
            set tpaSystemEnabled(enabled) { world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? false); },
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             */
            get timeoutDuration() { return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration"))) ? 60 : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60); },
            set timeoutDuration(timeoutDuration) { world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60); }
        };
    }
    static get chatRanks() {
        return {
            get chatDisplayTimeStamp() { return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false); },
            set chatDisplayTimeStamp(chatDisplayTimeStampEnabled) { world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false); },
            get showRanksOnPlayerNameTags() { return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false); },
            set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags) { world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false); },
            get rankMode() { return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple"); },
            set rankMode(rankMode) { world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple"); },
            get rankDisplayPrefix() { return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["); },
            set rankDisplayPrefix(rankDisplayPrefix) { world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "["); },
            get rankDisplaySuffix() { return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]"); },
            set rankDisplaySuffix(rankDisplaySuffix) { world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]"); },
            get nameDisplayPrefix() { return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "["); },
            set nameDisplayPrefix(nameDisplayPrefix) { world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<"); },
            get nameDisplaySuffix() { return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]"); },
            set nameDisplaySuffix(nameDisplaySuffix) { world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>"); },
            get chatNameAndMessageSeparator() { return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); },
            set chatNameAndMessageSeparator(chatNameAndMessageSeparator) { world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " "); },
            get rankDisplaySeparator() { return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "); },
            set rankDisplaySeparator(rankDisplaySeparator) { world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator ?? " "); },
            get rankTemplateString() { return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]"); },
            set rankTemplateString(rankTemplateString) { world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]"); },
            get messageTemplateString() { return String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ?? "§r${timestampenabled?`[${timestamp}]`:\"\"}${ranks}§r${(ranks!=\"\")?\" \":\"\"}<${name}§r> ${message}"); },
            set messageTemplateString(messageTemplateString) { world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString ?? "§r${timestampenabled?`[${timestamp}]`:\"\"}${ranks}§r${(ranks!=\"\")?\" \":\"\"}<${name}§r> ${message}"); },
            get defaultRankTemplateString() { return String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? ""); },
            set defaultRankTemplateString(defaultRankTemplateString) { world.setDynamicProperty("andexdbSettings:defaultRankTemplateString", defaultRankTemplateString ?? ""); },
            get defaultMessageFormatting() { return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? ""); },
            set defaultMessageFormatting(defaultMessageFormatting) { world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? ""); },
            get defaultNameFormatting() { return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? ""); },
            set defaultNameFormatting(defaultNameFormatting) { world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? ""); },
            get defaultSeparatorFormatting() { return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? ""); },
            set defaultSeparatorFormatting(defaultSeparatorFormatting) { world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? ""); },
            get disableCustomChatMessages() { return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false); },
            set disableCustomChatMessages(disableCustomChatMessages) { world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false); },
            get allowCustomChatMessagesMuting() { return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false); },
            set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting) { world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false); },
            get autoEscapeChatMessages() { return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false); },
            set autoEscapeChatMessages(autoEscapeChatMessages) { world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false); },
            get autoURIEscapeChatMessages() { return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false); },
            set autoURIEscapeChatMessages(autoURIEscapeChatMessages) { world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false); },
            get allowChatEscapeCodes() { return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false); },
            set allowChatEscapeCodes(allowChatEscapeCodes) { world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false); },
        };
    }
    static get antiSpamSystem() {
        return {
            get antispamEnabled() { return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false); },
            set antispamEnabled(enabled) { world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false); },
            get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute() { return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false); },
            set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute) { world.setDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute", restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute ?? false); },
            get waitTimeAfterAntispamActivation() { return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation"))) ? 60 : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60); },
            set waitTimeAfterAntispamActivation(waitTimeInSeconds) { world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60); },
            get maxTimeBewteenMessagesToTriggerAntiSpam() { return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam"))) ? 5 : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5); },
            set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds) { world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5); },
            get antispamTriggerMessageCount() { return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount"))) ? 4 : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4); },
            set antispamTriggerMessageCount(messageCount) { world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4); }
        };
    }
    static get ui() {
        return {
            get main() {
                return {};
            },
            get pages() {
                return {
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxPlayersPerManagePlayersPage() { return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 10); },
                    set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage) { world.setDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage", Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 10))); },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxBansPerManageBansPage() { return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10); },
                    set maxBansPerManageBansPage(maxBansPerManageBansPage) { world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10); },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxHomesPerManageHomesPage() { return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10); },
                    set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage) { world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10); }
                };
            },
            get other() {
                return {
                    get useStarWarsReference404Page() { return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false); },
                    set useStarWarsReference404Page(useStarWarsReference404Page) { world.setDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page", useStarWarsReference404Page ?? false); }
                };
            }
        };
    }
    static get system() {
        return {
            get artificialLagMS() { return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0); },
            set artificialLagMS(artificialLagMS) { world.setDynamicProperty("andexdbSettings:artificialLagMS", artificialLagMS ?? 0); },
            get timeZone() { return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone"))) ? 0 : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0); },
            set timeZone(timeZone) { world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0); },
            get playerDataRefreshRate() { return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20); },
            set playerDataRefreshRate(playerDataRefreshRate) { world.setDynamicProperty("andexdbSettings:playerDataRefreshRate", Number.isNaN(Number(playerDataRefreshRate)) ? 5 : Math.min(1000, Math.max(1, Number(playerDataRefreshRate ?? 20)))); },
            get protectedAreasRefreshRate() { return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200); },
            set protectedAreasRefreshRate(protectedAreasRefreshRate) { world.setDynamicProperty("andexdbSettings:protectedAreasRefreshRate", Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200)))); },
            get bannedPlayersRefreshRate() { return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20); },
            set bannedPlayersRefreshRate(bannedPlayersRefreshRate) { world.setDynamicProperty("andexdbSettings:bannedPlayersRefreshRate", Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20)))); },
            get debugMode() { return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false); },
            set debugMode(debugMode) { world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false); },
            /**
             * It is reccommended to leave this set to false.
             */
            get allowWatchdogTerminationCrash() { return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false); },
            set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash) { world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false); },
            /**
             * It is reccommended to leave this set to false.
             */
            get hideWatchdogTerminationCrashEnabledWarningsOnStartup() { return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false); },
            set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup) { world.setDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup", hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false); },
            /**
             * It is reccommended to leave this set to false.
             * @default false
             * @decorator
             * also
             * false
             */
            get useLegacyPlayerInventoryDataSaveSystem() { return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false); },
            set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem) { world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false); },
            get playerInventoryDataSaveSystemEnabled() { return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true); },
            set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled) { world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true); },
            get spreadPlayerInventoryDataSavesOverMultipleTicks() { return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true); },
            set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks) { world.setDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks", spreadPlayerInventoryDataSavesOverMultipleTicks ?? true); },
            get showEntityScaleNotFoundConsoleLog() { return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true); },
            set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog) { world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true); },
            get showEntityScaleFoundConsoleLog() { return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true); },
            set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog) { world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true); },
            get showEntityScaleNotFoundChatLog() { return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false); },
            set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog) { world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false); },
            get showEntityScaleFoundChatLog() { return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false); },
            set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog) { world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false); },
        };
    }
    static reset() {
        // Object.entries(Object.getOwnPropertyDescriptors(this)).filter(v=>v[1].hasOwnProperty("get")).flatMap(v=>v[1].hasOwnProperty("set")?v[1]:v[1]["get"]())
    }
    static toJSON() {
        return Object.fromEntries(Object.getOwnPropertyNames(config).filter(n => !["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "name", "prototype", "reset", "length"].includes(n)).map(n => [n, config[n]]));
    }
}
export class worldPlayers {
    rotx;
    roty;
    dimension;
    entity;
    block; /*
    constructor(location: Vector3, rotation: Vector2, dimension?: DimensionType|Dimension|string, entity?: Entity|Player, block?: Block) {
        this.location = location;
        this.rotation = rotation;
        if(dimension == undefined){}else{this.dimension = world.getDimension((dimension as DimensionType)?.typeId ?? (dimension as Dimension)?.id ?? (dimension as string)); };
        this.entity = entity as Entity
        this.block = block*/ /*
    if(dimension.constructor.name == DimensionType.constructor.name){this.dimension = world.getDimension((dimension as DimensionType)?.typeId)}else{this.dimension = world.getDimension((dimension as Dimension)?.id)}; */ /*
}*/
    static get savedPlayers() {
        return savedPlayer.getSavedPlayers();
    }
    static get bans() {
        return ban.getBans();
    } /*
    get rotation() {
        return {x: this.rotx, y: this.roty};
    }
    get rotationstring() {
        return this.rotx+" "+this.roty;
    }
    get locationrotation() {
        return {x: this.x, y: this.y, z: this.z, rotx: this.rotx, roty: this.roty};
    }
    get directionvector() {
        return anglesToDirectionVectorDeg(this.rotx, this.roty) as Vector3;
    }
    set location(location: Vector3) {
        this.x = location.x;
        this.y = location.y;
        this.z = location.z;
    }
    set rotation(rotation: Vector2) {
        this.rotx = rotation.x;
        this.roty = rotation.y;
    }*/ /*
    in(dimension?: DimensionType|Dimension|string){
        if(dimension == undefined){this.dimension = undefined}else{this.dimension = world.getDimension((dimension as DimensionType)?.typeId ?? (dimension as Dimension)?.id ?? (dimension as string)); };
        return this as WorldPosition;
    }
    rotated(x: number|string, y: number|string) {
        if(x.toString().startsWith("~")){this.rotx = (((this.rotx+Number(x.toString().slice(1) ?? "0")+180) % 360)-180)}else{this.rotx = Number(x.toString() ?? "0")};
        if(y.toString().startsWith("~")){this.roty = (((this.roty+Number(y.toString().slice(1) ?? "0")+90) % 180)-90)}else{this.roty = Number(y.toString() ?? "0")};
        return this as WorldPosition;
    }
    at(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.location = entity?.location ?? this.location; this.rotation = entity?.getRotation() ?? this.rotation; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.location = entity?.location ?? this.location; this.rotation = entity?.getRotation() ?? this.rotation; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.location = entity.location; this.rotation = entity.getRotation(); }}
        return this as WorldPosition;
    }
    as(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){this.entity = target as Entity; }else{
        if(this.entity == undefined){this.entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0]; }else{this.entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; }}
        return this as WorldPosition;
    }
    asblock(block: DimensionLocation|Block) {
        if(block.constructor.name == "Block"){this.block = (block as Block)}else{this.block = block.dimension.getBlock(block as DimensionLocation)};
        return this as WorldPosition;
    }
    matchrotation(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.rotation = entity?.getRotation() ?? this.rotation; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.rotation = entity?.getRotation() ?? this.rotation; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.rotation = entity.getRotation(); }}
        return this as WorldPosition;
    }
    matchlocation(target: string|Entity|Player) {
        if(target.constructor.name == "Entity"||target.constructor.name == "Player"){let entity = target as Entity; this.location = entity?.location ?? this.location; }else{
        if(this.entity == undefined){let entity = targetSelectorAllListE(target as string, this.x+" "+this.y+" "+this.z)[0] ?? this.entity; this.location = entity?.location ?? this.location; }else{let entity = targetSelectorAllListC(target as string, "", this.x+" "+this.y+" "+this.z, this.entity)[0] ?? this.entity; this.location = entity.location; this.rotation = entity.getRotation(); }}
        return this as WorldPosition;
    }
    anchored(anchor: string) {
        if(this.entity != undefined){if(anchor.toLowerCase().includes("feet")){this.location = this.entity.location; }; if(anchor.toLowerCase().includes("eyes")){this.location = this.entity.getHeadLocation(); }; };
        return this as WorldPosition;
    }
    resetRotation() {
        if(this.entity != undefined){this.rotation = this.entity.getRotation(); };
        return this as WorldPosition;
    }
    facing(location: Vector3) {
        this.rotation = facingPoint(this.location, location).rot;
        return this as WorldPosition;
    }
    align(axis: string) {
        if(axis.toLowerCase().includes("x")){this.x = Math.round(this.x); };
        if(axis.toLowerCase().includes("y")){this.y = Math.round(this.y); };
        if(axis.toLowerCase().includes("z")){this.z = Math.round(this.z); };
        return this as WorldPosition;
    }
    offset(offset: Vector3) {
        this.location = Vector.add(this.location, offset);
        return this as WorldPosition;
    }
    static fromentity(entity: Entity|Player) {
        return new WorldPosition(entity?.location, entity?.getRotation(), entity?.dimension, entity)
    }
    static fromblock(block: Block) {
        const fdcb = [{x: 90, y: 0}, {x: -90, y: 0}, {x: 0, y: 180}, {x: 0, y: 0}, {x: 0, y: 90}, {x: 0, y: -90}]
        return new WorldPosition(block?.location, fdcb[Number(block?.permutation?.getState("facing_direction") ?? block?.permutation?.getState("minecraft:facing_direction") ?? 3) ?? 3] ?? {x: 0, y: 0}, block?.dimension, undefined, block)
    }*/
}
;
/**
 * @since 1.20.0-development.63
 */
export class SemVerString {
    major;
    minor;
    patch;
    pre_release_stage_internal;
    pre_release_version_internal;
    build;
    constructor(major, minor, patch, pre_release, build /*, SemVerVersion*/) {
        if (!!!pre_release) { }
        else if (typeof pre_release != "string") {
            throw (new TypeError(`Native type conversion failed. Function argument [3] expected type string but got type ${typeof pre_release} instead`));
        }
        else if (!!!pre_release.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw (new TypeError(`Invalid pre-release version: ${JSON.stringify(pre_release)}. Pre-release string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`));
        }
        if (!!!build) { }
        else if (typeof build != "string") {
            throw (new TypeError(`Native type conversion failed. Function argument [4] expected type string but got type ${typeof build} instead`));
        }
        else if (!!!build.match(/^([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/)) {
            throw (new TypeError(`Invalid build version: ${JSON.stringify(build)}. Pre-release string must match the following regex expression: /^[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*$/`));
        }
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.pre_release_stage_internal = pre_release == "" ? undefined : pre_release.match(SemVerString.pre_release_regex).groups.pre_release_phase;
        this.pre_release_version_internal = pre_release == "" ? undefined : pre_release.match(SemVerString.pre_release_regex).groups.pre_release_version;
        this.build = build == "" ? undefined : build;
    }
    get pre_release() { return this.pre_release_stage_internal + this.pre_release_version_internal; }
    set pre_release(pre_release) {
        if (!!!pre_release) { }
        else if (typeof pre_release != "string") {
            throw (new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release} instead`));
        }
        else if (!!!pre_release.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw (new TypeError(`Invalid pre-release version: ${JSON.stringify(pre_release)}. Pre-release string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`));
        }
        this.pre_release_stage_internal = pre_release == "" ? undefined : pre_release.match(SemVerString.pre_release_regex).groups.pre_release_phase;
        this.pre_release_version_internal = pre_release == "" ? undefined : pre_release.match(SemVerString.pre_release_regex).groups.pre_release_version;
    }
    get pre_release_stage() { return this.pre_release_stage_internal; }
    set pre_release_stage(pre_release_stage) {
        if (!!!pre_release_stage) { }
        else if (typeof pre_release_stage != "string") {
            throw (new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release_stage} instead`));
        }
        else if (!!!pre_release_stage.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))?$/)) {
            throw (new TypeError(`Invalid pre-release stage: ${JSON.stringify(pre_release_stage)}. Pre-release stage string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)$/`));
        }
        this.pre_release_stage_internal = pre_release_stage == "" ? undefined : pre_release_stage;
    }
    get pre_release_version() { return this.pre_release_version_internal; }
    set pre_release_version(pre_release_version) {
        if (!!!pre_release_version) { }
        else if (typeof pre_release_version != "string") {
            throw (new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release_version} instead`));
        }
        else if (!!!pre_release_version.match(/^(?:(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw (new TypeError(`Invalid pre-release stage: ${JSON.stringify(pre_release_version)}. Pre-release stage string must match the following regex expression: /^(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`));
        }
        this.pre_release_version_internal = pre_release_version == "" ? undefined : pre_release_version;
    }
    get raw() { return `${!!this.major ? this.major + "." : ""}${!!this.minor ? this.minor + "." : ""}${!!this.patch ? this.patch : ""}${!!this.pre_release_stage ? `-${this.pre_release_stage}${!!this.pre_release_version_internal ? this.pre_release_version_internal : ""}` : (!!this.pre_release_version_internal ? "-" + this.pre_release_version_internal : "")}${!!this.build ? "+" + this.build : ""}`; }
    toString() { return this.raw; }
    toPrimitive() { return this.raw; }
    toJSON() { return { major: this.major, minor: this.minor, patch: this.patch, pre_release_stage: this.pre_release_stage_internal, pre_release_version: this.pre_release_version_internal, build: this.build, type: "SemVerString" }; }
    static pre_release_regex = /^(?<pre_release>(?<pre_release_stage>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?<pre_release_version>(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))$/;
    static build_regex = /^([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/;
    static semver_regex = /^(?<base>(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*))(?:-(?<pre_release>(?<pre_release_stage>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?<pre_release_version>(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    static fromJSON(json) { return new SemVerString(Number(json.major), Number(json.minor), Number(json.patch), json.pre_release_stage + json.pre_release_version, json.build); }
    static fromString(string) { const json = string.match(SemVerString.semver_regex).groups; return new SemVerString(Number(json.major), Number(json.minor), Number(json.patch), json.pre_release_stage + json.pre_release_version, json.build); }
}
export function SemVerValidator(string) { return !!string.match(SemVerString.semver_regex); }
export function SemVerMatcher(string) { return string.match(SemVerString.semver_regex); }
/*let sourceEntity = Entity.prototype*/ /*
targetSelectorAllListD("@e[c=2]", `${player.location.x} ${player.location.y} ${player.location.z}`, player.dimension).find((e)=>(player != e.getComponent("projectile").owner))*/ /*
targetSelectorAllListD("@e[c=2]", `${sourceEntity.location.x} ${sourceEntity.location.y} ${sourceEntity.location.z}`, sourceEntity.dimension).find((e)=>(sourceEntity.getComponent("projectile").owner != e)).location*/ /*
/scriptevent andexdb:scriptEval console.warn(JSON.stringify(facingPoint(sourceEntity.location, targetSelectorAllListD("@e[c=2]", `${sourceEntity.location.x} ${sourceEntity.location.y} ${sourceEntity.location.z}`, sourceEntity.dimension).find((e)=>(sourceEntity.getComponent("projectile").owner != e)).location))); */ /*
if(d.x==0&&d.y==0&&d.z==0){}else{if(Math.abs(d.x)>=Math.abs(d.y)&&Math.abs(d.x)>=Math.abs(d.z)){sourceEntity.getComponent("projectile").shoot({x: Number(d.x>=0), y: 0, z: 0})}else{if(Math.abs(d.y)>=Math.abs(d.x)&&Math.abs(d.y)>=Math.abs(d.z)){sourceEntity.getComponent("projectile").shoot({x: 0, y: Number(d.y>=0), z: 0})}else{sourceEntity.getComponent("projectile").shoot({x: Number(d.x>=0), y: Number(d.y>=0), z: Number(d.z>=0)})}}}
if(d.x==0&&d.y==0&&d.z==0){}else{if(Math.abs(d.x)>=Math.abs(d.y)&&Math.abs(d.x)>=Math.abs(d.z)){sourceEntity.getComponent("projectile").shoot({x: Number(d.x>=0)*Math.abs(1/d.x), y: Number(d.y>=0)*Math.abs(1/d.x), z: Number(d.z>=0)*Math.abs(1/d.x)})}else{if(Math.abs(d.y)>=Math.abs(d.x)&&Math.abs(d.y)>=Math.abs(d.z)){sourceEntity.getComponent("projectile").shoot({x: Number(d.x>=0)*Math.abs(1/d.x), y: Number(d.y>=0)*Math.abs(1/d.x), z: Number(d.z>=0)*Math.abs(1/d.x)})}else{sourceEntity.getComponent("projectile").shoot({x: Number(d.x>=0)*Math.abs(1/d.x), y: Number(d.y>=0)*Math.abs(1/d.x), z: Number(d.z>=0)*Math.abs(1/d.x)})}}}
sourceEntity.dimension.getEntities({location: sourceEntity.location, closest: 2, excludeTypes: ["minecraft:arrow", "andexsa:custom_arrow", "andexsa:custom_arrow_2"], excludeTags: ["hidden_from_homing_arrows", "is_currently_in_vanish"]}).find((e)=>(sourceEntity.getComponent('projectile').owner != e)).location*/
export function flatPath(directoryObject, startingPath = ["input"]) {
    function flatPathArray(a, currentPath = ["input"]) {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            a.flatMap((v, i) => v instanceof Array
                ? flatPathArray(v, [...currentPath, String(i)])
                : typeof v == "object"
                    ? v?.notPathable == true
                        ? {
                            path: [...currentPath, String(i)],
                            name: v?.name ?? String(i),
                            index: i,
                            arrayindex: i,
                            notPathable: true,
                        }
                        : flatPathObject(v, [...currentPath, String(i)])
                    : { path: [...currentPath, String(i)], name: String(i), index: i, arrayindex: i }),
        ];
    }
    function flatPathObject(o, currentPath = ["input"]) {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            Object.entries(o).flatMap((v, i) => v[1] instanceof Array
                ? flatPathArray(v[1], [...currentPath, v[0]])[0]
                : typeof v[1] == "object"
                    ? v[1]?.notPathable == true
                        ? { path: [...currentPath, v[0]], name: v[0], index: i, objectindex: i, notPathable: true }
                        : flatPathObject(v[1], [...currentPath, v[0]])
                    : { path: [...currentPath, v[0]], name: v[0], index: i, objectindex: i }),
        ];
    }
    return flatPathObject(directoryObject, startingPath);
}
export function getPathInObject(directoryObject, path = ["input"]) { let a; a = directoryObject; path.slice(1).forEach(v => a = a[v]); return a; } /*
/execute as @e [type=andexsa:custom_arrow] at @s run /scriptevent andexdb:scriptEval let sl = sourceEntity.location; let ol = sourceEntity.dimension.getEntities({location: sourceEntity.location, closest: 2, excludeTypes: ["minecraft:arrow", "andexsa:custom_arrow", "andexsa:custom_arrow_2", "npc", "armor_stand"], excludeTags: ["hidden_from_homing_arrows", "is_currently_in_vanish"]}).find((e)=>(sourceEntity.getComponent('projectile').owner != e)).location; let d = {x: ol.x-sl.x, y: ol.y-sl.y, z: ol.z-sl.z}; eval("if(d.x==0&&d.y==0&&d.z==0){}else{if(Math.abs(d.x)>=Math.abs(d.y)&&Math.abs(d.x)>=Math.abs(d.z)){sourceEntity.getComponent('projectile').shoot({x: Math.abs(1/d.x)*Number(d.x!=0)*d.x, y: Math.abs(1/d.x)*Number(d.y!=0)*d.y, z: Math.abs(1/d.x)*Number(d.z!=0)*d.z})}else{if(Math.abs(d.y)>=Math.abs(d.x)&&Math.abs(d.y)>=Math.abs(d.z)){sourceEntity.getComponent('projectile').shoot({x: Math.abs(1/d.y)*Number(d.x!=0)*d.x, y: Math.abs(1/d.y)*Number(d.y!=0)*d.y, z: Math.abs(1/d.y)*Number(d.z!=0)*d.z})}else{sourceEntity.getComponent('projectile').shoot({x: Math.abs(1/d.z)*Number(d.x!=0)*d.x, y: Math.abs(1/d.z)*Number(d.y!=0)*d.y, z: Math.abs(1/d.z)*Number(d.z!=0)*d.z})}}}; ");*/ /*
import("Main").then(a=>{Object.entries(a)})*/
export function scanForBlockType(from, to, dimension, block, returnMode) { let blockType = BlockTypes.get(block).id; if ((returnMode ?? "") == "" || (returnMode ?? "") == "Vector3") {
    return Array.from(new BlockVolume({ x: from.x, y: from.y, z: from.z }, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).filter(v => dimension.getBlock(v).typeId == blockType);
}
else {
    return Array.from(new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).map(v => dimension.getBlock(v)).filter(v => v.typeId == blockType);
} }
;
export function scanForContainerBlocks(from, to, dimension, returnMode) { if ((returnMode ?? "") == "" || (returnMode ?? "") == "Vector3") {
    return Array.from(new BlockVolume({ x: from.x, y: from.y, z: from.z }, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).filter(v => !!dimension.getBlock(v).getComponent("inventory"));
}
else {
    return Array.from(new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).map(v => dimension.getBlock(v)).filter(v => !!v.getComponent("inventory"));
} }
;
export function clearAllContainerBlocks(blocks) { blocks.forEach(v => clearContainer(v.getComponent("inventory").container)); return blocks; }
;
/**
 * @deprecated
 */
export function fillBlocks(from, to, dimension, block, options) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, to).getBlockLocationIterator()).forEach(v => { if (subArray.length <= new BlockVolume(from, to).getSpan().x) {
    subArray.push(v);
}
else {
    mainArray.push(new BlockVolume({ x: subArray.sort((a, b) => a.x - b.x)[0].x, y: subArray.sort((a, b) => a.y - b.y)[0].y, z: subArray.sort((a, b) => a.z - b.z)[0].z }, { x: subArray.sort((a, b) => b.x - a.x)[0].x, y: subArray.sort((a, b) => b.y - a.y)[0].y, z: subArray.sort((a, b) => b.z - a.z)[0].z }));
} }); let counter = 0; mainArray.forEach(v => counter += dimension.fillBlocks(new BlockVolume(v.from, v.to), block, options).getCapacity()); return counter; }
;
/**
 * @deprecated
 */
export function fillBlocksB(from, to, dimension, block, options) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => { subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z })); }); subArray.forEach(v => { Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))); }); let counter = 0; mainArray.forEach(v => counter += dimension.fillBlocks(new BlockVolume(v.from, v.to), block, options).getCapacity()); return counter; }
;
/**
 * @deprecated
 */
export function fillBlocksF(from, to, dimension, block, options) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => { subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z })); }); subArray.forEach(v => { Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))); }); let counter = 0; mainArray.forEach(v => counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${block instanceof BlockPermutation ? block.type.id : block instanceof BlockType ? block.id : block} ${block instanceof BlockPermutation ? "[" + Object.entries(block.getAllStates()).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""} ${!!options?.matchingBlock ? options?.matchingBlock instanceof BlockPermutation ? "replace " + (options?.matchingBlock?.type?.id ?? "") : "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlock ? options?.matchingBlock instanceof BlockPermutation ? "[" + Object.entries(options?.matchingBlock.getAllStates()).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : "" : ""}`).successCount); return counter; }
;
/**
 * @deprecated
 */
export function fillBlocksH(from, to, dimension, block, blockStates, options, placeholderid) {
    let mainArray = [];
    let subArray = [];
    Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => {
        subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z }));
    });
    subArray.forEach(v => {
        Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z })));
    });
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ?? "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount;
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            ;
            fillBlocksB(v.from, v.to, dimension, blockb, { blockFilter: { includePermutations: [placeholderblockb] } });
        });
    }
    return counter;
}
;
/**
 * @deprecated
 */
export function fillBlocksHB(from, to, dimension, block, blockStates, options) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => { subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z })); }); subArray.forEach(v => { Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))); }); let counter = 0; mainArray.forEach(v => { counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${block} ${!!blockStates ? "[" + Object.entries(blockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}  ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount; }); return counter; }
;
/**
 * @deprecated
 */
export function fillBlocksHW(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let subArray = [];
    let CBVA = new CompoundBlockVolume();
    CBVA.pushVolume({ volume: new BlockVolume(from, { x: to.x, y: from.y, z: to.z }), action: 0 });
    if (new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().x > 2 && new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().z > 2) {
        CBVA.pushVolume({ volume: new BlockVolume({ x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }, { x: to.x + (from.x < to.x ? -1 : 1), y: from.y, z: to.z + (from.z < to.z ? -1 : 1) }), action: 1 });
    }
    ;
    Array.from(CBVA.getBlockLocationIterator()).forEach(va => {
        mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }));
    });
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach(v => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
    ;
    if (!!!options?.matchingBlock) { /*
        console.warn("a")*/
        mainArray.forEach(v => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ?? "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount;
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            ;
            fillBlocksB(v.from, v.to, dimension, blockb, { blockFilter: { includePermutations: [placeholderblockb] } });
        });
    }
    return counter;
}
;
/**
 * @deprecated
 */
export async function fillBlocksHWG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @deprecated
 */
export async function fillBlocksHHG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
//world.broadcastClientMessage("test", "hisa")
/**
 * @deprecated
 */
export async function fillBlocksHOTG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setType(block(v));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateOutlineFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @deprecated
 */
export function fillBlocksHH(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let mainArrayB = [];
    let subArray = [];
    let CBVA = new CompoundBlockVolume();
    CBVA.pushVolume({ volume: new BlockVolume(from, { x: to.x, y: from.y, z: to.z }), action: 0 });
    if (new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().x > 2 && new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().z > 2) {
        CBVA.pushVolume({ volume: new BlockVolume({ x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }, { x: to.x + (from.x < to.x ? -1 : 1), y: from.y, z: to.z + (from.z < to.z ? -1 : 1) }), action: 1 });
    }
    ;
    Array.from(CBVA.getBlockLocationIterator()).forEach(va => {
        mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }));
    });
    let CBVAB = new CompoundBlockVolume();
    CBVAB.pushVolume({ volume: new BlockVolume({ x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }, { x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: to.z + (from.z < to.z ? -1 : 1) }), action: 0 });
    CBVAB.pushVolume({ volume: new BlockVolume({ x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: from.z + (from.z > to.z ? -1 : 1) }, { x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: to.z + (from.z < to.z ? -1 : 1) }), action: 0 });
    Array.from(CBVAB.getBlockLocationIterator()).forEach(va => {
        mainArray.push(new BlockVolume(va, { x: to.x + (from.x < to.x ? -1 : 1), y: va.y, z: va.z }));
    });
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach(v => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
    ;
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ?? "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount;
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            ;
            fillBlocksB(v.from, v.to, dimension, blockb, { blockFilter: { includePermutations: [placeholderblockb] } });
        });
    }
    return counter;
}
;
/**
 * @deprecated
 */
export function fillBlocksHO(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let mainArrayB = [];
    let subArray = [];
    //full distance
    mainArray.push(new BlockVolume(from, { x: from.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: from.z }, { x: to.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z }, to));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z }, { x: from.x, y: to.y, z: to.z }));
    //1 less than full distance
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: from.y, z: from.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: to.y, z: from.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: from.y, z: to.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: to.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: to.y, z: to.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: to.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: to.x, y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: to.x, y: to.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: to.x, y: to.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: from.x, y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: from.x, y: to.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: from.x, y: to.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach(v => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
    ;
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ?? "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount;
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            ;
            fillBlocksB(v.from, v.to, dimension, blockb, { blockFilter: { includePermutations: [placeholderblockb] } });
        });
    }
    return counter;
}
;
/**
 * @deprecated
 */
export function fillBlocksHP(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let mainArrayB = [];
    let subArray = [];
    mainArray.push(new BlockVolume(from, { x: from.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: from.z }, { x: to.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z }, to));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z }, { x: from.x, y: to.y, z: to.z }));
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach(v => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
    ;
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ?? "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock ? "replace " + (options?.matchingBlock ?? "") : ""} ${!!options?.matchingBlockStates ? "[" + Object.entries(options?.matchingBlockStates).map(v => "\"" + v[0] + "\"" + "=" + (typeof v[1] == "string" ? "\"" + v[1] + "\"" : typeof v[1] == "number" ? String(v[1]) : String(v[1]))).join(",") + "]" : ""}`).successCount;
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            ;
            fillBlocksB(v.from, v.to, dimension, blockb, { blockFilter: { includePermutations: [placeholderblockb] } });
        });
    }
    return counter;
}
;
/**
 * @deprecated
 */
export function fillBlocksHC(center, radius, dimension, axis /*"x"|"y"|"z"|"ns"|"sn"|"ew"|"we"|"ud"|"du"|"X"|"Y"|"Z"|"NS"|"SN"|"EW"|"WE"|"UD"|"DU"*/, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = drawMinecraftCircle(center, radius, axis).map(v => dimension.getBlock(v));
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.filter(v => !!v.getComponent("inventory")).forEach(v => {
            clearContainer(v.getComponent("inventory").container);
        });
    }
    ; /*
    console.warn(JSONStringify(mainArray))*/
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            v.setPermutation(blockb);
            counter++;
        });
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.type)) {
                v.setPermutation(blockb);
                counter++;
            }
        });
    }
    return counter;
}
;
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
export function fillBlocksHS(center, radius, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            generateMinecraftSphereB(center, radius, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                v.dimension.getBlock(v).setPermutation(blockb);
                counter++;
            });
        }
        else {
            generateMinecraftSphereB(center, radius, dimension, (v) => {
                v.dimension.getBlock(v).setPermutation(blockb);
                counter++;
            });
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            generateMinecraftSphereB(center, radius, dimension, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
            });
        }
        else {
            generateMinecraftSphereB(center, radius, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
            });
        }
    }
    return counter;
}
;
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
export async function fillBlocksHSG(center, radius, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generateMinecraftSphereBGIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHSGB(center, radius, dimension, block, options, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (options?.verifyBlockActuallyChanged ?? false) {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation == currentBlock) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation == currentBlock) {
                            v.dimension.getBlock(v).setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHHSGB(center, radius, thickness, dimension, block, options, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (options?.verifyBlockActuallyChanged ?? false) {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation == currentBlock) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation == currentBlock) {
                            v.dimension.getBlock(v).setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                                clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                            }
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                            v.dimension.getBlock(v).setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHCGB(center, radius, height, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHSGGB(from, to, skygridSize, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHISGGB(from, to, skygridSize, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        if (replacemode) {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if ((generateMinecraftSphereBGProgress[id]?.done) !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export async function fillBlocksHSSG(center, radius, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generateMinecraftSphereBGIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generateMinecraftSphereBGProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export function fillBlocksHHS(center, radius, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let mainArray = generateHollowSphere(center, radius, thickness).map(v => dimension.getBlock(v));
    if (integrity != 100) {
        mainArray = degradeArray(mainArray, integrity);
    }
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.filter(v => !!v.getComponent("inventory")).forEach(v => {
            clearContainer(v.getComponent("inventory").container);
        });
    }
    ; /*
    console.warn(JSONStringify(mainArray))*/
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            v.setPermutation(blockb);
            counter++;
        });
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.type)) {
                v.setPermutation(blockb);
                counter++;
            }
        });
    }
    return counter;
}
;
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
export async function fillBlocksHHSG(center, radius, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export async function fillBlocksHDG(center, radius, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let types = BlockTypes.getAll();
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setType(types[Math.floor(types.length * Math.random())]);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setType(types[Math.floor(types.length * Math.random())]);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = types[Math.floor(types.length * Math.random())];
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(types[Math.floor(types.length * Math.random())]);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = types[Math.floor(types.length * Math.random())];
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(types[Math.floor(types.length * Math.random())]);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateDomeBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export async function fillBlocksHHOG(center, radius, offset, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftOvoidCG(center, radius, offset, thickness, id, dimension, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateMinecraftOvoidCG(center, radius, offset, thickness, id, dimension, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftOvoidCG(center, radius, offset, thickness, id, dimension, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateMinecraftOvoidCG(center, radius, offset, thickness, id, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export async function fillBlocksHOG(center, radius, offset, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHSGG(from, to, skygridSize, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHISGG(from, to, skygridSize, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
        else {
            system.runJob(generateInverseSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                }
                if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, { integrity, minMSBetweenYields: options?.minMSBetweenYields ?? 5000 }));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export function fillBlocksHT(center, radius, length, axis, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let mainArray = [...new Set(generateMinecraftTunnel(center, radius, length, axis).map(v => dimension.getBlock(v)))];
    if (integrity != 100) {
        mainArray = degradeArray(mainArray, integrity);
    }
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.filter(v => !!v.getComponent("inventory")).forEach(v => {
            clearContainer(v.getComponent("inventory").container);
        });
    }
    ; /*
    console.warn(JSONStringify(mainArray))*/
    if (!!!options?.matchingBlock) {
        mainArray.forEach(v => {
            try {
                v.setPermutation(blockb);
                counter++;
            }
            catch { }
        });
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach(v => {
            if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.type)) {
                v.setPermutation(blockb);
                counter++;
            }
        });
    }
    return counter;
}
;
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
export async function fillBlocksHFG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setType(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        v.dimension.getBlock(v).setType(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    currentBlock = block(v, index);
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    currentBlock = block(v, index);
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setType(currentBlock);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    if ((!!options?.matchingBlockStates) ? ((BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type) && (matchingblockb.getAllStates() == Object.fromEntries(Object.entries(Object.assign(v.dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(blockb.getAllStates()).find(s => v[0] == s[0])))))) : (BlockTypes.get(options?.matchingBlock) == v.dimension.getBlock(v).type)) {
                        try {
                            v.dimension.getBlock(v).setPermutation(blockb);
                            counter++;
                        }
                        catch (e) {
                            if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                                generatorProgress[id].containsUnloadedChunks = true;
                            }
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHFGB(begin, end, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let currentBlock = undefined;
        if (replacemode) {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHFGBM(begin, end, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.blockMask || options?.blockMask?.blocks?.length == 0) {
        if (replacemode) {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let currentBlock = undefined;
        if (replacemode) {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((options?.blockMask?.includesStates == true) ? testBlockForMatchToMask(v.dimension.getBlock(v), options.blockMask.blocks) : (options?.blockMask?.blockTypes.includes(v.dimension.getBlock(v).typeId))) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((options?.blockMask?.includesStates == true) ? testBlockForMatchToMask(v.dimension.getBlock(v), options.blockMask.blocks) : (options?.blockMask?.blockTypes.includes(v.dimension.getBlock(v).typeId))) {
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHFFGB(begin, end, dimension, options, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
        try {
            if (v.dimension.getBlock(v).typeId == "minecraft:air") {
                v.dimension.getBlock(v).setType("minecraft:water");
                counter++;
            }
            else if (v.dimension.getBlock(v).type.canBeWaterlogged == true && !v.dimension.getBlock(v).isWaterlogged) {
                v.dimension.getBlock(v).setWaterlogged(true);
                counter++;
            }
        }
        catch (e) {
            if (e instanceof TypeError || e instanceof LocationInUnloadedChunkError) {
                generatorProgress[id].containsUnloadedChunks = true;
            }
        }
    }, undefined, integrity));
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHDFGB(begin, end, dimension, options, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
        try {
            if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(v.dimension.getBlock(v).typeId)) {
                v.dimension.getBlock(v).setType("minecraft:air");
                counter++;
            }
            else if (v.dimension.getBlock(v).type.canBeWaterlogged == true && v.dimension.getBlock(v).isWaterlogged) {
                v.dimension.getBlock(v).setWaterlogged(false);
                counter++;
            }
        }
        catch (e) {
            if (e instanceof TypeError || e instanceof LocationInUnloadedChunkError) {
                generatorProgress[id].containsUnloadedChunks = true;
            }
        }
    }, undefined, integrity));
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHWFGB(begin, end, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let currentBlock = undefined;
        if (replacemode) {
            system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateWallsFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHHFGB(begin, end, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let currentBlock = undefined;
        if (replacemode) {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
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
export async function fillBlocksHOFGB(begin, end, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                        clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension.getBlock(v).setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let currentBlock = undefined;
        if (replacemode) {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                            clearContainer(v.dimension.getBlock(v).getComponent("inventory").container);
                        }
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                currentBlock = block(v, index);
                try {
                    if ((!!options?.matchingBlockStates) ? testBlockForMatch(v.dimension.getBlock(v), { id: options?.matchingBlock, states: options?.matchingBlockStates }) : (options?.matchingBlock == v.dimension.getBlock(v).typeId)) {
                        v.dimension.getBlock(v).setPermutation(currentBlock);
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError || e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks = true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
;
/**
 * @deprecated
 */
export function fillBlocksC(begin, end, dimension, blocktype = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false) {
    let mainArray = Array.from(new BlockVolume(begin, end).getBlockLocationIterator());
    let counter = 0;
    let block = BlockTypes.get(matchingBlock).id;
    let blockmatching = BlockTypes.get(matchingBlock).id;
    if (overrideAllBlockStates) {
        if (!!matchingBlock) { //console.warn("3"); 
            if (!!matchingBlockStates) { //console.warn("4"); 
                if (!!blockStates) { //console.warn("10b"); 
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (blockmatching == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (blockmatching == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
            else { //console.warn("7"); 
                if (!!blockStates) { //console.warn("10c"); 
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (block == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype)) { //console.warn("2"); 
                                if (block == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
        }
        else { //console.warn("9"); 
            if (!!blockStates) { //console.warn("10"); 
                mainArray.forEach(v => {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(v)?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                            counter++; //; console.warn("11"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
            else { //console.warn("12"); 
                mainArray.forEach(v => {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(v)?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(v).setType(blocktype);
                            counter++; //; console.warn("13"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
        }
    }
    else {
        if (!!matchingBlock) { //console.warn("3"); 
            if (!!matchingBlockStates) { //console.warn("4"); 
                if (!!blockStates) { //console.warn("10b"); 
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (BlockTypes.get(matchingBlock).id == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (BlockTypes.get(matchingBlock).id == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
            else { //console.warn("7"); 
                if (!!blockStates) { //console.warn("10c"); 
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && block == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (block == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
                else {
                    mainArray.forEach(v => {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && block == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : undefined)) { //console.warn("2"); 
                                if (block == dimension.getBlock(v)?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(v)?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : undefined));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                }
            }
        }
        else { //console.warn("9"); 
            if (!!blockStates) { //console.warn("10"); 
                mainArray.forEach(v => {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(v)?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                            dimension.getBlock(v).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(v)?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(v)?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                            counter++; //; console.warn("11"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
            else { //console.warn("12"); 
                mainArray.forEach(v => {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(v)?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(v).setType(blocktype);
                            counter++; //; console.warn("13"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                });
            }
        }
    }
    return counter;
}
;
/**
 * @deprecated
 */
export function* fillBlocksCG(begin, end, dimension, blocktype = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false, onComplete = () => { }, onCompleteArgsObject, ...onCompleteArgs) {
    var timea = Date.now();
    var mainArray = Array.from(new BlockVolume(begin, end).getBlockLocationIterator());
    var counter = 0;
    var block = BlockTypes.get(matchingBlock).id;
    var blockmatching = BlockTypes.get(matchingBlock).id;
    if (overrideAllBlockStates) {
        if (!!matchingBlock) { //console.warn("3"); 
            if (!!matchingBlockStates) { //console.warn("4"); 
                if (!!blockStates) { //console.warn("10b"); 
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (blockmatching == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (blockmatching == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
            }
            else { //console.warn("7"); 
                if (!!blockStates) { //console.warn("10c"); 
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, blockStates)) { //console.warn("2"); 
                                if (block == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype)) { //console.warn("2"); 
                                if (block == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
            }
        }
        else { //console.warn("9"); 
            if (!!blockStates) { //console.warn("10"); 
                for (let i = 0; i < mainArray.length; i++) {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(mainArray[i])?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, blockStates));
                            counter++; //; console.warn("11"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
                ;
            }
            else { //console.warn("12"); 
                for (let i = 0; i < mainArray.length; i++) {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(mainArray[i])?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(mainArray[i]).setType(blocktype);
                            counter++; //; console.warn("13"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
                ;
            }
        }
    }
    else {
        if (!!matchingBlock) { //console.warn("3"); 
            if (!!matchingBlockStates) { //console.warn("4"); 
                if (!!blockStates) { //console.warn("10b"); 
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (BlockTypes.get(matchingBlock).id == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (BlockTypes.get(matchingBlock).id == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    if (Object.entries(matchingBlockStates).every(p => Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).includes(p))) { //console.warn("5"); 
                                        dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                        counter++; //; console.warn("6"); 
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
            }
            else { //console.warn("7"); 
                if (!!blockStates) { //console.warn("10c"); 
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && block == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                                if (block == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
                else {
                    for (let i = 0; i < mainArray.length; i++) {
                        try { //console.warn("1"); 
                            if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && block == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : undefined)) { //console.warn("2"); 
                                if (block == dimension.getBlock(mainArray[i])?.typeId) { //console.warn("14"); 
                                    dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(dimension.getBlock(mainArray[i])?.permutation?.getAllStates()).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : undefined));
                                    counter++; //; console.warn("8"); 
                                }
                            }
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        yield;
                    }
                    ;
                }
            }
        }
        else { //console.warn("9"); 
            if (!!blockStates) { //console.warn("10"); 
                for (let i = 0; i < mainArray.length; i++) {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(mainArray[i])?.permutation != BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates)) { //console.warn("2"); 
                            dimension.getBlock(mainArray[i]).setPermutation(BlockPermutation.resolve(blocktype, (!overrideAllBlockStates && BlockTypes.get(blocktype).id == dimension.getBlock(mainArray[i])?.typeId) ? Object.fromEntries(Object.entries(Object.assign(dimension.getBlock(mainArray[i])?.permutation?.getAllStates(), blockStates)).filter(v => !!(Object.entries(BlockPermutation.resolve(blocktype).getAllStates()).find(s => v[0] == s[0])))) : blockStates));
                            counter++; //; console.warn("11"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
                ;
            }
            else { //console.warn("12"); 
                for (let i = 0; i < mainArray.length; i++) {
                    try { //console.warn("1"); 
                        if (dimension.getBlock(mainArray[i])?.typeId != block) { //console.warn("2"); 
                            dimension.getBlock(mainArray[i]).setType(blocktype);
                            counter++; //; console.warn("13"); 
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    yield;
                }
                ;
            }
        }
    }
    var timeb = Date.now(); /*
    world.sendMessage(String(counter))*/
    onComplete(counter, timea, timeb, timeb - timea, onCompleteArgsObject, ...onCompleteArgs);
}
;
export function v3Multiply(a, b) { return typeof b == "object" ? { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z } : { x: a.x * b, y: a.y * b, z: a.z * b }; }
/**
 * @deprecated
 */
export function fillBlocksD(from, to, dimension, block = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => { subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z })); }); subArray.forEach(v => { Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))); }); let counter = 0; mainArray.forEach(v => counter += fillBlocksC(v.from, v.to, dimension, block, blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates)); return counter; }
;
/**
 * @deprecated
 */
export async function fillBlocksE(from, to, dimension, block = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false) { let mainArray = []; let subArray = []; Array.from(new BlockVolume(from, { x: from.x, y: from.y, z: to.z }).getBlockLocationIterator()).forEach(v => { subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z })); }); subArray.forEach(v => { Array.from(v.getBlockLocationIterator()).forEach(va => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))); }); let counter = 0; mainArray.forEach(v => system.run(() => counter += fillBlocksC(v.from, v.to, dimension, block, blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates))); return counter; }
;
export function gwdp(propertyId) { return world.getDynamicProperty(propertyId); }
;
export function swdp(propertyId, newValue) { return world.setDynamicProperty(propertyId, newValue); }
;
export function gedp(entity, propertyId) { return entity.getDynamicProperty(propertyId); }
;
export function sedp(entity, propertyId, newValue) { return entity.setDynamicProperty(propertyId, newValue); }
;
export function gidp(item, propertyId) { return item.getDynamicProperty(propertyId); }
;
export function sidp(item, entity, propertyId, newValue) { return item.setDynamicProperty(propertyId, newValue); }
; /*
let a = world.getDimension("the_end").getBlock({x: 0, y: 0, z: 0}).permutation
let c = a as BlockStates
c*/
/*convertToCompoundBlockVolume(String(world.getDynamicProperty("noPistonExtensionAreas")))*/ /*
let b = a[Number(world.getAllPlayers()[0].getDynamicProperty("debugStickPropertyIndex"))]*/
export class interactable_blockb {
    id = "";
    delay = 0;
    holdDuration = 0;
}
;
export let interactable_block;
interactable_block = [];
export class customFormUIElement {
    index;
    type;
    args;
    code;
    typeIndex;
    constructor(index, type, args) { this.index = index; this.type = type; this.args = args; this.code = this.type + "(" + this.args.join(", ") + ")"; this.typeIndex = customElementTypeIds.findIndex((value, index) => (value == this.type)); }
}
;
export function strToCustomFormUIElement(string) { let x = string.split("|").slice(2); x.forEach((xa, xb) => { x[xb] = xa.replaceAll("\\vls", "|").replaceAll("\\x", "|"); }); return new customFormUIElement(Number(string.split("|")[0]), string.split("|")[1], x); }
;
export function arrayToElementList(ids, array) { let a; a = []; array.forEach((ax, az) => { a[az] = strToCustomFormUIElement(Number(ids[az].split("|")[1]) + "|" + ax); }); return a.sort((a, b) => (a.index - b.index)); }
;
export function getUICustomForm(optionsids, codeids) {
    let c = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(optionsids + "|")));
    let cb;
    cb = [];
    c.forEach((celement, i) => { cb[i] = String(world.getDynamicProperty(celement)); });
    let d = arrayToElementList(c, cb);
    let e = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(codeids + "|")));
    e = e.sort((a, b) => Number(a.split("|")[1]) - Number(b.split("|")[1]));
    let eb;
    eb = [];
    e.forEach((eelement, i) => { eb[i] = i + "|" + String(world.getDynamicProperty(eelement)); });
    eb = eb.sort((a, b) => Number(a.split("|")[0]) - Number(b.split("|")[0]));
    let f = eb;
    f.forEach((felement, i) => { f[i] = felement.split("|").slice(1).join("|"); eb[i] = felement.split("|").slice(1).join("|"); });
    let fb = f.join("");
    return { optionPropertyIds: c, optionPropertyValues: cb, optionElements: d, codeIds: e, codeValues: eb, code: fb };
}
; /*
world.getAllPlayers().forEach((pi, ia)=>{console.warn(pi.getComponent("inventory").inventorySize); for(let i = 0; i<pi.getComponent("inventory").inventorySize; i++){let item = pi.getComponent("inventory").container.getSlot(i); console.warn(i); if(item.typeId == "minecraft:skull"){world.getAllPlayers().forEach((pn)=>{if(item.nameTag == `§r§f${pn.name}'s Head§§`){item.setLore([`§r§aLocation: ${JSON.stringify(pn.location)}`, `Velocity: ${JSON.stringify(pn.getVelocity())}`, `Rotation: ${JSON.stringify(pn.getRotation())}`, `View Direction: ${JSON.stringify(pn.getViewDirection())}`, `Sleeping: ${pn.isSleeping}`, `Sneaking: ${pn.isSneaking}`, `Sprinting: ${pn.isSprinting}`, `Swimming: ${pn.isSwimming}`])}})}}})
world.getAllPlayers().forEach((pi, ia)=>{console.warn(pi.getComponent("inventory").inventorySize); for(let i = 0; i<pi.getComponent("inventory").inventorySize; i++){let item = pi.getComponent("inventory").container.getSlot(i); console.warn(i); }})*/
export function debugActionb(block, player, mode, direction) {
    if (player.getDynamicProperty("debugStickSelectedBlock") != block.typeId) {
        player.setDynamicProperty("debugStickSelectedBlock", block.typeId);
        if (((Object.entries(block.permutation.getAllStates()).findIndex((entry) => (entry[0] == player.getDynamicProperty("debugStickPropertyIndexName"))) == -1) && ((player.getDynamicProperty("debugStickPropertyIndexName") != "waterlogged") || !block.type.canBeWaterlogged))) {
            player.setDynamicProperty("debugStickPropertyIndex", 0);
            player.setDynamicProperty("debugStickPropertyIndexName", "");
        }
        else {
            player.setDynamicProperty("debugStickPropertyIndex", Object.entries(block.permutation.getAllStates()).findIndex((entry) => (entry[0] == player.getDynamicProperty("debugStickPropertyIndexName"))));
        }
        ;
        player.setDynamicProperty("debugStickPropertyIndexIndex", 0);
    }
    else {
        if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) != 0) {
            if (mode == 1) {
                if (direction == 1) {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo((Number(player.getDynamicProperty("debugStickPropertyIndex")) - 1), 0, (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") == Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
                else {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo((Number(player.getDynamicProperty("debugStickPropertyIndex")) + 1), 0, (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") == Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
            }
            else {
                if (mode == 0) {
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        player.setDynamicProperty("debugStickPropertyIndexIndex", (1 - Number(block.isWaterlogged)));
                    }
                    else {
                        if (direction == 1) {
                            player.setDynamicProperty("debugStickPropertyIndexIndex", (((customModulo((BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value) => (value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) - 1), 0, BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length)))));
                        }
                        else {
                            player.setDynamicProperty("debugStickPropertyIndexIndex", (customModulo((BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value) => (value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) + 1), 0, BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length)));
                        }
                    }
                }
            }
        }
    }
    ; /*BlockStates.getAll().forEach((stateb)=>{player.sendMessage(stateb.id + ": " + stateb.validValues)}); */ /*let test = Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]; console.warn(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] + "\n" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\n" + test + "\n" + BlockStates.getAll()[BlockStates.getAll().length-2].id + BlockStates.getAll().findIndex((statec)=>{console.warn("\"" + String(statec.id) + "\", \"" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\""); statec.id == test})); */
    if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) != 0) {
        if (mode == 0) {
            if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                system.run(() => { block.setWaterlogged(Boolean(1 - Number(block.isWaterlogged))); player.onScreenDisplay.setActionBar(`"waterlogged" to ${block.isWaterlogged}`); });
            }
            else {
                let permutation = Object.entries(block.permutation.getAllStates());
                permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1] = BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues[Number(player.getDynamicProperty("debugStickPropertyIndexIndex"))];
                system.run(() => {
                    player.onScreenDisplay.setActionBar(`"${Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}" to ${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]}`);
                    block.setPermutation(BlockPermutation.resolve(block.typeId, Object.fromEntries(permutation)));
                });
            }
        }
        else {
            if (mode == 1) {
                let permutation = Object.entries(block.permutation.getAllStates());
                if (true /*typeof Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] == typeof String*/) {
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        system.run(() => { player.onScreenDisplay.setActionBar(`selected "waterlogged" (${block.isWaterlogged})`); });
                    }
                    else {
                        system.run(() => { player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" (${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]})`); });
                    }
                }
                else {
                    system.run(() => { player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" ${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}`); });
                }
            }
        }
    }
    ;
    if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) == 0) {
        system.run(() => { player.onScreenDisplay.setActionBar(`${block.typeId} has no properties`); });
    }
    ; /*
    console.warn(Object.entries(block.permutation.getAllStates()))*/
}
export function debugAction(block, player, mode, direction) {
    player.setDynamicProperty("debugStickBlockLocation", block.location);
    if (player.getDynamicProperty("debugStickSelectedBlock") != block.typeId) {
        player.setDynamicProperty("debugStickSelectedBlock", block.typeId);
        if (((Object.entries(block.permutation.getAllStates()).findIndex((entry) => (entry[0] == player.getDynamicProperty("debugStickPropertyIndexName"))) == -1) && ((player.getDynamicProperty("debugStickPropertyIndexName") != "waterlogged") || !block.type.canBeWaterlogged))) {
            player.setDynamicProperty("debugStickPropertyIndex", 0);
            player.setDynamicProperty("debugStickPropertyIndexName", "");
        }
        else {
            player.setDynamicProperty("debugStickPropertyIndex", Object.entries(block.permutation.getAllStates()).findIndex((entry) => (entry[0] == player.getDynamicProperty("debugStickPropertyIndexName"))));
        }
        ;
    }
    else {
        if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) != 0) {
            if (mode == 1) {
                if (direction == 1) {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo((Number(player.getDynamicProperty("debugStickPropertyIndex")) - 1), 0, (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") == Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
                else {
                    player.setDynamicProperty("debugStickPropertyIndex", Number(customModulo((Number(player.getDynamicProperty("debugStickPropertyIndex")) + 1), 0, (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") == Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
            }
            else {
                if (mode == 0) { /*
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        player.setDynamicProperty("debugStickPropertyIndexIndex", (1-Number(block.isWaterlogged)));
                    }else{
                        if(direction == 1){
                            player.setDynamicProperty("debugStickPropertyIndexIndex", (((customModulo((BlockStates.getAll().find((state)=>(state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value)=>(value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) - 1), 0, BlockStates.getAll().find((state)=>(state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length)))))
                        }else{
                            player.setDynamicProperty("debugStickPropertyIndexIndex", (customModulo((BlockStates.getAll().find((state)=>(state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value)=>(value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) + 1), 0, BlockStates.getAll().find((state)=>(state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length)))
                        }
                    }*/
                }
            }
        }
    }
    ; /*BlockStates.getAll().forEach((stateb)=>{player.sendMessage(stateb.id + ": " + stateb.validValues)}); */ /*let test = Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]; console.warn(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] + "\n" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\n" + test + "\n" + BlockStates.getAll()[BlockStates.getAll().length-2].id + BlockStates.getAll().findIndex((statec)=>{console.warn("\"" + String(statec.id) + "\", \"" + String(Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]) + "\""); statec.id == test})); */
    if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) != 0) {
        if (mode == 0) {
            if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged" || (block.type.canBeWaterlogged && (Object.entries(block.permutation.getAllStates()).length == 0))) {
                system.run(() => { block.setWaterlogged(Boolean(1 - Number(block.isWaterlogged))); player.onScreenDisplay.setActionBar(`"waterlogged" to ${block.isWaterlogged}`); });
            }
            else {
                let permutation = Object.entries(block.permutation.getAllStates());
                let permindex = BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex(v => (v == permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]));
                permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1] = BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues[customModulo(permindex + 1 + (-2 * (direction)), 0, BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length)];
                system.run(() => {
                    block.setPermutation(BlockPermutation.resolve(block.typeId, Object.fromEntries(permutation)));
                    player.onScreenDisplay.setActionBar(`"${Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}" to ${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1]}`);
                });
            }
        }
        else {
            if (mode == 1) {
                let permutation = Object.entries(block.permutation.getAllStates());
                if (true /*typeof Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))] == typeof String*/) {
                    if (player.getDynamicProperty("debugStickPropertyIndexName") == "waterlogged") {
                        system.run(() => { player.onScreenDisplay.setActionBar(`selected "waterlogged" (${block.isWaterlogged})`); });
                    }
                    else {
                        system.run(() => { player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" (${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]})`); });
                    }
                }
                else {
                    system.run(() => { player.onScreenDisplay.setActionBar(`selected "${permutation[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]}" ${Object.values(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))]}`); });
                }
            }
        }
    }
    ;
    if ((Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged)) == 0) {
        system.run(() => { player.onScreenDisplay.setActionBar(`${block.typeId} has no properties`); });
    }
    ; /*
    console.warn(Object.entries(block.permutation.getAllStates()))*/
}
export function getNextTopSolidBlockAbovePosition(location, dimension, onlySolid = false, allowLiquidAbove = true, allowNonSolidBlocksAbove = false, allowLiquidBelow = false) {
    let block = tryget(() => dimension.getBlock({ x: location.x, y: Math.max(Math.min(location.y, dimension.heightRange.max), dimension.heightRange.min), z: location.z }));
    let readyToSearch = !(onlySolid
        ? !block.isSolid
        : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    while (block.y <= dimension.heightRange.max) {
        if (((block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir) &&
            !readyToSearch) {
            block = block.above(1);
        }
        else {
            if ((onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) ||
                    (block.isSolid && allowNonSolidBlocksAbove) ||
                    block.isAir) &&
                readyToSearch &&
                (onlySolid
                    ? block.below(1).isSolid
                    : !((!allowLiquidBelow ? block.below(1).isLiquid : false) || block.below(1).isAir))) {
                return block;
            }
            else {
                try {
                    block = block.above(1);
                }
                catch (e) {
                    if (e instanceof LocationOutOfWorldBoundariesError) {
                        throw (new Error("No top solid block could be found above the provided position."));
                    }
                    else {
                        throw (e);
                    }
                }
                ;
            }
        }
        readyToSearch = readyToSearch
            ? true
            : !(onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    }
}
export function getNextTopSolidBlockBelowPosition(location, dimension, onlySolid = false, allowLiquidAbove = true, allowNonSolidBlocksAbove = false, allowLiquidBelow = false) {
    let block = tryget(() => dimension.getBlock(location));
    let readyToSearch = !(onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    while (block.y <= dimension.heightRange.max) {
        if (((block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir) && !readyToSearch) {
            block = block.below(1);
        }
        else {
            if ((onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir) && readyToSearch && (onlySolid ? block.below(1).isSolid : !((!allowLiquidBelow ? block.below(1).isLiquid : false) || block.below(1).isAir))) {
                return block;
            }
            else {
                block = block.below(1);
            }
        }
        ;
        readyToSearch = readyToSearch ? true : !(onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    }
    ;
    return undefined;
}
export function getGroundSolidBlock(location, dimension, onlySolid = false) { let block = dimension.getBlock({ x: location.x, y: Math.max(Math.min(location.y, dimension.heightRange.max), dimension.heightRange.min), z: location.z }); while (block.y >= dimension.heightRange.min) {
    if (onlySolid ? !block.isSolid : block.isAir) {
        block = block.below(1);
    }
    else {
        return block;
    }
} ; return undefined; }
export function getTopSolidBlock(location, dimension, onlySolid = false) { let block = dimension.getBlock({ x: location.x, y: dimension.heightRange.max, z: location.z }); while (block.y >= dimension.heightRange.min) {
    if (onlySolid ? !block.isSolid : block.isAir) {
        block = block.below(1);
    }
    else {
        return block;
    }
} ; return undefined; }
subscribedEvents.beforeWorldInitialize = world.beforeEvents.worldInitialize.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:worldInitialize")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("worldInitializeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    globalThis.beforeInitiallizeTick = system.currentTick;
    event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:animate_use_on", {
        onUseOn: event => { }
    });
    event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:animate_use", {
        onUse: event => { }
    });
    event.itemComponentRegistry.registerCustomComponent("andexdbcomponents:selection_tool", {
        onUseOn: event => { console.log(3); },
        onUse: event => { console.log(4); }
    });
});
subscribedEvents.afterWorldInitialize = world.afterEvents.worldInitialize.subscribe(async (event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:worldInitialize")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("worldInitializeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        if (world.scoreboard.getObjective("andexdbDebug") == undefined) {
            world.scoreboard.addObjective("andexdbDebug", "andexdbScriptDebuggingService");
        }
    }
    catch (e) { }
    try {
        if (world.scoreboard.getObjective("andexdb:money") == undefined) {
            world.scoreboard.addObjective("andexdb:money", "Money");
        }
    }
    catch (e) { }
    globalThis.initiallizeTick = system.currentTick;
    try {
        const r = await checkIfCompatibleEntityScaleIsActive(true, 5);
        if (r != false) {
            if (entity_scale_format_version != null && r.trim() != entity_scale_format_version) {
                globalThis.multipleEntityScaleVersionsDetected = true;
            }
            entity_scale_format_version = r.trim();
        }
        if (r == false && config.system.showEntityScaleNotFoundConsoleLog) {
            system.waitTicks(100).then(() => { if (entity_scale_format_version == null)
                console.log(`<8Crafter's Debug Sticks[${format_version}]> No compatible version of entity scale was detected, some features may not be available.`); });
        }
        else if (r != false && config.system.showEntityScaleFoundConsoleLog) {
            console.log(`<8Crafter's Debug Sticks[${format_version}]> A compatible version of entity scale was detected: ${entity_scale_format_version}.`);
        }
        ;
        if (r == false && config.system.showEntityScaleNotFoundChatLog) {
            system.waitTicks(100).then(() => { if (entity_scale_format_version == null)
                world.sendMessage(`<8Crafter's Debug Sticks[${format_version}]> No compatible version of entity scale was detected, some features may not be available.`); });
        }
        else if (r != false && config.system.showEntityScaleFoundChatLog) {
            world.sendMessage(`<8Crafter's Debug Sticks[${format_version}]> A compatible version of entity scale was detected: ${entity_scale_format_version}.`);
        }
        ;
    }
    catch (e) {
        console.error(e, e.stack);
    }
    ; /*
    try{DimensionTypes.getAll().forEach((dimensionType)=>{if (world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", exclude: true, minScore: -99999999, maxScore: 99999999}]}) !== undefined){world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", exclude: true, minScore: -99999999, maxScore: 99999999}]}).forEach((scoreboardEntity)=>{scoreboardEntity.runCommand("/scoreboard players @s set andexdbDebug 0")})}})}catch(e){}
    try{DimensionTypes.getAll().forEach((dimensionType)=>{world.getDimension(dimensionType.typeId).getEntities().forEach((scoreboardEntity)=>{if(world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", minScore: -99999999, maxScore: 99999999}]}).find((testEntity)=>(scoreboardEntity == testEntity)) == undefined){console.warn(scoreboardEntity.id)}})})}catch(e){}*/ /*
    const propertiesDefinition = new DynamicPropertiesDefinition();
    propertiesDefinition.defineString('blockTransferPreset0', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition, EntityTypes.get("player"));
    const propertiesDefinition1 = new DynamicPropertiesDefinition();
    propertiesDefinition1.defineString('blockTransferPreset1', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition1, EntityTypes.get("player"));
    const propertiesDefinition2 = new DynamicPropertiesDefinition();
    propertiesDefinition2.defineString('blockTransferPreset2', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition2, EntityTypes.get("player"));
    const propertiesDefinition3 = new DynamicPropertiesDefinition();
    propertiesDefinition3.defineString('blockTransferPreset3', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition3, EntityTypes.get("player"));
    const propertiesDefinition4 = new DynamicPropertiesDefinition();
    propertiesDefinition4.defineString('blockTransferPreset4', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition4, EntityTypes.get("player"));
    const propertiesDefinition5 = new DynamicPropertiesDefinition();
    propertiesDefinition5.defineString('blockTransferPreset5', 10000);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition5, EntityTypes.get("player"));
    const propertiesDefinitionWarpList = new DynamicPropertiesDefinition();
    propertiesDefinitionWarpList.defineString('warpList', 10000, "");
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionWarpList, EntityTypes.get("player"));
    const propertiesDefinitionDefaultBlockTransferPresetNum = new DynamicPropertiesDefinition();
    propertiesDefinitionDefaultBlockTransferPresetNum.defineNumber('blockTransferPresetTypeSelectionDefault', 0);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionDefaultBlockTransferPresetNum, EntityTypes.get("player"));
    const propertiesDefinitionDefaultBlockTransferPresetNum2 = new DynamicPropertiesDefinition();
    propertiesDefinitionDefaultBlockTransferPresetNum2.defineNumber('blockTransferPresetTypeSelectionDefault2', 0);
    event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionDefaultBlockTransferPresetNum2, EntityTypes.get("player"));
    const propertiesDefinitionCustomSimulatedPlayerNameValue = new DynamicPropertiesDefinition();
    propertiesDefinitionCustomSimulatedPlayerNameValue.defineString('customSimulatedPlayerName', 10000, "Steve");
    event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionCustomSimulatedPlayerNameValue);
    const propertiesDefinitionSpawnWithoutBehaviorsLocation = new DynamicPropertiesDefinition();
    propertiesDefinitionSpawnWithoutBehaviorsLocation.defineString('spawnWithoutBehaviorsLocation', 10000, "0, 0, 0");
    event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionSpawnWithoutBehaviorsLocation);
    const propertiesDefinitionSpawnWithoutBehaviorsType = new DynamicPropertiesDefinition();
    propertiesDefinitionSpawnWithoutBehaviorsType.defineString('spawnWithoutBehaviorsType', 10000, "minecraft:sheep");
    event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionSpawnWithoutBehaviorsType);
    const propertiesDefinitionWarpListGlobalValues = new DynamicPropertiesDefinition();
    propertiesDefinitionWarpListGlobalValues.defineString('globalWarpListValues', 10000);
    event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionWarpListGlobalValues);*/
}); /*

world.afterEvents.entitySpawn.subscribe((event) => {
    try{if (world.scoreboard.getObjective("andexdbDebug") == undefined){world.scoreboard.addObjective("andexdbDebug", "andexdbScriptDebuggingService")}}catch(e){}
    try{event.entity.runCommand("/scoreboard players @s set andexdbDebug 0")}catch(e){}
  });*/
/*
world.beforeEvents.dataDrivenEntityTriggerEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("dataDrivenEntityTriggerEventBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    ;
    try {
        world.getAllPlayers().filter((player) => { player.hasTag("getEntityTriggerEventNotifications"); }).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.id + ", getComponentGroupsToAdd: " + event.getModifiers()[0].addedComponentGroups + ", getComponentGroupsToRemove: " + event.getModifiers()[0].removedComponentGroups + ", getTriggers: " + event.getModifiers()[0].triggers); });
        if (event.id == "andexsa:friction_modifier_0.9") {
            let componentGroups = event.getModifiers()[0]; */ /*
console.warn(event.id)
console.warn(componentGroups.getComponentGroupsToAdd())*/ /*
componentGroups.addedComponentGroups = ["andexsa:player_is_baby"]; */ /*
console.warn(componentGroups.getComponentGroupsToAdd())*/ /*
event.setModifiers([componentGroups]);
console.warn(event.getModifiers()[0].addedComponentGroups);
}
}
catch { }
}); ;*/ //removed in minecraft 1.20.80 >:(
/*
  world.beforeEvents.pistonActivate.subscribe(event => {
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:pistonActivate")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("pistonActivateBeforeEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
      world.getAllPlayers().filter((player) => ( player.hasTag("getEntityTriggerEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.block.typeId + ", getComponentGroupsToAdd: " + event.piston.getAttachedBlocks()[0].x + ", getComponentGroupsToRemove: " + event.isExpanding) + ", getTriggers: " + event.dimension; });
      if (testIsWithinRanges(noPistonExtensionAreas, event.block.location) == true) {
        event.cancel = true*/ /*
  console.warn(event.isExpanding);
  console.warn(event.block.x, event.block.y, event.block.z);
  console.warn(event.piston.getAttachedBlocks());
  console.warn(event.dimension);*/ /*
}
});*/ //removed in minecraft 1.20.60 >:(
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: the overworld
 * @property minecraft:overworld: the overworld
 * @property nether: the nether
 * @property minecraft:nether: the nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export const dimensionTypeDisplayFormatting = { "minecraft:overworld": "the overworld", "overworld": "the overworld", "minecraft:nether": "the nether", "nether": "the nether", "minecraft:the_end": "the end", "the_end": "the end" };
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export const dimensionTypeDisplayFormattingB = { "minecraft:overworld": "overworld", "overworld": "overworld", "minecraft:nether": "nether", "nether": "nether", "minecraft:the_end": "the end", "the_end": "the end" };
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: The Overworld
 * @property minecraft:overworld: The Overworld
 * @property nether: The Nether
 * @property minecraft:nether: The Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export const dimensionTypeDisplayFormattingC = { "minecraft:overworld": "The Overworld", "overworld": "The Overworld", "minecraft:nether": "The Nether", "nether": "The Nether", "minecraft:the_end": "The End", "the_end": "The End" };
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types.
 * @property overworld: Overworld
 * @property minecraft:overworld: Overworld
 * @property nether: Nether
 * @property minecraft:nether: Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export const dimensionTypeDisplayFormattingD = { "minecraft:overworld": "Overworld", "overworld": "Overworld", "minecraft:nether": "Nether", "nether": "Nether", "minecraft:the_end": "The End", "the_end": "The End" };
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that have formatting codes.
 * @property overworld: §aOverworld
 * @property minecraft:overworld: §aOverworld
 * @property nether: §cNether
 * @property minecraft:nether: §cNether
 * @property the_end: §dThe End
 * @property minecraft:the_end: §dThe End
 */
export const dimensionTypeDisplayFormattingE = { "minecraft:overworld": "§aOverworld", "overworld": "§aOverworld", "minecraft:nether": "§cNether", "nether": "§cNether", "minecraft:the_end": "§dThe End", "the_end": "§dThe End" };
/**
 * @remarks Maps the dimension IDs to their non-namespaces versions.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the_end
 * @property minecraft:the_end: the_end
 */
export const dimensionTypeDisplayFormattingF = { "minecraft:overworld": "overworld", "overworld": "overworld", "minecraft:nether": "nether", "nether": "nether", "minecraft:the_end": "the_end", "the_end": "the_end" };
/**
 * @remarks An array containing all of the dimension objects.
 * @property 0: Overworld
 * @property 1: Nether
 * @property 2: The End
 */
export const dimensions = [world.getDimension("overworld"), world.getDimension("nether"), world.getDimension("the_end")];
/**
 * @remarks Maps the namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 */
export const dimensionsb = { "minecraft:overworld": world.getDimension("overworld"), "minecraft:nether": world.getDimension("nether"), "minecraft:the_end": world.getDimension("the_end") };
/**
 * @remarks Maps the non-namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export const dimensionsc = { "overworld": world.getDimension("overworld"), "nether": world.getDimension("nether"), "the_end": world.getDimension("the_end") };
/**
 * @remarks An array containing all of the namespaced dimension IDs.
 * ```typescript
 * 0: "minecraft:overworld"
 * 1: "minecraft:nether"
 * 2: "minecraft:the_end"
 * ```
 */
export const dimensionsd = ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
/**
 * @remarks An array containing all of the non-namespaced dimension IDs.
 * ```typescript
 * 0: "overworld"
 * 1: "nether"
 * 2: "the_end"
 * ```
 */
export const dimensionse = ["overworld", "nether", "the_end"];
/**
 * @remarks Maps the dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export const dimensionsf = { "minecraft:overworld": world.getDimension("overworld"), "minecraft:nether": world.getDimension("nether"), "minecraft:the_end": world.getDimension("the_end"), "overworld": world.getDimension("overworld"), "nether": world.getDimension("nether"), "the_end": world.getDimension("the_end") };
/**
 * @remarks The overworld dimension object.
 */
export const overworld = world.getDimension("overworld");
/**
 * @remarks The nether dimension object.
 */
export const nether = world.getDimension("nether");
/**
 * @remarks The end dimension object.
 */
export const the_end = world.getDimension("the_end");
Object.defineProperties(globalThis, {
    overworld: {
        value: overworld,
        configurable: true,
        enumerable: true,
        writable: false
    },
    nether: {
        value: nether,
        configurable: true,
        enumerable: true,
        writable: false
    },
    the_end: {
        value: the_end,
        configurable: true,
        enumerable: true,
        writable: false
    },
    Color: {
        value: Color,
        configurable: true,
        enumerable: true,
        writable: false
    },
    colorCore: {
        value: colorCore,
        configurable: true,
        enumerable: true,
        writable: false
    },
    Decimal: {
        value: Decimal,
        configurable: true,
        enumerable: true,
        writable: false
    },
    semver: {
        value: semver,
        configurable: true,
        enumerable: true,
        writable: false
    },
    SemVer: {
        value: semver.SemVer,
        configurable: true,
        enumerable: true,
        writable: false
    },
    config: {
        value: config,
        configurable: true,
        enumerable: true,
        writable: false
    },
    srun: {
        value: srun,
        configurable: true,
        enumerable: true,
        writable: false
    },
    gt: {
        value: gt,
        configurable: true,
        enumerable: true,
        writable: false
    }
});
subscribedEvents.beforeEffectAdd = world.beforeEvents.effectAdd.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("effectAddBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.beforeEntityRemove = world.beforeEvents.entityRemove.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityRemoveBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.beforePlayerGameModeChange = world.beforeEvents.playerGameModeChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerGameModeChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerGameModeChangeBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.beforeWeatherChange = world.beforeEvents.weatherChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:weatherChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("weatherChangeBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
}); /*
world.beforeEvents.itemDefinitionEvent.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemDefinitionEventBeforeEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
});*/ //removed in 1.20.70.21
subscribedEvents.beforePlayerInteractWithEntity = world.beforeEvents.playerInteractWithEntity.subscribe(event => {
    if (!!event?.itemStack?.getDynamicProperty("playerInteractWithEntityCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("playerInteractWithEntityCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemPlayerInteractWithEntityCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithEntityBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId == "andexdb:entity_debug_stick") {
        event.cancel = true;
        const playerTargetB = event.target;
        let entityViewedEntityType;
        let entityViewedEntityName;
        let entityViewedEntityDistance;
        let blockViewedBlockType;
        let spawnPointAllCoordinates;
        entityViewedEntityType = "None";
        entityViewedEntityName = "None";
        entityViewedEntityDistance = "None";
        blockViewedBlockType = "None";
        spawnPointAllCoordinates = "None";
        let scoreboardIdentity = undefined;
        let scoreboardIdentityDisplayName = undefined;
        let scoreboardIdentityType = undefined;
        let distance = mcMath.Vector3Utils.distance(event.player.location, playerTargetB.location);
        try {
            entityViewedEntityType = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
        }
        catch (e) {
            entityViewedEntityType = "§4None§a";
        }
        try {
            entityViewedEntityName = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
        }
        catch (e) {
            entityViewedEntityName = "§4None§a";
        }
        try {
            entityViewedEntityDistance = playerTargetB.getEntitiesFromViewDirection()[0].distance;
        }
        catch (e) {
            entityViewedEntityDistance = "§4None§a";
        }
        let componentList;
        componentList = [];
        try {
            componentList = [playerTargetB.getComponents()[0].typeId];
        }
        catch (e) {
            console.error(e, e.stack);
            componentList = "§4None§a";
        }
        let effectsList = [];
        try {
            effectsList = [("§9{ §stypeId§a: §u" + playerTargetB.getEffects()[0].typeId + "§a, §sdisplayName§a: §u" + playerTargetB.getEffects()[0].displayName + "§a, §sduration§a: §c" + playerTargetB.getEffects()[0].duration + "§a, §samplifier§a: §c" + playerTargetB.getEffects()[0].amplifier + "§9 }§a")];
        }
        catch (e) {
            console.error(e, e.stack);
        }
        let blockProperties = [];
        try {
            blockProperties = [playerTargetB.getBlockFromViewDirection().block.permutation.getAllStates()[0]];
        }
        catch (e) {
            console.error(e, e.stack);
        } /*
        let effectsList = [players[playerTargetB].getComponents[0]]*/
        try {
            scoreboardIdentity = playerTargetB.scoreboardIdentity.id;
        }
        catch (e) {
            scoreboardIdentity = "§4None§a";
        }
        try {
            scoreboardIdentityDisplayName = playerTargetB.scoreboardIdentity.displayName;
        }
        catch (e) {
            scoreboardIdentityDisplayName = "§4None§a";
        }
        try {
            scoreboardIdentityType = playerTargetB.scoreboardIdentity.type;
        }
        catch (e) {
            scoreboardIdentityType = "§4None§a";
        }
        try {
            blockViewedBlockType = "§9{ §btypeId§a: §u" + playerTargetB.getBlockFromViewDirection().block.typeId + "§a, §bcanBeWaterlogged§a: §u" + playerTargetB.getBlockFromViewDirection().block.type.canBeWaterlogged + "§9 }§a";
        }
        catch (e) {
            blockViewedBlockType = "§4None§a";
        }
        for (const index in playerTargetB.getComponents()) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                componentList = String([String(componentList), playerTargetB.getComponents()[index].typeId]).split(",");
            } /*
            console.warn(targetList);*/
        }
        for (const index in playerTargetB.getEffects()) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                effectsList = String([String(effectsList), ("§9{ §stypeId§a: §u" + playerTargetB.getEffects()[index].typeId + "§a, §sdisplayName§a: §u" + playerTargetB.getEffects()[index].displayName + ", §sduration§a: §c" + playerTargetB.getEffects()[index].duration + "§a, §samplifier§a: §c" + playerTargetB.getEffects()[index].amplifier + "§9 }§a")]).split(",");
            } /*
            console.warn(targetList);*/
        }
        event.player.sendMessage("§btypeId§a: §u" + playerTargetB.typeId +
            "§a, §bUUID§a: §u" + playerTargetB.id +
            "§a, §bnameTag§a: §u" + playerTargetB.nameTag +
            "§a, §bdistance§a: §u" + distance +
            "§a, §bLocation§a: §9{ §c" +
            playerTargetB.location.x + "§a, §c" +
            playerTargetB.location.y + "§a, §c" +
            playerTargetB.location.z +
            "§9 }§a, §bdimension§a: §u" + playerTargetB.dimension +
            "§a, §bhealth§a: §g" + playerTargetB.getComponent("health")?.currentValue +
            "§a, §bdefaultHealth§a: §g" + playerTargetB.getComponent("health")?.defaultValue +
            "§a, §beffectiveMinHealth§a: §g" + playerTargetB.getComponent("health")?.effectiveMin +
            "§a, §beffectiveMaxHealth§a: §g" + playerTargetB.getComponent("health")?.effectiveMax +
            "§a, §bisSneaking§a: §g" + playerTargetB.isSneaking +
            "§a, §bscoreboardIdentityId§a: §u" + scoreboardIdentity +
            "§a, §bscoreboardIdentityDisplayName§a: §u" + scoreboardIdentityDisplayName +
            "§a, §bscoreboardIdentityType§a: §u" + scoreboardIdentityType +
            "§a, §bgetBlockFromViewDirection§a: " + blockViewedBlockType +
            ", §bgetEntitiesFromViewDirection§a: { §sEntity§a: " +
            entityViewedEntityType + ", §sDistance§a: " +
            entityViewedEntityDistance +
            " }, §bgetComponents§a: §n[§u" + componentList +
            "§n]§a, §bgetEffects§a: §n[§a" + effectsList +
            "§n]§a, §bgetTags§a: [" + playerTargetB.getTags() +
            "], §bgetVelocity§a: §9{ §c" +
            (playerTargetB.getVelocity().x + "§a, §c" +
                playerTargetB.getVelocity().y + "§a, §c" +
                playerTargetB.getVelocity().z) +
            "§9 }§a, §bgetViewDirection§a: { " +
            (playerTargetB.getViewDirection().x,
                playerTargetB.getViewDirection().y,
                playerTargetB.getViewDirection().z) +
            ", §bselectedSlotIndex§a: " + playerTargetB.selectedSlotIndex +
            (!!playerTargetB.getComponent("projectile") ?
                "§a, §bprojectile§a: §9{ §3airInertia§a: §c" + playerTargetB.getComponent("projectile").airInertia +
                    "§a, §bprojectile§a: §3catchFireOnHurt§a: §g" + playerTargetB.getComponent("projectile").catchFireOnHurt +
                    "§a, §bprojectile§a: §3catchFireOnHurt§a: §g" + playerTargetB.getComponent("projectile").critParticlesOnProjectileHurt
                : ""));
    }
});
subscribedEvents.beforePlayerLeave = world.beforeEvents.playerLeave.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerLeaveBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterBlockExplode = world.afterEvents.blockExplode.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:blockExplode")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("blockExplodeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getBlockExplodeNotifications", "getBlockExplodeNotificationsIn:" + event.dimension, "getBlockExplodeNotificationsForExplodedBlockType:" + event.explodedBlockPermutation.type.id]).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eblockExplode§r] Block of type ${event.explodedBlockPermutation.type.id} in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} was blown up${!!event.source ? ` by ${event.source?.name ?? tryget(() => event.source?.nameTag == "" ? undefined : event.source?.nameTag + "<" + event.source.id + ">") ?? event.source?.typeId + "<" + event.source.id + ">"}` : ""}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getBlockExplodeNotificationsNotificationSound.soundId, { pitch: pn.getBlockExplodeNotificationsNotificationSound.pitch, volume: pn.getBlockExplodeNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterButtonPush = world.afterEvents.buttonPush.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:buttonPush")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("buttonPushAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getButtonPushNotifications", "getButtonPushNotificationsForBlockAt:" + vTStr(event.block.location), "getButtonPushNotificationsForBlockAt:" + vTStr(event.block.location) + " " + event.block.dimension, "getButtonPushNotificationsForBlockAt:" + event.block.dimension + " " + vTStr(event.block.location), "getButtonPushNotificationsForBlockAt:" + JSONStringify(event.block.location), "getButtonPushNotificationsForBlockAt:" + JSONStringify(Object.assign(event.block.location, { dimension: event.block.dimension })), "getButtonPushNotificationsForBlock:" + JSONStringify(Object.assign(event.block.location, { dimension: event.block.dimension })), "getButtonPushNotificationsForBlock:" + JSONStringify(event.block.location)]).filter(p => !p.hasTag("excludeButtonPushNotificationsIn:" + event.dimension.id)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§ebuttonPush§r] Button in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} was pressed by ${event.source?.name ?? tryget(() => event.source?.nameTag == "" ? undefined : event.source?.nameTag + "<" + event.source.id + ">") ?? event.source?.typeId + "<" + event.source.id + ">"}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getButtonPushNotificationsNotificationSound.soundId, { pitch: pn.getButtonPushNotificationsNotificationSound.pitch, volume: pn.getButtonPushNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
export const outsideBorderTintShownTimes = {};
export const outsideBorderTintParticleMolangVariableMapObject = new MolangVariableMap();
outsideBorderTintParticleMolangVariableMapObject.setFloat("variable.max_distance_from_camera", 0.25);
outsideBorderTintParticleMolangVariableMapObject.setFloat("variable.max_particle_age", 0.5);
repeatingIntervals.worldBorderSystem = system.runInterval(() => {
    if (config.worldBorder.overworld.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.overworld));
        world.getAllPlayers().filter(p => p.dimension.id == "minecraft:overworld").forEach(p => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ?? borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >= (outsideBorderTintShownTimes[p.id] + Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500)) || !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p).anchored("eyes").offset({ x: 0, y: 0.1, z: 0 }).positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if ((!p.hasTag("canBypassWorldBorder")) && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    });
                    let rot = values.rot;
                    let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback(dv.x, dv.z, borderSettings.knockbackH ?? 2.5, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x > borderSettings.to.x + borderSettings.buffer || p.location.z > borderSettings.to.z + borderSettings.buffer || p.location.x < borderSettings.from.x - borderSettings.buffer || p.location.z < borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, { cause: EntityDamageCause.void });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x < (borderXDistance / 2)) {
                    borderXOffset -= (borderXDistance / 2) - (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x > -(borderXDistance / 2)) {
                    borderXOffset -= -(borderXDistance / 2) - (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z < (borderZDistance / 2)) {
                    borderZOffset -= (borderZDistance / 2) - (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z > -(borderZDistance / 2)) {
                    borderZOffset -= -(borderZDistance / 2) - (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true || borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
            }
        });
    }
    if (config.worldBorder.nether.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.nether));
        world.getAllPlayers().filter(p => p.dimension.id == "minecraft:nether").forEach(p => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ?? borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >= (outsideBorderTintShownTimes[p.id] + Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500)) || !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p).anchored("eyes").offset({ x: 0, y: 0.1, z: 0 }).positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if ((!p.hasTag("canBypassWorldBorder")) && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    });
                    let rot = values.rot;
                    let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback(dv.x, dv.z, borderSettings.knockbackH ?? 2.5, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x > borderSettings.to.x + borderSettings.buffer || p.location.z > borderSettings.to.z + borderSettings.buffer || p.location.x < borderSettings.from.x - borderSettings.buffer || p.location.z < borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, { cause: EntityDamageCause.void });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x < (borderXDistance / 2)) {
                    borderXOffset -= (borderXDistance / 2) - (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x > -(borderXDistance / 2)) {
                    borderXOffset -= -(borderXDistance / 2) - (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z < (borderZDistance / 2)) {
                    borderZOffset -= (borderZDistance / 2) - (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z > -(borderZDistance / 2)) {
                    borderZOffset -= -(borderZDistance / 2) - (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true || borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
            }
        });
    }
    if (config.worldBorder.the_end.enabled) {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder.the_end));
        world.getAllPlayers().filter(p => p.dimension.id == "minecraft:the_end").forEach(p => {
            let loc = undefined;
            const intensity = Number(p.getDynamicProperty("outsideBorderTintIntensity") ?? borderSettings.tintIntensity);
            if (intensity != 0 && !Number.isNaN(intensity)) {
                if (Date.now() >= (outsideBorderTintShownTimes[p.id] + Number(p.getDynamicProperty("outsideBorderTintShowIntervalMS") ?? 500)) || !!!outsideBorderTintShownTimes[p.id]) {
                    if (borderSettings.showRedScreenOutlineWhenOutsideBorder && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                        loc = WorldPosition.fromentity(p).anchored("eyes").offset({ x: 0, y: 0.1, z: 0 }).positioned("^^^0.2").location;
                        outsideBorderTintShownTimes[p.id] = Date.now();
                        for (let i = 0; i < intensity; i++) {
                            p.spawnParticle("andexdb:world_border_red_screen_tint", loc, outsideBorderTintParticleMolangVariableMapObject);
                        }
                    }
                }
            }
            if ((!p.hasTag("canBypassWorldBorder")) && (p.location.x > borderSettings.to.x || p.location.z > borderSettings.to.z || p.location.x < borderSettings.from.x || p.location.z < borderSettings.from.z)) {
                if (borderSettings.mode == 0) {
                    if (!p.tryTeleport({
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    })) {
                        try {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getNextTopSolidBlockAbovePosition({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                        catch (e) {
                            p.teleport({
                                x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                y: getTopSolidBlock({
                                    x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                                    y: p.location.y,
                                    z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                                }, p.dimension).y,
                                z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                            });
                        }
                    }
                }
                else if (borderSettings.mode == 1) {
                    let values = facingPoint(p.location, {
                        x: Math.max(Math.min(p.location.x, borderSettings.to.x), borderSettings.from.x),
                        y: p.location.y,
                        z: Math.max(Math.min(p.location.z, borderSettings.to.z), borderSettings.from.z)
                    });
                    let rot = values.rot;
                    let difference = values.difference;
                    let dv = anglesToDirectionVectorDeg(rot.x, rot.y);
                    p.applyKnockback(dv.x, dv.z, borderSettings.knockbackH ?? 2.5, borderSettings.knockbackV ?? 1.25);
                }
                else if (borderSettings.mode == 2) {
                    if (p.location.x > borderSettings.to.x + borderSettings.buffer || p.location.z > borderSettings.to.z + borderSettings.buffer || p.location.x < borderSettings.from.x - borderSettings.buffer || p.location.z < borderSettings.from.z - borderSettings.buffer) {
                        p.applyDamage(borderSettings.damage, { cause: EntityDamageCause.void });
                    }
                }
            }
            if (borderSettings.showBorderParticles) {
                const borderXDistance = Math.min(100, Math.abs(borderSettings.to.x - borderSettings.from.x));
                let borderXOffset = 0;
                const borderZDistance = Math.min(100, Math.abs(borderSettings.to.z - borderSettings.from.z));
                let borderZOffset = 0;
                if (borderSettings.to.x - p.location.x < (borderXDistance / 2)) {
                    borderXOffset -= (borderXDistance / 2) - (borderSettings.to.x - p.location.x);
                }
                if (borderSettings.from.x - p.location.x > -(borderXDistance / 2)) {
                    borderXOffset -= -(borderXDistance / 2) - (borderSettings.from.x - p.location.x);
                }
                if (borderSettings.to.z - p.location.z < (borderZDistance / 2)) {
                    borderZOffset -= (borderZDistance / 2) - (borderSettings.to.z - p.location.z);
                }
                if (borderSettings.from.z - p.location.z > -(borderZDistance / 2)) {
                    borderZOffset -= -(borderZDistance / 2) - (borderSettings.from.z - p.location.z);
                }
                if ((p.getDynamicProperty("useShadersCompatibleParticles") ?? false) == true || borderSettings.useShadersCompatibleBorderParticles) {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("andexdb:rising_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("andexdb:falling_border_dust_particle_b", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
                else {
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.to.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.to.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && !(p.location.z > borderSettings.to.z + 50) && !(p.location.z < borderSettings.from.z - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: Math.max(Math.min(p.location.z + ((Math.random() * borderZDistance) - (borderZDistance / 2)) + borderZOffset, borderSettings.to.z), borderSettings.from.z) });
                    }
                    if (Math.abs(borderSettings.from.z - p.location.z) <= 50 && !(p.location.x > borderSettings.to.x + 50) && !(p.location.x < borderSettings.from.x - 50)) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { z: borderSettings.from.z, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), x: Math.max(Math.min(p.location.x + ((Math.random() * borderXDistance) - (borderXDistance / 2)) + borderXOffset, borderSettings.to.x), borderSettings.from.x) });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.to.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.to.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.to.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.to.z });
                    }
                    if (Math.abs(borderSettings.from.x - p.location.x) <= 50 && Math.abs(borderSettings.from.z - p.location.z) <= 50) {
                        p.spawnParticle("minecraft:rising_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                        p.spawnParticle("minecraft:falling_border_dust_particle", { x: borderSettings.from.x, y: Math.random() < 0.75 ? p.location.y + ((Math.random() * 10) - 5) : p.location.y + ((Math.random() * 100) - 50), z: borderSettings.from.z });
                    }
                }
            }
        });
    }
}, 1);
// ${se}srun(()=>{let p = player; let values = facingPoint(p.location, {x: 240.50, y: 75.00, z: 1269.50}); let rot = values.rot; let difference = values.difference; let dv = anglesToDirectionVectorDeg(rot.x, rot.y); bsend([values, dv]); p.applyKnockback(dv.x, dv.z, (1-Math.abs(dv.y))*Vector.magnitude(difference), dv.y*Vector.magnitude(difference)); })
subscribedEvents.afterChatSend = world.afterEvents.chatSend.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:chatSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterDataDrivenEntityTrigger = world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:dataDrivenEntityTrigger")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("dataDrivenEntityTriggerAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:dataDrivenEntityTriggerEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("dataDrivenEntityTriggerEventAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterEffectAdd = world.afterEvents.effectAdd.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("effectAddAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getEffectAddNotifications", "getEffectAddNotificationsForEntityType:" + event.entity.typeId, "getEntitySpawnNotificationsForEntityId:" + event.entity.id, "getEntitySpawnNotificationsWithEffectType:" + event.effect.typeId, "getEntitySpawnNotificationsWithEffectName:" + event.effect.displayName, "getEntitySpawnNotificationsWithAmplifier:" + event.effect.amplifier, "getEntitySpawnNotificationsWithEffectDuration:" + event.effect.duration]).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eeffectAdd§r] The effect ${event.effect.displayName} with the amplifier ${event.effect.amplifier} and the duration ${event.effect.duration} was added to ${event.entity.typeId == "minecraft:player" ? event.entity?.name : `an entity of type ${event.entity.typeId} with the id ${event.entity.id} in ${dimensionTypeDisplayFormatting[event.entity.dimension.id]} at ${event.entity.location}`}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEffectAddNotificationsNotificationSound.soundId, { pitch: pn.getEffectAddNotificationsNotificationSound.pitch, volume: pn.getEffectAddNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterEntityDie = world.afterEvents.entityDie.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityDie")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityDieAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterEntityHealthChanged = world.afterEvents.entityHealthChanged.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHealthChanged")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHealthChangedAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterEntityHitBlock = world.afterEvents.entityHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterEntityHitEntity = world.afterEvents.entityHitEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        if (["minecraft:ender_crystal"].includes(event.hitEntity?.typeId)) {
            getPlayersWithTags("getHitEntityTriggerExplosionNotifications").filter(p => !p.hasTag("excludeHitEntityTriggerExplosionNotificationsIn:" + (tryget(() => event.hitEntity?.dimension) ?? "unknown")) && ((!!event.damagingEntity && (event.damagingEntity?.isValid() ?? true)) ? !p.hasTag("excludeHitEntityTriggerExplosionNotificationsBy:" + (event.damagingEntity?.name ?? event.damagingEntity?.nameTag)) && !p.hasTag("excludeHitEntityTriggerExplosionNotificationsById:" + event.damagingEntity?.id) && !p.hasTag("excludeHitEntityTriggerExplosionNotificationsByType:" + event.damagingEntity?.typeId) : !p.hasTag("excludeHitEntityTriggerExplosionNotificationsWithNoSource")) && !p.hasTag("excludeHitEntityTriggerExplosionNotificationsCauseType:" + event.hitEntity?.typeId)).forEach(p => psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eexplosiveEntityTriggeredByHit§r] ${!!event.damagingEntity ? `${event.damagingEntity?.name ?? event.damagingEntity?.nameTag ?? event.damagingEntity?.typeId} hit exploding entity of type "${event.hitEntity?.typeId}"` : `Exploding entity of type "${event.hitEntity?.typeId}" was hit`}${(!!tryget(() => event.hitEntity?.dimension) && (event.hitEntity?.isValid() ?? true)) ? ` in ${dimensionTypeDisplayFormatting[tryget(() => event.hitEntity?.dimension?.id)] ?? "an unknown dimension"} at ${(!!tryget(() => event.hitEntity?.location) && (event.hitEntity?.isValid() ?? true)) ? vTStr(event.hitEntity?.location) : "an unknwon location"}` : (!!event.damagingEntity.dimension && (event.damagingEntity?.isValid() ?? true)) ? `, the entity/player who hit the explosive entity is in ${dimensionTypeDisplayFormatting[tryget(() => event.damagingEntity?.dimension?.id)] ?? "an unknown dimension"} at ${(!!tryget(() => event.damagingEntity?.location) && (event.damagingEntity?.isValid() ?? true)) ? vTStr(mcMath.Vector3Utils.floor(event.damagingEntity?.location)) : "an unknwon location"}` : ""}. `));
        }
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterEntityHurt = world.afterEvents.entityHurt.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHurt")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHurtAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getEntityHurtNotifications", "getEntityHurtNotificationsForType:" + event.hurtEntity?.typeId, "getEntityHurtNotificationsForId:" + event.hurtEntity?.id, "getEntityHurtNotificationsWithCause:" + event.damageSource?.cause, "getEntityHurtNotificationsWithDamage:" + event.damage, "getEntityHurtNotificationsWithDamagingEntityOfType:" + event.damageSource?.damagingEntity?.typeId, "getEntityHurtNotificationsWithDamagingEntityWithId:" + event.damageSource?.damagingEntity?.id, "getEntityHurtNotificationsWithDamagingProjectileOfType:" + event.damageSource?.damagingProjectile?.typeId, "getEntityHurtNotificationsWithDamagingProjectileWithId:" + event.damageSource?.damagingProjectile?.id]).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eentityHurt§r] Entity of type ${event.hurtEntity?.typeId} with the id ${event.hurtEntity?.id} took ${event.damage} damage of type "${event.damageSource?.cause}" in ${tryget(() => dimensionTypeDisplayFormatting[event.hurtEntity?.dimension?.id]) ?? "an unknown dimension"} at ${(event.hurtEntity?.isValid() ?? false) ? vTStr(event.hurtEntity?.location) : "an unknown location"}${!!event.damageSource?.damagingEntity ? `, the entity was damaged by ${event.damageSource?.damagingEntity?.typeId == "minecraft:player" ? event.damageSource?.damagingEntity?.name : `an entity of type ${event.damageSource?.damagingEntity?.typeId} with the ID ${event.damageSource?.damagingEntity?.id}${tryget(() => event.damageSource.damagingEntity.nameTag != "" ? " and the name tag \"" + event.damageSource.damagingEntity.nameTag + "\"" : "")}`}${tryget(() => " in " + dimensionTypeDisplayFormatting[event.damageSource.damagingEntity.dimension.id] + " at " + vTStr(event.damageSource.damagingEntity.location))}` : ""}${!!event.damageSource?.damagingProjectile ? `, the projectile that damaged the entity was ${`a projectile of type ${event.damageSource?.damagingProjectile?.typeId} with the ID ${event.damageSource?.damagingProjectile?.id}${tryget(() => event.damageSource.damagingProjectile.nameTag != "" ? " and the name tag \"" + event.damageSource.damagingProjectile.nameTag + "\"" : "")}`}${tryget(() => " in " + dimensionTypeDisplayFormatting[event.damageSource.damagingProjectile.dimension.id] + " at " + vTStr(event.damageSource.damagingProjectile.location))}` : ""}. The current velocity of the damaged entity is: ${tryget(() => JSON.stringify(event.hurtEntity.getVelocity())) ?? "§cError: Unable to get velocity.§r"}`); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEntityHurtNotificationsNotificationSound.soundId, { pitch: pn.getEntityHurtNotificationsNotificationSound.pitch, volume: pn.getEntityHurtNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterEntityLoad = world.afterEvents.entityLoad.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityLoad")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityLoadAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getEntityLoadNotifications", "getEntityLoadNotificationsForType:" + event.entity.typeId, "getEntityLoadNotificationsForId:" + event.entity.id]).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eentityLoad§r] Entity of type ${event.entity.typeId} with the ID ${event.entity.id}${event.entity.nameTag != "" ? " and the name \"" + event.entity.nameTag + "\"" : ""} was loaded in ${dimensionTypeDisplayFormatting[event.entity.dimension.id]} at ${vTStr(event.entity.location)}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEntityLoadNotificationsNotificationSound.soundId, { pitch: pn.getEntityLoadNotificationsNotificationSound.pitch, volume: pn.getEntityLoadNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterEntityRemove = world.afterEvents.entityRemove.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityRemoveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getEntityRemoveNotifications", "getEntityRemoveNotificationsForType:" + event.typeId, "getEntityRemoveNotificationsForId:" + event.removedEntityId]).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eentityRemove§r] Entity of type ${event.typeId} with the id ${event.removedEntityId} was removed. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEntityRemoveNotificationsNotificationSound.soundId, { pitch: pn.getEntityRemoveNotificationsNotificationSound.pitch, volume: pn.getEntityRemoveNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterEntitySpawn = world.afterEvents.entitySpawn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entitySpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entitySpawnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getEntitySpawnNotifications", "getEntitySpawnNotificationsForType:" + event.entity.typeId, "getEntitySpawnNotificationsForId:" + event.entity.id, "getEntitySpawnNotificationsWithCause:" + event.cause]).filter(v => (event.entity.typeId == "andexdb:player_inventory_save_storage" ? v.hasTag("getNotifiedOfPlayerInventorySaveStorageEntitySpawns") : true)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eentitySpawn§r] Entity of type ${event.entity.typeId} with the id ${event.entity.id} was spawned in ${dimensionTypeDisplayFormatting[event.entity?.dimension?.id]} at ${JSON.stringify(event.entity?.location)} with the cause "${event.cause}". `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEntitySpawnNotificationsNotificationSound.soundId, { pitch: pn.getEntitySpawnNotificationsNotificationSound.pitch, volume: pn.getEntitySpawnNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterExplosion = world.afterEvents.explosion.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("explosionAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getExplosionNotifications", "getExplosionNotificationsForSourceType:" + (event.source?.typeId ?? "none")]).filter(p => !p.hasTag("excludeExplosionNotificationsIn:" + event.dimension) && (!!event.source ? !p.hasTag("excludeExplosionNotificationsBy:" + (event.source?.name ?? tryget(() => event.source?.nameTag) ?? "undefined")) && !p.hasTag("excludeExplosionNotificationsById:" + event.source?.id) && !p.hasTag("excludeExplosionNotificationsType:" + event.source?.typeId) : !p.hasTag("excludeExplosionNotificationsWithNoSource"))).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eexplosion§r]${!!event.source ? "[" + (event.source?.name ?? tryget(() => event.source?.nameTag) ?? (event.source?.typeId + "<" + event.source?.id + ">")) + "]" : ""} ${!!event.source ? "Triggered explosion" : "Explosion occured"} in ${dimensionTypeDisplayFormatting[event.dimension.id]}${event.getImpactedBlocks().length != 0 ? " around " : ""}${event.getImpactedBlocks().length == 0 ? "" : vTStr((() => { let value = mcMath.VECTOR3_ZERO; event.getImpactedBlocks().forEach(b => { value = mcMath.Vector3Utils.add(value, b.location); }); return mcMath.Vector3Utils.scale(value, 1 / event.getImpactedBlocks().length); })())}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getExplosionNotificationsNotificationSound.soundId, { pitch: pn.getExplosionNotificationsNotificationSound.pitch, volume: pn.getExplosionNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    //console.warn(JSONStringify(event.getImpactedBlocks(), true))
});
subscribedEvents.afterItemCompleteUse = world.afterEvents.itemCompleteUse.subscribe(event => {
    if (!!event?.itemStack?.getDynamicProperty("itemCompleteUseCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("itemCompleteUseCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemCompleteUseCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemCompleteUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemCompleteUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterGameRuleChange = world.afterEvents.gameRuleChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:gameRuleChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("gameRuleChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithTags("getGameRuleChangeNotifications").filter(p => !p.hasTag("excludeGameRuleChangeNotificationsFor:" + event.rule)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§egameRuleChange§r] "${event.rule}" was changed to ${event.value}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getGameRuleChangeNotificationsNotificationSound.soundId, { pitch: pn.getGameRuleChangeNotificationsNotificationSound.pitch, volume: pn.getGameRuleChangeNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterPlayerGameModeChange = world.afterEvents.playerGameModeChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerGameModeChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerGameModeChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithTags("getGameModeChangeNotifications").filter(p => !p.hasTag("excludeGameModeChangeNotificationsFor:" + event.player.name) && !p.hasTag("excludeGameModeChangeNotificationsFrom:" + event.fromGameMode) && !p.hasTag("excludeGameModeChangeNotificationsTo:" + event.toGameMode)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eplayerGameModeChange§r][${event.player.name}] Changed from ${event.fromGameMode} to ${event.toGameMode}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getPlayerGameModeChangeNotificationsNotificationSound.soundId, { pitch: pn.getPlayerGameModeChangeNotificationsNotificationSound.pitch, volume: pn.getPlayerGameModeChangeNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterWeatherChange = world.afterEvents.weatherChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:weatherChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("weatherChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithTags("getWeatherChangeNotifications").filter(p => !p.hasTag("excludeWeatherChangeNotificationsTo:" + event.newWeather) && !p.hasTag("excludeGameModeChangeNotificationsIn:" + event.dimension) && !p.hasTag("excludeGameModeChangeNotificationsFrom:" + event.previousWeather)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eweatherChange§r] Weather in ${event.dimension} changed from ${event.previousWeather} to ${event.newWeather}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getWeatherChangeNotificationsNotificationSound.soundId, { pitch: pn.getWeatherChangeNotificationsNotificationSound.pitch, volume: pn.getWeatherChangeNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
}); /*
world.afterEvents.itemDefinitionEvent.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalAfterEvents:itemDefinitionEvent")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemDefinitionEventAfterEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
});*/ /*
subscribedEvents.afterItemReleaseUse = world.afterEvents.itemReleaseUse.subscribe(event => {
try{eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")){currentplayer.sendMessage(e + e.stack)}})}
// world.sendMessage("itemReleaseUse: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, useDuration: event.useDuration}))
});*/
subscribedEvents.afterItemStartUse = world.afterEvents.itemStartUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStartUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStartUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        try {
            const mode = Boolean(event.source.getDynamicProperty("posM") ?? false);
            const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
            if (!!!loc) {
                event.source.sendMessage("§cError: You must be facing a block.");
            }
            else {
                const posV = mcMath.Vector3Utils.floor(loc);
                event.source.setDynamicProperty(mode ? "pos2" : "pos1", posV);
                event.source.setDynamicProperty("posD", event.source.dimension.id);
                event.source.sendMessage(`Set ${mode ? "pos2" : "pos1"} to ${vTStr(posV)}.`);
                event.source.setDynamicProperty("posM", !mode);
                srun(() => {
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2" : "andexdb:xz_axis_particle_pos1", Vector.add(loc, { x: 0.5, y: 1.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_north" : "andexdb:xz_axis_particle_pos1_north", Vector.add(loc, { x: 0.5, y: 0.5, z: 1.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_east" : "andexdb:xz_axis_particle_pos1_east", Vector.add(loc, { x: -0.005, y: 0.5, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_down" : "andexdb:xz_axis_particle_pos1_down", Vector.add(loc, { x: 0.5, y: -0.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_south" : "andexdb:xz_axis_particle_pos1_south", Vector.add(loc, { x: 0.5, y: 0.5, z: -0.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_west" : "andexdb:xz_axis_particle_pos1_west", Vector.add(loc, { x: 1.005, y: 0.5, z: 0.5 }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    // world.sendMessage("itemStartUse: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, useDuration: event.useDuration}))
});
subscribedEvents.afterItemStartUseOn = world.afterEvents.itemStartUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStartUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStartUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        try {
            const mode = Boolean(event.source.getDynamicProperty("posM") ?? false);
            const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
            if (!!!loc) {
                event.source.sendMessage("§cError: You must be facing a block.");
            }
            else {
                const posV = mcMath.Vector3Utils.floor(loc);
                event.source.setDynamicProperty(mode ? "pos2" : "pos1", posV);
                event.source.setDynamicProperty("posD", event.source.dimension.id);
                event.source.sendMessage(`Set ${mode ? "pos2" : "pos1"} to ${vTStr(posV)}.`);
                event.source.setDynamicProperty("posM", !mode);
                srun(() => {
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2" : "andexdb:xz_axis_particle_pos1", Vector.add(loc, { x: 0.5, y: 1.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_north" : "andexdb:xz_axis_particle_pos1_north", Vector.add(loc, { x: 0.5, y: 0.5, z: 1.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_east" : "andexdb:xz_axis_particle_pos1_east", Vector.add(loc, { x: -0.005, y: 0.5, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_down" : "andexdb:xz_axis_particle_pos1_down", Vector.add(loc, { x: 0.5, y: -0.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_south" : "andexdb:xz_axis_particle_pos1_south", Vector.add(loc, { x: 0.5, y: 0.5, z: -0.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_west" : "andexdb:xz_axis_particle_pos1_west", Vector.add(loc, { x: 1.005, y: 0.5, z: 0.5 }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    // world.sendMessage("itemStartUseOn: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, block: event.block, blockFace: event.blockFace}))
});
subscribedEvents.afterItemStopUse = world.afterEvents.itemStopUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStopUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    // world.sendMessage("itemStopUse: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, useDuration: event.useDuration}))
});
subscribedEvents.afterItemStopUseOn = world.afterEvents.itemStopUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStopUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    // world.sendMessage("itemStopUseOn: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, block: event.block}))
});
subscribedEvents.afterItemUse = world.afterEvents.itemUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterItemUseOn = world.afterEvents.itemUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterLeverAction = world.afterEvents.leverAction.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:leverAction")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("leverActionAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithTags("getLeverActionNotifications").filter(p => !p.hasTag("excludeLeverActionNotificationsTo:" + event.isPowered) && !p.hasTag("excludeLeverActionNotificationsIn:" + event.dimension) && !p.hasTag("excludeLeverActionNotificationsBy:" + event.player.name) && !p.hasTag("excludeLeverActionNotificationsAt:" + Object.values(event.block.location).join(","))).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eleverAction§r][${event.player.name}] Lever in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} turned ${event.isPowered ? "ON" : "OFF"}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getLeverActionNotificationsNotificationSound.soundId, { pitch: pn.getLeverActionNotificationsNotificationSound.pitch, volume: pn.getLeverActionNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterMessageReceive = world.afterEvents.messageReceive.subscribe(event => {
    //console.warn(event.id, event.message, event.player?.name, event.player?.id)
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:messageReceive")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("messageReceiveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithTags("getMessageReceiveNotifications").filter(p => !p.hasTag("excludeMessageReceiveNotificationsWithId:" + event.id) && !p.hasTag("excludeMessageReceiveNotificationsWithMessage:" + event.message) && !p.hasTag("excludeMessageReceiveNotificationsBy:" + event.player.name)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§emessageReceive§r][${event.player.name}] Message received with ID ${event.id} and value "${event.message}". `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getMessageRecieveNotificationsNotificationSound.soundId, { pitch: pn.getMessageRecieveNotificationsNotificationSound.pitch, volume: pn.getMessageRecieveNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterPistonActivate = world.afterEvents.pistonActivate.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pistonActivate")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pistonActivateAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPlayerBreakBlock = world.afterEvents.playerBreakBlock.subscribe(event => {
    if (!!event?.itemStackBeforeBreak?.getDynamicProperty("afterPlayerBreakBlockCode")) {
        try {
            eval(String(event?.itemStackBeforeBreak?.getDynamicProperty("afterPlayerBreakBlockCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemAfterPlayerBreakBlockCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerBreakBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerBreakBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPlayerDimensionChange = world.afterEvents.playerDimensionChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerDimensionChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerDimensionChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        getPlayersWithAnyOfTags(["getPlayerDimensionChangeNotifications", "includePlayerDimensionChangeNotificationsBy:" + event.player.name, "includePlayerDimensionChangeNotificationsFromDimension:" + event.fromDimension, "includePlayerDimensionChangeNotificationsToDimension:" + event.toDimension, "includeBeforeChatSendNotificationsById:" + event.player.name]).filter(p => !p.hasTag("excludeBeforeChatSendNotificationsById:" + event.player.id) && !p.hasTag("excludeBeforeChatSendNotificationsBy:" + event.player.name)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eplayerDimensionChange§r][${event.player.name}] Entered ${dimensionTypeDisplayFormatting[event.fromDimension.id]} at ${vTStr(event.fromLocation)} from ${dimensionTypeDisplayFormatting[event.toDimension.id]} at ${vTStr(event.toLocation)}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getPlayerDimensionChangeNotificationsNotificationSound.soundId, { pitch: pn.getPlayerDimensionChangeNotificationsNotificationSound.pitch, volume: pn.getPlayerDimensionChangeNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterPlayerInteractWithBlock = world.afterEvents.playerInteractWithBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        if ((["minecraft:respawn_anchor", "minecraft:tnt"].includes(event.block.typeId) && event.block.dimension.id == "minecraft:overworld") || (["minecraft:bed", "minecraft:tnt"].includes(event.block.typeId) && event.block.dimension.id == "minecraft:nether") || (["minecraft:respawn_anchor", "minecraft:tnt", "minecraft:bed"].includes(event.block.typeId) && event.block.dimension.id == "minecraft:overworld")) {
            getPlayersWithTags("getBlockInteractTriggerExplosionNotifications").filter(p => !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsIn:" + event.block.dimension) && (!!event.player ? !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsBy:" + event.player?.name) && !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsById:" + event.player.id) : !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsWithNoSource")) && !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsBlockType:" + event.block.typeId)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eexplosiveBlockInteraction§r] ${!!event.player ? `${event.player.name ?? event.player.nameTag} interacted with explosive block of type "${event.block.typeId}"` : `Explosive block of type "${event.block.typeId}" was interacted with`} in ${dimensionTypeDisplayFormatting[event.block.dimension.id]} at ${vTStr(event.block.location)}${!!event.itemStack ? ` using ${event.itemStack?.typeId}` : ""}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getBlockInteractTriggerExplosionNotificationsNotificationSound.soundId, { pitch: pn.getBlockInteractTriggerExplosionNotificationsNotificationSound.pitch, volume: pn.getBlockInteractTriggerExplosionNotificationsNotificationSound.volume })); });
        }
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterPlayerInteractWithEntity = world.afterEvents.playerInteractWithEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    try {
        if (["minecraft:creeper"].includes(event.target.typeId) && !!event.itemStack) {
            getPlayersWithTags("getEntityInteractTriggerExplosionNotifications").filter(p => !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsIn:" + event.target.dimension) && (!!event.player ? !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsBy:" + event.player?.name) && !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsById:" + event.player.id) : !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsWithNoSource")) && !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsEntityType:" + event.target.typeId)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§eexplosiveEntityInteraction§r] ${!!event.player ? `${event.player.name ?? event.player.nameTag} interacted with explosive entity of type "${event.target.typeId}"` : `Explosive entity of type "${event.target.typeId}" was interacted with`} in ${dimensionTypeDisplayFormatting[event.target.dimension.id]} at ${vTStr(event.target.location)}${!!event.itemStack ? ` using ${event.itemStack?.typeId}` : ""}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getEntityInteractTriggerExplosionNotificationsNotificationSound.soundId, { pitch: pn.getEntityInteractTriggerExplosionNotificationsNotificationSound.pitch, volume: pn.getEntityInteractTriggerExplosionNotificationsNotificationSound.volume })); });
        }
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
subscribedEvents.afterPlayerJoin = world.afterEvents.playerJoin.subscribe(event => {
    try {
        console.warn(`Player ${JSON.stringify(event.playerName)}<${event.playerId}> joined the game.`);
    }
    catch {
        try {
            console.warn(`${event.playerName}<${event.playerId}> joined the game.`);
        }
        catch { }
    }
    if (!!(ban?.getValidBans()?.idBans?.find(_ => _?.playerId == event?.playerId) ?? ban.getValidBans().nameBans.find(_ => _.playerName == event.playerName))) {
        try {
            let pName = event?.playerName;
            let pId = event?.playerId;
            let b = (ban?.getValidBans()?.idBans?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate)))?.find(_ => _?.playerId == event?.playerId) ?? ban.getValidBans().nameBans?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate))).find(_ => _.playerName == event.playerName));
            let reason = b?.reason;
            try {
                reason = String(eval(b?.reason)?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedByName}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toUTCString() + " GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toUTCString() + " GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw)) ?? b?.reason) ?? b?.reason;
            }
            catch (e) {
                reason = b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toUTCString() + " GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toUTCString() + " GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))?.escapeCharactersB(true)?.v ?? b?.reason;
            }
            ;
            world.getDimension("overworld").runCommand(`/kick ${JSON.stringify(pName)} ${reason}`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerJoin")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerJoinAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPlayerLeave = world.afterEvents.playerLeave.subscribe(event => {
    try {
        console.warn(`Player ${JSON.stringify(event.playerName)}<${event.playerId}> left the game.`);
    }
    catch {
        try {
            console.warn(`${event.playerName}<${event.playerId}> left the game.`);
        }
        catch { }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerLeaveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPlayerPlaceBlock = world.afterEvents.playerPlaceBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerPlaceBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerPlaceBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPlayerSpawn = world.afterEvents.playerSpawn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerSpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerSpawnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPressurePlatePop = world.afterEvents.pressurePlatePop.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePop")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pressurePlatePopAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterPressurePlatePush = world.afterEvents.pressurePlatePush.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePush")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pressurePlatePushAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterProjectileHitBlock = world.afterEvents.projectileHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("projectileHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterProjectileHitEntity = world.afterEvents.projectileHitEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("projectileHitEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterTargetBlockHit = world.afterEvents.targetBlockHit.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:targetBlockHit")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("targetBlockHitAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterTripWireTrip = world.afterEvents.tripWireTrip.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:tripWireTrip")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("tripWireTripAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.afterWeatherChange = world.afterEvents.weatherChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:weatherChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("weatherChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
});
subscribedEvents.beforeExplosion = world.beforeEvents.explosion.subscribe(event => {
    if (disconnectingPlayers.includes(event.source?.id)) {
        event.cancel = true;
        return;
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("explosionBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    } /*
    eval(String(world.getDynamicProperty("scriptEvalBeforeEventsExplosion")))*/
    try {
        getPlayersWithAnyOfTags(["getBeforeExplosionNotifications", "getExplosionNotificationsForSourceType:" + (event.source?.typeId ?? "none"), "getExplosionNotificationsForSourceId:" + (event.source?.id ?? "none")]).filter(p => !p.hasTag("excludeBeforeExplosionNotificationsIn:" + event.dimension) && (!!event.source ? !p.hasTag("excludeBeforeExplosionNotificationsType:" + event.source?.typeId) : true) && ((!!event.source && (event.source?.isValid() ?? true)) ? !p.hasTag("excludeBeforeExplosionNotificationsBy:" + (event.source?.name ?? tryget(() => event.source?.nameTag))) && !p.hasTag("excludeBeforeExplosionNotificationsById:" + event.source?.id) : !p.hasTag("excludeBeforeExplosionNotificationsWithNoSource"))).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§ebeforeExplosion§r]${!!event.source ? "[" + (event.source?.name ?? tryget(() => event.source?.nameTag == "" ? undefined : event.source?.nameTag) ?? (event.source?.typeId + "<" + event.source?.id + ">")) + "]" : ""} ${!!event.source ? "Triggered explosion" : "Explosion occured"} in ${dimensionTypeDisplayFormatting[event.dimension.id]}${event.getImpactedBlocks().length == 0 ? "" : " around " + vTStr((() => { let value = mcMath.VECTOR3_ZERO; event.getImpactedBlocks().forEach(b => { value = mcMath.Vector3Utils.add(value, b.location); }); return mcMath.Vector3Utils.scale(value, 1 / event.getImpactedBlocks().length); })())}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getBeforeExplosionNotificationsNotificationSound.soundId, { pitch: pn.getBeforeExplosionNotificationsNotificationSound.pitch, volume: pn.getBeforeExplosionNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    //world.getAllPlayers().filter((player) => ( player.hasTag("getExplosionEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("Location: [ " + event.source.location.x+", "+event.source.location.y+", "+event.source.location.z + " ], Dimension: " + event.dimension.id) });
    if (!!!event.source?.location ? false : (((testIsWithinRanges(noExplosionAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.source.location) ?? false) == true) && ((testIsWithinRanges(noExplosionAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.source.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.source.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.source.location) ?? false) == false))) {
        event.cancel = true; /*
        console.warn(event.isExpanding);
        console.warn(event.block.x, event.block.y, event.block.z);
        console.warn(event.piston.getAttachedBlocks());
        console.warn(event.dimension);*/
    }
    else {
        //console.warn("before set: "+JSONStringify(event.getImpactedBlocks(), true))
        event.setImpactedBlocks(event.getImpactedBlocks().filter((blockselected) => !((((testIsWithinRanges(noExplosionAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), blockselected.location) ?? false) == true) && ((testIsWithinRanges(noExplosionAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), blockselected.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), blockselected.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), blockselected.location) ?? false) == false)))));
    }
    //console.warn("after set: "+JSONStringify(event.getImpactedBlocks(), true))
});
subscribedEvents.afterItemReleaseUseB = world.afterEvents.itemReleaseUse.subscribe(event => {
    if (!!event?.itemStack?.getDynamicProperty("itemReleaseUseCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("itemReleaseUseCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemReleaseUseCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.source.setDynamicProperty("interactable_block", 0);
    }
    ;
}); /*
world.afterEvents.entitySpawn.subscribe(event=>{
    if(event.entity.typeId!=="minecraft:fishing_hook"){
        return;
    };
    const sourceEntity = event.entity.dimension.getEntities({families: ["family_of_the_custom_mob_that_uses_the_fishing_rod_to_attack_the_player"], closest: 1, maxDistance: 5})[0];
    if(!!!sourceEntity){
        event.entity.setDynamicProperty("hasIdentifiedSourceCustomMob", false);
        return;
    };
    event.entity.setDynamicProperty("hasIdentifiedSourceCustomMob", true);
    event.entity.setDynamicProperty("uuidOfCustomMob", sourceEntity.id);
});*/
subscribedEvents.beforePlayerInteractWithBlock = world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    if (event.player.hasTag("debugStickDyingMode") && event.block.typeId == "minecraft:cauldron") {
        event.cancel = false;
        srun(async () => {
            const arr = cmdutils.rangeToIntArray([0, 100]);
            for await (let i of arr) {
                if (!event.player.hasTag("debugStickDyingMode")) {
                    return;
                }
                ;
                event.player.onScreenDisplay.setActionBar("§aYou currently have Debug Stick Dying Mode enabled,\nwhich disables the use of the debug sticks, editor sticks,\nand pick block sticks on cauldrons, to allow them to\nbe dyed by the cauldron. To switch out of this mode\njust remove the debugStickDyingMode tag from yourself.");
                await waitTick();
            }
            ;
        });
        return;
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        // console.log(1);
        return;
    }
    if (!!event?.itemStack?.getDynamicProperty("playerInteractWithBlockCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("playerInteractWithBlockCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemPlayerInteractWithBlockCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithBlockBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true;
        let initialDelay = 4;
        let delay = 4;
        let holdDuration = 10;
        if (event.player.getDynamicProperty("debugStickInitialUseCooldown") != undefined) {
            initialDelay = Number(event.player.getDynamicProperty("debugStickInitialUseCooldown"));
        }
        ;
        if (event.player.getDynamicProperty("debugStickUseCooldown") != undefined) {
            delay = Number(event.player.getDynamicProperty("debugStickUseCooldown"));
        }
        ;
        if (event.player.getDynamicProperty("debugStickHoldDuration") != undefined) {
            holdDuration = Number(event.player.getDynamicProperty("debugStickHoldDuration"));
        }
        ;
        if (interactable_block.find((playerId) => (playerId.id == event.player.id)) == undefined) {
            interactable_block.push({ id: event.player.id, delay: 0 });
        }
        ;
        if (event.isFirstEvent) {
            interactable_block.find((playerId) => (playerId.id == event.player.id)).delay = initialDelay;
            interactable_block.find((playerId) => (playerId.id == event.player.id)).holdDuration = holdDuration;
            debugAction(event.block, event.player, 0, Number(event.player.isSneaking));
        }
        else if ((interactable_block.find((playerId) => (playerId.id == event.player.id)).delay == 0) || (String(Object.values(event.player.getDynamicProperty("debugStickBlockLocation"))) != String(Object.values(event.block.location)))) {
            interactable_block.find((playerId) => (playerId.id == event.player.id)).delay = delay;
            interactable_block.find((playerId) => (playerId.id == event.player.id)).holdDuration = holdDuration;
            debugAction(event.block, event.player, 0, Number(event.player.isSneaking));
        }
    }
    ; /*
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true
        try {
            const mode = Boolean(event.player.getDynamicProperty("posM")??false)
            const posV = mcMath.Vector3Utils.floor(event.block.location)
            event.player.setDynamicProperty(mode?"pos2":"pos1", posV)
            event.source.setDynamicProperty("posD", event.source.dimension.id)
            event.player.sendMessage(`Set ${mode?"pos2":"pos1"} to ${vTStr(posV)}.`)
            event.player.setDynamicProperty("posM", !mode)
        }catch(e){console.error(e, e.stack)}
    };*/
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerBlockInteractionEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.playerInteractWithBlock]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Is First Event: " + event.isFirstEvent + ", Player: " + event.player.name); });
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockInteractAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockInteractAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == false)) || (((testIsWithinRanges(noInteractAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noInteractAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.block.dimension.id)]]));
        if (borderSettings.enabled && borderSettings.preventWorldInteractionOutsideBorder) {
            if ((!event.player.hasTag("canBypassWorldBorderInteractionLimits")) && (event.block.x >= borderSettings.to.x || event.block.z >= borderSettings.to.z || event.block.x < borderSettings.from.x || event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
        }
    }
    if (event.isFirstEvent) {
        if (event.itemStack?.typeId === "andexdb:editor_stick") {
            event.cancel = true;
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStick(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
            ;
        }
        ;
        if (event.itemStack?.typeId === "andexdb:editor_stick_b") {
            event.cancel = true;
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStickB(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
            ;
        }
        ;
        if (event.itemStack?.typeId === "andexdb:editor_stick_c") {
            event.cancel = true;
            try {
                editorStickMenuOpeningAsyncCancelActionNumbers[event.player.id] = srun(() => editorStickC(event.player));
            }
            catch (e) {
                console.error(e, e.stack);
            }
            ;
        }
        ;
        if (["andexdb:pick_block_stick", "andexdb:liquid_clipped_pick_block_stick"].includes(event.itemStack?.typeId)) {
            event.cancel = true;
            try {
                srun(() => event.player.inventory.container.addItem(event.block.getItemStack() ?? tryget(() => new ItemStack(event.block.typeId))));
                return;
            }
            catch (e) {
                console.error(e, e.stack);
            }
            ;
        }
        ;
        if (["andexdb:data_pick_block_stick", "andexdb:liquid_clipped_data_pick_block_stick"].includes(event.itemStack?.typeId)) {
            event.cancel = true;
            try {
                srun(() => event.player.inventory.container.addItem(event.block.getItemStack(undefined, true) ?? tryget(() => new ItemStack(event.block.typeId))));
                return;
            }
            catch (e) {
                console.error(e, e.stack);
            }
            ;
        }
        ;
    }
});
subscribedEvents.beforeItemUseOn = world.beforeEvents.itemUseOn.subscribe(event => {
    if (event.source.hasTag("debugStickDyingMode") && event.block.typeId == "minecraft:cauldron") {
        event.cancel = false;
        return;
    }
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        // console.log(2);
        return;
    }
    if (!!event?.itemStack?.getDynamicProperty("itemUseOnCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("itemUseOnCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseOnCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseOnBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true; /*
    debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)*/
    }
    ; /*
    if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true
        try {
            const mode = Boolean(event.source.getDynamicProperty("posM")??false)
            const posV = mcMath.Vector3Utils.floor(event.block.location)
            event.source.setDynamicProperty(mode?"pos2":"pos1", posV)
            event.source.setDynamicProperty("posD", event.source.dimension.id)
            event.source.sendMessage(`Set ${mode?"pos2":"pos1"} to ${vTStr(posV)}.`)
            event.source.setDynamicProperty("posM", !mode)
        }catch(e){console.error(e, e.stack)}
    };*/
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerItemUseOnEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.itemUseOn]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Player: " + event.source.name); });
    if ((event.source.getDynamicProperty("canBypassProtectedAreas") != true && event.source.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockInteractAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockInteractAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == false)) || (((testIsWithinRanges(noInteractAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noInteractAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.block.dimension)), event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.block.dimension.id)]]));
        if (borderSettings.enabled && borderSettings.preventWorldInteractionOutsideBorder) {
            if ((!event.source.hasTag("canBypassWorldBorderInteractionLimits")) && (event.block.x >= borderSettings.to.x || event.block.z >= borderSettings.to.z || event.block.x < borderSettings.from.x || event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
            ;
        }
        ;
    }
    ;
    if (event.isFirstEvent) {
        if (["andexdb:editor_stick", "andexdb:editor_stick_b", "andexdb:editor_stick_c", "andexdb:pick_block_stick", "andexdb:liquid_clipped_pick_block_stick", "andexdb:data_pick_block_stick", "andexdb:liquid_clipped_data_pick_block_stick"].includes(event.itemStack?.typeId)) {
            event.cancel = true;
        }
        ;
    }
    ;
});
subscribedEvents.beforePlayerBreakBlock = world.beforeEvents.playerBreakBlock.subscribe(event => {
    if (!!event?.itemStack?.getDynamicProperty("playerBreakBlockCode")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("playerBreakBlockCode")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemPlayerBreakBlockCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerBreakBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerBreakBlockBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true;
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerBlockBreakingEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.playerBreakBlock]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Player: " + event.player.name); });
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockBreakAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockBreakAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.dimension.id)]]));
        if (borderSettings.enabled && borderSettings.preventWorldInteractionOutsideBorder) {
            if ((!event.player.hasTag("canBypassWorldBorderInteractionLimits")) && (event.block.x >= borderSettings.to.x || event.block.z >= borderSettings.to.z || event.block.x < borderSettings.from.x || event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
        }
    }
});
subscribedEvents.beforePlayerPlaceBlock = world.beforeEvents.playerPlaceBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerPlaceBlockBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + " " + e.stack);
        } });
    } /*
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick"){
    event.cancel = true
    }; */
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerBlockPlacingEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.playerPlaceBlock]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Player: " + event.player.name); });
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockPlaceAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockPlaceAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative.filter(v => v.dimension == dimensions.indexOf(event.dimension)), event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
    else {
        const borderSettings = Object.fromEntries(Object.entries(config.worldBorder[dimensionse[dimensionsd.indexOf(event.dimension.id)]]));
        if (borderSettings.enabled && borderSettings.preventWorldInteractionOutsideBorder) {
            if ((!event.player.hasTag("canBypassWorldBorderInteractionLimits")) && (event.block.x >= borderSettings.to.x || event.block.z >= borderSettings.to.z || event.block.x < borderSettings.from.x || event.block.z < borderSettings.from.z)) {
                event.cancel = true;
            }
        }
    }
});
/*${scripteval}world.getAllPlayers().filter((p)=>(p.getDynamicProperty("canBypassProtectedAreas") == undefined)).forEach((p)=>{p.setDynamicProperty("canBypassProtectedAreas", false)})*/
/*${scripteval}world.getAllPlayers().find((p)=>(p.name == "Andexter8")).setDynamicProperty("canBypassProtectedAreas", true)*/
subscribedEvents.afterEntityHitBlock = world.afterEvents.entityHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (event.damagingEntity.getComponent("minecraft:inventory").container.getItem(event.damagingEntity.selectedSlotIndex)?.typeId === "andexdb:debug_stick") {
        debugAction(event.hitBlock, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
    }
    ;
    if (event.damagingEntity.getComponent("minecraft:inventory").container.getItem(event.damagingEntity.selectedSlotIndex)?.typeId === "andexdb:liquid_clipped_debug_stick") {
        debugAction(event.damagingEntity.getBlockFromViewDirection({ includeLiquidBlocks: true }).block, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getEntityHitBlockEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.entityHitBlock]Location: " + event.hitBlock.location + ", Dimension: " + event.hitBlock.dimension + ", Block Type: " + (event.hitBlock?.typeId ?? "") + ", Player: " + event.damagingEntity.name); });
});
repeatingIntervals.debugSticksCooldownCounter = system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (interactable_block.find((playerId) => (playerId.id == player.id)) == undefined) {
            interactable_block.push({ id: player.id, delay: 0, holdDuration: 0 });
        }
        else {
            interactable_block.find((playerId) => (playerId.id == player.id)).delay = Math.max(0, interactable_block.find((playerId) => (playerId.id == player.id)).delay - 1);
            interactable_block.find((playerId) => (playerId.id == player.id)).holdDuration = Math.max(0, interactable_block.find((playerId) => (playerId.id == player.id)).holdDuration - 1);
        }
        ; /*if (player.isSneaking && ((interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == 0) || (interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == undefined)) && ((player.getComponent("minecraft:inventory") as EntityInventoryComponent).container.getItem(player.selectedSlotIndex).typeId === "andexdb:debug_stick")){
            player.onScreenDisplay.setActionBar(`§l§eTags: §r§a${player.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(player.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)}; */
    });
}, 1);
repeatingIntervals.everyTickAutoEval = system.runInterval(() => { try {
    eval(String(world.getDynamicProperty("autoEval:everyTick")));
}
catch { } ; }, 1); //fixed and this one is also nows new
subscribedEvents.beforeItemUse = world.beforeEvents.itemUse.subscribe(event => {
    if (!!event?.itemStack?.getDynamicProperty("code")) {
        try {
            eval(String(event?.itemStack?.getDynamicProperty("code")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemCodeDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            } });
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerItemUseEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.itemUse]Location: [ " + event.source.location.x + ", " + event.source.location.y + ", " + event.source.location.z + " ], Dimension: " + event.source.dimension.id + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Player: " + event.source.name); }); /*
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick"){*/ /*
    if (interactable_block == true){interactable_block = false}else{*/ /*
        interactable_block.find((playerId)=>(playerId.id == event.source.id)).delay = 0; */ /*
if (event.source.isSneaking){system.run(()=>{
    event.cancel = false;
    (event.source as Player).onScreenDisplay.setActionBar(`§l§eTags: §r§a${event.source.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(event.source.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)})}; */ /*
debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)
}; */ /*
    }; */
    if (event.itemStack?.typeId === "andexdb:inventory_controller") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ; /*
            system.run(() => {
            let form2 = new ModalFormData();
            let players = world.getAllPlayers();
            let targetList = [players[0].nameTag]
            for (const index in players) {
                if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
                }
            }
            form2.textField("Slot Number", "Slot Number", "0");
            form2.dropdown("Player Target", String(targetList).split(","), 0)
            form2.dropdown("Player Viewer", String(targetList).split(","), 0)
            form2.show(event.source as Player).then(t => {
                if (t.canceled)
                    return;
                    let [slotNumber, playerTarget, playerViewer] = t.formValues;
                    let playerTargetB = Number(playerTarget)
                    let playerViewerB = Number(playerViewer)
            const inventory = players[playerTargetB].getComponent("inventory") as EntityInventoryComponent;
            let item = inventory.container.getItem(Number(slotNumber));
            function getDurability() { try {return item.getComponent("minecraft:durability") as ItemDurabilityComponent;} catch(e){console.error(e, e.stack); return undefined};}
            const durability = getDurability()
            let itemNameTextField = itemNameTextCalculator();
            function itemNameTextCalculator(){
            if (item.nameTag == undefined) {
                return undefined;
            } else {
            if (item.nameTag != undefined) {
                return item.nameTag;
            }}}
            let form = new ModalFormData();
            console.warn(item.nameTag);
            console.warn(Array(item.getLore().toString()).join(""));
            form.title("Item Modifier / Lore");
            form.textField("Item Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField*/ /*(String(item.nameTag))*/ /*);
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", (Array(item.getLore().toString()).join("")));
        form.textField("Can Destroy", "Can Destroy", ""*/ /*(String(item.getCanDestroy()))*/ /*);
        form.textField("Can Place On", "Can Place On", ""*/ /*(String(item.getCanPlaceOn()))*/ /*);
        form.textField("Trigger Event", "Trigger Event", "");
        form.slider("Count", 0, 255, 1, item.amount);
        form.toggle("keepOnDeath", (item.keepOnDeath));
        function getItemLockMode(mode?: Number, input?: Number) {if (mode == 1) {
        if(item.lockMode == "inventory") {
            return 0
        } else{
            if(item.lockMode == "none") {return 1} else{
                if(item.lockMode == "slot") {return 2}}}}
                else {if (mode == 0) {if(input == 0) {
                    return ItemLockMode.inventory
                } else{
                    if(input == 1) {return ItemLockMode.none} else{
                        if(input == 2) {return ItemLockMode.slot}}}}}}
        let itemLockModeIndex = Number(getItemLockMode(1))
        form.dropdown("lockMode", [ "inventory", "none", "slot" ], (itemLockModeIndex));
        form.toggle("setLore", false);
        form.toggle("clearLore", false);
        form.toggle("Debug", false);

        form.show(players[playerViewerB]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return;
        
            // This will assign every input their own variable
            let [ itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, debug ] = r.formValues;*/ /*
        console.warn(r.formValues);*/ /*
    
        let item = inventory.container.getItem(Number(slotNumber));
        let newItemNameTag = String(itemName).split("\\\\newline")
        try {item.nameTag = newItemNameTag.join("\n");} catch(e){console.error(e, e.stack);}
        if (Boolean(setLore) == true) {
            try {item.setLore(String(itemLore).split("\\\\newline"));} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearLore) == true) {
            try {item.setLore();} catch(e){console.error(e, e.stack);}
        }
        item.lockMode = String(getItemLockMode(0, Number(lockMode))) as ItemLockMode;
        item.keepOnDeath = Boolean(keepOnDeath);
        item.amount = Number(amount);
        try {item.setCanDestroy(String(canDestroy).split(", "))} catch(e){console.error(e, e.stack);};*/ /*String[String(canDestroy)]*/ /*;
        try {item.setCanPlaceOn(String(canPlaceOn).split(", "))} catch(e){console.error(e, e.stack);};
        item.triggerEvent(String(triggerEvent));
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        inventory.container.setItem(Number(slotNumber), item);
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        if (Boolean(debug) == true) {
            console.warn("Form Values", r.formValues);
            console.warn(["Item Components: ", item.getComponents()]);
            console.warn(item.getTags());
            console.warn(players);
            console.warn(players[0]);
            console.warn(players[1]);*/ /*
        try {console.warn(item.getCanDestroy());} catch(e){
            console.error(e, e.stack)};
        try {console.warn(item.getCanPlaceOn());} catch(e){
            console.error(e, e.stack)};*/ /*
    console.warn(item.isStackable);
    console.warn(item.maxAmount);
    console.warn(item.type);
    console.warn(item.typeId);
    console.warn(item.nameTag);
    console.warn(item.getLore());
    try {console.warn(["Damage: ", durability.damage]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Chance: ", durability.getDamageChance()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Range: ", durability.getDamageRange()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Max Durability: ", durability.maxDurability]);} catch(e){console.error(e, e.stack)};
    let componentList = [item.getComponents()[0].typeId]
    for (const index in players) {
        if (Number(index) != 0) {
        componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
        }
    }
    console.warn(String(["Item Components: " + String(componentList)]));
}

// Do something
}).catch(e => {
console.error(e, e.stack);
});
}).catch(e => {
console.error(e, e.stack);
});
})*/
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:debug_stick" && event.itemStack.nameTag === "§r§dItem Modifier") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ; /*
            system.run(() => {
            let form2 = new ModalFormData();
            let players = world.getAllPlayers();
            let targetList = [players[0].nameTag]
            for (const index in players) {
                if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
                }
            }
            form2.textField("Slot Number", "Slot Number", "0");
            form2.dropdown("Player Target", String(targetList).split(","), 0)
            form2.dropdown("Player Viewer", String(targetList).split(","), 0)
            form2.show(event.source as Player).then(t => {
                if (t.canceled)
                    return;
                    let [slotNumber, playerTarget, playerViewer] = t.formValues;
                    let playerTargetB = Number(playerTarget)
                    let playerViewerB = Number(playerViewer)
            const inventory = players[playerTargetB].getComponent("inventory") as EntityInventoryComponent;
            let item = inventory.container.getItem(Number(slotNumber));
            function getDurability() { try {return item.getComponent("minecraft:durability") as ItemDurabilityComponent;} catch(e){console.error(e, e.stack); return undefined};}
            const durability = getDurability()
            let itemNameTextField = itemNameTextCalculator();
            function itemNameTextCalculator(){
            if (item.nameTag == undefined) {
                return undefined;
            } else {
            if (item.nameTag != undefined) {
                return item.nameTag;
            }}}
            let form = new ModalFormData();
            console.warn(item.nameTag);
            console.warn(Array(item.getLore().toString()).join(""));
            form.title("Item Modifier / Lore");
            form.textField("Item Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField*/ /*(String(item.nameTag))*/ /*);
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", (Array(item.getLore().toString()).join("")));
        form.textField("Can Destroy", "Can Destroy", ""*/ /*(String(item.getCanDestroy()))*/ /*);
        form.textField("Can Place On", "Can Place On", ""*/ /*(String(item.getCanPlaceOn()))*/ /*);
        form.textField("Trigger Event", "Trigger Event", "");
        form.slider("Count", 0, 255, 1, item.amount);
        form.toggle("keepOnDeath", (item.keepOnDeath));
        function getItemLockMode(mode?: Number, input?: Number) {if (mode == 1) {
        if(item.lockMode == "inventory") {
            return 0
        } else{
            if(item.lockMode == "none") {return 1} else{
                if(item.lockMode == "slot") {return 2}}}}
                else {if (mode == 0) {if(input == 0) {
                    return ItemLockMode.inventory
                } else{
                    if(input == 1) {return ItemLockMode.none} else{
                        if(input == 2) {return ItemLockMode.slot}}}}}}
        let itemLockModeIndex = Number(getItemLockMode(1))
        form.dropdown("lockMode", [ "inventory", "none", "slot" ], (itemLockModeIndex));
        form.toggle("setLore", false);
        form.toggle("clearLore", false);
        form.toggle("Debug", false);

        form.show(players[playerViewerB]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return;
        
            // This will assign every input their own variable
            let [ itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, debug ] = r.formValues;*/ /*
        console.warn(r.formValues);*/ /*
    
        let item = inventory.container.getItem(Number(slotNumber));
        let newItemNameTag = String(itemName).split("\\\\newline")
        try {item.nameTag = newItemNameTag.join("\n");} catch(e){console.error(e, e.stack);}
        if (Boolean(setLore) == true) {
            try {item.setLore(String(itemLore).split("\\\\newline"));} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearLore) == true) {
            try {item.setLore();} catch(e){console.error(e, e.stack);}
        }
        item.lockMode = String(getItemLockMode(0, Number(lockMode))) as ItemLockMode;
        item.keepOnDeath = Boolean(keepOnDeath);
        item.amount = Number(amount);
        try {item.setCanDestroy(String(canDestroy).split(", "))} catch(e){console.error(e, e.stack);};*/ /*String[String(canDestroy)]*/ /*;
        try {item.setCanPlaceOn(String(canPlaceOn).split(", "))} catch(e){console.error(e, e.stack);};
        item.triggerEvent(String(triggerEvent));
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        inventory.container.setItem(Number(slotNumber), item);
        try{ durability.damage = Number(10); } catch(e){console.error(e, e.stack)}
        if (Boolean(debug) == true) {
            console.warn("Form Values", r.formValues);
            console.warn(["Item Components: ", item.getComponents()]);
            console.warn(item.getTags());
            console.warn(players);
            console.warn(players[0]);
            console.warn(players[1]);*/ /*
        try {console.warn(item.getCanDestroy());} catch(e){
            console.error(e, e.stack)};
        try {console.warn(item.getCanPlaceOn());} catch(e){
            console.error(e, e.stack)};*/ /*
    console.warn(item.isStackable);
    console.warn(item.maxAmount);
    console.warn(item.type);
    console.warn(item.typeId);
    console.warn(item.nameTag);
    console.warn(item.getLore());
    try {console.warn(["Damage: ", durability.damage]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Chance: ", durability.getDamageChance()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Damage Range: ", durability.getDamageRange()]);} catch(e){console.error(e, e.stack)};
    try {console.warn(["Max Durability: ", durability.maxDurability]);} catch(e){console.error(e, e.stack)};
    let componentList = [item.getComponents()[0].typeId]
    for (const index in players) {
        if (Number(index) != 0) {
        componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
        }
    }
    console.warn(String(["Item Components: " + String(componentList)]));
}

// Do something
}).catch(e => {
console.error(e, e.stack);
});
}).catch(e => {
console.error(e, e.stack);
});
})*/
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:command_runner") {
        event.cancel = true;
        system.run(() => {
            let form = new ModalFormData();
            form.title("Command Runner / Terminal");
            form.textField("Run Command", "Run Command");
            form.textField("Run Delay", "Run Delay");
            form.toggle("Debug", false);
            form.show(event.source).then(r => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [commandId, commandDelay, debug] = r.formValues; /*
                console.warn(r.formValues);*/
                system.runTimeout(() => {
                    console.warn((event.source).runCommand(String(commandId)).successCount);
                }, Number(commandDelay));
                // Do something
            }).catch(e => {
                console.error(e, e.stack);
            });
        });
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:editor_stick") {
        event.cancel = true;
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStick(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
    }
    ;
    if (event.itemStack?.typeId === "andexdb:editor_stick_b") {
        event.cancel = true;
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStickB(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
    }
    ;
    if (event.itemStack?.typeId === "andexdb:editor_stick_c") {
        event.cancel = true;
        try {
            system.clearRun(editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id]);
            editorStickMenuOpeningAsyncCancelActionNumbers[event.source.id] = srun(() => editorStickC(event.source));
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
    }
    ;
    if (event.itemStack?.typeId === "andexdb:player_debug_stick") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:playerDebug saqw"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:player_controller") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:playerController asdw"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:debug_screen") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:debugScreen sdaq"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    ;
    if (event.itemStack?.typeId === "andexdb:entity_controller") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:entityController nsaz"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:entity_debug_stick") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:entityDebug saop"));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:main_menu") {
        event.cancel = true;
        try {
            srun(() => mainMenu(event.source));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (event.itemStack?.typeId === "andexdb:selection_menu") {
        event.cancel = true;
        try {
            srun(() => mainMenu(event.source));
        }
        // Do something
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        // ...
        // Output: [ <TextField Input>, <Dropdown Input>, <Slider Input>, <Toggle Input> ]
    }
    ;
    if (!!event.itemStack.getDynamicProperty("brushtype")) {
        try {
            //console.warn("b")
            switch (String(event.itemStack.getDynamicProperty("brushtype")).toLowerCase()) {
                case "sphere":
                    {
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHSGB(pos, radius, event.source.dimension, (l, i) => { const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "cube":
                    {
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB({ x: pos.x - radius, y: pos.y - radius, z: pos.z - radius }, { x: pos.x + radius, y: pos.y + radius, z: pos.z + radius }, event.source.dimension, (l, i) => { const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "square":
                    {
                        const loca = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") });
                        const locb = dirmap(loca.face);
                        const loc = loca?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => { const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splatter":
                    {
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHSGB(pos, radius, event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Vector.distance(pos, l) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true)) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splattercube":
                    {
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB({ x: pos.x - radius, y: pos.y - radius, z: pos.z - radius }, { x: pos.x + radius, y: pos.y + radius, z: pos.z + radius }, event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Vector.distance(pos, l) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true)) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splattersquare":
                    {
                        const loca = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") });
                        const locb = dirmap(loca.face);
                        const loc = loca?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Vector.distance(pos, l) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true)) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splattersurface":
                    {
                        const loca = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") });
                        const locb = dirmap(loca.face);
                        const loc = loca?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHSGB(pos, radius, event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Vector.distance(pos, l) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true) || (!(tryget(() => l.dimension.getBlock(l)[locb]().isAir) ?? true))) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splattercubesurface":
                    {
                        const loca = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") });
                        const locb = dirmap(loca.face);
                        const loc = loca?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            //const cornerradius = Vector.distance(pos, {x: pos.x-radius, y: pos.y-radius, z: pos.z-radius})
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB({ x: pos.x - radius, y: pos.y - radius, z: pos.z - radius }, { x: pos.x + radius, y: pos.y + radius, z: pos.z + radius }, event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Math.min(radius, Vector.distance(pos, l)) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true) || (!(tryget(() => l.dimension.getBlock(l)[locb]().isAir) ?? true))) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "splattersquaresurface":
                    {
                        const loca = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") });
                        const locb = dirmap(loca.face);
                        const loc = loca?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 3)) ? 3 : Number(event.itemStack.getDynamicProperty("radius") ?? 3);
                        const decay = isNaN(Number(event.itemStack.getDynamicProperty("decay") ?? 0)) ? 0 : Number(event.itemStack.getDynamicProperty("decay") ?? 0);
                        const blockpattern = new BlockPattern(JSON.parse(String(event.itemStack.getDynamicProperty("pattern"))), String(event.itemStack.getDynamicProperty("patterntype") ?? "random"));
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else if (!!!event.itemStack.getDynamicProperty("pattern")) {
                            event.source.sendMessage("§cError: Pattern for sphere generation is not defined on the item's dynamic properties.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            //const cornerradius = Vector.distance(pos, {x: pos.x-radius, y: pos.y-radius, z: pos.z-radius})
                            const blocktypes = BlockTypes.getAll();
                            //console.warn("a")
                            try {
                                fillBlocksHFGB(Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), -radius)), Vector.add(pos, Vector.scale(diroffsetothersmap(loca.face), radius)), event.source.dimension, (l, i) => { if (((Math.max(0.0001, Math.random())) < ((Math.min(radius, Vector.distance(pos, l)) / radius) * (decay / 10))) || (tryget(() => l.dimension.getBlock(l).isAir) ?? true) || (!(tryget(() => l.dimension.getBlock(l)[locb]().isAir) ?? true))) {
                                    return null;
                                } ; const b = blockpattern.generateBlock(i); return b.type == "null" ? null : b.type == "random" ? BlockPermutation.resolve(blocktypes[Math.floor(blocktypes.length * Math.random())].id) : BlockPermutation.resolve(b.type, b.states); }, { minMSBetweenYields: 2500 }, true, 100);
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "extinguish":
                    {
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10)) ? 10 : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            let froma = mcMath.Vector3Utils.subtract(pos, { x: radius, y: radius, z: radius });
                            let from = { x: froma.x, y: froma.y, z: froma.z };
                            let toa = mcMath.Vector3Utils.add(pos, { x: radius, y: radius, z: radius });
                            let to = { x: toa.x, y: toa.y, z: toa.z };
                            try {
                                system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "fire" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "soul_fire" }); });
                            }
                            catch (e) {
                                event.source.sendMessage("§c" + e + e.stack);
                            }
                        }
                    }
                    break;
                case "remexp":
                    {
                        //console.warn("d")
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10)) ? 10 : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            let froma = mcMath.Vector3Utils.subtract(pos, { x: radius, y: radius, z: radius });
                            let from = { x: froma.x, y: froma.y, z: froma.z };
                            let toa = mcMath.Vector3Utils.add(pos, { x: radius, y: radius, z: radius });
                            let to = { x: toa.x, y: toa.y, z: toa.z };
                            switch (event.source.dimension.id) {
                                case "minecraft:overworld":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "respawn_anchor" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                case "minecraft:nether":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                case "minecraft:the_end":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "respawn_anchor" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                default:
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                            }
                            srun(() => [
                                ...event.source.dimension.getEntities({ location: pos, type: "minecraft:tnt", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "minecraft:tnt_minecart", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "projectile:tnt", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "andexsa:fire_tnt_arrow", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "andexsa:normal_fire_tnt_arrow", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "andexsa:normal_tnt_arrow", maxDistance: radius }),
                                ...event.source.dimension.getEntities({ location: pos, type: "andexsa:tnt_arrow", maxDistance: radius })
                            ].forEach(v => v.remove()));
                        }
                    }
                    break;
                case "remexpne":
                    {
                        //console.warn("d")
                        const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
                        const radius = isNaN(Number(event.itemStack.getDynamicProperty("radius") ?? 10)) ? 10 : Number(event.itemStack.getDynamicProperty("radius") ?? 10);
                        if (!!!loc) {
                            event.source.sendMessage("§cError: You must be facing a block.");
                        }
                        else {
                            const pos = coords.roundVector3ToMiddleOfBlock(loc);
                            let froma = mcMath.Vector3Utils.subtract(pos, { x: radius, y: radius, z: radius });
                            let from = { x: froma.x, y: froma.y, z: froma.z };
                            let toa = mcMath.Vector3Utils.add(pos, { x: radius, y: radius, z: radius });
                            let to = { x: toa.x, y: toa.y, z: toa.z };
                            switch (event.source.dimension.id) {
                                case "minecraft:overworld":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "respawn_anchor" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                case "minecraft:nether":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                case "minecraft:the_end":
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "respawn_anchor" }); fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "bed" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                                    break;
                                default:
                                    try {
                                        system.run(() => { fillBlocksHB(from, to, event.source.dimension, "air", undefined, { matchingBlock: "tnt" }); });
                                    }
                                    catch (e) {
                                        event.source.sendMessage("§c" + e + e.stack);
                                    }
                            }
                        }
                    }
                    break;
                default:
                    //console.warn("c")
                    break;
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    else if (event.itemStack?.typeId === "andexdb:selection_tool") {
        event.cancel = true;
        try {
            const mode = Boolean(event.source.getDynamicProperty("posM") ?? false);
            const loc = event.source.getBlockFromViewDirection({ includeLiquidBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("noliquid"), includePassableBlocks: !String(event.itemStack.getDynamicProperty("selectmode")).includes("nopassable") })?.block?.location;
            if (!!!loc) {
                event.source.sendMessage("§cError: You must be facing a block.");
            }
            else {
                const posV = mcMath.Vector3Utils.floor(loc);
                event.source.setDynamicProperty(mode ? "pos2" : "pos1", posV);
                event.source.setDynamicProperty("posD", event.source.dimension.id);
                event.source.sendMessage(`Set ${mode ? "pos2" : "pos1"} to ${vTStr(posV)}.`);
                event.source.setDynamicProperty("posM", !mode);
                srun(() => {
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2" : "andexdb:xz_axis_particle_pos1", Vector.add(loc, { x: 0.5, y: 1.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_north" : "andexdb:xz_axis_particle_pos1_north", Vector.add(loc, { x: 0.5, y: 0.5, z: 1.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_east" : "andexdb:xz_axis_particle_pos1_east", Vector.add(loc, { x: -0.005, y: 0.5, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_down" : "andexdb:xz_axis_particle_pos1_down", Vector.add(loc, { x: 0.5, y: -0.005, z: 0.5 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_south" : "andexdb:xz_axis_particle_pos1_south", Vector.add(loc, { x: 0.5, y: 0.5, z: -0.005 }));
                    event.source.spawnParticle(mode ? "andexdb:xz_axis_particle_pos2_west" : "andexdb:xz_axis_particle_pos1_west", Vector.add(loc, { x: 1.005, y: 0.5, z: 0.5 }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    ;
});
subscribedEvents.beforeChatSend = world.beforeEvents.chatSend.subscribe((eventData) => {
    try {
        getPlayersWithAnyOfTags(["getBeforeChatSendNotifications", "includeBeforeChatSendNotificationsBy:" + eventData.sender.name, "includeBeforeChatSendNotificationsById:" + eventData.sender.name]).filter(p => !p.hasTag("excludeBeforeChatSendNotificationsById:" + eventData.sender.id) && !p.hasTag("excludeBeforeChatSendNotificationsBy:" + eventData.sender.name)).forEach(p => { psend(p, `§r§f[§l§dServer§r§f]${(world.getDynamicProperty("serverNotificationSpacer") ?? "")}[§ebeforeChatSend§r][${eventData.sender.name}] Chat message sent${!!eventData.targets ? " with targets " + eventData.targets.map(p => p.name).join() : ""} with the message ${JSONStringify(eventData.message)}. `); let pn = new PlayerNotifications(p); srun(() => p.playSound(pn.getBeforeChatSendNotificationsNotificationSound.soundId, { pitch: pn.getBeforeChatSendNotificationsNotificationSound.pitch, volume: pn.getBeforeChatSendNotificationsNotificationSound.volume })); });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    chatMessage(eventData);
});
try {
    repeatingIntervals.rankNameTags_editorStickActionbar_artificialLagMS = system.runInterval(() => {
        try {
            let playerList2 = world.getPlayers();
            try {
                for (let index in playerList2) {
                    try {
                        if (playerList2[index].hasTag("showBlockActionBarDebugInfo") || (playerList2[index].isSneaking && playerList2[index].heldItem?.typeId == "andexdb:editor_stick")) {
                            let block = playerList2[index].getBlockFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true }).block;
                            let blockStates = Object.entries(block.permutation.getAllStates());
                            let blockStatesB;
                            blockStatesB = ["none"];
                            blockStates.forEach((s, i) => { try {
                                blockStatesB[i] = `${s[0]}: §c${s[1]}`;
                            }
                            catch { } });
                            const newActionBarText = `§b${block.typeId}
§l§eTags: §r§a${block.getTags().join(", ")}
§l§eBlock States: §r§a${blockStatesB.join("\n§a")}
§l§eIs Waterlogged: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isWaterlogged)}
§l§eIs Air: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isAir)}
§l§eIs Liquid: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isLiquid)}
§l§eIs Solid: §r${((b) => (b ? "§2" : "§4") + String(b))(block.isSolid)}
§l§eRedstone Power: §r§c${block.getRedstonePower()}${!!block.getComponent("inventory") ? `
§l§eminecraft:inventory: §r§9{§eSlots Filled: §r§c${block.getComponent("inventory").container.size - block.getComponent("inventory").container.emptySlotsCount}§b/§c${block.getComponent("inventory").container.size}§9}` : ""}${!!block.getComponent("piston") ? `
§l§eminecraft:piston: §r§9{§eIs Moving: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("piston").isMoving)}§a, §eState: §r§u${block.getComponent("piston").state}§a, §eAttatched Block Count: §r§c${block.getComponent("piston").getAttachedBlocks().length}§9}` : ""}${!!block.getComponent("record_player") ? `
§l§eminecraft:recordPlayer: §r§9{§eIs Playing: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("record_player").isPlaying())}§9}` : ""}${!!block.getComponent("sign") ? `
§l§eminecraft:sign: §r§9{§eIs Waxed: §r${((b) => (b ? "§2" : "§4") + String(b))(block.getComponent("sign").isWaxed)}§a, §eF Dye: §r§u${block.getComponent("sign").getTextDyeColor(SignSide.Front) ?? "null"}§a, §eB Dye: §r§u${block.getComponent("sign").getTextDyeColor(SignSide.Back) ?? "null"}§a, §eF Text Length: §r§c${block.getComponent("sign").getText(SignSide.Front).length}§a, §eB Text Length: §r§c${block.getComponent("sign").getText(SignSide.Back).length}§a, §eF Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block.getComponent("sign").getRawText(SignSide.Front)))}§a, §eB Is Raw Text: §r${((b) => (b ? "§2" : "§4") + String(b))(!!tryget(() => block.getComponent("sign").getRawText(SignSide.Back)))}§9}` : ""}${!!block.getComponent("fluidContainer") ? `
§l§eminecraft:fluidContainer: §r§9{§eFill Level: §r§c${block.getComponent("fluidContainer").fillLevel}§a, §eFluid Type: §r§c§a${block.getComponent("fluidContainer").getFluidType()}, §eCustom Color: §r§c${JSON.stringify(block.getComponent("fluidContainer").fluidColor)}§9}` : ""}`;
                            playerList2[index].onScreenDisplay.setActionBar(newActionBarText + "\n".repeat(Math.max(0, newActionBarText.split("\n").length - 12)));
                        }
                        ;
                    }
                    catch (e) { }
                    if (config.chatRanks.showRanksOnPlayerNameTags) {
                        if (!playerList2[index].hasTag("doNotSetNameTag")) {
                            let nameFormatting = "";
                            let nameGradientMode = undefined;
                            let showDimension = false;
                            let showHealth = false;
                            if (playerList2[index].hasTag('nameFormatting:r')) {
                                nameFormatting += "§r";
                            }
                            ;
                            if (playerList2[index].hasTag('nameFormatting:o')) {
                                nameFormatting += "§o";
                            }
                            ;
                            if (playerList2[index].hasTag('nameFormatting:l')) {
                                nameFormatting += "§l";
                            }
                            ;
                            if (playerList2[index].hasTag('nameFormatting:k')) {
                                nameFormatting += "§k";
                            }
                            ;
                            if (playerList2[index].hasTag('nameColor:0')) {
                                nameFormatting += "§0";
                            }
                            else {
                                if (playerList2[index].hasTag('nameColor:1')) {
                                    nameFormatting += "§1";
                                }
                                else {
                                    if (playerList2[index].hasTag('nameColor:2')) {
                                        nameFormatting += "§2";
                                    }
                                    else {
                                        if (playerList2[index].hasTag('nameColor:3')) {
                                            nameFormatting += "§3";
                                        }
                                        else {
                                            if (playerList2[index].hasTag('nameColor:4')) {
                                                nameFormatting += "§4";
                                            }
                                            else {
                                                if (playerList2[index].hasTag('nameColor:5')) {
                                                    nameFormatting += "§5";
                                                }
                                                else {
                                                    if (playerList2[index].hasTag('nameColor:6')) {
                                                        nameFormatting += "§6";
                                                    }
                                                    else {
                                                        if (playerList2[index].hasTag('nameColor:7')) {
                                                            nameFormatting += "§7";
                                                        }
                                                        else {
                                                            if (playerList2[index].hasTag('nameColor:8')) {
                                                                nameFormatting += "§8";
                                                            }
                                                            else {
                                                                if (playerList2[index].hasTag('nameColor:9')) {
                                                                    nameFormatting += "§9";
                                                                }
                                                                else {
                                                                    if (playerList2[index].hasTag('nameColor:a')) {
                                                                        nameFormatting += "§a";
                                                                    }
                                                                    else {
                                                                        if (playerList2[index].hasTag('nameColor:b')) {
                                                                            nameFormatting += "§b";
                                                                        }
                                                                        else {
                                                                            if (playerList2[index].hasTag('nameColor:c')) {
                                                                                nameFormatting += "§c";
                                                                            }
                                                                            else {
                                                                                if (playerList2[index].hasTag('nameColor:d')) {
                                                                                    nameFormatting += "§d";
                                                                                }
                                                                                else {
                                                                                    if (playerList2[index].hasTag('nameColor:e')) {
                                                                                        nameFormatting += "§e";
                                                                                    }
                                                                                    else {
                                                                                        if (playerList2[index].hasTag('nameColor:f')) {
                                                                                            nameFormatting += "§f";
                                                                                        }
                                                                                        else {
                                                                                            if (playerList2[index].hasTag('nameColor:g')) {
                                                                                                nameFormatting += "§g";
                                                                                            }
                                                                                            else {
                                                                                                if (playerList2[index].hasTag('nameColor:h')) {
                                                                                                    nameFormatting += "§h";
                                                                                                }
                                                                                                else {
                                                                                                    if (playerList2[index].hasTag('nameColor:i')) {
                                                                                                        nameFormatting += "§i";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (playerList2[index].hasTag('nameColor:j')) {
                                                                                                            nameFormatting += "§j";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (playerList2[index].hasTag('nameColor:m')) {
                                                                                                                nameFormatting += "§m";
                                                                                                            }
                                                                                                            else {
                                                                                                                if (playerList2[index].hasTag('nameColor:n')) {
                                                                                                                    nameFormatting += "§n";
                                                                                                                }
                                                                                                                else {
                                                                                                                    if (playerList2[index].hasTag('nameColor:p')) {
                                                                                                                        nameFormatting += "§p";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        if (playerList2[index].hasTag('nameColor:q')) {
                                                                                                                            nameFormatting += "§q";
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            if (playerList2[index].hasTag('nameColor:s')) {
                                                                                                                                nameFormatting += "§s";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                if (playerList2[index].hasTag('nameColor:t')) {
                                                                                                                                    nameFormatting += "§t";
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    if (playerList2[index].hasTag('nameColor:u')) {
                                                                                                                                        nameFormatting += "§u";
                                                                                                                                    }
                                                                                                                                    ;
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            playerList2[index].getTags().filter(v => v.startsWith("nameColor:")).forEach(v => {
                                if (patternColors.includes(v.slice(10).toLowerCase())) {
                                    nameFormatting += patternColorsMap[v.slice(10).toLowerCase()];
                                }
                                else if (Object.keys(patternFunctionList).includes(v.slice(10).toLowerCase())) {
                                    nameGradientMode = v.slice(10).toLowerCase();
                                }
                                else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'm', 'n', 'p', 'q', 's', 't', 'u'].includes(v.slice(13).toLowerCase())) {
                                    undefined;
                                }
                            });
                            playerList2[index].getTags().filter(v => v.startsWith("nameFormatting:")).forEach(v => {
                                if (['r', 'o', 'l', 'k'].includes(v.slice(15).toLowerCase())) {
                                    undefined;
                                }
                                else {
                                    nameFormatting += v.slice(15).toLowerCase();
                                }
                            });
                            if (playerList2[index].hasTag('config:health')) {
                                showHealth = true;
                            }
                            ;
                            if (playerList2[index].hasTag('config:dimension')) {
                                showDimension = true;
                            }
                            ;
                            let nameb = playerList2[index].hasTag("nameTagUseSudo") ?
                                (!!nameGradientMode ?
                                    evaluateChatColorType(playerList2[index].getTags().find(t => t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                                        .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length), nameGradientMode) :
                                    playerList2[index].getTags().find(t => t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                                        .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length)) :
                                !!playerList2[index].getTags().find(t => t.startsWith("nameTagSudo:")) ? (!!nameGradientMode ?
                                    evaluateChatColorType(tryget(() => playerList2[index].getTags().find(t => t.startsWith("nameTagSudo:")).slice(12)), nameGradientMode) :
                                    tryget(() => playerList2[index].getTags().find(t => t.startsWith("nameTagSudo:")).slice(12))) : (playerList2[index].hasTag("chatHideNameTag") ? "" :
                                    playerList2[index].hasTag("chatUseNameTag") ? (!!nameGradientMode ? evaluateChatColorType(playerList2[index].nameTag, nameGradientMode) : playerList2[index].nameTag) :
                                        (!!nameGradientMode ? evaluateChatColorType(playerList2[index].name, nameGradientMode) : playerList2[index].name));
                            let indexb = index;
                            let rank = playerList2[indexb].getTags().filter(t => t.startsWith(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
                                .map((t, index, array) => { let rank = t.slice(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length); let tags = playerList2[indexb].getTags(); return eval(`\`${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r§f]")}\``); }).join(String(playerList2[indexb].getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));
                            if (rank == "") {
                                let tags = playerList2[indexb].getTags();
                                rank = eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``);
                            }
                            let dimension = dimensionTypeDisplayFormattingE[playerList2[index].dimension.id];
                            playerList2[indexb].nameTag = (showDimension ? "[" + dimension + "§r§f] " : "") + rank + " " + nameb + (showHealth ? "§r§f[" + playerList2[indexb].getComponent("health").currentValue + "/" + playerList2[indexb].getComponent("health").effectiveMax + "] " : ""); /*(
                                playerList2[index].hasTag("nameTagUseSudo")?
                                playerList2[index].getTags().find(t=>t.startsWith(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                                .slice(String(playerList2[index].getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length):
                                tryget(()=>playerList2[index].getTags().find(t=>t.startsWith("nameTagSudo:")).slice(12))??playerList2[index].name
                            )*/
                        }
                    }
                    try {
                        if (playerList2[index].hasTag("isSneaking")) {
                            try {
                                playerList2[index].isSneaking = true;
                                if (playerList2[index].hasTag("scriptDebugger2")) {
                                    console.warn(playerList2[index].nameTag, playerList2[index].isSneaking);
                                }
                            }
                            catch (e) {
                                if (playerList2[index].hasTag("scriptDebugger")) {
                                    console.error(e, e.stack);
                                }
                            }
                        }
                    }
                    catch (e) {
                        if (playerList2[index].hasTag("scriptDebugger")) {
                            console.error(e, e.stack);
                        }
                    }
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (config.system.artificialLagMS != 0 && !isNaN(config.system.artificialLagMS)) {
            const endTime = Date.now() + config.system.artificialLagMS;
            while (Date.now() < endTime) { }
        }
    }, 2);
}
catch (e) {
    console.error(e, e.stack);
} /*

try{system.runInterval( () => {
try{noPistonExtensionAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noPistonExtensionAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);};
try{noExplosionAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noExplosionAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
try{noInteractAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noInteractAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
try{noBlockInteractAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockInteractAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
try{noBlockBreakAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockBreakAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
try{protectedAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("protectedAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
try{noBlockPlaceAreas = convertToCompoundBlockVolume(String(world.getDynamicProperty("noBlockPlaceAreas") ?? "0, 0, 0, 0, 0, 0"))} catch(e){console.error(e, e.stack);}
}, 1)} catch(e){console.error(e, e.stack);}*/
subscribedEvents.afterScriptEventReceive = system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, // returns string (wiki:test)
    initiator, // returns Entity
    message, // returns string (Hello World)
    sourceBlock, // returns Block
    sourceEntity, // returns Entity
    sourceType, // returns MessageSourceType
     } = event;
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:scriptEventRecieve")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("scriptEventRecieveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + e.stack);
        } });
    }
    if (id.startsWith("andexsa:")) {
        return;
    }
    if (id == "andexdb:entityScaleInitSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent andexsa:entityScaleInitSignalReceivedByDebugSticks ${format_version}`);
        if (entity_scale_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleEntityScaleVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    else if (id == "andexdb:entityScaleTestSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent andexsa:entityScaleTestSignalReceivedByDebugSticks ${format_version}`);
        if (entity_scale_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleEntityScaleVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    if (id == "andexdb:scriptevent") {
        const diamondAwesomeSword = new ItemStack("minecraft:diamond_sword", 1);
        let players = world.getAllPlayers();
        diamondAwesomeSword.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        // hover over/select the item in your inventory to see the lore.
        const inventory = players[0].getComponent("inventory");
        inventory.container.setItem(0, diamondAwesomeSword);
        let item = inventory.container.getItem(0);
        let enchants = item.getComponent("enchantable");
        let knockbackEnchant = { type: EnchantmentTypes.get("knockback"), level: 2 };
        enchants.addEnchantment(knockbackEnchant);
        inventory.container.setItem(0, item);
        const ironFireSword = new ItemStack("minecraft:iron_sword", 1); /*
        let players = world.getAllPlayers();*/
        let fireAspectEnchant = { type: "fire_aspect", level: 1 };
        let enchants2 = ironFireSword.getComponent("enchantable");
        let addedFire = enchants2.addEnchantment({ type: EnchantmentTypes.get("fire_aspect"), level: 0 });
        console.warn(ironFireSword);
        console.warn(ironFireSword.getComponent("enchantable"));
        console.warn(fireAspectEnchant);
        console.warn(enchants);
        console.warn(addedFire);
        if (!(Boolean(addedFire) ?? false)) {
            console.warn("Could not add fire aspect.");
            return -1;
        }
        const inventory2 = players[0].getComponent("inventory");
        let itemb = inventory.container.getItem(0);
        console.warn(String(Array((item.getComponent("enchantable")).getEnchantments[0])));
        console.warn((item.getComponent("enchantable")).isValid());
        console.warn((item.getComponent("enchantable")).getEnchantments()[0]);
        item.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        console.warn(item.getComponent("enchantable"));
        console.warn(item);
        inventory.container.setItem(0, item);
        let itema = inventory2.container.getItem(0);
        let enchants3 = itema.getComponent("enchantable");
        let knockbackEnchant2 = { type: EnchantmentTypes.get("knockback"), level: 1 };
        enchants3.addEnchantment(knockbackEnchant2); /*
        inventory2.container.setItem(0, itema);*/
    }
    ;
    if (id == "andexdb:chatMessage") {
        chatMessage({ cancel: false, message: message.replaceAll("\\@\\", "@"), sender: sourceEntity }, false);
    }
    if (id == "andexdb:chatMessageB") {
        chatMessage({ cancel: false, message: message.replaceAll("\\@\\", "@"), sender: sourceEntity }, true);
    }
    if (id == "andexdb:chatSend") {
        chatSend({ returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@"), sender: sourceEntity }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@"), sender: sourceEntity }, newMessage: message.replaceAll("\\@\\", "@"), player: sourceEntity });
    }
    if (id == "andexdb:chatCommands") {
        chatCommands({ returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: sourceEntity }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: sourceEntity }, newMessage: message.replaceAll("\\@\\", "@"), player: sourceEntity });
    }
    if (id == "andexdb:cmd") {
        chatCommands({ returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:silentCmd") {
        chatCommands({ silentCMD: true, returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:silentBuiltInCmd") {
        chatCommands({ silentCMD: true, isBultIn: true, isCustom: false, returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:builtInCmd") {
        chatCommands({ silentCMD: false, isBultIn: true, isCustom: false, returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:silentCustomCmd") {
        chatCommands({ silentCMD: true, isBultIn: false, isCustom: true, returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:customCmd") {
        chatCommands({ silentCMD: false, isBultIn: false, isCustom: true, returnBeforeChatSend: false, event: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, eventData: { cancel: false, message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"), sender: (initiator ?? sourceEntity ?? sourceBlock) }, newMessage: message.replaceAll("\\@\\", "@"), player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)) });
    }
    if (id == "andexdb:blockExplosion") {
        const overworld = world.getDimension(String(message.split("|")[0]));
        let explosionOptions = message.split("|");
        let posx = Number(explosionOptions[1]);
        let posy = Number(explosionOptions[2]);
        let posz = Number(explosionOptions[3]);
        let radius = Number(explosionOptions[4]);
        let allowUnderwater = explosionOptions[5];
        let breaksBlocks = explosionOptions[6];
        let causesFire = explosionOptions[7];
        let sources = targetSelectorAllListE(explosionOptions[8], "0, 0, 0");
        overworld.createExplosion({ x: posx, y: posy, z: posz }, radius, { allowUnderwater: Boolean(allowUnderwater?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")), breaksBlocks: Boolean(breaksBlocks?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")), causesFire: Boolean(causesFire?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")), source: sources[0] });
    }
    if (id == "andexdb:playerDebug") {
        let form2 = new ModalFormData();
        let players = world.getPlayers();
        let entityViewedEntityType;
        let entityViewedEntityName;
        let entityViewedEntityDistance;
        let blockViewedBlockType;
        let spawnPointAllCoordinates;
        entityViewedEntityType = "None";
        entityViewedEntityName = "None";
        entityViewedEntityDistance = "None";
        let player = players[0]; /*
        player.getComponent("minecraft:inventory").container.addItem(player.getBlockFromViewDirection({includePassableBlocks: true, includeLiquidBlocks: true}).block.getItemStack())*/
        blockViewedBlockType = "None";
        spawnPointAllCoordinates = "None";
        let targetList = [players[0].nameTag];
        let scoreboardIdentity = "§4None§a";
        let scoreboardIdentityDisplayName = "§4None§a";
        let scoreboardIdentityType = "§4None§a";
        for (const index in players) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            } /*
            console.warn(targetList);*/
        }
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
        }
        else {
            form2.title("Player Debug");
            form2.dropdown("Player Target", String(targetList).split(","), 0);
            form2.dropdown("Player Viewer", String(targetList).split(","), 0);
            form2.show(players[players.findIndex((x) => x == sourceEntity)]).then(t => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                let blockProperties;
                let componentList;
                let effectsList;
                blockProperties = "";
                componentList = [];
                try {
                    componentList = [players[playerTargetB].getComponents()[0].typeId];
                }
                catch (e) {
                    componentList = "§4None§a";
                }
                effectsList = [];
                try {
                    effectsList = [("§9{ §stypeId§a: §u" + players[playerTargetB].getEffects()[0].typeId + "§a, §sdisplayName§a: §u" + players[playerTargetB].getEffects()[0].displayName + "§a, §sduration§a: §c" + players[playerTargetB].getEffects()[0].duration + "§a, §samplifier§a: §c" + players[playerTargetB].getEffects()[0].amplifier + "§9 }§a")];
                }
                catch (e) {
                    effectsList = "§4None§a";
                }
                try {
                    blockProperties = [players[playerTargetB].getBlockFromViewDirection().block.permutation.getAllStates()[0]];
                }
                catch (e) {
                    blockProperties = "§4None§a";
                } /*
                let effectsList = [players[playerTargetB].getComponents[0]]*/
                let distance = mcMath.Vector3Utils.distance(players[playerViewerB].location, players[playerTargetB].location);
                try {
                    entityViewedEntityType = players[playerTargetB].getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityType = "§4None§a";
                }
                try {
                    entityViewedEntityName = players[playerTargetB].getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityName = "§4None§a";
                }
                try {
                    entityViewedEntityDistance = players[playerTargetB].getEntitiesFromViewDirection()[0].distance;
                }
                catch (e) {
                    entityViewedEntityDistance = "§4None§a";
                }
                try {
                    scoreboardIdentity = String(players[playerTargetB].scoreboardIdentity.id);
                }
                catch (e) {
                    scoreboardIdentity = "§4None§a";
                }
                try {
                    scoreboardIdentityDisplayName = players[playerTargetB].scoreboardIdentity.displayName;
                }
                catch (e) {
                    scoreboardIdentityDisplayName = "§4None§a";
                }
                try {
                    scoreboardIdentityType = players[playerTargetB].scoreboardIdentity.type;
                }
                catch (e) {
                    scoreboardIdentityType = "§4None§a";
                }
                try {
                    blockViewedBlockType = "§9{ §btypeId§a: §u" + players[playerTargetB].getBlockFromViewDirection().block.typeId + "§a, §bcanBeWaterlogged§a: §u" + players[playerTargetB].getBlockFromViewDirection().block.type.canBeWaterlogged + "§9 }§a";
                }
                catch (e) {
                    blockViewedBlockType = "§4None§a";
                }
                try {
                    spawnPointAllCoordinates = "§a, §bgetSpawnPoint§a: §9{ §sdimension§a: §u" + (players[playerTargetB]).getSpawnPoint().dimension + "§a, §sx§a: §c" + players[playerTargetB].getSpawnPoint().x + "§a, §sy§a: §c" + players[playerTargetB].getSpawnPoint().y + "§a, §sz§a: §c" + players[playerTargetB].getSpawnPoint().z + "§9 }§a";
                }
                catch (e) {
                    spawnPointAllCoordinates = "§4None§a";
                }
                for (const index in players[playerTargetB].getComponents()) { /*
                    console.warn(index);*/
                    if (Number(index) != 0) {
                        componentList = String([String(componentList), players[playerTargetB].getComponents()[index].typeId]).split(",");
                    } /*
                    console.warn(targetList);*/
                }
                for (const index in players[playerTargetB].getEffects()) { /*
                    console.warn(index);*/
                    if (Number(index) != 0) {
                        try {
                            effectsList = String([String(effectsList), ("§9{ §stypeId§a: §u" + players[playerTargetB].getEffects()[index].typeId + "§a, §sdisplayName§a: §u" + players[playerTargetB].getEffects()[index].displayName + ", §sduration§a: §c" + players[playerTargetB].getEffects()[index].duration + "§a, §samplifier§a: §c" + players[playerTargetB].getEffects()[index].amplifier + "§9 }§a")]).split(",");
                        }
                        catch (e) {
                            effectsList = ["§4None§a"];
                        }
                    } /*
                    console.warn(targetList);*/
                }
                players[playerViewerB].sendMessage("§bname§a: §u" + players[playerTargetB].name + "§a, §bnameTag§a: §u" + players[playerTargetB].nameTag + "§a, §bUUID§a: §u" + players[playerTargetB].id + "§a, §bdistance§a: §u" + distance + "§a, §bLocation§a: §9{ §c" + players[playerTargetB].location.x + "§a, §c" + players[playerTargetB].location.y + "§a, §c" + players[playerTargetB].location.z + "§9 }§a, §bisSneaking§a: §g" + players[playerTargetB].isSneaking + "§a, §bscoreboardIdentity§a: §u" + scoreboardIdentity + "§a, §bscoreboardIdentityDisplayName§a: §u" + scoreboardIdentityDisplayName + "§a, §bscoreboardIdentityType§a: §u" + scoreboardIdentityType + "§a, §bgetTotalXP§a: §c" + players[playerTargetB].getTotalXp() + "§a, §bxpEarnedAtCurrentLevel§a: §c" + players[playerTargetB].xpEarnedAtCurrentLevel + "§a, §blevel§a: §c" + players[playerTargetB].level + "§a, §btotalXpNeededForNextLevel§a: §c" + players[playerTargetB].totalXpNeededForNextLevel + "§a, §bisOp§a: §g" + players[playerTargetB].isOp() + "§a, §bgetBlockFromViewDirection§a: " + blockViewedBlockType + ", §bgetEntitiesFromViewDirection§a: §9{ §sEntity§a: " + entityViewedEntityType + ", §sDistance§a: " + entityViewedEntityDistance + " §9}§a, §bgetComponents§a: §n[§u" + componentList + "§n]§a, §bgetEffects§a: §n[§a" + effectsList + "§n]§a, §bgetTags§a: [" + players[playerTargetB].getTags() + "], §bgetVelocity§a: §9{ §c" + (players[playerTargetB].getVelocity().x + "§a, §c" + players[playerTargetB].getVelocity().y + "§a, §c" + players[playerTargetB].getVelocity().z) + "§9 }§a, §bgetViewDirection§a: §9{ §bx: §c" + (players[playerTargetB].getViewDirection().x + "§a, §by: §c" + players[playerTargetB].getViewDirection().y + "§a, §bz: §c" + players[playerTargetB].getViewDirection().z) + "§9 }§a, §bselectedSlotIndex§a: " + players[playerTargetB].selectedSlotIndex + "§a, §bspawnPoint§a: " + spawnPointAllCoordinates);
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:entityDebug") {
        let form2 = new ModalFormData();
        let players = world.getPlayers();
        let entityViewedEntityType;
        let entityViewedEntityName;
        let entityViewedEntityDistance;
        let blockViewedBlockType;
        let spawnPointAllCoordinates;
        entityViewedEntityType = "None";
        entityViewedEntityName = "None";
        entityViewedEntityDistance = "None";
        blockViewedBlockType = "None";
        spawnPointAllCoordinates = "None";
        let targetList = [players[0].nameTag];
        let scoreboardIdentity = undefined;
        let scoreboardIdentityDisplayName = undefined;
        let scoreboardIdentityType = undefined;
        for (const index in players) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            } /*
            console.warn(targetList);*/
        }
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
            let message2 = message.slice(8, message.length).split("|");
            let playerViewerB = Number(message2)[0];
            let selectionType = 0;
            try {
                selectionType = Number(message2)[1];
            }
            catch (e) { }
            let UUID;
            try {
                UUID = Number(message2)[2];
            }
            catch (e) { }
        }
        else {
            form2.title("Entity Debugger");
            form2.dropdown("Player Viewer", String(targetList).split(","), 0);
            form2.dropdown("Selection Type", ["Facing", "UUID", "§4Closest", "§4Name Tag", "Block Location"], 0);
            form2.textField("Entity UUID", "Entity UUID", "0");
            form2.textField("Entity Block Location Index", "0", "0");
            form2.textField("Entity Block Location Coordinates", "overworld, 0, 0, 0", "0");
            form2.show(players[players.findIndex((x) => x == sourceEntity)]).then(t => {
                if (t.canceled)
                    return;
                let [playerViewer, selectionType, entityUUID, blockLocationIndex, blockLocationCoordinates] = t.formValues;
                let playerViewerB = Number(playerViewer);
                let playerTargetB;
                let blockLocation = String(blockLocationCoordinates).split(", ");
                if (selectionType == 0) {
                    playerTargetB = players[playerViewerB].getEntitiesFromViewDirection()[0].entity;
                }
                if (selectionType == 1) {
                    playerTargetB = world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities().concat(world.getDimension("the_end").getEntities())).find((entityValue) => (entityValue.id == entityUUID));
                }
                if (selectionType == 4) {
                    playerTargetB = world.getDimension(blockLocation[0]).getEntitiesAtBlockLocation({ x: Number(blockLocation[1]), y: Number(blockLocation[2]), z: Number(blockLocation[3]) })[Number(blockLocationIndex)];
                }
                let distance = mcMath.Vector3Utils.distance(players[playerViewerB].location, playerTargetB.location);
                try {
                    entityViewedEntityType = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityType = "§4None§a";
                }
                try {
                    entityViewedEntityName = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityName = "§4None§a";
                }
                try {
                    entityViewedEntityDistance = playerTargetB.getEntitiesFromViewDirection()[0].distance;
                }
                catch (e) {
                    entityViewedEntityDistance = "§4None§a";
                }
                let componentList;
                componentList = [];
                try {
                    componentList = [playerTargetB.getComponents()[0].typeId];
                }
                catch (e) {
                    console.error(e, e.stack);
                    componentList = "§4None§a";
                }
                let effectsList = [];
                try {
                    effectsList = [("§9{ §stypeId§a: §u" + playerTargetB.getEffects()[0].typeId + "§a, §sdisplayName§a: §u" + playerTargetB.getEffects()[0].displayName + "§a, §sduration§a: §c" + playerTargetB.getEffects()[0].duration + "§a, §samplifier§a: §c" + playerTargetB.getEffects()[0].amplifier + "§9 }§a")];
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                let blockProperties = [];
                try {
                    blockProperties = [playerTargetB.getBlockFromViewDirection().block.permutation.getAllStates()[0]];
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*
                let effectsList = [players[playerTargetB].getComponents[0]]*/
                try {
                    scoreboardIdentity = playerTargetB.scoreboardIdentity.id;
                }
                catch (e) {
                    scoreboardIdentity = "§4None§a";
                }
                try {
                    scoreboardIdentityDisplayName = playerTargetB.scoreboardIdentity.displayName;
                }
                catch (e) {
                    scoreboardIdentityDisplayName = "§4None§a";
                }
                try {
                    scoreboardIdentityType = playerTargetB.scoreboardIdentity.type;
                }
                catch (e) {
                    scoreboardIdentityType = "§4None§a";
                }
                try {
                    blockViewedBlockType = "§9{ §btypeId§a: §u" + playerTargetB.getBlockFromViewDirection().block.typeId + "§a, §bcanBeWaterlogged§a: §u" + playerTargetB.getBlockFromViewDirection().block.type.canBeWaterlogged + "§9 }§a";
                }
                catch (e) {
                    blockViewedBlockType = "§4None§a";
                }
                for (const index in playerTargetB.getComponents()) { /*
                    console.warn(index);*/
                    if (Number(index) != 0) {
                        componentList = String([String(componentList), playerTargetB.getComponents()[index].typeId]).split(",");
                    } /*
                    console.warn(targetList);*/
                }
                for (const index in playerTargetB.getEffects()) { /*
                    console.warn(index);*/
                    if (Number(index) != 0) {
                        effectsList = String([String(effectsList), ("§9{ §stypeId§a: §u" + playerTargetB.getEffects()[index].typeId + "§a, §sdisplayName§a: §u" + playerTargetB.getEffects()[index].displayName + ", §sduration§a: §c" + playerTargetB.getEffects()[index].duration + "§a, §samplifier§a: §c" + playerTargetB.getEffects()[index].amplifier + "§9 }§a")]).split(",");
                    } /*
                    console.warn(targetList);*/
                }
                players[playerViewerB].sendMessage("§btypeId§a: §u" + playerTargetB.typeId + "§a, §bUUID§a: §u" + playerTargetB.id + "§a, §bnameTag§a: §u" + playerTargetB.nameTag + "§a, §bdistance§a: §u" + distance + "§a, §bLocation§a: §9{ §c" + playerTargetB.location.x + "§a, §c" + playerTargetB.location.y + "§a, §c" + playerTargetB.location.z + "§9 }§a, §bisSneaking§a: §g" + playerTargetB.isSneaking + "§a, §bscoreboardIdentityId§a: §u" + scoreboardIdentity + "§a, §bscoreboardIdentityDisplayName§a: §u" + scoreboardIdentityDisplayName + "§a, §bscoreboardIdentityType§a: §u" + scoreboardIdentityType + "§a, §bgetBlockFromViewDirection§a: " + blockViewedBlockType + ", §bgetEntitiesFromViewDirection§a: { §sEntity§a: " + entityViewedEntityType + ", §sDistance§a: " + entityViewedEntityDistance + " }, §bgetComponents§a: §n[§u" + componentList + "§n]§a, §bgetEffects§a: §n[§a" + effectsList + "§n]§a, §bgetTags§a: [" + playerTargetB.getTags() + "], §bgetVelocity§a: §9{ §c" + (playerTargetB.getVelocity().x + "§a, §c" + playerTargetB.getVelocity().y + "§a, §c" + playerTargetB.getVelocity().z) + "§9 }§a, §bgetViewDirection§a: { " + (playerTargetB.getViewDirection().x, playerTargetB.getViewDirection().y, playerTargetB.getViewDirection().z) + ", §bselectedSlotIndex§a: " + playerTargetB.selectedSlotIndex + spawnPointAllCoordinates);
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:editorMenusAndLists" || id == "andexdb:mainMenu") { /*
        let form = new ActionFormData();
        let players = world.getPlayers();
    form.title("Main Menu");
    form.body("Choose menu to open. ");
    form.button("Editor Stick", "textures/items/stick");
    form.button("Editor Stick Menu B", "textures/items/stick");
    form.button("Editor Stick Menu C", "textures/items/stick");
    form.button("§8Debug Screen§f(§cUnused§f)§b", "textures/ui/ui_debug_glyph_color");
    form.button("Inventory Controller", "textures/ui/inventory_icon.png");
    form.button("Player Debug", "textures/ui/debug_glyph_color");
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color");*/ /*
    form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/ /*
    form.button("Player Controller", "textures/ui/controller_glyph_color");
    form.button("Entity Controller", "textures/ui/controller_glyph_color_switch");
    form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
    form.button("§4Dimension Options§f(§cComing Soon!§f)§b", "textures/ui/icon_setting");
    form.button("§4Create Explosion(§cComing Soon!§f)§b", "textures/blocks/tnt_side");
    form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
    form.button("§4World Debug§f(§cComing Soon!§f)§b", "textures/ui/xyz_axis.png");
    form.button("§4Dimension Debug§f(§cComing Soon!§f)§b", "textures/ui/NetherPortal");
    form.button("Inventory Transfer", "textures/ui/NetherPortal");
    form.button("Run Command", "textures/ui/ImpulseSquare.png");
    form.button("Script Eval", "textures/ui/RepeatSquare.png");
    form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
    form.button("Manage Custom UIs", "textures/ui/feedIcon");
    form.button("Settings", "textures/ui/settings_glyph_color_2x");
    forceShow(form, players[players.findIndex((x) => x == sourceEntity)] as any).then(ra => {let r = (ra as ActionFormResponse);
        // This will stop the code when the player closes the form
        if (r.canceled) return;
    
        let response = r.selection;
        switch (response) {
            case 0:
                
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
                // Do something when button 1 is pressed
                // Don't forget "break" for every case
                break;
    
            case 1:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 2:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 3:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugScreen saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 4:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 5:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:playerDebug saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 6:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebug saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;*/ /*

case 4:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;*/ /*

case 7:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:playerController saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 8:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityController saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 9:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:worldOptions saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 10:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:dimensionOptions saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 11:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:createExplosion saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 12:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:fillBlocks saqw")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 15:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:inventoryTransfer saih")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 16:
    system.run(() => {
        let form = new ModalFormData();
        form.title("Command Runner / Terminal");
        form.textField("Run Command", "Run Command");
        form.textField("Run Delay", "Run Delay");
        form.toggle("Debug", false);
        form.show(sourceEntity as Player).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [commandId, commandDelay, debug] = r.formValues; /*
            console.warn(r.formValues);*/ /*
    system.runTimeout(() => {console.warn(
    (sourceEntity).runCommand(String(commandId)).successCount);}, Number(commandDelay))
    // Do something
}).catch(e => {
    console.error(e, e.stack);
});})*/ /*
try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
// Do something
catch(e) {
console.error(e, e.stack);
};*/ /*
        // Do something when button 2 is pressed
        break;

    case 17:
        try { (sourceEntity).runCommand(String("/scriptevent andexdb:scriptEvalRunWindow hisa")); }
        // Do something
    catch(e) {
        console.error(e, e.stack);
    };
        // Do something when button 2 is pressed
        break;

    case 18:
        let form = new ActionFormData();
        let players = world.getPlayers();
    form.title("Area Selector");
    form.body("Choose area type to edit. ");
    const menuList = [*/ /*"noPistonExtensionArea:", */ /*"noExplosionArea:", "noInteractArea:", "noBlockInteractArea:", "noBlockBreakArea:", "protectedArea:", "noBlockPlaceArea:"]
    menuList.forEach((s)=>{form.button(s, "textures/ui/xyz_axis");})
    forceShow(form, (sourceEntity as Player)).then(la => {let l = (la as ActionFormResponse);
        try {editAreas((sourceEntity as Player), menuList[l.selection]); }catch(e){console.error(e, e.stack);};})
        // Do something when button 2 is pressed
        break;

    case 19:
        try { (sourceEntity).runCommand(String("/scriptevent andexdb:customUISelector hisa")); }
        // Do something
    catch(e) {
        console.error(e, e.stack);
    };
        // Do something when button 2 is pressed
        break;

    case 20:
        try { (sourceEntity).runCommand(String("/scriptevent andexdb:settings hisa")); }
        // Do something
    catch(e) {
        console.error(e, e.stack);
    };
        // Do something when button 2 is pressed
        break;

        // You can add cases for each button
    default:
        // Use this when your button doesn't have a function yet
        // You don't need to use "break" on default case
        // Remember to place the default on very bottom
}
}).catch(e => {
console.error(e, e.stack);
});*/
        mainMenu(sourceEntity);
    }
    if (id == "andexdb:itemLoreInventoryModifier" || id == "andexdb:inventoryController" || id == "andexdb:itemModifier") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", "0");
        form2.dropdown("Slot Type", ["Inventory", "Equipment"], 0);
        form2.dropdown("Player Target", String(targetList).split(","), 0);
        form2.dropdown("Player Viewer", String(targetList).split(","), 0);
        form2.toggle("Debug2", false);
        form2.show(event.sourceEntity).then(t => {
            if (t.canceled)
                return;
            let [slotNumber, slotType, playerTarget, playerViewer, debug2] = t.formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            let inventory;
            inventory = players[playerTargetB].getComponent("inventory"); /*
            try{inventory = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};*/
            let item = inventory.container.getItem(Number(slotNumber));
            let equipmentPlayerSlotsList = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Mainhand, EquipmentSlot.Offhand];
            if (Number(slotType) == 1) {
                try {
                    let a = players[playerTargetB].getComponent("equippable");
                    item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)]);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                ;
            }
            ;
            function getDurability() { try {
                return item.getComponent("minecraft:durability");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
                return undefined;
            } ; }
            function getEnchantments() { try {
                return item.getComponent("minecraft:enchantments");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
                return undefined;
            } ; }
            const durability = getDurability();
            function itemNameTextCalculator() {
                try {
                    if (item.nameTag == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.nameTag != undefined) {
                            return item.nameTag;
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                    return undefined;
                }
                ;
            }
            let itemNameTextField = itemNameTextCalculator(); /*
            console.warn(itemNameTextCalculator());*/
            function itemLoreTextCalculator() {
                try {
                    if (item.getLore() == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.getLore() != undefined) {
                            return Array(item.getLore().toString()).join("");
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                    return undefined;
                }
                ;
            }
            let itemLoreTextField = itemLoreTextCalculator();
            let currentValueItemAmount = 0;
            try {
                currentValueItemAmount = item.amount;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return 0*/
            }
            ;
            let currentValueItemType = undefined;
            try {
                currentValueItemType = item.typeId;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return 0*/
            }
            ;
            let itemKeepOnDeath = false;
            try {
                itemKeepOnDeath = item.keepOnDeath;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return false*/
            }
            ;
            let form = new ModalFormData(); /*
            console.warn(item.nameTag);*/ /*
            console.warn(Array(item.getLore().toString()).join(""));*/
            form.title("Item Modifier / Lore");
            form.textField("Item Type: " + currentValueItemType + "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField /*(String(item.nameTag))*/);
            form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", itemLoreTextField);
            form.textField("Can Destroy", "Can Destroy", "" /*(String(item.getCanDestroy()))*/);
            form.textField("Can Place On", "Can Place On", "" /*(String(item.getCanPlaceOn()))*/);
            form.textField("Trigger Event", "Trigger Event", "");
            form.toggle("Set Count", false);
            form.slider("Count", 0, 255, 1, currentValueItemAmount);
            form.toggle("keepOnDeath", (itemKeepOnDeath));
            function getItemLockMode(mode, input) {
                try {
                    if (mode == 1) {
                        try {
                            if (item.lockMode == "inventory") {
                                return 0;
                            }
                            else {
                                if (item.lockMode == "none") {
                                    return 1;
                                }
                                else {
                                    if (item.lockMode == "slot") {
                                        return 2;
                                    }
                                }
                            }
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                            ;
                            return 1;
                        }
                    }
                    else {
                        if (mode == 0) {
                            if (input == 0) {
                                return ItemLockMode.inventory;
                            }
                            else {
                                if (input == 1) {
                                    return ItemLockMode.none;
                                }
                                else {
                                    if (input == 2) {
                                        return ItemLockMode.slot;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                    return undefined;
                }
                ;
            }
            let itemLockModeIndex = Number(getItemLockMode(1));
            form.dropdown("lockMode", ["inventory", "none", "slot"], Number((itemLockModeIndex)));
            form.toggle("setLore", false);
            form.toggle("clearLore", false);
            form.toggle("New Item", false);
            form.textField("Item Type", "Item Type", "");
            form.textField("Item Count", "Item Count", "1"); /*
            form.textField("Item Data", "Trigger Event", "");*/
            form.toggle("Move Item", false);
            form.textField("From Slot", "From Slot", "0");
            form.textField("To Slot", "To Slot", "1");
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("From Contriner Player", String(targetList).split(","), 0);
            form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("To Container Player", String(targetList).split(","), 0);
            form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Swap Items", false);
            form.textField("Slot", "Slot", "0");
            form.textField("Other Slot", "Other Slot", "1");
            form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("Container Player", String(targetList).split(","), 0);
            form.textField("Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("Other Container Player", String(targetList).split(","), 0);
            form.textField("Other Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Transfer Item", false);
            form.textField("From Slot", "From Slot", "0");
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("From Container Player", String(targetList).split(","), 0);
            form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("To Container Player", String(targetList).split(","), 0);
            form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Debug", false);
            form.show(players[playerViewerB]).then(r => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, setAmount, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug] = r.formValues; /*
                console.warn(r.formValues);*/
                /*let item = inventory.container.getItem(Number(slotNumber));
                if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};*/
                let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferFromContainerBlock).split(", ")[1]), y: Number(String(transferFromContainerBlock).split(", ")[2]), z: Number(String(transferFromContainerBlock).split(", ")[3]) });
                let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferToContainerBlock).split(", ")[1]), y: Number(String(transferToContainerBlock).split(", ")[2]), z: Number(String(transferToContainerBlock).split(", ")[3]) });
                let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveFromContainerBlock).split(", ")[1]), y: Number(String(moveFromContainerBlock).split(", ")[2]), z: Number(String(moveFromContainerBlock).split(", ")[3]) });
                let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveToContainerBlock).split(", ")[1]), y: Number(String(moveToContainerBlock).split(", ")[2]), z: Number(String(moveToContainerBlock).split(", ")[3]) });
                let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapContainerBlock).split(", ")[1]), y: Number(String(swapContainerBlock).split(", ")[2]), z: Number(String(swapContainerBlock).split(", ")[3]) });
                let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapOtherContainerBlock).split(", ")[1]), y: Number(String(swapOtherContainerBlock).split(", ")[2]), z: Number(String(swapOtherContainerBlock).split(", ")[3]) });
                let durability2 = getDurability();
                let enchantments2 = getEnchantments(); /*
                for (const index in inventory.) {
                    if (Number(index) != 0) {
                    targetList = String([String(targetList), players[index].nameTag]).split(",");
                    }
                }*/
                let newItemNameTag = String(itemName).split("\\\\newline");
                try {
                    item.nameTag = newItemNameTag.join("\n");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (Boolean(setLore) == true) {
                    try {
                        item.setLore(String(itemLore).split("\\\\newline"));
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                        ;
                    }
                }
                if (Boolean(clearLore) == true) {
                    try {
                        item.setLore();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.lockMode = String(getItemLockMode(0, Number(lockMode)));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                try {
                    item.keepOnDeath = Boolean(keepOnDeath);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (Boolean(setAmount) == true) {
                    try {
                        item.amount = Number(amount);
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                        ;
                    }
                }
                if (String(canDestroy) !== "") {
                    try {
                        item.setCanDestroy(String(canDestroy).split(", "));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ; /*String[String(canDestroy)]*/
                    ;
                }
                if (String(canPlaceOn) !== "") {
                    try {
                        item.setCanPlaceOn(String(canPlaceOn).split(", "));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (String(triggerEvent) !== "") {
                    try {
                        item.triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /*
                try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/ /*
                let enchantment = new Enchantment("fire_aspect", 4)
                enchantment.level = 5
                try{ const enchantments3 = enchantments2.enchantments; enchantments3.addEnchantment(enchantment); enchantments2.enchantments = enchantments3} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
                if (Boolean(newItem) == true) {
                    try {
                        item = new ItemStack(String(newItemType), Number(newItemCount));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (event.sourceEntity.hasTag("scriptDebugger")) {
                    console.warn(item.typeId);
                }
                if (Number(slotType) == 1) {
                    try {
                        let a = players[playerTargetB].getComponent("equippable");
                        a.setEquipment(equipmentPlayerSlotsList[Number(slotNumber)], item.clone());
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                    ;
                }
                else {
                    try {
                        inventory.container.setItem(Number(slotNumber), item);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /*
                try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
                if (Boolean(moveItem) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let moveFromContainerB;
                    moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                    switch (moveFromContainerType) {
                        case 4:
                            moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let moveToContainerB;
                    moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                    switch (moveToContainerType) {
                        case 4:
                            moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(swapItems) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let swapContainerB;
                    let mode = 0;
                    swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                    let itemA;
                    itemA = undefined;
                    if (Number(swapSlot) > 35 && Number(swapContainerType) == 0) {
                        try {
                            swapContainerB = players[playerTargetB].getComponent("equippable");
                            swapSlot = Number(swapSlot) - 36;
                            mode = 1;
                            itemA = swapContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapSlot)]).clone();
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                        }
                        ;
                    }
                    ;
                    switch (swapContainerType) {
                        case 4:
                            swapContainerB = swapContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let swapOtherContainerB;
                    swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                    let itemB;
                    itemB = undefined;
                    if (Number(swapOtherSlot) > 35) {
                        try {
                            swapOtherContainerB = players[playerTargetB].getComponent("equippable");
                            swapOtherSlot = Number(swapOtherSlot) - 36;
                            if (mode == 1) {
                                mode = 2;
                            }
                            else {
                                mode = 3;
                            }
                            ;
                            itemB = swapOtherContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)]).clone();
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                        }
                        ;
                    }
                    ;
                    switch (swapOtherContainerType) {
                        case 4:
                            swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        if (itemB == undefined) {
                            itemB = swapOtherContainerB.container.getItem(Number(swapOtherSlot)).clone();
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        if (itemA == undefined) {
                            itemA = swapContainerB.container.getItem(Number(swapSlot)).clone();
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    switch (mode) {
                        case 0:
                            console.warn("Mode: 0");
                            try {
                                swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 1:
                            console.warn("Mode: 1");
                            try {
                                swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapOtherContainerB.container.setItem(Number(swapOtherSlot), itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 3:
                            console.warn("Mode: 3");
                            try {
                                swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapContainerB.container.setItem(Number(swapSlot), itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 2:
                            console.warn("Mode: 2");
                            try {
                                swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapSlot)], itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
                if (Boolean(transferItem) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let transferFromContainerB;
                    transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                    switch (transferFromContainerType) {
                        case 4:
                            transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let transferToContainerB;
                    transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                    switch (transferToContainerType) {
                        case 4:
                            transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(debug) == true) {
                    console.warn("Form Values", r.formValues);
                    console.warn(["Item Components: ", item.getComponents()]);
                    console.warn(item.getTags());
                    console.warn(players);
                    console.warn(players[0]);
                    console.warn(players[1]); /*
                    try {console.warn(item.getCanDestroy());} catch(e){
                        console.error(e, e.stack)};
                    try {console.warn(item.getCanPlaceOn());} catch(e){
                        console.error(e, e.stack)};*/
                    console.warn(item.isStackable);
                    console.warn(item.maxAmount);
                    console.warn(item.type);
                    console.warn(item.typeId);
                    console.warn(item.nameTag);
                    console.warn(item.getLore());
                    try {
                        console.warn(["Damage: ", durability.damage]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Damage Chance: ", durability.getDamageChance()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Max Durability: ", durability.maxDurability]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    let componentList = [item.getComponents()[0].typeId];
                    for (const index in players) {
                        if (Number(index) != 0) {
                            componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                        }
                    }
                    console.warn(String(["Item Components: " + String(componentList)]));
                }
                // Do something
            }).catch(e => {
                console.error(e, e.stack);
            });
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:inventoryTransfer") {
        let form = new ActionFormData();
        let players = world.getPlayers();
        let callerPlayer = players[players.findIndex((x) => x == sourceEntity)];
        form.title("Inventory Transfer");
        form.body("Choose menu to open. ");
        form.button("Inventory", "textures/items/stick");
        form.button("Hotbar", "textures/items/stick");
        form.button("Full Inventory + Hotbar", "textures/items/stick");
        form.button("Inventory Row", "textures/ui/ui_debug_glyph_color");
        form.button("§4Edit The Block Presets", "textures/ui/ui_debug_glyph_color");
        form.show(players[players.findIndex((x) => x == sourceEntity)]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    let form2 = new ActionFormData();
                    form2.title("Inventory Transfer");
                    form2.body("Choose menu to open. ");
                    form2.button("Block & Block", "textures/items/stick");
                    form2.button("Player & Player", "textures/ui/switch_accounts");
                    form2.button("Block & Player", "textures/items/stick");
                    form2.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0: /*
                                let form3 = new ActionFormData();
                                form3.title("Inventory Transfer");
                                form3.body("Choose First Block Preset. ");
                                form3.button("Use Coordinates And Dimension Instead", "textures/items/stick");
                                form3.button("Preset 1", "textures/items/stick");
                                form3.button("Edit Presets", "textures/items/stick");
                                form3.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(s => {
                                // This will stop the code when the player closes the form
                                    if (s.canceled) return;
                        
                                    let response = s.selection;
                                    switch (response) {
                                        case 0:
                                            
                                        try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
                                        // Do something
                                    catch(e) {
                                        console.error(e, e.stack);
                                    };
                                            // Do something when button 1 is pressed
                                            // Don't forget "break" for every case
                                            break;
        
                                        case 1:
                                            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
                                            // Do something
                                        catch(e) {
                                            console.error(e, e.stack);
                                        };
                                            // Do something when button 2 is pressed
                                            break; }
                                        }).catch(e => {
                                            console.error(e, e.stack);
                                        });
                                            // Do something when button 1 is pressed
                                            // Don't forget "break" for every case
                                            break;*/
                                let form3 = new ModalFormData(); /*Z
                                let targetList = [players[0].nameTag]
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                    targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }*/
                                form3.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0);
                                form3.textField("From Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0);
                                form3.textField("To Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                                form3.toggle("Debug2", false);
                                form3.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, fromBlockSelectionMode, fromBlockPosition, toBlockSelectionMode, toBlockPosition, debug2] = t.formValues;
                                    let fromBlockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({ x: Number(String(fromBlockPosition).split(", ")[1]), y: Number(String(fromBlockPosition).split(", ")[2]), z: Number(String(fromBlockPosition).split(", ")[3]) });
                                    let toBlockPositionB = world.getDimension(String(toBlockPosition).split(", ")[0]).getBlock({ x: Number(String(toBlockPosition).split(", ")[1]), y: Number(String(toBlockPosition).split(", ")[2]), z: Number(String(toBlockPosition).split(", ")[3]) });
                                    let fromBlockPositionC = fromBlockPositionB.getComponent("inventory");
                                    let toBlockPositionC = toBlockPositionB.getComponent("inventory");
                                    if (Number(fromBlockSelectionMode) > 0) {
                                        let fromPresetValues = undefined;
                                        try {
                                            fromPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(fromBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            fromBlockPositionC = world.getDimension(String(fromPresetValues).split(", ")[0]).getBlock({ x: Number(String(fromPresetValues).split(", ")[1]), y: Number(String(fromPresetValues).split(", ")[2]), z: Number(String(fromPresetValues).split(", ")[3]) }).getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    if (Number(toBlockSelectionMode) > 0) {
                                        let toPresetValues = undefined;
                                        try {
                                            toPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(toBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            toBlockPositionC = world.getDimension(String(toPresetValues).split(", ")[0]).getBlock({ x: Number(String(toPresetValues).split(", ")[1]), y: Number(String(toPresetValues).split(", ")[2]), z: Number(String(toPresetValues).split(", ")[3]) }).getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.swapItems(Number(index), Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.transferItem(Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.moveItem(Number(index), Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 1:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form2.dropdown("From Player", String(targetList).split(","), 0);
                                form2.dropdown("To Player", String(targetList).split(","), 0);
                                form2.toggle("Debug2", false);
                                form2.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index + 9), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index + 9), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 2: /*
                                let form3 = new ActionFormData();
                                form3.title("Inventory Transfer");
                                form3.body("Choose First Block Preset. ");
                                form3.button("Use Coordinates And Dimension Instead", "textures/items/stick");
                                form3.button("Preset 1", "textures/items/stick");
                                form3.button("Edit Presets", "textures/items/stick");
                                form3.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(s => {
                                // This will stop the code when the player closes the form
                                    if (s.canceled) return;
                        
                                    let response = s.selection;
                                    switch (response) {
                                        case 0:
                                            
                                        try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
                                        // Do something
                                    catch(e) {
                                        console.error(e, e.stack);
                                    };
                                            // Do something when button 1 is pressed
                                            // Don't forget "break" for every case
                                            break;
        
                                        case 1:
                                            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
                                            // Do something
                                        catch(e) {
                                            console.error(e, e.stack);
                                        };
                                            // Do something when button 2 is pressed
                                            break; }
                                        }).catch(e => {
                                            console.error(e, e.stack);
                                        });
                                            // Do something when button 1 is pressed
                                            // Don't forget "break" for every case
                                            break;*/
                                let form4 = new ModalFormData();
                                let targetList2 = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList2 = String([String(targetList2), players[index].nameTag]).split(",");
                                    }
                                }
                                form4.dropdown("Transfer Type", ["Swap", "Transfer To Block", "Transfer To Player", "Move To Block", "Move To Player"], 0);
                                form4.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0);
                                form4.textField("Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z)); /*
                                form4.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0)
                                form4.textField("To Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z))*/
                                form4.dropdown("Player", String(targetList2).split(","), 0);
                                form4.toggle("Debug2", false);
                                form4.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, blockSelectionMode, fromBlockPosition, playerTarget, debug2] = t.formValues;
                                    let blockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({ x: Number(String(fromBlockPosition).split(", ")[1]), y: Number(String(fromBlockPosition).split(", ")[2]), z: Number(String(fromBlockPosition).split(", ")[3]) });
                                    let blockPositionC = blockPositionB.getComponent("inventory");
                                    let playerTargetB = Number(playerTarget);
                                    const toInventory = players[playerTargetB].getComponent("inventory");
                                    if (Number(blockSelectionMode) > 0) {
                                        let presetValues = undefined;
                                        try {
                                            presetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(blockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            blockPositionC = world.getDimension(String(presetValues).split(", ")[0]).getBlock({ x: Number(String(presetValues).split(", ")[1]), y: Number(String(presetValues).split(", ")[2]), z: Number(String(presetValues).split(", ")[3]) }).getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.swapItems(Number(index), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    toInventory.container.transferItem(Number(index + 9), blockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 3:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    toInventory.container.moveItem(Number(index + 9), Number(index), blockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 4:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.moveItem(Number(index), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    }).catch(e => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                case 1:
                    let form3 = new ActionFormData();
                    form3.title("Inventory Transfer");
                    form3.body("Choose menu to open. ");
                    form3.button("Player & Player", "textures/ui/switch_accounts.png");
                    form3.button("Block & Player", "textures/items/stick");
                    form3.show(players[players.findIndex((x) => x == sourceEntity)]).then(u => {
                        // This will stop the code when the player closes the form
                        if (u.canceled)
                            return;
                        let response = u.selection;
                        switch (response) {
                            case 0:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form2.dropdown("From Player", String(targetList).split(","), 0);
                                form2.dropdown("To Player", String(targetList).split(","), 0);
                                form2.toggle("Debug2", false);
                                form2.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            try {
                                                (sourceEntity).runCommand(String("/scriptevent andexdb:debugScreen saqw"));
                                            }
                                            // Do something
                                            catch (e) {
                                                console.error(e, e.stack);
                                            }
                                            ;
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    }).catch(e => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 2 is pressed
                    break;
                case 2:
                    let form5 = new ActionFormData();
                    form5.title("Inventory Transfer");
                    form5.body("Choose menu to open. ");
                    form5.button("Player & Player", "textures/ui/switch_accounts");
                    form5.button("Block & Player", "textures/items/stick");
                    form5.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form2.dropdown("From Player", String(targetList).split(","), 0);
                                form2.dropdown("To Player", String(targetList).split(","), 0);
                                form2.toggle("Debug2", false);
                                form2.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    }).catch(e => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                    // Do something when button 2 is pressed
                    break;
                case 3:
                    let form4 = new ActionFormData();
                    form4.title("Inventory Transfer");
                    form4.body("Choose menu to open. ");
                    form4.button("Block & Block", "textures/ui/train");
                    form4.button("Player & Player", "textures/ui/switch_accounts");
                    form4.button("Block & Player", "textures/ui/upload_glyph");
                    form4.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0:
                                let form3 = new ModalFormData(); /*Z
                                let targetList = [players[0].nameTag]
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                    targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }*/
                                form3.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form3.slider("Inventory Row", 0, 4, (1 / 9));
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0);
                                form3.textField("From Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0);
                                form3.textField("To Player", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                                form3.toggle("Debug2", false);
                                form3.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, inventoryRow, fromBlockSelectionMode, fromBlockPosition, toBlockSelectionMode, toBlockPosition, debug2] = t.formValues;
                                    let fromBlockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({ x: Number(String(fromBlockPosition).split(", ")[1]), y: Number(String(fromBlockPosition).split(", ")[2]), z: Number(String(fromBlockPosition).split(", ")[3]) });
                                    let toBlockPositionB = world.getDimension(String(toBlockPosition).split(", ")[0]).getBlock({ x: Number(String(toBlockPosition).split(", ")[1]), y: Number(String(toBlockPosition).split(", ")[2]), z: Number(String(toBlockPosition).split(", ")[3]) });
                                    let fromBlockPositionC = fromBlockPositionB.getComponent("inventory");
                                    let toBlockPositionC = toBlockPositionB.getComponent("inventory");
                                    if (Number(fromBlockSelectionMode) > 0) {
                                        let fromPresetValues = undefined;
                                        try {
                                            fromPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(fromBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            fromBlockPositionC = world.getDimension(String(fromPresetValues).split(", ")[0]).getBlock({ x: Number(String(fromPresetValues).split(", ")[1]), y: Number(String(fromPresetValues).split(", ")[2]), z: Number(String(fromPresetValues).split(", ")[3]) }).getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    if (Number(toBlockSelectionMode) > 0) {
                                        let toPresetValues = undefined;
                                        try {
                                            toPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(toBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            toBlockPositionC = world.getDimension(String(toPresetValues).split(", ")[0]).getBlock({ x: Number(String(toPresetValues).split(", ")[1]), y: Number(String(toPresetValues).split(", ")[2]), z: Number(String(toPresetValues).split(", ")[3]) }).getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.swapItems(Number(index + (Number(inventoryRow) * 9)), Number(index + (Number(inventoryRow) * 9)), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.transferItem(Number(index + (Number(inventoryRow) * 9)), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.moveItem(Number(index + (Number(inventoryRow) * 9)), Number(index + (Number(inventoryRow) * 9)), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 1:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], 0);
                                form2.slider("Inventory Row", 0, 4, (1 / 9));
                                form2.dropdown("From Player", String(targetList).split(","), 0);
                                form2.dropdown("To Player", String(targetList).split(","), 0);
                                form2.toggle("Debug2", false);
                                form2.show(event.sourceEntity).then(t => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, inventoryRow, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index + (Number(inventoryRow) * 9)), Number(index + (Number(inventoryRow) * 9)), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index + (Number(inventoryRow) * 9)), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index + (Number(inventoryRow) * 9)), Number(index + (Number(inventoryRow) * 9)), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                }).catch(e => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    }).catch(e => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                    // Do something when button 2 is pressed
                    break;
                case 4:
                    let form6 = new ModalFormData();
                    form6.title("Inventory Transfer");
                    form6.dropdown("Preset Name", ["Preset 1", "Preset 2", "Preset 3", "Preset 4", "Preset 5", "Preset 6"], 0);
                    form6.textField("From Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                    form6.toggle("Debug2", false);
                    form6.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let [presetName, debug2] = s.formValues;
                        let form3 = new ModalFormData();
                        let presetValues = undefined;
                        try {
                            presetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(presetName)));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        if (presetValues == undefined) {
                            form3.textField("Block Location", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z));
                        }
                        else {
                            form3.textField("Block Location", "dimension, x, y, z", presetValues);
                        }
                        form3.toggle("Debug2", false);
                        form3.show(event.sourceEntity).then(t => {
                            if (t.canceled)
                                return;
                            let [newBlockPresetValues, debug2] = t.formValues;
                            callerPlayer.setDynamicProperty("blockTransferPreset" + String(Number(presetName)), String(newBlockPresetValues));
                        }).catch(e => {
                            console.error(e, e.stack);
                        });
                    }).catch(e => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                // You can add cases for each button
                default:
                // Use this when your button doesn't have a function yet
                // You don't need to use "break" on default case
                // Remember to place the default on very bottom
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:inventoryTransferB") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", "0");
        form2.dropdown("Player Target", String(targetList).split(","), 0);
        form2.dropdown("Player Viewer", String(targetList).split(","), 0);
        form2.toggle("Debug2", false);
        form2.show(event.sourceEntity).then(t => {
            if (t.canceled)
                return;
            let [slotNumber, playerTarget, playerViewer, debug2] = t.formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            const inventory = players[playerTargetB].getComponent("inventory");
            let item = inventory.container.getItem(Number(slotNumber));
            function getDurability() { try {
                return item.getComponent("minecraft:durability");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
                return undefined;
            } ; }
            const durability = getDurability();
            function itemNameTextCalculator() {
                try {
                    if (item.nameTag == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.nameTag != undefined) {
                            return item.nameTag;
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                    return undefined;
                }
                ;
            }
            let itemNameTextField = itemNameTextCalculator(); /*
            console.warn(itemNameTextCalculator());*/
            function itemLoreTextCalculator() {
                try {
                    if (item.getLore() == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.getLore() != undefined) {
                            return Array(item.getLore().toString()).join("");
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                    return undefined;
                }
                ;
            }
            let itemLoreTextField = itemLoreTextCalculator();
            let currentValueItemAmount = 0;
            try {
                currentValueItemAmount = item.amount;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return 0*/
            }
            ;
            let currentValueItemType = undefined;
            try {
                currentValueItemType = item.typeId;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return 0*/
            }
            ;
            let itemKeepOnDeath = false;
            try {
                itemKeepOnDeath = item.keepOnDeath;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ; /* return false*/
            }
            ;
            let form = new ModalFormData(); /*
            console.warn(item.nameTag);*/ /*
            console.warn(Array(item.getLore().toString()).join(""));*/
            form.title("Item Modifier / Lore");
            form.textField("Item Type: " + currentValueItemType + "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField /*(String(item.nameTag))*/);
            form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", itemLoreTextField);
            form.textField("Can Destroy", "Can Destroy", "" /*(String(item.getCanDestroy()))*/);
            form.textField("Can Place On", "Can Place On", "" /*(String(item.getCanPlaceOn()))*/);
            form.textField("§cTrigger Event (Removed in 1.20.70.71)", "§cTrigger Event (Removed in 1.20.70.71)", "");
            form.slider("Count", 0, 255, 1, currentValueItemAmount);
            form.toggle("keepOnDeath", (itemKeepOnDeath));
            function getItemLockMode(mode, input) {
                try {
                    if (mode == 1) {
                        try {
                            if (item.lockMode == "inventory") {
                                return 0;
                            }
                            else {
                                if (item.lockMode == "none") {
                                    return 1;
                                }
                                else {
                                    if (item.lockMode == "slot") {
                                        return 2;
                                    }
                                }
                            }
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                            ;
                            return 1;
                        }
                    }
                    else {
                        if (mode == 0) {
                            if (input == 0) {
                                return ItemLockMode.inventory;
                            }
                            else {
                                if (input == 1) {
                                    return ItemLockMode.none;
                                }
                                else {
                                    if (input == 2) {
                                        return ItemLockMode.slot;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                    return undefined;
                }
                ;
            }
            let itemLockModeIndex = Number(getItemLockMode(1));
            form.dropdown("lockMode", ["inventory", "none", "slot"], Number((itemLockModeIndex)));
            form.toggle("setLore", false);
            form.toggle("clearLore", false);
            form.toggle("New Item", false);
            form.textField("Item Type", "Item Type", "");
            form.textField("Item Count", "Item Count", "1"); /*
            form.textField("Item Data", "Trigger Event", "");*/
            form.toggle("Move Item", false);
            form.textField("From Slot", "From Slot", "0");
            form.textField("To Slot", "To Slot", "1");
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("From Contriner Player", String(targetList).split(","), 0);
            form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("To Container Player", String(targetList).split(","), 0);
            form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Swap Items", false);
            form.textField("Slot", "Slot", "0");
            form.textField("Other Slot", "Other Slot", "1");
            form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("Container Player", String(targetList).split(","), 0);
            form.textField("Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("Other Container Player", String(targetList).split(","), 0);
            form.textField("Other Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Transfer Item", false);
            form.textField("From Slot", "From Slot", "0");
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("From Container Player", String(targetList).split(","), 0);
            form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
            form.dropdown("To Container Player", String(targetList).split(","), 0);
            form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
            form.toggle("Debug", false);
            form.show(players[playerViewerB]).then(r => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug] = r.formValues; /*
                console.warn(r.formValues);*/
                let item = inventory.container.getItem(Number(slotNumber));
                let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferFromContainerBlock).split(", ")[1]), y: Number(String(transferFromContainerBlock).split(", ")[2]), z: Number(String(transferFromContainerBlock).split(", ")[3]) });
                let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferToContainerBlock).split(", ")[1]), y: Number(String(transferToContainerBlock).split(", ")[2]), z: Number(String(transferToContainerBlock).split(", ")[3]) });
                let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveFromContainerBlock).split(", ")[1]), y: Number(String(moveFromContainerBlock).split(", ")[2]), z: Number(String(moveFromContainerBlock).split(", ")[3]) });
                let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveToContainerBlock).split(", ")[1]), y: Number(String(moveToContainerBlock).split(", ")[2]), z: Number(String(moveToContainerBlock).split(", ")[3]) });
                let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapContainerBlock).split(", ")[1]), y: Number(String(swapContainerBlock).split(", ")[2]), z: Number(String(swapContainerBlock).split(", ")[3]) });
                let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapOtherContainerBlock).split(", ")[1]), y: Number(String(swapOtherContainerBlock).split(", ")[2]), z: Number(String(swapOtherContainerBlock).split(", ")[3]) });
                let durability2 = getDurability(); /*
                for (const index in inventory.) {
                    if (Number(index) != 0) {
                    targetList = String([String(targetList), players[index].nameTag]).split(",");
                    }
                }*/
                let newItemNameTag = String(itemName).split("\\\\newline");
                try {
                    item.nameTag = newItemNameTag.join("\n");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (Boolean(setLore) == true) {
                    try {
                        item.setLore(String(itemLore).split("\\\\newline"));
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                        ;
                    }
                }
                if (Boolean(clearLore) == true) {
                    try {
                        item.setLore();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.lockMode = String(getItemLockMode(0, Number(lockMode)));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                try {
                    item.keepOnDeath = Boolean(keepOnDeath);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                try {
                    item.amount = Number(amount);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    item.setCanDestroy(String(canDestroy).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ; /*String[String(canDestroy)]*/
                ;
                try {
                    item.setCanPlaceOn(String(canPlaceOn).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ; /*
                try{item.triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}*/ //removed in 1.20.70.21
                try {
                    durability2.damage = Number(10);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (Boolean(newItem) == true) {
                    try {
                        item = new ItemStack(String(newItemType), Number(newItemCount));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    inventory.container.setItem(Number(slotNumber), item);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    durability2.damage = Number(10);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
                if (Boolean(moveItem) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let moveFromContainerB;
                    moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                    switch (moveFromContainerType) {
                        case 4:
                            moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let moveToContainerB;
                    moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                    switch (moveToContainerType) {
                        case 4:
                            moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(swapItems) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let swapContainerB;
                    swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                    switch (swapContainerType) {
                        case 4:
                            swapContainerB = swapContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let swapOtherContainerB;
                    swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                    switch (swapOtherContainerType) {
                        case 4:
                            swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(transferItem) == true) { /*
                    let moveFromSlotB: any
                    moveFromSlotB = undefined*/
                    let transferFromContainerB;
                    transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                    switch (transferFromContainerType) {
                        case 4:
                            transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let transferToContainerB;
                    transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                    switch (transferToContainerType) {
                        case 4:
                            transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(debug) == true) {
                    console.warn("Form Values", r.formValues);
                    console.warn(["Item Components: ", item.getComponents()]);
                    console.warn(item.getTags());
                    console.warn(players);
                    console.warn(players[0]);
                    console.warn(players[1]); /*
                    try {console.warn(item.getCanDestroy());} catch(e){
                        console.error(e, e.stack)};
                    try {console.warn(item.getCanPlaceOn());} catch(e){
                        console.error(e, e.stack)};*/
                    console.warn(item.isStackable);
                    console.warn(item.maxAmount);
                    console.warn(item.type);
                    console.warn(item.typeId);
                    console.warn(item.nameTag);
                    console.warn(item.getLore());
                    try {
                        console.warn(["Damage: ", durability.damage]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Damage Chance: ", durability.getDamageChance()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    try {
                        console.warn(["Max Durability: ", durability.maxDurability]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    let componentList = [item.getComponents()[0].typeId];
                    for (const index in players) {
                        if (Number(index) != 0) {
                            componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                        }
                    }
                    console.warn(String(["Item Components: " + String(componentList)]));
                }
                // Do something
            }).catch(e => {
                console.error(e, e.stack);
            });
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:playerController") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents[0]];
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
                targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerViewerB) {
            let form = new ModalFormData();
            try {
                dimension = String(playerList[playerTargetB].getSpawnPoint().dimension.id);
            }
            catch (e) {
                dimension = "";
            }
            try {
                spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
            }
            catch (e) {
                spawnXPosition = "";
            }
            try {
                spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
            }
            catch (e) {
                spawnYPosition = "";
            }
            try {
                spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
            }
            catch (e) {
                spawnZPosition = "";
            }
            let playerCurrentNameTag = "";
            try {
                playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
            }
            catch (e) {
                playerCurrentNameTag = "";
            }
            form.title("Player Controller");
            form.toggle("Change Name Tag", false);
            form.toggle("Multiline Name Tag", false);
            form.textField("Name Tag", "Name Tag", playerCurrentNameTag);
            form.textField("Trigger Event", "Trigger Event");
            form.textField("addExperience", "Experience Amount");
            form.textField("addLevels", "Level Amount");
            form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlotIndex);
            form.slider("§4Scale", 0, 10, 0.5);
            form.toggle("Is Sneaking", playerList[playerTargetB].isSneaking);
            form.toggle("Clear Velocity", false);
            form.toggle("Extinguish Fire", false);
            form.toggle("Kill", false);
            form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", false);
            form.toggle("Set On Fire", false);
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", false);
            form.toggle("Add Effect", false);
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", true);
            form.toggle("Add tag", false);
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", false);
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", false);
            form.textField("Tag To Remove", "Tag To Remove"); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", false);
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
            form.toggle("applyKnockback", false);
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", false);
            form.textField("X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
            form.textField("Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
            form.toggle("Teleport", false);
            form.textField("Teleport Dimension", "Dimension", playerList[playerTargetB].dimension.id);
            form.textField("Teleport X Coordinate", "X Coordinate", String(playerList[playerTargetB].location.x));
            form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerList[playerTargetB].location.y));
            form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerList[playerTargetB].location.z));
            form.textField("Teleport X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
            form.textField("Teleport Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
            form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], 0);
            form.toggle("Teleport - checkForBlocks", false);
            form.toggle("Teleport - keepVelocity", false);
            form.toggle("Try Teleport", false);
            form.textField("Try Teleport Dimension", "§4Dimension", playerList[playerTargetB].dimension.id);
            form.textField("Try Teleport X Coordinate", "§4X Coordinate", String(playerList[playerTargetB].location.x));
            form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", String(playerList[playerTargetB].location.y));
            form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", String(playerList[playerTargetB].location.z));
            form.toggle("Try Teleport - checkForBlocks", false);
            form.toggle("Try Teleport - keepVelocity", false);
            form.toggle("Set Operator", playerList[playerTargetB].isOp());
            form.toggle("Set Spawn Point", false);
            form.textField("Spawn Dimension", "Spawn Dimension", dimension);
            form.textField("Spawn X Coordinate", "Spawn X Coordinate", spawnXPosition);
            form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", spawnYPosition);
            form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", spawnZPosition);
            form.toggle("Start Item Cooldown", false);
            form.textField("Item Category", "Item Category");
            form.textField("Tick Duration", "Tick Duration");
            form.toggle("Send Message", false);
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", false);
            form.toggle("resetLevel", false);
            form.toggle("§4Debug", false);
            form.show(playerList[playerViewerB]).then(r => {
                if (r.canceled)
                    return;
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug] = r.formValues;
                let newNameTag = String(nameTag);
                if (Boolean(multilineNameTag) == true) {
                    newNameTag = String(nameTag).split("\\\\newline").join("\n");
                }
                /*
                            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
                            scale.value = Number(scaleValue);*/ /**/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].setOp(Boolean(setOp));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /**/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].nameTag = String(newNameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerList[playerTargetB].isSneaking = Boolean(isSneaking);
                playerList[playerTargetB].selectedSlotIndex = Number(selectedSlotIndex);
                if (Boolean(addEffect) == true) {
                    try {
                        playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), { amplifier: Number(effectAmplifier), showParticles: Boolean(effectShowEffectParticles) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerList[playerTargetB].applyImpulse({ x: Number(velocityX), y: Number(velocityY), z: Number(velocityZ) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerList[playerTargetB].applyKnockback(Number(kockbackDirectionX), Number(knockbackDirectionZ), Number(knockbackHorizontalStrength), Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerList[playerTargetB].addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerList[playerTargetB].removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerList[playerTargetB].removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setSpawnPoint) == true) {
                    try {
                        playerList[playerTargetB].setSpawnPoint({ dimension: world.getDimension(String(spawnDimension)), x: Number(spawnX), y: Number(spawnY), z: Number(spawnZ) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerList[playerTargetB].teleport({ x: Number(teleportX), y: Number(teleportY), z: Number(teleportZ) }, { checkForBlocks: Boolean(teleportCheckForBlocks), dimension: world.getDimension(String(teleportDimension)), keepVelocity: Boolean(teleportKeepVelocity), rotation: { x: Number(teleportRotX), y: Number(teleportRotY) } });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerList[playerTargetB].tryTeleport({ x: Number(tryTeleportX), y: Number(tryTeleportY), z: Number(tryTeleportZ) }, { checkForBlocks: Boolean(tryTeleportCheckForBlocks), dimension: world.getDimension(String(tryTeleportDimension)), keepVelocity: Boolean(tryTeleportKeepVelocity) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerList[playerTargetB].setRotation({ x: Number(rotX), y: Number(rotY) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetLevel) == true) {
                    try {
                        playerList[playerTargetB].resetLevel();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerList[playerTargetB].kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerList[playerTargetB].remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerList[playerTargetB].clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerList[playerTargetB].extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerList[playerTargetB].triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addExperience !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addExperience));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (setItemCooldown !== undefined) {
                    try {
                        playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addLevels !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addLevels));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(sendMessage) == true) {
                    try {
                        playerList[playerTargetB].sendMessage(String(messageToSend));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerList[playerTargetB].isSneaking = true;
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
                    if (playerList[playerTargetB].hasTag("isSneaking")) {
                      system.runInterval( () => {
                      playerList[playerTargetB].isSneaking == true
                      if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                      return
                      }
                      }, 2)
                    }*/
                }
                else {
                    try {
                        playerList[playerTargetB].removeTag("isSneaking");
                        playerList[playerTargetB].isSneaking = false;
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message2.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
            playerControllerFormPopup(playerTargetB, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Player Controller");
            form2.dropdown("Player Target", String(targetList).split(","), 0);
            form2.dropdown("Player Viewer", String(targetList).split(","), 0);
            form2.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(t => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerViewerB);
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
    }
    ;
    if (id == "andexdb:playerControllerForAdnexter8AdminsOnlyDoNotUseThisUnlessYouAreAndexter8") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents[0]];
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
                targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerViewerB) {
            let form = new ModalFormData();
            try {
                dimension = String(playerList[playerTargetB].getSpawnPoint().dimension);
            }
            catch (e) {
                dimension = "";
            }
            try {
                spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
            }
            catch (e) {
                spawnXPosition = "";
            }
            try {
                spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
            }
            catch (e) {
                spawnYPosition = "";
            }
            try {
                spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
            }
            catch (e) {
                spawnZPosition = "";
            }
            let playerCurrentNameTag = "";
            try {
                playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
            }
            catch (e) {
                playerCurrentNameTag = "";
            }
            form.title("Player Controller");
            form.toggle("Change Name Tag", false);
            form.toggle("Multiline Name Tag", false);
            form.textField("Name Tag", "Name Tag", playerCurrentNameTag);
            form.textField("Trigger Event", "Trigger Event");
            form.textField("addExperience", "Experience Amount");
            form.textField("addLevels", "Level Amount");
            form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlotIndex);
            form.slider("§4Scale", 0, 10, 0.5);
            form.toggle("Is Sneaking", playerList[playerTargetB].isSneaking);
            form.toggle("Clear Velocity", false);
            form.toggle("Extinguish Fire", false);
            form.toggle("Kill", false);
            form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", false);
            form.toggle("Set On Fire", false);
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", false);
            form.toggle("Add Effect", false);
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", true);
            form.toggle("Add tag", false);
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", false);
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", false);
            form.textField("Tag To Remove", "Tag To Remove"); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", false);
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
            form.toggle("applyKnockback", false);
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", false);
            form.textField("X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
            form.textField("Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
            form.toggle("Teleport", false);
            form.textField("Teleport Dimension", "Dimension", playerList[playerTargetB].dimension.id);
            form.textField("Teleport X Coordinate", "X Coordinate", String(playerList[playerTargetB].location.x));
            form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerList[playerTargetB].location.y));
            form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerList[playerTargetB].location.z));
            form.textField("Teleport X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
            form.textField("Teleport Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
            form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], 0);
            form.toggle("Teleport - checkForBlocks", false);
            form.toggle("Teleport - keepVelocity", false);
            form.toggle("Try Teleport", false);
            form.textField("Try Teleport Dimension", "§4Dimension", playerList[playerTargetB].dimension.id);
            form.textField("Try Teleport X Coordinate", "§4X Coordinate", String(playerList[playerTargetB].location.x));
            form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", String(playerList[playerTargetB].location.y));
            form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", String(playerList[playerTargetB].location.z));
            form.toggle("Try Teleport - checkForBlocks", false);
            form.toggle("Try Teleport - keepVelocity", false);
            form.toggle("Set Operator", playerList[playerTargetB].isOp());
            form.toggle("Set Spawn Point", false);
            form.textField("Spawn Dimension", "Spawn Dimension", dimension);
            form.textField("Spawn X Coordinate", "Spawn X Coordinate", spawnXPosition);
            form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", spawnYPosition);
            form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", spawnZPosition);
            form.toggle("Start Item Cooldown", false);
            form.textField("Item Category", "Item Category");
            form.textField("Tick Duration", "Tick Duration");
            form.toggle("Send Message", false);
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", false);
            form.toggle("resetLevel", false);
            form.toggle("§4Debug", false);
            form.show(playerList[playerViewerB]).then(r => {
                if (r.canceled)
                    return;
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug] = r.formValues;
                let newNameTag = String(nameTag);
                if (Boolean(multilineNameTag) == true) {
                    newNameTag = String(nameTag).split("\\\\newline").join("\n");
                }
                /*
                            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
                            scale.value = Number(scaleValue);*/
                playerList[playerTargetB].setOp(Boolean(setOp));
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].nameTag = String(newNameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerList[playerTargetB].isSneaking = Boolean(isSneaking);
                playerList[playerTargetB].selectedSlotIndex = Number(selectedSlotIndex);
                if (Boolean(addEffect) == true) {
                    try {
                        playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), { amplifier: Number(effectAmplifier), showParticles: Boolean(effectShowEffectParticles) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerList[playerTargetB].applyImpulse({ x: Number(velocityX), y: Number(velocityY), z: Number(velocityZ) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerList[playerTargetB].applyKnockback(Number(kockbackDirectionX), Number(knockbackDirectionZ), Number(knockbackHorizontalStrength), Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerList[playerTargetB].addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerList[playerTargetB].removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerList[playerTargetB].removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setSpawnPoint) == true) {
                    try {
                        playerList[playerTargetB].setSpawnPoint({ dimension: world.getDimension(String(spawnDimension)), x: Number(spawnX), y: Number(spawnY), z: Number(spawnZ) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerList[playerTargetB].teleport({ x: Number(teleportX), y: Number(teleportY), z: Number(teleportZ) }, { checkForBlocks: Boolean(teleportCheckForBlocks), dimension: world.getDimension(String(teleportDimension)), keepVelocity: Boolean(teleportKeepVelocity), rotation: { x: Number(teleportRotX), y: Number(teleportRotY) } });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerList[playerTargetB].tryTeleport({ x: Number(tryTeleportX), y: Number(tryTeleportY), z: Number(tryTeleportZ) }, { checkForBlocks: Boolean(tryTeleportCheckForBlocks), dimension: world.getDimension(String(tryTeleportDimension)), keepVelocity: Boolean(tryTeleportKeepVelocity) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerList[playerTargetB].setRotation({ x: Number(rotX), y: Number(rotY) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetLevel) == true) {
                    try {
                        playerList[playerTargetB].resetLevel();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerList[playerTargetB].kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerList[playerTargetB].remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerList[playerTargetB].clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerList[playerTargetB].extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerList[playerTargetB].triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addExperience !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addExperience));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (setItemCooldown !== undefined) {
                    try {
                        playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addLevels !== undefined) {
                    try {
                        playerList[playerTargetB].addLevels(Number(addLevels));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(sendMessage) == true) {
                    try {
                        playerList[playerTargetB].sendMessage(String(messageToSend));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerList[playerTargetB].isSneaking = true;
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
                    if (playerList[playerTargetB].hasTag("isSneaking")) {
                      system.runInterval( () => {
                      playerList[playerTargetB].isSneaking == true
                      if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                      return
                      }
                      }, 2)
                    }*/
                }
                else {
                    try {
                        playerList[playerTargetB].isSneaking = false;
                        playerList[playerTargetB].removeTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message2.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
            playerControllerFormPopup(playerTargetB, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Player Controller");
            form2.dropdown("Player Target", String(targetList).split(","), 0);
            form2.dropdown("Player Viewer", String(targetList).split(","), 0);
            form2.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(t => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerViewerB);
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
    }
    ;
    if (id == "andexdb:scriptEvalRunWindow") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Script Evaluate Run Window");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        forceShow(form, sourceEntity).then(ro => {
            let r = ro;
            if (r.canceled)
                return;
            let runScriptForEval = r.formValues;
            eval(String(runScriptForEval.join("\n")));
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:editEntityDynamicProperty") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Edit Entity Dynamic Property");
        form.textField("Target Selector", "Target Selector");
        form.textField("Dynamic Property Id", "Dynamic Property Id");
        forceShow(form, sourceEntity).then(ro => {
            let r = ro;
            if (r.canceled)
                return;
            let [ts, dpi] = r.formValues;
            let form2 = new ModalFormData();
            form2.title("Edit Entity Dynamic Property");
            form2.textField("New Value", "New Value", String(targetSelectorB(String(ts), "", (Number(world.getAllPlayers()[0].id) ?? Number(world.getDimension("overworld").getEntities()[0].id) ?? Number(world.getDimension("nether").getEntities()[0].id) ?? Number(world.getDimension("the_end").getEntities()[0].id))).getDynamicProperty(String(dpi))));
            forceShow(form2, sourceEntity).then(ro2 => {
                let r2 = ro2;
                if (r2.canceled)
                    return;
                let [newValue] = r.formValues;
                String(targetSelectorB(String(ts), "", (Number(world.getAllPlayers()[0].id) ?? Number(world.getDimension("overworld").getEntities()[0].id) ?? Number(world.getDimension("nether").getEntities()[0].id) ?? Number(world.getDimension("the_end").getEntities()[0].id))).setDynamicProperty(String(dpi), String(newValue)));
            }).catch(e => {
                console.error(e, e.stack);
            });
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    ;
    if (id == "andexdb:editWorldDynamicProperty") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Edit World Dynamic Property");
        form.textField("Dynamic Property Id", "Dynamic Property Id");
        forceShow(form, sourceEntity).then(ro => {
            let r = ro;
            if (r.canceled)
                return;
            let [dpi] = r.formValues;
            let form2 = new ModalFormData();
            form2.title("Edit World Dynamic Property");
            form2.textField("New Value", "New Value", String(world.getDynamicProperty(String(dpi))));
            forceShow(form2, sourceEntity).then(ro2 => {
                let r2 = ro2;
                if (r2.canceled)
                    return;
                let [newValue] = r.formValues;
                world.setDynamicProperty(String(dpi), String(newValue));
            }).catch(e => {
                console.error(e, e.stack);
            });
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    ;
    if (id == "andexdb:debugStick" || id == "andexdb:editorStick") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let block = sourceEntity.getBlockFromViewDirection();
        let block2 = block.block;
        let allCoordinates = [];
        if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
            allCoordinates = message.slice(12).split("|");
            block2 = world.getDimension(allCoordinates[0]).getBlock({ x: allCoordinates[1], y: allCoordinates[2], z: allCoordinates[3] });
        }
        form.title("Editor Stick");
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
                blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        } /*
        for (const index in block.block.permutation.getAllStates()) {*/ /*
            console.warn(index);*/ /*
        if (Number(index) != 0) {*/ /*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
    }*/ /*
        console.warn(targetList);*/ /*
    }*/
        try {
            form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + mcMath.Vector3Utils.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId);
        }
        catch (e) {
            console.error(e, e.stack);
            form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");
        } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
        form.toggle("setType Enabled", false);
        try {
            form.textField("List Of Block Properties: " + blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state");
        }
        catch (e) {
            console.error(e, e.type /*e.stack*/);
            console.warn("test: " + String(e).slice(67) /*e.stack*/);
            form.textField("Block Property Identifier", "bool_state, num_state, str_state");
        }
        form.textField("Block Property Value", "true, 1, \"North\"");
        form.toggle("setProperty Enabled", false); /*
        try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
        /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
        form.slider("Selected Slot", 0, 56, 1)*/
        form.toggle("isWaterlogged", block2.isWaterlogged); /*
        form.toggle("Clear Velocity", false)*/
        form.toggle("Debug", false); /*
        let rawtextf = "["
        function evalRawText(rawtextf: string, rt: RawMessage){
            
        rawtextf = rawtextf + "{"
        let ic = 0;
        if(rt?.rawtext != undefined){
            rawtextf = rawtextf + "["
            rt?.rawtext.forEach((rt, ib)=>{
                rawtextf = evalRawText(rawtextf, rt);
            });
            rawtextf = rawtextf + "]"
        }
        if(rt?.score != undefined){
            if(ic == 0){
                ic = 1
                rawtextf = rawtextf + "score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
            }else{
                rawtextf = rawtextf + ", score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
            }
        }
        if(rt?.text != undefined){
            if(ic == 0){
                ic = 1
                rawtextf = rawtextf + "text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
            }else{
                rawtextf = rawtextf + ", text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
            }
        }
        if(rt?.translate != undefined){
            if(ic == 0){
                ic = 1
                rawtextf = rawtextf + "translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
            }else{
                rawtextf = rawtextf + ", translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
            }
        }
        if(rt?.with != undefined){
            if(typeof rt.with == typeof ["hisa", "sahi"]){
                let abdc: string[]
                abdc = [];
                Array((rt.with as string[])).forEach((rtwh)=>{abdc.push("\"" + String(rtwh).replaceAll("\"", "\\\"") + "\""); });
                if(ic == 0){
                    ic = 1
                    rawtextf = rawtextf + "with: [" + abdc.join(", ") + "]}"
                }else{
                    rawtextf = rawtextf + ", with: [" + abdc.join(", ") + "]}"
                }
            }
        }
        rawtextf = rawtextf + "}"
        return rawtextf
        }
        block2.getComponent("sign").getRawText(SignSide.Front)?.rawtext.forEach((rt, i)=>{
            rawtextf = evalRawText(rawtextf, rt);
        });
        rawtextf = rawtextf + "]"*/
        try {
            if (block2.getComponent("fluidContainer") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluidContainer").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluidContainer").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluidContainer").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluidContainer").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, `${block2.getComponent("fluidContainer").fluidColor.red}, ${block2.getComponent("fluidContainer").fluidColor.green}, ${block2.getComponent("fluidContainer").fluidColor.blue}, ${block2.getComponent("fluidContainer").fluidColor.alpha}`);
                form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluidContainer").fillLevel}`, 0, 6, 1, block2.getComponent("fluidContainer").fillLevel);
                form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluidContainer").getFluidType() == "Potion"}`, `item type`);
            }
            else {
                form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
                form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0);
                form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0);
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontRawText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)));
        }
        else {
            form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackRawText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)));
        }
        else {
            form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front));
        }
        else {
            form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back));
        }
        else {
            form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontTextColor Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front));
        }
        else {
            form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackTextColor Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back));
        }
        else {
            form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed);
        forceShow(form, playerList[playerList.findIndex((x) => x == sourceEntity)]).then(ro => {
            let r = ro;
            if (r.canceled)
                return;
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*,
            selectedSlotIndex*/, isWaterlogged /*,
            clearVelocity*/, debug, fluidContainerColor, fluidContainerFillLevel, potionType, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (block2.getComponent("fluidContainer") != undefined) {
                if ((c => `${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluidContainer").fluidColor) != fluidContainerColor.split(",").map(v => v.trim()).join()) {
                    block2.getComponent("fluidContainer").fluidColor = { red: fluidContainerColor.split(",")[0].toNumber(), green: fluidContainerColor.split(",")[1].toNumber(), blue: fluidContainerColor.split(",")[2].toNumber(), alpha: fluidContainerColor.split(",")[3].toNumber() };
                }
                ;
                if (fluidContainerFillLevel != block2.getComponent("fluidContainer").fillLevel) {
                    block2.getComponent("fluidContainer").fillLevel = fluidContainerFillLevel;
                }
                ;
                if (potionType != "") {
                    block2.getComponent("fluidContainer").setPotion(new ItemStack(potionType, 255));
                }
                ;
            }
            ;
            if (signFrontRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
            }
            if (signBackRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back);
            }
            if (signFrontTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
            }
            if (signBackTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
            }
            if (block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed));
            }
            DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server. 
            if (signFrontTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back);
            }
            if (signBackTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front);
            }
            for (let index in blockPropertyValueArray) {
                if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
                    blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1));
                }
                else {
                    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
                        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                    }
                    else {
                        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
                            blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                        }
                        else {
                            if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]);
                            }
                        }
                    }
                }
            }
            ; /*
        if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
            blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
        } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
            blockPropertyValue2 = Number(blockPropertyValue)
        } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
            blockPropertyValue2 = Boolean(blockPropertyValue)
        } else {
            if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
                blockPropertyValue2 = String(blockPropertyValue)
            }}}}*/
            if (setTypeEnabled == true) {
                try {
                    block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            ; /*
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
            if (setPropertyEnabled == true) {
                switch (blockPropertyValueLength) {
                    case 1:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 2:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 3:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 4:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 5:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 6:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 7:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 8:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 9:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 10:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    default:
                        break; /*
                    break;*/
                }
            }
            ;
            try {
                block2.setWaterlogged(Boolean(isWaterlogged));
            }
            catch (e) {
                console.error(e, e.stack);
            } /*
            GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
              
                test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
              
              })
                .maxTicks(400)
                .structureName("gametests:mediumglass");*/ /*
        sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
            /*BlockType.arguments({id: "minecraft:grass"})*/
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:evalAutoScriptSettings") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        form2.title("Eval Auto Script Settings");
        form2.textField("evalBeforeEvents:chatSend", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:chatSend") ?? ""));
        form2.textField("evalBeforeEvents:dataDrivenEntityTrggerEvent", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent") ?? ""));
        form2.textField("evalBeforeEvents:effectAdd", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:effectAdd") ?? ""));
        form2.textField("evalBeforeEvents:entityRemove", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:entityRemove")));
        form2.textField("evalBeforeEvents:explosion", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:explosion")));
        form2.textField("evalBeforeEvents:itemDefinitionEvent", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent") ?? ""));
        form2.textField("evalBeforeEvents:itemUse", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemUse") ?? ""));
        form2.textField("evalBeforeEvents:itemUseOn", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemUseOn") ?? ""));
        form2.textField("evalBeforeEvents:pistonActivate", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:pistonActivate") ?? ""));
        form2.textField("evalBeforeEvents:playerBreakBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerBreakBlock") ?? ""));
        form2.textField("evalBeforeEvents:playerInteractWithBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock") ?? ""));
        form2.textField("evalBeforeEvents:playerInteractWithEntity", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity") ?? ""));
        form2.textField("evalBeforeEvents:playerLeave", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerLeave") ?? ""));
        form2.textField("evalBeforeEvents:playerPlaceBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock") ?? ""));
        form2.textField("evalAfterEvents:blockExplode", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:blockExplode") ?? ""));
        form2.textField("evalAfterEvents:playerLeave", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:playerLeave") ?? ""));
        form2.textField("evalAfterEvents:entityDie", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:entityDie") ?? "")); /*
        form2.textField("Slot Number", "Slot Number", "0");
        form2.dropdown("Player Target", String(targetList).split(","), 0)
        form2.dropdown("Player Viewer", String(targetList).split(","), 0)
        form2.toggle("Debug2", false);*/
        forceShow(form2, event.sourceEntity).then(to => {
            let t = to;
            if (t.canceled)
                return;
            let [becs, beddete, beea, beer, bee, beide, beiu, beiuo, bepa, bepbb, bepiwb, bepiwe, bepl, beppb, aebe, aepl, aeed] = t.formValues;
            world.setDynamicProperty("evalBeforeEvents:chatSend", becs);
            world.setDynamicProperty("evalBeforeEvents:dataDrivenEntityTrggerEvent", beddete);
            world.setDynamicProperty("evalBeforeEvents:effectAdd", beea);
            world.setDynamicProperty("evalBeforeEvents:entityRemove", beer);
            world.setDynamicProperty("evalBeforeEvents:explosion", bee);
            world.setDynamicProperty("evalBeforeEvents:itemDefinitionEvent", beide);
            world.setDynamicProperty("evalBeforeEvents:itemUse", beiu);
            world.setDynamicProperty("evalBeforeEvents:itemUseOn", beiuo);
            world.setDynamicProperty("evalBeforeEvents:pistonActivate", bepa);
            world.setDynamicProperty("evalBeforeEvents:playerBreakBlock", bepbb);
            world.setDynamicProperty("evalBeforeEvents:playerInteractWithBlock", bepiwb);
            world.setDynamicProperty("evalBeforeEvents:playerInteractWithEntity", bepiwe);
            world.setDynamicProperty("evalBeforeEvents:playerLeave", bepl);
            world.setDynamicProperty("evalBeforeEvents:playerPlaceBlock", beppb);
            world.setDynamicProperty("evalAfterEvents:blockExplode", aebe);
            world.setDynamicProperty("evalAfterEvents:playerLeave", aepl);
            world.setDynamicProperty("evalAfterEvents:entityDie", aeed);
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:settings") { /*
        let form = new ActionFormData();
        let players = world.getPlayers();
    form.title("Settings");
    form.body("Choose menu to open. ");
    form.button("Global Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Eval Auto Execute Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Personal Settings", "textures/ui/settings_glyph_color_2x");*/ /*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/ /*
    forceShow(form, (sourceEntity as Player)).then(ra => {let r = (ra as ActionFormResponse);
        // This will stop the code when the player closes the form
        if (r.canceled) return;
    
        let response = r.selection;
        switch (response) {
            case 0:
                
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:globalSettings saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
                // Do something when button 1 is pressed
                // Don't forget "break" for every case
                break;
    
            case 1:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:evalAutoScriptSettings saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
            case 2:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:personalSettings saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;
    
                // You can add cases for each button
            default:
                // Use this when your button doesn't have a function yet
                // You don't need to use "break" on default case
                // Remember to place the default on very bottom
        }
    }).catch(e => {
        console.error(e, e.stack);
    });*/
        settings(sourceEntity);
    }
    if (id == "andexdb:globalSettings") { /*
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag]
        for (const index in players) {
            if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }"andexdbSettings:autoEscapeChatMessages"
        "andexdbSettings:autoURIEscapeChatMessages"
        "andexdbSettings:allowChatEscapeCodes"
        form2.title("Global Settings")
        form2.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"));
        form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
        form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
        form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));
        form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn locations for the gametest structure, this is used when spawning in no ai entities or spawning in simulated player", "x, y, z", Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {}).join(", "));
        form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));
        form2.toggle("§l§fdisableCustomChatMessages§r§f\nDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
        form2.toggle("§l§fsendMessageOnInvalidChatCommand§r§f\nMakes the chat command still send as a chat message if that specific chat command does not exist, default is false", Boolean(world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false));
        form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\nAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
        form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
        form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
        form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
        form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));
        forceShow(form2, (event.sourceEntity as any)).then(to => {
            let t = (to as ModalFormResponse)
            if (t.canceled) return;*/ /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
    ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*

    let [ chatCommandPrefix, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix, gametestStructureDefaultSpawnLocation, chatCommandsEnbaled, disableCustomChatMessages, sendMessageOnInvalidChatCommand, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, autoSavePlayerData, bepl, beppb, aebe, aepl ] = t.formValues;
    world.setDynamicProperty("andexdbSettings:chatCommandPrefix", chatCommandPrefix)
    world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes)
    world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix)
    world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix)
    if(String(gametestStructureDefaultSpawnLocation) != ""){world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2])})}
    world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled)
    world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)
    world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand)
    world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
    world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
    world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
    world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
    world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData)
}).catch(e => {
console.error(e, e.stack);
});*/
        globalSettings(sourceEntity);
    }
    if (id == "andexdb:personalSettings") { /*
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag]
        for (const index in players) {
            if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }"andexdbSettings:autoEscapeChatMessages"
        "andexdbSettings:autoURIEscapeChatMessages"
        "andexdbSettings:allowChatEscapeCodes"
        form2.title("Personal Settings")
        form2.textField("§l§fTime Zone§r§f\nTime zone as hour for difference from UTC (decimals are allowed), the default is 0. ", "number", String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0));*/ /*
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn locations for the gametest structure, this is used when spawning in no ai entities or spawning in simulated player", "x, y, z", Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {}).join(", "));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\nDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fsendMessageOnInvalidChatCommand§r§f\nMakes the chat command still send as a chat message if that specific chat command does not exist, default is false", Boolean(world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\nAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));*/ /*
    forceShow(form2, (event.sourceEntity as any)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;*/ /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
    ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*

    let [ timeZone, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix, gametestStructureDefaultSpawnLocation, chatCommandsEnbaled, disableCustomChatMessages, sendMessageOnInvalidChatCommand, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, autoSavePlayerData, bepl, beppb, aebe, aepl ] = t.formValues;
    sourceEntity.setDynamicProperty("andexdbPersonalSettings:timeZone", timeZone)*/ /*
    world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes)
    world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix)
    world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix)
    if(String(gametestStructureDefaultSpawnLocation) != ""){world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2])})}
    world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled)
    world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)
    world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand)
    world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
    world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
    world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
    world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
    world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData)*/ /*
}).catch(e => {
console.error(e, e.stack);
});*/
        personalSettings(sourceEntity);
    }
    if (id == "andexdb:customFormUIEditor") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        let formId = event.message ?? "test1234";
        let form = editCustomFormUI(formId);
        forceShow(form.form, event.sourceEntity).then(to => {
            let t = to;
            if (t.canceled)
                return;
            world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`);
            let elementValues = t.formValues.slice(2, -2);
            console.warn(elementValues);
            elementValues.forEach((v, i) => {
                switch (i % 5) {
                    case 0:
                        world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i + 1, i + 4).join("|")}`);
                        break;
                    case 4:
                        if (Boolean(v) == true) {
                            world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`);
                        }
                        ;
                        break;
                }
            });
            if (t.formValues[t.formValues.length - 2]) {
                world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length - 1]) ?? ((form.indexList[form.indexList.length - 1] ?? -1) + 1))}`, "");
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:customUISelector") {
        customFormListSelectionMenu(event.sourceEntity);
    }
    if (id == "andexdb:showCustomUI") {
        showCustomFormUI(event.message, event.sourceEntity);
    }
    if (id == "andexdb:debugStickMenuB" || id == "andexdb:editorStickMenuB") { /*
        let form = new ModalFormData();
        let playerList = world.getPlayers()
        form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id))
        form.textField("Block X", "Block X", String(sourceEntity.location.x))
        form.textField("Block Y", "Block Y", String(sourceEntity.location.y))
        form.textField("Block Z", "Block Z", String(sourceEntity.location.z))
  
    form.show(sourceEntity as Player).then(r => {
        if (r.canceled) return;
    
        let [ blockDimension, blockX, blockY, blockZ ] = r.formValues;
        let blockPropertyValue2: any
        event.sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:"*/ /*"aslk"*/ /* + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ)
}).catch(e => {
  console.error(e, e.stack);
});*/
        editorStickMenuB(sourceEntity);
    }
    if (id == "andexdb:debugStickMenuC" || id == "andexdb:editorStickMenuC") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        form.toggle("includeLiquidBlocks", true);
        form.toggle("includePassableBlocks", true);
        form.textField("maxDistance ( Optional )", "maxDistance ( Optional )");
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
            if (r.canceled)
                return;
            let [includeLiquidBlocks, includePassableBlocks, maxDistance] = r.formValues;
            let blockPropertyValue2;
            console.warn(maxDistance);
            if (maxDistance !== "") {
                console.warn("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ + String(includeLiquidBlocks) + "|" + String(includePassableBlocks) + "|" + String(maxDistance));
                event.sourceEntity.runCommand("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ + String(includeLiquidBlocks) + "|" + String(includePassableBlocks) + "|" + String(maxDistance));
            }
            else {
                event.sourceEntity.runCommand("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ + String(includeLiquidBlocks) + "|" + String(includePassableBlocks));
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:debugStickB" || id == "andexdb:editorStickB") { /*
        let form = new ModalFormData();
        let playerList = world.getPlayers()*/ /*
    let block = sourceEntity.getBlockFromViewDirection({includeLiquidBlocks: true, includePassableBlocks: true})*/ /*
    let block2: Block*/ /* = block.block*/ /*
    let allCoordinates = []
    if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) { allCoordinates = message.slice(12).split("|");  block2 = world.getDimension(String(allCoordinates[0])).getBlock({x: Number(allCoordinates[1]), y: Number(allCoordinates[2]), z: Number(allCoordinates[3])})}
    form.title("Editor Stick B");
    let blockStatesFullList: any*/ /*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/ /*
    try {BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates()); } catch(e){if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";} else  {blockStatesFullList = "§r§cThis block has no block states. §f";}}*/ /*
    for (const index in block.block.permutation.getAllStates()) {*/ /*
        console.warn(index);*/ /*
    if (Number(index) != 0) {*/ /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
    console.warn(targetList);*/ /*
}*/ /*
    try { form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nsetType", "Block Type", block2.typeId) } catch(e){console.error(e, e.stack); form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");}*/ /*Error: Failed To resolve block "minecraft:bedrock" with properties */ /*
    form.toggle("setType Enabled", false)
    try {form.textField("List Of Block Properties: " + blockStatesFullList*/ /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ /* + "\nBlock Property Identifier", "bool_state, num_state, str_state") } catch(e){console.error(e, e.type*/ /*e.stack*/ /*); console.warn("test: " + String(e).slice(67)*/ /*e.stack*/ /*); form.textField("Block Property Identifier", "bool_state, num_state, str_state");}
    form.textField("Block Property Value", "true, 1, \"North\"")
    form.toggle("setProperty Enabled", false)*/ /*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
        /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
        form.slider("Selected Slot", 0, 56, 1)*/ /*
        form.toggle("isWaterlogged", block2.isWaterlogged)*/ /*
        form.toggle("Clear Velocity", false)*/ /*
        form.toggle("Debug", false)
        form.toggle("setWaterContainerProperties Enabled", false)
        try{if(block2.getComponent("waterContainer") != undefined){form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`)}else{form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`)}}catch{form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`)}
        form.toggle("setSnowContainerProperties Enabled", false)
        if(block2.getComponent("snowContainer") != undefined){form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`)}else{form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`)}
        form.toggle("setLavaContainerProperties Enabled", false)
        if(block2.getComponent("lavaContainer") != undefined){form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`)}else{form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`)}
        form.toggle("setPotionContainerProperties Enabled", false)
        if(block2.getComponent("potionContainer") != undefined){form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`)}else{form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`)}
        form.toggle("setSignFrontRawText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)))}else{form.textField(`§4Sign Front RawText`, `§r§4Unavailable`)}
        form.toggle("setSignBackRawText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)))}else{form.textField(`§4Sign Back RawText`, `§r§4Unavailable`)}
        form.toggle("setSignFrontText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front))}else{form.textField(`§4Sign Front Text`, `§r§4Unavailable`)}
        form.toggle("setSignBackText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back))}else{form.textField(`§4Sign Back Text`, `§r§4Unavailable`)}
        form.toggle("setSignFrontTextColor Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front))}else{form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`)}
        form.toggle("setSignBackTextColor Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back))}else{form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`)}
        form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed)
  
    form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
        if (r.canceled) return;
    
        let [ setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled*/ /*, selectedSlotIndex*/ /*, isWaterlogged/*, clearVelocity*/ //, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed ] = r.formValues;
        /*let blockPropertyValue2: any
        blockPropertyValue2 = ""
        let blockPropertyValueArray: Array<any>
        blockPropertyValueArray = String(blockPropertyValue).split(", ")
        let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length
        if(waterContainerEnabled && block2.getComponent("waterContainer") != undefined){block2.getComponent("waterContainer").setCustomColor({red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3])}); block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]); }
        if(snowContainerEnabled && block2.getComponent("snowContainer") != undefined){block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]); }
        if(lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined){block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]); }
        if(potionContainerEnabled && block2.getComponent("potionContainer") != undefined){block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]); block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255)); }
        if(signFrontRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/ //){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front); }
        //if(signBackRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back); }
        //if(signFrontTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front); }
        //if(signBackTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back); }
        //if(block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed)); }
        /*DyeColor.Blue//make it save this DyeColor in the imports from @minecraft/server.
        if(signFrontTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/ //){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back); }
        //if(signBackTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front); }
        /*for (let index in blockPropertyValueArray) {
        if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
            blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1))
        } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
            blockPropertyValueArray[index] = Number(blockPropertyValueArray[index])
        } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
            blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index])
        } else {
            if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                blockPropertyValueArray[index] = String(blockPropertyValueArray[index])
            }}}} };
        if (setTypeEnabled == true) { try { block2.setType(BlockTypes.get(String(setType))/*String(setType)*/ //) } catch(e){console.error(e, e.stack)} }; 
        /*if (setPropertyEnabled == true) { switch(blockPropertyValueLength) {
            case 1:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] })/*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/ // ) } catch ( e ) { console.error(e, e.stack) }
        /*break;
        case 2:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 3:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 4:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 5:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 6:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 7:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 8:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 9:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 10:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        default:
        break;/*
        break;*/
        /*} };
        try { block2.setWaterlogged(Boolean(isWaterlogged)) } catch ( e ) { console.error(e, e.stack) }/*
        GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
          
            test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
          
          })
            .maxTicks(400)
            .structureName("gametests:mediumglass");*/ /*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
        /*BlockType.arguments({id: "minecraft:grass"})*/
        // Do something
        /*}).catch(e => {
            console.error(e, e.stack);
        });*/
        let block2; /* = block.block*/
        let allCoordinates = [];
        if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
            allCoordinates = message.slice(12).split("|");
            block2 = world.getDimension(String(allCoordinates[0])).getBlock({ x: Number(allCoordinates[1]), y: Number(allCoordinates[2]), z: Number(allCoordinates[3]) });
        }
        else {
            try {
                block2 = sourceEntity.getBlockFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true }).block;
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        editorStickB(sourceEntity, block2);
    }
    if (id == "andexdb:debugStickC" || id == "andexdb:editorStickC") {
        let form = new ModalFormData();
        let includeLiquidBlocks = false;
        let includePassableBlocks = false;
        let maxDistance = undefined;
        let allSettings = [];
        if (message.startsWith("options:") && message.includes("|") && (message.slice(8).split("|").length == 3 || message.slice(8).split("|").length == 2)) {
            allSettings = message.slice(8).split("|"); /*
            console.warn(allSettings)*/
            includeLiquidBlocks = Boolean(allSettings[0]);
            includePassableBlocks = Boolean(allSettings[1]);
            if (allSettings.length == 3) {
                try {
                    maxDistance = Number(allSettings[2]);
                }
                catch (e) {
                    maxDistance = undefined;
                }
            }
        } /*
        console.warn(maxDistance)*/
        let playerList = world.getPlayers();
        let block = sourceEntity.getBlockFromViewDirection({ includeLiquidBlocks: includeLiquidBlocks, includePassableBlocks: includePassableBlocks, maxDistance: maxDistance });
        let block2 = block.block;
        form.title("Editor Stick C");
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
                blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        } /*
        for (const index in block.block.permutation.getAllStates()) {*/ /*
            console.warn(index);*/ /*
        if (Number(index) != 0) {*/ /*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
    }*/ /*
        console.warn(targetList);*/ /*
    }*/
        try {
            form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + mcMath.Vector3Utils.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId);
        }
        catch (e) {
            console.error(e, e.stack);
            form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");
        } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
        form.toggle("setType Enabled", false);
        try {
            form.textField("List Of Block Properties: " + blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state");
        }
        catch (e) {
            console.error(e, e.type /*e.stack*/);
            console.warn("test: " + String(e).slice(67) /*e.stack*/);
            form.textField("Block Property Identifier", "bool_state, num_state, str_state");
        }
        form.textField("Block Property Value", "true, 1, \"North\"");
        form.toggle("setProperty Enabled", false); /*
        try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
        /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
        form.slider("Selected Slot", 0, 56, 1)*/
        form.toggle("isWaterlogged", block2.isWaterlogged); /*
        form.toggle("Clear Velocity", false)*/
        form.toggle("Debug", false);
        form.toggle("setWaterContainerProperties Enabled", false);
        try {
            if (block2.getComponent("fluidContainer") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluidContainer").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluidContainer").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluidContainer").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluidContainer").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, `${block2.getComponent("fluidContainer").fluidColor.red}, ${block2.getComponent("fluidContainer").fluidColor.green}, ${block2.getComponent("fluidContainer").fluidColor.blue}, ${block2.getComponent("fluidContainer").fluidColor.alpha}`);
                form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluidContainer").fillLevel}`, 0, 6, 1, block2.getComponent("fluidContainer").fillLevel);
                form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluidContainer").getFluidType() == "Potion"}`, `item type`);
            }
            else {
                form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
                form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0);
                form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0);
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontRawText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)));
        }
        else {
            form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackRawText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)));
        }
        else {
            form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front));
        }
        else {
            form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackText Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back));
        }
        else {
            form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontTextColor Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front));
        }
        else {
            form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackTextColor Enabled", false);
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back));
        }
        else {
            form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed);
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
            if (r.canceled)
                return;
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*,
            selectedSlotIndex*/, isWaterlogged /*,
            clearVelocity*/, debug, fluidContainerColor, fluidContainerFillLevel, potionType, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (block2.getComponent("fluidContainer") != undefined) {
                if ((c => `${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluidContainer").fluidColor) != fluidContainerColor.split(",").map(v => v.trim()).join()) {
                    block2.getComponent("fluidContainer").fluidColor = { red: fluidContainerColor.split(",")[0].toNumber(), green: fluidContainerColor.split(",")[1].toNumber(), blue: fluidContainerColor.split(",")[2].toNumber(), alpha: fluidContainerColor.split(",")[3].toNumber() };
                }
                ;
                if (fluidContainerFillLevel != block2.getComponent("fluidContainer").fillLevel) {
                    block2.getComponent("fluidContainer").fillLevel = fluidContainerFillLevel;
                }
                ;
                if (potionType != "") {
                    block2.getComponent("fluidContainer").setPotion(new ItemStack(potionType, 255));
                }
                ;
            }
            ;
            if (signFrontRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
            }
            if (signBackRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back);
            }
            if (signFrontTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
            }
            if (signBackTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
            }
            if (block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed));
            }
            DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server. 
            if (signFrontTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back);
            }
            if (signBackTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front);
            }
            for (let index in blockPropertyValueArray) { /*
                console.warn(blockPropertyValueArray)*/ /*
            console.warn(blockPropertyValueArray[index])*/
                if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
                    console.warn("string");
                    blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1)); /*
                    console.warn(blockPropertyValueArray[index])*/
                }
                else {
                    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
                        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                    }
                    else {
                        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
                            blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                        }
                        else {
                            if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]); /*
                                console.warn("other")*/
                            }
                        }
                    }
                }
            }
            ; /*
        if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
            blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
        } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
            blockPropertyValue2 = Number(blockPropertyValue)
        } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
            blockPropertyValue2 = Boolean(blockPropertyValue)
        } else {
            if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
                blockPropertyValue2 = String(blockPropertyValue)
            }}}}*/
            if (setTypeEnabled == true) {
                try {
                    block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            ; /*
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
            if (setPropertyEnabled == true) {
                switch (blockPropertyValueLength) {
                    case 1:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 2:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 3:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 4:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 5:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 6:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 7:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 8:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 9:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 10:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    default:
                        break; /*
                    break;*/
                }
            }
            ;
            try {
                block2.setWaterlogged(Boolean(isWaterlogged));
            }
            catch (e) {
                console.error(e, e.stack);
            } /*
            GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
              
                test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
              
              })
                .maxTicks(400)
                .structureName("gametests:mediumglass");*/ /*
        sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
            /*BlockType.arguments({id: "minecraft:grass"})*/
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:debugScreen") {
        let form = new ModalFormData();
        let players = world.getPlayers();
        let block = sourceEntity.getBlockFromViewDirection();
        let entity = sourceEntity.getEntitiesFromViewDirection();
        form.title("Debug Screen");
        form.textField("setType", "Block Type");
        form.textField("Block Property Identifier", "Trigger Event");
        form.textField("Block Property Value", "Trigger Event");
        /*form.dropdown("Block Permutation To Set", block.getTags())*/
        form.slider("Selected Slot", 0, 56, 1);
        form.toggle("isWaterlogged", false);
        form.toggle("Clear Velocity", false);
        form.toggle("Debug", false);
        form.show(players[players.findIndex((x) => x == sourceEntity)]).then(r => {
            if (r.canceled)
                return;
            let [setType, blockPropertyIdentifier, blockPropertyValue, toggle] = r.formValues;
            players[players.findIndex((x) => x == sourceEntity)].onScreenDisplay.setActionBar("");
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:entityController") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents[0]];
        let entity2;
        try {
            entity2 = playerList[0].getEntitiesFromViewDirection();
        }
        catch (e) { }
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
                targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB) {
            let form = new ModalFormData(); /*
            try {dimension = String(playerTargetB.getSpawnPoint().dimension);} catch(e){dimension = ""}
            try {spawnXPosition = String(playerTargetB.getSpawnPoint().x);} catch(e){spawnXPosition = ""}
            try {spawnYPosition = String(playerTargetB.getSpawnPoint().y);} catch(e){spawnYPosition = ""}
            try {spawnZPosition = String(playerTargetB.getSpawnPoint().z);} catch(e){spawnZPosition = ""}*/
            form.title("Entity Controller");
            form.toggle("TypeId: " + playerTargetB.typeId + "\nId: " + playerTargetB.id + "\nIsFalling: " + playerTargetB.isFalling + "\nIsValid: " + playerTargetB.isValid() + "\nTarget: " + playerTargetB.target + "\nX: " + "\nDimension: " + playerTargetB.dimension + "\nX: " + playerTargetB.location.x + "\nY: " + playerTargetB.location.y + "\nZ: " + playerTargetB.location.z + "\nChange Name Tag", false);
            form.textField("Name Tag", "Name Tag", playerTargetB.nameTag);
            form.textField("Trigger Event", "Trigger Event");
            form.toggle("Set Property", false);
            form.textField("Property Identifier", "Property Identifier");
            form.textField("Property Value", "Property Value");
            form.toggle("Reset Property", false);
            form.textField("Property Identifier", "Property Identifier");
            form.toggle("Set Dynamic Property", false);
            form.textField("Dynamic Property Identifier", "Dynamic Property Identifier");
            form.textField("Dynamic Property Value", "Dynamic Property Value");
            form.toggle("Remove Dynamic Property", false);
            form.textField("Dynamic Property Identifier", "Dynamic Property Identifier");
            form.slider("§4Scale", 0, 10, 0.5);
            form.toggle("Is Sneaking", playerTargetB.isSneaking);
            form.toggle("Clear Velocity", false);
            form.toggle("Extinguish Fire", false);
            form.toggle("Kill", false);
            form.toggle("Remove", false);
            form.toggle("Set On Fire", false);
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", false);
            form.toggle("Add Effect", false);
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", true);
            form.toggle("Add tag", false);
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", false);
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", false);
            form.textField("Tag To Remove", "Tag To Remove"); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", false);
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerTargetB.getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerTargetB.getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerTargetB.getVelocity().z)*/);
            form.toggle("applyKnockback", false);
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", false);
            form.textField("X Rotation", "X Rotation", String(playerTargetB.getRotation().x));
            form.textField("Y Rotation", "Y Rotation", String(playerTargetB.getRotation().y));
            form.toggle("Teleport", false);
            form.textField("Teleport Dimension", "Dimension", playerTargetB.dimension.id);
            form.textField("Teleport X Coordinate", "X Coordinate", String(playerTargetB.location.x));
            form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerTargetB.location.y));
            form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerTargetB.location.z));
            form.textField("Teleport X Rotation", "X Rotation", String(playerTargetB.getRotation().x));
            form.textField("Teleport Y Rotation", "Y Rotation", String(playerTargetB.getRotation().y));
            form.toggle("Teleport - checkForBlocks", false);
            form.toggle("Teleport - keepVelocity", false);
            form.toggle("§4Try Teleport", false);
            form.textField("§4Try Teleport Dimension", "§4Dimension", playerTargetB.dimension.id);
            form.textField("§4Try Teleport X Coordinate", "§4X Coordinate", String(playerTargetB.location.x));
            form.textField("§4Try Teleport Y Coordinate", "§4Y Coordinate", String(playerTargetB.location.y));
            form.textField("§4Try Teleport Z Coordinate", "§4Z Coordinate", String(playerTargetB.location.z));
            form.toggle("§4Try Teleport - checkForBlocks", false);
            form.toggle("§4Try Teleport - keepVelocity", false);
            form.toggle("Send Message", false);
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", false);
            form.toggle("§4Debug", false);
            form.show(playerList[playerViewerB]).then(r => {
                if (r.canceled)
                    return;
                let [changeNameTag, nameTag, triggerEvent, setProperty, propertyIdentifier, propertyValue, resetProperty, resetPropertyIdentifier, setDynamicProperty, dynamicPropertyIdentifier, dynamicPropertyValue, removeDynamicProperty, removeDynamicPropertyIdentifier, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, sendMessage, messageToSend, openTheItemModificationFormAfterwards, debug] = r.formValues;
                /*
                            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
                            scale.value = Number(scaleValue);*/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerTargetB.nameTag = String(nameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerTargetB.isSneaking = Boolean(isSneaking);
                if (Boolean(addEffect) == true) {
                    try {
                        playerTargetB.addEffect(String(effectToAdd), Number(secondsOfEffect), { amplifier: Number(effectAmplifier), showParticles: Boolean(effectShowEffectParticles) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerTargetB.applyImpulse({ x: Number(velocityX), y: Number(velocityY), z: Number(velocityZ) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerTargetB.applyKnockback(Number(kockbackDirectionX), Number(knockbackDirectionZ), Number(knockbackHorizontalStrength), Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerTargetB.addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerTargetB.removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerTargetB.removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setProperty) == true) {
                    try {
                        playerTargetB.setProperty(String(propertyIdentifier), String(propertyValue));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetProperty) == true) {
                    try {
                        playerTargetB.resetProperty(String(resetPropertyIdentifier));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setDynamicProperty) == true) {
                    try {
                        playerTargetB.setDynamicProperty(String(dynamicPropertyIdentifier), String(dynamicPropertyValue));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeDynamicProperty) == true) {
                    try {
                        playerTargetB.setDynamicProperty(String(removeDynamicPropertyIdentifier), undefined);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerTargetB.teleport({ x: Number(teleportX), y: Number(teleportY), z: Number(teleportZ) }, { checkForBlocks: Boolean(teleportCheckForBlocks), dimension: world.getDimension(String(teleportDimension)), keepVelocity: Boolean(teleportKeepVelocity) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerTargetB.tryTeleport({ x: Number(tryTeleportX), y: Number(tryTeleportY), z: Number(tryTeleportZ) }, { checkForBlocks: Boolean(tryTeleportCheckForBlocks), dimension: world.getDimension(String(tryTeleportDimension)), keepVelocity: Boolean(tryTeleportKeepVelocity) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerTargetB.setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerTargetB.setRotation({ x: Number(rotX), y: Number(rotY) });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerTargetB.kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerTargetB.remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerTargetB.clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerTargetB.extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerTargetB.triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerTargetB.isSneaking = true;
                    try {
                        playerTargetB.addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
                    if (playerTargetB.hasTag("isSneaking")) {
                      system.runInterval( () => {
                      playerTargetB.isSneaking == true
                      if (playerTargetB.hasTag("isSneaking") == false) {
                      return
                      }
                      }, 2)
                    }*/
                }
                else {
                    try {
                        playerTargetB.removeTag("isSneaking");
                        playerTargetB.isSneaking = false;
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8))) {
            let message2 = message.slice(8, message.length);
            let playerTargetB = undefined;
            try {
                entity2[0] /*.entity*/;
            }
            catch (e) {
                console.error(e, e.stack);
            }
            let playerTargetB2 = entity2[0];
            let playerViewerB = Number(message2);
            playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Entity Controller");
            form2.dropdown("Player Viewer", String(targetList).split(","), 0);
            form2.dropdown("Selection Type", ["Facing", "Nearest", "§4Block§r§f", "§4UUID"], 0);
            form2.textField("§4Entity UUID", "§4Entity UUID", "0");
            form2.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(t => {
                if (t.canceled)
                    return;
                let [playerViewer, selectionType, entityUUID] = t.formValues;
                let entity3;
                if (Number(selectionType) == 1) {
                    entity3 = playerList[Number(playerViewer)].dimension.getEntities({ excludeTypes: ["minecraft:player"], closest: 1, location: playerList[0].location })[0];
                    entity2 = playerList[Number(playerViewer)].dimension.getEntitiesFromRay({ x: entity3[0].location.x, y: entity3[0].location.y + 1.0, z: entity3[0].location.z }, { x: 0, y: -0.999999999999999, z: 0 });
                }
                else {
                    try {
                        entity2 = playerList[Number(playerViewer)].getEntitiesFromViewDirection();
                        entity3 = playerList[Number(playerViewer)].getEntitiesFromViewDirection()[0].entity;
                    }
                    catch (e) { }
                }
                ;
                let playerTargetB;
                try {
                    playerTargetB = entity3;
                }
                catch { }
                let playerTargetB2;
                try {
                    playerTargetB2 = entity2[0];
                }
                catch { }
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB);
            }).catch(e => {
                console.error(e, e.stack);
            });
        } /*
              let form = new ModalFormData();
              let players = world.getPlayers()
              let block = sourceEntity.getBlockFromViewDirection()
              let entity = players[0].getEntitiesFromViewDirection()
              form.title("Entity Controller");
              form.textField("Name Tag", "Name Tag", entity[0].entity.nameTag)
              form.textField("Trigger Event", "Trigger Event")*/ /*
        form.dropdown("Player Target", playerList)*/ /*
        form.slider("Selected Slot", 0, 56, 1)
        form.slider("Scale", 0, 10, 0.5)
        form.toggle("Is Sneaking", false)
        form.toggle("Clear Velocity", false)
        form.toggle("Extinguish Fire", false)
        form.toggle("Kill", false)
        form.toggle("Remove", false)
        form.toggle("Set On Fire", false)
        form.textField("Set On Fire - Seconds", "Name Tag")
        form.toggle("Set On Fire - Use Effects", false)
        form.toggle("Remove Effect", false)
        form.textField("Effect To Remove", "Effect To Remove")
        form.toggle("Remove tag", false)
        form.textField("Tag To Remove", "Tag To Remove")
        form.toggle("Set Rotation", false)
        form.textField("X Rotation", "X Rotation")
        form.textField("Y Rotation", "Y Rotation")
        form.toggle("Teleport", false)
        form.textField("X Coordinate", "X Coordinate")
        form.textField("Y Coordinate", "Y Coordinate")
        form.textField("Z Coordinate", "Z Coordinate")
        form.toggle("Try Teleport", false)
        form.textField("X Coordinate", "X Coordinate")
        form.textField("Y Coordinate", "Y Coordinate")
        form.textField("Z Coordinate", "Z Coordinate")
        form.toggle("Open The Item Modification Form Afterwards", false)
        form.toggle("Debug", false)
    
    
    form.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(r => {
        if (r.canceled) return;
    
        let [ nameTag, triggerEvent, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, removeEffect, effectToRemove, removeTag, tagToRemove, setRot, rotX, rotY, teleport, teleportX, teleportY, teleportZ, tryTeleport, tryTeleportX, tryTeleportY, tryTeleportZ, openTheItemModificationFormAfterwards, debug ] = r.formValues;
    
        let scale = sourceEntity.getComponent("scale") as EntityScaleComponent;*/ /*
        scale.value = Number(scaleValue);*/ /*
        
        try {entity[0].entity.nameTag = String(nameTag);} catch(e){console.error(e, e.stack);}
        try {entity[0].entity.isSneaking = Boolean(isSneaking);} catch(e){console.error(e, e.stack);}
        try {(entity[0].entity as Player).selectedSlotIndex = Number(selectedSlotIndex);} catch(e){console.error(e, e.stack);}
        if (Boolean(setRot) == true) {
            try {entity[0].entity.setRotation({ x: Number(rotX), y: Number(rotY) });} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(kill) == true) {
            try {entity[0].entity.kill();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(remove) == true) {
            try {entity[0].entity.remove();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearVelocity) == true) {
            try {entity[0].entity.clearVelocity();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(extinguishFire) == true) {
            try {entity[0].entity.extinguishFire();} catch(e){console.error(e, e.stack);}
        }
        if (triggerEvent !== undefined) {
            try {entity[0].entity.triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}
        }
    
    if (players[players.findIndex((x) => x == sourceEntity)] as any.hasTag("showDebug")) {
      system.runInterval( () => {
      players[0].onScreenDisplay.setActionBar("dimension: " + entity[0].entity.dimension + "\nfallDistance: " + entity[0].entity.fallDistance + "\nid: entity[0].entity.id: " + entity[0].entity.id + "\nisClimbing: " + entity[0].entity.isClimbing + "\nisFalling: " + entity[0].entity.isFalling + "\nisInWater: " + entity[0].entity.isInWater + "\nisOnGround: " + entity[0].entity.isOnGround + "\nisSleeping: " + entity[0].entity.isSleeping + "\nisSneaking: " + entity[0].entity.isSneaking + "\nisSprinting: " + entity[0].entity.isSprinting + "\nisSwimming: " + entity[0].entity.isSwimming + "\nlifetimeState: " + entity[0].entity.lifetimeState + "\nlocation: " + entity[0].entity.location + "\nnameTag: " + entity[0].entity.nameTag + "\nscoreboardIdentity(or_the_actor_id_very_long_complicated_number): " + entity[0].entity.scoreboardIdentity + "\ntarget: " + entity[0].entity.target + "\ntypeId: " + entity[0].entity.typeId + "\ngetBlockFromViewDirection(): " + entity[0].entity.getBlockFromViewDirection() + "\ngetComponents(): " + entity[0].entity.getComponents() + "\ngetEffects(): " + entity[0].entity.getEffects() + "\ngetEntitiesFromViewDirection(): " + entity[0].entity.getEntitiesFromViewDirection() + "\ngetHeadLocation(): " + entity[0].entity.getHeadLocation() + "\ngetRotation(): " + entity[0].entity.getRotation() + "\ngetTags(): " + entity[0].entity.getTags() + "\ngetVelocity(): " + entity[0].entity.getVelocity() + "\ngetViewDirection(): " + entity[0].entity.getViewDirection + "\nisValid(): " + entity[0].entity.isValid());
      if (players[players.findIndex((x) => x == sourceEntity)] as any.hasTag("showDebug") == false) {
      return
      }
      }, 2)
    }
    }).catch(e => {
        console.error(e, e.stack);
    });*/
    }
    if (id == "andexdb:worldOptions") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents[0]];
        let entity2 = playerList[0].getEntitiesFromViewDirection();
        let entity3 = undefined;
        try {
            entity3 = entity2[0].entity.id;
        }
        catch (e) { /*console.error(e, e.stack);*/ }
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        let playerTargetB = undefined;
        let playerViewer = playerList[playerList.findIndex((x) => x == sourceEntity)];
        for (const index in playerList) { /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
                targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        let form = new ModalFormData(); /*
        try {dimension = String(playerTargetB.getSpawnPoint().dimension);} catch(e){dimension = ""}
        try {spawnXPosition = String(playerTargetB.getSpawnPoint().x);} catch(e){spawnXPosition = ""}
        try {spawnYPosition = String(playerTargetB.getSpawnPoint().y);} catch(e){spawnYPosition = ""}
        try {spawnZPosition = String(playerTargetB.getSpawnPoint().z);} catch(e){spawnZPosition = ""}*/
        playerList.findIndex((x) => x == sourceEntity);
        form.title("World Options\nhi\nhi\nhi\nhi. . . . ");
        form.toggle("getAbsoluteTime: " + world.getAbsoluteTime() + "\ngetDay: " + world.getDay() + "\ngetDefaultSpawnLocation: { x: " + world.getDefaultSpawnLocation().x + ", y: " + world.getDefaultSpawnLocation().y + ", z: " + world.getDefaultSpawnLocation().z + " }\ngetMoonPhase: " + world.getMoonPhase() + "\ngetTimeOfDay: " + world.getTimeOfDay() + "\nX: " + "\n§4Set Weather", false); /*
        form.toggle("§4Set Weather", false)*/
        form.textField("Weather Type", "Name Tag", WeatherType.Clear);
        form.textField("Dimension To Set Weather In", "Dimension To Set Weather In");
        form.textField("Weather Duration Ticks ( Optional )", "Weather Duration In Ticks"); /*
        form.slider("§4Scale", 0, 10, 0.5)*/
        form.toggle("brodcastClientMessage", false);
        form.textField("brodcastClientMessage - Id", "Id Of Client Message To Brodcast");
        form.textField("brodcastClientMessage - Value", "Value Of Client Message To Brodcast");
        form.toggle("sendMessage", false);
        form.textField("sendMessage - Message", "Message To Send");
        form.toggle("setAbsoluteTime", false);
        form.textField("setAbsoluteTime - Value", "Value Of The New Absolute Time");
        form.toggle("setDefaultSpawnLocation", false);
        form.textField("World Spawn X Coordinate", "World Spawn X Coordinate", String(world.getDefaultSpawnLocation().x));
        form.textField("World Spawn Y Coordinate", "World Spawn Y Coordinate", String(world.getDefaultSpawnLocation().y));
        form.textField("World Spawn Z Coordinate", "World Spawn Z Coordinate", String(world.getDefaultSpawnLocation().z));
        form.toggle("setDynamicProperty", false);
        form.textField("setDynamicProperty - Id", "Id Of Client Message To Brodcast");
        form.textField("setDynamicProperty - Value", "Value Of Client Message To Brodcast");
        form.toggle("setTimeOfDay", false);
        form.textField("setTimeOfDay - Value", "Value Of The New Time Of Day", undefined);
        form.toggle("spawnEntity", false);
        form.textField("Entity Identifier", "Entity Identifier", /*String(*/ entity3 /*)*/);
        form.textField("X Coordinate", "X Coordinate", String(playerViewer.location.x));
        form.textField("Y Coordinate", "Y Coordinate", String(playerViewer.location.y));
        form.textField("Z Coordinate", "Z Coordinate", String(playerViewer.location.z));
        form.dropdown("Dimension", ["Overworld", "Nether", "The End"], 0); /*
        form2.dropdown("damageType", ["entity", "projectile"], 0)
        form2.dropdown("damageCause", ["anvil", "none"], 0)*/
        form.toggle("§4Debug", false);
        let dimensionList2 = ["overworld", "nether", "the_end"];
        let dimensionList3 = [world.getDimension("overworld"), world.getDimension("nether"), world.getDimension("the_end")];
        let weatherList2 = ["Clear", "Rain", "Thunder"];
        let weatherList3 = [WeatherType.Clear, WeatherType.Rain, WeatherType.Thunder];
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
            if (r.canceled)
                return;
            let [setWeather, weatherType, weatherDimension, weatherDuration, brodcastClientMessage, clientMessageId, clientMessageValue, sendMessage, messageMessage, setAbsoluteTime, newAbsoluteTime, setDefaultSpawnLocation, spawnX, spawnY, spawnZ, setDynamicProperty, dynamicPropertyId, dynamicPropertyValue, setTimeOfDay, newTimeOfDay, spawnEntity, entityIdentifier, entityX, entityY, entityZ, entityDimension, debug] = r.formValues;
            /*
                        let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
                        scale.value = Number(scaleValue);*/
            if (Boolean(setWeather) == true && weatherDuration == "") {
                try {
                    world.getDimension(String(weatherDimension)).setWeather(weatherList3[weatherList2.indexOf(String(weatherType))]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            else {
                if (Boolean(setWeather) == true && weatherDuration !== "") {
                    try {
                        world.getDimension(String(weatherDimension)).setWeather(weatherList3[weatherList2.indexOf(String(weatherType))], Number(1) /* This one comes in a later update lols. // BUGBUG */);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }
            if (Boolean(brodcastClientMessage) == true) {
                try {
                    world.broadcastClientMessage(String(clientMessageId), String(clientMessageValue));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(sendMessage) == true) {
                try {
                    world.sendMessage(String(messageMessage).split("\\newline"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setAbsoluteTime) == true) {
                try {
                    world.setAbsoluteTime(Number(newAbsoluteTime));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setDefaultSpawnLocation) == true) {
                try {
                    world.setDefaultSpawnLocation({ x: Number(spawnX), y: Number(spawnY), z: Number(spawnZ) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setDynamicProperty) == true) {
                try {
                    world.setDynamicProperty(String(dynamicPropertyId), dynamicPropertyValue);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setTimeOfDay) == true) {
                try {
                    world.setTimeOfDay(Number(newTimeOfDay));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
            if (Boolean(playMusic) == true) {
                try {playerTargetB.setRotation({ x: Number(rotX), y: Number(rotY) });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(playSound) == true) {
                try {playerTargetB.kill();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(queueMusic) == true) {
                try {playerTargetB.remove();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(removeDynamicProperty) == true) {
                try {playerTargetB.clearVelocity();} catch(e){console.error(e, e.stack);}
            }*/
            if (Boolean(spawnEntity) == true) {
                try {
                    world.getDimension(dimensionList2[Number(entityDimension)]).spawnEntity(String(entityIdentifier), { x: Number(entityX), y: Number(entityY), z: Number(entityZ) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
            if (Boolean(spawnItem) == true) {
                try {playerTargetB.extinguishFire();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(spawnParticle) == true) {
                try {playerTargetB.extinguishFire();} catch(e){console.error(e, e.stack);}
            }*/
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:scriptEval") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        //console.log(eval('2 + 2'))
    }
    if (id == "andexdb:indirectScriptEval") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        //console.log(eval?.('2 + 2'))
    }
    if (id == "andexdb:scripteval") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:indirectscripteval") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:e") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:eb") {
        let player = sourceEntity;
        try {
            eval(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "is:e") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "is:eb") {
        let player = sourceEntity;
        try {
            eval?.(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:elc") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "s:elcb") {
        let player = sourceEntity;
        try {
            eval(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "is:elc") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "is:elcb") {
        let player = sourceEntity;
        try {
            eval?.(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:se") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:ise") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:selc") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:iselc") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:sendGlobalWorldMessage") {
        let dynamicProperty = message;
        try {
            world.sendMessage(dynamicProperty.escapeCharacters(false, true, 1, true, true, true, true, true, false));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:sendGlobalWorldMessageB") {
        let dynamicProperty = message;
        try {
            world.sendMessage(dynamicProperty.escapeCharacters(true, false, 0, false, false, false, false, false, false));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicProperty") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), dynamicProperty[1].replaceAll("\\s", "|"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setEntityDynamicProperty") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(/*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}\nOptions: triggerEvent, setProperty, setPropertyInt, setPropertyBool, setDynamicProperty, setDynamicPropertyInt, setDynamicPropertyBool, setDynamicPropertyVector3");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith("\"") && playerName[0].endsWith("\"")) {
                playerName[0] = playerName[0].slice(1, (playerName[0].length - 1));
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
            console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = (String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z);
                entity = sourceEntity;
            }
            else {
                position = (String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z);
            }
            let targets = targetSelectorAllListC(playerName[0], "", position, entity); /*
            console.warn(targets[0].nameTag)*/
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    switch (playerName.slice(1)[i].split(":")[0]) {
                        case "triggerEvent":
                            try {
                                targets[l].triggerEvent(playerName.slice(1)[i].split(":").slice(1).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setProperty":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyInt":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Number(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyBool":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
                        case "setPropertyVector3":
                        try {targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));} catch(e){console.error(e, e.stack);}
                        break; */
                        case "setDynamicProperty":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyInt":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Number(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyBool":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyVector3":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), { x: Number(playerName.slice(1)[i].split(":")[2]), y: Number(playerName.slice(1)[i].split(":")[3]), z: Number(playerName.slice(1)[i].split(":")[4]), });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
                        case "setVariant":
                        try {(targets[l].getComponent("minecraft:variant") as EntityVariantComponent).value = Number(playerName.slice(1)[i].split(":")[1]);} catch(e){console.error(e, e.stack);}
                        break; */
                        case "setMarkVariant":
                            try {
                                targets[l].getComponent("minecraft:mark_variant").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPushThrough":
                            try {
                                targets[l].getComponent("minecraft:push_through").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setScale":
                            try {
                                targets[l].getComponent("scale").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setSkinId":
                            try {
                                targets[l].getComponent("minecraft:skin_id").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setTame":
                            try {
                                targets[l].getComponent("minecraft:tameable").tame(sourceEntity);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setAirSupply":
                            try {
                                targets[l].getComponent("minecraft:breathable").airSupply = (Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setColor":
                            try {
                                targets[l].getComponent("minecraft:color").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setFlyingSpeed":
                            try {
                                targets[l].getComponent("minecraft:flying_speed").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setFrictionModifier":
                            try {
                                targets[l].getComponent("minecraft:friction_modifier").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setGroundOffset":
                            try {
                                targets[l].getComponent("minecraft:ground_offset").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setHealth":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setUnderwaterMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setLavaMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
            }
        }
    }
    if (id == "andexdb:getEntityDynamicProperty") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(/*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}\nOptions: triggerEvent, setProperty, setPropertyInt, setPropertyBool, setDynamicProperty, setDynamicPropertyInt, setDynamicPropertyBool, setDynamicPropertyVector3");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith("\"") && playerName[0].endsWith("\"")) {
                playerName[0] = playerName[0].slice(1, (playerName[0].length - 1));
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
            console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = (String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z);
                entity = sourceEntity;
            }
            else {
                position = (String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z);
            }
            let targets = targetSelectorAllListC(playerName[0], "", position, entity); /*
            console.warn(targets[0].nameTag)*/
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    try {
                        sourceEntity.sendMessage("" + targets[l].id + ": " + targets[l].getDynamicProperty(playerName.slice(1)[i].replaceAll("\\c", ":")));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }
        }
    }
    if (id == "andexdb:getWorldDynamicProperty") {
        let dynamicProperty = message.split("|");
        try {
            sourceEntity.sendMessage(("a" + String(world.getDynamicProperty(String(dynamicProperty[0])))));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyInt") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), Number(dynamicProperty[1]));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyBoolean") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), Boolean(dynamicProperty[1]));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyB") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), dynamicProperty[1].replaceAll("\\s", "|"));
        }
        catch (e) {
            sourceEntity.sendMessage("§c" + e + e.stack);
        }
    }
    if (id == "andexdb:setPlayerNameTag") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage("§r§fsetPlayerNameTag Command Format: playerName|newPlayerNameTag");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith("\"") && playerName[0].endsWith("\"")) {
                playerName[0] = playerName[0].slice(1, (playerName[0].length - 1));
            }
            let targetList = [playerList[0].name];
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[1];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:playerControllerCommandForm") {
        let playerName = message.split("|");
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(/*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <playerName: string>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            let targetList = [playerList[0].name];
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                switch (playerName[i].split(":")[0]) {
                    case "nameTag":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "nameTagMultiline":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "triggerEvent":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                }
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[3];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:playerControllerCommandForm") {
        let playerName = message.split("|");
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(/*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <playerName: string>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            let targetList = [playerList[0].name];
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                switch (playerName[i].split(":")[0]) {
                    case "nameTag":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "nameTagMultiline":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "triggerEvent":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "clearVelocity":
                        if (playerName[i].split(":")[1]?.toLowerCase() == "true")
                            try {
                                playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                        break;
                }
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[3];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:entityControllerCommandForm") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(/*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith("\"") && playerName[0].endsWith("\"")) {
                playerName[0] = playerName[0].slice(1, (playerName[0].length - 1));
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
            console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = (String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z);
                entity = sourceEntity;
            }
            else {
                position = (String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z);
            }
            let targets = targetSelectorAllListE(playerName[0], position); /*
            console.warn(targets[0].nameTag)*/
            for (const index in playerList) { /*
                console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
                    targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
                console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    switch (playerName.slice(1)[i].split(":")[0]) {
                        case "nameTag":
                            try {
                                targets[l].nameTag = playerName.slice(1)[i].split(":").slice(1).join(":");
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "nameTagMultiline":
                            try {
                                targets[l].nameTag = playerName.slice(1)[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "triggerEvent":
                            try {
                                targets[l].triggerEvent(playerName.slice(1)[i].split(":").slice(1).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setProperty":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], playerName.slice(1)[i].split(":").slice(2).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyInt":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyBool":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
                        case "setPropertyVector3":
                        try {targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));} catch(e){console.error(e, e.stack);}
                        break; */
                        case "setDynamicProperty":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], playerName.slice(1)[i].split(":").slice(2).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyInt":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyBool":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyVector3":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], { x: Number(playerName.slice(1)[i].split(":")[2]), y: Number(playerName.slice(1)[i].split(":")[3]), z: Number(playerName.slice(1)[i].split(":")[4]), });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "clearVelocity": /*
                        if(playerName.slice(1)[i].split(":")[1].toLowerCase() == "true"){*/
                            try {
                                targets[l].clearVelocity();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            } /*
                            }*/
                            break;
                        case "isSneaking":
                            try {
                                targets[l].isSneaking = Boolean(playerName.slice(1)[i].split(":")[1]?.toLowerCase());
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addEffect":
                            try {
                                targets[l].addEffect(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":")[2]), { amplifier: Number(playerName.slice(1)[i].split(":")[3]), showParticles: Boolean(playerName.slice(1)[i].split(":")[4]?.toLowerCase()) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "applyImpulse":
                            try {
                                targets[l].applyImpulse({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "applyKnockback":
                            try {
                                targets[l].applyKnockback(Number(playerName.slice(1)[i].split(":")[1]), Number(playerName.slice(1)[i].split(":")[2]), Number(playerName.slice(1)[i].split(":")[3]), Number(playerName.slice(1)[i].split(":")[4]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addTag":
                            try {
                                targets[l].addTag(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "removeTag":
                            try {
                                targets[l].removeTag(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "removeEffect":
                            try {
                                targets[l].removeEffect(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "kill":
                            try {
                                targets[l].kill();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "remove":
                            try {
                                targets[l].remove();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "teleport":
                            try {
                                targets[l].teleport({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), }, { checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[7]), rotation: { x: Number(playerName.slice(1)[i].split(":")[5]), y: Number(playerName.slice(1)[i].split(":")[6]), }, dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]), keepVelocity: Boolean(playerName.slice(1)[i].split(":")[8]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "teleportFacingLocation":
                            try {
                                targets[l].teleport({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), }, { checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[8]), facingLocation: { x: Number(playerName.slice(1)[i].split(":")[5]), y: Number(playerName.slice(1)[i].split(":")[6]), z: Number(playerName.slice(1)[i].split(":")[7]), }, dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]), keepVelocity: Boolean(playerName.slice(1)[i].split(":")[9]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "tryTeleport":
                            try {
                                targets[l].tryTeleport({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), }, { checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[7]), rotation: { x: Number(playerName.slice(1)[i].split(":")[5]), y: Number(playerName.slice(1)[i].split(":")[6]), }, dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]), keepVelocity: Boolean(playerName.slice(1)[i].split(":")[8]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "tryTeleportFacingLocation":
                            try {
                                targets[l].tryTeleport({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), }, { checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[8]), facingLocation: { x: Number(playerName.slice(1)[i].split(":")[5]), y: Number(playerName.slice(1)[i].split(":")[6]), z: Number(playerName.slice(1)[i].split(":")[7]), }, dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]), keepVelocity: Boolean(playerName.slice(1)[i].split(":")[9]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setOnFire":
                            try {
                                targets[l].setOnFire(Number(playerName.slice(1)[i].split(":")[1]), Boolean(playerName.slice(1)[i].split(":")[2]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setRot":
                            try {
                                targets[l].setRotation({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "extinguishFire":
                            try {
                                targets[l].extinguishFire(Boolean(playerName.slice(1)[i].split(":")[1]?.toLowerCase()));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addLevels":
                            try {
                                targets[l].addLevels(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addExperience":
                            try {
                                targets[l].addExperience(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "sendMessage":
                            try {
                                targets[l].sendMessage(String(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "startItemcooldown":
                            try {
                                targets[l].startItemCooldown(String(playerName.slice(1)[i].split(":")[1]), Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "slectedSlot":
                            try {
                                targets[l].selectedSlotIndex = Number(playerName.slice(1)[i].split(":")[1]), Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "resetLevel":
                            try {
                                targets[l].resetLevel(), Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setSpawnPoint":
                            try {
                                targets[l].setSpawnPoint({ x: Number(playerName.slice(1)[i].split(":")[1]), y: Number(playerName.slice(1)[i].split(":")[2]), z: Number(playerName.slice(1)[i].split(":")[3]), dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]), });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
            }
        }
    }
    if (id == "andexdb:getRedstone") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        try {
            block = sourceEntity.getBlockFromViewDirection({ includePassableBlocks: true });
        }
        catch (e) { }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§cRedstone Power: §a" + block.block.getRedstonePower());
        }
        catch (e) { }
    }
    if (id == "andexdb:getRedstoneAndLiquid") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        try {
            block = sourceEntity.getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true });
        }
        catch (e) { }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§cRedstone Power: §a" + block.block.getRedstonePower());
        }
        catch (e) { }
    }
    if (id == "andexdb:getBlockStates") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            block = sourceEntity.getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true });
        }
        catch (e) { }
        try {
            BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
                blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§eBlock States For §c" + block.block.typeId + "§e: §a\n" + blockStatesFullList);
        }
        catch (e) { }
    }
    if (id == "andexdb:getBlockStatesNoLiquid") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            block = sourceEntity.getBlockFromViewDirection({ includePassableBlocks: true });
        }
        catch (e) { }
        try {
            BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
                blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§eBlock States For §c" + block.block.typeId + "§e: §a\n" + blockStatesFullList);
        }
        catch (e) { }
    }
    if (id == "andexdb:spawnWithNoAI") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        if ((world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") == undefined || world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")?.x == undefined) && (String(parameters[3]) == "")) {
            if ((initiator ?? sourceEntity) == undefined) {
                if (sourceType == ScriptEventSource.Server) {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
                }
                else {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. Block Location: " + JSON.stringify(sourceBlock.location) + ", Block Dimension: " + sourceBlock.dimension);
                }
            }
            else {
                (initiator ?? sourceEntity).sendMessage("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
            }
            ;
            return;
        }
        let location = (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 };
        let location2;
        try {
            location2 = Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")).join(" ");
        }
        catch { }
        try {
            location = evaluateCoordinates(parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            location2 = Object.values(evaluateCoordinates(parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 })).join(" ");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        world.setDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalLocation", location);
        world.setDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalType", parameters[0]);
        console.warn(location2);
        try {
            world.getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld").runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:spawn_without_behaviors_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdbHelp:spawnWithNoAI") {
        if ((initiator ?? sourceEntity) == undefined) {
            console.warn("andexdb:spawnWithNoAI /scriptevent command format: /scriptevent andexdb:spawnWithNoAI <entityType: string>|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        else {
            (initiator ?? sourceEntity).sendMessage("andexdb:spawnWithNoAI /scriptevent command format: /scriptevent andexdb:spawnWithNoAI <entityType: string>|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        ;
    }
    if (id == "andexdb:spawnSimulatedPlayer") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        if ((world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") == undefined || world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")?.x == undefined) && (String(parameters[3]) == "")) {
            if ((initiator ?? sourceEntity) == undefined) {
                if (sourceType == ScriptEventSource.Server) {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
                }
                else {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. Block Location: " + JSON.stringify(sourceBlock.location) + ", Block Dimension: " + sourceBlock.dimension);
                }
            }
            else {
                (initiator ?? sourceEntity).sendMessage("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
            }
            ;
            return;
        }
        let location = (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 };
        let location2;
        try {
            location2 = Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")).join(" ");
        }
        catch { }
        try {
            location = evaluateCoordinates(parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            location2 = Object.values(evaluateCoordinates(parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), parameters[3].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 })).join(" ");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        world.setDynamicProperty("andexdbGametest:spawnSimulatedPlayerInternalLocation", location);
        world.setDynamicProperty("andexdbGametest:customSimulatedPlayerInternalName", parameters[0]);
        console.warn(location2);
        try {
            world.getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld").runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:spawn_simulated_player_custom_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdbHelp:spawnSimulatedPlayer") {
        if ((initiator ?? sourceEntity) == undefined) {
            console.warn("andexdb:spawnSimulatedPlayer /scriptevent command format: /scriptevent andexdb:spawnSimulatedPlayer [playerName: string]|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        else {
            (initiator ?? sourceEntity).sendMessage("andexdb:spawnSimulatedPlayer /scriptevent command format: /scriptevent andexdb:spawnSimulatedPlayer [playerName: string]|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        ;
    }
    if (id == "andexdb:scriptEvalWithGameTest") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        if ((world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") == undefined || world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")?.x == undefined) && (String(parameters[3]) == "")) {
            if ((initiator ?? sourceEntity) == undefined) {
                if (sourceType == ScriptEventSource.Server) {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
                }
                else {
                    console.error("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. Block Location: " + JSON.stringify(sourceBlock.location) + ", Block Dimension: " + sourceBlock.dimension);
                }
            }
            else {
                (initiator ?? sourceEntity).sendMessage("§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at \"Main Menu>Settings>Global Settings\" or specify a location in the fourth parameter. ");
            }
            ;
            return;
        }
        let location2;
        try {
            location2 = Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation")).join(" ");
        }
        catch { }
        try {
            location2 = Object.values(evaluateCoordinates(parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), parameters[1].split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 })).join(" ");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        world.setDynamicProperty("andexdbGametest:scriptEvalInternalCode", parameters[0].replaceAll("\\vl", "|"));
        console.warn(location2);
        try {
            world.getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld").runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:script_eval_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:createParticle") {
        let message2 = message.split("|");
        let message3;
        if (sourceType == "Entity") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), { x: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[1] ?? sourceEntity.location.x), y: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[2] ?? sourceEntity.location.y), z: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[3] ?? sourceEntity.location.z) }, { x: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[1] ?? sourceEntity.getRotation().x), y: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[2] ?? sourceEntity.getRotation().y) });
        }
        if (sourceType == "NPCDialogue") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), { x: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[1] ?? sourceEntity.location.x), y: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[2] ?? sourceEntity.location.y), z: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[3] ?? sourceEntity.location.z) }, { x: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[1] ?? sourceEntity.getRotation().x), y: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[2] ?? sourceEntity.getRotation().y) });
        }
        if (sourceType == "Server") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), { x: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[1] ?? 0), y: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[2] ?? 0), z: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[3] ?? 0) }, { x: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[1] ?? 0), y: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[2] ?? 0) });
        }
        if (sourceType == "Block") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), { x: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[1] ?? sourceBlock.location.x), y: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[2] ?? sourceBlock.location.y), z: Number(message2[1].split(";").find((v) => (v.startsWith("pos:")))?.split(":")[3] ?? sourceBlock.location.z) }, { x: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[1] ?? 0), y: Number(message2[1].split(";").find((v) => (v.startsWith("rot:")))?.split(":")[2] ?? 0) });
        } /*
        if (String(message2[1]).includes("~")) {
        if (sourceType == "Entity") {message3 = Vector.add(sourceEntity.location, {x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3])})} else { message3 = Vector.add(sourceBlock.location, {x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3])}) }
        } else {message3 = {x: Number(message2[1].split(",")[0]), y: Number(message2[1].split(",")[1]), z: Number(message2[1].split(",")[2])}}*/
        let currentMolangVariableMap = new MolangVariableMap();
        for (let index in message2) {
            if (Number(index) < 3) { }
            else {
                if (String(message2[index]).startsWith("setFloat:")) { /*
                    console.warn("Float")*/
                    try {
                        currentMolangVariableMap.setFloat(message2[index].slice(9).split(":")[0], Number(message2[index].slice(9).split(":")[1]));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                else {
                    if (String(message2[index]).startsWith("setColorRGB:")) { /*
                        console.warn("RGB")*/
                        try {
                            currentMolangVariableMap.setColorRGB(message2[index].slice(12).split(":")[0], { blue: Number(message2[index].slice(12).split(":")[3]), green: Number(message2[index].slice(12).split(":")[2]), red: Number(message2[index].slice(12).split(":")[1]) });
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    }
                    else {
                        if (String(message2[index]).startsWith("setColorRGBA:")) { /*
                            console.warn("RGBA")*/
                            try {
                                currentMolangVariableMap.setColorRGBA(message2[index].slice(13).split(":")[0], { alpha: Number(message2[index].slice(13).split(":")[4]), blue: Number(message2[index].slice(13).split(":")[3]), green: Number(message2[index].slice(13).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1]) });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            } /*
                            console.warn(message2[index].slice(13).split(":")[0], {alpha: Number(message2[index].slice(13).split(":")[4]), blue: Number(message2[index].slice(13).split(":")[3]), green: Number(message2[index].slice(13).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1])})
                            console.warn(message2[index].slice(13).split(":")[0] + "," + Number(message2[index].slice(13).split(":")[4]) + "," + Number(message2[index].slice(13).split(":")[3]) + "," + Number(message2[index].slice(13).split(":")[2]) + "," + Number(message2[index].slice(13).split(":")[1]))*/
                        }
                        else {
                            if (String(message2[index]).startsWith("setVector3:")) { /*
                                console.warn("Vector3")*/
                                try {
                                    currentMolangVariableMap.setVector3(message2[index].slice(11).split(":")[0], { z: Number(message2[index].slice(11).split(":")[3]), y: Number(message2[index].slice(11).split(":")[2]), x: Number(message2[index].slice(11).split(":")[1]) });
                                }
                                catch (e) {
                                    console.error(e, e.stack);
                                }
                            }
                            else { /* console.warn("Other") */
                                if (String(message2[index]).startsWith("f:")) { /*
                                    console.warn("Float")*/
                                    try {
                                        currentMolangVariableMap.setFloat(message2[index].slice(2).split(":")[0], Number(message2[index].slice(2).split(":")[1]));
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                    }
                                }
                                else {
                                    if (String(message2[index]).startsWith("rgb:")) { /*
                                        console.warn("RGB")*/
                                        try {
                                            currentMolangVariableMap.setColorRGB(message2[index].slice(4).split(":")[0], { blue: Number(message2[index].slice(4).split(":")[3]), green: Number(message2[index].slice(4).split(":")[2]), red: Number(message2[index].slice(4).split(":")[1]) });
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    else {
                                        if (String(message2[index]).startsWith("rgba:")) { /*
                                            console.warn("RGBA")*/
                                            try {
                                                currentMolangVariableMap.setColorRGBA(message2[index].slice(5).split(":")[0], { alpha: Number(message2[index].slice(5).split(":")[4]), blue: Number(message2[index].slice(5).split(":")[3]), green: Number(message2[index].slice(5).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1]) });
                                            }
                                            catch (e) {
                                                console.error(e, e.stack);
                                            } /*
                                            console.warn(message2[index].slice(13).split(":")[0], {alpha: Number(message2[index].slice(13).split(":")[4]), blue: Number(message2[index].slice(13).split(":")[3]), green: Number(message2[index].slice(13).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1])})
                                            console.warn(message2[index].slice(13).split(":")[0] + "," + Number(message2[index].slice(13).split(":")[4]) + "," + Number(message2[index].slice(13).split(":")[3]) + "," + Number(message2[index].slice(13).split(":")[2]) + "," + Number(message2[index].slice(13).split(":")[1]))*/
                                        }
                                        else {
                                            if (String(message2[index]).startsWith("v3:")) { /*
                                                console.warn("Vector3")*/
                                                try {
                                                    currentMolangVariableMap.setVector3(message2[index].slice(3).split(":")[0], { z: Number(message2[index].slice(3).split(":")[3]), y: Number(message2[index].slice(3).split(":")[2]), x: Number(message2[index].slice(3).split(":")[1]) });
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            else { /* console.warn("Other") */ }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        ; /*
try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            world.getDimension(message2[2]).spawnParticle(message2[0], message3, currentMolangVariableMap);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
});
//# sourceMappingURL=Main.js.map