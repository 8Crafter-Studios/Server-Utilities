import { Player, world } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { MoneySystem } from "ExtraFeatures/money";
import { ban } from "modules/ban/classes/ban";
import { managePlayers_managePlayer_manageBans } from "./managePlayers_managePlayer_manageBans";
import { managePlayers_managePlayer_manageHomes } from "./managePlayers_managePlayer_manageHomes";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";
import { showMessage } from "modules/utilities/functions/showMessage";
import { editPermissionForPlayerUI, securityVariables } from "security/ultraSecurityModeUtils";
import * as semver from "semver";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
import { manageBansOnPlayer } from "./manageBans";
import { ModerationActions } from "modules/moderation/classes/ModerationActions";
import { addMuteOnPlayer, manageMute, unmutePlayer } from "./manageMutes";
/**
 * Shows the player a menu for managing a player.
 *
 * This menu is the menu that is opened when the player clicks on a player in the manage players menu.
 *
 * @todo Split each of the cases in the switch function into separate functions.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {savedPlayer} targetPlayer - The player to manage.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function managePlayers_managePlayer(sourceEntity, targetPlayer) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessManagePlayersUI") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + targetPlayer.name);
            form.body(`UUID: ${targetPlayer.id}\n${targetPlayer.isOnline
                ? "Online\nLast Saved: " + new Date(targetPlayer.lastOnline).formatDateTime(player.timeZone, false, true)
                : "Last Online: " + new Date(targetPlayer.lastOnline).formatDateTime(player.timeZone, false, true)}\nFirst Joined: ${new Date(targetPlayer.firstJoined).formatDateTime(player.timeZone, false, true)}\nData Format Version: ${targetPlayer.format_version}${ban.testForIdBannedPlayer(targetPlayer) ? "ID BANNED" : ban.testForIdBannedPlayer(targetPlayer) ? "NAME BANNED" : ""}`);
            form.button(customFormUICodes.action.buttons.positions.main_only + "Show Data", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Check Inventory", "textures/ui/icon_recipe_item");
            const copyInventoryToChestIsAvailable_formatVersion = semver.satisfies(targetPlayer.player_save_format_version ?? "0.0.0", ">=1.5.0");
            const copyInventoryToChestIsAvailable_modernSaveSystem = copyInventoryToChestIsAvailable_formatVersion && targetPlayer.hasModernInventorySave;
            const copyInventoryToChestIsAvailable = copyInventoryToChestIsAvailable_formatVersion && copyInventoryToChestIsAvailable_modernSaveSystem;
            if (copyInventoryToChestIsAvailable) {
                form.button(customFormUICodes.action.buttons.positions.main_only + "Copy Inventory To Chest", "textures/ui/inventory_icon");
            }
            else {
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${customFormUICodes.action.buttons.options.disabled}Copy Inventory To Chest\nUnavailable ${copyInventoryToChestIsAvailable_formatVersion
                    ? targetPlayer.hasLegacyInventorySave
                        ? "(Legacy Save Mode)"
                        : "(No Data)"
                    : "(Old Format Version)"}`, "textures/ui/inventory_icon");
            }
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Bans", "textures/ui/hammer_l");
            const isMuted = ModerationActions.testForMutedPlayer(targetPlayer.name);
            form.button(customFormUICodes.action.buttons.positions.main_only + (isMuted ? "Mute Details" : "Mute Player"), isMuted ? "textures/ui/mute_on" : "textures/ui/mute_off");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Money", "textures/items/emerald");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Permissions", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only +
                customFormUICodes.action.buttons.options.disabled +
                "§4Manage Hotbar Presets §f(§cCOMING SOON!§f)", "textures/ui/creative_icon");
            form.button(customFormUICodes.action.buttons.positions.main_only +
                customFormUICodes.action.buttons.options.disabled +
                "§4Manage Private Warps §f(§cCOMING SOON!§f)", "textures/items/ender_pearl");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Homes", "textures/ui/store_home_icon");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Clear Data", "textures/ui/trash_default");
            const r = await form.forceShow(player);
            if (r.canceled) {
                return 1;
            }
            switch (cullUndefined([
                "showData",
                "checkInventory",
                copyInventoryToChestIsAvailable ? "copyInventoryToChest" : undefined,
                "manageBans",
                "mute",
                "editMoney",
                "managePermissions",
                "manageHotbarPresets",
                "managePrivateWarps",
                "manageHomes",
                "back",
                "close",
                "clearData",
            ])[r.selection]) {
                case "clearData": {
                    if (securityVariables.ultraSecurityModeEnabled) {
                        if (securityVariables.testPlayerForPermission(player, "andexdb.UIs.managePlayersUI.deleteSavedPlayerData") == false) {
                            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.UIs.managePlayersUI.deleteSavedPlayerData", "Okay", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                    let form = new MessageFormData();
                    form.title("Confirm Player Data Clear");
                    form.body(`Are you sure you want to clear all of ${targetPlayer.name}'s saved player data?\nThis action cannot be undone.`);
                    form.button2("Clear All Data");
                    form.button1("Cancel");
                    const r = await form.forceShow(player);
                    if (r.canceled || r.selection === 0) {
                        continue;
                    }
                    else {
                        targetPlayer.remove();
                        return 1;
                    }
                }
                case "showData":
                    if ((await managePlayers_managePlayer_viewData(player, targetPlayer)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "checkInventory": {
                    let slotsArray = [];
                    let text = "";
                    if (semver.satisfies(targetPlayer.player_save_format_version ?? "0.0.0", ">=1.5.0")) {
                        const items = targetPlayer.getItems(player);
                        Object.entries(items).forEachB((item) => {
                            if (!!item[1]) {
                                slotsArray = slotsArray.concat(String("slot: " +
                                    item[0] +
                                    "§r§f, item: " +
                                    item[1].typeId +
                                    "§r§f, amount: " +
                                    item[1].amount +
                                    "§r§f, nameTag: " +
                                    item[1].nameTag +
                                    "§r§f, lore: " +
                                    JSONStringify(item[1].getLore() ?? [], true) +
                                    "§r§f, enchantments: " +
                                    JSONStringify(tryget(() => item[1].getComponent("enchantable").getEnchantments()) ?? "N/A", true)));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + item[0] + ", item: minecraft:air");
                            }
                        });
                    }
                    else {
                        let items = targetPlayer.items.inventory.concat(targetPlayer.items.equipment);
                        items.forEach((item) => {
                            if (item.count !== 0) {
                                slotsArray = slotsArray.concat(String("slot: " +
                                    item.slot +
                                    ", item: " +
                                    item.id +
                                    "§r§f, amount: " +
                                    item.count +
                                    ", nameTag: " +
                                    item.name +
                                    "§r§f, lore: " +
                                    JSONStringify(item.lore ?? [], true) +
                                    "§r§f, enchantments: " +
                                    JSON.stringify(item.enchants ?? "N/A")));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + item.slot + ", item: minecraft:air");
                            }
                        });
                    }
                    text = String("(format_version: " +
                        targetPlayer.format_version +
                        ") " +
                        targetPlayer.name +
                        (world.getAllPlayers().find((p) => p.id == targetPlayer.id) !== undefined
                            ? " (Online)"
                            : " (last seen: " + new Date(targetPlayer.lastOnline).formatDateTime(player.timeZone) + ")") +
                        " Items: \n" +
                        slotsArray.join("§r§f\n"));
                    const form = new ActionFormData();
                    form.title(`${customFormUICodes.action.titles.formStyles.fullscreen}${targetPlayer.name}'s Saved Inventory Data`);
                    form.body(`${text}`);
                    form.button(customFormUICodes.action.buttons.positions.main_only + "Done");
                    await form.forceShow(player);
                    continue;
                }
                case "copyInventoryToChest": {
                    if (!copyInventoryToChestIsAvailable) {
                        if (!copyInventoryToChestIsAvailable_formatVersion) {
                            if ((await showMessage(player, "Feature Not Available.", "Sorry, the copy inventory to chest feature is not available for player data format versions below 1.5.0.", "Back", "Close")).selection !== 1) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                        else if (!copyInventoryToChestIsAvailable_modernSaveSystem && targetPlayer.hasLegacyInventorySave) {
                            if ((await showMessage(player, "Feature Not Available.", "Sorry, the copy inventory to chest feature is not available for player inventory data saved with the §bconfig.system.useLegacyPlayerInventoryDataSaveSystem§r option set to true.", "Back", "Close")).selection !== 1) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                        else if (!copyInventoryToChestIsAvailable_modernSaveSystem) {
                            if ((await showMessage(player, "Feature Not Available.", "Sorry, the copy inventory to chest feature is not available as this player's inventory save data is missing, this could be because §bconfig.system.autoSavePlayerData§r was set to false when the player's data was last saved.", "Back", "Close")).selection !== 1) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            if ((await showMessage(player, "Feature Not Available.", "Sorry, the copy inventory to chest feature is not available for an unknown reason.", "Back", "Close")).selection !== 1) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                    const items = targetPlayer.getItems(player);
                    const block2 = player.dimension.getBlock(player.location);
                    const block = player.dimension.getBlock(Vector.add(player.location, Vector.up));
                    if (!!!block.getComponent("inventory")) {
                        block.setType("barrel");
                    }
                    if (!!!block2.getComponent("inventory")) {
                        block2.setType("barrel");
                    }
                    const bc = block.getComponent("inventory").container;
                    const bc2 = block2.getComponent("inventory").container;
                    for (let i = 0; i < 27; i++) {
                        bc.setItem(i, items[i]);
                    }
                    for (let i = 27; i < 36; i++) {
                        bc2.setItem(i - 27, items[i]);
                    }
                    for (let i = 0; i < 6; i++) {
                        bc2.setItem(i + 9, items[EquipmentSlots[i]]);
                    }
                    bc2.setItem(15, items.Cursor);
                    continue;
                }
                case "manageBans":
                    if ((await manageBansOnPlayer(player, targetPlayer)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "mute":
                    if (isMuted) {
                        if ((await manageMute(player, [targetPlayer.name, ModerationActions.getMuteData(targetPlayer.name)])) === 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await addMuteOnPlayer(player, targetPlayer.name)) === 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                case "editMoney": {
                    try {
                        const r = await new ModalFormData().title(`${customFormUICodes.modal.titles.formStyles.medium}Edit Money for ${targetPlayer.name}`).textField("Money", "int", MoneySystem.get(targetPlayer.id).money.toString()).forceShow(player);
                        if (r.canceled)
                            continue;
                        if (!!r.formValues[0].toBigInt()) {
                            MoneySystem.get(targetPlayer.id).setMoney(r.formValues[0].toBigInt());
                        }
                        else {
                            if ((await showMessage(player, "Invalid Input", "The value you have inputted is not a valid amount of money.", "Back", "Close"))
                                .selection !== 1) {
                                continue;
                            }
                            else {
                                return 0;
                            }
                        }
                        continue;
                    }
                    catch (e) {
                        console.error(e, e.stack);
                        // Present the error to the user, and continue if they select "Back", and return 0 if they select "Close".
                        if ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                case "managePermissions":
                    if ((await (securityVariables.ultraSecurityModeEnabled
                        ? editPermissionForPlayerUI(player, targetPlayer.id)
                        : managePlayers_managePlayer_managePermissions(player, targetPlayer))) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageHomes":
                    if ((await managePlayers_managePlayer_manageHomes(player, targetPlayer)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageHotbarPresets":
                    /**
                     * @todo Add the code for the managePlayers_managePlayer_manageHotbarPresets function.
                     */
                    if ((await showMessage(player, undefined, "§cSorry, the feature to manage hotbar presets for other players does not exist yet.", "Back", "Close")).selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "managePrivateWarps":
                    /**
                     * @todo Add the code for the managePlayers_managePlayer_managePrivateWarps function.
                     */
                    if ((await showMessage(player, undefined, "§cSorry, the feature to manage private warps for other players does not exist yet.", "Back", "Close")).selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
export async function managePlayers_managePlayer_viewData(sourceEntity, targetPlayer) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        let form = new ActionFormData();
        form.title(`${customFormUICodes.action.titles.formStyles.fullscreen}${targetPlayer.name}'s Saved Player Data`);
        form.body(`${colorizeJSONString(JSON.stringify(targetPlayer, undefined, 2).replaceAll("§", "\uF019") /* .replaceAll(
            /(?<!\\)(?![},:](\"|{\"))\"/g,
            '§r§f"'
        ) */)}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Done");
        await form.forceShow(sourceEntity);
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function managePlayers_managePlayer_managePermissions(sourceEntity, targetPlayer) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        let form = new ModalFormData();
        form.title(`${targetPlayer.name}'s Permissions`);
        form.toggle(`canUseChatCommands${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseChatCommands")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseChatCommands").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.canUseChatCommands);
        form.toggle(`canUseDangerousCommands${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseDangerousCommands")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseDangerousCommands").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.canUseDangerousCommands);
        form.toggle(`canUseScriptEval${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseScriptEval")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseScriptEval").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.canUseScriptEval);
        form.toggle(`canUseCommands${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseCommands")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canUseCommands").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.canUseCommands);
        form.toggle(`canBypassProtectedAreas${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canBypassProtectedAreas")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "canBypassProtectedAreas").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.canBypassProtectedAreas);
        form.toggle(`getAllChatCommands${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "getAllChatCommands")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "getAllChatCommands").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.getAllChatCommands);
        form.toggle(`admin${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "admin")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "admin").value}§a when the player joins)`
            : ""}`, targetPlayer.playerPermissions.admin);
        form.slider(`permissionLevel${!!targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "permissionLevel")
            ? `§a (Will be set to §b${targetPlayer.onJoinActions.find((a) => a.type == "set_permission" && a.permission == "permissionLevel").value}§a when the player joins)`
            : ""}`, 0, 10, 1, targetPlayer.playerPermissions.permissionLevel);
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        if (targetPlayer.isOnline) {
            targetPlayer.playerPermissions.canUseChatCommands = r.formValues[0];
            targetPlayer.playerPermissions.canUseDangerousCommands = r.formValues[1];
            targetPlayer.playerPermissions.canUseScriptEval = r.formValues[2];
            targetPlayer.playerPermissions.canUseCommands = r.formValues[3];
            targetPlayer.playerPermissions.canBypassProtectedAreas = r.formValues[4];
            targetPlayer.playerPermissions.getAllChatCommands = r.formValues[5];
            targetPlayer.playerPermissions.admin = r.formValues[6];
            targetPlayer.playerPermissions.permissionLevel = r.formValues[7];
        }
        else {
            if ((await new MessageFormData()
                .body('Changing a player\'s permissions while they are offline will schedule the permission changes to be applied to the player when they join. Saving these changes will also result in any previously scheduled permission changes being canceled. To cancel the scheduled changes and keep the current permissions, just open the "Manage Permissions" menu again and save it without changing any options.')
                .title("Clear Previously Scheduled Changes?")
                .button1("Continue")
                .button2("Cancel")
                .forceShow(player)).selection === 0) {
                targetPlayer.onJoinActions.forEach((a, i) => {
                    if (a.type == "set_permission") {
                        targetPlayer.onJoinActions.splice(i, 1);
                    }
                });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "canUseChatCommands", value: r.formValues[0] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "canUseDangerousCommands", value: r.formValues[1] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "canUseScriptEval", value: r.formValues[2] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "canUseCommands", value: r.formValues[3] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "canBypassProtectedAreas", value: r.formValues[4] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "getAllChatCommands", value: r.formValues[5] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "admin", value: r.formValues[6] });
                targetPlayer.onJoinActions.push({ type: "set_permission", permission: "permissionLevel", value: r.formValues[7] });
                targetPlayer.save();
            }
            return 1;
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=managePlayers_managePlayer.js.map