import type { Entity, ContainerSlot } from "@minecraft/server";
export declare function entityToContainerSlotListObject(entity: Entity, getContainer?: boolean, getEquipment?: boolean): Record<string, ContainerSlot> | undefined;
