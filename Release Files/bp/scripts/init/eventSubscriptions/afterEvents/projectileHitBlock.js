import { world } from "@minecraft/server";
subscribedEvents.afterProjectileHitBlock =
    world.afterEvents.projectileHitBlock.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("projectileHitBlockAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=projectileHitBlock.js.map