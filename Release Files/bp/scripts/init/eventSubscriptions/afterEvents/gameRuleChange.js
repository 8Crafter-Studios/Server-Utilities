import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
subscribedEvents.afterGameRuleChange =
    world.afterEvents.gameRuleChange.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:gameRuleChange")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("gameRuleChangeAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            getPlayersWithTags("getGameRuleChangeNotifications")
                .filter((p) => !p.hasTag("excludeGameRuleChangeNotificationsFor:" +
                event.rule))
                .forEach((p) => {
                psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§egameRuleChange§r] "${event.rule}" was changed to ${event.value}. `);
                let pn = new PlayerNotifications(p);
                srun(() => p.playSound(pn.getGameRuleChangeNotificationsNotificationSound
                    .soundId, {
                    pitch: pn
                        .getGameRuleChangeNotificationsNotificationSound
                        .pitch,
                    volume: pn
                        .getGameRuleChangeNotificationsNotificationSound
                        .volume,
                }));
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=gameRuleChange.js.map