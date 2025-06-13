import { Player } from "@minecraft/server";
import * as cmdslist from "modules/commands_list/constants/commands";
import type { commandCategory } from "modules/commands/types/commandCategory";
import type { command } from "modules/commands/classes/command";
/**
 * A utility type used to ensure that the {@link permissionTypes} object is correctly typed.
 */
export type permissionTypesChecker<T> = {
    [key in keyof T]: {
        id: key;
        default: boolean;
        includedInPermissions: (keyof T)[];
        description: string;
        additionalPrompts: {
            title: string;
            prompt: string;
            default: boolean;
        }[];
    };
};
declare const permissionTypes: Readonly<{
    /**
     * Allows the player to have full owner-level permissions.
     * This gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.
     * @danger This permission should only be given to the server owners. It is EXTREMELY DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.fullControl": {
        readonly id: "andexdb.fullControl";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have full owner-level permissions.\nThis gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.\n§cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player full control?";
            readonly default: false;
        }, {
            readonly title: "§l§cTHIS IS EXTREMELY DANGEROUS!";
            readonly prompt: "Are you REALLY sure you want to give this player full control? This could allow this player to give a bunch of random players operator permissions. §l§cThis is EXTREMELY DANGEROUS!";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to have full head admin-level permissions.
     * @danger This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.headAdmin": {
        readonly id: "andexdb.headAdmin";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have full head admin-level permissions.\n§cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player head admin? You should only give this permission to staff members you REALLY trust.";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to have full admin-level permissions.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.admin": {
        readonly id: "andexdb.admin";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have full admin-level permissions.\n§cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player admin? You should only give this permission to staff members you trust.";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to have full moderator-level permissions.
     * @danger This permission should only be given to moderators. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.moderator": {
        readonly id: "andexdb.moderator";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have full moderator-level permissions.\n§cDANGER!: This permission should only be given to moderators. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player moderator? You should only give this permission to moderators.";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to use owner-level custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     * @danger This permission should only be given to the server owners. It is EXTREMELY DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.useOwnerLevelCommands": {
        readonly id: "andexdb.useOwnerLevelCommands";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use owner-level custom commands.\n§cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to use ALL OWNER-LEVEL COMMANDS?";
            readonly default: false;
        }, {
            readonly title: "§l§cTHIS IS EXTREMELY DANGEROUS!";
            readonly prompt: "Are you REALLY sure you want to give this player full control? §l§cThis is EXTREMELY DANGEROUS!";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to use head admin-level custom commands, which includes most of the custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.useHeadAdminLevelCommands": {
        readonly id: "andexdb.useHeadAdminLevelCommands";
        readonly default: false;
        readonly includedInPermissions: ["andexdb.useOwnerLevelCommands"];
        readonly description: "Allows the player to use head admin-level custom commands.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.useOwnerLevelCommands' permission.\n§cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to use ALL HEAD ADMIN-LEVEL COMMANDS?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to use admin-level custom commands, which includes most of the custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.useAdminLevelCommands": {
        readonly id: "andexdb.useAdminLevelCommands";
        readonly default: false;
        readonly includedInPermissions: ["andexdb.useHeadAdminLevelCommands", "andexdb.useOwnerLevelCommands"];
        readonly description: "Allows the player to use admin-level custom commands.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.useHeadAdminLevelCommands' permission.\nThis permission is included in the 'andexdb.useOwnerLevelCommands' permission.\n§cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to use ALL ADMIN-LEVEL COMMANDS?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to use moderator-level custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.useModeratorLevelCommands": {
        readonly id: "andexdb.useModeratorLevelCommands";
        readonly default: false;
        readonly includedInPermissions: ["andexdb.useAdminLevelCommands", "andexdb.useHeadAdminLevelCommands", "andexdb.useOwnerLevelCommands"];
        readonly description: "Allows the player to use moderator-level custom commands.\nThis permission is included in the 'andexdb.moderator' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.useAdminLevelCommands' permission.\nThis permission is included in the 'andexdb.useHeadAdminLevelCommands' permission.\nThis permission is included in the 'andexdb.useOwnerLevelCommands' permission.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to use ALL MODERATOR-LEVEL COMMANDS?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.useScriptEvalEscapeSequence": {
        readonly id: "andexdb.useScriptEvalEscapeSequence";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to run arbitrary JavaScript code in the chat with the '${se}' or '${scripteval}' escape sequence.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to run arbitrary JavaScript code in the chat with the '${se}' or '${scripteval}' escape sequence?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to run any vanilla command in the chat with the `${r}` or `${run}` escape sequence.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.useCommandsRunningEscapeSequence": {
        readonly id: "andexdb.useCommandsRunningEscapeSequence";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to run any vanilla command in the chat with the '${r}' or '${run}' escape sequence.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to run any vanilla command in the chat with the '${r}' or '${run}' escape sequence?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to run arbitrary JavaScript code.
     * This allows the player to access menus like the {@link manageEventSubscriptions | Manage Event Subscriptions} menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.useScriptEval": {
        readonly id: "andexdb.useScriptEval";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to run arbitrary JavaScript code.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to run arbitrary JavaScript code in the chat with the '${se}' or '${scripteval}' escape sequence?";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to have the ability to transfer players to other servers through the moderation quick actions UI.
     */
    readonly "andexdb.transferPlayers": {
        readonly id: "andexdb.transferPlayers";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have the ability to transfer players to other servers through the moderation quick actions UI.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to have the ability to ban players through the manage bans UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.banPlayers": {
        readonly id: "andexdb.banPlayers";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have the ability to ban players through the manage bans UI.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to have the ability to unban players through the manage bans UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.unbanPlayers": {
        readonly id: "andexdb.unbanPlayers";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have the ability to unban players through the manage bans UI.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage bans UI.
     * Note: The player will not be able to ban or unban anyone through the UI unless you give them the `andexdb.banPlayers` or `andexdb.unbanPlayers` permissions respectively.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessManageBansUI": {
        readonly id: "andexdb.accessManageBansUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage bans UI.\nNote: The player will not be able to ban or unban anyone through the UI unless you give them the 'andexdb.banPlayers' or 'andexdb.unbanPlayers' permissions respectively.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to have the ability to mute players through the manage mutes UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.mutePlayers": {
        readonly id: "andexdb.mutePlayers";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have the ability to mute players through the manage mutes UI.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to have the ability to unmute players through the manage mutes UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.unmutePlayers": {
        readonly id: "andexdb.unmutePlayers";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to have the ability to unmute players through the manage mutes UI.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage mutes UI.
     * Note: The player will not be able to mute or unmute anyone through the UI unless you give them the `andexdb.mutePlayers` or `andexdb.unmutePlayers` permissions respectively.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessManageMutesUI": {
        readonly id: "andexdb.accessManageMutesUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage mutes UI.\nNote: The player will not be able to mute or unmute anyone through the UI unless you give them the 'andexdb.mutePlayers' or 'andexdb.unmutePlayers' permissions respectively.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage commands UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.accessManageCommandsUI": {
        readonly id: "andexdb.accessManageCommandsUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage commands UI.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.headAdmin' permission.\n§cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to manage commands? This should ONLY be given to trusted staff members.";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to access the Main Menu.
     * Note: The player will not be able to access some of the submenus unless you give them the permissions for those submenus.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessMainMenu": {
        readonly id: "andexdb.accessMainMenu";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Main Menu.\nNote: The player will not be able to access some of the submenus unless you give them the permissions for those submenus.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the Security submenu of the Main Menu.
     * Note: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.
     * This permission is included in the `andexdb.headAdmin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    readonly "andexdb.accessSecuritySettings": {
        readonly id: "andexdb.accessSecuritySettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Security submenu of the Main Menu, and change the security settings in that menu.\nNote: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.\nThis permission is included in the 'andexdb.headAdmin' permission.\n§cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to access the security settings? This is very dangerous!";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to access the Personal Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessPersonalSettings": {
        readonly id: "andexdb.accessPersonalSettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Personal Settings submenu of the Settings Menu.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the Notifications Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessNotificationsSettings": {
        readonly id: "andexdb.accessNotificationsSettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Notifications Settings submenu of the Settings Menu.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the Extra Features Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.accessExtraFeaturesSettings": {
        readonly id: "andexdb.accessExtraFeaturesSettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Extra Features Settings submenu of the Settings Menu.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.headAdmin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the Advanced Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else, as the person could disable critical add-on system functions.
     */
    readonly "andexdb.accessAdvancedSettings": {
        readonly id: "andexdb.accessAdvancedSettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Advanced Settings submenu of the Settings Menu.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.headAdmin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access most of the submenus in the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessSettings": {
        readonly id: "andexdb.accessSettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access most of the submenus in the Settings Menu.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage warps UI.
     * This allows the player to add, remove, and reorder the warps that are in the Warps section of the player menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.accessManageWarpsUI": {
        readonly id: "andexdb.accessManageWarpsUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage warps UI.\nThis allows the player to add, remove, and reorder the warps that are in the Warps section of the player menu.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage redeemable codes UI.
     * This allows the player to add, remove, and reorder the redeemable codes that are in the redeemable codes section of the player menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.accessManageRedeemableCodesUI": {
        readonly id: "andexdb.accessManageRedeemableCodesUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage redeemable codes UI.\nThis allows the player to add, remove, and reorder the redeemable codes that are in the redeemable codes section of the player menu.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to access the manage players UI.
     * Note: This permission SHOULD be given to moderators that you want to be able to ban people, because it is a lot easier to ban players through this UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.accessManagePlayersUI": {
        readonly id: "andexdb.accessManagePlayersUI";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the manage players UI.\nNote: This permission SHOULD be given to moderators that you want to be able to ban people, because it is a lot easier to ban players through this UI.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to delete saved data for players in the manage players UI.
     * Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.
     */
    readonly "andexdb.UIs.managePlayersUI.deleteSavedPlayerData": {
        readonly id: "andexdb.UIs.managePlayersUI.deleteSavedPlayerData";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to delete saved data for players in the manage players UI.\nNote: This only applies if the player has the andexdb.accessManagePlayersUI permission.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\n§cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to delete saved player data? This is very dangerous!";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to manage the homes saved with the `\home` command for players in the manage players UI.
     * Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.
     */
    readonly "andexdb.UIs.managePlayersUI.manageHomes": {
        readonly id: "andexdb.UIs.managePlayersUI.manageHomes";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to delete saved data for players in the manage players UI.\nNote: This only applies if the player has the andexdb.accessManagePlayersUI permission.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\n§cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.";
        readonly additionalPrompts: [{
            readonly title: "§l§cWARNING!";
            readonly prompt: "Are you sure you want to give this player the ability to delete saved player data? This is very dangerous!";
            readonly default: false;
        }];
    };
    /**
     * Allows the player to manage protected areas.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.manageProtectedAreas": {
        readonly id: "andexdb.manageProtectedAreas";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to manage protected areas.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to create new custom protected area categories.
     * This permission is included in the `andexdb.headAdmin` permission.
     */
    readonly "andexdb.createCustomProtectedAreaCategories": {
        readonly id: "andexdb.createCustomProtectedAreaCategories";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to create new custom protected area categories.\nThis permission is included in the 'andexdb.headAdmin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to edit existing custom protected area categories.
     * This permission is included in the `andexdb.headAdmin` permission.
     */
    readonly "andexdb.editCustomProtectedAreaCategories": {
        readonly id: "andexdb.editCustomProtectedAreaCategories";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to edit existing custom protected area categories.\nThis permission is included in the 'andexdb.headAdmin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to delete custom protected area categories.
     * This permission is included in the `andexdb.headAdmin` permission.
     */
    readonly "andexdb.deleteCustomProtectedAreaCategories": {
        readonly id: "andexdb.deleteCustomProtectedAreaCategories";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to delete custom protected area categories.\nThis permission is included in the 'andexdb.headAdmin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Debug Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUseDebugStick": {
        readonly id: "andexdb.canUseDebugStick";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the Debug Stick.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Editor Sticks, including: Editor Stick, Editor Stick B, and Editor Stick C.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUseEditorSticks": {
        readonly id: "andexdb.canUseEditorSticks";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the pl'yer to'use the Editor Sticks, including: Editor Stick, Editor Stick B, and Editor Stick C.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Pick Block Sticks, including: Pick Block Stick, Data Pick Block Stick, Liquid Clipped Pick Block Stick, and Liquid Clipped Data Pick Block Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUsePickBlockSticks": {
        readonly id: "andexdb.canUsePickBlockSticks";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the Pick Block Sticks, including: Pick Block Stick, Data Pick Block Stick, Liquid Clipped Pick Block Stick, and Liquid Clipped Data Pick Block Stick.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Command Runner Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. The Command Runner Stick allows the player to run ANY vanilla command.
     */
    readonly "andexdb.canUseCommandRunnerStick": {
        readonly id: "andexdb.canUseCommandRunnerStick";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the Command Runner Stick.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\n@danger This permission should only be given to trusted staff members. The Command Runner Stick allows the player to run ANY vanilla command.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Script Runner Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. The Script Runner Stick allows the player to run ANY arbitrary JavaScript Code.
     */
    readonly "andexdb.canUseScriptRunnerStick": {
        readonly id: "andexdb.canUseScriptRunnerStick";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the Script Runner Stick.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\n@danger This permission should only be given to trusted staff members. The Script Runner Stick allows the player to run ANY arbitrary JavaScript Code.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the Inventory Controller.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUseInventoryController": {
        readonly id: "andexdb.canUseInventoryController";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the Inventory Controller.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the following items: Entity Controller and Player Controller.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUseEntityControllerItems": {
        readonly id: "andexdb.canUseEntityControllerItems";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the following items: Entity Controller and Player Controller.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use the following items: Entity Debug Stick and Player Debug Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.canUseEntityDebugSticks": {
        readonly id: "andexdb.canUseEntityDebugSticks";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use the following items: Entity Debug Stick and Player Debug Stick.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to use WorldEdit, including all WorldEdit commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.useWorldEdit": {
        readonly id: "andexdb.useWorldEdit";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to use WorldEdit.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to bypass all forms of spawn protection.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    readonly "andexdb.bypassProtectedAreas": {
        readonly id: "andexdb.bypassProtectedAreas";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to bypass all forms of spawn protection.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.";
        readonly additionalPrompts: [];
    };
    /**
     * Allows the player to bypass all teleport cooldowns.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    readonly "andexdb.bypassTeleportCooldowns": {
        readonly id: "andexdb.bypassTeleportCooldowns";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to bypass all teleport cooldowns.\nThis permission is included in the 'andexdb.headAdmin' permission.\nThis permission is included in the 'andexdb.admin' permission.\nThis permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
}>;
declare global {
    const permissionType: typeof permissionTypes;
    type permissionType = (typeof permissionTypes)[keyof typeof permissionTypes] | keyof typeof permissionTypes;
}
/**
 * The permission configurations for Ultra Security Mode.
 */
declare const playerPermissions: {
    /**
     * The permissions for everyone.
     */
    everyone: (typeof permissionType)[keyof typeof permissionType]["id"][];
    /**
     * The permissions for players with the `andexdb.moderator` permission.
     */
    moderator: (typeof permissionType)[keyof typeof permissionType]["id"][];
    /**
     * The permissions for players with the `andexdb.admin` permission.
     */
    admin: (typeof permissionType)[keyof typeof permissionType]["id"][];
    /**
     * The permissions for players with the `andexdb.headAdmin` permission.
     */
    headAdmin: (typeof permissionType)[keyof typeof permissionType]["id"][];
    /**
     * The permissions for a specific player, indexed by the player's {@link Player.prototype.id | ID}.
     */
    [playerId: string]: (typeof permissionType)[keyof typeof permissionType]["id"][];
};
/**
 * Maps permissions to their corresponding preset names.
 */
declare const permissionPresetMap: {
    /**
     * The preset name for the `andexdb.moderator` permission.
     */
    readonly "andexdb.moderator": "moderator";
    /**
     * The preset name for the `andexdb.admin` permission.
     */
    readonly "andexdb.admin": "admin";
    /**
     * The preset name for the `andexdb.headAdmin` permission.
     */
    readonly "andexdb.headAdmin": "headAdmin";
};
/**
 * The overrides for the security level of commands in Ultra Security Mode.
 */
declare const commandsUltraSecurityModeSecurityLevelOverrides: {
    /**
     * Overrides that apply to all commands in a specific {@link commandCategory | command category}.
     *
     * Indexed by the {@link commandCategory | command category}.
     */
    categoryOverrides: { [key in commandCategory]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"]; };
    /**
     * Overrides that apply to a specific command.
     *
     * Indexed by the {@link command.commandName | command name}.
     */
    commandOverrides: {
        /**
         * The security level override of the command.
         */
        [commandName: string]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"];
    };
    /**
     * Overrides that apply to a specific custom command.
     *
     * Indexed by the {@link command.commandName | command name}.
     */
    customCommandOverrides: {
        /**
         * The security level override of the custom command.
         */
        [commandName: string]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"];
    };
};
/**
 * This class contains all the security variables and methods related to permissions and security settings in Ultra Security Mode.
 */
export declare class securityVariables {
    /**
     * Whether Ultra Security Mode is enabled.
     */
    static get ultraSecurityModeEnabled(): boolean;
    /**
     * The owner of the server, hardcoded by the Ultra Security Mode Configurator Pack, of `undefined` if the Ultra Security Mode Configurator Pack is not active.
     *
     * @see {@link https://www.8crafter.com/andexdb-security-configurator-generator.html}
     */
    static get owner(): string | undefined;
    /**
     * Whether the Security Configurator Pack is active.
     *
     * @see {@link https://www.8crafter.com/andexdb-security-configurator-generator.html}
     */
    static get securityConfiguratorPackIsActive(): boolean;
    /**
     * The permission types.
     *
     * This is a deep copy of the {@link permissionTypes} object, so that modifying it will not affect the original object.
     */
    static get permissionTypes(): typeof permissionTypes;
    /**
     * The permission configurations for Ultra Security Mode.
     *
     * This is a deep copy of the {@link playerPermissions} object, so that modifying it will not affect the original object.
     */
    static get playerPermissions(): typeof playerPermissions;
    /**
     * The overrides for the security level of commands in Ultra Security Mode.
     */
    static get commandsUltraSecurityModeSecurityLevelOverrides(): typeof commandsUltraSecurityModeSecurityLevelOverrides;
    /**
     * Converts a permission type object to its ID.
     *
     * @template {PermissionType} T The permission type object or ID to convert.
     * @param {T} permission The permission type object or ID to convert.
     * @returns The ID of the permission type object, or the permission ID itself if it is already an ID.
     */
    static convertPermissionTypeToId<T extends permissionType>(permission: T): T extends keyof typeof permissionType ? T : T extends (typeof permissionType)[keyof typeof permissionType] ? T["id"] : never;
    /**
     * Converts a permission ID to its permission type object.
     *
     * @template {PermissionType} T The permission type object or ID to convert.
     * @param {T} permission The permission type object or ID to convert.
     * @returns The permission type object for the permission ID, or the permission type object itself if it is already an object.
     */
    static convertPermissionTypeToObject<T extends permissionType>(permission: T): T extends keyof typeof permissionType ? (typeof permissionType)[T] : T;
    /**
     * Tests a player for a permission.
     *
     * @param {Player} player The player to test.
     * @param {permissionType} permission The permission to test for.
     * @returns {boolean} Whether the player has the permission.
     */
    static testPlayerForPermission(player: Player, permission: permissionType): boolean;
    /**
     * Tests a player for a permission based on their ID.
     *
     * @param {string} playerId The ID of the player to test.
     * @param {permissionType} permission The permission to test for.
     * @param {boolean} [presetMode=false] Whether to use preset mode (This is for testing the configuration of a permissions preset for a permission).
     * @returns {boolean} Whether the player has the permission.
     */
    static testPlayerForPermissionB(playerId: string, permission: permissionType, presetMode?: boolean): boolean;
    /**
     * Tests an offline player for a permission.
     *
     * @param {string} playerId The ID of the player to test.
     * @param {permissionType} permission The permission to test for.
     * @param {boolean} [presetMode=false] Whether to use preset mode (This is for testing the configuration of a permissions preset for a permission).
     * @returns {boolean} Whether the player has the permission.
     */
    static testOfflinePlayerForPermission(playerId: string, permission: permissionType, presetMode?: boolean): boolean;
}
/**
 * Shows a UI for editing the permissions of a player or preset.
 *
 * @param {Player} player The player who is editing the permissions.
 * @param {LooseAutocomplete<"everyone" | (typeof permissionPresetMap)[keyof typeof permissionPresetMap]>} targetPlayerId The player or preset to edit the permissions for.
 * @param {"player" | "preset" | "default"} mode The mode to edit the permissions in. `player` for a specific player, `preset` for a preset, or `default` for the default permissions.
 * @returns {Promise<-403 | 1 | 0>} A promise that resolves with `-403` for access denied, `1` if the previous menu should be reopened, and `0` if the previous menu should be closed.
 */
export declare function editPermissionForPlayerUI(player: Player, targetPlayerId: LooseAutocomplete<"everyone" | (typeof permissionPresetMap)[keyof typeof permissionPresetMap]>, mode?: "player" | "preset" | "default"): Promise<-403 | 1 | 0>;
/**
 * Prompts the player to set the security mode.
 *
 * Security mode options:
 * - Standard Security Mode: The default security mode, which uses tag-based permissions.
 * - Ultra Security Mode: An advanced security mode that uses a separate behavior pack to hardcode who the owner of the server is, and uses an internal permissions system that can only be modified by the owner or those who are given the `andexdb.fullControl` permission by the owner.
 *
 * @param {Player} player The player to prompt.
 * @returns {Promise<-424 | -403 | 0 | 1>} A promise that resolves with `-424` if the security configurator pack is not active, `-403` if the player is not the owner, `0` if the previous menu should be closed, and `1` if the previous menu should be reopened.
 */
export declare function selectSecurityMode(player: Player): Promise<-424 | -403 | 0 | 1>;
/**
 * Opens the security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @returns {Promise<-423 | -403 | 1 | 0>} A promise that resolves with `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, `1` if the previous menu should be reopened, and `0` if the previous menu should be closed.
 */
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor(player: Player): Promise<-423 | -403 | 1 | 0>;
/**
 * Opens the command categories security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @returns {Promise<-423 | -403 | 1 | 0>} A promise that resolves with `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, `1` if the previous menu should be reopened, and `0` if the previous menu should be closed.
 */
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_categories(player: Player): Promise<1 | 0 | -403 | -423>;
/**
 * Opens the command category security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @param {commandCategory} category The category to edit the security level overrides for.
 * @returns {Promise<-423 | -403 | 1>} A promise that resolves with `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, and `1` if the previous menu should be reopened.
 */
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_category(player: Player, category: commandCategory): Promise<-423 | -403 | 1>;
/**
 * Opens the commands security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @returns {Promise<-423 | -403 | 1 | 0>} A promise that resolves with `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, `1` if the previous menu should be reopened, and `0` if the previous menu should be closed.
 */
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player: Player): Promise<-423 | -403 | 1 | 0>;
/**
 * Opens the command category security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @param {commandCategory} category The category to edit the security level overrides for.
 * @returns {Promise<0 | -423 | -403 | 1>} A promise that resolves with `0` if the previous menu should be closed, `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, and `1` if the previous menu should be reopened.
 */
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands_category(player: Player, category: commandCategory): Promise<0 | -423 | -403 | 1>;
/**
 * Opens the command security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @param {command<"built-in">} command The command to edit the security level overrides for.
 * @returns {Promise<1 | -403 | -423>} A promise that resolves with `1` if the previous menu should be reopened, `-403` if the player is not the owner, and `-423` if Ultra Security Mode is disabled.
 */
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_builtIn(player: Player, command: command<"built-in">): Promise<1 | -403 | -423>;
/**
 * Opens the custom command security level overrides editor for the player.
 *
 * @param {Player} player The player who is editing the security level overrides.
 * @param {command<"custom">} command The custom command to edit the security level overrides for.
 * @returns {Promise<1 | -403 | -423>} A promise that resolves with `1` if the previous menu should be reopened, `-403` if the player is not the owner, and `-423` if Ultra Security Mode is disabled.
 */
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_custom(player: Player, command: command<"custom">): Promise<1 | -403 | -423>;
/**
 * Opens the debug menu for Ultra Security Mode.
 *
 * @param {Player} player The player who is accessing the Ultra Security Mode debug menu.
 * @returns {Promise<-423 | -403 | 1>} A promise that resolves with `-423` if Ultra Security Mode is disabled, `-403` if the player is not the owner, and `1` if the previous menu should be reopened.
 */
export declare function ultraSecurityModeDebug(player: Player): Promise<-423 | -403 | 1>;
/**
 * Shows a confirmation dialog to reset all player permissions and permission level presets.
 *
 * @param {Player} player The player who is resetting the permissions.
 * @returns {Promise<1 | -403 | -423>} A promise that resolves with `1` if the previous menu should be reopened, `-403` if the player is not the owner, and `-423` if Ultra Security Mode is disabled.
 */
export declare function resetPlayerPermissionsUI(player: Player): Promise<1 | -403 | -423>;
/**
 * Shows a confirmation dialog to reset the permissions for a specific player or preset.
 *
 * @param {Player} player The player who is resetting the permissions.
 * @param {LooseAutocomplete<"everyone" | (typeof permissionPresetMap)[keyof typeof permissionPresetMap]>} targetPlayerId The ID of the player or preset to reset permissions for.
 * @param {boolean} [isPreset=false] Whether the {@link targetPlayerId} is a preset.
 * @returns {Promise<1 | -403 | -423>} A promise that resolves with `1` if the previous menu should be reopened, `-403` if the player is not the owner, and `-423` if Ultra Security Mode is disabled.
 */
export declare function resetPlayerPermissionsForPlayerUI(player: Player, targetPlayerId: LooseAutocomplete<"everyone" | (typeof permissionPresetMap)[keyof typeof permissionPresetMap]>, isPreset?: boolean): Promise<1 | -403 | -423>;
/**
 * Shows a UI for managing permissions presets.
 *
 * @param {Player} player The player who is managing the permissions presets.
 * @returns {Promise<0 | 1 | -403 | -423>} A promise that resolves with `0` if the previous menu should be closed, `1` if the previous menu should be reopened, `-403` if the player is not the owner, and `-423` if Ultra Security Mode is disabled.
 */
export declare function managePermissionsPresets(player: Player): Promise<0 | 1 | -403 | -423>;
export {};
