import { type RawMessage, Player, Dimension } from "@minecraft/server";
import Decimal from "decimal.js";
import { MoneySystem } from "ExtraFeatures/money";
import type { executeCommandPlayerW } from "Main/commands";
import type { RotationLocation } from "Main/coordinates";
import type { PlayerNotifications } from "Main/ui";
declare global {
    interface String {
        escapeCharacters(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): string;
        escapeCharactersB(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): {
            v: string;
            e?: Error[];
        };
        /** Returns a number representation of an object. */
        toNumber(): number | undefined;
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint | undefined;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        /** The initial value of String.prototype.constructor is the standard built-in String constructor. */
        constructor: Function;
        /** Returns a date converted to a string using the current locale. */
        toLocaleString(): string;
        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;
        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;
        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any) => void): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => void) | undefined;
        get __proto__(): String;
        set __proto__(prototype: Object | null);
    }
    interface Number {
        /** Returns a number representation of an object. */
        toNumber(): ReturnType<this["valueOf"]>;
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        toRomanNumerals(limits?: [min: number, max: number], valueFor0?: string): string;
        /** Returns whether or not the number is NaN. */
        isNaN(): boolean;
        /** Returns whether or not the number is finite. */
        isFinite(): boolean;
        /** Returns whether or not the number is an integer. */
        isInteger(): boolean;
        /** Returns whether or not the number is a safe integer. */
        isSafeInteger(): boolean;
        /** Returns whether or not the number is even. */
        isEven(): boolean;
        /** Returns whether or not the number is odd. */
        isOdd(): boolean;
        /** Runs the Math.floor() function on the number. */
        floor(): number;
        /** Runs the Math.round() function on the number. */
        round(): number;
        /** Runs the Math.ceil() function on the number. */
        ceil(): number;
        /** The initial value of Number.prototype.constructor is the standard built-in Number constructor. */
        constructor: Function;
        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;
        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;
        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any) => void): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => void) | undefined;
        get __proto__(): Number;
        set __proto__(prototype: Object | null);
    }
    interface BigInt {
        /** Returns a number representation of an object. */
        toNumber(): number;
        /** Returns a bigint representation of an object. */
        toBigInt(): ReturnType<this["valueOf"]>;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        toRomanNumerals(limits?: [min: bigint, max: bigint], valueFor0n?: string): string;
        /** The initial value of Number.prototype.constructor is the standard built-in Number constructor. */
        constructor: Function;
        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;
        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;
        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any) => void): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => void) | undefined;
        get __proto__(): BigInt;
        set __proto__(prototype: Object | null);
    }
    interface Array<T> {
        /**
         * Performs the specified action for each element in an array and will include the current index in any errors.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEachB(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    }
    interface Boolean {
        toFormattedString(): "§aTrue" | "§cFalse";
        toFormattedStringB(): "§2True" | "§4False";
        toFormattedStringED(): "§aEnabled" | "§cDisabled";
        toFormattedStringEDB(): "§2Enabled" | "§4Disabled";
        toFormattedStringIO(): "§aON" | "§cOFF";
        toFormattedStringIOB(): "§2ON" | "§4OFF";
        toFormattedStringIOL(): "§aOn" | "§cOff";
        toFormattedStringIOLB(): "§2On" | "§4Off";
        /** Returns a number representation of an object. */
        toNumber(): 0 | 1;
        /** Returns a number representation of an object. */
        toBigInt(): 0n | 1n;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        /** The initial value of Boolean.prototype.constructor is the standard built-in Boolean constructor. */
        constructor: Function;
        /** Returns a string representation of an object. */
        toString(): "true" | "false";
        /** Returns a date converted to a string using the current locale. */
        toLocaleString(): string;
        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;
        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;
        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any) => void): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => void) | undefined;
        get __proto__(): Boolean;
        set __proto__(prototype: Object | null);
    }
    interface Object {
        hasOwnProperty(v: keyof this): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this | string>(prop: P, func: Function): undefined;
        __defineSetter__<P extends keyof this | string>(prop: P, func: (val: any) => any): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => this[P]) | undefined;
        get __proto__(): Object;
        set __proto__(prototype: Object | null);
    }
    interface Error {
        stringify(): string;
    }
    class TimeoutError extends Error {
    }
    class ExpireError extends Error {
    }
    class NoSelectorMatchesError extends Error {
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
    class StorageFullError extends Error {
    }
    /**
     * An error for when something could not be parsed.
     * An example use case for this is when the thing
     * being parsed has a higher format version than
     * the current format version.
     * @since 1.26.0-preview.20+BUILD.1
     * @since 10/22/2024 5:48:28 PM
     */
    class ParseError extends Error {
    }
    namespace globalThis {
        var beforeInitializeTick: number;
        var initializeTick: number;
        var beforeScriptStartTick: number;
        var scriptStartTick: number;
        class InternalError extends Error {
        }
        function tfsa(sdsa284f83kd_38pqnv_38_f_0_vmewd_19mvndifekod_f8ufv4m3ddm1c0nvh289cmfue8hd9mjf3: unknown): unknown;
        var tempVariables: {
            [key: PropertyKey]: any;
        };
        function cullNull<T extends any[]>(array: T): any[];
        function cullUndefined<T extends any[]>(array: T): any[];
        function cullEmpty<T extends any[]>(array: T): any[];
        function tryget<T>(callbackfn: () => T): T;
        function tryrun(callbackfn: () => any): void;
        function catchtry(trycallbackfn: () => any, catchcallbackfn?: (e: Error) => any, finallycallbackfn?: (v: any) => any): any;
        function send(message: (RawMessage | string)[] | RawMessage | string): void;
        function asend(value: any): void;
        function bsend(value: any, space?: string | number): void;
        function csend(value: any, space?: string | number): void;
        function dsend(value: any, space?: string | number): void;
        function esend(value: any, space?: string | number): void;
        function fsend(value: any, space?: string | number): void;
        function bcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function ccsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function dcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function ecsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function fcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function psend(player: Player | executeCommandPlayerW, value: string): void;
        function pasend(player: Player | executeCommandPlayerW, value: any): void;
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONStringify}.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pbsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void;
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSON.stringify}.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void;
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pdsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void;
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pesend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void;
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pfsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void;
        /**
         * @remarks The same as {@link pbsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pbcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        /**
         * @remarks The same as {@link pcsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pccsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        /**
         * @remarks The same as {@link pdsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pdcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        /**
         * @remarks The same as {@link pesend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pecsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        /**
         * @remarks The same as {@link pfsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pfcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void;
        function perror(player: Player | executeCommandPlayerW, error: Error, prefix?: string): void;
        /**
         * @remarks Triggers a breakpoint when run while the {@link https://marketplace.visualstudio.com/items?itemName=mojang-studios.minecraft-debugger Visual Studio Code Minecraft Debugger Extension} is connected via the /script command.
         * @since 1.26.0-rc.2+BUILD.1
         * @since 11/7/2024 11:25 AM PST
         * @version 1.0.0
         */
        function breakpoint(): void;
        /**
         * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values.
         * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed).
         * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true.
         * @returns {any} The parsed JSON data.
         */
        function JSONParseOld(text: string, keepUndefined?: boolean): any;
        /**
         * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values.
         * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed).
         * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false.
         * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
         * @returns {any} The JSON string.
         */
        function JSONStringifyOld(value: any, keepUndefined?: boolean, space?: string | number): string;
        function JSONParse(JSONString: string, keepUndefined?: boolean): any;
        function JSONStringify(JSONObject: any, keepUndefined?: boolean, space?: string | number): string;
        function iterateGenerator<TY, TR, TN>(extractorGenerator: Generator<TY, TR, TN>, maxTimePerTick?: number, whileConditions?: boolean | number | string | Function): Promise<TY | TR>;
        function completeGenerator<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean | number | string | Function): Promise<{
            yield: T;
            return: TReturn;
        }>;
        function completeGeneratorB<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean): Promise<{
            yield: T[];
            return: TReturn;
        }>;
        function waitTick(): Promise<void>;
        function waitTicks(ticks?: number): Promise<void>;
        function testForObjectExtension(objectToTest: object, base: object): boolean;
        function testForObjectTypeExtension(objectToTest: object, base: object): boolean;
        var subscribedEvents: {
            [eventName: string]: Function;
        };
        var repeatingIntervals: {
            worldBorderSystem?: number;
            protectedAreasRefresher?: number;
            bannedPlayersChecker?: number;
            playerDataAutoSave?: number;
            [intervalName: string]: number;
        };
        var entity_scale_format_version: string | null;
        var multipleEntityScaleVersionsDetected: boolean;
        function twoWayModulo(number: number, modulo: number): number;
        function clamp24HoursTo12Hours(hours: number): number;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * @since 1.18.2-development.3
         * @version 1.1.1
         */
        function formatTime<includeMs extends boolean>(date: Date, timeZoneOffset?: number, includeMs?: includeMs): includeMs extends unknown ? `${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : includeMs extends false ? `${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : `${bigint}:${bigint}:${bigint}.${bigint} ${"A" | "P"}M`;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * @since 1.18.2-development.10
         * @version 1.1.1
         */
        function formatDateTime<includeMs extends boolean>(date: Date, timeZoneOffset?: number, includeMs?: includeMs): includeMs extends unknown ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : includeMs extends false ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint}.${bigint} ${"A" | "P"}M`;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        function formatDate(date: Date, timeZoneOffset?: number): string;
        /**
         *
         * @param json
         * @param options
         * @default
         * enum options = {
         *     number = "§6",
         *     key = "§e",
         *     string = "§q",
         *     true = "§a",
         *     false = "§c",
         *     null = "§d",
         *     undefined = "§d"
         *     bigint = "§g",
         *     leftCurlyBracket = "§9",
         *     rightCurlyBracket = "§9",
         *     leftSquareBracket = "§5",
         *     rightSquareBracket = "§5",
         *     comma = "§f",
         * }
         */
        function colorizeJSONString(json: string | object, options?: {
            number?: string;
            key?: string;
            string?: string;
            true?: string;
            false?: string;
            null?: string;
            bigint?: string;
            leftCurlyBracket?: string;
            rightCurlyBracket?: string;
            leftSquareBracket?: string;
            rightSquareBracket?: string;
            comma?: string;
            undefined?: string;
        }): string;
    }
    class globalThis {
        static get overworld(): Dimension & {
            typeId: "minecraft:overworld";
        };
        static get nether(): Dimension & {
            typeId: "minecraft:nether";
        };
        static get the_end(): Dimension & {
            typeId: "minecraft:the_end";
        };
        static get players(): {
            [name: string]: Player;
        };
        static get stack(): Error["stack"];
        static get Decimal(): typeof Decimal;
        /**
         * @see {@link modules.colorCore.Color}
         */
        static get Color(): typeof globalThis.modules.colorCore.Color;
        /**
         * @see {@link modules.colorCore}
         */
        static get colorCore(): typeof globalThis.modules.colorCore;
        /**
         * @see {@link modules.semver.SemVer}
         */
        static get SemVer(): typeof globalThis.modules.semver.SemVer;
        /**
         * @see {@link modules.semver}
         */
        static get semver(): typeof globalThis.modules.semver;
        /**
         * @see {@link globalThis}
         */
        static get gt(): typeof globalThis;
        /**
         * This is an alias of {@link system.run}.
         * @see {@link modules.main.srun}
         * @remarks
         * Runs a specified function at the next available future time.
         * This is frequently used to implement delayed behaviors and
         * game loops. When run within the context of an event handler,
         * this will generally run the code at the end of the same tick
         * where the event occurred. When run in other code (a
         * system.run callout), this will run the function in the next
         * tick. Note, however, that depending on load on the system,
         * running in the same or next tick is not guaranteed.
         *
         * @param callback
         * Function callback to run at the next game tick.
         * @returns
         * An opaque identifier that can be used with the `clearRun`
         * function to cancel the execution of this run.
         * @example trapTick.ts
         * ```typescript
         * import { system, world } from '@minecraft/server';
         *
         * function printEveryMinute() {
         *     try {
         *         // Minecraft runs at 20 ticks per second.
         *         if (system.currentTick % 1200 === 0) {
         *             world.sendMessage('Another minute passes...');
         *         }
         *     } catch (e) {
         *         console.warn('Error: ' + e);
         *     }
         *
         *     system.run(printEveryMinute);
         * }
         *
         * printEveryMinute();
         * ```
         */
        static get srun(): typeof modules.main.srun;
        /**
         * A class containing the configuration information for the add-on.
         * @see {@link modules.main.config}
         */
        static get config(): typeof modules.main.config;
    }
    interface Date {
        /**
         * The timezone, specified as the hours offset from UTC.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number;
        /**
         * Sets the timezone property of this Date object.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        toTimezone(timezone?: number | string | boolean | null | undefined): this;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDateTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDate(timezone?: number | string | boolean | null | undefined, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatDateTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        formatDate(timeZoneOffset?: number, includeTimeZoneOffset?: boolean): string;
    }
    interface Function {
        readonly lineNumber: number;
        readonly fileName: string;
    }
    interface Class {
        readonly lineNumber: number;
        readonly fileName: string;
    }
}
declare module '@minecraft/server' {
    interface Entity {
        /**
         * Defines this entity's inventory properties.
         */
        get inventory(): EntityInventoryComponent | undefined;
        /**
         * Provides access to a mob's equipment slots. This component
         * exists for all mob entities.
         * @example givePlayerElytra.ts
         * ```typescript
         * // Gives the player Elytra
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.Elytra));
         *     }
         * }
         * ```
         * @example givePlayerEquipment.ts
         * ```typescript
         * // Gives the player some equipment
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Head, new ItemStack(MinecraftItemTypes.GoldenHelmet));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.IronChestplate));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Legs, new ItemStack(MinecraftItemTypes.DiamondLeggings));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Feet, new ItemStack(MinecraftItemTypes.NetheriteBoots));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Mainhand, new ItemStack(MinecraftItemTypes.WoodenSword));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Offhand, new ItemStack(MinecraftItemTypes.Shield));
         *     } else {
         *         console.warn('No equipment component found on player');
         *     }
         * }
         * ```
         */
        get equippable(): EntityEquippableComponent | undefined;
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent | undefined;
        get heldItem(): ItemStack | undefined;
        get activeSlot(): ContainerSlot | undefined;
        get moneySystem(): MoneySystem;
        get playerNotifications(): PlayerNotifications;
        get dimensionLocation(): DimensionLocation;
        get locationstring(): `${number} ${number} ${number}`;
        get rotationstring(): `${number} ${number}`;
        get locationrotation(): RotationLocation;
        get directionvector(): Vector3;
        get xy(): Vector2;
        get yz(): VectorYZ;
        get xz(): VectorXZ;
        get chunkIndex(): VectorXZ;
        get x(): number;
        get y(): number;
        get z(): number;
        get rotx(): number;
        get roty(): number;
        get timeZone(): number;
        set timeZone(timezone: number | string | boolean | null | undefined);
    }
    interface Player {
        /**
         * Defines this entity's inventory properties.
         */
        get inventory(): EntityInventoryComponent;
        /**
         * Provides access to a mob's equipment slots. This component
         * exists for all mob entities.
         * @example givePlayerElytra.ts
         * ```typescript
         * // Gives the player Elytra
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.Elytra));
         *     }
         * }
         * ```
         * @example givePlayerEquipment.ts
         * ```typescript
         * // Gives the player some equipment
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Head, new ItemStack(MinecraftItemTypes.GoldenHelmet));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.IronChestplate));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Legs, new ItemStack(MinecraftItemTypes.DiamondLeggings));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Feet, new ItemStack(MinecraftItemTypes.NetheriteBoots));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Mainhand, new ItemStack(MinecraftItemTypes.WoodenSword));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Offhand, new ItemStack(MinecraftItemTypes.Shield));
         *     } else {
         *         console.warn('No equipment component found on player');
         *     }
         * }
         * ```
         */
        get equippable(): EntityEquippableComponent;
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Player.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent;
        get activeSlot(): ContainerSlot;
    }
    interface ItemStack {
        hasComponent(componentId: keyof ItemComponentTypeMap): boolean;
    }
    interface VectorYZ {
        y: number;
        z: number;
    }
}
declare module '@minecraft/server-ui' {
    interface ModalFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ModalFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ModalFormResponse>;
    }
    interface MessageFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {MessageFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<MessageFormResponse>;
    }
    interface ActionFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ActionFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ActionFormResponse>;
    }
}
