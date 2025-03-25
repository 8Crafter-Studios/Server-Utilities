import { world } from "@minecraft/server";
globalThis.ccsend = function ccsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options));
};
//# sourceMappingURL=ccsend.js.map