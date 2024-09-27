import { Player, world, Entity, ItemLockMode } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "Main/commands";
import { forceShow, worldBorderSettingsDimensionSelector, settings, extraFeaturesSettings } from "Main/ui";
import { serverShopSystemSettings } from "./server_shop";
import { config } from "Main";
import { showMessage } from "Main/utilities";

export function mainShopSystemSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    form.title("Shop Sytem Settings");
    form.button("Server Shop\n"+(config.shopSystem.server.enabled?"§aEnabled":"§cDisabled"), "textures/ui/servers");
    form.button("§cPlayer Shop\n"+(config.shopSystem.player.enabled?"§aEnabled":"§cDisabled"), "textures/ui/icon_multiplayer");
    form.button("§cSign Shop\n"+(config.shopSystem.sign.enabled?"§aEnabled":"§cDisabled"), "textures/ui/icon_sign");
    form.button("Back", "textures/ui/arrow_left");
    forceShow(form, (sourceEntity as Player)).then(r => {
        if (r.canceled) return;

        let response = r.selection;
        switch (response) {
            case 0:
                serverShopSystemSettings(sourceEntity)
            break;
            case 1:
                showMessage(sourceEntity as Player, undefined, "§cSorry, the player shop system does not exist yet.", "Back", "Close").then(r=>{
                    if(r.selection==0){
                        mainShopSystemSettings(sourceEntity)
                    }
                })
                // playerShopSystemSettings(sourceEntity)
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
export type SellableShopElement = ShopPage|SellableShopItem
export type BuyableShopElement = ShopPage|ShopItem
export type ShopItem = SavedShopItem|NewItemStackShopItem|GiveCommandShopItem

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
    sellLimit?: number
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