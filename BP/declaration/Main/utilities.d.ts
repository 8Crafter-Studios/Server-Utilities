import { Player, Entity, type DimensionLocation, type Vector3, type Vector2, type RawMessage, EntityType, EntityProjectileComponent, type RGBA, type RGB } from "@minecraft/server";
import * as mcServer from "@minecraft/server";
import colorCore from "color-core";
export declare const utilsmetaimport: ImportMeta;
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
export declare function fixedPositionNumberObject(object: Object, decimals?: number): {
    [k: string]: any;
};
export declare function roundPlaceNumberObject(object: Object, place?: number): {
    [k: string]: any;
};
/**
 * @deprecated
 */
export declare function arrayModifierOld(array: any[], callbackfn: (value: any, index: number, array: any[]) => any): any[];
/**
 * @deprecated
 */
export declare function arrayModifier<T>(sourcearray: T[], callbackfn: (value: T, index: number, array: T[]) => any, overwrite?: boolean): any[];
export declare function objectify(object: Object | any[]): {
    [k: string]: any;
};
export declare function arrayify(object: Object | any[]): [string, any][];
export declare function stringify(object: Object | any[], entriesmode?: boolean | 1 | 0, escapedarrayorobjecttag?: boolean | 1 | 0, objectifyinfinity?: boolean | 1 | 0, objectifynan?: boolean | 1 | 0, objectifyundefined?: boolean | 1 | 0, objectifynull?: boolean | 1 | 0, recursivemode?: boolean | 1 | 0): string | [string, any][] | {
    [k: string]: any;
};
export declare function shuffle<a>(array: a[]): a[];
export declare function splitTextByMaxProperyLength(string: string): string[];
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
export declare function shootProjectile(entityType: string | EntityType, location: DimensionLocation, velocity: Vector3, shootOptions?: mcServer.ProjectileShootOptions, setProjectileComponentPropertiesCallbackFn?: (EntityProjectileComponent: EntityProjectileComponent) => any): void;
export declare function shootEntity(entityType: string | EntityType, location: DimensionLocation, velocity: Vector3, setProjectileComponentPropertiesCallbackFn?: (entity: Entity) => any): void;
export declare function shootProjectileB(entityType: string | EntityType, location: DimensionLocation, rotation: Vector2, power: number, shootOptions?: mcServer.ProjectileShootOptions, setProjectileComponentPropertiesCallbackFn?: (entityProjectileComponent: EntityProjectileComponent) => any): void;
export declare function shootEntityB(entityType: string | EntityType, location: DimensionLocation, rotation: Vector2, power: number, setProjectileComponentPropertiesCallbackFn?: (entity: Entity) => any): void;
export declare function splitUpStringData(data: string, chunkSize?: number | bigint): string[];
export declare function saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
export declare function getStringFromDynamicProperties(propertyName: string): string;
export declare function showMessage(player: Player, title?: RawMessage | string, body?: string, button1?: string, button2?: string): Promise<any>;
export declare function showActions(player: Player, title?: RawMessage | string, body?: string, ...buttons: [string, string?][]): Promise<any>;
export declare function getSuperUniqueID(): string;
export declare function getSuperUniqueID2(depth?: number): string;
export declare function RGBToHSL(r: number, g: number, b: number): number[];
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export declare function HSLToRGB(h: number, s: number, l: number): [r: number, g: number, b: number];
export declare function HueToRGB(p: number, q: number, t: number): number;
export declare function mcRGBAToColorCoreRGB(rgba: RGBA): colorCore.RGB;
export declare function mcRGBToColorCoreRGB(rgba: RGB): colorCore.RGB;
