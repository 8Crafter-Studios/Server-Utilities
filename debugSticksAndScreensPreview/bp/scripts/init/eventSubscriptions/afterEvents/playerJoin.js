import { world } from "@minecraft/server";
import { ban } from "modules/ban/classes/ban";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
subscribedEvents.afterPlayerJoin = world.afterEvents.playerJoin.subscribe((event) => {
    try {
        console.warn(`Player ${JSON.stringify(event.playerName)}<${event.playerId}> joined the game.`);
    }
    catch {
        try {
            console.warn(`${event.playerName}<${event.playerId}> joined the game.`);
        }
        catch { }
    }
    if (!!(ban
        ?.getValidBans()
        ?.idBans?.find((_) => _?.playerId == event?.playerId) ??
        ban
            .getValidBans()
            .nameBans.find((_) => _.playerName == event.playerName))) {
        try {
            let pName = event?.playerName;
            let pId = event?.playerId;
            let b = ban
                ?.getValidBans()
                ?.idBans?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))
                ?.find((_) => _?.playerId == event?.playerId) ??
                ban
                    .getValidBans()
                    .nameBans?.sort((a, b) => 1 - 2 * Number(a?.banDate > b?.banDate))
                    .find((_) => _.playerName == event.playerName);
            let reason = b?.reason;
            try {
                reason =
                    String(eval(b?.reason)
                        ?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)
                        ?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))
                        ?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))
                        ?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))
                        ?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))
                        ?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))
                        ?.replaceAll("{bannedBy}", String(b?.bannedByName))
                        ?.replaceAll("{bannedByName}", String(b?.bannedByName))
                        ?.replaceAll("{bannedById}", String(b?.bannedById))
                        ?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toUTCString() + " GMT"))
                        ?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toUTCString() + " GMT"))
                        ?.replaceAll("{type}", String(b?.type))
                        ?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw)) ?? b?.reason) ?? b?.reason;
            }
            catch (e) {
                reason =
                    b?.reason
                        ?.replaceAll("{timeRemaining}", `${b?.timeRemaining.days}d, ${b?.timeRemaining.hours}h ${b?.timeRemaining.minutes}m ${b?.timeRemaining.seconds}s ${b?.timeRemaining.milliseconds}ms`)
                        ?.replaceAll("{timeRemainingDays}", String(b?.timeRemaining.days))
                        ?.replaceAll("{timeRemainingHours}", String(b?.timeRemaining.hours))
                        ?.replaceAll("{timeRemainingMinutes}", String(b?.timeRemaining.minutes))
                        ?.replaceAll("{timeRemainingSeconds}", String(b?.timeRemaining.seconds))
                        ?.replaceAll("{timeRemainingMilliseconds}", String(b?.timeRemaining.milliseconds))
                        ?.replaceAll("{bannedBy}", String(b?.bannedByName))
                        ?.replaceAll("{bannedByName}", String(b?.bannedByName))
                        ?.replaceAll("{bannedById}", String(b?.bannedById))
                        ?.replaceAll("{banDate}", String(new Date(Number(b?.banDate)).toUTCString() +
                        " GMT"))
                        ?.replaceAll("{unbanDate}", String(new Date(Number(b?.unbanDate)).toUTCString() + " GMT"))
                        ?.replaceAll("{type}", String(b?.type))
                        ?.replaceAll("{timeRemainingRaw}", String(b?.timeRemainingRaw))
                        ?.escapeCharactersB(true)?.v ?? b?.reason;
            }
            world
                .getDimension("overworld")
                .runCommand(`/kick ${JSON.stringify(pName)} ${reason}`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    async function executePlayerOnJoinActions() {
        for (let i = 0; i < 101; i++) {
            if (i == 100) {
                return;
            }
            if (!!getPlayerById(event.playerId)) {
                break;
            }
            await waitTick();
        }
        savedPlayer.getSavedPlayer("player:" + event.playerId).executeOnJoinActions().catch((e) => {
            console.error(e, e.stack);
            world.getPlayers({ tags: ["getSavedPlayerOnJoinActionsDebugErrors"] }).forEach((currentplayer) => {
                currentplayer.sendMessage(`§cAn error occured when executing ${event.playerName}'s on join actions: ${e} ${e.stack}`);
            });
        });
    }
    executePlayerOnJoinActions().catch((e) => {
        console.error(e, e.stack);
        world.getPlayers({ tags: ["getSavedPlayerOnJoinActionsDebugErrors"] }).forEach((currentplayer) => {
            currentplayer.sendMessage(`§cAn error occured when executing ${event.playerName}'s on join actions: ${e} ${e.stack}`);
        });
    });
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerJoin")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("playerJoinAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=playerJoin.js.map