import { world } from "@minecraft/server";
globalThis.bcsend = function bcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options));
};
//# sourceMappingURL=bcsend.js.map