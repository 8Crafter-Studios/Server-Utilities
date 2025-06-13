import type { Entity, ContainerSlot } from "@minecraft/server";
export declare function entityToContainerSlotArrayB(entity: Entity, getContainer?: boolean, getEquipment?: boolean): {
    inventory: ContainerSlot[];
    equipment: ContainerSlot[];
} | undefined;
