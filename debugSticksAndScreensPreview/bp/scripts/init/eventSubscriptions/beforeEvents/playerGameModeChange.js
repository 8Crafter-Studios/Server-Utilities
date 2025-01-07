import { world } from "@minecraft/server";
subscribedEvents.beforePlayerGameModeChange =
    world.beforeEvents.playerGameModeChange.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:playerGameModeChange")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerGameModeChangeBeforeEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
    });
//# sourceMappingURL=playerGameModeChange.js.map