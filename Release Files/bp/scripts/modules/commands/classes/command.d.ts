import { Player, Dimension } from "@minecraft/server";
import { type command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import { type evaluateParametersArgumentTypes } from "modules/commands/types/evaluateParametersArgumentTypes";
import { type commandCategory } from "modules/commands/types/commandCategory";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commands } from "modules/commands_list/constants/commands";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
declare namespace exports {
    /**
     * Represents a command.
     *
     * @typeParam {T} The type of the command.
     */
    class command<T extends "built-in" | "custom" | "unknown" = "unknown"> {
        /**
         * The type of the command.
         *
         * - `"built-in"`: Built-in command.
         * - `"custom"`: Custom command.
         * - `"unknown"`: Unknown command type.
         */
        type: T;
        /**
         * The name of the command.
         */
        commandName: string;
        /**
         * The currently entered command name, either the command name or an alias.
         */
        currentCommandName: string;
        /**
         * The parameters of the command.
         *
         * Only applies to custom commands.
         */
        parameters?: {
            /**
             * The name of the parameter.
             */
            name: string;
            /**
             * The internal type of the parameter.
             */
            internalType?: evaluateParametersArgumentTypes;
            /**
             * The type of the parameter.
             */
            type?: "string" | "integer" | "float" | "decimal" | "hexadecimal" | "binary" | "triary" | "base64" | "unicode" | "letter" | "regexp" | "text" | "message" | "any" | "customjson" | "escapablestring" | "boolean" | "array" | "number" | "object" | "javascript" | "json" | "identifier" | "targetselector" | "none" | string;
            /**
             * The display type of the parameter.
             */
            displayType?: "string" | "str" | "integer" | "int" | "float" | "flt" | "decimal" | "dec" | "hexadecimal" | "hex" | "binary" | "bin" | "triary" | "tri" | "base64" | "b64" | "unicode" | "uni" | "letter" | "let" | "regexp" | "regex" | "text" | "txt" | "message" | "msg" | "anything" | "any" | "customJSON" | "cJSON" | "escapableString" | "escString" | "escStr" | "boolean" | "bool" | "array" | "arry" | "number" | "num" | "object" | "obj" | "JavaScript" | "JS" | "JavaScriptObjectNotation" | "JSON" | "identifier" | "id" | "uuid" | "UUID" | "xuid" | "XUID" | "cuid" | "CUID" | "targetSelector" | "target" | "" | "none" | string;
            /**
             * The evaluation type of the parameter.
             */
            evaluationType?: string;
        }[];
        /**
         * The escaped regular expression to determine if a string is this command.
         */
        escregexp?: {
            v: string;
            f?: string;
        };
        /**
         * The current escaped regular expression to determine if a string is this command, either the regular expression or the regular expression of an alias.
         */
        currentescregexp?: {
            v: string;
            f?: string;
        };
        /**
         * The currently selected alias of the command, if the user is using an alias.
         */
        selectedalias?: {
            /**
             * The index of the alias.
             */
            index: number;
            /**
             * The details of the alias.
             */
            alias: {
                /**
                 * The name of the alias.
                 */
                commandName: string;
                /**
                 * The escaped regular expression of the alias.
                 */
                escregexp?: {
                    v: string;
                    f?: string;
                };
                /**
                 * The regular expression of the alias.
                 */
                regexp: RegExp;
                /**
                 * The name of the command the alias is an alias of.
                 */
                aliasTo?: string;
            };
        };
        /**
         * The version of the command.
         */
        command_version?: string;
        /**
         * The syntaxes of the command.
         */
        formats: command_formats_type_list;
        /**
         * The description of the command.
         */
        description?: string;
        /**
         * The version of the add-on that custom command was created in.
         */
        format_version: string;
        /**
         * The commands format version that the command was created in.
         */
        commands_format_version: string;
        /**
         * The ID of the custom command.
         */
        customCommandId?: string;
        /**
         * The ID of the command settings.
         */
        commandSettingsId: string;
        /**
         * The formatting code of the command.
         */
        formatting_code: string;
        /**
         * The type of the custom command.
         *
         * - "commands": The custom command uses vanilla Minecraft commands.
         * - "javascript": The custom command uses javascript.
         */
        customCommandType?: "commands" | "javascript";
        /**
         * The prefix of the custom command.
         */
        customCommandPrefix?: string;
        /**
         * Whether parameters should be automatcially evaluated for the command.
         */
        customCommandParametersEnabled?: boolean;
        /**
         * The number of lines of code in the custom command.
         */
        customCommandCodeLines?: number;
        /**
         * The list of parameters of the custom command.
         */
        customCommandParametersList?: evaluateParametersArgumentTypes[];
        /**
         * The category(ies) of the command.
         *
         * This is used in the manage commands menu to determine where it should appear.
         */
        category?: string | string[];
        /**
         * The categories of the command.
         *
         * This is used in the manage commands menu to determine where it should appear.
         */
        categories?: string[];
        /**
         * Creates an instance of the `command` class.
         * @param command The command to create.
         * @returns An instance of the `command` class.
         */
        constructor(command: {
            type: T;
            formatting_code?: string;
            category?: string | string[];
            customCommandParametersList?: evaluateParametersArgumentTypes[];
            customCommandCodeLines?: number;
            customCommandParametersEnabled?: boolean;
            customCommandPrefix?: string;
            customCommandType?: "commands" | "javascript";
            customCommandId?: string;
            commandSettingsId?: string;
            command_version?: string | number;
            commandName: string;
            description?: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            formats?: command_formats_type_list;
            format_version?: string | number;
            commands_format_version?: string | number;
        } | command<T>);
        /**
         * If the command is hidden.
         */
        get isHidden(): boolean;
        /**
         * If the command is deprecated.
         */
        get isDeprecated(): boolean;
        /**
         * If the command is functional.
         */
        get isFunctional(): boolean;
        /**
         * The release stage of the command.
         */
        get releaseStage(): string;
        /**
         * The regular expression to determine if a string is this command.
         */
        get regexp(): RegExp;
        /**
         * The current regular expression to determine if a string is this command, will be either the parsed regexp of the command or on of its aliases.
         */
        get currentregexp(): RegExp;
        /**
         * The aliases of the command.
         *
         * Only available if the command is a built-in command.
         */
        get aliases(): T extends "built-in" ? {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        }[] : undefined;
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         */
        get settings(): commandSettings<T>;
        /**
         * The ultra security mode security level of the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is enabled.
         *
         * - `owner`: Only the owner or people with the `andexdb.fullControl` or `andexdb.useOwnerLevelCommands` permissions can execute the command.
         * - `headAdmin`: Only players with the `andexdb.headAdmin` or `andexdb.useHeadAdminLevelCommands` permissions can execute the command.
         * - `admin`: Only players with the `andexdb.admin` or `andexdb.useAdminLevelCommands` permissions can execute the command.
         * - `moderator`: Only players with the `andexdb.moderator` or `andexdb.useModeratorLevelCommands` permissions can execute the command.
         * - `WorldEdit`: Only players with the `andexdb.WorldEdit` permission can execute the command.
         * - `everyone`: Everyone can execute the command.
         */
        get ultraSecurityModeSecurityLevel(): "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
        /**
         * The code of the custom command.
         *
         * If {@link customCommandType} is `commands`, the code will be a list of strings with vanilla Minecraft commands.
         *
         * If {@link customCommandType} is `javascript`, the code will be a list of strings that represent lines of JavaScript code, this should be merged together with newline characters.
         *
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         */
        get code(): string[];
        /**
         * Saves the custom command.
         *
         * @returns {string} The ID of the custom command.
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         */
        save(): string;
        /**
         * Removes the current command if it is a custom command.
         *
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         */
        remove(): void;
        /**
         * Tests if the given player can use this command.
         *
         * @param {loosePlayerType} player The player to test.
         * @returns {boolean} True if the player can use this command, false otherwise. If the player is an instance of the {@link executeCommandPlayerW} class, and there is no linked player, or the linked player is not online, the function will return false.
         * @throws {TypeError} If player is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
         */
        testCanPlayerUseCommand(player: loosePlayerType): boolean;
        /**
         * Runs the custom command.
         *
         * @param {string} commandstring The command string.
         * @param {loosePlayerType | Dimension} executor The executor of the command.
         * @param {Player | executeCommandPlayerW} [player] The player object that can be accessed by the code of the command.
         * @param {Object} [event] The event object that can be accessed by the code of the command.
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         * @throws {CommandError} If the vanilla minecraft command throws an error.
         * @throws {Error} If the custom command throws an error.
         * @throws {any} If the custom JavaScript code throws an error.
         */
        run(commandstring: string, executor: loosePlayerType | Dimension, player?: Player | executeCommandPlayerW, event?: Object): void;
        /**
         * Gets a command.
         *
         * @template T The type of the command.
         * @param {string} commandName The name of the command.
         * @param {T} [type="built-in"] The type of the command.
         * @returns {command<T>} The command.
         */
        static get<T extends "built-in" | "custom" | "unknown" = "built-in">(commandName: string, type: T): command<T>;
        /**
         * Gets a built-in command.
         * @param {string} commandString The command string to detect the command from.
         * @param {boolean} [returnCommandInsteadOfAlias = true] Whether or not to always return the main command, even if the detected command is an alias.
         * @returns {typeof commands[number] | { index: number; alias: typeof commands[number]["aliases"][number]; aliasTo: typeof commands[number] }} The built-in command.
         */
        static findBuiltIn(commandString: string, returnCommandInsteadOfAlias?: boolean): (typeof commands)[number] | {
            index?: number;
            alias?: Exclude<(typeof commands)[number]["aliases"], undefined>[number];
            aliasTo: (typeof commands)[number];
        } | undefined;
        /**
         * Gets the built-in commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"built-in">[]} The array of built-in commands.
         */
        static getDefaultCommands(noSort?: boolean): command<"built-in">[];
        /**
         * Gets the built-in commands of a category.
         * @param {commandCategory} category The category of the commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"built-in">[]} The array of built-in commands.
         */
        static getDefaultCommandsOfCategory(category: commandCategory, noSort?: boolean): command<"built-in">[];
        /**
         * Gets all of the aliases of the built-in commands.
         * @returns {{ [k: string]: { commandName: string; escregexp?: { v: string; f?: string }; regexp: RegExp; aliasTo?: string }[] }} The aliases of the built-in commands.
         */
        static getCommandAliases(): {
            [k in (typeof commands)[number]["commandName"]]: (typeof commands)[number]["aliases"];
        };
        /**
         * Gets all of the custom commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"custom">[]} The array of custom commands.
         */
        static getCustomCommands(noSort?: boolean): command<"custom">[];
        /**
         * The current prefix set for the chat commands.
         *
         * @default "\\"
         */
        static get defaultPrefix(): string;
        /**
         * The current prefix set for the chat commands.
         *
         * This is an alias of {@link defaultPrefix}.
         *
         * @default "\\"
         */
        static get dp(): string;
    }
}
export import command = exports.command;
export {};
