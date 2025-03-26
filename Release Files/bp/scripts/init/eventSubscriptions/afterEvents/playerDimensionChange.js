import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterPlayerDimensionChange =
    world.afterEvents.playerDimensionChange.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerDimensionChange")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerDimensionChangeAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            getPlayersWithAnyOfTags([
                "getPlayerDimensionChangeNotifications",
                "includePlayerDimensionChangeNotificationsBy:" +
                    event.player.name,
                "includePlayerDimensionChangeNotificationsFromDimension:" +
                    event.fromDimension,
                "includePlayerDimensionChangeNotificationsToDimension:" +
                    event.toDimension,
                "includeBeforeChatSendNotificationsById:" + event.player.name,
            ])
                .filter((p) => !p.hasTag("excludeBeforeChatSendNotificationsById:" +
                event.player.id) &&
                !p.hasTag("excludeBeforeChatSendNotificationsBy:" +
                    event.player.name))
                .forEach((p) => {
                psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eplayerDimensionChange§r][${event.player.name}] Entered ${dimensionTypeDisplayFormatting[event.toDimension.id]} at ${vTStr(event.toLocation)} from ${dimensionTypeDisplayFormatting[event.fromDimension.id]} at ${vTStr(event.fromLocation)}. `);
                let pn = new PlayerNotifications(p);
                srun(() => p.playSound(pn
                    .getPlayerDimensionChangeNotificationsNotificationSound
                    .soundId, {
                    pitch: pn
                        .getPlayerDimensionChangeNotificationsNotificationSound
                        .pitch,
                    volume: pn
                        .getPlayerDimensionChangeNotificationsNotificationSound
                        .volume,
                }));
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=playerDimensionChange.js.map