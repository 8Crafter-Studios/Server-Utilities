import { Player, world } from "@minecraft/server";
/**
 * A map of player IDs and their last hit time.
 */
const lastHitCache = new Map();
world.afterEvents.entityHitEntity.subscribe((event) => {
    if (event.hitEntity instanceof Player && event.damagingEntity instanceof Player) {
        const time = Date.now();
        lastHitCache.set(event.damagingEntity.id, time);
        lastHitCache.set(event.hitEntity.id, time);
    }
});
/**
 * Checks if a player is in PvP.
 *
 * @param {Player} player The player to check.
 * @returns {boolean} `true` if the player is in PvP, `false` otherwise.
 */
export function checkIfPlayerIsInPvP(player) {
    if ((lastHitCache.get(player.id) ?? 0) + 10000 > Date.now()) {
        return true;
    }
    return false;
}
/**
 * Gets the number of seconds left in PvP for a player.
 *
 * @param {Player} player The player to check.
 * @returns {number} The number of seconds left in PvP for the player.
 */
export function getSecondsLeftInPvP(player) {
    return Math.ceil(Math.min(((lastHitCache.get(player.id) ?? 0) + 10000 - Date.now()) / 1000, 0));
}
world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.initialSpawn) {
        if (event.player.getDynamicProperty("clearOnJoin")) {
            event.player.getComponent("inventory")?.container.clearAll();
            event.player.setDynamicProperty("clearOnJoin");
            event.player.sendMessage("Your inventory has been cleared for combat logging!");
            event.player.playSound("random.hurt");
        }
        if (event.player.getDynamicProperty("addWarningOnJoin")) {
            world.scoreboard.getObjective("warnings")?.addScore(event.player, 1);
            event.player.setDynamicProperty("addWarningOnJoin");
        }
    }
});
world.beforeEvents.playerLeave.subscribe((event) => {
    if (checkIfPlayerIsInPvP(event.player)) {
        event.player.setDynamicProperty("clearOnJoin", true);
        event.player.setDynamicProperty("addWarningOnJoin", true);
    }
    lastHitCache.delete(event.player.id);
});
//# sourceMappingURL=pvp.js.map