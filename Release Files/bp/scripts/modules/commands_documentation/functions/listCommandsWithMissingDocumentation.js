import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { helpCommandChatCommandsList } from "modules/commands_documentation/constants/helpCommandChatCommandsList";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";
import { commands } from "modules/commands_list/constants/commands";
export function listCommandsWithMissingDocumentation(options = {}) {
    const cmdsWithMissingDocs = [];
    commands.forEach(c => {
        const out = {
            commandName: c.commandName,
            syntax: false,
            description: false,
            flags: false,
            list: false,
        };
        if (commandsyntaxes[c.commandName] === undefined) {
            out.syntax = true;
        }
        ;
        if (commanddescriptions[c.commandName] === undefined) {
            out.description = true;
        }
        ;
        if (/\[-[a-zA-Z0-9]+\]/.test(commandsyntaxes[c.commandName] ?? JSON.stringify(c.formats ?? "") ?? "") && commandflags[c.commandName] === undefined) {
            out.flags = true;
        }
        else if (commandflags[c.commandName] !== undefined) {
            if ([...new Set(((commandsyntaxes[c.commandName] ?? JSON.stringify(c.formats ?? "") ?? "").match(/(?<=\[-)[a-zA-Z0-9]+(?=\])/g) ?? []).join("").split(""))].some(v => !commandflags[c.commandName].includes("\n" + v + ": ") || commandflags[c.commandName].startsWith(v + ": "))) {
                out.flags = true;
                out.missingFlagsList = [...new Set(((commandsyntaxes[c.commandName] ?? JSON.stringify(c.formats ?? "") ?? "").match(/(?<=\[-)[a-zA-Z0-9]+(?=\])/g) ?? []).join("").split(""))].filter(v => !commandflags[c.commandName].includes("\n" + v + ": ") || commandflags[c.commandName].startsWith(v + ": ")).join("");
            }
        }
        ;
        if (!helpCommandChatCommandsList.includes("\n." + (c.commandName.startsWith("\\\\") ? c.commandName.slice(1) : c.commandName) + " ")) {
            out.list = true;
        }
        ;
        if (!Object.values(out).filter(v => typeof v === "boolean").every(v => !v)) {
            if ((options.onlyFunctional === true ? c.functional === true : options.onlyNonFunctional === true ? c.functional === false : true) && (options.onlyNonVersion0 === true ? c.command_version !== "0.0.0" : options.onlyVersion0 === true ? c.command_version === "0.0.0" : true) && (options.onlyNonDeprecated === true ? c.deprecated === false : options.onlyDeprecated === true ? c.deprecated === true : true)) {
                cmdsWithMissingDocs.push(out);
            }
        }
        ;
    });
    return cmdsWithMissingDocs;
}
//# sourceMappingURL=listCommandsWithMissingDocumentation.js.map