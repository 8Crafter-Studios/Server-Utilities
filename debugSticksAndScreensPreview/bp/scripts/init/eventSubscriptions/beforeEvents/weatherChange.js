import { world } from "@minecraft/server";
subscribedEvents.beforeWeatherChange =
    world.beforeEvents.weatherChange.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:weatherChange")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("weatherChangeBeforeEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=weatherChange.js.map