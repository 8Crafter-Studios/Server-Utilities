import { Player, Entity, Dimension } from "@minecraft/server";
import { type command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import { type evaluateParametersArgumentTypes } from "modules/commands/types/evaluateParametersArgumentTypes";
import { type commandCategory } from "modules/commands/types/commandCategory";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare class command<T extends "built-in" | "custom" | "unknown" = "unknown"> {
    type: T;
    commandName: string;
    currentCommandName: string;
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
    currentescregexp?: {
        v: string;
        f?: string;
    };
    selectedalias?: {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
    };
    command_version?: string | number;
    formats: command_formats_type_list;
    description?: string;
    format_version: string | number;
    commands_format_version: string | number;
    customCommandId?: string;
    commandSettingsId: string;
    formatting_code: string;
    customCommandType?: "commands" | "javascript";
    customCommandPrefix?: string;
    customCommandParametersEnabled?: boolean;
    customCommandCodeLines?: number;
    customCommandParametersList?: evaluateParametersArgumentTypes[];
    category?: string | string[];
    categories?: string[];
    constructor(command: {
        type: T;
        formatting_code?: string;
        category?: string | string[];
        customCommandParametersList?: evaluateParametersArgumentTypes[];
        customCommandCodeLines?: number;
        customCommandParametersEnabled?: boolean;
        customCommandPrefix?: string;
        customCommandType?: "commands" | "javascript";
        customCommandId?: string;
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
    } | command<T>);
    get isHidden(): any;
    get isDeprecated(): any;
    get isFunctional(): any;
    get releaseStage(): string;
    get regexp(): RegExp;
    get currentregexp(): RegExp;
    get aliases(): {
        commandName: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        regexp: RegExp;
        aliasTo?: string;
    }[];
    get settings(): commandSettings<T>;
    get ultraSecurityModeSecurityLevel(): "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
    get code(): string[];
    save(): string;
    remove(): void;
    testCanPlayerUseCommand(player: Player | executeCommandPlayerW | Entity): boolean;
    run(commandstring: string, executor: Player | executeCommandPlayerW | Entity | Dimension, player?: Player | executeCommandPlayerW, event?: Object): void;
    static get(commandName: string, type?: "built-in" | "custom" | "unknown"): command<"custom"> | command<"built-in"> | command<"unknown">;
    static findBuiltIn(commandString: string, returnCommandInsteadOfAlias?: boolean): {
        type: "built-in";
        requiredTags: string[];
        ultraSecurityModeSecurityLevel: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
        formatting_code: string;
        commandName: string;
        escregexp: {
            v: string;
            f?: string;
        };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        aliases?: {
            commandName: string;
            escregexp?: {
                v?: string;
                f?: string;
            };
        }[];
        category?: commandCategory | commandCategory[];
        deprecated: boolean;
        functional: boolean;
        hidden: boolean;
        enabled: boolean;
    } | {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
        aliasTo: {
            type: "built-in";
            requiredTags: string[];
            ultraSecurityModeSecurityLevel: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
            formatting_code: string;
            commandName: string;
            escregexp: {
                v: string;
                f?: string;
            };
            formats: command_formats_type_list;
            command_version: string;
            description: string;
            commandSettingsId: string;
            aliases?: {
                commandName: string;
                escregexp?: {
                    v?: string;
                    f?: string;
                };
            }[];
            category?: commandCategory | commandCategory[];
            deprecated: boolean;
            functional: boolean;
            hidden: boolean;
            enabled: boolean;
        };
    };
    static getDefaultCommands(noSort?: boolean): command<"built-in">[];
    static getDefaultCommandsOfCategory(category: commandCategory, noSort?: boolean): command<"built-in">[];
    static getCommandAliases(): {
        [k: string]: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        }[];
    };
    static getCustomCommands(noSort?: boolean): command<"custom">[];
    static get defaultPrefix(): string;
    static get dp(): string;
}
