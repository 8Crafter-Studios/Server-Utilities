globalThis.pecsend = function pecsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
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
export {};
//# sourceMappingURL=pecsend.js.map