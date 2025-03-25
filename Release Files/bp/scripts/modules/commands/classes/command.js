import { world, Player, Entity, Dimension } from "@minecraft/server";
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
export class command {
    type;
    commandName;
    currentCommandName;
    parameters;
    escregexp;
    currentescregexp;
    selectedalias;
    command_version;
    formats;
    description;
    format_version = format_version;
    commands_format_version = commands_format_version;
    customCommandId;
    commandSettingsId;
    formatting_code = "§r§f";
    customCommandType;
    customCommandPrefix;
    customCommandParametersEnabled;
    customCommandCodeLines;
    customCommandParametersList;
    category;
    categories;
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
                        ? tryget(() => JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find((v) => v == "customCommand:" + command.commandName) ?? "") ?? "undefined")))
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
                            JSONParse(String(world.getDynamicProperty(world.getDynamicPropertyIds().find((v) => v == "customCommand:" + command.commandName) ?? "") ?? "undefined"));
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
    get isHidden() {
        return this?.settings?.defaultSettings?.hidden ?? false;
    }
    get isDeprecated() {
        return this?.settings?.defaultSettings?.deprecated ?? false;
    }
    get isFunctional() {
        return this.type == "custom" ? true : this?.settings?.defaultSettings?.functional ?? false;
    }
    get releaseStage() {
        return tryget(() => SemVerString.fromString(String(this.command_version)).pre_release_stage);
    }
    get regexp() {
        return new RegExp(this?.escregexp?.v ?? "", this?.escregexp?.f);
    }
    get currentregexp() {
        return new RegExp(this?.currentescregexp?.v ?? "", this?.currentescregexp?.f);
    }
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
    get settings() {
        return new commandSettings(this.commandSettingsId, this);
    }
    get ultraSecurityModeSecurityLevel() {
        return (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined));
        // (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[modules.cmds.command.get("mainmenu", "built-in").type=="custom"?"customCommandOverrides":"commandOverrides"][modules.cmds.command.get("mainmenu", "built-in").commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][modules.cmds.command.get("mainmenu", "built-in").categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (modules.cmds.command.get("mainmenu", "built-in").type=="built-in"?modules.cmdslist.commands.find(c=>c.commandName==modules.cmds.command.get("mainmenu", "built-in").commandName)?.ultraSecurityModeSecurityLevel:undefined))
    }
    ;
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
    testCanPlayerUseCommand(player) {
        if (!(player instanceof Player || (player instanceof executeCommandPlayerW && !!world.getAllPlayers().find((v) => v.id == player.player?.id)))) {
            return false;
        }
        const playerE = player instanceof executeCommandPlayerW ? player.player : player;
        assertIsDefined(playerE);
        if (tfsb(!!player?.name ? player : { name: "" }) &&
            // @ts-expect-error
            this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]) {
            return true;
        }
        if (securityVariables.ultraSecurityModeEnabled) {
            if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "owner") {
                if (!securityVariables.testPlayerForPermission(playerE, "andexdb.fullControl") && !securityVariables.testPlayerForPermission(playerE, "andexdb.useOwnerLevelCommands")) {
                    return false;
                }
            }
            else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "headAdmin") {
                if (!securityVariables.testPlayerForPermission(playerE, "andexdb.headAdmin") && !securityVariables.testPlayerForPermission(playerE, "andexdb.useHeadAdminLevelCommands")) {
                    return false;
                }
            }
            else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "admin") {
                if (!securityVariables.testPlayerForPermission(playerE, "andexdb.admin") && !securityVariables.testPlayerForPermission(playerE, "andexdb.useAdminLevelCommands")) {
                    return false;
                }
            }
            else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "moderator") {
                if (!securityVariables.testPlayerForPermission(playerE, "andexdb.moderator") && !securityVariables.testPlayerForPermission(playerE, "andexdb.useModeratorLevelCommands")) {
                    return false;
                }
            }
            else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "WorldEdit") {
                if (!securityVariables.testPlayerForPermission(playerE, "andexdb.useWorldEdit")) {
                    return false;
                }
            }
            else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c => !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c])] ?? (this.type == "built-in" ? commands.find(c => c.commandName == this.commandName)?.ultraSecurityModeSecurityLevel : undefined)) == "everyone") {
            }
        }
        else {
            if (!this.settings.requiredTags.map((v) => player.hasTag(v)).every((v) => v)) {
                return false;
            }
            if (this.settings.requiresOp) {
                if (!(tryget(() => player.isOp()) ?? true)) {
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
    static get(commandName, type = "built-in") {
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
                return new command({
                    type: type,
                    commandName: commandName,
                });
            }
        }
    }
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
                    return;
                }
            })();
        return b;
    }
    static getDefaultCommands(noSort = false) {
        try {
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
        catch (e) {
            console.error(e, e.stack);
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
    static getDefaultCommandsOfCategory(category, noSort = false) {
        try {
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
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static getCommandAliases() {
        try {
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
        catch (e) {
            console.error(e, e.stack);
        }
    }
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
    static get defaultPrefix() {
        return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
    }
    static get dp() {
        return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
    }
}
const commandAlias = command;
//# sourceMappingURL=command.js.map