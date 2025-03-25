globalThis.pbcsend = function pbcsend(player, value, space, options) {
    player.sendMessage(colorizeJSONString(JSONStringify(value, true, space), options));
};
export {};
//# sourceMappingURL=pbcsend.js.map