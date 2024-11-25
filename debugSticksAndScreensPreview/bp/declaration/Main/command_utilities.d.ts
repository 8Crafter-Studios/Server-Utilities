import { Block, BlockInventoryComponent, Container, Dimension, EntityInventoryComponent, ItemStack, Player, Entity, EquipmentSlot, ContainerSlot, EntityEquippableComponent, ItemLockMode, type Enchantment, type DimensionLocation, type Vector3, PlayerCursorInventoryComponent } from "@minecraft/server";
import { type executeCommandPlayerW } from "./commands";
export declare const cmdutilsmetaimport: ImportMeta;
export declare function targetSelector(selector: string, filters: string, UUID: number): number;
export declare function targetSelectorB(selector: string, filters: string, UUID: number): Entity;
export declare function targetSelectorAllListB(selector: string, filters: string, UUID: number): Entity[];
export declare function targetSelectorAllListC(selector: string, filters: string, position: string, sourceEntityCommandExecution?: Entity | Player): Entity[];
export declare function targetSelectorAllListD(selector: string, position: string, dimension?: Dimension): Entity[];
export declare function targetSelectorAllListE(selector: string, position: string): Entity[];
export declare enum fillmodetypeenum {
    "" = "",
    "replace" = "replace",
    "fill" = "fill",
    "clear" = "clear",
    "drain" = "drain",
    "keep" = "durability",
    "walls" = "walls",
    "hollow" = "hollow",
    "outline" = "outline",
    "skygrid" = "skygrid",
    "inverseskygrid" = "inverseskygrid",
    "tunnel" = "tunnel",
    "floor" = "floor",
    "ceilling" = "ceilling",
    "diamond" = "diamond",
    "ovoid" = "ovoid",
    "hollowovoid" = "hollowovoid",
    "sphere" = "sphere",
    "semisphere" = "semisphere",
    "hollowsphere" = "hollowsphere",
    "dome" = "dome",
    "r" = "replace",
    "f" = "fill",
    "clr" = "clear",
    "dr" = "drain",
    "k" = "durability",
    "w" = "walls",
    "h" = "hollow",
    "o" = "outline",
    "sg" = "skygrid",
    "isg" = "inverseskygrid",
    "t" = "tunnel",
    "fl" = "floor",
    "ce" = "ceilling",
    "d" = "diamond",
    "ovd" = "ovoid",
    "hovd" = "hollowovoid",
    "hollowovd" = "hollowovoid",
    "hovoid" = "hollowovoid",
    "s" = "sphere",
    "ss" = "semisphere",
    "hs" = "hollowsphere",
    "dm" = "dome",
    "hsphere" = "hollowsphere",
    "hollows" = "hollowsphere",
    "circle" = "circle",
    "circlex" = "circlex",
    "circley" = "circley",
    "circlez" = "circlez",
    "circlexy" = "circlexy",
    "circleyz" = "circleyz",
    "circlexz" = "circlexz",
    "circlexyz" = "circlexyz",
    "circ" = "circle",
    "circx" = "circlex",
    "circy" = "circly",
    "circz" = "circlez",
    "circxy" = "circlexy",
    "circyz" = "circleyz",
    "circxz" = "circlexz",
    "circxyz" = "circlexyz",
    "c" = "circle",
    "cx" = "circlex",
    "cy" = "circly",
    "cz" = "circlez",
    "cxy" = "circlexy",
    "cyz" = "circleyz",
    "cxz" = "circlexz",
    "cxyz" = "circlexyz",
    "disc" = "circle",
    "discx" = "circlex",
    "discy" = "circly",
    "discz" = "circlez",
    "discxy" = "circlexy",
    "discyz" = "circleyz",
    "discxz" = "circlexz",
    "discxyz" = "circlexyz",
    "cylinder" = "cylinder",
    "cylinderx" = "cylinderx",
    "cylindery" = "cylindery",
    "cylinderz" = "cylinderz",
    "hourglass" = "hourglass",
    "cyl" = "cylinder",
    "cylx" = "cylinderx",
    "cyly" = "cylindery",
    "cylz" = "cylinderz",
    "cl" = "cylinder",
    "clx" = "cylinderx",
    "cly" = "cylindery",
    "clz" = "cylinderz",
    "hrgl" = "hourglass",
    "hrgs" = "hourglass",
    "cube" = "cube",
    "cu" = "cube",
    "cb" = "cube"
}
export declare enum componentTypeEnum {
    "enchantable" = "enchantable",
    "minecraft:enchantable" = "enchantable",
    "durability" = "durability",
    "minecraft:durability" = "durability",
    "damage" = "damage",
    "minecraft:damage" = "damage",
    "cooldown" = "cooldown",
    "minecraft:cooldown" = "cooldown",
    "food" = "food",
    "minecraft:food" = "food"
}
export declare enum enchantableComponentTypeEnum {
    "add" = "addEnchantment",
    "minecraft:add" = "addEnchantment",
    "addEnchantment" = "addEnchantment",
    "minecraft:addEnchantment" = "addEnchantment",
    "addList" = "addEnchantments",
    "minecraft:addList" = "addEnchantments",
    "addEnchantments" = "addEnchantments",
    "minecraft:addEnchantments" = "addEnchantments",
    "remove" = "removeEnchantment",
    "minecraft:remove" = "removeEnchantment",
    "removeEnchantments" = "removeEnchantment",
    "minecraft:removeEnchantments" = "removeEnchantment",
    "clear" = "removeAllEnchantments",
    "minecraft:clear" = "removeAllEnchantments",
    "clearAll" = "removeAllEnchantments",
    "minecraft:clearAll" = "removeAllEnchantments",
    "removeAll" = "removeAllEnchantments",
    "minecraft:removeAll" = "removeAllEnchantments",
    "removeAllEnchantments" = "removeAllEnchantments",
    "minecraft:removeAllEnchantments" = "removeAllEnchantments"
}
export declare enum durabilityComponentTypeEnum {
    "durability" = "durability",
    "minecraft:durability" = "durability",
    "setDurability" = "durability",
    "minecraft:setDurability" = "durability",
    "damage" = "damage",
    "minecraft:damage" = "damage",
    "setDamage" = "damage",
    "minecraft:setDamage" = "damage",
    "repair" = "repair",
    "minecraft:repair" = "repair",
    "setDurabilityToMax" = "setDurabilityToMax",
    "minecraft:setDurabilityToMax" = "setDurabilityToMax"
}
export declare enum propertyTypeEnum {
    "name" = "nameTag",
    "minecraft:name" = "nameTag",
    "nameTag" = "nameTag",
    "minecraft:nameTag" = "nameTag",
    "lore" = "lore",
    "minecraft:lore" = "lore",
    "description" = "lore",
    "minecraft:description" = "lore",
    "count" = "amount",
    "minecraft:count" = "amount",
    "amount" = "amount",
    "minecraft:amount" = "amount",
    "keepOnDeath" = "keepOnDeath",
    "minecraft:keepOnDeath" = "keepOnDeath",
    "keepondeath" = "keepOnDeath",
    "minecraft:keepondeath" = "keepOnDeath",
    "keep_on_death" = "keepOnDeath",
    "minecraft:keep_on_death" = "keepOnDeath",
    "lockMode" = "lockMode",
    "minecraft:lockMode" = "lockMode",
    "lockmode" = "lockMode",
    "minecraft:lockmode" = "lockMode",
    "lock_mode" = "lockMode",
    "minecraft:lock_mode" = "lockMode",
    "itemLockMode" = "lockMode",
    "minecraft:itemLockMode" = "lockMode",
    "itemlockmode" = "lockMode",
    "minecraft:itemlockmode" = "lockMode",
    "item_lock_mode" = "lockMode",
    "minecraft:item_lock_mode" = "lockMode",
    "canPlaceOn" = "canPlaceOn",
    "minecraft:canPlaceOn" = "canPlaceOn",
    "canplaceon" = "canPlaceOn",
    "minecraft:canplaceon" = "canPlaceOn",
    "can_place_on" = "canPlaceOn",
    "minecraft:can_place_on" = "canPlaceOn",
    "canDestroy" = "canDestroy",
    "minecraft:canDestroy" = "canDestroy",
    "candestroy" = "canDestroy",
    "minecraft:candestroy" = "canDestroy",
    "can_destroy" = "canDestroy",
    "minecraft:can_destroy" = "canDestroy",
    "components" = "components",
    "minecraft:components" = "components",
    "dynamicProperties" = "dynamicProperties",
    "minecraft:dynamicProperties" = "dynamicProperties",
    "dynamicproperties" = "dynamicProperties",
    "minecraft:dynamicproperties" = "dynamicProperties",
    "properties" = "dynamicProperties",
    "minecraft:properties" = "dynamicProperties",
    "itemProperties" = "dynamicProperties",
    "minecraft:itemProperties" = "dynamicProperties",
    "itemproperties" = "dynamicProperties",
    "minecraft:itemproperties" = "dynamicProperties",
    "clearAllDynamicProperties" = "clearDynamicProperties",
    "minecraft:clearAllDynamicProperties" = "clearDynamicProperties",
    "clearalldynamicproperties" = "clearDynamicProperties",
    "minecraft:clearalldynamicproperties" = "clearDynamicProperties",
    "clearDynamicProperties" = "clearDynamicProperties",
    "minecraft:clearDynamicProperties" = "clearDynamicProperties",
    "cleardynamicproperties" = "clearDynamicProperties",
    "minecraft:cleardynamicproperties" = "clearDynamicProperties",
    "removeDynamicProperties" = "removeDynamicProperties",
    "minecraft:removeDynamicProperties" = "removeDynamicProperties",
    "removedynamicproperties" = "removedynamicproperties",
    "minecraft:removedynamicproperties" = "removedynamicproperties",
    "removeDynamicProperty" = "removeDynamicProperty",
    "minecraft:removeDynamicProperty" = "removeDynamicProperty",
    "removedynamicproperty" = "removedynamicproperty",
    "minecraft:removedynamicproperty" = "removedynamicproperty"
}
export interface ItemJSONParseInput {
    name?: string;
    "minecraft:name"?: string;
    nameTag?: string;
    "minecraft:nameTag"?: string;
    lore?: string[];
    "minecraft:lore"?: string[];
    description?: string[];
    "minecraft:description"?: string[];
    count?: number;
    "minecraft:count"?: number;
    amount?: number;
    "minecraft:amount"?: number;
    keepOnDeath?: boolean;
    "minecraft:keepOnDeath"?: boolean;
    keepondeath?: boolean;
    "minecraft:keepondeath"?: boolean;
    keep_on_death?: boolean;
    "minecraft:keep_on_death"?: boolean;
    lockMode?: ItemLockMode;
    "minecraft:lockMode"?: ItemLockMode;
    lockmode?: ItemLockMode;
    "minecraft:lockmode"?: ItemLockMode;
    lock_mode?: ItemLockMode;
    "minecraft:lock_mode"?: ItemLockMode;
    itemLockMode?: ItemLockMode;
    "minecraft:itemLockMode"?: ItemLockMode;
    itemlockmode?: ItemLockMode;
    "minecraft:itemlockmode"?: ItemLockMode;
    item_lock_mode?: ItemLockMode;
    "minecraft:item_lock_mode"?: ItemLockMode;
    canPlaceOn?: string[];
    "minecraft:canPlaceOn"?: string[];
    canplaceon?: string[];
    "minecraft:canplaceon"?: string[];
    can_place_on?: string[];
    "minecraft:can_place_on"?: string[];
    canDestroy?: string[];
    "minecraft:canDestroy"?: string[];
    candestroy?: string[];
    "minecraft:candestroy"?: string[];
    can_destroy?: string[];
    "minecraft:can_destroy"?: string[];
    components?: {
        enchantable?: {
            add?: Enchantment | Enchantment[];
            "minecraft:add"?: Enchantment | Enchantment[];
            addEnchantment?: Enchantment | Enchantment[];
            "minecraft:addEnchantment"?: Enchantment | Enchantment[];
            addList?: Enchantment[];
            "minecraft:addList"?: Enchantment[];
            addEnchantments?: Enchantment[];
            "minecraft:addEnchantments"?: Enchantment[];
            remove?: Enchantment;
            "minecraft:remove"?: Enchantment;
            removeEnchantments?: Enchantment;
            "minecraft:removeEnchantments"?: Enchantment;
            clear?: any;
            "minecraft:clear"?: any;
            clearAll?: any;
            "minecraft:clearAll"?: any;
            removeAll?: any;
            "minecraft:removeAll"?: any;
            removeAllEnchantments?: any;
            "minecraft:removeAllEnchantments"?: any;
        };
        "minecraft:enchantable"?: {
            add?: Enchantment | Enchantment[];
            "minecraft:add"?: Enchantment | Enchantment[];
            addEnchantment?: Enchantment | Enchantment[];
            "minecraft:addEnchantment"?: Enchantment | Enchantment[];
            addList?: Enchantment[];
            "minecraft:addList"?: Enchantment[];
            addEnchantments?: Enchantment[];
            "minecraft:addEnchantments"?: Enchantment[];
            remove?: Enchantment;
            "minecraft:remove"?: Enchantment;
            removeEnchantments?: Enchantment;
            "minecraft:removeEnchantments"?: Enchantment;
            clear?: any;
            "minecraft:clear"?: any;
            clearAll?: any;
            "minecraft:clearAll"?: any;
            removeAll?: any;
            "minecraft:removeAll"?: any;
            removeAllEnchantments?: any;
            "minecraft:removeAllEnchantments"?: any;
        };
        durability?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        "minecraft:durability"?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        damage?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        "minecraft:damage"?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        cooldown?: any;
        "minecraft:cooldown"?: any;
        food?: any;
        "minecraft:food"?: any;
    };
    "minecraft:components"?: {
        enchantable?: {
            add?: Enchantment | Enchantment[];
            "minecraft:add"?: Enchantment | Enchantment[];
            addEnchantment?: Enchantment | Enchantment[];
            "minecraft:addEnchantment"?: Enchantment | Enchantment[];
            addList?: Enchantment[];
            "minecraft:addList"?: Enchantment[];
            addEnchantments?: Enchantment[];
            "minecraft:addEnchantments"?: Enchantment[];
            remove?: Enchantment;
            "minecraft:remove"?: Enchantment;
            removeEnchantments?: Enchantment;
            "minecraft:removeEnchantments"?: Enchantment;
            clear?: any;
            "minecraft:clear"?: any;
            clearAll?: any;
            "minecraft:clearAll"?: any;
            removeAll?: any;
            "minecraft:removeAll"?: any;
            removeAllEnchantments?: any;
            "minecraft:removeAllEnchantments"?: any;
        };
        "minecraft:enchantable"?: {
            add?: Enchantment | Enchantment[];
            "minecraft:add"?: Enchantment | Enchantment[];
            addEnchantment?: Enchantment | Enchantment[];
            "minecraft:addEnchantment"?: Enchantment | Enchantment[];
            addList?: Enchantment[];
            "minecraft:addList"?: Enchantment[];
            addEnchantments?: Enchantment[];
            "minecraft:addEnchantments"?: Enchantment[];
            remove?: Enchantment;
            "minecraft:remove"?: Enchantment;
            removeEnchantments?: Enchantment;
            "minecraft:removeEnchantments"?: Enchantment;
            clear?: any;
            "minecraft:clear"?: any;
            clearAll?: any;
            "minecraft:clearAll"?: any;
            removeAll?: any;
            "minecraft:removeAll"?: any;
            removeAllEnchantments?: any;
            "minecraft:removeAllEnchantments"?: any;
        };
        durability?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        "minecraft:durability"?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        damage?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        "minecraft:damage"?: {
            durability?: number;
            "minecraft:durability"?: number;
            setDurability?: number;
            "minecraft:setDurability"?: number;
            damage?: number;
            "minecraft:damage"?: number;
            setDamage?: number;
            "minecraft:setDamage"?: number;
            repair?: number;
            "minecraft:repair"?: number;
            setDurabilityToMax?: any;
            "minecraft:setDurabilityToMax"?: any;
        };
        cooldown?: any;
        "minecraft:cooldown"?: any;
        food?: any;
        "minecraft:food"?: any;
    };
    force?: boolean;
    source?: {
        type?: string;
        targetSelector?: string;
        targetSelectorExecutionLocation?: DimensionLocation;
        targetSelectorSourceEntity?: Entity;
        player?: string;
        entityAtBlock?: DimensionLocation;
        entityType?: string;
        entityTypeId?: string;
        entityId?: string | number;
        block?: DimensionLocation;
        slot?: number;
        id?: string;
        itemId?: string;
        count?: number;
        amount?: number;
    };
    type?: string;
    id?: string;
    itemId?: string;
    new?: [string, number?];
    dynamicProperties?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    dynamicproperties?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    properties?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    itemproperties?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    itemProperties?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    clearAllDynamicProperties?: any;
    clearDynamicProperties?: any;
    clearalldynamicproperties?: any;
    cleardynamicproperties?: any;
    removeDynamicProperties?: string[];
    removedynamicproperties?: string[];
    removeDynamicProperty?: string;
    removedynamicproperty?: string;
    "minecraft:dynamicProperties"?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    "minecraft:dynamicproperties"?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    "minecraft:properties"?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    "minecraft:itemProperties"?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    "minecraft:itemproperties"?: [string, string | number | boolean | Vector3 | undefined][] | Record<string, string | number | boolean | Vector3 | undefined> | {
        [k: string]: string | number | boolean | Vector3 | undefined;
    };
    "minecraft:clearAllDynamicProperties"?: any;
    "minecraft:clearDynamicProperties"?: any;
    "minecraft:clearalldynamicproperties"?: any;
    "minecraft:cleardynamicproperties"?: any;
    "minecraft:removeDynamicProperties"?: string[];
    "minecraft:removedynamicproperties"?: string[];
    "minecraft:removeDynamicProperty"?: string;
    "minecraft:removedynamicproperty"?: string;
}
export declare function itemJSONPropertiesEval(itemJSON: ItemJSONParseInput, StartingItem?: ItemStack | ContainerSlot, player?: Player | executeCommandPlayerW): ItemStack;
export declare function itemJSONPropertiesEvalCT(itemJSON: ItemJSONParseInput, containerSlot?: ContainerSlot, player?: Player | executeCommandPlayerW): ContainerSlot;
export declare function rangeToIntArray(range: [number, number]): number[];
export declare function inventorySwap(player1: Player | executeCommandPlayerW | Entity, player2: Player | executeCommandPlayerW | Entity): void;
export declare function inventorySwapB(player1: Container, player2: Container): void;
export declare function inventorySwapC(player1: Container, player2: Container, player1indices?: [number, number], player2indices?: [number, number]): void;
export declare function clearContainer(container: Container): void;
export declare function fillContainer(container: Container, item: ItemStack): void;
export declare function containerToItemStackArray(container: Container): ItemStack[];
export declare function containerToContainerSlotArray(container: Container): ContainerSlot[];
export declare function equippableToItemStackArray(equippable: EntityEquippableComponent, includeMainhand?: boolean): ItemStack[];
export declare function equippableToContainerSlotArray(equippable: EntityEquippableComponent, includeMainhand?: boolean): ContainerSlot[];
export declare function entityToItemStackArray(entity: Entity, getContainer?: boolean, getEquipment?: boolean): ItemStack[];
export declare function blockToItemStackArray(block: Block): ItemStack[];
export declare function entityToContainerSlotArray(entity: Entity, getContainer?: boolean, getEquipment?: boolean): ContainerSlot[];
export declare function blockToContainerSlotArray(block: Block): ContainerSlot[];
export declare function entityToContainerSlotListObject(entity: Entity, getContainer?: boolean, getEquipment?: boolean): Record<string, ContainerSlot>;
export declare function blockToContainerSlotListObject(block: Block): Record<string, ContainerSlot>;
export declare function entityToContainerSlotArrayB(entity: Entity, getContainer?: boolean, getEquipment?: boolean): {
    inventory: ContainerSlot[];
    equipment: ContainerSlot[];
};
export declare function getPlayerselectedSlotIndex(player: Player | executeCommandPlayerW): ContainerSlot;
export declare function getInventory<T extends Block | Entity | Player>(containerBlockPlayerOrEntity: T): T extends Block ? BlockInventoryComponent : EntityInventoryComponent;
export declare function getEquipment(containerBlockPlayerOrEntity: Entity | executeCommandPlayerW | Player): EntityEquippableComponent;
export declare function getEntityHeldItemSlot(entity: Entity): ContainerSlot;
export declare function getPlayerHeldItemSlot(player: Player | executeCommandPlayerW): ContainerSlot;
export declare const EquipmentSlots: readonly [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Mainhand, EquipmentSlot.Offhand];
export declare const OtherEquipmentSlots: readonly [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Offhand];
export declare const JunkItemTypes: string[];
export declare const OpItemTypes: string[];
export declare const IllegalItemTypes: string[];
export declare function parseSlot(slot: string, selectedSlotIndex?: number): number | EquipmentSlot | "cursor" | "~";
export declare function getSlotFromParsedSlot(slot: "~" | "cursor" | EquipmentSlot | number, options?: {
    container?: Container;
    equipment?: EntityEquippableComponent;
    cursor?: PlayerCursorInventoryComponent;
    selectedSlotIndex?: number;
}): PlayerCursorInventoryComponent | ContainerSlot;
