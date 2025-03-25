import { system } from "@minecraft/server";
import "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { ban } from "../classes/ban";
import moment from "moment";
/**
 * This is only editable by functions in this file.
 * @type {number|null}
 */
export let bannedPlayersCheckerIntervalID = null;
export function startCheckingForBannedPlayers() {
    if (bannedPlayersCheckerIntervalID != null) {
        stopCheckingForBannedPlayers();
    } // this prevents multiple instances of the banned players checker running simultaneously.
    bannedPlayersCheckerIntervalID = system.runInterval(() => {
        if (config.moderation.bans.enabled) {
            ban.executeOnBannedPlayers(async (p) => {
                await waitTicks(20); // So the reason message will actually appear.
                let success = false;
                let b = savedPlayer
                    ?.getSavedPlayer("player:" + p.id)
                    ?.idBans?.valid?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))[0] ??
                    savedPlayer
                        ?.getSavedPlayer("player:" + p.id)
                        ?.nameBans?.valid?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))[0] ??
                    savedPlayer
                        ?.getSavedPlayer("player:" + p.id)
                        ?.bans?.valid?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))[0] ??
                    savedPlayer
                        ?.getSavedPlayer("player:" + p.id)
                        ?.bans?.all?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))[0];
                const timeZone = config.system.timeZone;
                let reason = b?.kickMessage;
                try {
                    reason = String(eval(b?.kickMessage
                        ?.replaceAll("{timeRemaining}", b.unbanDate === Infinity ? "Forever" : Date.now() > b.unbanDate ? "-" + moment().preciseDiff(moment(b.unbanDate)) : moment().preciseDiff(moment(b.unbanDate)) /* `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms` */)
                        .replaceAll("{timeRemainingDays}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.days))
                        .replaceAll("{timeRemainingHours}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.hours))
                        .replaceAll("{timeRemainingMinutes}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.minutes))
                        .replaceAll("{timeRemainingSeconds}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.seconds))
                        .replaceAll("{timeRemainingMilliseconds}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.milliseconds))
                        .replaceAll("{bannedBy}", String(b?.bannedByName))
                        .replaceAll("{bannedByName}", String(b?.bannedByName))
                        .replaceAll("{bannedById}", String(b?.bannedById))
                        .replaceAll("{banDate}", `${formatDateTime(new Date(b.banDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`)
                        .replaceAll("{unbanDate}", b.isPermanent ? "Never" : `${formatDateTime(new Date(b.unbanDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`)
                        .replaceAll("{type}", String(b?.type))
                        .replaceAll("{timeRemainingRaw}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemainingRaw))));
                }
                catch (e) {
                    reason = b?.kickMessage
                        ?.replaceAll("{timeRemaining}", b.unbanDate === Infinity ? "Forever" : Date.now() > b.unbanDate ? "-" + moment().preciseDiff(moment(b.unbanDate)) : moment().preciseDiff(moment(b.unbanDate)))
                        .replaceAll("{timeRemainingDays}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.days))
                        .replaceAll("{timeRemainingHours}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.hours))
                        .replaceAll("{timeRemainingMinutes}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.minutes))
                        .replaceAll("{timeRemainingSeconds}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.seconds))
                        .replaceAll("{timeRemainingMilliseconds}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemaining.milliseconds))
                        .replaceAll("{bannedBy}", String(b?.bannedByName))
                        .replaceAll("{bannedByName}", String(b?.bannedByName))
                        .replaceAll("{bannedById}", String(b?.bannedById))
                        .replaceAll("{banDate}", `${formatDateTime(new Date(b.banDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`)
                        .replaceAll("{unbanDate}", b.unbanDate === Infinity ? "Never" : `${formatDateTime(new Date(b.unbanDate), timeZone)} UTC${(timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`)
                        .replaceAll("{type}", String(b?.type))
                        .replaceAll("{timeRemainingRaw}", b.unbanDate === Infinity ? "Infinity" : String(b?.timeRemainingRaw))
                        .escapeCharactersB(true)?.v;
                }
                p.runCommand(`/kick ${JSON.stringify(p.name)} ${reason}`);
                return success;
            });
        }
    }, config.system.bannedPlayersRefreshRate ?? 20);
    repeatingIntervals.bannedPlayersChecker = bannedPlayersCheckerIntervalID;
}
export function stopCheckingForBannedPlayers() {
    try {
        system.clearRun(bannedPlayersCheckerIntervalID);
        bannedPlayersCheckerIntervalID = null;
        repeatingIntervals.bannedPlayersChecker =
            bannedPlayersCheckerIntervalID;
        return 1;
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=checkingForBannedPlayers.js.map