/**
 * ExtraFeatures/player_shop.ts
 * @module
 * @description This file contains functions and types related to the player shop system.
 */
import { Player, Entity } from "@minecraft/server";
import "init/classes/config";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { type PlayerShopPage, type PlayerSavedShopItem, type PlayerSellableShopElement, type PlayerBuyableShopElement, type PlayerSellableShopItem, type PlayerSellableAdvancedShopItem } from "./shop_main";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 *
 * @see {@link serverShopConfig}
 */
export interface playerShopConfig {
    /**
     * The id of the player shop.
     */
    id: `playerShop:${number}:${string}`;
    /**
     * The display name of the player shop. This is displayed on the button for the player shop in the manage player shops menu.
     */
    name?: string | null;
    /**
     * The title of the player shop. This is the title displayed at the top of the UI for the player shop.
     */
    title?: string | null;
    /**
     * The body text that is displayed on the main page of the player shop.
     */
    mainPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main buy page of the server shop.
     */
    mainBuyPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main sell page of the server shop.
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
     * Whether or not this shop can be accessed by any player through the use of the \viewplayershops command.
     */
    publicShop?: boolean | null;
    /**
     * The ID of the player who owns this player shop.
     */
    playerID: `${number}`;
    /**
     * The name of the player who owns this player shop.
     */
    playerName?: string;
}
/**
 *
 * @see {@link ServerShop}
 */
export declare class PlayerShop {
    /**
     * The id of the player shop.
     */
    id: `playerShop:${number}:${string}`;
    /**
     * The display name of the player shop. This is displayed on the button for the player shop in the manage player shops menu.
     */
    name?: string | null;
    /**
     * The title of the player shop. This is the title displayed at the top of the UI for the player shop.
     */
    title?: string | null;
    /**
     * The body text that is displayed on the main page of the player shop.
     */
    mainPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main buy page of the server shop.
     */
    mainBuyPageBodyText?: string | null;
    /**
     * The body text that is displayed on the main sell page of the server shop.
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
     * Whether or not this shop can be accessed by any player through the use of the \viewplayershops command.
     */
    publicShop: boolean;
    /**
     * The ID of the player who owns this player shop.
     */
    playerID: `${number}`;
    /**
     * The name of the player who owns this player shop.
     */
    playerName?: string | null;
    constructor(config: playerShopConfig);
    save(): void;
    openShop(player: Player, mode?: "buy" | "sell" | "both" | "none", showBackButton?: boolean): Promise<0 | 1>;
    openShopPage<mode extends "buy" | "sell">(player: Player, data: mode extends "buy" ? PlayerBuyableShopElement[] : PlayerSellableShopElement[], path: [mode, ...string[]]): Promise<0 | 1>;
    editShopElements<T extends "buy" | "sell">(mode: T, data: (T extends "buy" ? PlayerBuyableShopElement : PlayerSellableShopElement)[]): void;
    get buyData(): PlayerBuyableShopElement[];
    set buyData(data: PlayerBuyableShopElement[]);
    get sellData(): PlayerSellableShopElement[];
    set sellData(data: PlayerSellableShopElement[]);
    static get(shopID: string): PlayerShop | undefined;
    static getAll(): PlayerShop[];
    static getIds(): string[];
    static getIdsForPlayer(playerID: `${number}`): string[];
    static getAllForPlayer(playerID: `${number}`): PlayerShop[];
    buyItem(player: Player, item: PlayerSavedShopItem, path: ["buy" | "sell", ...(string | number)[]], itemIndex: number): Promise<0 | 1>;
    sellItem(player: Player, item: PlayerSellableShopItem | PlayerSellableAdvancedShopItem, path: ["buy" | "sell", ...(string | number)[]], itemIndex: number): Promise<0 | 1>;
    createStorageEntity(player?: Player): Promise<void>;
    /**
     * Opens the public shops selector interface for the player.
     *
     * @see {@link ServerShop.openPublicShopsSelector}
     *
     * @param {loosePlayerType} sourceEntity - The player viewing the menu, can be an `Entity`, `executeCommandPlayerW`, or `Player`.
     * @param {boolean} [showBackButton=false] - Optional boolean to indicate if a back button should be displayed.
     * @returns {Promise<0 | 1>} A promise that resolves to `0` or `1` depending on the user's interaction:
     * - `0`: Indicates that the previous menu should be closed.
     * - `1`: Indicates that the previous menu should be re-opened.
     *
     * @remarks
     * The function performs the following actions:
     * 1. Retrieves the player entity from the source entity.
     * 2. Asserts that the source entity is defined.
     * 3. Creates and configures an `ActionFormData` form with options for public player shops.
     * 4. Displays the form to the player and handles their selection:
     *    - `manageMyShops`: Opens the manage player shops interface.
     *    - `manageAllShops`: Opens the manage all shops interface (admin only).
     *    - `playerShopSystemSettings`: Opens the player shop system settings interface (admin only).
     *    - `back`: Returns `1`.
     *    - `close`: Returns `0`.
     *    - `refresh`: Refreshes the public shops selector interface.
     *    - `shop`: Opens the selected shop interface.
     * 5. Handles errors by logging and showing a message to the player.
     */
    static openPublicShopsSelector(sourceEntity: loosePlayerType, showBackButton?: boolean): Promise<0 | 1>;
}
export declare class PlayerShopManager {
    static playerShopItemTextureHints: ["textures/items/stick", "textures/blocks/gravel", "textures/items/diamond_pickaxe", "textures/blocks/reactor_core_stage_0"];
    static playerShopPageTextureHints: ["textures/ui/arrowRight"];
    static get playerShopItemTextureHint(): typeof this.playerShopItemTextureHints[number];
    static get playerShopPageTextureHint(): typeof this.playerShopPageTextureHints[number];
    /**
     * @todo Add the "Shop Item Settings" section.
     * @see {@link ServerShopManager.serverShopSystemSettings}
     * @param sourceEntitya
     * @returns
     */
    static playerShopSystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
    static playerShopSystemSettings_main(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
    static managePlayerShops(sourceEntitya: Entity | executeCommandPlayerW | Player, all?: boolean): Promise<0 | 1>;
    static addPlayerShop(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1>;
    static addPlayerShopAsPlayer(sourceEntitya: Entity | executeCommandPlayerW | Player, targetPlayerID: `${number}`, targetPlayerName: string): Promise<0 | 1>;
    static managePlayerShop(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop): Promise<0 | 1>;
    static managePlayerShop_settings(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop): Promise<0 | 1>;
    static managePlayerShop_contents(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, mode?: "buy" | "sell"): Promise<0 | 1>;
    static managePlayerShop_manageItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, item: mode extends "buy" ? PlayerSavedShopItem : PlayerSellableShopItem, itemIndex: number, mode: mode): Promise<0 | 1>;
    /**
     * Opens the UI for editing a player shop item.
     * @see {@link ServerShopManager.manageServerShop_editItem}
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param item The shop item that the player is editing.
     * @param itemIndex The index of the shop item that is being edited in the shop page, it is zero-indexed.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static managePlayerShop_editItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, item: mode extends "buy" ? PlayerSavedShopItem : PlayerSellableShopItem, itemIndex: number, mode: mode): Promise<import("@minecraft/server-ui").ModalFormResponse>;
    /**
     * Opens the UI for editing a player shop item.
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param item The shop item that the player is editing.
     * @param itemIndex The index of the shop item that is being edited in the shop page, it is zero-indexed.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static managePlayerShop_editAdvancedItem<mode extends "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, item: PlayerSellableAdvancedShopItem, itemIndex: number, mode: mode): Promise<import("@minecraft/server-ui").ModalFormResponse>;
    /**
     * Opens the UI for editing a player shop item.
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param type The type of the shop item that the player is adding.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static managePlayerShop_addItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, type: "player_shop_sellable", mode: mode): Promise<import("@minecraft/server-ui").ModalFormResponse>;
    static managePlayerShop_managePage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, page: PlayerShopPage, pageIndex: number, mode: mode): Promise<0 | 1>;
    static managePlayerShop_editPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, page: PlayerShopPage, pageIndex: number, mode: mode): Promise<1>;
    static managePlayerShop_addPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, mode: mode): Promise<1>;
    static managePlayerShopPage_contents<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]]): Promise<0 | 1>;
    static managePlayerShopPage_manageItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]], item: mode extends "buy" ? PlayerSavedShopItem : PlayerSellableShopItem, itemIndex: number): Promise<0 | 1>;
    static managePlayerShopPage_editItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]], item: mode extends "buy" ? PlayerSavedShopItem : PlayerSellableShopItem, itemIndex: number): Promise<1>;
    static managePlayerShopPage_addItem<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]], type: "player_shop_sellable"): Promise<1>;
    static managePlayerShopPage_managePage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]], page: PlayerShopPage, pageIndex: number): Promise<0 | 1>;
    static managePlayerShopPage_editPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]], page: PlayerShopPage, pageIndex: number): Promise<1>;
    static managePlayerShopPage_addPage<mode extends "buy" | "sell">(sourceEntitya: Entity | executeCommandPlayerW | Player, shop: PlayerShop, path: [mode, ...string[]]): Promise<0 | 1>;
}
