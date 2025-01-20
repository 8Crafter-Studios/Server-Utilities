import { type RawMessage, Player, Dimension } from "@minecraft/server";
import Decimal from "decimal.js";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
declare global {
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
    interface ObjectConstructor {
        /**
         * Gets the own property descriptor of the specified object.
         * An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.
         * @param o Object that contains the property.
         * @param p Name of the property.
         */
        getOwnPropertyDescriptor<T extends any>(o: T, p: keyof T): PropertyDescriptor | undefined;
        getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
        /**
         * Adds a property to an object, or modifies attributes of an existing property.
         * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
         * @param p The property name.
         * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
         */
        defineProperty<T>(o: T, p: keyof T, attributes: PropertyDescriptor & ThisType<any>): T;
        defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;
        /**
         * Adds one or more properties to an object, and/or modifies attributes of existing properties.
         * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
         * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
         */
        defineProperties<T>(o: T, properties: {
            [key in keyof T]: PropertyDescriptor;
        } & {
            [key: PropertyKey]: PropertyDescriptor;
        } & ThisType<any>): T;
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
        class InternalError extends Error {
        }
        function tfsa(sdsa284f83kd_38pqnv_38_f_0_vmewd_19mvndifekod_f8ufv4m3ddm1c0nvh289cmfue8hd9mjf3: unknown): unknown;
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
        /**
         * Asynchronously completes a generator function, yielding control back to the system
         * if the execution time exceeds a specified limit per tick.
         *
         * @template T - The type of the yielded values.
         * @template TReturn - The type of the return value.
         * @template TNext - The type of the next value.
         * @param {Generator<T, TReturn, TNext>} g - The generator function to complete.
         * @param {number} [maxTimePerTick=1500] - The maximum time (in milliseconds) to spend on each tick before yielding control back to the system.
         * @param {boolean | number | string | Function} [whileConditions=true] - The condition to continue running the generator. Can be a boolean, number, string, or function.
         * @returns {Promise<{ yield: T; return: TReturn }>} A promise that resolves with the final yielded value and the return value of the generator.
         */
        function completeGenerator<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean | number | string | Function): Promise<{
            yield: T;
            return: TReturn;
        }>;
        /**
         * Asynchronously completes a generator function, yielding values and respecting a maximum time per tick.
         *
         * @template T - The type of values yielded by the generator.
         * @template TReturn - The type of the return value of the generator.
         * @template TNext - The type of the value that can be passed to the generator's `next` method.
         *
         * @param {Generator<T, TReturn, TNext>} g - The generator function to complete.
         * @param {number} [maxTimePerTick=1500] - The maximum time (in milliseconds) to spend on each tick before yielding control back to the system.
         * @param {boolean} [whileConditions=true] - A condition to keep the generator running.
         *
         * @returns {Promise<{ yield: T[]; return: TReturn }>} A promise that resolves with an object containing the yielded values and the return value of the generator.
         */
        function completeGeneratorB<T, TReturn, TNext>(g: Generator<T, TReturn, TNext>, maxTimePerTick?: number, whileConditions?: boolean): Promise<{
            yield: T[];
            return: TReturn;
        }>;
        function waitTick(): Promise<void>;
        function waitTicks(ticks?: number): Promise<void>;
        function testForObjectExtension(objectToTest: object, base: object): boolean;
        function testForObjectTypeExtension(objectToTest: object, base: object): boolean;
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
        /**
         * @remarks Maps the dimension IDs to lowercase names of the dimensions types that all include "The" before the dimension name.
         * @property overworld: the overworld
         * @property minecraft:overworld: the overworld
         * @property nether: the nether
         * @property minecraft:nether: the nether
         * @property the_end: the end
         * @property minecraft:the_end: the end
         */
        static get dimensionTypeDisplayFormatting(): {
            "minecraft:overworld": "the overworld";
            overworld: "the overworld";
            "minecraft:nether": "the nether";
            nether: "the nether";
            "minecraft:the_end": "the end";
            the_end: "the end";
        };
        /**
         * @remarks Maps the dimension IDs to lowercase names of the dimensions types.
         * @property overworld: overworld
         * @property minecraft:overworld: overworld
         * @property nether: nether
         * @property minecraft:nether: nether
         * @property the_end: the end
         * @property minecraft:the_end: the end
         */
        static get dimensionTypeDisplayFormattingB(): {
            "minecraft:overworld": "overworld";
            overworld: "overworld";
            "minecraft:nether": "nether";
            nether: "nether";
            "minecraft:the_end": "the end";
            the_end: "the end";
        };
        /**
         * @remarks Maps the dimension IDs to titlecase names of the dimensions types that all include "The" before the dimension name.
         * @property overworld: The Overworld
         * @property minecraft:overworld: The Overworld
         * @property nether: The Nether
         * @property minecraft:nether: The Nether
         * @property the_end: The End
         * @property minecraft:the_end: The End
         */
        static get dimensionTypeDisplayFormattingC(): {
            "minecraft:overworld": "The Overworld";
            overworld: "The Overworld";
            "minecraft:nether": "The Nether";
            nether: "The Nether";
            "minecraft:the_end": "The End";
            the_end: "The End";
        };
        /**
         * @remarks Maps the dimension IDs to titlecase names of the dimensions types.
         * @property overworld: Overworld
         * @property minecraft:overworld: Overworld
         * @property nether: Nether
         * @property minecraft:nether: Nether
         * @property the_end: The End
         * @property minecraft:the_end: The End
         */
        static get dimensionTypeDisplayFormattingD(): {
            "minecraft:overworld": "Overworld";
            overworld: "Overworld";
            "minecraft:nether": "Nether";
            nether: "Nether";
            "minecraft:the_end": "The End";
            the_end: "The End";
        };
        /**
         * @remarks Maps the dimension IDs to titlecase names of the dimensions types that have formatting codes.
         * @property overworld: §aOverworld
         * @property minecraft:overworld: §aOverworld
         * @property nether: §cNether
         * @property minecraft:nether: §cNether
         * @property the_end: §dThe End
         * @property minecraft:the_end: §dThe End
         */
        static get dimensionTypeDisplayFormattingE(): {
            "minecraft:overworld": "§aOverworld";
            overworld: "§aOverworld";
            "minecraft:nether": "§cNether";
            nether: "§cNether";
            "minecraft:the_end": "§dThe End";
            the_end: "§dThe End";
        };
        /**
         * @remarks Maps the dimension IDs to their non-namespaces versions.
         * @property overworld: overworld
         * @property minecraft:overworld: overworld
         * @property nether: nether
         * @property minecraft:nether: nether
         * @property the_end: the_end
         * @property minecraft:the_end: the_end
         */
        static get dimensionTypeDisplayFormattingF(): {
            "minecraft:overworld": "overworld";
            overworld: "overworld";
            "minecraft:nether": "nether";
            nether: "nether";
            "minecraft:the_end": "the_end";
            the_end: "the_end";
        };
        /**
         * @remarks An array containing all of the dimension objects.
         * @property 0: Overworld
         * @property 1: Nether
         * @property 2: The End
         */
        static get dimensions(): [Dimension, Dimension, Dimension];
        /**
         * @remarks Maps the namespaced dimension IDs to the dimensions objects with the same IDs.
         * @property minecraft:overworld: Overworld
         * @property minecraft:nether: Nether
         * @property minecraft:the_end: The End
         */
        static get dimensionsb(): {
            "minecraft:overworld": Dimension;
            "minecraft:nether": Dimension;
            "minecraft:the_end": Dimension;
        };
        /**
         * @remarks Maps the non-namespaced dimension IDs to the dimensions objects with the same IDs.
         * @property overworld: Overworld
         * @property nether: Nether
         * @property the_end: The End
         */
        static get dimensionsc(): {
            overworld: Dimension;
            nether: Dimension;
            the_end: Dimension;
        };
        /**
         * @remarks An array containing all of the namespaced dimension IDs.
         * ```typescript
         * 0: "minecraft:overworld"
         * 1: "minecraft:nether"
         * 2: "minecraft:the_end"
         * ```
         */
        static get dimensionsd(): [
            "minecraft:overworld",
            "minecraft:nether",
            "minecraft:the_end"
        ];
        /**
         * @remarks An array containing all of the non-namespaced dimension IDs.
         * ```typescript
         * 0: "overworld"
         * 1: "nether"
         * 2: "the_end"
         * ```
         */
        static get dimensionse(): ["overworld", "nether", "the_end"];
        /**
         * @remarks Maps the dimension IDs to the dimensions objects with the same IDs.
         * @property minecraft:overworld: Overworld
         * @property minecraft:nether: Nether
         * @property minecraft:the_end: The End
         * @property overworld: Overworld
         * @property nether: Nether
         * @property the_end: The End
         */
        static get dimensionsf(): {
            "minecraft:overworld": Dimension;
            "minecraft:nether": Dimension;
            "minecraft:the_end": Dimension;
            overworld: Dimension;
            nether: Dimension;
            the_end: Dimension;
        };
        /**
         * @remarks The overworld dimension object.
         */
        static get overworld(): Dimension & {
            typeId: "minecraft:overworld";
        };
        /**
         * @remarks The nether dimension object.
         */
        static get nether(): Dimension & {
            typeId: "minecraft:nether";
        };
        /**
         * @remarks The end dimension object.
         */
        static get the_end(): Dimension & {
            typeId: "minecraft:the_end";
        };
        static get players(): {
            [name: string]: Player;
        };
        static get stack(): Error["stack"];
        /**
         * @see {@link modules.Decimal}
         */
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
        static get srun(): typeof import("init/functions/srun").srun;
        /**
         * A class containing the configuration information for the add-on.
         * @see {@link modules.main.config}
         */
        static get config(): typeof import("init/classes/config").config;
        /**
         * A class containing configuration detailing which functions, classes, and constants from the modules to import into their respective properties on the global modules object.
         * @see {@link modules.main.moduleImportsConfig}
         */
        static get moduleImportsConfig(): typeof import("init/classes/moduleImportsConfig").moduleImportsConfig;
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
declare module "@minecraft/server" {
    interface ItemStack {
        hasComponent(componentId: keyof ItemComponentTypeMap): boolean;
    }
    interface VectorYZ {
        y: number;
        z: number;
    }
}
