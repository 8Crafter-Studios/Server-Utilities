import { Player, system, world } from "@minecraft/server";
import { targetSelectorB, targetSelectorAllListB, targetSelectorAllListC, targetSelectorAllListE, targetSelector, getTopSolidBlock, arrayModifier, arrayToElementList, getAIIDClasses, getArrayElementProperty, debugAction, generateAIID, targetSelectorAllListD, toBase, fromBaseToBase, interactable_block, interactable_blockb, combineObjects, customFormUIElement, getCUIDClasses, strToCustomFormUIElement, generateCUID, fixedPositionNumberObject, getUICustomForm, generateTUID, JSONParse, JSONStringify, roundPlaceNumberObject, worldPlayers, timeZones, getParametersFromString, arrayModifierOld, customModulo, escapeRegExp, extractJSONStrings, getParametersFromExtractedJSON, jsonFromString, JSONParseOld, JSONStringifyOld, arrayify, objectify, stringify, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, format_version } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d } from "./coordinates";
import { chatCommands, chatMessage, chatSend, commands_format_version, evaluateParameters, evaluateParametersOld, send } from "./commands";
import { player_save_format_version, savedPlayer } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal } from "./ui.js";
import { listoftransformrecipes } from "transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "Main";
import * as transformrecipes from "transformrecipes";
import * as coords from "./coordinates";
import * as cmds from "./commands";
import * as bans from "./ban";
import * as uis from "./ui";
import * as playersave from "./player_save";
import * as spawnprot from "./spawn_protection";
import mcMath from "@minecraft/math.js";
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
export const ban_format_version = "1.2.0";
export class ban {
    constructor(ban) {
        this.format_version = format_version;
        this.ban_format_version = ban_format_version;
        this.type = ban.type ?? (ban.playerName != undefined ? "name" : "id");
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
        this.banId = ban.banId ?? (ban.type == "name" ? ("ban:" + ban.banDate + ":" + ban.playerName) : ("banId:" + ban.banDate + ":" + ban.playerId));
    }
    get isExpired() { return Number(this.unbanDate) <= Date.now(); }
    get isValid() { return Number(this.unbanDate) > Date.now(); }
    get timeRemainingRaw() { return Number(this.unbanDate) - Date.now(); }
    get timeRemaining() { let time = new Date(Math.abs((Number(this.unbanDate) - Date.now())) + (new Date().setUTCFullYear(0))); let timeList = { days: (-1 * Number(this.isExpired) + 1) * Math.floor((time.getTime() - (new Date().setUTCFullYear(0))) / 86400000), hours: (-1 * Number(this.isExpired) + 1) * time.getHours(), minutes: (-1 * Number(this.isExpired) + 1) * time.getMinutes(), seconds: (-1 * Number(this.isExpired) + 1) * time.getSeconds(), milliseconds: (-1 * Number(this.isExpired) + 1) * time.getMilliseconds() }; return timeList; }
    save() { world.setDynamicProperty(this.banId, JSON.stringify(this)); }
    remove() { world.setDynamicProperty(this.banId); }
    static getBanIds(banType = "both") { return world.getDynamicPropertyIds().filter((s) => (banType == "both" ? (s.startsWith("ban:") || s.startsWith("banId:")) : (banType == "name" ? s.startsWith("ban:") : banType == "id" ? s.startsWith("banId:") : undefined))); }
    static getValidBanIds(banType = "both") { return world.getDynamicPropertyIds().filter((s) => (banType == "both" ? ((s.startsWith("ban:") ? ban.getBan(s).isValid : false) || (s.startsWith("banId:") ? ban.getBan(s).isValid : false)) : (banType == "name" ? (s.startsWith("ban:") ? ban.getBan(s).isValid : false) : banType == "id" ? (s.startsWith("banId:") ? ban.getBan(s).isValid : false) : undefined))); }
    static getExpiredBanIds(banType = "both") { return world.getDynamicPropertyIds().filter((s) => (banType == "both" ? ((s.startsWith("ban:") ? ban.getBan(s).isExpired : false) || (s.startsWith("banId:") ? ban.getBan(s).isExpired : false)) : (banType == "name" ? (s.startsWith("ban:") ? ban.getBan(s).isExpired : false) : banType == "id" ? (s.startsWith("banId:") ? ban.getBan(s).isExpired : false) : undefined))); } /*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/
    static saveBan(ban) { ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true; ban.format_version = ban.format_version ?? format_version; ban.ban_format_version = ban.ban_format_version ?? ban_format_version; if (ban.type == "name") {
        world.setDynamicProperty(ban.banId ?? `ban:${ban.banDate}:${ban.playerName}`, JSON.stringify(ban));
    }
    else {
        if (ban.type == "id") {
            world.setDynamicProperty(ban.banId ?? `idBan:${ban.banDate}:${ban.playerId}`, JSON.stringify(ban));
        }
        else { }
    } } /*
    getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
    static getBan(banId) { try {
        let banString = String(world.getDynamicProperty(banId));
        return new ban(JSON.parse(banString));
    }
    catch (e) {
        console.error(e, e.stack);
    } }
    static getBans() { let bans; bans = []; ban.getBanIds().forEach((b) => { try {
        bans.push(ban.getBan(b));
    }
    catch (e) {
        console.error(e, e.stack);
    } }); return { idBans: bans.filter((b) => (b?.type == "id")), nameBans: bans.filter((b) => (b?.type == "name")), allBans: bans }; }
    static getValidBans() { let bans; bans = []; ban.getValidBanIds().forEach((b) => { try {
        bans.push(ban.getBan(b));
    }
    catch (e) {
        console.error(e, e.stack);
    } }); return { idBans: bans.filter((b) => (b.type == "id")), nameBans: bans.filter((b) => (b.type == "name")), allBans: bans }; }
    static getExpiredBans() { let bans; bans = []; ban.getExpiredBanIds().forEach((b) => { try {
        bans.push(ban.getBan(b));
    }
    catch (e) {
        console.error(e, e.stack);
    } }); return { idBans: bans.filter((b) => (b.type == "id")), nameBans: bans.filter((b) => (b.type == "name")), allBans: bans }; }
    static testForBannedPlayer(player) { return ban.getBans().idBans.find(b => b.isValid && b.playerId == player.id) != undefined ? true : (ban.getBans().nameBans.find(b => b.isValid && b.playerName == player.name) != undefined ? true : false); }
    static testForNameBannedPlayer(player) { return ban.getBans().nameBans.find(b => b.isValid && b.playerName == player.name) != undefined ? true : false; }
    static testForIdBannedPlayer(player) { return ban.getBans().idBans.find(b => b.isValid && b.playerId == player.id) != undefined ? true : false; }
    static executeOnBannedPlayers(callbackfn) { let feedback; feedback = []; world.getAllPlayers().filter((p) => ban.testForBannedPlayer(p)).forEach((p, i, a) => { try {
        feedback.push(callbackfn(p, i, a));
    }
    catch (e) {
        feedback.push(e);
    } }); return feedback; }
}
system.runInterval(() => { if (world.getDynamicProperty("andexdbSettings:banEnabled") ?? true == true) {
    ban.executeOnBannedPlayers((p) => { let success = false; let b = (savedPlayer?.getSavedPlayer("player:" + p.id)?.idBans?.valid?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate)))[0] ?? savedPlayer?.getSavedPlayer("player:" + p.id)?.nameBans?.valid?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate)))[0] ?? savedPlayer?.getSavedPlayer("player:" + p.id)?.bans?.valid?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate)))[0] ?? savedPlayer?.getSavedPlayer("player:" + p.id)?.bans?.all?.sort((a, b) => 1 - (2 * Number(a?.banDate > b?.banDate)))[0]); let reason = b?.reason; try {
        reason = String(eval(b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString() + " GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString() + " GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))));
    }
    catch (e) {
        reason = b?.reason?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))?.replaceAll("{bannedBy}", String(b?.bannedByName))?.replaceAll("{bannedByName}", String(b?.bannedByName))?.replaceAll("{bannedById}", String(b?.bannedById))?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString() + " GMT"))?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString() + " GMT"))?.replaceAll("{type}", String(b?.type))?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))?.escapeCharactersB(true)?.v;
    } ; p.runCommand(`/kick ${JSON.stringify(p.name)} ${reason}`); return success; });
} }, 5);
//# sourceMappingURL=ban.js.map