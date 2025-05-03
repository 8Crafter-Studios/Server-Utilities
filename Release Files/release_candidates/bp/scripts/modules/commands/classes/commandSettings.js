import { world } from "@minecraft/server";
import { command, command as commandClass } from "modules/commands/classes/command";
import { command_settings_format_version } from "modules/commands/constants/command_settings_format_version";
import { commands } from "modules/commands_list/constants/commands";
export class commandSettings {
    type;
    commandName;
    customCommandId;
    commandSettingsId;
    command;
    defaultSettings;
    #unsaved_props = {};
    constructor(commandSettingsId, command) {
        this.type = (commandSettingsId.startsWith("built-inCommandSettings:")
            ? "built-in"
            : commandSettingsId.startsWith("customCommandSettings:")
                ? "custom"
                : "unknown");
        this.commandName = commandSettingsId.startsWith("built-inCommandSettings:")
            ? commandSettingsId.slice(24)
            : commandSettingsId.startsWith("customCommandSettings:")
                ? commandSettingsId.slice(22)
                : commandSettingsId;
        this.commandName =
            this.commandName.slice(0, commandClass.dp.length) ==
                commandClass.dp &&
                this.commandName.slice(commandClass.dp.length, commandClass.dp.length + 1) != "\\"
                ? "\\" + this.commandName
                : this.commandName;
        this.commandSettingsId = commandSettingsId;
        this.customCommandId =
            this.type == "custom"
                ? command?.customCommandId ??
                    "customCommand:" + this.commandName
                : undefined;
        this.command = command;
        this.defaultSettings =
            this.type == "built-in" || this.type == "unknown"
                ? commands.find((v) => v.commandName == this.commandName)
                : {
                    type: "custom",
                    requiredTags: ["canUseChatCommands"],
                    commandName: this.commandName,
                    customCommandId: this.customCommandId,
                    commandSettingsId: this.commandSettingsId,
                    enabled: true,
                    requiredPermissionLevel: 0,
                    requiresOp: false,
                    settings_version: this.settings_version,
                };
    }
    get parsed() {
        return JSONParse(String(world.getDynamicProperty(this.commandSettingsId)));
    }
    get enabled() {
        return (this?.parsed?.enabled ??
            this?.defaultSettings?.enabled ??
            true);
    }
    set enabled(enabled) {
        this.save({ enabled });
    }
    get requiredTags() {
        return (this?.parsed?.requiredTags ??
            this?.defaultSettings?.requiredTags ?? ["canUseChatCommands"]);
    }
    set requiredTags(requiredTags) {
        this.save({ requiredTags });
    }
    get requiredPermissionLevel() {
        return this?.parsed?.requiredPermissionLevel ?? 0;
    }
    set requiredPermissionLevel(requiredPermissionLevel) {
        this.save({ requiredPermissionLevel });
    }
    get requiresOp() {
        return this?.parsed?.requiresOp ?? false;
    }
    set requiresOp(requiresOp) {
        this.save({ requiresOp });
    } /*
    get description(){return this?.parsed?.description ?? true}*/
    get settings_version() {
        return (this?.parsed?.settings_version ?? command_settings_format_version);
    }
    get isSaved() {
        return world.getDynamicProperty(this.commandSettingsId) != undefined;
    }
    toJSON() {
        return Object.assign(JSONParse(JSONStringify(this.defaultSettings ?? {})), {
            type: this.type,
            commandName: this.commandName,
            customCommandId: this.customCommandId,
            commandSettingsId: this.commandSettingsId,
            enabled: this.enabled,
            requiredTags: this.requiredTags,
            requiredPermissionLevel: this.requiredPermissionLevel,
            requiresOp: this.requiresOp,
            settings_version: this.settings_version,
        });
    }
    save(settings) {
        world.setDynamicProperty(this.commandSettingsId, JSONStringify(Object.assign(JSONParse(JSONStringify(this.defaultSettings ?? {
            type: this.type,
            commandName: this.commandName,
            customCommandId: this.customCommandId,
            commandSettingsId: this.commandSettingsId,
            enabled: this.enabled,
            requiredTags: this.requiredTags,
            requiredPermissionLevel: this.requiredPermissionLevel,
            requiresOp: this.requiresOp,
            settings_version: this.settings_version,
        })), settings ?? {})));
    }
    remove() {
        world.setDynamicProperty(this.commandSettingsId);
    }
}
//# sourceMappingURL=commandSettings.js.map