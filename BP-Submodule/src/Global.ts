import { system, Entity, type RawMessage, world, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, EquipmentSlot, ContainerSlot, Player, type Vector3, type VectorXZ, type Vector2, type VectorYZ, Dimension } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData, type ActionFormResponse, type MessageFormResponse, type ModalFormResponse } from "@minecraft/server-ui";
import Decimal from "decimal.js";
import { MoneySystem } from "ExtraFeatures/money";
import type { executeCommandPlayerW } from "Main/commands";
import type { RotationLocation } from "Main/coordinates";
import type { PlayerNotifications } from "Main/ui";
declare global {
    interface String {
        escapeCharacters(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): string;
        escapeCharactersB(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): {v: string, e?: Error[]};

        /** Returns a number representation of an object. */
        toNumber(): number|undefined;
    
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint|undefined;
    
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): String
        set __proto__(prototype: Object|null)
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): Number
        set __proto__(prototype: Object|null)
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): BigInt
        set __proto__(prototype: Object|null)
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
        toFormattedString(): "§aTrue"|"§cFalse"
        toFormattedStringB(): "§2True"|"§4False"
        toFormattedStringED(): "§aEnabled"|"§cDisabled"
        toFormattedStringEDB(): "§2Enabled"|"§4Disabled"
        toFormattedStringIO(): "§aON"|"§cOFF"
        toFormattedStringIOB(): "§2ON"|"§4OFF"
        toFormattedStringIOL(): "§aOn"|"§cOff"
        toFormattedStringIOLB(): "§2On"|"§4Off"
    
        /** Returns a number representation of an object. */
        toNumber(): 0|1;
    
        /** Returns a number representation of an object. */
        toBigInt(): 0n|1n;
    
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        /** The initial value of Boolean.prototype.constructor is the standard built-in Boolean constructor. */
        constructor: Function;
    
        /** Returns a string representation of an object. */
        toString(): "true"|"false";
    
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): Boolean
        set __proto__(prototype: Object|null)
    }
    interface Object {
        hasOwnProperty(v: keyof this): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this|string>(prop: P, func: Function): undefined
        __defineSetter__<P extends keyof this|string>(prop: P, func: (val: any)=>any): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>this[P])|undefined
        get __proto__(): Object
        set __proto__(prototype: Object|null)
    }
    interface Error {
        stringify(): string
    }
    class TimeoutError extends Error {}
    class ExpireError extends Error {}
    class NoSelectorMatchesError extends Error {}
    /**
     * An error for when the storage of something is full.
     * An example use case for this is for the a player
     * is selling an item at another player's player shop,
     * but the owner of the shop is out of storage inside of their
     * recieved player shop items storage entity's inventory. 
     * @since 1.23.0-preview.20+BUILD.1 
     * @since 10/03/2024 1:48 PM
     */
    class StorageFullError extends Error {}
    /**
     * An error for when something could not be parsed.
     * An example use case for this is when the thing
     * being parsed has a higher format version than
     * the current format version.
     * @since 1.26.0-preview.20+BUILD.1 
     * @since 10/22/2024 5:48:28 PM
     */
    class ParseError extends Error {}
    namespace globalThis {
        var beforeInitializeTick: number;
        var initializeTick: number;
        var beforeScriptStartTick: number;
        var scriptStartTick: number;
        class InternalError extends Error{}
        function tfsa(sdsa284f83kd_38pqnv_38_f_0_vmewd_19mvndifekod_f8ufv4m3ddm1c0nvh289cmfue8hd9mjf3: unknown): unknown
        var tempVariables: {[key: PropertyKey]: any}
        function cullNull<T extends any[]>(array: T): any[]
        function cullUndefined<T extends any[]>(array: T): any[]
        function cullEmpty<T extends any[]>(array: T): any[]
        function tryget<T>(callbackfn: () => T): T
        function tryrun(callbackfn: () => any): void
        function catchtry(trycallbackfn: () => any, catchcallbackfn?: (e: Error) => any, finallycallbackfn?: (v: any) => any): any
        function send(message: (RawMessage | string)[] | RawMessage | string): void
        function asend(value: any): void
        function bsend(value: any, space?: string | number): void
        function csend(value: any, space?: string | number): void
        function dsend(value: any, space?: string | number): void
        function esend(value: any, space?: string | number): void
        function fsend(value: any, space?: string | number): void
        function bcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function ccsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function dcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function ecsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function fcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function psend(player: Player | executeCommandPlayerW, value: string): void
        function pasend(player: Player | executeCommandPlayerW, value: any): void
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONStringify}.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pbsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSON.stringify}.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pdsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pesend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void
        /**
         * @remarks This function sends a player a message containing a stringified version of the JSON value passed in. It uses {@link JSONB.stringify} with the following options: `{bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}`.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         */
        function pfsend(player: Player | executeCommandPlayerW, value: any, space?: string | number): void
        /**
         * @remarks The same as {@link pbsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pbcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        /**
         * @remarks The same as {@link pcsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pccsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        /**
         * @remarks The same as {@link pdsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pdcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        /**
         * @remarks The same as {@link pesend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pecsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        /**
         * @remarks The same as {@link pfsend} except that it colorizes the outputted JSON string.
         * @param player The player to send the message to.
         * @param value The JSON to stringify.
         * @param space The spacing for the stringified JSON.
         * @param options The options for colorizing the JSON string.
         */
        function pfcsend(player: Player | executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]): void
        function perror(player: Player | executeCommandPlayerW, error: Error, prefix?: string): void
        /**
         * @remarks Triggers a breakpoint when run while the {@link https://marketplace.visualstudio.com/items?itemName=mojang-studios.minecraft-debugger Visual Studio Code Minecraft Debugger Extension} is connected via the /script command.
         * @since 1.26.0-rc.2+BUILD.1
         * @since 11/7/2024 11:25 AM PST
         * @version 1.0.0
         */
        function breakpoint(): void
        /**
         * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values. 
         * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed). 
         * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true. 
         * @returns {any} The parsed JSON data. 
         */
        function JSONParseOld(text: string, keepUndefined?: boolean): any
        /**
         * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values. 
         * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed). 
         * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false. 
         * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
         * @returns {any} The JSON string. 
         */
        function JSONStringifyOld(value: any, keepUndefined?: boolean, space?: string | number): string
        function JSONParse(JSONString: string, keepUndefined?: boolean): any
        function JSONStringify(JSONObject: any, keepUndefined?: boolean, space?: string | number): string
        function iterateGenerator<TY, TR, TN>(extractorGenerator: Generator<TY, TR, TN>, maxTimePerTick?: number, whileConditions?: boolean | number | string | Function): Promise<TY | TR>
        function completeGenerator<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean | number | string | Function): Promise<{
            yield: T;
            return: TReturn;
        }>
        function completeGeneratorB<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean): Promise<{
            yield: T[];
            return: TReturn;
        }>
        function waitTick(): Promise<void>
        function waitTicks(ticks?: number): Promise<void>
        function testForObjectExtension(objectToTest: object, base: object): boolean
        function testForObjectTypeExtension(objectToTest: object, base: object): boolean
        var subscribedEvents: {[eventName: string]: Function}
        var repeatingIntervals: {worldBorderSystem?: number, protectedAreasRefresher?: number, bannedPlayersChecker?: number, playerDataAutoSave?: number, [intervalName: string]: number}
        var entity_scale_format_version: string|null
        var multipleEntityScaleVersionsDetected: boolean
        function twoWayModulo(number: number, modulo: number): number
        function clamp24HoursTo12Hours(hours: number): number
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * @since 1.18.2-development.3
         * @version 1.1.1
         */
        function formatTime<includeMs extends boolean>(date: Date, timeZoneOffset?: number, includeMs?: includeMs): includeMs extends unknown ? `${bigint}:${bigint}:${bigint} ${"A"|"P"}M` : includeMs extends false ? `${bigint}:${bigint}:${bigint} ${"A"|"P"}M` : `${bigint}:${bigint}:${bigint}.${bigint} ${"A"|"P"}M`
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * @since 1.18.2-development.10
         * @version 1.1.1
         */
        function formatDateTime<includeMs extends boolean>(date: Date, timeZoneOffset?: number, includeMs?: includeMs): includeMs extends unknown ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A"|"P"}M` : includeMs extends false ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A"|"P"}M` : `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint}.${bigint} ${"A"|"P"}M`
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        function formatDate(date: Date, timeZoneOffset?: number): string
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
        }): string
    }
    class globalThis {
        static get overworld(): Dimension&{typeId: "minecraft:overworld"};
        static get nether(): Dimension&{typeId: "minecraft:nether"};
        static get the_end(): Dimension&{typeId: "minecraft:the_end"};
        static get players(): {[name: string]: Player}
        static get stack(): Error["stack"]
        static get Decimal(): typeof Decimal
        /**
         * @see {@link modules.colorCore.Color}
         */
        static get Color(): typeof globalThis.modules.colorCore.Color
        /**
         * @see {@link modules.colorCore}
         */
        static get colorCore(): typeof globalThis.modules.colorCore
        /**
         * @see {@link modules.semver.SemVer}
         */
        static get SemVer(): typeof globalThis.modules.semver.SemVer
        /**
         * @see {@link modules.semver}
         */
        static get semver(): typeof globalThis.modules.semver
        /**
         * @see {@link globalThis}
         */
        static get gt(): typeof globalThis
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
        static get srun(): typeof modules.main.srun
        /**
         * A class containing the configuration information for the add-on. 
         * @see {@link modules.main.config}
         */
        static get config(): typeof modules.main.config
    }
    interface Date {
        /**
         * The timezone, specified as the hours offset from UTC.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number
        /**
         * Sets the timezone property of this Date object.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        toTimezone(timezone?: number|string|boolean|null|undefined): this
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneTime(timezone?: number|string|boolean|null|undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDateTime(timezone?: number|string|boolean|null|undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string
        /**
         * Formats a date object to a date string formatted as 07/21/2024. 
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDate(timezone?: number|string|boolean|null|undefined, includeTimeZoneOffset?: boolean): string
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatDateTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string
        /**
         * Formats a date object to a date string formatted as 07/21/2024. 
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        formatDate(timeZoneOffset?: number, includeTimeZoneOffset?: boolean): string
    }
    interface Function {
        readonly lineNumber: number
        readonly fileName: string
    }
    interface Class {
        readonly lineNumber: number
        readonly fileName: string
    }
};
declare module '@minecraft/server' {
    interface Entity {/*
        id: `${number}`*/
        /**
         * Defines this entity's inventory properties.
         */
        get inventory(): EntityInventoryComponent|undefined
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
        get equippable(): EntityEquippableComponent|undefined
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         * 
         * Only works on players, on non-players it will return undefined.
         * 
         * This returns the same value as `Entity.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent|undefined
        get heldItem(): ItemStack|undefined
        get activeSlot(): ContainerSlot|undefined
        get moneySystem(): MoneySystem
        get playerNotifications(): PlayerNotifications
        get dimensionLocation(): DimensionLocation
        get locationstring(): `${number} ${number} ${number}`
        get rotationstring(): `${number} ${number}`
        get locationrotation(): RotationLocation
        get directionvector(): Vector3
        get xy(): Vector2
        get yz(): VectorYZ
        get xz(): VectorXZ
        get chunkIndex(): VectorXZ
        get x(): number
        get y(): number
        get z(): number
        get rotx(): number
        get roty(): number
        get timeZone(): number
        set timeZone(timezone: number|string|boolean|null|undefined)
    }
    interface Player {/*
        id: `${number}`*/
        /**
         * Defines this entity's inventory properties.
         */
        get inventory(): EntityInventoryComponent
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
        get equippable(): EntityEquippableComponent
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         * 
         * Only works on players, on non-players it will return undefined.
         * 
         * This returns the same value as `Player.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent
        get activeSlot(): ContainerSlot
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
        forceShow(player: Player, timeout?: number): Promise<ModalFormResponse>
    }
    interface MessageFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {MessageFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<MessageFormResponse>
    }
    interface ActionFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ActionFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ActionFormResponse>
    }
}
globalThis.subscribedEvents = {} as {[eventName: string]: Function}
globalThis.repeatingIntervals = {} as {[intervalName: string]: number}
globalThis.tempVariables={}

// §ess§gss§6ss§pss§ass§qss§2ss§4ss§5ss§dss§1ss§3ss§7ss§8ss§9ss§0ss§mss§nss§bss§sss§rss§fss§tss§uss§iss§hss§jss
Object.defineProperty(globalThis, 'stack', {get: function stack(){return new Error().stack}});
Object.defineProperty(Array.prototype, 'forEachB', {
    value: function forEachB<T>(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any){
        this.forEach((v, i, a)=>{
            Object.defineProperty(function b(){callbackfn(v, i, a)}, 'name', {value: `Array[${i}]`})()
        }, thisArg)
    }
});
Object.defineProperty(String.prototype, 'escapeCharacters', {
    value: function (js: boolean, unicode: boolean, nullchar: number, uri: boolean, quotes: boolean, general: boolean, colon: boolean, x: boolean, s: boolean){

        //:Get primitive copy of string:
        var str = this.valueOf();/*
        console.warn(unescape(str))*/

        //:Append Characters To End:
        if(js == true){
        try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){console.error(e, e.stack)}
        }
        if(general == true){
        str = str.replaceAll("\\n", "\n");
        str = str.replaceAll("\\f", "\f");
        str = str.replaceAll("\\r", "\r");
        str = str.replaceAll("\\t", "\t");
        str = str.replaceAll("\\v", "\v");
        str = str.replaceAll("\\b", "\b");
        str = str.replaceAll("\\l", "\u2028");
        str = str.replaceAll("\\p", "\u2029");
        }
        if(quotes == true){
        str = str.replaceAll("\\qd", "\"");
        str = str.replaceAll("\\qs", "\'");
        }
        if(colon == true){
        str = str.replaceAll("\\cs", "\;");
        str = str.replaceAll("\\cf", "\:");
        }
        if(x == true){
        str = str.replaceAll("\\x", "");
        }
        if(s == true){
        str = str.replaceAll("\\s", "");
        }
        if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
        if(nullchar == 2){str = str.replaceAll("\\0", "");}
        if(unicode == true){
        let strarray = ("t" + str).split("\\u")
        strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
        if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
            console.warn((values.slice(0, 6))); */
            strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
        }else{
            if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
            }else{
                if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
                }else{
                    if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                    }else{
                        if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                        }else{
                            if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                            }else{
                                if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                                }else{
                                    if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                    }else{
            if(index !== 0){
                strarray[index] = "\\u" + values.slice(0)
            }}}}}}}}
        }})
        str = strarray.join("").slice(1)
        }
        if(uri == true){str = unescape(str);}

        //:Return modified copy:
        return( str );
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(String.prototype, 'escapeCharactersB', {
    value: function (js: boolean, unicode: boolean, nullchar: number, uri: boolean, quotes: boolean, general: boolean, colon: boolean, x: boolean, s: boolean){

        //:Get primitive copy of string:
        var str: string = this.valueOf();/*
        console.warn(unescape(str))*/
        var eb: Error[]
        eb = undefined

        //:Append Characters To End:
        if(js == true){
        try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){eb.push(e); console.error(e, e.stack)}
        }
        if(general == true){
        str = str.replaceAll("\\n", "\n");
        str = str.replaceAll("\\f", "\f");
        str = str.replaceAll("\\r", "\r");
        str = str.replaceAll("\\t", "\t");
        str = str.replaceAll("\\v", "\v");
        str = str.replaceAll("\\b", "\b");
        str = str.replaceAll("\\l", "\u2028");
        str = str.replaceAll("\\p", "\u2029");
        }
        if(quotes == true){
        str = str.replaceAll("\\qd", "\"");
        str = str.replaceAll("\\qs", "\'");
        }
        if(colon == true){
        str = str.replaceAll("\\cs", "\;");
        str = str.replaceAll("\\cf", "\:");
        }
        if(x == true){
        str = str.replaceAll("\\x", "");
        }
        if(s == true){
        str = str.replaceAll("\\s", "");
        }
        if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
        if(nullchar == 2){str = str.replaceAll("\\0", "");}
        if(unicode == true){
        let strarray = ("t" + str).split("\\u")
        strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
        if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
            console.warn((values.slice(0, 6))); */
            strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
        }else{
            if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
            }else{
                if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
                }else{
                    if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                    }else{
                        if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                        }else{
                            if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                            }else{
                                if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                                }else{
                                    if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                    }else{
            if(index !== 0){
                strarray[index] = "\\u" + values.slice(0)
            }}}}}}}}
        }})
        str = strarray.join("").slice(1)
        }
        if(uri == true){str = unescape(str);}

        //:Return modified copy:
        return( {v: str, e: eb} );
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperties(String.prototype, {
    toNumber: {
        value: function (): number|undefined{
            var str: string = this
            return Number.isNaN(Number(str))?str.toLowerCase()=="infinity"?Infinity:str.toLowerCase()=="-infinity"?-Infinity:undefined:Number(str)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint|undefined{
            var str: string = this
            return Number.isNaN(Number(str))?undefined:BigInt(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function (): boolean{
            var simplified: string = this.toLowerCase().trim()
            var numberified: number|undefined = simplified.toNumber()
            return simplified.startsWith("t")
                ? true
                : simplified.startsWith("f")
                ? false
                : simplified.startsWith("y")
                ? true
                : simplified.startsWith("n")
                ? false
                : !!numberified
                ? numberified.toBoolean()
                : Boolean(simplified);
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(Number.prototype, {
    toNumber: {
        value: function toNumber(): number{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint{
            return BigInt(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==1)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits: [min: number, max: number] = [1, 10], valueFor0: string = "0"): string{
            if((this>limits[1])||(this<limits[0])||!(this as number).isInteger()||(this as number).isNaN()){return (this as number).toString()}
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
              ] as const;
              
              function convertToRoman(num: bigint): string {
                if (num === 0n) {
                  return valueFor0;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                  if (num >= romanMatrix[i][0]) {
                    return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                  }
                }
              }
              return (((this as number)<0)?"-":"")+convertToRoman((this as number).toBigInt())
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isNaN: {
        value: function isNaN(): boolean{
            return Number.isNaN(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isFinite: {
        value: function isFinite(): boolean{
            return Number.isFinite(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isInteger: {
        value: function isInteger(): boolean{
            return Number.isInteger(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isSafeInteger: {
        value: function isSafeInteger(): boolean{
            return Number.isSafeInteger(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==0)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==1)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(BigInt.prototype, {
    toNumber: {
        value: function toNumber(): number{
            return Number(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean(): boolean{
            return (this%2n)==1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits: [min: bigint, max: bigint] = [1n, 10n], valueFor0n: string = "0"): string{
            if((this>limits[1])||(this<limits[0])){return (this as bigint).toString()}
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
              ] as const;
              
              function convertToRoman(num: bigint): string {
                if (num === 0n) {
                  return valueFor0n;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                  if (num >= romanMatrix[i][0]) {
                    return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                  }
                }
              }
              return (((this as bigint)<0)?"-":"")+convertToRoman((this as bigint).toBigInt())
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven(): boolean{
            return (this%2n)==0n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd(): boolean{
            return (this%2n)==1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    }/*,
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }*/
});
Object.defineProperties(Boolean.prototype, {/*
    toString: {
        value: function (): "true"|"false"{
            return this.valueOf()?"true":"false"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },*/
    toNumber: {
        value: function (): 0|1{
            return +this as 0|1
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function (): 0n|1n{
            return BigInt(+this) as 0n|1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function (): boolean{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedString: {
        value: function (): "§aTrue"|"§cFalse"{
            return this.valueOf()?"§aTrue":"§cFalse"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringB: {
        value: function (): "§2True"|"§4False"{
            return this.valueOf()?"§2True":"§4False"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringED: {
        value: function (): "§aEnabled"|"§cDisabled"{
            return this.valueOf()?"§aEnabled":"§cDisabled"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringEDB: {
        value: function (): "§2Enabled"|"§4Disabled"{
            return this.valueOf()?"§2Enabled":"§4Disabled"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIO: {
        value: function (): "§aON"|"§cOFF"{
            return this.valueOf()?"§aON":"§cOFF"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOB: {
        value: function (): "§2ON"|"§4OFF"{
            return this.valueOf()?"§2ON":"§4OFF"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOL: {
        value: function (): "§aOn"|"§cOff"{
            return this.valueOf()?"§aOn":"§cOff"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOLB: {
        value: function (): "§2On"|"§4Off"{
            return this.valueOf()?"§2On":"§4Off"
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
globalThis.twoWayModulo = function twoWayModulo(number: number, modulo: number){if(number<0){return modulo+(number%modulo)}else{return number%modulo}}
globalThis.clamp24HoursTo12Hours = function clamp24HoursTo12Hours(hours: number){return twoWayModulo(hours-1, 12)+1}
/**
 * Formats a date object to a time string formatted as 12:37:01 PM. 
 * @since 1.18.2-development.3
 * @version 1.1.1
 */
globalThis.formatTime = function formatTime<includeMs extends boolean>(date: Date, timeZoneOffset: number = 0, includeMs: includeMs|boolean = false): includeMs extends unknown ? `${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : includeMs extends false ? `${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : `${bigint}:${bigint}:${bigint}.${bigint} ${"A" | "P"}M`{const dateb = new Date(date.valueOf()+(timeZoneOffset*3600000)); return `${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs?`.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`:""} ${dateb.getUTCHours()>11?"P":"A"}M` as any}
/**
 * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM. 
 * @since 1.18.2-development.10
 * @version 1.1.1
 */
globalThis.formatDateTime = function formatDateTime<includeMs extends boolean>(date: Date, timeZoneOffset: number = 0, includeMs: includeMs|boolean = false): includeMs extends unknown ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : includeMs extends false ? `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint} ${"A" | "P"}M` : `${bigint}/${bigint}/${bigint}, ${bigint}:${bigint}:${bigint}.${bigint} ${"A" | "P"}M`{const dateb = new Date(date.valueOf()+(timeZoneOffset*3600000)); return `${(dateb.getUTCMonth()+1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs?`.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`:""} ${dateb.getUTCHours()>11?"P":"A"}M` as any}
/**
 * Formats a date object to a date string formatted as 07/21/2024. 
 * @since 1.26.0-preview.20+BUILD.2
 * @version 1.0.0
 */
globalThis.formatDate = function formatDate(date: Date, timeZoneOffset: number = 0){const dateb = new Date(date.valueOf()+(timeZoneOffset*3600000)); return `${(dateb.getUTCMonth()+1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()}`}
Object.defineProperties(Date.prototype, {
    timezone: {
        value: typeof world.getDynamicProperty("andexdbSettings:timeZone") == "object" ? 0 : (world.getDynamicProperty("andexdbSettings:timeZone") as string|number|boolean ?? 0).toNumber()??0,
        configurable: true,
        enumerable: true,
        writable: true
    },
    toTimezone: {
        value: function toTimezone(UTCHourOffset: string|number|boolean|null|undefined): Date{
            this.timezone=!!UTCHourOffset?UTCHourOffset.toNumber():config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneDate: {
        value: function (UTCHourOffset?: string|number|boolean|null|undefined, includeTimeZoneOffset: boolean = false): string{
            return this.formatDate(!!UTCHourOffset?UTCHourOffset.toNumber():this.timezone??config.system.timeZone, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneDateTime: {
        value: function (UTCHourOffset?: string|number|boolean|null|undefined, includeMs: boolean = false, includeTimeZoneOffset: boolean = false): string{
            return this.formatDateTime(!!UTCHourOffset?UTCHourOffset.toNumber():this.timezone??config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    toTimezoneTime: {
        value: function (UTCHourOffset?: string|number|boolean|null|undefined, includeMs: boolean = false, includeTimeZoneOffset: boolean = false): string{
            return this.formatDateTime(!!UTCHourOffset?UTCHourOffset.toNumber():this.timezone??config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatTime: {
        value: function formatTime(timeZoneOffset: number = this.timezone??config.system.timeZone, includeMs: boolean = false, includeTimeZoneOffset: boolean = false){
            const dateb = new Date(this.valueOf()+(timeZoneOffset*3600000));
            return `${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs?`.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`:""} ${dateb.getUTCHours()>11?"P":"A"}M${includeTimeZoneOffset?` UTC${timeZoneOffset<0?"-":"+"}${Math.abs(timeZoneOffset)}`:""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatDateTime: {
        value: function formatDateTime(timeZoneOffset: number = this.timezone??config.system.timeZone, includeMs: boolean = false, includeTimeZoneOffset: boolean = false){
            const dateb = new Date(this.valueOf()+(timeZoneOffset*3600000));
            return `${(dateb.getUTCMonth()+1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours()).toString().padStart(2, "0")}:${dateb.getUTCMinutes().toString().padStart(2, "0")}:${dateb.getUTCSeconds().toString().padStart(2, "0")}${includeMs?`.${dateb.getUTCMilliseconds().toString().padStart(3, "0")}`:""} ${dateb.getUTCHours()>11?"P":"A"}M${includeTimeZoneOffset?` UTC${timeZoneOffset<0?"-":"+"}${Math.abs(timeZoneOffset)}`:""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    },
    formatDate: {
        value: function formatDate(timeZoneOffset: number = this.timezone??config.system.timeZone, includeTimeZoneOffset: boolean = false){
            const dateb = new Date(this.valueOf()+(timeZoneOffset*3600000));
            return `${(dateb.getUTCMonth()+1).toString().padStart(2, "0")}/${dateb.getUTCDate().toString().padStart(2, "0")}/${dateb.getUTCFullYear().toString()}${includeTimeZoneOffset?` UTC${timeZoneOffset<0?"-":"+"}${Math.abs(timeZoneOffset)}`:""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false
    }
});
Object.defineProperties(Entity.prototype, {
    inventory: {
        get: function inventory(): EntityInventoryComponent|undefined{
            return (this as Entity).getComponent("inventory")
        },
        configurable: true,
        enumerable: true
    },
    equippable: {
        get: function equippable(): EntityEquippableComponent|undefined{
            return (this as Entity).getComponent("equippable")
        },
        configurable: true,
        enumerable: true
    },
    cursorInventory: {
        get: function cursorInventory(): PlayerCursorInventoryComponent|undefined{
            return (this as Entity).getComponent("cursor_inventory")
        },
        configurable: true,
        enumerable: true
    },
    heldItem: {
        get: function heldItem(): ItemStack|undefined{
            if(!!!(this as Entity).getComponent("equippable")){
                return undefined
            }else{
                return (this as Entity).getComponent("equippable").getEquipment(EquipmentSlot.Mainhand)
            }
        },
        configurable: true,
        enumerable: true
    },
    activeSlot: {
        get: function activeSlot(): ContainerSlot|undefined{
            if(!!!(this as Entity).getComponent("equippable")){
                return undefined
            }else{
                return (this as Entity).getComponent("equippable").getEquipmentSlot(EquipmentSlot.Mainhand)
            }
        },
        configurable: true,
        enumerable: true
    },
    moneySystem: {
        get: function moneySystem(): MoneySystem{
            return MoneySystem.get(this as Entity)
        },
        configurable: true,
        enumerable: true
    },
    dimensionLocation: {
        get: function dimensionLocation(){return {x: this.x, y: this.y, z: this.z, dimension: this.dimension}},
        configurable: true,
        enumerable: true
    },
    locationstring: {
        get: function locationstring() {
            return this.x+" "+this.y+" "+this.z; 
        },
        configurable: true,
        enumerable: true
    },
    rotationstring: {
        get: function rotationstring() {
            return this.rotx+" "+this.roty; 
        },
        configurable: true,
        enumerable: true
    },
    locationrotation: {
        get: function locationrotation(): RotationLocation {
            return {x: this.x, y: this.y, z: this.z, rotX: this.rotx, rotY: this.roty}; 
        },
        configurable: true,
        enumerable: true
    },
    xy: {
        get: function xy(): Vector2 {
            return {x: this.x, y: this.y}; 
        },
        configurable: true,
        enumerable: true
    },
    yz: {
        get: function yz(): VectorYZ {
            return {y: this.y, z: this.z}; 
        },
        configurable: true,
        enumerable: true
    },
    xz: {
        get: function xz(): VectorXZ {
            return {x: this.x, z: this.z}; 
        },
        configurable: true,
        enumerable: true
    },
    x: {
        get: function x(){return this.location.x},
        configurable: true,
        enumerable: true
    },
    y: {
        get: function y(){return this.location.y},
        configurable: true,
        enumerable: true
    },
    z: {
        get: function z(){return this.location.z},
        configurable: true,
        enumerable: true
    },
    rotx: {
        get: function rotx(){return this.getRotation().x},
        configurable: true,
        enumerable: true
    },
    roty: {
        get: function roty(){return this.getRotation().y},
        configurable: true,
        enumerable: true
    },
    timeZone: {
        get: function timeZone(){return (this.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? config.system.timeZone).toString().toNumber()},
        set: function timeZone(timezone: number|string|boolean|null|undefined){this.setDynamicProperty("andexdbPersonalSettings:timeZone", !!timezone?timezone.toString():undefined)},
        configurable: true,
        enumerable: true
    }
});
Object.defineProperties(Player.prototype, {
});
Object.defineProperty(Error.prototype, 'stringify', {
    value: function stringify(){
        return this+" "+this.stack
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(ActionFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<ActionFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as ActionFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(ModalFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<ModalFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as ModalFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(MessageFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<MessageFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as MessageFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(globalThis, 'players', {
    get: function player(): {[name: string]: Player} {
        return Object.fromEntries(world.getAllPlayers().map(p=>[p.name, p]))
    },
    configurable: true,
    enumerable: true
})
/**
 * Better Version of JSON.parse() that is able to read undefined, NaN, Infinity, and -Infinity values. 
 * @param {string} text A valid JSON string (with undefined, NaN, Infinity, and -Infinity values allowed). 
 * @param {boolean} keepUndefined Whether or not to include undefined variables when parsing, defaults to true. 
 * @returns {any} The parsed JSON data. 
 */
globalThis.JSONParseOld = function JSONParseOld(text: string, keepUndefined: boolean = true){let g = []; let h = []; let a = JSON.parse(text.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"'), function(k, v) {
   if (v === '{{Infinity}}') return Infinity;
   else if (v === '{{-Infinity}}') return -Infinity;
   else if (v === '{{NaN}}') return NaN;
   else if (v === '{{undefined}}') {g.push(k); if(keepUndefined){return v}else{undefined}};
   h.push(k); 
   return v;
   }); g.forEach((v, i)=>{let b = Object.entries(a); b[b.findIndex(b=>b[0]==v)]=[v, undefined]; a=Object.fromEntries(b)}); {let b = Object.entries(a); b.filter(b=>!!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined)}}"}}$/)).forEach((v, i)=>{console.log(v, i); b[b.findIndex(b=>b[0]==v[0])]=[v[0], String(v[1]).replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined)(?:}}"}})$/g, '{{$1}}')]; a=Object.fromEntries(b)})}; return a;
}
/**
 * Better Version of JSON.stringify() that is able to save undefined, NaN, Infinity, and -Infinity values. 
 * @param {any} value A JavaScript value, usually an object or array, to be converted (with undefined, NaN, Infinity, and -Infinity values allowed). 
 * @param {boolean} keepUndefined Whether or not to include undefined variables when stringifying, defaults to false. 
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns {any} The JSON string. 
 */
globalThis.JSONStringifyOld = function JSONStringifyOld(value: any, keepUndefined: boolean = false, space?: string|number){return JSON.stringify(value, function(k, v) {
    if (v === Infinity) return "{{Infinity}}";
    else if (v === -Infinity) return "{{-Infinity}}";
    else if (Number.isNaN(v)) return "{{NaN}}";
    else if (v === undefined && keepUndefined) return "{{undefined}}";
    if(String(v).match(/^{{(Infinity|NaN|-Infinity|undefined)}}$/)){v=v.replace(/^{{(Infinity|NaN|-Infinity|undefined)}}$/g, '{{"{{$1}}"}}')}
    return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
}
globalThis.JSONParse = function JSONParse(JSONString: string, keepUndefined: boolean = true) {
    let g = [];
    let h = [];
    if(JSONString==undefined){let nothing; return nothing}
    if(JSONString=="undefined"){return undefined}
    if(JSONString=="Infinity"){return Infinity}
    if(JSONString=="-Infinity"){return -Infinity}
    if(JSONString=="NaN"){return NaN}
    if(JSONString=="null"){return null}
    if(JSONString.match(/^\-?\d+n$/g)){return BigInt(JSONString.slice(0, -1))}
    let a = JSON.parse(JSONString.replace(/(?<="(?:\s*):(?:\s*))"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"(?=(?:\s*)[,}](?:\s*))/g, '"{{\\"{{$1}}\\"}}"').replace(/(?<="(?:\s*):(?:\s*))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,}](?:\s*))/g, '"{{$1}}"').replace(/(?<=(?:[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\[)[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*),(?:\s*)|[^"]*(?:(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*(?<!(?:(?:[^\\]\\)(?:\\\\)*))"[^"]*)*(?:\s*)\[(?:\s*)))(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?=(?:\s*)[,\]](?:\s*))/g, '"{{$1}}"').replace(/^(Infinity|NaN|-Infinity|undefined|\-?\d+n)$/g, '"{{$1}}"'), function(k, v) {
        if (v === '{{Infinity}}') return Infinity;
        else if (v === '{{-Infinity}}') return -Infinity;
        else if (v === '{{NaN}}') return NaN;
        else if (v === '{{undefined}}') {
            g.push(k);
            if (keepUndefined) {
                return v
            } else {
                undefined
            }
        }
        else if (tryget(()=>v.match(/^{{\-?\d+n}}$/g))??false) return BigInt(v.slice(2, -3));
        h.push(k);
        return v;
    });

    function recursiveFind(a) {
        if (a instanceof Array) {
            let b = a;
            b.forEach((v, i) => {
                if (v instanceof Array || v instanceof Object) {
                    b[i] = recursiveFind(v);
                    return
                };
                if (String(v) == "{{undefined}}") {
                    b[i] = undefined;
                    return
                };
            });
            a = b;

            {
                let b = a;
                !!b.forEach((va, i) => {
                    if (String(va).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                        b[i] = va.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                    }
                    a = b
                })
            };
        } else if (a instanceof Object) {
            let b = Object.entries(a);
            b.forEach((v, i) => {
                if (v[1] instanceof Object || v[1] instanceof Array) {
                    b[i] = [v[0], recursiveFind(v[1])];
                    return
                };
                if (String(v[1]) == "{{undefined}}") {
                    b[i] = [v[0], undefined];
                    return
                };
            });
            a = Object.fromEntries(b);
            {
                let b = Object.entries(a);
                b.filter(b => !!String(b[1]).match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)).forEach((v, i) => {
                    b[b.findIndex(b => b[0] == v[0])] = [v[0], (v[1] as any).replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}')];
                    a = Object.fromEntries(b)
                })
            };
        } else if (typeof a === "string") {
            if (a == "{{undefined}}") {
                a = undefined
            } else {
                if (a.match(/^{{"{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}"}}$/)) {
                    a = a.replace(/^(?:{{"{{)(Infinity|NaN|-Infinity|undefined|\-?\d+n)(?:}}"}})$/g, '{{$1}}');
                }
            }
        };
        return a
    }
    a = recursiveFind(a);
    return a;
};
globalThis.JSONStringify = function JSONStringify(JSONObject: any, keepUndefined: boolean = false, space?: string|number) {
    if(JSONObject==undefined){return keepUndefined?"undefined":""}
    return JSON.stringify(JSONObject, function(k, v) {
        if (v === Infinity) return "{{Infinity}}";
        else if (v === -Infinity) return "{{-Infinity}}";
        else if (Number.isNaN(v)) return "{{NaN}}";
        else if (v === undefined && keepUndefined) return "{{undefined}}";
        else if (typeof v === "function") return {$function: v.toString()};
        else if (typeof v === "bigint") return "{{"+v.toString()+"n}}";
        if (String(v).match(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/)) {
            v = v.replace(/^{{(Infinity|NaN|-Infinity|undefined|\-?\d+n)}}$/g, '{{"{{$1}}"}}')
        }
        return v;
    }, space).replace(/(?<!\\)"{{(Infinity|NaN|-Infinity|undefined)}}"/g, '$1').replace(/(?<!\\)"{{\\"{{(Infinity|NaN|-Infinity|undefined)}}\\"}}"/g, '"{{$1}}"');
};
globalThis.cullNull = function cullNull<T extends any[]>(array: T){
    return array.filter(v=>v!==null)
}
globalThis.cullUndefined = function cullUndefined<T extends any[]>(array: T){
    return array.filter(v=>v!==undefined)
}
globalThis.cullEmpty = function cullEmpty<T extends any[]>(array: T){
    return array.filter(v=>!!v)
}
globalThis.tryget = function tryget<T>(callbackfn: ()=>T){
    try{
        return callbackfn() as T|undefined
    }catch{}
}
globalThis.tryrun = function tryrun(callbackfn: ()=>any){
    try{
        callbackfn()
    }catch{}
}
globalThis.catchtry = function catchtry<TT extends unknown, CT extends unknown, FT extends unknown>(
    trycallbackfn: ()=>TT,
    catchcallbackfn: (e: Error)=>CT = (e)=>console.error(e, e?.stack) as CT,
    finallycallbackfn: (v: TT|ReturnType<typeof catchcallbackfn>|undefined)=>FT = (v: TT|ReturnType<typeof catchcallbackfn>|undefined)=>{return v as FT}
): TT|CT|FT|undefined{
    let v: any;
    v = undefined;
    try{
        v = trycallbackfn()
    }catch(e){
        v = catchcallbackfn(e)??v
    }finally{
        return finallycallbackfn(v)??v
    }
}; 
globalThis.cinfo = function cinfo(...data: any[]){
    console.info(data)
}; 
globalThis.clog = function clog(...data: any[]){
    console.log(data)
}; 
globalThis.cwarn = function cwarn(...data: any[]){
    console.warn(data)
}; 
globalThis.cerror = function cerror(...data: any[]){
    console.error(data)
}; 
globalThis.send = function send(message: (RawMessage | string)[] | RawMessage | string){
    world.sendMessage(message)
}; 
globalThis.asend = function asend(value: any){
    world.sendMessage(String(value))
}; 
globalThis.bsend = function bsend(value: any, space?: string | number){
    world.sendMessage(JSONStringify(value, true, space))
}; 
globalThis.csend = function csend(value: any, space?: string | number){
    world.sendMessage(JSON.stringify(value, undefined, space))
}; 
globalThis.dsend = function dsend(value: any, space?: string | number){
    world.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}))
}; 
globalThis.esend = function esend(value: any, space?: string | number){
    world.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}))
}; 
globalThis.fsend = function fsend(value: any, space?: string | number){
    world.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}))
}; 
globalThis.bcsend = function bcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    world.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options))
}; 
globalThis.ccsend = function ccsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    world.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options))
}; 
globalThis.dcsend = function dcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}), options))
}; 
globalThis.ecsend = function ecsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}), options))
}; 
globalThis.fcsend = function fcsend(value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}), options))
}; 
globalThis.psend = function psend(player: Player|executeCommandPlayerW, value: string){
    player.sendMessage(value)
}; 
globalThis.pasend = function pasend(player: Player|executeCommandPlayerW, value: any){
    player.sendMessage(String(value))
}; 
globalThis.pbsend = function pbsend(player: Player|executeCommandPlayerW, value: any, space?: string | number){
    player.sendMessage(JSONStringify(value, true, space))
}; 
globalThis.pcsend = function pcsend(player: Player|executeCommandPlayerW, value: any, space?: string | number){
    player.sendMessage(JSON.stringify(value, undefined, space))
}; 
globalThis.pdsend = function pdsend(player: Player|executeCommandPlayerW, value: any, space?: string | number){
    player.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}))
}; 
globalThis.pesend = function pesend(player: Player|executeCommandPlayerW, value: any, space?: string | number){
    player.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}))
}; 
globalThis.pfsend = function pfsend(player: Player|executeCommandPlayerW, value: any, space?: string | number){
    player.sendMessage(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}))
}; 
globalThis.pbcsend = function pbcsend(player: Player|executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    player.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options))
};
globalThis.pccsend = function pccsend(player: Player|executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    player.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options))
};
globalThis.pdcsend = function pdcsend(player: Player|executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: true, Infinity: true, get: true, NaN: true, NegativeInfinity: true, set: true, undefined: true}), options))
};
globalThis.pecsend = function pecsend(player: Player|executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: true}), options))
};
globalThis.pfcsend = function pfcsend(player: Player|executeCommandPlayerW, value: any, space?: string | number, options?: Parameters<typeof colorizeJSONString>[1]){
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {bigint: true, class: false, function: false, Infinity: true, get: false, NaN: true, NegativeInfinity: true, set: false, undefined: false}), options))
};
globalThis.perror = function perror(player: Player|executeCommandPlayerW, error: Error, prefix: string = "§c"){
    player.sendMessage(prefix+(tryget(()=>error.stringify())??(error+" "+error.stack)))
}; 
globalThis.breakpoint = function breakpoint(){
    undefined; // Has a hit count type breakpoint with a value of 2.
}
globalThis.iterateGenerator = function iterateGenerator<TY, TR, TN>(extractorGenerator: Generator<TY, TR, TN>, maxTimePerTick=1500, whileConditions: boolean|number|string|Function=true){
    let lastYieldTime = Date.now(); // Initialize the last yield time
    async function iterateGeneratorB<TY, TR, TN>(extractorGenerator: Generator<TY, TR, TN>, lastYieldTime: number) {
        let finalResult: TY | TR;
        while (whileConditions) {
            const result = extractorGenerator.next();
            finalResult = result.value;
            if (!result.done) {
                // console.log(result.value); // Handle the yielded value
                if (Date.now() - lastYieldTime >= maxTimePerTick) {
                    lastYieldTime = Date.now();
                    await new Promise(resolve => system.run(()=>resolve(void null))); // Asynchronously wait for next iteration
                }
            } else {
                break;
            }
        }
        return finalResult;
    }
    return iterateGeneratorB(extractorGenerator, lastYieldTime)
}

globalThis.completeGenerator = async function completeGenerator<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick=1500, whileConditions: boolean|number|string|Function=true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    let finalResult: T;
    let returnResult: TReturn;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            finalResult = result.value as T;
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise(resolve => system.run(()=>resolve(void null)));
            }
        } else {
            returnResult = result.value;
            break;
        }
    }
    return {yield: finalResult, return: returnResult};
}

globalThis.completeGeneratorB = async function completeGeneratorB<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick=1500, whileConditions=true) {
    let lastYieldTime = Date.now();
    var yieldResults = [] as T[];
    let returnResult: TReturn;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            yieldResults.push(result.value as T);
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise(resolve => system.run(()=>resolve(void null)));
            }
        } else {
            returnResult = result.value;
            break;
        }
    }
    return {yield: yieldResults, return: returnResult};
}
globalThis.waitTick = async function waitTick(): Promise<void>{return new Promise(resolve => system.run(()=>resolve(void null)))}
globalThis.waitTicks = async function waitTicks(ticks: number=1): Promise<void>{return new Promise(resolve => system.runTimeout(()=>resolve(void null), ticks))}
globalThis.testForObjectExtension = function testForObjectExtension(objectToTest: object, base: object){return Object.entries(base).every(v=>Object.keys(objectToTest).includes(v[0])?Object.entries(objectToTest).find(c=>c[0]==v[0])[1]==v[1]:false)}
globalThis.testForObjectTypeExtension = function testForObjectTypeExtension(
    objectToTest: object,
    base: object
) {
    return Object.entries(base).every((v) =>
        Object.keys(objectToTest).includes(v[0])
            ? v[1].startsWith("[object ") ? Object.entries(objectToTest).find((c) => c[0] == v[0])[1]?.constructor?.name == v[1].slice(8, -1) : typeof Object.entries(objectToTest).find((c) => c[0] == v[0])[1] == v[1]
            : false
    );
};