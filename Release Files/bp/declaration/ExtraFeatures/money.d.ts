import { Entity, ScoreboardObjective } from "@minecraft/server";
export declare class MoneySystem {
    playerID: `${number}`;
    get money(): bigint;
    addMoney(amount: number | bigint): void;
    removeMoney(amount: number | bigint): void;
    setMoney(amount?: number | bigint): void;
    transferFromScoreboard(scoreboard: ScoreboardObjective): boolean;
    constructor(playerID: `${number}`);
    static get(player: `${number}` | Entity | {
        id: string | `${number}`;
    } | number | bigint | string): MoneySystem;
    static transferFromScoreboard(scoreboard: ScoreboardObjective): void;
}
