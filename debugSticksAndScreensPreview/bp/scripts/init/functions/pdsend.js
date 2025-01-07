globalThis.pdsend = function pdsend(player, value, space) {
    player.sendMessage(JSONB.stringify(value, undefined, space, {
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
export {};
//# sourceMappingURL=pdsend.js.map