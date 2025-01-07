globalThis.pdcsend = function pdcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
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
export {};
//# sourceMappingURL=pdcsend.js.map