import { world } from "@minecraft/server";
import { ProtectedAreaTester } from "init/variables/protectedAreaVariables";
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
    if (new ProtectedAreaTester("effectAdd").testIsInArea(event, event.entity.location, event.entity.dimension)) {
        event.cancel = true;
        return;
    }
});
//# sourceMappingURL=effectAdd.js.map