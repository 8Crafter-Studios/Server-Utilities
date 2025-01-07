import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban_format_version } from "modules/ban/constants/ban_format_version";
import { ban } from "modules/ban/classes/ban";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { managePlayers_managePlayer } from "./managePlayers_managePlayer";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export async function managePlayers(sourceEntitya, pagen = 0, maxplayersperpage = config.ui.pages
    .maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const savedPlayers = savedPlayer
        .getSavedPlayers()
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true);
    const numsavedplayers = savedPlayers.length;
    const numonlinesavedplayers = savedPlayers.filter((_) => _.isOnline).length;
    const numofflinesavedplayers = savedPlayers.filter((_) => !_.isOnline).length;
    form.title(`${!!search ? "Search Results" : "Manage Players"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button((page != 0 ? "§0" : "§8") + "Previous Page", "textures/ui/arrow_left");
    form.button((page < numpages - 1 ? "§0" : "§8") + "Next Page", "textures/ui/arrow_right");
    let displayPlayers = [
        ...savedPlayer
            .getSavedPlayersAlphabeticalOrder()
            .filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true)
        .slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayers.forEach((p) => {
        form.button(`${p.name}\n${ban.testForBannedPlayer(p)
            ? "Banned"
            : p.isOnline
                ? "Online"
                : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline
            ? "textures/ui/online"
            : p.isBanned
                ? "textures/ui/Ping_Offline_Red_Dark"
                : "textures/ui/offline");
    });
    const numplayersonpage = displayPlayers.length;
    let players = displayPlayers;
    form.button("Manage Bans");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return (await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .toggle("Search Player Names", search?.searchNames ?? true)
                        .toggle("Search Player IDs", search?.searchIds ?? true)
                        .toggle("Search Last Online Dates", search?.searchLastOnlineDates ?? false)
                        .toggle("Search Last Online Times", search?.searchLastOnlineTimes ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                    }
                    return await managePlayers(sourceEntity, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                        searchNames: rb.formValues[2],
                        searchIds: rb.formValues[3],
                        searchLastOnlineDates: rb
                            .formValues[4],
                        searchLastOnlineTimes: rb
                            .formValues[5],
                    }); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case 1:
                return await managePlayers(sourceEntity, Math.max(0, page - 1));
                break;
            case 2:
                return await managePlayers(sourceEntity, Math.min(numpages - 1, page + 1));
                break;
            case numplayersonpage + 3:
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
                            let form5 = new ModalFormData();
                            form5.title(`Add ID Ban`);
                            form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
                            form5.textField("Ban Time (In Minutes)", "Decimal");
                            form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
                            form5.submitButton("Ban");
                            return await forceShow(form5, sourceEntity)
                                .then(async (ha) => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ban.saveBan({
                                    removeAfterBanExpires: false,
                                    ban_format_version: ban_format_version,
                                    banDate: Date.now(),
                                    playerId: String(h.formValues[0]),
                                    originalPlayerName: undefined,
                                    type: "id",
                                    bannedById: sourceEntity.id,
                                    bannedByName: sourceEntity
                                        ?.name ??
                                        sourceEntity?.nameTag,
                                    banId: "banId:" +
                                        Date.now() +
                                        ":" +
                                        String(h.formValues[0]),
                                    unbanDate: Number(h.formValues[1]) *
                                        60000 +
                                        Date.now(),
                                    format_version: format_version,
                                    reason: String(h.formValues[2]),
                                });
                                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
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
                        case banList.length + 1:
                            let form6 = new ModalFormData();
                            form6.title(`Add Name Ban`);
                            form6.textField("Player Name\nThis is the name of the player. ", "String");
                            form6.textField("Ban Time (In Minutes)", "Decimal");
                            form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
                            form6.submitButton("Ban");
                            return await forceShow(form6, sourceEntity)
                                .then(async (ha) => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ban.saveBan({
                                    removeAfterBanExpires: false,
                                    ban_format_version: ban_format_version,
                                    banDate: Date.now(),
                                    originalPlayerId: undefined,
                                    playerName: String(h.formValues[0]),
                                    type: "name",
                                    bannedById: sourceEntity.id,
                                    bannedByName: sourceEntity
                                        ?.name ??
                                        sourceEntity?.nameTag,
                                    banId: "ban:" +
                                        Date.now() +
                                        ":" +
                                        String(h.formValues[0]),
                                    unbanDate: Number(h.formValues[1]) *
                                        60000 +
                                        Date.now(),
                                    format_version: format_version,
                                    reason: String(h.formValues[2]),
                                });
                                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
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
                            return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                            break; /*
        case banList.length+3:
        managePlayers(sourceEntity, page, maxplayersperpage, search)
        break
        case banList.length+4:
        managePlayers(sourceEntity, page, maxplayersperpage, search)*/
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
                                    0)}\n§r§b${ba.type == "id"
                                ? "playerId"
                                : "originalPlayerId"}: §6${ba.type == "id"
                                ? ba.playerId
                                : ba.originalPlayerId}\n§r§b${ba.type == "id"
                                ? "originalPlayerName"
                                : "playerName"}: §6${ba.type == "id"
                                ? ba.originalPlayerName
                                : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${
                            /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""}`);
                            form4.button("Unban");
                            form4.button("Back");
                            return await forceShow(form4, sourceEntity)
                                .then((ha) => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                if (h.selection == 0) {
                                    banList[g.selection].remove();
                                    managePlayers(sourceEntity, page, maxplayersperpage, search);
                                }
                                if (h.selection == 1) {
                                    managePlayers(sourceEntity, page, maxplayersperpage, search);
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
                });
                return 1;
                break;
            case numplayersonpage + 4:
                return 1;
                break;
            case numplayersonpage + 5:
                return 0;
                break;
            default:
                if ((await managePlayers_managePlayer(sourceEntity, players[r.selection - 3])) == 1) {
                    return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                }
                else {
                    return 0;
                }
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
//# sourceMappingURL=managePlayers.js.map