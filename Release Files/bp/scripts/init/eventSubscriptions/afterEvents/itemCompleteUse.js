import { world } from "@minecraft/server";
subscribedEvents.afterItemCompleteUse =
    world.afterEvents.itemCompleteUse.subscribe((event) => {
        if (!!event?.itemStack?.getDynamicProperty("itemCompleteUseCode")) {
            try {
                eval(String(event?.itemStack?.getDynamicProperty("itemCompleteUseCode")));
            }
            catch (e) {
                console.error(e, e.stack);
                world.getAllPlayers().forEach((currentplayer) => {
                    if (currentplayer.hasTag("itemCompleteUseCodeDebugErrors")) {
                        currentplayer.sendMessage(e + e.stack);
                    }
                });
            }
        }
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:itemCompleteUse")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemCompleteUseAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=itemCompleteUse.js.map