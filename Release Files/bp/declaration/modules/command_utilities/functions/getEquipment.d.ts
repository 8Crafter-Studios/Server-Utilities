import type { Entity, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function getEquipment(containerBlockPlayerOrEntity: Entity | executeCommandPlayerW | Player): import("@minecraft/server").EntityEquippableComponent;
