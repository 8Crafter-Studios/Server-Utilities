import { world } from "@minecraft/server";
globalThis.esend = function esend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: false,
        Infinity: true,
        get: false,
        NaN: true,
        NegativeInfinity: true,
        set: false,
        undefined: true,
    }));
};
//# sourceMappingURL=esend.js.map