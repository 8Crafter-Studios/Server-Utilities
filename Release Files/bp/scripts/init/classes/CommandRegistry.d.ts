/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */
import { commandSettings } from "modules/commands/classes/commandSettings";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import type { commandCategory } from "modules/commands/types/commandCategory";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
type CommandType = {
    type: "built-in" | "custom" | "unknown";
    requiredTags?: string[];
    formatting_code?: string;
    commandName: string;
    escregexp: {
        v: string;
        f?: string;
    };
    formats?: command_formats_type_list;
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
    deprecated?: boolean;
    functional?: boolean;
    hidden?: boolean;
    enabled?: boolean;
};
declare class RegisteredCommand {
    #private;
    commandData: CommandType;
    /**
     * The type of command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The type of access to the command.
     */
    readonly accessType: "name" | "regexp";
    /**
     * The ID of the command.
     */
    readonly id: string;
    /**
     * The name of the command.
     */
    readonly name: string;
    /**
     * The formatting code to display the command with.
     */
    formatting_code: string;
    /**
     * The name used to access the command.
     */
    readonly commandName?: string;
    /**
     * The regular expression used to access the command.
     */
    readonly regexp?: RegExp;
    syntax: string;
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
    categories: commandCategory[];
    deprecated: boolean;
    functional: boolean;
    hidden: boolean;
    enabled: boolean;
    /**
     * The commands format version that the custom command was created in.
     */
    commands_format_version: string;
    constructor(commandData: CommandType);
    /**
     * The settings of the command, will be an instance of the {@link commandSettings} class.
     */
    get settings(): commandSettings<"built-in" | "custom" | "unknown">;
    playerCanExecute(player: loosePlayerType): boolean;
}
export declare class CommandRegistry {
    private commands;
    private namedAccessCommands;
    private regexpAccessCommands;
    getCommand(commandName: string): RegisteredCommand | undefined;
    registerCommand(commandData: CommandType, accessType?: "named" | "regexp"): void;
}
export {};
