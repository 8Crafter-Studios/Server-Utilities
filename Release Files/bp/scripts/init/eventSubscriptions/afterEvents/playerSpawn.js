import { world } from "@minecraft/server";
subscribedEvents.afterPlayerSpawn = world.afterEvents.playerSpawn.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerSpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("playerSpawnAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=playerSpawn.js.map