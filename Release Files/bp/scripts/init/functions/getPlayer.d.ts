import { type Player } from "@minecraft/server";
declare namespace exports {
    /**
     * Gets a player by their {@link Player.prototype.name|name}.
     *
     * @param {string | number} playerName The player's name.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    function getPlayer(playerName: string): Player | undefined;
}
export import getPlayer = exports.getPlayer;
declare global {
    export import getPlayer = exports.getPlayer;
}
export {};
