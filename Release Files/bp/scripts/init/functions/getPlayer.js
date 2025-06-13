import { world } from "@minecraft/server";
var exports;
(function (exports) {
    /**
     * Gets a player by their {@link Player.prototype.name|name}.
     *
     * @param {string | number} playerName The player's name.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    function getPlayer(playerName) {
        return world.getAllPlayers().find((p) => p.name == playerName);
    }
    exports.getPlayer = getPlayer;
})(exports || (exports = {}));
export var getPlayer = exports.getPlayer;
Object.defineProperty(globalThis, "getPlayer", {
    value: getPlayer,
    configurable: false,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=getPlayer.js.map