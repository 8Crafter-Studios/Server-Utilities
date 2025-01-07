import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, MessageFormResponse, ModalFormData, } from "@minecraft/server-ui";
import { MoneySystem } from "ExtraFeatures/money";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban } from "modules/ban/classes/ban";
import { managePlayers_managePlayer_manageBans } from "./managePlayers_managePlayer_manageBans";
import { managePlayers_managePlayer_manageHomes } from "./managePlayers_managePlayer_manageHomes";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";
import { showMessage } from "modules/utilities/functions/showMessage";
import { editPermissionForPlayerUI, securityVariables } from "security/ultraSecurityModeUtils";
import * as semver from "semver";
/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity
 * @param player
 * @returns
 */
export async function managePlayers_managePlayer(sourceEntity, player) {
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManagePlayersUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Okay", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ActionFormData();
    form2.title(player.name);
    form2.body(`UUID: ${player.id}\n${player.isOnline
        ? "Online\nLast Saved: " +
            new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)
        : "Last Online: " +
            new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player)
        ? "ID BANNED"
        : ban.testForIdBannedPlayer(player)
            ? "NAME BANNED"
            : ""}`);
    form2.button("Clear Data");
    form2.button("Show Data");
    form2.button("Check Inventory");
    if (semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0")) {
        form2.button("Copy Inventory To Chest");
    }
    form2.button("Manage Bans");
    form2.button("Edit Money");
    form2.button("Manage Permissions");
    form2.button("§4Manage Hotbar Presets§f(§cCOMING SOON!§f)");
    form2.button("§4Manage Private Warps§f(§cCOMING SOON!§f)");
    form2.button("Manage Homes");
    form2.button("Back", "textures/ui/arrow_left");
    form2.button("Close", "textures/ui/crossout");
    return (await forceShow(form2, sourceEntity)
        .then(async (ga) => {
        let g = ga;
        if (g.canceled) {
            return 1;
        }
        switch (g.selection) {
            case 0:
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.UIs.managePlayersUI.deleteSavedPlayerData") == false) {
                        const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.UIs.managePlayersUI.deleteSavedPlayerData", "Okay", "Cancel");
                        if (r.canceled || r.selection == 0) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                let form3 = new MessageFormData();
                form3.title("Confirm Player Data Clear");
                form3.body(`Are you sure you want to clear all of ${player.name}'s saved player data?\nThis action cannot be undone.`);
                form3.button2("Clear All Data");
                form3.button1("Cancel");
                return await forceShow(form3, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled || h.selection == 0) {
                        return 1;
                    }
                    if (h.selection == 1) {
                        player.remove();
                        return 1;
                    }
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    formError.button2("Close");
                    forceShow(formError, sourceEntity).then((r) => {
                        return +(r.selection == 0);
                    });
                });
                break;
            case 1:
                if ((await managePlayers_managePlayer_viewData(sourceEntity, player)) == 1) {
                    return await managePlayers_managePlayer(sourceEntity, player);
                }
                else {
                    return 0;
                }
                break;
            case 2:
                let slotsArray = [];
                let text = "";
                if (semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0")) {
                    const items = player.getItems(sourceEntity);
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
                                JSONStringify(tryget(() => item[1]
                                    .getComponent("enchantable")
                                    .getEnchantments()) ?? "N/A", true)));
                        }
                        else {
                            slotsArray = slotsArray.concat("slot: " + item[0] + ", item: minecraft:air");
                        }
                    });
                }
                else {
                    let items = player.items.inventory.concat(player.items.equipment);
                    items.forEach((item) => {
                        if (item.count != 0) {
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
                            slotsArray = slotsArray.concat("slot: " +
                                item.slot +
                                ", item: minecraft:air");
                        }
                    });
                }
                text = String("(format_version: " +
                    player.format_version +
                    ") " +
                    player.name +
                    (world
                        .getAllPlayers()
                        .find((p) => p.id == player.id) != undefined
                        ? " (Online)"
                        : " (last seen: " +
                            new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone) +
                            ")") +
                    " Items: \n" +
                    slotsArray.join("§r§f\n"));
                let form5 = new ActionFormData();
                form5.title(`${player.name}'s Saved Inventory Data`);
                form5.body(`${text}`);
                form5.button("Done");
                return await forceShow(form5, sourceEntity)
                    .then((ha) => {
                    return 1;
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    formError.button2("Close");
                    forceShow(formError, sourceEntity).then(() => {
                        return e;
                    });
                });
                break;
            case semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0")
                ? 3
                : -3:
                {
                    const items = player.getItems(sourceEntity);
                    const block2 = sourceEntity.dimension.getBlock(sourceEntity.location);
                    const block = sourceEntity.dimension.getBlock(Vector.add(sourceEntity.location, Vector.up));
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
                    return await managePlayers_managePlayer(sourceEntity, player);
                }
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 3:
                if ((await managePlayers_managePlayer_manageBans(sourceEntity, player)) == 1) {
                    return await managePlayers_managePlayer(sourceEntity, player);
                }
                else {
                    return 0;
                }
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 4:
                {
                    try {
                        return await new ModalFormData()
                            .textField("Money", "int", MoneySystem.get(player.id).money.toString())
                            .forceShow(sourceEntity)
                            .then(async (r) => {
                            if (!!r.formValues[0].toBigInt()) {
                                MoneySystem.get(player.id).setMoney(r.formValues[0].toBigInt());
                            }
                            else {
                                await showMessage(sourceEntity, "Invalid Input", "The value you have inputted is not a valid amount of money.", "Okay", "Cancel");
                            }
                            return 1;
                        });
                    }
                    catch (e) {
                        console.error(e, e?.stack);
                        return 1;
                    }
                }
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 5:
                if ((await (securityVariables.ultraSecurityModeEnabled ? editPermissionForPlayerUI(sourceEntity, player.id) : managePlayers_managePlayer_managePermissions(sourceEntity, player))) == 1) {
                    return await managePlayers_managePlayer(sourceEntity, player);
                }
                else {
                    return 0;
                }
                return 1;
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 8:
                if ((await managePlayers_managePlayer_manageHomes(sourceEntity, player)) == 1) {
                    return await managePlayers_managePlayer(sourceEntity, player);
                }
                else {
                    return 0;
                }
                return 1;
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 9:
                return 1;
                break;
            case +semver.satisfies(player.player_save_format_version ?? "0.0.0", ">=1.5.0") + 10:
                return 0;
                break;
            default:
                return 1;
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    }));
}
export async function managePlayers_managePlayer_viewData(sourceEntity, player) {
    let form4 = new ActionFormData();
    form4.title(`${player.name}'s Saved Player Data`);
    form4.body(`${colorizeJSONString(JSON.stringify(player, undefined, 2).replaceAll("§", "\uF019") /* .replaceAll(
        /(?<!\\)(?![},:](\"|{\"))\"/g,
        '§r§f"'
    ) */)}`);
    form4.button("Done");
    return await forceShow(form4, sourceEntity)
        .then(() => 1)
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    });
}
export async function managePlayers_managePlayer_managePermissions(sourceEntity, player) {
    let form4 = new ModalFormData();
    form4.title(`${player.name}'s Permissions`);
    form4.toggle(`canUseChatCommands${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseChatCommands") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseChatCommands").value}§a when the player joins)` : ""}`, player.playerPermissions.canUseChatCommands);
    form4.toggle(`canUseDangerousCommands${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseDangerousCommands") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseDangerousCommands").value}§a when the player joins)` : ""}`, player.playerPermissions.canUseDangerousCommands);
    form4.toggle(`canUseScriptEval${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseScriptEval") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseScriptEval").value}§a when the player joins)` : ""}`, player.playerPermissions.canUseScriptEval);
    form4.toggle(`canUseCommands${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseCommands") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canUseCommands").value}§a when the player joins)` : ""}`, player.playerPermissions.canUseCommands);
    form4.toggle(`canBypassProtectedAreas${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canBypassProtectedAreas") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "canBypassProtectedAreas").value}§a when the player joins)` : ""}`, player.playerPermissions.canBypassProtectedAreas);
    form4.toggle(`getAllChatCommands${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "getAllChatCommands") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "getAllChatCommands").value}§a when the player joins)` : ""}`, player.playerPermissions.getAllChatCommands);
    form4.toggle(`admin${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "admin") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "admin").value}§a when the player joins)` : ""}`, player.playerPermissions.admin);
    form4.slider(`permissionLevel${!!player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "permissionLevel") ? `§a (Will be set to §b${player.onJoinActions.find(a => a.type == "set_permission" && a.permission == "permissionLevel").value}§a when the player joins)` : ""}`, 0, 10, 1, player.playerPermissions.permissionLevel);
    form4.submitButton("Save");
    return await forceShow(form4, sourceEntity)
        .then(async (r) => {
        if (r.canceled) {
            return 1;
        }
        if (player.isOnline) {
            player.playerPermissions.canUseChatCommands = r.formValues[0];
            player.playerPermissions.canUseDangerousCommands = r.formValues[1];
            player.playerPermissions.canUseScriptEval = r.formValues[2];
            player.playerPermissions.canUseCommands = r.formValues[3];
            player.playerPermissions.canBypassProtectedAreas = r.formValues[4];
            player.playerPermissions.getAllChatCommands = r.formValues[5];
            player.playerPermissions.admin = r.formValues[6];
            player.playerPermissions.permissionLevel = r.formValues[7];
        }
        else {
            let form2 = new MessageFormData();
            form2.body("Changing a player's permissions while they are offline will schedule the permission changes to be applied to the player when they join. Saving these changes will also result in any previously scheduled permission changes being canceled. To cancel the scheduled changes and keep the current permissions, just open the \"Manage Permissions\" menu again and save it without changing any options.");
            form2.title("Clear Previously Scheduled Changes?");
            form2.button1("Continue");
            form2.button2("Cancel");
            return await forceShow(form2, sourceEntity).then((rb) => {
                if (rb.selection == 0) {
                    player.onJoinActions.forEach((a, i) => {
                        if (a.type == "set_permission") {
                            player.onJoinActions.splice(i, 1);
                        }
                    });
                    player.onJoinActions.push({ type: "set_permission", permission: "canUseChatCommands", value: r.formValues[0] });
                    player.onJoinActions.push({ type: "set_permission", permission: "canUseDangerousCommands", value: r.formValues[1] });
                    player.onJoinActions.push({ type: "set_permission", permission: "canUseScriptEval", value: r.formValues[2] });
                    player.onJoinActions.push({ type: "set_permission", permission: "canUseCommands", value: r.formValues[3] });
                    player.onJoinActions.push({ type: "set_permission", permission: "canBypassProtectedAreas", value: r.formValues[4] });
                    player.onJoinActions.push({ type: "set_permission", permission: "getAllChatCommands", value: r.formValues[5] });
                    player.onJoinActions.push({ type: "set_permission", permission: "admin", value: r.formValues[6] });
                    player.onJoinActions.push({ type: "set_permission", permission: "permissionLevel", value: r.formValues[7] });
                    player.save();
                }
                ;
                return 1;
            });
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    });
}
//# sourceMappingURL=managePlayers_managePlayer.js.map