import { world } from "@minecraft/server";
subscribedEvents.beforeEffectAdd = world.beforeEvents.effectAdd.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("effectAddBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=effectAdd.js.map