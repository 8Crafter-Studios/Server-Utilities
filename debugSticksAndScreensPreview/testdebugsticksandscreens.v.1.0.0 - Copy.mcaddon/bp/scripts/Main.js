// Copyright (c) Microsoft Corporation.  All rights reserved.
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
import { BlockPermutation, Enchantment, ItemLockMode, ItemStack, ScriptEventSource, WeatherType, system, world, EquipmentSlot, Vector, BlockTypes, MolangVariableMap, DimensionTypes, EnchantmentTypes, BlockStates, CompoundBlockVolume, SignSide, DyeColor } from "@minecraft/server";
import { ActionFormData, FormCancelationReason, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { SimulatedPlayer, Test } from "@minecraft/server-gametest";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
mcServer;
mcServerUi;
GameTest;
SimulatedPlayer;
Test;
let crashEnabled = false;
system.beforeEvents.watchdogTerminate.subscribe(e => {
    try {
        if (crashEnabled == true) { }
        else {
            if (world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") == true) { }
            else {
                e.cancel = true;
                console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}`);
            }
        }
    }
    catch {
        e.cancel = true;
        console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}`);
    }
});
function targetSelector(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 100 + 50)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntityUUIDValue = (world.scoreboard.getObjective("andexdbDebug").getScores().find((score) => (score.score == scoreboardUUID))).participant.getEntity().id; world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return Number((selectedEntityUUIDValue)); }
function targetSelectorB(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 100 + 50)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntityUUIDValue = (world.scoreboard.getObjective("andexdbDebug").getScores().find((score) => (score.score == scoreboardUUID))).participant.getEntity().id; world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return world.getDimension(DimensionTypes.getAll().find((dimension) => (world.getDimension(dimension.typeId).getEntities().find((entity) => (entity.id == selectedEntityUUIDValue)))).typeId).getEntities().find((entity) => (entity.id == selectedEntityUUIDValue)); } /*
let a = world.getDimension("the_end").getBlock({x: 0, y: 0, z: 0}).permutation
let c = a as BlockStates
c*/
/*convertToCompoundBlockVolume(String(world.getDynamicProperty("noPistonExtensionAreas")))*/ /*
let b = a[Number(world.getAllPlayers()[0].getDynamicProperty("debugStickPropertyIndex"))]*/
let noPistonExtensionAreas;
noPistonExtensionAreas = undefined;
let noExplosionAreas;
noExplosionAreas = undefined;
let noBlockInteractAreas;
noBlockInteractAreas = undefined;
let noInteractAreas;
noInteractAreas = undefined;
let protectedAreas;
protectedAreas = undefined;
let noBlockBreakAreas;
noBlockBreakAreas = undefined;
let noBlockPlaceAreas;
noBlockPlaceAreas = undefined;
class interactable_blockb {
    constructor() {
        this.id = "";
        this.delay = 0;
        this.holdDuration = 0;
    }
}
;
let interactable_block;
interactable_block = [];
class customFormUIElement {
    constructor(index, type, args) { this.index = index; this.type = type; this.args = args; this.code = this.type + "(" + this.args.join(", ") + ")"; this.typeIndex = customElementTypeIds.findIndex((value, index) => (value == this.type)); }
}
;
function getType(areaGroup, type) { return areaGroup.split("|").filter((q) => (q.split(", ")[6] == String(type))).join("|"); }
;
function strToCustomFormUIElement(string) { let x = string.split("|").slice(2); x.forEach((xa, xb) => { x[xb] = xa.replaceAll("\\vls", "|").replaceAll("\\x", "|"); }); return new customFormUIElement(Number(string.split("|")[0]), string.split("|")[1], x); }
;
function arrayToElementList(ids, array) { let a; a = []; array.forEach((ax, az) => { a[az] = strToCustomFormUIElement(Number(ids[az].split("|")[1]) + "|" + ax); }); return a.sort((a, b) => (a.index - b.index)); }
;
function getUICustomForm(optionsids, codeids) {
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
function targetSelectorAllListB(selector, filters, UUID) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntity; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
} world.getAllPlayers().find((currentlySelectedPlayerEntity) => (Number(currentlySelectedPlayerEntity.id) == UUID)).runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0"); return selectedEntity; }
function targetSelectorAllListC(selector, filters, position, sourceEntityCommandExecution) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); if (sourceEntityCommandExecution == undefined) {
    world.getAllPlayers()[0].runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID);
}
else {
    sourceEntityCommandExecution.runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID);
} let selectedEntity; selectedEntity = []; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
        selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
    }
    catch (e) { }
} if (sourceEntityCommandExecution == undefined) {
    world.getAllPlayers()[0].runCommand("/execute positioned " + position + " as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0");
}
else {
    sourceEntityCommandExecution.runCommand("/execute as " + selector + filters + " at @s run /scoreboard players set @s andexdbDebug 0");
} return selectedEntity; }
function targetSelectorAllListD(selector, position, dimension = world.getDimension("overworld")) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); dimension.runCommand("/execute positioned " + position + " as " + selector + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); let selectedEntity; selectedEntity = []; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
        selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
    }
    catch (e) { }
} ; dimension.runCommand("/execute as " + selector + " at @s run /scoreboard players set @s andexdbDebug 0"); return selectedEntity; }
function targetSelectorAllListE(selector, position) { let scoreboardUUID = Math.round((Math.random() * 1000 + 500)); DimensionTypes.getAll().forEach((dt) => { let dimension = world.getDimension(dt.typeId); dimension.runCommand("/execute positioned " + position + " as " + selector + " at @s run /scoreboard players set @s andexdbDebug " + scoreboardUUID); }); let selectedEntity; selectedEntity = []; for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
        selectedEntity.push((world.scoreboard.getObjective("andexdbDebug").getScores().filter((score) => (score.score == scoreboardUUID)))[i].participant.getEntity());
    }
    catch (e) { }
} ; DimensionTypes.getAll().forEach((dt) => { let dimension = world.getDimension(dt.typeId); dimension.runCommand("/execute as " + selector + " at @s run /scoreboard players set @s andexdbDebug 0"); }); return selectedEntity; }
function debugAction(block, player, mode, direction) {
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
                    player.setDynamicProperty("debugStickPropertyIndex", Number((Number(player.getDynamicProperty("debugStickPropertyIndex")) - 1) % (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged))));
                    if (player.getDynamicProperty("debugStickPropertyIndex") == Object.entries(block.permutation.getAllStates()).length) {
                        player.setDynamicProperty("debugStickPropertyIndexName", "waterlogged");
                    }
                    else {
                        player.setDynamicProperty("debugStickPropertyIndexName", Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][0]);
                    }
                }
                else {
                    player.setDynamicProperty("debugStickPropertyIndex", Number((Number(player.getDynamicProperty("debugStickPropertyIndex")) + 1) % (Object.entries(block.permutation.getAllStates()).length + Number(block.type.canBeWaterlogged))));
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
                            if (Number(player.getDynamicProperty("debugStickPropertyIndexIndex")) > 0) {
                                player.setDynamicProperty("debugStickPropertyIndexIndex", ((((BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value) => (value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) - 1) % BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length))));
                            }
                            else {
                                player.setDynamicProperty("debugStickPropertyIndexIndex", (BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length - 1));
                            }
                        }
                        else {
                            player.setDynamicProperty("debugStickPropertyIndexIndex", ((BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.findIndex((value) => (value == Object.entries(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))][1])) + 1) % BlockStates.getAll().find((state) => (state.id == Object.keys(block.permutation.getAllStates())[Number(player.getDynamicProperty("debugStickPropertyIndex"))])).validValues.length));
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
                system.run(() => { block.isWaterlogged = Boolean(1 - Number(block.isWaterlogged)); player.onScreenDisplay.setActionBar(`"waterlogged" to ${block.isWaterlogged}`); });
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
function rotate(pitchb, rollb, yawb, points) {
    let pitch = (pitchb * (Math.PI / 180));
    let roll = (rollb * (Math.PI / 180));
    let yaw = (yawb * (Math.PI / 180));
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);
    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);
    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);
    var Axx = cosa * cosb;
    var Axy = cosa * sinb * sinc - sina * cosc;
    var Axz = cosa * sinb * cosc + sina * sinc;
    var Ayx = sina * cosb;
    var Ayy = sina * sinb * sinc + cosa * cosc;
    var Ayz = sina * sinb * cosc - cosa * sinc;
    var Azx = -sinb;
    var Azy = cosb * sinc;
    var Azz = cosb * cosc;
    for (var i = 0; i < points.length; i++) {
        var px = points[i].x;
        var py = points[i].y;
        var pz = points[i].z;
        points[i].x = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].y = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
        points[i].z = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    }
    ;
    return points;
}
function rotate3d(points, pitchb, rollb, yawb) {
    let pitch = (pitchb * (Math.PI / 180));
    let roll = (rollb * (Math.PI / 180));
    let yaw = (yawb * (Math.PI / 180));
    let cosa = Math.cos(yaw), sina = Math.sin(yaw);
    let cosb = Math.cos(pitch), sinb = Math.sin(pitch);
    let cosc = Math.cos(roll), sinc = Math.sin(roll);
    let Axx = cosa * cosb, Axy = cosa * sinb * sinc - sina * cosc, Axz = cosa * sinb * cosc + sina * sinc;
    let Ayx = sina * cosb, Ayy = sina * sinb * sinc + cosa * cosc, Ayz = sina * sinb * cosc - cosa * sinc;
    let Azx = -sinb, Azy = cosb * sinc, Azz = cosb * cosc;
    let px = points[0];
    let py = points[1];
    let pz = points[2];
    points[0] = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
function movePointInDirection(point, direction, distance) {
    let add = rotate(direction.x, 0, direction.y, [{ x: distance.x, y: distance.y, z: distance.z }])[0];
    return { x: add.x + point.x, y: add.y + point.y, z: add.z + point.z };
}
function evaluateCoordinates(x, y, z, startingPosition, rotation) {
    let coordinates = startingPosition;
    [x, y, z].forEach((v, i) => { if (v.startsWith("^")) {
        if (v.length == 1) { }
        else {
            let crds = [0, 0, 0];
            crds[i] = Number(v.slice(1));
            coordinates = movePointInDirection(coordinates, rotation, { x: crds[0], y: crds[1], z: crds[2] });
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) {
        if (v.length == 1) { }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            crds[i] = crds[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("*")) {
        if (v.length == 1) {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i];
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
        else {
            let crds = [coordinates.x, coordinates.y, coordinates.z];
            let crdsb = [startingPosition.x, startingPosition.y, startingPosition.z];
            crds[i] = crdsb[i] + Number(v.slice(1));
            coordinates = { x: crds[0], y: crds[1], z: crds[2] };
        }
    } });
    [x, y, z].forEach((v, i) => { if (v.startsWith("~")) { }
    else {
        if (v.startsWith("^")) { }
        else {
            if (v.startsWith("*")) { }
            else {
                let crds = [coordinates.x, coordinates.y, coordinates.z];
                crds[i] = Number(v.slice(0));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    } });
    return coordinates;
}
function convertToCompoundBlockVolume(selection) { let compoundFullBlockVolumes = new CompoundBlockVolume({ x: 0, y: 0, z: 0 }); let blockVolumeAllLists; blockVolumeAllLists = []; selection.split("|").forEach((selectionSection) => { blockVolumeAllLists.push({ from: { x: Number(selectionSection.split(", ")[0]), y: Number(selectionSection.split(", ")[1]), z: Number(selectionSection.split(", ")[2]) }, to: { x: Number(selectionSection.split(", ")[3]), y: Number(selectionSection.split(", ")[4]), z: Number(selectionSection.split(", ")[5]) } }); }); return blockVolumeAllLists; }
function testIsWithinRanges(blockvolumes, location) { let withinRange = false; blockvolumes.forEach((blockvolume) => { if ((((blockvolume.from.x >= location.x && location.x >= blockvolume.to.x) || (blockvolume.to.x >= location.x && location.x >= blockvolume.from.x)) && ((blockvolume.from.y >= location.y && location.y >= blockvolume.to.y) || (blockvolume.to.y >= location.y && location.y >= blockvolume.from.y)) && ((blockvolume.from.z >= location.z && location.z >= blockvolume.to.z) || (blockvolume.to.z >= location.z && location.z >= blockvolume.from.z)))) {
    withinRange = true;
} }); return withinRange; }
/**
 * Returns the sum of a and b
 * @param {ModalFormData|ActionFormData|MessageFormData} form
 * @param {Player} player
 * @param {number} timeout If set to true, the function will return an array
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse|undefined} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
async function forceShow(form, player, timeout) {
    const timeoutTicks = system.currentTick + (timeout ?? 9999);
    while (system.currentTick <= timeoutTicks) {
        const r = await form.show(player);
        if (r.cancelationReason != "UserBusy" || r.canceled == false) {
            return r;
        }
    }
}
function getAreas(prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let b = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    a.forEach((aelement, i) => { b[i] = String(world.getDynamicProperty(aelement)); });
    return { positive: convertToCompoundBlockVolume(getType(b.join("|"), 0) ?? "0, 0, 0, 0, 0, 0, 0"), negative: convertToCompoundBlockVolume(getType(b.join("|"), 1) ?? "0, 0, 0, 0, 0, 0, 1") };
}
function editAreas(player, prefix) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let b = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    a.forEach((aelement, i) => { /*console.warn(aelement.slice(22)); */ form1234.button(aelement.slice(prefix.length), "textures/ui/area_xyz"); b[i] = String(world.getDynamicProperty(aelement)); });
    form1234.button("Add New", "textures/ui/check_mark");
    form1234.button("Back", "textures/ui/chat_return_back_arrow");
    forceShow(form1234, player).then((t) => {
        if (t.canceled)
            return;
        switch (true) {
            case (t.selection == a.length):
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type");
                forceShow(form12345, player).then((q) => { if (q.canceled)
                    return; const [id, value] = q.formValues; world.setDynamicProperty(prefix + id, String(value)); });
                break;
            case (t.selection == a.length + 1): /*
            editPistonExtensionAreas(player)*/ /*
            screenForm123(); */
                break;
            default:
                form1234567.button("Edit", "textures/ui/book_edit");
                form1234567.button("Delete", "textures/ui/trash_can");
                form1234567.button("Back", "textures/ui/chat_return_back_arrow");
                forceShow(form1234567, player).then((w) => {
                    if (w.canceled)
                        return;
                    switch (w.selection) {
                        case 0:
                            form123456.textField("Area Value(type of 0 = normal, type of 1 = negative)", "x1, y1, z1, x2, y2, z2, type", String(world.getDynamicProperty(String(a[Number(t.selection)]))));
                            forceShow(form123456, player).then((q) => { if (q.canceled)
                                return; const [value] = q.formValues; world.setDynamicProperty(a[t.selection], String(value)); });
                            break;
                        case 1:
                            world.setDynamicProperty(a[t.selection], undefined);
                            break;
                        case 2:
                            editAreas(player, prefix);
                            break;
                    }
                });
                break;
        }
    });
}
const customFormDataTypes = [ModalFormData, ActionFormData, MessageFormData];
const customFormDataTypeIds = ["ModalFormData", "ActionFormData", "MessageFormData"];
const customElementTypes = [ModalFormData.prototype.title, ModalFormData.prototype.textField, ModalFormData.prototype.dropdown, ModalFormData.prototype.toggle, ModalFormData.prototype.slider, ActionFormData.prototype.body, ActionFormData.prototype.button, MessageFormData.prototype.button1, MessageFormData.prototype.button2];
const customElementTypeIds = ["title", "textField", "dropdown", "toggle", "slider", "body", "button", "button1", "button2"];
function editCustomFormUI(UIId) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let variableList = "formType, formTitle";
    let form12 = new ModalFormData();
    let form1234 = new ModalFormData();
    let indexList;
    indexList = [];
    let indexListB;
    indexListB = [];
    form12.dropdown("Form Type", customFormDataTypeIds, Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0]));
    form12.textField("Form Title (JavaScript Code)", "\"My Form\" or {rawtext: [{text: \"hi\"}]}", String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|"));
    customUI.optionElements.forEach((element, index) => {
        form12.dropdown("§lElement " + Number(element.index) + "§r§f\nElement Type", customElementTypeIds, element.typeIndex);
        form12.textField("Element Argument 1", "JavaScript Code", element.args[0]?.toString());
        form12.textField("Element Argument 2", "JavaScript Code", element.args[1]?.toString());
        form12.textField("Element Argument 3", "JavaScript Code", element.args[2]?.toString());
        form12.textField("Element Argument 4", "JavaScript Code", element.args[3]?.toString());
        form12.textField("Element Argument 5", "JavaScript Code", element.args[4]?.toString());
        form12.toggle("Remove Element " + element.index);
        indexList.push(element.index);
        variableList = variableList + ", elementType" + index + ", elementArgumentA" + index + ", elementArgumentB" + index + ", elementArgumentC" + index + ", elementArgumentD" + index + ", elementArgumentE" + index + ", removeElement" + index;
    });
    customUI.codeValues.forEach((element, index) => {
        if (index == 0) {
            form1234.textField("The response variable is \"r\", if ActionFormData or MessageFormData was chosen then r.selection can be used to see which button was chosen, and if ModalFormData was chosen then r.formValues can be used to get an array containing the values of the form. \nCode Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);
        }
        else {
            form1234.textField("Code Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);
        }
        form1234.toggle("Remove Code Line " + Number(customUI.codeIds[index].split("|")[1]));
        indexListB.push(Number(customUI.codeIds[index].split("|")[1]));
    });
    form1234.toggle("New Code Line");
    form1234.textField("New Code Line Index", "Number", String(((indexListB[indexListB.length - 1] ?? 0) + 1)));
    form12.toggle("New Element");
    form12.textField("New Element Index", "Number", String(((indexList[indexList.length - 1] ?? 0) + 1)));
    return { form: form12, variableList: variableList, indexList: indexList, formB: form1234, indexListB: indexListB };
}
function showCustomFormUI(UIId, player) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let form12345678 = new customFormDataTypes[Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0])]();
    eval(`form12345678.title(${String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|")})`);
    customUI.optionElements.forEach((v, i) => { try {
        eval("form12345678." + v.code.replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")"));
    }
    catch (e) {
        console.error(e, e.stack);
    } }); /*
    form12.title({rawtext: [{text: "hi"}]})*/
    let rb;
    forceShow(form12345678, player).then((r) => { try {
        rb = r;
        eval(customUI.code);
    }
    catch (e) {
        console.error(e, e.stack);
    } });
    return { form: form12345678, customUI: customUI, optionElements: customUI.optionElements, formResponse: rb };
}
function customFormUIEditor(UIId, player, goBackToMenu = false) {
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9);
    let form = editCustomFormUI(formId);
    forceShow(form.form, player).then(to => {
        let t = to;
        if (t.canceled)
            return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`);
        let elementValues = t.formValues.slice(2, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 7) {
                case 0:
                    world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i + 1, i + 6).join("|")}`);
                    break;
                case 6:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`);
                    }
                    ;
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length - 1]) ?? ((form.indexList[form.indexList.length - 1] ?? -1) + 1))}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
;
function customFormUIEditorCode(UIId, player, goBackToMenu = false) {
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9);
    let form = editCustomFormUI(formId);
    forceShow(form.formB, player).then(to => {
        let t = to;
        if (t.canceled)
            return;
        let elementValues = t.formValues.slice(0, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 2) {
                case 0:
                    world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`, `${String(elementValues[i])}`);
                    break;
                case 1:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`);
                    }
                    ;
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUICode:${formId}|${(Number(t.formValues[t.formValues.length - 1]) ?? ((form.indexListB[form.indexListB.length - 1] ?? -1) + 1))}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
;
function addNewCustomFormUI(player, goBackToMenu = false) {
    let form12345 = new ModalFormData();
    form12345.textField("Name", "myForm");
    forceShow(form12345, player).then((t) => {
        if (t.canceled)
            return;
        let ta = t;
        try {
            world.setDynamicProperty(`customUI:${String(ta.formValues[0]).replaceAll("|", "\\vls")}`, "0|\"My Form\"");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    });
}
;
function customFormListSelectionMenu(player) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUI:")));
    let b;
    b = [];
    let form1234 = new ActionFormData();
    a.forEach((aelement, i) => { b[i] = String(world.getDynamicProperty(aelement)); form1234.button(aelement.slice(9), String(world.getDynamicProperty(`customUIIcon:${aelement.slice(9)}`) ?? "textures/ui/book_edit_default")); });
    form1234.title("Custom Form UI Selector");
    form1234.button("Add New", "textures/ui/color_plus");
    form1234.button("Close", "textures/ui/arrow_left");
    let form123456 = new ActionFormData();
    form123456.button("Edit Elements", "textures/ui/color_plus");
    form123456.button("Edit Code", "textures/ui/color_plus");
    form123456.button("View", "textures/ui/color_plus");
    form123456.button("Delete", "textures/ui/color_plus");
    form123456.button("Back", "textures/ui/arrow_left");
    forceShow(form1234, player).then((t) => {
        let ta = t;
        if (ta.canceled && ta.cancelationReason == FormCancelationReason.UserClosed) {
            return;
        }
        ;
        switch (true) {
            case (ta.selection == a.length):
                addNewCustomFormUI(player, true);
                showCustomFormUI(a[ta.selection].slice(9), player);
                break;
            case (ta.selection == a.length + 1):
                break;
            default:
                forceShow(form123456, player).then((v) => {
                    let va = v;
                    if (va.canceled && va.cancelationReason == FormCancelationReason.UserClosed) {
                        return;
                    }
                    ;
                    switch (va.selection) {
                        case 0:
                            customFormUIEditor(a[ta.selection], player, true);
                            break;
                        case 1:
                            customFormUIEditorCode(a[ta.selection], player, true);
                            break;
                        case 2:
                            showCustomFormUI(a[ta.selection].slice(9), player);
                            break;
                        case 3:
                            let form12345678 = new MessageFormData();
                            form12345678.title("Confirm Custom UI Deletion");
                            form12345678.body(`Are you sure you want to delete the custom UI ${a[ta.selection]}`);
                            form12345678.button1("Cancel");
                            form12345678.button2("Confirm");
                            forceShow(form12345678, player).then((u) => {
                                let ua = u;
                                if (ua.canceled && ua.cancelationReason == FormCancelationReason.UserClosed) {
                                    return;
                                }
                                ;
                                switch (ua.selection) {
                                    case 0:
                                        customFormListSelectionMenu(player);
                                        break;
                                    case 1:
                                        world.setDynamicProperty(a[ta.selection]);
                                        world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUIElement:" + a[ta.selection].slice(9) + "|"))).forEach((k) => { world.setDynamicProperty(k); });
                                        world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUICode:" + a[ta.selection].slice(9) + "|"))).forEach((k) => { world.setDynamicProperty(k); });
                                        customFormListSelectionMenu(player);
                                        break;
                                    default:
                                        customFormListSelectionMenu(player);
                                        break;
                                }
                            });
                            break;
                        case 4:
                            customFormListSelectionMenu(player);
                            break;
                    }
                });
                break;
        }
    });
}
;
function getTopSolidBlock(location, dimension) { let block = dimension.getBlock({ x: location.x, y: dimension.heightRange.max, z: location.z }); while (block.y >= dimension.heightRange.min) {
    if (block.isAir) {
        block = block.below(1);
    }
    else {
        return block;
    }
} ; return undefined; }
;
Object.defineProperty(String.prototype, 'escapeCharacters', { value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s) {
        //:Get primitive copy of string:
        var str = this.valueOf(); /*
        console.warn(unescape(str))*/
        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", "\"");
            str = str.replaceAll("\\qs", "\'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", "\;");
            str = str.replaceAll("\\cf", "\:");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                if ((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)) { /*
                    console.warn((values.slice(0, 6))); */
                    strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6);
                }
                else {
                    if ((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)) {
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8);
                    }
                    else {
                        if ((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)) {
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7);
                        }
                        else {
                            if ((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)) {
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6);
                            }
                            else {
                                if ((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)) {
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5);
                                }
                                else {
                                    if ((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)) {
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4);
                                    }
                                    else {
                                        if ((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)) {
                                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3);
                                        }
                                        else {
                                            if ((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)) {
                                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2);
                                            }
                                            else {
                                                if (index !== 0) {
                                                    strarray[index] = "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }
        //:Return modified copy:
        return (str);
    } });
Object.defineProperty(String.prototype, 'escapeCharactersB', { value: function (js, unicode, nullchar, uri, quotes, general, colon, x, s) {
        //:Get primitive copy of string:
        var str = this.valueOf(); /*
        console.warn(unescape(str))*/
        var eb;
        eb = undefined;
        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            }
            catch (e) {
                eb.push(e);
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", "\"");
            str = str.replaceAll("\\qs", "\'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", "\;");
            str = str.replaceAll("\\cf", "\:");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                if ((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)) { /*
                    console.warn((values.slice(0, 6))); */
                    strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6);
                }
                else {
                    if ((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)) {
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8);
                    }
                    else {
                        if ((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)) {
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7);
                        }
                        else {
                            if ((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)) {
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6);
                            }
                            else {
                                if ((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)) {
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5);
                                }
                                else {
                                    if ((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)) {
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4);
                                    }
                                    else {
                                        if ((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)) {
                                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3);
                                        }
                                        else {
                                            if ((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)) {
                                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2);
                                            }
                                            else {
                                                if (index !== 0) {
                                                    strarray[index] = "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }
        //:Return modified copy:
        return ({ v: str, e: eb });
    } });
world.afterEvents.worldInitialize.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:worldInitialize")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("worldInitializeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    try {
        if (world.scoreboard.getObjective("andexdbDebug") == undefined) {
            world.scoreboard.addObjective("andexdbDebug", "andexdbScriptDebuggingService");
        }
    }
    catch (e) { } /*
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
world.beforeEvents.dataDrivenEntityTriggerEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("dataDrivenEntityTriggerEventBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + ", " + e.stack);
            }
        });
    }
    ;
    try {
        world.getAllPlayers().filter((player) => { player.hasTag("getEntityTriggerEventNotifications"); }).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.id + ", getComponentGroupsToAdd: " + event.getModifiers()[0].addedComponentGroups + ", getComponentGroupsToRemove: " + event.getModifiers()[0].removedComponentGroups + ", getTriggers: " + event.getModifiers()[0].triggers); });
        if (event.id == "andexsa:friction_modifier_0.9") {
            let componentGroups = event.getModifiers()[0]; /*
            console.warn(event.id)
            console.warn(componentGroups.getComponentGroupsToAdd())*/
            componentGroups.addedComponentGroups = ["andexsa:player_is_baby"]; /*
            console.warn(componentGroups.getComponentGroupsToAdd())*/
            event.setModifiers([componentGroups]);
            console.warn(event.getModifiers()[0].addedComponentGroups);
        }
    }
    catch { }
});
; /*
  world.beforeEvents.pistonActivate.subscribe(event => {
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:pistonActivate")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("pistonActivateBeforeEventDebugErrors")){currentplayer.sendMessage(e + ", " + e.stack)}})}
      world.getAllPlayers().filter((player) => ( player.hasTag("getEntityTriggerEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("id: " + event.block.typeId + ", getComponentGroupsToAdd: " + event.piston.getAttachedBlocks()[0].x + ", getComponentGroupsToRemove: " + event.isExpanding) + ", getTriggers: " + event.dimension; });
      if (testIsWithinRanges(noPistonExtensionAreas, event.block.location) == true) {
        event.cancel = true*/ /*
  console.warn(event.isExpanding);
  console.warn(event.block.x, event.block.y, event.block.z);
  console.warn(event.piston.getAttachedBlocks());
  console.warn(event.dimension);*/ /*
}
});*/
world.beforeEvents.effectAdd.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("effectAddBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.beforeEvents.entityRemove.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityRemoveBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.beforeEvents.itemDefinitionEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemDefinitionEventBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.beforeEvents.playerInteractWithEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithEntityBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.beforeEvents.playerLeave.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerLeaveBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.blockExplode.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:blockExplode")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("blockExplodeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.buttonPush.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:buttonPush")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("buttonPushAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.chatSend.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:chatSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.dataDrivenEntityTriggerEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:dataDrivenEntityTrigger")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("dataDrivenEntityTriggerEventAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.effectAdd.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("effectAddAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityDie.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityDie")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityDieAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityHealthChanged.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHealthChanged")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHealthChangedAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityHitEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityHurt.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHurt")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHurtAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityLoad.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityLoad")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityLoadAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entityRemove.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityRemoveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.entitySpawn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entitySpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entitySpawnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.explosion.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("explosionAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemCompleteUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemCompleteUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemCompleteUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemDefinitionEvent.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemDefinitionEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemDefinitionEventAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemReleaseUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemStartUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStartUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStartUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemStartUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStartUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStartUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemStopUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStopUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemStopUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemStopUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.itemUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseOnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.leverAction.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:leverAction")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("leverActionAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.messageReceive.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:messageReceive")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("messageReceiveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.pistonActivate.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pistonActivate")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pistonActivateAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerBreakBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerBreakBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerBreakBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerDimensionChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerDimensionChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerDimensionChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerInteractWithBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerInteractWithEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerJoin.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerJoin")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerJoinAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerLeave.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerLeaveAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerPlaceBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerPlaceBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerPlaceBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.playerSpawn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerSpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerSpawnAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.pressurePlatePop.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePop")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pressurePlatePopAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.pressurePlatePush.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePush")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("pressurePlatePushAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.projectileHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("projectileHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.projectileHitEntity.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitEntity")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("projectileHitEntityAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.targetBlockHit.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:targetBlockHit")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("targetBlockHitAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.tripWireTrip.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:tripWireTrip")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("tripWireTripAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.afterEvents.weatherChange.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:weatherChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("weatherChangeAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
});
world.beforeEvents.explosion.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("explosionBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    } /*
    eval(String(world.getDynamicProperty("scriptEvalBeforeEventsExplosion")))*/
    world.getAllPlayers().filter((player) => (player.hasTag("getExplosionEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("Location: [ " + event.source.location.x + ", " + event.source.location.y + ", " + event.source.location.z + " ], Dimension: " + event.dimension.id); });
    if ((((testIsWithinRanges(noExplosionAreas.positive, event.source.location) ?? false) == true) && ((testIsWithinRanges(noExplosionAreas.negative, event.source.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive, event.source.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative, event.source.location) ?? false) == false))) {
        event.cancel = true; /*
          console.warn(event.isExpanding);
          console.warn(event.block.x, event.block.y, event.block.z);
          console.warn(event.piston.getAttachedBlocks());
          console.warn(event.dimension);*/
    }
    else {
        event.setImpactedBlocks(event.getImpactedBlocks().filter((blockselected) => ((((testIsWithinRanges(noExplosionAreas.positive, blockselected.location) ?? false) == true) && ((testIsWithinRanges(noExplosionAreas.negative, blockselected.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive, blockselected.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative, blockselected.location) ?? false) == false)))));
    }
});
world.afterEvents.itemReleaseUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.source.setDynamicProperty("interactable_block", 0);
    }
    ;
});
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerInteractWithBlockBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true;
        let delay = 4;
        let holdDuration = 10;
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
        if ((interactable_block.find((playerId) => (playerId.id == event.player.id)).delay == 0) || ((event.player.getDynamicProperty("debugStickSelectedBlock") != event.block.typeId))) {
            interactable_block.find((playerId) => (playerId.id == event.player.id)).delay = delay;
            interactable_block.find((playerId) => (playerId.id == event.player.id)).holdDuration = holdDuration;
            debugAction(event.block, event.player, 0, Number(event.player.isSneaking));
        }
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerBlockInteractionEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.playerInteractWithBlock]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Player: " + event.player.name); });
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockInteractAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockInteractAreas.negative, event.block.location) ?? false) == false)) || (((testIsWithinRanges(noInteractAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noInteractAreas.negative, event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
});
world.beforeEvents.itemUseOn.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseOnBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true; /*
    debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)*/
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerItemUseOnEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.itemUseOn]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Player: " + event.source.name); });
    if ((event.source.getDynamicProperty("canBypassProtectedAreas") != true && event.source.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockInteractAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockInteractAreas.negative, event.block.location) ?? false) == false)) || (((testIsWithinRanges(noInteractAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noInteractAreas.negative, event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
});
world.beforeEvents.playerBreakBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerBreakBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("playerBreakBlockBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (event.itemStack?.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
        event.cancel = true;
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerBlockBreakingEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.playerBreakBlock]Location: [ " + event.block.location.x + ", " + event.block.location.y + ", " + event.block.location.z + " ], Dimension: " + event.block.dimension.id + ", Block Type: " + (event.block?.typeId ?? "") + ", Player: " + event.player.name); });
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockBreakAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockBreakAreas.negative, event.block.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative, event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
});
world.beforeEvents.playerPlaceBlock.subscribe(event => {
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
    if ((event.player.getDynamicProperty("canBypassProtectedAreas") != true && event.player.hasTag("canBypassProtectedAreas") != true) && ((((testIsWithinRanges(noBlockPlaceAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(noBlockPlaceAreas.negative, event.block.location) ?? false) == false)) || (((testIsWithinRanges(protectedAreas.positive, event.block.location) ?? false) == true) && ((testIsWithinRanges(protectedAreas.negative, event.block.location) ?? false) == false)))) {
        event.cancel = true;
    }
});
/*${scripteval}world.getAllPlayers().filter((p)=>(p.getDynamicProperty("canBypassProtectedAreas") == undefined)).forEach((p)=>{p.setDynamicProperty("canBypassProtectedAreas", false)})*/
/*${scripteval}world.getAllPlayers().find((p)=>(p.name == "Andexter8")).setDynamicProperty("canBypassProtectedAreas", true)*/
world.afterEvents.entityHitBlock.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHitBlock")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("entityHitBlockAfterEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (event.damagingEntity.getComponent("minecraft:inventory").container.getItem(event.damagingEntity.selectedSlot)?.typeId === "andexdb:debug_stick") {
        debugAction(event.hitBlock, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
    }
    ;
    if (event.damagingEntity.getComponent("minecraft:inventory").container.getItem(event.damagingEntity.selectedSlot)?.typeId === "andexdb:liquid_clipped_debug_stick") {
        debugAction(event.damagingEntity.getBlockFromViewDirection({ includeLiquidBlocks: true }).block, event.damagingEntity, 1, Number(event.damagingEntity.isSneaking));
    }
    ;
    world.getAllPlayers().filter((player) => (player.hasTag("getEntityHitBlockEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.entityHitBlock]Location: " + event.hitBlock.location + ", Dimension: " + event.hitBlock.dimension + ", Block Type: " + (event.hitBlock?.typeId ?? "") + ", Player: " + event.damagingEntity.name); });
});
system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (interactable_block.find((playerId) => (playerId.id == player.id)) == undefined) {
            interactable_block.push({ id: player.id, delay: 0, holdDuration: 0 });
        }
        else {
            interactable_block.find((playerId) => (playerId.id == player.id)).delay = Math.max(0, interactable_block.find((playerId) => (playerId.id == player.id)).delay - 1);
            interactable_block.find((playerId) => (playerId.id == player.id)).holdDuration = Math.max(0, interactable_block.find((playerId) => (playerId.id == player.id)).holdDuration - 1);
        }
        ; /*if (player.isSneaking && ((interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == 0) || (interactable_block.find((playerId)=>(playerId.id == player.id)).holdDuration == undefined)) && ((player.getComponent("minecraft:inventory") as EntityInventoryComponent).container.getItem(player.selectedSlot).typeId === "andexdb:debug_stick")){
            player.onScreenDisplay.setActionBar(`§l§eTags: §r§a${player.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(player.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)}; */
    });
}, 1);
system.runInterval(() => { try {
    eval(String(world.getDynamicProperty("autoEval:everyTick")));
}
catch { } ; }, 1); //fixed and this one is also nows new
world.beforeEvents.itemUse.subscribe(event => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("itemUseBeforeEventDebugErrors")) {
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    world.getAllPlayers().filter((player) => (player.hasTag("getPlayerItemUseEventNotifications"))).forEach((currentPlayer) => { currentPlayer.sendMessage("[beforeEvents.itemUseOn]Location: [ " + event.source.location.x + ", " + event.source.location.y + ", " + event.source.location.z + " ], Dimension: " + event.source.dimension.id + ", Item Type: " + (event.itemStack?.typeId ?? "") + ", Player: " + event.source.name); }); /*
    if (event.itemStack.typeId === "andexdb:debug_stick" || event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick"){*/ /*
    if (interactable_block == true){interactable_block = false}else{*/ /*
        interactable_block.find((playerId)=>(playerId.id == event.source.id)).delay = 0; */ /*
if (event.source.isSneaking){system.run(()=>{
    event.cancel = false;
    (event.source as Player).onScreenDisplay.setActionBar(`§l§eTags: §r§a${event.source.getBlockFromViewDirection().block.getTags().join(", ")}\n§l§eBlock States: §r§a${Object.entries(event.source.getBlockFromViewDirection().block.permutation.getAllStates()).join("\n")}`)})}; */ /*
debugAction(event.source.getBlockFromViewDirection().block, event.source, 0)
}; */ /*
    }; */
    if (event.itemStack.typeId === "andexdb:inventory_controller") {
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
    if (event.itemStack.typeId === "andexdb:debug_stick" && event.itemStack.nameTag === "§r§dItem Modifier") {
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
    if (event.itemStack.typeId === "andexdb:command_runner") {
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
    if (event.itemStack.typeId === "andexdb:editor_stick") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:debugStick hisa"));
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
    if (event.itemStack.typeId === "andexdb:debug_stick_b") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:debugStickMenuB hisa"));
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
    if (event.itemStack.typeId === "andexdb:debug_stick_c") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:debugStickMenuC hisa"));
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
    if (event.itemStack.typeId === "andexdb:player_debug_stick") {
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
    if (event.itemStack.typeId === "andexdb:player_controller") {
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
    if (event.itemStack.typeId === "andexdb:debug_screen") {
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
    if (event.itemStack.typeId === "andexdb:entity_controller") {
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
    if (event.itemStack.typeId === "andexdb:entity_debug_stick") {
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
    if (event.itemStack.typeId === "andexdb:selection_menu") {
        event.cancel = true;
        try {
            (event.source).runCommandAsync(String("/scriptevent andexdb:editorMenusAndLists hisa"));
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
});
world.beforeEvents.chatSend.subscribe((eventData) => {
    let event = eventData;
    const player = eventData.sender;
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
            currentplayer.sendMessage((e + " " + e.stack));
        } });
    }
    let newMessage = eventData.message;
    try {
        world.getAllPlayers().filter((p) => (p.hasTag("getAllChatMessages"))).forEach((p) => { try {
            p.sendMessage("[§l§dServer§r§f][" + player.name + "]: " + newMessage);
        }
        catch { } });
    }
    catch { }
    if (world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") == true) {
        newMessage = newMessage.escapeCharacters(true);
    }
    if (world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") == true) {
        newMessage = newMessage.escapeCharacters(false, false, 0, true);
    }
    if (world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") != false) {
        if (newMessage.includes("${ea}")) {
            newMessage = newMessage.replace("${ea}", "");
            newMessage = newMessage.escapeCharacters(true);
        }
        if (newMessage.includes("${eu}")) {
            newMessage = newMessage.replace("${eu}", "");
            newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false);
        }
        if (newMessage.includes("${ei}")) {
            newMessage = newMessage.replace("${ei}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false);
        }
        if (newMessage.includes("${eg}")) {
            newMessage = newMessage.replace("${eg}", "");
            newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false);
        }
        if (newMessage.includes("${ex}")) {
            newMessage = newMessage.replace("${ex}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false);
        }
        if (newMessage.includes("${escapeall}")) {
            newMessage = newMessage.replace("${escapeall}", "");
            newMessage = newMessage.escapeCharacters(true);
        }
        if (newMessage.includes("${escapeunicode}")) {
            newMessage = newMessage.replace("${escapeunicode}", "");
            newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false);
        }
        if (newMessage.includes("${escapeuri}")) {
            newMessage = newMessage.replace("${escapeuri}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false);
        }
        if (newMessage.includes("${escapegeneral}")) {
            newMessage = newMessage.replace("${escapegeneral}", "");
            newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false);
        }
        if (newMessage.includes("${escapex}")) {
            newMessage = newMessage.replace("${escapex}", "");
            newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false);
        }
    }
    if (newMessage.includes("${se}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)) {
        newMessage = newMessage.replace("${se}", "");
        try {
            eval(newMessage);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        ;
        eventData.cancel = true;
        return;
    }
    else {
        if (newMessage.includes("${r}") && ((player.isOp() == true) || (player.getDynamicProperty("canUseCommands") == true))) {
            newMessage = newMessage.replace("${r}", "");
            player.runCommandAsync(newMessage);
            eventData.cancel = true;
            return;
        }
    }
    if (newMessage.includes("${scripteval}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)) {
        newMessage = newMessage.replace("${scripteval}", "");
        try {
            eval(newMessage);
        }
        catch (e) {
            console.error(e, e.stack);
            eventData.sender.sendMessage(e + " " + e.stack);
        }
        ;
        eventData.cancel = true;
        return;
    }
    else {
        if (newMessage.includes("${run}") && ((player.isOp() == true) || (player.getDynamicProperty("canUseCommands") == true))) {
            newMessage = newMessage.replace("${run}", "");
            player.runCommandAsync(newMessage);
            eventData.cancel = true;
            return;
        }
    }
    /*${scripteval}world.getAllPlayers().forEach((t)=>{t.setDynamicProperty("canUseScriptEval", true)}); */
    if ((player.hasTag('noCustomChatMessages') && !player.hasTag('canUseChatCommands'))) {
        return;
    }
    /*if(!((eventData.message.includes("${scripteval}") && (player.getDynamicProperty("canUseScriptEval") == true))||(eventData.message.includes("${run}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true)))||(eventData.message.startsWith("\\")))){world.getDimension("overworld").runCommand("/playsound note.harp.ui @a ~~~ 1 0.75 1"); }*/
    let runreturn;
    runreturn = false;
    if (world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != undefined && world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != "") {
        String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "").split(", ").forEach((prefix) => { if (newMessage.startsWith(prefix))
            runreturn = true; });
    }
    ;
    if (Boolean(runreturn) == true) {
        eventData.cancel = true;
        return;
    }
    if (world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") != false && newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) && player.hasTag('canUseChatCommands') /* && (eventData.message.startsWith(".give") || eventData.message.startsWith(".giveb") || eventData.message.startsWith(".h1") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".playersettings") || eventData.message.startsWith(".run") || eventData.message.startsWith(".setitem") || eventData.message.startsWith(".invsee") || eventData.message.startsWith(".settings") || eventData.message.startsWith(".help") || eventData.message.startsWith(".h1 ") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".h4") || eventData.message.startsWith(".h5") || eventData.message.startsWith(".w1") || eventData.message.startsWith(".w2") || eventData.message.startsWith(".debugstick") || eventData.message.startsWith(".playercontroller") || eventData.message.startsWith(".setslot") || eventData.message.startsWith(".worlddebug") || eventData.message.startsWith(".gmc") || eventData.message.startsWith(".gms") || eventData.message.startsWith(".gma") || eventData.message.startsWith(".gmd") || eventData.message.startsWith(".gmp") || eventData.message.startsWith(".spawn") || eventData.message.startsWith(".warp") || eventData.message.startsWith(".home") || eventData.message.startsWith(".all") || eventData.message.startsWith(".getEntityUUIDSelector"))*/) {
        function hotbarSwap(row, preset) {
            let inventorye = player.getComponent("inventory");
            let inventoryblock = world.getDimension(String(player.getDynamicProperty("hotbarPreset" + preset)).replaceAll(",", "").split(" ")[0]).getBlock({ x: Number(String(player.getDynamicProperty("hotbarPreset" + preset)).replaceAll(",", "").split(" ")[1]), y: Number(String(player.getDynamicProperty("hotbarPreset" + preset)).replaceAll(",", "").split(" ")[2]), z: Number(String(player.getDynamicProperty("hotbarPreset" + preset)).replaceAll(",", "").split(" ")[3]) }).getComponent("inventory");
            system.run(() => { try {
                for (let i = 0; i < 9; i++) {
                    inventorye.container.swapItems(i, i + ((row - 1) * 9), inventoryblock.container);
                }
                ; /*; eventData.sender.sendMessage(String("l" + slotsArray))*/
            }
            catch (e) {
                eventData.sender.sendMessage("§c" + e + " " + e.stack);
            } });
        }
        let switchTest = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ")[0];
        let switchTestB = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length);
        switch (true) {
            case !!switchTest.match(/^give$/):
                eventData.cancel = true;
                const inventory = player.getComponent("inventory");
                system.run(() => { try {
                    inventory.container.addItem(new ItemStack(newMessage.slice(6).split(" ")[0], Number(newMessage.slice(6).split(" ")[1])));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + " " + e.stack);
                } });
                break;
            case !!switchTest.match(/^giveb$/):
                eventData.cancel = true;
                const inventoryb = player.getComponent("inventory");
                system.run(() => { try {
                    let slotsArray = [];
                    for (let i = 0; i < inventoryb.inventorySize; i++) {
                        if (inventoryb.container.getItem(Number(i)) !== undefined) {
                            slotsArray = slotsArray.concat(String(inventoryb.container.getItem(Number(i)).typeId));
                        }
                        else {
                            slotsArray = slotsArray.concat("undefined");
                        }
                    }
                    ;
                    inventoryb.container.setItem(slotsArray.findIndex((itemName) => (itemName == "undefined")), new ItemStack(newMessage.slice(7).split(" ")[0], Number(newMessage.slice(7).split(" ")[1]))); /*; eventData.sender.sendMessage(String("l" + slotsArray))*/
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                } });
                break; /*
            case !!switchTest.match(/^h1$/):
                eventData.cancel = true;
                let inventorye = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblock = world.getDimension(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventorye.container.swapItems(i, i, inventoryblock.container)}; */ /*; eventData.sender.sendMessage(String("l" + slotsArray))*/ /*}catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
                break; */
            case !!switchTest.match(/^h\d*$/):
                eventData.cancel = true;
                try { /*player.sendMessage([String(Number(switchTestB.split(" ")[1] ?? 0)+1), String(switchTestB.split(" ")[0].slice(1))]); */
                    hotbarSwap(Number(switchTestB.split(" ")[1] ?? 0) + 1, Number(switchTestB.split(" ")[0].slice(1)));
                }
                catch (e) {
                    player.sendMessage([e, e.stack]);
                }
                break;
            case !!switchTest.match(/^hset$/):
                eventData.cancel = true;
                let coordinates = { x: undefined, y: undefined, z: undefined };
                try {
                    coordinates = evaluateCoordinates((switchTestB?.split(" ")?.slice(3)?.join(" ") ?? undefined).replaceAll(",", "").split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""), (switchTestB?.split(" ")?.slice(3)?.join(" ") ?? undefined).replaceAll(",", "").split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[1].replaceAll(" ", ""), (switchTestB?.split(" ")?.slice(3)?.join(" ") ?? undefined).replaceAll(",", "").split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[2].replaceAll(" ", ""), player?.location ?? { x: 0, y: 0, z: 0 }, player?.getRotation() ?? { x: 0, y: 0 });
                }
                catch { }
                player.sendMessage(JSON.stringify(coordinates) + ", " + (switchTestB?.split(" ")?.slice(3)?.join(" ") ?? undefined).replaceAll(",", "").split("~").join(" ~").split("^").join(" ^").split("*").join(" *").replaceAll("  ", " ").trimStart().split(" ")[0].replaceAll(" ", ""));
                if ((switchTestB?.split(" ")?.slice(2)?.join(" ") ?? undefined) != undefined) {
                    player.setDynamicProperty("hotbarPreset" + Number(switchTestB.slice(5).split(" ")[0]), (switchTestB?.split(" ")?.slice(2)[0] ?? undefined) + " " + coordinates.x + " " + coordinates.y + " " + coordinates.z);
                }
                else {
                    player.setDynamicProperty("hotbarPreset" + Number(switchTestB.slice(5).split(" ")[0]));
                } /*
                hotbarSwap(Number(newMessage.slice(2)) % 3, Math.ceil(Number(newMessage.slice(2))/3)); */
                if ((switchTestB?.split(" ")?.slice(2)?.join(" ") ?? undefined) != undefined) {
                    player.sendMessage(`Set hotbar preset ${switchTestB.slice(5).split(" ")[0]} to dimension: ${(switchTestB?.split(" ")?.slice(2)?.join(" ") ?? undefined).replaceAll(",", "").split(" ")[0]}, x: ${coordinates.x}, y: ${coordinates.y}, z: ${coordinates.z}. `);
                }
                else {
                    player.sendMessage(`Removed hotbar preset ${switchTest.slice(5).split(" ")[0]}. `);
                }
                break; /*
            case !!switchTest.match(/^h2$/):
                eventData.cancel = true;
                let inventoryf = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockb = world.getDimension(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryf.container.swapItems(i, i+9, inventoryblockb.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
            break;
            case !!switchTest.match(/^h3$/):
                eventData.cancel = true;
                let inventoryg = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc = world.getDimension(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg.container.swapItems(i, i+18, inventoryblockc.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
            break;
            case !!switchTest.match(/^h4$/):
                eventData.cancel = true;
                let inventoryg4 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc4 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg4.container.swapItems(i, i, inventoryblockc4.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
            break;
            case !!switchTest.match(/^h5$/):
                eventData.cancel = true;
                let inventoryg5 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc5 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg5.container.swapItems(i, i+9, inventoryblockc5.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
            break;
            case !!switchTest.match(/^h6$/):
                eventData.cancel = true;
                let inventoryg6 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc6 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg6.container.swapItems(i, i+18, inventoryblockc6.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}})
            break; */
            case !!switchTest.match(/^invsee$$/):
                eventData.cancel = true;
                system.run(() => {
                    const inventoryd2 = world.getPlayers().find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).getComponent("inventory");
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd2.inventorySize; i++) {
                            if (inventoryd2.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd2.container.getItem(Number(i)).typeId + ", amount: " + inventoryd2.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd2.container.getItem(Number(i)).getLore()));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        ;
                        eventData.sender.sendMessage(String(world.getPlayers().find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).name + "'s Items: \n" + slotsArray.join("\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                });
                break;
            case !!switchTest.match(/^binvsee$$/):
                eventData.cancel = true;
                system.run(() => {
                    const inventoryd2 = world.getDimension(newMessage.split(" ")[1]).getBlock({ x: Number(newMessage.split(" ")[2]), y: Number(newMessage.split(" ")[3]), z: Number(newMessage.split(" ")[4]) }).getComponent("inventory");
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd2.container.size; i++) {
                            if (inventoryd2.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd2.container.getItem(Number(i)).typeId + ", amount: " + inventoryd2.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd2.container.getItem(Number(i)).getLore()));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        ;
                        eventData.sender.sendMessage(String(world.getPlayers().find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).name + "'s Items: \n" + slotsArray.join("\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                });
                break;
            case !!switchTest.match(/^einvsee$$/):
                eventData.cancel = true;
                system.run(() => {
                    const inventoryd2 = world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities()).concat(world.getDimension("the_end").getEntities()).find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).getComponent("inventory");
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd2.inventorySize; i++) {
                            if (inventoryd2.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd2.container.getItem(Number(i)).typeId + ", amount: " + inventoryd2.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd2.container.getItem(Number(i)).getLore()));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        ;
                        eventData.sender.sendMessage(String(world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities()).concat(world.getDimension("the_end").getEntities()).find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).nameTag + "'s Items: \n" + slotsArray.join("\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                });
                break;
            case !!switchTest.match(/^invseeuuidmode$/):
                eventData.cancel = true;
                const inventoryd = world.getPlayers().find((playerFinders) => (playerFinders.id == newMessage.slice(8).split(" ")[0])).getComponent("inventory");
                system.run(() => { try {
                    let slotsArray = [];
                    for (let i = 0; i < inventoryd.inventorySize; i++) {
                        if (inventoryd.container.getItem(Number(i)) !== undefined) {
                            slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd.container.getItem(Number(i)).typeId + ", amount: " + inventoryd.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd.container.getItem(Number(i)).getLore()));
                        }
                        else {
                            slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                        }
                    }
                    ;
                    ;
                    eventData.sender.sendMessage(String(world.getPlayers().find((playerFinders) => (playerFinders.id == newMessage.slice(8).split(" ")[0])).name + "'s Items: \n" + slotsArray.join("\n")));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                } });
                break;
            case !!switchTest.match(/^setitem$/):
                eventData.cancel = true;
                switch (true) {
                    case (newMessage.split(" ").length >= 5):
                        {
                            let playerTotalVictimsList;
                            targetSelectorAllListB(newMessage.split(" ").slice(4).join(" "), "", Number(player.id)).forEach((player2) => {
                                playerTotalVictimsList.push(player2.name);
                                const inventoryc = player2.getComponent("inventory");
                                system.run(() => { try {
                                    inventoryc.container.setItem(Number(newMessage.slice(9).split(" ")[2]), new ItemStack(newMessage.slice(9).split(" ")[0], Number(newMessage.slice(9).split(" ")[1])));
                                    eventData.sender.sendMessage(String("Set Slot " + newMessage.slice(9).split(" ")[2] + " of " + player2.name + "\'s inventory to " + newMessage.slice(9).split(" ")[0] + " * " + newMessage.slice(9).split(" ")[1]));
                                }
                                catch (e) {
                                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                                } });
                            });
                            system.run(() => { targetSelectorAllListC("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", "", "~~~", player).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set Slot §c" + newMessage.slice(9).split(" ")[2] + "§r§f of §n[§f" + playerTotalVictimsList + "§r§u]§f inventories to §u" + newMessage.slice(9).split(" ")[0] + "§r§f * §c" + newMessage.slice(9).split(" ")[1])); }); });
                        }
                        break;
                    case (newMessage.split(" ").length <= 4):
                        {
                            const inventoryc = player.getComponent("inventory");
                            system.run(() => { try {
                                inventoryc.container.setItem(Number(newMessage.slice(9).split(" ")[2]), new ItemStack(newMessage.slice(9).split(" ")[0], Number(newMessage.slice(9).split(" ")[1])));
                                eventData.sender.sendMessage(String("Set Slot " + newMessage.slice(9).split(" ")[2] + " of " + player.name + "\'s inventory to " + newMessage.slice(9).split(" ")[0] + " * " + newMessage.slice(9).split(" ")[1]));
                                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set Slot " + newMessage.slice(9).split(" ")[2] + " of " + player.name + "\'s inventory to " + newMessage.slice(9).split(" ")[0] + " * " + newMessage.slice(9).split(" ")[1])); }); });
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            } });
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^item$/):
                eventData.cancel = true;
                let command = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length);
                switch (command.split(" ").slice(0, 1).join(" ")) {
                    case "item lore":
                        let lore = command.split(" ").slice(2).join(" ").escapeCharactersB(true);
                        if (lore.e != undefined) {
                            lore.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                        }
                        ;
                        player.getComponent("inventory").container.getSlot(player.selectedSlot).setLore(JSON.parse(lore.v));
                        break;
                    case "item name":
                        let name = command.split(" ").slice(2).join(" ").escapeCharactersB(true);
                        if (name.e != undefined) {
                            name.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                        }
                        ;
                        player.getComponent("inventory").container.getSlot(player.selectedSlot).nameTag = name.v;
                        break;
                    case "item slot":
                        switch (command.split(" ")[3]) {
                            case "lore":
                                let lore = command.split(" ").slice(4).join(" ").escapeCharactersB(true);
                                if (lore.e != undefined) {
                                    lore.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                                }
                                ;
                                player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).setLore(JSON.parse(lore.v));
                                break;
                            case "name":
                                let name = command.split(" ").slice(4).join(" ").escapeCharactersB(true);
                                if (name.e != undefined) {
                                    name.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                                }
                                ;
                                player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).nameTag = name.v;
                                break;
                            case "components":
                                eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                                break;
                            case "amount":
                                player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).amount = Number(command.split(" ").slice(4).join(" "));
                                break;
                            case "count":
                                player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).amount = Number(command.split(" ").slice(4).join(" "));
                                break;
                            case "nameTag":
                                let nameb = command.split(" ").slice(4).join(" ").escapeCharactersB(true);
                                if (nameb.e != undefined) {
                                    nameb.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                                }
                                ;
                                player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).nameTag = nameb.v;
                                break;
                            default:
                                eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.slice(4) + "\": at \"\\help >>" + newMessage.slice(6) + "<<\"");
                                break;
                        }
                        break;
                    case "item components":
                        eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                        break;
                    case "item amount":
                        player.getComponent("inventory").container.getSlot(player.selectedSlot).amount = Number(command.split(" ").slice(2).join(" "));
                        break;
                    case "item count":
                        player.getComponent("inventory").container.getSlot(player.selectedSlot).amount = Number(command.split(" ").slice(2).join(" "));
                        break;
                    case "item nameTag":
                        let nameb = command.split(" ").slice(2).join(" ").escapeCharactersB(true);
                        if (nameb.e != undefined) {
                            nameb.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                        }
                        ;
                        player.getComponent("inventory").container.getSlot(player.selectedSlot).nameTag = nameb.v;
                        break;
                    default:
                        eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.slice(4) + "\": at \"\\help >>" + newMessage.slice(6) + "<<\"");
                        break;
                }
                break;
            case !!switchTest.match(/^gmc$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode c");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to creative. ")); }); });
                break;
            case !!switchTest.match(/^gms$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode s");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to survival. ")); }); });
                break;
            case !!switchTest.match(/^gma$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode a");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to adventure. ")); }); });
                break;
            case !!switchTest.match(/^gmd$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode d");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to default. ")); }); });
                break;
            case !!switchTest.match(/^gmp$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode spectator");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to spectator. ")); }); });
                break;
            case !!switchTest.match(/^gmr$/):
                eventData.cancel = true;
                switch (Math.round(Math.random() * 4)) {
                    case 0:
                        try {
                            player.runCommandAsync("/gamemode c");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 1:
                        try {
                            player.runCommandAsync("/gamemode s");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            player.runCommandAsync("/gamemode a");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 3:
                        try {
                            player.runCommandAsync("/gamemode d");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 4:
                        try {
                            player.runCommandAsync("/gamemode spectator");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                ; /*
                    try{player.runCommandAsync("/gamemode random")}catch(e){eventData.sender.sendMessage("§c" + e + ", " + e.stack)}*/
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to random. ")); }); });
                break;
            case !!switchTest.match(/^settings$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)) {
                    case 3:
                        try {
                            player.runCommandAsync("/scriptevent andexdb:setWorldDynamicPropertyB " + newMessage.slice(10).split(" ")[0] + "|" + newMessage.slice(newMessage.split(" ")[1].length + 10));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length + 10));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + world.getDynamicProperty(newMessage.split(" ")[1]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^playersettings$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)) {
                    case 3:
                        try {
                            player.setDynamicProperty(newMessage.split(" ")[1], newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + player.getDynamicProperty(newMessage.split(" ")[1]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^entitysettings$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)) {
                    case 3:
                        try {
                            targetSelectorAllListB(newMessage.split(" ")[1].replaceAll("\\s", " "), "", Number(eventData.sender.id)).forEach((currentEntitySelectedValues) => { currentEntitySelectedValues.setDynamicProperty(newMessage.split(" ")[1], newMessage.slice(newMessage.split(" ")[1].length + 17)); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[2] + " to " + newMessage.slice(newMessage.split(" ")[2].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[2] + ": " + player.getDynamicProperty(newMessage.split(" ")[2]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^entitysettingsuuidselection$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)) {
                    case 3:
                        try {
                            world.getDimension(DimensionTypes.getAll().find((dimension) => (world.getDimension(dimension.typeId).getEntities().find((entity) => (entity.id == newMessage.split(" ")[1])))).typeId).getEntities().find((entity) => (entity.id == newMessage.split(" ")[1])).setDynamicProperty(newMessage.split(" ")[1], newMessage.slice(newMessage.split(" ")[1].length + 30));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + player.getDynamicProperty(newMessage.split(" ")[1]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^help$/):
                eventData.cancel = true;
                switch (newMessage) {
                    case "\\help":
                        eventData.sender.sendMessage("§2Help Chat Command Syntax§f\n.help scriptevent\n.help chatcommands§c\n.help entityevents\n.help items\n.help tags\n.help debugsticks".replaceAll("\n.", ("\n" + (world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))));
                        break;
                    case "\\help scriptevent":
                        eventData.sender.sendMessage("§2/scriptevent Syntax§f\n/scriptevent andexdb:debugStick <message: string>");
                        break;
                    case "\\help chatcommands":
                        eventData.sender.sendMessage(`§2Chat Commands Syntax§f\n.give <item: itemType> <amount: int>
.giveb <item: itemType> <amount: int>
.setitem <item: itemType> <amount: int> <slot: int>
.invsee <target: targetSelector>
.binvsee <block: blockPos>
.einvsee <entityUUID: int>
.invseeuuidmode <playerUUID: int>
.h<presetId: float> <containerRow: float>
.hset <presetId: float> [dimensionId: string] [x: float] [y: float] [z: float]
.gmc
.gms
.gma
.gmd
.gmp
.gmr
.getuuid <target: target>
.settings <setting: string> [value: string|int|boolean]
.warpset <dimension: dimension> <x: float> <y: float> <z: float> <name: escapableString>
.warp <name: escapableString>
.warpremove <name: escapableString>
.warpreset
.warplist
.warplistdetails
.warplistrawdata
.run <delayTicks: int> <command: command>
.eval <ScriptAPICode: JavaScript>
.top
.up <count: int> [placeGlass: bool]
.printlayers
.mainmenu`.replaceAll("\n.", ("\n" + (world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))));
                        break;
                    default:
                        eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + newMessage.slice(5) + "\": at \"\\help >>" + newMessage.slice(6) + "<<\"");
                        break;
                }
                break;
            case !!switchTest.match(/^getuuid$/):
                eventData.cancel = true;
                try {
                    system.runTimeout(() => { eventData.sender.sendMessage(String(targetSelector(newMessage.slice(23), "", Number(eventData.sender.id)))); }, 2);
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^run$/):
                eventData.cancel = true;
                try {
                    system.runTimeout(() => { let a = player.runCommand(newMessage.slice(Number(newMessage.split(" ")[1]) + 5)); eventData.sender.sendMessage(String(a.successCount)); if (player.runCommand(newMessage.slice(Number(newMessage.split(" ")[1]) + 5)).successCount != 0.0) {
                        targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: " + a + " Successfully waited " + Number(newMessage.split(" ")[1]) + " ticks and executed the command: " + newMessage.slice(Number(newMessage.split(" ")[1]) + 5))); });
                    } }, Number(newMessage.split(" ")[1]));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^eval$/):
                eventData.cancel = true;
                try {
                    eval(newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^warpset$/):
                eventData.cancel = true;
                let warpList = String(world.getDynamicProperty("globalWarpListValues")).split("||||"); /*
                console.warn("wasdqrte\\sanwqhieasdrt\\p\\nasqw".replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f")*/ /*.replaceAll(/[\\x]/g, "\x").replaceAll(/[\\u]/g, "\u")*/ /*.replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, ""))*/
                if (newMessage.split(" ").slice(5).join(" ").escapeCharactersB(true).e == undefined)
                    switch (warpList.find((findWarp) => (findWarp.split(", ")[0] == newMessage.split(" ").slice(5).join(" ") /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c"))) == undefined) {
                        case false: /*
                        if (newMessage.split(" ").slice(5).join(" ").replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "").replaceAll(", ", " ") == ""){*/ /*eventData.sender.sendMessage("§cError: missing required \"name\" field. "); */ /*break; */ /*}*/
                            try {
                                warpList[warpList.findIndex((warpItem) => (warpItem.split(", ")[0] == newMessage.split(" ").slice(5).join(" ") /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c")))] = String(newMessage.split(" ").slice(5).join(" ").replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "").replaceAll(", ", " ") + ", " + world.getDimension(newMessage.split(" ")[1]).id + ", " + Number(newMessage.split(" ")[2]) + ", " + Number(newMessage.split(" ")[3]) + ", " + Number(newMessage.split(" ")[4]));
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                                break;
                            }
                            try {
                                system.run(() => { world.setDynamicProperty("globalWarpListValues", warpList.join("||||")); });
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            }
                            try {
                                eventData.sender.sendMessage("Set global warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            }
                            break;
                        case true:
                            try {
                                warpList.push(String(newMessage.split(" ").slice(5).join(" ") /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c") + ", " + newMessage.split(" ")[1] + ", " + newMessage.split(" ")[2] + ", " + newMessage.split(" ")[3] + ", " + newMessage.split(" ")[4]));
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            }
                            try {
                                system.run(() => { world.setDynamicProperty("globalWarpListValues", warpList.join("||||")); });
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            }
                            try {
                                eventData.sender.sendMessage("Added global warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            }
                            break;
                    }
                break;
            case !!switchTest.match(/^warpremove$/):
                eventData.cancel = true;
                let warpListB = String(world.getDynamicProperty("globalWarpListValues")).split("||||"); /*
                console.warn("wasdqrte\\sanwqhieasdrt\\p\\nasqw".replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f")*/ /*.replaceAll(/[\\x]/g, "\x").replaceAll(/[\\u]/g, "\u")*/ /*.replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, ""))*/
                switch (warpListB.find((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll(", ", " ").replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c"))) == undefined) {
                    case false:
                        try {
                            system.run(() => { warpListB[warpListB.findIndex((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll(", ", " ").replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c")))] = undefined; world.setDynamicProperty("globalWarpListValues", warpListB.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Removed global warp with name \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find global warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^warp$/):
                eventData.cancel = true;
                let warpListD = String(world.getDynamicProperty("globalWarpListValues")).split("||||");
                let warp = undefined; /*
                console.warn("wasdqrte\\sanwqhieasdrt\\p\\nasqw".replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f")*/ /*.replaceAll(/[\\x]/g, "\x").replaceAll(/[\\u]/g, "\u")*/ /*.replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, ""))*/
                switch (warpListD.find((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll("|", "\\u007c"))) == undefined) {
                    case false:
                        try {
                            warp = warpListD.find((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll("|", "\\u007c"))).split(", ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            system.run(() => { player.teleport({ x: Number(warp[2]), y: Number(warp[3]), z: Number(warp[4]) }, { dimension: world.getDimension(String(warp[1])), keepVelocity: false }); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Warped to \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/ + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find global warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/ + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^warplistdetails$/):
                eventData.cancel = true;
                let warpListC = String(world.getDynamicProperty("globalWarpListValues")).split("||||");
                if (warpListC.length == 1) {
                    eventData.sender.sendMessage("You have no global warps, set them with \\warpset");
                }
                else {
                    try {
                        eventData.sender.sendMessage(warpListC.join("\n").escapeCharacters(true));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^warplist$/):
                eventData.cancel = true;
                let warpListE = String(world.getDynamicProperty("globalWarpListValues")).split("||||");
                for (let i in warpListE) {
                    warpListE[i] = warpListE[i].split(", ")[0];
                }
                if (warpListE.length == 1) {
                    eventData.sender.sendMessage("You have no global warps, set them with \\warpset");
                }
                else {
                    try {
                        eventData.sender.sendMessage(warpListE.join("\n").escapeCharacters(true));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^warplistrawdata$/):
                eventData.cancel = true;
                try {
                    eventData.sender.sendMessage("Global Warp List Raw Data: \n" + String(world.getDynamicProperty("globalWarpListValues")));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^warpreset$/):
                eventData.cancel = true;
                try {
                    system.run(() => { world.setDynamicProperty("globalWarpListValues"); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                try {
                    eventData.sender.sendMessage("Global warps lists has been reset. ");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^wset$/):
                eventData.cancel = true;
                let wList = String(player.getDynamicProperty("warpList")).split("||||"); /*
                console.warn("wasdqrte\\sanwqhieasdrt\\p\\nasqw".replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f")*/ /*.replaceAll(/[\\x]/g, "\x").replaceAll(/[\\u]/g, "\u")*/ /*.replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, ""))*/
                switch (wList.find((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(5).join(" ").escapeCharacters(true).replaceAll("|", "\\u007c"))) == undefined) {
                    case false: /*
                    if (newMessage.split(" ").slice(5).join(" ").replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "").replaceAll(", ", " ") == ""){*/ /*eventData.sender.sendMessage("§cError: missing required \"name\" field. "); */ /*break; */ /*}*/
                        try {
                            wList[wList.findIndex((warpItem) => (warpItem.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(5).join(" ").escapeCharacters(true).replaceAll("|", "\\u007c")))] = String(newMessage.split(" ").slice(5).join(" ").replaceAll(", ", " ").replaceAll("|", "\\u007c") + ", " + world.getDimension(newMessage.split(" ")[1]).id + ", " + Number(newMessage.split(" ")[2]) + ", " + Number(newMessage.split(" ")[3]) + ", " + Number(newMessage.split(" ")[4]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                            break;
                        }
                        try {
                            system.run(() => { player.setDynamicProperty("warpList", wList.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case true:
                        try {
                            wList.push(String(newMessage.split(" ").slice(5).join(" ").replaceAll(", ", " ").replaceAll("|", "\\u007c") + ", " + newMessage.split(" ")[1] + ", " + newMessage.split(" ")[2] + ", " + newMessage.split(" ")[3] + ", " + newMessage.split(" ")[4]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            system.run(() => { player.setDynamicProperty("warpList", wList.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Added warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^wremove$/):
                eventData.cancel = true;
                let wListB = String(player.getDynamicProperty("warpList")).split("||||"); /*
                console.warn("wasdqrte\\sanwqhieasdrt\\p\\nasqw".replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f")*/ /*.replaceAll(/[\\x]/g, "\x").replaceAll(/[\\u]/g, "\u")*/ /*.replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, ""))*/
                switch (wListB.find((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true).replaceAll("|", "\\u007c"))) == undefined) {
                    case false:
                        try {
                            system.run(() => { wListB[wListB.findIndex((findWarp) => (findWarp.split(", ")[0].escapeCharacters(true).replaceAll("|", "\\u007c") == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true).replaceAll("|", "\\u007c")))] = undefined; player.setDynamicProperty("warpList", wListB.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Removed warp with name \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^w$/):
                eventData.cancel = true;
                let wListD = String(player.getDynamicProperty("warpList")).split("||||");
                let warpB = undefined;
                switch (wListD.find((findWarp) => (findWarp.split(", ")[0] == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true).replaceAll(", ", " "))) == undefined) {
                    case false:
                        try {
                            warpB = wListD.find((findWarp) => (findWarp.split(", ")[0] == newMessage.split(" ").slice(1).join(" ").escapeCharacters(true).replaceAll("|", "\\u007c"))).split(", ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            system.run(() => { player.teleport({ x: Number(warpB[2]), y: Number(warpB[3]), z: Number(warpB[4]) }, { dimension: world.getDimension(String(warpB[1])), keepVelocity: false }); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Warped to \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^wlistdetails$/):
                eventData.cancel = true;
                let wListC = String(player.getDynamicProperty("warpList")).split("||||");
                if (wListC.length == 1) {
                    eventData.sender.sendMessage("You have no warps, set them with \\wset");
                }
                else {
                    try {
                        eventData.sender.sendMessage(wListC.join("\n").escapeCharacters(true));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^wlist$/):
                eventData.cancel = true;
                let wListE = String(player.getDynamicProperty("warpList")).split("||||");
                for (let i in wListE) {
                    wListE[i] = wListE[i].split(", ")[0];
                }
                if (wListE.length == 1) {
                    eventData.sender.sendMessage("You have no warps, set them with \\wset");
                }
                else {
                    try {
                        eventData.sender.sendMessage(wListE.join("\n").escapeCharacters(true));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^wlistrawdata$/):
                eventData.cancel = true;
                try {
                    eventData.sender.sendMessage("Warp List Raw Data: \n" + String(player.getDynamicProperty("warpList")));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^wreset$/):
                eventData.cancel = true;
                try {
                    system.run(() => { player.setDynamicProperty("warpList", undefined); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                try {
                    eventData.sender.sendMessage("Warps lists has been reset. ");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^up$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (player.dimension.getBlock(player.location).above(Number(newMessage.split(" ")[1]) - 1).typeId == "minecraft:air" && (((newMessage.split(" ")[2]?.toLowerCase() != "false") && (newMessage.split(" ")[2] != "0")) || (newMessage.split(" ")[2] == undefined))) {
                        player.dimension.getBlock(player.location).above(Number(newMessage.split(" ")[1]) - 1).setType("minecraft:glass");
                    } ; player.teleport({ x: player.location.x, y: player.dimension.getBlock(player.location).above(Number(newMessage.split(" ")[1])).location.y, z: player.location.z }); eventData.sender.sendMessage(String()); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^top$/):
                eventData.cancel = true;
                try {
                    system.run(() => { let block = getTopSolidBlock(player.dimension.getBlock(player.location), player.dimension); if (block != undefined) {
                        player.teleport({ x: player.location.x, y: block.y + 1, z: player.location.z }, {});
                    }
                    else {
                        eventData.sender.sendMessage("§4No block could be found. ");
                    } ; eventData.sender.sendMessage("Teleported to highest block at coordinates: " + player.location.x + ", " + player.location.y + ", " + player.location.z); targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage("Teleported to highest block at coordinates: " + player.location.x + ", " + player.location.y + ", " + player.location.z); }); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^printlayers$/):
                eventData.cancel = true;
                try {
                    system.run(() => { let block = getTopSolidBlock(player.dimension.getBlock(player.location), player.dimension); let messageCustom = ""; let a = 0; while (a != 1) {
                        if (messageCustom.endsWith(block.typeId + "; ")) { }
                        else {
                            messageCustom = messageCustom + block.y + ". " + block.typeId + "; ";
                        }
                        ;
                        try {
                            block = block.below(1);
                        }
                        catch {
                            a = 1;
                        }
                    } ; player.sendMessage(messageCustom); eventData.sender.sendMessage("Teleported to highest block at coordinates: " + player.location.x + ", " + player.location.y + ", " + player.location.z); targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage("Printed blocks at: x: " + player.location.x + ", z: " + player.location.z); }); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^morph$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[2] == undefined) {
                        player.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1]));
                    }
                    else {
                        targetSelectorAllListB(newMessage.split(" ").slice(2).join(" "), "", Number(player.id)).forEach((p) => { p.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1])); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^tint$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[6] == undefined) {
                        player.setProperty("andexpr:color_tint_r", (Number((newMessage.split(" ")[1] ?? "~").replaceAll("~", String(player.getProperty("andexpr:color_tint_r")))) ?? player.getProperty("andexpr:color_tint_r")));
                        player.setProperty("andexpr:color_tint_g", (Number((newMessage.split(" ")[2] ?? "~").replaceAll("~", String(player.getProperty("andexpr:color_tint_g")))) ?? player.getProperty("andexpr:color_tint_g")));
                        player.setProperty("andexpr:color_tint_b", (Number((newMessage.split(" ")[3] ?? "~").replaceAll("~", String(player.getProperty("andexpr:color_tint_b")))) ?? player.getProperty("andexpr:color_tint_b")));
                        player.setProperty("andexpr:color_tint_a", (Number((newMessage.split(" ")[4] ?? "~").replaceAll("~", String(player.getProperty("andexpr:color_tint_a")))) ?? player.getProperty("andexpr:color_tint_a")));
                        player.setProperty("andexpr:use_alphablend_player_materials", (Number((newMessage.split(" ")[5] ?? "~").replaceAll("~", String(player.getProperty("andexpr:use_alphablend_player_materials")))) ?? player.getProperty("andexpr:use_alphablend_player_materials")));
                    }
                    else {
                        targetSelectorAllListB(newMessage.split(" ").slice(2).join(" "), "", Number(player.id)).forEach((p) => { p.setProperty("andexpr:color_tint_r", (Number((newMessage.split(" ")[1] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_r")))) ?? p.getProperty("andexpr:color_tint_r"))); p.setProperty("andexpr:color_tint_g", (Number((newMessage.split(" ")[2] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_g")))) ?? p.getProperty("andexpr:color_tint_g"))); p.setProperty("andexpr:color_tint_b", (Number((newMessage.split(" ")[3] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_b")))) ?? p.getProperty("andexpr:color_tint_b"))); p.setProperty("andexpr:color_tint_a", (Number((newMessage.split(" ")[4] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_a")))) ?? p.getProperty("andexpr:color_tint_a"))); p.setProperty("andexpr:use_alphablend_player_materials", (Number((newMessage.split(" ")[5] ?? "~").replaceAll("~", String(p.getProperty("andexpr:use_alphablend_player_materials")))) ?? p.getProperty("andexpr:use_alphablend_player_materials"))); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + " " + e.stack);
                }
                break;
            case !!switchTest.match(/^scale$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[2] == undefined) {
                        player.getComponent("scale").value = Number(newMessage.split(" ")[1]);
                    }
                    else {
                        targetSelectorAllListE(newMessage.split(" ").slice(2).join(" "), "~~~").forEach((p) => { p.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1])); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^visualscale$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[2] == undefined) {
                        player.setProperty("andexpr:entity_scale_variable_override", Number(newMessage.split(" ")[1]));
                    }
                    else {
                        targetSelectorAllListE(newMessage.split(" ").slice(2).join(" "), "~~~").forEach((p) => { p.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1])); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^visualscaleenabled$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[2] == undefined) {
                        player.setProperty("andexpr:entity_scale_variable_override_enabled", Boolean(newMessage.split(" ")[1].replaceAll("false", "").replaceAll("0", "").replaceAll("False", "").replaceAll("0.0", "")));
                    }
                    else {
                        targetSelectorAllListE(newMessage.split(" ").slice(2).join(" "), "~~~").forEach((p) => { p.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1])); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^managescriptautoeval$/):
                eventData.cancel = true;
                try {
                    system.run(() => { if (newMessage.split(" ")[2] == undefined) {
                        player.setProperty("andexpr:entity_scale_variable_override_enabled", Boolean(newMessage.split(" ")[1].replaceAll("false", "").replaceAll("0", "").replaceAll("False", "").replaceAll("0.0", "")));
                    }
                    else {
                        targetSelectorAllListE(newMessage.split(" ").slice(2).join(" "), "~~~").forEach((p) => { p.setProperty("andexpr:entity_type", Number(newMessage.split(" ")[1])); });
                    } });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^mainmenu$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/scriptevent andexdb:editorMenusAndLists hisa");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            case !!switchTest.match(/^datapickblock$/):
                eventData.cancel = true;
                try {
                    let item = player.getBlockFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true }).block.getItemStack(1, true);
                    system.run(() => { player.getComponent("inventory").container.addItem(item); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + ", " + e.stack);
                }
                break;
            default:
                if (world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") != true) {
                    eventData.cancel = true;
                }
                else { /*if(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") != true){*/
                    chatSend(); /*
                    }*/
                }
                break;
        }
    }
    else {
        if (world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") != true) {
            chatSend();
        }
    }
    function chatSend() {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendComplete")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
                currentplayer.sendMessage((e + " " + e.stack));
            } });
        }
        let messageFormattingItalic = "";
        let messageFormattingBold = "";
        let messageFormattingObfuscated = "";
        let messageFormattingColor = "";
        if (player.hasTag('messageFormatting:o')) {
            messageFormattingItalic = "§o";
        }
        ;
        if (player.hasTag('messageFormatting:l')) {
            messageFormattingBold = "§l";
        }
        ;
        if (player.hasTag('messageFormatting:k')) {
            messageFormattingObfuscated = "§k";
        }
        ;
        if (player.hasTag('messageColor:0')) {
            messageFormattingColor = "§0";
        }
        else {
            if (player.hasTag('messageColor:1')) {
                messageFormattingColor = "§1";
            }
            else {
                if (player.hasTag('messageColor:2')) {
                    messageFormattingColor = "§2";
                }
                else {
                    if (player.hasTag('messageColor:3')) {
                        messageFormattingColor = "§3";
                    }
                    else {
                        if (player.hasTag('messageColor:4')) {
                            messageFormattingColor = "§4";
                        }
                        else {
                            if (player.hasTag('messageColor:5')) {
                                messageFormattingColor = "§5";
                            }
                            else {
                                if (player.hasTag('messageColor:6')) {
                                    messageFormattingColor = "§6";
                                }
                                else {
                                    if (player.hasTag('messageColor:7')) {
                                        messageFormattingColor = "§7";
                                    }
                                    else {
                                        if (player.hasTag('messageColor:8')) {
                                            messageFormattingColor = "§8";
                                        }
                                        else {
                                            if (player.hasTag('messageColor:9')) {
                                                messageFormattingColor = "§9";
                                            }
                                            else {
                                                if (player.hasTag('messageColor:a')) {
                                                    messageFormattingColor = "§a";
                                                }
                                                else {
                                                    if (player.hasTag('messageColor:b')) {
                                                        messageFormattingColor = "§b";
                                                    }
                                                    else {
                                                        if (player.hasTag('messageColor:c')) {
                                                            messageFormattingColor = "§c";
                                                        }
                                                        else {
                                                            if (player.hasTag('messageColor:d')) {
                                                                messageFormattingColor = "§d";
                                                            }
                                                            else {
                                                                if (player.hasTag('messageColor:e')) {
                                                                    messageFormattingColor = "§e";
                                                                }
                                                                else {
                                                                    if (player.hasTag('messageColor:f')) {
                                                                        messageFormattingColor = "§f";
                                                                    }
                                                                    else {
                                                                        if (player.hasTag('messageColor:g')) {
                                                                            messageFormattingColor = "§g";
                                                                        }
                                                                        else {
                                                                            if (player.hasTag('messageColor:h')) {
                                                                                messageFormattingColor = "§h";
                                                                            }
                                                                            else {
                                                                                if (player.hasTag('messageColor:i')) {
                                                                                    messageFormattingColor = "§i";
                                                                                }
                                                                                else {
                                                                                    if (player.hasTag('messageColor:j')) {
                                                                                        messageFormattingColor = "§j";
                                                                                    }
                                                                                    else {
                                                                                        if (player.hasTag('messageColor:m')) {
                                                                                            messageFormattingColor = "§m";
                                                                                        }
                                                                                        else {
                                                                                            if (player.hasTag('messageColor:n')) {
                                                                                                messageFormattingColor = "§n";
                                                                                            }
                                                                                            else {
                                                                                                if (player.hasTag('messageColor:p')) {
                                                                                                    messageFormattingColor = "§p";
                                                                                                }
                                                                                                else {
                                                                                                    if (player.hasTag('messageColor:q')) {
                                                                                                        messageFormattingColor = "§q";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (player.hasTag('messageColor:s')) {
                                                                                                            messageFormattingColor = "§s";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (player.hasTag('messageColor:t')) {
                                                                                                                messageFormattingColor = "§t";
                                                                                                            }
                                                                                                            else {
                                                                                                                if (player.hasTag('messageColor:u')) {
                                                                                                                    messageFormattingColor = "§u";
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
        let rank = "";
        let name = "§r<" + player.name + "§r> ";
        let rankMode = 0;
        for (let index in player.getTags()) {
            if (player.getTags()[Number(index)].startsWith(String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) {
                rank = (rank + player.getTags()[Number(index)].slice(String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length));
            }
            if (player.getTags()[Number(index)] == ("chatHideNameTag")) {
                name = "";
                rankMode = 1;
            }
            else {
                if (player.getTags()[Number(index)].startsWith(String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) {
                    name = player.getTags()[Number(index)].slice(String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length);
                    rankMode = 2;
                }
                else {
                    if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) {
                        name = "<" + player.nameTag + "> ";
                        rankMode = 3;
                    }
                }
            }
        }
        eventData.cancel = true;
        if (player.hasTag("doNotSendChatMessages")) {
            return;
        }
        else {
            if (world.getDynamicProperty("allowCustomChatMessagesMuting") != true) {
                if (world.getDynamicProperty("allowCustomChatMessagesEscapeCharacters") != true) {
                    world.sendMessage(rank + name + messageFormattingItalic + messageFormattingBold + messageFormattingObfuscated + messageFormattingColor + newMessage);
                }
                else {
                    world.sendMessage({ rawtext: [{ text: String(rank + name + messageFormattingItalic + messageFormattingBold + messageFormattingObfuscated + messageFormattingColor + newMessage) }] });
                }
            }
            else {
                world.getDimension("overworld").runCommandAsync(`/tellraw @a {"rawtext":[{"text":"${String(rank + name + messageFormattingItalic + messageFormattingBold + messageFormattingObfuscated + messageFormattingColor + newMessage).replaceAll("\"", "\\\"")}"}]}`);
            }
        }
    }
});
try {
    system.runInterval(() => {
        try {
            let playerList2 = world.getPlayers();
            try {
                for (let index in playerList2) {
                    try {
                        if ((playerList2[index].isSneaking && ((playerList2[index].getComponent("minecraft:inventory").container?.getItem(playerList2[index].selectedSlot))?.typeId == "andexdb:editor_stick"))) {
                            let blockStates = Object.entries(playerList2[index].getBlockFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true }).block.permutation.getAllStates());
                            let blockStatesB;
                            blockStatesB = ["none"];
                            blockStates.forEach((s, i) => { try {
                                blockStatesB[i] = `${s[0]}: §c${s[1]}`;
                            }
                            catch { } });
                            playerList2[index].onScreenDisplay.setActionBar(`§b${playerList2[index].getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true }).block.typeId}\n§l§eTags: §r§a${playerList2[index].getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true }).block.getTags().join(", ")}\n§l§eBlock States: §r§a${blockStatesB.join("\n§a")}\n§l§eIs Waterlogged: §r§a${playerList2[index].getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true }).block.isWaterlogged}\n§l§eRedstone Power: §r§c${playerList2[index].getBlockFromViewDirection({ includePassableBlocks: true, includeLiquidBlocks: true }).block.getRedstonePower()}`);
                        }
                        ;
                    }
                    catch (e) { }
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
try {
    system.runInterval(() => {
        try {
            noPistonExtensionAreas = getAreas("noPistonExtensionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        try {
            noExplosionAreas = getAreas("noExplosionArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noInteractAreas = getAreas("noInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockInteractAreas = getAreas("noBlockInteractArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockBreakAreas = getAreas("noBlockBreakArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            protectedAreas = getAreas("protectedArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            noBlockPlaceAreas = getAreas("noBlockPlaceArea:");
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }, 1);
}
catch (e) {
    console.error(e, e.stack);
}
system.afterEvents.scriptEventReceive.subscribe((event) => {
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
            currentplayer.sendMessage(e + ", " + e.stack);
        } });
    }
    if (id == "andexdb:scriptevent") {
        const diamondAwesomeSword = new ItemStack("minecraft:diamond_sword", 1);
        let players = world.getAllPlayers();
        diamondAwesomeSword.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        // hover over/select the item in your inventory to see the lore.
        const inventory = players[0].getComponent("inventory");
        inventory.container.setItem(0, diamondAwesomeSword);
        let item = inventory.container.getItem(0);
        let enchants = item.getComponent("enchantments");
        let knockbackEnchant = new Enchantment("knockback", 2);
        enchants.enchantments.addEnchantment(knockbackEnchant);
        inventory.container.setItem(0, item);
        const ironFireSword = new ItemStack("minecraft:iron_sword", 1); /*
        let players = world.getAllPlayers();*/
        let fireAspectEnchant = { type: "fire_aspect", level: 1 };
        let enchants2 = ironFireSword.getComponent("enchantments");
        let addedFire = enchants2.enchantments.addEnchantment({ type: EnchantmentTypes.get("fire_aspect"), level: 0 });
        console.warn(ironFireSword);
        console.warn(ironFireSword.getComponent("enchantments"));
        console.warn(fireAspectEnchant);
        console.warn(enchants);
        console.warn(addedFire);
        if (!(Boolean(addedFire) ?? false)) {
            console.warn("Could not add fire aspect.");
            return -1;
        }
        const inventory2 = players[0].getComponent("inventory");
        let itemb = inventory.container.getItem(0);
        console.warn(String(Array((item.getComponent("enchantments")).enchantments)));
        console.warn((item.getComponent("enchantments")).isValid());
        console.warn((item.getComponent("enchantments")).enchantments[0]);
        item.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        console.warn(item.getComponent("enchantments"));
        console.warn(item);
        inventory.container.setItem(0, item);
        let itema = inventory2.container.getItem(0);
        let enchants3 = itema.getComponent("enchantments");
        let knockbackEnchant2 = new Enchantment("knockback", 1);
        enchants3.enchantments.addEnchantment(knockbackEnchant2); /*
        inventory2.container.setItem(0, itema);*/
    }
    ;
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
                let distance = Vector.distance(players[playerViewerB].location, players[playerTargetB].location);
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
                players[playerViewerB].sendMessage("§bname§a: §u" + players[playerTargetB].name + "§a, §bnameTag§a: §u" + players[playerTargetB].nameTag + "§a, §bUUID§a: §u" + players[playerTargetB].id + "§a, §bdistance§a: §u" + distance + "§a, §bLocation§a: §9{ §c" + players[playerTargetB].location.x + "§a, §c" + players[playerTargetB].location.y + "§a, §c" + players[playerTargetB].location.z + "§9 }§a, §bisSneaking§a: §g" + players[playerTargetB].isSneaking + "§a, §bscoreboardIdentity§a: §u" + scoreboardIdentity + "§a, §bscoreboardIdentityDisplayName§a: §u" + scoreboardIdentityDisplayName + "§a, §bscoreboardIdentityType§a: §u" + scoreboardIdentityType + "§a, §bgetTotalXP§a: §c" + players[playerTargetB].getTotalXp() + "§a, §bxpEarnedAtCurrentLevel§a: §c" + players[playerTargetB].xpEarnedAtCurrentLevel + "§a, §blevel§a: §c" + players[playerTargetB].level + "§a, §btotalXpNeededForNextLevel§a: §c" + players[playerTargetB].totalXpNeededForNextLevel + "§a, §bisOp§a: §g" + players[playerTargetB].isOp() + "§a, §bgetBlockFromViewDirection§a: " + blockViewedBlockType + ", §bgetEntitiesFromViewDirection§a: §9{ §sEntity§a: " + entityViewedEntityType + ", §sDistance§a: " + entityViewedEntityDistance + " §9}§a, §bgetComponents§a: §n[§u" + componentList + "§n]§a, §bgetEffects§a: §n[§a" + effectsList + "§n]§a, §bgetTags§a: [" + players[playerTargetB].getTags() + "], §bgetVelocity§a: §9{ §c" + (players[playerTargetB].getVelocity().x + "§a, §c" + players[playerTargetB].getVelocity().y + "§a, §c" + players[playerTargetB].getVelocity().z) + "§9 }§a, §bgetViewDirection§a: §9{ §bx: §c" + (players[playerTargetB].getViewDirection().x + "§a, §by: §c" + players[playerTargetB].getViewDirection().y + "§a, §bz: §c" + players[playerTargetB].getViewDirection().z) + "§9 }§a, §bselectedSlot§a: " + players[playerTargetB].selectedSlot + "§a, §bspawnPoint§a: " + spawnPointAllCoordinates);
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
                    playerTargetB = world.getDimension("overworld").getEntities().concat(world.getDimension("overworld").getEntities().concat(world.getDimension("overworld").getEntities())).find((entityValue) => (entityValue.id == entityUUID));
                }
                if (selectionType == 4) {
                    playerTargetB = world.getDimension(blockLocation[0]).getEntitiesAtBlockLocation({ x: Number(blockLocation[1]), y: Number(blockLocation[2]), z: Number(blockLocation[3]) })[Number(blockLocationIndex)];
                }
                let distance = Vector.distance(players[playerViewerB].location, playerTargetB.location);
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
                players[playerViewerB].sendMessage("§btypeId§a: §u" + playerTargetB.typeId + "§a, §bUUID§a: §u" + playerTargetB.id + "§a, §bnameTag§a: §u" + playerTargetB.nameTag + "§a, §bdistance§a: §u" + distance + "§a, §bLocation§a: §9{ §c" + playerTargetB.location.x + "§a, §c" + playerTargetB.location.y + "§a, §c" + playerTargetB.location.z + "§9 }§a, §bisSneaking§a: §g" + playerTargetB.isSneaking + "§a, §bscoreboardIdentityId§a: §u" + scoreboardIdentity + "§a, §bscoreboardIdentityDisplayName§a: §u" + scoreboardIdentityDisplayName + "§a, §bscoreboardIdentityType§a: §u" + scoreboardIdentityType + "§a, §bgetBlockFromViewDirection§a: " + blockViewedBlockType + ", §bgetEntitiesFromViewDirection§a: { §sEntity§a: " + entityViewedEntityType + ", §sDistance§a: " + entityViewedEntityDistance + " }, §bgetComponents§a: §n[§u" + componentList + "§n]§a, §bgetEffects§a: §n[§a" + effectsList + "§n]§a, §bgetTags§a: [" + playerTargetB.getTags() + "], §bgetVelocity§a: §9{ §c" + (playerTargetB.getVelocity().x + "§a, §c" + playerTargetB.getVelocity().y + "§a, §c" + playerTargetB.getVelocity().z) + "§9 }§a, §bgetViewDirection§a: { " + (playerTargetB.getViewDirection().x, playerTargetB.getViewDirection().y, playerTargetB.getViewDirection().z) + ", §bselectedSlot§a: " + playerTargetB.selectedSlot + spawnPointAllCoordinates);
            }).catch(e => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:editorMenusAndLists" || id == "andexdb:mainMenu") {
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
        form.button("Entity Debug§b", "textures/ui/debug_glyph_color"); /*
        form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/
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
        forceShow(form, players[players.findIndex((x) => x == sourceEntity)]).then(ra => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                case 1:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 2:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 3:
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
                case 4:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 5:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:playerDebug saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 6:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebug saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break; /*
    
            case 4:
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                // Do something when button 2 is pressed
                break;*/
                case 7:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:playerController saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 8:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:entityController saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 9:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:worldOptions saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 10:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:dimensionOptions saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 11:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:createExplosion saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 12:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:fillBlocks saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 15:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:inventoryTransfer saih"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 16:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 17:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:scriptEvalRunWindow hisa"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 18:
                    let form = new ActionFormData();
                    let players = world.getPlayers();
                    form.title("Area Selector");
                    form.body("Choose area type to edit. ");
                    const menuList = [/*"noPistonExtensionArea:"*/ , "noExplosionArea:", "noInteractArea:", "noBlockInteractArea:", "noBlockBreakArea:", "protectedArea:", "noBlockPlaceArea:"];
                    menuList.forEach((s) => { form.button(s, "textures/ui/xyz_axis"); });
                    forceShow(form, sourceEntity).then(la => {
                        let l = la;
                        try {
                            editAreas(sourceEntity, menuList[l.selection]);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        ;
                    });
                    // Do something when button 2 is pressed
                    break;
                case 19:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:customUISelector hisa"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 20:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:settings hisa"));
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
                        console.warn(["Damage Range: ", durability.getDamageRange()]);
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
                                form3.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
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
                                form3.show(players[players.findIndex((x) => x == sourceEntity)]).then(s => {
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
            form.textField("Trigger Event", "Trigger Event", "");
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
                ;
                try {
                    item.triggerEvent(String(triggerEvent));
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
                        console.warn(["Damage Range: ", durability.getDamageRange()]);
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
            form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlot);
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
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlot, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug] = r.formValues;
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
                playerList[playerTargetB].selectedSlot = Number(selectedSlot);
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
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    if (playerList[playerTargetB].hasTag("isSneaking")) {
                        system.runInterval(() => {
                            playerList[playerTargetB].isSneaking == true;
                            if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                                return;
                            }
                        }, 2);
                    }
                }
                else {
                    try {
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
            form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlot);
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
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlot, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug] = r.formValues;
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
                playerList[playerTargetB].selectedSlot = Number(selectedSlot);
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
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    if (playerList[playerTargetB].hasTag("isSneaking")) {
                        system.runInterval(() => {
                            playerList[playerTargetB].isSneaking == true;
                            if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                                return;
                            }
                        }, 2);
                    }
                }
                else {
                    try {
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
            form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId);
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
        form.toggle("setWaterContainerProperties Enabled", false);
        try {
            if (block2.getComponent("waterContainer") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`);
            }
            else {
                form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`);
        }
        form.toggle("setSnowContainerProperties Enabled", false);
        if (block2.getComponent("snowContainer") != undefined) {
            form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setLavaContainerProperties Enabled", false);
        if (block2.getComponent("lavaContainer") != undefined) {
            form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setPotionContainerProperties Enabled", false);
        if (block2.getComponent("potionContainer") != undefined) {
            form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`);
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
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*, selectedSlot*/, isWaterlogged /*, clearVelocity*/, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (waterContainerEnabled && block2.getComponent("waterContainer") != undefined) {
                block2.getComponent("waterContainer").setCustomColor({ red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3]) });
                block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]);
            }
            if (snowContainerEnabled && block2.getComponent("snowContainer") != undefined) {
                block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]);
            }
            if (lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined) {
                block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]);
            }
            if (potionContainerEnabled && block2.getComponent("potionContainer") != undefined) {
                block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]);
                block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255));
            }
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
            if (setSignIsWaxed && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setWaxed();
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
                block2.isWaterlogged = Boolean(isWaterlogged);
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
    if (id == "andexdb:settings") {
        let form = new ActionFormData();
        let players = world.getPlayers();
        form.title("Settings");
        form.body("Choose menu to open. ");
        form.button("Global Settings", "textures/ui/settings_glyph_color_2x");
        form.button("Eval Auto Execute Settings", "textures/ui/settings_glyph_color_2x");
        form.button("Personal Settings", "textures/ui/settings_glyph_color_2x"); /*
        form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
        forceShow(form, sourceEntity).then(ra => {
            let r = ra;
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:globalSettings saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                case 1:
                    try {
                        (sourceEntity).runCommand(String("/scriptevent andexdb:evalAutoScriptSettings saqw"));
                    }
                    // Do something
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    ;
                    // Do something when button 2 is pressed
                    break;
                case 2:
                    try { /* (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw")); */ }
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
    }
    if (id == "andexdb:globalSettings") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        "andexdbSettings:autoEscapeChatMessages";
        "andexdbSettings:autoURIEscapeChatMessages";
        "andexdbSettings:allowChatEscapeCodes";
        form2.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? ""));
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
        forceShow(form2, event.sourceEntity).then(to => {
            let t = to;
            if (t.canceled)
                return; /*
            GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
            let [chatCommandPrefix, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix, gametestStructureDefaultSpawnLocation, chatCommandsEnbaled, disableCustomChatMessages, sendMessageOnInvalidChatCommand, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, bepiwe, bepl, beppb, aebe, aepl] = t.formValues;
            world.setDynamicProperty("andexdbSettings:chatCommandPrefix", chatCommandPrefix);
            world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes);
            world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix);
            world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix);
            if (String(gametestStructureDefaultSpawnLocation) != "") {
                world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", { x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2]) });
            }
            world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled);
            world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages);
            world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand);
            world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting);
            world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages);
            world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages);
            world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes);
        }).catch(e => {
            console.error(e, e.stack);
        });
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
    if (id == "andexdb:debugStickMenuB" || id == "andexdb:editorStickMenuB") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id));
        form.textField("Block X", "Block X", String(sourceEntity.location.x));
        form.textField("Block Y", "Block Y", String(sourceEntity.location.y));
        form.textField("Block Z", "Block Z", String(sourceEntity.location.z));
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
            if (r.canceled)
                return;
            let [blockDimension, blockX, blockY, blockZ] = r.formValues;
            let blockPropertyValue2;
            event.sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:" /*"aslk"*/ + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ);
        }).catch(e => {
            console.error(e, e.stack);
        });
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
    if (id == "andexdb:debugStickB" || id == "andexdb:debugStickB") {
        let form = new ModalFormData();
        let playerList = world.getPlayers(); /*
        let block = sourceEntity.getBlockFromViewDirection({includeLiquidBlocks: true, includePassableBlocks: true})*/
        let block2; /* = block.block*/
        let allCoordinates = [];
        if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
            allCoordinates = message.slice(12).split("|");
            block2 = world.getDimension(String(allCoordinates[0])).getBlock({ x: Number(allCoordinates[1]), y: Number(allCoordinates[2]), z: Number(allCoordinates[3]) });
        }
        form.title("Editor Stick B");
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
            form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nsetType", "Block Type", block2.typeId);
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
            if (block2.getComponent("waterContainer") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`);
            }
            else {
                form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`);
        }
        form.toggle("setSnowContainerProperties Enabled", false);
        if (block2.getComponent("snowContainer") != undefined) {
            form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setLavaContainerProperties Enabled", false);
        if (block2.getComponent("lavaContainer") != undefined) {
            form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setPotionContainerProperties Enabled", false);
        if (block2.getComponent("potionContainer") != undefined) {
            form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`);
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
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*, selectedSlot*/, isWaterlogged /*, clearVelocity*/, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (waterContainerEnabled && block2.getComponent("waterContainer") != undefined) {
                block2.getComponent("waterContainer").setCustomColor({ red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3]) });
                block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]);
            }
            if (snowContainerEnabled && block2.getComponent("snowContainer") != undefined) {
                block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]);
            }
            if (lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined) {
                block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]);
            }
            if (potionContainerEnabled && block2.getComponent("potionContainer") != undefined) {
                block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]);
                block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255));
            }
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
            if (setSignIsWaxed && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setWaxed();
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
            ;
            if (setTypeEnabled == true) {
                try {
                    block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            ;
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
                block2.isWaterlogged = Boolean(isWaterlogged);
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
            form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId);
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
            if (block2.getComponent("waterContainer") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`);
            }
            else {
                form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`);
        }
        form.toggle("setSnowContainerProperties Enabled", false);
        if (block2.getComponent("snowContainer") != undefined) {
            form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setLavaContainerProperties Enabled", false);
        if (block2.getComponent("lavaContainer") != undefined) {
            form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`);
        }
        form.toggle("setPotionContainerProperties Enabled", false);
        if (block2.getComponent("potionContainer") != undefined) {
            form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`);
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
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*, selectedSlot*/, isWaterlogged /*, clearVelocity*/, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (waterContainerEnabled && block2.getComponent("waterContainer") != undefined) {
                block2.getComponent("waterContainer").setCustomColor({ red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3]) });
                block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]);
            }
            if (snowContainerEnabled && block2.getComponent("snowContainer") != undefined) {
                block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]);
            }
            if (lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined) {
                block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]);
            }
            if (potionContainerEnabled && block2.getComponent("potionContainer") != undefined) {
                block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]);
                block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255));
            }
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
            if (setSignIsWaxed && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
                block2.getComponent("sign").setWaxed();
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
                block2.isWaterlogged = Boolean(isWaterlogged);
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
            form.toggle("TypeId: " + playerTargetB.typeId + "\nId: " + playerTargetB.id + "\nFallDistance: " + playerTargetB.fallDistance + "\nLifetimeState: " + playerTargetB.lifetimeState + "\nTarget: " + playerTargetB.target + "\nX: " + "\nDimension: " + playerTargetB.dimension + "\nX: " + playerTargetB.location.x + "\nY: " + playerTargetB.location.y + "\nZ: " + playerTargetB.location.z + "\nChange Name Tag", false);
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
                    try {
                        playerTargetB.addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    if (playerTargetB.hasTag("isSneaking")) {
                        system.runInterval(() => {
                            playerTargetB.isSneaking == true;
                            if (playerTargetB.hasTag("isSneaking") == false) {
                                return;
                            }
                        }, 2);
                    }
                }
                else {
                    try {
                        playerTargetB.removeTag("isSneaking");
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
    
    
    form.show(players[players.findIndex((x) => x == sourceEntity)]).then(r => {
        if (r.canceled) return;
    
        let [ nameTag, triggerEvent, selectedSlot, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, removeEffect, effectToRemove, removeTag, tagToRemove, setRot, rotX, rotY, teleport, teleportX, teleportY, teleportZ, tryTeleport, tryTeleportX, tryTeleportY, tryTeleportZ, openTheItemModificationFormAfterwards, debug ] = r.formValues;
    
        let scale = sourceEntity.getComponent("scale") as EntityScaleComponent;*/ /*
        scale.value = Number(scaleValue);*/ /*
        
        try {entity[0].entity.nameTag = String(nameTag);} catch(e){console.error(e, e.stack);}
        try {entity[0].entity.isSneaking = Boolean(isSneaking);} catch(e){console.error(e, e.stack);}
        try {(entity[0].entity as Player).selectedSlot = Number(selectedSlot);} catch(e){console.error(e, e.stack);}
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
    
    if (players[players.findIndex((x) => x == sourceEntity)].hasTag("showDebug")) {
      system.runInterval( () => {
      players[0].onScreenDisplay.setActionBar("dimension: " + entity[0].entity.dimension + "\nfallDistance: " + entity[0].entity.fallDistance + "\nid: entity[0].entity.id: " + entity[0].entity.id + "\nisClimbing: " + entity[0].entity.isClimbing + "\nisFalling: " + entity[0].entity.isFalling + "\nisInWater: " + entity[0].entity.isInWater + "\nisOnGround: " + entity[0].entity.isOnGround + "\nisSleeping: " + entity[0].entity.isSleeping + "\nisSneaking: " + entity[0].entity.isSneaking + "\nisSprinting: " + entity[0].entity.isSprinting + "\nisSwimming: " + entity[0].entity.isSwimming + "\nlifetimeState: " + entity[0].entity.lifetimeState + "\nlocation: " + entity[0].entity.location + "\nnameTag: " + entity[0].entity.nameTag + "\nscoreboardIdentity(or_the_actor_id_very_long_complicated_number): " + entity[0].entity.scoreboardIdentity + "\ntarget: " + entity[0].entity.target + "\ntypeId: " + entity[0].entity.typeId + "\ngetBlockFromViewDirection(): " + entity[0].entity.getBlockFromViewDirection() + "\ngetComponents(): " + entity[0].entity.getComponents() + "\ngetEffects(): " + entity[0].entity.getEffects() + "\ngetEntitiesFromViewDirection(): " + entity[0].entity.getEntitiesFromViewDirection() + "\ngetHeadLocation(): " + entity[0].entity.getHeadLocation() + "\ngetRotation(): " + entity[0].entity.getRotation() + "\ngetTags(): " + entity[0].entity.getTags() + "\ngetVelocity(): " + entity[0].entity.getVelocity() + "\ngetViewDirection(): " + entity[0].entity.getViewDirection + "\nisValid(): " + entity[0].entity.isValid());
      if (players[players.findIndex((x) => x == sourceEntity)].hasTag("showDebug") == false) {
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
        console.log(eval('2 + 2'));
    }
    if (id == "andexdb:indirectScriptEval") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        console.log(eval?.('2 + 2'));
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
                                targets[l].getComponent("minecraft:tameable").tame();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setAirSupply":
                            try {
                                targets[l].getComponent("minecraft:breathable").setAirSupply(Number(playerName.slice(1)[i].split(":")[1]));
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
            sourceEntity.sendMessage("§c" + e + ", " + e.stack);
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
                                targets[l].selectedSlot = Number(playerName.slice(1)[i].split(":")[1]), Number(playerName.slice(1)[i].split(":")[1]);
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
            (initiator ?? sourceEntity).sendMessage("andexdb:spawnWithNoAI /scriptevent command format: /scriptevent andexdb:spawnWithNoAI <entityType: string>|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
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
        if (String(message2[1]).includes("~")) {
            if (sourceType == "Entity") {
                message3 = Vector.add(sourceEntity.location, { x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3]) });
            }
            else {
                message3 = Vector.add(sourceBlock.location, { x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3]) });
            }
        }
        else {
            message3 = { x: Number(message2[1].split(",")[0]), y: Number(message2[1].split(",")[1]), z: Number(message2[1].split(",")[2]) };
        }
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
