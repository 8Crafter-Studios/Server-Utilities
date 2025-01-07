import { command } from "modules/commands/classes/command";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";
export function getCommandHelpPageForModBayCommandsDocumentation(commandName) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return (!!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version)
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `${!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName}\n${(commanddescriptions[cmd.commandName] ?? cmd.settings.defaultSettings?.description).replaceAll(/§[a-zA-Z]/g, "")}\nCommand Syntax:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? commandsyntaxes[cmd.commandName] ?? tryget(() => cmd.formats["map"](v => !!v?.format ? v.format : v).join(" ")) ?? (typeof cmd.formats == "string" ? cmd.formats : undefined) ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? !!!commandflags[cmd.commandName]
                ? ""
                : "\nFlags:\n" + commandflags[cmd.commandName]
            : "\nFlags:\n" + commandflags[cmd.currentCommandName]}\nAliases: ${(cmd.aliases?.length ?? 0) != 0 ? `${JSON.stringify(cmd.aliases.map((v) => v.commandName))}` : "[]"}${!!!cmd.category
            ? ""
            : "\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings.defaultSettings
            ? ""
            : "\nDefault Required Tags: " + JSON.stringify(cmd.settings.defaultSettings.requiredTags)}${!!!cmd.command_version
            ? ""
            : "\nVersion: " + cmd.command_version}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replace(!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName, "<h3>" + (!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName) + "</h3>").replaceAll(/(?<!\<\/h3\>)\n(?!\<h3\>)/g, "</p>\n<p>").replaceAll(/(?<=\<\/h3\>)\n(?!\<h3\>)/g, "\n<p>").replaceAll(/(?<!\<\/h3\>)\n(?=\<h3\>)/g, "</p>\n") + "</p>";
}
//# sourceMappingURL=CMDHelpMB.js.map