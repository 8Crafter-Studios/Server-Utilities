/**
 * ExtraFeatures/shop_main.ts
 * @module
 * @description This file contains functions and types related to the shop system..
 */
import { Player, Entity, ItemLockMode, ItemStack, ItemEnchantableComponent, ItemDurabilityComponent } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import "init/classes/config";
/**
 * Main function to handle the shop system settings interface.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to one of the following values:
 * - `-2` if an error occurs.
 * - `0` if the operation is closed.
 * - `1` if the operation is successful.
 *
 * The function displays a menu with options to configure the server shop, player shop, and sign shop settings.
 * It also checks for permissions if ultra security mode is enabled.
 *
 * The menu options are:
 * - Server Shop: Toggles the server shop system settings.
 * - Player Shop: Toggles the player shop system settings.
 * - Sign Shop: Displays a message that the sign shop system does not exist yet.
 * - Back: Returns to the previous menu.
 * - Close: Closes the menu.
 *
 * If an error occurs during the execution, it logs the error and returns `-2`.
 */
export declare function mainShopSystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
export type ShopElement = SellableShopElement | BuyableShopElement;
export type PlayerShopElement = PlayerShopPage | PlayerSavedShopItem | PlayerSellableShopItem | PlayerSellableAdvancedShopItem;
export type PlayerSellableShopElement = PlayerShopPage | PlayerSellableShopItem | PlayerSellableAdvancedShopItem;
export type PlayerBuyableShopElement = PlayerShopPage | PlayerSavedShopItem;
export type SellableShopElement = ShopPage | SellableShopItem;
export type BuyableShopElement = ShopPage | ShopItem;
export type ShopItem = SavedShopItem | NewItemStackShopItem | GiveCommandShopItem;
/**
 * A player shop page.
 */
export type PlayerShopPage = {
    texture?: string;
    pageTitle: string;
    pageBody: string;
    title: string;
    data: PlayerShopElement[];
    type: "player_shop_page";
};
/**
 * A player shop item saved in a structure block.
 */
export type PlayerSavedShopItem = {
    /**
     * The maximum stack size of the item.
     * This is also used as the limit for the remainingStock property
     * and this is the maximum value for the buy amount slider.
     */
    maxStackSize: number;
    remainingStock: number;
    itemDetails: {
        typeId: ItemStack["typeId"];
        nameTag?: ItemStack["nameTag"];
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"];
        enchantments: ReturnType<ItemEnchantableComponent["getEnchantments"]> | "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.";
        maxDurability: ItemDurabilityComponent["maxDurability"];
        damage: ItemDurabilityComponent["damage"];
        keepOnDeath: ItemStack["keepOnDeath"];
        lockMode: ItemStack["lockMode"];
    };
    texture?: string;
    title: string;
    playerID: `${number}`;
    structureID: string;
    entityID: string;
    price: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_saved";
};
/**
 * An item for the sell section of the PlayerShop.
 */
export type PlayerSellableShopItem = {
    amountWanted: number;
    currentAmount: number;
    texture?: string;
    title: string;
    playerID: `${number}`;
    itemID: string;
    value: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_sellable";
    /**
     * @todo
     */
    format_version?: "1.0.0";
};
/**
 * An advanced item for the sell section of the PlayerShop.
 */
export type PlayerSellableAdvancedShopItem = {
    amountWanted: number;
    currentAmount: number;
    texture?: string;
    title: string;
    playerID: `${number}`;
    itemID: string;
    extraRestrictions: {
        /**
         * @todo
         */
        dataValue?: number;
        /**
         * @todo
         */
        minimumDurability?: number;
        /**
         * @todo
         */
        maximumDurability?: number;
        /**
         * @todo
         */
        requiredEnchantmentsMode?: "ignore" | "exact" | "allow_additional";
        /**
         * Enchantments that are required to be on the item.
         *
         * This is ignored when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "ignore".
         * @todo
         */
        requiredEnchantments?: ({
            type: string;
            minLevel: number;
            maxLevel: number;
        } | {
            type: string;
            level: number;
        })[];
        /**
         * Additional enchantments that can be on the item but are actually optional.
         *
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "exact".
         * @todo
         */
        optionalAdditionalEnchantments?: ({
            type: string;
            minLevel: number;
            maxLevel: number;
        } | {
            type: string;
            level: number;
        })[];
        /**
         * Enchantment types that are not allowed to be on the item.
         *
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "allow_additional".
         * @todo
         */
        excludedEnchantmentTypes?: string[];
        /**
         * @todo
         */
        potionEffectType?: string;
        /**
         * @todo
         */
        potionLiquidType?: string;
        /**
         * @todo
         */
        potionModifierType?: string;
        /**
         * @todo
         */
        keepOnDeath?: boolean;
        /**
         * @todo
         */
        lockMode?: ItemLockMode;
        /**
         * @todo
         */
        canPlaceOn?: string[];
        /**
         * @todo
         */
        canDestroy?: string[];
        /**
         * @todo
         */
        dynamicProperties?: [string, string | number | boolean][];
        /**
         * @todo
         */
        nameTag?: string;
        /**
         * @todo
         */
        lore?: string[];
    };
    value: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_sellable_advanced";
    /**
     * @todo
     */
    format_version: "2.0.0";
};
/**
 * A shop page.
 */
export type ShopPage = {
    texture?: string;
    pageTitle: string;
    pageBody: string;
    title: string;
    data: ShopElement[];
    type: "page";
};
/**
 * A shop item saved in a structure block.
 */
export type SavedShopItem = {
    itemDetails: {
        typeId: ItemStack["typeId"] | null;
        nameTag?: ItemStack["nameTag"] | null;
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"] | null;
        enchantments: ReturnType<ItemEnchantableComponent["getEnchantments"]> | "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable." | null;
        maxDurability: ItemDurabilityComponent["maxDurability"] | null;
        damage: ItemDurabilityComponent["damage"] | null;
        keepOnDeath: ItemStack["keepOnDeath"] | null;
        lockMode: ItemStack["lockMode"] | null;
    };
    texture?: string;
    title: string;
    structureID: string;
    entityID: string;
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "pre-made";
};
/**
 * A shop item saved as a list of properties.
 */
export type NewItemStackShopItem = {
    remainingStock?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemName?: string;
    itemLore?: string[];
    keepOnDeath: boolean;
    lockMode: ItemLockMode;
    canPlaceOn?: string[];
    canDestroy?: string[];
    dynamicProperties?: {
        [id: string]: string | number | boolean;
    };
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "newItemStack";
};
/**
 * A shop item saved as a namespaced id and an data value.
 */
export type GiveCommandShopItem = {
    remainingStock?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemData: number;
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "giveCommand";
};
/**
 * An item for the sell section of the ServerShop.
 */
export type SellableShopItem = {
    amountWanted?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemData?: number;
    value: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "sellable";
};
