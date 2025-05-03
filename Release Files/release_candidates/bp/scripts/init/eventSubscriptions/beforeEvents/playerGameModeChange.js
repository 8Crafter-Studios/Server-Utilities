import { world } from "@minecraft/server";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
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
        if (new ProtectedAreaTester("playerGameModeChange").testIsInArea(event, event.player.location, event.player.dimension)) {
            event.cancel = true;
            return;
        }
    });
//# sourceMappingURL=playerGameModeChange.js.map