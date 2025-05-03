import { world } from "@minecraft/server";
subscribedEvents.afterTripWireTrip = world.afterEvents.tripWireTrip.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:tripWireTrip")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("tripWireTripAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=tripWireTrip.js.map