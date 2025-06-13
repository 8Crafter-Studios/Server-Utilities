import { world } from "@minecraft/server";
var exports;
(function (exports) {
    /**
     * Gets a player by their {@link Player.prototype.id|UUID}.
     *
     * @param {string | number} playerId The player's UUID.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    function getPlayerById(playerId) {
        return world.getAllPlayers().find((p) => p.id == String(playerId));
    }
    exports.getPlayerById = getPlayerById;
})(exports || (exports = {}));
export var getPlayerById = exports.getPlayerById;
Object.defineProperty(globalThis, "getPlayerById", {
    value: getPlayerById,
    configurable: false,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=getPlayerById.js.map