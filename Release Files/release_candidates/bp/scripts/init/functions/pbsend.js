globalThis.pbsend = function pbsend(player, value, space) {
    player.sendMessage(JSONStringify(value, true, space));
};
export {};
//# sourceMappingURL=pbsend.js.map