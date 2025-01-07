import { world } from "@minecraft/server";
globalThis.ecsend = function ecsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: false,
        Infinity: true,
        get: false,
        NaN: true,
        NegativeInfinity: true,
        set: false,
        undefined: true,
    }), options));
};
//# sourceMappingURL=ecsend.js.map