import { world } from "@minecraft/server";
subscribedEvents.afterItemReleaseUseB =
    world.afterEvents.itemReleaseUse.subscribe((event) => {
        if (!!event?.itemStack?.getDynamicProperty("itemReleaseUseCode")) {
            try {
                eval(String(event?.itemStack?.getDynamicProperty("itemReleaseUseCode")));
            }
            catch (e) {
                console.error(e, e.stack);
                world.getAllPlayers().forEach((currentplayer) => {
                    if (currentplayer.hasTag("itemReleaseUseCodeDebugErrors")) {
                        currentplayer.sendMessage(e + e.stack);
                    }
                });
            }
        }
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:itemReleaseUse")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("itemReleaseUseAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        if (event.itemStack?.typeId === "andexdb:debug_stick" ||
            event.itemStack?.typeId === "andexdb:liquid_clipped_debug_stick") {
            event.source.setDynamicProperty("interactable_block", 0);
        }
    });
//# sourceMappingURL=itemReleaseUse.js.map