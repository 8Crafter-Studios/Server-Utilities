import { Entity } from "@minecraft/server";
export declare class MoneySystem {
    playerID: `${number}`;
    get money(): bigint;
    addMoney(amount: number | bigint): void;
    removeMoney(amount: number | bigint): void;
    setMoney(amount?: number | bigint): void;
    constructor(playerID: `${number}`);
    static get(player: `${number}` | Entity | {
        id: string | `${number}`;
    } | number | bigint | string): MoneySystem;
}
