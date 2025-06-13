export const registeredDeubgcustomcommandsCommand = CommandRegistry.registerCommand({
    commandName: "debugcustomcommands",
    aliases: [
        { type: "nameAccessibleAlias", commandName: "debugcustomcommand" },
        { type: "nameAccessibleAlias", commandName: "dcc" },
        { type: "prefixAccessibleAlias", commandName: "dcc", prefix: "534473426" },
        {
            type: "regexpAccessibleAlias",
            commandName: "debugcustomcommands",
            escregexp: {
                v: "^\\ddebugcustomcommands$",
                f: "i",
            },
            regexp: /^\ddebugcustomcommands$/i,
        },
    ],
    description: "Debugs the custom commands.",
    type: "built-in",
    accessType: "named",
    callback(player, event) {
        event.cancel = true;
        pdcsend(player, {
            message: "debug",
            event,
        });
        return {
            status: 0,
        };
    },
    formatting_code: "§d",
    requiredTags: ["debug"],
    command_version: "0.0.1",
    categories: ["system", "Entity Scale Add-On", "built-in"],
    ultraSecurityModeSecurityLevel: "admin",
    syntax: "\\debugcustomcommands",
});
registeredDeubgcustomcommandsCommand.categories;
//# sourceMappingURL=debugcustomcommands.command.js.map