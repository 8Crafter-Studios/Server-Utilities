import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Container, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, BlockType, BlockTypes, ItemTypes, ItemType, ItemLockMode, CompoundBlockVolume, BlockVolumeIntersection, BlockVolume, BlockVolumeBase, GameMode, MolangVariableMap, EffectType, EnchantmentTypes, StructureSaveMode, EntityTypes, StructureAnimationMode, StructureMirrorAxis, StructureRotation, Structure } from "@minecraft/server";
import { getTopSolidBlock, arrayToElementList, debugAction, interactable_block, interactable_blockb, customFormUIElement, strToCustomFormUIElement /*,format_version*/, getUICustomForm, worldPlayers, timeZones, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, SemVerString, crashEnabled, SemVerMatcher, SemVerValidator, dimensions, dimensionsb, dimensionsc, dimensionsd, dimensionse, fillBlocksHHFGB, fillBlocksHISGGB, fillBlocksHOFGB, fillBlocksHSGGB, flatPath, getGroundSolidBlock, getNextTopSolidBlockAbovePosition, getNextTopSolidBlockBelowPosition, getPathInObject, nether, overworld, scanForBlockType, subscribedEvents, tempSavedVariables, the_end, v3Multiply, fillBlocksE, fillBlocksF } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings } from "./ui.js";
import { listoftransformrecipes } from "transformrecipes";
import { arrayify, clamp24HoursTo12Hours, utilsmetaimport, combineObjects, customModulo, escapeRegExp, extractJSONStrings, fixedPositionNumberObject, formatDateTime, formatTime, fromBaseToBase, generateAIID, generateCUID, generateTUID, getAIIDClasses, getArrayElementProperty, getCUIDClasses, getParametersFromExtractedJSON, getParametersFromString, jsonFromString, objectify, roundPlaceNumberObject, shootEntity, shootEntityB, shootProjectile, shootProjectileB, shuffle, splitTextByMaxProperyLength, stringify, toBase, twoWayModulo, arrayModifier, arrayModifierOld } from "./utilities";
import { chatMessage, chatSend, chatmetaimport, currentlyRequestedChatInput, evaluateChatColorType, patternColors, patternColorsMap, patternFunctionList, patternList, requestChatInput, requestConditionalChatInput } from "./chat";
import { cmdutilsmetaimport, targetSelector, targetSelectorAllListB, targetSelectorAllListC, targetSelectorAllListD, targetSelectorAllListE, targetSelectorB } from "./command_utilities";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "../Main";
import * as transformrecipes from "transformrecipes";
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
export const errorsmetaimport = import.meta;
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
/**
 * An error having to do with SemVer strings.
 * @since 1.20.0-development.67
 */
export class SemVerError extends Error {
    constructor(message) {
        super(message);
    }
}
/**
 * An error for when a SemVer string is unable to be parsed.
 * @since 1.20.0-development.67
 */
export class SemVerParseError extends Error {
    constructor(message) {
        super(message);
    }
}
/**
 * An error for when a SemVer string with the wrong pre-release phase is recieved.
 * @since 1.20.0-development.67
 */
export class SemVerPhaseError extends Error {
    constructor(message) {
        super(message);
    }
}
export class TimeoutError extends Error {
    constructor(message) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message);
    }
}
export class ExpireError extends Error {
    constructor(message) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message);
    }
}
export class NoSelectorMatchesError extends Error {
    constructor(message) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message);
    }
}
/**
 * An error for when the storage of something is full.
 * An example use case for this is for the a player
 * is selling an item at another player's player shop,
 * but the owner of the shop is out of storage inside of their
 * recieved player shop items storage entity's inventory.
 * @since 1.23.0-preview.20+BUILD.1
 * @since 10/03/2024 1:48 PM
 */
export class StorageFullError extends Error {
    constructor(message) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message);
    }
}
//# sourceMappingURL=errors.js.map