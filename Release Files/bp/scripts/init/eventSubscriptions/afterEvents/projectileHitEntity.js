import { world } from "@minecraft/server";
subscribedEvents.afterProjectileHitEntity =
    world.afterEvents.projectileHitEntity.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:projectileHitEntity")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("projectileHitEntityAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=projectileHitEntity.js.map