import { type Player } from "@minecraft/server";
declare namespace exports {
    /**
     * Gets a player by their {@link Player.prototype.id|UUID}.
     *
     * @param {string | number} playerId The player's UUID.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    function getPlayerById(playerId: string | number): Player | undefined;
}
export import getPlayerById = exports.getPlayerById;
declare global {
    export import getPlayerById = exports.getPlayerById;
}
export {};
