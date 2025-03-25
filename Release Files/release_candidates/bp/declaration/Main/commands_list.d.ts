import type { command_formats_type_list, commandCategory } from "./commands";
export declare const commands: {
    type: "built-in" | "custom" | "unknown";
    requiredTags: string[];
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
    category?: commandCategory | (commandCategory)[];
    deprecated?: boolean;
    functional?: boolean;
    hidden?: boolean;
    enabled?: boolean;
}[];
