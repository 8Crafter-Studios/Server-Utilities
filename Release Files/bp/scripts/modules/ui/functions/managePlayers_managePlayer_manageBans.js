import { Entity, world, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban_format_version } from "modules/ban/constants/ban_format_version";
import { ban } from "modules/ban/classes/ban";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function managePlayers_managePlayer_manageBans(sourceEntity, player) {
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManageBansUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageBansUI", "Okay", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + player.name);
    player.idBans.valid.forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.originalPlayerName ?? p.playerId}\nValid - ID Ban`, "textures/ui/online");
    });
    player.idBans.expired.forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.originalPlayerName ?? p.playerId}\nExpired - ID Ban`, "textures/ui/Ping_Offline_Red");
    });
    player.nameBans.valid.forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.playerName}\nValid - Name Ban`, "textures/ui/online");
    });
    player.nameBans.expired.forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.playerName}\nExpired - Name Ban`, "textures/ui/Ping_Offline_Red");
    });
    let banList = player.idBans.valid
        .concat(player.idBans.expired)
        .concat(player.nameBans.valid)
        .concat(player.nameBans.expired);
    form.body(`UUID: ${player.id}\n${player.isOnline
        ? "Online"
        : "Last Online: " +
            new Date(Number(player.lastOnline) +
                Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                    world.getDynamicProperty("andexdbSettings:timeZone") ??
                    0) *
                    3600000).toLocaleString()}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player)
        ? "\n\nID BANNED"
        : ban.testForIdBannedPlayer(player)
            ? "\n\nNAME BANNED"
            : ""}`);
    if (banList.length === 0)
        form.body("There are currently no bans.");
    form.button(customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add ID Ban", "textures/ui/hammer_l_id_ban");
    form.button(customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add Name Ban", "textures/ui/hammer_l_name_ban");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return (await forceShow(form, sourceEntity)
        .then(async (ga) => {
        let g = ga;
        if (g.canceled) {
            return 1;
        }
        switch (g.selection) {
            case banList.length:
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.banPlayers") == false) {
                        const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                        if (r.canceled || r.selection == 0) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                let form5 = new ModalFormData();
                form5.title(`Add ID Ban`);
                form5.textField("Ban Time (In Minutes)", "Decimal");
                form5.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", { defaultValue: '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"' });
                form5.submitButton("Ban");
                return await forceShow(form5, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return 1;
                    }
                    ban.saveBan({
                        removeAfterBanExpires: false,
                        ban_format_version: ban_format_version,
                        banDate: Date.now(),
                        playerId: player.id,
                        originalPlayerName: player.name,
                        type: "id",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "banId:" + Date.now() + ":" + player.id,
                        unbanDate: Number(h.formValues[0]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[1]),
                    });
                    return 1;
                })
                    .catch(async (e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    return await forceShow(formError, sourceEntity).then((r) => {
                        return +(r.selection == 0);
                    });
                });
                break;
            case banList.length + 1:
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.banPlayers") == false) {
                        const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                        if (r.canceled || r.selection == 0) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
                let form6 = new ModalFormData();
                form6.title(`Add Name Ban`);
                form6.textField("Ban Time (In Minutes)", "Decimal");
                form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", { defaultValue: '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"' });
                form6.submitButton("Ban");
                return await forceShow(form6, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return 1;
                    }
                    ban.saveBan({
                        removeAfterBanExpires: false,
                        ban_format_version: ban_format_version,
                        banDate: Date.now(),
                        originalPlayerId: player.id,
                        playerName: player.name,
                        type: "name",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "ban:" + Date.now() + ":" + player.name,
                        unbanDate: Number(h.formValues[0]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[1]),
                    });
                    return 1;
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
                break;
            case banList.length + 2:
                return 1;
                break;
            case banList.length + 3:
                return 0;
                break; /*
    case banList.length+3:
    managePlayers(sourceEntity)
    break
    case banList.length+4:
    managePlayers(sourceEntity)*/
                break;
            default:
                let form4 = new ActionFormData();
                form4.title(`Manage Bans`);
                let ba = banList[g.selection];
                let timeRemaining = ba.timeRemaining;
                form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(ba.banDate).formatDateTime(sourceEntity.timeZone) +
                    (sourceEntity.timeZone < 0 ? " UTC" : " UTC+") +
                    sourceEntity.timeZone}\n§r§bunbanDate: §q${new Date(ba.unbanDate).formatDateTime(sourceEntity.timeZone) +
                    (sourceEntity.timeZone < 0 ? " UTC" : " UTC+") +
                    sourceEntity.timeZone}\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${ba.type == "id"
                    ? "originalPlayerName"
                    : "playerName"}: §6${ba.type == "id"
                    ? ba.originalPlayerName
                    : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${
                /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""}`);
                form4.button("Unban");
                form4.button("Back");
                return await forceShow(form4, sourceEntity)
                    .then(async (ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return 1;
                    }
                    if (h.selection == 0) {
                        if (securityVariables.ultraSecurityModeEnabled) {
                            if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.unbanPlayers") == false) {
                                const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.unbanPlayers", "Okay", "Cancel");
                                if (r.canceled || r.selection == 0) {
                                    return 1;
                                }
                                else {
                                    return 0;
                                }
                            }
                        }
                        banList[g.selection].remove();
                        return 1;
                    }
                    if (h.selection == 1) {
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
    }));
}
//# sourceMappingURL=managePlayers_managePlayer_manageBans.js.map