/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */
import { ChatSendBeforeEvent } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { commandCategory } from "modules/commands/types/commandCategory";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import type { ReplaceTypeOfKey } from "modules/utilities/functions/filterProperties";
import type { EscRegExp } from "modules/utilities/types/EscRegExp";
/**
 * A command registry command alias entry.
 */
export interface CommandAliasRegistryEntry<AliasType extends RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias = RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias> {
    /**
     * The command that the alias is for.
     */
    command: RegisteredCommand<CommandTypeBase>;
    /**
     * The alias of the command.
     */
    alias: AliasType;
}
/**
 * A regex-accessible command alias.
 *
 * Note: regex-accessible aliases do not support custom prefixes, if you want a custom prefix, use the {@link NameAccessibleCommandTypeAlias} type instead.
 */
export interface RegExpAccessibleCommandTypeAlias {
    /**
     * The type of the command alias.
     */
    type: "regexpAccessibleAlias";
    /**
     * The name of the command.
     */
    commandName: string;
    /**
     * The raw regular expression used to access the command alias.
     */
    escregexp: EscRegExp;
    /**
     * The regular expression used to access the command alias.
     */
    regexp: RegExp;
}
/**
 * A prefix-accessible command alias.
 *
 * This is a version of the {@link NameAccessibleCommandTypeAlias} type that allows for a custom prefix.
 */
export interface PrefixAccessibleCommandTypeAlias extends ReplaceTypeOfKey<NameAccessibleCommandTypeAlias, "type", "prefixAccessibleAlias"> {
    /**
     * The prefix of the command.
     *
     * @default config.chatCommandPrefix
     */
    prefix: string;
}
/**
 * A name-accessible command alias.
 *
 * Note: To use a custom prefix, use the {@link PrefixAccessibleCommandTypeAlias} type instead.
 */
export interface NameAccessibleCommandTypeAlias {
    /**
     * The type of the command alias.
     */
    type: "nameAccessibleAlias";
    /**
     * The name of the command.
     */
    commandName: string;
}
/**
 * The base type of command data.
 */
export interface CommandTypeBase {
    /**
     * The type of the command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The way the command is accessed.
     *
     * - `named` - Accessed through the command's name.
     * - `regexp` - Accessed through a regular expression.
     */
    accessType: "named" | "regexp";
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @default []
     */
    requiredTags?: string[];
    /**
     * The ultra security mode security level required to execute the command.
     *
     * @default "everyone"
     */
    ultraSecurityModeSecurityLevel?: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
    /**
     * The formatting code to display the command with.
     *
     * @default "§f"
     */
    formatting_code?: string;
    /**
     * The name of the command.
     */
    commandName: string;
    /**
     * The syntax of the command.
     *
     * @default "Syntax Missing"
     */
    syntax?: string;
    /**
     * The documentation on the flags parameters of the command.
     */
    flagsDocs?: string | undefined;
    /**
     * The version of the command.
     *
     * @default "1.0.0"
     */
    command_version?: string;
    /**
     * The description of the command.
     *
     * @default "Description Missing"
     */
    description?: string;
    /**
     * The aliases of the command.
     *
     * @default []
     */
    aliases?: (RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias)[];
    /**
     * The categories of the command.
     *
     * @default []
     */
    categories?: [commandCategory?, ...commandCategory[]];
    /**
     * Whether or not the command is deprecated.
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Whether or not the command is functional.
     *
     * @default true
     */
    functional?: boolean;
    /**
     * Whether or not the command is hidden.
     *
     * @default false
     */
    hidden?: boolean;
    /**
     * Whether or not the command is enabled.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * The callback function of the command.
     *
     * This function will be called in read-only mode.
     *
     * @param {executeCommandPlayerW} player The player that executed the command.
     * @param {ChatSendBeforeEvent} event The event that triggered the command.
     * @returns {CommandResponse} The response of the command execution.
     *
     * @throws {any} If the command throws an error.
     */
    callback: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => CommandResponse;
}
/**
 * The type of command data with an `accessType` of `named`.
 */
export interface NameAccessibleCommandType extends CommandTypeBase {
    accessType: "named";
    /**
     * The custom prefix of the command.
     */
    customPrefix?: undefined;
}
/**
 * The type of command data with an `accessType` of `named` and a `customPrefix`.
 */
export interface PrefixAccessibleCommandType extends CommandTypeBase {
    accessType: "named";
    /**
     * The custom prefix of the command.
     */
    customPrefix: string;
}
/**
 * The type of command data with an `accessType` of `regexp`.
 */
export interface RegExpAccessibleCommandType extends CommandTypeBase {
    accessType: "regexp";
    /**
     * The regular expression used to access the command.
     */
    escregexp: {
        /**
         * The regular expression.
         *
         * It should not include the surrounding `/`.
         */
        v: string;
        /**
         * The flags of the regular expression.
         */
        f?: string;
    };
}
/**
 * The response type of a command execution.
 */
export interface CommandResponse {
    /**
     * The response status code of the command execution.
     *
     * - `0` - The command executed successfully.
     * - `1` - The command failed to execute.
     * - any other number - The command executed with a custom status code.
     */
    status: number;
    /**
     * The optional response message of the command execution.
     */
    message?: string;
    /**
     * The output when run from a command block.
     *
     * This will be the outputted redstone power level.
     *
     * @deprecated This is not functional yet.
     *
     * @default 15
     */
    commandBlockOutput?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
}
/**
 * Options for the {@link CommandRegistry.getCommand} method.
 */
export interface CommandRegistryGetCommandOptions {
    /**
     * The type of command to filter by.
     */
    typeFilter?: "built-in" | "custom";
    /**
     * Whether or not to include aliases.
     *
     * Note: Aliases will have a lower priority than actual commands, so if a command with the same name is found, it will be returned instead of the one referenced by the alias.
     *
     * @default true
     */
    includeAliases?: boolean;
}
/**
 * The data structure that holds the settings of a registered command.
 *
 * @see {@link RegisteredCommandSettings}
 */
export interface RegisteredCommandSettingsData {
    /**
     * The type of command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The ID of the dynamic property that holds the command settings.
     */
    commandSettingsId: string;
    /**
     * Whether or not the command is enabled.
     */
    enabled?: boolean;
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     */
    requiredTags?: string[];
    /**
     * The required permission level to execute the command.
     */
    requiredPermissionLevel?: string | number;
    /**
     * Whether or not the command requires operator status to execute.
     */
    requiresOp?: boolean;
    /**
     * The format version the command settings were last saved in.
     *
     * @see {@link command_settings_format_version}
     *
     * @see {@link legacy_command_settings_format_version}
     */
    settings_version: string;
}
/**
 * A class that manages the settings for a registered command.
 *
 * @template {Command} Command The type of the registered command that is having its settings managed.
 */
export declare class RegisteredCommandSettings<Command extends RegisteredCommand<CommandTypeBase>> {
    /**
     * The command that the settings are for.
     *
     * @readonly
     */
    readonly command: Command;
    /**
     * Creates a new instance of the {@link RegisteredCommandSettings} class.
     *
     * @param {Command} command The command to manage the settings for.
     *
     * @throws {Error} If the command does not have a `commandSettingsId` defined.
     */
    constructor(command: Command);
    /**
     * The parsed command settings data.
     *
     * @type {RegisteredCommandSettingsData | undefined}
     */
    get parsed(): RegisteredCommandSettingsData | undefined;
    /**
     * The default settings for the command.
     *
     * @type {RegisteredCommandSettingsData}
     */
    get defaultSettings(): RegisteredCommandSettingsData;
    /**
     * Whether or not the command is enabled.
     *
     * @type {boolean}
     */
    get enabled(): boolean;
    set enabled(enabled: boolean | undefined);
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string[]}
     *
     * @default ["canUseChatCommands"]
     */
    get requiredTags(): string[];
    set requiredTags(requiredTags: string[] | undefined);
    /**
     * The required permission level to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string | number}
     *
     * @default 0
     */
    get requiredPermissionLevel(): string | number;
    set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined);
    /**
     * Whether or not the command requires operator status to execute.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @deprecated The {@link Player.prototype.isOp} method is currently very buggy so this may not work as intended and should not be relied upon.
     *
     * @type {boolean}
     *
     * @default false
     */
    get requiresOp(): boolean;
    set requiresOp(requiresOp: boolean | undefined);
    /**
     * The format version the command settings were last saved in.
     *
     * @see {@link command_settings_format_version}
     *
     * @see {@link legacy_command_settings_format_version}
     *
     * @type {string}
     *
     * @default command_settings_format_version
     */
    get settings_version(): string;
    /**
     * Whether or not the command settings are saved in the world.
     *
     * @type {boolean}
     */
    get isSaved(): boolean;
    /**
     * Converts the command settings to a JSON-serializable object.
     *
     * @returns {RegisteredCommandSettingsData} The JSON-serializable object representing the command settings.
     */
    toJSON(): RegisteredCommandSettingsData;
    /**
     * Saves the command settings to the world.
     *
     * @param {Partial<RegisteredCommandSettingsData>} [settings] The settings to save, this will be applied on top of the current command settings.
     */
    save(settings?: Partial<RegisteredCommandSettingsData>): void;
    /**
     * Deletes the command settings from the world, in effect resetting the settings of the command to their default values.
     */
    reset(): void;
}
declare namespace exports {
    /**
     * A registered command.
     *
     * @template {CommandTypeBase} CommandType The type of the command data.
     */
    class RegisteredCommand<CommandType extends CommandTypeBase> {
        #private;
        /**
         * The data of the command.
         *
         * @readonly
         */
        readonly commandData: CommandType;
        /**
         * The type of command.
         *
         * @readonly
         */
        readonly type: "built-in" | "custom" | "unknown";
        /**
         * The type of access to the command.
         *
         * @readonly
         */
        readonly accessType: CommandType["accessType"];
        /**
         * The ID of the command.
         *
         * @readonly
         */
        readonly id: string;
        /**
         * The name of the command.
         *
         * @readonly
         */
        readonly name: string;
        /**
         * The formatting code to display the command with.
         *
         * @default "§f"
         */
        formatting_code: string;
        /**
         * The name used to access the command.
         *
         * This is only defined if the {@link accessType} is `named`.
         *
         * @readonly
         */
        readonly commandName: CommandType extends NameAccessibleCommandType ? string : CommandType extends RegExpAccessibleCommandType ? undefined : string | undefined;
        /**
         * The custom prefix of the command.
         *
         * @readonly
         */
        readonly customPrefix: string | undefined;
        /**
         * The regular expression used to access the command.
         *
         * This is only defined if the {@link accessType} is `regexp`.
         *
         * @readonly
         */
        readonly regexp: CommandType extends NameAccessibleCommandType ? undefined : CommandType extends RegExpAccessibleCommandType ? RegExp : RegExp | undefined;
        /**
         * The syntax of the command.
         *
         * @default "Syntax Missing"
         */
        syntax: string;
        /**
         * The documentation on the flags parameters of the command.
         */
        flagsDocs: string | undefined;
        /**
         * The version of the command.
         *
         * @default "1.0.0"
         */
        command_version: string;
        /**
         * The description of the command.
         *
         * @default "Description Missing"
         */
        description: string;
        /**
         * The ID of the dynamic property that holds the command settings.
         *
         * @see {@link RegisteredCommandSettingsData.commandSettingsId}
         */
        commandSettingsId?: string;
        /**
         * The aliases of the command.
         *
         * @default []
         */
        aliases: (RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias)[];
        /**
         * The categories of the command.
         *
         * @default []
         */
        categories: commandCategory[];
        /**
         * Whether or not the command is deprecated.
         *
         * @default false
         */
        deprecated: boolean;
        /**
         * Whether or not the command is functional.
         *
         * @default true
         */
        functional: boolean;
        /**
         * Whether or not the command is hidden.
         *
         * @default false
         */
        hidden: boolean;
        /**
         * Whether or not the command is enabled.
         *
         * @default true
         */
        enabled: boolean;
        /**
         * The commands format version that the custom command was created in.
         *
         * @see {@link commands_format_version}
         *
         * @default commands_format_version
         */
        commands_format_version: string;
        /**
         * Creates a new command.
         *
         * @param {CommandType} commandData The data of the command.
         *
         * @throws {TypeError} If the {@link CommandType.type | commandData.type} property is not `built-in`, `custom`, or `unknown`.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is not `named` or `regexp`.
         * @throws {TypeError} If the {@link CommandType.commandName | commandData.commandName} property is not a string.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is `regexp` and the {@link commandData.escregexp} property is not defined.
         */
        constructor(
        /**
         * The data of the command.
         *
         * @readonly
         */
        commandData: CommandType);
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         *
         * If the {@link type} of the command is `unknown` then this will be `undefined`.
         *
         * @type {commandSettings<"built-in" | "custom"> | undefined}
         */
        get settings(): RegisteredCommandSettings<this> | undefined;
        /**
         * The tags required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
         *
         * @type {string[]}
         *
         * @default []
         */
        get defaultRequiredTags(): string[];
        /**
         * The ultra security mode security level required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is enabled.
         *
         * - `owner`: Only the owner or people with the `andexdb.fullControl` or `andexdb.useOwnerLevelCommands` permissions can execute the command.
         * - `headAdmin`: Only players with the `andexdb.headAdmin` or `andexdb.useHeadAdminLevelCommands` permissions can execute the command.
         * - `admin`: Only players with the `andexdb.admin` or `andexdb.useAdminLevelCommands` permissions can execute the command.
         * - `moderator`: Only players with the `andexdb.moderator` or `andexdb.useModeratorLevelCommands` permissions can execute the command.
         * - `WorldEdit`: Only players with the `andexdb.WorldEdit` permission can execute the command.
         * - `everyone`: Everyone can execute the command.
         *
         * @type {"owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"}
         *
         * @default "everyone"
         */
        get ultraSecurityModeSecurityLevel(): "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
        /**
         * Checks if the player can execute the command.
         *
         * @param {loosePlayerType} player The player to check.
         * @returns {boolean} True if the player can execute the command, false otherwise.
         *
         * @todo Finish the method.
         */
        playerCanExecute(player: loosePlayerType): boolean;
        /**
         * Runs the command.
         *
         * @param {executeCommandPlayerW} player The player who executed the command, depending on the command, can have the source player be a regular entity or block.
         * @param {ChatSendBeforeEvent} event The event that triggered the command.
         * @returns {CommandResponse} The response of the command execution.
         *
         * @throws {TypeError} If the method recieves more or less than 2 arguments.
         * @throws {TypeError} If the {@link player} paramter is not an instance of {@link executeCommandPlayerW}.
         * @throws {TypeError} If the {@link event} paramter is not an object.
         * @throws {any} If the command throws an error.
         */
        run(player: executeCommandPlayerW, event: ChatSendBeforeEvent): CommandResponse;
        /**
         * Unregisters the command.
         */
        unregister(): void;
    }
    /**
     * The command registry.
     */
    class CommandRegistry {
        /**
         * All registered commands, indexed by name.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCommandAliases}, {@link CommandRegistry.prefixedAccessCommandAliases}, and {@link CommandRegistry.regexpAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static commands;
        /**
         * All registered built-in commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}, {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}, and {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static builtInCommands;
        /**
         * All registered custom commands with their prefixes are included in their key in the map.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}, {@link CommandRegistry.prefixedAccessCustomCommandAliases}, and {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static customCommands;
        /**
         * All registered name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static namedAccessCommands;
        /**
         * All registered built-in name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static builtInNamedAccessCommands;
        /**
         * All registered custom name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static customNamedAccessCommands;
        /**
         * All registered prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static prefixedAccessCommands;
        /**
         * All registered built-in prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static builtInPrefixedAccessCommands;
        /**
         * All registered custom prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static customPrefixedAccessCommands;
        /**
         * All registered regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        private static regexpAccessCommands;
        /**
         * All registered built-in regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>>}
         */
        private static builtInRegexpAccessCommands;
        /**
         * All registered custom regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        private static customRegexpAccessCommands;
        /**
         * All registered name-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry[]>}
         */
        private static namedAccessCommandAliases;
        /**
         * All registered name-accessible built-in command aliases.
         */
        private static namedAccessBuiltInCommandAliases;
        /**
         * All registered name-accessible custom command aliases.
         */
        private static namedAccessCustomCommandAliases;
        /**
         * All registered prefix-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessCommandAliases;
        /**
         * All registered prefix-accessible built-in command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessBuiltInCommandAliases;
        /**
         * All registered prefix-accessible custom command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessCustomCommandAliases;
        /**
         * All registered regex-accessible command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessCommandAliases;
        /**
         * All registered regex-accessible built-in command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessBuiltInCommandAliases;
        /**
         * All registered regex-accessible custom command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessCustomCommandAliases;
        /**
         * Gets a command by the beginning of the command string.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {CommandRegistryGetCommandOptions} [options] The options for the command retrieval.
         * @param {"built-in" | "custom"} [options.typeFilter] The type of command to filter by.
         * @param {boolean} [options.includeAliases=true] Whether or not to include aliases in the search. Defaults to `true`.
         * @returns {RegisteredCommand<CommandTypeBase> | undefined} The command, or undefined if not found.
         *
         * @throws {TypeError} If the {@link CommandRegistryGetCommandOptions.typeFilter | typeFilter} is not `built-in`, `custom`, or `undefined`.
         */
        static getCommand(commandName: string, options?: CommandRegistryGetCommandOptions): {
            command: RegisteredCommand<CommandTypeBase>;
            currentCommandName: string;
        } | undefined;
        /**
         * Gets a command by the beginning of the command string, but based on a player's permissions.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {loosePlayerType} player The player to check permissions for.
         * @param {CommandRegistryGetCommandOptions} [options] The options for the command retrieval.
         * @param {"built-in" | "custom"} [options.typeFilter] The type of command to filter by.
         * @param {boolean} [options.includeAliases=true] Whether or not to include aliases in the search. Defaults to `true`.
         * @returns {RegisteredCommand<CommandTypeBase> | undefined} The command, or undefined if not found.
         *
         * @throws {TypeError} If the {@link options.typeFilter} is not `built-in`, `custom`, or `undefined`.
         *
         * @todo Add support for command aliases.
         */
        static getCommandForPlayer(commandName: string, player: loosePlayerType, options?: CommandRegistryGetCommandOptions): RegisteredCommand<CommandTypeBase> | undefined;
        /**
         * Gets all matching commands by the beginning of the command string.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {"built-in" | "custom"} [typeFilter] The type of command to filter by.
         * @returns {RegisteredCommand<CommandTypeBase>[]} The list of matching commands.
         *
         * @throws {TypeError} If the {@link typeFilter} is not `built-in`, `custom`, or `undefined`.
         *
         * @todo Add support for command aliases.
         */
        static getCommands(commandName: string, typeFilter?: "built-in" | "custom"): RegisteredCommand<CommandTypeBase>[];
        /**
         * Registers a command.
         *
         * @template {CommandTypeBase} CommandType The type of the command data.
         * @param {CommandType} commandData The command data.
         * @returns {RegisteredCommand<CommandType>} The registered command.
         *
         * @throws {TypeError} If the method recieves more or less than 1 argument.
         * @throws {TypeError} If the {@link commandData} paramter is not an object.
         * @throws {TypeError} If the {@link CommandType.type | commandData.type} property is not `built-in`, `custom`, or `unknown`.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is not `named` or `regexp`.
         * @throws {TypeError} If the {@link CommandType.commandName | commandData.commandName} property is not a string.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is `regexp` and the {@link commandData.escregexp} property is not defined.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} is not an object.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} that is not `nameAccessibleAlias`, `prefixAccessibleAlias`, or `regexpAccessibleAlias`.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.commandName | commandName} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has an {@link RegExpAccessibleCommandTypeAlias.escregexp | escregexp} that is not an object.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `prefixAccessibleAlias` and has a {@link PrefixAccessibleCommandTypeAlias.prefix | prefix} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `regexpAccessibleAlias` and has an {@link EscRegExp.v | escregexp.v} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `regexpAccessibleAlias` and has an {@link EscRegExp.f | escregexp.f} that is not a string or `undefined`.
         */
        static registerCommand<CommandType extends NameAccessibleCommandType | PrefixAccessibleCommandType | RegExpAccessibleCommandType>(commandData: CommandType): RegisteredCommand<CommandType>;
        /**
         * Unregisters a command.
         *
         * @param {RegisteredCommand<CommandTypeBase>} command The command to unregister.
         * @returns {boolean} Whether or not the command was successfully unregistered, if `false`, the command was not found in the registry, so it was either already unregistered or never registered in the first place.
         *
         * @throws {TypeError} If the method recieves more or less than 1 argument.
         * @throws {TypeError} If the {@link command} paramter is not an instance of the {@link RegisteredCommand} class.
         * @throws {TypeError} If the one of the command's aliases has an invalid type.
         */
        static unregisterCommand(command: RegisteredCommand<CommandTypeBase>): boolean;
    }
}
export import RegisteredCommand = exports.RegisteredCommand;
export import CommandRegistry = exports.CommandRegistry;
declare global {
    namespace globalThis {
        export import RegisteredCommand = exports.RegisteredCommand;
        export import CommandRegistry = exports.CommandRegistry;
    }
}
export {};
