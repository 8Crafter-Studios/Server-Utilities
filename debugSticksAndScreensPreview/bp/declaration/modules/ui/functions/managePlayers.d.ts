import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function managePlayers(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}): Promise<0 | 1>;
