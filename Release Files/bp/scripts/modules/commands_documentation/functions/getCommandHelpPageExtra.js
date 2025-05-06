import { command } from "modules/commands/classes/command";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";
export function getCommandHelpPageExtra(commandName, player) {
    let cmd = command.get(commandName.slice(0, command.dp.length) == command.dp && commandName.slice(command.dp.length, command.dp.length + 1) != "\\"
        ? commandName.slice(1)
        : commandName, "built-in");
    return (!!!commanddescriptions[cmd.commandName] &&
        !!!commandsyntaxes[cmd.commandName] &&
        !!!commandflags[cmd.commandName] &&
        !!!cmd.command_version) ||
        cmd.isHidden
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName] ?? cmd.settings.defaultSettings?.description ?? "Missing"}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ??
            commandsyntaxes[cmd.commandName]?.replaceAll((cmd.commandName.startsWith("\\\\") ? command.dp + cmd.commandName.slice(1) : command.dp + cmd.commandName) + " ", (cmd.currentCommandName.startsWith("\\\\") ? command.dp + cmd.currentCommandName.slice(1) : command.dp + cmd.currentCommandName) + " ") ??
            tryget(() => typeof cmd.settings.defaultSettings.formats == "string"
                ? cmd.settings.defaultSettings.formats
                : cmd.settings.defaultSettings.formats instanceof Array
                    ? cmd.settings.defaultSettings.formats["map"]((v) => (!!v?.format ? v.format : v)).join(" ")
                    : typeof cmd.settings.defaultSettings.formats.format === "string"
                        ? cmd.settings.defaultSettings.formats.format
                        : JSON.stringify(cmd.settings.defaultSettings.formats.format)) ??
            "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version ? "" : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category ? "" : "§r\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings.defaultSettings ? "" : "§r\nDefault Required Tags: " + JSON.stringify(cmd.settings.defaultSettings.requiredTags)}${!!!cmd.settings.requiredTags ? "" : "§r\nRequired Tags: " + JSON.stringify(cmd.settings.requiredTags)}${!!!cmd.settings.requiresOp ? "" : "§r\nRequires OP: " + JSON.stringify(cmd.settings.requiresOp)}${!!!cmd.settings.requiredPermissionLevel ? "" : "§r\nRequired Permission Level: " + JSON.stringify(cmd.settings.requiredPermissionLevel)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled ? "§cDISABLED" : "§aENABLED"}${!cmd.isDeprecated ? "" : "\n§cThis command is deprecated!"}${cmd.isFunctional ? "" : "\n§cThis command is not functional!"}${!!player ? (cmd.testCanPlayerUseCommand(player) ? "" : "\n§cYou do not have permission to use this command!") : ""}§r${cmd.type === "built-in"
            ? `\nGo to the following page for more information: https://wiki.8crafter.com/andexdb/commands-list/${cmd.commandName.startsWith("\\\\") ? cmd.commandName.replace(/^\\+(?=[^\\])/, "-") : "-" + cmd.commandName}`
            : ""}`;
}
//# sourceMappingURL=getCommandHelpPageExtra.js.map