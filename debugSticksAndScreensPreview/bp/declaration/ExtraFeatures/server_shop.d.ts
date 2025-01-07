import { Player, Entity } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { type SellableShopElement, type BuyableShopElement, type ShopItem, type SellableShopItem, type ShopPage } from "./shop_main";
/**
 * @see {@link playerShopConfig}
 */
export type serverShopConfig = {
    /**
     * The id of the server shop.
     */
    id: `shop:${string}`;
    /**
     * The display name of the server shop. This is displayed on the button for the server shop in the manage server shops menu.
     */
    name?: string | null;
    /**
     * The title of the server shop. This is the title displayed at the top of the UI for the server shop.
     */
    title?: string | null;
    /**
     * The body text that is displayed on the main page of the server shop.
     */
    mainPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main buy page of the server shop.
     * @todo
     */
    mainBuyPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main sell page of the server shop.
     * @todo
     */
    mainSellPageBodyText?: string | null;
    /**
     * Whether or not players can sell items in this shop.
     */
    sellShop?: boolean | null;
    /**
     * Whether or not players can buy items in this shop.
     */
    buyShop?: boolean | null;
    /**
     * Whether or not this shop can be accessed by any player through the use of the \viewservershops command.
     */
    publicShop?: boolean | null;
};
/**
 * @todo Convert the functions to async functions that return Promise<0|1>.
 * @see {@link PlayerShop}
 */
export declare class ServerShop {
    /**
     * The id of the server shop.
     */
    id: `shop:${string}`;
    /**
     * The display name of the server shop. This is displayed on the button for the server shop in the manage server shops menu.
     */
    name?: string | null;
    /**
     * The title of the server shop. This is the title displayed at the top of the UI for the server shop.
     */
    title?: string | null;
    /**
     * The body text that is displayed on the main page of the server shop.
     */
    mainPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main buy page of the server shop.
     * @todo
     */
    mainBuyPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main sell page of the server shop.
     * @todo
     */
    mainSellPageBodyText?: string | null;
    /**
     * Whether or not players can sell items in this shop.
     */
    sellShop: boolean;
    /**
     * Whether or not players can buy items in this shop.
     */
    buyShop: boolean;
    /**
     * Whether or not this shop can be accessed by any player through the use of the \viewservershops command.
     */
    publicShop: boolean;
    constructor(config: serverShopConfig);
    save(): void;
    /**
     * Opens the shop UI for the specified player.
     * @see {@link PlayerShop.openShop}
     * @async
     * @param player The player to open the shop UI for.
     * @param mode The mode to open this shop in.
     * @returns {Promise<0|1>} A promise that will resolve with either a 0 or a 1, a 0 meaning that the previous UI should not be re-opened, and a 1 meaning that it should.
     */
    openShop(player: Player, mode?: "buy" | "sell" | "both" | "none", showBackButton?: boolean): Promise<0 | 1>;
    /**
     * Opens the shop UI for the specified player.
     * @see {@link PlayerShop.openShopPage}
     * @async
     * @param player The player to open the shop UI for.
     * @param data The object representing this page of the shop.
     * @param path The path to this page of the shop.
     * @returns {Promise<0|1>} A promise that will resolve with either a 0 or a 1, a 0 meaning that the previous UI should not be re-opened, and a 1 meaning that it should.
     */
    openShopPage<mode extends "buy" | "sell">(player: Player, data: (mode extends "buy" ? BuyableShopElement[] : SellableShopElement[]), path: [mode, ...string[]]): Promise<0 | 1>;
    editShopElements<T extends "buy" | "sell">(mode: T, data: (T extends "buy" ? BuyableShopElement : SellableShopElement)[]): void;
    get buyData(): BuyableShopElement[];
    set buyData(data: BuyableShopElement[]);
    get sellData(): SellableShopElement[];
    set sellData(data: SellableShopElement[]);
    static get(shopID: string): ServerShop;
    static getAll(): ServerShop[];
    static getIds(): string[];
    /**
     * @see {@link PlayerShop.buyItem}
     * @async
     * @param player
     * @param item
     * @returns
     */
    buyItem(player: Player, item: ShopItem): Promise<0 | 1>;
    /**
     * @todo Make return type be Promise<0|1>.
     * @todo Copy over the menu for the item information from the player shop system.
     * @todo Copy over the updated code from the player shop system.
     * @see {@link PlayerShop.sellItem}
     * @async
     * @param player
     * @param item
     * @returns
     */
    sellItem(player: Player, item: SellableShopItem): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @see {@link PlayerShop.openPublicShopsSelector}
     * @param sourceEntitya
     */
    static openPublicShopsSelector(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
}
export declare class LinkedServerShopCommands {
    static get LinkedCommands(): [string, `shop:${string}`][];
    static set LinkedCommands(LinkedCommands: [string, `shop:${string}`][]);
    static addLinkedCommand(LinkedCommand: [string, `shop:${string}`]): void;
    static addLinkedCommands(LinkedCommands: [string, `shop:${string}`][]): void;
    static removeCommandLinkedToShop(shopID: `shop:${string}`): void;
    static removeCommandsLinkedToShops(shopIDs: `shop:${string}`[]): void;
    static removeCommand(command: string): void;
    static removeCommands(commands: string[]): void;
    static getIndexOfShopID(shopID: `shop:${string}`): number;
    static relinkShopIDCommand(shopID: `shop:${string}`, newCommand: string): void;
    static testShopHasLinkedCommand(shopID: `shop:${string}`): boolean;
    static testCommandIsLinked(commandString: string): boolean;
    static openShopForCommand(commandString: string, player: Player): void;
}
/**
 * @todo Convert the functions to async functions that return Promise<0|1>.
 * @see {@link PlayerShopManager}
 */
export declare class ServerShopManager {
    /**
     *
     * @see {@link PlayerShopManager.playerShopItemTextureHints}
     */
    static serverShopItemTextureHints: string[];
    /**
     *
     * @see {@link PlayerShopManager.playerShopPageTextureHints}
     */
    static serverShopPageTextureHints: string[];
    /**
     *
     * @see {@link PlayerShopManager.playerShopItemTextureHint}
     */
    static get serverShopItemTextureHint(): string;
    /**
     *
     * @see {@link PlayerShopManager.playerShopPageTextureHint}
     */
    static get serverShopPageTextureHint(): string;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.playerShopSystemSettings}.
     * @see {@link PlayerShopManager.playerShopSystemSettings}
     * @param sourceEntitya
     */
    static serverShopSystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.playerShopSystemSettings_main}.
     * @see {@link PlayerShopManager.playerShopSystemSettings_main}
     * @param sourceEntitya
     */
    static serverShopSystemSettings_main(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShops}.
     * @param sourceEntitya
     */
    static manageServerShops(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.addPlayerShop}.
     * @param sourceEntitya
     */
    static addServerShop(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop}.
     * @param sourceEntitya
     * @param shop
     */
    static manageServerShop(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_settings}.
     * @param sourceEntitya
     * @param shop
     */
    static manageServerShop_settings(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @param sourceEntitya
     * @param shop
     */
    static manageServerShop_editLinkedCommand(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @param sourceEntitya
     * @param shop
     * @returns
     */
    static manageServerShop_addLinkedCommand(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_contents}.
     * @param sourceEntitya
     * @param shop
     * @param mode
     */
    static manageServerShop_contents(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, mode?: "buy" | "sell"): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_manageItem}.
     * @param sourceEntitya
     * @param shop
     * @param item
     * @param itemIndex
     * @param mode
     * @returns
     */
    static manageServerShop_manageItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number, mode: mode): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_editItem}.
     * @param sourceEntitya
     * @param shop
     * @param item
     * @param itemIndex
     * @param mode
     * @returns
     */
    static manageServerShop_editItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number, mode: mode): Promise<1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_addItem}.
     * @param sourceEntitya
     * @param shop
     * @param type
     * @param mode
     * @returns
     */
    static manageServerShop_addItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, type: "pre-made" | "pre-made_manual" | "newItemStack" | "giveCommand" | "sellable", mode: mode): Promise<1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_managePage}.
     * @param sourceEntitya
     * @param shop
     * @param page
     * @param pageIndex
     * @param mode
     * @returns
     */
    static manageServerShop_managePage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, page: ShopPage, pageIndex: number, mode: mode): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_editPage}.
     * @param sourceEntitya
     * @param shop
     * @param page
     * @param pageIndex
     * @param mode
     * @returns
     */
    static manageServerShop_editPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, page: ShopPage, pageIndex: number, mode: mode): Promise<1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_addPage}.
     * @param sourceEntitya
     * @param shop
     * @param mode
     * @returns
     */
    static manageServerShop_addPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, mode: mode): Promise<1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_contents}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @returns
     */
    static manageServerShopPage_contents<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]]): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_manageItem}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @param item
     * @param itemIndex
     * @returns
     */
    static manageServerShopPage_manageItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]], item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number): any;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_editItem}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @param item
     * @param itemIndex
     * @returns
     */
    static manageServerShopPage_editItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]], item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number): Promise<0 | 1>;
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_addItem}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @param type
     * @returns
     */
    static manageServerShopPage_addItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]], type: "pre-made" | "pre-made_manual" | "newItemStack" | "giveCommand" | "sellable"): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_managePage}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @param page
     * @param pageIndex
     * @returns
     */
    static manageServerShopPage_managePage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]], page: ShopPage, pageIndex: number): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_editPage}.
     * @param sourceEntitya
     * @param shop
     * @param path
     * @param page
     * @param pageIndex
     * @returns
     */
    static manageServerShopPage_editPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]], page: ShopPage, pageIndex: number): Promise<0 | 1>;
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_addPage}.
     * @param sourceEntitya The player to open the UI for
     * @param shop The shop to add the page to
     * @param path The path in the shop's data that the page will be added to
     * @returns
     */
    static manageServerShopPage_addPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: ServerShop, path: [mode, ...string[]]): Promise<0 | 1>;
}
