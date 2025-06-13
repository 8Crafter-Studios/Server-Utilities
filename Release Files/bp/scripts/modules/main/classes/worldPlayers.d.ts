import type { Dimension, Entity, Block } from "@minecraft/server";
import { ban } from "modules/ban/classes/ban";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export declare class worldPlayers {
    rotx?: number;
    roty?: number;
    dimension?: Dimension;
    entity?: Entity;
    block?: Block;
    static get savedPlayers(): savedPlayer[];
    static get bans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
}
