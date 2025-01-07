import { world } from "@minecraft/server";
subscribedEvents.afterTargetBlockHit =
    world.afterEvents.targetBlockHit.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:targetBlockHit")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("targetBlockHitAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=targetBlockHit.js.map