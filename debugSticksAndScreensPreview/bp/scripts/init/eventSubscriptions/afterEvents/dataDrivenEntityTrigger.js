import { world } from "@minecraft/server";
subscribedEvents.afterDataDrivenEntityTrigger = world.afterEvents.dataDrivenEntityTrigger.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:dataDrivenEntityTrigger")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("dataDrivenEntityTriggerAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:dataDrivenEntityTriggerEvent")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("dataDrivenEntityTriggerEventAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=dataDrivenEntityTrigger.js.map