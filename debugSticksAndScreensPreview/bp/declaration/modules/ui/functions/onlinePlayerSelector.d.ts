import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function onlinePlayerSelector(sourceEntitya: Entity | executeCommandPlayerW | Player, backFunction?: Function, ...functionargs: any): Promise<Player | undefined>;
