import { world } from "@minecraft/server";
globalThis.send = function send(message) {
    world.sendMessage(message);
};
//# sourceMappingURL=send.js.map