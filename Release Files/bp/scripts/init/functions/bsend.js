import { world } from "@minecraft/server";
globalThis.bsend = function bsend(value, space) {
    world.sendMessage(JSONStringify(value, true, space));
};
//# sourceMappingURL=bsend.js.map