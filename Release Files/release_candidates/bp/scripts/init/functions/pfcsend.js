globalThis.pfcsend = function pfcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONB.stringify(value, undefined, space, {
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
export {};
//# sourceMappingURL=pfcsend.js.map