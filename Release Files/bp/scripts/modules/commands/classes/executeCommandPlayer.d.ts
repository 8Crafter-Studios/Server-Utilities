import { Player } from "@minecraft/server";
import { executeCommandPlayerW } from "./executeCommandPlayerW";
/**
 * Represents a player for the `\execute` command.
 */
export declare class executeCommandPlayer extends executeCommandPlayerW implements Pick<Player, "id" | "name"> {
    get id(): string;
    get name(): string;
}
