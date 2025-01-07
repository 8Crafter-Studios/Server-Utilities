import { system, world } from "@minecraft/server";
import { config } from "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { ban } from "../classes/ban";
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
        if (world.getDynamicProperty("andexdbSettings:banEnabled") ??
            true == true) {
            ban.executeOnBannedPlayers((p) => {
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
                let reason = b?.reason;
                try {
                    reason = String(eval(b?.reason
                        ?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)
                        ?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))
                        ?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))
                        ?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))
                        ?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))
                        ?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))
                        ?.replaceAll("{bannedBy}", String(b?.bannedByName))
                        ?.replaceAll("{bannedByName}", String(b?.bannedByName))
                        ?.replaceAll("{bannedById}", String(b?.bannedById))
                        ?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString() + " GMT"))
                        ?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString() + " GMT"))
                        ?.replaceAll("{type}", String(b?.type))
                        ?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))));
                }
                catch (e) {
                    reason = b?.reason
                        ?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)
                        ?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))
                        ?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))
                        ?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))
                        ?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))
                        ?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))
                        ?.replaceAll("{bannedBy}", String(b?.bannedByName))
                        ?.replaceAll("{bannedByName}", String(b?.bannedByName))
                        ?.replaceAll("{bannedById}", String(b?.bannedById))
                        ?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toLocaleString() +
                        " GMT"))
                        ?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toLocaleString() + " GMT"))
                        ?.replaceAll("{type}", String(b?.type))
                        ?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))
                        ?.escapeCharactersB(true)?.v;
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