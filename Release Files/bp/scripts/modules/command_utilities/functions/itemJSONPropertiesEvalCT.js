import { ContainerSlot, Player, ItemStack, ItemLockMode, EnchantmentTypes } from "@minecraft/server";
import { componentTypeEnum } from "../enums/componentTypeEnum";
import { durabilityComponentTypeEnum } from "../enums/durabilityComponentTypeEnum";
import { enchantableComponentTypeEnum } from "../enums/enchantableComponentTypeEnum";
import { propertyTypeEnum } from "../enums/propertyTypeEnum";
export function itemJSONPropertiesEvalCT(itemJSON, containerSlot, player) {
    /*
    let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/
    let ij = itemJSON;
    ij.force ??= false;
    let sp = player;
    let item = containerSlot;
    if (!!ij.new) {
        item.setItem(new ItemStack(ij.new[0], ij.new[1]));
    }
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
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage =
                    itemb.getComponent("durability").maxDurability -
                        property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])),
        damage: (property) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)),
        food: (property) => { },
        cooldown: (property) => { },
    };
    const itemEnchantableComponentEnum = {
        addEnchantment: (property) => property[1] instanceof Array
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").addEnchantments(property[1].map((v) => ({
                    level: v.level,
                    type: EnchantmentTypes.get(v.type),
                })));
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").addEnchantment({
                    level: property[1].level,
                    type: EnchantmentTypes.get(property[1].type),
                });
                item.setItem(itemb);
            })(),
        addEnchantments: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").addEnchantments(property[1].map((v) => ({
                level: v.level,
                type: EnchantmentTypes.get(v.type),
            })));
            item.setItem(itemb);
        })(),
        removeEnchantment: (property) => property[1] instanceof Array
            ? property[1].forEach((v) => (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .removeEnchantment(v);
                item.setItem(itemb);
            })())
            : (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .removeEnchantment(property[1]);
                item.setItem(itemb);
            })(),
        removeAllEnchantments: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").removeAllEnchantments();
            item.setItem(itemb);
        })(),
    };
    const itemDurabilityComponentEnum = {
        durability: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage =
                itemb.getComponent("durability").maxDurability -
                    property[1];
            item.setItem(itemb);
        })(),
        damage: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = property[1];
            item.setItem(itemb);
        })(),
        repair: (property) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = Math.max(0, itemb.getComponent("durability").damage - property[1]);
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = 0;
                item.setItem(itemb);
            })(),
        setDurabilityToMax: (property) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = 0;
            item.setItem(itemb);
        })(),
    };
    Object.entries(ij)
        .filter((v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0]))
        .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
    return item;
    /*

    ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}
//# sourceMappingURL=itemJSONPropertiesEvalCT.js.map