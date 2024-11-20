import { Player, system, world } from "@minecraft/server";
import { getTopSolidBlock, arrayToElementList, debugAction, interactable_block, interactable_blockb, customFormUIElement, strToCustomFormUIElement/*,format_version*/, getUICustomForm, worldPlayers, timeZones, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, SemVerString, SemVerMatcher, SemVerValidator, dimensions, dimensionsb, dimensionsc, dimensionsd, dimensionse, fillBlocksHHFGB, fillBlocksHISGGB, fillBlocksHOFGB, fillBlocksHSGGB, flatPath, getGroundSolidBlock, getNextTopSolidBlockAbovePosition, getNextTopSolidBlockBelowPosition, getPathInObject, nether, overworld, scanForBlockType, the_end, v3Multiply, fillBlocksE, fillBlocksF } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, type ILocalTeleport, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { player_save_format_version, savedPlayer, type savedPlayerData, type savedItem } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings } from "./ui.js";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import { arrayify, utilsmetaimport, combineObjects, customModulo, escapeRegExp, extractJSONStrings, fixedPositionNumberObject, fromBaseToBase, generateAIID, generateCUID, generateTUID, getAIIDClasses, getArrayElementProperty, getCUIDClasses, getParametersFromExtractedJSON, getParametersFromString, jsonFromString, objectify, roundPlaceNumberObject, shootEntity, shootEntityB, shootProjectile, shootProjectileB, shuffle, splitTextByMaxProperyLength, stringify, toBase, arrayModifier, arrayModifierOld } from "./utilities";
import { chatMessage, chatSend, chatmetaimport, currentlyRequestedChatInput, evaluateChatColorType, patternColors, patternColorsMap, patternFunctionList, patternList, requestChatInput, requestConditionalChatInput } from "./chat";
import { cmdutilsmetaimport,targetSelector,targetSelectorAllListB,targetSelectorAllListC,targetSelectorAllListD,targetSelectorAllListE,targetSelectorB } from "./command_utilities";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "Main";
import *  as transformrecipes from "Assets/constants/transformrecipes";
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

export const ban_format_version = "1.2.0";
export class ban{
    type: "name"|"id"
    playerName?: string
    originalPlayerId?: string|number
    playerId?: string|number
    originalPlayerName?: string
    removeAfterBanExpires: boolean
    unbanDate: Date|number
    banDate: Date|number
    bannedById: string|number
    bannedByName: string
    reason?: string
    format_version: string|number = format_version
    ban_format_version: string|number = ban_format_version
    banId: string
    constructor(ban: {type: "name"|"id", banId?: string, unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason?: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number}|ban) {
        this.type = ban.type??(ban.playerName!=undefined?"name":"id"); 
        this.unbanDate = ban.unbanDate; 
        this.banDate = ban.banDate; 
        this.bannedById = ban.bannedById; 
        this.bannedByName = ban.bannedByName; /*
        console.warn(performance.measure("testPerformance"))*/
        this.reason = ban.reason; 
        this.removeAfterBanExpires = ban.removeAfterBanExpires ?? false; 
        this.playerName = ban.playerName; 
        this.originalPlayerId = ban.originalPlayerId; 
        this.playerId = ban.playerId; 
        this.originalPlayerName = ban.originalPlayerName; 
        this.format_version = ban.format_version ?? format_version; 
        this.ban_format_version = ban.ban_format_version ?? ban_format_version; 
        this.banId = ban.banId ?? (ban.type=="name"?("ban:"+ban.banDate+":"+ban.playerName):("banId:"+ban.banDate+":"+ban.playerId)); 
    }
    get isExpired(){return Number(this.unbanDate)<=Date.now()}
    get isValid(){return Number(this.unbanDate)>Date.now()}
    get timeRemainingRaw(){return Number(this.unbanDate)-Date.now()}
    get timeRemaining(){let time = new Date(Math.abs((Number(this.unbanDate)-Date.now()))+(new Date().setUTCFullYear(0))); let timeList = {days: (-1*Number(this.isExpired)+1)*Math.floor((time.getTime()-(new Date().setUTCFullYear(0)))/86400000), hours: (-1*Number(this.isExpired)+1)*time.getHours(), minutes: (-1*Number(this.isExpired)+1)*time.getMinutes(), seconds: (-1*Number(this.isExpired)+1)*time.getSeconds(), milliseconds: (-1*Number(this.isExpired)+1)*time.getMilliseconds()}; return timeList}
    save(){world.setDynamicProperty(this.banId, JSON.stringify(this))}
    remove(){world.setDynamicProperty(this.banId)}
    static getBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?(s.startsWith("ban:")||s.startsWith("banId:")):(banType=="name"?s.startsWith("ban:"):banType=="id"?s.startsWith("banId:"):undefined)))}
    static getValidBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isValid:false)||(s.startsWith("banId:")?ban.getBan(s).isValid:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isValid:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isValid:false):undefined)))}
    static getExpiredBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isExpired:false)||(s.startsWith("banId:")?ban.getBan(s).isExpired:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isExpired:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isExpired:false):undefined)))}/*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
static saveBan(ban: {type: "name"|"id", unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number, banId?: string}|ban){ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true; ban.format_version = ban.format_version ?? format_version; ban.ban_format_version = ban.ban_format_version ?? ban_format_version; if(ban.type=="name"){world.setDynamicProperty(ban.banId??`ban:${ban.banDate}:${ban.playerName}`, JSON.stringify(ban))}else{if(ban.type=="id"){world.setDynamicProperty(ban.banId??`idBan:${ban.banDate}:${ban.playerId}`, JSON.stringify(ban))}else{}}}/*
getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
static getBan(banId: string){try{let banString = String(world.getDynamicProperty(banId)); return new ban(JSON.parse(banString))}catch(e){console.error(e, e.stack)}}
static getBans(){let bans: ban[]; bans = []; ban.getBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b?.type=="id")), nameBans: bans.filter((b)=>(b?.type=="name")), allBans: bans}}
static getValidBans(){let bans: ban[]; bans = []; ban.getValidBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static getExpiredBans(){let bans: ban[]; bans = []; ban.getExpiredBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static testForBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:(ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false)}
static testForNameBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false}
static testForIdBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:false}
static executeOnBannedPlayers(callbackfn: (player: Player, index: number, array: any[])=>unknown){let feedback: any[]; feedback = []; world.getAllPlayers().filter((p)=>ban.testForBannedPlayer(p)).forEach((p, i, a)=>{try{feedback.push(callbackfn(p, i, a))}catch(e){feedback.push(e)}}); return feedback}
}
export async function startCheckingForBannedPlayers(){
    (await import("Main")).config;
    repeatingIntervals.bannedPlayersChecker=system.runInterval(()=>{if(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true == true){ban.executeOnBannedPlayers((p)=>{let success = false; let b = (savedPlayer?.getSavedPlayer("player:"+p.id)?.idBans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.nameBans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.bans?.valid?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]??savedPlayer?.getSavedPlayer("player:"+p.id)?.bans?.all?.sort((a: ban, b: ban)=>1-(2*Number(a?.banDate>b?.banDate)))[0]); let reason = b?.reason; try{reason = String(eval(b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString()+" GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString()+" GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw)))); }catch(e){reason = b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedByName}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString()+" GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString()+" GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))?.escapeCharactersB(true)?.v; }; p.runCommand(`/kick ${JSON.stringify(p.name)} ${reason}`); return success})}}, config.system.bannedPlayersRefreshRate??5)
};
export async function stopCheckingForBannedPlayers(){
    try{
        system.clearRun(repeatingIntervals.bannedPlayersChecker);
        repeatingIntervals.bannedPlayersChecker=null;
        return 1;
    }catch{
        return 0;
    }
};
startCheckingForBannedPlayers();