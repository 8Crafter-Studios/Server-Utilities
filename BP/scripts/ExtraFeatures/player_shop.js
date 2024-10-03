import { ItemLockMode, ItemStack, Player, world, Entity, StructureSaveMode, ItemType } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { config, getPathInObject } from "Main";
import { containerToContainerSlotArray, containerToItemStackArray } from "Main/command_utilities";
import { command, executeCommandPlayerW } from "Main/commands";
import { forceShow, itemSelector, settings, worldBorderSettingsDimensionSelector } from "Main/ui";
import { getStringFromDynamicProperties, getSuperUniqueID, saveStringToDynamicProperties, showActions, showMessage, tryget, tryrun } from "Main/utilities";
import { mainShopSystemSettings } from "./shop_main";
import { Vector } from "Main/coordinates";
export class PlayerShop {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.title = config.title;
        this.mainPageBodyText = config.mainPageBodyText;
        this.sellShop = config.sellShop ?? true;
        this.buyShop = config.buyShop ?? true;
        this.publicShop = config.publicShop ?? false;
        this.playerID = config.playerID;
    }
    save() {
        world.setDynamicProperty(this.id, JSON.stringify({
            id: this.id,
            name: this.name,
            mainPageBodyText: this.mainPageBodyText,
            title: this.title,
            sellShop: this.sellShop,
            buyShop: this.buyShop,
            publicShop: this.publicShop,
            playerID: this.playerID
        }));
    }
    openShop(player, mode = (this.sellShop && this.buyShop) ? "both" : this.sellShop ? "sell" : this.buyShop ? "buy" : "both") {
        if (mode == "both") {
            const form = new ActionFormData;
            form.title(this.title);
            form.button("Buy");
            form.button("Sell");
            form.button("Cancel");
            forceShow(form, player).then(r => {
                if (r.canceled == true || r.selection == 2) {
                    return;
                }
                if (r.selection == 0) {
                    this.openShop(player, "buy");
                }
                else if (r.selection == 1) {
                    this.openShop(player, "sell");
                }
            });
        }
        else if (mode == "sell") {
            const form = new ActionFormData;
            form.title(this.title ?? "");
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("sellShop:" + this.id))) ?? [];
            form.body(`§6--------------------------------
§aMoney: $${tryget(() => world.scoreboard.getObjective("andexdb:money").getScore(player)) ?? 0}
§6--------------------------------`);
            data.forEach(v => {
                form.button(v.title, v.texture);
            });
            if (this.buyShop) {
                form.button("Back");
            }
            forceShow(form, player).then(r => {
                if (r.canceled == true) {
                    return;
                }
                if (r.selection == data.length) {
                    this.openShop(player, "both");
                    return;
                }
                const item = data[r.selection];
                if (item.type == "player_shop_item") {
                    this.sellItem(player, item, [mode], r.selection).then(v => {
                        if (v == 1) {
                            this.openShop(player, "sell");
                        }
                    });
                }
                else if (item.type == "player_shop_page") {
                    this.openShopPage(player, data, ["sell", String(r.selection)]);
                }
            });
        }
        else if (mode == "buy") {
            const form = new ActionFormData;
            form.title(this.title ?? "");
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("buyShop:" + this.id))) ?? [];
            form.body(`§6--------------------------------
§aMoney: $${tryget(() => world.scoreboard.getObjective("andexdb:money").getScore(player)) ?? 0}
§6--------------------------------`);
            data.forEach(v => {
                form.button(v.title, v.texture);
            });
            if (this.sellShop) {
                form.button("Back");
            }
            forceShow(form, player).then(r => {
                if (r.canceled == true) {
                    return;
                }
                if (r.selection == data.length) {
                    this.openShop(player, "both");
                    return;
                }
                const item = data[r.selection];
                if (item.type == "player_shop_item") {
                    this.buyItem(player, item, [mode], r.selection).then(v => {
                        if (v == 1) {
                            this.openShop(player, "buy");
                        }
                    });
                }
                else if (item.type == "player_shop_page") {
                    this.openShopPage(player, data, ["buy", String(r.selection)]);
                }
            });
        }
        else if (mode == "none") {
            const form = new MessageFormData;
            form.title("404: Invalid Page");
            form.body("The page you are looking for does not exist. ");
            form.button1("Ok");
            form.button2("Cancel");
            forceShow(form, player);
        }
    }
    openShopPage(player, data, path) {
        const mode = path[0];
        if (mode == "sell") {
            const form = new ActionFormData;
            form.title(this.title);
            let newData = getPathInObject(data, path).data;
            newData.forEach(v => {
                form.button(v.title, v.texture);
            });
            form.button("Back");
            forceShow(form, player).then(r => {
                if (r.canceled == true) {
                    return;
                }
                if (r.selection == newData.length) {
                    if (path.slice(0, -1).length == 1) {
                        this.openShop(player, "sell");
                    }
                    else {
                        this.openShopPage(player, data, path.slice(0, -2));
                    }
                    ;
                    return;
                }
                const item = newData[r.selection];
                if (item.type == "player_shop_item") {
                    this.sellItem(player, item, path, r.selection).then(v => {
                        if (v == 1) {
                            this.openShopPage(player, data, path);
                        }
                    });
                }
                else if (item.type == "player_shop_page") {
                    this.openShopPage(player, data, [...path, "data", String(r.selection)]);
                }
            });
        }
        else if (mode == "buy") {
            const form = new ActionFormData;
            form.title(this.title);
            let newData = getPathInObject(data, path).data;
            newData.forEach(v => {
                form.button(v.title, v.texture);
            });
            form.button("Back");
            forceShow(form, player).then(r => {
                if (r.canceled == true) {
                    return;
                }
                if (r.selection == newData.length) {
                    if (path.slice(0, -1).length == 1) {
                        this.openShop(player, "buy");
                    }
                    else {
                        this.openShopPage(player, data, path.slice(0, -2));
                    }
                    ;
                    return;
                }
                const item = newData[r.selection];
                if (item.type == "player_shop_item") {
                    this.buyItem(player, item, path, r.selection).then(v => {
                        if (v == 1) {
                            this.openShopPage(player, data, path);
                        }
                    });
                }
                else if (item.type == "player_shop_page") {
                    this.openShopPage(player, data, [...path, "data", String(r.selection)]);
                }
            });
        }
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
        return this.getIds().map(v => new PlayerShop(JSON.parse(String(world.getDynamicProperty(v)))));
    }
    static getIds() {
        return world.getDynamicPropertyIds().filter(v => v.startsWith("playerShop:"));
    }
    async buyItem(player, item, path, itemIndex) {
        try {
            const infoForm = new ActionFormData;
            infoForm.title("Item Details");
            infoForm.body(`§a${item.title}
§r§gPrice: ${item.price}
§r§bItem Type: §a${item.itemDetails.typeId}
§r§bItem Name: §a${item.itemDetails.nameTag}
§r§bLore: §c${item.itemDetails.loreLineCount} Lines
§r§bEnchantments: §d{
${item.itemDetails.enchantments instanceof Array ? item.itemDetails.enchantments.map(v => v.type + " " + v.level.toRomanNumerals()).join("\n") : item.itemDetails.enchantments}
}`);
            const form = new ModalFormData;
            form.title("Buy " + item.title);
            form.slider(`§a${item.title}\n§r§gPrice: ${item.price}\n\n§fHow many would you like to buy?`, 0, item.remainingStock ?? 64, item.step ?? 1, item.step ?? 1);
            const r = await forceShow(form, player);
            if (r.canceled == true || r.formValues[0] == 0) {
                return 1;
            }
            if ((tryget(() => world.scoreboard.getObjective("andexdb:money").getScore(player)) ?? 0) >= (item.price * r.formValues[0])) {
                if (item.itemType == "player_shop_saved") {
                    world.structureManager.place(item.structureID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), { includeBlocks: false, includeEntities: true });
                    const entity = player.dimension.getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 })).find(v => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                    if (!!!entity) {
                        throw new ReferenceError(`No entity with a andexdb:saved_player_shop_item_save_id dynamic property set to ${item.entityID} was found inside of the specified structure.`);
                    }
                    const itemStack = entity.getComponent("inventory").container.getItem(0);
                    if (itemStack.amount == r.formValues[0]) {
                        entity.getComponent("inventory").container.setItem(0);
                    }
                    else if (itemStack.amount < r.formValues[0]) {
                        return;
                    }
                    else {
                        entity.getComponent("inventory").container.getSlot(0).amount -= r.formValues[0];
                    }
                    try {
                        world.structureManager.delete(item.structureID);
                    }
                    catch { }
                    world.structureManager.createFromWorld(item.structureID, player.dimension, {
                        x: Math.floor(player.location.x),
                        y: Math.floor(player.location.y) + 10,
                        z: Math.floor(player.location.z)
                    }, {
                        x: Math.floor(player.location.x) + 1,
                        y: Math.floor(player.location.y) + 11,
                        z: Math.floor(player.location.z) + 1
                    }, {
                        includeBlocks: false,
                        includeEntities: true,
                        saveMode: StructureSaveMode.World
                    });
                    entity.remove();
                    item.remainingStock -= r.formValues[0];
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
                    player.getComponent("inventory").container.addItem(itemStack);
                    world.scoreboard.getObjective("andexdb:money").addScore(player, -(item.price * r.formValues[0]));
                    return 1;
                }
            }
            else {
                const form = new MessageFormData;
                form.title("Not Enough Money");
                form.body(`You do not have enough money to buy this item.\nYou currently have $${tryget(() => world.scoreboard.getObjective("andexdb:money").getScore(player)) ?? 0}.\nOne of this item costs $${item.price}.\nYou wanted to buy ${r.formValues[0]} of this item.\nThe total price is $${item.price * r.formValues[0]}.\nYou need another $${(item.price * r.formValues[0]) - (tryget(() => world.scoreboard.getObjective("andexdb:money").getScore(player)) ?? 0)} to buy this item.`);
                form.button1("Go Back");
                form.button2("Close Shop");
                const rb = await forceShow(form, player);
                if (rb.canceled == true || rb.selection == 1) {
                    return;
                }
                return 1;
                // this.openShop(player, "buy")
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    async sellItem(player, item, path, itemIndex) {
        try {
            const form = new ModalFormData;
            form.title("Sell " + item.title);
            form.slider(`§a${item.title}\n§gValue: ${item.value}\n§fHow many would you like to sell?`, 0, item.amountWanted ?? 64, item.step ?? 1, item.step ?? 1);
            const r = await forceShow(form, player);
            if (r.canceled == true || r.formValues[0] == 0) {
                return 1;
            }
            const items = containerToContainerSlotArray(player.getComponent("inventory").container).filter(v => v.hasItem() ? v?.typeId == item.itemID : false);
            let itemCount = 0;
            items.forEach(v => itemCount += v.amount);
            if (itemCount >= r.formValues[0]) {
                if (item.itemType == "player_shop_sellable") {
                    if (!!!world.structureManager.get("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID)) {
                        const entity = player.dimension.spawnEntity("andexdb:player_shop_recieved_shop_items_storage", { x: Math.floor(player.location.x) + 0.5, y: Math.floor(player.location.y) + 0.5, z: Math.floor(player.location.z) + 0.5 });
                        entity.setDynamicProperty("andexdb:recievedShopItemsStoragePlayerID", item.playerID);
                        world.structureManager.createFromWorld("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID, player.dimension, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z)
                        }, {
                            x: Math.floor(player.location.x) + 1,
                            y: Math.floor(player.location.y) + 11,
                            z: Math.floor(player.location.z) + 1
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World
                        });
                    }
                    world.scoreboard.getObjective("andexdb:money").addScore(player, item.value * r.formValues[0]);
                    let amountToRemove = r.formValues[0];
                    world.structureManager.place("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID, player.dimension, Vector.add(player.location, { x: 0, y: 10, z: 0 }), { includeBlocks: false, includeEntities: true });
                    /**
                     * @todo Make the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
                     */
                    const entity = player.dimension.getEntitiesAtBlockLocation(Vector.add(player.location, { x: 0, y: 10, z: 0 })).find(v => tryget(() => String(v.getDynamicProperty("andexdb:recievedShopItemsStoragePlayerID"))) == item.playerID);
                    if (!!!entity) {
                        throw new ReferenceError(`Unable to get the item.`);
                    }
                    try {
                        for (let i = 0; (amountToRemove > 0) && (i < items.length); i++) {
                            try {
                                const recievingItem = items[i].getItem();
                                const iamount = items[i].amount;
                                let amount = Math.min(amountToRemove, iamount);
                                recievingItem.amount = amount;
                                entity.getComponent("inventory").container.addItem(recievingItem);
                                if (amount == iamount) {
                                    items[i].setItem();
                                }
                                else {
                                    items[i].amount -= amount;
                                }
                                amountToRemove -= amount;
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
                        world.structureManager.createFromWorld("andexdbPlayerShopRecievedShopItemsStorage:" + item.playerID, player.dimension, {
                            x: Math.floor(player.location.x),
                            y: Math.floor(player.location.y) + 10,
                            z: Math.floor(player.location.z)
                        }, {
                            x: Math.floor(player.location.x) + 1,
                            y: Math.floor(player.location.y) + 11,
                            z: Math.floor(player.location.z) + 1
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World
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
                        entity.remove();
                        item.amountWanted -= r.formValues[0];
                        item.currentAmount += r.formValues[0];
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
                    // this.openShop(player, "sell")
                }
            }
            else {
                const form = new MessageFormData;
                form.title("Not Enough Items");
                form.body(`You do not have ${r.formValues[0]} of this item.\nYou currently have ${itemCount} of this item.\nYou wanted to sell ${r.formValues[0]} of this item.\nYou need another ${r.formValues[0] - itemCount} of this item.`);
                form.button1("Go Back");
                form.button2("Close Shop");
                const rb = await forceShow(form, player);
                if (rb.canceled == true || rb.selection == 1) {
                    return;
                }
                return 1;
                // this.openShop(player, "sell")
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    static openPublicShopsSelector(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form = new ActionFormData();
        form.title("Public Player Shops");
        const shopsList = (PlayerShop.getAll() ?? []).filter(s => s.publicShop == true);
        if (shopsList.length == 0) {
            form.body("There are currently no publicly available player shops.");
        }
        shopsList.forEach(s => {
            form.button(s.name ?? s.title ?? s.id);
        });
        form.button("Close", "textures/ui/crossout"); /*
        form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
        forceShow(form, sourceEntity).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case shopsList.length:
                    return;
                    break;
                default:
                    shopsList[response].openShop(sourceEntity);
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
}
export class PlayerShopManager {
    static get playerShopItemTextureHint() { return this.playerShopItemTextureHints[Math.floor(Math.random() * this.playerShopItemTextureHints.length)]; }
    static get playerShopPageTextureHint() { return this.playerShopPageTextureHints[Math.floor(Math.random() * this.playerShopPageTextureHints.length)]; }
    static playerShopSystemSettings(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form = new ActionFormData();
        form.title("Player Shop System");
        form.body("The player shop system is " + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"));
        form.button("Manage Shops", "textures/ui/store_home_icon");
        form.button("Main Settings", "textures/ui/icon_setting");
        form.button("§cShop Item Settings", "textures/ui/icon_items");
        form.button("Back", "textures/ui/arrow_left");
        forceShow(form, sourceEntity).then(r => {
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    PlayerShopManager.managePlayerShops(sourceEntity);
                    break;
                case 1:
                    PlayerShopManager.playerShopSystemSettings_main(sourceEntity);
                    break;
                case 2:
                    showMessage(sourceEntity, undefined, "§cSorry, the shop item does not exist yet.", "Back", "Close").then(r => {
                        if (r.selection == 0) {
                            PlayerShopManager.playerShopSystemSettings(sourceEntity);
                        }
                    });
                    // shopItemSettings(sourceEntity)
                    break;
                case 3:
                    mainShopSystemSettings(sourceEntity);
                    break;
                default:
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static playerShopSystemSettings_main(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form2 = new ModalFormData();
        form2.title(`Player Shop System Settings`);
        form2.toggle(`§l§fEnabled§r§f\nWhether or not the player shop system is enabled, default is false`, config.shopSystem.player.enabled);
        form2.submitButton("Save");
        forceShow(form2, sourceEntity).then(t => {
            if (t.canceled) {
                PlayerShopManager.playerShopSystemSettings(sourceEntity);
                return;
            }
            ;
            let [enabled] = t.formValues;
            config.shopSystem.player.enabled = enabled;
            PlayerShopManager.playerShopSystemSettings(sourceEntity);
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static managePlayerShops(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form = new ActionFormData();
        form.title("Manage Player Shops");
        form.body("The player shop system is " + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"));
        const shopsList = PlayerShop.getAll();
        shopsList.forEach(s => {
            form.button(s.name ?? s.title ?? s.id);
        });
        form.button("New Shop", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left"); /*
        form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
        forceShow(form, sourceEntity).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case shopsList.length:
                    PlayerShopManager.addPlayerShop(sourceEntity);
                    break;
                case shopsList.length + 1:
                    PlayerShopManager.playerShopSystemSettings(sourceEntity);
                    break;
                default:
                    PlayerShopManager.managePlayerShop(sourceEntity, shopsList[response]);
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static addPlayerShop(sourceEntitya) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form2 = new ModalFormData();
        form2.title(`Player Shop System Settings`);
        form2.textField(`§l§fShop ID§r§c*§f\nThe ID of the shop`, "myShop", "myShop");
        form2.textField(`§l§fButton Title§r§f\nThe title of the button for this shop\n§o§7Currently only shows up in the menu to edit the shops.`, "My Shop", "My Shop");
        form2.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", "My Shop");
        form2.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "This is my shop.", "This is my shop.");
        form2.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, true);
        form2.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, true); /*
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewplayershops command, default is true`, true)*/
        form2.submitButton("Save");
        forceShow(form2, sourceEntity).then(t => {
            if (t.canceled) {
                PlayerShopManager.managePlayerShops(sourceEntity);
                return;
            }
            ;
            let [id, name, title, mainPageBodyText, buyShop, sellShop, publicShop] = t.formValues;
            const shop = new PlayerShop({
                id: `playerShop:${sourceEntity.id}:${id}`,
                name: JSON.parse("\"" + (name.replaceAll("\"", "\\\"")) + "\""),
                title: JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                mainPageBodyText: JSON.parse("\"" + (mainPageBodyText.replaceAll("\"", "\\\"")) + "\""),
                buyShop: buyShop,
                sellShop: sellShop,
                publicShop: true,
                playerID: sourceEntity.id
            });
            shop.save();
            PlayerShopManager.managePlayerShop(sourceEntity, shop);
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static managePlayerShop(sourceEntitya, shop) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form = new ActionFormData();
        form.title("Manage " + shop.title);
        form.body(`ID: ${shop.id}
    Display Name: ${shop.name}
    Title: ${shop.title}
    Is Buy Shop: ${shop.buyShop ? "§aTrue" : "§cFalse"}
    §fIs Sell Shop: ${shop.sellShop ? "§aTrue" : "§cFalse"}`);
        form.button("Manage Items/Pages", "textures/ui/color_plus");
        form.button("Shop Settings", "textures/ui/color_plus");
        form.button("View Shop", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    if (shop.buyShop && shop.sellShop) {
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, (await showMessage(sourceEntity, "Manage Buy or Sell Shop", "Would you like to edit the buy shop or the sell shop?\nThe buy shop is where players buy items, while the sell shop is where players sell items.", "Edit Buy Shop", "Edit Sell Shop")).selection == 0 ? "buy" : "sell");
                    }
                    else if (shop.buyShop) {
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, "buy");
                    }
                    else if (shop.sellShop) {
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, "sell");
                    }
                    else {
                        showMessage(sourceEntity, "§cInvalid Shop Settings", "§cError: Invalid Shop Settings.\nA shop cannot have both the §eBuy Shop§c and §eSell Shop§c options disabled.", "Edit Buy Shop", "Edit Sell Shop");
                    }
                    break;
                case 1:
                    PlayerShopManager.managePlayerShop_settings(sourceEntity, shop);
                    break;
                case 2:
                    if (shop.buyShop && shop.sellShop) {
                        shop.openShop(sourceEntity, "both");
                    }
                    else if (shop.buyShop) {
                        shop.openShop(sourceEntity, "buy");
                    }
                    else if (shop.sellShop) {
                        shop.openShop(sourceEntity, "sell");
                    }
                    else {
                        shop.openShop(sourceEntity, "none");
                    }
                    break;
                case 3:
                    PlayerShopManager.managePlayerShops(sourceEntity);
                    break;
                default:
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static managePlayerShop_settings(sourceEntitya, shop) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form2 = new ModalFormData();
        form2.title(`${shop.title} Settings`);
        form2.textField(`§l§fButton Title§r§f\nThe title of the button for this shop\n§o§7Currently only shows up in the menu to edit the shops.`, "My Shop", JSON.stringify(shop.name).slice(1, -1).replaceAll("\\\"", "\""));
        form2.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.title).slice(1, -1).replaceAll("\\\"", "\""));
        form2.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.mainPageBodyText).slice(1, -1).replaceAll("\\\"", "\""));
        form2.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, shop.buyShop ?? true);
        form2.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, shop.sellShop ?? true); /*
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewplayershops command, default is true`, shop.publicShop??true)*/
        form2.submitButton("Save");
        forceShow(form2, sourceEntity).then(t => {
            if (t.canceled) {
                PlayerShopManager.managePlayerShop(sourceEntity, shop);
                return;
            }
            ;
            let [name, title, mainPageBodyText, buyShop, sellShop /*, publicShop*/] = t.formValues;
            shop.name = JSON.parse("\"" + (name.replaceAll("\"", "\\\"")) + "\"");
            shop.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\"");
            shop.mainPageBodyText = JSON.parse("\"" + (mainPageBodyText.replaceAll("\"", "\\\"")) + "\"");
            shop.buyShop = buyShop;
            shop.sellShop = sellShop;
            shop.publicShop = shop.publicShop;
            shop.save();
            PlayerShopManager.managePlayerShop(sourceEntity, shop);
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    static managePlayerShop_contents(sourceEntitya, shop, mode = "buy") {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        let form = new ActionFormData();
        form.title(`Manage ${shop.title ?? ""} Contents`);
        if (!!shop.mainPageBodyText)
            form.body(shop.mainPageBodyText);
        const shopData = tryget(() => { return shop[mode + "Data"]; }) ?? [];
        shopData.forEach(s => {
            form.button(s.title, s.texture);
        });
        form.button("Add Item", "textures/ui/color_plus");
        form.button("Add Page", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        forceShow(form, sourceEntity).then(async (r) => {
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case shopData.length:
                    const type = mode == "buy" ? "player_shop_saved" : "player_shop_sellable";
                    if (type == "player_shop_saved") {
                        const item = await itemSelector(sourceEntity, sourceEntity, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode);
                        const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", { x: Math.floor(sourceEntity.location.x) + 0.5, y: Math.floor(sourceEntity.location.y) + 10.5, z: Math.floor(sourceEntity.location.z) + 0.5 });
                        const entityID = getSuperUniqueID();
                        entity.setDynamicProperty("andexdb:saved_player_shop_item_save_id", entityID);
                        entity.getComponent("inventory").container.setItem(0, item.item.getItem());
                        world.structureManager.createFromWorld("andexdbSavedPlayerShopItem:" + entityID, sourceEntity.dimension, {
                            x: Math.floor(sourceEntity.location.x),
                            y: Math.floor(sourceEntity.location.y) + 10,
                            z: Math.floor(sourceEntity.location.z)
                        }, {
                            x: Math.floor(sourceEntity.location.x) + 1,
                            y: Math.floor(sourceEntity.location.y) + 11,
                            z: Math.floor(sourceEntity.location.z) + 1
                        }, {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World
                        });
                        const form2 = new ModalFormData;
                        form2.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick");
                        form2.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
                        form2.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
                        form2.textField("Price§c*", "10", "10");
                        form2.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
                        const r = await forceShow(form2, sourceEntity);
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
                                damage: tryget(() => item.item.getItem().getComponent("durability").damage) ?? NaN,
                                maxDurability: tryget(() => item.item.getItem().getComponent("durability").maxDurability) ?? NaN,
                                keepOnDeath: item.item.keepOnDeath,
                                lockMode: item.item.lockMode,
                                loreLineCount: item.item.getLore().length,
                                typeId: item.item.typeId,
                                nameTag: item.item.nameTag,
                                enchantments: tryget(() => item.item.getItem().getComponent("enchantable").getEnchantments()) ?? "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                            },
                            playerID: sourceEntity.id
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
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    else if (!!!type) {
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    else {
                        await PlayerShopManager.managePlayerShop_addItem(sourceEntity, shop, type, mode);
                        PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    }
                    break;
                case shopData.length + 1:
                    await PlayerShopManager.managePlayerShop_addPage(sourceEntity, shop, mode);
                    PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
                    break;
                case shopData.length + 2:
                    PlayerShopManager.managePlayerShop(sourceEntity, shop);
                    break;
                default:
                    shopData[response].type == "player_shop_item" ? await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, shopData[response], response, mode) : await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, shopData[response], response, mode);
                    PlayerShopManager.managePlayerShop_contents(sourceEntity, shop, mode);
            }
        }).catch(async (e) => {
            try {
                await showMessage(sourceEntity, "§cError", `§c${e} ${e.stack}`, "Back", "Close");
            }
            catch {
                console.error(e, e.stack);
            }
            ;
        });
    }
    static async managePlayerShop_manageItem(sourceEntitya, shop, item, itemIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const form = new ActionFormData;
        form.title("Manage " + item.title);
        form.body(`Type: ${item.itemType}
Title: ${item.title}
Texture: ${item.texture}
${mode == "buy" ? "Purchase" : "Sell"} Amount Step: ${item.step}
${item.itemType == "player_shop_saved" ? `Maximum Stock: ${item.maxStackSize}
${item.remainingStock}` : `Amount Still Wanted: ${item.amountWanted}
Current Amount: ${item.currentAmount}`}
${mode == "buy" ? "Price" : "Value"}: ${mode == "buy" ? item.price : item.value}`);
        form.button("Move Item", "textures/ui/color_plus");
        form.button("Edit Item", "textures/ui/color_plus");
        form.button("Delete Item", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let response = r.selection;
            switch (response) {
                case 0:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex));
                    const r = await forceShow(form2, sourceEntity);
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
                    }
                    break;
                case 1:
                    await PlayerShopManager.managePlayerShop_editItem(sourceEntity, shop, item, itemIndex, mode);
                    await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    break;
                case 2:
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes");
                    if (sureOfItemDeletion.selection == 1) {
                        if (mode == "buy") {
                            world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, { includeBlocks: false, includeEntities: true });
                            const entity = sourceEntity.dimension.getEntitiesAtBlockLocation(sourceEntity.location).find(v => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                            if (!!entity) {
                                const itemStack = entity.getComponent("inventory").container.getItem(0);
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
                    }
                    else {
                        await PlayerShopManager.managePlayerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                    }
                    break;
                case 3:
                    break;
                default:
            }
            return r;
        });
    }
    /**
     * Opens the UI for editing a player shop item.
     * @todo
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param item The shop item that the player is editing.
     * @param itemIndex The index of the shop item that is being edited in the shop page, it is zero-indexed.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static async managePlayerShop_editItem(sourceEntitya, shop, item, itemIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const form = new ModalFormData;
        form.title("Edit " + item.title);
        if (item.itemType == "player_shop_saved") {
            form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Price§c*", "10", String(item.price));
            form.textField(`Purchase Amount Step\n§oDefault is 1\nMax is ${item.maxStackSize}`, "1", String(item.step ?? 1)); /*
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_player_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))*/
        }
        else if (item.itemType == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Value§c*", "10", String(item.value));
            form.textField("Sell Amount Step\n§oDefault is 1\nCannot be higher than the \"Amount Wanted\" value", "1", String(item.step ?? 1));
            form.textField("Amount Wanted\n§oDefault is 64", "64", String(item.amountWanted ?? 64));
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""));
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            if (item.itemType == "player_shop_saved") {
                let [title, texture, price, step] = r.formValues;
                item.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\"");
                item.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
                item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step); /*
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")*/
            }
            else if (item.itemType == "player_shop_sellable") {
                let [title, texture, value, step, amountWanted, itemID] = r.formValues;
                item.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\"");
                item.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
                item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
                item.amountWanted = +Number.isNaN(Number(amountWanted)) ? 10 : Number(amountWanted);
                item.itemID = JSON.parse("\"" + (itemID.replaceAll("\"", "\\\"")) + "\"");
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
     * @todo
     * @param sourceEntitya The player editing the shop item.
     * @param shop The player shop that the shop item is in.
     * @param type The type of the shop item that the player is adding.
     * @param mode Whether this is a buy or sell shop.
     * @returns The chosen options in the edit item screen.
     */
    static async managePlayerShop_addItem(sourceEntitya, shop, type, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const form = new ModalFormData;
        form.title("Add Item");
        if (type == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick");
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint);
            form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
            form.textField("Value§c*", "10", "10");
            form.textField("Sell Amount Step\n§oDefault is 1\nCannot be higher than the \"Amount Wanted\" value", "1", "1");
            form.textField("Amount Wanted\n§oDefault is 64", "64", "64");
            form.textField("Item Type§c*", "minecraft:stick");
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let item = undefined;
            let itemIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            if (type == "player_shop_sellable") {
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues;
                item = {
                    type: "player_shop_item",
                    itemType: "player_shop_sellable",
                    title: JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                    texture: JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\""),
                    value: Number.isNaN(Number(value)) ? 10 : Number(value),
                    step: Number.isNaN(Number(step)) ? 10 : Number(step),
                    amountWanted: Number.isNaN(Number(max)) ? 10 : Number(max),
                    itemID: JSON.parse("\"" + (itemID.replaceAll("\"", "\\\"") + "\"")),
                    currentAmount: 0,
                    playerID: sourceEntity.id
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
        const form = new ActionFormData;
        form.title("Manage " + page.pageTitle);
        form.body(`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`);
        form.button("Edit Contents", "textures/ui/color_plus");
        form.button("Move Page", "textures/ui/color_plus");
        form.button("Edit Page", "textures/ui/color_plus");
        form.button("Delete Page", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let response = r.selection;
            switch (response) {
                case 0:
                    await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, [mode, String(pageIndex)]);
                    await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    break;
                case 1:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex));
                    const r = await forceShow(form2, sourceEntity);
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
                    }
                    break;
                case 2:
                    await PlayerShopManager.managePlayerShop_editPage(sourceEntity, shop, page, pageIndex, mode);
                    await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    break;
                case 3:
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
                    }
                    else {
                        await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                    }
                    break;
                case 4:
                    break;
                default:
            }
            return r;
        });
    }
    static async managePlayerShop_editPage(sourceEntitya, shop, page, pageIndex, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const form = new ModalFormData;
        form.title("Edit Item");
        form.textField("§fPage Title§c*", "Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll("\\\"", "\""));
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page.pageTitle = JSON.parse("\"" + (pageTitle.replaceAll("\"", "\\\"")) + "\""),
                page.pageBody = JSON.parse("\"" + (pageBody.replaceAll("\"", "\\\"")) + "\""),
                page.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                page.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
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
            return r;
        });
    }
    static async managePlayerShop_addPage(sourceEntitya, shop, mode) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const form = new ModalFormData;
        form.title("Add Item");
        form.textField("§fPage Title§c*", "Items");
        form.textField("§fPage Body§c*", "The items category.");
        form.textField("§fButton Title§c*", "Items");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let page = undefined;
            let pageIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page = {
                type: "player_shop_page",
                pageTitle: JSON.parse("\"" + (pageTitle.replaceAll("\"", "\\\"")) + "\""),
                pageBody: JSON.parse("\"" + (pageBody.replaceAll("\"", "\\\"")) + "\""),
                title: JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                data: [],
                texture: JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"")
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
            return r;
        });
    }
    static async managePlayerShopPage_contents(sourceEntitya, shop, path) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        let form = new ActionFormData();
        const shopDataA = tryget(() => { return getPathInObject(shop[mode + "Data"], path); }) ?? {};
        const shopData = tryget(() => { return shopDataA.data; }) ?? [];
        form.title(`Manage ${shopDataA.pageTitle ?? ""} Contents`);
        if (!!shopDataA.pageBody)
            form.body(shopDataA.pageBody);
        shopData.forEach(s => {
            form.button(s.title, s.texture);
        });
        form.button("Add Item", "textures/ui/color_plus");
        form.button("Add Page", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        let r = undefined;
        try {
            r = await forceShow(form, sourceEntity);
        }
        catch (e) {
            try {
                await showMessage(sourceEntity, "§cError", `§c${e} ${e.stack}`, "Back", "Close");
            }
            catch {
                console.error(e, e.stack);
            }
            ;
            return;
        }
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case shopData.length:
                const type = mode == "buy" ? "player_shop_saved" : "player_shop_sellable";
                if (type == "player_shop_saved") {
                    const item = await itemSelector(sourceEntity, sourceEntity, PlayerShopManager.managePlayerShop_contents, sourceEntity, shop, mode);
                    const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", { x: Math.floor(sourceEntity.location.x) + 0.5, y: Math.floor(sourceEntity.location.y) + 10.5, z: Math.floor(sourceEntity.location.z) + 0.5 });
                    const entityID = getSuperUniqueID();
                    entity.setDynamicProperty("andexdb:saved_player_shop_item_save_id", entityID);
                    entity.getComponent("inventory").container.setItem(0, item.item.getItem());
                    world.structureManager.createFromWorld("andexdbSavedPlayerShopItem:" + entityID, sourceEntity.dimension, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y) + 10,
                        z: Math.floor(sourceEntity.location.z)
                    }, {
                        x: Math.floor(sourceEntity.location.x) + 1,
                        y: Math.floor(sourceEntity.location.y) + 11,
                        z: Math.floor(sourceEntity.location.z) + 1
                    }, {
                        includeBlocks: false,
                        includeEntities: true,
                        saveMode: StructureSaveMode.World
                    });
                    const form2 = new ModalFormData;
                    form2.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick");
                    form2.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
                    form2.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
                    form2.textField("Price§c*", "10", "10");
                    form2.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
                    const r = await forceShow(form2, sourceEntity);
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
                            damage: tryget(() => item.item.getItem().getComponent("durability").damage) ?? NaN,
                            maxDurability: tryget(() => item.item.getItem().getComponent("durability").maxDurability) ?? NaN,
                            keepOnDeath: item.item.keepOnDeath,
                            lockMode: item.item.lockMode,
                            loreLineCount: item.item.getLore().length,
                            typeId: item.item.typeId,
                            nameTag: item.item.nameTag,
                            enchantments: tryget(() => item.item.getItem().getComponent("enchantable").getEnchantments()) ?? "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                        },
                        playerID: sourceEntity.id
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
                    await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                else if (!!!type) {
                    await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                else {
                    await PlayerShopManager.managePlayerShopPage_addItem(sourceEntity, shop, path, type);
                    await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                }
                break;
            case shopData.length + 1:
                await PlayerShopManager.managePlayerShopPage_addPage(sourceEntity, shop, path);
                await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                break;
            case shopData.length + 2: /*
                if(path.slice(0, -1).length==1){
                    await PlayerShopManager.managePlayerShop_managePage(sourceEntity, shop, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as PlayerShopPage, Number(path.slice(-1)[0]), path[0])
                    // managePlayerShop_contents(sourceEntity, shop, mode)
                }else{
                    await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as PlayerShopPage, Number(path.slice(-1)[0]))
                    // managePlayerShopPage_contents(sourceEntity, shop, path.slice(0, -2) as [mode, ...string[]])
                };*/
                return;
                break;
            default:
                shopData[response].type == "player_shop_item" ? await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, [...path, "data", String(response)], shopData[response], response) : await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, [...path, "data", String(response)], shopData[response], response);
                await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
        }
        return r;
    }
    static async managePlayerShopPage_manageItem(sourceEntitya, shop, path, item, itemIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ActionFormData;
        form.title("Manage " + item.title);
        form.body(`Type: ${item.itemType}
            Title: ${item.title}
            Texture: ${item.texture}
            ${mode == "buy" ? "Purchase" : "Sell"} Amount Step: ${item.step}
            ${item.itemType == "player_shop_saved" ? `Maximum Stock: ${item.maxStackSize}
            ${item.remainingStock}` : `Amount Still Wanted: ${item.amountWanted}
            Current Amount: ${item.currentAmount}`}
            ${mode == "buy" ? "Price" : "Value"}: ${mode == "buy" ? item.price : item.value}`);
        form.button("Move Item", "textures/ui/color_plus");
        form.button("Edit Item", "textures/ui/color_plus");
        form.button("Delete Item", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let response = r.selection;
            switch (response) {
                case 0:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex));
                    const r = await forceShow(form2, sourceEntity);
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
                    }
                    break;
                case 1:
                    await PlayerShopManager.managePlayerShopPage_editItem(sourceEntity, shop, path, item, itemIndex);
                    await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    break;
                case 2:
                    const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes");
                    if (sureOfItemDeletion.selection == 1) {
                        if (mode == "buy") {
                            world.structureManager.place(item.structureID, sourceEntity.dimension, sourceEntity.location, { includeBlocks: false, includeEntities: true });
                            const entity = sourceEntity.dimension.getEntitiesAtBlockLocation(sourceEntity.location).find(v => tryget(() => String(v.getDynamicProperty("andexdb:saved_player_shop_item_save_id"))) == item.entityID);
                            if (!!entity) {
                                const itemStack = entity.getComponent("inventory").container.getItem(0);
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
                    }
                    else {
                        await PlayerShopManager.managePlayerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex);
                    }
                    break;
                case 3:
                    break;
                default:
            }
            return r;
        });
    }
    static async managePlayerShopPage_editItem(sourceEntitya, shop, path, item, itemIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ModalFormData;
        form.title("Edit " + item.title);
        if (item.itemType == "player_shop_saved") {
            form.textField("§7Buyable Item Type: player_shop_saved\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Price§c*", "10", String(item.price));
            form.textField(`Purchase Amount Step\n§oDefault is 1\nMax is ${item.maxStackSize}`, "1", String(item.step ?? 1)); /*
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_player_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))*/
        }
        else if (item.itemType == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""));
            form.textField("Value§c*", "10", String(item.value));
            form.textField("Sell Amount Step\n§oDefault is 1\nCannot be higher than the \"Amount Wanted\" value", "1", String(item.step ?? 1));
            form.textField("Amount Wanted\n§oDefault is 64", "64", String(item.amountWanted ?? 64));
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""));
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            if (item.itemType == "player_shop_saved") {
                let [title, texture, price, step] = r.formValues;
                item.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\"");
                item.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
                item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step); /*
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")*/
            }
            else if (item.itemType == "player_shop_sellable") {
                let [title, texture, value, step, amountWanted, itemID] = r.formValues;
                item.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\"");
                item.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
                item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
                item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
                item.amountWanted = +Number.isNaN(Number(amountWanted)) ? 10 : Number(amountWanted);
                item.itemID = JSON.parse("\"" + (itemID.replaceAll("\"", "\\\"")) + "\"");
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
            return r;
        });
    }
    static async managePlayerShopPage_addItem(sourceEntitya, shop, path, type) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ModalFormData;
        form.title("Add Item");
        if (type == "player_shop_sellable") {
            form.textField("§7Sellable Item Type: player_shop_sellable\n§fButton Title§c*", "Stick");
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.playerShopItemTextureHint);
            form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
            form.textField("Value§c*", "10", "10");
            form.textField("Sell Amount Step\n§oDefault is 1\nCannot be higher than the \"Amount Wanted\" value", "1", "1");
            form.textField("Amount Wanted\n§oDefault is 64", "64", "64");
            form.textField("Item Type§c*", "minecraft:stick");
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let item = undefined;
            let itemIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            if (type == "player_shop_sellable") {
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues;
                item = {
                    type: "player_shop_item",
                    itemType: "player_shop_sellable",
                    title: JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                    texture: JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\""),
                    value: Number.isNaN(Number(value)) ? 10 : Number(value),
                    step: Number.isNaN(Number(step)) ? 10 : Number(step),
                    amountWanted: Number.isNaN(Number(max)) ? 10 : Number(max),
                    itemID: JSON.parse("\"" + (itemID.replaceAll("\"", "\\\"") + "\"")),
                    currentAmount: 0,
                    playerID: sourceEntity.id
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
            return r;
        });
    }
    static async managePlayerShopPage_managePage(sourceEntitya, shop, path, page, pageIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ActionFormData;
        form.title("Manage " + page.pageTitle);
        form.body(`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`);
        form.button("Edit Contents", "textures/ui/color_plus");
        form.button("Move Page", "textures/ui/color_plus");
        form.button("Edit Page", "textures/ui/color_plus");
        form.button("Delete Page", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let response = r.selection;
            switch (response) {
                case 0:
                    await PlayerShopManager.managePlayerShopPage_contents(sourceEntity, shop, path);
                    await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    break;
                case 1:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex));
                    const r = await forceShow(form2, sourceEntity);
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
                    }
                    break;
                case 2:
                    await PlayerShopManager.managePlayerShopPage_editPage(sourceEntity, shop, path, page, pageIndex);
                    await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    break;
                case 3:
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
                    }
                    else {
                        await PlayerShopManager.managePlayerShopPage_managePage(sourceEntity, shop, path, page, pageIndex);
                    }
                    break;
                case 4:
                    break;
                default:
            }
            return r;
        });
    }
    static async managePlayerShopPage_editPage(sourceEntitya, shop, path, page, pageIndex) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ModalFormData;
        form.title("Edit Page");
        form.textField("§fPage Title§c*", "Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll("\\\"", "\""));
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll("\\\"", "\""));
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page.pageTitle = JSON.parse("\"" + (pageTitle.replaceAll("\"", "\\\"")) + "\""),
                page.pageBody = JSON.parse("\"" + (pageBody.replaceAll("\"", "\\\"")) + "\""),
                page.title = JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                page.texture = JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"");
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
            return r;
        });
    }
    static async managePlayerShopPage_addPage(sourceEntitya, shop, path) {
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
        const mode = path[0];
        const form = new ModalFormData;
        form.title("Add Page");
        form.textField("§fPage Title§c*", "Items");
        form.textField("§fPage Body§c*", "The items category.");
        form.textField("§fButton Title§c*", "Items");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight");
        form.textField("Button Index§c*", String(getPathInObject(mode == "buy" ? shop.buyData : shop.sellData, path).data.length), String(getPathInObject(mode == "buy" ? shop.buyData : shop.sellData, path).data.length));
        return await forceShow(form, sourceEntity).then(async (r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return r;
            let page = undefined;
            let pageIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
            let [pageTitle, pageBody, title, texture] = r.formValues;
            page = {
                type: "player_shop_page",
                pageTitle: JSON.parse("\"" + (pageTitle.replaceAll("\"", "\\\"")) + "\""),
                pageBody: JSON.parse("\"" + (pageBody.replaceAll("\"", "\\\"")) + "\""),
                title: JSON.parse("\"" + (title.replaceAll("\"", "\\\"")) + "\""),
                data: [],
                texture: JSON.parse("\"" + (texture.replaceAll("\"", "\\\"")) + "\"")
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
            return r;
        });
    }
}
PlayerShopManager.playerShopItemTextureHints = ["textures/items/stick", "textures/blocks/gravel", "textures/blocks/reactor_core_stage_0"];
PlayerShopManager.playerShopPageTextureHints = ["textures/ui/arrowRight"];
//# sourceMappingURL=player_shop.js.map