import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import * as cmds from "./commands";
export declare const commands_format_version = "2.0.0-beta.1";
export type evaluateParametersArgumentTypes = "presetText" | "number" | "boolean" | "string" | "json";
export declare const commands: {
    type: string;
    formatting_code: string;
    commandName: string;
    escregexp: {
        v: string;
    };
    formats: ({
        format: string;
        description?: undefined;
    } | {
        format: string;
        description: string;
    })[];
    command_version: string;
    description: string;
    commandSettingsId: string;
}[];
export type command_formats_type_list = (string | string[] | command_formats_type_list | {
    format: string | command_formats_type_list;
    description?: string;
})[] | string | {
    format: string | command_formats_type_list;
    description?: string;
};
export declare class command {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    parameters?: {
        name: string;
        internalType?: evaluateParametersArgumentTypes;
        type?: "string" | "integer" | "float" | "decimal" | "hexadecimal" | "binary" | "triary" | "base64" | "unicode" | "letter" | "regexp" | "text" | "message" | "any" | "customjson" | "escapablestring" | "boolean" | "array" | "number" | "object" | "javascript" | "json" | "identifier" | "targetselector" | "none" | string;
        displayType?: "string" | "str" | "integer" | "int" | "float" | "flt" | "decimal" | "dec" | "hexadecimal" | "hex" | "binary" | "bin" | "triary" | "tri" | "base64" | "b64" | "unicode" | "uni" | "letter" | "let" | "regexp" | "regex" | "text" | "txt" | "message" | "msg" | "anything" | "any" | "customJSON" | "cJSON" | "escapableString" | "escString" | "escStr" | "boolean" | "bool" | "array" | "arry" | "number" | "num" | "object" | "obj" | "JavaScript" | "JS" | "JavaScriptObjectNotation" | "JSON" | "identifier" | "id" | "uuid" | "UUID" | "xuid" | "XUID" | "cuid" | "CUID" | "targetSelector" | "target" | "" | "none" | string;
        evaluationType?: string;
    }[];
    escregexp?: {
        v: string;
        f?: string;
    };
    command_version?: string | number;
    formats: command_formats_type_list;
    description?: string;
    format_version: string | number;
    commands_format_version: string | number;
    customCommandId?: string;
    commandSettingsId: string;
    constructor(command: {
        type: "built-in" | "custom" | "unknown";
        commandSettingsId?: string;
        command_version?: string | number;
        commandName: string;
        description?: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        formats?: command_formats_type_list;
        format_version?: string | number;
        commands_format_version?: string | number;
    } | command);
    get regexp(): RegExp;
    get settings(): cmds.commandSettings;
    static get(commandName: string, type?: "built-in" | "custom" | "unknown"): cmds.command;
}
export declare class commandSettings {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    customCommandId?: string;
    commandSettingsId: string;
    command?: command;
    defaultSettings?: Object;
    constructor(commandSettingsId: string, command?: command);
    get parsed(): any;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get requiredTags(): string[];
    set requiredTags(requiredTags: string[]);
    get requiredPermissionLevel(): string | number | undefined;
    set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined);
    get requiresOp(): boolean;
    set requiresOp(requiresOp: boolean);
    get settings_version(): any;
    get isSaved(): boolean;
    toJSON(): Object & {
        type: "custom" | "unknown" | "built-in";
        commandName: string;
        customCommandId: string;
        commandSettingsId: string;
        enabled: boolean;
        requiredTags: string[];
        requiredPermissionLevel: string | number;
        requiresOp: boolean;
        settings_version: any;
    };
    save(settings?: Object): void;
    remove(): void;
}
export declare function send(message: string): void;
export declare function chatMessage(eventData: ChatSendBeforeEvent): void;
export declare function chatCommands(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | undefined;
    eventData: ChatSendBeforeEvent;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
}): void;
export declare function chatSend(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | undefined;
    eventData: ChatSendBeforeEvent | undefined;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
}): void;
export declare function evaluateParameters(commandstring: string, parameters: {
    type: string;
    maxLength?: number;
}[]): {
    params: {
        type: string;
        maxLength?: number;
    }[];
    extra: string;
    args: any[];
    err: [Error, any][];
};
export declare function evaluateParametersOld(parameters: string[], paramEvalA: string): {
    er: [Error, any][];
    erb: [string, any, number][];
    args: any[];
    paramEval: string;
    paramEvalA: string;
    parameters: string[];
};
