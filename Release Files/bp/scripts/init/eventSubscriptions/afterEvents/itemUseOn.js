import { world } from "@minecraft/server";
subscribedEvents.afterItemUseOn = world.afterEvents.itemUseOn.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemUseOnAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=itemUseOn.js.map