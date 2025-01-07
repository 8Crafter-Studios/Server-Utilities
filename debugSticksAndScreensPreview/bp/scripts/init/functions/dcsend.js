import { world } from "@minecraft/server";
globalThis.dcsend = function dcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: true,
        Infinity: true,
        get: true,
        NaN: true,
        NegativeInfinity: true,
        set: true,
        undefined: true,
    }), options));
};
//# sourceMappingURL=dcsend.js.map