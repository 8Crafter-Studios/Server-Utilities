import { world } from "@minecraft/server";
globalThis.asend = function asend(value) {
    world.sendMessage(String(value));
};
//# sourceMappingURL=asend.js.map