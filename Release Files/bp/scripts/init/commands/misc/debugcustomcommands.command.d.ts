import type { CommandResponse } from "init/classes/CommandRegistry";
export declare const registeredDeubgcustomcommandsCommand: RegisteredCommand<{
    commandName: string;
    aliases: ({
        type: "nameAccessibleAlias";
        commandName: string;
        prefix?: undefined;
        escregexp?: undefined;
        regexp?: undefined;
    } | {
        type: "prefixAccessibleAlias";
        commandName: string;
        prefix: string;
        escregexp?: undefined;
        regexp?: undefined;
    } | {
        type: "regexpAccessibleAlias";
        commandName: string;
        escregexp: {
            v: string;
            f: string;
        };
        regexp: RegExp;
        prefix?: undefined;
    })[];
    description: string;
    type: "built-in";
    accessType: "named";
    callback(player: import("../../../modules/commands/classes/executeCommandPlayerW").executeCommandPlayerW, event: import("@minecraft/server").ChatSendBeforeEvent): CommandResponse;
    formatting_code: string;
    requiredTags: string[];
    command_version: string;
    categories: ["system", "Entity Scale Add-On", "built-in"];
    ultraSecurityModeSecurityLevel: "admin";
    syntax: string;
}>;
