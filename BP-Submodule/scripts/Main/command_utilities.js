import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Container, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, BlockType, BlockTypes, ItemTypes, ItemType, ItemLockMode, CompoundBlockVolume, BlockVolumeIntersection, BlockVolume, BlockVolumeBase, GameMode, MolangVariableMap, EffectType, EnchantmentTypes, StructureSaveMode, EntityTypes, StructureAnimationMode, StructureMirrorAxis, StructureRotation, Structure, PlayerCursorInventoryComponent, } from "@minecraft/server";
import { getTopSolidBlock, arrayToElementList, debugAction, interactable_block, interactable_blockb, customFormUIElement, strToCustomFormUIElement /*,format_version*/, getUICustomForm, worldPlayers, timeZones, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, SemVerString, SemVerMatcher, SemVerValidator, dimensions, dimensionsb, dimensionsc, dimensionsd, dimensionse, fillBlocksHHFGB, fillBlocksHISGGB, fillBlocksHOFGB, fillBlocksHSGGB, flatPath, getGroundSolidBlock, getNextTopSolidBlockAbovePosition, getNextTopSolidBlockBelowPosition, getPathInObject, nether, overworld, scanForBlockType, the_end, v3Multiply, fillBlocksE, fillBlocksF, } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer, } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu, } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings, } from "./ui.js";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import { arrayify, utilsmetaimport, combineObjects, customModulo, escapeRegExp, extractJSONStrings, fixedPositionNumberObject, fromBaseToBase, generateAIID, generateCUID, generateTUID, getAIIDClasses, getArrayElementProperty, getCUIDClasses, getParametersFromExtractedJSON, getParametersFromString, jsonFromString, objectify, roundPlaceNumberObject, shootEntity, shootEntityB, shootProjectile, shootProjectileB, shuffle, splitTextByMaxProperyLength, stringify, toBase, arrayModifier, arrayModifierOld, } from "./utilities";
import { chatMessage, chatSend, chatmetaimport, currentlyRequestedChatInput, evaluateChatColorType, patternColors, patternColorsMap, patternFunctionList, patternList, requestChatInput, requestConditionalChatInput, } from "./chat";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "../Main";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as coords from "./coordinates";
import * as cmds from "./commands";
import * as bans from "./ban";
import * as uis from "./ui";
import * as playersave from "./player_save";
import * as spawnprot from "./spawn_protection";
import * as chat from "./chat";
import * as cmdutils from "./command_utilities";
import * as utils from "./utilities";
import * as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { uiManager, UIManager } from "@minecraft/server-ui";
import { getEntityById, getPlayer, } from "./commands";
export const cmdutilsmetaimport = import.meta;
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
mcMath;
export function targetSelector(selector, filters, UUID) {
    let scoreboardUUID = Math.round(Math.random() * 100 + 50);
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntityUUIDValue = world.scoreboard
        .getObjective("andexdbDebug")
        .getScores()
        .find((score) => score.score == scoreboardUUID)
        .participant.getEntity().id;
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return Number(selectedEntityUUIDValue);
}
export function targetSelectorB(selector, filters, UUID) {
    let scoreboardUUID = Math.round(Math.random() * 100 + 50);
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntityUUIDValue = world.scoreboard
        .getObjective("andexdbDebug")
        .getScores()
        .find((score) => score.score == scoreboardUUID)
        .participant.getEntity().id;
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return world
        .getDimension(DimensionTypes.getAll().find((dimension) => world
        .getDimension(dimension.typeId)
        .getEntities()
        .find((entity) => entity.id == selectedEntityUUIDValue)).typeId)
        .getEntities()
        .find((entity) => entity.id == selectedEntityUUIDValue);
}
export function targetSelectorAllListB(selector, filters, UUID) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntity;
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        selectedEntity.push(world.scoreboard
            .getObjective("andexdbDebug")
            .getScores()
            .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
    }
    world
        .getAllPlayers()
        .find((currentlySelectedPlayerEntity) => Number(currentlySelectedPlayerEntity.id) == UUID)
        .runCommand("/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return selectedEntity;
}
export function targetSelectorAllListC(selector, filters, position, sourceEntityCommandExecution) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    if (sourceEntityCommandExecution == undefined) {
        world
            .getAllPlayers()[0]
            .runCommand("/execute positioned " +
            position +
            " as " +
            selector +
            filters +
            " at @s run /scoreboard players set @s andexdbDebug " +
            scoreboardUUID);
    }
    else {
        sourceEntityCommandExecution.runCommand("/execute positioned " +
            position +
            " as " +
            selector +
            filters +
            " at @s run /scoreboard players set @s andexdbDebug " +
            scoreboardUUID);
    }
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        try {
            selectedEntity.push(world.scoreboard
                .getObjective("andexdbDebug")
                .getScores()
                .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
        }
        catch (e) { }
    }
    if (sourceEntityCommandExecution == undefined) {
        world
            .getAllPlayers()[0]
            .runCommand("/execute positioned " +
            position +
            " as " +
            selector +
            filters +
            " at @s run /scoreboard players set @s andexdbDebug 0");
    }
    else {
        sourceEntityCommandExecution.runCommand("/execute as " +
            selector +
            filters +
            " at @s run /scoreboard players set @s andexdbDebug 0");
    }
    return selectedEntity;
}
export function targetSelectorAllListD(selector, position, dimension = world.getDimension("overworld")) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    dimension.runCommand("/execute positioned " +
        position +
        " as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID);
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        try {
            selectedEntity.push(world.scoreboard
                .getObjective("andexdbDebug")
                .getScores()
                .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
        }
        catch (e) { }
    }
    dimension.runCommand("/execute as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug 0");
    return selectedEntity;
}
export function targetSelectorAllListE(selector, position) {
    let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
    DimensionTypes.getAll().forEach((dt) => {
        let dimension = world.getDimension(dt.typeId);
        dimension.runCommand("/execute positioned " +
            position +
            " as " +
            selector +
            " at @s run /scoreboard players set @s andexdbDebug " +
            scoreboardUUID);
    });
    let selectedEntity;
    selectedEntity = [];
    for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
        try {
            selectedEntity.push(world.scoreboard
                .getObjective("andexdbDebug")
                .getScores()
                .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity());
        }
        catch (e) { }
    }
    DimensionTypes.getAll().forEach((dt) => {
        let dimension = world.getDimension(dt.typeId);
        dimension.runCommand("/execute as " +
            selector +
            " at @s run /scoreboard players set @s andexdbDebug 0");
    });
    return selectedEntity;
}
export var fillmodetypeenum;
(function (fillmodetypeenum) {
    fillmodetypeenum[""] = "";
    fillmodetypeenum["replace"] = "replace";
    fillmodetypeenum["fill"] = "fill";
    fillmodetypeenum["clear"] = "clear";
    fillmodetypeenum["drain"] = "drain";
    fillmodetypeenum["keep"] = "durability";
    fillmodetypeenum["walls"] = "walls";
    fillmodetypeenum["hollow"] = "hollow";
    fillmodetypeenum["outline"] = "outline";
    fillmodetypeenum["skygrid"] = "skygrid";
    fillmodetypeenum["inverseskygrid"] = "inverseskygrid";
    fillmodetypeenum["tunnel"] = "tunnel";
    fillmodetypeenum["floor"] = "floor";
    fillmodetypeenum["ceilling"] = "ceilling";
    fillmodetypeenum["diamond"] = "diamond";
    fillmodetypeenum["ovoid"] = "ovoid";
    fillmodetypeenum["hollowovoid"] = "hollowovoid";
    fillmodetypeenum["sphere"] = "sphere";
    fillmodetypeenum["semisphere"] = "semisphere";
    fillmodetypeenum["hollowsphere"] = "hollowsphere";
    fillmodetypeenum["dome"] = "dome";
    fillmodetypeenum["r"] = "replace";
    fillmodetypeenum["f"] = "fill";
    fillmodetypeenum["clr"] = "clear";
    fillmodetypeenum["dr"] = "drain";
    fillmodetypeenum["k"] = "durability";
    fillmodetypeenum["w"] = "walls";
    fillmodetypeenum["h"] = "hollow";
    fillmodetypeenum["o"] = "outline";
    fillmodetypeenum["sg"] = "skygrid";
    fillmodetypeenum["isg"] = "inverseskygrid";
    fillmodetypeenum["t"] = "tunnel";
    fillmodetypeenum["fl"] = "floor";
    fillmodetypeenum["ce"] = "ceilling";
    fillmodetypeenum["d"] = "diamond";
    fillmodetypeenum["ovd"] = "ovoid";
    fillmodetypeenum["hovd"] = "hollowovoid";
    fillmodetypeenum["hollowovd"] = "hollowovoid";
    fillmodetypeenum["hovoid"] = "hollowovoid";
    fillmodetypeenum["s"] = "sphere";
    fillmodetypeenum["ss"] = "semisphere";
    fillmodetypeenum["hs"] = "hollowsphere";
    fillmodetypeenum["dm"] = "dome";
    fillmodetypeenum["hsphere"] = "hollowsphere";
    fillmodetypeenum["hollows"] = "hollowsphere";
    fillmodetypeenum["circle"] = "circle";
    fillmodetypeenum["circlex"] = "circlex";
    fillmodetypeenum["circley"] = "circley";
    fillmodetypeenum["circlez"] = "circlez";
    fillmodetypeenum["circlexy"] = "circlexy";
    fillmodetypeenum["circleyz"] = "circleyz";
    fillmodetypeenum["circlexz"] = "circlexz";
    fillmodetypeenum["circlexyz"] = "circlexyz";
    fillmodetypeenum["circ"] = "circle";
    fillmodetypeenum["circx"] = "circlex";
    fillmodetypeenum["circy"] = "circly";
    fillmodetypeenum["circz"] = "circlez";
    fillmodetypeenum["circxy"] = "circlexy";
    fillmodetypeenum["circyz"] = "circleyz";
    fillmodetypeenum["circxz"] = "circlexz";
    fillmodetypeenum["circxyz"] = "circlexyz";
    fillmodetypeenum["c"] = "circle";
    fillmodetypeenum["cx"] = "circlex";
    fillmodetypeenum["cy"] = "circly";
    fillmodetypeenum["cz"] = "circlez";
    fillmodetypeenum["cxy"] = "circlexy";
    fillmodetypeenum["cyz"] = "circleyz";
    fillmodetypeenum["cxz"] = "circlexz";
    fillmodetypeenum["cxyz"] = "circlexyz";
    fillmodetypeenum["disc"] = "circle";
    fillmodetypeenum["discx"] = "circlex";
    fillmodetypeenum["discy"] = "circly";
    fillmodetypeenum["discz"] = "circlez";
    fillmodetypeenum["discxy"] = "circlexy";
    fillmodetypeenum["discyz"] = "circleyz";
    fillmodetypeenum["discxz"] = "circlexz";
    fillmodetypeenum["discxyz"] = "circlexyz";
    fillmodetypeenum["cylinder"] = "cylinder";
    fillmodetypeenum["cylinderx"] = "cylinderx";
    fillmodetypeenum["cylindery"] = "cylindery";
    fillmodetypeenum["cylinderz"] = "cylinderz";
    fillmodetypeenum["hourglass"] = "hourglass";
    fillmodetypeenum["cyl"] = "cylinder";
    fillmodetypeenum["cylx"] = "cylinderx";
    fillmodetypeenum["cyly"] = "cylindery";
    fillmodetypeenum["cylz"] = "cylinderz";
    fillmodetypeenum["cl"] = "cylinder";
    fillmodetypeenum["clx"] = "cylinderx";
    fillmodetypeenum["cly"] = "cylindery";
    fillmodetypeenum["clz"] = "cylinderz";
    fillmodetypeenum["hrgl"] = "hourglass";
    fillmodetypeenum["hrgs"] = "hourglass";
    fillmodetypeenum["cube"] = "cube";
    fillmodetypeenum["cu"] = "cube";
    fillmodetypeenum["cb"] = "cube";
})(fillmodetypeenum || (fillmodetypeenum = {}));
export var componentTypeEnum;
(function (componentTypeEnum) {
    componentTypeEnum["enchantable"] = "enchantable";
    componentTypeEnum["minecraft:enchantable"] = "enchantable";
    componentTypeEnum["durability"] = "durability";
    componentTypeEnum["minecraft:durability"] = "durability";
    componentTypeEnum["damage"] = "damage";
    componentTypeEnum["minecraft:damage"] = "damage";
    componentTypeEnum["cooldown"] = "cooldown";
    componentTypeEnum["minecraft:cooldown"] = "cooldown";
    componentTypeEnum["food"] = "food";
    componentTypeEnum["minecraft:food"] = "food";
})(componentTypeEnum || (componentTypeEnum = {}));
export var enchantableComponentTypeEnum;
(function (enchantableComponentTypeEnum) {
    enchantableComponentTypeEnum["add"] = "addEnchantment";
    enchantableComponentTypeEnum["minecraft:add"] = "addEnchantment";
    enchantableComponentTypeEnum["addEnchantment"] = "addEnchantment";
    enchantableComponentTypeEnum["minecraft:addEnchantment"] = "addEnchantment";
    enchantableComponentTypeEnum["addList"] = "addEnchantments";
    enchantableComponentTypeEnum["minecraft:addList"] = "addEnchantments";
    enchantableComponentTypeEnum["addEnchantments"] = "addEnchantments";
    enchantableComponentTypeEnum["minecraft:addEnchantments"] = "addEnchantments";
    enchantableComponentTypeEnum["remove"] = "removeEnchantment";
    enchantableComponentTypeEnum["minecraft:remove"] = "removeEnchantment";
    enchantableComponentTypeEnum["removeEnchantments"] = "removeEnchantment";
    enchantableComponentTypeEnum["minecraft:removeEnchantments"] = "removeEnchantment";
    enchantableComponentTypeEnum["clear"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["minecraft:clear"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["clearAll"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["minecraft:clearAll"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["removeAll"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["minecraft:removeAll"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["removeAllEnchantments"] = "removeAllEnchantments";
    enchantableComponentTypeEnum["minecraft:removeAllEnchantments"] = "removeAllEnchantments";
})(enchantableComponentTypeEnum || (enchantableComponentTypeEnum = {}));
export var durabilityComponentTypeEnum;
(function (durabilityComponentTypeEnum) {
    durabilityComponentTypeEnum["durability"] = "durability";
    durabilityComponentTypeEnum["minecraft:durability"] = "durability";
    durabilityComponentTypeEnum["setDurability"] = "durability";
    durabilityComponentTypeEnum["minecraft:setDurability"] = "durability";
    durabilityComponentTypeEnum["damage"] = "damage";
    durabilityComponentTypeEnum["minecraft:damage"] = "damage";
    durabilityComponentTypeEnum["setDamage"] = "damage";
    durabilityComponentTypeEnum["minecraft:setDamage"] = "damage";
    durabilityComponentTypeEnum["repair"] = "repair";
    durabilityComponentTypeEnum["minecraft:repair"] = "repair";
    durabilityComponentTypeEnum["setDurabilityToMax"] = "setDurabilityToMax";
    durabilityComponentTypeEnum["minecraft:setDurabilityToMax"] = "setDurabilityToMax";
})(durabilityComponentTypeEnum || (durabilityComponentTypeEnum = {}));
export var propertyTypeEnum;
(function (propertyTypeEnum) {
    propertyTypeEnum["name"] = "nameTag";
    propertyTypeEnum["minecraft:name"] = "nameTag";
    propertyTypeEnum["nameTag"] = "nameTag";
    propertyTypeEnum["minecraft:nameTag"] = "nameTag";
    propertyTypeEnum["lore"] = "lore";
    propertyTypeEnum["minecraft:lore"] = "lore";
    propertyTypeEnum["description"] = "lore";
    propertyTypeEnum["minecraft:description"] = "lore";
    propertyTypeEnum["count"] = "amount";
    propertyTypeEnum["minecraft:count"] = "amount";
    propertyTypeEnum["amount"] = "amount";
    propertyTypeEnum["minecraft:amount"] = "amount";
    propertyTypeEnum["keepOnDeath"] = "keepOnDeath";
    propertyTypeEnum["minecraft:keepOnDeath"] = "keepOnDeath";
    propertyTypeEnum["keepondeath"] = "keepOnDeath";
    propertyTypeEnum["minecraft:keepondeath"] = "keepOnDeath";
    propertyTypeEnum["keep_on_death"] = "keepOnDeath";
    propertyTypeEnum["minecraft:keep_on_death"] = "keepOnDeath";
    propertyTypeEnum["lockMode"] = "lockMode";
    propertyTypeEnum["minecraft:lockMode"] = "lockMode";
    propertyTypeEnum["lockmode"] = "lockMode";
    propertyTypeEnum["minecraft:lockmode"] = "lockMode";
    propertyTypeEnum["lock_mode"] = "lockMode";
    propertyTypeEnum["minecraft:lock_mode"] = "lockMode";
    propertyTypeEnum["itemLockMode"] = "lockMode";
    propertyTypeEnum["minecraft:itemLockMode"] = "lockMode";
    propertyTypeEnum["itemlockmode"] = "lockMode";
    propertyTypeEnum["minecraft:itemlockmode"] = "lockMode";
    propertyTypeEnum["item_lock_mode"] = "lockMode";
    propertyTypeEnum["minecraft:item_lock_mode"] = "lockMode";
    propertyTypeEnum["canPlaceOn"] = "canPlaceOn";
    propertyTypeEnum["minecraft:canPlaceOn"] = "canPlaceOn";
    propertyTypeEnum["canplaceon"] = "canPlaceOn";
    propertyTypeEnum["minecraft:canplaceon"] = "canPlaceOn";
    propertyTypeEnum["can_place_on"] = "canPlaceOn";
    propertyTypeEnum["minecraft:can_place_on"] = "canPlaceOn";
    propertyTypeEnum["canDestroy"] = "canDestroy";
    propertyTypeEnum["minecraft:canDestroy"] = "canDestroy";
    propertyTypeEnum["candestroy"] = "canDestroy";
    propertyTypeEnum["minecraft:candestroy"] = "canDestroy";
    propertyTypeEnum["can_destroy"] = "canDestroy";
    propertyTypeEnum["minecraft:can_destroy"] = "canDestroy";
    propertyTypeEnum["components"] = "components";
    propertyTypeEnum["minecraft:components"] = "components";
    propertyTypeEnum["dynamicProperties"] = "dynamicProperties";
    propertyTypeEnum["minecraft:dynamicProperties"] = "dynamicProperties";
    propertyTypeEnum["dynamicproperties"] = "dynamicProperties";
    propertyTypeEnum["minecraft:dynamicproperties"] = "dynamicProperties";
    propertyTypeEnum["properties"] = "dynamicProperties";
    propertyTypeEnum["minecraft:properties"] = "dynamicProperties";
    propertyTypeEnum["itemProperties"] = "dynamicProperties";
    propertyTypeEnum["minecraft:itemProperties"] = "dynamicProperties";
    propertyTypeEnum["itemproperties"] = "dynamicProperties";
    propertyTypeEnum["minecraft:itemproperties"] = "dynamicProperties";
    propertyTypeEnum["clearAllDynamicProperties"] = "clearDynamicProperties";
    propertyTypeEnum["minecraft:clearAllDynamicProperties"] = "clearDynamicProperties";
    propertyTypeEnum["clearalldynamicproperties"] = "clearDynamicProperties";
    propertyTypeEnum["minecraft:clearalldynamicproperties"] = "clearDynamicProperties";
    propertyTypeEnum["clearDynamicProperties"] = "clearDynamicProperties";
    propertyTypeEnum["minecraft:clearDynamicProperties"] = "clearDynamicProperties";
    propertyTypeEnum["cleardynamicproperties"] = "clearDynamicProperties";
    propertyTypeEnum["minecraft:cleardynamicproperties"] = "clearDynamicProperties";
    propertyTypeEnum["removeDynamicProperties"] = "removeDynamicProperties";
    propertyTypeEnum["minecraft:removeDynamicProperties"] = "removeDynamicProperties";
    propertyTypeEnum["removedynamicproperties"] = "removedynamicproperties";
    propertyTypeEnum["minecraft:removedynamicproperties"] = "removedynamicproperties";
    propertyTypeEnum["removeDynamicProperty"] = "removeDynamicProperty";
    propertyTypeEnum["minecraft:removeDynamicProperty"] = "removeDynamicProperty";
    propertyTypeEnum["removedynamicproperty"] = "removedynamicproperty";
    propertyTypeEnum["minecraft:removedynamicproperty"] = "removedynamicproperty";
})(propertyTypeEnum || (propertyTypeEnum = {}));
export function itemJSONPropertiesEval(itemJSON, StartingItem, player) {
    /*
      let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/
    let ij = itemJSON;
    ij.force ??= false;
    let sp = player;
    let item = !!ij.new
        ? new ItemStack(ij.new[0], ij.new[1])
        : (!!StartingItem
            ? StartingItem instanceof ContainerSlot
                ? StartingItem.getItem()
                : StartingItem instanceof ItemStack
                    ? StartingItem
                    : undefined
            : undefined) ??
            (!!ij.source
                ? ij.source.type == "slot"
                    ? (!!ij.source.targetSelector
                        ? (!!ij.source.targetSelectorExecutionLocation
                            ? targetSelectorAllListD(ij.source.targetSelector, ij.source.targetSelectorExecutionLocation.x +
                                " " +
                                ij.source.targetSelectorExecutionLocation.y +
                                " " +
                                ij.source.targetSelectorExecutionLocation.z, ij.source.targetSelectorExecutionLocation.dimension)[0]
                            : targetSelectorAllListC(ij.source.targetSelector, "", ij.source.targetSelectorSourceEntity.location.x +
                                " " +
                                ij.source.targetSelectorSourceEntity.location.y +
                                " " +
                                ij.source.targetSelectorSourceEntity.location.z, ij.source.targetSelectorSourceEntity)[0])?.getComponent?.("inventory")
                        : !!ij.source.entityId
                            ? getEntityById(ij.source.entityId)?.getComponent?.("inventory")
                            : !!ij.source.player
                                ? getPlayer(ij.source.player)?.getComponent?.("inventory")
                                : !!ij.source.entityAtBlock
                                    ? ij.source.entityAtBlock.dimension
                                        .getEntitiesAtBlockLocation(ij.source.entityAtBlock)
                                        .find((v) => v.typeId ==
                                        (ij.source.entityTypeId ?? ij.source.entityType))
                                        ?.getComponent?.("inventory")
                                    : !!ij.source.block
                                        ? ij.source.block.dimension
                                            .getBlock(ij.source.block)
                                            ?.getComponent?.("inventory")
                                        : sp?.getComponent?.("inventory"))?.container?.getItem(ij.source.slot ?? 0)
                    : new ItemStack(ij.source.id, ij.source.count ?? ij.source.amount)
                : new ItemStack(ij?.id ?? ij?.type ?? ij?.itemId, ij?.count ?? ij?.amount)); /*
if(!!ij.new){item=new ItemStack(ij.new[0], ij.new[1])}*/
    const itemPropertyEnum = {
        components: (property) => Object.entries(property[1]).forEach((vb) => itemComponentEnum[componentTypeEnum[vb[0]]](vb)),
        nameTag: (property) => property[1] !== item.nameTag || ij.force
            ? (item.nameTag = property[1])
            : false,
        lore: (property) => property[1] !== item.getLore() || ij.force
            ? item.setLore(property[1])
            : false,
        amount: (property) => property[1] != item.amount || ij.force
            ? (item.amount = property[1])
            : false,
        keepOnDeath: (property) => property[1] != item.keepOnDeath || ij.force
            ? (item.keepOnDeath = property[1])
            : false,
        lockMode: (property) => property[1] != item.lockMode || ij.force
            ? (item.lockMode = property[1])
            : false,
        canPlaceOn: (property) => property[1] !== item.getCanPlaceOn() || ij.force
            ? item.setCanPlaceOn(property[1])
            : false,
        canDestroy: (property) => property[1] !== item.getCanDestroy() || ij.force
            ? item.setCanDestroy(property[1])
            : false,
        dynamicProperties: (property) => property[1] instanceof Array
            ? property[1].forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
            : Object.entries(property[1]).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
        clearDynamicProperties: (property) => item.clearDynamicProperties(),
        removeDynamicProperties: (property) => property[1].forEach((v) => item.setDynamicProperty(v)),
        removeDynamicProperty: (property) => item.setDynamicProperty(property[1]),
    };
    const itemComponentEnum = {
        enchantable: (property) => Object.entries(property[1]).forEach((vc) => itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0]]](vc)),
        durability: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage =
                item.getComponent("durability").maxDurability - property[1])
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])),
        damage: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage = property[1])
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)),
        food: (property) => { },
        cooldown: (property) => { },
    };
    const itemEnchantableComponentEnum = {
        addEnchantment: (property) => property[1] instanceof Array
            ? item
                .getComponent("enchantable")
                .addEnchantments(property[1].map((v) => ({
                level: v.level,
                type: EnchantmentTypes.get(v.type),
            })))
            : item
                .getComponent("enchantable")
                .addEnchantment({
                level: property[1].level,
                type: EnchantmentTypes.get(property[1].type),
            }),
        addEnchantments: (property) => item
            .getComponent("enchantable")
            .addEnchantments(property[1].map((v) => ({
            level: v.level,
            type: EnchantmentTypes.get(v.type),
        }))),
        removeEnchantment: (property) => property[1] instanceof Array
            ? property[1].forEach((v) => item.getComponent("enchantable").removeEnchantment(v))
            : item.getComponent("enchantable").removeEnchantment(property[1]),
        removeAllEnchantments: (property) => item.getComponent("enchantable").removeAllEnchantments(),
    };
    const itemDurabilityComponentEnum = {
        durability: (property) => (item.getComponent("durability").damage =
            item.getComponent("durability").maxDurability - property[1]),
        damage: (property) => (item.getComponent("durability").damage = property[1]),
        repair: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage = Math.max(0, item.getComponent("durability").damage - property[1]))
            : (item.getComponent("durability").damage = 0),
        setDurabilityToMax: (property) => (item.getComponent("durability").damage = 0),
    };
    Object.entries(ij)
        .filter((v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0]))
        .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
    return item;
    /*
  
      ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}
export function itemJSONPropertiesEvalCT(itemJSON, containerSlot, player) {
    /*
      let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/
    let ij = itemJSON;
    ij.force ??= false;
    let sp = player;
    let item = containerSlot;
    if (!!ij.new) {
        item.setItem(new ItemStack(ij.new[0], ij.new[1]));
    }
    const itemPropertyEnum = {
        components: (property) => Object.entries(property[1]).forEach((vb) => itemComponentEnum[componentTypeEnum[vb[0]]](vb)),
        nameTag: (property) => property[1] !== item.nameTag || ij.force
            ? (item.nameTag = property[1])
            : false,
        lore: (property) => property[1] !== item.getLore() || ij.force
            ? item.setLore(property[1])
            : false,
        amount: (property) => property[1] != item.amount || ij.force
            ? (item.amount = property[1])
            : false,
        keepOnDeath: (property) => property[1] != item.keepOnDeath || ij.force
            ? (item.keepOnDeath = property[1])
            : false,
        lockMode: (property) => property[1] != item.lockMode || ij.force
            ? (item.lockMode = property[1])
            : false,
        canPlaceOn: (property) => property[1] !== item.getCanPlaceOn() || ij.force
            ? item.setCanPlaceOn(property[1])
            : false,
        canDestroy: (property) => property[1] !== item.getCanDestroy() || ij.force
            ? item.setCanDestroy(property[1])
            : false,
        dynamicProperties: (property) => property[1] instanceof Array
            ? property[1].forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
            : Object.entries(property[1]).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
        clearDynamicProperties: (property) => item.clearDynamicProperties(),
        removeDynamicProperties: (property) => property[1].forEach((v) => item.setDynamicProperty(v)),
        removeDynamicProperty: (property) => item.setDynamicProperty(property[1]),
    };
    const itemComponentEnum = {
        enchantable: (property) => Object.entries(property[1]).forEach((vc) => itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0]]](vc)),
        durability: (property) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage =
                    itemb.getComponent("durability").maxDurability - property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])),
        damage: (property) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)),
        food: (property) => { },
        cooldown: (property) => { },
    };
    const itemEnchantableComponentEnum = {
        addEnchantment: (property) => property[1] instanceof Array
            ? (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .addEnchantments(property[1].map((v) => ({
                    level: v.level,
                    type: EnchantmentTypes.get(v.type),
                })));
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .addEnchantment({
                    level: property[1].level,
                    type: EnchantmentTypes.get(property[1].type),
                });
                item.setItem(itemb);
            })(),
        addEnchantments: (property) => (() => {
            let itemb = item.getItem();
            itemb
                .getComponent("enchantable")
                .addEnchantments(property[1].map((v) => ({
                level: v.level,
                type: EnchantmentTypes.get(v.type),
            })));
            item.setItem(itemb);
        })(),
        removeEnchantment: (property) => property[1] instanceof Array
            ? property[1].forEach((v) => (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").removeEnchantment(v);
                item.setItem(itemb);
            })())
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").removeEnchantment(property[1]);
                item.setItem(itemb);
            })(),
        removeAllEnchantments: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").removeAllEnchantments();
            item.setItem(itemb);
        })(),
    };
    const itemDurabilityComponentEnum = {
        durability: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage =
                itemb.getComponent("durability").maxDurability - property[1];
            item.setItem(itemb);
        })(),
        damage: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = property[1];
            item.setItem(itemb);
        })(),
        repair: (property) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = Math.max(0, itemb.getComponent("durability").damage - property[1]);
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = 0;
                item.setItem(itemb);
            })(),
        setDurabilityToMax: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = 0;
            item.setItem(itemb);
        })(),
    };
    Object.entries(ij)
        .filter((v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0]))
        .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
    return item;
    /*
  
      ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}
export function rangeToIntArray(range) {
    let array = [];
    for (let i = range[0]; i < range[1]; i++) {
        array.push(i);
    }
    return array;
}
export function inventorySwap(player1, player2) {
    for (let i = 0; i < 36; i++) {
        player1
            .getComponent("inventory")
            .container.swapItems(i, i, player2.getComponent("inventory").container);
    }
    let slots = [
        EquipmentSlot.Head,
        EquipmentSlot.Chest,
        EquipmentSlot.Legs,
        EquipmentSlot.Feet,
        EquipmentSlot.Offhand,
    ];
    for (let i = 0; i < 5; i++) {
        let item1 = player1.getComponent("equippable").getEquipment(slots[i]);
        let item2 = player2.getComponent("equippable").getEquipment(slots[i]);
        player1.getComponent("equippable").setEquipment(slots[i], item2);
        player2.getComponent("equippable").setEquipment(slots[i], item1);
    }
}
export function inventorySwapB(player1, player2) {
    for (let i = 0; i < 36; i++) {
        player1.swapItems(i, i, player2);
    }
}
export function inventorySwapC(player1, player2, player1indices = [0, 27], player2indices = [0, 27]) {
    for (let i = 0; i <
        Math.min(player1indices[1] - player1indices[0], player2indices[1] - player2indices[0]); i++) {
        player1.swapItems(i + player1indices[0], i + player2indices[0], player2);
    }
}
export function clearContainer(container) {
    for (let i = 0; i < container.size; i++) {
        container.setItem(i);
    }
}
export function fillContainer(container, item) {
    for (let i = 0; i < container.size; i++) {
        container.setItem(i, item);
    }
}
export function containerToItemStackArray(container) {
    let itemList = [];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getItem(i));
    }
    return itemList;
}
export function containerToContainerSlotArray(container) {
    let itemList = [];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getSlot(i));
    }
    return itemList;
}
export function equippableToItemStackArray(equippable, includeMainhand = false) {
    let itemList = [];
    for (let i = 0; i < 5 + Number(includeMainhand); i++) {
        itemList.push(equippable?.getEquipment(includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]));
    }
    return itemList;
}
export function equippableToContainerSlotArray(equippable, includeMainhand = false) {
    let itemList = [];
    for (let i = 0; i < 5 + Number(includeMainhand); i++) {
        itemList.push(equippable?.getEquipmentSlot(includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]));
    }
    return itemList;
}
export function entityToItemStackArray(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container.getItem(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList.push(equipment?.getEquipment(OtherEquipmentSlots[i]));
    }
    return itemList;
}
export function blockToItemStackArray(block) {
    let itemList = [];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getItem(i));
    }
    return itemList;
}
export function entityToContainerSlotArray(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList.push(container.getSlot(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
    }
    return !!container || !!equipment ? itemList : undefined;
}
export function blockToContainerSlotArray(block) {
    let itemList = [];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container.getSlot(i));
    }
    return !!container ? itemList : undefined;
}
export function entityToContainerSlotListObject(entity, getContainer = true, getEquipment = true) {
    let itemList = {};
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList[String(i)] = container.getSlot(i);
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList[String(OtherEquipmentSlots[i])] = equipment?.getEquipmentSlot(OtherEquipmentSlots[i]);
    }
    return !!container || !!equipment ? itemList : undefined;
}
export function blockToContainerSlotListObject(block) {
    let itemList = {};
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList[String(i)] = container.getSlot(i);
    }
    return !!container ? itemList : undefined;
}
export function entityToContainerSlotArrayB(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let itemListB = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList.push(container.getSlot(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemListB.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
    }
    return !!container || !!equipment
        ? { inventory: itemList, equipment: itemListB }
        : undefined;
}
export function getPlayerselectedSlotIndex(player) {
    return player
        .getComponent("inventory")
        .container.getSlot(player.selectedSlotIndex);
}
export function getInventory(containerBlockPlayerOrEntity) {
    return (containerBlockPlayerOrEntity instanceof Block
        ? containerBlockPlayerOrEntity.getComponent("inventory")
        : containerBlockPlayerOrEntity.getComponent("inventory"));
}
export function getEquipment(containerBlockPlayerOrEntity) {
    return containerBlockPlayerOrEntity.getComponent("equippable");
}
export function getEntityHeldItemSlot(entity) {
    return entity
        .getComponent("equippable")
        .getEquipmentSlot(EquipmentSlot.Mainhand);
}
export function getPlayerHeldItemSlot(player) {
    return player
        .getComponent("inventory")
        .container.getSlot(player.selectedSlotIndex);
}
export const EquipmentSlots = [
    EquipmentSlot.Head,
    EquipmentSlot.Chest,
    EquipmentSlot.Legs,
    EquipmentSlot.Feet,
    EquipmentSlot.Mainhand,
    EquipmentSlot.Offhand,
];
export const OtherEquipmentSlots = [
    EquipmentSlot.Head,
    EquipmentSlot.Chest,
    EquipmentSlot.Legs,
    EquipmentSlot.Feet,
    EquipmentSlot.Offhand,
];
export const JunkItemTypes = [
    "dirt",
    "stick",
    "deadbush",
    "tripwire_hook",
    "rotten_flesh",
    "string",
    "cobblestone",
    "stone",
    "diorite",
    "andesite",
    "granite",
    "tuff",
    "end_stone",
    "wheat_seeds",
    "tallgrass",
    "leather_helmet",
    "leather_boots",
    "leather_chestplate",
    "leather_leggings",
    "wooden_sword",
    "wooden_axe",
    "wooden_pickaxe",
    "wooden_shovel",
    "wooden_hoe",
    "spider_eye",
];
export const OpItemTypes = [
    "diamond",
    "netherite_ingot",
    "gold_ingot",
    "iron_ingot",
    "diamond_sword",
    "diamond_chestplate",
    "diamond_helmet",
    "diamond_leggings",
    "diamond_boots",
    "diamond_pickaxe",
    "diamond_shovel",
    "diamond_hoe",
    "diamond_block",
];
export const IllegalItemTypes = [
    "netherreactor",
    "glowingobsidian",
    "stonecutter",
    "water",
    "flowing_water",
    "lava",
    "flowing_lava",
    "camera",
    "item.camera",
    "item.skull",
    "item.cauldron",
    "bedrock",
];
export function parseSlot(slot, selectedSlotIndex) {
    return ([
        EquipmentSlot.Head,
        EquipmentSlot.Chest,
        EquipmentSlot.Legs,
        EquipmentSlot.Feet,
        EquipmentSlot.Mainhand,
        EquipmentSlot.Offhand,
    ][[
        "head",
        "chest",
        "legs",
        "feet",
        "mainhand",
        "offhand",
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "hand",
        "otherhand",
        "cap",
        "tunic",
        "pants",
        "shoes",
        "righthand",
        "lefthand",
        "hat",
        "shirt",
        "shorts",
        "sandals",
        "firsthand",
        "secondaryhand",
    ].findIndex((v) => v == tryget(() => slot?.trim()?.toLowerCase())) % 6] ??
        (tryget(() => slot?.trim()) == "cursor" ? "cursor" : undefined) ??
        ((tryget(() => slot?.trim()) == "~" || tryget(() => slot?.trim()) == "") &&
            !!!selectedSlotIndex
            ? "~"
            : Number(tryget(() => slot?.trim()) ?? slot)));
}
export function getSlotFromParsedSlot(slot, options) {
    if (typeof slot == "string") {
        return slot.trim() == "~"
            ? !!options?.selectedSlotIndex
                ? options?.container?.getSlot(Number(options?.selectedSlotIndex))
                : !!options?.equipment
                    ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
                    : undefined
            : slot.trim() == "cursor"
                ? !!options?.cursor
                    ? options?.cursor
                    : undefined
                : !!options?.equipment
                    ? slot.trim().toLowerCase() == "head"
                        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Head)
                        : slot.trim().toLowerCase() == "chest"
                            ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Chest)
                            : slot.trim().toLowerCase() == "legs"
                                ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Legs)
                                : slot.trim().toLowerCase() == "feet"
                                    ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Feet)
                                    : slot.trim().toLowerCase() == "mainhand"
                                        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
                                        : slot.trim().toLowerCase() == "offhand"
                                            ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Offhand)
                                            : !Number.isNaN(Number(slot))
                                                ? options?.container?.getSlot(Number(slot))
                                                : undefined
                    : !Number.isNaN(Number(slot))
                        ? options?.container?.getSlot(Number(slot))
                        : undefined;
    }
    else if (typeof slot == "number") {
        return options?.container?.getSlot(Number(slot));
    }
    else
        return options?.container?.getSlot(Number(slot));
}
//# sourceMappingURL=command_utilities.js.map