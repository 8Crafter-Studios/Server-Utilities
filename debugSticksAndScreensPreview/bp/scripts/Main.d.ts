export declare const format_version = "1.5.0";
import "BlockEventTests.js";
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js";
import "GameTestExtensions.js";
import "SimulatedPlayerTests.js";
import "ItemEnchantmentsTests.js";
import "Main/coordinates.js";
import "Main/commands.js";
import "Main/ban.js";
import "Main/ui.js";
import "Main/player_save.js";
import "Main/spawn_protection.js";
import { Block, Dimension, Entity, Player, type Vector3 } from "@minecraft/server";
import { ban } from "Main/ban";
import { savedPlayer } from "Main/player_save.js";
export declare const timeZones: (string[] | number[])[];
export declare class worldPlayers {
    rotx: number;
    roty: number;
    dimension?: Dimension;
    entity?: Entity;
    block?: Block;
    static get savedPlayers(): savedPlayer[];
    static get bans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
}
export declare function fixedPositionNumberObject(object: Object, decimals?: number): {
    [k: string]: any;
};
export declare function roundPlaceNumberObject(object: Object, place?: number): {
    [k: string]: any;
};
export declare function arrayModifierOld(array: any[], callbackfn: (value: any, index: number, array: any[]) => any): any[];
export declare function arrayModifier<T>(sourcearray: T[], callbackfn: (value: T, index: number, array: T[]) => any, overwrite?: boolean): any[];
export declare function getArrayElementProperty(array: any[], property: string): any[];
export declare function combineObjects(obj1: object, obj2: object): {
    [k: string]: any;
};
export declare function generateCUID(classid?: string): number;
export declare function getCUIDClasses(): string[];
export declare function generateAIID(classid?: string): number;
export declare function getAIIDClasses(): string[];
export declare function generateTUID(): string | number;
export declare function toBase(num: any, radix?: number, keysa?: string): string | number;
export declare function fromBaseToBase(num: any, base?: number, radix?: number, keysa?: string): string | number;
/**
 * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values.
 * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true.
 * @returns {any} The parsed JSON data.
 */
export declare function JSONParseOld(text: string, keepUndefined?: boolean): any;
/**
 * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values.
 * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed).
 * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false.
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns {any} The JSON string.
 */
export declare function JSONStringifyOld(value: any, keepUndefined?: boolean, space?: string | number): string;
export declare function JSONParse(JSONString: string, keepUndefined?: boolean): any;
export declare function objectify(object: Object | any[]): {
    [k: string]: any;
};
export declare function arrayify(object: Object | any[]): [string, any][];
export declare function stringify(object: Object | any[], entriesmode?: boolean | 1 | 0, escapedarrayorobjecttag?: boolean | 1 | 0, objectifyinfinity?: boolean | 1 | 0, objectifynan?: boolean | 1 | 0, objectifyundefined?: boolean | 1 | 0, objectifynull?: boolean | 1 | 0, recursivemode?: boolean | 1 | 0): string | [string, any][] | {
    [k: string]: any;
};
export declare function JSONStringify(JSONObject: Object, keepUndefined?: boolean, space?: string | number): string;
export declare function getParametersFromString(string: string): {
    rawdata: any[] | RegExpMatchArray[];
    input: string;
    resultAndTypeList: {
        t: string;
        v: string;
    }[];
    separatedResultList: {
        s: string;
        v: any;
    }[];
    errors: {
        i: number;
        v: Error;
    }[];
    unfilteredresults: any[];
    results: any[];
    unfilteredresultsincludingunmodified: {
        s: string;
        v: any;
    }[];
    resultsincludingunmodified: {
        s: string;
        v: any;
    }[];
};
export declare function getParametersFromExtractedJSON(rawdata: RegExpMatchArray[]): {
    input: RegExpMatchArray[];
    originalinput: string;
    resultAndTypeList: any[];
    separatedResultList: {
        s: string;
        v: any;
    }[][];
    errors: any[];
    unfilteredresults: any[];
    results: any[];
    unfilteredresultsincludingunmodified: any[];
    resultsincludingunmodified: any[];
};
export declare function extractJSONStrings(inputString: string, includeOtherResultData?: boolean): any[];
export declare function customModulo(dividend: number, min: number, max: number, inclusive?: number | boolean): number;
export declare function escapeRegExp(string: string): string;
export declare function jsonFromString(str: string, useBetterJSONParse?: boolean): any[];
export declare function targetSelector(selector: string, filters: string, UUID: number): number;
export declare function targetSelectorB(selector: string, filters: string, UUID: number): Entity;
export declare class interactable_blockb {
    id: string;
    delay: number;
    holdDuration?: number;
}
export declare let interactable_block: interactable_blockb[];
export declare class customFormUIElement {
    index: number;
    type: String;
    args: String[];
    code: String;
    typeIndex: number;
    constructor(index: number, type: String, args: String[]);
}
export declare function strToCustomFormUIElement(string: string): customFormUIElement;
export declare function arrayToElementList(ids: String[], array: String[]): customFormUIElement[];
export declare function getUICustomForm(optionsids: string, codeids: string): {
    optionPropertyIds: string[];
    optionPropertyValues: string[];
    optionElements: customFormUIElement[];
    codeIds: string[];
    codeValues: string[];
    code: string;
};
export declare function targetSelectorAllListB(selector: string, filters: string, UUID: number): Entity[];
export declare function targetSelectorAllListC(selector: string, filters: string, position: string, sourceEntityCommandExecution?: Entity | Player): Entity[];
export declare function targetSelectorAllListD(selector: string, position: string, dimension?: Dimension): Entity[];
export declare function targetSelectorAllListE(selector: string, position: string): Entity[];
export declare function debugActionb(block: Block, player: Player, mode: number, direction?: number): void;
export declare function debugAction(block: Block, player: Player, mode: number, direction?: number): void;
export declare function getTopSolidBlock(location: Vector3, dimension: Dimension): Block;
declare global {
    interface String {
        escapeCharacters(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): string;
        escapeCharactersB(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): {
            v: string;
            e?: Error[];
        };
    }
}
