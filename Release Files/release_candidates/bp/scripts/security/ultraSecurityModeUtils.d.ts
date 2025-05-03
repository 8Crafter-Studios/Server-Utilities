import { Player } from "@minecraft/server";
import * as cmdslist from "modules/commands_list/constants/commands";
import type { commandCategory } from "modules/commands/types/commandCategory";
import type { command } from "modules/commands/classes/command";
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
        readonly description: "Allows the player to have full owner-level permissions.\n    This gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.\n    §cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to have full head admin-level permissions.\n    §cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to have full admin-level permissions.\n    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to have full moderator-level permissions.\n    §cDANGER!: This permission should only be given to moderators. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to use owner-level custom commands.\n    §cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to use head admin-level custom commands.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.useOwnerLevelCommands' permission.\n    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to use admin-level custom commands.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.useHeadAdminLevelCommands' permission.\n    This permission is included in the 'andexdb.useOwnerLevelCommands' permission.\n    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to use moderator-level custom commands.\n    This permission is included in the 'andexdb.moderator' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.useAdminLevelCommands' permission.\n    This permission is included in the 'andexdb.useHeadAdminLevelCommands' permission.\n    This permission is included in the 'andexdb.useOwnerLevelCommands' permission.";
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
        readonly description: "Allows the player to run arbitrary JavaScript code in the chat with the '${se}' or '${scripteval}' escape sequence.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to run any vanilla command in the chat with the '${r}' or '${run}' escape sequence.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to run arbitrary JavaScript code.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to have the ability to ban players through the manage bans UI.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to have the ability to unban players through the manage bans UI.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the manage bans UI.\n    Note: The player will not be able to ban or unban anyone through the UI unless you give them the 'andexdb.banPlayers' or 'andexdb.unbanPlayers' permissions respectively.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to have the ability to mute players through the manage mutes UI.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to have the ability to unmute players through the manage mutes UI.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the manage mutes UI.\n    Note: The player will not be able to mute or unmute anyone through the UI unless you give them the 'andexdb.mutePlayers' or 'andexdb.unmutePlayers' permissions respectively.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the manage commands UI.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to access the Main Menu.\n    Note: The player will not be able to access some of the submenus unless you give them the permissions for those submenus.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
    /**
 * Allows the player to access the Security submenu of the Main Menu.
Note: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.
 * This permission is included in the `andexdb.headAdmin` permission.
 * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
 */
    readonly "andexdb.accessSecuritySettings": {
        readonly id: "andexdb.accessSecuritySettings";
        readonly default: false;
        readonly includedInPermissions: [];
        readonly description: "Allows the player to access the Security submenu of the Main Menu, and change the security settings in that menu.\n    Note: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    §cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.";
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
        readonly description: "Allows the player to access the Personal Settings submenu of the Settings Menu.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the Notifications Settings submenu of the Settings Menu.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the Extra Features Settings submenu of the Settings Menu.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.headAdmin' permission.";
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
        readonly description: "Allows the player to access the Advanced Settings submenu of the Settings Menu.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.headAdmin' permission.";
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
        readonly description: "Allows the player to access most of the submenus in the Settings Menu.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to access the manage warps UI.\n    This allows the player to add, remove, and reorder the warps that are in the Warps section of the player menu.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to access the manage redeemable codes UI.\n    This allows the player to add, remove, and reorder the redeemable codes that are in the redeemable codes section of the player menu.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to access the manage players UI.\n    Note: This permission SHOULD be given to moderators that you want to be able to ban people, because it is a lot easier to ban players through this UI.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
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
        readonly description: "Allows the player to delete saved data for players in the manage players UI.\n    Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    §cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.";
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
        readonly description: "Allows the player to delete saved data for players in the manage players UI.\n    Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    §cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.";
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
        readonly description: "Allows the player to manage protected areas.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to create new custom protected area categories.\n    This permission is included in the 'andexdb.headAdmin' permission.";
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
        readonly description: "Allows the player to edit existing custom protected area categories.\n    This permission is included in the 'andexdb.headAdmin' permission.";
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
        readonly description: "Allows the player to delete custom protected area categories.\n    This permission is included in the 'andexdb.headAdmin' permission.";
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
        readonly description: "Allows the player to use WorldEdit.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to bypass all forms of spawn protection.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.";
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
        readonly description: "Allows the player to bypass all teleport cooldowns.\n    This permission is included in the 'andexdb.headAdmin' permission.\n    This permission is included in the 'andexdb.admin' permission.\n    This permission is included in the 'andexdb.moderator' permission.";
        readonly additionalPrompts: [];
    };
}>;
declare global {
    const permissionType: typeof permissionTypes;
    type permissionType = (typeof permissionTypes)[keyof typeof permissionTypes] | keyof typeof permissionTypes;
}
declare const playerPermissions: {
    everyone: (typeof permissionType)[keyof typeof permissionType]["id"][];
    moderator: (typeof permissionType)[keyof typeof permissionType]["id"][];
    admin: (typeof permissionType)[keyof typeof permissionType]["id"][];
    headAdmin: (typeof permissionType)[keyof typeof permissionType]["id"][];
    [playerId: string]: (typeof permissionType)[keyof typeof permissionType]["id"][];
};
declare const permissionPresetMap: {
    readonly "andexdb.moderator": "moderator";
    readonly "andexdb.admin": "admin";
    readonly "andexdb.headAdmin": "headAdmin";
};
declare const commandsUltraSecurityModeSecurityLevelOverrides: {
    categoryOverrides: { [key in commandCategory]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"]; };
    commandOverrides: {
        [commandName: (typeof cmdslist.commands)[number]["commandName"]]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"];
    };
    customCommandOverrides: {
        [commandName: (typeof cmdslist.commands)[number]["commandName"]]: (typeof cmdslist.commands)[number]["ultraSecurityModeSecurityLevel"];
    };
};
export declare class securityVariables {
    static get ultraSecurityModeEnabled(): string | number | boolean | import("@minecraft/server").Vector3;
    static get owner(): string;
    static get securityConfiguratorPackIsActive(): boolean;
    static get permissionTypes(): typeof permissionTypes;
    static get playerPermissions(): typeof playerPermissions;
    static get commandsUltraSecurityModeSecurityLevelOverrides(): typeof commandsUltraSecurityModeSecurityLevelOverrides;
    static convertPermissionTypeToId<T extends permissionType>(permission: T): T extends keyof typeof permissionType ? T : T extends (typeof permissionType)[keyof typeof permissionType] ? T["id"] : never;
    static convertPermissionTypeToObject<T extends permissionType>(permission: T): T extends keyof typeof permissionType ? (typeof permissionType)[T] : T;
    static testPlayerForPermission(player: Player, permission: permissionType): boolean;
    static testPlayerForPermissionB(playerId: string, permission: permissionType, presetMode?: boolean): boolean;
    static testOfflinePlayerForPermission(playerId: string, permission: permissionType, presetMode?: boolean): boolean;
}
export declare function editPermissionForPlayerUI(player: Player, targetPlayerId: LooseAutocomplete<"everyone" | typeof permissionPresetMap[keyof typeof permissionPresetMap]>, mode?: "player" | "preset" | "default"): Promise<-403 | 1 | 0>;
export declare function selectSecurityMode(player: Player): Promise<-424 | -403 | 0 | 1>;
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor(player: Player): Promise<1 | 0 | -403 | -423>;
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_categories(player: Player): Promise<1 | 0 | -403 | -423>;
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_category(player: Player, category: commandCategory): Promise<1 | -403 | -423>;
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player: Player): Promise<1 | 0 | -403 | -423>;
export declare function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands_category(player: Player, category: commandCategory): Promise<1 | 0 | -403 | -423>;
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_builtIn(player: Player, command: command<"built-in">): Promise<1 | -403 | -423>;
export declare function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_custom(player: Player, command: command<"custom">): Promise<1 | -403 | -423>;
export declare function ultraSecurityModeDebug(player: Player): Promise<-423 | -403 | 1>;
export declare function resetPlayerPermissionsUI(player: Player): Promise<1 | -403 | -423>;
export declare function resetPlayerPermissionsForPlayerUI(player: Player, targetPlayerId: LooseAutocomplete<"everyone" | typeof permissionPresetMap[keyof typeof permissionPresetMap]>, isPreset?: boolean): Promise<1 | -403 | -423>;
export declare function managePermissionsPresets(player: Player): Promise<0 | 1 | -403 | -423>;
export {};
