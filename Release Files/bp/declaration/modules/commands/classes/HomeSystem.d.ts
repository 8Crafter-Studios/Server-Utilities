import { Player } from "@minecraft/server";
import type { extendedExecuteCommandPlayerW } from "modules/commands/types/extendedExecuteCommandPlayerW";
import { Home } from "./Home";
export declare class HomeSystem {
    constructor();
    static home_format_version: string;
    static getHomes(homeIds: string[]): Home[];
    static getAllHomes(): Home[];
    static getHomeIds(): string[];
    static getHomeIdsForPlayer(player: Player | extendedExecuteCommandPlayerW | string): string[];
    static getHomesForPlayer(player: Player | extendedExecuteCommandPlayerW | string): Home[];
    static testIfPlayerAtMaxHomes(player: Player | extendedExecuteCommandPlayerW | string): boolean;
    static get maxHomesPerPlayer(): number;
    static set maxHomesPerPlayer(maxHomes: number);
}
