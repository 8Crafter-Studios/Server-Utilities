import type { Entity, Player, EquipmentSlot, ContainerSlot } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function itemEditorTypeSelection(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayer: Entity | Player, item: {
    slot: number | EquipmentSlot;
    item: ContainerSlot;
}, selectionItems?: {
    edit?: {
        f: Function;
        a?: any[];
    };
    editCode?: {
        f: Function;
        a?: any[];
    };
    editDynamicProperties?: {
        f: Function;
        a?: any[];
    };
    editEnchantments?: {
        f: Function;
        a?: any[];
    };
    newItem?: {
        f: Function;
        a?: any[];
    };
    transfer?: {
        f: Function;
        a?: any[];
    };
    clone?: {
        f: Function;
        a?: any[];
    };
    delete?: {
        f: Function;
        a?: any[];
    };
}, backFunction?: Function, ...functionargs: any): Promise<any>;
