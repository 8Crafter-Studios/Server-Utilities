import { world } from "@minecraft/server";
subscribedEvents.afterItemStopUse = world.afterEvents.itemStopUse.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUse")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemStopUseAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    // world.sendMessage("itemStopUse: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, useDuration: event.useDuration}))
});
//# sourceMappingURL=itemStopUse.js.map