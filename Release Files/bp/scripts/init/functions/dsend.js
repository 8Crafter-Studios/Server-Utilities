import { world } from "@minecraft/server";
globalThis.dsend = function dsend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: true,
        Infinity: true,
        get: true,
        NaN: true,
        NegativeInfinity: true,
        set: true,
        undefined: true,
    }));
};
//# sourceMappingURL=dsend.js.map