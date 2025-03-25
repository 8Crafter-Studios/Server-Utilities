import { world } from "@minecraft/server";
subscribedEvents.afterPistonActivate =
    world.afterEvents.pistonActivate.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:pistonActivate")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("pistonActivateAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=pistonActivate.js.map