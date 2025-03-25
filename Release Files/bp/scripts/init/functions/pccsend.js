globalThis.pccsend = function pccsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSON.stringify(value, undefined, space), options));
};
export {};
//# sourceMappingURL=pccsend.js.map