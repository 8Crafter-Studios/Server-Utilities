import { world } from "@minecraft/server";
subscribedEvents.afterPlayerLeave = world.afterEvents.playerLeave.subscribe((event) => {
    try {
        console.warn(`Player ${JSON.stringify(event.playerName)}<${event.playerId}> left the game.`);
    }
    catch {
        try {
            console.warn(`${event.playerName}<${event.playerId}> left the game.`);
        }
        catch { }
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("playerLeaveAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=playerLeave.js.map