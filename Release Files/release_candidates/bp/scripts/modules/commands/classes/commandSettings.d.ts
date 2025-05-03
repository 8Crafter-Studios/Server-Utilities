import { command } from "modules/commands/classes/command";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
export declare class commandSettings<T extends "built-in" | "custom" | "unknown" = "unknown"> {
    #private;
    type: T;
    commandName: string;
    customCommandId?: string;
    commandSettingsId: string;
    command?: command<T>;
    defaultSettings?: T extends "built-in" | "unknown" ? {
        type: T;
        requiredTags: string[];
        formatting_code: string;
        commandName: string;
        escregexp: {
            v: string;
        };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    } : {
        type: T;
        requiredTags: string[];
        formatting_code?: any;
        commandName: string;
        escregexp?: any;
        formats?: any;
        command_version: string;
        description?: any;
        commandSettingsId: string;
        deprecated?: any;
        functional?: any;
        hidden?: any;
        enabled?: any;
    };
    constructor(commandSettingsId: string, command?: command<T>);
    get parsed(): any;
    get enabled(): any;
    set enabled(enabled: any);
    get requiredTags(): string[];
    set requiredTags(requiredTags: string[]);
    get requiredPermissionLevel(): string | number | undefined;
    set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined);
    get requiresOp(): boolean;
    set requiresOp(requiresOp: boolean);
    get settings_version(): any;
    get isSaved(): boolean;
    toJSON(): any;
    save(settings?: {
        type: "built-in" | "custom" | "unknown";
        commandName: string;
        customCommandId: string;
        commandSettingsId: string;
        enabled: boolean;
        requiredTags: string[];
        requiredPermissionLevel: string | number;
        requiresOp: boolean;
        settings_version: any;
    } | Object): void;
    remove(): void;
}
