import { Entity, Player, ContainerSlot } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function itemEditor(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, item: ContainerSlot): Promise<any>;
