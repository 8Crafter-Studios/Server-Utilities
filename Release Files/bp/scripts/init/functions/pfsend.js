globalThis.pfsend = function pfsend(player, value, space) {
    player.sendMessage(JSONB.stringify(value, undefined, space, {
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
export {};
//# sourceMappingURL=pfsend.js.map