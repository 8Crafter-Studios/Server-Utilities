/**
 * ExtraFeatures/player_shop.ts
 * @module
 * @description This file contains functions and types related to the player shop system.
 */
import { ItemStack, Player, world, Entity, StructureSaveMode, InvalidStructureError, Container } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { getPathInObject } from "modules/main/functions/getPathInObject";
import "init/classes/config";
import { containerToContainerSlotArray } from "modules/command_utilities/functions/containerToContainerSlotArray";
import { containerToItemStackArray } from "modules/command_utilities/functions/containerToItemStackArray";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { onlinePlayerSelector } from "modules/ui/functions/onlinePlayerSelector";
import { itemSelector } from "modules/ui/functions/itemSelector";
import { getSuperUniqueID } from "modules/utilities/functions/getSuperUniqueID";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
import {} from "./shop_main";
import { MoneySystem } from "./money";
import { StorageFullError } from "modules/errors/classes/StorageFullError";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { selectTexturePreset } from "modules/ui/functions/selectTexturePreset";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
;
/**
 *
 * @see {@link ServerShop}
 */
export class PlayerShop {
    /**
     * The id of the player shop.
     */
    id;
    /**
     * The display name of the player shop. This is displayed on the button for the player shop in the manage player shops menu.
     */
    name;
    /**
     * The title of the player shop. This is the title displayed at the top of the UI for the player shop.
     */
    title;
    /**
     * The body text that is displayed on the main page of the player shop.
     */
    mainPageBodyText;
    /**
     * The body text that is displayed on the main buy page of the server shop.
     */
    mainBuyPageBodyText;
    /**
     * The body text that is displayed on the main sell page of the server shop.
     */
    mainSellPageBodyText;
    /**
     * Whether or not players can sell items in this shop.
     */
    sellShop;
    /**
     * Whether or not players can buy items in this shop.
     */
    buyShop;
    /**
     * Whether or not this shop can be accessed by any player through the use of the \viewplayershops command.
     */
    publicShop;
    /**
     * The ID of the player who owns this player shop.
     */
    playerID;
    /**
     * The name of the player who owns this player shop.
     */
    playerName;
    constructor(config) {
        this.id = config.id ?? null;
        this.name = config.name ?? null;
        this.title = config.title ?? null;
        this.mainPageBodyText = config.mainPageBodyText ?? null;
        this.sellShop = config.sellShop ?? true;
        this.buyShop = config.buyShop ?? true;
        this.publicShop = config.publicShop ?? true;
        this.playerID = config.playerID ?? null;
        this.playerName = config.playerName ?? null;
    }
    save() {
        world.setDynamicProperty(this.id, JSON.stringify({
            id: this.id ?? null,
            name: this.name ?? null,
            mainPageBodyText: this.mainPageBodyText ?? null,
            title: this.title ?? null,
            sellShop: this.sellShop ?? true,
            buyShop: this.buyShop ?? true,
            publicShop: this.publicShop ?? true,
            playerID: this.playerID ?? null,
            playerName: this.playerName ?? null,
        }));
    }
    async openShop(player, mode = this.sellShop && this.buyShop ? "both" : this.sellShop ? "sell" : this.buyShop ? "buy" : "none", showBackButton = true) {
        if (mode == "both") {
            const form = new ActionFormData();
            if (!!this.title) {
                form.title(customFormUICodes.action.titles.formStyles.medium + this.title);
            }
            else {
                form.title(customFormUICodes.action.titles.formStyles.medium);
            }
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------
Shop Owner: ${this.playerName}${!!this?.mainPageBodyText ? "\n§r" + this.mainPageBodyText : ""}`);
            form.button(customFormUICodes.action.buttons.positions.main_only + "Buy");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Sell");
            if (showBackButton) {
                form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            return await form.forceShow(player).then(async (r) => {
                if (r.canceled == true || r.selection == (showBackButton ? 2 : -2)) {
                    return 1;
                }
                if (r.selection == 2 + +showBackButton) {
                    return 0;
                }
                if (r.selection == 0) {
                    if ((await this.openShop(player, "buy", true)) == 1) {
                        return await this.openShop(player, "both", showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                else if (r.selection == 1) {
                    if ((await this.openShop(player, "sell", true)) == 1) {
                        return await this.openShop(player, "both", showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 1;
                }
            });
        }
        else if (mode == "sell") {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + (this.title ?? ""));
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("sellShop:" + this.id))) ?? [];
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------${!!this?.mainSellPageBodyText ? "\n§r" + this.mainSellPageBodyText : ""}`);
            data.forEach((v) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + v.title, (v.texture ?? "") === "" ? (v.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : v.texture);
            });
            if (showBackButton) {
                form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            return await form.forceShow(player).then(async (r) => {
                if (r.canceled == true) {
                    return 1;
                }
                if (r.selection == (showBackButton ? data.length : -1)) {
                    return 1;
                }
                if (r.selection == data.length + +showBackButton) {
                    return 0;
                }
                assertIsDefined(r.selection);
                const item = data[r.selection];
                if (item.type == "player_shop_item") {
                    if ((await this.sellItem(player, item, [mode], r.selection)) /*.then(v=>{
                    if(v==1){return 1}
                })*/
                        == 1) {
                        return await this.openShop(player, mode, showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                else if (item.type == "player_shop_page") {
                    if ((await this.openShopPage(player, data, ["sell", String(r.selection)])) == 1) {
                        return await this.openShop(player, mode, showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 1;
                }
            });
        }
        else if (mode == "buy") {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + (this.title ?? ""));
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("buyShop:" + this.id))) ?? [];
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------${!!this?.mainBuyPageBodyText ? "\n§r" + this.mainBuyPageBodyText : ""}`);
            data.forEach((v) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + v.title, (v.texture ?? "") === "" ? (v.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : v.texture);
            });
            if (showBackButton) {
                form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            return await form.forceShow(player).then(async (r) => {
                if (r.canceled == true) {
                    return 1;
                }
                if (r.selection == (showBackButton ? data.length : -1)) {
                    return 1;
                }
                if (r.selection == data.length + +showBackButton) {
                    return 0;
                }
                assertIsDefined(r.selection);
                const item = data[r.selection];
                if (item.type == "player_shop_item") {
                    if ((await this.buyItem(player, item, [mode], r.selection)) /*.then(v=>{
                    if(v==1){this.openShop(player, "buy")}
                }*/
                        == 1) {
                        return await this.openShop(player, mode, showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                else if (item.type == "player_shop_page") {
                    if ((await this.openShopPage(player, data, ["buy", String(r.selection)])) == 1) {
                        return await this.openShop(player, mode, showBackButton);
                    }
                    else {
                        return 0;
                    }
                }
                return 0;
            });
        }
        else if (mode == "none") {
            const form = new MessageFormData();
            form.title(config.ui.other.useStarWarsReference404Page ? "404: A Jedi has altered your mind." : "404: Invalid Page");
            form.body(config.ui.other.useStarWarsReference404Page
                ? "Jedi: This is not the page you are looking for."
                : "The page you are looking for does not exist. ");
            form.button1("Ok");
            form.button2("Cancel");
            return ((await form.forceShow(player)).selection != 1).toNumber();
        }
        return 0;
    }
    async openShopPage(player, data, path) {
        const mode = path[0];
        if (mode == "sell") {
            const form = new ActionFormData();
            const pageData = tryget(() => getPathInObject(data, path));
            if (!!!pageData) {
                const form = new MessageFormData();
                form.title(config.ui.other.useStarWarsReference404Page ? "404: A Jedi has altered your mind." : "404: Invalid Page");
                form.body(config.ui.other.useStarWarsReference404Page
                    ? "Jedi: This is not the page you are looking for."
                    : "The page you are looking for does not exist. ");
                form.button1("Ok");
                form.button2("Cancel");
                return ((await form.forceShow(player)).selection != 1).toNumber();
            }
            if (!!pageData?.pageTitle) {
                form.title(customFormUICodes.action.titles.formStyles.gridMenu + pageData.pageTitle);
            }
            else {
                form.title(customFormUICodes.action.titles.formStyles.gridMenu);
            }
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------${!!pageData?.pageBody ? "\n§r" + pageData.pageBody : ""}`);
            let newData = pageData?.data;
            newData.forEach((v) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + v.title, (v.texture ?? "") === "" ? (v.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : v.texture);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            return await form.forceShow(player).then(async (r) => {
                if (r.canceled == true) {
                    return 1;
                }
                if (r.selection == newData.length) {
                    /*
                    if(path.slice(0, -1).length==1){
                        this.openShop(player, "sell")
                    }else{
                        this.openShopPage(player, data, path.slice(0, -2) as [typeof path[0], ...string[]])
                    };*/
                    return 1;
                }
                if (r.selection == newData.length + 1) {
                    return 0;
                }
                assertIsDefined(r.selection);
                const item = newData[r.selection];
                if (item.type == "player_shop_item") {
                    if ((await this.sellItem(player, item, path, r.selection)) /*.then(v=>{
                    if(v==1){this.openShopPage(player, data, path)}
                })*/
                        == 1) {
                        return await this.openShopPage(player, data, path);
                    }
                    else {
                        return 0;
                    }
                }
                else if (item.type == "player_shop_page") {
                    if ((await this.openShopPage(player, data, [...path, "data", String(r.selection)])) == 1) {
                        return await this.openShopPage(player, data, path);
                    }
                    else {
                        return 0;
                    }
                }
                return 0;
            });
        }
        else if (mode == "buy") {
            const form = new ActionFormData();
            const pageData = tryget(() => getPathInObject(data, path));
            if (!!!pageData) {
                const form = new MessageFormData();
                form.title(config.ui.other.useStarWarsReference404Page ? "404: A Jedi has altered your mind." : "404: Invalid Page");
                form.body(config.ui.other.useStarWarsReference404Page
                    ? "Jedi: This is not the page you are looking for."
                    : "The page you are looking for does not exist. ");
                form.button1("Ok");
                form.button2("Cancel");
                return ((await form.forceShow(player)).selection != 1).toNumber();
            }
            if (!!pageData?.pageTitle) {
                form.title(customFormUICodes.action.titles.formStyles.gridMenu + pageData.pageTitle);
            }
            else {
                form.title(customFormUICodes.action.titles.formStyles.gridMenu);
            }
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------${!!pageData?.pageBody ? "\n§r" + pageData.pageBody : ""}`);
            let newData = pageData?.data;
            newData.forEach((v) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + v.title, (v.texture ?? "") === "" ? (v.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : v.texture);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            return await form.forceShow(player).then(async (r) => {
                if (r.canceled == true) {
                    return 1;
                }
                if (r.selection == newData.length) {
                    /*
                    if(path.slice(0, -1).length==1){
                        this.openShop(player, "buy")
                    }else{
                        this.openShopPage(player, data, path.slice(0, -2) as [typeof path[0], ...string[]])
                    };*/
                    return 1;
                }
                if (r.selection == newData.length + 1) {
                    return 0;
                }
                assertIsDefined(r.selection);
                const item = newData[r.selection];
                if (item.type == "player_shop_item") {
                    if ((await this.buyItem(player, item, path, r.selection)) /*.then(v=>{
                    if(v==1){this.openShopPage(player, data, path)}
                })*/
                        == 1) {
                        return await this.openShopPage(player, data, path);
                    }
                    else {
                        return 0;
                    }
                }
                else if (item.type == "player_shop_page") {
                    if ((await this.openShopPage(player, data, [...path, "data", String(r.selection)])) == 1) {
                        return await this.openShopPage(player, data, path);
                    }
                    else {
                        return 0;
                    }
                }
                return 0;
            });
        }
        return 0;
    }
    editShopElements(mode, data) {
        saveStringToDynamicProperties(JSON.stringify(data), mode + "Shop:" + this.id);
    }
    get buyData() {
        try {
            return JSON.parse(getStringFromDynamicProperties("buyShop:" + this.id));
        }
        catch {
            return [];
        }
    }
    set buyData(data) {
        saveStringToDynamicProperties(JSON.stringify(data), "buyShop:" + this.id);
    }
    get sellData() {
        try {
            return JSON.parse(getStringFromDynamicProperties("sellShop:" + this.id));
        }
        catch {
            return [];
        }
    }
    set sellData(data) {
        saveStringToDynamicProperties(JSON.stringify(data), "sellShop:" + this.id);
    }
    static get(shopID) {
        if (!!!world.getDynamicProperty(shopID)) {
            return undefined;
        }
        return new PlayerShop(JSON.parse(String(world.getDynamicProperty(shopID))));
    }
    static getAll() {
        return this.getIds().map((v) => new PlayerShop(JSON.parse(String(world.getDynamicProperty(v)))));
    }
    static getIds() {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith("playerShop:"));
    }
    static getIdsForPlayer(playerID) {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith("playerShop:" + playerID + ":"));
    }
    static getAllForPlayer(playerID) {
        return this.getIdsForPlayer(playerID).map((v) => new PlayerShop(JSON.parse(String(world.getDynamicProperty(v)))));
    }
    async buyItem(player, item, path, itemIndex) {
        try {
            const infoForm = new ActionFormData();
            infoForm.title(customFormUICodes.action.titles.formStyles.medium + "Item Details");
            infoForm.body(`§a${item.title}
§r§6Stock: ${item.remainingStock}
§r§gPrice: ${item.price}
§r§bItem Type: §a${item.itemDetails.typeId}
§r§bItem Name: §a${item.itemDetails.nameTag}
§r§bLore: §c${item.itemDetails.loreLineCount} Lines
§r§bEnchantments: §d{
${item.itemDetails.enchantments instanceof Array
                ? item.itemDetails.enchantments.map((v) => v.type.id + " " + v.level.toRomanNumerals()).join("\n")
                : item.itemDetails.enchantments}
}`);
            infoForm.button(customFormUICodes.action.buttons.positions.main_only + "Proceed to buy item");
            infoForm.button(customFormUICodes.action.buttons.positions.main_only + "More Details");
            infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const ifr = await infoForm.forceShow(player);
            if (ifr.canceled || ifr.selection == 2) {
                return 1;
            }
            if (ifr.selection == 3) {
                return 0;
            }
            if (ifr.selection == 1) {
                world.structureManager.place(item.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                    includeBlocks: false,
                    includeEntities: true,
                });
                const entity = player.dimension
                    .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                    .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                if (!!!entity) {
                    throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${item.entityID} was found inside of the specified structure.`);
                }
                const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                entity.remove();
                const infoForm = new ActionFormData();
                infoForm.title(customFormUICodes.action.titles.formStyles.medium + "Item Details");
                infoForm.body(!!!itemStack
                    ? `§a${item.title}
§r§6Stock: ${item.remainingStock}
§r§gPrice: ${item.price}
§r§cThe rest of the information could not be obtained as this item is currently out of stock.`
                    : `§a${item.title}
§r§6Stock: ${item.remainingStock}
§r§gPrice: ${item.price}
§r§bItem Type: §a${itemStack.typeId}
§r§bItem Name: §a${JSON.stringify(itemStack.nameTag)}
§r§bLore: §a${JSON.stringify(itemStack.getLore(), undefined, 1)}
§r§bCan Destroy: §a${JSON.stringify(itemStack.getCanDestroy(), undefined, 1)}
§r§bCan Place On: §a${JSON.stringify(itemStack.getCanPlaceOn(), undefined, 1)}
§r§bLock Mode: §a${itemStack.lockMode}
§r§bKeep On Death: ${itemStack.keepOnDeath.toFormattedString()}
§r§bDynamic Properties: §r${tryget(() => `${itemStack.getDynamicPropertyTotalByteCount()} Bytes: \n` +
                        JSON.stringify(Object.fromEntries(itemStack.getDynamicPropertyIds().map((v) => ["§r" + v, itemStack.getDynamicProperty(v)])), undefined, 1)) ?? "N/A"}${itemStack.hasComponent("durability")
                        ? `\n§r§bDurability: ${itemStack.getComponent("durability")?.damage <
                            itemStack.getComponent("durability")?.maxDurability / 3
                            ? "§a"
                            : itemStack.getComponent("durability")?.damage <
                                itemStack.getComponent("durability")?.maxDurability / 1.5
                                ? "§e"
                                : "§c"}${itemStack.getComponent("durability")?.maxDurability -
                            itemStack.getComponent("durability")?.damage}/${itemStack.getComponent("durability")?.maxDurability}`
                        : ""}${itemStack.hasComponent("potion")
                        ? `\n§r§bPotion Effect Type: §d${itemStack.getComponent("potion")?.potionEffectType.id}
§r§bPotion Liquid Type: §9${itemStack.getComponent("potion")?.potionLiquidType.id}
§r§bPotion Modifier Type: §e${itemStack.getComponent("potion")?.potionModifierType.id}`
                        : ""}
§r§bEnchantments: ${item.itemDetails.enchantments instanceof Array
                        ? "\n§d[" + item.itemDetails.enchantments.map((v) => v.type.id + " " + v.level.toRomanNumerals()).join("\n") + "\n]"
                        : item.itemDetails.enchantments}`);
                infoForm.button(customFormUICodes.action.buttons.positions.main_only + "Proceed to buy item");
                infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back");
                infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close");
                const ifrb = await infoForm.forceShow(player);
                if (ifrb.canceled || ifrb.selection == 1) {
                    return 1;
                }
                if (ifrb.selection == 2) {
                    return 0;
                }
            }
            if (item.remainingStock == 0) {
                return ((await showMessage(player, "Out Of Stock", "This item is out of stock.", "Go Back", "Close Shop")).selection == 0).toNumber();
            }
            const form = new ModalFormData();
            form.title(customFormUICodes.modal.titles.formStyles.medium + "Buy " + item.title);
            form.slider(`§a${item.title}\n§r§gPrice: ${item.price}\n\n§fHow many would you like to buy?`, 0, item.remainingStock ?? 64, item.step ?? 1, item.step ?? 1);
            const r = await form.forceShow(player);
            if (r.canceled == true || r.formValues?.[0] == 0) {
                return 1;
            }
            assertIsDefined(r.formValues);
            if (MoneySystem.get(player.id).money >= item.price * r.formValues[0]) {
                if (item.itemType == "player_shop_saved") {
                    world.structureManager.place(item.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                        includeBlocks: false,
                        includeEntities: true,
                    });
                    const entity = player.dimension
                        .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                        .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                    if (!!!entity) {
                        throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${item.entityID} was found inside of the specified structure.`);
                    }
                    const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                    if (!!!itemStack) {
                        throw new TypeError("The item stack was missing from the storage entity.");
                    }
                    if (itemStack.amount == r.formValues[0]) {
                        (entity.getComponent("inventory")?.container).setItem(0);
                    }
                    else if (itemStack.amount < r.formValues[0]) {
                        const form = new MessageFormData();
                        form.title("Not Enough Stock");
                        form.body(`You cannot buy ${r.formValues[0]} of this item because there ${itemStack.amount == 1 ? "is" : "are"} only ${itemStack.amount} of it left in stock.`);
                        form.button1("Go Back");
                        form.button2("Close Shop");
                        const rb = await form.forceShow(player);
                        if (rb.canceled == true || rb.selection == 1) {
                            return 0;
                        }
                        return 1;
                        // this.openShop(player, "buy")
                    }
                    else {
                        (entity.getComponent("inventory")?.container).getSlot(0).amount -= r.formValues[0];
                    }
                    try {
                        world.structureManager.delete(item.structureID);
                    }
                    catch { }
                    /**
                     * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                     */
                    var otherEntities = tryget(() => player.dimension.getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 })).filter((v) => v.id != entity.id)) ?? [];
                    var locs = otherEntities.map((v) => v.location);
                    otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                    try {
                        world.structureManager.createFromWorld(item.structureID, player.dimension, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z),
                        }, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z),
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World,
                        });
                        item.remainingStock -= r.formValues[0];
                        itemStack.amount = r.formValues[0];
                        let b = (player.getComponent("inventory")?.container).addItem(itemStack);
                        if (!!b) {
                            catchtry(() => player.dimension.spawnItem(b, player.location));
                        }
                        MoneySystem.get(player.id).removeMoney(item.price * r.formValues[0]);
                        MoneySystem.get(item.playerID).addMoney(item.price * r.formValues[0]);
                    }
                    catch (e) {
                        return ((await showMessage(player, "An Error Has occurred", e instanceof Error ? e.stringify() : e + " " + e?.stack, "Go Back", "Close Shop")).selection == 0).toNumber();
                    }
                    finally {
                        try {
                            otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                        }
                        catch { }
                        try {
                            entity.remove();
                        }
                        catch { }
                    }
                    // console.warn(path)
                    if (path.length < 2) {
                        if (path[0] == "buy") {
                            let data = this.buyData;
                            data.splice(itemIndex, 1, item);
                            this.buyData = data;
                        }
                        else if (path[0] == "sell") {
                            let data = this.sellData;
                            data.splice(itemIndex, 1, item);
                            this.sellData = data;
                        }
                    }
                    else {
                        if (path[0] == "buy") {
                            let data = this.buyData;
                            let newData = getPathInObject(data, path.slice(0, -2)).data;
                            newData.splice(itemIndex, 1, item);
                            this.buyData = data;
                        }
                        else if (path[0] == "sell") {
                            let data = this.sellData;
                            let newData = getPathInObject(data, path.slice(0, -2)).data;
                            newData.splice(itemIndex, 1, item);
                            this.sellData = data;
                        }
                    }
                    return 1;
                }
                throw new TypeError("Unexpected Item Type: " + JSON.stringify(item.itemType));
            }
            else {
                // {"Block":{"name":"minecraft:blue_orchid","states": {},"version":7687},"Count":1b,"Damage":0s,"Name": "minecraft:blue_orchid","WasPickedUp":0b,"tag":{"PlantBlock":{"name":"minecraft:blue_orchid","states":{},"version":7687},"display":{"Lore":["(+DATA)"]}}}
                // {"Block":{"name":"minecraft:flower_pot","states": {},"version":7687},"Count":1b,"Damage":0s,"Name": "minecraft:flower_pot","WasPickedUp":0b,"tag":{"PlantBlock":{"name":"minecraft:blue_orchid","states":{},"version":7687},"display":{"Lore":["(+DATA)"]}}}
                // {"Block":{"name":"minecraft:flower_pot","states": {},"version":7687},"Count":1b,"Damage":0s,"Name": "minecraft:flower_pot","WasPickedUp":0b,"tag":{"PlantBlock":{"name":"minecraft:reeds","states":{},"version":7687},"display":{"Lore":["(+DATA)"]}}}
                const form = new MessageFormData();
                form.title("Not Enough Money");
                form.body(`You do not have enough money to buy this item.\nYou currently have $${MoneySystem.get(player.id).money}.\nOne of this item costs $${item.price}.\nYou wanted to buy ${r.formValues[0]} of this item.\nThe total price is $${item.price * r.formValues[0]}.\nYou need another $${(item.price * r.formValues[0]).toBigInt() - MoneySystem.get(player.id).money} to buy this item.`);
                form.button1("Go Back");
                form.button2("Close Shop");
                const rb = await form.forceShow(player);
                if (rb.canceled == true || rb.selection == 1) {
                    return 0;
                }
                return 1;
                // this.openShop(player, "buy")
            }
        }
        catch (e) {
            console.error(e, e.stack);
            return ((await showMessage(player, "Error", e + e.stack, "Go Back", "Close Shop")).selection == 0).toNumber();
        }
    }
    async sellItem(player, item, path, itemIndex) {
        try {
            const infoForm = new ActionFormData();
            infoForm.title(customFormUICodes.action.titles.formStyles.medium + "Item Details");
            infoForm.body(`§a${item.title}
§r§6Amount Wanted: ${item.amountWanted}
§r§gvalue: ${item.value}
§r§bItem Type: §a${item.itemID}${item.itemType != "player_shop_sellable_advanced"
                ? ""
                : `${!!item.extraRestrictions.nameTag
                    ? `
§r§bRequired Item Name: §a${item.extraRestrictions.nameTag}`
                    : ""}${!!item.extraRestrictions.lore
                    ? `
§r§bHas Required Lore: §aTrue`
                    : "§r§bHas Required Lore: §cFalse"}`}`);
            infoForm.button(customFormUICodes.action.buttons.positions.main_only + "Proceed to sell item");
            if (item.itemType == "player_shop_sellable_advanced") {
                infoForm.button(customFormUICodes.action.buttons.positions.main_only + "More Details");
            }
            infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const ifr = await infoForm.forceShow(player);
            if (ifr.canceled || ifr.selection == 1 + +(item.itemType == "player_shop_sellable_advanced")) {
                return 1;
            }
            if (ifr.selection == 2 + +(item.itemType == "player_shop_sellable_advanced")) {
                return 0;
            }
            if (ifr.selection == (item.itemType == "player_shop_sellable_advanced" ? 1 : -1)) {
                const infoForm = new ActionFormData();
                infoForm.title(customFormUICodes.action.titles.formStyles.medium + "Item Details");
                infoForm.body(`§a${item.title}
§r§6Amount Wanted: ${item.amountWanted}
§r§gValue: ${item.value}
§r§bItem Type: §a${item.itemID}${item.itemType != "player_shop_sellable_advanced"
                    ? ""
                    : `${!!item.extraRestrictions.nameTag
                        ? `
§r§bRequired Item Name: §a${item.extraRestrictions.nameTag}`
                        : ""}${!!item.extraRestrictions.lore
                        ? `
§r§bRequired Lore: §a${JSON.stringify(item.extraRestrictions.lore, undefined, 1)}`
                        : ""}${!!item.extraRestrictions.lore
                        ? `
§r§bRequired Can Destroy: §a${JSON.stringify(item.extraRestrictions.canPlaceOn, undefined, 1)}`
                        : ""}${!!item.extraRestrictions.lore
                        ? `
§r§bRequired Can Place On: §a${JSON.stringify(item.extraRestrictions.canDestroy, undefined, 1)}`
                        : ""}${item.extraRestrictions.requiredEnchantmentsMode == "ignore"
                        ? ""
                        : item.extraRestrictions.requiredEnchantmentsMode == "allow_additional"
                            ? `
§r§bAllows Additional Enchantments: §aTrue
§r§aRequired Enchantments: ${item.extraRestrictions.requiredEnchantments instanceof Array
                                ? "§d{" +
                                    item.extraRestrictions.requiredEnchantments
                                        .map((v) => v.hasOwnProperty("level")
                                        ? v.type + " " + v.level.toRomanNumerals()
                                        : v.type +
                                            " {Min: " +
                                            v.minLevel.toRomanNumerals() +
                                            " Max: " +
                                            v.maxLevel.toRomanNumerals() +
                                            "}")
                                        .join("\n") +
                                    "}"
                                : "none"}
§r§cDisallowed Enchantment Types: §d[${item.extraRestrictions.excludedEnchantmentTypes instanceof Array
                                ? "\n" + item.extraRestrictions.excludedEnchantmentTypes.join("\n") + "\n"
                                : ""}]`
                            : `
§r§bAllows Additional Enchantments: §cFalse
§r§aRequired Enchantments: ${item.extraRestrictions.requiredEnchantments instanceof Array
                                ? "§d{" +
                                    item.extraRestrictions.requiredEnchantments
                                        .map((v) => v.hasOwnProperty("level")
                                        ? v.type + " " + v.level.toRomanNumerals()
                                        : v.type +
                                            " {Min: " +
                                            v.minLevel.toRomanNumerals() +
                                            " Max: " +
                                            v.maxLevel.toRomanNumerals() +
                                            "}")
                                        .join("\n") +
                                    "}"
                                : "none"}
§r§eOptional Enchantments: ${item.extraRestrictions.optionalAdditionalEnchantments instanceof Array
                                ? "§d{" +
                                    item.extraRestrictions.optionalAdditionalEnchantments
                                        .map((v) => v.hasOwnProperty("level")
                                        ? v.type + " " + v.level.toRomanNumerals()
                                        : v.type +
                                            " {Min: " +
                                            v.minLevel.toRomanNumerals() +
                                            " Max: " +
                                            v.maxLevel.toRomanNumerals() +
                                            "}")
                                        .join("\n") +
                                    "}"
                                : "none"}`}`}`);
                infoForm.button(customFormUICodes.action.buttons.positions.main_only + "Proceed to buy item");
                infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back");
                infoForm.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close");
                const ifrb = await infoForm.forceShow(player);
                if (ifrb.canceled || ifrb.selection == 1) {
                    return 1;
                }
                if (ifrb.selection == 2) {
                    return 0;
                }
            }
            if (item.amountWanted == 0) {
                return ((await showMessage(player, "Out Of Stock", "This item is out of stock.", "Go Back", "Close Shop")).selection == 0).toNumber();
            }
            const form = new ModalFormData();
            form.title(customFormUICodes.modal.titles.formStyles.medium + "Sell " + item.title);
            form.slider(`§a${item.title}\n§gValue: ${item.value}${item.amountWanted <= 0 ? "\n§cThe owner of this shop is not accepting any more of this item." : ""}\n§fHow many would you like to sell?`, 0, Math.min(item.amountWanted ?? 64, 64 * (item.step ?? 1)), Math.min(item.step ?? 1, item.amountWanted), Math.min(item.step ?? 1, item.amountWanted));
            const r = await form.forceShow(player);
            if (r.canceled == true || r.formValues?.[0] == 0) {
                return 1;
            }
            assertIsDefined(r.formValues);
            const items = containerToContainerSlotArray(player.getComponent("inventory")?.container)
                .filter((v) => (v.hasItem() ? v?.typeId == item.itemID : false))
                .filter((v) => !((v.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems) ||
                (v.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems) ||
                (v.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems)));
            let itemCount = 0;
            items.forEach((v) => (itemCount += v.amount));
            if (itemCount >= r.formValues[0]) {
                if (MoneySystem.get(item.playerID).money < item.value.toBigInt() * r.formValues[0].toBigInt()) {
                    const form = new MessageFormData();
                    form.title("Owner Has Insufficient Funds");
                    form.body(`The owner of this shop does not have enough money to pay you for this item.\nThey currently have $${MoneySystem.get(item.playerID).money}.\nOne of this item is worth $${item.value}.\nYou wanted to sell ${r.formValues[0]} of this item.\nThe total value is $${item.value * r.formValues[0]}.\nThey need another $${(item.value * r.formValues[0]).toBigInt() - MoneySystem.get(item.playerID).money} to pay you for this item.\nThe number of this item that they can currently pay you for is ${MoneySystem.get(item.playerID).money / item.value.toBigInt()}.`);
                    form.button1("Go Back");
                    form.button2("Close Shop");
                    const rb = await form.forceShow(player);
                    if (rb.canceled == true || rb.selection == 1) {
                        return 0;
                    }
                    return 1;
                }
                if (item.itemType == "player_shop_sellable") {
                    if (!!!world.structureManager.get("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID)) {
                        /*
                        const entity = player.dimension.spawnEntity("andexdb:player_shop_recieved_shop_items_storage", {x: Math.floor(player.location.x)+0.5, y: Math.floor(player.location.y)+0.5, z: Math.floor(player.location.z)+0.5})
                        entity.setDynamicProperty("andexdb:recievedShopItemsStoragePlayerID", item.playerID)
                        world.structureManager.createFromWorld(
                            "andexdbPlayerShopRecievedShopItemsStorage:"+item.playerID,
                            player.dimension,
                            {
                                x: Math.floor(player.location.x),
                                y: Math.floor(player.location.y)+10,
                                z: Math.floor(player.location.z)
                            },
                            {
                                x: Math.floor(player.location.x),
                                y: Math.floor(player.location.y)+10,
                                z: Math.floor(player.location.z)
                            },
                            {
                                includeBlocks: false,
                                includeEntities: true,
                                saveMode: StructureSaveMode.World
                            }
                        )*/
                        this.createStorageEntity(player);
                    }
                    let amountToRemove = r.formValues[0];
                    world.structureManager.place("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID, player.dimension, Vector.add(Vector.floor(player.location), { x: 0.5, y: 10.5, z: 0.5 }), { includeBlocks: false, includeEntities: true });
                    const entity = player.dimension
                        .getEntitiesAtBlockLocation(Vector.add(Vector.floor(player.location), { x: 0.5, y: 10.5, z: 0.5 }))
                        .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:recievedShopItemsStoragePlayerID"))) == item.playerID);
                    if (!!!entity) {
                        throw new ReferenceError(`Unable to get the storage entity.`);
                    }
                    const testItemStack = new ItemStack(item.itemID);
                    if (entity.getComponent("inventory")?.container?.emptySlotsCount <= r.formValues[0] / testItemStack.maxAmount) {
                        let availableSpace = entity.getComponent("inventory")?.container?.emptySlotsCount * testItemStack.maxAmount;
                        containerToItemStackArray(entity.getComponent("inventory")?.container).forEach((v) => {
                            try {
                                if (!!!v) {
                                    return;
                                }
                                else if (v.amount == 0 || v.amount == v.maxAmount || !v.isStackableWith(testItemStack)) {
                                    return;
                                }
                                else {
                                    availableSpace += v.maxAmount - v.amount;
                                }
                            }
                            catch (e) {
                                if (e instanceof Error) {
                                    console.error(e.stringify());
                                }
                                else {
                                    console.error(e, e?.stack);
                                }
                            }
                        });
                        if (r.formValues[0] > availableSpace) {
                            entity.remove();
                            throw new StorageFullError("The shop owner does not have enough storage left for the items that you are selling, the shop owner must collect their items before and more items can be sold to them.");
                        }
                    }
                    try {
                        for (let i = 0; amountToRemove > 0 && i < items.length; i++) {
                            try {
                                const recievingItem = items[i].getItem(); // This is fine because the try...catch statement will deal with when it is undefined.
                                const iamount = items[i].amount;
                                let amount = Math.min(amountToRemove, iamount);
                                recievingItem.amount = amount;
                                entity.getComponent("inventory")?.container?.addItem(recievingItem);
                                if (amount == iamount) {
                                    items[i].setItem();
                                }
                                else {
                                    items[i].amount -= amount;
                                }
                                amountToRemove -= amount;
                                item.amountWanted -= amount;
                                item.currentAmount += amount;
                                MoneySystem.get(player.id).addMoney(item.value * r.formValues[0]);
                                MoneySystem.get(item.playerID ?? this.playerID).removeMoney(item.value * r.formValues[0]);
                            }
                            catch (e) {
                                try {
                                    player.sendMessage(e + " " + e?.stack);
                                }
                                catch {
                                    console.error(e, e?.stack);
                                }
                            }
                        }
                        try {
                            world.structureManager.delete("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID);
                        }
                        catch { }
                        /**
                         * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                         */
                        var otherEntities = tryget(() => player.dimension
                            .getEntitiesAtBlockLocation(Vector.add(Vector.floor(player.location), { x: 0.5, y: 10.5, z: 0.5 }))
                            .filter((v) => v.id != entity.id)) ?? [];
                        var locs = otherEntities.map((v) => v.location);
                        otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                        world.structureManager.createFromWorld("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID, player.dimension, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z),
                        }, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z),
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World,
                        });
                    }
                    catch (e) {
                        if (e instanceof StorageFullError) {
                            return ((await showMessage(player, "Out Of Storage", e.message, "Go Back", "Close Shop")).selection == 0).toNumber();
                        }
                        try {
                            player.sendMessage(e + " " + e?.stack);
                        }
                        catch {
                            console.error(e, e?.stack);
                        }
                    }
                    finally {
                        try {
                            otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                        }
                        catch { }
                        try {
                            entity.remove();
                        }
                        catch { }
                        // console.warn(path)
                        if (path.length < 2) {
                            if (path[0] == "buy") {
                                let data = this.buyData;
                                data.splice(itemIndex, 1, item);
                                this.buyData = data;
                            }
                            else if (path[0] == "sell") {
                                let data = this.sellData;
                                data.splice(itemIndex, 1, item);
                                this.sellData = data;
                            }
                        }
                        else {
                            if (path[0] == "buy") {
                                let data = this.buyData;
                                let newData = getPathInObject(data, path.slice(0, -2)).data;
                                newData.splice(itemIndex, 1, item);
                                this.buyData = data;
                            }
                            else if (path[0] == "sell") {
                                let data = this.sellData;
                                let newData = getPathInObject(data, path.slice(0, -2)).data;
                                newData.splice(itemIndex, 1, item);
                                this.sellData = data;
                            }
                        }
                    }
                    return 1;
                    // this.openShop(player, "sell")
                }
                throw new TypeError("Unexpected Item Type: " + JSON.stringify(item.itemType));
            }
            else {
                const form = new MessageFormData();
                form.title("Not Enough Items");
                form.body(`You do not have ${r.formValues[0]} of this item.\nYou currently have ${itemCount} of this item.\nYou wanted to sell ${r.formValues[0]} of this item.\nYou need another ${r.formValues[0] - itemCount} of this item.`);
                form.button1("Go Back");
                form.button2("Close Shop");
                const rb = await form.forceShow(player);
                if (rb.canceled == true || rb.selection == 1) {
                    return 0;
                }
                return 1;
                // this.openShop(player, "sell")
            }
        }
        catch (e) {
            console.error(e, e.stack);
            return ((await showMessage(player, "Error", e + e.stack, "Go Back", "Close Shop")).selection == 0).toNumber();
        }
    }
    async createStorageEntity(player = world.getAllPlayers().find((v) => v.id == this.playerID)) {
        const entity = player.dimension.spawnEntity("andexdb:player_shop_recieved_shop_items_storage", Vector.add(Vector.floor(player.location), { x: 0.5, y: 10.5, z: 0.5 }));
        entity.setDynamicProperty("andexdb:recievedShopItemsStoragePlayerID", this.playerID);
        try {
            /**
             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
             */
            var otherEntities = tryget(() => player.dimension
                .getEntitiesAtBlockLocation(Vector.add(Vector.floor(player.location), { x: 0.5, y: 10.5, z: 0.5 }))
                .filter((v) => v.id != entity.id)) ?? [];
            var locs = otherEntities.map((v) => v.location);
            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
            try {
                world.structureManager.delete("andexdbPlayerShopRecievedShopItemsStorage:" + this.playerID);
            }
            catch { }
            world.structureManager.createFromWorld("andexdbPlayerShopRecievedShopItemsStorage:" + this.playerID, player.dimension, {
                x: Math.floor(player.location.x),
                y: Math.floor(player.location.y) + 10,
                z: Math.floor(player.location.z),
            }, {
                x: Math.floor(player.location.x),
                y: Math.floor(player.location.y) + 10,
                z: Math.floor(player.location.z),
            }, {
                includeBlocks: false,
                includeEntities: true,
                saveMode: StructureSaveMode.World,
            });
        }
        catch (e) {
            try {
                player.sendMessage(e + " " + e?.stack);
            }
            catch {
                console.error(e, e?.stack);
            }
        }
        finally {
            try {
                otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
            }
            catch { }
            try {
                entity.remove();
            }
            catch { }
        }
    }
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
    static async openPublicShopsSelector(sourceEntity, showBackButton = false) {
        const player = extractPlayerFromLooseEntityType(sourceEntity);
        let form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.medium + "Player Shops");
        const shopsList = (PlayerShop.getAll() ?? []).filter((s) => s.publicShop == true);
        if (shopsList.length == 0) {
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------
§rThere are currently no player shops.`);
        }
        else {
            form.body(`§6----------------------------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6----------------------------------------------------`);
        }
        shopsList.forEach((s) => {
            form.button(customFormUICodes.action.buttons.positions.main_only + (s.name ?? s.title ?? s.id));
        });
        form.button(customFormUICodes.action.buttons.positions.main_only + "Manage My Shops", "textures/ui/book_edit_default");
        if (showBackButton) {
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        if (player.hasTag("admin")) {
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Manage All Shops\n§cAdmins Only", "textures/ui/pencil_edit_icon");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Player Shop System Settings\n§cAdmins Only", "textures/ui/icon_setting");
        }
        return await form.forceShow(player)
            .then(async (r) => {
            if (r.canceled)
                return 1;
            assertIsDefined(r.selection);
            let response = r.selection;
            switch ((!!shopsList[r.selection] ? "shop" : undefined) ??
                cullUndefined([
                    "manageMyShops",
                    showBackButton ? "back" : undefined,
                    "close",
                    "refresh",
                    ...(player.hasTag("admin") ? ["manageAllShops", "playerShopSystemSettings"] : []),
                ])[r.selection - shopsList.length]) {
                case "manageMyShops":
                    if ((await PlayerShopManager.managePlayerShops(player, false)) !== 0) {
                        return await PlayerShop.openPublicShopsSelector(player, showBackButton);
                    }
                    else {
                        return 0;
                    }
                case "manageAllShops":
                    if ((await PlayerShopManager.managePlayerShops(player, true)) !== 0) {
                        return await PlayerShop.openPublicShopsSelector(player, showBackButton);
                    }
                    else {
                        return 0;
                    }
                case "playerShopSystemSettings":
                    if ((await PlayerShopManager.playerShopSystemSettings(player)) !== 0) {
                        return await PlayerShop.openPublicShopsSelector(player, showBackButton);
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    return await PlayerShop.openPublicShopsSelector(player, showBackButton);
                default:
                    if ((await shopsList[response].openShop(player)) != 0) {
                        return await PlayerShop.openPublicShopsSelector(player, showBackButton);
                    }
                    return 0;
            }
        })
            .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
    }
}
export class PlayerShopManager {
    static playerShopItemTextureHints = ["textures/items/stick", "textures/blocks/gravel", "textures/items/diamond_pickaxe", "textures/blocks/reactor_core_stage_0"];
    static playerShopPageTextureHints = ["textures/ui/arrowRight"];
    static get playerShopItemTextureHint() {
        return this.playerShopItemTextureHints[Math.floor(Math.random() * this.playerShopItemTextureHints.length)];
    }
    static get playerShopPageTextureHint() {
        return this.playerShopPageTextureHints[Math.floor(Math.random() * this.playerShopPageTextureHints.length)];
    }
    /**
     * @todo Add the "Shop Item Settings" section.
     * @see {@link ServerShopManager.serverShopSystemSettings}
     * @param sourceEntitya
     * @returns
     */
    static async playerShopSystemSettings(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessExtraFeaturesSettings") == false) {
                const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings", "Go Back", "Close");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        let form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Player Shop System");
        form.body("The player shop system is " + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"));
        form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Your Shops", "textures/ui/store_home_icon");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Manage All Shops", "textures/ui/store_home_icon");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Main Settings", "textures/ui/icon_setting");
        form.button(customFormUICodes.action.buttons.positions.main_only + customFormUICodes.action.buttons.options.disabled + "§cShop Item Settings", "textures/ui/icon_recipe_item");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity)
            .then(async (r) => {
            if (r.canceled)
                return 1;
            switch (["manageShops", "manageAllShops", "mainSettings", "shopItemSettings", "back", "close"][r.selection]) {
                case "manageShops":
                    if ((await PlayerShopManager.managePlayerShops(sourceEntity, false)) !== 0) {
                        return (await PlayerShopManager.playerShopSystemSettings(sourceEntity));
                    }
                    else {
                        return 0;
                    }
                case "manageAllShops":
                    if ((await PlayerShopManager.managePlayerShops(sourceEntity, true)) !== 0) {
                        return (await PlayerShopManager.playerShopSystemSettings(sourceEntity));
                    }
                    else {
                        return 0;
                    }
                case "mainSettings":
                    if ((await PlayerShopManager.playerShopSystemSettings_main(sourceEntity)) !== 0) {
                        return (await PlayerShopManager.playerShopSystemSettings(sourceEntity));
                    }
                    else {
                        return 0;
                    }
                case "shopItemSettings":
                    /**
                     * @todo Add the code for the shop item settings, and add the shop item itself.
                     */
                    return await showMessage(sourceEntity, undefined, "§cSorry, the shop item does not exist yet.", "Back", "Close").then(async (r) => {
                        if (r.selection !== 1) {
                            return (await PlayerShopManager.playerShopSystemSettings(sourceEntity));
                        }
                        return 0;
                    });
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 1;
            }
        })
            .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
    }
    static async playerShopSystemSettings_main(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessExtraFeaturesSettings") == false) {
                const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings", "Go Back", "Close");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        let form = new ModalFormData();
        form.title(`Player Shop System Settings`);
        form.toggle(`§l§fEnabled§r§f\nWhether or not the player shop system is enabled, default is false`, config.shopSystem.player.enabled);
        form.toggle(`§l§fAllow Selling Slot Locked Items§r§f\nWhether or not players can sell items that are locked to a specific slot in their inventory, default is false`, config.shopSystem.player.allowSellingLockInSlotItems);
        form.toggle(`§l§fAllow Selling Inventory Locked Items§r§f\nWhether or not players can sell items that are locked to inventory, default is false`, config.shopSystem.player.allowSellingLockInInventoryItems);
        form.toggle(`§l§fAllow Selling Keep On Death Items§r§f\nWhether or not players can sell items that have the keep on death property set to true, default is true`, config.shopSystem.player.allowSellingKeepOnDeathItems);
        form.textField(`§l§fMax Shops Per Player§r§f\nThe maximum number of shops each player can have, setting it to -1 will result in there being no maximum, default is 5`, "5", config.shopSystem.player.maxShopsPerPlayer.toString());
        form.submitButton("Save");
        return (await form.forceShow(sourceEntity)
            .then((t) => {
            if (t.canceled) {
                return 1;
            }
            let [enabled, allowSellingLockInSlotItems, allowSellingLockInInventoryItems, allowSellingKeepOnDeathItems, maxShopsPerPlayer] = t.formValues;
            config.shopSystem.player.enabled = enabled;
            config.shopSystem.player.allowSellingLockInSlotItems = allowSellingLockInSlotItems;
            config.shopSystem.player.allowSellingLockInInventoryItems = allowSellingLockInInventoryItems;
            config.shopSystem.player.allowSellingKeepOnDeathItems = allowSellingKeepOnDeathItems;
            config.shopSystem.player.maxShopsPerPlayer = maxShopsPerPlayer.toNumber();
            return 1;
        })
            .catch((e) => {
            console.error(e, e.stack);
            return 1;
        }));
    }
    static async managePlayerShops(sourceEntitya, all = false) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Player Shops");
        form.body("The player shop system is " + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"));
        const shopsList = all ? PlayerShop.getAll() : PlayerShop.getAll().filter((v) => v.playerID == sourceEntity.id);
        shopsList.forEach((s) => {
            form.button(customFormUICodes.action.buttons.positions.main_only + (s.name ?? s.title ?? s.id));
        });
        form.button(customFormUICodes.action.buttons.positions.main_only + "New Shop", "textures/ui/color_plus");
        if (config.system.debugMode && sourceEntity.hasTag("admin")) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "New Shop As Another Player\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/color_plus_red");
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        return await form.forceShow(sourceEntity)
            .then(async (r) => {
            if (r.canceled)
                return 1;
            assertIsDefined(r.selection);
            switch ((!!shopsList[r.selection] ? "shop" : undefined) ??
                cullUndefined([
                    "newShop",
                    config.system.debugMode && sourceEntity.hasTag("admin") ? "newShopAsPlayer" : undefined,
                    "back",
                    "close",
                    "refresh",
                ])[r.selection - shopsList.length]) {
                case "newShop":
                    if ((await PlayerShopManager.addPlayerShop(sourceEntity)) != 0) {
                        return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                    }
                    else {
                        return 0;
                    }
                case "newShopAsPlayer":
                    const rb = await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.medium + "Choose Player", undefined, [customFormUICodes.action.buttons.positions.main_only + "Select Online Player"], [
                        customFormUICodes.action.buttons.positions.main_only +
                            customFormUICodes.action.buttons.options.disabled +
                            "Select Offline Player",
                    ], [customFormUICodes.action.buttons.positions.main_only + "Manual"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                    if (rb.canceled || rb.selection === 3) {
                        return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                    }
                    else if (rb.selection == 4) {
                        return 0;
                    }
                    else if (rb.selection == 0) {
                        const player = await onlinePlayerSelector(sourceEntity, () => { });
                        if (!!!player) {
                            return 1;
                        }
                        if ((await PlayerShopManager.addPlayerShopAsPlayer(sourceEntity, player.id, player.name ?? player.nameTag)) !== 0) {
                            return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                        }
                        else {
                            return 0;
                        }
                    }
                    else if (rb.selection == 1) {
                        /**
                         * @todo Add the code for the offlinePlayerSelector function.
                         */
                        return await showMessage(sourceEntity, undefined, "§cSorry, the shop item does not exist yet.", "Back", "Close").then(async (r) => {
                            if (r.selection !== 1) {
                                return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                            }
                            else {
                                return 0;
                            }
                        }); /*
                        const player = await offlinePlayerSelector(sourceEntity, () => {});
                        if (!!!player) {
                            return 1;
                        }
                        if (
                            ((await PlayerShopManager.addPlayerShopAsPlayer(sourceEntity, player.id as `${number}`, player.name ?? player.nameTag)) as
                                | 0
                                | 1) != 0
                        ) {
                            return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                        } else {
                            return 0;
                        } */
                    }
                    else {
                        const rc = await new ModalFormData()
                            .textField("Player UUID§c*", "UUID")
                            .textField("Player Name (Optional)", "Steve")
                            .forceShow(sourceEntity);
                        if (rc.canceled) {
                            return 1;
                        }
                        const [playerID, playerName] = rc.formValues;
                        if ((await PlayerShopManager.addPlayerShopAsPlayer(sourceEntity, playerID, JSON.parse('"' + playerName.replaceAll('"', '\\"') + '"'))) != 0) {
                            return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                        }
                        else {
                            return 0;
                        }
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                default:
                    if ((await PlayerShopManager.managePlayerShop(sourceEntity, shopsList[r.selection])) !== 0) {
                        return await PlayerShopManager.managePlayerShops(sourceEntity, all);
                    }
                    else {
                        return 0;
                    }
            }
        })
            .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
    }
    static async addPlayerShop(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ModalFormData();
        form.title(`New Shop`);
        form.textField(`§l§fShop ID§r§c*§f\nThe ID of the shop`, "myShop", "myShop");
        form.textField(`§l§fButton Title§r§f\nThe title of the button for this shop.`, `${sourceEntity.name ?? sourceEntity.nameTag}'s Shop`, `${sourceEntity.name ?? sourceEntity.nameTag}'s Shop`);
        form.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, `${sourceEntity.name ?? sourceEntity.nameTag}'s Shop`, `${sourceEntity.name ?? sourceEntity.nameTag}'s Shop`);
        form.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, `This is ${sourceEntity.name ?? sourceEntity.nameTag}'s shop.`, `This is ${sourceEntity.name ?? sourceEntity.nameTag}'s shop.`);
        form.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, true);
        form.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, true); /*
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewplayershops command, default is true`, true)*/
        form.submitButton("Save");
        return (await form.forceShow(sourceEntity)
            .then(async (t) => {
            if (t.canceled) {
                return 1;
            }
            let [id, name, title, mainPageBodyText, buyShop, sellShop /*, publicShop*/] = t.formValues;
            const shop = new PlayerShop({
                id: `playerShop:${sourceEntity.id}:${id}`,
                name: JSON.parse('"' + name.replaceAll('"', '\\"') + '"'),
                title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                mainPageBodyText: JSON.parse('"' + mainPageBodyText.replaceAll('"', '\\"') + '"'),
                buyShop: buyShop,
                sellShop: sellShop,
                publicShop: true,
                playerID: sourceEntity.id,
                playerName: sourceEntity.name ?? sourceEntity.nameTag,
            });
            shop.save();
            return 1;
        })
            .catch((e) => {
            console.error(e, e.stack);
            return 0;
        }));
    }
    static async addPlayerShopAsPlayer(sourceEntitya, targetPlayerID, targetPlayerName) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ModalFormData();
        form.title(`New Shop As Player`);
        form.textField(`§l§fShop ID§r§c*§f\nThe ID of the shop`, "myShop", "myShop");
        form.textField(`§l§fButton Title§r§f\nThe title of the button for this shop\n§o§7Currently only shows up in the menu to edit the shops.`, "My Shop", "My Shop");
        form.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", "My Shop");
        form.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "This is my shop.", "This is my shop.");
        form.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, true);
        form.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, true); /*
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewplayershops command, default is true`, true)*/
        form.submitButton("Save");
        return (await form.forceShow(sourceEntity)
            .then(async (t) => {
            if (t.canceled) {
                return 1;
            }
            let [id, name, title, mainPageBodyText, buyShop, sellShop /*, publicShop*/] = t.formValues;
            const shop = new PlayerShop({
                id: `playerShop:${targetPlayerID}:${id}`,
                name: JSON.parse('"' + name.replaceAll('"', '\\"') + '"'),
                title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                mainPageBodyText: JSON.parse('"' + mainPageBodyText.replaceAll('"', '\\"') + '"'),
                buyShop: buyShop,
                sellShop: sellShop,
                publicShop: true,
                playerID: targetPlayerID,
                playerName: targetPlayerName,
            });
            shop.save();
            return 1;
        })
            .catch((e) => {
            console.error(e, e.stack);
            return 0;
        }));
    }
    static async managePlayerShop(sourceEntitya, shop) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage " + shop.title);
        form.body(`ID: ${shop.id}
Display Name: ${shop.name}
Title: ${shop.title}
Is Buy Shop: ${shop.buyShop ? "§aTrue" : "§cFalse"}
§rIs Sell Shop: ${shop.sellShop ? "§aTrue" : "§cFalse"}
§rOwner UUID: ${shop.playerID}
§rOwner Name: ${shop.playerName}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Items/Pages", "textures/ui/book_edit_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Shop Settings", "textures/ui/icon_setting");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Withdraw Items", "textures/ui/download_backup");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Regenerate Storage Entity", "textures/ui/structure_block_load" /*textures/ui/ui_debug_glyph_color*/);
        form.button(customFormUICodes.action.buttons.positions.main_only + "View Shop", "textures/ui/feedIcon");
        if (config.system.debugMode) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Buy Shop Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Buy Shop JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Sell Shop Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Sell Shop JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return (await form.forceShow(sourceEntity)
            .then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (response) {
                case 0:
                    if (shop.buyShop && shop.sellShop) {
                        if ((await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, (await showMessage(sourceEntity, "Manage Buy or Sell Shop", "Would you like to edit the buy shop or the sell shop?\nThe buy shop is where players buy items, while the sell shop is where players sell items.", "Edit Buy Shop", "Edit Sell Shop")).selection == 0
                            ? "buy"
                            : "sell")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else if (shop.buyShop) {
                        if ((await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, "buy")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else if (shop.sellShop) {
                        if ((await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, "sell")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await showMessage(sourceEntity, "§cInvalid Shop Settings", "§cError: Invalid Shop Settings.\nA shop cannot have both the §eBuy Shop§c and §eSell Shop§c options disabled.", "Back", "Close")).selection != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                case 1:
                    if ((await PlayerShopManager.managePlayerShop_settings(sourceEntity, shop)) != 0) {
                        return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    }
                    else {
                        return 0;
                    }
                case 2:
                    try {
                        world.structureManager.place("andexdbPlayerShopRecievedShopItemsStorage:" + shop.playerID, sourceEntity.dimension, Vector.add(sourceEntity.location, { x: 0, y: 10, z: 0 }), { includeBlocks: false, includeEntities: true });
                    }
                    catch (e) {
                        if (e instanceof InvalidStructureError) {
                            shop.createStorageEntity(sourceEntity);
                        }
                        else {
                            throw e;
                        }
                    }
                    const entity = sourceEntity.dimension
                        .getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, { x: 0, y: 10, z: 0 }))
                        .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:recievedShopItemsStoragePlayerID"))) == shop.playerID);
                    if (!!!entity) {
                        throw new ReferenceError(`Unable to get the storage entity.`);
                    }
                    try {
                        world.structureManager.delete("andexdbPlayerShopRecievedShopItemsStorage:" + shop.playerID);
                    }
                    catch { }
                    try {
                        containerToItemStackArray(entity.getComponent("inventory")?.container).forEach((v) => tryrun(() => {
                            sourceEntity.dimension.spawnItem(v, sourceEntity.location);
                        }));
                        entity.getComponent("inventory")?.container?.clearAll();
                    }
                    catch { }
                    /**
                     * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                     */
                    var otherEntities = tryget(() => sourceEntity.dimension
                        .getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, { x: 0, y: 10, z: 0 }))
                        .filter((v) => v.id != entity.id)) ?? [];
                    var locs = otherEntities.map((v) => v.location);
                    otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                    world.structureManager.createFromWorld("andexdbPlayerShopRecievedShopItemsStorage:" + shop.playerID, sourceEntity.dimension, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y) + 10,
                        z: Math.floor(sourceEntity.location.z),
                    }, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y) + 10,
                        z: Math.floor(sourceEntity.location.z),
                    }, {
                        includeBlocks: false,
                        includeEntities: true,
                        saveMode: StructureSaveMode.World,
                    });
                    otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                    entity.remove();
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case 3:
                    if ((await showMessage(sourceEntity, "Are You Sure?", 'Are you sure you want to do this? You should only do this if people are getting errors saying that it was "Unable to get the storage entity" while they are trying to sell items in your shop. §eCAUTION!: DOING THIS WILL RESULT IN ANY ITEMS THAT PLAYERS HAVE SOLD TO YOU IN YOUR SHOP, THAT YOU HAVEN\'T WITHDRAWN, BEING DELETED!', "Cancel", "I'm Sure")).selection == 1) {
                        await shop.createStorageEntity(sourceEntity);
                    }
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case 4:
                    if (shop.buyShop && shop.sellShop) {
                        if ((await shop.openShop(sourceEntity, "both")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else if (shop.buyShop) {
                        if ((await shop.openShop(sourceEntity, "buy")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else if (shop.sellShop) {
                        if ((await shop.openShop(sourceEntity, "sell")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await shop.openShop(sourceEntity, "none")) != 0) {
                            return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                        }
                        else {
                            return 0;
                        }
                    }
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 5 : -5:
                    await showActions(sourceEntity, "Debug Info", `Raw Shop Data: \n${JSON.stringify(shop, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 6 : -6:
                    const formb = new ModalFormData().title("Edit Raw Shop Data");
                    let data = Object.entries(JSON.parse(JSON.stringify(shop)));
                    data.forEach((v) => formb.textField(v[0], typeof v[1], JSON.stringify(v[1])));
                    const rd = await formb.forceShow(sourceEntity);
                    if (rd.canceled) {
                        return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    }
                    let newData = Object.fromEntries(data.map((v, i) => [v[0], JSON.parse(rd.formValues?.[i])]));
                    shop.id = newData.id;
                    shop.title = newData.title;
                    shop.mainPageBodyText = newData.mainPageBodyText;
                    shop.mainSellPageBodyText = newData.mainSellPageBodyText;
                    shop.mainBuyPageBodyText = newData.mainBuyPageBodyText;
                    shop.name = newData.name;
                    shop.buyShop = newData.buyShop;
                    shop.sellShop = newData.sellShop;
                    shop.publicShop = newData.publicShop;
                    shop.playerID = newData.playerID;
                    shop.playerName = newData.playerName;
                    shop.save();
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 7 : -7:
                    const formc = new ModalFormData().title("Edit JSON Shop Data");
                    formc.textField("JSON", "JSON", JSON.stringify(shop));
                    const re = await formc.forceShow(sourceEntity);
                    if (re.canceled) {
                        return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    }
                    let newDataB = JSON.parse(re.formValues?.[0]);
                    shop.id = newDataB.id;
                    shop.title = newDataB.title;
                    shop.mainPageBodyText = newDataB.mainPageBodyText;
                    shop.mainSellPageBodyText = newDataB.mainSellPageBodyText;
                    shop.mainBuyPageBodyText = newDataB.mainBuyPageBodyText;
                    shop.name = newDataB.name;
                    shop.buyShop = newDataB.buyShop ?? true;
                    shop.sellShop = newDataB.sellShop ?? true;
                    shop.publicShop = newDataB.publicShop ?? true;
                    shop.playerID = newDataB.playerID;
                    shop.playerName = newDataB.playerName;
                    shop.save();
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 8 : -8:
                    await showActions(sourceEntity, "Debug Info", `Raw Buy Shop Data: \n${JSON.stringify(shop.buyData, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 9 : -9:
                    const formd = new ModalFormData().title("Edit JSON Buy Shop Data");
                    formd.textField("JSON", "JSON", JSON.stringify(shop.buyData));
                    const rf = await formd.forceShow(sourceEntity);
                    if (rf.canceled) {
                        return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    }
                    let newDataC = JSON.parse(rf.formValues?.[0]);
                    shop.sellData = newDataC;
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 10 : -10:
                    await showActions(sourceEntity, "Debug Info", `Raw Sell Shop Data: \n${JSON.stringify(shop.sellData, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case sourceEntity.hasTag("admin") && config.system.debugMode ? 11 : -11:
                    const forme = new ModalFormData().title("Edit JSON Sell Shop Data");
                    forme.textField("JSON", "JSON", JSON.stringify(shop.sellData));
                    const rg = await forme.forceShow(sourceEntity);
                    if (rg.canceled) {
                        return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    }
                    let newDataD = JSON.parse(rg.formValues?.[0]);
                    shop.sellData = newDataD;
                    return await PlayerShopManager.managePlayerShop(sourceEntity, shop);
                case 5 + +(sourceEntity.hasTag("admin") && config.system.debugMode) * 7:
                    // PlayerShopManager.managePlayerShops(sourceEntity)
                    return 1;
                case 6 + +(sourceEntity.hasTag("admin") && config.system.debugMode) * 7:
                    return 0;
                default:
                    return 0;
            }
        })
            .catch((e) => {
            console.error(e, e.stack);
            return 1;
        }));
    }
    static async managePlayerShop_settings(sourceEntitya, shop) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ModalFormData();
        form.title(`${shop.title} Settings`);
        form.textField(`§l§fButton Title§r§f\nThe title of the button for this shop`, "My Shop", JSON.stringify(shop.name ?? "")
            .slice(1, -1)
            .replaceAll('\\"', '"'));
        form.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.title ?? "")
            .slice(1, -1)
            .replaceAll('\\"', '"'));
        form.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.mainPageBodyText ?? "")
            .slice(1, -1)
            .replaceAll('\\"', '"'));
        form.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, shop.buyShop ?? true);
        form.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, shop.sellShop ?? true); /*
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewplayershops command, default is true`, shop.publicShop??true)*/
        if (config.system.debugMode) {
            form.textField(`§l§fOwner ID\n§c(Only Editable By Admins) §8(Only Editable While Debug Mode Is Enabled)`, shop.playerID, shop.playerID);
            form.textField(`§l§fOwner Name\n§c(Only Editable By Admins) §8(Only Editable While Debug Mode Is Enabled)`, JSON.stringify(shop.playerName).slice(1, -1).replaceAll('\\"', '"'), JSON.stringify(shop.playerName).slice(1, -1).replaceAll('\\"', '"'));
        }
        form.submitButton("Save");
        return (await form.forceShow(sourceEntity)
            .then(async (t) => {
            if (t.canceled) {
                return 1;
            }
            let [name, title, mainPageBodyText, buyShop, sellShop /*, publicShop*/, playerID, playerName] = t.formValues;
            shop.name = JSON.parse('"' + name.replaceAll('"', '\\"') + '"');
            shop.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
            shop.mainPageBodyText = JSON.parse('"' + mainPageBodyText.replaceAll('"', '\\"') + '"');
            shop.buyShop = buyShop;
            shop.sellShop = sellShop;
            shop.publicShop = shop.publicShop;
            if (config.system.debugMode) {
                shop.playerID = playerID;
                shop.playerName = JSON.parse('"' + playerName.replaceAll('"', '\\"') + '"');
            }
            shop.save();
            // PlayerShopManager.managePlayerShop(sourceEntity, shop);
            return 1;
        })
            .catch((e) => {
            console.error(e, e.stack);
            return 1;
        }));
    }
    static async managePlayerShop_contents(sourceEntitya, shop, mode = "buy") {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        let form = new ActionFormData();
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}Manage ${shop.title ?? ""} Contents`);
        if (!!shop.mainPageBodyText)
            form.body(shop.mainPageBodyText);
        const shopData = tryget(() => {
            return shop[(mode + "Data")];
        }) ?? [];
        shopData.forEach((s) => {
            form.button(customFormUICodes.action.buttons.positions.main_only + s.title, (s.texture ?? "") === "" ? (s.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : s.texture);
        });
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Add Item", "textures/ui/book_addpicture_default");
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Add Page", "textures/ui/book_addtextpage_default");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return (await form.forceShow(sourceEntity)
            .then(async (r) => {
            if (r.canceled)
                return 1;
            assertIsDefined(r.selection);
            let response = r.selection;
            switch (response) {
                case shopData.length:
                    const type = mode == "buy" ? "player_shop_saved" : "player_shop_sellable";
                    if (type == "player_shop_saved") {
                        const item = await itemSelector(sourceEntity, sourceEntity, () => { } /*, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode*/);
                        if (!item.item.hasItem()) {
                            if ((await showMessage(sourceEntity, "", `You cannot sell this item because that slot is empty.`, "Back", "Close"))
                                .selection != 0) {
                                return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                            }
                            else {
                                return 0;
                            }
                        }
                        if ((item?.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems) ||
                            (item?.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems) ||
                            (item?.item?.keepOnDeath == true && !config.shopSystem.player.allowSellingKeepOnDeathItems)) {
                            if ((await showMessage(sourceEntity, "", `You cannot sell this item because ${item.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems
                                ? "selling items that are locked to your inventory is disabled"
                                : item.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems
                                    ? "selling items that are locked to a specific inventory slot is disabled"
                                    : item.item?.keepOnDeath == true && !config.shopSystem.player.allowSellingKeepOnDeathItems
                                        ? "selling items that have the keep on death property is disabled"
                                        : !item.item.hasItem()
                                            ? "that slot is empty"
                                            : "of an unknown reason"}.`, "Back", "Close")).selection != 0) {
                                return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                            }
                            else {
                                return 0;
                            }
                        }
                        const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", {
                            x: Math.floor(sourceEntity.location.x) + 0.5,
                            y: Math.floor(sourceEntity.location.y) + 10.5,
                            z: Math.floor(sourceEntity.location.z) + 0.5,
                        });
                        const entityID = getSuperUniqueID();
                        entity.setDynamicProperty("andexdb:saved_player_shop_item_save_id", entityID);
                        entity.getComponent("inventory")?.container?.setItem(0, item.item.getItem());
                        world.structureManager.createFromWorld("andexdbSavedPlayerShopItem:" + entityID, sourceEntity.dimension, {
                            x: Math.floor(sourceEntity.location.x),
                            y: Math.floor(sourceEntity.location.y) + 10,
                            z: Math.floor(sourceEntity.location.z),
                        }, {
                            x: Math.floor(sourceEntity.location.x),
                            y: Math.floor(sourceEntity.location.y) + 10,
                            z: Math.floor(sourceEntity.location.z),
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World,
                        });
                        const form = new ModalFormData();
                        form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick");
                        form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/items/stick");
                        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
                        form.textField("Price§c*", "10", "10");
                        form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
                        const r = await form.forceShow(sourceEntity);
                        let [title, texture, itemIndex, price, step] = r.formValues;
                        const itemB = {
                            type: "player_shop_item",
                            itemType: "player_shop_saved",
                            title: title,
                            texture: texture,
                            price: Number.isNaN(Number(price)) ? 10 : Number(price),
                            step: Math.min(Number.isNaN(Number(step)) ? 1 : Number(step), item.item.maxAmount),
                            maxStackSize: item.item.maxAmount,
                            structureID: "andexdbSavedPlayerShopItem:" + entityID,
                            entityID: entityID,
                            remainingStock: item.item.amount,
                            itemDetails: {
                                damage: tryget(() => item.item.getItem()?.getComponent("durability")?.damage) ?? NaN,
                                maxDurability: tryget(() => item.item.getItem()?.getComponent("durability")?.maxDurability) ?? NaN,
                                keepOnDeath: item.item.keepOnDeath,
                                lockMode: item.item.lockMode,
                                loreLineCount: item.item.getLore().length,
                                typeId: item.item.typeId,
                                nameTag: item.item.nameTag,
                                enchantments: tryget(() => item.item.getItem()?.getComponent("enchantable")?.getEnchantments()) ??
                                    "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.",
                            },
                            playerID: sourceEntity.id,
                        };
                        item.item.setItem();
                        let itemIndexB = Number.isNaN(Number(itemIndex)) ? (mode == "buy" ? shop.buyData.length : shop.sellData.length) : Number(itemIndex);
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(itemIndexB, 0, itemB);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(itemIndexB, 0, itemB);
                            shop.sellData = newData;
                        }
                        return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    else if (!!!type) {
                        return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    else {
                        await PlayerShopManager.managePlayerShop_addItem(sourceEntity, shop, type, mode);
                        return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                case shopData.length + 1:
                    await PlayerShopManager.managePlayerShop_addPage(sourceEntity, shop, mode);
                    return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                case shopData.length + 2:
                    // PlayerShopManager.managePlayerShop(sourceEntity, shop)
                    return 1;
                case shopData.length + 3:
                    return 0;
                default:
                    if ((shopData[response].type == "player_shop_item"
                        ? await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, shopData[response], response, mode)
                        : await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, shopData[response], response, mode)) == 1) {
                        return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    else {
                        return 0;
                    }
            }
        })
            .catch(async (e) => {
            try {
                return ((await showMessage(sourceEntity, "§cError", `§c${e} ${e.stack}`, "Back", "Close")).selection == 0).toNumber();
            }
            catch {
                console.error(e, e.stack);
                return 0;
            }
        }));
    }
    static async managePlayerShop_manageItem(sourceEntitya, shop, item, itemIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage " + item.title);
        form.body(`Type: ${item.itemType}
Title: ${item.title}
Texture: ${item.texture}
${mode == "buy" ? "Purchase" : "Sell"} Amount Step: ${item.step}
${item.itemType == "player_shop_saved"
            ? `Maximum Stock: ${item.maxStackSize}
Remaining Stock: ${item.remainingStock}`
            : `Amount Still Wanted: ${item.amountWanted}
Current Amount: ${item.currentAmount}`}
${mode == "buy" ? "Price" : "Value"}: ${mode == "buy" ? item.price : item.value}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Move Item", "textures/ui/move");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Item", "textures/ui/book_edit_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Delete Item", "textures/ui/book_trash_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Apply Texture Preset", "textures/items/map_locked");
        const showRestockButton = mode == "buy" && item?.remainingStock < item?.maxStackSize;
        if (showRestockButton) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Restock Item", "textures/ui/upload_glyph");
        }
        const debugMode = config.system.debugMode;
        if (debugMode) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            if (mode == "buy") {
                form.button(customFormUICodes.action.buttons.positions.main_only + "Load Structure\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/xyz_axis");
            }
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity).then(async (r) => {
            if (r.canceled)
                return 1;
            switch (cullUndefined([
                "move",
                "edit",
                "delete",
                "applyTexturePreset",
                showRestockButton ? "restock" : undefined,
                ...(debugMode ? ["rawData", "editRaw", "editJSON", mode == "buy" ? "loadStructure" : undefined] : []),
                "back",
                "close",
            ])[r.selection]) {
                case "move": {
                    const form = new ModalFormData();
                    form.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex));
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled)
                        return 1;
                    assertIsDefined(r.formValues);
                    if (!Number.isNaN(Number(r.formValues[0]))) {
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(itemIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, item);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(itemIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, item);
                            shop.sellData = newData;
                        }
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, Number(r.formValues[0]), mode);
                    }
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                }
                case "edit":
                    // Testing if the function below returns 1 is not neccessary here because the function below does not return a 1 or 0.
                    await PlayerShopManager.managePlayerShop_editItem(sourceEntity, shop, item, itemIndex, mode);
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                case "delete":
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes");
                    if (sureOfItemDeletion.selection === 1) {
                        if (mode == "buy") {
                            world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = sourceEntity.dimension
                                .getEntitiesAtBlockLocation(sourceEntity.location)
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) ==
                                item.entityID);
                            if (!!entity) {
                                const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                                entity.remove();
                                sourceEntity.dimension.spawnItem(itemStack, sourceEntity.location);
                            }
                            world.structureManager.delete(item.structureID);
                            let newData = shop.buyData;
                            newData.splice(itemIndex, 1);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(itemIndex, 1);
                            shop.sellData = newData;
                        }
                        return 1;
                    }
                    else {
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    }
                case "applyTexturePreset": {
                    const r = await selectTexturePreset(sourceEntity);
                    if (r === 1)
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    if (r === 0)
                        return 0;
                    item.texture = r;
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(itemIndex, 1, item);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(itemIndex, 1, item);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                }
                case "restock": {
                    const itemb = await itemSelector(sourceEntity, sourceEntity, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode);
                    if (!itemb.item.hasItem()) {
                        if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected slot because that slot is empty`, "Back", "Close")).selection != 1) {
                            return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                        }
                        else {
                            return 0;
                        }
                    }
                    world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                        includeBlocks: false,
                        includeEntities: true,
                    });
                    const entity = sourceEntity.dimension
                        .getEntitiesAtBlockLocation(sourceEntity.location)
                        .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                    if (!!entity) {
                        const itemc = item;
                        const player = sourceEntity;
                        const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                        entity.remove();
                        if (!!!itemStack) {
                            if ((itemb?.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems) ||
                                (itemb?.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems) ||
                                (itemb?.item?.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems)) {
                                if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected item because ${itemb.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems
                                    ? "selling items that are locked to your inventory is disabled"
                                    : itemb.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems
                                        ? "selling items that are locked to a specific inventory slot is disabled"
                                        : itemb.item?.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems
                                            ? "selling items that have the keep on death property is disabled"
                                            : "of an unknown reason"}.`, "Back", "Close")).selection != 0) {
                                    return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                                }
                                else {
                                    return 0;
                                }
                            }
                            if (itemc.itemDetails.typeId != itemb.item.typeId) {
                                if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected item because they are different item types.`, "Back", "Close")).selection != 0) {
                                    return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                                }
                                else {
                                    return 0;
                                }
                            }
                            world.structureManager.place(itemc.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == itemc.entityID);
                            if (!!!entity) {
                                throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${itemc.entityID} was found inside of the specified structure.`);
                            }
                            // const itemStackC = itemb.item.getItem()
                            const leftOverItemStack = entity.getComponent("inventory")?.container?.addItem(itemb.item.getItem());
                            const itemStackB = entity.getComponent("inventory")?.container?.getItem(0);
                            itemb.item.setItem(leftOverItemStack);
                            try {
                                world.structureManager.delete(itemc.structureID);
                            }
                            catch { }
                            /**
                             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                             */
                            var otherEntities = tryget(() => player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .filter((v) => v.id != entity.id)) ?? [];
                            var locs = otherEntities.map((v) => v.location);
                            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                            try {
                                world.structureManager.createFromWorld(itemc.structureID, player.dimension, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    includeBlocks: false,
                                    includeEntities: true,
                                    saveMode: StructureSaveMode.World,
                                });
                                itemc.remainingStock = itemStackB.amount;
                                itemc.itemDetails = {
                                    damage: tryget(() => itemStackB.getComponent("durability")?.damage) ?? NaN,
                                    maxDurability: tryget(() => itemStackB.getComponent("durability")?.maxDurability) ?? NaN,
                                    keepOnDeath: itemStackB.keepOnDeath,
                                    lockMode: itemStackB.lockMode,
                                    loreLineCount: itemStackB.getLore().length,
                                    typeId: itemStackB.typeId,
                                    nameTag: itemStackB.nameTag,
                                    enchantments: tryget(() => itemStackB.getComponent("enchantable")?.getEnchantments()) ??
                                        "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.",
                                };
                                let newData = shop.buyData;
                                newData.splice(itemIndex, 1, itemc);
                                shop.buyData = newData;
                            }
                            catch (e) {
                                return ((await showMessage(player, "An Error Has occurred", e instanceof Error ? e.stringify() : e + " " + e?.stack, "Go Back", "Close Shop")).selection == 1).toNumber();
                            }
                            finally {
                                try {
                                    otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                                }
                                catch { }
                                try {
                                    entity.remove();
                                }
                                catch { }
                            }
                        }
                        else if (itemStack.isStackableWith(itemb.item.getItem())) {
                            world.structureManager.place(itemc.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == itemc.entityID);
                            if (!!!entity) {
                                throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${itemc.entityID} was found inside of the specified structure.`);
                            }
                            const leftOverItemStack = entity.getComponent("inventory")?.container?.addItem(itemb.item.getItem());
                            const itemStackB = entity.getComponent("inventory")?.container?.getItem(0);
                            itemb.item.setItem(leftOverItemStack);
                            try {
                                world.structureManager.delete(itemc.structureID);
                            }
                            catch { }
                            /**
                             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                             */
                            var otherEntities = tryget(() => player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .filter((v) => v.id != entity.id)) ?? [];
                            var locs = otherEntities.map((v) => v.location);
                            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                            try {
                                world.structureManager.createFromWorld(itemc.structureID, player.dimension, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    includeBlocks: false,
                                    includeEntities: true,
                                    saveMode: StructureSaveMode.World,
                                });
                                itemc.remainingStock += itemStackB.amount;
                                let newData = shop.buyData;
                                newData.splice(itemIndex, 1, itemc);
                                shop.buyData = newData;
                            }
                            catch (e) {
                                return ((await showMessage(player, "An Error Has occurred", e instanceof Error ? e.stringify() : e + " " + e?.stack, "Go Back", "Close Shop")).selection == 1).toNumber();
                            }
                            finally {
                                try {
                                    otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                                }
                                catch { }
                                try {
                                    entity.remove();
                                }
                                catch { }
                            }
                        }
                        else {
                            if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected slot because the two items are not stackable with each other`, "Back", "Close")).selection != 0) {
                                return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                            }
                            else {
                                return 0;
                            }
                        }
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, itemc, itemIndex, mode);
                    }
                    else {
                        if ((await showMessage(sourceEntity, "", `Something went wrong and the entity that stores this item cannot be found in its structure. Please try again later. If the issue persists then the item is gone and you should just delete it.`, "Back", "Close")).selection != 1) {
                            return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                        }
                        else {
                            return 0;
                        }
                    }
                    // return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode)
                }
                case "rawData":
                    await showActions(sourceEntity, "Debug Info", `Raw Item Data: \n${JSON.stringify(item, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                case "editRaw":
                    const formb = new ModalFormData().title("Edit Raw Item Data");
                    let data = Object.entries(item);
                    data.forEach((v) => formb.textField(v[0], typeof v[1], JSON.stringify(v[1])));
                    const rd = await formb.forceShow(sourceEntity);
                    if (rd.canceled) {
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    }
                    let newItemData = Object.fromEntries(data.map((v, i) => [v[0], JSON.parse(rd.formValues?.[i])]));
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(itemIndex, 1, newItemData);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(itemIndex, 1, newItemData);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, newItemData, itemIndex, mode);
                case "editJSON":
                    const formc = new ModalFormData().title("Edit JSON Item Data");
                    let datab = Object.entries(item);
                    formc.textField("JSON", "JSON", JSON.stringify(datab));
                    const re = await formc.forceShow(sourceEntity);
                    if (re.canceled) {
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    }
                    let newItemDataB = JSON.parse(re.formValues?.[0]);
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(itemIndex, 1, newItemDataB);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(itemIndex, 1, newItemDataB);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, newItemDataB, itemIndex, mode);
                case "loadStructure":
                    world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                        includeBlocks: false,
                        includeEntities: true,
                    });
                    if ((await showMessage(sourceEntity, "", `The structure has "§a${item.structureID}§r" been loaded. Would you like to close the shop?`, "Close Shop", "Go Back")).selection != 0) {
                        return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 0;
            }
        });
    }
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
    static async managePlayerShop_editItem(sourceEntitya, shop, item, itemIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ModalFormData();
        form.title("Edit " + item.title);
        if (item.itemType == "player_shop_saved") {
            form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Price§c*", "10", String(item.price));
            form.textField(`Purchase Amount Step\n§oDefault is 1\nMax is ${item.maxStackSize}`, "1", String(item.step ?? 1)); /*
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_player_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))*/
        }
        else if (item.itemType == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Value§c*", "10", String(item.value));
            form.textField('Sell Amount Step\n§oDefault is 1\nCannot be higher than the "Amount Wanted" value', "1", String(item.step ?? 1));
            form.textField("Amount Wanted\n§oDefault is 64", "64", String(item.amountWanted ?? 64));
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll('\\"', '"'));
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            if (item.itemType == "player_shop_saved") {
                let [title, texture, price, step] = r.formValues;
                item.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
                item.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"');
                item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step); /*
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")*/
            }
            else if (item.itemType == "player_shop_sellable") {
                let [title, texture, value, step, amountWanted, itemID] = r.formValues;
                item.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
                item.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"');
                item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
                item.amountWanted = +Number.isNaN(Number(amountWanted)) ? 10 : Number(amountWanted);
                item.itemID = JSON.parse('"' + itemID.replaceAll('"', '\\"') + '"');
            }
            if (mode == "buy") {
                let newData = shop.buyData;
                newData.splice(itemIndex, 1, item);
                shop.buyData = newData;
            }
            else if (mode == "sell") {
                let newData = shop.sellData;
                newData.splice(itemIndex, 1, item);
                shop.sellData = newData;
            }
            return r;
        });
    }
    /**
     * Opens the UI for editing a player shop item.
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param item The shop item that the player is editing.
     * @param itemIndex The index of the shop item that is being edited in the shop page, it is zero-indexed.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static async managePlayerShop_editAdvancedItem(sourceEntitya, shop, item, itemIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ModalFormData();
        form.title("Edit " + item.title);
        if (item.itemType == "player_shop_sellable_advanced") {
            form.textField("§7Sellable Item Type: player_shop_sellable_advanced\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Value§c*", "10", String(item.value));
            form.textField('Sell Amount Step\n§oDefault is 1\nCannot be higher than the "Amount Wanted" value', "1", String(item.step ?? 1));
            form.textField("Amount Wanted\n§oDefault is 64", "64", String(item.amountWanted ?? 64));
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll('\\"', '"'));
            // form.textField("Data Value§c*", "0", String(item))
            form.toggle("Ignore Name Tag", !!!item.extraRestrictions.nameTag);
            form.textField("Name Tag\nType: string", "No name tag", JSON.stringify(item.extraRestrictions.nameTag ?? "")
                .slice(1, -1)
                .replaceAll('\\"', '"'));
            form.toggle("Ignore Lore", !!!item.extraRestrictions.lore);
            form.textField("Lore\nType: JSONArray", "No lore", !!item.extraRestrictions.lore ? JSON.stringify(item.extraRestrictions.lore) : "");
            form.toggle("Ignore Can Place On", !!!item.extraRestrictions.canPlaceOn);
            form.textField("Can Place On\nType: JSONArray", "No can place on", !!item.extraRestrictions.canPlaceOn ? JSON.stringify(item.extraRestrictions.canPlaceOn) : "");
            form.toggle("Ignore Can Destroy", !!!item.extraRestrictions.canDestroy);
            form.textField("Can Destroy\nType: JSONArray", "No can destroy", !!item.extraRestrictions.canDestroy ? JSON.stringify(item.extraRestrictions.canDestroy) : "");
            form.dropdown("Keep On Death", ["Ignore keep on death", "Require keep on death", "Require not keep on death"], !!item.extraRestrictions.keepOnDeath ? +item.extraRestrictions.keepOnDeath : 0);
            form.dropdown("Lock Mode", ["Ignore lock mode", "Require inventory lock", "Require slot lock", "Require no lock"], !!item.extraRestrictions.lockMode ? [undefined, "inventory", "slot", "none"].indexOf(item.extraRestrictions.lockMode) : 0);
            form.textField("Minimum Durability\nLeave blank to ignore minimum durability\nType: int", "Ignore minimum durability", String(item.extraRestrictions.minimumDurability ?? ""));
            form.textField("Maximum Durability\nLeave blank to ignore maximum durability\nType: int", "Ignore maximum durability", String(item.extraRestrictions.maximumDurability ?? ""));
        }
        return await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            if (item.itemType == "player_shop_sellable_advanced") {
                let [title, texture, value, step, amountWanted, itemID, ignoreNameTag, nameTag, ignoreLore, lore, ignoreCanDestroy, canDestroy, ignoreCanPlaceOn, canPlaceOn, keepOnDeath, lockMode, minimumDurability, maximumDurability,] = r.formValues;
                item.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
                item.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"');
                item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
                item.amountWanted = +Number.isNaN(Number(amountWanted)) ? 10 : Number(amountWanted);
                item.itemID = JSON.parse('"' + itemID.replaceAll('"', '\\"') + '"');
                item.extraRestrictions.nameTag = ignoreNameTag ? null : JSON.parse('"' + nameTag.replaceAll('"', '\\"') + '"');
            }
            if (mode == "sell") {
                let newData = shop.sellData;
                newData.splice(itemIndex, 1, item);
                shop.sellData = newData;
            }
            return r;
        });
    }
    /**
     * Opens the UI for editing a player shop item.
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param type The type of the shop item that the player is adding.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static async managePlayerShop_addItem(sourceEntitya, shop, type, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ModalFormData();
        form.title("Add Item");
        if (type == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick");
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint);
            form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
            form.textField("Value§c*", "10", "10");
            form.textField('Sell Amount Step\n§oDefault is 1\nCannot be higher than the "Amount Wanted" value', "1", "1");
            form.textField("Amount Wanted\n§oDefault is 64", "64", "64");
            form.textField("Item Type§c*", "minecraft:stick");
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            assertIsDefined(r.formValues);
            let item = undefined;
            let itemIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            if (type == "player_shop_sellable") {
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues;
                item = {
                    type: "player_shop_item",
                    itemType: "player_shop_sellable",
                    title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                    texture: JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'),
                    value: Number.isNaN(Number(value)) ? 10 : Number(value),
                    step: Number.isNaN(Number(step)) ? 10 : Number(step),
                    amountWanted: Number.isNaN(Number(max)) ? 10 : Number(max),
                    itemID: JSON.parse('"' + (itemID.replaceAll('"', '\\"') + '"')),
                    currentAmount: 0,
                    playerID: sourceEntity.id,
                };
            }
            if (mode == "buy") {
                let newData = shop.buyData;
                newData.splice(itemIndex, 0, item);
                shop.buyData = newData;
            }
            else if (mode == "sell") {
                let newData = shop.sellData;
                newData.splice(itemIndex, 0, item);
                shop.sellData = newData;
            }
            return r;
        });
    }
    static async managePlayerShop_managePage(sourceEntitya, shop, page, pageIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage " + page.pageTitle);
        form.body(`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Contents", "textures/ui/bookshelf_flat");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Move Page", "textures/ui/move");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Page", "textures/ui/book_edit_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Delete Page", "textures/ui/book_trash_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Apply Texture Preset", "textures/items/map_locked");
        const debugMode = config.system.debugMode;
        if (debugMode) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity).then(async (r) => {
            if (r.canceled)
                return 1;
            switch (cullUndefined([
                "contents",
                "move",
                "edit",
                "delete",
                "applyTexturePreset",
                ...(debugMode ? ["rawData", "editRaw", "editJSON"] : []),
                "back",
                "close",
            ])[r.selection]) {
                case "contents":
                    if ((await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, [mode, String(pageIndex)])) === 1) {
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    }
                    else {
                        return 0;
                    }
                case "move": {
                    const form = new ModalFormData();
                    form.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex));
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled)
                        return 1;
                    assertIsDefined(r.formValues);
                    if (!Number.isNaN(Number(r.formValues[0]))) {
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(pageIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, page);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(pageIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, page);
                            shop.sellData = newData;
                        }
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, Number(r.formValues[0]), mode);
                    }
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                }
                case "edit":
                    await PlayerShopManager.managePlayerShop_editPage(sourceEntity, shop, page, pageIndex, mode);
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                case "delete":
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this page?", "No", "Yes");
                    if (sureOfItemDeletion.selection == 1) {
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(pageIndex, 1);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(pageIndex, 1);
                            shop.sellData = newData;
                        }
                        return 1;
                    }
                    else {
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    }
                case "applyTexturePreset": {
                    const r = await selectTexturePreset(sourceEntity);
                    if (r === 1)
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    if (r === 0)
                        return 0;
                    page.texture = r;
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(pageIndex, 1, page);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(pageIndex, 1, page);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                }
                case "rawData":
                    await showActions(sourceEntity, "Debug Info", `Raw Page Data: \n${JSON.stringify(page, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                case "editRaw":
                    const formb = new ModalFormData().title("Edit Raw Page Data");
                    let data = Object.entries(page);
                    data.forEach((v) => formb.textField(v[0], typeof v[1], JSON.stringify(v[1])));
                    const rd = await formb.forceShow(sourceEntity);
                    if (rd.canceled) {
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    }
                    let newItemData = Object.fromEntries(data.map((v, i) => [v[0], JSON.parse(rd.formValues?.[i])]));
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(pageIndex, 1, newItemData);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(pageIndex, 1, newItemData);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, newItemData, pageIndex, mode);
                case "editJSON":
                    const formc = new ModalFormData().title("Edit JSON Page Data");
                    let datab = Object.entries(page);
                    formc.textField("JSON", "JSON", JSON.stringify(datab));
                    const re = await formc.forceShow(sourceEntity);
                    if (re.canceled) {
                        return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    }
                    let newItemDataB = JSON.parse(re.formValues?.[0]);
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(pageIndex, 1, newItemDataB);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(pageIndex, 1, newItemDataB);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, newItemDataB, pageIndex, mode);
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 0;
            }
        });
    }
    static async managePlayerShop_editPage(sourceEntitya, shop, page, pageIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ModalFormData();
        form.title("Edit Page");
        form.textField("§fPage Title§c*", "Category: Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll('\\"', '"'));
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            let [pageTitle, pageBody, title, texture] = r.formValues;
            (page.pageTitle = JSON.parse('"' + pageTitle.replaceAll('"', '\\"') + '"')),
                (page.pageBody = JSON.parse('"' + pageBody.replaceAll('"', '\\"') + '"')),
                (page.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"')),
                (page.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'));
            if (mode == "buy") {
                let newData = shop.buyData;
                newData.splice(pageIndex, 1, page);
                shop.buyData = newData;
            }
            else if (mode == "sell") {
                let newData = shop.sellData;
                newData.splice(pageIndex, 1, page);
                shop.sellData = newData;
            }
            return 1;
        }));
    }
    static async managePlayerShop_addPage(sourceEntitya, shop, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const form = new ModalFormData();
        form.title("Add Page");
        form.textField("§fPage Title§c*", "Category: Items");
        form.textField("§fPage Body§c*", "The items category.");
        form.textField("§fButton Title§c*", "Items");
        form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/ui/arrowRight");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            assertIsDefined(r.formValues);
            let page = undefined;
            let pageIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page = {
                type: "player_shop_page",
                pageTitle: JSON.parse('"' + pageTitle.replaceAll('"', '\\"') + '"'),
                pageBody: JSON.parse('"' + pageBody.replaceAll('"', '\\"') + '"'),
                title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                data: [],
                texture: JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'),
            };
            if (mode == "buy") {
                let newData = shop.buyData;
                newData.splice(pageIndex, 0, page);
                shop.buyData = newData;
            }
            else if (mode == "sell") {
                let newData = shop.sellData;
                newData.splice(pageIndex, 0, page);
                shop.sellData = newData;
            }
            return 1;
        }));
    }
    static async managePlayerShopPage_contents(sourceEntitya, shop, path) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        let form = new ActionFormData();
        const shopDataA = tryget(() => {
            return getPathInObject(shop[(mode + "Data")], path);
        }) ?? {};
        const shopData = tryget(() => {
            return shopDataA.data;
        }) ?? [];
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}Manage ${shopDataA.pageTitle ?? ""} Contents`);
        if (!!shopDataA.pageBody)
            form.body(shopDataA.pageBody);
        shopData.forEach((s) => {
            form.button(customFormUICodes.action.buttons.positions.main_only + s.title, (s.texture ?? "") === "" ? (s.type === "player_shop_page" ? "textures/ui/arrow_right" : "loading") : s.texture);
        });
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Add Item", "textures/ui/book_addpicture_default");
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Add Page", "textures/ui/book_addtextpage_default");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        let r = undefined;
        try {
            r = await form.forceShow(sourceEntity);
        }
        catch (e) {
            try {
                return ((await showMessage(sourceEntity, "§cError", `§c${e} ${e.stack}`, "Back", "Close")).selection != 0).toNumber();
            }
            catch {
                console.error(e, e.stack);
            }
            return 0;
        }
        if (r.canceled)
            return 1;
        assertIsDefined(r.selection);
        let response = r.selection;
        switch (response) {
            case shopData.length:
                const type = mode == "buy" ? "player_shop_saved" : "player_shop_sellable";
                if (type == "player_shop_saved") {
                    const item = await itemSelector(sourceEntity, sourceEntity, () => 1 /*, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode*/);
                    if (!item.item.hasItem()) {
                        if ((await showMessage(sourceEntity, "", `You cannot sell this item because that slot is empty.`, "Back", "Close"))
                            .selection != 0) {
                            return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                        }
                        else {
                            return 0;
                        }
                    }
                    if ((item?.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems) ||
                        (item?.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems) ||
                        (item?.item?.keepOnDeath == true && !config.shopSystem.player.allowSellingKeepOnDeathItems)) {
                        if ((await showMessage(sourceEntity, "", `You cannot sell this item because ${item.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems
                            ? "selling items that are locked to your inventory is disabled"
                            : item.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems
                                ? "selling items that are locked to a specific inventory slot is disabled"
                                : item.item?.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems
                                    ? "selling items that have the keep on death property is disabled"
                                    : "of an unknown reason"}.`, "Back", "Close")).selection != 0) {
                            return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                        }
                        else {
                            return 0;
                        }
                    }
                    const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", {
                        x: Math.floor(sourceEntity.location.x) + 0.5,
                        y: Math.floor(sourceEntity.location.y) + 10.5,
                        z: Math.floor(sourceEntity.location.z) + 0.5,
                    });
                    const entityID = getSuperUniqueID();
                    entity.setDynamicProperty("andexdb:saved_player_shop_item_save_id", entityID);
                    entity.getComponent("inventory")?.container?.setItem(0, item.item.getItem());
                    world.structureManager.createFromWorld("andexdbSavedPlayerShopItem:" + entityID, sourceEntity.dimension, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y) + 10,
                        z: Math.floor(sourceEntity.location.z),
                    }, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y) + 10,
                        z: Math.floor(sourceEntity.location.z),
                    }, {
                        includeBlocks: false,
                        includeEntities: true,
                        saveMode: StructureSaveMode.World,
                    });
                    const form = new ModalFormData();
                    form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick");
                    form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/items/stick");
                    form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
                    form.textField("Price§c*", "10", "10");
                    form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
                    const r = await form.forceShow(sourceEntity);
                    let [title, texture, itemIndex, price, step] = r.formValues;
                    const itemB = {
                        type: "player_shop_item",
                        itemType: "player_shop_saved",
                        title: title,
                        texture: texture,
                        price: Number.isNaN(Number(price)) ? 10 : Number(price),
                        step: Math.min(Number.isNaN(Number(step)) ? 1 : Number(step), item.item.maxAmount),
                        maxStackSize: item.item.maxAmount,
                        structureID: "andexdbSavedShopItem:" + entityID,
                        entityID: entityID,
                        remainingStock: item.item.amount,
                        itemDetails: {
                            damage: tryget(() => item.item.getItem()?.getComponent("durability")?.damage) ?? NaN,
                            maxDurability: tryget(() => item.item.getItem()?.getComponent("durability")?.maxDurability) ?? NaN,
                            keepOnDeath: item.item.keepOnDeath,
                            lockMode: item.item.lockMode,
                            loreLineCount: item.item.getLore().length,
                            typeId: item.item.typeId,
                            nameTag: item.item.nameTag,
                            enchantments: tryget(() => item.item.getItem()?.getComponent("enchantable")?.getEnchantments()) ??
                                "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.",
                        },
                        playerID: sourceEntity.id,
                    };
                    item.item.setItem();
                    let itemIndexB = Number.isNaN(Number(itemIndex)) ? (mode == "buy" ? shop.buyData.length : shop.sellData.length) : Number(itemIndex);
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(itemIndexB, 0, itemB);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(itemIndexB, 0, itemB);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                else if (!!!type) {
                    return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                else {
                    await PlayerShopManager.managePlayerShopPage_addItem(sourceEntity, shop, path, type);
                    return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
            case shopData.length + 1:
                await PlayerShopManager.managePlayerShopPage_addPage(sourceEntity, shop, path);
                return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
            case shopData.length + 2 /*
                if(path.slice(0, -1).length==1){
                    await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as PlayerShopPage, Number(path.slice(-1)[0]), path[0])
                    // managePlayerShop_contents(sourceEntity, shop, mode)
                }else{
                    await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as PlayerShopPage, Number(path.slice(-1)[0]))
                    // managePlayerShopPage_contents(sourceEntity, shop, path.slice(0, -2) as [mode, ...string[]])
                };*/:
                return 1;
            case shopData.length + 3:
                return 0;
            default:
                if ((shopData[response].type == "player_shop_item"
                    ? await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, [...path, "data", String(response)], shopData[response], response)
                    : await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, [...path, "data", String(response)], shopData[response], response)) == 1) {
                    return await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                else {
                    return 0;
                }
        }
    }
    static async managePlayerShopPage_manageItem(sourceEntitya, shop, path, item, itemIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage " + item.title);
        form.body(`Type: ${item.itemType}
            Title: ${item.title}
            Texture: ${item.texture}
            ${mode == "buy" ? "Purchase" : "Sell"} Amount Step: ${item.step}
            ${item.itemType == "player_shop_saved"
            ? `Maximum Stock: ${item.maxStackSize}
            ${item.remainingStock}`
            : `Amount Still Wanted: ${item.amountWanted}
            Current Amount: ${item.currentAmount}`}
            ${mode == "buy" ? "Price" : "Value"}: ${mode == "buy" ? item.price : item.value}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Move Item", "textures/ui/move");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Item", "textures/ui/book_edit_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Delete Item", "textures/ui/book_trash_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Apply Texture Preset", "textures/items/map_locked");
        const showRestockButton = mode == "buy" && item?.remainingStock < item?.maxStackSize;
        if (showRestockButton) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Restock Item", "textures/ui/upload_glyph");
        }
        const debugMode = config.system.debugMode;
        if (debugMode) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            if (mode == "buy") {
                form.button(customFormUICodes.action.buttons.positions.main_only + "Load Structure\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/xyz_axis");
            }
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity).then(async (r) => {
            if (r.canceled)
                return 1;
            switch (cullUndefined([
                "move",
                "edit",
                "delete",
                "applyTexturePreset",
                showRestockButton ? "restock" : undefined,
                ...(debugMode ? ["rawData", "editRaw", "editJSON", mode == "buy" ? "loadStructure" : undefined] : []),
                "back",
                "close",
            ])[r.selection]) {
                case "move": {
                    const form = new ModalFormData();
                    form.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex));
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled)
                        return 1;
                    assertIsDefined(r.formValues);
                    if (!Number.isNaN(Number(r.formValues[0]))) {
                        if (mode == "buy") {
                            let data = shop.buyData;
                            let newData = getPathInObject(data, path).data;
                            newData.splice(itemIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, item);
                            shop.buyData = data;
                        }
                        else if (mode == "sell") {
                            let data = shop.sellData;
                            let newData = getPathInObject(data, path).data;
                            newData.splice(itemIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, item);
                            shop.sellData = data;
                        }
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, Number(r.formValues[0]));
                    }
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                }
                case "edit":
                    await PlayerShopManager.managePlayerShopPage_editItem(sourceEntity, shop, path, item, itemIndex);
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                case "delete":
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes");
                    if (sureOfItemDeletion.selection == 1) {
                        if (mode == "buy") {
                            world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = sourceEntity.dimension
                                .getEntitiesAtBlockLocation(sourceEntity.location)
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) ==
                                item.entityID);
                            if (!!entity) {
                                const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                                entity.remove();
                                sourceEntity.dimension.spawnItem(itemStack, sourceEntity.location);
                            }
                            world.structureManager.delete(item.structureID);
                            let data = shop.buyData;
                            let newData = getPathInObject(data, path).data;
                            newData.splice(itemIndex, 1);
                            shop.buyData = data;
                        }
                        else if (mode == "sell") {
                            let data = shop.sellData;
                            let newData = getPathInObject(data, path).data;
                            newData.splice(itemIndex, 1);
                            shop.sellData = data;
                        }
                        return 1;
                    }
                    else {
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                case "applyTexturePreset": {
                    const r = await selectTexturePreset(sourceEntity);
                    if (r === 1)
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    if (r === 0)
                        return 0;
                    item.texture = r;
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(itemIndex, 1, item);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(itemIndex, 1, item);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                }
                case "restock": {
                    const itemb = await itemSelector(sourceEntity, sourceEntity, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode);
                    if (!itemb.item.hasItem()) {
                        if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected slot because that slot is empty`, "Back", "Close")).selection != 1) {
                            return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                        }
                        else {
                            return 0;
                        }
                    }
                    world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                        includeBlocks: false,
                        includeEntities: true,
                    });
                    const entity = sourceEntity.dimension
                        .getEntitiesAtBlockLocation(sourceEntity.location)
                        .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                    if (!!entity) {
                        const itemc = item;
                        const player = sourceEntity;
                        const itemStack = entity.getComponent("inventory")?.container?.getItem(0);
                        entity.remove();
                        if (!!!itemStack) {
                            if ((itemb?.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems) ||
                                (itemb?.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems) ||
                                (itemb?.item?.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems)) {
                                if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected item because ${itemb.item?.lockMode == "inventory" && !config.shopSystem.player.allowSellingLockInInventoryItems
                                    ? "selling items that are locked to your inventory is disabled"
                                    : itemb.item?.lockMode == "slot" && !config.shopSystem.player.allowSellingLockInSlotItems
                                        ? "selling items that are locked to a specific inventory slot is disabled"
                                        : itemb.item?.keepOnDeath && !config.shopSystem.player.allowSellingKeepOnDeathItems
                                            ? "selling items that have the keep on death property is disabled"
                                            : "of an unknown reason"}.`, "Back", "Close")).selection != 0) {
                                    return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                                }
                                else {
                                    return 0;
                                }
                            }
                            if (itemc.itemDetails.typeId != itemb.item.typeId) {
                                if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected item because they are different item types.`, "Back", "Close")).selection != 0) {
                                    return await PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                                }
                                else {
                                    return 0;
                                }
                            }
                            world.structureManager.place(itemc.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == itemc.entityID);
                            if (!!!entity) {
                                throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${itemc.entityID} was found inside of the specified structure.`);
                            }
                            // const itemStackC = itemb.item.getItem()
                            const leftOverItemStack = entity.getComponent("inventory")?.container?.addItem(itemb.item.getItem());
                            const itemStackB = entity.getComponent("inventory")?.container?.getItem(0);
                            itemb.item.setItem(leftOverItemStack);
                            try {
                                world.structureManager.delete(itemc.structureID);
                            }
                            catch { }
                            /**
                             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                             */
                            var otherEntities = tryget(() => player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .filter((v) => v.id != entity.id)) ?? [];
                            var locs = otherEntities.map((v) => v.location);
                            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                            try {
                                world.structureManager.createFromWorld(itemc.structureID, player.dimension, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    includeBlocks: false,
                                    includeEntities: true,
                                    saveMode: StructureSaveMode.World,
                                });
                                itemc.remainingStock = itemStackB.amount;
                                itemc.itemDetails = {
                                    damage: tryget(() => itemStackB.getComponent("durability")?.damage) ?? NaN,
                                    maxDurability: tryget(() => itemStackB.getComponent("durability")?.maxDurability) ?? NaN,
                                    keepOnDeath: itemStackB.keepOnDeath,
                                    lockMode: itemStackB.lockMode,
                                    loreLineCount: itemStackB.getLore().length,
                                    typeId: itemStackB.typeId,
                                    nameTag: itemStackB.nameTag,
                                    enchantments: tryget(() => itemStackB.getComponent("enchantable")?.getEnchantments()) ??
                                        "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.",
                                };
                                let data = shop.buyData;
                                let newData = getPathInObject(data, path).data;
                                newData.splice(itemIndex, 1, itemc);
                                shop.buyData = data;
                            }
                            catch (e) {
                                return ((await showMessage(player, "An Error Has occurred", e instanceof Error ? e.stringify() : e + " " + e?.stack, "Go Back", "Close Shop")).selection == 1).toNumber();
                            }
                            finally {
                                try {
                                    otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                                }
                                catch { }
                                try {
                                    entity.remove();
                                }
                                catch { }
                            }
                        }
                        else if (itemStack.isStackableWith(itemb.item.getItem())) {
                            world.structureManager.place(itemc.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), {
                                includeBlocks: false,
                                includeEntities: true,
                            });
                            const entity = player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == itemc.entityID);
                            if (!!!entity) {
                                throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${itemc.entityID} was found inside of the specified structure.`);
                            }
                            const leftOverItemStack = entity.getComponent("inventory")?.container?.addItem(itemb.item.getItem());
                            const itemStackB = entity.getComponent("inventory")?.container?.getItem(0);
                            itemb.item.setItem(leftOverItemStack);
                            try {
                                world.structureManager.delete(itemc.structureID);
                            }
                            catch { }
                            /**
                             * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                             */
                            var otherEntities = tryget(() => player.dimension
                                .getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 }))
                                .filter((v) => v.id != entity.id)) ?? [];
                            var locs = otherEntities.map((v) => v.location);
                            otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
                            try {
                                world.structureManager.createFromWorld(itemc.structureID, player.dimension, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    x: Math.floor(player.location.x),
                                    y: Math.floor(player.location.y) + 10,
                                    z: Math.floor(player.location.z),
                                }, {
                                    includeBlocks: false,
                                    includeEntities: true,
                                    saveMode: StructureSaveMode.World,
                                });
                                itemc.remainingStock += itemStackB.amount;
                                let data = shop.buyData;
                                let newData = getPathInObject(data, path).data;
                                newData.splice(itemIndex, 1, itemc);
                                shop.buyData = data;
                            }
                            catch (e) {
                                return ((await showMessage(player, "An Error Has occurred", e instanceof Error ? e.stringify() : e + " " + e?.stack, "Go Back", "Close Shop")).selection == 1).toNumber();
                            }
                            finally {
                                try {
                                    otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
                                }
                                catch { }
                                try {
                                    entity.remove();
                                }
                                catch { }
                            }
                        }
                        else {
                            if ((await showMessage(sourceEntity, "", `You cannot restock this item with the selected slot because the two items are not stackable with each other`, "Back", "Close")).selection != 0) {
                                return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                            }
                            else {
                                return 0;
                            }
                        }
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                    else {
                        if ((await showMessage(sourceEntity, "", `Something went wrong and the entity that stores this item cannot be found in its structure. Please try again later. If the issue persists then the item is gone and you should just delete it.`, "Back", "Close")).selection != 1) {
                            return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                        }
                        else {
                            return 0;
                        }
                    }
                    // return await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode)
                }
                case "rawData":
                    await showActions(sourceEntity, "Debug Info", `Raw Item Data: \n${JSON.stringify(item, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                case "editRaw":
                    const formb = new ModalFormData().title("Edit Raw Item Data");
                    let data = Object.entries(item);
                    data.forEach((v) => formb.textField(v[0], typeof v[1], JSON.stringify(v[1])));
                    const rd = await formb.forceShow(sourceEntity);
                    if (rd.canceled) {
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                    let newItemData = Object.fromEntries(data.map((v, i) => [v[0], JSON.parse(rd.formValues?.[i])]));
                    if (mode == "buy") {
                        let dataA = shop.buyData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(itemIndex, 1, newItemData);
                        shop.buyData = dataA;
                    }
                    else if (mode == "sell") {
                        let dataA = shop.sellData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(itemIndex, 1, newItemData);
                        shop.sellData = dataA;
                    }
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, newItemData, itemIndex);
                case "editJSON":
                    const formc = new ModalFormData().title("Edit JSON Item Data");
                    let datab = Object.entries(item);
                    formc.textField("JSON", "JSON", JSON.stringify(datab));
                    const re = await formc.forceShow(sourceEntity);
                    if (re.canceled) {
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                    let newItemDataB = JSON.parse(re.formValues?.[0]);
                    if (mode == "buy") {
                        let dataA = shop.buyData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(itemIndex, 1, newItemDataB);
                        shop.buyData = dataA;
                    }
                    else if (mode == "sell") {
                        let dataA = shop.sellData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(itemIndex, 1, newItemDataB);
                        shop.sellData = dataA;
                    }
                    return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, newItemDataB, itemIndex);
                case "loadStructure":
                    world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, {
                        includeBlocks: false,
                        includeEntities: true,
                    });
                    if ((await showMessage(sourceEntity, "", `The structure has "§a${item.structureID}§r" been loaded. Would you like to close the shop?`, "Close Shop", "Go Back")).selection != 0) {
                        return await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 0;
            }
        });
    }
    static async managePlayerShopPage_editItem(sourceEntitya, shop, path, item, itemIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ModalFormData();
        form.title("Edit " + item.title);
        if (item.itemType == "player_shop_saved") {
            form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Price§c*", "10", String(item.price));
            form.textField(`Purchase Amount Step\n§oDefault is 1\nMax is ${item.maxStackSize}`, "1", String(item.step ?? 1)); /*
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_player_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))*/
        }
        else if (item.itemType == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll('\\"', '"'));
            form.textField("Value§c*", "10", String(item.value));
            form.textField('Sell Amount Step\n§oDefault is 1\nCannot be higher than the "Amount Wanted" value', "1", String(item.step ?? 1));
            form.textField("Amount Wanted\n§oDefault is 64", "64", String(item.amountWanted ?? 64));
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll('\\"', '"'));
            // form.textField("Data Value§c*", "0", String(item))
        }
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            if (item.itemType == "player_shop_saved") {
                let [title, texture, price, step] = r.formValues;
                item.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
                item.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"');
                item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step); /*
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")*/
            }
            else if (item.itemType == "player_shop_sellable") {
                let [title, texture, value, step, amountWanted, itemID] = r.formValues;
                item.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"');
                item.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"');
                item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
                item.amountWanted = +Number.isNaN(Number(amountWanted)) ? 10 : Number(amountWanted);
                item.itemID = JSON.parse('"' + itemID.replaceAll('"', '\\"') + '"');
            }
            if (mode == "buy") {
                let data = shop.buyData;
                let newData = getPathInObject(data, path.slice(0, -2)).data;
                newData.splice(itemIndex, 1, item);
                shop.buyData = data;
            }
            else if (mode == "sell") {
                let data = shop.sellData;
                let newData = getPathInObject(data, path.slice(0, -2)).data;
                newData.splice(itemIndex, 1, item);
                shop.sellData = data;
            }
            return 1;
        }));
    }
    static async managePlayerShopPage_addItem(sourceEntitya, shop, path, type) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ModalFormData();
        form.title("Add Item");
        if (type == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick");
            form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", this.playerShopItemTextureHint);
            form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
            form.textField("Value§c*", "10", "10");
            form.textField('Sell Amount Step\n§oDefault is 1\nCannot be higher than the "Amount Wanted" value', "1", "1");
            form.textField("Amount Wanted\n§oDefault is 64", "64", "64");
            form.textField("Item Type§c*", "minecraft:stick");
            // form.textField("Data Value§c*", "0", String(item))
        }
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            assertIsDefined(r.formValues);
            let item = undefined;
            let itemIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            if (type == "player_shop_sellable") {
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues;
                item = {
                    type: "player_shop_item",
                    itemType: "player_shop_sellable",
                    title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                    texture: JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'),
                    value: Number.isNaN(Number(value)) ? 10 : Number(value),
                    step: Number.isNaN(Number(step)) ? 10 : Number(step),
                    amountWanted: Number.isNaN(Number(max)) ? 10 : Number(max),
                    itemID: JSON.parse('"' + (itemID.replaceAll('"', '\\"') + '"')),
                    currentAmount: 0,
                    playerID: shop.playerID ?? sourceEntity.id,
                };
            }
            if (mode == "buy") {
                let data = shop.buyData;
                let newData = getPathInObject(data, path).data;
                newData.splice(itemIndex, 0, item);
                shop.buyData = data;
            }
            else if (mode == "sell") {
                let data = shop.sellData;
                let newData = getPathInObject(data, path).data;
                newData.splice(itemIndex, 0, item);
                shop.sellData = data;
            }
            return 1;
        }));
    }
    static async managePlayerShopPage_managePage(sourceEntitya, shop, path, page, pageIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage " + page.pageTitle);
        form.body(`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`);
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Contents", "textures/ui/bookshelf_flat");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Move Page", "textures/ui/move");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Page", "textures/ui/book_edit_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Delete Page", "textures/ui/book_trash_default");
        form.button(customFormUICodes.action.buttons.positions.main_only + "Apply Texture Preset", "textures/items/map_locked");
        const debugMode = config.system.debugMode;
        if (debugMode) {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
        }
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity).then(async (r) => {
            if (r.canceled)
                return 1;
            switch (cullUndefined([
                "contents",
                "move",
                "edit",
                "delete",
                "applyTexturePreset",
                ...(debugMode ? ["rawData", "editRaw", "editJSON"] : []),
                "back",
                "close",
            ])[r.selection]) {
                case "contents":
                    if ((await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path)) === 1) {
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                    else {
                        return 0;
                    }
                case "move": {
                    const form = new ModalFormData();
                    form.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex));
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled)
                        return 1;
                    assertIsDefined(r.formValues);
                    if (!Number.isNaN(Number(r.formValues[0]))) {
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(pageIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, page);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(pageIndex, 1);
                            newData.splice(Number(r.formValues[0]), 0, page);
                            shop.sellData = newData;
                        }
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, Number(r.formValues[0]));
                    }
                    return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                }
                case "edit":
                    if ((await PlayerShopManager.managePlayerShopPage_editPage(sourceEntity, shop, path, page, pageIndex)) === 1) {
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                    else {
                        return 0;
                    }
                case "delete":
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this page?", "No", "Yes");
                    if (sureOfItemDeletion.selection == 1) {
                        if (mode == "buy") {
                            let newData = shop.buyData;
                            newData.splice(pageIndex, 1);
                            shop.buyData = newData;
                        }
                        else if (mode == "sell") {
                            let newData = shop.sellData;
                            newData.splice(pageIndex, 1);
                            shop.sellData = newData;
                        }
                        return 1;
                    }
                    else {
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                case "applyTexturePreset": {
                    const r = await selectTexturePreset(sourceEntity);
                    if (r === 1)
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    if (r === 0)
                        return 0;
                    page.texture = r;
                    if (mode == "buy") {
                        let newData = shop.buyData;
                        newData.splice(pageIndex, 1, page);
                        shop.buyData = newData;
                    }
                    else if (mode == "sell") {
                        let newData = shop.sellData;
                        newData.splice(pageIndex, 1, page);
                        shop.sellData = newData;
                    }
                    return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                }
                case "rawData":
                    await showActions(sourceEntity, "Debug Info", `Raw Item Data: \n${JSON.stringify(page, (k, v) => {
                        if (typeof v == "string") {
                            return "§r" + v + "§r";
                        }
                        else {
                            return v;
                        }
                    }, 2)}`, ["Done"]);
                    return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                case "editRaw":
                    const formb = new ModalFormData().title("Edit Raw Item Data");
                    let data = Object.entries(page);
                    data.forEach((v) => formb.textField(v[0], typeof v[1], JSON.stringify(v[1])));
                    const rd = await formb.forceShow(sourceEntity);
                    if (rd.canceled) {
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                    let newItemData = Object.fromEntries(data.map((v, i) => [v[0], JSON.parse(rd.formValues?.[i])]));
                    if (mode == "buy") {
                        let dataA = shop.buyData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(pageIndex, 1, newItemData);
                        shop.buyData = dataA;
                    }
                    else if (mode == "sell") {
                        let dataA = shop.sellData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(pageIndex, 1, newItemData);
                        shop.sellData = dataA;
                    }
                    return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, newItemData, pageIndex);
                case "editJSON":
                    const formc = new ModalFormData().title("Edit JSON Item Data");
                    let datab = Object.entries(page);
                    formc.textField("JSON", "JSON", JSON.stringify(datab));
                    const re = await formc.forceShow(sourceEntity);
                    if (re.canceled) {
                        return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                    let newItemDataB = JSON.parse(re.formValues?.[0]);
                    if (mode == "buy") {
                        let dataA = shop.buyData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(pageIndex, 1, newItemDataB);
                        shop.buyData = dataA;
                    }
                    else if (mode == "sell") {
                        let dataA = shop.sellData;
                        let newData = getPathInObject(dataA, path).data;
                        newData.splice(pageIndex, 1, newItemDataB);
                        shop.sellData = dataA;
                    }
                    return await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, newItemDataB, pageIndex);
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 0;
            }
        });
    }
    static async managePlayerShopPage_editPage(sourceEntitya, shop, path, page, pageIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ModalFormData();
        form.title("Edit Page");
        form.textField("§fPage Title§c*", "Category: Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll('\\"', '"'));
        form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll('\\"', '"'));
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            let [pageTitle, pageBody, title, texture] = r.formValues;
            (page.pageTitle = JSON.parse('"' + pageTitle.replaceAll('"', '\\"') + '"')),
                (page.pageBody = JSON.parse('"' + pageBody.replaceAll('"', '\\"') + '"')),
                (page.title = JSON.parse('"' + title.replaceAll('"', '\\"') + '"')),
                (page.texture = JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'));
            if (mode == "buy") {
                let data = shop.buyData;
                let newData = getPathInObject(data, path.slice(0, -2)).data;
                newData.splice(pageIndex, 1, page);
                shop.buyData = data;
            }
            else if (mode == "sell") {
                let data = shop.sellData;
                let newData = getPathInObject(data, path.slice(0, -2)).data;
                newData.splice(pageIndex, 1, page);
                shop.sellData = data;
            }
            return 1;
        }));
    }
    static async managePlayerShopPage_addPage(sourceEntitya, shop, path) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        assertIsDefined(sourceEntity);
        const mode = path[0];
        const form = new ModalFormData();
        form.title("Add Page");
        form.textField("§fPage Title§c*", "Category: Items");
        form.textField("§fPage Body§c*", "The items category.");
        form.textField("§fButton Title§c*", "Items");
        form.textField("Button Icon Texture\n§7Leave blank to use the placeholder loading icon.", "textures/ui/arrowRight");
        form.textField("Button Index§c*", String(getPathInObject(mode == "buy" ? shop.buyData : shop.sellData, path).data.length), String(getPathInObject(mode == "buy" ? shop.buyData : shop.sellData, path).data.length));
        return (await form.forceShow(sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return 1;
            assertIsDefined(r.formValues);
            let page = undefined;
            let pageIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page = {
                type: "player_shop_page",
                pageTitle: JSON.parse('"' + pageTitle.replaceAll('"', '\\"') + '"'),
                pageBody: JSON.parse('"' + pageBody.replaceAll('"', '\\"') + '"'),
                title: JSON.parse('"' + title.replaceAll('"', '\\"') + '"'),
                data: [],
                texture: JSON.parse('"' + texture.replaceAll('"', '\\"') + '"'),
            };
            if (mode == "buy") {
                let data = shop.buyData;
                let newData = getPathInObject(data, path).data;
                newData.splice(pageIndex, 0, page);
                shop.buyData = data;
            }
            else if (mode == "sell") {
                let data = shop.sellData;
                let newData = getPathInObject(data, path).data;
                newData.splice(pageIndex, 0, page);
                shop.sellData = data;
            }
            return 1;
        }));
    }
}
//# sourceMappingURL=player_shop.js.map