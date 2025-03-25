import { world } from "@minecraft/server";
globalThis.fcsend = function fcsend(value, space, options) {
    world.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: false,
        Infinity: true,
        get: false,
        NaN: true,
        NegativeInfinity: true,
        set: false,
        undefined: false,
    }), options));
};
//# sourceMappingURL=fcsend.js.map