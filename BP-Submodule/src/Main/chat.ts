import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Container, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, BlockType, BlockTypes, ItemTypes, ItemType, ItemLockMode, type Enchantment, type DimensionLocation, type Vector3, type Vector2, CompoundBlockVolume, BlockVolumeIntersection, BlockVolume, BlockVolumeBase, GameMode, type RawMessage, type MusicOptions, type PlayerSoundOptions, type EntityApplyDamageOptions, type EntityApplyDamageByProjectileOptions, MolangVariableMap, type BlockRaycastOptions, type EntityComponentTypeMap, EffectType, type EntityRaycastOptions, type EntityQueryOptions, type PlayAnimationOptions, type TeleportOptions, EnchantmentTypes, StructureSaveMode, EntityTypes, type BlockRaycastHit, StructureAnimationMode, StructureMirrorAxis, StructureRotation, Structure, type BlockComponentTypeMap } from "@minecraft/server";
import { getTopSolidBlock, arrayToElementList, debugAction, interactable_block, interactable_blockb, customFormUIElement, strToCustomFormUIElement/*,format_version*/, getUICustomForm, worldPlayers, timeZones, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, SemVerString, SemVerMatcher, SemVerValidator, dimensions, dimensionsb, dimensionsc, dimensionsd, dimensionse, fillBlocksHHFGB, fillBlocksHISGGB, fillBlocksHOFGB, fillBlocksHSGGB, flatPath, getGroundSolidBlock, getNextTopSolidBlockAbovePosition, getNextTopSolidBlockBelowPosition, getPathInObject, nether, overworld, scanForBlockType, the_end, v3Multiply, fillBlocksE, fillBlocksF } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, type ILocalTeleport, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer, type savedPlayerData, type savedItem } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings, PlayerNotifications } from "./ui.js";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import { arrayify, utilsmetaimport, combineObjects, customModulo, escapeRegExp, extractJSONStrings, fixedPositionNumberObject, fromBaseToBase, generateAIID, generateCUID, generateTUID, getAIIDClasses, getArrayElementProperty, getCUIDClasses, getParametersFromExtractedJSON, getParametersFromString, jsonFromString, objectify, roundPlaceNumberObject, shootEntity, shootEntityB, shootProjectile, shootProjectileB, shuffle, splitTextByMaxProperyLength, stringify, toBase, arrayModifier, arrayModifierOld } from "./utilities";
import { cmdutilsmetaimport,targetSelector,targetSelectorAllListB,targetSelectorAllListC,targetSelectorAllListD,targetSelectorAllListE,targetSelectorB } from "./command_utilities";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "../Main";
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
import { uiManager, UIManager } from "@minecraft/server-ui";
import { chatCommands, cmdsEval, command, idGenerator } from "./commands";
import { ExpireError, TimeoutError } from "./errors";
import { commands } from "./commands_list";
import { LinkedServerShopCommands } from "ExtraFeatures/server_shop";
export const chatmetaimport = import.meta
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
transformrecipes
chat
cmdutils
utils
errors
mcMath
export const currentlyRequestedChatInput = {} as {[playerId: string]: {anyInput: {[id: string]: {time: number, request?: string|RawMessage|(string|RawMessage)[], input?: string, id?: string}}, conditionalInput: {[id: string]: {time: number, request?: string|RawMessage|(string|RawMessage)[], input?: string, id?: string, conditions: (player: Player, message: string, event: ChatSendBeforeEvent)=>boolean, expireTime: number, expireConditions?: (requestObject: {[k: string]: any})=>boolean}}}}
export const patternList = {
    rainbow: ['§4', '§c', '§g', '§e', '§a', '§2', '§b', '§3', '§5', '§d', '§3', '§b', '§2', '§a', '§e', '§g', '§c', '§4'],
	blue: ['§1', '§9', '§3', '§b', '§3', '§9', '§1'],
	yellow: ['§6', '§g', '§e', '§g', '§6'],
	black: ['§0', '§8', '§7', '§f', '§7', '§8', '§0'],
	gray: ['§8', '§7', '§f', '§7', '§8'],
	purple: ['§5', '§u', '§d', '§u', '§5'],
}
export const patternFunctionList = {
    rainbow: (ib: number)=>patternList.rainbow[ib%patternList.rainbow.length], 
    randomrainbow: (ib: number, offset: number)=>patternList.rainbow[(ib+offset)%patternList.rainbow.length], 
    shuffledrainbow: ()=>patternList.rainbow[Math.floor(Math.random()*patternList.rainbow.length)], 
    bluegradient: (ib: number)=>patternList.blue[ib%patternList.blue.length], 
    randombluegradient: (ib: number, offset: number)=>patternList.blue[(ib+offset)%patternList.blue.length], 
    shuffledbluegradient: ()=>patternList.blue[Math.floor(Math.random()*patternList.blue.length)], 
    yellowgradient: (ib: number)=>patternList.yellow[ib%patternList.yellow.length], 
    randomyellowgradient: (ib: number, offset: number)=>patternList.yellow[(ib+offset)%patternList.yellow.length], 
    shuffledyellowgradient: ()=>patternList.yellow[Math.floor(Math.random()*patternList.yellow.length)], 
    blackgradient: (ib: number)=>patternList.black[ib%patternList.black.length], 
    randomblackgradient: (ib: number, offset: number)=>patternList.black[(ib+offset)%patternList.black.length], 
    shuffledblackgradient: ()=>patternList.black[Math.floor(Math.random()*patternList.black.length)], 
    graygradient: (ib: number)=>patternList.gray[ib%patternList.gray.length], 
    randomgraygradient: (ib: number, offset: number)=>patternList.gray[(ib+offset)%patternList.gray.length], 
    shuffledgraygradient: ()=>patternList.gray[Math.floor(Math.random()*patternList.gray.length)], 
    purplegradient: (ib: number)=>patternList.purple[ib%patternList.purple.length], 
    randompurplegradient: (ib: number, offset: number)=>patternList.purple[(ib+offset)%patternList.purple.length], 
    shuffledpurplegradient: ()=>patternList.purple[Math.floor(Math.random()*patternList.purple.length)]
}
export const patternColors = [
	'aqua',
	'darkpurple',
	'darkgreen',
	'darkred',
	'gold',
	'darkgray',
	'yellow',
	'white',
	'red',
	'minecoingold',
	'green',
	'lightpurple',
	'gray',
	'darkblue',
	'darkaqua',
	'blue',
	'black',
	'bluedarkgrey',
	'mediumpurple',
	'darkorange',
	'mediumgreen',
	'mediumcyan',
	'beige',
	'darkbrown',
	'meduimred',
	'brown',
	'§0',
	'§1',
	'§2',
	'§3',
	'§4',
	'§5',
	'§6',
	'§7',
	'§8',
	'§9',
	'§a',
	'§b',
	'§c',
	'§d',
	'§e',
	'§f',
	'§g',
	'§t',
	'§u',
	'§p',
	'§q',
	'§s',
	'§h',
	'§j',
	'§m',
	'§n',
]
export const patternColorsMap = {
	'aqua': '§b',
	'darkpurple': '§5',
	'darkgreen': '§3',
	'darkred': '§4',
	'gold': '§6',
	'darkgray': '§8',
	'yellow': '§e',
	'white': '§f',
	'red': '§',
	'minecoingold': '§g',
	'green': '§a',
	'lightpurple': '§d',
	'gray': '§7',
	'darkblue': '§1',
	'darkaqua': '§3',
	'blue': '§9',
	'black': '§0',
	'bluedarkgrey': '§t',
	'mediumpurple': '§u',
	'darkorange': '§p',
	'mediumgreen': '§q',
	'mediumcyan': '§s',
	'beige': '§h',
	'darkbrown': '§j',
	'meduimred': '§m',
	'brown': '§n',
	'§0': '§0',
	'§1': '§1',
	'§2': '§2',
	'§3': '§3',
	'§4': '§4',
	'§5': '§5',
	'§6': '§6',
	'§7': '§7',
	'§8': '§8',
	'§9': '§9',
	'§a': '§a',
	'§b': '§b',
	'§c': '§c',
	'§d': '§d',
	'§e': '§e',
	'§f': '§f',
	'§g': '§g',
	'§t': '§t',
	'§u': '§u',
	'§p': '§p',
	'§q': '§q',
	'§s': '§s',
	'§h': '§h',
	'§j': '§j',
	'§m': '§m',
	'§n': '§n',
}
export function evaluateChatColorType(text: string, type: string){
    let ib = -1n; 
//    let value = "hi§r§btest s§# a zs§# x vc §r§ksazx"; 
    let stop = false; 
    return text.split("").map((v, i, a)=>{if(a[i-1]=="§"&&v=="!"){stop = true; return v}else if(a[i-1]=="§"&&v=="?"){stop = !stop; return v}else if(a[i-1]=="§"&&v=="#"){stop = false; return v}else if(a[i-1]=="§"||v=="§"||v==" "||stop){return v}else{ib++; return patternFunctionList[type](Number(ib), Math.floor(Math.random()*patternList.rainbow.length))+v}}).join(""); 
}
export async function requestChatInput(player: Player, requestMessage?: string|RawMessage|(string|RawMessage)[]){
    let id = idGenerator()
    !!requestMessage?player.sendMessage(requestMessage):undefined
    !!!currentlyRequestedChatInput[player.id]?currentlyRequestedChatInput[player.id]={anyInput: {[id]: {time: Date.now(), id: id, request: requestMessage}}, conditionalInput: {}}:currentlyRequestedChatInput[player.id].anyInput[id]={time: Date.now(), id: id, request: requestMessage}
    return new Promise((resolve: (value: string) => void, reject: (error: Error) => void) => {
        function a(){if(!player.isValid()){delete currentlyRequestedChatInput[player.id]; reject(new ReferenceError("The player that the input was requested from is no longer valid, most likely the have left the game.")); return}; if(!!!currentlyRequestedChatInput[player.id].anyInput[id].input){system.run(() => {
           a()
        })}else{let input = currentlyRequestedChatInput[player.id].anyInput[id].input as string; delete currentlyRequestedChatInput[player.id].anyInput[id]; resolve(input)}}
        a()
    })
}
export async function requestConditionalChatInput(player: Player, conditions: (player: Player, message: string, event: ChatSendBeforeEvent)=>boolean = ()=>true, options: {requestMessage?: string|RawMessage|(string|RawMessage)[], expireMs?: number, expireConditions?: (requestObject: {time: number, request?: string|RawMessage|(string|RawMessage)[], input?: string, id?: string, conditions: (player: Player, message: string, event: ChatSendBeforeEvent)=>boolean, [k: string]: any})=>boolean} = {}){
    let id = idGenerator()
    const expireTime = Date.now()+(options.expireMs??Infinity)
    !!options.requestMessage?player.sendMessage(options.requestMessage):undefined
    !!!currentlyRequestedChatInput[player.id]?currentlyRequestedChatInput[player.id]={anyInput: {}, conditionalInput: {[id]: {time: Date.now(), id: id, request: options.requestMessage, conditions: conditions??(()=>true), expireTime: expireTime, expireConditions: options.expireConditions??(()=>false)}}}:currentlyRequestedChatInput[player.id].conditionalInput[id]={time: Date.now(), id: id, request: options.requestMessage, conditions: conditions??(()=>true), expireTime: Date.now()+(options.expireMs??Infinity), expireConditions: options.expireConditions??(()=>false)}
    return new Promise((resolve: (value: string) => any, reject: (error: Error) => any) => {
        function a(){
            if(!player.isValid()){
                delete currentlyRequestedChatInput[player.id]; 
                reject(new ReferenceError("The player that the input was requested from is no longer valid, most likely the have left the game.")); 
                return
            }; 
            if(!!!currentlyRequestedChatInput[player.id].conditionalInput[id].input){
                if(Date.now()>(currentlyRequestedChatInput[player.id].conditionalInput[id].expireTime??Infinity)){
                    delete currentlyRequestedChatInput[player.id].conditionalInput[id]; 
                    reject(new TimeoutError("The request timed out.")); 
                    return
                }else if(!!options.expireConditions?currentlyRequestedChatInput[player.id].conditionalInput[id].expireConditions(currentlyRequestedChatInput[player.id].conditionalInput[id])??false:false){
                    delete currentlyRequestedChatInput[player.id].conditionalInput[id]; 
                    reject(new ExpireError("The request expired.")); 
                    return
                }else {
                    system.run(() => {
                        a()
                    })
                }
            }else{
                let input = currentlyRequestedChatInput[player.id].conditionalInput[id].input as string; 
                delete currentlyRequestedChatInput[player.id].conditionalInput[id]; 
                resolve(input)
            }}
        a()
    })
}
export function chatMessage(eventData: ChatSendBeforeEvent, bypassChatInputRequests = false){
    if(!bypassChatInputRequests&&Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.anyInput??{}).length!=0){currentlyRequestedChatInput[eventData.sender.id].anyInput[Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.anyInput??{}).sort((a, b) => currentlyRequestedChatInput[eventData.sender.id].anyInput[a].time - currentlyRequestedChatInput[eventData.sender.id].anyInput[b].time)[0]].input=eventData.message; eventData.cancel=true; return}
    if(!bypassChatInputRequests&&Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.conditionalInput??{}).filter(r=>!!currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions?currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions(eventData.sender, eventData.message, eventData):true).length!=0){currentlyRequestedChatInput[eventData.sender.id].conditionalInput[Object.keys(currentlyRequestedChatInput[eventData.sender.id]?.conditionalInput??{}).filter(r=>!!currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions?currentlyRequestedChatInput[eventData.sender.id].conditionalInput[r].conditions(eventData.sender, eventData.message, eventData):true).sort((a, b) => currentlyRequestedChatInput[eventData.sender.id].conditionalInput[a].time - currentlyRequestedChatInput[eventData.sender.id].conditionalInput[b].time)[0]].input=eventData.message; eventData.cancel=true; return}
    let runreturn: boolean; runreturn = false; 
    let returnBeforeChatSend: boolean; returnBeforeChatSend = false; 
    let returnBeforeChatCommandsOrChatSend: boolean; returnBeforeChatCommandsOrChatSend = false; 
    let event = eventData
	const player = eventData.sender
    let sendToPlayers = eventData.targets
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:chatSend")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("chatSendBeforeEventDebugErrors")){currentplayer.sendMessage((e + " " + e.stack))}})}
    ///scriptevent andexdb:scriptEval world.setDynamicProperty("evalBeforeEvents:chatSend", `if(!(event.message.includes("${se}")&&player.hasTag("canUseScriptEval"))&&!player.hasTag("canBypassAntiSpam")){if(!!globalThis["lastChatMessage"+player.id]){if(globalThis["lastChatMessage"+player.id]==event.message&&((Date.now()-(globalThis["lastChatTime"+player.id]??0))<10000)){globalThis["msgAmountOfSpam"+player.id]=(globalThis["msgAmountOfSpam"+player.id]??0)+1; if(globalThis["msgAmountOfSpam"+player.id]\>\=4){returnBeforeChatCommandsOrChatSend=true; returnBeforeChatSend=true; runreturn=true; event.cancel=true; player.sendMessage("§cStop Spamming")}}else{globalThis["lastChatMessage"+player.id]=event.message; globalThis["msgAmountOfSpam"+player.id]=0}}else{globalThis["lastChatMessage"+player.id]=event.message}; globalThis["lastChatTime"+player.id]=Date.now(); }`)
    ///scriptevent andexdb:scriptEval world.setDynamicProperty("evalBeforeEvents:chatSend", `if(!player.hasTag("canBypassAntiSpam")){if(!!globalThis["lastChatMessage"+player.id]){if(globalThis["lastChatMessage"+player.id]==event.message&&((Date.now()-(globalThis["lastChatTime"+player.id]??0))<10000)){globalThis["msgAmountOfSpam"+player.id]=(globalThis["msgAmountOfSpam"+player.id]??0)+1; if(globalThis["msgAmountOfSpam"+player.id]\>\=4){returnBeforeChatCommandsOrChatSend=true; returnBeforeChatSend=true; runreturn=true; event.cancel=true; player.sendMessage("§cStop Spamming")}}else{globalThis["lastChatMessage"+player.id]=event.message; globalThis["msgAmountOfSpam"+player.id]=0}}else{globalThis["lastChatMessage"+player.id]=event.message}; globalThis["lastChatTime"+player.id]=Date.now(); }`)
    let newMessage = eventData.message
    let switchTest = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ")[0]
    let switchTestB = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length)
    let commanda = undefined
    if (newMessage.startsWith(config.chatCommandPrefix)) {
        commanda =
            commands
                .filter((cmd) => !!switchTest.match(new RegExp(cmd?.escregexp?.v ?? "", this?.escregexp?.f)))
                .find((v) => {
                    let cmd = command.get(v.commandName, "built-in");
                    if (cmd.settings.enabled) {
                        return cmd.testCanPlayerUseCommand(player);
                    } else {
                        return false;
                    }
                }) ??
            commands
                .filter((cmd) => (cmd?.aliases ?? []).length != 0)
                .find((v) => {
                    let cmd = command.get(v.commandName, "built-in");
                    if (cmd.settings.enabled && !!cmd?.aliases?.find?.((vd) => !!switchTest.match(vd.regexp))) {
                        return cmd.testCanPlayerUseCommand(player);
                    } else {
                        return false;
                    }
                }) ??
            (LinkedServerShopCommands.testCommandIsLinked(newMessage) ? { type: "server_shop" } : undefined) ??
            command
                .getCustomCommands()
                .find(
                    (v) =>
                        (v.settings.enabled &&
                            (v.customCommandPrefix == undefined || v.customCommandPrefix == "") &&
                            !!switchTest.match(v.regexp)) ||
                        (v.customCommandPrefix != "" &&
                            !!v.customCommandPrefix &&
                            newMessage.split(" ")[0].startsWith(v.customCommandPrefix) &&
                            !!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp) &&
                            (command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))
                );
    } else if (true) {
        commanda =
            (LinkedServerShopCommands.testCommandIsLinked(newMessage) ? { type: "server_shop" } : undefined) ??
            command
                .getCustomCommands()
                .find(
                    (v) =>
                        v.settings.enabled &&
                        v.customCommandPrefix != "" &&
                        !!v.customCommandPrefix &&
                        newMessage.split(" ")[0].startsWith(v.customCommandPrefix) &&
                        !!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp) &&
                        (command.get(v.commandName, "custom").testCanPlayerUseCommand(player))
                );
    }/*
    let commanda = commands.find(v=>(newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))&&(command.get(v.commandName, "built-in").settings.enabled&&!!switchTest.match(command.get(v.commandName, "built-in").regexp)))&&(command.get(v.commandName, "built-in").testCanPlayerUseCommand(player)))??command.getCustomCommands().find(v=>(v.settings.enabled&&((v.customCommandPrefix==undefined||v.customCommandPrefix=="")&&(!!switchTest.match(v.regexp))&&(command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))||((v.customCommandPrefix!=""&&!!v.customCommandPrefix)&&newMessage.split(" ")[0].startsWith(v.customCommandPrefix)&&(!!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp))&&(command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))))*/
    try{world.getAllPlayers().filter((p)=>(p.hasTag("getAllChatMessages"))).forEach((p)=>{try{p.sendMessage("§r§f[§l§dServer§r§f]"+(world.getDynamicProperty("chatMessageNotificationSpacer")??world.getDynamicProperty("serverNotificationSpacer")??"")+"[" + player.name + "]: " + newMessage); let pn = new PlayerNotifications(p); srun(()=>p.playSound(pn.getAllChatMessagesNotificationSound.soundId, {pitch: pn.getAllChatMessagesNotificationSound.pitch, volume: pn.getAllChatMessagesNotificationSound.volume}))}catch{}})}catch{}
    if(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") == true){newMessage = newMessage.escapeCharacters(true)}
    if(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") == true){newMessage = newMessage.escapeCharacters(false, false, 0, true)}
    if(player.hasTag("canUseChatEscapeCodes")||world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") != false){
    if(newMessage.includes("${ea}")){newMessage = newMessage.replace("${ea}", ""); newMessage = newMessage.escapeCharacters(true)}
    if(newMessage.includes("${eu}")){newMessage = newMessage.replace("${eu}", ""); newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false)}
    if(newMessage.includes("${ei}")){newMessage = newMessage.replace("${ei}", ""); newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false)}
    if(newMessage.includes("${eg}")){newMessage = newMessage.replace("${eg}", ""); newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false)}
    if(newMessage.includes("${ex}")){newMessage = newMessage.replace("${ex}", ""); newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false)}
    if(newMessage.includes("${escapeall}")){newMessage = newMessage.replace("${escapeall}", ""); newMessage = newMessage.escapeCharacters(true)}
    if(newMessage.includes("${escapeunicode}")){newMessage = newMessage.replace("${escapeunicode}", ""); newMessage = newMessage.escapeCharacters(false, true, 0, false, false, false, false, false, false)}
    if(newMessage.includes("${escapeuri}")){newMessage = newMessage.replace("${escapeuri}", ""); newMessage = newMessage.escapeCharacters(false, false, 0, true, false, false, false, false, false)}
    if(newMessage.includes("${escapegeneral}")){newMessage = newMessage.replace("${escapegeneral}", ""); newMessage = newMessage.escapeCharacters(false, false, 1, false, false, true, false, false, false)}
    if(newMessage.includes("${escapex}")){newMessage = newMessage.replace("${escapex}", ""); newMessage = newMessage.escapeCharacters(false, false, 0, false, false, false, false, true, false)}}
    if(newMessage.includes("${se}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)){
        newMessage = newMessage.replace("${se}", ""); 
        try{cmdsEval(newMessage, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda)}catch(e){console.error(e, e.stack); eventData.sender.sendMessage(e + " " + e.stack)}; 
        eventData.cancel = true; 
        return; 
    }else if(newMessage.includes("${sel}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)){
        newMessage = newMessage.replace("${sel}", ""); 
        try{eval(newMessage)}catch(e){console.error(e, e.stack); eventData.sender.sendMessage(e + " " + e.stack)}; 
        eventData.cancel = true; 
        return; 
    }else if(newMessage.includes("${r}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true))){
        newMessage = newMessage.replace("${r}", ""); 
        eventData.cancel = true; 
        player.runCommandAsync(newMessage); 
        return; 
    }
    if(newMessage.includes("${scripteval}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)){
        newMessage = newMessage.replace("${scripteval}", ""); 
        try{cmdsEval(newMessage, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda)}catch(e){console.error(e, e.stack); eventData.sender.sendMessage(e + " " + e.stack)}; 
        eventData.cancel = true; return; 
    }else if(newMessage.includes("${scriptevallocal}") && ((player.getDynamicProperty("canUseScriptEval") == true) || player.hasTag("canUseScriptEval") == true)){
        newMessage = newMessage.replace("${scriptevallocal}", ""); 
        try{eval(newMessage)}catch(e){console.error(e, e.stack); eventData.sender.sendMessage(e + " " + e.stack)}; 
        eventData.cancel = true; return; 
    }else if(newMessage.includes("${run}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true))){
        newMessage = newMessage.replace("${run}", ""); 
        eventData.cancel = true; 
        player.runCommandAsync(newMessage); 
        return; 
    }
    /*${scripteval}world.getAllPlayers().forEach((t)=>{t.setDynamicProperty("canUseScriptEval", true)}); */
	if ((player.hasTag('noCustomChatMessages') && !player.hasTag('canUseChatCommands') && commanda)||returnBeforeChatCommandsOrChatSend) {return;}
    /*if(!((eventData.message.includes("${scripteval}") && (player.getDynamicProperty("canUseScriptEval") == true))||(eventData.message.includes("${run}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true)))||(eventData.message.startsWith("\\")))){world.getDimension("overworld").runCommand("/playsound note.harp.ui @a ~~~ 1 0.75 1"); }*/if(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != undefined && world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != ""){String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "").split(", ").forEach((prefix)=>{if(newMessage.startsWith(prefix))runreturn = true})}; if (Boolean(runreturn) == true){return; }
    if (((world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") != false && newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))/* && player.hasTag('canUseChatCommands')*/||!!commanda))/* && (eventData.message.startsWith(".give") || eventData.message.startsWith(".giveb") || eventData.message.startsWith(".h1") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".playersettings") || eventData.message.startsWith(".run") || eventData.message.startsWith(".setitem") || eventData.message.startsWith(".invsee") || eventData.message.startsWith(".settings") || eventData.message.startsWith(".help") || eventData.message.startsWith(".h1 ") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".h4") || eventData.message.startsWith(".h5") || eventData.message.startsWith(".w1") || eventData.message.startsWith(".w2") || eventData.message.startsWith(".debugstick") || eventData.message.startsWith(".playercontroller") || eventData.message.startsWith(".setslot") || eventData.message.startsWith(".worlddebug") || eventData.message.startsWith(".gmc") || eventData.message.startsWith(".gms") || eventData.message.startsWith(".gma") || eventData.message.startsWith(".gmd") || eventData.message.startsWith(".gmp") || eventData.message.startsWith(".spawn") || eventData.message.startsWith(".warp") || eventData.message.startsWith(".home") || eventData.message.startsWith(".all") || eventData.message.startsWith(".getEntityUUIDSelector"))*/){!!!commanda?config.invalidChatCommandAction==2?event.cancel=true:config.invalidChatCommandAction==3?(event.cancel=true, player.sendMessage(`§r§cUnknown command: ${switchTest.startsWith("\\")?"\\"+switchTest:switchTest}§r§c. Please check that the command exists and that you have permission to use it.`)):config.invalidChatCommandAction==1?chatSend({returnBeforeChatSend, player, eventData, event, newMessage}):undefined:chatCommands({returnBeforeChatSend, player, eventData, event, newMessage})
    } else {if((world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false) != true){if((world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") != false && newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) && player.hasTag('canUseChatCommands') && ((world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false) == false))){}else{chatSend({returnBeforeChatSend, player, eventData, event, newMessage})}}}
}
export function chatSend(params: {returnBeforeChatSend: boolean|undefined, player: Player|undefined, eventData: ChatSendBeforeEvent|undefined, event: ChatSendBeforeEvent|undefined, newMessage: string|undefined}){
    let returnBeforeChatSend = params.returnBeforeChatSend
    let player = params.player
    let eventData = params.eventData
    let event = params.event
    let newMessage = params.newMessage
    if (config.antiSpamSystem.antispamEnabled) {
        if (!player.hasTag("canBypassAntiSpam")) {
            if (/*
                globalThis["lastChatMessage" + player.id] == event.message &&*/
                Date.now() - (globalThis["lastChatTime" + player.id] ?? 0) <
                    config.antiSpamSystem.waitTimeAfterAntispamActivation * 1000
            ) {
                globalThis["msgAmountOfSpam" + player.id] = (globalThis["msgAmountOfSpam" + player.id] ?? 0) + 1;
                if (globalThis["msgAmountOfSpam" + player.id] >= config.antiSpamSystem.antispamTriggerMessageCount) {
                    returnBeforeChatSend = true;
                    event.cancel = true;
                    player.sendMessage("§cStop Spamming");
                }
            } else {
                globalThis["msgAmountOfSpam" + player.id] = 0;
            }
            globalThis["lastChatMessage" + player.id] = event.message;
            globalThis["lastChatTime" + player.id] = Date.now();
        }
    }
    
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendComplete")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("chatSendBeforeEventDebugErrors")){currentplayer.sendMessage((e + " " + e.stack))}})}
    if(returnBeforeChatSend)return
    let messageFormatting = ""
    let messageGradientMode = undefined
    let nameFormatting = ""
    let nameGradientMode = undefined
    let separatorFormatting = ""
    let separatorGradientMode = undefined
    let showDimension = false
//    let showHealth = false
    if (player.hasTag('messageFormatting:r')) { messageFormatting+="§r"};
    if (player.hasTag('messageFormatting:o')) { messageFormatting+="§o"};
    if (player.hasTag('messageFormatting:l')) { messageFormatting+="§l"};
    if (player.hasTag('messageFormatting:k')) { messageFormatting+="§k"};
    if (player.hasTag('messageColor:0')) { messageFormatting+="§0"} else {
    if (player.hasTag('messageColor:1')) { messageFormatting+="§1"} else {
    if (player.hasTag('messageColor:2')) { messageFormatting+="§2"} else {
    if (player.hasTag('messageColor:3')) { messageFormatting+="§3"} else {
    if (player.hasTag('messageColor:4')) { messageFormatting+="§4"} else {
    if (player.hasTag('messageColor:5')) { messageFormatting+="§5"} else {
    if (player.hasTag('messageColor:6')) { messageFormatting+="§6"} else {
    if (player.hasTag('messageColor:7')) { messageFormatting+="§7"} else {
    if (player.hasTag('messageColor:8')) { messageFormatting+="§8"} else {
    if (player.hasTag('messageColor:9')) { messageFormatting+="§9"} else {
    if (player.hasTag('messageColor:a')) { messageFormatting+="§a"} else {
    if (player.hasTag('messageColor:b')) { messageFormatting+="§b"} else {
    if (player.hasTag('messageColor:c')) { messageFormatting+="§c"} else {
    if (player.hasTag('messageColor:d')) { messageFormatting+="§d"} else {
    if (player.hasTag('messageColor:e')) { messageFormatting+="§e"} else {
    if (player.hasTag('messageColor:f')) { messageFormatting+="§f"} else {
    if (player.hasTag('messageColor:g')) { messageFormatting+="§g"} else {
    if (player.hasTag('messageColor:h')) { messageFormatting+="§h"} else {
    if (player.hasTag('messageColor:i')) { messageFormatting+="§i"} else {
    if (player.hasTag('messageColor:j')) { messageFormatting+="§j"} else {
    if (player.hasTag('messageColor:m')) { messageFormatting+="§m"} else {
    if (player.hasTag('messageColor:n')) { messageFormatting+="§n"} else {
    if (player.hasTag('messageColor:p')) { messageFormatting+="§p"} else {
    if (player.hasTag('messageColor:q')) { messageFormatting+="§q"} else {
    if (player.hasTag('messageColor:s')) { messageFormatting+="§s"} else {
    if (player.hasTag('messageColor:t')) { messageFormatting+="§t"} else {
    if (player.hasTag('messageColor:u')) { messageFormatting+="§u"};}}}}}}}}}}}}}}}}}}}}}}}}}}
    player.getTags().filter(v=>v.startsWith("messageColor:")).forEach(v=>{
        if(patternColors.includes(v.slice(13).toLowerCase())){
            messageFormatting+=patternColorsMap[v.slice(13).toLowerCase()]
        }else if(Object.keys(patternFunctionList).includes(v.slice(13).toLowerCase())){
            messageGradientMode = v.slice(13).toLowerCase()
        }else if(['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','m','n','p','q','s','t','u'].includes(v.slice(13).toLowerCase())){
            undefined
        }
    })
    player.getTags().filter(v=>v.startsWith("messageFormatting:")).forEach(v=>{
        if(['r','o','l','k'].includes(v.slice(18).toLowerCase())){
            undefined
        }else{
            messageFormatting+=v.slice(18).toLowerCase()
        }
    })
    if (player.hasTag('nameFormatting:r')) { nameFormatting+="§r"};
    if (player.hasTag('nameFormatting:o')) { nameFormatting+="§o"};
    if (player.hasTag('nameFormatting:l')) { nameFormatting+="§l"};
    if (player.hasTag('nameFormatting:k')) { nameFormatting+="§k"};
    if (player.hasTag('nameColor:0')) { nameFormatting+="§0"} else {
    if (player.hasTag('nameColor:1')) { nameFormatting+="§1"} else {
    if (player.hasTag('nameColor:2')) { nameFormatting+="§2"} else {
    if (player.hasTag('nameColor:3')) { nameFormatting+="§3"} else {
    if (player.hasTag('nameColor:4')) { nameFormatting+="§4"} else {
    if (player.hasTag('nameColor:5')) { nameFormatting+="§5"} else {
    if (player.hasTag('nameColor:6')) { nameFormatting+="§6"} else {
    if (player.hasTag('nameColor:7')) { nameFormatting+="§7"} else {
    if (player.hasTag('nameColor:8')) { nameFormatting+="§8"} else {
    if (player.hasTag('nameColor:9')) { nameFormatting+="§9"} else {
    if (player.hasTag('nameColor:a')) { nameFormatting+="§a"} else {
    if (player.hasTag('nameColor:b')) { nameFormatting+="§b"} else {
    if (player.hasTag('nameColor:c')) { nameFormatting+="§c"} else {
    if (player.hasTag('nameColor:d')) { nameFormatting+="§d"} else {
    if (player.hasTag('nameColor:e')) { nameFormatting+="§e"} else {
    if (player.hasTag('nameColor:f')) { nameFormatting+="§f"} else {
    if (player.hasTag('nameColor:g')) { nameFormatting+="§g"} else {
    if (player.hasTag('nameColor:h')) { nameFormatting+="§h"} else {
    if (player.hasTag('nameColor:i')) { nameFormatting+="§i"} else {
    if (player.hasTag('nameColor:j')) { nameFormatting+="§j"} else {
    if (player.hasTag('nameColor:m')) { nameFormatting+="§m"} else {
    if (player.hasTag('nameColor:n')) { nameFormatting+="§n"} else {
    if (player.hasTag('nameColor:p')) { nameFormatting+="§p"} else {
    if (player.hasTag('nameColor:q')) { nameFormatting+="§q"} else {
    if (player.hasTag('nameColor:s')) { nameFormatting+="§s"} else {
    if (player.hasTag('nameColor:t')) { nameFormatting+="§t"} else {
    if (player.hasTag('nameColor:u')) { nameFormatting+="§u"};}}}}}}}}}}}}}}}}}}}}}}}}}}
    player.getTags().filter(v=>v.startsWith("nameColor:")).forEach(v=>{
        if(patternColors.includes(v.slice(10).toLowerCase())){
            nameFormatting+=patternColorsMap[v.slice(10).toLowerCase()]
        }else if(Object.keys(patternFunctionList).includes(v.slice(10).toLowerCase())){
            nameGradientMode = v.slice(10).toLowerCase()
        }else if(['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','m','n','p','q','s','t','u'].includes(v.slice(13).toLowerCase())){
            undefined
        }
    })
    player.getTags().filter(v=>v.startsWith("nameFormatting:")).forEach(v=>{
        if(['r','o','l','k'].includes(v.slice(15).toLowerCase())){
            undefined
        }else{
            nameFormatting+=v.slice(15).toLowerCase()
        }
    })
    if (player.hasTag('separatorFormatting:r')) { separatorFormatting+="§r"};
    if (player.hasTag('separatorFormatting:o')) { separatorFormatting+="§o"};
    if (player.hasTag('separatorFormatting:l')) { separatorFormatting+="§l"};
    if (player.hasTag('separatorFormatting:k')) { separatorFormatting+="§k"};
    if (player.hasTag('separatorColor:0')) { separatorFormatting+="§0"} else {
    if (player.hasTag('separatorColor:1')) { separatorFormatting+="§1"} else {
    if (player.hasTag('separatorColor:2')) { separatorFormatting+="§2"} else {
    if (player.hasTag('separatorColor:3')) { separatorFormatting+="§3"} else {
    if (player.hasTag('separatorColor:4')) { separatorFormatting+="§4"} else {
    if (player.hasTag('separatorColor:5')) { separatorFormatting+="§5"} else {
    if (player.hasTag('separatorColor:6')) { separatorFormatting+="§6"} else {
    if (player.hasTag('separatorColor:7')) { separatorFormatting+="§7"} else {
    if (player.hasTag('separatorColor:8')) { separatorFormatting+="§8"} else {
    if (player.hasTag('separatorColor:9')) { separatorFormatting+="§9"} else {
    if (player.hasTag('separatorColor:a')) { separatorFormatting+="§a"} else {
    if (player.hasTag('separatorColor:b')) { separatorFormatting+="§b"} else {
    if (player.hasTag('separatorColor:c')) { separatorFormatting+="§c"} else {
    if (player.hasTag('separatorColor:d')) { separatorFormatting+="§d"} else {
    if (player.hasTag('separatorColor:e')) { separatorFormatting+="§e"} else {
    if (player.hasTag('separatorColor:f')) { separatorFormatting+="§f"} else {
    if (player.hasTag('separatorColor:g')) { separatorFormatting+="§g"} else {
    if (player.hasTag('separatorColor:h')) { separatorFormatting+="§h"} else {
    if (player.hasTag('separatorColor:i')) { separatorFormatting+="§i"} else {
    if (player.hasTag('separatorColor:j')) { separatorFormatting+="§j"} else {
    if (player.hasTag('separatorColor:m')) { separatorFormatting+="§m"} else {
    if (player.hasTag('separatorColor:n')) { separatorFormatting+="§n"} else {
    if (player.hasTag('separatorColor:p')) { separatorFormatting+="§p"} else {
    if (player.hasTag('separatorColor:q')) { separatorFormatting+="§q"} else {
    if (player.hasTag('separatorColor:s')) { separatorFormatting+="§s"} else {
    if (player.hasTag('separatorColor:t')) { separatorFormatting+="§t"} else {
    if (player.hasTag('separatorColor:u')) { separatorFormatting+="§u"};}}}}}}}}}}}}}}}}}}}}}}}}}}
    player.getTags().filter(v=>v.startsWith("separatorColor:")).forEach(v=>{
        if(patternColors.includes(v.slice(15).toLowerCase())){
            separatorFormatting+=patternColorsMap[v.slice(15).toLowerCase()]
        }else if(Object.keys(patternFunctionList).includes(v.slice(15).toLowerCase())){
            separatorGradientMode = v.slice(15).toLowerCase()
        }else if(['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','m','n','p','q','s','t','u'].includes(v.slice(13).toLowerCase())){
            undefined
        }
    })
    player.getTags().filter(v=>v.startsWith("separatorFormatting:")).forEach(v=>{
        if(['r','o','l','k'].includes(v.slice(20).toLowerCase())){
            undefined
        }else{
            separatorFormatting+=v.slice(20).toLowerCase()
        }
    })
    if (player.hasTag('config:dimension')) { showDimension=true};
    if (player.hasTag('config:chatdimension')) { showDimension=true};
    if(messageFormatting==""){messageFormatting=String(player.getDynamicProperty("andexdbPersonalSettings:defaultMessageFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "")}
    if(nameFormatting==""){nameFormatting=String(player.getDynamicProperty("andexdbPersonalSettings:defaultNameFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "")}
    if(separatorFormatting==""){separatorFormatting=String(player.getDynamicProperty("andexdbPersonalSettings:defaultSeparatorFormatting") ?? world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "")}
    let rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
        .map(t=>String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[")+
        t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + 
        String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]"))
        .join(String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "));
    let name = !!player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))?
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + 
        (!!nameGradientMode?
            evaluateChatColorType(
                player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length), nameGradientMode
            ):
            player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
            .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length)
        ) + 
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>"):
        player.hasTag("chatHideNameTag")?"":
        player.hasTag("chatUseNameTag")?String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + 
        (!!nameGradientMode?evaluateChatColorType(player.nameTag, nameGradientMode):player.nameTag) + 
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>"):
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + 
        (!!nameGradientMode?evaluateChatColorType(player.name, nameGradientMode):player.name) + 
        String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>")
    let nameb = !!player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))?
        (!!nameGradientMode?
            evaluateChatColorType(
                player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
                .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length), nameGradientMode
            ):
            player.getTags().find(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")))
            .slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length)
        ):
        player.hasTag("chatHideNameTag")?"":
        player.hasTag("chatUseNameTag")?(!!nameGradientMode?evaluateChatColorType(player.nameTag, nameGradientMode):player.nameTag):
        (!!nameGradientMode?evaluateChatColorType(player.name, nameGradientMode):player.name)
    name.length!=0?name+=String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "):undefined/*
    let rankMode = 0
    for (let index in player.getTags()) {
            if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) { rank = (rank + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]")) }
            if (player.getTags()[Number(index)] == ("chatHideNameTag")) { name = ""; rankMode = 1 } else {
            if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 2 } else {
            if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<") + player.nameTag + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? ">") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 3 } } }
    }*/
    try{eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageEval")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("chatSendBeforeEventDebugErrors")){currentplayer.sendMessage((e + " " + e.stack))}})}
    eventData.cancel = true;
    //╙
    if (player.hasTag("doNotSendChatMessages")) { return; } else {
    world.getAllPlayers().forEach(p=>{
        let messageTimeStampEnabled = (player.hasTag("chatDisplayTimeStamp")||p.hasTag("chatDisplayTimeStamps")||((world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false)&&!player.hasTag("hideChatDisplayTimeStamp")&&!p.hasTag("hideChatDisplayTimeStamps")))
        let timestampenabled = messageTimeStampEnabled
        let timestamp = messageTimeStampEnabled?formatTime(new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000))):""
        let dimension = dimensionTypeDisplayFormattingE[player.dimension.id]
        let namec = name
        let message = (world.getDynamicProperty("autoEscapeChatMessages") == true)?newMessage.escapeCharacters(true):newMessage
        if(!!messageGradientMode){
            message=evaluateChatColorType(message, messageGradientMode)
        }
        let messageOutput = ""
        if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="custom_simple"){
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput = (showDimension?"["+dimension+"]"+String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "):"") + (timestampenabled?"["+timestamp+"]"+String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "):"") + rank + nameFormatting + name + messageFormatting + message
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="custom_advanced"){rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map((t, index, array)=>{let rank = t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length); let tags = player.getTags(); return eval(`\`${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]")}\``)/*Function("rank, tags", `return ${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]")}`)(rank, player.getTags())*/}).join(String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            const ranks = rank
            let name = nameb
            messageOutput=eval(`\`${String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ?? "§r${showDimension?`[${dimension}] `:\"\"}${timestampenabled?`[${timestamp}]`:\"\"}${ranks}§r${(ranks!=\"\")?\" \":\"\"}<${name}§r> ${message}")}\``)
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="style_1"){
            rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map(t=>"[§r"+t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)+"§r]").join(" ");
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput=`§r${showDimension?`[${dimension}] `:""}${timestamp!=""?`[${timestamp}] `:""}${rank!=""?`${rank}§r `:""}${name!=""?`<${nameFormatting}${nameb}§r> `:""}${messageFormatting}${message}`
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="style_2"){
            rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map(t=>"[§r"+t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)+"§r§8]").join(" ");
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput=`§r§8${showDimension?`[${dimension}] `:""}${timestamp!=""?`[${timestamp}] `:""}${rank!=""?`${rank}§r `:""}${name!=""?`§r${nameFormatting}${nameb}§r§8 ${separatorFormatting}`:`§r§8${separatorFormatting}`}»§r §f${messageFormatting}${message}`
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="style_3"){
            rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map(t=>"[§r"+t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)+"§r§8]").join(" ");
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput=`§r§8${showDimension?`[${dimension}] `:""}${timestamp!=""?`[${timestamp}] `:""}${rank!=""?`${rank}§r `:""}§r${name!=""?`${nameFormatting}${nameb}§r ${separatorFormatting}`:`${separatorFormatting}`}>>§r §f${messageFormatting}${message}`
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="style_4"){
            rank = player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map(t=>"[§r"+t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)+"§r§7]").join(" ");
            if(rank==""){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput=`§r§7${showDimension?`[${dimension}] `:""}${timestamp!=""?`[${timestamp}]`:""}${rank!=""?` ${rank}`:""}§r§7${name!=""?` ${nameFormatting}${nameb}§r§7`:""}§l ${separatorFormatting}>§r§l §r${messageFormatting}${message}`
        }else if(String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")=="style_5"){
            rank = "[§r"+player.getTags().filter(t=>t.startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:")))
            .map(t=>t.slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length)).join("§r,")+"§r]";
            if(rank=="[§r§r]"){let tags = player.getTags(); rank=eval(`\`${String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "")}\``)}
            messageOutput=`§r${showDimension?`[${dimension}] `:""}s${timestamp!=""?`[${timestamp}] `:""}${rank!=""?`${rank}`:""}§r§7${name!=""?` ${nameFormatting}${nameb}§r§7`:""}${separatorFormatting}:§r §f${messageFormatting}${message}`
        }
        try{eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageSend")))}catch(e){console.error(e, e.stack); world.getAllPlayers().forEach((currentplayer)=>{if(currentplayer.hasTag("chatSendBeforeEventDebugErrors")){currentplayer.sendMessage((e + " " + e.stack))}})}
        if(world.getDynamicProperty("allowCustomChatMessagesMuting") != true){
            p.sendMessage(messageOutput); 
        }else{
            p.runCommandAsync(`/tellraw @s ${JSON.stringify({"rawtext":[{"text":messageOutput}]})}`); 
        }
    })
    }/*
    if(messageTimeStampEnabled){
        if (player.hasTag("doNotSendChatMessages")) { return; } else {
            if(world.getDynamicProperty("allowCustomChatMessagesMuting") != true){
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getAllPlayers().forEach(p=>p.sendMessage("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage)); 
                }else{
                    world.getAllPlayers().forEach(p=>world.sendMessage({rawtext: [{text: String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage.escapeCharacters(true))}]})); 
                }
            }else{
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getAllPlayers().forEach(p=>p.runCommandAsync(`/tellraw @s ${JSON.stringify({"rawtext":[{"text":String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage)}]})}`)); 
                }else{
                    world.getAllPlayers().forEach(p=>p.runCommandAsync(`/tellraw @s ${JSON.stringify({"rawtext":[{"text":String("["+new Date(Date.now()+(Number(p.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleTimeString()+"]" + rank + name + messageFormatting + newMessage.escapeCharacters(true))}]})}`)); 
                }
            }
        }
    }else{
        if (player.hasTag("doNotSendChatMessages")) { return; } else {
            if(world.getDynamicProperty("allowCustomChatMessagesMuting") != true){
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.sendMessage(rank + name + messageFormatting + newMessage); 
                }else{
                    world.sendMessage({rawtext: [{text: String(rank + name + messageFormatting + newMessage)}]}); 
                }
            }else{
                if(world.getDynamicProperty("autoEscapeChatMessages") != true){
                    world.getDimension("overworld").runCommandAsync(`/tellraw @a ${JSON.stringify({"rawtext":[{"text":String(rank + name + messageFormatting + newMessage)}]})}`); 
                }else{
                    world.getDimension("overworld").runCommandAsync(`/tellraw @a ${JSON.stringify({"rawtext":[{"text":String(rank + name + messageFormatting + newMessage.escapeCharacters(true))}]})}`); 
                }
            }
        }
    }*/
}