import { world } from "@minecraft/server";
subscribedEvents.afterItemUse = world.afterEvents.itemUse.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemUseAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=itemUse.js.map