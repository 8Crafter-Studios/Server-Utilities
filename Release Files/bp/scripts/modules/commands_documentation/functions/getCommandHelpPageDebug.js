import { command } from "modules/commands/classes/command";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";
/**
 * Gets the help page for a built-in command, with extra debug information.
 *
 * @param {string} commandName The name of the command to get the help page for.
 * @param {loosePlayerType} [player] The player to check permissions for. If not specified, no permission check will be performed.
 * @returns {string} The help page for the command, or if the command does not exist, an instructional error message.
 */
export function getCommandHelpPageDebug(commandName, player, spacing = 0) {
    /**
     * The matched command.
     *
     * @type {command<"built-in"> | { command: RegisteredCommand<CommandTypeBase>; currentCommandName: string }}
     */
    let cmd = CommandRegistry.getCommand(commandName, { typeFilter: "built-in", includeAliases: true }) ??
        command.get(commandName.slice(0, command.dp.length) == command.dp && commandName.slice(command.dp.length, command.dp.length + 1) != "\\"
            ? commandName.slice(1)
            : commandName, "built-in");
    if (cmd instanceof command) {
        return (!!!commanddescriptions[cmd.commandName] &&
            !!!commandsyntaxes[cmd.commandName] &&
            !!!commandflags[cmd.commandName] &&
            !!!cmd.command_version) ||
            cmd.isHidden
            ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
            : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName]}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? "missing").split("\n").join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
                ? ""
                : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version ? "" : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!cmd.categories ? "" : "§r\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings?.defaultSettings
                ? ""
                : "§r\nBuilt-In Raw Command Data: " +
                    JSON.stringify(Object.fromEntries(Object.entries(cmd.settings.defaultSettings).map((v) => v[0] == "formatting_code"
                        ? [v[0], v[1]["replaceAll"]("§", "\uF019")]
                        : v)), (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, spacing)}${!!!cmd.settings
                ? ""
                : "§r\nRaw Settings: " +
                    JSON.stringify(Object.fromEntries(Object.entries(cmd.settings).map((v) => (v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v))), (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, spacing)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled ? "§cDISABLED" : "§aENABLED"}${!cmd.isDeprecated ? "" : "\n§cThis command is deprecated!"}${cmd.isFunctional ? "" : "\n§cThis command is not functional!"}${!!player ? (cmd.testCanPlayerUseCommand(player) ? "" : "\n§cYou do not have permission to use this command!") : ""}§r${cmd.type === "built-in"
                ? `\nGo to the following page for more information: https://wiki.8crafter.com/andexdb/commands-list/${cmd.commandName.startsWith("\\\\") ? cmd.commandName.replace(/^\\+(?=[^\\])/, "-") : "-" + cmd.commandName}`
                : ""}`;
    }
    else if (cmd.command instanceof RegisteredCommand && !cmd.command.hidden) {
        /**
         * The command name that was used, if an alias of the command was matched, it will be the alias name.
         *
         * @type {string}
         */
        const currentCommandName = cmd.currentCommandName;
        return `§e${cmd.command.name}${(cmd.command.aliases?.length ?? 0) != 0
            ? ` (also ${cmd.command.aliases
                .map((v) => v.type === "nameAccessibleAlias" ? v.commandName : v.type === "prefixAccessibleAlias" ? v.prefix + v.commandName : v.commandName)
                .join(", ")})`
            : ""}:\n${cmd.command.description}§r\nUsage:\n- ${cmd.command.syntax
            .split("\n")
            .map((s) => s.replaceAll((cmd.command.accessType === "named" ? (cmd.command.customPrefix !== undefined ? cmd.command.customPrefix : command.dp) : command.dp) +
            cmd.command.name, currentCommandName))}${!cmd.command.flagsDocs ? "" : "\nFlags:\n" + cmd.command.flagsDocs.split("\n").join("§r\n")}${"\nVersion: " + cmd.command.formatting_code + cmd.command.command_version}${!!!cmd
            ? ""
            : "§r\nBuilt-In Raw Command Data: " +
                colorizeJSONString(JSON.stringify(Object.fromEntries(Object.entries(cmd.command).map((v) => (v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v))), (k, v) => {
                    if (typeof v == "string") {
                        return "§r" + v + "§r";
                    }
                    else {
                        return v;
                    }
                }, spacing))}${!cmd.command.categories ? "" : "§r\nCategories: " + JSON.stringify(cmd.command.categories)}${!cmd.command.settings
            ? ""
            : "§r\nRaw Settings: " +
                colorizeJSONString(JSON.stringify(Object.fromEntries(Object.entries(cmd.command.settings)
                    .filter((v) => v[0] !== "defaultSettings")
                    .map((v) => (v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v))), (k, v) => {
                    if (typeof v == "string") {
                        return "§r" + v + "§r";
                    }
                    else {
                        return v;
                    }
                }, spacing))}§r\nType: ${cmd.command.type}§r\n${cmd.command.settings?.enabled === false ? "§cDISABLED" : "§aENABLED"}${!cmd.command.deprecated ? "" : "\n§cThis command is deprecated!"}${cmd.command.functional ? "" : "\n§cThis command is not functional!"}${player ? (cmd.command.playerCanExecute(player) ? "" : "\n§cYou do not have permission to use this command!") : ""}§r${cmd.command.type === "built-in"
            ? `\nGo to the following page for more information: https://wiki.8crafter.com/andexdb/commands-list/${cmd.command.name.startsWith("\\\\") ? cmd.command.name.replace(/^\\+(?=[^\\])/, "-") : "-" + cmd.command.name}`
            : ""}`;
    }
    return `§cError: Unknown command "${commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead. (Note: The type of the command match was invalid)`;
}
//# sourceMappingURL=getCommandHelpPageDebug.js.map