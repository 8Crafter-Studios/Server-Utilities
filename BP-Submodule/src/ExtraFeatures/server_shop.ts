import { ItemLockMode, ItemStack, Player, world, Entity, StructureSaveMode } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { config, getPathInObject } from "Main";
import { containerToContainerSlotArray, containerToItemStackArray } from "Main/command_utilities";
import { command, executeCommandPlayerW } from "Main/commands";
import { forceShow, itemSelector, settings, worldBorderSettingsDimensionSelector } from "Main/ui";
import { getStringFromDynamicProperties, getSuperUniqueID, saveStringToDynamicProperties, showActions, showMessage } from "Main/utilities";
import { type SellableShopElement, type BuyableShopElement, type ShopItem, type SellableShopItem, type ShopElement, mainShopSystemSettings, type ShopPage } from "./shop_main";
import { Vector } from "Main/coordinates";
import { MoneySystem } from "./money";
import type { PlayerShopManager, PlayerShop, playerShopConfig } from "./player_shop"

/**
 * @see {@link playerShopConfig}
 */
export type serverShopConfig = {
    /**
     * The id of the server shop.
     */
    id: `shop:${string}`,
    /**
     * The display name of the server shop. This is displayed on the button for the server shop in the manage server shops menu.
     */
    name?: string|null,
    /**
     * The title of the server shop. This is the title displayed at the top of the UI for the server shop.
     */
    title?: string|null,
    /**
     * The body text that is displayed on the main page of the server shop.
     */
    mainPageBodyText?: string|null,
    /**
     * The body text that is displayed on the main buy page of the server shop.
     * @todo
     */
    mainBuyPageBodyText?: string|null,
    /**
     * The body text that is displayed on the main sell page of the server shop.
     * @todo
     */
    mainSellPageBodyText?: string|null,
    /**
     * Whether or not players can sell items in this shop.
     */
    sellShop?: boolean|null,
    /**
     * Whether or not players can buy items in this shop.
     */
    buyShop?: boolean|null,
    /**
     * Whether or not this shop can be accessed by any player through the use of the \viewservershops command.
     */
    publicShop?: boolean|null
}

/**
 * @todo Convert the functions to async functions that return Promise<0|1>.
 * @see {@link PlayerShop}
 */
export class ServerShop{
    /**
     * The id of the server shop.
     */
    id: `shop:${string}`
    /**
     * The display name of the server shop. This is displayed on the button for the server shop in the manage server shops menu.
     */
    name?: string|null
    /**
     * The title of the server shop. This is the title displayed at the top of the UI for the server shop.
     */
    title?: string|null
    /**
     * The body text that is displayed on the main page of the server shop.
     */
    mainPageBodyText?: string|null
    /**
     * The body text that is displayed on the main buy page of the server shop.
     * @todo
     */
    mainBuyPageBodyText?: string|null
    /**
     * The body text that is displayed on the main sell page of the server shop.
     * @todo
     */
    mainSellPageBodyText?: string|null
    /**
     * Whether or not players can sell items in this shop.
     */
    sellShop: boolean
    /**
     * Whether or not players can buy items in this shop.
     */
    buyShop: boolean
    /**
     * Whether or not this shop can be accessed by any player through the use of the \viewservershops command.
     */
    publicShop: boolean
    constructor(config: serverShopConfig){
        this.id=config.id??null
        this.name=config.name??null
        this.title=config.title??null
        this.mainPageBodyText=config.mainPageBodyText??null
        this.mainBuyPageBodyText=config.mainBuyPageBodyText??null
        this.mainSellPageBodyText=config.mainSellPageBodyText??null
        this.sellShop=config.sellShop??true
        this.buyShop=config.buyShop??true
        this.publicShop=config.publicShop??false
    }
    save(){
        world.setDynamicProperty(this.id, JSON.stringify({
            id: this.id??null,
            name: this.name??null,
            mainPageBodyText: this.mainPageBodyText??null,
            mainBuyPageBodyText: this.mainBuyPageBodyText??null,
            mainSellPageBodyText: this.mainSellPageBodyText??null,
            title: this.title??null,
            sellShop: this.sellShop??true,
            buyShop: this.buyShop??true,
            publicShop: this.publicShop??false
        }))
    }
    /**
     * Opens the shop UI for the specified player.
     * @see {@link PlayerShop.openShop}
     * @async
     * @param player The player to open the shop UI for.
     * @param mode The mode to open this shop in.
     * @returns {Promise<0|1>} A promise that will resolve with either a 0 or a 1, a 0 meaning that the previous UI should not be re-opened, and a 1 meaning that it should.
     */
    async openShop(player: Player, mode: "buy"|"sell"|"both"|"none" = (this.sellShop&&this.buyShop) ? "both" : this.sellShop ? "sell" : this.buyShop ? "buy" : "both", showBackButton: boolean = true): Promise<0|1>{
        if(mode=="both"){
            const form = new ActionFormData
            if(!!this.title){form.title(this.title)}
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6--------------------------------${!!this.mainPageBodyText?"\n§r"+this.mainPageBodyText:""}`)
            form.button("Buy")
            form.button("Sell")
            if(showBackButton){form.button("Back", "textures/ui/arrow_left");}
            form.button("Close", "textures/ui/crossout");
            return await forceShow(form, player).then(async r=>{
                if(r.canceled==true||r.selection==(showBackButton?2:-2)){return 1}
                if(r.selection==2+(+showBackButton)){return 0}
                if(r.selection==0){
                    if((await this.openShop(player, "buy", true))==1){
                        return await this.openShop(player, "both", showBackButton)
                    }else{
                        return 0
                    }
                }else if(r.selection==1){
                    if((await this.openShop(player, "sell", true))==1){
                        return await this.openShop(player, "both", showBackButton)
                    }else{
                        return 0
                    }
                }else{
                    return 1
                }
            })
        }else if(mode=="sell"){
            const form = new ActionFormData
            if(!!this.title){form.title(this.title)}
            const data = tryget(()=>JSON.parse(getStringFromDynamicProperties("sellShop:"+this.id)) as SellableShopElement[])??[]
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6--------------------------------${!!this.mainSellPageBodyText?"\n§r"+this.mainSellPageBodyText:""}`)
            data.forEach(v=>{
                form.button(v.title, v.texture)
            });
            if(showBackButton){form.button("Back", "textures/ui/arrow_left");}
            form.button("Close", "textures/ui/crossout");
            return await forceShow(form, player).then(async r=>{
                if(r.canceled==true){return 1}
                if(r.selection==(showBackButton?data.length:-1)){return 1}
                if(r.selection==data.length+(+showBackButton)){return 0}
                const item = data[r.selection]
                if(item.type=="item"){
                    return await this.sellItem(player, item).then(async v=>{
                        if(v==1){return await this.openShop(player, "sell", showBackButton)}
                    })
                }else if(item.type=="page"){
                    if((await this.openShopPage(player, data, ["sell", String(r.selection)])) as any==1){
                        return await this.openShop(player, "sell", showBackButton)
                    }
                }
            })
        }else if(mode=="buy"){
            const form = new ActionFormData
            if(!!this.title){form.title(this.title)}
            const data = tryget(()=>JSON.parse(getStringFromDynamicProperties("buyShop:"+this.id)) as BuyableShopElement[])??[]
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6--------------------------------${!!this.mainBuyPageBodyText?"\n§r"+this.mainBuyPageBodyText:""}`)
            data.forEach(v=>{
                form.button(v.title, v.texture)
            });
            if(showBackButton){form.button("Back", "textures/ui/arrow_left");}
            form.button("Close", "textures/ui/crossout");
            return await forceShow(form, player).then(async r=>{
                if(r.canceled==true){return 1}
                if(r.selection==(showBackButton?data.length:-1)){return 1}
                if(r.selection==data.length+(+showBackButton)){return 0}
                const item = data[r.selection]
                if(item.type=="item"){
                    return await this.buyItem(player, item).then(async v=>{
                        if(v==1){return await this.openShop(player, "buy", showBackButton)}
                    })
                }else if(item.type=="page"){
                    if((await this.openShopPage(player, data, ["buy", String(r.selection)])) as any==1){
                        return await this.openShop(player, "buy", showBackButton)
                    }
                }
            })
        }else if(mode=="none"){/*
            const form = new MessageFormData
            form.title("404: Invalid Page")
            form.body("The page you are looking for does not exist. ")
            form.button1("Ok")
            form.button2("Cancel")
            forceShow(form, player)*/
            const form = new MessageFormData
            form.title(config.ui.other.useStarWarsReference404Page?"404: A Jedi has altered your mind.":"404: Invalid Page")
            form.body(config.ui.other.useStarWarsReference404Page?"Jedi: This is not the page you are looking for.":"The page you are looking for does not exist. ")
            form.button1("Ok")
            form.button2("Cancel")
            return ((await forceShow(form, player)).selection!=1).toNumber()
        }
    }
    /**
     * Opens the shop UI for the specified player.
     * @see {@link PlayerShop.openShopPage}
     * @async
     * @param player The player to open the shop UI for.
     * @param data The object representing this page of the shop.
     * @param path The path to this page of the shop.
     * @returns {Promise<0|1>} A promise that will resolve with either a 0 or a 1, a 0 meaning that the previous UI should not be re-opened, and a 1 meaning that it should.
     */
    async openShopPage<mode extends "buy"|"sell">(player: Player, data: (mode extends "buy" ? BuyableShopElement[] : SellableShopElement[]), path: [mode, ...string[]]): Promise<0|1>{
        const mode = path[0]
        if(mode=="sell"){
            const form = new ActionFormData
            const pageData: ShopPage|undefined = tryget(()=>getPathInObject(data, path))
            if(!!!pageData){
                const form = new MessageFormData
                form.title(config.ui.other.useStarWarsReference404Page?"404: A Jedi has altered your mind.":"404: Invalid Page")
                form.body(config.ui.other.useStarWarsReference404Page?"Jedi: This is not the page you are looking for.":"The page you are looking for does not exist. ")
                form.button1("Ok")
                form.button2("Cancel")
                return ((await forceShow(form, player)).selection!=1).toNumber()
            }
            if(!!pageData?.pageTitle){form.title(pageData.pageTitle)}
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6--------------------------------${!!pageData?.pageBody?"\n§r"+pageData.pageBody:""}`)
            let newData = pageData?.data as SellableShopElement[]
            newData.forEach(v=>{
                form.button(v.title, v.texture)
            });
            form.button("Back", "textures/ui/arrow_left");
            form.button("Close", "textures/ui/crossout");
            return await forceShow(form, player).then(async r=>{
                if(r.canceled==true){return 1}
                if(r.selection==newData.length){/*
                    if(path.slice(0, -1).length==1){
                        this.openShop(player, "sell")
                    }else{
                        this.openShopPage(player, data, path.slice(0, -2) as [typeof path[0], ...string[]])
                    };*/
                    return 1;
                }
                if(r.selection==newData.length+1){
                    return 0;
                }
                const item = newData[r.selection]
                if(item.type=="item"){
                    return await this.sellItem(player, item).then(async v=>{
                        if(v==1){return await this.openShopPage(player, data, path)}
                        return 0;
                    })
                }else if(item.type=="page"){
                    if((await this.openShopPage(player, data, [...path, "data", String(r.selection)]))==1){
                        return await this.openShopPage(player, data, path);
                    }else{
                        return 0;
                    }
                }
            })
        }else if(mode=="buy"){
            const form = new ActionFormData
            const pageData: ShopPage|undefined = tryget(()=>getPathInObject(data, path))
            if(!!!pageData){
                const form = new MessageFormData
                form.title(config.ui.other.useStarWarsReference404Page?"404: A Jedi has altered your mind.":"404: Invalid Page")
                form.body(config.ui.other.useStarWarsReference404Page?"Jedi: This is not the page you are looking for.":"The page you are looking for does not exist. ")
                form.button1("Ok")
                form.button2("Cancel")
                return ((await forceShow(form, player)).selection!=1).toNumber()
            }
            if(!!pageData?.pageTitle){form.title(pageData.pageTitle)}
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(player.id).money}
§6--------------------------------${!!pageData?.pageBody?"\n§r"+pageData.pageBody:""}`)
            let newData = pageData?.data as BuyableShopElement[]
            newData.forEach(v=>{
                form.button(v.title, v.texture)
            });
            form.button("Back", "textures/ui/arrow_left");
            form.button("Close", "textures/ui/crossout");
            return await forceShow(form, player).then(async r=>{
                if(r.canceled==true){return 1}
                if(r.selection==newData.length){/*
                    if(path.slice(0, -1).length==1){
                        this.openShop(player, "buy")
                    }else{
                        this.openShopPage(player, data, path.slice(0, -2) as [typeof path[0], ...string[]])
                    };*/
                    return 1;
                }
                if(r.selection==newData.length+1){
                    return 0;
                }
                const item = newData[r.selection]
                if(item.type=="item"){
                    return await this.buyItem(player, item).then(async v=>{
                        if(v==1){return await this.openShopPage(player, data, path)}
                        return 0;
                    })
                }else if(item.type=="page"){
                    if((await this.openShopPage(player, data, [...path, "data", String(r.selection)]))==1){
                        return await this.openShopPage(player, data, path);
                    }else{
                        return 0;
                    }
                }
            })
        }
    }
    editShopElements<T extends "buy"|"sell">(mode: T, data: (T extends "buy" ? BuyableShopElement : SellableShopElement)[]){
        saveStringToDynamicProperties(JSON.stringify(data), mode+"Shop:"+this.id)
    }
    get buyData(){
        try{return JSON.parse(getStringFromDynamicProperties("buyShop:"+this.id)) as BuyableShopElement[]}catch{return []}
    }
    set buyData(data: BuyableShopElement[]){
        saveStringToDynamicProperties(JSON.stringify(data), "buyShop:"+this.id)
    }
    get sellData(){
        try{return JSON.parse(getStringFromDynamicProperties("sellShop:"+this.id)) as SellableShopElement[]}catch{return []}
    }
    set sellData(data: SellableShopElement[]){
        saveStringToDynamicProperties(JSON.stringify(data), "sellShop:"+this.id)
    }
    static get(shopID: string){
        if(!!!world.getDynamicProperty(shopID)){return undefined}
        return new ServerShop(JSON.parse(String(world.getDynamicProperty(shopID))))
    }
    static getAll(){
        return this.getIds().map(v=>new ServerShop(JSON.parse(String(world.getDynamicProperty(v)))))
    }
    static getIds(){
        return world.getDynamicPropertyIds().filter(v=>v.startsWith("shop:"))
    }
    /**
     * @see {@link PlayerShop.buyItem}
     * @async
     * @param player 
     * @param item 
     * @returns 
     */
    async buyItem(player: Player, item: ShopItem): Promise<0|1>{
        try{
            const infoForm = new ActionFormData
            infoForm.title("Item Details")
            infoForm.body(
`§a${item.title}
§r§gPrice: ${item.price}
§r§bItem Type: §a${item.itemType=="giveCommand"?item.itemID:item.itemType=="newItemStack"?item.itemID:item.itemDetails?.typeId}${
item.itemType=="giveCommand"?"":`\n§r§bItem Name: §a${item.itemType=="newItemStack"?item.itemName:item.itemDetails?.nameTag}`}${
item.itemType=="giveCommand"?"":`\n§r§r§bLore: §c${item.itemType=="newItemStack"?item.itemLore?.length??0:item.itemDetails?.loreLineCount} Lines`}${
item.itemType=="pre-made"?`\n§r§bEnchantments: ${
item.itemDetails?.enchantments instanceof Array?"§d{\n"+item.itemDetails?.enchantments.map(v=>v.type.id+" "+v.level.toRomanNumerals()).join("\n")+"\n}":item.itemDetails?.enchantments}`:""}`
            )
            infoForm.button("Proceed to buy item")
            if(item.itemType!="giveCommand"){infoForm.button("More Details")}
            infoForm.button("Back", "textures/ui/arrow_left");
            infoForm.button("Close", "textures/ui/crossout");
            const ifr = await forceShow(infoForm, player)
            if(ifr.canceled||ifr.selection==1+(+(item.itemType!="giveCommand"))){return 1}
            if(ifr.selection==2+(+(item.itemType!="giveCommand"))){return 0}
            if(ifr.selection==((item.itemType!="giveCommand")?1:-1)){
                const infoFormB = new ActionFormData
                infoFormB.title("Item Details")
                if(item.itemType=="pre-made"){
                    world.structureManager.place(item.structureID, player.dimension, Vector.add(player.location, {x: 0, y: 10, z: 0}), {includeBlocks: false, includeEntities: true})
                    const entity = player.dimension.getEntitiesAtBlockLocation(Vector.add(player.location, {x: 0, y: 10, z: 0})).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==item.entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${item.entityID} was found inside of the specified structure.`)
                    }
                    const itemStack = entity.getComponent("inventory").container.getItem(0)
                    entity.remove()
                    infoFormB.body(
!!!itemStack?`§a${item.title}
§r§gPrice: ${item.price}
§r§cSomething went wrong and the rest of the information could not be obtained.`:`§a${item.title}
§r§gPrice: ${item.price}
§r§bItem Type: §a${itemStack.typeId}
§r§bItem Name: §a${JSON.stringify(itemStack.nameTag)}
§r§bLore: §a${JSON.stringify(itemStack.getLore(), undefined, 1)}
§r§bCan Destroy: §a${JSON.stringify(itemStack.getCanDestroy(), undefined, 1)}
§r§bCan Place On: §a${JSON.stringify(itemStack.getCanPlaceOn(), undefined, 1)}
§r§bLock Mode: §a${itemStack.lockMode}
§r§bKeep On Death: ${itemStack.keepOnDeath.toFormattedString()}
§r§bDynamic Properties: §r${tryget(()=>`${itemStack.getDynamicPropertyTotalByteCount()} Bytes: \n`+JSON.stringify(Object.fromEntries(itemStack.getDynamicPropertyIds().map(v=>["§r"+v, itemStack.getDynamicProperty(v)])), undefined, 1))??"N/A"}${
itemStack.hasComponent("durability")?`\n§r§bDurability: ${itemStack.getComponent("durability").damage<(itemStack.getComponent("durability").maxDurability/3)?"§a":itemStack.getComponent("durability").damage<(itemStack.getComponent("durability").maxDurability/1.5)?"§e":"§c"}{itemStack.getComponent("durability").maxDurability-itemStack.getComponent("durability").damage}/${itemStack.getComponent("durability").maxDurability}`:""}${
itemStack.hasComponent("potion")?`\n§r§bPotion Effect Type: §d${itemStack.getComponent("potion").potionEffectType.id}
§r§bPotion Liquid Type: §9${itemStack.getComponent("potion").potionLiquidType.id}
§r§bPotion Modifier Type: §e${itemStack.getComponent("potion").potionModifierType.id}`:""}
§r§bEnchantments: ${itemStack.hasComponent("enchantable")?itemStack.getComponent("enchantable").getEnchantments().length==0?"§d{}":"\n§d{\n"+itemStack.getComponent("enchantable").getEnchantments().map(v=>v.type.id+" "+v.level.toRomanNumerals()).join("\n")+"\n}":"N/A"}`
                    )
                }else if(item.itemType=="newItemStack"){
                    infoFormB.body(
`§a${item.title}
§r§6Stock: ${item.remainingStock}
§r§gPrice: ${item.price}
§r§bItem Type: §a${item.itemID}
§r§bItem Name: §a${JSON.stringify(item.itemName)}
§r§bLore: §a${JSON.stringify(item.itemLore, undefined, 1)}
§r§bCan Destroy: §a${JSON.stringify(item.canDestroy, undefined, 1)}
§r§bCan Place On: §a${JSON.stringify(item.canPlaceOn, undefined, 1)}
§r§bLock Mode: §a${item.lockMode}
§r§bKeep On Death: ${item.keepOnDeath.toFormattedString()}
§r§bDynamic Properties: §r${tryget(()=>JSON.stringify(item.dynamicProperties, undefined, 1))??"N/A"}`
                    )
                }else{}
                infoFormB.button("Proceed to buy item")
                infoFormB.button("Back")
                infoFormB.button("Close")
                const ifrb = await forceShow(infoFormB, player)
                if(ifrb.canceled||ifrb.selection==1){return 1}
                if(ifrb.selection==2){return 0}
            }/*
            if(item.remainingStock==0){
                return ((await showMessage(player, "Out Of Stock", "This item is out of stock.", "Go Back", "Close Shop")).selection==0).toNumber()
            }*/
            const form = new ModalFormData
            form.title("Buy "+item.title)
            form.slider(`§a${item.title}\n§gPrice: ${item.price}\n§fHow many would you like to buy?`, 0, item.max??64, item.step??1, item.step??1)
            const r = await forceShow(form, player)
            if(r.canceled==true||(r.formValues[0] as number)==0){return 1}
            if((MoneySystem.get(player.id).money)>=(item.price*(r.formValues[0] as number))){
                if(item.itemType=="newItemStack"){
                    let newItem = new ItemStack(item.itemID, r.formValues[0] as number)
                    newItem.nameTag=item.itemName
                    newItem.keepOnDeath=item.keepOnDeath
                    newItem.lockMode=item.lockMode
                    if(!!item.itemLore){newItem.setLore(item.itemLore)}
                    if(!!item.canDestroy){newItem.setCanDestroy(item.canDestroy)}
                    if(!!item.canPlaceOn){newItem.setCanPlaceOn(item.canPlaceOn)}
                    player.getComponent("inventory").container.addItem(newItem)
                    MoneySystem.get(player.id).removeMoney((item.price*(r.formValues[0] as number)))
                    return 1
                    // this.openShop(player, "sell")
                }else if(item.itemType=="giveCommand"){
                    player.runCommand(`/give @s ${item.itemID} ${r.formValues[0]} ${item.itemData}`)
                    MoneySystem.get(player.id).removeMoney((item.price*(r.formValues[0] as number)))
                    return 1
                    // this.openShop(player, "sell")
                }else if(item.itemType=="pre-made"){
                    world.structureManager.place(item.structureID, player.dimension, player.location, {includeBlocks: false, includeEntities: true})
                    const entity = player.dimension.getEntitiesAtBlockLocation(player.location).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==item.entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${item.entityID} was found inside of the specified structure.`)
                    }
                    const itemStack = entity.getComponent("inventory").container.getItem(0)
                    entity.remove()

                    for(let i = 0; i<(r.formValues[0] as number); i++){
                        let b = player.getComponent("inventory").container.addItem(itemStack)
                        if(!!b){
                            catchtry(()=>player.dimension.spawnItem(b, player.location))
                        }
                    }
                    MoneySystem.get(player.id).removeMoney((item.price*(r.formValues[0] as number)))
                    return 1
                }
            }else{
                const form = new MessageFormData
                form.title("Not Enough Money")
                form.body(`You do not have enough money to buy this item.\nYou currently have $${MoneySystem.get(player.id).money}.\nOne of this item costs $${item.price}.\nYou wanted to buy ${r.formValues[0]} of this item.\nThe total price is $${item.price*(r.formValues[0] as number)}.\nYou need another $${(item.price*(r.formValues[0] as number)).toBigInt()-(MoneySystem.get(player.id).money)} to buy this item.`)
                form.button1("Go Back")
                form.button2("Close Shop")
                const rb = await forceShow(form, player)
                if(rb.canceled==true||rb.selection==1){return 0}
                return 1
                // this.openShop(player, "buy")
            }
        }catch(e){console.error(e, e.stack)}
    }
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
    async sellItem(player: Player, item: SellableShopItem){
        try{
            const infoForm = new ActionFormData
            infoForm.title("Item Details")
            infoForm.body(
`§a${item.title}
§r§6Amount Wanted: ${item.amountWanted}
§r§gvalue: ${item.value}
§r§bItem Type: §a${item.itemID}`
            )
            infoForm.button("Proceed to sell item")
            infoForm.button("Back", "textures/ui/arrow_left");
            infoForm.button("Close", "textures/ui/crossout");
            const ifr = await forceShow(infoForm, player)
            if(ifr.canceled||ifr.selection==1){return 1}
            if(ifr.selection==2){return 0}
            const form = new ModalFormData
            form.title("Sell "+item.title)
            form.slider(`§a${item.title}\n§gValue: ${item.value}\n§fHow many would you like to sell?`, 0, item.max??64, item.step??1, item.step??1)
            const r = await forceShow(form, player)
            if(r.canceled==true||(r.formValues[0] as number)==0){return 1}
            const items = containerToContainerSlotArray(
                player.getComponent("inventory").container
            )
                .filter((v) => (v.hasItem() ? v?.typeId == item.itemID : false))
                .filter(
                    (v) =>
                        !(
                            (v.lockMode == "inventory" &&
                                !config.shopSystem.player
                                    .allowSellingLockInInventoryItems) ||
                            (v.lockMode == "slot" &&
                                !config.shopSystem.player.allowSellingLockInSlotItems) ||
                            (v.keepOnDeath &&
                                !config.shopSystem.player.allowSellingKeepOnDeathItems)
                        )
                );
            let itemCount = 0
            items.forEach(v=>itemCount+=v.amount)
            if(itemCount>=(r.formValues[0] as number)){
                if(item.itemType=="sellable"){
                    let amountToRemove = r.formValues[0] as number
                    const playerMoneySystem = MoneySystem.get(player.id)
                    for(let i = 0; amountToRemove>0; i++){
                        const iamount = items[i].amount
                        let amount = Math.min(amountToRemove, iamount)
                        if(amount==iamount){items[i].setItem()}else{items[i].amount-=amount}
                        playerMoneySystem.addMoney(item.value*amount)
                        amountToRemove-=amount
                    }
                    return 1
                    // this.openShop(player, "sell")
                }
            }else{
                const form = new MessageFormData
                form.title("Not Enough Items")
                form.body(`You do not have ${r.formValues[0]} of this item.\nYou currently have ${itemCount} of this item.\nYou wanted to sell ${r.formValues[0]} of this item.\nYou need another ${(r.formValues[0] as number)-itemCount} of this item.`)
                form.button1("Go Back")
                form.button2("Close Shop")
                const rb = await forceShow(form, player)
                if(rb.canceled==true||rb.selection==1){return}
                return 1
                // this.openShop(player, "sell")
            }
        }catch(e){console.error(e, e.stack)}
    }
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @see {@link PlayerShop.openPublicShopsSelector}
     * @param sourceEntitya 
     */
    static async openPublicShopsSelector(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form = new ActionFormData();
        form.title("Public Server Shops");
        const shopsList = (ServerShop.getAll()??[]).filter(s=>s.publicShop==true)
        if(shopsList.length==0){
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(sourceEntity.id).money}
§6--------------------------------
§rThere are currently no publicly available server shops.`)
        }else{
            form.body(`§6--------------------------------
§aMoney: $${MoneySystem.get(sourceEntity.id).money}
§6--------------------------------`)
        }
        shopsList.forEach(s=>{
            form.button(s.name??s.title??s.id)
        })
        if(sourceEntity.hasTag("admin")){
            form.button("Manage Shops\n§cAdmins Only", "textures/ui/op");
            form.button("Server Shop System Settings\n§cAdmins Only", "textures/ui/icon_setting");
        }
        form.button("Close", "textures/ui/crossout");/*
        form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return;
    
            let response = r.selection;
            switch (response) {
                case sourceEntity.hasTag("admin")?shopsList.length:-1:
                    if((await ServerShopManager.manageServerShops(sourceEntity))!=0){
                        return await ServerShop.openPublicShopsSelector(sourceEntity);
                    }else{
                        return 0;
                    }
                break;
                case sourceEntity.hasTag("admin")?shopsList.length+1:-2:
                    if((await ServerShopManager.serverShopSystemSettings(sourceEntity))!=0){
                        return await ServerShop.openPublicShopsSelector(sourceEntity);
                    }else{
                        return 0;
                    }
                break;
                case shopsList.length+(+sourceEntity.hasTag("admin"))*2:
                    return 1
                break;
                default:
                    if((await shopsList[response].openShop(sourceEntity as Player))==1){
                        return await ServerShop.openPublicShopsSelector(sourceEntity);
                    }else{
                        return 0;
                    }
            }
        }).catch(e => {
            console.error(e, e.stack);
            return 0;
        });
    }
}
export class LinkedServerShopCommands{
    static get LinkedCommands(){
        return tryget(()=>JSON.parse(getStringFromDynamicProperties("ServerShopSystem:LinkedServerShopCommands")) as [string, `shop:${string}`][])??[]
    }
    static set LinkedCommands(LinkedCommands){
        saveStringToDynamicProperties(JSON.stringify(LinkedCommands), "ServerShopSystem:LinkedServerShopCommands")
    }
    static addLinkedCommand(LinkedCommand: [string, `shop:${string}`]){
        saveStringToDynamicProperties(JSON.stringify(this.LinkedCommands.concat([LinkedCommand])), "ServerShopSystem:LinkedServerShopCommands")
    }
    static addLinkedCommands(LinkedCommands: [string, `shop:${string}`][]){
        saveStringToDynamicProperties(JSON.stringify(this.LinkedCommands.concat(LinkedCommands)), "ServerShopSystem:LinkedServerShopCommands")
    }
    static removeCommandLinkedToShop(shopID: `shop:${string}`){
        saveStringToDynamicProperties(JSON.stringify([...this.LinkedCommands.filter(c=>c[1]!=shopID)]), "ServerShopSystem:LinkedServerShopCommands")
    }
    static removeCommandsLinkedToShops(shopIDs: `shop:${string}`[]){
        saveStringToDynamicProperties(JSON.stringify([...this.LinkedCommands.filter(c=>!shopIDs.includes(c[1]))]), "ServerShopSystem:LinkedServerShopCommands")
    }
    static removeCommand(command: string){
        saveStringToDynamicProperties(JSON.stringify([...this.LinkedCommands.filter(c=>c[0]!=command)]), "ServerShopSystem:LinkedServerShopCommands")
    }
    static removeCommands(commands: string[]){
        saveStringToDynamicProperties(JSON.stringify([...this.LinkedCommands.filter(c=>!commands.includes(c[0]))]), "ServerShopSystem:LinkedServerShopCommands")
    }
    static getIndexOfShopID(shopID: `shop:${string}`){
        return this.LinkedCommands.findIndex(c=>c[1]==shopID)
    }
    static relinkShopIDCommand(shopID: `shop:${string}`, newCommand: string){
        const LinkedCommands = this.LinkedCommands
        LinkedCommands.find(c=>c[1]==shopID)[0]=newCommand
        this.LinkedCommands=LinkedCommands
    }
    static testShopHasLinkedCommand(shopID: `shop:${string}`){
        return !!this.LinkedCommands.find(c=>c[1]==shopID)
    }
    static testCommandIsLinked(commandString: string){
        const str = commandString.split(" ")[0]
        return !!this.LinkedCommands.find(c=>c[0]==str)
    }
    static openShopForCommand(commandString: string, player: Player){
        const str = commandString.split(" ")[0]
        ServerShop.get(this.LinkedCommands.find(c=>c[0]==str)[1]).openShop(player)
    }
}
/**
 * @todo Convert the functions to async functions that return Promise<0|1>.
 * @see {@link PlayerShopManager}
 */
export class ServerShopManager{
    /**
     * 
     * @see {@link PlayerShopManager.playerShopItemTextureHints}
     */
    static serverShopItemTextureHints = ["textures/items/stick", "textures/blocks/gravel", "textures/blocks/reactor_core_stage_0"]
    /**
     * 
     * @see {@link PlayerShopManager.playerShopPageTextureHints}
     */
    static serverShopPageTextureHints = ["textures/ui/arrowRight"]
    /**
     * 
     * @see {@link PlayerShopManager.playerShopItemTextureHint}
     */
    static get serverShopItemTextureHint(){return this.serverShopItemTextureHints[Math.floor(Math.random()*this.serverShopItemTextureHints.length)]}
    /**
     * 
     * @see {@link PlayerShopManager.playerShopPageTextureHint}
     */
    static get serverShopPageTextureHint(){return this.serverShopPageTextureHints[Math.floor(Math.random()*this.serverShopPageTextureHints.length)]}
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.playerShopSystemSettings}.
     * @see {@link PlayerShopManager.playerShopSystemSettings}
     * @param sourceEntitya 
     */
    static async serverShopSystemSettings(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form = new ActionFormData();
        form.title("Server Shop System");
        form.body("The server shop system is "+(config.shopSystem.server.enabled?"§aEnabled":"§cDisabled"));
        form.button("Manage Shops", "textures/ui/store_home_icon");
        form.button("Main Settings", "textures/ui/icon_setting");
        form.button("§cShop Item Settings", "textures/ui/icon_items");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    /**
                     * @todo
                     */
                    if((await ServerShopManager.manageServerShops(sourceEntity)) as any==1){
                        return await ServerShopManager.serverShopSystemSettings(sourceEntity);
                    }else{
                        return 0;
                    }
                break;
                case 1:
                    /**
                     * @todo
                     */
                    if((await ServerShopManager.serverShopSystemSettings_main(sourceEntity)) as any==1){
                        return await ServerShopManager.serverShopSystemSettings(sourceEntity);
                    }else{
                        return 0;
                    }
                break;
                case 2:
                    return await showMessage(sourceEntity as Player, undefined, "§cSorry, the shop item does not exist yet.", "Back", "Close").then(async r=>{
                        if(r.selection==0){
                            return await ServerShopManager.serverShopSystemSettings(sourceEntity)
                        }else{
                            return 0;
                        }
                    })
                    // shopItemSettings(sourceEntity)
                break;
                case 3:
                    // mainShopSystemSettings(sourceEntity)
                    return 1;
                break;
                case 4:
                    return 0;
                break;
                default:
                    return 1;
            }
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1;
        });
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.playerShopSystemSettings_main}.
     * @see {@link PlayerShopManager.playerShopSystemSettings_main}
     * @param sourceEntitya 
     */
    static async serverShopSystemSettings_main(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form2 = new ModalFormData();
        form2.title(`Server Shop System Settings`)
        form2.toggle(`§l§fEnabled§r§f\nWhether or not the server shop system is enabled, default is false`, config.shopSystem.server.enabled)
        form2.submitButton("Save")
        return await forceShow(form2, (sourceEntity as Player)).then(t => {
            if (t.canceled) {return 1;};
            let [ enabled ] = t.formValues as [ enabled: boolean ];
            config.shopSystem.server.enabled=enabled
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1
        }) as 1;
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShops}.
     * @param sourceEntitya 
     */
    static async manageServerShops(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form = new ActionFormData();
        form.title("Manage Server Shops");
        form.body("The server shop system is "+(config.shopSystem.server.enabled?"§aEnabled":"§cDisabled"));
        const shopsList = ServerShop.getAll()
        shopsList.forEach(s=>{
            form.button(s.name??s.title??s.id)
        })
        form.button("New Shop", "textures/ui/color_plus");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");/*
        form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case shopsList.length:
                    if((await ServerShopManager.addServerShop(sourceEntity))==1){
                        return await ServerShopManager.manageServerShops(sourceEntity)
                    }else{
                        return 0
                    }
                break;
                case shopsList.length+1:
                    return 1
                break;
                case shopsList.length+2:
                    return 0
                break;
                default:
                    if((await ServerShopManager.manageServerShop(sourceEntity, shopsList[response]))==1){
                        return await ServerShopManager.manageServerShops(sourceEntity)
                    }else{
                        return 0
                    }
    
            }
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1
        });
    }
    
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.addPlayerShop}.
     * @param sourceEntitya 
     */
    static async addServerShop(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form2 = new ModalFormData();
        form2.title(`Server Shop System Settings`)
        form2.textField(`§l§fShop ID§r§c*§f\nThe ID of the shop\nThis ID must be unique, all server shops must have different IDs.`, "string")
        form2.textField(`§l§fButton Title§r§f\nThe title of the button for this shop\n§o§7Currently only shows up in the menu to edit the shops.`, "Main Server Shop", "Main Server Shop")
        form2.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "Main Server Shop", "Main Server Shop")
        form2.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "This is the main server shop.", "This is main server shop.")
        form2.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, true)
        form2.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, true)
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewservershops command, default is true`, true)
        form2.submitButton("Save")
        return await forceShow(form2, (sourceEntity as Player)).then(t => {
            if (t.canceled) {return 1;};
            let [ id, name, title, mainPageBodyText, buyShop, sellShop, publicShop ] = t.formValues as [ id: string, name: string, title: string, mainPageBodyText: string, buyShop: boolean, sellShop: boolean, publicShop: boolean ];
            const shop = new ServerShop({
                id: `shop:${id}`,
                name: JSON.parse("\""+(name.replaceAll("\"", "\\\""))+"\""),
                title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                mainPageBodyText: JSON.parse("\""+(mainPageBodyText.replaceAll("\"", "\\\""))+"\""),
                buyShop: buyShop,
                sellShop: sellShop,
                publicShop: publicShop
            })
            
            shop.save()
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1
        }) as 1;
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop}.
     * @param sourceEntitya 
     * @param shop 
     */
    static async manageServerShop(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form = new ActionFormData();
        form.title("Manage "+shop.title);
        form.body(`ID: ${shop.id}
Display Name: ${shop.name}
Title: ${shop.title}
Is Buy Shop: ${shop.buyShop?"§aTrue":"§cFalse"}
§rIs Sell Shop: ${shop.sellShop?"§aTrue":"§cFalse"}`)
        form.button("Manage Items/Pages", "textures/ui/book_edit_default");
        form.button(`${LinkedServerShopCommands.testShopHasLinkedCommand(shop.id)?"Edit":"Add"} Linked Command\n${LinkedServerShopCommands.testShopHasLinkedCommand(shop.id)?LinkedServerShopCommands.LinkedCommands.find(c=>c[1]==shop.id):"Not Set"}`, LinkedServerShopCommands.testShopHasLinkedCommand(shop.id)?"textures/ui/book_edit_default":"textures/ui/color_plus");
        form.button("Shop Settings", "textures/ui/icon_setting");
        form.button("View Shop", "textures/ui/feedIcon");
        if(config.system.debugMode){
            form.button("Raw Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button("Edit Raw\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button("Edit JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button("Raw Buy Shop Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button("Edit Buy Shop JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
            form.button("Raw Sell Shop Data\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_metatag_default");
            form.button("Edit Sell Shop JSON\n§c(Admins Only) §8(Debug Mode Only)", "textures/ui/book_edit_default");
        }
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    if(shop.buyShop&&shop.sellShop){
                        if((await ServerShopManager.manageServerShop_contents(sourceEntity, shop, (await showMessage(sourceEntity as Player, "Manage Buy or Sell Shop", "Would you like to edit the buy shop or the sell shop?\nThe buy shop is where players buy items, while the sell shop is where players sell items.", "Edit Buy Shop", "Edit Sell Shop")).selection==0?"buy":"sell"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }
                    }else if(shop.buyShop){
                        if((await ServerShopManager.manageServerShop_contents(sourceEntity, shop, "buy"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }
                    }else if(shop.sellShop){
                        if((await ServerShopManager.manageServerShop_contents(sourceEntity, shop, "sell"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }
                    }else{
                        if((await showMessage(sourceEntity as Player, "§cInvalid Shop Settings", "§cError: Invalid Shop Settings.\nA shop cannot have both the §eBuy Shop§c and §eSell Shop§c options disabled.", "Back", "Close")).selection==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }
                    }
                    return 0;
                break;
                case 1:
                    if((await (LinkedServerShopCommands.testShopHasLinkedCommand(shop.id)?ServerShopManager.manageServerShop_editLinkedCommand:ServerShopManager.manageServerShop_addLinkedCommand)(sourceEntity, shop))==1){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop);
                    }
                    return 0;
                break;
                case 2:
                    if((await ServerShopManager.manageServerShop_settings(sourceEntity, shop))==1){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop);
                    }
                    return 0;
                break;
                case 3:
                    if(shop.buyShop&&shop.sellShop){
                        if((await shop.openShop(sourceEntity as Player, "both"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }else{
                            return 0;
                        }
                    }else if(shop.buyShop){
                        if((await shop.openShop(sourceEntity as Player, "buy"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }else{
                            return 0;
                        }
                    }else if(shop.sellShop){
                        if((await shop.openShop(sourceEntity as Player, "sell"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }else{
                            return 0;
                        }
                    }else{
                        if((await shop.openShop(sourceEntity as Player, "none"))==1){
                            return await ServerShopManager.manageServerShop(sourceEntity, shop);
                        }else{
                            return 0;
                        }
                    }
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?4:-4:
                    await showActions(sourceEntity as Player, "Debug Info", `Raw Shop Data: \n${JSON.stringify(shop, (k, v)=>{if(typeof v == "string"){return "§r"+v+"§r"}else{return v}}, 2)}`, ["Done"])
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?5:-5:
                    const formb = new ModalFormData().title("Edit Raw Shop Data")
                    let data = Object.entries(JSON.parse(JSON.stringify(shop)))
                    data.forEach(v=>formb.textField(v[0], typeof v[1], JSON.stringify(v[1])))
                    const rd = await formb.forceShow(sourceEntity as Player)
                    if(rd.canceled){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop)
                    }
                    let newData = Object.fromEntries(data.map((v, i)=>[v[0], JSON.parse(rd.formValues[i] as string)]))
                    shop.id=newData.id
                    shop.title=newData.title
                    shop.mainPageBodyText=newData.mainPageBodyText
                    shop.mainSellPageBodyText=newData.mainSellPageBodyText
                    shop.mainBuyPageBodyText=newData.mainBuyPageBodyText
                    shop.name=newData.name
                    shop.buyShop=newData.buyShop
                    shop.sellShop=newData.sellShop
                    shop.publicShop=newData.publicShop
                    shop.save()
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?6:-6:
                    const formc = new ModalFormData().title("Edit JSON Shop Data")
                    formc.textField("JSON", "JSON", JSON.stringify(shop))
                    const re = await formc.forceShow(sourceEntity as Player)
                    if(re.canceled){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop)
                    }
                    let newDataB = JSON.parse(re.formValues[0] as string) as serverShopConfig
                    shop.id=newDataB.id
                    shop.title=newDataB.title
                    shop.mainPageBodyText=newDataB.mainPageBodyText
                    shop.mainSellPageBodyText=newDataB.mainSellPageBodyText
                    shop.mainBuyPageBodyText=newDataB.mainBuyPageBodyText
                    shop.name=newDataB.name
                    shop.buyShop=newDataB.buyShop
                    shop.sellShop=newDataB.sellShop
                    shop.publicShop=newDataB.publicShop
                    shop.save()
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?7:-7:
                    await showActions(sourceEntity as Player, "Debug Info", `Raw Buy Shop Data: \n${JSON.stringify(shop.buyData, (k, v)=>{if(typeof v == "string"){return "§r"+v+"§r"}else{return v}}, 2)}`, ["Done"])
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?8:-8:
                    const formd = new ModalFormData().title("Edit JSON Buy Shop Data")
                    formd.textField("JSON", "JSON", JSON.stringify(shop.buyData))
                    const rf = await formd.forceShow(sourceEntity as Player)
                    if(rf.canceled){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop)
                    }
                    let newDataC = JSON.parse(rf.formValues[0] as string)
                    shop.sellData=newDataC
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?9:-9:
                    await showActions(sourceEntity as Player, "Debug Info", `Raw Sell Shop Data: \n${JSON.stringify(shop.sellData, (k, v)=>{if(typeof v == "string"){return "§r"+v+"§r"}else{return v}}, 2)}`, ["Done"])
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case (sourceEntity.hasTag("admin")&&config.system.debugMode)?10:-10:
                    const forme = new ModalFormData().title("Edit JSON Sell Shop Data")
                    forme.textField("JSON", "JSON", JSON.stringify(shop.sellData))
                    const rg = await forme.forceShow(sourceEntity as Player)
                    if(rg.canceled){
                        return await ServerShopManager.manageServerShop(sourceEntity, shop)
                    }
                    let newDataD = JSON.parse(rg.formValues[0] as string)
                    shop.sellData=newDataD
                    return await ServerShopManager.manageServerShop(sourceEntity, shop)
                break;
                case 4+(+(sourceEntity.hasTag("admin")&&config.system.debugMode)*7):
                    return 1;
                break;
                case 5+(+(sourceEntity.hasTag("admin")&&config.system.debugMode)*7):
                    return 0;
                break;
                default:
                    return 1;
    
            }
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 0
        });
    }
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_settings}.
     * @param sourceEntitya 
     * @param shop 
     */
    static async manageServerShop_settings(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form2 = new ModalFormData();
        form2.title(`${shop.title} Settings`)
        form2.textField(`§l§fButton Title§r§f\nThe title of the button for this shop`, "My Shop", JSON.stringify(shop.name??"").slice(1, -1).replaceAll("\\\"", "\""))
        form2.textField(`§l§fPage Title§r§f\nThe title that shows at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.title??"").slice(1, -1).replaceAll("\\\"", "\""))
        form2.textField(`§l§fPage Body Text§r§f\nThe message that shows at right above the list of buttons at the top of the main page for this shop`, "My Shop", JSON.stringify(shop.mainPageBodyText??"").slice(1, -1).replaceAll("\\\"", "\""))
        form2.toggle(`§l§fIs Buy Shop§r§f\nWhether or not players can buy items in this shop, default is true`, shop.buyShop??true)
        form2.toggle(`§l§fIs Sell Shop§r§f\nWhether or not players can sell items in this shop, default is true`, shop.sellShop??true)
        form2.toggle(`§l§fPublic Shop§r§f\nWhether or not this shop can be accessed by any player through the use of the \\viewservershops command, default is true`, shop.publicShop??true)
        form2.submitButton("Save")
        return await forceShow(form2, (sourceEntity as Player)).then(async t => {
            if (t.canceled) {return 1;};
            let [ name, title, mainPageBodyText, buyShop, sellShop, publicShop ] = t.formValues as [ name: string, title: string, mainPageBodyText: string, buyShop: boolean, sellShop: boolean, publicShop: boolean ];
            shop.name=JSON.parse("\""+(name.replaceAll("\"", "\\\""))+"\"")
            shop.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
            shop.mainPageBodyText=JSON.parse("\""+(mainPageBodyText.replaceAll("\"", "\\\""))+"\"")
            shop.buyShop=buyShop
            shop.sellShop=sellShop
            shop.publicShop=publicShop
            shop.save()
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1
        }) as 1;
    }
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @param sourceEntitya 
     * @param shop 
     */
    static async manageServerShop_editLinkedCommand(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form2 = new ModalFormData();
        form2.title(`Editing Linked Command For ${shop.title}`)
        form2.textField(`§l§fCommand§r§f\nThe command to open this shop, you must include the prefix\nLeave the text box blank to remove the command.`, "\\myshop", LinkedServerShopCommands.LinkedCommands.find(c=>c[1]==shop.id)[0])
        form2.submitButton("Save")
        return await forceShow(form2, (sourceEntity as Player)).then(t => {
            if (t.canceled) {return 1;};
            let [ command ] = t.formValues as [ command: string ];
            if(command.trim()==""){
                LinkedServerShopCommands.removeCommandLinkedToShop(shop.id)
            }else{
                LinkedServerShopCommands.relinkShopIDCommand(shop.id, command.trim().split(" ")[0])
            }
            return 1
        }).catch(e => {
            console.error(e, e.stack);
            return 1
        }) as 1;
    }
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @param sourceEntitya 
     * @param shop 
     * @returns 
     */
    static async manageServerShop_addLinkedCommand(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form2 = new ModalFormData();
        form2.title(`Adding Linked Command For ${shop.title}`)
        form2.textField(`§l§fCommand§r§f\nThe command to open this shop, you must include the prefix`, "\\myshop")
        form2.submitButton("Save")
        try{
            const t = await forceShow(form2, (sourceEntity as Player))
            if (t.canceled) {return 1;};
            let [ command ] = t.formValues as [ command: string ];
            if(command.trim()!=""){
                LinkedServerShopCommands.addLinkedCommand([command.trim().split(" ")[0], shop.id])
                ServerShopManager.manageServerShop(sourceEntity, shop); 
                return 1
            }else{
                if((await showMessage(sourceEntity as Player, "Invalid Input", "The command cannot be blank.", "Back", "Close")).selection==0){
                    return 1
                }
                return 0
            }
        }catch(e){
            console.error(e, e.stack);
        }
        return 1
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_contents}.
     * @param sourceEntitya 
     * @param shop 
     * @param mode 
     */
    static async manageServerShop_contents(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, mode: "buy"|"sell" = "buy"): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        let form = new ActionFormData();
        form.title(`Manage ${shop.title??""} Contents`);
        if(!!shop.mainPageBodyText)form.body(shop.mainPageBodyText);
        const shopData = tryget(()=>{return shop[mode+"Data" as `${"buy"|"sell"}Data`] as (BuyableShopElement|SellableShopElement)[]})??[] as (BuyableShopElement|SellableShopElement)[];
        shopData.forEach(s=>{
            form.button(s.title, s.texture)
        })
        form.button("Add Item", "textures/ui/book_addpicture_default");
        form.button("Add Page", "textures/ui/book_addtextpage_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case shopData.length:
                    const type: "giveCommand"|"newItemStack"|"pre-made"|"pre-made_manual"|"sellable" = mode=="buy"?
                    ["giveCommand", "newItemStack", "pre-made", "pre-made_manual"][
                        (await showActions(
                            sourceEntity as Player,
                            "Select Item Mode",
                            "What mode would you like to create the item in?"+
                                "\n§bGive Command§f: Uses the give command to give players the item, can only do items that are available in commands (so things like minecraft:netherreactor will not work), and can only set item id and data value."+
                                "\n§bNew Item Stack§f: Uses the Script API to create the item, can use any item type even if it is not available in commands (so minecraft:netherreactor will work), also allows you to set the following properties of the item: name, lore, canDestroy, canPlaceOn, lockMode, keepOnDeath."+
                                "\n§bPre-Made§f: Saves an already existing item from your inventory to the inventory slot of an andexdb:saved_shop_item entity and saves that entity in a structure block, then when a player purchases an item, the structure is loaded and it clones a copy of the item from the entity's inventory to the player's inventory. This will preserve ALL NBT from the item, including any illegal enchantments."+
                                "\n§bManual Pre-Made§f: Lets you choose the Structure ID of the structure with the andexdb:saved_shop_item entity in it, and the value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item entity that has the item in it.",
                            ["Give Command"],
                            ["New Item Stack"],
                            ["Pre-Made"],
                            ["Manual Pre-Made"]
                        )).selection as 0|1|2|3
                    ] as "giveCommand"|"newItemStack"|"pre-made"|"pre-made_manual":
                    "sellable" as "sellable"
                    if(type=="pre-made"){
                        const item = await itemSelector(sourceEntity, sourceEntity, ServerShopManager.manageServerShop_contents, sourceEntity, shop, mode)
                        const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", {x: Math.floor(sourceEntity.location.x)+0.5, y: Math.floor(sourceEntity.location.y)+0.5, z: Math.floor(sourceEntity.location.z)+0.5})
                        const entityID = getSuperUniqueID()
                        entity.setDynamicProperty("andexdb:saved_shop_item_save_id", entityID)
                        entity.getComponent("inventory").container.setItem(0, item.item.getItem())
                        world.structureManager.createFromWorld(
                            "andexdbSavedShopItem:"+entityID,
                            sourceEntity.dimension,
                            {
                                x: Math.floor(sourceEntity.location.x),
                                y: Math.floor(sourceEntity.location.y),
                                z: Math.floor(sourceEntity.location.z)
                            },
                            {
                                x: Math.floor(sourceEntity.location.x),
                                y: Math.floor(sourceEntity.location.y),
                                z: Math.floor(sourceEntity.location.z)
                            },
                            {
                                includeBlocks: false,
                                includeEntities: true,
                                saveMode: StructureSaveMode.World
                            }
                        )
                        const form2 = new ModalFormData;
                        form2.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick")
                        form2.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick")
                        form2.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
                        form2.textField("Price§c*", "10", "10"); 
                        form2.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
                        form2.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
                        const r = await forceShow(form2, sourceEntity as Player)
                        let [title, texture, itemIndex, price, step, max] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, structureID: string, entityID: string];
                        const itemB = {
                            type: "item",
                            itemType: "pre-made",
                            title: title,
                            texture: texture,
                            price: Number.isNaN(Number(price))?10:Number(price),
                            step: Number.isNaN(Number(step))?10:Number(step),
                            max: Number.isNaN(Number(max))?10:Number(max),
                            structureID: "andexdbSavedShopItem:"+entityID,
                            entityID: entityID,
                            itemDetails: {
                                damage: tryget(()=>item.item.getItem().getComponent("durability").damage)??NaN,
                                maxDurability: tryget(()=>item.item.getItem().getComponent("durability").maxDurability)??NaN,
                                keepOnDeath: item.item.keepOnDeath,
                                lockMode: item.item.lockMode,
                                loreLineCount: item.item.getLore().length,
                                typeId: item.item.typeId,
                                nameTag: item.item.nameTag,
                                enchantments: tryget(()=>item.item.getItem().getComponent("enchantable").getEnchantments())??"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                            }
                        }
                        let itemIndexB = Number.isNaN(Number(itemIndex))?(mode=="buy"?shop.buyData.length:shop.sellData.length):Number(itemIndex)
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(itemIndexB, 0, itemB as ShopItem)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(itemIndexB, 0, itemB as any)
                            shop.sellData=newData
                        }
                        return await ServerShopManager.manageServerShop_contents(sourceEntity, shop, mode)
                    }else if(!!!type){
                        return await ServerShopManager.manageServerShop_contents(sourceEntity, shop, mode)
                    }else{
                        if((await ServerShopManager.manageServerShop_addItem(sourceEntity, shop, type, mode))==1){
                            return await ServerShopManager.manageServerShop_contents(sourceEntity, shop, mode)
                        }
                        return 0
                    }
                break;
                case shopData.length+1:
                    if((await ServerShopManager.manageServerShop_addPage(sourceEntity, shop, mode))==1){
                        return await ServerShopManager.manageServerShop_contents(sourceEntity, shop, mode)
                    }
                    return 0
                break;
                case shopData.length+2:
                    return 1
                break;
                case shopData.length+3:
                    return 0
                break;
                default:
                    if((shopData[response].type=="item"?await ServerShopManager.manageServerShop_manageItem(sourceEntity, shop, shopData[response] as SellableShopItem|ShopItem, response, mode):await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, shopData[response] as ShopPage, response, mode))==1){
                        return await ServerShopManager.manageServerShop_contents(sourceEntity, shop, mode)
                    }
                    return 0
    
            }
        }).catch(async e => {
            try{if((await showMessage(sourceEntity as Player, "§cError", `§c${e} ${e.stack}`, "Back", "Close")).selection==1){return 1}else{return 0}}catch{console.error(e, e.stack);};
            return 0;
        });
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_manageItem}.
     * @param sourceEntitya 
     * @param shop 
     * @param item 
     * @param itemIndex 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_manageItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number, mode: mode): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ActionFormData;
        form.title("Manage "+item.title);
        form.body(
`Type: ${item.itemType}
Title: ${item.title}
Texture: ${item.texture}
${mode=="buy"?"Purchase":"Sell"} Amount Step: ${item.step}
Maximum ${mode=="buy"?"Purchase":"Sell"} Amount: ${item.max}
${mode=="buy"?"Price":"Value"}: ${mode=="buy"?(item as ShopItem).price:(item as SellableShopItem).value}`
        )
        form.button("Move Item", "textures/ui/move");
        form.button("Edit Item", "textures/ui/book_edit_default");
        form.button("Delete Item", "textures/ui/book_trash_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex))
                    const r = await forceShow(form2, sourceEntity as Player)
                    if(!Number.isNaN(Number(r.formValues[0]))){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(itemIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, item as ShopItem)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(itemIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, item as SellableShopItem)
                            shop.sellData=newData
                        }
                        return await ServerShopManager.manageServerShop_manageItem(sourceEntity, shop, item, Number(r.formValues[0]), mode)
                    }
                    return await ServerShopManager.manageServerShop_manageItem(sourceEntity, shop, item, itemIndex, mode)
                break;
                case 1:
                    if((await ServerShopManager.manageServerShop_editItem(sourceEntity, shop, item, itemIndex, mode))==1){
                        return await ServerShopManager.manageServerShop_manageItem(sourceEntity, shop, item, itemIndex, mode)
                    }
                    return 0
                break;
                case 2:
                    const sureOfItemDeletion = await showMessage(sourceEntity as Player, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes")
                    if(sureOfItemDeletion.selection==1){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(itemIndex, 1)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(itemIndex, 1)
                            shop.sellData=newData
                        }
                        return 1
                    }else{
                        return await ServerShopManager.manageServerShop_manageItem(sourceEntity, shop, item, itemIndex, mode)
                    }
                break;
                case 3:
                    return 1
                break;
                case 4:
                    return 0
                break;
                default:
                    return 1
    
            }
            return 1
        });
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_editItem}.
     * @param sourceEntitya 
     * @param shop 
     * @param item 
     * @param itemIndex 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_editItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number, mode: mode): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ModalFormData;
        form.title("Manage "+item.title);
        if(item.itemType=="newItemStack"){
            form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string", !!!item.itemName?undefined:JSON.stringify(item.itemName).slice(1, -1).replaceAll("\\\"", "\"")); 
            form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.itemLore)); 
            form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canDestroy)); 
            form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canPlaceOn)); 
            form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory].indexOf(item.lockMode)); 
            form.toggle("Keep On Death", item.keepOnDeath); 
        }else if(item.itemType=="giveCommand"){
            form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Data Value§c*", "0", String(item.itemData))
        }else if(item.itemType=="pre-made"){
            form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))
        }else if(item.itemType=="sellable"){
            form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Value§c*", "10", String(item.value)); 
            form.textField("Sell Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Sell Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            if(item.itemType=="newItemStack"){
                let [title, texture, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, itemID: string, itemName: string, itemLore: string, canDestroy: string, canPlaceOn: string, none_slot_inventory: 0|1|2, lockMode: boolean];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
                item.itemName=JSON.parse("\""+(itemName.replaceAll("\"", "\\\""))+"\"")
                item.itemLore=JSON.parse(itemLore==""?"[]":itemLore)
                item.canDestroy=JSON.parse(canDestroy==""?"[]":canDestroy)
                item.canPlaceOn=JSON.parse(canPlaceOn==""?"[]":canPlaceOn)
                item.lockMode=[ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode]
                item.keepOnDeath=keepOnDeath
            }else if(item.itemType=="giveCommand"){
                let [title, texture, price, step, max, itemID, itemData] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, itemID: string, itemData: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
                item.itemData=Number.isNaN(Number(itemData))?10:Number(itemData)
            }else if(item.itemType=="pre-made"){
                let [title, texture, price, step, max, structureID, entityID] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, structureID: string, entityID: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")
                let entity: Entity = undefined
                let itemStack: ItemStack = undefined
                try{
                    world.structureManager.place(item.structureID, sourceEntity.dimension, Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0}), {includeBlocks: false, includeEntities: true})
                    entity = sourceEntity.dimension.getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0})).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==item.entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${entityID} was found inside of the specified structure.`)
                    }
                    itemStack = entity.getComponent("inventory").container.getItem(0);
                    item.itemDetails??={} as any
                    item.itemDetails.damage=!!!itemStack?null:tryget(()=>itemStack.getComponent("durability").damage)??NaN,
                    item.itemDetails.maxDurability=!!!itemStack?null:tryget(()=>itemStack.getComponent("durability").maxDurability)??NaN,
                    item.itemDetails.keepOnDeath=!!!itemStack?null:itemStack.keepOnDeath,
                    item.itemDetails.lockMode=!!!itemStack?null:itemStack.lockMode,
                    item.itemDetails.loreLineCount=!!!itemStack?null:itemStack.getLore().length,
                    item.itemDetails.typeId=!!!itemStack?null:itemStack.typeId,
                    item.itemDetails.nameTag=!!!itemStack?null:itemStack.nameTag,
                    item.itemDetails.enchantments=!!!itemStack?null:tryget(()=>itemStack.getComponent("enchantable").getEnchantments())??"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                }catch(e){
                    console.error(e, e?.stack)
                }finally{
                    try{entity.remove()}catch{}
                }
            }else if(item.itemType=="sellable"){
                let [title, texture, value, step, max, itemID] = r.formValues as [title: string, texture: string, value: string, step: string, max: string, itemID: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.value=Number.isNaN(Number(value))?10:Number(value)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
            }
            if(mode=="buy"){
                let newData = shop.buyData
                newData.splice(itemIndex, 1, item as ShopItem)
                shop.buyData=newData
            }else if(mode=="sell"){
                let newData = shop.sellData
                newData.splice(itemIndex, 1, item as SellableShopItem)
                shop.sellData=newData
            }
            return 1
        }) as 1;
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_addItem}.
     * @param sourceEntitya 
     * @param shop 
     * @param type 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_addItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, type: "pre-made"|"pre-made_manual"|"newItemStack"|"giveCommand"|"sellable", mode: mode): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ModalFormData;
        form.title("Add Item");
        if(type=="newItemStack"){
            form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", "64"); 
            form.textField("Item Type§c*", "minecraft:stick")
            form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string"); 
            form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], 0); 
            form.toggle("Keep On Death", false); 
        }else if(type=="giveCommand"){
            form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Item Type§c*\n§6NOTE: Items of this type (§bgiveCommand§6) must be available in commands. So things like minecraft:netherreactor will not work, to use those other item types use either the newItemStack type or the pre-made type.", "minecraft:stick")
            form.textField("Data Value§c*", "0", "0")
        }else if(type=="pre-made"||type=="pre-made_manual"){
            form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", "andexdbSavedShopItem:0")
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", "0")
        }else if(type=="sellable"){
            form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
            form.textField("Value§c*", "10", "10"); 
            form.textField("Sell Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Sell Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Item Type§c*", "minecraft:stick")
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
            let item: ShopItem|SellableShopItem = undefined
            let itemIndex = Number.isNaN(Number(r.formValues[2]))?10:Number(r.formValues[2])
    
            if(type=="newItemStack"){
                let [title, texture, itemIndex, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, itemID: string, itemName: string, itemLore: string, canDestroy: string, canPlaceOn: string, none_slot_inventory: 0|1|2, lockMode: boolean];
                item = {
                    type: "item",
                    itemType: "newItemStack",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\""),
                    itemName: JSON.parse("\""+(itemName.replaceAll("\"", "\\\""))+"\""),
                    itemLore: JSON.parse(itemLore==""?"[]":itemLore),
                    canDestroy: JSON.parse(canDestroy==""?"[]":canDestroy),
                    canPlaceOn: JSON.parse(canPlaceOn==""?"[]":canPlaceOn),
                    lockMode: [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode],
                    keepOnDeath: keepOnDeath
                }
            }else if(type=="giveCommand"){
                let [title, texture, itemIndex, price, step, max, itemID, itemData] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, itemID: string, itemData: string];
                item = {
                    type: "item",
                    itemType: "giveCommand",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\""),
                    itemData: Number.isNaN(Number(itemData))?10:Number(itemData)
                }
            }else if(type=="pre-made"||type=="pre-made_manual"){
                let [title, texture, itemIndex, price, step, max, structureID, entityID] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, structureID: string, entityID: string];
                let entity: Entity = undefined
                let itemStack: ItemStack = undefined
                try{
                    world.structureManager.place(structureID, sourceEntity.dimension, Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0}), {includeBlocks: false, includeEntities: true})
                    entity = sourceEntity.dimension.getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0})).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${entityID} was found inside of the specified structure.`)
                    }
                    itemStack = entity.getComponent("inventory").container.getItem(0)
                }catch(e){
                    console.error(e, e?.stack)
                }finally{
                    try{entity.remove()}catch{}
                }
                item = {
                    type: "item",
                    itemType: "pre-made",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    structureID: JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\""),
                    entityID: JSON.parse("\""+(entityID.replaceAll("\"", "\\\"")+"\"")),
                    itemDetails: {
                        damage: !!!itemStack?null:tryget(()=>itemStack.getComponent("durability").damage)??NaN,
                        maxDurability: !!!itemStack?null:tryget(()=>itemStack.getComponent("durability").maxDurability)??NaN,
                        keepOnDeath: !!!itemStack?null:itemStack.keepOnDeath,
                        lockMode: !!!itemStack?null:itemStack.lockMode,
                        loreLineCount: !!!itemStack?null:itemStack.getLore().length,
                        typeId: !!!itemStack?null:itemStack.typeId,
                        nameTag: !!!itemStack?null:itemStack.nameTag,
                        enchantments: !!!itemStack?null:tryget(()=>itemStack.getComponent("enchantable").getEnchantments())??"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                    }
                }
            }else if(type=="sellable"){
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues as [title: string, texture: string, itemIndex: string, value: string, step: string, max: string, itemID: string];
                item = {
                    type: "item",
                    itemType: "sellable",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    value: Number.isNaN(Number(value))?10:Number(value),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\"")+"\""))
                }
            }
            if(mode=="buy"){
                let newData = shop.buyData
                newData.splice(itemIndex, 0, item as ShopItem)
                shop.buyData=newData
            }else if(mode=="sell"){
                let newData = shop.sellData
                newData.splice(itemIndex, 0, item as SellableShopItem)
                shop.sellData=newData
            }
            return 1
        }) as 1;
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_managePage}.
     * @param sourceEntitya 
     * @param shop 
     * @param page 
     * @param pageIndex 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_managePage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, page: ShopPage, pageIndex: number, mode: mode): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ActionFormData;
        form.title("Manage "+page.pageTitle);
        form.body(
`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`
        )
        form.button("Edit Contents", "textures/ui/bookshelf_flat");
        form.button("Move Page", "textures/ui/move");
        form.button("Edit Page", "textures/ui/book_edit_default");
        form.button("Delete Page", "textures/ui/book_trash_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    if((await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, [mode, String(pageIndex)]))==1){
                        return await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode)
                    }
                    return 0
                break;
                case 1:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex))
                    const r = await forceShow(form2, sourceEntity as Player)
                    if(!Number.isNaN(Number(r.formValues[0]))){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(pageIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, page as ShopPage)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(pageIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, page as ShopPage)
                            shop.sellData=newData
                        }
                        return await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, page, Number(r.formValues[0]), mode)
                    }
                    return await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode)
                break;
                case 2:
                    if((await ServerShopManager.manageServerShop_editPage(sourceEntity, shop, page, pageIndex, mode))==1){
                        return await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode)
                    }
                    return 0
                break;
                case 3:
                    const sureOfItemDeletion = await showMessage(sourceEntity as Player, "Are you sure?", "Are you sure you want to delete this page?", "No", "Yes")
                    if(sureOfItemDeletion.selection==1){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(pageIndex, 1)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(pageIndex, 1)
                            shop.sellData=newData
                        }
                        return 1
                    }else{
                        return await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, page, pageIndex, mode)
                    }
                break;
                case 4:
                    return 1
                break;
                case 5:
                    return 0
                break;
                default:
                    return 1
    
            }
            return 1
        });
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_editPage}.
     * @param sourceEntitya 
     * @param shop 
     * @param page 
     * @param pageIndex 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_editPage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, page: ShopPage, pageIndex: number, mode: mode): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ModalFormData;
        form.title("Edit Item");
        form.textField("§fPage Title§c*", "Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll("\\\"", "\""))
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let [pageTitle, pageBody, title, texture] = r.formValues as [pageTitle: string, pageBody: string, title: string, texture: string];
            
            page.pageTitle=JSON.parse("\""+(pageTitle.replaceAll("\"", "\\\""))+"\""),
            page.pageBody=JSON.parse("\""+(pageBody.replaceAll("\"", "\\\""))+"\""),
            page.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
            page.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
            if(mode=="buy"){
                let newData = shop.buyData
                newData.splice(pageIndex, 1, page as ShopPage)
                shop.buyData=newData
            }else if(mode=="sell"){
                let newData = shop.sellData
                newData.splice(pageIndex, 1, page as ShopPage)
                shop.sellData=newData
            }
            return 1
        }) as 1;
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShop_addPage}.
     * @param sourceEntitya 
     * @param shop 
     * @param mode 
     * @returns 
     */
    static async manageServerShop_addPage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, mode: mode): Promise<1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const form = new ModalFormData;
        form.title("Add Item");
        form.textField("§fPage Title§c*", "Items")
        form.textField("§fPage Body§c*", "The items category.")
        form.textField("§fButton Title§c*", "Items")
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight")
        form.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
            let page: ShopPage = undefined
            let pageIndex = Number.isNaN(Number(r.formValues[2]))?10:Number(r.formValues[2])
    
            let [pageTitle, pageBody, title, texture] = r.formValues as [pageTitle: string, pageBody: string, title: string, texture: string];
            page = {
                type: "page",
                pageTitle: JSON.parse("\""+(pageTitle.replaceAll("\"", "\\\""))+"\""),
                pageBody: JSON.parse("\""+(pageBody.replaceAll("\"", "\\\""))+"\""),
                title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                data: [],
                texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
            }
            if(mode=="buy"){
                let newData = shop.buyData
                newData.splice(pageIndex, 0, page as ShopPage)
                shop.buyData=newData
            }else if(mode=="sell"){
                let newData = shop.sellData
                newData.splice(pageIndex, 0, page as ShopPage)
                shop.sellData=newData
            }
            return 1
        }) as 1;
    }
    
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_contents}.
     * @param sourceEntitya 
     * @param shop 
     * @param path 
     * @returns 
     */
    static async manageServerShopPage_contents<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]]): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        let form = new ActionFormData();
        const shopDataA: ShopPage = tryget(()=>{return getPathInObject(shop[mode+"Data" as `${"buy"|"sell"}Data`], path) as ShopPage})??{} as ShopPage;
        const shopData: (BuyableShopElement|SellableShopElement)[] = tryget(()=>{return shopDataA.data as (BuyableShopElement|SellableShopElement)[]})??[] as (BuyableShopElement|SellableShopElement)[];
        form.title(`Manage ${shopDataA.pageTitle??""} Contents`);
        if(!!shopDataA.pageBody)form.body(shopDataA.pageBody);
        shopData.forEach(s=>{
            form.button(s.title, s.texture)
        })
        form.button("Add Item", "textures/ui/book_addpicture_default");
        form.button("Add Page", "textures/ui/book_addtextpage_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        let r: ActionFormResponse = undefined
        try{
            r = await forceShow(form, (sourceEntity as Player))
        }catch(e){
            try{
                if((await showMessage(sourceEntity as Player, "§cError", `§c${e} ${e.stack}`, "Back", "Close")).selection!=1){
                    return 1
                }else{
                    return 0
                }
            }catch{
                console.error(e, e.stack);
            };
            return 0;
        }
        if (r.canceled) return 1;
    
        let response = r.selection;
        switch (response) {
            case shopData.length:
                const type: "giveCommand"|"newItemStack"|"pre-made"|"pre-made_manual"|"sellable" = mode=="buy"?
                ["giveCommand", "newItemStack", "pre-made", "pre-made_manual"][
                    (await showActions(
                        sourceEntity as Player,
                        "Select Item Mode",
                        "What mode would you like to create the item in?"+
                            "\n§bGive Command§f: Uses the give command to give players the item, can only do items that are available in commands (so things like minecraft:netherreactor will not work), and can only set item id and data value."+
                            "\n§bNew Item Stack§f: Uses the Script API to create the item, can use any item type even if it is not available in commands (so minecraft:netherreactor will work), also allows you to set the following properties of the item: name, lore, canDestroy, canPlaceOn, lockMode, keepOnDeath."+
                            "\n§bPre-Made§f: Saves an already existing item from your inventory to the inventory slot of an andexdb:saved_shop_item entity and saves that entity in a structure block, then when a player purchases an item, the structure is loaded and it clones a copy of the item from the entity's inventory to the player's inventory. This will preserve ALL NBT from the item, including any illegal enchantments."+
                            "\n§bManual Pre-Made§f: Lets you choose the Structure ID of the structure with the andexdb:saved_shop_item entity in it, and the value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item entity that has the item in it.",
                        ["Give Command"],
                        ["New Item Stack"],
                        ["Pre-Made"],
                        ["Manual Pre-Made"]
                    )).selection as 0|1|2|3
                ] as "giveCommand"|"newItemStack"|"pre-made"|"pre-made_manual":
                "sellable" as "sellable"
                if(type=="pre-made"){
                    const item = await itemSelector(sourceEntity, sourceEntity, ServerShopManager.manageServerShop_contents, sourceEntity, shop, mode)
                    const entity = sourceEntity.dimension.spawnEntity("andexdb:saved_shop_item", {x: Math.floor(sourceEntity.location.x)+0.5, y: Math.floor(sourceEntity.location.y)+0.5, z: Math.floor(sourceEntity.location.z)+0.5})
                    const entityID = getSuperUniqueID()
                    entity.setDynamicProperty("andexdb:saved_shop_item_save_id", entityID)
                    entity.getComponent("inventory").container.setItem(0, item.item.getItem())
                    world.structureManager.createFromWorld(
                        "andexdbSavedShopItem:"+entityID,
                        sourceEntity.dimension,
                        {
                            x: Math.floor(sourceEntity.location.x),
                            y: Math.floor(sourceEntity.location.y),
                            z: Math.floor(sourceEntity.location.z)
                        },
                        {
                            x: Math.floor(sourceEntity.location.x),
                            y: Math.floor(sourceEntity.location.y),
                            z: Math.floor(sourceEntity.location.z)
                        },
                        {
                            includeBlocks: false,
                            includeEntities: true,
                            saveMode: StructureSaveMode.World
                        }
                    )
                    entity.remove()
                    const form2 = new ModalFormData;
                    form2.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick")
                    form2.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/items/stick")
                    form2.textField("Button Index§c*", String(mode=="buy"?shop.buyData.length:shop.sellData.length), String(mode=="buy"?shop.buyData.length:shop.sellData.length))
                    form2.textField("Price§c*", "10", "10"); 
                    form2.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
                    form2.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
                    const r = await forceShow(form2, sourceEntity as Player)
                    let [title, texture, itemIndex, price, step, max] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, structureID: string, entityID: string];
                    const itemB = {
                        type: "item",
                        itemType: "pre-made",
                        title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                        texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                        price: Number.isNaN(Number(price))?10:Number(price),
                        step: Number.isNaN(Number(step))?10:Number(step),
                        max: Number.isNaN(Number(max))?10:Number(max),
                        structureID: "andexdbSavedShopItem:"+entityID,
                        entityID: entityID
                    }
                    let itemIndexB = Number.isNaN(Number(itemIndex))?(mode=="buy"?shop.buyData.length:shop.sellData.length):Number(itemIndex)
                    if(mode=="buy"){
                        let data = shop.buyData
                        let newData = getPathInObject(data, path).data as BuyableShopElement[]
                        newData.splice(itemIndexB, 0, itemB as ShopItem)
                        shop.buyData=data
                    }else if(mode=="sell"){
                        let data = shop.sellData
                        let newData = getPathInObject(data, path).data as SellableShopElement[]
                        newData.splice(itemIndexB, 0, itemB as any)
                        shop.sellData=data
                    }
                    return await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path)
                }else if(!!!type){
                    return await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path)
                }else{
                    if((await ServerShopManager.manageServerShopPage_addItem(sourceEntity, shop, path, type))==1){
                        return await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path)
                    }else{
                        return 0
                    }
                }
            break;
            case shopData.length+1:
                if((await ServerShopManager.manageServerShopPage_addPage(sourceEntity, shop, path))==1){
                    return await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path);
                }else{
                    return 0;
                }
            break;
            case shopData.length+2:/*
                if(path.slice(0, -1).length==1){
                    await ServerShopManager.manageServerShop_managePage(sourceEntity, shop, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as ShopPage, Number(path.slice(-1)[0]), path[0])
                    // manageServerShop_contents(sourceEntity, shop, mode)
                }else{
                    await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, getPathInObject(shop[(mode+"Data") as "buyData"|"sellData"], path) as ShopPage, Number(path.slice(-1)[0]))
                    // manageServerShopPage_contents(sourceEntity, shop, path.slice(0, -2) as [mode, ...string[]])
                };*/
                return 1;
            break;
            default:
                if((shopData[response].type=="item"?await ServerShopManager.manageServerShopPage_manageItem(sourceEntity, shop, [...path, "data", String(response)], shopData[response] as any, response):await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, [...path, "data", String(response)], shopData[response] as ShopPage, response))==1){
                    return await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path);
                }else{
                    return 0;
                }
    
        }
        return 1
    }
    
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
    static async manageServerShopPage_manageItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]], item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number){
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ActionFormData;
        form.title("Manage "+item.title);
        form.body(
`Type: ${item.itemType}
Title: ${item.title}
Texture: ${item.texture}
${mode=="buy"?"Purchase":"Sell"} Amount Step: ${item.step}
Maximum ${mode=="buy"?"Purchase":"Sell"} Amount: ${item.max}
${mode=="buy"?"Price":"Value"}: ${mode=="buy"?(item as ShopItem).price:(item as SellableShopItem).value}`
        )
        form.button("Move Item", "textures/ui/move");
        form.button("Edit Item", "textures/ui/book_edit_default");
        form.button("Delete Item", "textures/ui/book_trash_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(itemIndex))
                    const r = await forceShow(form2, sourceEntity as Player)
                    if(!Number.isNaN(Number(r.formValues[0]))){
                        if(mode=="buy"){
                            let data = shop.buyData
                            let newData = getPathInObject(data, path).data as BuyableShopElement[]
                            newData.splice(itemIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, item as ShopItem)
                            shop.buyData=data
                        }else if(mode=="sell"){
                            let data = shop.sellData
                            let newData = getPathInObject(data, path).data as SellableShopElement[]
                            newData.splice(itemIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, item as SellableShopItem)
                            shop.sellData=data
                        }
                        return await ServerShopManager.manageServerShopPage_manageItem(sourceEntity, shop, path, item, Number(r.formValues[0]))
                    }
                    return await ServerShopManager.manageServerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex)
                break;
                case 1:
                    if((await ServerShopManager.manageServerShopPage_editItem(sourceEntity, shop, path, item, itemIndex))==1){
                        return await ServerShopManager.manageServerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex)
                    }
                    return 0
                break;
                case 2:
                    const sureOfItemDeletion = await showMessage(sourceEntity as Player, "Are you sure?", "Are you sure you want to delete this item?", "No", "Yes")
                    if(sureOfItemDeletion.selection==1){
                        if(mode=="buy"){
                            let data = shop.buyData
                            let newData = getPathInObject(data, path).data as BuyableShopElement[]
                            newData.splice(itemIndex, 1)
                            shop.buyData=data
                        }else if(mode=="sell"){
                            let data = shop.sellData
                            let newData = getPathInObject(data, path).data as SellableShopElement[]
                            newData.splice(itemIndex, 1)
                            shop.sellData=data
                        }
                        return 1
                    }else{
                        return await ServerShopManager.manageServerShopPage_manageItem(sourceEntity, shop, path, item, itemIndex)
                    }
                break;
                case 3:
                    return 1
                break;
                case 4:
                    return 0
                break;
                default:
                    return 1
    
            }
            return 1
        });
    }
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
    static async manageServerShopPage_editItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]], item: (mode extends "buy" ? ShopItem : SellableShopItem), itemIndex: number): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ModalFormData;
        form.title("Manage "+item.title);
        if(item.itemType=="newItemStack"){
            form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string", !!!item.itemName?undefined:JSON.stringify(item.itemName).slice(1, -1).replaceAll("\\\"", "\"")); 
            form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.itemLore)); 
            form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canDestroy)); 
            form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSON.stringify(item.canPlaceOn)); 
            form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory].indexOf(item.lockMode)); 
            form.toggle("Keep On Death", item.keepOnDeath); 
        }else if(item.itemType=="giveCommand"){
            form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Data Value§c*", "0", String(item.itemData))
        }else if(item.itemType=="pre-made"){
            form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Price§c*", "10", String(item.price)); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", JSON.stringify(item.structureID).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", JSON.stringify(item.entityID).slice(1, -1).replaceAll("\\\"", "\""))
        }else if(item.itemType=="sellable"){
            form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick", JSON.stringify(item.title).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint, JSON.stringify(item.texture).slice(1, -1).replaceAll("\\\"", "\""))
            form.textField("Value§c*", "10", String(item.value)); 
            form.textField("Sell Amount Step\n§oDefault is 1", "1", String(item.step??1)); 
            form.textField("Max Sell Amount\n§oDefault is 64", "64", String(item.max??64)); 
            form.textField("Item Type§c*", "minecraft:stick", JSON.stringify(item.itemID).slice(1, -1).replaceAll("\\\"", "\""))
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            if(item.itemType=="newItemStack"){
                let [title, texture, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, itemID: string, itemName: string, itemLore: string, canDestroy: string, canPlaceOn: string, none_slot_inventory: 0|1|2, lockMode: boolean];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
                item.itemName=JSON.parse("\""+(itemName.replaceAll("\"", "\\\""))+"\"")
                item.itemLore=JSON.parse(itemLore==""?"[]":itemLore)
                item.canDestroy=JSON.parse(canDestroy==""?"[]":canDestroy)
                item.canPlaceOn=JSON.parse(canPlaceOn==""?"[]":canPlaceOn)
                item.lockMode=[ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode]
                item.keepOnDeath=keepOnDeath
            }else if(item.itemType=="giveCommand"){
                let [title, texture, price, step, max, itemID, itemData] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, itemID: string, itemData: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
                item.itemData=Number.isNaN(Number(itemData))?10:Number(itemData)
            }else if(item.itemType=="pre-made"){
                let [title, texture, price, step, max, structureID, entityID] = r.formValues as [title: string, texture: string, price: string, step: string, max: string, structureID: string, entityID: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.price=Number.isNaN(Number(price))?10:Number(price)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.structureID=JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\"")
                item.entityID=JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\"")
                let entity: Entity = undefined
                let itemStack: ItemStack = undefined
                try{
                    world.structureManager.place(structureID, sourceEntity.dimension, Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0}), {includeBlocks: false, includeEntities: true})
                    entity = sourceEntity.dimension.getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0})).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${entityID} was found inside of the specified structure.`)
                    }
                    itemStack = entity.getComponent("inventory").container.getItem(0),
                    item.itemDetails.damage=!!!itemStack?null:tryget(()=>itemStack.getComponent("durability").damage)??NaN,
                    item.itemDetails.maxDurability=!!!itemStack?null:tryget(()=>itemStack.getComponent("durability").maxDurability)??NaN,
                    item.itemDetails.keepOnDeath=!!!itemStack?null:itemStack.keepOnDeath,
                    item.itemDetails.lockMode=!!!itemStack?null:itemStack.lockMode,
                    item.itemDetails.loreLineCount=!!!itemStack?null:itemStack.getLore().length,
                    item.itemDetails.typeId=!!!itemStack?null:itemStack.typeId,
                    item.itemDetails.nameTag=!!!itemStack?null:itemStack.nameTag,
                    item.itemDetails.enchantments=!!!itemStack?null:tryget(()=>itemStack.getComponent("enchantable").getEnchantments())??"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                }catch(e){
                    console.error(e, e?.stack)
                }finally{
                    try{entity.remove()}catch{}
                }
            }else if(item.itemType=="sellable"){
                let [title, texture, value, step, max, itemID] = r.formValues as [title: string, texture: string, value: string, step: string, max: string, itemID: string];
                item.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\"")
                item.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
                item.value=Number.isNaN(Number(value))?10:Number(value)
                item.step=Number.isNaN(Number(step))?10:Number(step)
                item.max=Number.isNaN(Number(max))?10:Number(max)
                item.itemID=JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
            }
            if(mode=="buy"){
                let data = shop.buyData
                let newData = getPathInObject(data, path.slice(0, -2)).data as BuyableShopElement[]
                newData.splice(itemIndex, 1, item as ShopItem)
                shop.buyData=data
            }else if(mode=="sell"){
                let data = shop.sellData
                let newData = getPathInObject(data, path.slice(0, -2)).data as SellableShopElement[]
                newData.splice(itemIndex, 1, item as SellableShopItem)
                shop.sellData=data
            }
            return 1
        }) as 1;
    }
    /**
     * @todo Make an async function with return type of Promise<0|1>.
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_addItem}.
     * @param sourceEntitya 
     * @param shop 
     * @param path 
     * @param type 
     * @returns 
     */
    static async manageServerShopPage_addItem<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]], type: "pre-made"|"pre-made_manual"|"newItemStack"|"giveCommand"|"sellable"): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ModalFormData;
        form.title("Add Item");
        if(type=="newItemStack"){
            form.textField("§7Buyable Item Type: newItemStack\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length), String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oMax is 255\nDefault is 64", "64", "64"); 
            form.textField("Item Type§c*", "minecraft:stick")
            form.textField("Item Name\n§o(escape characters such as \\n are allowed)", "string"); 
            form.textField("Item Lore\n§o(escape characters such as \\n are allowed)\n(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.textField("Can Destroy\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.textField("Can Place On\n§o(escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", "[]"); 
            form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], 0); 
            form.toggle("Keep On Death", false); 
        }else if(type=="giveCommand"){
            form.textField("§7Buyable Item Type: giveCommand\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length), String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Item Type§c*\n§6NOTE: Items of this type (§bgiveCommand§6) must be available in commands. So things like minecraft:netherreactor will not work, to use those other item types use either the newItemStack type or the pre-made type.", "minecraft:stick")
            form.textField("Data Value§c*", "0", "0")
        }else if(type=="pre-made"||type=="pre-made_manual"){
            form.textField("§7Buyable Item Type: pre-made\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length), String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length))
            form.textField("Price§c*", "10", "10"); 
            form.textField("Purchase Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Purchase Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Structure ID§c*§f\nThe ID of the 1x1x1 structure that contains the andexdb:saved_shop_item entity that has the saved item in its inventory slot.", "andexdbSavedShopItem:0", "andexdbSavedShopItem:0")
            form.textField("Entity ID§c*§f\nThe value of the andexdb:saved_shop_item_save_id dynamic property of the andexdb:saved_shop_item that has the saved item in its inventory slot.", "0", "0")
        }else if(type=="sellable"){
            form.textField("§7Sellable Item Type: sellable\n§fButton Title§c*", "Stick")
            form.textField("Button Icon Texture\n§7Leave blank for no icon.", this.serverShopItemTextureHint)
            form.textField("Button Index§c*", String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length), String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length))
            form.textField("Value§c*", "10", "10"); 
            form.textField("Sell Amount Step\n§oDefault is 1", "1", "1"); 
            form.textField("Max Sell Amount\n§oDefault is 64", "64", "64"); 
            form.textField("Item Type§c*", "minecraft:stick")
            // form.textField("Data Value§c*", "0", String(item))
        }
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
            let item: ShopItem|SellableShopItem = undefined
            let itemIndex = Number.isNaN(Number(r.formValues[2]))?10:Number(r.formValues[2])
    
            if(type=="newItemStack"){
                let [title, texture, itemIndex, price, step, max, itemID, itemName, itemLore, canDestroy, canPlaceOn, lockMode, keepOnDeath] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, itemID: string, itemName: string, itemLore: string, canDestroy: string, canPlaceOn: string, none_slot_inventory: 0|1|2, lockMode: boolean];
                item = {
                    type: "item",
                    itemType: "newItemStack",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\""),
                    itemName: JSON.parse("\""+(itemName.replaceAll("\"", "\\\""))+"\""),
                    itemLore: JSON.parse(itemLore==""?"[]":itemLore),
                    canDestroy: JSON.parse(canDestroy==""?"[]":canDestroy),
                    canPlaceOn: JSON.parse(canPlaceOn==""?"[]":canPlaceOn),
                    lockMode: [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][lockMode],
                    keepOnDeath: keepOnDeath
                }
            }else if(type=="giveCommand"){
                let [title, texture, itemIndex, price, step, max, itemID, itemData] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, itemID: string, itemData: string];
                item = {
                    type: "item",
                    itemType: "giveCommand",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\""),
                    itemData: Number.isNaN(Number(itemData))?10:Number(itemData)
                }
            }else if(type=="pre-made"||type=="pre-made_manual"){
                let [title, texture, itemIndex, price, step, max, structureID, entityID] = r.formValues as [title: string, texture: string, itemIndex: string, price: string, step: string, max: string, structureID: string, entityID: string];
                let entity: Entity = undefined
                let itemStack: ItemStack = undefined
                try{
                    world.structureManager.place(structureID, sourceEntity.dimension, Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0}), {includeBlocks: false, includeEntities: true})
                    entity = sourceEntity.dimension.getEntitiesAtBlockLocation(Vector.add(sourceEntity.location, {x: 0, y: 10, z: 0})).find(v=>tryget(()=>String(v.getDynamicProperty("andexdb:saved_shop_item_save_id")))==entityID)
                    if(!!!entity){
                        throw new ReferenceError(`No entity with a andexdb:saved_shop_item_save_id dynamic property set to ${entityID} was found inside of the specified structure.`)
                    }
                    itemStack = entity.getComponent("inventory").container.getItem(0)
                }catch(e){
                    console.error(e, e?.stack)
                }finally{
                    try{entity.remove()}catch{}
                }
                item = {
                    type: "item",
                    itemType: "pre-made",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    price: Number.isNaN(Number(price))?10:Number(price),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    structureID: JSON.parse("\""+(structureID.replaceAll("\"", "\\\""))+"\""),
                    entityID: JSON.parse("\""+(entityID.replaceAll("\"", "\\\""))+"\""),
                    itemDetails: {
                        damage: !!!itemStack?null:tryget(()=>itemStack.getComponent("durability").damage)??NaN,
                        maxDurability: !!!itemStack?null:tryget(()=>itemStack.getComponent("durability").maxDurability)??NaN,
                        keepOnDeath: !!!itemStack?null:itemStack.keepOnDeath,
                        lockMode: !!!itemStack?null:itemStack.lockMode,
                        loreLineCount: !!!itemStack?null:itemStack.getLore().length,
                        typeId: !!!itemStack?null:itemStack.typeId,
                        nameTag: !!!itemStack?null:itemStack.nameTag,
                        enchantments: !!!itemStack?null:tryget(()=>itemStack.getComponent("enchantable").getEnchantments())??"N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable."
                    }
                }
            }else if(type=="sellable"){
                let [title, texture, itemIndex, value, step, max, itemID] = r.formValues as [title: string, texture: string, itemIndex: string, value: string, step: string, max: string, itemID: string];
                item = {
                    type: "item",
                    itemType: "sellable",
                    title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                    texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\""),
                    value: Number.isNaN(Number(value))?10:Number(value),
                    step: Number.isNaN(Number(step))?10:Number(step),
                    max: Number.isNaN(Number(max))?10:Number(max),
                    itemID: JSON.parse("\""+(itemID.replaceAll("\"", "\\\""))+"\"")
                }
            }
            if(mode=="buy"){
                let data = shop.buyData
                let newData = getPathInObject(data, path).data as BuyableShopElement[]
                newData.splice(itemIndex, 0, item as ShopItem)
                shop.buyData=data
            }else if(mode=="sell"){
                let data = shop.sellData
                let newData = getPathInObject(data, path).data as SellableShopElement[]
                newData.splice(itemIndex, 0, item as SellableShopItem)
                shop.sellData=data
            }
            return 1
        }) as 1;
    }
    
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_managePage}.
     * @param sourceEntitya 
     * @param shop 
     * @param path 
     * @param page 
     * @param pageIndex 
     * @returns 
     */
    static async manageServerShopPage_managePage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]], page: ShopPage, pageIndex: number): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ActionFormData;
        form.title("Manage "+page.pageTitle);
        form.body(
`Page Title: ${page.pageTitle}
Page Body: ${page.pageBody}
Title: ${page.title}
Texture: ${page.texture}`
        )
        form.button("Edit Contents", "textures/ui/bookshelf_flat");
        form.button("Move Page", "textures/ui/move");
        form.button("Edit Page", "textures/ui/book_edit_default");
        form.button("Delete Page", "textures/ui/book_trash_default");
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let response = r.selection;
            switch (response) {
                case 0:
                    if((await ServerShopManager.manageServerShopPage_contents(sourceEntity, shop, path))==1){
                        return await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, page, pageIndex)
                    }
                    return 0
                break;
                case 1:
                    const form2 = new ModalFormData;
                    form2.textField("New Position\nThe position is zero-indexed.", "index", String(pageIndex))
                    const r = await forceShow(form2, sourceEntity as Player)
                    if(!Number.isNaN(Number(r.formValues[0]))){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(pageIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, page as ShopPage)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(pageIndex, 1)
                            newData.splice(Number(r.formValues[0]), 0, page as ShopPage)
                            shop.sellData=newData
                        }
                        return await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, page, Number(r.formValues[0]))
                    }
                    return await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, page, pageIndex)
                break;
                case 2:
                    if((await ServerShopManager.manageServerShopPage_editPage(sourceEntity, shop, path, page, pageIndex))==1){
                        return await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, page, pageIndex)
                    }
                    return 0
                break;
                case 3:
                    const sureOfItemDeletion = await showMessage(sourceEntity as Player, "Are you sure?", "Are you sure you want to delete this page?", "No", "Yes")
                    if(sureOfItemDeletion.selection==1){
                        if(mode=="buy"){
                            let newData = shop.buyData
                            newData.splice(pageIndex, 1)
                            shop.buyData=newData
                        }else if(mode=="sell"){
                            let newData = shop.sellData
                            newData.splice(pageIndex, 1)
                            shop.sellData=newData
                        }
                        return 1;
                    }else{
                        return await ServerShopManager.manageServerShopPage_managePage(sourceEntity, shop, path, page, pageIndex)
                    }
                break;
                case 4:
                    return 1
                break;
                case 5:
                    return 0
                break;
                default:
                    return 1
    
            }
            return 1
        });
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_editPage}.
     * @param sourceEntitya 
     * @param shop 
     * @param path 
     * @param page 
     * @param pageIndex 
     * @returns 
     */
    static async manageServerShopPage_editPage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]], page: ShopPage, pageIndex: number): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ModalFormData;
        form.title("Edit Page");
        form.textField("§fPage Title§c*", "Items", JSON.stringify(page.pageTitle).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("§fPage Body§c*", "The items category.", JSON.stringify(page.pageBody).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("§fButton Title§c*", "Items", JSON.stringify(page.title).slice(1, -1).replaceAll("\\\"", "\""))
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight", JSON.stringify(page.texture).slice(1, -1).replaceAll("\\\"", "\""))
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
    
            let [pageTitle, pageBody, title, texture] = r.formValues as [pageTitle: string, pageBody: string, title: string, texture: string];
            
            page.pageTitle=JSON.parse("\""+(pageTitle.replaceAll("\"", "\\\""))+"\""),
            page.pageBody=JSON.parse("\""+(pageBody.replaceAll("\"", "\\\""))+"\""),
            page.title=JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
            page.texture=JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
            if(mode=="buy"){
                let data = shop.buyData
                let newData = getPathInObject(data, path.slice(0, -2)).data as BuyableShopElement[]
                newData.splice(pageIndex, 1, page as ShopPage)
                shop.buyData=data
            }else if(mode=="sell"){
                let data = shop.sellData
                let newData = getPathInObject(data, path.slice(0, -2)).data as SellableShopElement[]
                newData.splice(pageIndex, 1, page as ShopPage)
                shop.sellData=data
            }
            return 1
        }) as 1;
    }
    /**
     * @todo Copy over the updated code from {@link PlayerShopManager.managePlayerShopPage_addPage}.
     * @param sourceEntitya The player to open the UI for
     * @param shop The shop to add the page to
     * @param path The path in the shop's data that the page will be added to
     * @returns 
     */
    static async manageServerShopPage_addPage<mode extends "buy"|"sell">(sourceEntitya: Entity|executeCommandPlayerW|Player, shop: ServerShop, path: [mode, ...string[]]): Promise<0|1>{
        const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
        const mode = path[0]
        const form = new ModalFormData;
        form.title("Add Page");
        form.textField("§fPage Title§c*", "Items")
        form.textField("§fPage Body§c*", "The items category.")
        form.textField("§fButton Title§c*", "Items")
        form.textField("Button Icon Texture\n§7Leave blank for no icon.", "textures/ui/arrowRight")
        form.textField("Button Index§c*", String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length), String(getPathInObject(mode=="buy"?shop.buyData:shop.sellData, path).data.length))
        return await forceShow(form, (sourceEntity as Player)).then(async r => {
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;
            let page: ShopPage = undefined
            let pageIndex = Number.isNaN(Number(r.formValues[2]))?10:Number(r.formValues[2])
    
            let [pageTitle, pageBody, title, texture] = r.formValues as [pageTitle: string, pageBody: string, title: string, texture: string];
            page = {
                type: "page",
                pageTitle: JSON.parse("\""+(pageTitle.replaceAll("\"", "\\\""))+"\""),
                pageBody: JSON.parse("\""+(pageBody.replaceAll("\"", "\\\""))+"\""),
                title: JSON.parse("\""+(title.replaceAll("\"", "\\\""))+"\""),
                data: [],
                texture: JSON.parse("\""+(texture.replaceAll("\"", "\\\""))+"\"")
            }
            if(mode=="buy"){
                let data = shop.buyData
                let newData = getPathInObject(data, path).data as BuyableShopElement[]
                newData.splice(pageIndex, 0, page)
                shop.buyData=data
            }else if(mode=="sell"){
                let data = shop.sellData
                let newData = getPathInObject(data, path).data as SellableShopElement[]
                newData.splice(pageIndex, 0, page)
                shop.sellData=data
            }
            return 1
        }) as 1;
    }

}
