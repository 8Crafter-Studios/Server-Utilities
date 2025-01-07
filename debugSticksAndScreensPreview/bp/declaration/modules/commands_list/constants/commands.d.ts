import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import type { commandCategory } from "modules/commands/types/commandCategory";
export declare const commands: {
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
}[];
export declare const commandCategoryList: readonly ["items", "misc", "invsee", "players", "containers/inventories", "entities", "warps", "world", "uis", "shop_system", "dangerous", "Entity Scale Add-On", "built-in", "custom", "all"];
