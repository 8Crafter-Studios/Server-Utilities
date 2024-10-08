import { Player, world, Entity, ItemLockMode, ItemStack, ItemEnchantableComponent, ItemDurabilityComponent, ItemCooldownComponent, type Enchantment, PotionEffectType } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "Main/commands";
import { forceShow, worldBorderSettingsDimensionSelector, settings, extraFeaturesSettings } from "Main/ui";
import { config } from "Main";
import { showMessage } from "Main/utilities";
import { ServerShopManager } from "./server_shop";
import { PlayerShopManager } from "./player_shop";

export function mainShopSystemSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    form.title("Shop Sytem Settings");
    form.button("Server Shop\n"+(config.shopSystem.server.enabled?"§aEnabled":"§cDisabled"), "textures/ui/servers");
    form.button("Player Shop\n"+(config.shopSystem.player.enabled?"§aEnabled":"§cDisabled"), "textures/ui/icon_multiplayer");
    form.button("§cSign Shop\n"+(config.shopSystem.sign.enabled?"§aEnabled":"§cDisabled"), "textures/ui/icon_sign");
    form.button("Back", "textures/ui/arrow_left");
    forceShow(form, (sourceEntity as Player)).then(async r => {
        if (r.canceled) return;

        let response = r.selection;
        switch (response) {
            case 0:
                if((await ServerShopManager.serverShopSystemSettings(sourceEntity))==1){
                    mainShopSystemSettings(sourceEntity)
                }
            break;
            case 1:
                if((await PlayerShopManager.playerShopSystemSettings(sourceEntity))==1){
                    mainShopSystemSettings(sourceEntity)
                }
            break;
            case 2:
                showMessage(sourceEntity as Player, undefined, "§cSorry, the sign shop system does not exist yet.", "Back", "Close").then(r=>{
                    if(r.selection==0){
                        mainShopSystemSettings(sourceEntity)
                    }
                })
                // signShopSystemSettings(sourceEntity)
            break;
            case 3:
                extraFeaturesSettings(sourceEntity)
            break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}

export type ShopElement = SellableShopElement|BuyableShopElement
export type PlayerShopElement = PlayerShopPage|PlayerSavedShopItem|PlayerSellableShopItem|PlayerSellableAdvancedShopItem
export type PlayerSellableShopElement = PlayerShopPage|PlayerSellableShopItem|PlayerSellableAdvancedShopItem
export type PlayerBuyableShopElement = PlayerShopPage|PlayerSavedShopItem
export type SellableShopElement = ShopPage|SellableShopItem
export type BuyableShopElement = ShopPage|ShopItem
export type ShopItem = SavedShopItem|NewItemStackShopItem|GiveCommandShopItem

/**
 * A player shop page.
 */
export type PlayerShopPage = {
    texture?: string
    pageTitle: string
    pageBody: string
    title: string
    data: PlayerShopElement[]
    type: "player_shop_page"
}
/**
 * A player shop item saved in a structure block.
 */
export type PlayerSavedShopItem = {
    /**
     * The maximum stack size of the item.
     * This is also used as the limit for the remainingStock property
     * and this is the maximum value for the buy amount slider.
     */
    maxStackSize: number
    remainingStock: number
    itemDetails: {
        typeId: ItemStack["typeId"]
        nameTag?: ItemStack["nameTag"]
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"]/*
        canDestroyLength: ReturnType<ItemStack["getCanDestroy"]>["length"]
        canPlaceOnLength: ReturnType<ItemStack["getCanPlaceOn"]>["length"]*/
        enchantments: ReturnType<ItemEnchantableComponent["getEnchantments"]>|"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
        maxDurability: ItemDurabilityComponent["maxDurability"]
        damage: ItemDurabilityComponent["damage"]
        keepOnDeath: ItemStack["keepOnDeath"]
        lockMode: ItemStack["lockMode"]
    }
    texture?: string
    title: string
    playerID: `${number}`
    structureID: string
    entityID: string
    price: number
    step: number
    type: "player_shop_item"
    itemType: "player_shop_saved"
}
/**
 * An item for the sell section of the PlayerShop.
 */
export type PlayerSellableShopItem = {
    amountWanted: number
    currentAmount: number
    texture?: string
    title: string
    playerID: `${number}`
    itemID: string
    value: number
    step: number
    type: "player_shop_item"
    itemType: "player_shop_sellable"
    /**
     * @todo
     */
    format_version?: "1.0.0"
}
/**
 * An advanced item for the sell section of the PlayerShop.
 */
export type PlayerSellableAdvancedShopItem = {
    amountWanted: number
    currentAmount: number
    texture?: string
    title: string
    playerID: `${number}`
    itemID: string
    extraRestrictions: {
        /**
         * @todo
         */
        dataValue?: number
        /**
         * @todo
         */
        minimumDurability?: number
        /**
         * @todo
         */
        maximumDurability?: number
        /**
         * @todo
         */
        requiredEnchantmentsMode?: "ignore"|"exact"|"allow_additional"
        /**
         * Enchantments that are required to be on the item.
         * 
         * This is ignored when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "ignore".
         * @todo
         */
        requiredEnchantments?: ({type: string, minLevel: number, maxLevel: number}|{type: string, level: number})[]
        /**
         * Additional enchantments that can be on the item but are actually optional.
         * 
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "exact".
         * @todo
         */
        optionalAdditionalEnchantments?: ({type: string, minLevel: number, maxLevel: number}|{type: string, level: number})[]
        /**
         * Enchantment types that are not allowed to be on the item.
         * 
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "allow_additional".
         * @todo
         */
        excludedEnchantmentTypes?: string[]
        /**
         * @todo
         */
        potionEffectType?: string
        /**
         * @todo
         */
        potionLiquidType?: string
        /**
         * @todo
         */
        potionModifierType?: string
        /**
         * @todo
         */
        keepOnDeath?: boolean
        /**
         * @todo
         */
        lockMode?: ItemLockMode
        /**
         * @todo
         */
        canPlaceOn?: string[]
        /**
         * @todo
         */
        canDestroy?: string[]
        /**
         * @todo
         */
        dynamicProperties?: [string, string|number|boolean][]
        /**
         * @todo
         */
        nameTag?: string
        /**
         * @todo
         */
        lore?: string[]
    }
    value: number
    step: number
    type: "player_shop_item"
    itemType: "player_shop_sellable_advanced"
    /**
     * @todo
     */
    format_version: "2.0.0"
}
/**
 * A shop page. 
 */
export type ShopPage = {
    texture?: string
    pageTitle: string
    pageBody: string
    title: string
    data: ShopElement[]
    type: "page"
}
/**
 * A shop item saved in a structure block. 
 */
export type SavedShopItem = {
    itemDetails: {
        typeId: ItemStack["typeId"]
        nameTag?: ItemStack["nameTag"]
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"]/*
        canDestroyLength: ReturnType<ItemStack["getCanDestroy"]>["length"]
        canPlaceOnLength: ReturnType<ItemStack["getCanPlaceOn"]>["length"]*/
        enchantments: ReturnType<ItemEnchantableComponent["getEnchantments"]>|"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
        maxDurability: ItemDurabilityComponent["maxDurability"]
        damage: ItemDurabilityComponent["damage"]
        keepOnDeath: ItemStack["keepOnDeath"]
        lockMode: ItemStack["lockMode"]
    }
    texture?: string
    title: string
    structureID: string
    entityID: string
    price: number
    step?: number
    max?: number
    type: "item"
    itemType: "pre-made"
}
/**
 * A shop item saved as a list of properties. 
 */
export type NewItemStackShopItem = {
    remainingStock?: number
    texture?: string
    title: string
    itemID: string
    itemName?: string
    itemLore?: string[]
    keepOnDeath: boolean
    lockMode: ItemLockMode
    canPlaceOn?: string[]
    canDestroy?: string[]
    dynamicProperties?: {[id: string]: string|number|boolean}
    price: number
    step?: number
    max?: number
    type: "item"
    itemType: "newItemStack"
}
/**
 * A shop item saved as a namespaced id and an data value. 
 */
export type GiveCommandShopItem = {
    remainingStock?: number
    texture?: string
    title: string
    itemID: string
    itemData: number
    price: number
    step?: number
    max?: number
    type: "item"
    itemType: "giveCommand"
}
/**
 * An item for the sell section of the ServerShop. 
 */
export type SellableShopItem = {
    amountWanted?: number
    texture?: string
    title: string
    itemID: string
    itemData?: number
    value: number
    step?: number
    max?: number
    type: "item"
    itemType: "sellable"
}