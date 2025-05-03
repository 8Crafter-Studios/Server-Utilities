import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
subscribedEvents.afterPlayerGameModeChange =
    world.afterEvents.playerGameModeChange.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerGameModeChange")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerGameModeChangeAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            getPlayersWithTags("getGameModeChangeNotifications")
                .filter((p) => !p.hasTag("excludeGameModeChangeNotificationsFor:" +
                event.player.name) &&
                !p.hasTag("excludeGameModeChangeNotificationsFrom:" +
                    event.fromGameMode) &&
                !p.hasTag("excludeGameModeChangeNotificationsTo:" +
                    event.toGameMode))
                .forEach((p) => {
                psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eplayerGameModeChange§r][${event.player.name}] Changed from ${event.fromGameMode} to ${event.toGameMode}. `);
                let pn = new PlayerNotifications(p);
                srun(() => p.playSound(pn
                    .getPlayerGameModeChangeNotificationsNotificationSound
                    .soundId, {
                    pitch: pn
                        .getPlayerGameModeChangeNotificationsNotificationSound
                        .pitch,
                    volume: pn
                        .getPlayerGameModeChangeNotificationsNotificationSound
                        .volume,
                }));
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=playerGameModeChange.js.map