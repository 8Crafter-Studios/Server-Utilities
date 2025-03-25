import { world } from "@minecraft/server";
subscribedEvents.afterItemStopUseOn = world.afterEvents.itemStopUseOn.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:itemStopUseOn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("itemStopUseOnAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    // world.sendMessage("itemStopUseOn: "+JSON.stringify({ItemStack: event.itemStack.typeId, source: event.source.name, block: event.block}))
});
//# sourceMappingURL=itemStopUseOn.js.map