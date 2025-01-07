import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
subscribedEvents.afterWeatherChange = world.afterEvents.weatherChange.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:weatherChange")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("weatherChangeAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithTags("getWeatherChangeNotifications")
            .filter((p) => !p.hasTag("excludeWeatherChangeNotificationsTo:" +
            event.newWeather) &&
            !p.hasTag("excludeGameModeChangeNotificationsIn:" +
                event.dimension) &&
            !p.hasTag("excludeGameModeChangeNotificationsFrom:" +
                event.previousWeather))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eweatherChange§r] Weather in ${event.dimension} changed from ${event.previousWeather} to ${event.newWeather}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getWeatherChangeNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getWeatherChangeNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getWeatherChangeNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=weatherChange.js.map