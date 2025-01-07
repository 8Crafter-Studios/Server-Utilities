import { world } from "@minecraft/server";
subscribedEvents.afterChatSend = world.afterEvents.chatSend.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:chatSend")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("chatSendAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
});
//# sourceMappingURL=chatSend.js.map