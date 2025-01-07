import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban_format_version } from "modules/ban/constants/ban_format_version";
import { ban } from "modules/ban/classes/ban";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
/**
 * Manages the bans for a given source entity. This function displays a UI for managing bans,
 * including viewing valid and expired bans, adding new bans by ID or name, and unbanning players.
 *
 * @param sourceEntitya - The entity that is invoking the manage bans function. This can be an Entity, executeCommandPlayerW, or Player.
 *
 * @returns A promise that resolves to one of the following values:
 * - `1` if the operation was successful or canceled by the user.
 * - `0` if the user does not have the required permissions.
 * - `-2` if an error occurred during the operation.
 */
export async function manageBans(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    let form6 = new ActionFormData();
    form6.title("Manage Bans");
    ban.getValidBans().idBans.forEach((p) => {
        form6.button(`${p.playerId}\nValid`, "textures/ui/online");
    });
    ban.getExpiredBans().idBans.forEach((p) => {
        form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red");
    });
    ban.getValidBans().nameBans.forEach((p) => {
        form6.button(`${p.playerName}\nValid`, "textures/ui/online");
    });
    ban.getExpiredBans().nameBans.forEach((p) => {
        form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red");
    });
    let banList = ban
        .getValidBans()
        .idBans.concat(ban.getExpiredBans().idBans)
        .concat(ban.getValidBans().nameBans)
        .concat(ban.getExpiredBans().nameBans);
    form6.button("Add ID Ban");
    form6.button("Add Name Ban");
    form6.button("Back");
    return await forceShow(form6, sourceEntity)
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
                form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
                form5.textField("Ban Time (In Minutes)", "Decimal");
                form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
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
                        playerId: String(h.formValues[0]),
                        originalPlayerName: undefined,
                        type: "id",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "banId:" +
                            Date.now() +
                            ":" +
                            String(h.formValues[0]),
                        unbanDate: Number(h.formValues[1]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[2]),
                    });
                    return 1;
                })
                    .catch(async (e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    return await forceShow(formError, sourceEntity).then(() => {
                        return -2;
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
                form6.textField("Player Name\nThis is the name of the player. ", "String");
                form6.textField("Ban Time (In Minutes)", "Decimal");
                form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
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
                        originalPlayerId: undefined,
                        playerName: String(h.formValues[0]),
                        type: "name",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "ban:" +
                            Date.now() +
                            ":" +
                            String(h.formValues[0]),
                        unbanDate: Number(h.formValues[1]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[2]),
                    });
                    return 1;
                })
                    .catch(async (e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    return await forceShow(formError, sourceEntity).then(() => {
                        return -2;
                    });
                });
                break;
            case banList.length + 2:
                return 1;
                break; /*
    case banList.length+3:
    backMenuFunction(sourceEntity)
    break
    case banList.length+4:
    backMenuFunction(sourceEntity)*/
                break;
            default:
                let form4 = new ActionFormData();
                form4.title(`Manage Ban`);
                let ba = banList[g.selection];
                let timeRemaining = ba.timeRemaining;
                form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate) +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) *
                        3600000).toLocaleString() +
                    (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) < 0
                        ? " GMT"
                        : " GMT+") +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate) +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) *
                        3600000).toLocaleString() +
                    (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) < 0
                        ? " GMT"
                        : " GMT+") +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0)}\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${ba.type == "id"
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
                    return await forceShow(formError, sourceEntity).then(() => {
                        return -2;
                    });
                });
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        return await forceShow(formError, sourceEntity).then(() => {
            return -2;
        });
    });
}
//# sourceMappingURL=manageBans.js.map