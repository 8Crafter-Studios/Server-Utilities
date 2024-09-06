import { Block, BlockInventoryComponent, BlockPermutation, ChatSendBeforeEvent, Container, Dimension, DimensionTypes, EntityInventoryComponent, ItemStack, Player, system, world, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, BlockType, BlockTypes, ItemTypes, ItemType, ItemLockMode, CompoundBlockVolume, BlockVolumeIntersection, BlockVolume, BlockVolumeBase, GameMode, MolangVariableMap, EffectType, EnchantmentTypes, StructureSaveMode, EntityTypes, StructureAnimationMode, StructureMirrorAxis, StructureRotation, Structure, EntityType, EntityProjectileComponent } from "@minecraft/server";
import { getTopSolidBlock, arrayToElementList, debugAction, interactable_block, interactable_blockb, customFormUIElement, strToCustomFormUIElement /*,format_version*/, getUICustomForm, worldPlayers, timeZones, mainEval, debugActionb, indirectMainEval, gedp, gidp, gwdp, mainRun, sedp, sidp, swdp, fillBlocks, fillBlocksB, mainmetaimport, srun, gt, fillBlocksC, fillBlocksD, fillBlocksCG, fillBlocksH, fillBlocksHW, fillBlocksHB, fillBlocksHH, fillBlocksHO, fillBlocksHP, scanForContainerBlocks, clearAllContainerBlocks, fillBlocksHC, fillBlocksHS, fillBlocksHHS, fillBlocksHT, fillBlocksHSG, fillBlocksHHSG, fillBlocksHDG, fillBlocksHSSG, fillBlocksHOG, fillBlocksHHOG, fillBlocksHSGG, fillBlocksHISGG, format_version, fillBlocksHFG, fillBlocksHWG, fillBlocksHHG, fillBlocksHOTG, fillBlocksHFGB, dimensionTypeDisplayFormatting, dimensionTypeDisplayFormattingB, dimensionTypeDisplayFormattingC, dimensionTypeDisplayFormattingD, config, fillBlocksHSGB, fillBlocksHCGB, fillBlocksHHSGB, fillBlocksHFFGB, fillBlocksHWFGB, dimensionTypeDisplayFormattingE, SemVerString, crashEnabled, SemVerMatcher, SemVerValidator, dimensions, dimensionsb, dimensionsc, dimensionsd, dimensionse, fillBlocksHHFGB, fillBlocksHISGGB, fillBlocksHOFGB, fillBlocksHSGGB, flatPath, getGroundSolidBlock, getNextTopSolidBlockAbovePosition, getNextTopSolidBlockBelowPosition, getPathInObject, nether, overworld, scanForBlockType, subscribedEvents, tempSavedVariables, the_end, v3Multiply, fillBlocksE, fillBlocksF } from "../Main";
import { LocalTeleportFunctions, coordinates, coordinatesB, evaluateCoordinates, anglesToDirectionVector, anglesToDirectionVectorDeg, caretNotationB, caretNotation, caretNotationC, caretNotationD, coordinatesC, coordinatesD, coordinatesE, coordinates_format_version, evaluateCoordinatesB, movePointInDirection, facingPoint, WorldPosition, rotate, rotate3d, roundVector3ToMiddleOfBlock, generateTickingAreaFillCoordinatesC, doBoundingBoxesIntersect, chunkIndexToBoundingBox, roundVector3ToMiddleOfBlockFloorY, evaluateRotationCoordinates, getChunkIndex, getChunkIndexB, getChunkIndexC, approxEqual, approxEquals, approximatelyEqual, approximatelyEquals, parseExpression, generateMathExpression, parseExpressionKE, parseExpressionR, Vector, chunkIndexToBoundingBoxB, parseExpressionBR, parseExpressionBKE, parseExpressionB, blockClipboard, removeAirFromStructure, undoClipboard, AreaBackups, AreaBackup, VSTR, diroffsetmapb, diroffsetmap, } from "./coordinates";
import { ban, ban_format_version } from "./ban";
import { player_save_format_version, savedPlayer } from "./player_save.js";
import { editAreas, noPistonExtensionAreas, noBlockBreakAreas, noBlockInteractAreas, noBlockPlaceAreas, noExplosionAreas, noInteractAreas, protectedAreas, testIsWithinRanges, getAreas, spawnProtectionTypeList, spawn_protection_format_version, convertToCompoundBlockVolume, getType, editAreasMainMenu } from "./spawn_protection.js";
import { customElementTypeIds, customFormListSelectionMenu, editCustomFormUI, forceShow, showCustomFormUI, addNewCustomFormUI, customElementTypes, customFormDataTypeIds, customFormDataTypes, customFormUIEditor, customFormUIEditorCode, ui_format_version, settings, personalSettings, editorStickB, editorStickMenuB, mainMenu, globalSettings, evalAutoScriptSettings, editorStickMenuC, inventoryController, editorStickC, playerController, entityController, scriptEvalRunWindow, editorStick, managePlayers, terminal, manageCommands, chatMessageNoCensor, chatCommandRunner, chatSendNoCensor, notificationsSettings } from "./ui.js";
import { listoftransformrecipes } from "transformrecipes";
import { cmdutilsmetaimport, targetSelector, targetSelectorAllListB, targetSelectorAllListC, targetSelectorAllListD, targetSelectorAllListE, targetSelectorB } from "./command_utilities";
import { chatMessage, chatSend, chatmetaimport, currentlyRequestedChatInput, evaluateChatColorType, patternColors, patternColorsMap, patternFunctionList, patternList, requestChatInput, requestConditionalChatInput } from "./chat";
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
export const utilsmetaimport = import.meta;
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
transformrecipes;
chat;
cmdutils;
utils;
errors;
mcMath;
export function getArrayElementProperty(array, property) { array.forEach((v, i, a) => { array[i] = eval(`v.${property}`); }); return array; }
export function combineObjects(obj1, obj2) { return Object.fromEntries(Object.entries(obj1).concat(Object.entries(obj2))); }
export function generateCUID(classid) { let CUID = Number(world.getDynamicProperty("cuidCounter:" + (classid ?? "default")) ?? 0) + 1; world.setDynamicProperty("cuidCounter:" + (classid ?? "default"), CUID); return CUID; }
export function getCUIDClasses() { return world.getDynamicPropertyIds().filter(s => s.startsWith("cuidCounter:")); }
export function generateAIID(classid) { let AIID = Number(world.getDynamicProperty("aiidCounter:" + (classid ?? "default")) ?? 0) + 1; world.setDynamicProperty("aiidCounter:" + (classid ?? "default"), AIID); return AIID; }
export function getAIIDClasses() { return world.getDynamicPropertyIds().filter(s => s.startsWith("aiidCounter:")); }
export function generateTUID() { return toBase(Date.now()); }
export function toBase(num, radix = 10, keysa = radix > 62 ? "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/" : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/") {
    /*  var keys = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];*/
    var keys = keysa.split("");
    if (radix == 1)
        return keys[0].repeat(num);
    if (!(radix >= 2 && radix <= keys.length))
        throw new RangeError("toBase() radix argument must be between 2 and " + keys.length);
    if (num < 0)
        var isNegative = true;
    if (isNaN(num = Math.abs(+num)))
        return NaN;
    let output = [];
    do {
        let index = num % radix;
        output.unshift(keys[index]);
        num = Math.trunc(num / radix);
    } while (num != 0);
    if (isNegative ?? false)
        output.unshift('-');
    return output.join("");
}
export function fromBaseToBase(num, base = 10, radix = 10, keysa = radix > 62 ? "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/" : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/") {
    /*  var keys = ['0', '1', 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];*/
    var keys = keysa.split("");
    num = (base == 10) ? num : parseInt(num, base);
    if (radix == 1)
        return keys[0].repeat(num);
    if (!(radix >= 2 && radix <= keys.length))
        throw new RangeError("fromBaseToBase() radix argument must be between 2 and " + keys.length);
    if (num < 0)
        var isNegative = true;
    if (isNaN(num = Math.abs(+num)))
        return NaN;
    let output = [];
    do {
        let index = num % radix;
        output.unshift(keys[index]);
        num = Math.trunc(num / radix);
    } while (num != 0);
    if (isNegative)
        output.unshift('-');
    return output.join("");
}
export function fixedPositionNumberObject(object, decimals = Number(world.getDynamicProperty("scriptPrecision") ?? 5)) {
    let newObject;
    newObject = [];
    Object.entries(object).forEach((k, i) => { if (typeof (k[1]) == "number") {
        newObject.push([k[0], k[1].toFixed(decimals)]);
    }
    else {
        newObject.push(k);
    } });
    return Object.fromEntries(newObject);
}
export function roundPlaceNumberObject(object, place = Number(world.getDynamicProperty("scriptPrecision") ?? 5)) {
    let newObject;
    newObject = [];
    Object.entries(object).forEach((k, i) => { if (typeof (k[1]) == "number") {
        newObject.push([k[0], Number(k[1].toFixed(place))]);
    }
    else {
        newObject.push(k);
    } });
    return Object.fromEntries(newObject);
}
/**
 * @deprecated
 */
export function arrayModifierOld(array, callbackfn) { array.forEach((v, i, a) => { array[i] = callbackfn(v, i, a); }); return array; }
/**
 * @deprecated
 */
export function arrayModifier(sourcearray, callbackfn, overwrite = false) {
    if (overwrite) {
        sourcearray.forEach((v, i, a) => {
            sourcearray[i] = callbackfn(v, i, a);
        });
        return sourcearray;
    }
    else {
        let newarray;
        newarray = [];
        sourcearray.forEach((v, i, a) => {
            newarray[i] = callbackfn(v, i, a);
        });
        return newarray;
    }
}
;
export function twoWayModulo(number, modulo) { if (number < 0) {
    return modulo + (number % modulo);
}
else {
    return number % modulo;
} }
export function clamp24HoursTo12Hours(hours) { return twoWayModulo(hours - 1, 12) + 1; }
/**
 * Formats a date object to a time string formatted as 12:37:01 PM.
 * @since 1.18.2-development.3
 * @version 1.0.1
 */
export function formatTime(date, timeZoneOffset = 0) { const dateb = new Date(date.valueOf() + (timeZoneOffset * 3600000)); return `${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`; }
/**
 * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM.
 * @since 1.18.2-development.10
 * @version 1.0.1
 */
export function formatDateTime(date, timeZoneOffset = 0) { const dateb = new Date(date.valueOf() + (timeZoneOffset * 3600000)); return `${dateb.getUTCMonth().toString().padStart(2, "0")}/${dateb.getUTCDay().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")} ${dateb.getUTCHours() > 11 ? "P" : "A"}M`; }
/**
 * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values.
 * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true.
 * @returns {any} The parsed JSON data.
 */
export function JSONParseOld(text, keepUndefined = true) {
    let g = [];
    let h = [];
    let a = JSON.parse(text.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"'), function (k, v) {
        if (v === '{{Infinity}}')
            return Infinity;
        else if (v === '{{-Infinity}}')
            return -Infinity;
        else if (v === '{{NaN}}')
            return NaN;
        else if (v === '{{undefined}}') {
            g.push(k);
            if (keepUndefined) {
                return v;
            }
            else {
                undefined;
            }
        }
        ;
        h.push(k);
        return v;
    });
    g.forEach((v, i) => { let b = Object.entries(a); b[b.findIndex(b => b[0] == v)] = [v, undefined]; a = Object.fromEntries(b); });
    {
        let b = Object.entries(a);
        b.filter(b => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined)}}"}}$/)).forEach((v, i) => { console.log(v, i); b[b.findIndex(b => b[0] == v[0])] = [v[0], String(v[1]).replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined)(?:}}"}})$/g, '{{$1}}')]; a = Object.fromEntries(b); });
    }
    ;
    return a;
}
/**
 * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values.
 * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false.
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns {any} The JSON string.
 */
export function JSONStringifyOld(value, keepUndefined = false, space) {
    return JSON.stringify(value, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
}
export function JSONParse(JSONString, keepUndefined = true) {
    let g = [];
    let h = [];
    if (JSONString == undefined) {
        let nothing;
        return nothing;
    }
    if (JSONString == "undefined") {
        return undefined;
    }
    if (JSONString == "Infinity") {
        return Infinity;
    }
    if (JSONString == "-Infinity") {
        return -Infinity;
    }
    if (JSONString == "NaN") {
        return NaN;
    }
    if (JSONString == "null") {
        return null;
    }
    if (JSONString.match(/^\-?\d+n$/g)) {
        return BigInt(JSONString.slice(0, -1));
    }
    let a = JSON.parse(JSONString.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"').replace(/(?<=(?:[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\[)[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*),(?:\s*)|[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*)\[(?:\s*)))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,\]](?:\s*))/g, '"{{$1}}"').replace(/^(Infinity|NaN|-Infinity|undefined|\-?\d+n)$/g, '"{{$1}}"'), function (k, v) {
        if (v === '{{Infinity}}')
            return Infinity;
        else if (v === '{{-Infinity}}')
            return -Infinity;
        else if (v === '{{NaN}}')
            return NaN;
        else if (v === '{{undefined}}') {
            g.push(k);
            if (keepUndefined) {
                return v;
            }
            else {
                undefined;
            }
        }
        else if (tryget(() => v.match(/^{{\-?\d+n}}$/g)) ?? false)
            return BigInt(v.slice(2, -3));
        h.push(k);
        return v;
    });
    function recursiveFind(a) {
        if (a instanceof Array) {
            let b = a;
            b.forEach((v, i) => {
                if (v instanceof Array || v instanceof Object) {
                    b[i] = recursiveFind(v);
                    return;
                }
                ;
                if (String(v) == "{{undefined}}") {
                    b[i] = undefined;
                    return;
                }
                ;
            });
            a = b;
            {
                let b = a;
                !!b.forEach((va, i) => {
                    if (String(va).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                        b[i] = va.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                    }
                    a = b;
                });
            }
            ;
        }
        else if (a instanceof Object) {
            let b = Object.entries(a);
            b.forEach((v, i) => {
                if (v[1] instanceof Object || v[1] instanceof Array) {
                    b[i] = [v[0], recursiveFind(v[1])];
                    return;
                }
                ;
                if (String(v[1]) == "{{undefined}}") {
                    b[i] = [v[0], undefined];
                    return;
                }
                ;
            });
            a = Object.fromEntries(b);
            {
                let b = Object.entries(a);
                b.filter(b => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)).forEach((v, i) => {
                    b[b.findIndex(b => b[0] == v[0])] = [v[0], v[1].replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}')];
                    a = Object.fromEntries(b);
                });
            }
            ;
        }
        else if (typeof a === "string") {
            if (a == "{{undefined}}") {
                a = undefined;
            }
            else {
                if (a.match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                    a = a.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                }
            }
        }
        ;
        return a;
    }
    a = recursiveFind(a);
    return a;
}
;
export function JSONStringify(JSONObject, keepUndefined = false, space) {
    if (JSONObject == undefined) {
        return keepUndefined ? "undefined" : "";
    }
    return JSON.stringify(JSONObject, function (k, v) {
        if (v === Infinity)
            return "{{Infinity}}";
        else if (v === -Infinity)
            return "{{-Infinity}}";
        else if (Number.isNaN(v))
            return "{{NaN}}";
        else if (v === undefined && keepUndefined)
            return "{{undefined}}";
        else if (typeof v === "function")
            return { $function: v.toString() };
        else if (typeof v === "bigint")
            return "{{" + v.toString() + "n}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/g, '{{"{{$1}}"}}');
        }
        return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
}
;
export function objectify(object) { let entries = Object.entries(object); entries.forEach((v, i) => { if (v[1] instanceof Array) {
    entries[i][1] = objectify(v[1]);
}
else if (v[1] instanceof Object) {
    entries[i][1] = objectify(v[1]);
} }); return Object.fromEntries(entries); }
;
export function arrayify(object) { let entries = Object.entries(object); entries.forEach((v, i) => { if (v[1] instanceof Array) {
    entries[i][1] = arrayify(v[1]);
}
else if (v[1] instanceof Object) {
    entries[i][1] = arrayify(v[1]);
} }); return entries; }
;
export function stringify(object, entriesmode = 0, escapedarrayorobjecttag = 0, objectifyinfinity = 0, objectifynan = 0, objectifyundefined = 0, objectifynull = 0, recursivemode = 0) { let entries = Object.entries(object); entries.forEach((v, i) => { if (v[1] instanceof Array) {
    entries[i][1] = stringify(v[1], entriesmode, escapedarrayorobjecttag, objectifyinfinity, objectifynan, objectifynull, objectifyundefined, 1);
}
else if (v[1] instanceof Object) {
    entries[i][1] = stringify(v[1], entriesmode, escapedarrayorobjecttag, objectifyinfinity, objectifynan, objectifynull, objectifyundefined, 1);
}
else if (v[1] instanceof Function) {
    entries[i][1] = { escval: v[1].toString() };
}
else if (v[1] == Infinity && Boolean(objectifyinfinity)) {
    entries[i][1] = { escval: "Infinity" };
}
else if (v[1] == -Infinity && Boolean(objectifyinfinity)) {
    entries[i][1] = { escval: "-Infinity" };
}
else if (Number.isNaN(v[1]) && Boolean(objectifynan)) {
    entries[i][1] = { escval: "NaN" };
}
else if (v[1] == undefined && Boolean(objectifyundefined)) {
    entries[i][1] = { escval: "undefined" };
}
else if (v[1] == null && Boolean(objectifynull)) {
    entries[i][1] = { escval: "null" };
} }); return recursivemode ? ((Boolean(escapedarrayorobjecttag) && (((object instanceof Array) && !Boolean(entriesmode)) || ((object instanceof Object) && Boolean(entriesmode)))) ? (Boolean(entriesmode) ? { escobj: entries } : { escarray: Object.fromEntries(entries) }) : (Boolean(entriesmode) ? entries : Object.fromEntries(entries))) : JSONStringify(Boolean(entriesmode) ? entries : Object.fromEntries(entries), true); }
;
export function cullNull(array) { return array.filter(v => v !== null); }
export function cullUndefined(array) { return array.filter(v => v !== undefined); }
export function cullEmpty(array) { return array.filter(v => !!v); }
export function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
export function tryget(callbackfn) { try {
    return callbackfn();
}
catch { } }
export function tryrun(callbackfn) { try {
    callbackfn();
}
catch { } }
export function catchtry(trycallbackfn, catchcallbackfn = (e) => console.error(e, e.stack), finallycallbackfn = (v) => { return v; }) { let v; v = undefined; try {
    v = trycallbackfn();
}
catch (e) {
    v = catchcallbackfn(e) ?? v;
}
finally {
    return finallycallbackfn(v) ?? v;
} }
;
export function cinfo(...data) { console.info(data); }
;
export function clog(...data) { console.log(data); }
;
export function cwarn(...data) { console.warn(data); }
;
export function cerror(...data) { console.error(data); }
;
export function send(message) { world.sendMessage(message); }
;
export function asend(value) { world.sendMessage(String(value)); }
;
export function bsend(value) { world.sendMessage(JSONStringify(value, true)); }
;
export function csend(value) { world.sendMessage(JSON.stringify(value)); }
;
export function psend(player, value) { player.sendMessage(value); }
;
export function pasend(player, value) { player.sendMessage(String(value)); }
;
export function pbsend(player, value) { player.sendMessage(JSONStringify(value, true)); }
;
export function pcsend(player, value) { player.sendMessage(JSON.stringify(value)); }
;
export function perror(player, error, prefix = "§c") { player.sendMessage(prefix + error + " " + error.stack); }
;
export function splitTextByMaxProperyLength(string) { let length = string.length / 32767; let substringlist; substringlist = []; for (let i = 0; i < Math.ceil(length); i++) {
    substringlist.push(string.slice((i - 1) * 32767, i == Math.ceil(length) ? string.length : i * 32767));
} ; return substringlist; }
;
export function getParametersFromString(string) {
    function arrayModifier(sourcearray, callbackfn, overwrite = false) {
        if (overwrite) {
            sourcearray.forEach((v, i, a) => {
                sourcearray[i] = callbackfn(v, i, a);
            });
            return sourcearray;
        }
        else {
            let newarray;
            newarray = [];
            sourcearray.forEach((v, i, a) => {
                newarray[i] = callbackfn(v, i, a);
            });
            return newarray;
        }
    }
    ;
    const getStringsFromString = (ce) => {
        let cd = Array.from(ce.matchAll(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))".*?(?<!(?:(?:[^\\]\\)(?:\\\\)*))"/gis));
        cd.forEach((v, i) => cd[i].indices = [[v?.index, v?.index + v[0]?.length]]);
        let cc = [];
        cc.push({ t: "non-json", v: ce.substring(0, cd[0]?.indices[0][0]) });
        cd.forEach((v, i) => {
            cc.push({ t: "json", v: v[0] });
            cc.push({ t: "non-json", v: ce.substring(v?.indices[0][1], cd[i + 1]?.indices[0][0] ?? ce.length) });
        });
        return cc;
    };
    let rawdata = extractJSONStrings(string);
    let a = rawdata;
    let b = string;
    let c = [];
    c.push(...getStringsFromString(b.substring(0, a[0]?.indices[0][0])));
    a.forEach((v, i) => {
        c.push({ t: "json", v: v[0] });
        c.push(...getStringsFromString(b.substring(v?.indices[0][1], a[i + 1]?.indices[0][0] ?? b.length)));
    });
    let e = [];
    let d = arrayModifier(c, (cb, i) => arrayModifier((cb.t == "json" ? [cb.v] : String(cb.v).trimStart().trimEnd().split(/\x20+?/g)), v => {
        if (v instanceof Function) {
            return { s: v, v: v.toString() };
        }
        else {
            try {
                return { s: v, v: JSONParse(String(v)) };
            }
            catch (f) {
                e.push({ i: i, v: f });
                return { s: v, v: String(v) };
            }
        }
    }), false);
    let f = [];
    arrayModifier(d, d => arrayModifier(d, d => d.v)).forEach(d => f.push(...d));
    let h = [];
    d.forEach(d => h.push(...d));
    return {
        rawdata: a,
        input: b,
        resultAndTypeList: c,
        separatedResultList: arrayModifier(d, d => arrayModifier(d, d => d.v)),
        errors: e,
        unfilteredresults: f,
        results: f.filter(f => f != ""),
        unfilteredresultsincludingunmodified: h,
        resultsincludingunmodified: h.filter(h => h.v != "")
    };
}
export function getParametersFromExtractedJSON(rawdata) {
    function arrayModifier(sourcearray, callbackfn, overwrite = false) {
        if (overwrite) {
            sourcearray.forEach((v, i, a) => {
                sourcearray[i] = callbackfn(v, i, a);
            });
            return sourcearray;
        }
        else {
            let newarray;
            newarray = [];
            newarray.forEach((v, i, a) => {
                newarray[i] = callbackfn(v, i, a);
            });
            return newarray;
        }
    }
    ;
    const getStringsFromString = (ce) => {
        let cd = Array.from(ce.matchAll(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))".*?(?<!(?:(?:[^\\]\\)(?:\\\\)*))"/gis));
        cd.forEach((v, i) => cd[i] = Object.assign(cd[i], { indices: [[v?.index, v?.index + v[0]?.length]] }));
        let cc = [];
        cc.push({
            t: "non-json",
            v: ce.substring(0, cd[0]?.indices[0][0])
        });
        cd.forEach((v, i) => {
            cc.push({
                t: "json",
                v: v[0]
            });
            cc.push({
                t: "non-json",
                v: ce.substring(v?.indices[0][1], cd[0][i + 1]?.indices[0][0] ?? ce.length)
            });
        });
        return cc;
    };
    let a = rawdata;
    let b = rawdata[0].input;
    let c = [];
    c.push(...getStringsFromString(b.substring(0, a[0]?.indices[0][0])));
    a.forEach((v, i) => {
        c.push({ t: "json", v: v[0] });
        c.push(...getStringsFromString(b.substring(v?.indices[0][1], a[i + 1]?.indices[0][0] ?? b.length)));
    });
    c;
    let e = [];
    let d = arrayModifier(c, (cb, i) => arrayModifier((cb.t == "json" ? [cb.v] : String(cb.v).trimStart().trimEnd().split(/\x20+?/g)), v => {
        if (v instanceof Function) {
            return { s: v, v: v.toString() };
        }
        else {
            try {
                return { s: v, v: JSONParse(String(v)) };
            }
            catch (f) {
                e.push({ i: i, v: f });
                return { s: v, v: String(v) };
            }
        }
    }), false);
    let f = [];
    arrayModifier(d, d => arrayModifier(d, d => d.v)).forEach(d => f.push(...d));
    let h = [];
    d.forEach(d => h.push(...d));
    return {
        input: a,
        originalinput: b,
        resultAndTypeList: c,
        separatedResultList: d,
        errors: e,
        unfilteredresults: f,
        results: f.filter(f => f != ""),
        unfilteredresultsincludingunmodified: h,
        resultsincludingunmodified: h.filter(f => f.v != "")
    };
}
export function extractJSONStrings(inputString, includeOtherResultData = true) {
    const jsonStringArray = [];
    let currentIndex = 0;
    let inquotes = false;
    while (currentIndex < inputString.length) {
        let currentChar = inputString[currentIndex];
        if (inputString[currentIndex] == "\"" && !!inputString.slice(0, currentIndex + 1).match(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))"$/g)) {
            inquotes = !inquotes;
        }
        // Find potential start of JSON string
        if ((currentChar === '{' || currentChar === '[') && !inquotes) {
            let jsonString = '';
            let openBrackets = 0;
            let closeBrackets = 0;
            // Iterate until balanced brackets are found
            for (let i = currentIndex; i < inputString.length; i++) {
                jsonString += inputString[i];
                if ((inputString[i] === '{' || inputString[i] === '[') && !inquotes) {
                    openBrackets++;
                }
                else if ((inputString[i] === '}' || inputString[i] === ']') && !inquotes) {
                    closeBrackets++;
                }
                if (inputString[i] == "\"" && !!inputString.slice(0, i + 1).match(/(?<!(?:(?:[^\\]\\)(?:\\\\)*))"$/g)) {
                    inquotes = !inquotes;
                }
                // If brackets are balanced, attempt to parse JSON
                if (openBrackets === closeBrackets) {
                    try {
                        JSONParse(jsonString); // Attempt to parse JSON
                        jsonStringArray.push(includeOtherResultData ? (() => {
                            let atest = Array.from((" ".repeat(currentIndex) + inputString.slice(currentIndex))?.matchAll(new RegExp("")?.compile("" + escapeRegExp(jsonString) + "", `g`)))[0];
                            atest.indices = [[atest?.index, atest?.index + atest[0]?.length]];
                            try {
                                atest.value = JSONParse(atest[0]);
                            }
                            catch (e) {
                                atest.value = atest[0];
                            }
                            ;
                            try {
                                atest.modifiedinput = structuredClone(atest.input);
                            }
                            catch (e) {
                                atest.modifiedinput = atest.input;
                            }
                            ;
                            atest.input = inputString;
                            atest.evaluationindex = currentIndex;
                            return atest;
                        })() : jsonString); // Convert string into RegExp match data, then push valid JSON string to array. 
                        currentIndex = i;
                        break;
                    }
                    catch (error) {
                        // Invalid JSON, continue searching
                    }
                }
            }
        }
        currentIndex++;
    }
    return jsonStringArray;
}
export function customModulo(dividend, min, max, inclusive = false) {
    inclusive = Number(inclusive);
    max += inclusive;
    if (min >= max) {
        throw new Error('Invalid range: min value must be less than max value');
    }
    if (!Number.isFinite(dividend)) {
        return dividend;
    }
    if (dividend < min) {
        const range = max - min;
        return customModulo(dividend + range, min, max);
    }
    if (dividend >= max) {
        const range = max - min;
        return customModulo(dividend - range, min, max);
    }
    return dividend;
}
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
;
export function jsonFromString(str, useBetterJSONParse = true) {
    const regex = /([{\["]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]"]{1}|["]{1}(([^(")]|\\")*)+(?<!\\)["]){1}/gis;
    const matches = str.match(regex);
    if (useBetterJSONParse)
        return matches.map((m) => JSONParse(m));
    else
        return matches.map((m) => JSON.parse(m));
}
export function shootProjectile(entityType, location, velocity, shootOptions = {}, setProjectileComponentPropertiesCallbackFn = (a) => { }) { let entityProjectileComponent = location.dimension.spawnEntity(String(entityType), location).getComponent("projectile"); try {
    setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
}
catch (e) {
    console.error(e, e.stack);
} ; entityProjectileComponent?.shoot(velocity, shootOptions); }
;
export function shootEntity(entityType, location, velocity, setProjectileComponentPropertiesCallbackFn = (a) => { }) { let entity = location.dimension.spawnEntity(String(entityType), location); try {
    setProjectileComponentPropertiesCallbackFn(entity);
}
catch (e) {
    console.error(e, e.stack);
} ; entity.applyImpulse(velocity); }
;
export function shootProjectileB(entityType, location, rotation, power, shootOptions = {}, setProjectileComponentPropertiesCallbackFn = (a) => { }) { let entityProjectileComponent = location.dimension.spawnEntity(String(entityType), location).getComponent("projectile"); try {
    setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
}
catch (e) {
    console.error(e, e.stack);
} ; entityProjectileComponent?.shoot(caretNotationC(mcMath.VECTOR3_ZERO, v3Multiply(mcMath.VECTOR3_FORWARD, power), rotation), shootOptions); }
;
export function shootEntityB(entityType, location, rotation, power, setProjectileComponentPropertiesCallbackFn = (a) => { }) { let entity = location.dimension.spawnEntity(String(entityType), location); try {
    setProjectileComponentPropertiesCallbackFn(entity);
}
catch (e) {
    console.error(e, e.stack);
} ; entity.applyImpulse(caretNotationC(mcMath.VECTOR3_ZERO, v3Multiply(mcMath.VECTOR3_FORWARD, power), rotation)); }
;
//# sourceMappingURL=utilities.js.map