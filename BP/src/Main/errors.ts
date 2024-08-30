import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Container, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, BlockType, BlockTypes, ItemTypes, ItemType, ItemLockMode, type Enchantment, type DimensionLocation, type Vector3, type Vector2, CompoundBlockVolume, BlockVolumeIntersection, BlockVolume, BlockVolumeBase, GameMode, type RawMessage, type MusicOptions, type PlayerSoundOptions, type EntityApplyDamageOptions, type EntityApplyDamageByProjectileOptions, MolangVariableMap, type BlockRaycastOptions, type EntityComponentTypeMap, EffectType, type EntityRaycastOptions, type EntityQueryOptions, type PlayAnimationOptions, type TeleportOptions, EnchantmentTypes, StructureSaveMode, EntityTypes, type BlockRaycastHit, StructureAnimationMode, StructureMirrorAxis, StructureRotation, Structure, type BlockComponentTypeMap } from "@minecraft/server";
import { targetSelectorB, targetSelectorAllListB, targetSelectorAllListC, targetSelectorAllListE, targetSelector, getTopSolidBlock, arrayModifier, arrayToElementList, getAIIDClasses, getArrayElementProperty, debugAction, generateAIID, targetSelectorAllListD, toBase, fromBaseToBase, interactable_block, interactable_blockb, combineObjects, customFormUIElement, getCUIDClasses, strToCustomFormUIElement, generateCUID, fixedPositionNumberObject/*,format_version*/, getUICustomForm, generateTUID, JSONParse, JSONStringify, roundPlaceNumberObject, worldPlayers, timeZones, getParametersFromString, arrayModifierOld, customModulo, escapeRegExp, extractJSONStrings, getParametersFromExtractedJSON, jsonFromString, JSONParseOld, JSONStringifyOld, arrayify, objectify, stringify, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, asend, bsend, csend, shootEntity, shootEntityB, shootProjectile, shootProjectileB, splitTextByMaxProperyLength, catchtry, cerror, cinfo, clog, cwarn, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, psend, pasend, pbsend, pcsend, tryget, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, tryrun, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, perror, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, formatTime, SemVerString } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, type ILocalTeleport, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer, type savedPlayerData, type savedItem } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings } from "./ui.js";
import { listoftransformrecipes } from "transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "../Main";
import *  as transformrecipes from "transformrecipes";
import *  as coords from "./coordinates";
import *  as cmds from "./commands";
import *  as bans from "./ban";
import *  as uis from "./ui";
import *  as playersave from "./player_save";
import *  as spawnprot from "./spawn_protection";
import *  as chat from "./chat";
import *  as cmdutils from "./command_utilities";
import *  as utils from "./utilities";
import *  as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { uiManager, UIManager } from "@minecraft/server-ui";
export const cmdutilsmetaimport = import.meta
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
mcServer
mcServerUi/*
mcServerAdmin*//*
mcDebugUtilities*//*
mcCommon*/
GameTest/*
mcVanillaData*/
main
coords
cmds
bans
uis
playersave
spawnprot
mcMath
/**
 * @since 1.20.0-development.67
 * An error having to do with SemVer strings. 
 */
export class SemVerError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
/**
 * @since 1.20.0-development.67
 * An error for when a SemVer string is unable to be parsed. 
 */
export class SemVerParseError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
/**
 * @since 1.20.0-development.67
 * An error for when a SemVer string with the wrong pre-release phase is recieved. 
 */
export class SemVerPhaseError extends Error {
    constructor(message?: string) {
        super(message);
    }
}