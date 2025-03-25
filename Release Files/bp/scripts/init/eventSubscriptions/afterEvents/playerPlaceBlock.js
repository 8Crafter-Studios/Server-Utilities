import { world } from "@minecraft/server";
subscribedEvents.afterPlayerPlaceBlock =
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerPlaceBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerPlaceBlockAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=playerPlaceBlock.js.map