import { world } from "@minecraft/server";
subscribedEvents.beforePlayerLeave = world.beforeEvents.playerLeave.subscribe((event) => {
    /*
try{
console.warn(`Player ${JSON.stringify(event.player.name)}<${event.player.id}> left the game.`)
}catch{
try{
    console.warn(`${event.player}<${event.player}> left the game.`)
}catch{}
}*/
    try {
        eval(String(world.getDynamicProperty("evalBeforeEvents:playerLeave")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("playerLeaveBeforeEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=playerLeave.js.map