import { ItemStack, ContainerSlot, Player, ItemLockMode, EnchantmentTypes } from "@minecraft/server";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
import { targetSelectorAllListD } from "modules/command_utilities/functions/targetSelectorAllListD";
import { getEntityById } from "modules/commands/functions/getEntityById";
import { getPlayer } from "init/functions/getPlayer";
import { componentTypeEnum } from "../enums/componentTypeEnum";
import { durabilityComponentTypeEnum } from "../enums/durabilityComponentTypeEnum";
import { enchantableComponentTypeEnum } from "../enums/enchantableComponentTypeEnum";
import { propertyTypeEnum } from "../enums/propertyTypeEnum";
export function itemJSONPropertiesEval(itemJSON, StartingItem, player) {
    /*
    let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/
    let ij = itemJSON;
    ij.force ??= false;
    let sp = player;
    let item = !!ij.new
        ? new ItemStack(ij.new[0], ij.new[1])
        : (!!StartingItem
            ? StartingItem instanceof ContainerSlot
                ? StartingItem.getItem()
                : StartingItem instanceof ItemStack
                    ? StartingItem
                    : undefined
            : undefined) ??
            (!!ij.source
                ? ij.source.type == "slot"
                    ? (!!ij.source.targetSelector
                        ? (!!ij.source.targetSelectorExecutionLocation
                            ? targetSelectorAllListD(ij.source.targetSelector, ij.source.targetSelectorExecutionLocation
                                .x +
                                " " +
                                ij.source
                                    .targetSelectorExecutionLocation.y +
                                " " +
                                ij.source
                                    .targetSelectorExecutionLocation.z, ij.source.targetSelectorExecutionLocation
                                .dimension)[0]
                            : targetSelectorAllListC(ij.source.targetSelector, "", ij.source.targetSelectorSourceEntity
                                .location.x +
                                " " +
                                ij.source.targetSelectorSourceEntity
                                    .location.y +
                                " " +
                                ij.source.targetSelectorSourceEntity
                                    .location.z, ij.source.targetSelectorSourceEntity)[0])?.getComponent?.("inventory")
                        : !!ij.source.entityId
                            ? getEntityById(ij.source.entityId)?.getComponent?.("inventory")
                            : !!ij.source.player
                                ? getPlayer(ij.source.player)?.getComponent?.("inventory")
                                : !!ij.source.entityAtBlock
                                    ? ij.source.entityAtBlock.dimension
                                        .getEntitiesAtBlockLocation(ij.source.entityAtBlock)
                                        .find((v) => v.typeId ==
                                        (ij.source.entityTypeId ??
                                            ij.source.entityType))
                                        ?.getComponent?.("inventory")
                                    : !!ij.source.block
                                        ? ij.source.block.dimension
                                            .getBlock(ij.source.block)
                                            ?.getComponent?.("inventory")
                                        : sp?.getComponent?.("inventory"))?.container?.getItem(ij.source.slot ?? 0)
                    : new ItemStack(ij.source.id, ij.source.count ?? ij.source.amount)
                : new ItemStack(ij?.id ?? ij?.type ?? ij?.itemId, ij?.count ?? ij?.amount)); /*
if(!!ij.new){item=new ItemStack(ij.new[0], ij.new[1])}*/
    const itemPropertyEnum = {
        components: (property) => Object.entries(property[1]).forEach((vb) => itemComponentEnum[componentTypeEnum[vb[0]]](vb)),
        nameTag: (property) => property[1] !== item.nameTag || ij.force
            ? (item.nameTag = property[1])
            : false,
        lore: (property) => property[1] !== item.getLore() || ij.force
            ? item.setLore(property[1])
            : false,
        amount: (property) => property[1] != item.amount || ij.force
            ? (item.amount = property[1])
            : false,
        keepOnDeath: (property) => property[1] != item.keepOnDeath || ij.force
            ? (item.keepOnDeath = property[1])
            : false,
        lockMode: (property) => property[1] != item.lockMode || ij.force
            ? (item.lockMode = property[1])
            : false,
        canPlaceOn: (property) => property[1] !== item.getCanPlaceOn() || ij.force
            ? item.setCanPlaceOn(property[1])
            : false,
        canDestroy: (property) => property[1] !== item.getCanDestroy() || ij.force
            ? item.setCanDestroy(property[1])
            : false,
        dynamicProperties: (property) => property[1] instanceof Array
            ? property[1].forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
            : Object.entries(property[1]).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
        clearDynamicProperties: (property) => item.clearDynamicProperties(),
        removeDynamicProperties: (property) => property[1].forEach((v) => item.setDynamicProperty(v)),
        removeDynamicProperty: (property) => item.setDynamicProperty(property[1]),
    };
    const itemComponentEnum = {
        enchantable: (property) => Object.entries(property[1]).forEach((vc) => itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0]]](vc)),
        durability: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage =
                item.getComponent("durability").maxDurability -
                    property[1])
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])),
        damage: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage = property[1])
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)),
        food: (property) => { },
        cooldown: (property) => { },
    };
    const itemEnchantableComponentEnum = {
        addEnchantment: (property) => property[1] instanceof Array
            ? item.getComponent("enchantable").addEnchantments(property[1].map((v) => ({
                level: v.level,
                type: EnchantmentTypes.get(v.type),
            })))
            : item.getComponent("enchantable").addEnchantment({
                level: property[1].level,
                type: EnchantmentTypes.get(property[1].type),
            }),
        addEnchantments: (property) => item.getComponent("enchantable").addEnchantments(property[1].map((v) => ({
            level: v.level,
            type: EnchantmentTypes.get(v.type),
        }))),
        removeEnchantment: (property) => property[1] instanceof Array
            ? property[1].forEach((v) => item.getComponent("enchantable").removeEnchantment(v))
            : item
                .getComponent("enchantable")
                .removeEnchantment(property[1]),
        removeAllEnchantments: (property) => item.getComponent("enchantable").removeAllEnchantments(),
    };
    const itemDurabilityComponentEnum = {
        durability: (property) => (item.getComponent("durability").damage =
            item.getComponent("durability").maxDurability - property[1]),
        damage: (property) => (item.getComponent("durability").damage = property[1]),
        repair: (property) => typeof property[1] == "number"
            ? (item.getComponent("durability").damage = Math.max(0, item.getComponent("durability").damage - property[1]))
            : (item.getComponent("durability").damage = 0),
        setDurabilityToMax: (property) => (item.getComponent("durability").damage = 0),
    };
    Object.entries(ij)
        .filter((v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0]))
        .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
    return item;
    /*

    ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}
//# sourceMappingURL=itemJSONPropertiesEval.js.map