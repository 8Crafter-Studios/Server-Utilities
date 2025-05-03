import { world } from "@minecraft/server";
subscribedEvents.afterPressurePlatePush =
    world.afterEvents.pressurePlatePush.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePush")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("pressurePlatePushAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=pressurePlatePush.js.map