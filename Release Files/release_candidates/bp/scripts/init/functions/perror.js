globalThis.perror = function perror(player, error, prefix = "§c") {
    player.sendMessage(prefix + (tryget(() => error.stringify()) ?? error + " " + error.stack));
};
export {};
//# sourceMappingURL=perror.js.map