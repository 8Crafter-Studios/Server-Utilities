import { world, Player, Dimension, PlayerPermissionLevel } from "@minecraft/server";
import { tfsb } from "init/functions/tfsb";
import { SemVerString } from "modules/main/classes/SemVerString";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import {} from "modules/commands/types/command_formats_type_list";
import {} from "modules/commands/types/evaluateParametersArgumentTypes";
import {} from "modules/commands/types/commandCategory";
import { evaluateParameters } from "modules/commands/functions/evaluateParameters";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { sOSATSA } from "modules/commands/functions/sOSATSA";
import { commands } from "modules/commands_list/constants/commands";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
var exports;
(function (exports) {
    /**
     * Represents a command.
     *
     * @typeParam {T} The type of the command.
     */
    class command {
        /**
         * The type of the command.
         *
         * - `"built-in"`: Built-in command.
         * - `"custom"`: Custom command.
         * - `"unknown"`: Unknown command type.
         */
        type;
        /**
         * The name of the command.
         */
        commandName;
        /**
         * The currently entered command name, either the command name or an alias.
         */
        currentCommandName;
        /**
         * The parameters of the command.
         *
         * Only applies to custom commands.
         */
        parameters;
        /**
         * The escaped regular expression to determine if a string is this command.
         */
        escregexp;
        /**
         * The current escaped regular expression to determine if a string is this command, either the regular expression or the regular expression of an alias.
         */
        currentescregexp;
        /**
         * The currently selected alias of the command, if the user is using an alias.
         */
        selectedalias;
        /**
         * The version of the command.
         */
        command_version;
        /**
         * The syntaxes of the command.
         */
        formats;
        /**
         * The description of the command.
         */
        description;
        /**
         * The version of the add-on that custom command was created in.
         */
        format_version = format_version;
        /**
         * The commands format version that the command was created in.
         */
        commands_format_version = commands_format_version;
        /**
         * The ID of the custom command.
         */
        customCommandId;
        /**
         * The ID of the command settings.
         */
        commandSettingsId;
        /**
         * The formatting code of the command.
         */
        formatting_code = "§r§f";
        /**
         * The type of the custom command.
         *
         * - "commands": The custom command uses vanilla Minecraft commands.
         * - "javascript": The custom command uses javascript.
         */
        customCommandType;
        /**
         * The prefix of the custom command.
         */
        customCommandPrefix;
        /**
         * Whether parameters should be automatcially evaluated for the command.
         */
        customCommandParametersEnabled;
        /**
         * The number of lines of code in the custom command.
         */
        customCommandCodeLines;
        /**
         * The list of parameters of the custom command.
         */
        customCommandParametersList;
        /**
         * The category(ies) of the command.
         *
         * This is used in the manage commands menu to determine where it should appear.
         */
        category;
        /**
         * The categories of the command.
         *
         * This is used in the manage commands menu to determine where it should appear.
         */
        categories;
        /**
         * Creates an instance of the `command` class.
         * @param command The command to create.
         * @returns An instance of the `command` class.
         */
        constructor(command) {
            this.type = command.type ?? "unknown";
            let commandtest = undefined;
            try {
                commandtest =
                    command.type == "built-in"
                        ? commands.find((v) => v.commandName == command.commandName) ??
                            (() => {
                                let a = commands.find((v) => !!v.aliases?.find((vb) => vb.commandName == command.commandName));
                                if (!!a) {
                                    this.selectedalias = {
                                        index: a.aliases?.findIndex((vb) => vb.commandName == command.commandName) ?? -9999,
                                        alias: new commandAlias(a)?.aliases?.find?.((vb) => vb.commandName == command.commandName),
                                    };
                                    return a;
                                }
                                else {
                                    return;
                                }
                            })()
                        : command.type == "custom"
                            ? tryget(() => JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find((v) => v == "customCommand:" + command.commandName) ?? "") ??
                                "undefined")))
                            : commands.find((v) => v.commandName == command.commandName) ??
                                (() => {
                                    let a = commands.find((v) => !!v.aliases?.find((vb) => vb.commandName == command.commandName));
                                    if (!!a) {
                                        this.selectedalias = {
                                            index: a.aliases?.findIndex((vb) => vb.commandName == command.commandName) ?? -9999,
                                            alias: new commandAlias(a)?.aliases?.find?.((vb) => vb.commandName == command.commandName),
                                        };
                                        return new commandAlias(a);
                                    }
                                    else {
                                        return;
                                    }
                                })() ??
                                JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find((v) => v == "customCommand:" + command.commandName) ?? "") ??
                                    "undefined"));
            }
            catch { }
            this.description = command.description ?? commandtest?.description;
            this.commandName = this?.selectedalias?.alias?.aliasTo ?? command.commandName;
            this.currentCommandName = this?.selectedalias?.alias?.commandName ?? command.commandName;
            this.command_version = command.command_version ?? commandtest?.command_version;
            this.escregexp = command.escregexp ?? commandtest?.escregexp ?? { v: "^" + command.commandName + "$" };
            this.currentescregexp = command.escregexp ??
                this?.selectedalias?.alias?.escregexp ??
                commandtest?.escregexp ?? {
                v: "^" + this.currentCommandName + "$",
            };
            this.formats = command.formats ?? commandtest?.formats; /*
        this.parameters = command.parameters; */
            this.format_version = command.format_version ?? commandtest?.format_version ?? format_version;
            this.commands_format_version = command.commands_format_version ?? commandtest?.commands_format_version ?? commands_format_version;
            this.commandSettingsId =
                command.commandSettingsId ??
                    commandtest?.commandSettingsId ??
                    (command.type == "built-in" ? "built-inCommandSettings:" + command.commandName : "customCommandSettings:" + command.commandName);
            this.customCommandId = command.customCommandId ?? (this.type == "custom" ? "customCommand:" + command.commandName : undefined);
            this.formatting_code = command.formatting_code ?? commandtest?.formatting_code ?? "§r§f";
            this.customCommandType = command.customCommandType ?? commandtest?.customCommandType;
            this.customCommandPrefix = command.customCommandPrefix ?? commandtest?.customCommandPrefix;
            this.customCommandParametersEnabled = command.customCommandParametersEnabled ?? commandtest?.customCommandParametersEnabled;
            this.customCommandParametersList = command.customCommandParametersList ?? commandtest?.customCommandParametersList;
            this.customCommandCodeLines = command.customCommandCodeLines ?? commandtest?.customCommandCodeLines;
            this.category = command.category ?? commandtest?.category;
            this.categories = sOSATSA(command.category ?? commandtest?.category ?? []);
        }
        /**
         * If the command is hidden.
         */
        get isHidden() {
            return this?.settings?.defaultSettings?.hidden ?? false;
        }
        /**
         * If the command is deprecated.
         */
        get isDeprecated() {
            return this?.settings?.defaultSettings?.deprecated ?? false;
        }
        /**
         * If the command is functional.
         */
        get isFunctional() {
            return this.type == "custom" ? true : this?.settings?.defaultSettings?.functional ?? false;
        }
        /**
         * The release stage of the command.
         */
        get releaseStage() {
            return tryget(() => SemVerString.fromString(String(this.command_version)).pre_release_stage);
        }
        /**
         * The regular expression to determine if a string is this command.
         */
        get regexp() {
            return new RegExp(this?.escregexp?.v ?? "", this?.escregexp?.f);
        }
        /**
         * The current regular expression to determine if a string is this command, will be either the parsed regexp of the command or on of its aliases.
         */
        get currentregexp() {
            return new RegExp(this?.currentescregexp?.v ?? "", this?.currentescregexp?.f);
        }
        /**
         * The aliases of the command.
         *
         * Only available if the command is a built-in command.
         */
        get aliases() {
            return this.type == "built-in"
                ? commands
                    .find((v) => v.commandName == this.commandName)
                    ?.aliases?.map?.((v) => (() => {
                    let vb = { ...v };
                    vb.regexp = new RegExp(vb?.escregexp?.v ?? "", vb?.escregexp?.f);
                    vb.aliasTo = this.commandName;
                    return vb;
                })())
                : undefined;
        }
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         */
        get settings() {
            return new commandSettings(this.commandSettingsId, this);
        }
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
        get ultraSecurityModeSecurityLevel() {
            return (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                (this.type == "built-in" ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined));
            // (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[modules.cmds.command.get("mainmenu", "built-in").type=="custom"?"customCommandOverrides":"commandOverrides"][modules.cmds.command.get("mainmenu", "built-in").commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][modules.cmds.command.get("mainmenu", "built-in").categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (modules.cmds.command.get("mainmenu", "built-in").type=="built-in"?modules.cmdslist.commands.find(c=>c.commandName==modules.cmds.command.get("mainmenu", "built-in").commandName)?.ultraSecurityModeSecurityLevel:undefined))
        }
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
        get code() {
            if (this.type == "custom") {
                if (this?.customCommandId != undefined) {
                    return world
                        .getDynamicPropertyIds()
                        .filter((v) => v.startsWith("customCommandCode:" + this.commandName + ":"))
                        .sort((a, b) => Number(a?.split(":")?.slice(-1)[0]) - Number(b?.split(":")?.slice(-1)[0]))
                        .map((v) => String(world.getDynamicProperty(v)));
                }
                else {
                    throw new TypeError("Cannot get the code of the command because the customCommandId is undefined. ");
                }
            }
            else {
                throw new TypeError("Cannot get the code of the command because it is not a custom command or the type of the command is unknown. ");
            }
        } /*
    get testPlayerCanUse(){return Number(this.unbanDate)-Date.now()}
    get timeRemaining(){let time = new Date(Math.abs((Number(this.unbanDate)-Date.now()))+(new Date().setUTCFullYear(0))); let timeList = {days: (-1*Number(this.isExpired)+1)*Math.floor((time.getTime()-(new Date().setUTCFullYear(0)))/86400000), hours: (-1*Number(this.isExpired)+1)*time.getHours(), minutes: (-1*Number(this.isExpired)+1)*time.getMinutes(), seconds: (-1*Number(this.isExpired)+1)*time.getSeconds(), milliseconds: (-1*Number(this.isExpired)+1)*time.getMilliseconds()}; return timeList}*/
        /**
         * Saves the custom command.
         *
         * @returns {string} The ID of the custom command.
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         */
        save() {
            if (this.type == "custom") {
                if (this?.customCommandId != undefined) {
                    world.setDynamicProperty(this?.customCommandId, JSON.stringify(this));
                    return this?.customCommandId;
                }
                else {
                    throw new TypeError("Cannot save command because the customCommandId is undefined. ");
                }
            }
            else {
                throw new TypeError("Cannot save command because it is not a custom command or the type of the command is unknown. ");
            }
        }
        /**
         * Removes the current command if it is a custom command.
         *
         * @throws {TypeError} If the command is not a custom command (Tests if the {@link type} property is `custom`).
         * @throws {TypeError} If the {@link customCommandId} property is undefined.
         */
        remove() {
            if (this.type == "custom") {
                if (this?.customCommandId != undefined) {
                    world.setDynamicProperty(this?.customCommandId);
                }
                else {
                    throw new TypeError("Cannot remove command because the customCommandId is undefined. ");
                }
            }
            else {
                throw new TypeError("Cannot remove command because it is not a custom command or the type of the command is unknown. ");
            }
        }
        /**
         * Tests if the given player can use this command.
         *
         * @param {loosePlayerType} player The player to test.
         * @returns {boolean} True if the player can use this command, false otherwise. If the player is an instance of the {@link executeCommandPlayerW} class, and there is no linked player, or the linked player is not online, the function will return false.
         * @throws {TypeError} If player is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
         */
        testCanPlayerUseCommand(player) {
            const playerE = extractPlayerFromLooseEntityType(player);
            if (tfsb(!!player?.name ? player : { name: "" }) &&
                // @ts-expect-error
                this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]) {
                return true;
            }
            if (securityVariables.ultraSecurityModeEnabled) {
                if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "owner") {
                    if (!securityVariables.testPlayerForPermission(playerE, "andexdb.fullControl") &&
                        !securityVariables.testPlayerForPermission(playerE, "andexdb.useOwnerLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "headAdmin") {
                    if (!securityVariables.testPlayerForPermission(playerE, "andexdb.headAdmin") &&
                        !securityVariables.testPlayerForPermission(playerE, "andexdb.useHeadAdminLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "admin") {
                    if (!securityVariables.testPlayerForPermission(playerE, "andexdb.admin") &&
                        !securityVariables.testPlayerForPermission(playerE, "andexdb.useAdminLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "moderator") {
                    if (!securityVariables.testPlayerForPermission(playerE, "andexdb.moderator") &&
                        !securityVariables.testPlayerForPermission(playerE, "andexdb.useModeratorLevelCommands")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "WorldEdit") {
                    if (!securityVariables.testPlayerForPermission(playerE, "andexdb.useWorldEdit")) {
                        return false;
                    }
                }
                else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ??
                    securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find((c) => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ??
                    (this.type == "built-in"
                        ? commands.find((c) => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel
                        : undefined)) == "everyone") {
                }
            }
            else {
                if (!this.settings.requiredTags.map((v) => player.hasTag(v)).every((v) => v)) {
                    return false;
                }
                if (this.settings.requiresOp) {
                    if (player.playerPermissionLevel !== PlayerPermissionLevel.Operator) {
                        return false;
                    }
                }
                if (Number(player.getDynamicProperty("permissionLevel") ?? 0) < Number(this.settings.requiredPermissionLevel ?? 0) &&
                    this.settings.requiredPermissionLevel != 0) {
                    return false;
                }
            }
            return true;
        }
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
        run(commandstring, executor, player, event) {
            if (this.type == "custom") {
                if (this?.code != undefined) {
                    let eventData = event;
                    let params = [];
                    let evaluatedParameters = {};
                    if (this.customCommandParametersEnabled) {
                        evaluatedParameters = evaluateParameters(commandstring, (this.customCommandParametersList ?? ["presetText"]).map((v) => ({ type: v })));
                        params = evaluatedParameters.args;
                    }
                    if (this.customCommandType == "commands") {
                        this.code.forEach((v) => {
                            if (v != "" && !!v) {
                                executor.runCommand(eval("`" + String.raw `${v}` + "`"));
                            }
                        });
                    }
                    else {
                        eval(this.code.join("\n"));
                    }
                }
                else {
                    throw new TypeError("Cannot run command because the customCommandId is undefined. ");
                }
            }
            else {
                throw new TypeError("Cannot run command because it is not a custom command or the type of the command is unknown. ");
            }
        } /*
    static getBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?(s.startsWith("ban:")||s.startsWith("banId:")):(banType=="name"?s.startsWith("ban:"):banType=="id"?s.startsWith("banId:"):undefined)))}
    static getValidBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isValid:false)||(s.startsWith("banId:")?ban.getBan(s).isValid:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isValid:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isValid:false):undefined)))}
    static getExpiredBanIds(banType: string = "both"){return world.getDynamicPropertyIds().filter((s)=>(banType=="both"?((s.startsWith("ban:")?ban.getBan(s).isExpired:false)||(s.startsWith("banId:")?ban.getBan(s).isExpired:false)):(banType=="name"?(s.startsWith("ban:")?ban.getBan(s).isExpired:false):banType=="id"?(s.startsWith("banId:")?ban.getBan(s).isExpired:false):undefined)))}*/ /*
    saveBan(ban: ban){if(ban.type=="name"){world.setDynamicProperty(`ban:${ban.playerName}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerId}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{if(ban.type=="id"){world.setDynamicProperty(`idBan:${ban.playerId}`, `${Number(ban.removeAfterBanExpires)}||${ban.unbanDate.valueOf()}||${ban.banDate.valueOf()}||${ban.originalPlayerName.replaceAll("|", "\\|")}||${ban.bannedById}||${ban.bannedByName.replaceAll("|", "\\|")}||${ban.reason}`)}else{}}}*/ /*
            static saveBan(ban: {type: "name"|"id", unbanDate: Date|number, banDate: Date|number, bannedById: string|number, bannedByName: string, reason: string, removeAfterBanExpires?: boolean, playerName?: string, originalPlayerId?: string|number, playerId?: string|number, originalPlayerName?: string, format_version?: string|number, ban_format_version?: string|number, banId?: string}|ban){ban.removeAfterBanExpires = ban.removeAfterBanExpires ?? true; ban.format_version = ban.format_version ?? format_version; ban.ban_format_version = ban.ban_format_version ?? ban_format_version; if(ban.type=="name"){world.setDynamicProperty(ban.banId??`ban:${ban.banDate}:${ban.playerName}`, JSON.stringify(ban))}else{if(ban.type=="id"){world.setDynamicProperty(ban.banId??`idBan:${ban.banDate}:${ban.playerId}`, JSON.stringify(ban))}else{}}}*/ /*
        getBan(banId: string){let banString = String(world.getDynamicProperty(banId)).split("||"); this.removeAfterBanExpires=Boolean(Number(banString[0])); this.unbanDate=new Date(Number(banString[1])); this.banDate=new Date(Number(banString[2])); if(banId.startsWith("ban")){this.originalPlayerId=Number(banString[3]); this.playerName=banId.split(":").slice(1).join(":"); }else{if(banId.startsWith("idBan")){this.originalPlayerName=Number(banString[3]); this.playerName=Number(playerId.split(":")[1]); }else{}}; this.bannedById=Number(banString[4]); this.bannedByName=banString[5].replaceAll("\\|", "|"); this.playerName=banString.slice(6).join("||"); return this as ban}*/
        /**
         * Gets a command.
         *
         * @template T The type of the command.
         * @param {string} commandName The name of the command.
         * @param {T} [type="built-in"] The type of the command.
         * @returns {command<T>} The command.
         */
        static get(commandName, type) {
            if (type == "built-in") {
                return new command({ type: type, commandName: commandName });
            }
            else {
                if (type == "custom") {
                    return new command({
                        type: type,
                        commandName: commandName,
                    });
                }
                else {
                    if (type !== "unknown")
                        throw new TypeError(`Unknown command type: ${type}`);
                    return new command({
                        type: type,
                        commandName: commandName,
                    });
                }
            }
        }
        /**
         * Gets a built-in command.
         * @param {string} commandString The command string to detect the command from.
         * @param {boolean} [returnCommandInsteadOfAlias = true] Whether or not to always return the main command, even if the detected command is an alias.
         * @returns {typeof commands[number] | { index: number; alias: typeof commands[number]["aliases"][number]; aliasTo: typeof commands[number] }} The built-in command.
         */
        static findBuiltIn(commandString, returnCommandInsteadOfAlias = false) {
            let b = commands.find((v) => !!commandString.match(new command(v).regexp)) ??
                (() => {
                    let a = commands.find((v) => !!v.aliases?.find((vb) => !!commandString.match(new command(v).aliases.find((vc) => vc.commandName == vb.commandName)?.regexp ?? "")));
                    if (!!a) {
                        return returnCommandInsteadOfAlias
                            ? a
                            : {
                                index: a.aliases?.findIndex((vb) => !!commandString.match(new command(a).aliases?.find?.((vc) => vc.commandName == vb.commandName)?.regexp ?? "")),
                                alias: new commandAlias(a)?.aliases?.find((vb) => !!commandString.match(new command(a).aliases?.find?.((vc) => vc.commandName == vb.commandName)?.regexp ?? "")),
                                aliasTo: a,
                            };
                    }
                    else {
                        return undefined;
                    }
                })();
            return b;
        }
        /**
         * Gets the built-in commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"built-in">[]} The array of built-in commands.
         */
        static getDefaultCommands(noSort = false) {
            if (noSort) {
                return commands.map((v) => new command({
                    type: "built-in",
                    commandName: v.commandName,
                }));
            }
            else {
                return commands
                    .slice()
                    .sort((a, b) => (a.commandName < b.commandName ? -1 : a.commandName > b.commandName ? 1 : 0))
                    .map((v) => new command({
                    type: "built-in",
                    commandName: v.commandName,
                }));
            }
        }
        /* static getDefaultCommandsOfCategory(
        category: commandCategory,
        noSort?: boolean
    ): command<"built-in">[];
    static getDefaultCommandsOfCategory(
        category: string,
        noSort?: boolean
    ): command<"built-in">[]; */
        /**
         * Gets the built-in commands of a category.
         * @param {commandCategory} category The category of the commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"built-in">[]} The array of built-in commands.
         */
        static getDefaultCommandsOfCategory(category, noSort = false) {
            if (noSort) {
                return commands
                    .filter((v) => (typeof v.category == "string" ? category == v.category : v.category?.includes(category)))
                    .map((v) => new command({
                    type: "built-in",
                    commandName: v.commandName,
                }));
            }
            else {
                return commands
                    .filter((v) => (typeof v.category == "string" ? category == v.category : v.category?.includes(category)))
                    .sort((a, b) => (a.commandName < b.commandName ? -1 : a.commandName > b.commandName ? 1 : 0))
                    .map((v) => new command({
                    type: "built-in",
                    commandName: v.commandName,
                }));
            }
        }
        /**
         * Gets all of the aliases of the built-in commands.
         * @returns {{ [k: string]: { commandName: string; escregexp?: { v: string; f?: string }; regexp: RegExp; aliasTo?: string }[] }} The aliases of the built-in commands.
         */
        static getCommandAliases() {
            return Object.fromEntries(commands
                .filter((v) => (v.aliases?.length ?? 0) != 0)
                .map((v) => [
                new command({
                    type: "built-in",
                    commandName: v.commandName,
                }).commandName,
                new command({
                    type: "built-in",
                    commandName: v.commandName,
                }).aliases,
            ]));
        }
        /**
         * Gets all of the custom commands.
         * @param {boolean} [noSort = false] If set to true, it will not sort the commands.
         * @returns {command<"custom">[]} The array of custom commands.
         */
        static getCustomCommands(noSort = false) {
            try {
                if (noSort) {
                    return world
                        .getDynamicPropertyIds()
                        .filter((v) => v.startsWith("customCommand:"))
                        .map((v) => new command({
                        type: "custom",
                        commandName: v.slice(14),
                    }));
                }
                else {
                    return world
                        .getDynamicPropertyIds()
                        .filter((v) => v.startsWith("customCommand:"))
                        .map((v) => new command({
                        type: "custom",
                        commandName: v.slice(14),
                    }))
                        .sort((a, b) => (a.commandName < b.commandName ? -1 : a.commandName > b.commandName ? 1 : 0));
                }
            }
            catch (e) {
                console.error(e, e.stack);
                throw e;
            }
        } /*
static getBans(){let bans: ban[]; bans = []; ban.getBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static getValidBans(){let bans: ban[]; bans = []; ban.getValidBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static getExpiredBans(){let bans: ban[]; bans = []; ban.getExpiredBanIds().forEach((b)=>{try{bans.push(ban.getBan(b))}catch(e){console.error(e, e.stack)}}); return {idBans: bans.filter((b)=>(b.type=="id")), nameBans: bans.filter((b)=>(b.type=="name")), allBans: bans}}
static testForBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:(ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false)}
static testForNameBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().nameBans.find(b=>b.isValid&&b.playerName==player.name)!=undefined?true:false}
static testForIdBannedPlayer(player: Player|savedPlayer|savedPlayerData){return ban.getBans().idBans.find(b=>b.isValid&&b.playerId==player.id)!=undefined?true:false}
static executeOnBannedPlayers(callbackfn: (player: Player, index: Number, array: any[])=>unknown){let feedback: any[]; feedback = []; world.getAllPlayers().filter((p)=>ban.testForBannedPlayer(p)).forEach((p, i, a)=>{try{feedback.push(callbackfn(p, i, a))}catch(e){feedback.push(e)}}); return feedback}*/
        /**
         * The current prefix set for the chat commands.
         *
         * @default "\\"
         */
        static get defaultPrefix() {
            return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
        }
        /**
         * The current prefix set for the chat commands.
         *
         * This is an alias of {@link defaultPrefix}.
         *
         * @default "\\"
         */
        static get dp() {
            return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
        }
    }
    exports.command = command;
    const commandAlias = command;
})(exports || (exports = {}));
export var command = exports.command;
//# sourceMappingURL=command.js.map