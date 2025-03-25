import { world } from "@minecraft/server";
subscribedEvents.afterEntityHealthChanged =
    world.afterEvents.entityHealthChanged.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:entityHealthChanged")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("entityHealthChangedAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=entityHealthChanged.js.map