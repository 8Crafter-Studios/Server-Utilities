/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */
import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import { tfsb } from "init/functions/tfsb";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { command_settings_format_version } from "modules/commands/constants/command_settings_format_version";
/**
 * A class that manages the settings for a registered command.
 *
 * @template {Command} Command The type of the registered command that is having its settings managed.
 */
export class RegisteredCommandSettings {
    /**
     * The command that the settings are for.
     *
     * @readonly
     */
    command;
    /**
     * Creates a new instance of the {@link RegisteredCommandSettings} class.
     *
     * @param {Command} command The command to manage the settings for.
     *
     * @throws {Error} If the command does not have a `commandSettingsId` defined.
     */
    constructor(command) {
        this.command = command;
        assertIsDefined(this.command.commandSettingsId);
        Object.defineProperties(this, {
            command: {
                writable: false,
            },
        });
    }
    /**
     * The parsed command settings data.
     *
     * @type {RegisteredCommandSettingsData | undefined}
     */
    get parsed() {
        /**
         * The stringified command settings JSON data.
         *
         * @type {boolean | number | string | Vector3 | undefined}
         */
        const data = world.getDynamicProperty(this.command.commandSettingsId);
        if (typeof data === "string") {
            /**
             * The parsed command settings data.
             *
             * @type {RegisteredCommandSettingsData}
             */
            const parsedData = JSONB.parse(data);
            if (typeof parsedData === "object" && parsedData !== null) {
                return parsedData;
            }
            else {
                console.warn(`Invalid command settings data for command "${this.command.commandName}": ${data}`);
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    /**
     * The default settings for the command.
     *
     * @type {RegisteredCommandSettingsData}
     */
    get defaultSettings() {
        return {
            type: this.command.type,
            commandSettingsId: this.command.commandSettingsId,
            enabled: this.command.enabled,
            requiredTags: this.command.defaultRequiredTags,
            requiredPermissionLevel: 0,
            requiresOp: false,
            settings_version: command_settings_format_version,
        };
    }
    /**
     * Whether or not the command is enabled.
     *
     * @type {boolean}
     */
    get enabled() {
        return this.parsed?.enabled ?? this.defaultSettings.enabled ?? true;
    }
    set enabled(enabled) {
        this.save({ enabled });
    }
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string[]}
     *
     * @default ["canUseChatCommands"]
     */
    get requiredTags() {
        return this.parsed?.requiredTags ?? this.defaultSettings.requiredTags ?? ["canUseChatCommands"];
    }
    set requiredTags(requiredTags) {
        this.save({ requiredTags });
    }
    /**
     * The required permission level to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string | number}
     *
     * @default 0
     */
    get requiredPermissionLevel() {
        return this.parsed?.requiredPermissionLevel ?? this.defaultSettings.requiredPermissionLevel ?? 0;
    }
    set requiredPermissionLevel(requiredPermissionLevel) {
        this.save({ requiredPermissionLevel });
    }
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
    get requiresOp() {
        return this.parsed?.requiresOp ?? false;
    }
    set requiresOp(requiresOp) {
        this.save({ requiresOp });
    }
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
    get settings_version() {
        return this.parsed?.settings_version ?? command_settings_format_version;
    }
    /**
     * Whether or not the command settings are saved in the world.
     *
     * @type {boolean}
     */
    get isSaved() {
        return world.getDynamicProperty(this.command.commandSettingsId) !== undefined;
    }
    /**
     * Converts the command settings to a JSON-serializable object.
     *
     * @returns {RegisteredCommandSettingsData} The JSON-serializable object representing the command settings.
     */
    toJSON() {
        return {
            ...this.defaultSettings,
            enabled: this.enabled,
            requiredTags: this.requiredTags,
            requiredPermissionLevel: this.requiredPermissionLevel,
            requiresOp: this.requiresOp,
            settings_version: this.settings_version,
        };
    }
    /**
     * Saves the command settings to the world.
     *
     * @param {Partial<RegisteredCommandSettingsData>} [settings] The settings to save, this will be applied on top of the current command settings.
     */
    save(settings) {
        world.setDynamicProperty(this.command.commandSettingsId, JSONB.stringify({
            ...this.parsed,
            type: this.command.type,
            commandSettingsId: this.command.commandSettingsId,
            settings_version: command_settings_format_version,
            ...settings,
        }));
    }
    /**
     * Deletes the command settings from the world, in effect resetting the settings of the command to their default values.
     */
    reset() {
        world.setDynamicProperty(this.command.commandSettingsId);
    }
}
var exports;
(function (exports) {
    /**
     * A registered command.
     *
     * @template {CommandTypeBase} CommandType The type of the command data.
     */
    class RegisteredCommand {
        commandData;
        /**
         * The type of command.
         *
         * @readonly
         */
        type;
        /**
         * The type of access to the command.
         *
         * @readonly
         */
        accessType;
        /**
         * The ID of the command.
         *
         * @readonly
         */
        id;
        /**
         * The name of the command.
         *
         * @readonly
         */
        name;
        /**
         * The tags required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
         *
         * @default []
         */
        #requiredTags;
        /**
         * The ultra security mode security level required to execute the command.
         *
         * Only applies when Ultra Security Mode is enabled.
         *
         * @default "everyone"
         */
        #ultraSecurityModeSecurityLevel = "everyone";
        /**
         * The formatting code to display the command with.
         *
         * @default "§f"
         */
        formatting_code = "§f";
        /**
         * The name used to access the command.
         *
         * This is only defined if the {@link accessType} is `named`.
         *
         * @readonly
         */
        commandName;
        /**
         * The custom prefix of the command.
         *
         * @readonly
         */
        customPrefix;
        /**
         * The regular expression used to access the command.
         *
         * This is only defined if the {@link accessType} is `regexp`.
         *
         * @readonly
         */
        regexp;
        /**
         * The syntax of the command.
         *
         * @default "Syntax Missing"
         */
        syntax;
        /**
         * The documentation on the flags parameters of the command.
         */
        flagsDocs;
        /**
         * The version of the command.
         *
         * @default "1.0.0"
         */
        command_version;
        /**
         * The description of the command.
         *
         * @default "Description Missing"
         */
        description;
        /**
         * The ID of the dynamic property that holds the command settings.
         *
         * @see {@link RegisteredCommandSettingsData.commandSettingsId}
         */
        commandSettingsId;
        /**
         * The aliases of the command.
         *
         * @default []
         */
        aliases;
        /**
         * The categories of the command.
         *
         * @default []
         */
        categories;
        /**
         * Whether or not the command is deprecated.
         *
         * @default false
         */
        deprecated;
        /**
         * Whether or not the command is functional.
         *
         * @default true
         */
        functional;
        /**
         * Whether or not the command is hidden.
         *
         * @default false
         */
        hidden;
        /**
         * Whether or not the command is enabled.
         *
         * @default true
         */
        enabled;
        /**
         * The commands format version that the custom command was created in.
         *
         * @see {@link commands_format_version}
         *
         * @default commands_format_version
         */
        commands_format_version = commands_format_version;
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
        #execute;
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
        commandData) {
            this.commandData = commandData;
            if (!["built-in", "custom", "unknown"].includes(commandData.type))
                throw new TypeError(`Invalid command type: ${commandData.type}`);
            if (!["named", "regexp"].includes(commandData.accessType))
                throw new TypeError(`Invalid command access type: ${commandData.accessType}`);
            if (typeof commandData.commandName !== "string")
                throw new TypeError(`Invalid command name type (expected string): ${typeof commandData.commandName}`);
            if (commandData.accessType === "regexp" && !commandData.escregexp)
                throw new TypeError(`Command access type "regexp" requires an "escregexp" property in the provided command data.`);
            this.type = commandData.type;
            this.accessType = commandData.accessType;
            this.id = commandData.commandName;
            this.name = commandData.commandName;
            this.commandName = (commandData.accessType === "named" ? commandData.commandName : undefined);
            this.regexp = (commandData.accessType === "regexp"
                ? RegExp(commandData.escregexp.v, commandData.escregexp.f)
                : undefined);
            this.commandSettingsId = commandData.type === "unknown" ? undefined : `${commandData.type}CommandSettings:` + this.id;
            this.#execute = commandData.callback;
            this.#requiredTags = commandData.requiredTags ?? [];
            this.#ultraSecurityModeSecurityLevel = commandData.ultraSecurityModeSecurityLevel ?? "everyone";
            this.categories = (commandData.categories ?? []);
            this.deprecated = commandData.deprecated ?? false;
            this.functional = commandData.functional ?? true;
            this.hidden = commandData.hidden ?? false;
            this.enabled = commandData.enabled ?? true;
            this.aliases = commandData.aliases ?? [];
            this.syntax = commandData.syntax ?? "Syntax Missing";
            this.flagsDocs = commandData.flagsDocs;
            this.command_version = commandData.command_version ?? "1.0.0";
            this.description = commandData.description ?? "Description Missing";
            Object.defineProperties(this, {
                commandData: {
                    writable: false,
                },
                type: {
                    writable: false,
                },
                accessType: {
                    writable: false,
                },
                id: {
                    writable: false,
                },
                name: {
                    writable: false,
                },
                commandName: {
                    writable: false,
                },
                customPrefix: {
                    writable: false,
                },
                regexp: {
                    writable: false,
                },
            });
        }
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         *
         * If the {@link type} of the command is `unknown` then this will be `undefined`.
         *
         * @type {commandSettings<"built-in" | "custom"> | undefined}
         */
        get settings() {
            return this.type === "unknown" && this.commandSettingsId !== undefined
                ? undefined
                : (new RegisteredCommandSettings(this));
        }
        /**
         * The tags required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
         *
         * @type {string[]}
         *
         * @default []
         */
        get defaultRequiredTags() {
            return [...this.#requiredTags];
        }
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
        get ultraSecurityModeSecurityLevel() {
            return (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.name] ??
                securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                this.#ultraSecurityModeSecurityLevel);
        }
        /**
         * Checks if the player can execute the command.
         *
         * @param {loosePlayerType} player The player to check.
         * @returns {boolean} True if the player can execute the command, false otherwise.
         *
         * @todo Finish the method.
         */
        playerCanExecute(player) {
            const playerToTest = extractPlayerFromLooseEntityType(player);
            if (tfsb(!!playerToTest?.name ? playerToTest : { name: "" }) &&
                // @ts-expect-error
                this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]) {
                return true;
            }
            if (securityVariables.ultraSecurityModeEnabled && !(this.type === "custom" && semver.gt(this.commands_format_version ?? "0.0.0", "33.12.17"))) {
                if (securityVariables.ultraSecurityModeEnabled) {
                    if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "owner") {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.fullControl") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useOwnerLevelCommands")) {
                            return false;
                        }
                    }
                    else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "headAdmin") {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.headAdmin") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useHeadAdminLevelCommands")) {
                            return false;
                        }
                    }
                    else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "admin") {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.admin") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useAdminLevelCommands")) {
                            return false;
                        }
                    }
                    else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "moderator") {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.moderator") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useModeratorLevelCommands")) {
                            return false;
                        }
                    }
                    else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "WorldEdit") {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.useWorldEdit")) {
                            return false;
                        }
                    }
                    else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                        securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                        (this.type == "built-in"
                            ? this.#ultraSecurityModeSecurityLevel
                            : undefined)) == "everyone") {
                    }
                }
                return true;
            }
            else {
                if (!(this.settings?.requiredTags ?? this.#requiredTags).map((v) => playerToTest.hasTag(v)).every((v) => v)) {
                    return false;
                }
                if (this.settings?.requiresOp ?? false) {
                    if (!(tryget(() => playerToTest.isOp()) ?? true)) {
                        return false;
                    }
                }
                if ((this.settings?.requiredPermissionLevel ?? 0) !== 0 &&
                    Number(playerToTest.getDynamicProperty("permissionLevel") ?? 0) < Number(this.settings.requiredPermissionLevel ?? 0)) {
                    return false;
                }
                return true;
            }
        }
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
        run(player, event) {
            if (arguments.length !== 2) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
            }
            if (!(player instanceof executeCommandPlayerW)) {
                throw new TypeError(`Function argument [0] (player) expected an instance of the executeCommandPlayerW class, but instead got ${getDetailedType(player)}.`);
            }
            if (typeof event !== "object") {
                throw new TypeError(`Function argument [1] (event) expected an object, but instead got ${getDetailedType(player)}.`);
            }
            return this.#execute(player, event);
        }
        /**
         * Unregisters the command.
         */
        unregister() {
            CommandRegistry.unregisterCommand(this);
        }
    }
    exports.RegisteredCommand = RegisteredCommand;
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
        static commands = new Map();
        /**
         * All registered built-in commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}, {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}, and {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        static builtInCommands = new Map();
        /**
         * All registered custom commands with their prefixes are included in their key in the map.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}, {@link CommandRegistry.prefixedAccessCustomCommandAliases}, and {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        static customCommands = new Map();
        /**
         * All registered name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        static namedAccessCommands = new Map();
        /**
         * All registered built-in name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        static builtInNamedAccessCommands = new Map();
        /**
         * All registered custom name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        static customNamedAccessCommands = new Map();
        /**
         * All registered prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        static prefixedAccessCommands = new Map();
        /**
         * All registered built-in prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        static builtInPrefixedAccessCommands = new Map();
        /**
         * All registered custom prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        static customPrefixedAccessCommands = new Map();
        /**
         * All registered regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        static regexpAccessCommands = new Map(); //`[regexp: RegExp, command: RegisteredCommand][] = new Map();
        /**
         * All registered built-in regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>>}
         */
        static builtInRegexpAccessCommands = new Map();
        /**
         * All registered custom regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        static customRegexpAccessCommands = new Map();
        /**
         * All registered name-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry[]>}
         */
        static namedAccessCommandAliases = new Map();
        /**
         * All registered name-accessible built-in command aliases.
         */
        static namedAccessBuiltInCommandAliases = new Map();
        /**
         * All registered name-accessible custom command aliases.
         */
        static namedAccessCustomCommandAliases = new Map();
        /**
         * All registered prefix-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        static prefixedAccessCommandAliases = new Map();
        /**
         * All registered prefix-accessible built-in command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        static prefixedAccessBuiltInCommandAliases = new Map();
        /**
         * All registered prefix-accessible custom command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        static prefixedAccessCustomCommandAliases = new Map();
        /**
         * All registered regex-accessible command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        static regexpAccessCommandAliases = new Map();
        /**
         * All registered regex-accessible built-in command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        static regexpAccessBuiltInCommandAliases = new Map();
        /**
         * All registered regex-accessible custom command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        static regexpAccessCustomCommandAliases = new Map();
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
        static getCommand(commandName, options = {}) {
            /**
             * The text matched when finding the command.
             */
            let currentCommandName = commandName;
            /**
             * The direct match for the command, if it exists.
             *
             * @type {RegisteredCommand<CommandTypeBase> | undefined}
             *
             * @default undefined
             */
            let directMatch = undefined;
            switch (options.typeFilter) {
                case "built-in":
                    directMatch =
                        this.builtInPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                            this.builtInNamedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled);
                    break;
                case "custom":
                    directMatch =
                        this.customPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                            this.customNamedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled);
                    break;
                case undefined:
                    directMatch =
                        this.prefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                            this.namedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled);
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            if (directMatch) {
                currentCommandName =
                    directMatch.accessType === "named"
                        ? directMatch.customPrefix !== undefined || commandName.startsWith(config.chatCommandPrefix)
                            ? commandName
                            : config.chatCommandPrefix + commandName
                        : commandName;
                return {
                    command: directMatch,
                    currentCommandName: currentCommandName,
                };
            }
            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;
            // If no direct match, and aliases are included, search for a matching name-accessible or prefix-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAlias of this[`namedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].get(commandNameWithoutPrefix) ?? []) {
                    if (commandAlias.command.enabled) {
                        return {
                            command: commandAlias.command,
                            currentCommandName: config.chatCommandPrefix + commandAlias.alias.commandName,
                        };
                    }
                }
                for (const commandAlias of this[`prefixedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].get(commandName) ?? []) {
                    if (commandAlias.command.enabled) {
                        return {
                            command: commandAlias.command,
                            currentCommandName: commandAlias.alias.prefix + commandAlias.alias.commandName
                        };
                    }
                }
            }
            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link options.typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey = options.typeFilter === "built-in"
                ? "builtInRegexpAccessCommands"
                : options.typeFilter === "custom"
                    ? "customRegexpAccessCommands"
                    : "regexpAccessCommands";
            // If no direct match or matching alias, search for a regex match
            for (const commands of this[regexpCommandsKey].values()) {
                if (commands[0].regexp.test(commandNameWithoutPrefix)) {
                    const match = commands?.find((command) => command.enabled);
                    if (match) {
                        return {
                            command: match,
                            currentCommandName: config.chatCommandPrefix + commandNameWithoutPrefix,
                        };
                    }
                }
            }
            // If no regex match, and aliases are included, search for a matching regex-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAliases of this[`regexpAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].values()) {
                    if (commandAliases[0].alias.regexp.test(commandNameWithoutPrefix)) {
                        const match = commandAliases?.find((commandAlias) => commandAlias.command.enabled);
                        if (match) {
                            return {
                                command: match.command,
                                currentCommandName: config.chatCommandPrefix + commandNameWithoutPrefix,
                            };
                        }
                    }
                }
            }
            // Return undefined if no match is found
            return undefined;
        }
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
        static getCommandForPlayer(commandName, player, options = {}) {
            /**
             * The player to check permissions for.
             *
             * @type {Player}
             */
            const playerToTest = extractPlayerFromLooseEntityType(player);
            /**
             * The direct match for the command, if it exists.
             *
             * @type {RegisteredCommand<CommandTypeBase> | undefined}
             *
             * @default undefined
             */
            let directMatch = undefined;
            switch (options.typeFilter) {
                case "built-in":
                    directMatch =
                        this.builtInPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                            this.builtInNamedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                case "custom":
                    directMatch =
                        this.customPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                            this.customNamedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                case undefined:
                    directMatch =
                        this.prefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                            this.namedAccessCommands
                                .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                                ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            if (directMatch) {
                return directMatch;
            }
            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;
            // If no direct match, and aliases are included, search for a matching name-accessible or prefix-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAlias of this[`namedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].get(commandNameWithoutPrefix) ?? []) {
                    if (commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest)) {
                        return commandAlias.command;
                    }
                }
                for (const commandAlias of this[`prefixedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].get(commandName) ?? []) {
                    if (commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest)) {
                        return commandAlias.command;
                    }
                }
            }
            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link options.typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey = options.typeFilter === "built-in"
                ? "builtInRegexpAccessCommands"
                : options.typeFilter === "custom"
                    ? "customRegexpAccessCommands"
                    : "regexpAccessCommands";
            // If no direct match or matching alias, search for a regex match
            for (const command of this[regexpCommandsKey].values()) {
                if (command[0].regexp.test(commandNameWithoutPrefix)) {
                    const match = command?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    if (match) {
                        return match;
                    }
                }
            }
            // If no regex match, and aliases are included, search for a matching regex-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAliases of this[`regexpAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`].values()) {
                    if (commandAliases[0].alias.regexp.test(commandNameWithoutPrefix)) {
                        const match = commandAliases?.find((commandAlias) => commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest));
                        if (match) {
                            return match.command;
                        }
                    }
                }
            }
            // Return undefined if no match is found
            return undefined;
        }
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
        static getCommands(commandName, typeFilter) {
            /**
             * The list of matching commands.
             *
             * @type {RegisteredCommand<CommandTypeBase>[]}
             *
             * @default []
             */
            let matches = [];
            switch (typeFilter) {
                case "built-in":
                    matches.push(...(this.builtInPrefixedAccessCommands.get(commandName) ?? []), ...(this.builtInNamedAccessCommands.get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName) ?? []));
                    break;
                case "custom":
                    matches.push(...(this.customPrefixedAccessCommands.get(commandName) ?? []), ...(this.customNamedAccessCommands.get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName) ?? []));
                    break;
                case undefined:
                    matches.push(...(this.prefixedAccessCommands.get(commandName) ?? []), ...(this.namedAccessCommands.get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName) ?? []));
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;
            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey = typeFilter === "built-in" ? "builtInRegexpAccessCommands" : typeFilter === "custom" ? "customRegexpAccessCommands" : "regexpAccessCommands";
            for (const command of this[regexpCommandsKey].values()) {
                if (command[0].regexp.test(commandNameWithoutPrefix)) {
                    matches.push(...command);
                }
            }
            // Return undefined if no match is found
            return matches;
        }
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
        static registerCommand(commandData) {
            if (arguments.length !== 1) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            }
            if (typeof commandData !== "object") {
                throw new TypeError(`Function argument [0] (commandData) expected an object, but instead got ${getDetailedType(commandData)}.`);
            }
            if (commandData.aliases instanceof Array && commandData.aliases.length > 0) {
                commandData.aliases.forEach((alias, index) => {
                    if (typeof alias !== "object") {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] is not an object.`);
                    }
                    if (![
                        "nameAccessibleAlias",
                        "prefixAccessibleAlias",
                        "regexpAccessibleAlias",
                    ].includes(alias.type)) {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] has an invalid type: ${alias.type}`);
                    }
                    if (!alias.commandName) {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a commandName.`);
                    }
                    if (typeof alias.commandName !== "string") {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] expected a commandName of type string, but instead got ${getDetailedType(alias.commandName)}.`);
                    }
                    switch (alias.type) {
                        case "nameAccessibleAlias":
                            break;
                        case "prefixAccessibleAlias": {
                            if (!alias.prefix) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a prefix.`);
                            }
                            if (typeof alias.prefix !== "string") {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] expected a prefix of type string, but instead got ${getDetailedType(alias.prefix)}.`);
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            if (!alias.escregexp) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a regular expression.`);
                            }
                            if (!alias.escregexp.v) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] is missing escregexp.v.`);
                            }
                            if (typeof alias.escregexp.v !== "string") {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] expected escregexp.v of type string, but instead got ${getDetailedType(alias.escregexp.v)}.`);
                            }
                            if (typeof alias.escregexp.f !== "string" && alias.escregexp.f !== undefined) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] expected escregexp.f of type string or undefined, but instead got ${getDetailedType(alias.escregexp.f)}.`);
                            }
                            if (!(alias.regexp instanceof RegExp))
                                alias.regexp = RegExp(alias.escregexp.v, alias.escregexp.f);
                            break;
                        }
                        default:
                            throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] has an invalid type: ${alias.type}`);
                    }
                });
            }
            /**
             * The {@link RegisteredCommand} instance that was created.
             *
             * @type {RegisteredCommand<CommandType>}
             */
            const registeredCommand = new RegisteredCommand(commandData);
            if (!this.commands.has(commandData.commandName)) {
                this.commands.set(commandData.commandName, []);
            }
            this.commands.get(commandData.commandName).splice(0, 0, registeredCommand);
            switch (commandData.type) {
                case "built-in":
                    if (!this.builtInCommands.has(commandData.commandName)) {
                        this.builtInCommands.set(commandData.commandName, []);
                    }
                    this.builtInCommands.get(commandData.commandName).splice(0, 0, registeredCommand);
                    break;
                case "custom":
                    if (!this.customCommands.has(commandData.commandName)) {
                        this.customCommands.set(commandData.commandName, []);
                    }
                    this.customCommands.get(commandData.commandName).splice(0, 0, registeredCommand);
                    break;
            }
            switch (commandData.accessType) {
                case "named":
                    if (commandData.customPrefix !== undefined) {
                        if (!this.prefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                            this.prefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                        }
                        this.prefixedAccessCommands
                            .get(commandData.customPrefix + commandData.commandName)
                            .splice(0, 0, registeredCommand);
                        switch (commandData.type) {
                            case "built-in":
                                if (!this.builtInPrefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                                    this.builtInPrefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                                }
                                this.builtInPrefixedAccessCommands
                                    .get(commandData.customPrefix + commandData.commandName)
                                    .splice(0, 0, registeredCommand);
                                break;
                            case "custom":
                                if (!this.customPrefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                                    this.customPrefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                                }
                                this.customPrefixedAccessCommands
                                    .get(commandData.customPrefix + commandData.commandName)
                                    .splice(0, 0, registeredCommand);
                                break;
                        }
                    }
                    else {
                        if (!this.namedAccessCommands.has(commandData.commandName)) {
                            this.namedAccessCommands.set(commandData.commandName, []);
                        }
                        this.namedAccessCommands.get(commandData.commandName).splice(0, 0, registeredCommand);
                        switch (commandData.type) {
                            case "built-in":
                                if (!this.builtInNamedAccessCommands.has(commandData.commandName)) {
                                    this.builtInNamedAccessCommands.set(commandData.commandName, []);
                                }
                                this.builtInNamedAccessCommands
                                    .get(commandData.commandName)
                                    .splice(0, 0, registeredCommand);
                                break;
                            case "custom":
                                if (!this.customNamedAccessCommands.has(commandData.commandName)) {
                                    this.customNamedAccessCommands.set(commandData.commandName, []);
                                }
                                this.customNamedAccessCommands
                                    .get(commandData.commandName)
                                    .splice(0, 0, registeredCommand);
                                break;
                        }
                    }
                    break;
                case "regexp": {
                    const key = RegExp(commandData.escregexp.v, commandData.escregexp.f).toString();
                    if (!this.regexpAccessCommands.has(key)) {
                        this.regexpAccessCommands.set(key, []);
                    }
                    this.regexpAccessCommands.get(key).splice(0, 0, registeredCommand);
                    switch (commandData.type) {
                        case "built-in":
                            if (!this.builtInRegexpAccessCommands.has(key)) {
                                this.builtInRegexpAccessCommands.set(key, []);
                            }
                            this.builtInRegexpAccessCommands
                                .get(key)
                                .splice(0, 0, registeredCommand);
                            break;
                        case "custom":
                            if (!this.customRegexpAccessCommands.has(key)) {
                                this.customRegexpAccessCommands.set(key, []);
                            }
                            this.customRegexpAccessCommands
                                .get(key)
                                .splice(0, 0, registeredCommand);
                            break;
                    }
                    break;
                }
            }
            if (registeredCommand.aliases.length > 0) {
                registeredCommand.aliases.forEach((alias, index) => {
                    switch (alias.type) {
                        case "nameAccessibleAlias":
                            if (!this.namedAccessCommandAliases.has(alias.commandName)) {
                                this.namedAccessCommandAliases.set(alias.commandName, []);
                            }
                            this.namedAccessCommandAliases.get(alias.commandName).splice(0, 0, {
                                command: registeredCommand,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.namedAccessBuiltInCommandAliases.has(alias.commandName)) {
                                        this.namedAccessBuiltInCommandAliases.set(alias.commandName, []);
                                    }
                                    this.namedAccessBuiltInCommandAliases.get(alias.commandName).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.namedAccessCustomCommandAliases.has(alias.commandName)) {
                                        this.namedAccessCustomCommandAliases.set(alias.commandName, []);
                                    }
                                    this.namedAccessCustomCommandAliases.get(alias.commandName).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        case "prefixAccessibleAlias": {
                            /**
                             * The alias key, with the prefix included.
                             *
                             * @type {string}
                             */
                            const aliasKey = `${alias.prefix}${alias.commandName}`;
                            if (!this.prefixedAccessCommandAliases.has(aliasKey)) {
                                this.prefixedAccessCommandAliases.set(aliasKey, []);
                            }
                            this.prefixedAccessCommandAliases.get(aliasKey).splice(0, 0, {
                                command: registeredCommand,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.prefixedAccessBuiltInCommandAliases.has(aliasKey)) {
                                        this.prefixedAccessBuiltInCommandAliases.set(aliasKey, []);
                                    }
                                    this.prefixedAccessBuiltInCommandAliases.get(aliasKey).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.prefixedAccessCustomCommandAliases.has(aliasKey)) {
                                        this.prefixedAccessCustomCommandAliases.set(aliasKey, []);
                                    }
                                    this.prefixedAccessCustomCommandAliases.get(aliasKey).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            /**
                             * The alias key, which is a string in the format `/${regexp}/${flags}`.
                             *
                             * @type {`/${string}/${string}`}
                             */
                            const aliasKey = `/${alias.escregexp.v}/${alias.escregexp.f ?? ""}`;
                            if (!this.regexpAccessCommandAliases.has(aliasKey)) {
                                this.regexpAccessCommandAliases.set(aliasKey, []);
                            }
                            this.regexpAccessCommandAliases.get(aliasKey).splice(0, 0, {
                                command: registeredCommand,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.regexpAccessBuiltInCommandAliases.has(aliasKey)) {
                                        this.regexpAccessBuiltInCommandAliases.set(aliasKey, []);
                                    }
                                    this.regexpAccessBuiltInCommandAliases.get(aliasKey).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.regexpAccessCustomCommandAliases.has(aliasKey)) {
                                        this.regexpAccessCustomCommandAliases.set(aliasKey, []);
                                    }
                                    this.regexpAccessCustomCommandAliases.get(aliasKey).splice(0, 0, {
                                        command: registeredCommand,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        }
                    }
                });
            }
            return registeredCommand;
        }
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
        static unregisterCommand(command) {
            if (arguments.length !== 1) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            }
            if (!(command instanceof RegisteredCommand)) {
                throw new TypeError(`Function argument [0] (command) expected an instance of the RegisteredCommand class, but instead got ${getDetailedType(command)}.`);
            }
            /**
             * Whether or not the command was successfully unregistered.
             *
             * @type {boolean}
             *
             * @default false
             */
            let success = false;
            [
                "commands",
                "builtInCommands",
                "customCommands",
                "namedAccessCommands",
                "builtInNamedAccessCommands",
                "customNamedAccessCommands",
                "prefixedAccessCommands",
                "builtInPrefixedAccessCommands",
                "customPrefixedAccessCommands",
                "regexpAccessCommands",
                "builtInRegexpAccessCommands",
                "customRegexpAccessCommands",
            ].forEach((key) => {
                /**
                 * The entries of the command registry map for the current key.
                 *
                 * @type {ReturnType<typeof CommandRegistry[typeof key]["entries"]>}
                 */
                const commandEntries = this[key].entries();
                for (const commandEntry of commandEntries) {
                    if (commandEntry[1].includes(command)) {
                        if (commandEntry[1].length === 1) {
                            this[key].delete(commandEntry[0]);
                        }
                        else {
                            commandEntry[1].splice(commandEntry[1].indexOf(command), 1);
                        }
                        success = true;
                        break;
                    }
                }
            });
            if (command.type !== "unknown") {
                command.aliases.forEach((alias) => {
                    switch (alias.type) {
                        case "nameAccessibleAlias": {
                            if (this.namedAccessCommandAliases.has(alias.commandName)) {
                                this.namedAccessCommandAliases.set(alias.commandName, this.namedAccessCommandAliases.get(alias.commandName).filter((alias) => alias.command !== command));
                                success = true;
                            }
                            if (this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(alias.commandName)) {
                                this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(alias.commandName, this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                    .get(alias.commandName)
                                    .filter((alias) => alias.command !== command));
                                success = true;
                            }
                            break;
                        }
                        case "prefixAccessibleAlias": {
                            /**
                             * The alias key, with the prefix included.
                             *
                             * @type {string}
                             */
                            const aliasKey = `${alias.prefix}${alias.commandName}`;
                            if (this.prefixedAccessCommandAliases.has(aliasKey)) {
                                this.prefixedAccessCommandAliases.set(aliasKey, this.prefixedAccessCommandAliases.get(aliasKey).filter((alias) => alias.command !== command));
                                success = true;
                            }
                            if (this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(aliasKey)) {
                                this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(aliasKey, this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                    .get(aliasKey)
                                    .filter((alias) => alias.command !== command));
                                success = true;
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            /**
                             * The alias key, which is a string in the format `/${regexp}/${flags}`.
                             *
                             * @type {`/${string}/${string}`}
                             */
                            const aliasKey = `/${alias.escregexp.v}/${alias.escregexp.f ?? ""}`;
                            if (this.regexpAccessCommandAliases.has(aliasKey)) {
                                this.regexpAccessCommandAliases.set(aliasKey, this.regexpAccessCommandAliases.get(aliasKey).filter((alias) => alias.command !== command));
                                success = true;
                            }
                            if (this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(aliasKey)) {
                                this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(aliasKey, this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                    .get(aliasKey)
                                    .filter((alias) => alias.command !== command));
                                success = true;
                            }
                            break;
                        }
                        default:
                            throw new TypeError(`Unknown command alias type: ${alias.type}`);
                    }
                });
            }
            return success;
        }
    }
    exports.CommandRegistry = CommandRegistry;
})(exports || (exports = {}));
export var RegisteredCommand = exports.RegisteredCommand;
export var CommandRegistry = exports.CommandRegistry;
Object.defineProperties(globalThis, {
    RegisteredCommand: {
        value: exports.RegisteredCommand,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    CommandRegistry: {
        value: exports.CommandRegistry,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=CommandRegistry.js.map