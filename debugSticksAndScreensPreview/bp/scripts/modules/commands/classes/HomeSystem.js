import { world, Player } from "@minecraft/server";
import { swdp } from "init/functions/swdp";
import { gwdp } from "init/functions/gwdp";
import { Home } from "./Home";
export class HomeSystem {
    constructor() { }
    static home_format_version = "0.7.0-beta.72";
    static getHomes(homeIds) {
        let homes = [];
        homeIds.forEach((c) => homes.push(Home.get(c)));
        return homes;
    }
    static getAllHomes() {
        let homes = [];
        this.getHomeIds().forEach((c) => homes.push(Home.get(c)));
        return homes;
    }
    static getHomeIds() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("home:"));
    }
    static getHomeIdsForPlayer(player) {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("home:"))
            .filter((v) => tryget(() => JSONParse(String(world.getDynamicProperty(v)))
            ?.ownerId) == (typeof player == "string" ? player : player.id));
    }
    static getHomesForPlayer(player) {
        return this.getHomes(this.getHomeIdsForPlayer(player));
    }
    static testIfPlayerAtMaxHomes(player) {
        return (this.getHomeIdsForPlayer(player).length >= this.maxHomesPerPlayer);
    }
    static get maxHomesPerPlayer() {
        return gwdp("homeSystemSettings:maxHomesPerPlayer") == -1
            ? Infinity
            : Number(gwdp("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
    }
    static set maxHomesPerPlayer(maxHomes) {
        swdp("homeSystemSettings:maxHomesPerPlayer", maxHomes == Infinity ? -1 : maxHomes);
    }
}
//# sourceMappingURL=HomeSystem.js.map