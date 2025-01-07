import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export declare function securitySettings(sourceEntitya: Entity | executeCommandPlayerW | Player): any;
export declare function securitySettings_settingsSelection(sourceEntitya: Entity | executeCommandPlayerW | Player): any;
export declare function securitySettings_playersWithPermissions(sourceEntitya: Entity | executeCommandPlayerW | Player): any;
export declare function securitySettings_playersWithPermissions_permission(sourceEntitya: Entity | executeCommandPlayerW | Player, permission: [permissionKey: keyof savedPlayer["playerPermissions"], permissionValue: any], pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
export declare function securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntitya: Entity | executeCommandPlayerW | Player): any;
export declare function securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntitya: Entity | executeCommandPlayerW | Player, permission: permissionType, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
export declare function securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
