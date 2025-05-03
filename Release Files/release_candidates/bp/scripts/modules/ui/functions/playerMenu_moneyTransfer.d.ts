import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function playerMenu_moneyTransfer(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}): Promise<0 | 1>;
