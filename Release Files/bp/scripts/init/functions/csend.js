import { world } from "@minecraft/server";
globalThis.csend = function csend(value, space) {
    world.sendMessage(JSON.stringify(value, undefined, space));
};
//# sourceMappingURL=csend.js.map