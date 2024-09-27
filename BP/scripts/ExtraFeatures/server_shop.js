import { ItemLockMode, ItemStack, Player, world, Entity, StructureSaveMode } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { config, getPathInObject } from "Main";
import { containerToContainerSlotArray, containerToItemStackArray } from "Main/command_utilities";
import { executeCommandPlayerW } from "Main/commands";
import { forceShow, itemSelector, settings, worldBorderSettingsDimensionSelector } from "Main/ui";
import { getStringFromDynamicProperties, getSuperUniqueID, saveStringToDynamicProperties, showActions, showMessage, tryget, tryrun } from "Main/utilities";
import { mainShopSystemSettings } from "./shop_main";
import { Vector } from "Main/coordinates";
export class ServerShop {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.title = config.title;
        this.sellShop = config.sellShop ?? true;
        this.buyShop = config.buyShop ?? true;
    }
    save() {
        world.setDynamicProperty(this.id, JSON.stringify({ id: this.id, title: this.title, sellShop: this.sellShop, buyShop: this.buyShop }));
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
            form.title(this.title);
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("sellShop:" + this.id))) ?? [];
            form.body(`§6---------------------------------
§aMoney: $${world.scoreboard.getObjective("andexdb:money").getScore(player.scoreboardIdentity) ?? 0}
§6---------------------------------`);
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
                }
                const item = data[r.selection];
                if (item.type == "item") {
                    this.sellItem(player, item).then(() => {
                        this.openShop(player, "sell");
                    });
                }
                else if (item.type == "page") {
                    this.openShopPage(player, data, ["sell", String(r.selection)]);
                }
            });
        }
        else if (mode == "buy") {
            const form = new ActionFormData;
            form.title(this.title);
            const data = tryget(() => JSON.parse(getStringFromDynamicProperties("buyShop:" + this.id))) ?? [];
            form.body(`§6------------------
§aMoney: $${world.scoreboard.getObjective("andexdb:money").getScore(player.scoreboardIdentity)}
§6------------------`);
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
                }
                const item = data[r.selection];
                if (item.type == "item") {
                    this.buyItem(player, item).then(() => {
                        this.openShop(player, "buy");
                    });
                }
                else if (item.type == "page") {
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
                        this.openShop(player, "both");
                    }
                    else {
                        this.openShopPage(player, data, path.slice(0, -2));
                    }
                }
                const item = newData[r.selection];
                if (item.type == "item") {
                    this.sellItem(player, item).then(() => {
                        this.openShopPage(player, data, path);
                    });
                }
                else if (item.type == "page") {
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
                if (r.selection == data.length) {
                    if (path.slice(0, -1).length == 1) {
                        this.openShop(player, "both");
                    }
                    else {
                        this.openShopPage(player, data, path.slice(0, -2));
                    }
                }
                else {
                    const item = newData[r.selection];
                    if (item.type == "item") {
                        this.buyItem(player, item).then(() => {
                            this.openShopPage(player, data, path);
                        });
                    }
                    else if (item.type == "page") {
                        this.openShopPage(player, data, [...path, "data", String(r.selection)]);
                    }
                }
            });
        }
    }
    editShopElements(mode, data) {
        saveStringToDynamicProperties(JSON.stringify(data), mode + "Shop:" + this.id);
    }
    get buyData() {
        return JSON.parse(getStringFromDynamicProperties("buyShop:" + this.id));
    }
    set buyData(data) {
        saveStringToDynamicProperties(JSON.stringify(data), "buyShop:" + this.id);
    }
    get sellData() {
        return JSON.parse(getStringFromDynamicProperties("sellShop:" + this.id));
    }
    set sellData(data) {
        saveStringToDynamicProperties(JSON.stringify(data), "sellShop:" + this.id);
    }
    static get(shopID) {
        if (!!!world.getDynamicProperty(shopID)) {
            return undefined;
        }
        return new ServerShop(JSON.parse(String(world.getDynamicProperty(shopID))));
    }
    static getAll() {
        return this.getIds().map(v => new ServerShop(JSON.parse(String(world.getDynamicProperty(v)))));
    }
    static getIds() {
        return world.getDynamicPropertyIds().filter(v => v.startsWith("shop:"));
    }
    async buyItem(player, item) {
        const form = new ModalFormData;
        form.title("Buy " + item.title);
        form.slider(`§a${item.title}\n§gPrice: ${item.price}\n§fHow many would you like to buy?`, 0, item.max ?? 64, item.step ?? 1, item.step ?? 1);
        const r = await forceShow(form, player);
        if (r.canceled == true || r.formValues[0] == 0) {
            return;
        }
        if (world.scoreboard.getObjective("andexdb:money").getScore(player.scoreboardIdentity) >= item.price) {
            if (item.itemType == "newItemStack") {
                let newItem = new ItemStack(item.itemID, r.formValues[0]);
                newItem.nameTag = item.itemName;
                newItem.keepOnDeath = item.keepOnDeath;
                newItem.lockMode = item.lockMode;
                if (!!item.itemLore) {
                    newItem.setLore(item.itemLore);
                }
                if (!!item.canDestroy) {
                    newItem.setCanDestroy(item.canDestroy);
                }
                if (!!item.canPlaceOn) {
                    newItem.setCanPlaceOn(item.canPlaceOn);
                }
                player.getComponent("inventory").container.addItem(newItem);
                world.scoreboard.getObjective("andexdb:money").addScore(player.scoreboardIdentity, -item.price);
                this.openShop(player, "sell");
            }
            else if (item.itemType == "pre-made") { }
        }
        else {
            const form = new MessageFormData;
            form.title("Not Enough Money");
            form.body(`You do not have enough money to buy this item.\nYou currently have $${world.scoreboard.getObjective("andexdb:money").getScore(player.scoreboardIdentity)}.\nThe item costs $${item.price}.\nYou need another $${item.price - world.scoreboard.getObjective("andexdb:money").getScore(player.scoreboardIdentity)} to buy this item.`);
            form.button1("Go Back");
            form.button2("Close Shop");
            forceShow(form, player).then(r => {
                if (r.canceled == true || r.selection == 1) {
                    return;
                }
                this.openShop(player, "buy");
            });
        }
    }
    async sellItem(player, item) {
        const form = new ModalFormData;
        form.title("Sell " + item.title);
        form.slider(`§a${item.title}\n§gValue: ${item.value}\n§fHow many would you like to sell?`, 0, item.max ?? 64, item.step ?? 1, item.step ?? 1);
        const r = await forceShow(form, player);
        if (r.canceled == true || r.formValues[0] == 0) {
            return;
        }
        const items = containerToContainerSlotArray(player.getComponent("inventory").container).filter(v => v?.typeId == item.itemID);
        let itemCount = 0;
        items.forEach(v => itemCount += v.amount);
        if (itemCount >= r.formValues[0]) {
            if (item.itemType == "sellable") {
                world.scoreboard.getObjective("andexdb:money").addScore(player.scoreboardIdentity, item.value * r.formValues[0]);
                let amountToRemove = r.formValues[0];
                const items = containerToContainerSlotArray(player.getComponent("inventory").container).filter(v => v?.typeId == item.itemID);
                for (let i = 0; amountToRemove != 0; i++) {
                    items[i].amount -= Math.min(amountToRemove, items[i].amount);
                    amountToRemove -= Math.min(amountToRemove, items[i].amount);
                }
                this.openShop(player, "sell");
            }
        }
        else {
            const form = new MessageFormData;
            form.title("Not Enough Items");
            form.body(`You do not have ${r.formValues[0]} of this item.\nYou currently have ${itemCount}of this item.\nYou wanted to sell ${r.formValues[0]} of this item.\nYou need another $${r.formValues[0] - itemCount} to buy this item.`);
            form.button1("Go Back");
            form.button2("Close Shop");
            forceShow(form, player).then(r => {
                if (r.canceled == true || r.selection == 1) {
                    return;
                }
                this.openShop(player, "sell");
            });
        }
    }
}
export function serverShopSystemSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title("Server Shop System");
    form.body("The server shop system is " + config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled");
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
                manageServerShops(sourceEntity);
                break;
            case 1:
                serverShopSystemSettings_main(sourceEntity);
                break;
            case 2:
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
export function serverShopSystemSettings_main(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title(`Server Shop System Settings`);
    form2.toggle(`§l§fEnabled§r§f\nWhether or not the server shop system is enabled, default is false`, config.shopSystem.server.enabled);
    form2.submitButton("Save");
    forceShow(form2, sourceEntity).then(t => {
        if (t.canceled) {
            serverShopSystemSettings(sourceEntity);
            return;
        }
        ;
        let [enabled] = t.formValues;
        config.shopSystem.server.enabled = enabled;
        serverShopSystemSettings(sourceEntity);
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function manageServerShops(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title("Manage Server Shops");
    form.body("The server shop system is " + (config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled"));
    const shopsList = ServerShop.getAll();
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
                worldBorderSettingsDimensionSelector(sourceEntity);
                break;
            case shopsList.length + 1:
                serverShopSystemSettings(sourceEntity);
                break;
            default:
                manageServerShop(sourceEntity, shopsList[response]);
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function manageServerShop(sourceEntitya, shop) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title("Manage " + shop.title);
    form.body(`ID: ${shop.id}
Display Name: ${shop.name}
Title: ${shop.title}
Is Buy Shop: ${shop.buyShop ? "§aTrue" : "§cFalse"}
Is Sell Shop: ${shop.sellShop ? "§aTrue" : "§cFalse"}`);
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
                    manageServerShop_contents(sourceEntity, shop, (await showMessage(sourceEntity, "Manage Buy or Sell Shop", "Would you like to edit the buy shop or the sell shop?\nThe buy shop is where players buy items, while the sell shop is where players sell items.", "Edit Buy Shop", "Edit Sell Shop")).selection == 0 ? "buy" : "sell");
                }
                else if (shop.buyShop) {
                    manageServerShop_contents(sourceEntity, shop, "buy");
                }
                else if (shop.sellShop) {
                    manageServerShop_contents(sourceEntity, shop, "sell");
                }
                else {
                    showMessage(sourceEntity, "§cInvalid Shop Settings", "§cError: Invalid Shop Settings.\nA shop cannot have both the §eBuy Shop§c and §eSell Shop§c options disabled.", "Edit Buy Shop", "Edit Sell Shop");
                }
                break;
            case 1:
                manageServerShop_settings(sourceEntity, shop);
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
                manageServerShops(sourceEntity);
                break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function manageServerShop_settings(sourceEntitya, shop) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title(`Server Shop System Settings`);
    form2.textField(`§l§fButton Title§r§f\nThe title of the button for this shop\n§o§7Currently only shows up in the menu to edit the shops.`, "My Shop", shop.name);
    form2.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", shop.title);
    form2.textField(`§l§fPage Title§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "My Shop", shop.mainPageBodyText);
    form2.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, shop.buyShop ?? true);
    form2.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, shop.sellShop ?? true);
    form2.submitButton("Save");
    forceShow(form2, sourceEntity).then(t => {
        if (t.canceled) {
            manageServerShop(sourceEntity, shop);
            return;
        }
        ;
        let [name, title, mainPageBodyText, buyShop, sellShop] = t.formValues;
        shop.name = name;
        shop.title = title;
        shop.mainPageBodyText = mainPageBodyText;
        shop.buyShop = buyShop;
        shop.sellShop = sellShop;
        shop.save();
        manageServerShop(sourceEntity, shop);
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function manageServerShop_contents(sourceEntitya, shop, mode = "buy") {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title(`Manage ${shop.title} Contents`);
    form.body("The server shop system is " + config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled");
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
                const type = mode == "buy" ?
                    ["giveCommand", "newItemStack", "pre-made", "pre-made_manual"][(await showActions(sourceEntity, "Select Item Mode", "What mode would you like to create the item in?" +
                        "§bGive Command§f: Uses the give command to give players the item, can only do items that are available in commands (so things like minecraft:netherreactor will not work), and can only set item id and data value." +
                        "§bNew Item Stack§f: Uses the Script API to create the item, can use any item type even if it is not available in commands (so minecraft:netherreactor will work), also allows you to set the following properties of the item: name, lore, canDestroy, canPlaceOn, lockMode, keepOnDeath." +
                        "§bPre-Made§f: Saves an already existing item from your inventory to the inventory slot of an andexdb:shop_item_storage entity and saves that entity in a structure block, then when a player purchases an item, the structure is loaded and it clones a copy of the item from the entity's inventory to the player's inventory. This will preserve ALL NBT from the item, including any illegal enchantments." +
                        "§bManual Pre-Made§f: Lets you choose the Structure ID of the structure with the andexdb:shop_item_storage entity in it, and the value of the andexdb:shop_item_storage_save_id dynamic property of the andexdb:shop_item_storage entity that has the item in it.")).selection] :
                    "sellable";
                if (type == "pre-made") {
                    const item = await itemSelector(sourceEntity, sourceEntity, manageServerShop_contents, sourceEntity, shop, mode);
                    const entity = sourceEntity.dimension.spawnEntity("andexdb:shop_item_storage", { x: Math.floor(sourceEntity.location.x) + 0.5, y: Math.floor(sourceEntity.location.y) + 0.5, z: Math.floor(sourceEntity.location.z) + 0.5 });
                    const entityID = getSuperUniqueID();
                    entity.setDynamicProperty("andexdb:shop_item_storage_save_id", entityID);
                    entity.getComponent("inventory").container.setItem(0, item.item.getItem());
                    world.structureManager.createFromWorld("andexdbSavedShopItem:" + entityID, sourceEntity.dimension, {
                        x: Math.floor(sourceEntity.location.x),
                        y: Math.floor(sourceEntity.location.y),
                        z: Math.floor(sourceEntity.location.z)
                    }, {
                        x: Math.floor(sourceEntity.location.x) + 1,
                        y: Math.floor(sourceEntity.location.y) + 1,
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
                    form2.textField("Max Purchase Amount\n§oDefault is 64", "64", "64");
                    const r = await forceShow(form2, sourceEntity);
                    let [title, texture, itemIndex, price, step, max] = r.formValues;
                    const itemB = {
                        type: "item",
                        itemType: "pre-made",
                        title: title,
                        texture: texture,
                        price: Number.isNaN(Number(price)) ? 10 : Number(price),
                        step: Number.isNaN(Number(step)) ? 10 : Number(step),
                        max: Number.isNaN(Number(max)) ? 10 : Number(max),
                        structureID: "andexdbSavedShopItem:" + entityID,
                        entityID: entityID
                    };
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
                }
                else {
                    manageServerShop_addItem(sourceEntity, shop, type, mode);
                }
                break;
            case shopData.length + 1:
                manageServerShop_addPage(sourceEntity, shop, mode);
                break;
            default:
                shopData[response].type == "item" ? await manageServerShop_manageItem(sourceEntity, shop, shopData[response], response, mode) : await manageServerShop_managePage(sourceEntity, shop, shopData[response], response, mode);
                manageServerShop_contents(sourceEntity, shop, mode);
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
export async function manageServerShop_manageItem(sourceEntitya, shop, item, itemIndex, mode) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    const form = new ActionFormData;
    form.title("Manage " + item.title);
    form.body(`Type: ${item.itemType}
Title: ${item.title}
Texture: ${item.texture}
${mode == "buy" ? "Purchase" : "Sell"} Amount Step: ${item.step}
Maximum ${mode == "buy" ? "Purchase" : "Sell"} Amount: ${item.max}
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
                await manageServerShop_editItem(sourceEntity, shop, item, itemIndex, mode);
                manageServerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                break;
            case 2:
                const sureOfItemDeletion = await showMessage(sourceEntity, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes");
                if (sureOfItemDeletion.selection == 1) {
                    if (mode == "buy") {
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
                    manageServerShop_manageItem(sourceEntity, shop, item, itemIndex, mode);
                }
                break;
            case 3:
                break;
            default:
        }
        return r;
    });
}
export async function manageServerShop_editItem(sourceEntitya, shop, item, itemIndex, mode) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    const form = new ModalFormData;
    form.title("Manage " + item.title);
    if (item.itemType == "newItemStack") {
        form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick", item.title);
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick", item.texture);
        form.textField("Price§c*", "10", String(item.price));
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step ?? 1));
        form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", String(item.max ?? 64));
        form.textField("Item Type§c*", "minecraft:stick", item.itemID);
        form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string", !!!item.itemName ? undefined : item.itemName);
        form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.itemLore));
        form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canDestroy));
        form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canPlaceOn));
        form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory].indexOf(item.lockMode));
        form.toggle("Keep On Death", item.keepOnDeath);
    }
    else if (item.itemType == "giveCommand") {
        form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick", item.title);
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick", item.texture);
        form.textField("Price§c*", "10", String(item.price));
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step ?? 1));
        form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max ?? 64));
        form.textField("Item Type§c*", "minecraft:stick", item.itemID);
        form.textField("Data Value§c*", "0", String(item.itemData));
    }
    else if (item.itemType == "pre-made") {
        form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick", item.title);
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick", item.texture);
        form.textField("Price§c*", "10", String(item.price));
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step ?? 1));
        form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max ?? 64));
        form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", item.structureID);
        form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", item.entityID);
    }
    else if (item.itemType == "sellable") {
        form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick", item.title);
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick", item.texture);
        form.textField("Value§c*", "10", String(item.value));
        form.textField("Sell Amount Step\n§oDefault is 1", "1", String(item.step ?? 1));
        form.textField("Max Sell Amount\n§oDefault is 64", "64", String(item.max ?? 64));
        form.textField("Item Type§c*", "minecraft:stick", item.itemID);
        // form.textField("Data Value§c*", "0", String(item))
    }
    return await forceShow(form, sourceEntity).then(async (r) => {
        // This will stop the code when the player closes the form
        if (r.canceled)
            return r;
        if (item.itemType == "newItemStack") {
            let [title, texture, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues;
            item.title = title;
            item.texture = texture;
            item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
            item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
            item.max = Number.isNaN(Number(max)) ? 10 : Number(max);
            item.itemID = itemID;
            item.itemName = itemName;
            item.itemLore = JSON.parse(itemLore == "" ? "[]" : itemLore);
            item.canDestroy = JSON.parse(canDestroy == "" ? "[]" : canDestroy);
            item.canPlaceOn = JSON.parse(canPlaceOn == "" ? "[]" : canPlaceOn);
            item.lockMode = [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode];
            item.keepOnDeath = keepOnDeath;
        }
        else if (item.itemType == "giveCommand") {
            let [title, texture, price, step, max, itemID, itemData] = r.formValues;
            item.title = title;
            item.texture = texture;
            item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
            item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
            item.max = Number.isNaN(Number(max)) ? 10 : Number(max);
            item.itemID = itemID;
            item.itemData = Number.isNaN(Number(itemData)) ? 10 : Number(itemData);
        }
        else if (item.itemType == "pre-made") {
            let [title, texture, price, step, max, structureID, entityID] = r.formValues;
            item.title = title;
            item.texture = texture;
            item.price = Number.isNaN(Number(price)) ? 10 : Number(price);
            item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
            item.max = Number.isNaN(Number(max)) ? 10 : Number(max);
            item.structureID = structureID;
            item.entityID = entityID;
        }
        else if (item.itemType == "sellable") {
            let [title, texture, value, step, max, itemID] = r.formValues;
            item.title = title;
            item.texture = texture;
            item.value = Number.isNaN(Number(value)) ? 10 : Number(value);
            item.step = Number.isNaN(Number(step)) ? 10 : Number(step);
            item.max = Number.isNaN(Number(max)) ? 10 : Number(max);
            item.itemID = itemID;
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
export async function manageServerShop_addItem(sourceEntitya, shop, type, mode) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    const form = new ModalFormData;
    form.title("Add Item");
    if (type == "newItemStack") {
        form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        form.textField("Price§c*", "10", "10");
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
        form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", "64");
        form.textField("Item Type§c*", "minecraft:stick");
        form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string");
        form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", "[]");
        form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]");
        form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]");
        form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], 0);
        form.toggle("Keep On Death", false);
    }
    else if (type == "giveCommand") {
        form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        form.textField("Price§c*", "10", "10");
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
        form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64");
        form.textField("Item Type§c*\n§6NOTE: Items of this type (§bgiveCommand§6) must be available in commands. So things like minecraft:netherreactor will not work, to use those other item types use either the newItemStack type or the pre-made type.", "minecraft:stick");
        form.textField("Data Value§c*", "0", "0");
    }
    else if (type == "pre-made" || type == "pre-made_manual") {
        form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        form.textField("Price§c*", "10", "10");
        form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1");
        form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64");
        form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", "andexdbSavedShopItem:0");
        form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", "0");
    }
    else if (type == "sellable") {
        form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick");
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick");
        form.textField("Button Index§c*", String(mode == "buy" ? shop.buyData.length : shop.sellData.length), String(mode == "buy" ? shop.buyData.length : shop.sellData.length));
        form.textField("Value§c*", "10", "10");
        form.textField("Sell Amount Step\n§oDefault is 1", "1", "1");
        form.textField("Max Sell Amount\n§oDefault is 64", "64", "64");
        form.textField("Item Type§c*", "minecraft:stick");
        // form.textField("Data Value§c*", "0", String(item))
    }
    return await forceShow(form, sourceEntity).then(async (r) => {
        // This will stop the code when the player closes the form
        if (r.canceled)
            return r;
        let item = undefined;
        let itemIndex = Number.isNaN(Number(r.formValues[2])) ? 10 : Number(r.formValues[2]);
        if (type == "newItemStack") {
            let [title, texture, itemIndex, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues;
            item = {
                type: "item",
                itemType: "newItemStack",
                title: title,
                texture: texture,
                price: Number.isNaN(Number(price)) ? 10 : Number(price),
                step: Number.isNaN(Number(step)) ? 10 : Number(step),
                max: Number.isNaN(Number(max)) ? 10 : Number(max),
                itemID: itemID,
                itemName: itemName,
                itemLore: JSON.parse(itemLore == "" ? "[]" : itemLore),
                canDestroy: JSON.parse(canDestroy == "" ? "[]" : canDestroy),
                canPlaceOn: JSON.parse(canPlaceOn == "" ? "[]" : canPlaceOn),
                lockMode: [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode],
                keepOnDeath: keepOnDeath
            };
        }
        else if (type == "giveCommand") {
            let [title, texture, itemIndex, price, step, max, itemID, itemData] = r.formValues;
            item = {
                type: "item",
                itemType: "giveCommand",
                title: title,
                texture: texture,
                price: Number.isNaN(Number(price)) ? 10 : Number(price),
                step: Number.isNaN(Number(step)) ? 10 : Number(step),
                max: Number.isNaN(Number(max)) ? 10 : Number(max),
                itemID: itemID,
                itemData: Number.isNaN(Number(itemData)) ? 10 : Number(itemData)
            };
        }
        else if (type == "pre-made" || type == "pre-made_manual") {
            let [title, texture, itemIndex, price, step, max, structureID, entityID] = r.formValues;
            item = {
                type: "item",
                itemType: "pre-made",
                title: title,
                texture: texture,
                price: Number.isNaN(Number(price)) ? 10 : Number(price),
                step: Number.isNaN(Number(step)) ? 10 : Number(step),
                max: Number.isNaN(Number(max)) ? 10 : Number(max),
                structureID: structureID,
                entityID: entityID
            };
        }
        else if (type == "sellable") {
            let [title, texture, itemIndex, value, step, max, itemID] = r.formValues;
            item = {
                type: "item",
                itemType: "sellable",
                title: title,
                texture: texture,
                value: Number.isNaN(Number(value)) ? 10 : Number(value),
                step: Number.isNaN(Number(step)) ? 10 : Number(step),
                max: Number.isNaN(Number(max)) ? 10 : Number(max),
                itemID: itemID
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
export async function manageServerShop_managePage(sourceEntitya, shop, page, pageIndex, mode) {
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
            case 1:
                await manageServerShop_editPage(sourceEntity, shop, page, pageIndex, mode);
                manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                break;
            case 2:
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
                    manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode);
                }
                break;
            case 3:
                break;
            default:
        }
        return r;
    });
}
export async function manageServerShop_editPage(sourceEntitya, shop, page, pageIndex, mode) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    const form = new ModalFormData;
    form.title("Edit Item");
    form.textField("§fPage Title§c*", "Items", page.pageTitle);
    form.textField("§fPage Body§c*", "The items category.", page.pageBody);
    form.textField("§fButton Title§c*", "Items", page.title);
    form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight", page.texture);
    return await forceShow(form, sourceEntity).then(async (r) => {
        // This will stop the code when the player closes the form
        if (r.canceled)
            return r;
        let [pageTitle, pageBody, title, texture] = r.formValues;
        page.pageTitle = pageTitle,
            page.pageBody = pageBody,
            page.title = title,
            page.texture = texture;
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
export async function manageServerShop_addPage(sourceEntitya, shop, mode) {
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
            type: "page",
            pageTitle: pageTitle,
            pageBody: pageBody,
            title: title,
            data: [],
            texture: texture
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
//# sourceMappingURL=server_shop.js.map