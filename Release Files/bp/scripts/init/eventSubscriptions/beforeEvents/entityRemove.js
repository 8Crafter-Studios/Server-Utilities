import { Player, world } from "@minecraft/server";
subscribedEvents.beforeEntityRemove = world.beforeEvents.entityRemove.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entityRemoveBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    if (event.removedEntity instanceof Player) {
        event.removedEntity.setDynamicProperty("lastHurtByPlayerTime", 0);
    }
});
//# sourceMappingURL=entityRemove.js.map