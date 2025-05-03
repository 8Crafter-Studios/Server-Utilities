import { world } from "@minecraft/server";
subscribedEvents.afterPressurePlatePop =
    world.afterEvents.pressurePlatePop.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:pressurePlatePop")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("pressurePlatePopAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=pressurePlatePop.js.map