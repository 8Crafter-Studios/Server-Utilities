import { world } from "@minecraft/server";
subscribedEvents.afterPlayerBreakBlock =
    world.afterEvents.playerBreakBlock.subscribe((event) => {
        if (!!event?.itemStackBeforeBreak?.getDynamicProperty("afterPlayerBreakBlockCode")) {
            try {
                eval(String(event?.itemStackBeforeBreak?.getDynamicProperty("afterPlayerBreakBlockCode")));
            }
            catch (e) {
                console.error(e, e.stack);
                world.getAllPlayers().forEach((currentplayer) => {
                    if (currentplayer.hasTag("itemAfterPlayerBreakBlockCodeDebugErrors")) {
                        currentplayer.sendMessage(e + e.stack);
                    }
                });
            }
        }
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerBreakBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerBreakBlockAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=playerBreakBlock.js.map