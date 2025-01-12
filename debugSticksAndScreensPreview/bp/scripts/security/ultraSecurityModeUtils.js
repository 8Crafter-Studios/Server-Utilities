import { ItemStack, Player, StructureSaveMode, system, world, World } from "@minecraft/server";
import * as cmdslist from "modules/commands_list/constants/commands";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
// import { Base52 } from "modules/utilities/classes/Base52";
import { showMessage } from "modules/utilities/functions/showMessage";
import { ActionFormData } from "@minecraft/server-ui";
import { CharacterSetConverter } from "modules/utilities/classes/CharacterSetConverter";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
import { commandCategoriesDisplay } from "modules/ui/functions/commandCategoriesDisplay";
let ownerUsingDiablePermissionsDebug = false;
const deepFreeze = (obj) => {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => deepFreeze(obj[prop]));
    }
    return obj;
};
const permissionTypesChecker = (et /* { [K in keyof T]: permissionTypesChecker<T> } */) => et;
// ${se}console.log(JSON.stringify(Object.values(securityVariables.permissionTypes).filter(p=>p.includedInPermissions.includes("andexdb.admin"))))
// ${se}console.log(JSON.stringify(Object.values(securityVariables.permissionTypes).filter(p=>p.includedInPermissions.includes("andexdb.admin")).map(p=>p.id)))
const permissionTypes = Object.freeze(permissionTypesChecker({
    /**
     * Allows the player to have full owner-level permissions.
     * This gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.
     * @danger This permission should only be given to the server owners. It is EXTREMELY DANGEROUS to give this permission to anyone else.
     */
    "andexdb.fullControl": {
        id: "andexdb.fullControl",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have full owner-level permissions.
    This gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.
    §cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player full control?",
                default: false,
            },
            {
                title: "§l§cTHIS IS EXTREMELY DANGEROUS!",
                prompt: "Are you REALLY sure you want to give this player full control? This could allow this player to give a bunch of random players operator permissions. §l§cThis is EXTREMELY DANGEROUS!",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to have full head admin-level permissions.
     * @danger This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    "andexdb.headAdmin": {
        id: "andexdb.headAdmin",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have full head admin-level permissions.
    §cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player head admin? You should only give this permission to staff members you REALLY trust.",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to have full admin-level permissions.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    "andexdb.admin": {
        id: "andexdb.admin",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have full admin-level permissions.
    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player admin? You should only give this permission to staff members you trust.",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to have full moderator-level permissions.
     * @danger This permission should only be given to moderators. It is DANGEROUS to give this permission to anyone else.
     */
    "andexdb.moderator": {
        id: "andexdb.moderator",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have full moderator-level permissions.
    §cDANGER!: This permission should only be given to moderators. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player moderator? You should only give this permission to moderators.",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to use owner-level custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     * @danger This permission should only be given to the server owners. It is EXTREMELY DANGEROUS to give this permission to anyone else.
     */
    "andexdb.useOwnerLevelCommands": {
        id: "andexdb.useOwnerLevelCommands",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use owner-level custom commands.
    §cDANGER!: This permission should only be given to the owner of the server. It is EXTREMELY DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to use ALL OWNER-LEVEL COMMANDS?",
                default: false,
            },
            {
                title: "§l§cTHIS IS EXTREMELY DANGEROUS!",
                prompt: "Are you REALLY sure you want to give this player full control? §l§cThis is EXTREMELY DANGEROUS!",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to use admin-level custom commands, which includes most of the custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    "andexdb.useAdminLevelCommands": {
        id: "andexdb.useAdminLevelCommands",
        default: false,
        includedInPermissions: ["andexdb.useOwnerLevelCommands"],
        description: `Allows the player to use moderator-level custom commands.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.useOwnerLevelCommands' permission.
    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to use ALL ADMIN-LEVEL COMMANDS?",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to use moderator-level custom commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.useModeratorLevelCommands": {
        id: "andexdb.useModeratorLevelCommands",
        default: false,
        includedInPermissions: ["andexdb.useAdminLevelCommands", "andexdb.useOwnerLevelCommands"],
        description: `Allows the player to use moderator-level custom commands.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.
    This permission is included in the 'andexdb.useOwnerLevelCommands' permission.
    This permission is included in the 'andexdb.useAdminLevelCommands' permission.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to use ALL MODERATOR-LEVEL COMMANDS?",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to run arbitrary JavaScript code in the chat with the `${se}` or `${scripteval}` escape sequence.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    "andexdb.useScriptEvalEscapeSequence": {
        id: "andexdb.useScriptEvalEscapeSequence",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to run arbitrary JavaScript code in the chat with the '\${se}' or '\${scripteval}' escape sequence.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to run arbitrary JavaScript code in the chat with the '${se}' or '${scripteval}' escape sequence?",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to run any vanilla command in the chat with the `${r}` or `${run}` escape sequence.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    "andexdb.useCommandsRunningEscapeSequence": {
        id: "andexdb.useCommandsRunningEscapeSequence",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to run any vanilla command in the chat with the '\${r}' or '\${run}' escape sequence.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to run any vanilla command in the chat with the '${r}' or '${run}' escape sequence?",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to have the ability to ban players through the manage bans UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.banPlayers": {
        id: "andexdb.banPlayers",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have the ability to ban players through the manage bans UI.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to have the ability to unban players through the manage bans UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.unbanPlayers": {
        id: "andexdb.unbanPlayers",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to have the ability to unban players through the manage bans UI.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the manage bans UI.
     * Note: The player will not be able to ban or unban anyone through the UI unless you give them the `andexdb.banPlayers` or `andexdb.unbanPlayers` permissions respectively.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessManageBansUI": {
        id: "andexdb.accessManageBansUI",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the manage bans UI.
    Note: The player will not be able to ban or unban anyone through the UI unless you give them the 'andexdb.banPlayers' or 'andexdb.unbanPlayers' permissions respectively.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the manage commands UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
     */
    "andexdb.accessManageCommandsUI": {
        id: "andexdb.accessManageCommandsUI",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the manage commands UI.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.headAdmin' permission.
    §cDANGER!: This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to manage commands? This should ONLY be given to trusted staff members.",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to access the Main Menu.
     * Note: The player will not be able to access some of the submenus unless you give them the permissions for those submenus.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessMainMenu": {
        id: "andexdb.accessMainMenu",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Main Menu.
    Note: The player will not be able to access some of the submenus unless you give them the permissions for those submenus.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
 * Allows the player to access the Security submenu of the Main Menu.
Note: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.
 * This permission is included in the `andexdb.headAdmin` permission.
 * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else.
 */
    "andexdb.accessSecuritySettings": {
        id: "andexdb.accessSecuritySettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Security submenu of the Main Menu, and change the security settings in that menu.
    Note: Unless the player has the 'andexdb.fullControl' permission, the player cannot disable Ultra Security Mode through this menu, only the owner and players with the andexdb.fullControl permission can do that.
    This permission is included in the 'andexdb.headAdmin' permission.
    §cDANGER!: This permission should only be given to highly trusted staff members. It is DANGEROUS to give this permission to anyone else.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to access the security settings? This is very dangerous!",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to access the Personal Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessPersonalSettings": {
        id: "andexdb.accessPersonalSettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Personal Settings submenu of the Settings Menu.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the Notifications Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessNotificationsSettings": {
        id: "andexdb.accessNotificationsSettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Notifications Settings submenu of the Settings Menu.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the Extra Features Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    "andexdb.accessExtraFeaturesSettings": {
        id: "andexdb.accessExtraFeaturesSettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Extra Features Settings submenu of the Settings Menu.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.headAdmin' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the Advanced Settings submenu of the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. It is DANGEROUS to give this permission to anyone else, as the person could disable critical add-on system functions.
     */
    "andexdb.accessAdvancedSettings": {
        id: "andexdb.accessAdvancedSettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the Advanced Settings submenu of the Settings Menu.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.headAdmin' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access most of the submenus in the Settings Menu.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessSettings": {
        id: "andexdb.accessSettings",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access most of the submenus in the Settings Menu.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to access the manage players UI.
     * Note: This permission SHOULD be given to moderators that you want to be able to ban people, because it is a lot easier to ban players through this UI.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.accessManagePlayersUI": {
        id: "andexdb.accessManagePlayersUI",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to access the manage players UI.
    Note: This permission SHOULD be given to moderators that you want to be able to ban people, because it is a lot easier to ban players through this UI.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to delete saved data for players in the manage players UI.
     * Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.
     */
    "andexdb.UIs.managePlayersUI.deleteSavedPlayerData": {
        id: "andexdb.UIs.managePlayersUI.deleteSavedPlayerData",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to delete saved data for players in the manage players UI.
    Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    §cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to delete saved player data? This is very dangerous!",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to manage the homes saved with the `\home` command for players in the manage players UI.
     * Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.
     */
    "andexdb.UIs.managePlayersUI.manageHomes": {
        id: "andexdb.UIs.managePlayersUI.manageHomes",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to delete saved data for players in the manage players UI.
    Note: This only applies if the player has the andexdb.accessManagePlayersUI permission.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.
    §cDANGER!: This permission should only be given to trusted staff members. This is because deleting saved player data will result in not being able to see the inventory of the player while they are offline, as well as not being able to see their location, it also erases other important data.`,
        additionalPrompts: [
            {
                title: "§l§cWARNING!",
                prompt: "Are you sure you want to give this player the ability to delete saved player data? This is very dangerous!",
                default: false,
            },
        ],
    },
    /**
     * Allows the player to use the Debug Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUseDebugStick": {
        id: "andexdb.canUseDebugStick",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the Debug Stick.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the Editor Sticks, including: Editor Stick, Editor Stick B, and Editor Stick C.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUseEditorSticks": {
        id: "andexdb.canUseEditorSticks",
        default: false,
        includedInPermissions: [],
        description: `Allows the pl'yer to'use the Editor Sticks, including: Editor Stick, Editor Stick B, and Editor Stick C.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the Pick Block Sticks, including: Pick Block Stick, Data Pick Block Stick, Liquid Clipped Pick Block Stick, and Liquid Clipped Data Pick Block Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUsePickBlockSticks": {
        id: "andexdb.canUsePickBlockSticks",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the Pick Block Sticks, including: Pick Block Stick, Data Pick Block Stick, Liquid Clipped Pick Block Stick, and Liquid Clipped Data Pick Block Stick.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the Command Runner Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. The Command Runner Stick allows the player to run ANY vanilla command.
     */
    "andexdb.canUseCommandRunnerStick": {
        id: "andexdb.canUseCommandRunnerStick",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the Command Runner Stick.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
@danger This permission should only be given to trusted staff members. The Command Runner Stick allows the player to run ANY vanilla command.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the Script Runner Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * @danger This permission should only be given to trusted staff members. The Script Runner Stick allows the player to run ANY arbitrary JavaScript Code.
     */
    "andexdb.canUseScriptRunnerStick": {
        id: "andexdb.canUseScriptRunnerStick",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the Script Runner Stick.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
@danger This permission should only be given to trusted staff members. The Script Runner Stick allows the player to run ANY arbitrary JavaScript Code.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the Inventory Controller.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUseInventoryController": {
        id: "andexdb.canUseInventoryController",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the Inventory Controller.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the following items: Entity Controller and Player Controller.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUseEntityControllerItems": {
        id: "andexdb.canUseEntityControllerItems",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the following items: Entity Controller and Player Controller.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use the following items: Entity Debug Stick and Player Debug Stick.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     * This permission is included in the `andexdb.moderator` permission.
     */
    "andexdb.canUseEntityDebugSticks": {
        id: "andexdb.canUseEntityDebugSticks",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use the following items: Entity Debug Stick and Player Debug Stick.
This permission is included in the 'andexdb.headAdmin' permission.
This permission is included in the 'andexdb.admin' permission.
This permission is included in the 'andexdb.moderator' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to use WorldEdit, including all WorldEdit commands.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    "andexdb.useWorldEdit": {
        id: "andexdb.useWorldEdit",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to use WorldEdit.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.`,
        additionalPrompts: [],
    },
    /**
     * Allows the player to bypass all forms of spawn protection.
     * This permission is included in the `andexdb.headAdmin` permission.
     * This permission is included in the `andexdb.admin` permission.
     */
    "andexdb.bypassProtectedAreas": {
        id: "andexdb.bypassProtectedAreas",
        default: false,
        includedInPermissions: [],
        description: `Allows the player to bypass all forms of spawn protection.
    This permission is included in the 'andexdb.headAdmin' permission.
    This permission is included in the 'andexdb.admin' permission.`,
        additionalPrompts: [],
    },
}));
deepFreeze(permissionTypes);
Object.defineProperty(globalThis, "permissionType", {
    get: function permissionType() {
        return permissionTypes;
    },
    enumerable: true,
    configurable: false,
});
// permissionType["andexdb.UIs.managePlayersUI.deleteSavedPlayerData"]
// ${se}console.log(JSON.stringify(securityVariables.permissionTypes.map(p=>p.id)))
// export enum permissionTypeId {
//     /**
//      * Allows the player to have full owner-level permissions.
//      * This gives the player EVERY permission, including the ability to change the permissions of any players, which can only be given through this permission.
//      * @danger This permission should only be given to the server owners. It is EXTREMELY DANGEROUS to give this permission to anyone else.
//      */
//     "andexdb.fullControl" = "andexdb.fullControl",
//     "andexdb.headAdmin" = "andexdb.headAdmin",
//     "andexdb.admin" = "andexdb.admin",
//     "andexdb.moderator" = "andexdb.moderator",
//     "andexdb.useOwnerLevelCommands" = "andexdb.useOwnerLevelCommands",
//     "andexdb.useAdminLevelCommands" = "andexdb.useAdminLevelCommands",
//     "andexdb.useModeratorLevelCommands" = "andexdb.useModeratorLevelCommands",
//     "andexdb.banPlayers" = "andexdb.banPlayers",
//     "andexdb.unbanPlayers" = "andexdb.unbanPlayers",
//     "andexdb.accessManageBansUI" = "andexdb.accessManageBansUI",
//     "andexdb.accessManageCommandsUI" = "andexdb.accessManageCommandsUI",
//     "andexdb.accessMainMenu" = "andexdb.accessMainMenu",
//     "andexdb.accessSecuritySettings" = "andexdb.accessSecuritySettings",
//     "andexdb.accessPersonalSettings" = "andexdb.accessPersonalSettings",
//     "andexdb.accessNotificationsSettings" = "andexdb.accessNotificationsSettings",
//     "andexdb.accessExtraFeaturesSettings" = "andexdb.accessExtraFeaturesSettings",
//     "andexdb.accessAdvancedSettings" = "andexdb.accessAdvancedSettings",
//     "andexdb.accessSettings" = "andexdb.accessSettings",
//     "andexdb.accessManagePlayersUI" = "andexdb.accessManagePlayersUI",
//     "andexdb.UIs.managePlayersUI.deleteSavedPlayerData" = "andexdb.UIs.managePlayersUI.deleteSavedPlayerData",
//     "andexdb.UIs.managePlayersUI.manageHomes" = "andexdb.UIs.managePlayersUI.manageHomes",
//     "andexdb.canUseDebugStick" = "andexdb.canUseDebugStick",
//     "andexdb.canUseEditorSticks" = "andexdb.canUseEditorSticks",
//     "andexdb.canUsePickBlockSticks" = "andexdb.canUsePickBlockSticks",
//     "andexdb.canUseCommandRunnerStick" = "andexdb.canUseCommandRunnerStick",
//     "andexdb.canUseScriptRunnerStick" = "andexdb.canUseScriptRunnerStick",
//     "andexdb.canUseInventoryController" = "andexdb.canUseInventoryController",
//     "andexdb.canUseEntityControllerItems" = "andexdb.canUseEntityControllerItems",
//     "andexdb.canUseEntityDebugSticks" = "andexdb.canUseEntityDebugSticks",
//     "andexdb.useWorldEdit" = "andexdb.useWorldEdit",
//     "andexdb.bypassProtectedAreas" = "andexdb.bypassProtectedAreas",
// }
let ultraSecurityModeEnabled = world.getDynamicProperty("ultraSecurityModeEnabled") ?? false;
let owner = world.getDynamicProperty("owner");
const securityConfiguratorPackIsActive = !!tryget(() => new ItemStack("andexsc:security_configurator_pack_confirmation_item"));
const playerPermissionsDefault = Object.freeze({
    everyone: [],
    moderator: [
        "andexdb.useAdminLevelCommands",
        "andexdb.useModeratorLevelCommands",
        "andexdb.banPlayers",
        "andexdb.unbanPlayers",
        "andexdb.accessManageBansUI",
        "andexdb.accessMainMenu",
        "andexdb.accessPersonalSettings",
        "andexdb.accessNotificationsSettings",
        "andexdb.accessManagePlayersUI",
        "andexdb.canUseDebugStick",
        "andexdb.canUseEditorSticks",
        "andexdb.canUsePickBlockSticks",
        "andexdb.canUseScriptRunnerStick",
        "andexdb.canUseInventoryController",
        "andexdb.canUseEntityControllerItems",
        "andexdb.canUseEntityDebugSticks",
    ],
    admin: [
        "andexdb.moderator",
        "andexdb.useAdminLevelCommands",
        "andexdb.useModeratorLevelCommands",
        "andexdb.useScriptEvalEscapeSequence",
        "andexdb.useCommandsRunningEscapeSequence",
        "andexdb.banPlayers",
        "andexdb.unbanPlayers",
        "andexdb.accessManageBansUI",
        "andexdb.accessManageCommandsUI",
        "andexdb.accessMainMenu",
        "andexdb.accessPersonalSettings",
        "andexdb.accessNotificationsSettings",
        "andexdb.accessExtraFeaturesSettings",
        "andexdb.accessAdvancedSettings",
        "andexdb.accessSettings",
        "andexdb.accessManagePlayersUI",
        "andexdb.UIs.managePlayersUI.deleteSavedPlayerData",
        "andexdb.UIs.managePlayersUI.manageHomes",
        "andexdb.canUseDebugStick",
        "andexdb.canUseEditorSticks",
        "andexdb.canUsePickBlockSticks",
        "andexdb.canUseCommandRunnerStick",
        "andexdb.canUseScriptRunnerStick",
        "andexdb.canUseInventoryController",
        "andexdb.canUseEntityControllerItems",
        "andexdb.canUseEntityDebugSticks",
        "andexdb.useWorldEdit",
        "andexdb.bypassProtectedAreas",
    ],
    headAdmin: [
        "andexdb.admin",
        "andexdb.moderator",
        "andexdb.useAdminLevelCommands",
        "andexdb.useModeratorLevelCommands",
        "andexdb.useScriptEvalEscapeSequence",
        "andexdb.useCommandsRunningEscapeSequence",
        "andexdb.banPlayers",
        "andexdb.unbanPlayers",
        "andexdb.accessManageBansUI",
        "andexdb.accessManageCommandsUI",
        "andexdb.accessMainMenu",
        "andexdb.accessSecuritySettings",
        "andexdb.accessPersonalSettings",
        "andexdb.accessNotificationsSettings",
        "andexdb.accessExtraFeaturesSettings",
        "andexdb.accessAdvancedSettings",
        "andexdb.accessSettings",
        "andexdb.accessManagePlayersUI",
        "andexdb.UIs.managePlayersUI.deleteSavedPlayerData",
        "andexdb.UIs.managePlayersUI.manageHomes",
        "andexdb.canUseDebugStick",
        "andexdb.canUseEditorSticks",
        "andexdb.canUsePickBlockSticks",
        "andexdb.canUseCommandRunnerStick",
        "andexdb.canUseScriptRunnerStick",
        "andexdb.canUseInventoryController",
        "andexdb.canUseEntityControllerItems",
        "andexdb.canUseEntityDebugSticks",
        "andexdb.useWorldEdit",
        "andexdb.bypassProtectedAreas",
    ],
});
// overworld.spawnEntity("minecart", {x: 32, y: 142, z: 0}, {initialPersistence: true}).applyImpulse(Vector.back); overworld.spawnEntity("minecart", {x: -32, y: 142, z: 0}, {initialPersistence: true}).applyImpulse(Vector.forward); overworld.spawnEntity("minecart", {x: 0, y: 142, z: 32}, {initialPersistence: true}).applyImpulse(Vector.right); overworld.spawnEntity("minecart", {x: 0, y: 142, z: -32}, {initialPersistence: true}).applyImpulse(Vector.left);
// srun(async ()=>{const blocks = modules.mcServer.BlockTypes.getAll().filter(v=>/(?<!hard_[a-z_]*)stained_glass$/.test(v.id)); let i = 0; while(i<500){overworld.fillBlocks(new modules.mcServer.BlockVolume({x: 46, y: 127, z: 16}, {x: 46, y: 142, z: -3}), blocks[i % blocks.length])}})
const playerPermissions = JSON.parse(getStringFromDynamicProperties("playerPermissions", JSON.stringify(playerPermissionsDefault)));
playerPermissions.everyone ??= JSON.parse(JSON.stringify(playerPermissionsDefault.everyone));
playerPermissions.moderator ??= JSON.parse(JSON.stringify(playerPermissionsDefault.moderator));
playerPermissions.admin ??= JSON.parse(JSON.stringify(playerPermissionsDefault.admin));
playerPermissions.headAdmin ??= JSON.parse(JSON.stringify(playerPermissionsDefault.headAdmin));
function resetPlayerPermissions() {
    Object.assign(playerPermissions, JSON.parse(JSON.stringify(playerPermissionsDefault)));
}
const permissionPresetMap = {
    "andexdb.moderator": "moderator",
    "andexdb.admin": "admin",
    "andexdb.headAdmin": "headAdmin",
};
const commandsUltraSecurityModeSecurityLevelOverrides = JSON.parse(getStringFromDynamicProperties("commandsUltraSecurityModeSecurityLevelOverrides", '{"categoryOverrides": {}, "commandOverrides": {}, "customCommandOverrides": {}}'));
if (ultraSecurityModeEnabled && !securityConfiguratorPackIsActive) {
    ultraSecurityModeEnabled = false;
    world.setDynamicProperty("ultraSecurityModeEnabled", false);
    console.error("Ultra security mode is enabled, but the security configurator pack is not active, ultra security mode is now disabled.");
    world.afterEvents.playerJoin.subscribe(async (event) => {
        if (event.playerName == owner) {
            for (let i = 0; i < 101; i++) {
                if (i == 100) {
                    return;
                }
                if (!!world.getPlayers({ name: owner })[0]) {
                    break;
                }
                await waitTick();
            }
            const r = await showMessage(world.getPlayers({ name: owner })[0], "§l§cWARNING!", "Ultra security mode is enabled, but the security configurator pack is not active, §cultra security mode is now disabled. §aPlease add back the security configurator pack to re-enable ultra security mode. Once you add it, you will have to go back into security settings and enable ultra security mode again.", "I understand", "Close");
            if (r.canceled) {
                return;
            }
            if (r.selection == 0) {
                owner = undefined;
                world.setDynamicProperty("owner");
            }
        }
    });
    deepFreeze(cmdslist.commands);
}
else if (!ultraSecurityModeEnabled && securityConfiguratorPackIsActive) {
    console.error("Security configurator pack has been detected. To enable ultra security mode, go to Main Menu > Security > Settings > Security Mode. Note: Only the owner defined in the security configurator pack can enable ultra security mode.");
    world.afterEvents.playerJoin.subscribe(async (event) => {
        if (event.playerName == owner) {
            for (let i = 0; i < 101; i++) {
                if (i == 100) {
                    return;
                }
                if (!!world.getPlayers({ name: owner })[0]) {
                    break;
                }
                await waitTick();
            }
            const r = await showMessage(world.getPlayers({ name: owner })[0], "§l§cWARNING! §rMissing Required Behavior Pack (424)", "Ultra security mode is enabled, but the security configurator pack is not active, §cultra security mode is now disabled. §aPlease add back the security configurator pack to re-enable ultra security mode. Once you add it, you will have to go back into security settings and enable ultra security mode again.", "I understand", "Close");
            if (r.canceled) {
                return;
            }
            if (r.selection == 0) {
                owner = undefined;
                world.setDynamicProperty("owner");
            }
        }
    });
}
export class securityVariables {
    static get ultraSecurityModeEnabled() {
        return ultraSecurityModeEnabled;
    }
    static get owner() {
        return owner;
    }
    static get securityConfiguratorPackIsActive() {
        return securityConfiguratorPackIsActive;
    }
    static get permissionTypes() {
        return JSON.parse(JSON.stringify(permissionType));
    }
    static get playerPermissions() {
        return JSON.parse(JSON.stringify(playerPermissions));
    }
    static get commandsUltraSecurityModeSecurityLevelOverrides() {
        return JSON.parse(JSON.stringify(commandsUltraSecurityModeSecurityLevelOverrides));
    }
    static convertPermissionTypeToId(permission) {
        return (typeof permission == "object" ? permission.id : permission);
    }
    static convertPermissionTypeToObject(permission) {
        return (typeof permission == "object" ? permission : permissionType[permission]);
    }
    static testPlayerForPermission(player, permission) {
        const perm = this.convertPermissionTypeToObject(permission);
        // Owner bypasses all permissions unless `ownerUsingDiablePermissionsDebug` is on.
        if (world.getPlayers({ name: owner })[0] == player && !ownerUsingDiablePermissionsDebug) {
            return true;
        }
        // Andexter8 bypasses all permissions if he has the ultraSecurityModeDebugOverride tag, this is for debugging.
        if (world.getPlayers({ name: "Andexter8" })[0] == player && player.hasTag("ultraSecurityModeDebugOverride")) {
            return true;
        }
        // Anyone with the `andexdb.fullControl` permision bypasses all permissions.
        if (playerPermissions[player.id]?.includes("andexdb.fullControl")) {
            return true;
        } /*
        if (playerPermissions.everyone.includes(perm.id)) {
            return true;
        } */
        if (this.testPlayerForPermissionB(player.id, perm)) {
            return true;
        } /*
        if (this.testPlayerForPermissionB(player.id, "andexdb.moderator") && playerPermissions.moderator?.includes(perm.id)) {
            return true;
        }
        if (this.testPlayerForPermissionB(player.id, "andexdb.admin") && playerPermissions.admin?.includes(perm.id)) {
            return true;
        }
        if (this.testPlayerForPermissionB(player.id, "andexdb.headAdmin") && playerPermissions.headAdmin?.includes(perm.id)) {
            return true;
        } */
        if (!!perm?.includedInPermissions?.find((p) => this.testPlayerForPermissionB(player.id, p))) {
            return true;
        }
        return false;
    }
    static testPlayerForPermissionB(playerId, permission) {
        let hasPermission = false;
        const perm = this.convertPermissionTypeToObject(permission);
        if (playerPermissions[playerId]?.includes(perm.id) == true) {
            return true;
        }
        if (!!perm?.includedInPermissions?.find((p) => this.testPlayerForPermissionB(playerId, p))) {
            return true;
        }
        if (playerPermissions.everyone.includes(perm.id)) {
            return true;
        }
        playerPermissions.everyone.forEach((p) => {
            if (hasPermission)
                return;
            if (Object.keys(permissionPresetMap)?.includes(p)) {
                if (playerPermissions[permissionPresetMap[p]]?.includes(perm.id) == true) {
                    hasPermission = true;
                    return;
                }
            }
        });
        if (playerPermissions[playerId] != undefined) {
            playerPermissions[playerId].forEach((p) => {
                if (hasPermission)
                    return;
                if (Object.keys(permissionPresetMap)?.includes(p)) {
                    if (playerPermissions[permissionPresetMap[p]]?.includes(perm.id) == true) {
                        hasPermission = true;
                        return;
                    }
                }
            });
        }
        return hasPermission;
    }
    static testOfflinePlayerForPermission(playerId, permission) {
        const perm = this.convertPermissionTypeToObject(permission);
        // Anyone with the `andexdb.fullControl` permision bypasses all permissions.
        if (playerPermissions[playerId]?.includes("andexdb.fullControl")) {
            return true;
        } /*
        if (playerPermissions.everyone.includes(perm.id)) {
            return true;
        } */
        if (this.testPlayerForPermissionB(playerId, perm)) {
            return true;
        } /*
        if (this.testPlayerForPermissionB(playerId, "andexdb.moderator") && playerPermissions.moderator?.includes(perm.id)) {
            return true;
        }
        if (this.testPlayerForPermissionB(playerId, "andexdb.admin") && playerPermissions.admin?.includes(perm.id)) {
            return true;
        }
        if (this.testPlayerForPermissionB(playerId, "andexdb.headAdmin") && playerPermissions.headAdmin?.includes(perm.id)) {
            return true;
        } */
        if (!!perm?.includedInPermissions?.find((p) => this.testPlayerForPermissionB(playerId, p))) {
            return true;
        }
        return false;
    }
}
try {
    Object.defineProperties(securityVariables, Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(securityVariables)).map(([k, v]) => [
        k,
        {
            ...v,
            writable: false,
            configurable: false,
            enumerable: true,
        },
    ])));
}
catch (e) {
    /* console.error(e, e.stack); */
}
Object.defineProperty(globalThis, "securityVariables", {
    value: securityVariables,
    writable: false,
    configurable: false,
    enumerable: true,
});
Object.defineProperties(World.prototype, {
    getPlayers: {
        ...Object.getOwnPropertyDescriptor(world, "getPlayers"),
        configurable: false,
    },
    setDynamicProperty: {
        ...Object.getOwnPropertyDescriptor(world, "setDynamicProperty"),
        configurable: false,
    },
});
system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id == "andexdb:securityConfiguratorOwnerSet") {
        const functionName = event.message;
        if (functionName.startsWith("andexdbSecConfig_") && overworld.runCommand(`function ${functionName}`).successCount == 1) {
            owner = new CharacterSetConverter("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890").decode(functionName.slice(17));
            world.setDynamicProperty("owner", owner);
        }
    }
});
if (securityConfiguratorPackIsActive) {
    srun(async () => {
        try {
            if (overworld.runCommand("function andexdbSecConfigInit").successCount == 0) {
                console.error("Security configurator pack is active, but the initialization function was not found. Please make sure you have the security configurator pack installed correctly and that it is not corrupted.");
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
    system.runTimeout(async () => {
        try {
            if (overworld.runCommand("function andexdbSecConfigInit").successCount == 0) {
                console.error("Security configurator pack is active, but the initialization function was not found. Please make sure you have the security configurator pack installed correctly and that it is not corrupted.");
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }, 50);
}
system.beforeEvents.watchdogTerminate.subscribe((event) => {
    if (ultraSecurityModeEnabled) {
        world.setDynamicProperty("ultraSecurityModeEnabled", ultraSecurityModeEnabled);
        saveStringToDynamicProperties(JSON.stringify(playerPermissions), "playerPermissions");
        saveStringToDynamicProperties(JSON.stringify(commandsUltraSecurityModeSecurityLevelOverrides), "commandsUltraSecurityModeSecurityLevelOverrides");
        world.setDynamicProperty("owner", owner);
    }
});
world.afterEvents.playerJoin.subscribe(async (event) => {
    if (ultraSecurityModeEnabled) {
        for (let i = 0; i < 101; i++) {
            if (i == 100) {
                return;
            }
            if (!!world.getPlayers({ name: event.playerName })[0]) {
                break;
            }
            await waitTick();
        }
        const player = world.getPlayers({ name: event.playerName })[0];
        // Prevent player from changing their ID to owner's ID
        Object.defineProperties(player, {
            id: {
                ...Object.getOwnPropertyDescriptor(player, "id"),
                writable: false,
                configurable: false,
            },
            origName: {
                ...Object.getOwnPropertyDescriptor(player, "name"),
                writable: false,
                configurable: false,
                enumerable: false,
            },
        });
    }
});
async function playerPermissionsOverridePrevention() {
    while (ultraSecurityModeEnabled) {
        if (ultraSecurityModeEnabled) {
        }
        else {
            break;
        }
        saveStringToDynamicProperties(JSON.stringify(playerPermissions), "playerPermissions");
        saveStringToDynamicProperties(JSON.stringify(commandsUltraSecurityModeSecurityLevelOverrides), "commandsUltraSecurityModeSecurityLevelOverrides");
        world.setDynamicProperty("owner", owner);
        await waitTick();
    }
    return;
}
if (ultraSecurityModeEnabled && securityConfiguratorPackIsActive) {
    deepFreeze(cmdslist.commands);
    playerPermissionsOverridePrevention();
}
export async function editPermissionForPlayerUI(player, targetPlayerId) {
    if (!(world.getPlayers({ name: "Andexter8" })[0] == player && player.hasTag("ultraSecurityModeDebugOverride"))) {
        if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
            if (player.name !== owner) {
                await showMessage(player, "Access Denied (403)", "You are not the owner of this server, nor has the owner given you the permission to edit player's permissions, you cannot edit the permissions for players. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                return -403;
            }
            // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
            if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
                await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, nor has the owner given you the permission to edit player's permissions, you cannot edit the permissions for players. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                return -403;
            }
        }
    }
    let form = new ActionFormData();
    form.title("Edit Permissions For Player");
    const perms = Object.entries(permissionType);
    perms.forEach((permissionType) => {
        form.button((playerPermissions[targetPlayerId]?.includes(permissionType[0]) ? "§a" : securityVariables.testOfflinePlayerForPermission(targetPlayerId, permissionType[1]) ? "§e" : "§c") + permissionType[0]);
    });
    form.button("Back");
    form.button("Close");
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case Object.keys(permissionType).length:
            return 1;
        case Object.keys(permissionType).length + 1:
            return 0;
        default:
            if ((await editPermissionForPlayerUI_permission(player, targetPlayerId, perms[r.selection][1])) == 1) {
                return await editPermissionForPlayerUI(player, targetPlayerId);
            }
            else {
                return 0;
            }
    }
}
// /scriptevent s:e world.getAllPlayers().forEach(function a(player){player.onScreenDisplay.setActionBar({"rawtext":[{"text":"§6" + player.name + "\n\n§bMoney§f: "}, {"score": {"name": "*", "objective": "andexdb:money"}}, {"text":"\n§gWarnings§f: "}, {"score": {"name": "*", "objective": "warnings"}},{"text":" \n§aKills§f: "},{"score":{"name":"*","objective":"Kills"}},{"text":" \n§cDeaths§f: "},{"score":{"name":"*","objective":"Deaths"}}, {"text": `\n§dTime Played§f: ${Math.floor(world.scoreboard.getObjective("playtime").getScore(player)/3600).toFixed(0).padStart(2, 0)}:${(Math.floor(world.scoreboard.getObjective("playtime").getScore(player)/60)%3600).toFixed(0).padStart(2, 0)}:${(world.scoreboard.getObjective("playtime").getScore(player)%60).toFixed(0).padStart(2, 0)}`}]})})
async function editPermissionForPlayerUI_permission(player, targetPlayerId, permission) {
    const perm = securityVariables.convertPermissionTypeToObject(permission);
    if (!(world.getPlayers({ name: "Andexter8" })[0] == player && player.hasTag("ultraSecurityModeDebugOverride"))) {
        if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
            if (player.name !== owner) {
                await showMessage(player, "Access Denied (403)", "You are not the owner of this server, nor has the owner given you the permission to edit player's permissions, you cannot edit the permissions for players. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                return -403;
            }
            // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
            if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
                await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, nor has the owner given you the permission to edit player's permissions, you cannot edit the permissions for players. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                return -403;
            }
        }
    }
    let form = new ActionFormData();
    form.title("Edit Permissions For Player");
    form.body(`Permission: ${perm.id}\nCurrent Status: ${playerPermissions[targetPlayerId]?.includes(perm.id)}\nDefault: ${perm.default}${perm.includedInPermissions.find((p) => playerPermissions[targetPlayerId]?.includes(p))
        ? `\n§eThis player already has this permission because of the following permissions ${JSON.stringify(perm.includedInPermissions.filter((p) => playerPermissions[targetPlayerId]?.includes(p)))}. If you want to remove this permission from this player, you must remove the permissions listed above.`
        : ""}${playerPermissions.everyone.includes(perm.id)
        ? "\n§eThis player already has this permission because this permission has been enabled for everyone. To make it not enabled for everyone, go to Main Menu > Security > Default Permissions."
        : ""}§r\n` + perm.description);
    form.button(`${playerPermissions[targetPlayerId]?.includes(perm.id) ? "Remove" : "Add"} Permission${!!perm.includedInPermissions.find((p) => playerPermissions[targetPlayerId]?.includes(p)) ? "\n§cNo Effect" : ""}`);
    form.button("Back");
    form.button("Close");
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0 /*
            if (playerPermissions.everyone.includes(permission.id)) {
                playerPermissions.everyone = playerPermissions.everyone.filter(
                    (p) => p != permission.id
                );
            } */:
            if (playerPermissions[targetPlayerId]?.includes(perm.id)) {
                playerPermissions[targetPlayerId].splice(playerPermissions[targetPlayerId].indexOf(perm.id), 1);
            }
            else {
                for (let i = 0; i < perm.additionalPrompts.length; i++) {
                    const r = await showMessage(player, perm.additionalPrompts[i].title, perm.additionalPrompts[i].prompt, perm.additionalPrompts[i].default ? "Yes" : "No", perm.additionalPrompts[i].default ? "No" : "Yes");
                    if (r.canceled) {
                        return 1;
                    }
                    if (r.selection == 0) {
                        if (perm.additionalPrompts[i].default == true) {
                            continue;
                        }
                        else {
                            return 1;
                        }
                    }
                    if (perm.additionalPrompts[i].default == false) {
                        continue;
                    }
                    else {
                        return 1;
                    }
                }
                playerPermissions[targetPlayerId] ??= [];
                playerPermissions[targetPlayerId].push(perm.id);
            }
            return 1;
        case 1:
            return 1;
        case 2:
            return 0;
    }
}
export async function selectSecurityMode(player) {
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Security Mode");
    form.body("");
    form.button(`Standard Security Mode${ultraSecurityModeEnabled ? "" : "\n§aSelected"}`);
    form.button(`Ultra Security Mode${ultraSecurityModeEnabled ? "\n§aSelected" : ""}`);
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    if (r.selection == 1 && !securityConfiguratorPackIsActive) {
        const rb = await showMessage(player, "Missing Required Behavior Pack (424)", "Ultra Security Mode requires the security configurator behavior pack to be active. Please add the security configurator behavior pack to enable ultra security mode. To get the security configurator behavior pack, go to §bhttps://www.8crafter.com/andexdb-security-configurator-generator");
        return -424;
    }
    if (ultraSecurityModeEnabled || r.selection == 1) {
        if (!(world.getPlayers({ name: "Andexter8" })[0] == player && player.hasTag("ultraSecurityModeDebugOverride"))) {
            if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
                if (player.name !== owner) {
                    await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security mode. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                    return -403;
                }
                // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
                if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
                    await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security mode. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
                    return -403;
                }
            }
        }
    }
    switch (r.selection) {
        case 0:
            ultraSecurityModeEnabled = false;
            world.setDynamicProperty("ultraSecurityModeEnabled", false);
            return;
        case 1:
            ultraSecurityModeEnabled = true;
            world.setDynamicProperty("ultraSecurityModeEnabled", true);
            if (!ultraSecurityModeEnabled) {
                const rc = await showMessage(player, "Restart Required", 'A restart or reload of this world/realm/server is required to fully enable this option, if this is a world you can just run the /reload command, but if it is a realm/server please click the restart button below. Until you restart, changes to player\'s permissions will not be able to be saved, players will be able to id-spoof, and some security features may be entirely non-functional, so please restart as soon as possible. When you click the restart button below, it will shut down the world/server/realm with an error messages saying that "The server was shut down due to exceeding the scripting memory limit.".', "Restart", "Not Now");
                if (rc.selection == 0) {
                    let buffer = new ArrayBuffer(250000000); // Uses all of the currently available scripting memory, forcefully shutting down the world/realm/server.
                }
            }
            return;
        case 2:
            return;
    }
}
export async function commandsUltraSecurityModeSecurityLevelOverridesEditor(player) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Command Security Level Overrides");
    form.button("Command Categories");
    form.button("Individual Commands");
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0:
            if ((await commandsUltraSecurityModeSecurityLevelOverridesEditor_categories(player)) == 1) {
                return await commandsUltraSecurityModeSecurityLevelOverridesEditor(player);
            }
            else {
                return 0;
            }
        case 1:
            if ((await commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player)) == 1) {
                return await commandsUltraSecurityModeSecurityLevelOverridesEditor(player);
            }
            else {
                return 0;
            }
        default:
            return 1;
    }
}
export async function commandsUltraSecurityModeSecurityLevelOverridesEditor_categories(player) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Command Security Level Overrides");
    cmdslist.commandCategoryList.forEach((c) => {
        form.button(c);
    });
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled || r.selection == commandCategoriesDisplay.length) {
        return 1;
    }
    if ((await selectCommandsUltraSecurityModeSecurityLevelOverrides_category(player, cmdslist.commandCategoryList[r.selection])) == 1) {
        return await commandsUltraSecurityModeSecurityLevelOverridesEditor_categories(player);
    }
    else {
        return 0;
    }
}
export async function selectCommandsUltraSecurityModeSecurityLevelOverrides_category(player, category) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Select Category Security Level");
    form.body("Category: " + category);
    form.button(`owner${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "owner" ? "\n§aSelected" : ""}`);
    form.button(`headAdmin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "headAdmin" ? "\n§aSelected" : ""}`);
    form.button(`admin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "admin" ? "\n§aSelected" : ""}`);
    form.button(`moderator${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "moderator" ? "\n§aSelected" : ""}`);
    form.button(`WorldEdit${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "WorldEdit" ? "\n§aSelected" : ""}`);
    form.button(`everyone${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] == "everyone" ? "\n§aSelected" : ""}`);
    form.button(`none${!!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["categoryOverrides"]?.[category] ? "\n§aSelected" : ""}`);
    form.button("Back", "textures/ui/arrow_left");
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "owner";
            return 1;
        case 1:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "headAdmin";
            return 1;
        case 2:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "admin";
            return 1;
        case 3:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "moderator";
            return 1;
        case 4:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "WorldEdit";
            return 1;
        case 5:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category] = "everyone";
            return 1;
        case 6:
            delete securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][category];
            return 1;
        default:
            return 1;
    }
}
export async function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Command Security Level Overrides");
    cmdslist.commandCategoryList.forEach((c) => {
        form.button(c);
    });
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled || r.selection == commandCategoriesDisplay.length) {
        return 1;
    }
    if ((await commandsUltraSecurityModeSecurityLevelOverridesEditor_commands_category(player, cmdslist.commandCategoryList[r.selection])) == 1) {
        return await commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player);
    }
    else {
        return 0;
    }
}
export async function commandsUltraSecurityModeSecurityLevelOverridesEditor_commands_category(player, category) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    const commands = category == "custom"
        ? (await import("modules/commands/classes/command")).command.getCustomCommands()
        : (await import("modules/commands/classes/command")).command.getDefaultCommandsOfCategory(category);
    let form = new ActionFormData();
    form.title("Command Security Level Overrides");
    commands.forEach((c) => {
        form.button(c.commandName);
    });
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled || r.selection == commandCategoriesDisplay.length) {
        return 1;
    }
    if ((await (commands[r.selection].type == "built-in"
        ? selectCommandsUltraSecurityModeSecurityLevelOverrides_command_builtIn(player, commands[r.selection])
        : selectCommandsUltraSecurityModeSecurityLevelOverrides_command_custom(player, commands[r.selection]))) == 1) {
        return await commandsUltraSecurityModeSecurityLevelOverridesEditor_commands(player);
    }
    else {
        return 0;
    }
}
export async function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_builtIn(player, command) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Select Security Level For Command");
    form.body(`Command Name: ${command.commandName}`);
    form.button(`owner${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "owner" ? "\n§aSelected" : ""}`);
    form.button(`headAdmin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "headAdmin" ? "\n§aSelected" : ""}`);
    form.button(`admin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "admin" ? "\n§aSelected" : ""}`);
    form.button(`moderator${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "moderator" ? "\n§aSelected" : ""}`);
    form.button(`WorldEdit${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "WorldEdit" ? "\n§aSelected" : ""}`);
    form.button(`everyone${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] == "everyone" ? "\n§aSelected" : ""}`);
    form.button(`default${!!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["commandOverrides"]?.[command.commandName] ? "\n§aSelected" : ""}`);
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "owner";
            return 1;
        case 1:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "headAdmin";
            return 1;
        case 2:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "admin";
            return 1;
        case 3:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "moderator";
            return 1;
        case 4:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "WorldEdit";
            return 1;
        case 5:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName] = "everyone";
            return 1;
        case 6:
            delete securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["commandOverrides"][command.commandName];
            return 1;
        default:
            return 1;
    }
}
export async function selectCommandsUltraSecurityModeSecurityLevelOverrides_command_custom(player, command) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Select Security Level For Command");
    form.body(`Command Name: ${command.commandName}`);
    form.button(`owner${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "owner"
        ? "\n§aSelected"
        : ""}`);
    form.button(`headAdmin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "headAdmin"
        ? "\n§aSelected"
        : ""}`);
    form.button(`admin${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "admin"
        ? "\n§aSelected"
        : ""}`);
    form.button(`moderator${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "moderator"
        ? "\n§aSelected"
        : ""}`);
    form.button(`WorldEdit${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "WorldEdit"
        ? "\n§aSelected"
        : ""}`);
    form.button(`everyone${securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] == "everyone"
        ? "\n§aSelected"
        : ""}`);
    form.button(`default${!!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides?.["customCommandOverrides"]?.[command.commandName] ? "\n§aSelected" : ""}`);
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "owner";
            return 1;
        case 1:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "headAdmin";
            return 1;
        case 2:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "admin";
            return 1;
        case 3:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "moderator";
            return 1;
        case 4:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "WorldEdit";
            return 1;
        case 5:
            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName] = "everyone";
            return 1;
        case 6:
            delete securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["customCommandOverrides"][command.commandName];
            return 1;
        default:
            return 1;
    }
}
export async function ultraSecurityModeDebug(player) {
    if (!ultraSecurityModeEnabled) {
        const rb = await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu can only be accessed when Ultra Security Mode is enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not access this menu. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not access this menu. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Ultra Security Mode Debug");
    form.body("");
    form.button(`Temporarily remove your owner permissions.`);
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case 0:
            ownerUsingDiablePermissionsDebug = true;
            return;
        case 1:
            return 1;
    }
}
export async function resetPlayerPermissionsUI(player) {
    if (!ultraSecurityModeEnabled) {
        const rb = await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu can only be accessed when Ultra Security Mode is enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not access this menu. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not access this menu. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let r = await showMessage(player, "Reset Player Permissions", "Are you sure you want to reset all player permissions and permission level presets? §l§eThis action CANNOT be undone!", "Cancel", "Reset");
    if (r.canceled || r.selection == 0) {
        return 1;
    }
    r = await showMessage(player, "Reset Player Permissions", "§l§cAre you ABSOLUTELY sure you want to reset all player permissions and permission level presets? §eThis action CANNOT be undone!", "Cancel", "Reset");
    if (r.canceled || r.selection == 0) {
        return 1;
    }
    resetPlayerPermissions();
    return 1;
}
export async function managePermissionsPresets(player) {
    if (!ultraSecurityModeEnabled) {
        await showMessage(player, "Ultra Security Mode Disabled (423)", "This menu requires Ultra Security Mode to be enabled.");
        return -423;
    }
    if (!(playerPermissions[player.id]?.includes("andexdb.fullControl") ?? false)) {
        if (player.name !== owner) {
            await showMessage(player, "Access Denied (403)", "You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
        // The world.getPlayers function ins't succeptible to player name property spoofing, so we can trust it.
        if (player.name == owner && world.getPlayers({ name: owner })[0] != player) {
            await showMessage(player, "Access Denied (403)", "Nice try spoofing your name property, but that won't work. You are not the owner of this server, you may not change the security level of commands. If you are the owner, please double check that you typed in your username correctly when generating the security configurator behavior pack.");
            return -403;
        }
    }
    let form = new ActionFormData();
    form.title("Manage Permissions Presets");
    Object.values(permissionPresetMap).forEach(p => form.button(p));
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    const r = await form.forceShow(player);
    if (r.canceled) {
        return 1;
    }
    switch (r.selection) {
        case Object.values(permissionPresetMap).length:
            return 1;
        case Object.values(permissionPresetMap).length + 1:
            return 0;
        default:
            if ((await editPermissionForPlayerUI(player, Object.values(permissionPresetMap)[r.selection])) == 1) {
                return await managePermissionsPresets(player);
            }
            else {
                return 0;
            }
    }
}
//# sourceMappingURL=ultraSecurityModeUtils.js.map