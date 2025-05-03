import { world } from "@minecraft/server";
globalThis.fsend = function fsend(value, space) {
    world.sendMessage(JSONB.stringify(value, undefined, space, {
        bigint: true,
        class: false,
        function: false,
        Infinity: true,
        get: false,
        NaN: true,
        NegativeInfinity: true,
        set: false,
        undefined: false,
    }));
};
//# sourceMappingURL=fsend.js.map