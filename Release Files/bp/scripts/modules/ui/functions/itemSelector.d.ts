import { Entity, Player, EquipmentSlot, ContainerSlot } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function itemSelector<FuncType extends (...args: any) => FuncReturnType, FuncReturnType extends any>(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, backFunction?: FuncType, ...functionargs: any): Promise<{
    slot: number | EquipmentSlot;
    item: ContainerSlot;
}>;
