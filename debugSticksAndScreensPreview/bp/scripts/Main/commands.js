import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world } from "@minecraft/server";
import { targetSelectorB, targetSelectorAllListB, targetSelectorAllListC, targetSelectorAllListE, targetSelector, getTopSolidBlock, arrayModifier, arrayToElementList, getAIIDClasses, getArrayElementProperty, debugAction, generateAIID, targetSelectorAllListD, toBase, fromBaseToBase, interactable_block, interactable_blockb, combineObjects, customFormUIElement, getCUIDClasses, strToCustomFormUIElement, generateCUID, fixedPositionNumberObject, format_version, getUICustomForm, generateTUID, JSONParse, JSONStringify, roundPlaceNumberObject, worldPlayers, timeZones, getParametersFromString, arrayModifierOld, customModulo, escapeRegExp, extractJSONStrings, getParametersFromExtractedJSON, jsonFromString, JSONParseOld, JSONStringifyOld, arrayify, objectify, stringify, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal } from "./ui.js";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "../Main";
import * as coords from "./coordinates";
import * as cmds from "./commands";
import * as bans from "./ban";
import * as uis from "./ui";
import * as playersave from "./player_save";
import * as spawnprot from "./spawn_protection";
export const cmdsmetaimport = import.meta;
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
export const commands_format_version = "2.0.0-rc.1";
export const commands = [
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "give", escregexp: { v: "^give$" }, formats: [{ format: "give <item: itemType> <amount: int>" }], command_version: "1.0.0", description: "This command can give you items of any type, even ones that normally require an nbt editor to obtain. ", commandSettingsId: "built-inCommandSettings:give" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "giveb", escregexp: { v: "^giveb$" }, formats: [{ format: "giveb <item: itemType> <amount: int>" }], command_version: "1.0.0", description: "This command can give you items of any type, even ones that normally require an nbt editor to obtain, with any stack size up to 127, in your next unoccupied inventory slot. ", commandSettingsId: "built-inCommandSettings:giveb" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "setitem", escregexp: { v: "^setitem$" }, formats: [{ format: "setitem <item: itemType> <amount: int> <slot: int>" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:setitem" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "item", escregexp: { v: "^item$" }, formats: [{ format: "item lore <loreArray: escapableStringJSON>" }, { format: "item lorene <loreArray: JSON>" }, { format: "item name <name: escapableString>" }, { format: "item count <itemCount: int>" }, { format: "item amount <itemAmount: int>" }, { format: "§citem preoperty..." }, { format: ["item slot <inventorySlotNumber: int> lore <loreArray: escapableStringJSON>", "item slot <inventorySlotNumber: int> lorene <loreArray: JSON>", "item slot <inventorySlotNumber: int> name <name: escapableString>"] }, { format: "§citem components..." }], command_version: "1.5.1", description: "", commandSettingsId: "built-inCommandSettings:item" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "invsee", escregexp: { v: "^invsee$" }, formats: [{ format: "invsee <target: targetSelector>" }], command_version: "1.4.0", description: "", commandSettingsId: "built-inCommandSettings:invsee" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "offlineinfo", escregexp: { v: "^offlineinfo$" }, formats: [{ format: "" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:offlineinfo" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "offlineuuidinfo", escregexp: { v: "^offlineuuidinfo$" }, formats: [{ format: "" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:offlineuuidinfo" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "offlineinvsee", escregexp: { v: "^offlineinvsee$" }, formats: [{ format: "" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:offlineinvsee" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "offlineuuidinvsee", escregexp: { v: "^offlineuuidinvsee$" }, formats: [{ format: "" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:offlineuuidinvsee" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "binvsee", escregexp: { v: "^binvsee$" }, formats: [{ format: "" }], command_version: "1.2.0", description: "", commandSettingsId: "built-inCommandSettings:binvsee" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "einvsee", escregexp: { v: "^einvsee$" }, formats: [{ format: "" }], command_version: "1.2.0", description: "", commandSettingsId: "built-inCommandSettings:einvsee" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "invseeuuidmode", escregexp: { v: "^invseeuuidmode$" }, formats: [{ format: "" }], command_version: "1.2.0", description: "", commandSettingsId: "built-inCommandSettings:invseeuuidmode" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "h#", escregexp: { v: "^h(\\d*)$" }, formats: [{ format: "h<presenId: float> <containerRow: float>" }], command_version: "1.0.0-beta.10", description: "", commandSettingsId: "built-inCommandSettings:h#" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "hset", escregexp: { v: "^hset$" }, formats: [{ format: "hset <presetId: float> [dimensionId: string] [x: float] [y: float] [z: float]" }], command_version: "1.0.0-beta.10", description: "", commandSettingsId: "built-inCommandSettings:hset" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gmc", escregexp: { v: "^gmc$" }, formats: [{ format: "gmc" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gmc" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gms", escregexp: { v: "^gms$" }, formats: [{ format: "gms" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gms" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gma", escregexp: { v: "^gma$" }, formats: [{ format: "gma" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gma" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gmd", escregexp: { v: "^gmd$" }, formats: [{ format: "gmd" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gmd" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gmp", escregexp: { v: "^gmp$" }, formats: [{ format: "gmp" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gmp" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "gmr", escregexp: { v: "^gmr$" }, formats: [{ format: "gmr" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:gmr" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "getuuid", escregexp: { v: "^getuuid$" }, formats: [{ format: "getuuid <targetSelector: targetSelector>" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:getuuid" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warpset", escregexp: { v: "^warpset$" }, formats: [{ format: "warpset <dimension: dimension|~> <x: float|~> <y: float|~> <z: float|~> <name: escapableString>" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:warpset" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warp", escregexp: { v: "^warp$" }, formats: [{ format: "warp <warpName: escapableString>" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:warp" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warpremove", escregexp: { v: "^warpremove$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:warpremove" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warpreset", escregexp: { v: "^warpreset$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:warpreset" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warplist", escregexp: { v: "^warplist$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:warplist" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warplistdetails", escregexp: { v: "^warplistdetails$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:warplistdetails" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "warplistrawdata", escregexp: { v: "^warplistrawdata$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:warplistrawdata" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "run", escregexp: { v: "^run$" }, formats: [{ format: "run <tickDelay: int>=1> <command: command>" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:run" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "eval", escregexp: { v: "^eval$" }, formats: [{ format: "eval <script: JavaScript>" }], command_version: "1.1.0", description: "", commandSettingsId: "built-inCommandSettings:eval" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "top", escregexp: { v: "^top$" }, formats: [{ format: "top" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:top" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "up", escregexp: { v: "^up$" }, formats: [{ format: "up [placeGlass: boolean]" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:up" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "printlayers", escregexp: { v: "^printlayers$" }, formats: [{ format: "printlayers" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:printlayers" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "managescriptautoeval", escregexp: { v: "^managescriptautoeval$" }, formats: [{ format: "managescriptautoeval" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:managescriptautoeval" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "mainmenu", escregexp: { v: "^mainmenu$" }, formats: [{ format: "mainmenu" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:mainmenu" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "settings", escregexp: { v: "^settings$" }, formats: [{ format: "settings" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:settings" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "datapickblock", escregexp: { v: "^datapickblock$" }, formats: [{ format: "" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:datapickblock" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "fill", escregexp: { v: "^fill$" }, formats: [{ format: "fill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> [replaceTileName: Block] [replaceBlockStates: block states]" }, { format: "fill <from: x y z> <to: x y z> <tileName: Block> [replaceTileName: Block] [replaceBlockStates: block states]" }], command_version: "1.0.0-beta.27", description: "Better version fo the vanilla /fill command that can fill secret blocks types that normally require an nbt editor to obtain. ", commandSettingsId: "built-inCommandSettings:fill" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "ifill", escregexp: { v: "^ifill$" }, formats: [{ format: "fill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> [replaceTileName: Block] [replaceBlockStates: block states]" }, { format: "fill <from: x y z> <to: x y z> <tileName: Block> [replaceTileName: Block] [replaceBlockStates: block states]" }], command_version: "1.0.0-beta.27", description: "Better version fo the vanilla /fill command that can fill secret blocks types that normally require an nbt editor to obtain, and has no fill size limits. ", commandSettingsId: "built-inCommandSettings:ifill" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "morph", escregexp: { v: "^morph$" }, formats: [{ format: "" }], command_version: "1.0.1", description: "", commandSettingsId: "built-inCommandSettings:morph" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "tint", escregexp: { v: "^tint$" }, formats: [{ format: "tint [red: float|~] [green: float|~] [blue: float|~] [alpha: float|~] [materialType: 0|1]" }], command_version: "1.0.4", description: "", commandSettingsId: "built-inCommandSettings:tint" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "scale", escregexp: { v: "^scale$" }, formats: [{ format: "" }], command_version: "1.0.1", description: "", commandSettingsId: "built-inCommandSettings:scale" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "visualscale", escregexp: { v: "^visualscale$" }, formats: [{ format: "" }], command_version: "1.0.0-beta", description: "", commandSettingsId: "built-inCommandSettings:visualscale" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "visualscaleenabled", escregexp: { v: "^visualscaleenabled$" }, formats: [{ format: "" }], command_version: "1.0.0-beta", description: "", commandSettingsId: "built-inCommandSettings:visualscaleenabled" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§6", commandName: "tps", escregexp: { v: "^tps$" }, formats: [{ format: "tps" }], command_version: "1.0.0", description: "", commandSettingsId: "built-inCommandSettings:tps" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineinforaw", escregexp: { v: "^offlineinforaw$" }, formats: [{ format: "" }], command_version: "0.0.1-alpha.2", description: "", commandSettingsId: "built-inCommandSettings:offlineinforaw" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineuuidinforaw", escregexp: { v: "^offlineuuidinforaw$" }, formats: [{ format: "" }], command_version: "0.0.1-alpha.2", description: "", commandSettingsId: "built-inCommandSettings:offlineuuidinforaw" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineinfourl", escregexp: { v: "^offlineinfourl$" }, formats: [{ format: "" }], command_version: "0.0.1-alph.2a", description: "", commandSettingsId: "built-inCommandSettings:offlineinfourl" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineuuidinfourl", escregexp: { v: "^offlineuuidinfourl$" }, formats: [{ format: "" }], command_version: "0.0.1-alpha.2", description: "", commandSettingsId: "built-inCommandSettings:offlineuuidinfourl" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineinfoescaped", escregexp: { v: "^offlineinfoescaped$" }, formats: [{ format: "" }], command_version: "0.0.1-alpha.2", description: "", commandSettingsId: "built-inCommandSettings:offlineinfoescaped" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§c", commandName: "offlineuuidinfoescaped", escregexp: { v: "^offlineuuidinfoescaped$" }, formats: [{ format: "" }], command_version: "0.0.1-alpha.2", description: "", commandSettingsId: "built-inCommandSettings:offlineuuidinfoescaped" },
    { type: "built-in", requiredTags: ["canUseChatCommands"], formatting_code: "§r§f", commandName: "help", escregexp: { v: "^help$" }, formats: [{ format: "help" }, { format: "help chatcommands", description: "lists the available chat commands and their main formats" }, { format: "help javascriptfunctions", description: "lists all available javascript functions, constants, variables, and classes" }, { format: "help jsfunction <jsObjectId: string>", description: "gets the source code of a specific javascript function, constant, variable, or class" }], command_version: "1.5.2", description: "", commandSettingsId: "built-inCommandSettings:help" }
]; /*
export let abcdefgh = escapeRegExp.arguments*/
export class command {
    constructor(command) {
        this.format_version = format_version;
        this.commands_format_version = commands_format_version;
        this.formatting_code = "§r§f";
        this.type = command.type ?? "unknown";
        let commandtest = undefined;
        try {
            commandtest = (command.type == "built-in" ? commands.find(v => v.commandName == command.commandName) : (command.type == "custom" ? JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find(v => v == "customCommand:" + command.commandName)) ?? "undefined")) : ((commands.find(v => v.commandName == command.commandName) ?? JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find(v => v == "customCommand:" + command.commandName)) ?? "undefined"))))));
        }
        catch { }
        ;
        this.description = command.description ?? commandtest?.description;
        this.commandName = command.commandName;
        this.command_version = command.command_version ?? commandtest?.command_version;
        this.escregexp = command.escregexp ?? commandtest?.escregexp ?? { v: "^" + command.commandName + "$" };
        this.formats = command.formats ?? commandtest?.formats; /*
        this.parameters = command.parameters; */
        this.format_version = command.format_version ?? commandtest?.format_version ?? format_version;
        this.commands_format_version = command.commands_format_version ?? commandtest?.commands_format_version ?? commands_format_version;
        this.commandSettingsId = command.commandSettingsId ?? commandtest?.commandSettingsId ?? (command.type == "built-in" ? ("built-inCommandSettings:" + command.commandName) : ("customCommandSettings:" + command.commandName));
        this.customCommandId = command.customCommandId ?? (this.type == "custom" ? ("customCommand:" + command.commandName) : undefined);
        this.formatting_code = command.formatting_code ?? commandtest?.formatting_code ?? "§r§f";
        this.customCommandType = command.customCommandType ?? commandtest?.customCommandType;
        this.customCommandPrefix = command.customCommandPrefix ?? commandtest?.customCommandPrefix;
        this.customCommandParametersEnabled = command.customCommandParametersEnabled ?? commandtest?.customCommandParametersEnabled;
        this.customCommandParametersList = command.customCommandParametersList ?? commandtest?.customCommandParametersList;
        this.customCommandCodeLines = command.customCommandCodeLines ?? commandtest?.customCommandCodeLines;
    }
    get regexp() { return new RegExp(this?.escregexp?.v ?? "", this?.escregexp?.f); }
    get settings() { return new commandSettings(this.commandSettingsId, this); }
    get code() { if (this.type == "custom") {
        if (this?.customCommandId != undefined) {
            return world.getDynamicPropertyIds().filter(v => v.startsWith("customCommandCode:" + this.commandName + ":")).sort((a, b) => Number(a?.split(":")?.slice(-1)[0]) - Number(b?.split(":")?.slice(-1)[0])).map(v => String(world.getDynamicProperty(v)));
        }
        else {
            throw new TypeError("Cannot get the code of the command because the customCommandId is undefined. ");
        }
    }
    else {
        throw new TypeError("Cannot get the code of the command because it is not a custom command or the type of the command is unknown. ");
    } } /*
    get testPlayerCanUse(){return Number(this.unbanDate)-Date.now()}
    get timeRemaining(){let time = new Date(Math.abs((Number(this.unbanDate)-Date.now()))+(new Date().setUTCFullYear(0))); let timeList = {days: (-1*Number(this.isExpired)+1)*Math.floor((time.getTime()-(new Date().setUTCFullYear(0)))/86400000), hours: (-1*Number(this.isExpired)+1)*time.getHours(), minutes: (-1*Number(this.isExpired)+1)*time.getMinutes(), seconds: (-1*Number(this.isExpired)+1)*time.getSeconds(), milliseconds: (-1*Number(this.isExpired)+1)*time.getMilliseconds()}; return timeList}*/
    save() { if (this.type == "custom") {
        if (this?.customCommandId != undefined) {
            world.setDynamicProperty(this?.customCommandId, JSON.stringify(this));
            return this?.customCommandId;
        }
        else {
            throw new TypeError("Cannot save command because the customCommandId is undefined. ");
        }
    }
    else {
        throw new TypeError("Cannot save command because it is not a custom command or the type of the command is unknown. ");
    } }
    remove() { if (this.type == "custom") {
        if (this?.customCommandId != undefined) {
            world.setDynamicProperty(this?.customCommandId);
        }
        else {
            throw new TypeError("Cannot remove command because the customCommandId is undefined. ");
        }
    }
    else {
        throw new TypeError("Cannot remove command because it is not a custom command or the type of the command is unknown. ");
    } }
    testCanPlayerUseCommand(player) { return (this.settings.requiredTags.map(v => player.hasTag(v)).every(v => v) && (this.settings.requiresOp ? Number(player.isOp()) : true) && ((Number(player.getDynamicProperty("permissionLevel") ?? 0) >= Number(this.settings.requiredPermissionLevel ?? 0)) || (this.settings.requiredPermissionLevel == 0))); }
    run(commandstring, executor, player, event) { if (this.type == "custom") {
        if (this?.code != undefined) {
            let eventData = event;
            let params = [];
            let evaluatedParameters = {};
            if (this.customCommandParametersEnabled) {
                evaluatedParameters = evaluateParameters(commandstring, (this.customCommandParametersList ?? ["presetText"]).map(v => ({ type: v })));
                params = evaluatedParameters.args;
            }
            ;
            if (this.customCommandType == "commands") {
                this.code.forEach(v => { if (v != "" && !!v) {
                    executor.runCommand(eval("`" + String.raw `${v}` + "`"));
                } });
            }
            else {
                "`" + this.code.map(v => String.raw `${v}`).join("\n") + "`";
            }
        }
        else {
            throw new TypeError("Cannot run command because the customCommandId is undefined. ");
        }
    }
    else {
        throw new TypeError("Cannot run command because it is not a custom command or the type of the command is unknown. ");
    } } /*
    static getBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?(s.startsWith("ban:")||s.startsWith("banId:")):(banType=="name"?s.startsWith("ban:"):banType=="id"?s.startsWith("banId:"):undefined)))}
    static getValidBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isValid:false)||(s.startsWith("banId:")?ban.getBan(s).isValid:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isValid:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isValid:false):undefined)))}
    static getExpiredBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isExpired:false)||(s.startsWith("banId:")?ban.getBan(s).isExpired:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isExpired:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isExpired:false):undefined)))}*/ /*
saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/ /*
    static saveBan(ban: {type: "name"|"id", unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number, banId?: string}|ban){ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true; ban.format_version = ban.format_version ?? format_version; ban.ban_format_version = ban.ban_format_version ?? ban_format_version; if(ban.type=="name"){world.setDynamicProperty(ban.banId??`ban:${ban.banDate}:${ban.playerName}`, JSON.stringify(ban))}else{if(ban.type=="id"){world.setDynamicProperty(ban.banId??`idBan:${ban.banDate}:${ban.playerId}`, JSON.stringify(ban))}else{}}}*/ /*
    getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
    static get(commandName, type = "built-in") { try {
        if (type == "built-in") {
            return new command({ type: type, commandName: commandName });
        }
        else {
            if (type == "custom") {
                return new command({ type: type, commandName: commandName });
            }
            else {
                return new command({ type: type, commandName: commandName });
            }
        }
    }
    catch (e) {
        console.error(e, e.stack);
    } }
    static getDefaultCommands() { try {
        return commands.map((v) => new command({ type: "built-in", commandName: v.commandName }));
    }
    catch (e) {
        console.error(e, e.stack);
    } }
    static getCustomCommands() { try {
        return world.getDynamicPropertyIds().filter(v => v.startsWith("customCommand:")).map((v) => new command({ type: "custom", commandName: v.slice(14) }));
    }
    catch (e) {
        console.error(e, e.stack);
    } } /*
    static getBans(){let bans: ban[]; bans = []; ban.getBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
    static getValidBans(){let bans: ban[]; bans = []; ban.getValidBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
    static getExpiredBans(){let bans: ban[]; bans = []; ban.getExpiredBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
    static testForBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:(ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false)}
    static testForNameBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false}
    static testForIdBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:false}
    static executeOnBannedPlayers(callbackfn: (player: Player, index: Number, array: any[])=>unknown){let feedback: any[]; feedback = []; world.getAllPlayers().filter((p)=>ban.testForBannedPlayer(p)).forEach((p, i, a)=>{try{feedback.push(callbackfn(p, i, a))}catch(e){feedback.push(e)}}); return feedback}*/
}
export const command_settings_format_version = "1.0.0-alpha.1";
export class commandSettings {
    constructor(commandSettingsId, command) {
        this.type = commandSettingsId.startsWith("built-inCommandSettings:") ? "built-in" : commandSettingsId.startsWith("customCommandSettings:") ? "custom" : "unknown";
        this.commandName = commandSettingsId.startsWith("built-inCommandSettings:") ? commandSettingsId.slice(24) : commandSettingsId.startsWith("customCommandSettings:") ? commandSettingsId.slice(22) : commandSettingsId;
        this.commandSettingsId = commandSettingsId;
        this.customCommandId = (this.type == "custom") ? command?.customCommandId ?? ("customCommand:" + this.commandName) : undefined;
        this.command = command;
        this.defaultSettings = (this.type == "built-in" || this.type == "unknown") ? commands.find(v => v.commandName == this.commandName) : undefined;
    }
    get parsed() { return JSONParse(String(world.getDynamicProperty(this.commandSettingsId))); }
    get enabled() { return this?.parsed?.enabled ?? true; }
    set enabled(enabled) { this.enabled = enabled; }
    get requiredTags() { return this?.parsed?.requiredTags ?? []; }
    set requiredTags(requiredTags) { this.requiredTags = requiredTags; }
    get requiredPermissionLevel() { return this?.parsed?.requiredPermissionLevel ?? 0; }
    set requiredPermissionLevel(requiredPermissionLevel) { this.requiredPermissionLevel = requiredPermissionLevel; }
    get requiresOp() { return this?.parsed?.requiresOp ?? false; }
    set requiresOp(requiresOp) { this.requiresOp = requiresOp; } /*
    get description(){return this?.parsed?.description ?? true}*/
    get settings_version() { return this?.parsed?.settings_version ?? command_settings_format_version; }
    get isSaved() { return world.getDynamicProperty(this.commandSettingsId) != undefined; }
    toJSON() { return Object.assign(this.defaultSettings ?? {}, { type: this.type, commandName: this.commandName, customCommandId: this.customCommandId, commandSettingsId: this.commandSettingsId, enabled: this.enabled, requiredTags: this.requiredTags, requiredPermissionLevel: this.requiredPermissionLevel, requiresOp: this.requiresOp, settings_version: this.settings_version }); }
    save(settings) { world.setDynamicProperty(this.commandSettingsId, JSONStringify(Object.assign(this.defaultSettings ?? { type: this.type, commandName: this.commandName, customCommandId: this.customCommandId, commandSettingsId: this.commandSettingsId, enabled: this.enabled, requiredTags: this.requiredTags, requiredPermissionLevel: this.requiredPermissionLevel, requiresOp: this.requiresOp, settings_version: this.settings_version }, settings ?? {}))); }
    remove() { world.setDynamicProperty(this.commandSettingsId); }
}
export function send(message) { world.sendMessage(message); }
;
export function chatMessage(eventData) {
    let runreturn;
    runreturn = false;
    let returnBeforeChatSend;
    returnBeforeChatSend = false;
    let returnBeforeChatCommandsOrChatSend;
    returnBeforeChatCommandsOrChatSend = false;
    let event = eventData;
    const player = eventData.sender;
    let sendToPlayers = eventData.targets;
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
    let switchTest = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ")[0];
    let switchTestB = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length);
    let commanda = commands.find(v => (newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) && (command.get(v.commandName, "built-in").settings.enabled && !!switchTest.match(command.get(v.commandName, "built-in").regexp))) && (command.get(v.commandName, "built-in").testCanPlayerUseCommand(player))) ?? command.getCustomCommands().find(v => (v.settings.enabled && ((v.customCommandPrefix == undefined || v.customCommandPrefix == "") && (!!switchTest.match(v.regexp))) || ((v.customCommandPrefix != "" && !!v.customCommandPrefix) && newMessage.split(" ")[0].startsWith(v.customCommandPrefix) && (!!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp)) && (command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))));
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
            eventData.cancel = true;
            player.runCommandAsync(newMessage);
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
            eventData.cancel = true;
            player.runCommandAsync(newMessage);
            return;
        }
    }
    /*${scripteval}world.getAllPlayers().forEach((t)=>{t.setDynamicProperty("canUseScriptEval", true)}); */
    if ((player.hasTag('noCustomChatMessages') && !player.hasTag('canUseChatCommands')) || returnBeforeChatCommandsOrChatSend) {
        return;
    }
    /*if(!((eventData.message.includes("${scripteval}") && (player.getDynamicProperty("canUseScriptEval") == true))||(eventData.message.includes("${run}") && ((player.isOp() == true)||(player.getDynamicProperty("canUseCommands") == true)))||(eventData.message.startsWith("\\")))){world.getDimension("overworld").runCommand("/playsound note.harp.ui @a ~~~ 1 0.75 1"); }*/ if (world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != undefined && world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") != "") {
        String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "").split(", ").forEach((prefix) => { if (newMessage.startsWith(prefix))
            runreturn = true; });
    }
    ;
    if (Boolean(runreturn) == true) {
        return;
    }
    if (((world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") != false && newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) && player.hasTag('canUseChatCommands') || !!commanda)) /* && (eventData.message.startsWith(".give") || eventData.message.startsWith(".giveb") || eventData.message.startsWith(".h1") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".playersettings") || eventData.message.startsWith(".run") || eventData.message.startsWith(".setitem") || eventData.message.startsWith(".invsee") || eventData.message.startsWith(".settings") || eventData.message.startsWith(".help") || eventData.message.startsWith(".h1 ") || eventData.message.startsWith(".h2") || eventData.message.startsWith(".h3") || eventData.message.startsWith(".h4") || eventData.message.startsWith(".h5") || eventData.message.startsWith(".w1") || eventData.message.startsWith(".w2") || eventData.message.startsWith(".debugstick") || eventData.message.startsWith(".playercontroller") || eventData.message.startsWith(".setslot") || eventData.message.startsWith(".worlddebug") || eventData.message.startsWith(".gmc") || eventData.message.startsWith(".gms") || eventData.message.startsWith(".gma") || eventData.message.startsWith(".gmd") || eventData.message.startsWith(".gmp") || eventData.message.startsWith(".spawn") || eventData.message.startsWith(".warp") || eventData.message.startsWith(".home") || eventData.message.startsWith(".all") || eventData.message.startsWith(".getEntityUUIDSelector"))*/) {
        chatCommands({ returnBeforeChatSend, player, eventData, event, newMessage });
    }
    else {
        if (world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") != true) {
            chatSend({ returnBeforeChatSend, player, eventData, event, newMessage });
        }
    }
}
export function chatCommands(params) {
    let returnBeforeChatSend = params.returnBeforeChatSend ?? false;
    let player = params.player ?? params.eventData?.sender ?? params.event?.sender;
    let eventData = params.eventData ?? params.event;
    let event = params.event ?? params.eventData;
    let newMessage = params.newMessage ?? params.eventData?.message ?? params.event?.message;
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
    let commanda = commands.find(v => (newMessage.startsWith(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")) && (command.get(v.commandName, "built-in").settings.enabled && !!switchTest.match(command.get(v.commandName, "built-in").regexp))) && (command.get(v.commandName, "built-in").testCanPlayerUseCommand(player))) ?? command.getCustomCommands().find(v => (v.settings.enabled && ((v.customCommandPrefix == undefined || v.customCommandPrefix == "") && (!!switchTest.match(v.regexp))) || ((v.customCommandPrefix != "" && !!v.customCommandPrefix) && newMessage.split(" ")[0].startsWith(v.customCommandPrefix) && (!!newMessage.split(" ")[0].slice(v.customCommandPrefix.length).match(v.regexp)) && (command.get(v.commandName, "custom").testCanPlayerUseCommand(player)))));
    if (commanda?.type == "built-in") {
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
                } });
                break; /*
            case !!switchTest.match(/^h1$/):
                eventData.cancel = true;
                let inventorye = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblock = world.getDimension(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventorye.container.swapItems(i, i, inventoryblock.container)}; */ /*; eventData.sender.sendMessage(String("l" + slotsArray))*/ /*}catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
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
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryf.container.swapItems(i, i+9, inventoryblockb.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
            break;
            case !!switchTest.match(/^h3$/):
                eventData.cancel = true;
                let inventoryg = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc = world.getDimension(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset0")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg.container.swapItems(i, i+18, inventoryblockc.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
            break;
            case !!switchTest.match(/^h4$/):
                eventData.cancel = true;
                let inventoryg4 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc4 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg4.container.swapItems(i, i, inventoryblockc4.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
            break;
            case !!switchTest.match(/^h5$/):
                eventData.cancel = true;
                let inventoryg5 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc5 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg5.container.swapItems(i, i+9, inventoryblockc5.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
            break;
            case !!switchTest.match(/^h6$/):
                eventData.cancel = true;
                let inventoryg6 = player.getComponent("inventory") as EntityInventoryComponent
                let inventoryblockc6 = world.getDimension(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[0]).getBlock({x: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[1]), y: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[2]), z: Number(String(player.getDynamicProperty("blockTransferPreset1")).split(", ")[3])}).getComponent("inventory") as BlockInventoryComponent
        system.run(()=>{try{for(let i = 0; i < 9; i++){inventoryg6.container.swapItems(i, i+18, inventoryblockc6.container)}; }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}})
            break; */
            case !!switchTest.match(/^invsee$$/):
                eventData.cancel = true;
                system.run(() => {
                    const inventoryd2 = world.getPlayers().find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).getComponent("inventory");
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd2.inventorySize; i++) {
                            if (inventoryd2.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + "§r§f, item: " + inventoryd2.container.getItem(Number(i)).typeId + "§r§f, amount: " + inventoryd2.container.getItem(Number(i)).amount + "§r§f, nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + "§r§f, lore: " + JSON.stringify(inventoryd2.container.getItem(Number(i)).getLore() ?? []) ?? "[]" + ", enchantments: " + JSON.stringify(inventoryd2.container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments() ?? null) ?? "null"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        ;
                        eventData.sender.sendMessage(String(world.getPlayers().find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).name + "'s Items: \n" + slotsArray.join("§r§f\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                });
                break;
            case !!switchTest.match(/^offlineinfo$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.name == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that name were found");
                    }
                    else {
                        if (players.length > 1) {
                            player.sendMessage("§cError: multiple saved players with that name were found, with the following uuids: " + [players[0]?.id, players[1]?.id, players[2]?.id, players[3]?.id]);
                        }
                        else {
                            let player = players[0];
                            eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString( /*'en-US', {dateStyle: "full",timeStyle: 'full',timeZone: String(world.getDynamicProperty("andexdb:timeZone") ?? "UTC"),timeZoneName: "long"}*/) + ")") + " Data: \n" + JSON.stringify(player).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")));
                        }
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineuuidinfo$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.id == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that uuid were found");
                    }
                    else {
                        let player = players[0];
                        eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online) " : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Data: \n" + JSON.stringify(player).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")));
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineinforaw$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.name == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that name were found");
                    }
                    else {
                        if (players.length > 1) {
                            player.sendMessage("§cError: multiple saved players with that name were found, with the following uuids: " + [players[0]?.id, players[1]?.id, players[2]?.id, players[3]?.id]);
                        }
                        else {
                            let player = players[0];
                            eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString( /*'en-US', {dateStyle: "full",timeStyle: 'full',timeZone: String(world.getDynamicProperty("andexdb:timeZone") ?? "UTC"),timeZoneName: "long"}*/) + ")") + " Data: \n" + JSON.stringify(player).replaceAll("§", "§§")));
                        }
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineuuidinforaw$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.id == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that uuid were found");
                    }
                    else {
                        let player = players[0];
                        eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online) " : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Data: \n" + JSON.stringify(player).replaceAll("§", "§§")));
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineinfourl$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.name == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that name were found");
                    }
                    else {
                        if (players.length > 1) {
                            player.sendMessage("§cError: multiple saved players with that name were found, with the following uuids: " + [players[0]?.id, players[1]?.id, players[2]?.id, players[3]?.id]);
                        }
                        else {
                            let player = players[0];
                            eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString( /*'en-US', {dateStyle: "full",timeStyle: 'full',timeZone: String(world.getDynamicProperty("andexdb:timeZone") ?? "UTC"),timeZoneName: "long"}*/) + ")") + " Data: \n" + escape(JSON.stringify(player))));
                        }
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineuuidinfourl$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.id == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that uuid were found");
                    }
                    else {
                        let player = players[0];
                        eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online) " : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Data: \n" + escape(JSON.stringify(player))));
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineinfoescaped$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.name == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that name were found");
                    }
                    else {
                        if (players.length > 1) {
                            player.sendMessage("§cError: multiple saved players with that name were found, with the following uuids: " + [players[0]?.id, players[1]?.id, players[2]?.id, players[3]?.id]);
                        }
                        else {
                            let player = players[0];
                            eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString( /*'en-US', {dateStyle: "full",timeStyle: 'full',timeZone: String(world.getDynamicProperty("andexdb:timeZone") ?? "UTC"),timeZoneName: "long"}*/) + ")") + " Data: \n" + arrayModifier(JSON.stringify(player).split(""), (v) => v.charCodeAt(0)).join()));
                        }
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineuuidinfoescaped$$/):
                eventData.cancel = true;
                try {
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.id == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that uuid were found");
                    }
                    else {
                        let player = players[0];
                        eventData.sender.sendMessage(String(player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online) " : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Data: \n" + arrayModifier(JSON.stringify(player).split(""), (v) => v.charCodeAt(0)).join()));
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineinvsee$$/):
                eventData.cancel = true;
                try {
                    let slotsArray = [];
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.name == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that name were found");
                    }
                    else {
                        if (players.length > 1) {
                            player.sendMessage("§cError: multiple saved players with that name were found, with the following uuids: " + [players[0]?.id, players[1]?.id, players[2]?.id, players[3]?.id]);
                        }
                        else {
                            let player = players[0];
                            let items = player.items.inventory.concat(player.items.equipment);
                            items.forEach((item) => { if (item.count != 0) {
                                slotsArray = slotsArray.concat(String("slot: " + item.slot + "§r§f, item: " + item.id + "§r§f, amount: " + item.count + "§r§f, nameTag: " + item.name + "§r§f, lore: " + JSON.stringify(item.lore ?? []) ?? "[]" + "§r§f, enchantments: " + JSON.stringify(item.enchants ?? "N/A") ?? "N/A"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + item.slot + ", item: minecraft:air");
                            } });
                            ;
                            eventData.sender.sendMessage(String("(format_version: " + player.format_version + ") " + player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Items: \n" + slotsArray.join("§r§f\n")));
                        }
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^offlineuuidinvsee$$/):
                eventData.cancel = true;
                try {
                    let slotsArray = [];
                    let players = savedPlayer.getSavedPlayers().filter((p) => (p.id == switchTestB.split(" ").slice(1).join(" ")));
                    if (players.length == 0) {
                        player.sendMessage("§cError: no players with that uuid were found");
                    }
                    else {
                        let player = players[0];
                        let items = player.items.inventory.concat(player.items.equipment);
                        items.forEach((item) => { if (item.count != 0) {
                            slotsArray = slotsArray.concat(String("slot: " + item.slot + "§r§f, item: " + item.id + "§r§f, amount: " + item.count + "§r§f, nameTag: " + item.name + "§r§f, lore: " + JSON.stringify(item.lore ?? []) ?? "[]" + "§r§f, enchantments: " + JSON.stringify(item.enchants ?? "N/A") ?? "N/A"));
                        }
                        else {
                            slotsArray = slotsArray.concat("slot: " + item.slot + ", item: minecraft:air");
                        } });
                        ;
                        eventData.sender.sendMessage(String("(format_version: " + player.format_version + ") " + player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online) " : " (last seen: " + new Date(Number(player.lastOnline) + (Number(event.sender.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Items: \n" + slotsArray.join("§r§f\n")));
                    }
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^binvsee$$/):
                eventData.cancel = true;
                system.run(() => {
                    let block = world.getDimension("0123456789-!@#$%^&*()".includes(newMessage.trimEnd().split(" ").slice(1).join(" ").slice(-1)) ? player.dimension.id : newMessage.trimEnd().split(" ").slice(-1).join(" ")).getBlock(coordinatesB("0123456789-!@#$%^&*()".includes(newMessage.split(" ").slice(1).join(" ").trimEnd().slice(-1)) ? newMessage.split(" ").slice(1, -1).join(" ").trimEnd() : newMessage.split(" ").slice(1).join(" ").trimEnd(), player.location, player.getViewDirection()));
                    const inventoryd2 = block.getComponent("inventory");
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd2.container.size; i++) {
                            if (inventoryd2.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd2.container.getItem(Number(i)).typeId + ", amount: " + inventoryd2.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd2.container.getItem(Number(i)).getLore() + ", enchantments: " + JSON.stringify(inventoryd2.container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments() ?? []) ?? "[]"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        eventData.sender.sendMessage(String("Block At " + JSON.stringify({ dimension: block.dimension, x: block.x, y: block.y, z: block.z }) + " Items: \n" + slotsArray.join("§r§f\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + e.stack);
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
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd2.container.getItem(Number(i)).typeId + ", amount: " + inventoryd2.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd2.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd2.container.getItem(Number(i)).getLore() + ", enchantments: " + JSON.stringify(inventoryd2.container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments() ?? []) ?? "[]"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        eventData.sender.sendMessage(String(world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities()).concat(world.getDimension("the_end").getEntities()).find((playerFinders) => (playerFinders == targetSelectorB(newMessage.slice(8), "", Number(eventData.sender.id)))).nameTag + "'s Items: \n" + slotsArray.join("§r§f\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                });
                break;
            case !!switchTest.match(/^invseeuuidmode$/):
                eventData.cancel = true;
                const inventoryd = world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities()).concat(world.getDimension("the_end").getEntities()).find((playerFinders) => (playerFinders.id == newMessage.slice(8).split(" ")[0])).getComponent("inventory");
                system.run(() => {
                    try {
                        let slotsArray = [];
                        for (let i = 0; i < inventoryd.inventorySize; i++) {
                            if (inventoryd.container.getItem(Number(i)) !== undefined) {
                                slotsArray = slotsArray.concat(String("slot: " + i + ", item: " + inventoryd.container.getItem(Number(i)).typeId + ", amount: " + inventoryd.container.getItem(Number(i)).amount + ", nameTag: " + inventoryd.container.getItem(Number(i)).nameTag + ", lore: " + inventoryd.container.getItem(Number(i)).getLore() + ", enchantments: " + JSON.stringify(inventoryd.container.getItem(Number(i))?.getComponent("enchantable")?.getEnchantments() ?? []) ?? "[]"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + i + ", item: minecraft:air");
                            }
                        }
                        ;
                        eventData.sender.sendMessage(String(world.getDimension("overworld").getEntities().concat(world.getDimension("nether").getEntities()).concat(world.getDimension("the_end").getEntities()).find((playerFinders) => (playerFinders.id == newMessage.slice(8).split(" ")[0])).nameTag + "'s Items: \n" + slotsArray.join("§r§f\n")));
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                });
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
                                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                                eventData.sender.sendMessage("§c" + e + e.stack);
                            } });
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^item$/):
                eventData.cancel = true;
                try {
                    let command = newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length);
                    switch (command.split(" ").slice(0, 2).join(" ")) {
                        case "item lore":
                            let lore = JSON.parse(command.split(" ").slice(2).join(" "));
                            let errs;
                            errs = [];
                            lore.forEach((l, i) => { let calc = l.escapeCharactersB(true); lore[i] = calc.v; errs.concat(calc.e); });
                            if (errs != undefined) {
                                errs.forEach((e) => { player.sendMessage(String("§c" + e + e.stack)); });
                            }
                            ;
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).setLore(lore);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        case "item lorene":
                            let lorene = JSON.parse(command.split(" ").slice(2).join(" "));
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).setLore(lorene);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        case "item name":
                            let name = command.split(" ").slice(2).join(" ").escapeCharactersB(true);
                            if (name.e != undefined) {
                                name.e.forEach((e) => { player.sendMessage(String("§c" + e + e.stack)); });
                            }
                            ;
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).nameTag = name.v;
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        case "item property":
                            eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                            break;
                        case "item enchantment":
                            switch (command.split(" ")[2]) {
                                case "add":
                                    let enchantment = JSON.parse(command.split(" ").slice(3).join(" "));
                                    let itemd = player.getComponent("inventory").container.getItem(player.selectedSlot).clone();
                                    system.run(() => {
                                        try {
                                            itemd.getComponent("enchantable").addEnchantment(enchantment);
                                            player.getComponent("inventory").container.setItem(player.selectedSlot, itemd);
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                            player.sendMessage("§c" + e + e.stack);
                                        }
                                    });
                                    break;
                                case "addlist":
                                    let enchantmentlist = JSON.parse(command.split(" ").slice(3).join(" "));
                                    let itema = player.getComponent("inventory").container.getItem(player.selectedSlot).clone();
                                    system.run(() => {
                                        try {
                                            itema.getComponent("enchantable").addEnchantments(enchantmentlist);
                                            player.getComponent("inventory").container.setItem(player.selectedSlot, itema);
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                            player.sendMessage("§c" + e + e.stack);
                                        }
                                    });
                                    break;
                                case "remove":
                                    let itemb = player.getComponent("inventory").container.getItem(player.selectedSlot).clone();
                                    system.run(() => {
                                        try {
                                            itemb.getComponent("enchantable").removeEnchantment(command.split(" ")[3]);
                                            player.getComponent("inventory").container.setItem(player.selectedSlot, itemb);
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                            player.sendMessage("§c" + e + e.stack);
                                        }
                                    });
                                    break;
                                case "set":
                                    eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                                    break;
                                case "list":
                                    eventData.sender.sendMessage(JSON.stringify(player.getComponent("inventory").container.getItem(player.selectedSlot).getComponent("enchantable").getEnchantments()));
                                    break;
                                case "get":
                                    eventData.sender.sendMessage(JSON.stringify(player.getComponent("inventory").container.getItem(player.selectedSlot).getComponent("enchantable").getEnchantment(command.split(" ")[3])));
                                    break;
                                case "clear":
                                    const itemc = player.getComponent("inventory").container.getItem(player.selectedSlot).clone();
                                    system.run(() => {
                                        try {
                                            itemc.getComponent("enchantable").removeAllEnchantments();
                                            player.getComponent("inventory").container.setItem(player.selectedSlot, itemc);
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                            player.sendMessage("§c" + e + e.stack);
                                        }
                                    });
                                    break;
                                case "testfor":
                                    eventData.sender.sendMessage(JSON.stringify(player.getComponent("inventory").container.getItem(player.selectedSlot).getComponent("enchantable").hasEnchantment(command.split(" ")[3])));
                                    break;
                                default:
                                    eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.split(" ").slice(2).join(" ") + "\": at \"\\item " + command.split(" ").slice(1, 2).join(" ") + " >>" + command.split(" ").slice(2).join(" ") + "<<\"");
                                    break;
                            }
                            break;
                        case "item slot":
                            switch (command.split(" ")[3]) {
                                case "lore":
                                    let lore = JSON.parse(command.split(" ").slice(4).join(" "));
                                    let errs;
                                    errs = [];
                                    lore.forEach((l, i) => { let calc = l.escapeCharactersB(true); lore[i] = calc.v; errs.concat(calc.e); });
                                    if (errs != undefined) {
                                        errs.forEach((e) => { player.sendMessage(String("§c" + e + e.stack)); });
                                    }
                                    ;
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).setLore(lore);
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "lorene":
                                    let lorene = JSON.parse(command.split(" ").slice(4).join(" "));
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).setLore(lorene);
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "name":
                                    let name = command.split(" ").slice(4).join(" ").escapeCharactersB(true);
                                    if (name.e != undefined) {
                                        name.e.forEach((e) => { player.sendMessage(String("§c" + e + e.stack)); });
                                    }
                                    ;
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).nameTag = name.v;
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "components":
                                    eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                                    break;
                                case "amount":
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).amount = Number(command.split(" ").slice(4).join(" "));
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "count":
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).amount = Number(command.split(" ").slice(4).join(" "));
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "nameTag":
                                    let nameb = command.split(" ").slice(4).join(" ").escapeCharactersB(true);
                                    if (nameb.e != undefined) {
                                        nameb.e.forEach((e) => { player.sendMessage(String("§c" + e + e.stack)); });
                                    }
                                    ;
                                    system.run(() => { try {
                                        player.getComponent("inventory").container.getSlot(Number(command.split(" ")[2])).nameTag = nameb.v;
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                        player.sendMessage("§c" + e + e.stack);
                                    } });
                                    break;
                                case "enchantment":
                                    switch (command.split(" ")[4]) {
                                        case "add":
                                            let enchantment = JSON.parse(command.split(" ").slice(5).join(" "));
                                            let itemd = player.getComponent("inventory").container.getItem(Number(command.split(" ")[2])).clone();
                                            system.run(() => {
                                                try {
                                                    itemd.getComponent("enchantable").addEnchantment(enchantment);
                                                    player.getComponent("inventory").container.setItem(Number(command.split(" ")[2]), itemd);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                    player.sendMessage("§c" + e + e.stack);
                                                }
                                            });
                                            break;
                                        case "addlist":
                                            let enchantmentlist = JSON.parse(command.split(" ").slice(5).join(" "));
                                            let itema = player.getComponent("inventory").container.getItem(Number(command.split(" ")[2])).clone();
                                            system.run(() => {
                                                try {
                                                    itema.getComponent("enchantable").addEnchantments(enchantmentlist);
                                                    player.getComponent("inventory").container.setItem(Number(command.split(" ")[2]), itema);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                    player.sendMessage("§c" + e + e.stack);
                                                }
                                            });
                                            break;
                                        case "remove":
                                            let itemb = player.getComponent("inventory").container.getItem(player.selectedSlot).clone();
                                            system.run(() => {
                                                try {
                                                    itemb.getComponent("enchantable").removeEnchantment(command.split(" ")[5]);
                                                    player.getComponent("inventory").container.setItem(Number(command.split(" ")[2]), itemb);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                    player.sendMessage("§c" + e + e.stack);
                                                }
                                            });
                                            break;
                                        case "set":
                                            eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                                            break;
                                        case "list":
                                            eventData.sender.sendMessage(JSON.stringify(player.getComponent("inventory").container.getItem(Number(command.split(" ")[2])).getComponent("enchantable").getEnchantments()));
                                            break;
                                        case "get":
                                            eventData.sender.sendMessage(JSON.stringify(player.getComponent("inventory").container.getItem(Number(command.split(" ")[2])).getComponent("enchantable").getEnchantment(command.split(" ")[5])));
                                            break;
                                        case "clear":
                                            const itemc = player.getComponent("inventory").container.getItem(Number(command.split(" ")[2])).clone();
                                            system.run(() => {
                                                try {
                                                    itemc.getComponent("enchantable").removeAllEnchantments();
                                                    player.getComponent("inventory").container.setItem(Number(command.split(" ")[2]), itemc);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                    player.sendMessage("§c" + e + e.stack);
                                                }
                                            });
                                            break;
                                        case "test":
                                            eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                                            break;
                                        default:
                                            eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.split(" ").slice(4).join(" ") + "\": at \"\\item " + command.split(" ").slice(1, 4).join(" ") + " >>" + command.split(" ").slice(4).join(" ") + "<<\"");
                                            break;
                                    }
                                    break;
                                default:
                                    eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.split(" ")[3] + "\": at \"\\item " + command.split(" ").slice(1, 3).join(" ") + " >>" + command.split(" ").slice(3).join(" ") + "<<\"");
                                    break;
                            }
                            break;
                        case "item components":
                            eventData.sender.sendMessage("§l§cComing Soon!§r§f");
                            break;
                        case "item amount":
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).amount = Number(command.split(" ").slice(2).join(" "));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        case "item count":
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).amount = Number(command.split(" ").slice(2).join(" "));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        case "item nameTag":
                            let nameb = command.split(" ").slice(2).join(" ").escapeCharactersB(true);
                            if (nameb.e != undefined) {
                                nameb.e.forEach((e) => { player.sendMessage(String(e + e.stack)); });
                            }
                            ;
                            system.run(() => { try {
                                player.getComponent("inventory").container.getSlot(player.selectedSlot).nameTag = nameb.v;
                            }
                            catch (e) {
                                console.error(e, e.stack);
                                player.sendMessage("§c" + e + e.stack);
                            } });
                            break;
                        default:
                            eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + command.split(" ").slice(1).join(" ") + "\": at \"\\item >>" + command.split(" ").slice(1).join(" ") + "<<\"");
                            break;
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                    player.sendMessage(e + e.stack);
                }
                break;
            case !!switchTest.match(/^gmc$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode c");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to creative. ")); }); });
                break;
            case !!switchTest.match(/^gms$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode s");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to survival. ")); }); });
                break;
            case !!switchTest.match(/^gma$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode a");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to adventure. ")); }); });
                break;
            case !!switchTest.match(/^gmd$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode d");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to default. ")); }); });
                break;
            case !!switchTest.match(/^gmp$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/gamemode spectator");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 1:
                        try {
                            player.runCommandAsync("/gamemode s");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            player.runCommandAsync("/gamemode a");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 3:
                        try {
                            player.runCommandAsync("/gamemode d");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 4:
                        try {
                            player.runCommandAsync("/gamemode spectator");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                }
                ; /*
                    try{player.runCommandAsync("/gamemode random")}catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}*/
                system.run(() => { targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: Set gamemode to random. ")); }); });
                break; /*
            case !!switchTest.match(/^settings$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)){
                    case 3:
                        try{player.runCommandAsync("/scriptevent andexdb:setWorldDynamicPropertyB " + newMessage.slice(10).split(" ")[0] + "|" + newMessage.slice(newMessage.split(" ")[1].length+10))}catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}
                        try{eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length+10)); }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}
                    break;
                    case 2:
                        try{eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + world.getDynamicProperty(newMessage.split(" ")[1])); }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}
                    break;
                }
            break; */
            case !!switchTest.match(/^playersettings$/):
                eventData.cancel = true;
                switch (Math.min(newMessage.split(" ").length, 3)) {
                    case 3:
                        try {
                            player.setDynamicProperty(newMessage.split(" ")[1], newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + player.getDynamicProperty(newMessage.split(" ")[1]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[2] + " to " + newMessage.slice(newMessage.split(" ")[2].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[2] + ": " + player.getDynamicProperty(newMessage.split(" ")[2]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set " + newMessage.split(" ")[1] + " to " + newMessage.slice(newMessage.split(" ")[1].length + 17));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case 2:
                        try {
                            eventData.sender.sendMessage("Setting " + newMessage.split(" ")[1] + ": " + player.getDynamicProperty(newMessage.split(" ")[1]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                }
                break;
            case !!switchTest.match(/^help$/):
                eventData.cancel = true;
                switch (newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ").slice(0, 2).join(" ")) {
                    case "help":
                        eventData.sender.sendMessage("§2Help Chat Command Syntax§f\n.help scriptevent\n.help chatcommands\n.help javascriptfunctions\n.help js <JavaScriptFunctionVariableConstantOrClassName: string>§c\n.help entityevents\n.help items\n.help tags\n.help debugsticks".replaceAll("\n.", ("\n" + (world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))));
                        break;
                    case "help scriptevent":
                        eventData.sender.sendMessage("§2/scriptevent Syntax§f\n/scriptevent andexdb:debugStick <message: string>");
                        break;
                    case "help chatcommands":
                        eventData.sender.sendMessage(`§2Chat Commands Syntax§f\n.give <item: itemType> <amount: int>
.giveb <item: itemType> <amount: int>
.setitem <item: itemType> <amount: int> <slot: int>
.invsee <target: targetSelector>
.offlineinfo <playerName: string>
.offlineuuidinfo <playerUUID: int>
.offlineinvsee <playerName: string>
.offlineuuidinvsee <playerUUID: int>
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
.mainmenu
.settings
.datapickblock`.replaceAll("\n.", ("\n" + (world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"))));
                        break;
                    case "help javascriptfunctions":
                        eventData.sender.sendMessage(`§2List of JavaScript Functions, Constants, Variables, and Classes§f\n{main: [${Object.keys(main).join(", ")}], coords: [${Object.keys(coords).join(", ")}], cmds: [${Object.keys(cmds).join(", ")}], bans: [${Object.keys(bans).join(", ")}], uis: [${Object.keys(uis).join(", ")}], playersave: [${Object.keys(playersave).join(", ")}], spawnprot: [${Object.keys(spawnprot).join(", ")}]}`);
                        break;
                    case "help jsfunction":
                        eventData.sender.sendMessage(`§2${newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ").slice(2).join(" ")} js object definition§f\n${([...Object.entries(main), ...Object.entries(coords), ...Object.entries(cmds), ...Object.entries(bans), ...Object.entries(uis), ...Object.entries(playersave), ...Object.entries(spawnprot)].find(v => v[0] == newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length).split(" ").slice(2).join(" ")) ?? [, "§cError: The specified javascript function/constant/variable/class does not exist, check your spelling and capitallization. "])[1].toString().replaceAll("\\n", "\n")}`);
                        break;
                    default:
                        eventData.sender.sendMessage("§cSyntax error: Unexpected \"" + newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length + 4) + "\": at \"" + String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\") + "help >>" + newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length + 5) + "<<\"");
                        break;
                }
                break;
            case !!switchTest.match(/^getuuid$/):
                eventData.cancel = true;
                try {
                    system.runTimeout(() => { eventData.sender.sendMessage(String(targetSelector(newMessage.slice(23), "", Number(eventData.sender.id)))); }, 2);
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^run$/):
                eventData.cancel = true;
                try {
                    system.runTimeout(() => { let a = player.runCommand(newMessage.split(" ").slice(2).join(" ")); eventData.sender.sendMessage(String(a.successCount)); if (a.successCount != 0.0) {
                        targetSelectorAllListE("@a [tag=canSeeCustomChatCommandFeedbackFromMods]", player.location.x + " " + player.location.y + " " + player.location.z).forEach((entity) => { entity.sendMessage(String("{§l§dCMDFEED§r§f}[" + player.name + "§r§f]: " + a + " Successfully waited " + Number(newMessage.split(" ")[1]) + " ticks and executed the command: " + newMessage.slice(Number(newMessage.split(" ")[1]) + 5))); });
                    } }, Number(newMessage.split(" ")[1]));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^eval$/):
                eventData.cancel = true;
                try {
                    eval(newMessage.slice(String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\").length + 5));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                                eventData.sender.sendMessage("§c" + e + e.stack);
                                break;
                            }
                            try {
                                system.run(() => { world.setDynamicProperty("globalWarpListValues", warpList.join("||||")); });
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + e.stack);
                            }
                            try {
                                eventData.sender.sendMessage("Set global warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + e.stack);
                            }
                            break;
                        case true:
                            try {
                                warpList.push(String(newMessage.split(" ").slice(5).join(" ") /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ").replaceAll("|", "\\u007c") + ", " + newMessage.split(" ")[1] + ", " + newMessage.split(" ")[2] + ", " + newMessage.split(" ")[3] + ", " + newMessage.split(" ")[4]));
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + e.stack);
                            }
                            try {
                                system.run(() => { world.setDynamicProperty("globalWarpListValues", warpList.join("||||")); });
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + e.stack);
                            }
                            try {
                                eventData.sender.sendMessage("Added global warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                            }
                            catch (e) {
                                eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Removed global warp with name \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find global warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/.replaceAll(", ", " ") + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            system.run(() => { player.teleport({ x: Number(warp[2]), y: Number(warp[3]), z: Number(warp[4]) }, { dimension: world.getDimension(String(warp[1])), keepVelocity: false }); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Warped to \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/ + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find global warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) /*.replaceAll(/(?<!\\p)\\n/g, "\n").replaceAll(/(?<!\\p)\\s/g, "\s").replaceAll(/(?<!\\p)\\0/g, "\0").replaceAll(/(?<!\\p)\\r/g, "\r").replaceAll(/(?<!\\p)\\t/g, "\t").replaceAll(/(?<!\\p)\\v/g, "\v").replaceAll(/(?<!\\p)\\f/g, "\f").replaceAll(/(?<!\\p)\\k/g, "\k").replaceAll(/(?<!\\p)\\p/g, "")*/ + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                        eventData.sender.sendMessage("§c" + e + e.stack);
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
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^warplistrawdata$/):
                eventData.cancel = true;
                try {
                    eventData.sender.sendMessage("Global Warp List Raw Data: \n" + String(world.getDynamicProperty("globalWarpListValues")));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^warpreset$/):
                eventData.cancel = true;
                try {
                    system.run(() => { world.setDynamicProperty("globalWarpListValues"); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                try {
                    eventData.sender.sendMessage("Global warps lists has been reset. ");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                            break;
                        }
                        try {
                            system.run(() => { player.setDynamicProperty("warpList", wList.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Set warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case true:
                        try {
                            wList.push(String(newMessage.split(" ").slice(5).join(" ").replaceAll(", ", " ").replaceAll("|", "\\u007c") + ", " + newMessage.split(" ")[1] + ", " + newMessage.split(" ")[2] + ", " + newMessage.split(" ")[3] + ", " + newMessage.split(" ")[4]));
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            system.run(() => { player.setDynamicProperty("warpList", wList.join("||||")); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Added warp \"" + newMessage.split(" ").slice(5).join(" ").escapeCharacters(true) + "\" at dimension: " + newMessage.split(" ")[1] + ", x: " + newMessage.split(" ")[2] + ", y: " + newMessage.split(" ")[3] + ", z: " + newMessage.split(" ")[4] + ". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Removed warp with name \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            system.run(() => { player.teleport({ x: Number(warpB[2]), y: Number(warpB[3]), z: Number(warpB[4]) }, { dimension: world.getDimension(String(warpB[1])), keepVelocity: false }); });
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        try {
                            eventData.sender.sendMessage("Warped to \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
                        }
                        break;
                    case true:
                        try {
                            eventData.sender.sendMessage("§cError: could not find warp \"" + newMessage.split(" ").slice(1).join(" ").escapeCharacters(true) + "\". ");
                        }
                        catch (e) {
                            eventData.sender.sendMessage("§c" + e + e.stack);
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
                        eventData.sender.sendMessage("§c" + e + e.stack);
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
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                }
                break;
            case !!switchTest.match(/^wlistrawdata$/):
                eventData.cancel = true;
                try {
                    eventData.sender.sendMessage("Warp List Raw Data: \n" + String(player.getDynamicProperty("warpList")));
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^wreset$/):
                eventData.cancel = true;
                try {
                    system.run(() => { player.setDynamicProperty("warpList", undefined); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                try {
                    eventData.sender.sendMessage("Warps lists has been reset. ");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                        targetSelectorAllListB(newMessage.split(" ").slice(6).join(" "), "", Number(player.id)).forEach((p) => { p.setProperty("andexpr:color_tint_r", (Number((newMessage.split(" ")[1] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_r")))) ?? p.getProperty("andexpr:color_tint_r"))); p.setProperty("andexpr:color_tint_g", (Number((newMessage.split(" ")[2] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_g")))) ?? p.getProperty("andexpr:color_tint_g"))); p.setProperty("andexpr:color_tint_b", (Number((newMessage.split(" ")[3] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_b")))) ?? p.getProperty("andexpr:color_tint_b"))); p.setProperty("andexpr:color_tint_a", (Number((newMessage.split(" ")[4] ?? "~").replaceAll("~", String(p.getProperty("andexpr:color_tint_a")))) ?? p.getProperty("andexpr:color_tint_a"))); p.setProperty("andexpr:use_alphablend_player_materials", (Number((newMessage.split(" ")[5] ?? "~").replaceAll("~", String(p.getProperty("andexpr:use_alphablend_player_materials")))) ?? p.getProperty("andexpr:use_alphablend_player_materials"))); });
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^tps$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/scriptevent andexsa:getTPSExtraDetails");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
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
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^mainmenu$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/scriptevent andexdb:editorMenusAndLists hisa");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^settings$/):
                eventData.cancel = true;
                try {
                    player.runCommandAsync("/scriptevent andexdb:settings hisa");
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^datapickblock$/):
                eventData.cancel = true;
                try {
                    let item = player.getBlockFromViewDirection({ includeLiquidBlocks: true, includePassableBlocks: true }).block.getItemStack(1, true);
                    system.run(() => { player.getComponent("inventory").container.addItem(item); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                break;
            case !!switchTest.match(/^fill$/):
                eventData.cancel = true;
                let coordinatesa = evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[0][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[1][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[2][0], player.location, player.getRotation());
                let coordiantesb = evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[3][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[4][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0], player.location, player.getRotation());
                let firstblocknameindex = Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index + Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ") + 1;
                let reststringaftercoordinates = switchTestB.split(" ").slice(1).join(" ").slice(firstblocknameindex);
                let firstblockname = reststringaftercoordinates.split(" ")[0];
                let firstblockstates = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? JSONParse(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0]) : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? JSONParse(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0]) : undefined;
                let lastblockname = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0].length).trimStart().split(" ")[0] : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0].length).trimStart().split(" ")[0] : reststringaftercoordinates.trimStart().split(" ").slice(1).join(" ").trimStart().split(" ")[0];
                let somethingtest = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0].length).trimStart().split(" ").slice(1).join(" ").trim() : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0].length).trimStart().split(" ").slice(1).join(" ").trim() : reststringaftercoordinates.trimStart().split(" ").slice(1).join(" ").trimStart().split(" ").slice(1).join(" ").trim();
                let lastblockstates = somethingtest.startsWith("{") ? JSONParse(extractJSONStrings(somethingtest, false)[0]) : somethingtest.startsWith("[") ? JSONParse(extractJSONStrings(somethingtest.replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0]) : undefined;
                let matchingblock = lastblockname == "" ? undefined : lastblockname == "keep" ? BlockPermutation.resolve("air") : BlockPermutation.resolve(lastblockname, lastblockstates); /*
                console.warn(JSONStringify({coordinatesa, coordiantesb, firstblockname, firstblocknameindex, reststringaftercoordinates, firstblockstates, lastblockname, somethingtest, lastblockstates, matchingblock}))*/
                try {
                    system.run(() => { player.dimension.fillBlocks(coordinatesa, coordiantesb, BlockPermutation.resolve(firstblockname, firstblockstates), { matchingBlock: matchingblock }); });
                }
                catch (e) {
                    eventData.sender.sendMessage("§c" + e + e.stack);
                }
                //            try{system.run(()=>{player.dimension.fillBlocks(evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[0][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[1][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[2][0], player.location, player.getRotation()), evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[3][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[4][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0], player.location, player.getRotation()), mcServer.BlockPermutation.resolve(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")+1).split(" ")[0], extractJSONStrings(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")).split(" ").slice(1).join(" "), false)[0]), {matchingBlock: mcServer.BlockPermutation.resolve(getParametersFromString(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")+1)).results[2], extractJSONStrings(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")).split(" ").slice(1).join(" "), false)[1])}); }); }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}
                break;
            case !!switchTest.match(/^ifill$/):
                {
                    eventData.cancel = true;
                    let coordinatesa = evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[0][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[1][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[2][0], player.location, player.getRotation());
                    let coordiantesb = evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[3][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[4][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0], player.location, player.getRotation());
                    let firstblocknameindex = Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index + Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ") + 1;
                    let reststringaftercoordinates = switchTestB.split(" ").slice(1).join(" ").slice(firstblocknameindex);
                    let firstblockname = reststringaftercoordinates.split(" ")[0];
                    let firstblockstates = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? JSONParse(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0]) : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? JSONParse(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0]) : undefined;
                    let lastblockname = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0].length).trimStart().split(" ")[0] : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0].length).trimStart().split(" ")[0] : reststringaftercoordinates.trimStart().split(" ").slice(1).join(" ").trimStart().split(" ")[0];
                    let somethingtest = reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("{") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart(), false)[0].length).trimStart().split(" ").slice(1).join(" ").trim() : reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().startsWith("[") ? reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().slice(extractJSONStrings(reststringaftercoordinates.split(" ").slice(1).join(" ").trimStart().replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0].length).trimStart().split(" ").slice(1).join(" ").trim() : reststringaftercoordinates.trimStart().split(" ").slice(1).join(" ").trimStart().split(" ").slice(1).join(" ").trim();
                    let lastblockstates = somethingtest.startsWith("{") ? JSONParse(extractJSONStrings(somethingtest, false)[0]) : somethingtest.startsWith("[") ? JSONParse(extractJSONStrings(somethingtest.replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"), false)[0]) : undefined;
                    let matchingblock = lastblockname == "" ? undefined : lastblockname == "keep" ? BlockPermutation.resolve("air") : BlockPermutation.resolve(lastblockname, lastblockstates); /*
                    console.warn(JSONStringify({coordinatesa, coordiantesb, firstblockname, firstblocknameindex, reststringaftercoordinates, firstblockstates, lastblockname, somethingtest, lastblockstates, matchingblock}))*/
                    try {
                        system.run(() => { let a = fillBlocksB(coordinatesa, coordiantesb, player.dimension, BlockPermutation.resolve(firstblockname, firstblockstates), { matchingBlock: matchingblock }); player.sendMessage(`${a == 0 ? "§c" : ""}${a} blocks filled`); });
                    }
                    catch (e) {
                        eventData.sender.sendMessage("§c" + e + e.stack);
                    }
                    //            try{system.run(()=>{player.dimension.fillBlocks(evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[0][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[1][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[2][0], player.location, player.getRotation()), evaluateCoordinates(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[3][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[4][0], Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0], player.location, player.getRotation()), mcServer.BlockPermutation.resolve(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")+1).split(" ")[0], extractJSONStrings(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")).split(" ").slice(1).join(" "), false)[0]), {matchingBlock: mcServer.BlockPermutation.resolve(getParametersFromString(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")+1)).results[2], extractJSONStrings(switchTestB.split(" ").slice(1).join(" ").slice(Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5].index+Array.from(switchTestB.split(" ").slice(1).join(" ").matchAll(/\s*([\^\*\~\!][\-]?\d*|(?<![\^\*\~\!\d])[\-]?\d+)\s*/gis))[5][0].indexOf(" ")).split(" ").slice(1).join(" "), false)[1])}); }); }catch(e){eventData.sender.sendMessage("§c" + e + e.stack)}
                }
                break;
            default:
                if (world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") != true) {
                    eventData.cancel = true;
                }
                else { /*if(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") != true){*/
                    chatSend(params); /*
                    }*/
                }
                break;
        }
    }
    else {
        if (commanda?.type == "custom") {
            eventData.cancel = true;
            if (commanda.customCommandType == "commands") {
                system.run(() => commanda.run(newMessage.slice(commanda.customCommandPrefix.length), player, player, event));
            }
            else {
                commanda.run(newMessage.slice(commanda.customCommandPrefix.length), player, player, event);
            }
        }
        else { }
    }
}
export function chatSend(params) {
    let returnBeforeChatSend = params.returnBeforeChatSend;
    let player = params.player;
    let eventData = params.eventData;
    let event = params.event;
    let newMessage = params.newMessage;
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendComplete")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
            currentplayer.sendMessage((e + " " + e.stack));
        } });
    }
    if (returnBeforeChatSend)
        return;
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
    let name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r§f<") + player.name + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
    let rankMode = 0;
    for (let index in player.getTags()) {
        if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) {
            rank = (rank + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]"));
        }
        if (player.getTags()[Number(index)] == ("chatHideNameTag")) {
            name = "";
            rankMode = 1;
        }
        else {
            if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) {
                name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r§f<") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
                rankMode = 2;
            }
            else {
                if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) {
                    name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<") + player.nameTag + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? ">") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
                    rankMode = 3;
                }
            }
        }
    }
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => { if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
            currentplayer.sendMessage((e + " " + e.stack));
        } });
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
export function evaluateParameters(commandstring, parameters) {
    let argumentsa = [];
    let ea = [];
    let paramEval = commandstring;
    parameters.forEach((p, i) => {
        if ((p?.type ?? p) == "presetText") {
            argumentsa.push(paramEval.split(" ")[0]);
            paramEval = paramEval.split(" ").slice(1).join(" ");
        }
        else {
            if ((p?.type ?? p) == "number") {
                argumentsa.push(Number(paramEval.split(" ")[0]));
                paramEval = paramEval.split(" ").slice(1).join(" ");
            }
            else {
                if ((p?.type ?? p) == "boolean") {
                    argumentsa.push(Boolean(JSON.parse(paramEval.split(" ")[0])));
                    paramEval = paramEval.split(" ").slice(1).join(" ");
                }
                else {
                    if ((p?.type ?? p) == "string") {
                        if (paramEval.trimStart().startsWith("\"")) {
                            let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                            paramEval = paramEval.trimStart().slice(value.s.length + 1) ?? "";
                            try {
                                argumentsa.push(value.v);
                            }
                            catch (e) {
                                ea.push([e, e.stack]);
                            }
                            ;
                        }
                        else {
                            argumentsa.push(paramEval.split(" ")[0]);
                            paramEval = paramEval.split(" ").slice(1).join(" ");
                        }
                    }
                    else {
                        if ((p?.type ?? p) == "json") {
                            let value = getParametersFromString(paramEval).resultsincludingunmodified[0];
                            paramEval = paramEval.slice(value.s.length + 1) ?? "";
                            try {
                                argumentsa.push(value.v ?? JSONParse(value.s ?? paramEval, true));
                            }
                            catch (e) {
                                ea.push([e, e.stack]);
                            }
                            ;
                        }
                        else { }
                    }
                }
            }
        }
    });
    return {
        params: parameters,
        extra: paramEval,
        args: argumentsa,
        err: ea
    };
}
export function evaluateParametersOld(parameters, paramEvalA) {
    let paramEval = paramEvalA;
    let args;
    args = [];
    let er;
    er = [];
    let erb;
    erb = [];
    parameters.forEach((p, i) => {
        try {
            if (p == "presetText") {
                args.push(paramEval.split(" ")[0]);
                paramEval = paramEval.split(" ").slice(1).join(" ");
            }
            else {
                if (p == "string") {
                    if (paramEval.startsWith("\"")) {
                        if (!paramEval.includes("\\\"")) {
                            args.push(paramEval.slice(1, paramEval.indexOf("\"", 1)));
                            paramEval = paramEval.slice(paramEval.indexOf("\"", 1) + 2);
                        }
                        else {
                            args.push([paramEval.slice(1).split("\\\"").slice(0, paramEval.slice(1).split("\\\"").findIndex((v) => (v.includes("\"")))).join("\\\""), paramEval.slice(1).split("\\\"").find((v) => (v.includes("\""))).split("\"")[0]].join("\""));
                            paramEval = paramEval.slice(1).split("\\\"").find((v) => (v.includes("\""))).split("\"")[1].slice(1);
                        }
                    }
                    else {
                        args.push(paramEval.split(" ")[0]);
                        paramEval = paramEval.split(" ").slice(1).join(" ");
                    }
                }
                else {
                    if (p == "json") {
                        let endCharacter = "}";
                        if (paramEval.startsWith("[")) {
                            endCharacter = "]";
                        }
                        else {
                            if (paramEval.startsWith("(")) {
                                endCharacter = ")";
                            }
                        }
                        ;
                        try {
                            args.push(JSON.parse((paramEval.split(endCharacter + " ")[0] + endCharacter) ?? paramEval));
                        }
                        catch (e) {
                            er.push([e, e.stack]);
                            erb.push([String(e), e.stack, i]);
                        }
                        ;
                        paramEval = paramEval.split(endCharacter + " ")[1] ?? "";
                    }
                    else {
                        if (p == "number") {
                            args.push(Number(paramEval.split(" ")[0]));
                            paramEval = paramEval.split(" ").slice(1).join(" ");
                        }
                        else {
                            if (p == "boolean") {
                                args.push(Boolean((paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("t") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("y") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("1") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("+") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("c") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("v") || paramEval.split(" ")[0].trimStart().toLowerCase().startsWith("p"))));
                                paramEval = paramEval.split(" ").slice(1).join(" ");
                            }
                            else {
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            er.push([e, e.stack]);
            erb.push([String(e), e.stack, i]);
        }
        ;
    });
    return { er: er, erb: erb, args: args, paramEval: paramEval, paramEvalA: paramEvalA, parameters: parameters };
}
;
