import { Player, system, world, Entity, type DimensionLocation, Block, BlockPermutation, BlockTypes, DyeColor, ItemStack, SignSide, Dimension, BlockInventoryComponent, EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, ItemDurabilityComponent, ItemEnchantableComponent, ItemLockMode, ContainerSlot, type ExplosionOptions, GameRules, GameRule, type RawMessage, StructureSaveMode } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData, ModalFormResponse, ActionFormResponse, MessageFormResponse, FormCancelationReason, uiManager } from "@minecraft/server-ui";
import { getUICustomForm, format_version, srun, dimensionTypeDisplayFormatting, config, dimensionsd, dimensions, dimensionse, dimensionTypeDisplayFormattingB } from "Main";
import { editAreas, editAreasMainMenu } from "./spawn_protection";
import { savedPlayer } from "./player_save";
import { ban, ban_format_version } from "./ban";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import *  as main from "Main";
import *  as transformrecipes from "Assets/constants/transformrecipes";
import *  as coords from "Main/coordinates";
import *  as cmds from "Main/commands";
import *  as bans from "Main/ban";
import *  as uis from "Main/ui";
import *  as playersave from "Main/player_save";
import *  as spawnprot from "Main/spawn_protection";
import *  as chat from "./chat";
import *  as cmdutils from "./command_utilities";
import *  as utils from "./utilities";
import *  as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { chatCommands, command, commandSettings, command_settings_format_version, commands_format_version, evaluateParameters, executeCommandPlayerW, generateNBTFile, generateNBTFileB, generateNBTFileD } from "Main/commands";
import { chatMessage, chatSend } from "./chat";
import { targetSelectorAllListC } from "./command_utilities";
import { commands } from "./commands_list";
import { mainShopSystemSettings } from "ExtraFeatures/shop_main";
import { MoneySystem } from "ExtraFeatures/money";
import { showActions, showMessage } from "./utilities";
import { Vector } from "Main/coordinates";
mcServer
mcServerUi/*
mcServerAdmin*//*
mcDebugUtilities*//*
mcCommon*/
GameTest/*
mcVanillaData*/
main
coords
cmds
bans
uis
playersave
spawnprot
mcMath

export const ui_format_version = "1.17.0";
//${se}console.warn(JSON.stringify(evaluateParameters(["presetText", "string", "json", "number", "boolean", "string", "presetText", "presetText"], "test test [{\"test\": \"test\"}, [\"test\", \"test\"] , \"test\", \"test\"] 1 true \"test \\\"test\" test test"))); 
export const customFormDataTypes = [ModalFormData, ActionFormData, MessageFormData]
export const customFormDataTypeIds = ["ModalFormData", "ActionFormData", "MessageFormData"]
export const customElementTypes = [
    ModalFormData.prototype.title as (
        titleText: RawMessage | string
    ) => ModalFormData,
    ModalFormData.prototype.textField as (
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        defaultValue?: RawMessage | string
    ) => ModalFormData,
    ModalFormData.prototype.dropdown as (
        label: RawMessage | string,
        options: (RawMessage | string)[],
        defaultValueIndex?: number
    ) => ModalFormData,
    ModalFormData.prototype.toggle as (
        label: RawMessage | string,
        defaultValue?: boolean
    ) => ModalFormData,
    ModalFormData.prototype.slider as (
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        valueStep: number,
        defaultValue?: number
    ) => ModalFormData,
    ActionFormData.prototype.body as (
        bodyText: RawMessage | string
    ) => ActionFormData,
    ActionFormData.prototype.button as (
        text: RawMessage | string,
        iconPath?: string
    ) => ActionFormData,
    MessageFormData.prototype.button1 as (
        text: RawMessage | string
    ) => MessageFormData,
    MessageFormData.prototype.button2 as (
        text: RawMessage | string
    ) => MessageFormData,
    ModalFormData.prototype.submitButton as (
        submitButtonText: RawMessage | string
    ) => ModalFormData,
];
export const customElementTypeIds = ["title", "textField", "dropdown", "toggle", "slider", "body", "button", "button1", "button2", "submitButton"]
export type ModalFormElements = ({type: "title", title: RawMessage|string}|{type: "textField", label: RawMessage | string, placeholderText: RawMessage | string, defaultValue?: RawMessage | string}|{type: "dropdown", label: RawMessage | string, options: (RawMessage | string)[], defaultValueIndex?: number}|{type: "toggle", label: RawMessage | string, defaultValue?: boolean}|{type: "slider", label: RawMessage | string, minimumValue: number, maximumValue: number, valueStep: number, defaultValue?: number}|{type: "submitButton", submitButtonText: RawMessage | string})[]
export function editCustomFormUI(UIId: String|string){
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId); 
    let variableList = "formType, formTitle"; 
    let form12 = new ModalFormData(); 
    let form1234 = new ModalFormData(); 
    let indexList: number[]
    indexList = []
    let indexListB: number[]
    indexListB = []
    form12.dropdown("Form Type", customFormDataTypeIds, Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0])); 
    form12.textField("Form Title (JavaScript Code)", "\"My Form\" or {rawtext: [{text: \"hi\"}]}", String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|")); 
    customUI.optionElements.forEach((element, index)=>{
        form12.dropdown("§lElement " + Number(element.index) + "§r§f\nElement Type", customElementTypeIds, element.typeIndex); 
        form12.textField("Element Argument 1", "JavaScript Code", element.args[0]?.toString()); 
        form12.textField("Element Argument 2", "JavaScript Code", element.args[1]?.toString()); 
        form12.textField("Element Argument 3", "JavaScript Code", element.args[2]?.toString()); 
        form12.textField("Element Argument 4", "JavaScript Code", element.args[3]?.toString()); 
        form12.textField("Element Argument 5", "JavaScript Code", element.args[4]?.toString()); 
        form12.toggle("Remove Element " + element.index); 
        indexList.push(element.index); 
        variableList = variableList + ", elementType" + index + ", elementArgumentA" + index + ", elementArgumentB" + index + ", elementArgumentC" + index + ", elementArgumentD" + index + ", elementArgumentE" + index + ", removeElement" + index
    }); 
    customUI.codeValues.forEach((element, index)=>{
        if (index == 0){form1234.textField("The response variable is \"r\", if ActionFormData or MessageFormData was chosen then r.selection can be used to see which button was chosen, and if ModalFormData was chosen then r.formValues can be used to get an array containing the values of the form. \nCode Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);}else{
        form1234.textField("Code Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);} 
        form1234.toggle("Remove Code Line " + Number(customUI.codeIds[index].split("|")[1])); 
        indexListB.push(Number(customUI.codeIds[index].split("|")[1])); 
    }); 
    form1234.toggle("New Code Line"); 
    form1234.textField("New Code Line Index", "Number", String(((indexListB[indexListB.length-1] ?? 0)+1))); 
    form1234.submitButton("Save")
    form12.toggle("New Element"); 
    form12.textField("New Element Index", "Number", String(((indexList[indexList.length-1] ?? 0)+1))); 
    form12.submitButton("Save")
    return {form: form12, variableList: variableList, indexList: indexList, formB: form1234, indexListB: indexListB}; 
}
export function showCustomFormUI(UIId: String, player: Player){
let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId); 
let form12345678 = new customFormDataTypes[Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0])]()
eval(`form12345678.title(${String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|")})`)
customUI.optionElements.forEach((v, i)=>{try{eval("form12345678." + v.code.replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")"))}catch(e){console.error(e, e.stack)}}); /*
form12.title({rawtext: [{text: "hi"}]})*/
let rb: ModalFormResponse|ActionFormResponse|MessageFormResponse
forceShow(form12345678, player).then((r)=>{try{rb = r; eval(customUI.code)}catch(e){console.error(e, e.stack)}})
return {form: form12345678, customUI: customUI, optionElements: customUI.optionElements, formResponse: rb}; 
}
export function customFormUIEditor(UIId: string, player: Player, goBackToMenu: boolean = false){
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9)
    let form = editCustomFormUI(formId)
    forceShow(form.form, player).then(to => {
        let t = (to as ModalFormResponse); 
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`)
        let elementValues = t.formValues.slice(2, -2); 
        console.warn(elementValues); 
        elementValues.forEach((v, i)=>{switch(i % 7){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+6).join("|")}`); break; 
            case 6: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`)}; break; 
        }}); 
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
        if(goBackToMenu == true){customFormListSelectionMenu(player); }
    }).catch(e => {
        console.error(e, e.stack);
    });
}; 
export function customFormUIEditorCode(UIId: string, player: Player, goBackToMenu: boolean = false){
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9)
    let form = editCustomFormUI(formId)
    forceShow(form.formB, player).then(to => {
        let t = (to as ModalFormResponse); 
        if (t.canceled) return;
        let elementValues = t.formValues.slice(0, -2); 
        console.warn(elementValues); 
        elementValues.forEach((v, i)=>{switch(i % 2){
            case 0: world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`, `${String(elementValues[i])}`); break; 
            case 1: if(Boolean(v)==true){world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`)}; break; 
        }}); 
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUICode:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexListB[form.indexListB.length-1] ?? -1)+1))}`, ""); }
        if(goBackToMenu == true){customFormListSelectionMenu(player); }
    }).catch(e => {
        console.error(e, e.stack);
    });
}; 
export function addNewCustomFormUI(player: Player, goBackToMenu: boolean = false){
    let form12345 = new ModalFormData(); 
    form12345.textField("Name", "myForm"); 
    form12345.submitButton("Create Form")
    forceShow(form12345, player).then((t)=>{if (t.canceled) return; let ta = t as ModalFormResponse; 
        try{world.setDynamicProperty(`customUI:${String(ta.formValues[0]).replaceAll("|", "\\vls")}`, "0|\"My Form\"")}catch(e){console.error(e, e.stack)}; 
        if(goBackToMenu == true){customFormListSelectionMenu(player); }
    }); 
}; 
//salo
export function customFormListSelectionMenu(player: Player){let a = world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith("customUI:")))
    let b: string[]; 
    b = []; 
    let form1234 = new ActionFormData(); 
    a.forEach((aelement, i)=>{b[i] = String(world.getDynamicProperty(aelement)); form1234.button(aelement.slice(9), String(world.getDynamicProperty(`customUIIcon:${aelement.slice(9)}`) ?? "textures/ui/book_edit_default"))}); 
    form1234.title("Custom Form UI Editor"); 
    form1234.button("Add New", "textures/ui/color_plus"); 
    form1234.button("Back", "textures/ui/arrow_left"); 
    let form123456 = new ActionFormData(); 
    form123456.title("Edit Custom Form UI"); 
    form123456.button("Edit Elements", "textures/ui/color_plus"); 
    form123456.button("Edit Code", "textures/ui/color_plus"); 
    form123456.button("View", "textures/ui/color_plus"); 
    form123456.button("Delete", "textures/ui/color_plus"); 
    form123456.button("Back", "textures/ui/arrow_left"); 
    forceShow(form1234, player).then((t)=>{let ta = t as ActionFormResponse; if(ta.canceled && ta.cancelationReason == FormCancelationReason.UserClosed){return; }; switch(true){
    case (ta.selection == a.length): 
    addNewCustomFormUI(player, true); 
    showCustomFormUI(a[ta.selection].slice(9), player); 
    break; 
    case (ta.selection == a.length + 1): 
    mainMenu(player)
    break; 
    default: 
    forceShow(form123456, player).then((v)=>{let va = v as ActionFormResponse; if(va.canceled && va.cancelationReason == FormCancelationReason.UserClosed){return; }; switch(va.selection){
        case 0: 
        customFormUIEditor(a[ta.selection], player, true); 
        break; 
        case 1: 
        customFormUIEditorCode(a[ta.selection], player, true); 
        break; 
        case 2: 
        showCustomFormUI(a[ta.selection].slice(9), player); 
        break; 
        case 3: 
        let form12345678 = new MessageFormData(); 
        form12345678.title("Confirm Custom UI Deletion"); 
        form12345678.body(`Are you sure you want to delete the custom UI ${a[ta.selection]}`); 
        form12345678.button1("Cancel"); 
        form12345678.button2("Confirm"); 
        forceShow(form12345678, player).then((u)=>{let ua = u as MessageFormResponse; if(ua.canceled && ua.cancelationReason == FormCancelationReason.UserClosed){return; }; switch(ua.selection){
            case 0: 
            customFormListSelectionMenu(player); 
            break; 
            case 1: 
            world.setDynamicProperty(a[ta.selection]); 
            world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith("customUIElement:" + a[ta.selection].slice(9) + "|"))).forEach((k)=>{world.setDynamicProperty(k)}); 
            world.getDynamicPropertyIds().filter((dpi)=>(dpi.startsWith("customUICode:" + a[ta.selection].slice(9) + "|"))).forEach((k)=>{world.setDynamicProperty(k)}); 
            customFormListSelectionMenu(player); 
            break; 
            default: 
            customFormListSelectionMenu(player); 
            break; 
        }}); 
        break; 
        case 4: 
        customFormListSelectionMenu(player); 
        break; 
    }}); 
    break; 
    }}); 
}; 
export async function infiniteUI(player: Player): Promise<any|Error>{
    return await new ActionFormData()
        .title("Infinite Form")
        .body("You are now trapped in an infinite form.")
        .button("Okay")
        .forceShow(player, Infinity)
        .then(
            ()=>infiniteUI(player),
            e=>(console.error(e, e?.stack), e)
        )
}
export function infiniteUIv2(player: Player): number{
    return system.runInterval(async ()=>{
        uiManager.closeAllForms(player);
        return await new ActionFormData()
            .title("Infinite Form")
            .body("You are now trapped in an infinite form.")
            .button("Okay")
            .forceShow(player, 5)
        },
        5
    )
}
export function infiniteUIv3(player: Player, interval: number = 1, title: string = "Infinite Form", body: string = "You are now trapped in an infinite form.", button: string = "Okay"): number{
    return system.runInterval(
        async ()=>{
            uiManager.closeAllForms(player);
            return await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
        },
        interval
    )
}
export function infiniteUIv4(player: Player, interval: number = 1, title: string = "Infinite Form", body: string = "You are now trapped in an infinite form.", button: string = "Okay"): number{
    return system.runInterval(
        async ()=>{
            uiManager.closeAllForms(player);
            await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
            uiManager.closeAllForms(player);
            await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
            uiManager.closeAllForms(player);
            await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
            uiManager.closeAllForms(player);
            await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
            uiManager.closeAllForms(player);
            return await new ActionFormData()
                .title(title)
                .body(body)
                .button(button)
                .forceShow(player, interval)
        },
        interval
    )
}
export async function mainMenu(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    let players = world.getPlayers();
form.title("Main Menu");
form.body("Choose menu to open. ");
form.button("Editor Stick", "textures/items/stick");
form.button("Editor Stick Menu B", "textures/items/stick");
form.button("Editor Stick Menu C", "textures/items/stick");
form.button("§8Debug Screen§f(§cUnused§f)§b", "textures/ui/ui_debug_glyph_color");
form.button("Inventory Controller", "textures/ui/inventory_icon.png");
form.button("Player Debug", "textures/ui/debug_glyph_color");
form.button("Entity Debug§b", "textures/ui/debug_glyph_color");/*
form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/
form.button("Player Controller", "textures/ui/controller_glyph_color");
form.button("Entity Controller", "textures/ui/controller_glyph_color_switch");
form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
form.button("§4Dimension Options§f(§cComing Soon!§f)§b", "textures/ui/icon_setting");
form.button("§eCreate Explosion §f[§cAlpha§f]", "textures/blocks/tnt_side");
form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
form.button("§4World Debug§f(§cComing Soon!§f)§b", "textures/ui/xyz_axis.png");
form.button("§4Dimension Debug§f(§cComing Soon!§f)§b", "textures/ui/NetherPortal");
form.button("Inventory Transfer§f(§nDEPRECATED§f)", "textures/ui/NetherPortal");
form.button("Run Command", "textures/ui/ImpulseSquare.png");
form.button("Script Eval", "textures/ui/RepeatSquare.png");
form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
form.button("Manage Custom UIs", "textures/ui/feedIcon");
form.button("Moderation §f[§cAlpha§f]", "textures/ui/hammer_l");
form.button("Settings", "textures/ui/settings_glyph_color_2x");
form.button("Manage Players", "textures/ui/user_icon_white");
form.button("§eManage Commands §f[§6Beta§f]", "textures/ui/chat_keyboard_hover");
form.button("§eItem Editor §f[§cAlpha§f]", "textures/ui/icon_recipe_item");
form.button("§eMap Art Generator §f[§cAlpha§f]", "textures/items/map_locked");
form.button("§eJava NBT Structure Loader §f[§cAlpha§f]", "textures/ui/xyz_axis");
form.button("Close", "textures/ui/crossout"); 
return await forceShow(form, players[players.findIndex((x) => x == sourceEntity)]).then(async ra => {let r = (ra as ActionFormResponse); 
    // This will stop the code when the player closes the form
    if (r.canceled) return 1;

    let response = r.selection;
    switch (response) {
        case 0:
            editorStick(sourceEntity)
            return 0;
        break;
        case 1:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 2:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 3:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:debugScreen saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 4:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 5:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:playerDebug saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 6:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebug saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;/*
        case 4:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;*/

        case 7:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:playerController saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 8:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:entityController saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 9:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:worldOptions saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 10:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:dimensionOptions saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 11:
            createExplosion(sourceEntity)
            return 0;
        break;
        case 12:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:fillBlocks saqw"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 15:
            try {
                (sourceEntity).runCommand(String("/scriptevent andexdb:inventoryTransfer saih"));
            } catch(e) {
                console.error(e, e.stack);
            };
            return 0;
        break;
        case 16:
            terminal(sourceEntity)
            return 0;
        break;
        case 17:
            scriptEvalRunWindow(sourceEntity)
            return 0;
        break;
        case 18:
            editAreasMainMenu(sourceEntity)
            return 0;
        break;
        case 19:
            customFormListSelectionMenu(sourceEntity as Player); 
            return 0;
        break;
        case 20:
            moderationSettings(sourceEntity)
            return 0;
        break;
        case 21:
            if((await settings(sourceEntity))==1){
                return await mainMenu(sourceEntity);
            }else{
                return 0;
            }
        break;
        case 22:
            if((await managePlayers(sourceEntity))==1){
                return await mainMenu(sourceEntity);
            }else{
                return 0;
            }
        break;
        case 23:
            manageCommands(sourceEntity)
            return 0;
        break;
        case 24:
            try{itemSelector(sourceEntity as Player, sourceEntity as Player).then(a=>{if(!!a){uis.itemEditorTypeSelection(sourceEntity as Player, sourceEntity as Player, a)}})}catch{}
        break;
        case 25:
            mapArtGenerator(sourceEntity)
            return 0;
        break;
        case 26:
            nbtStructureLoader(sourceEntity)
            return 0;
        break;
        case 27:
            return 0;
        default:
            return 1;
    }
}).catch(e => {
    console.error(e, e.stack);
    return 0;
});}
export async function addonDebugUI(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    let players = world.getPlayers();
form.title("Debug");
form.button("Debug Info", "textures/ui/ui_debug_glyph_color"); 
form.button("Raw Config", "textures/ui/debug_glyph_color"); 
form.button("Start Plyer Data Auto Save", "textures/ui/recap_glyph_color_2x");
form.button("Stop Plyer Data Auto Save", "textures/ui/close_button_default_light");
form.button("Start Checking For Banned Players", "textures/ui/recap_glyph_color_2x");
form.button("Stop Checking For Banned Players", "textures/ui/close_button_default_light");
form.button("Start Protected Areas Refresher", "textures/ui/recap_glyph_color_2x");
form.button("Stop Protected Areas Refresher", "textures/ui/close_button_default_light");
form.button("Stop All Built-In Intervals", "textures/ui/close_button_default_light");
form.button(entity_scale_format_version!=null?"Stop All Entity Scale Built-In Intervals":"§cStop All Entity Scale Built-In Intervals\n§cNo compatible version of entity scale was detected.", "textures/ui/close_button_default_light");/*
form.button("Start Plyer Data Auto Save", "textures/ui/icon_trailer");
form.button("Stop Plyer Data Auto Save", "textures/ui/realms_red_x");
form.button("Start Checking For Banned Players", "textures/ui/store_play_button");
form.button("Stop Checking For Banned Players", "textures/ui/minus");
form.button("Start Protected Areas Refresher", "textures/ui/recap_glyph_color_2x");
form.button("Stop Protected Areas Refresher", "textures/ui/close_button_default_light");
form.button("Stop All Built-In Intervals", "textures/ui/cancel");
form.button(entity_scale_format_version!=null?"Stop All Entity Scale Built-In Intervals":"§cStop All Entity Scale Built-In Intervals\n§cNo compatible version of entity scale was detected.", "textures/ui/recap_glyph_desaturated");*/
form.button("Back", "textures/ui/arrow_left");
form.button("Close", "textures/ui/crossout");
return await forceShow(form, sourceEntity as Player).then(async ra => {let r = (ra as ActionFormResponse); 
    // This will stop the code when the player closes the form
    if (r.canceled) return 1;

    let response = r.selection;
    switch (response) {
        case 0:
            const DPTBC = new (Decimal.clone({precision: 50}))(world.getDynamicPropertyTotalByteCount());
            await showActions(sourceEntity as Player, "Debug Info", `Dynamic Property Total Byte Count: ${DPTBC} Bytes/${DPTBC.div(1000).toDecimalPlaces(2)} KB/${DPTBC.div(1024).toDecimalPlaces(2)} KiB/${DPTBC.div(1000000).toDecimalPlaces(2)} MB/${DPTBC.div(1048576).toDecimalPlaces(2)} MiB
Dynamic Property ID Count: ${world.getDynamicPropertyIds().length}
Structure ID Count: ${world.structureManager.getWorldStructureIds().length}
Server Memory Tier: ${system.serverSystemInfo.memoryTier}
Current Tick: ${system.currentTick}
Absolute Time: ${world.getAbsoluteTime()}
Time Of Day: ${world.getTimeOfDay()}
Day: ${world.getDay()}
Moon Phase: ${world.getMoonPhase()}
Default Spawn Location: ${JSONB.stringify(world.getDefaultSpawnLocation())}`, ["Done"])
            return await addonDebugUI(sourceEntity);
        break;
        case 1:
            await showActions(
                sourceEntity as Player,
                "Raw Config",
                colorizeJSONString(
                    JSONB.stringify(
                        Object.fromEntries
                        (Object.getOwnPropertyNames(config)
                            .filter(n=>
                                !["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "name", "prototype", "reset", "length"]
                                    .includes(n)
                            ).map(n=>[n, config[n]])
                        )/*{
                            antiSpamSystem: config.antiSpamSystem,
                            chatCommandPrefix: config.chatCommandPrefix,
                            chatCommandsEnabled: config.chatCommandsEnabled,
                            chatRanks: config.chatRanks,
                            homeSystem: config.homeSystem,
                            invalidChatCommandAction: config.invalidChatCommandAction,
                            shopSystem: config.shopSystem,
                            spawnCommandLocation: config.spawnCommandLocation,
                            system: config.system,
                            tpaSystem: config.tpaSystem,
                            ui: config.ui,
                            undoClipboardMode: config.undoClipboardMode,
                            validChatCommandPrefixes: config.validChatCommandPrefixes,
                            worldBorder: config.worldBorder,
                        } as typeof config*/,
                        undefined,
                        2
                    ).replaceAll("§", "\uF019")
                ),
                ["Done"]
            )
            return await addonDebugUI(sourceEntity);
        break;
        case 2:
            playersave.startPlayerDataAutoSave();
            return await addonDebugUI(sourceEntity);
        break;
        case 3:
            playersave.stopPlayerDataAutoSave();
            return await addonDebugUI(sourceEntity);
        break;
        case 4:
            bans.startCheckingForBannedPlayers();
            return await addonDebugUI(sourceEntity);
        break;
        case 5:
            bans.stopCheckingForBannedPlayers();
            return await addonDebugUI(sourceEntity);
        break;
        case 6:
            spawnprot.startProtectedAreasRefresher();
            return await addonDebugUI(sourceEntity);
        break;
        case 7:
            spawnprot.stopProtectedAreasRefresher();
            return await addonDebugUI(sourceEntity);
        break;
        case 8:
            Object.values(repeatingIntervals).forEach(v=>tryrun(()=>system.clearRun(v))); 
            return await addonDebugUI(sourceEntity);
        break;
        case 9:
            if(entity_scale_format_version!=null){
                overworld.runCommand("/scriptevent andexsa:clearRepeatingIntervals");
            }else{
                if((await showMessage(sourceEntity as Player, "Entity Scale Not Detected", "No compatible version of entity scale was detected, as a result this may not do anything, you need entity scale version 1.14.0 or newer to do this.", "Proceed", "Back")).selection==0){
                    overworld.runCommand("/scriptevent andexsa:clearRepeatingIntervals");
                };
            };
            return await addonDebugUI(sourceEntity);
        break;
        case 10:
            return 1;
        break;
        case 11:
            return 0;
        break;
        default:
            return 1;
    }
}).catch(e => {
    console.error(e, e.stack);
    return 0;
});}
export async function settings(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    let players = world.getPlayers();
form.title("Settings");
form.body("Choose menu to open. ");
form.button("Global Settings", "textures/ui/worldsIcon");
form.button("Chat Ranks Settings", "textures/ui/message");
form.button("Script Settings", "textures/ui/debug_glyph_color");
form.button("UI Settings", "textures/ui/feedIcon");
form.button("Eval Auto Execute Settings", "textures/ui/automation_glyph_color");
form.button("Personal Settings", "textures/ui/profile_glyph_color");
form.button("Notifications Settings", "textures/ui/icon_bell");
form.button("Home System Settings [§cExperimental§r]", "textures/ui/store_home_icon");
form.button("TPA System Settings [§cExperimental§r]", "textures/items/ender_pearl");
form.button("Manage Game Rules", "textures/ui/controller_glyph_color");
form.button("Extra Features", "textures/ui/color_plus");
form.button("Advanced", "textures/ui/creator_glyph_color");
form.button("Back", "textures/ui/arrow_left");
form.button("Close", "textures/ui/crossout");/*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
return await forceShow(form, (sourceEntity as Player)).then(async ra => {let r = (ra as ActionFormResponse); 
    // This will stop the code when the player closes the form
    if (r.canceled) return 1;

    let response = r.selection;
    switch (response) {
        case 0:
            globalSettings(sourceEntity)
            return 0;
            break;

        case 1:
            chatRanksSettings(sourceEntity)
            return 0;
            break;

        case 2:
            scriptSettings(sourceEntity)
            return 0;
            break;

        case 3:
            uiSettings(sourceEntity)
            return 0;
            break;

        case 4:
            evalAutoScriptSettings(sourceEntity)
            return 0;
            break;

        case 5:
            personalSettings(sourceEntity)
            return 0;
            break;

        case 6:
            notificationsSettings(sourceEntity)
            return 0;
            break;

        case 7:
            homeSystemSettings(sourceEntity)
            return 0;
            break;

        case 8:
            tpaSettings(sourceEntity)
            return 0;
            break;

        case 9:
            manageGameRulesUI(sourceEntity)
            return 0;
            break;

        case 10:
            extraFeaturesSettings(sourceEntity)
            return 0;
        break;
        case 11:
            if((await advancedSettings(sourceEntity))==1){
                return await settings(sourceEntity);
            }else{
                return 0;
            };
        break;
        case 12:
            return 1;
        case 13:
            return 0;
        default:
            return 1;
    }
}).catch(e => {
    console.error(e, e.stack);
    return 0;
});}
export async function advancedSettings(sourceEntitya: Entity|executeCommandPlayerW|Player): Promise<0|1>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    form.title("Advanced Settings");
    form.button("Debug", "textures/ui/icon_setting");
    form.button("Back", "textures/ui/arrow_left"); 
    form.button("Close", "textures/ui/crossout"); /*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, (sourceEntity as Player)).then(async ra => {let r = (ra as ActionFormResponse); 
        // This will stop the code when the player closes the form
        if (r.canceled) return 1;

        let response = r.selection;
        switch (response) {
            case 0:
                if((await addonDebugUI(sourceEntity))==1){
                    return await advancedSettings(sourceEntity);
                }else{
                    return 0;
                };
            break;
            case 1:
                return 1;
            case 2:
                return 0;
            default:
                return 1;
        }
    }).catch(e => {
        console.error(e, e.stack);
        return 0;
    });
}
export function moderationSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    let players = world.getPlayers();
form.title("Moderation");
form.body("Choose menu to open. ");
form.button("§4Banned Items§f(§cComing Soon!§f)", "textures/ui/icon_blackfriday");
form.button("Manage Bans", "textures/ui/friend_glyph_desaturated");
form.button("Anti-Spam", "textures/ui/mute_on");
form.button("§4Anti-Cheat§f(§cComing Soon!§f)", "textures/ui/friend_glyph_desaturated");
form.button("Back", "textures/ui/arrow_left");/*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
forceShow(form, (sourceEntity as Player)).then(ra => {let r = (ra as ActionFormResponse); 
    // This will stop the code when the player closes the form
    if (r.canceled) return;

    let response = r.selection;
    switch (response) {
        case 0:
        //manageBannedItems(sourceEntity)
            break;

        case 1:
            manageBans(sourceEntity, moderationSettings)
            break;

        case 2:
            antispamSettings(sourceEntity)
            break;

        case 3:
            //anticheatSettings(sourceEntity)
            break;

        case 4:
            mainMenu(sourceEntity)
            break;
        default:
    }
}).catch(e => {
    console.error(e, e.stack);
});}
export function manageBans(sourceEntitya: Entity|executeCommandPlayerW|Player, backMenuFunction: (sourceEntity: Entity|Player)=>any=mainMenu){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form6 = new ActionFormData; 
    form6.title("Manage Bans"); 
    ban.getValidBans().idBans.forEach((p)=>{form6.button(`${p.playerId}\nValid`, "textures/ui/online")}); 
    ban.getExpiredBans().idBans.forEach((p)=>{form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
    ban.getValidBans().nameBans.forEach((p)=>{form6.button(`${p.playerName}\nValid`, "textures/ui/online")}); 
    ban.getExpiredBans().nameBans.forEach((p)=>{form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
    let banList = ban.getValidBans().idBans.concat(ban.getExpiredBans().idBans).concat(ban.getValidBans().nameBans).concat(ban.getExpiredBans().nameBans)
    form6.button("Add ID Ban"); 
    form6.button("Add Name Ban"); 
    form6.button("Back"); 
    forceShow(form6, sourceEntity as Player).then(ga=>{let g = (ga as ActionFormResponse); 
        if(g.canceled){backMenuFunction(sourceEntity); return}; 
        switch(g.selection){
            case banList.length: 
            let form5 = new ModalFormData; form5.title(`Add ID Ban`); form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer"); form5.textField("Ban Time (In Minutes)", "Decimal"); form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
            form5.submitButton("Ban")
            forceShow(form5, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                if(h.canceled){return};
                ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), playerId: String(h.formValues[0]), originalPlayerName: undefined, type: "id", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "banId:"+Date.now()+":"+String(h.formValues[0]), unbanDate: Number(h.formValues[1])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[2])})
                backMenuFunction(sourceEntity)
            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
            break
            case banList.length+1: 
            let form6 = new ModalFormData; form6.title(`Add Name Ban`); form6.textField("Player Name\nThis is the name of the player. ", "String"); form6.textField("Ban Time (In Minutes)", "Decimal"); form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
            form6.submitButton("Ban")
            forceShow(form6, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                if(h.canceled){return};
                ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), originalPlayerId: undefined, playerName: String(h.formValues[0]), type: "name", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "ban:"+Date.now()+":"+String(h.formValues[0]), unbanDate: Number(h.formValues[1])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[2])})
                backMenuFunction(sourceEntity)
            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
            break
            case banList.length+2: 
            backMenuFunction(sourceEntity)
            break/*
            case banList.length+3: 
            backMenuFunction(sourceEntity)
            break
            case banList.length+4: 
            backMenuFunction(sourceEntity)*/
            break
            default: 
            let form4 = new ActionFormData; form4.title(`Manage Ban`); let ba = banList[g.selection]; let timeRemaining = ba.timeRemaining; form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate)+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleString()+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)<0?" GMT":" GMT+")+Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate)+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleString()+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)<0?" GMT":" GMT+")+Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)}\n§r§b${ba.type=="id"?"playerId":"originalPlayerId"}: §6${ba.type=="id"?ba.playerId:ba.originalPlayerId}\n§r§b${ba.type=="id"?"originalPlayerName":"playerName"}: §6${ba.type=="id"?ba.originalPlayerName:ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${/*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/""}`); form4.button("Unban"); form4.button("Back")
            forceShow(form4, sourceEntity as Player).then(ha=>{let h = (ha as ActionFormResponse); 
                if(h.canceled){return};
                if(h.selection==0){banList[g.selection].remove(); backMenuFunction(sourceEntity)};
                if(h.selection==1){backMenuFunction(sourceEntity)};
            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
        }; 
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export function globalSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    "andexdbSettings:autoEscapeChatMessages"
    "andexdbSettings:autoURIEscapeChatMessages"
    "andexdbSettings:allowChatEscapeCodes"
    form2.title("Global Settings")
    form2.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"));
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));/*
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before chat ranks in chat messages, default is \"[\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after chat ranks in chat messages, default is \"\uF019r]\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§frankDisplaySeparator§r§f\nSeparator that appears between ranks, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before player's names in chat messages, default is \"<\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after player's names in chat messages, default is \"\uF019r>\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));*/
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn location for the gametest structures, this is used when spawning in no ai entities or spawning in simulated players", "x y z", cullEmpty([(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["x"], (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["y"], (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["z"]]).join(" "));
    form2.textField("§l§fspawnCommandLocation§r§f\nThe location to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, leaving it blank will disable the spawn command", "x y z", cullEmpty([config.spawnCommandLocation.x, config.spawnCommandLocation.y, config.spawnCommandLocation.z]).join(" "));
    form2.dropdown("§l§fspawnCommandDimension§r§f\nThe dimension to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, the default is overworld", ["§aOverworld", "§cNether", "§dThe End"], dimensionsd.indexOf(config.spawnCommandLocation.dimension.id as "minecraft:overworld" | "minecraft:nether" | "minecraft:the_end"));
    form2.dropdown("§l§finvalidChatCommandAction§r§f\nWhat to do when a chat command is typed that does not exist, or that the player does not have permission to use. ", ["Do Nothing", "Send Message", "Cancel Message", "Warn Player"], Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));/*
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fchatDisplayTimeStamp§r§f\nSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp);*/
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));
    form2.toggle("§l§fplayerInventoryDataSaveSystemEnabled§r\nWhether or not to save the player's inventory data when saving player data, disabling this will result in being unable to check the inventories of offline players, this only applies when §bautoSavePlayerData§r is enabled, the default is true", config.system.playerInventoryDataSaveSystemEnabled);
    form2.toggle("§l§fuseLegacyPlayerInventoryDataSaveSystem§r\nWhether or not to use the pre-1.26 player inventory data save system, enabling this will result in only being able to see general details about the items that were in an offline player's inventory, as well as increasing lag, this only applies when §bautoSavePlayerData§r and §bplayerInventoryDataSaveSystemEnabled§r are enabled, the default is false", config.system.useLegacyPlayerInventoryDataSaveSystem);
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ chatCommandPrefix, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix/*, rankDisplayPrefix, rankDisplaySuffix, rankDisplaySeparator, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator*/, gametestStructureDefaultSpawnLocation, spawnCommandLocation, spawnCommandDimension, invalidChatCommandAction, chatCommandsEnbaled/*, disableCustomChatMessages, allowCustomChatMessagesMuting*//*, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes*//*, chatDisplayTimeStamp*/, autoSavePlayerData, playerInventoryDataSaveSystemEnabled, useLegacyPlayerInventoryDataSaveSystem, bepl, beppb, aebe, aepl ] = t.formValues;
        world.setDynamicProperty("andexdbSettings:chatCommandPrefix", chatCommandPrefix)
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes)
        world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix)
        world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix)/*
        world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix)
        world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix)
        world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator)
        world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix)
        world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix)
        world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator)*/
        if(String(gametestStructureDefaultSpawnLocation) != ""){world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {x: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[2])})}
        config.spawnCommandLocation={x: ((spawnCommandLocation as string).split(" ")[0]==""||!!!(spawnCommandLocation as string).split(" ")[0])?null:Number((spawnCommandLocation as string).split(" ")[0]), y: ((spawnCommandLocation as string).split(" ")[1]==""||!!!(spawnCommandLocation as string).split(" ")[1])?null:Number((spawnCommandLocation as string).split(" ")[1]), z: ((spawnCommandLocation as string).split(" ")[0])==""||!!!(spawnCommandLocation as string).split(" ")[1]?null:Number((spawnCommandLocation as string).split(" ")[1]), dimension: dimensions[spawnCommandDimension as number]}
        world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled)/*
        world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)*/
        world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction)/*
        world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
        world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
        world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStamp)*/
        world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData)
        config.system.playerInventoryDataSaveSystemEnabled=playerInventoryDataSaveSystemEnabled as boolean
        config.system.useLegacyPlayerInventoryDataSaveSystem=useLegacyPlayerInventoryDataSaveSystem as boolean
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export const rankModes={"custom_simple": "Custom(Simple)", "custom_advanced": "Custom(Advanced)", "style_1": "Style 1", "style_2": "Style 2", "style_3": "Style 3", "style_4": "Style 4", "style_5": "Style 5"}
export const rankModesArray = Object.values(rankModes)
export const rankModesArrayB = Object.keys(rankModes)
export function chatRanksSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    form2.title("Chat Ranks Settings")
    //⌠⌡÷≈≡±≥≤»
    form2.dropdown("§l§fRank Style/Mode§r§f\nCustom(Simple): Allows for simple customizations to the rank and message formatting.\nCustom(Advanced): Allows for complete control over the rank and message formatting.\nStyle 1: \"§r§f[10:09:00 AM] [§bRank§f] [§cOther Rank§f] <Steve> Hi\nStyle 2: \"§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve§8 » §fHi\nStyle 3: \"§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve >> Hi\nStyle 4: \"§r§7[10:09:00 AM] [§bRank§7] [§cOther Rank§7] §7Steve§l > §r§fHi\"\nStyle 5: \"§r§f[10:09:00 AM] [§bRank§f,§cOther Rank§f] §7Steve: §fHi\"\nDefault is Custom(Simple).", rankModesArray, rankModesArray.indexOf(rankModes[String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")]));
    form2.textField("§l§frankDisplayPrefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before chat ranks in chat messages, default is \"[\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after chat ranks in chat messages, default is \"\uF019r]\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§fnameDisplayPrefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before player's names in chat messages, default is \"<\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after player's names in chat messages, default is \"\uF019r>\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));
    form2.textField("§l§frankDisplaySeparator§r§f\n§r§o§qOnly applies to Custom(Simple) and Custom(Advanced) mode.\n§r§fSeparator that appears between ranks, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "));
    form2.textField("§l§fRank Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat ranks, it is a javascript template string, for example \"[${rank}\uF019r]\", default is \"[${rank}\uF019r]\"", "javascript template string", String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r§f]"));
    form2.textField("§l§fMessage Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat message, it is a javascript template string, for example \"\uF019r${timestampenabled?`[${timestamp}]`:\"\"}${ranks}\uF019r${(ranks!=\"\")?\" \":\"\"}<${name}\uF019r> \", default is \"\uF019r${timestampenabled?`[${timestamp}]`:\"\"}${ranks}\uF019r${(ranks!=\"\")?\" \":\"\"}<${name}\uF019r> \"", "javascript template string", String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ?? "§r${timestampenabled?`[${timestamp}]`:\"\"}${ranks}§r${(ranks!=\"\")?\" \":\"\"}<${name}§r> ${message}"));
    form2.textField("§l§fDefault Rank Template String For Players With No Rank§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default chat rank for players who do not have any chat ranks, it is a javascript template string, for example \"[\uF019bMember\uF019r]\", default is \"\"", "javascript template string", String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? ""));
    form2.textField("§l§fDefault Message Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the message portion of the chat message to use when the player does not have any messageFormatting: or messageColor: tags, it is just a string of format codes, such as \"\uF019r\uF019l\uF019b\", leaving this empty will make the message use the default message formatting of the selected rank style/mode, default is \"\"", "string", String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? ""));
    form2.textField("§l§fDefault Name Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the name of the player sending the chat message to use when the player does not have any nameFormatting: or nameColor: tags, it is just a string of format codes, such as \"\uF019r\uF019l\uF019b\", leaving this empty will make the message use the default name formatting of the selected rank style/mode, default is \"\"", "string", String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? ""));
    form2.textField("§l§fDefault Separator Formatting§r§f\n§r§o§9Only applies to rank styles 2-4.\n§r§fThe default format for the separator between the name of the player and the message portion of the chat message to use when the player does not have any separatorFormatting: or separatorColor: tags, it is just a string of format codes, such as \"\uF019r\uF019l\uF019b\", leaving this empty will make the message use the default separator formatting of the selected rank style/mode, default is \"\"", "string", String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? ""));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fchatDisplayTimeStamp§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp);
    form2.toggle("§l§fshowRanksOnPlayerNameTags§r§f\nSets whether or not to show player's ranks on their name tag, default is false", config.chatRanks.showRanksOnPlayerNameTags);
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ rankMode, rankDisplayPrefix, rankDisplaySuffix, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, rankDisplaySeparator, rankTemplateString, messageTemplateString, defaultRankTemplateString, defaultMessageFormatting, defaultNameFormatting, defaultSeparatorFormatting, disableCustomChatMessages, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, chatDisplayTimeStamp, showRanksOnPlayerNameTags ] = t.formValues;
        world.setDynamicProperty("andexdbSettings:rankMode", Object.entries(rankModes).find(v=>v[1]==rankModesArray[rankMode as number])[0])
        world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix)
        world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix)
        world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix)
        world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix)
        world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator)
        world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator)
        world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString)
        world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString)
        world.setDynamicProperty("andexdbSettings:defaultRankTemplateString", defaultRankTemplateString)
        world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting)
        world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting)
        world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting)
        world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)
        world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
        world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
        world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStamp)
        config.chatRanks.showRanksOnPlayerNameTags=showRanksOnPlayerNameTags as boolean
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function scriptSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    form2.title("Script Settings")
    form2.textField("§l§fplayerDataRefreshRate§r\nThe interval at which to update the saved playerdata of all online players, decreasing this number may increase lag, the default is 20", "integer from 1-1000", String(config.system.playerDataRefreshRate));
    form2.textField("§l§fprotectedAreasRefreshRate§r\nThe interval at which to update list the saved protected areas, decreasing this number may increase lag, the default is 200", "integer from 1-1000000", String(config.system.protectedAreasRefreshRate));
    form2.textField("§l§fbannedPlayersRefreshRate§r\nThe interval at which to check for banned players, decreasing this number may increase lag, the default is 20", "integer from 1-1000000", String(config.system.bannedPlayersRefreshRate));
    form2.dropdown("§l§fundoClipboardMode§r\nWhether to save undo history in memory or to the world files, memory will cause undo history to be cleared upon restarting the world/realm/server, the default is Memory", ["Memory", "World"], ["Memory", "World"].indexOf(String(config.undoClipboardMode)));
    form2.toggle("§l§fshowEntityScaleNotFoundConsoleLog§r\nWhether or not to log to the console when the add-on fails to find a compatible version of entity scale active on startup, the default is true", config.system.showEntityScaleNotFoundConsoleLog);
    form2.toggle("§l§fshowEntityScaleFoundConsoleLog§r\nWhether or not to log to the console when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is true", config.system.showEntityScaleFoundConsoleLog);
    form2.toggle("§l§fshowEntityScaleNotFoundChatLog§r\nWhether or not to log to the chat when the add-on fails to find a compatible version of entity scale active on startup, the default is false", config.system.showEntityScaleNotFoundChatLog);
    form2.toggle("§l§fshowEntityScaleFoundChatLog§r\nWhether or not to log to the chat when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is false", config.system.showEntityScaleFoundChatLog);
    form2.toggle("§l§fdebugMode§r\nWhether debug mode is enabled or not, the default is false", config.system.debugMode);
    if(config.system.debugMode){
        form2.textField("§l§cartificialLagMS§r§c\nThe number of milliseconds of artificial lag to cause each tick. §eWARNING!: THIS IS VERY DANGEROUS AND COULD RESULT IN YOUR WORLD BEING SOFT-LOCKED IF SET TO AN EXTREMELY HIGH VALUE, BECAUSE OF THIS, THIS INPUT WILL ONLY ALLOW VALUES UP TO 10000 MILLISECONDS, TO SET IT HIGHER YOU MUST USE THE SCRIPT EVAL TO SET THE §bconfig.system.artificialLagMS§e PROPERTY TO THE DESIRED VALUE", "int", String(config.system.artificialLagMS));
        form2.toggle("§l§callowWatchdogTerminationCrash§r§c\nWhether or not to allow script spikes and error to crash this world/realm/server. §eWARNING!: THIS IS VERY DANGEROUS AND MAY RESULT IN YOUR WORLD/REALM/SERVER CRASHING A LOT!§r\nThe default is false", config.system.allowWatchdogTerminationCrash);
        form2.toggle("§l§chideWatchdogTerminationCrashEnabledWarningsOnStartup§r§c\nWhether or not to hide the warning that appears on startup when allowWatchdogTerminationCrash is enabled. §eWARNING!: ENABLING THIS IS HIGHLY DISCOURAGED!§r\nThe default is false", config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup);
        form2.toggle("§l§fspreadPlayerInventoryDataSavesOverMultipleTicks§r\nWhether or not to spread player inventory data saving over multiple ticks to reduce lag, this only applies when §bGlobal Settings>useLegacyPlayerInventoryDataSaveSystem§r is disabled, the default is true", config.system.spreadPlayerInventoryDataSavesOverMultipleTicks);
    }
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ playerDataRefreshRate, protectedAreasRefreshRate, bannedPlayersRefreshRate, undoClipboardMode, showEntityScaleNotFoundConsoleLog, showEntityScaleFoundConsoleLog, showEntityScaleNotFoundChatLog, showEntityScaleFoundChatLog, debugMode, artificialLagMS, allowWatchdogTerminationCrash, hideWatchdogTerminationCrashEnabledWarningsOnStartup, spreadPlayerInventoryDataSavesOverMultipleTicks ] = t.formValues as [ playerDataRefreshRate: string, protectedAreasRefreshRate: string, bannedPlayersRefreshRate: string, undoClipboardMode: 0|1, showEntityScaleNotFoundConsoleLog: boolean, showEntityScaleFoundConsoleLog: boolean, showEntityScaleNotFoundChatLog: boolean, showEntityScaleFoundChatLog: boolean, debugMode: boolean, artificialLagMS: string, allowWatchdogTerminationCrash: boolean, hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean, spreadPlayerInventoryDataSavesOverMultipleTicks: boolean ];
        config.system.playerDataRefreshRate=playerDataRefreshRate.toNumber()
        config.system.protectedAreasRefreshRate=protectedAreasRefreshRate.toNumber()
        config.system.bannedPlayersRefreshRate=bannedPlayersRefreshRate.toNumber()
        config.undoClipboardMode=(["Memory", "World"][undoClipboardMode]??"Memory") as StructureSaveMode
        if(config.system.debugMode&&!(config.system.artificialLagMS==artificialLagMS.toNumber())){
            config.system.artificialLagMS=Math.min(artificialLagMS.toNumber(), 10000)
            config.system.allowWatchdogTerminationCrash=allowWatchdogTerminationCrash
            config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup=hideWatchdogTerminationCrashEnabledWarningsOnStartup
            config.system.spreadPlayerInventoryDataSavesOverMultipleTicks=spreadPlayerInventoryDataSavesOverMultipleTicks
        }
        config.system.debugMode=debugMode
        config.system.showEntityScaleNotFoundConsoleLog=showEntityScaleNotFoundConsoleLog
        config.system.showEntityScaleFoundConsoleLog=showEntityScaleFoundConsoleLog
        config.system.showEntityScaleNotFoundChatLog=showEntityScaleNotFoundChatLog
        config.system.showEntityScaleFoundChatLog=showEntityScaleFoundChatLog
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function uiSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    "andexdbSettings:autoEscapeChatMessages"
    "andexdbSettings:autoURIEscapeChatMessages"
    "andexdbSettings:allowChatEscapeCodes"
    form2.title("UI Settings")
    form2.textField("§l§fmaxPlayersPerManagePlayersPage§r§f\nThe maximum number of players to display at once on the manage players menu, the default is 10", "integer from 1-1000", String(config.ui.pages.maxPlayersPerManagePlayersPage));
    form2.toggle("§l§fuseStarWarsReference404Page§r§f\nWhether or not to use the Star Wars reference version of the 404 page, the default is false", config.ui.other.useStarWarsReference404Page);
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ maxPlayersPerManagePlayersPage, useStarWarsReference404Page ] = t.formValues as [ maxPlayersPerManagePlayersPage: string, useStarWarsReference404Page: boolean ];
        config.ui.pages.maxPlayersPerManagePlayersPage=maxPlayersPerManagePlayersPage.toNumber()
        config.ui.other.useStarWarsReference404Page=useStarWarsReference404Page
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function homeSystemSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    form2.title("Home System Settings [§cExperimental§r]")
    form2.toggle("§l§fHome System Enabled§r§f", config.homeSystem.homeSystemEnabled);
    form2.textField("§l§fMaximum Homes Per Player§r§f", "Int|Infinity", String(config.homeSystem.maxHomesPerPlayer));
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ homeSystemEnabled, maxHomesPerPlayer ] = t.formValues;
        config.homeSystem.homeSystemEnabled=homeSystemEnabled as boolean
        config.homeSystem.maxHomesPerPlayer=String(maxHomesPerPlayer).toLowerCase()=="infinity"?Infinity:Number(maxHomesPerPlayer)
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function tpaSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    form2.title("TPA System Settings [§cExperimental§r]")
    form2.toggle("§l§fEnable TPA System", config.tpaSystem.tpaSystemEnabled);
    form2.textField("§l§fSeconds Until Request Times Out§r§o\ndefault is 60", "int", config.tpaSystem.timeoutDuration.toString());
    //form2.textField("§l§fMaximum Homes Per Player§r§f", "Int|Infinity", String(config.homeSystem.maxHomesPerPlayer));
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ tpaSystemEnabled, timeoutDuration ] = t.formValues as [ tpaSystemEnabled: boolean, timeoutDuration: string ];
        config.tpaSystem.tpaSystemEnabled=tpaSystemEnabled
        config.tpaSystem.timeoutDuration=timeoutDuration.toNumber()
        //config.homeSystem.maxHomesPerPlayer=String(maxHomesPerPlayer).toLowerCase()=="infinity"?Infinity:Number(maxHomesPerPlayer)
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export class PlayerNotifications{
    readonly player: Entity
    constructor(player: Entity){this.player=player}
    get getAllChatCommands(){return this.player.hasTag("getAllChatCommands")}
    set getAllChatCommands(value: boolean){value?this.player.addTag("getAllChatCommands"):this.player.removeTag("getAllChatCommands")}
    get getAllChatCommandsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getAllChatCommandsNotificationSound")??'{"soundId": "none"}'))}
    set getAllChatCommandsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getAllChatCommandsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getAllChatMessages(){return this.player.hasTag("getAllChatMessages")}
    set getAllChatMessages(value: boolean){value?this.player.addTag("getAllChatMessages"):this.player.removeTag("getAllChatMessages")}
    get getAllChatMessagesNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getAllChatMessagesNotificationSound")??'{"soundId": "none"}'))}
    set getAllChatMessagesNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getAllChatMessagesNotificationSound", JSON.stringify(value, undefined, 0))}
    get getGameRuleChangeNotifications(){return this.player.hasTag("getGameRuleChangeNotifications")}
    set getGameRuleChangeNotifications(value: boolean){value?this.player.addTag("getGameRuleChangeNotifications"):this.player.removeTag("getGameRuleChangeNotifications")}
    get getGameRuleChangeNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getGameRuleChangeNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getGameRuleChangeNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getGameRuleChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getBlockExplodeNotifications(){return this.player.hasTag("getBlockExplodeNotifications")}
    set getBlockExplodeNotifications(value: boolean){value?this.player.addTag("getBlockExplodeNotifications"):this.player.removeTag("getBlockExplodeNotifications")}
    get getBlockExplodeNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getBlockExplodeNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getBlockExplodeNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getBlockExplodeNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getButtonPushNotifications(){return this.player.hasTag("getButtonPushNotifications")}
    set getButtonPushNotifications(value: boolean){value?this.player.addTag("getButtonPushNotifications"):this.player.removeTag("getButtonPushNotifications")}
    get getButtonPushNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getButtonPushNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getButtonPushNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getButtonPushNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEffectAddNotifications(){return this.player.hasTag("getEffectAddNotifications")}
    set getEffectAddNotifications(value: boolean){value?this.player.addTag("getEffectAddNotifications"):this.player.removeTag("getEffectAddNotifications")}
    get getEffectAddNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEffectAddNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEffectAddNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEffectAddNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEntityHurtNotifications(){return this.player.hasTag("getEntityHurtNotifications")}
    set getEntityHurtNotifications(value: boolean){value?this.player.addTag("getEntityHurtNotifications"):this.player.removeTag("getEntityHurtNotifications")}
    get getEntityHurtNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEntityHurtNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEntityHurtNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEntityHurtNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEntityLoadNotifications(){return this.player.hasTag("getEntityLoadNotifications")}
    set getEntityLoadNotifications(value: boolean){value?this.player.addTag("getEntityLoadNotifications"):this.player.removeTag("getEntityLoadNotifications")}
    get getEntityLoadNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEntityLoadNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEntityLoadNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEntityLoadNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEntityRemoveNotifications(){return this.player.hasTag("getEntityRemoveNotifications")}
    set getEntityRemoveNotifications(value: boolean){value?this.player.addTag("getEntityRemoveNotifications"):this.player.removeTag("getEntityRemoveNotifications")}
    get getEntityRemoveNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEntityRemoveNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEntityRemoveNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEntityRemoveNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEntitySpawnNotifications(){return this.player.hasTag("getEntitySpawnNotifications")}
    set getEntitySpawnNotifications(value: boolean){value?this.player.addTag("getEntitySpawnNotifications"):this.player.removeTag("getEntitySpawnNotifications")}
    get getEntitySpawnNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEntitySpawnNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEntitySpawnNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEntitySpawnNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getExplosionNotifications(){return this.player.hasTag("getExplosionNotifications")}
    set getExplosionNotifications(value: boolean){value?this.player.addTag("getExplosionNotifications"):this.player.removeTag("getExplosionNotifications")}
    get getExplosionNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getExplosionNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getExplosionNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getPlayerDimensionChangeNotifications(){return this.player.hasTag("getPlayerDimensionChangeNotifications")}
    set getPlayerDimensionChangeNotifications(value: boolean){value?this.player.addTag("getPlayerDimensionChangeNotifications"):this.player.removeTag("getPlayerDimensionChangeNotifications")}
    get getPlayerDimensionChangeNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getPlayerDimensionChangeNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getPlayerDimensionChangeNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getPlayerDimensionChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getBeforeExplosionNotifications(){return this.player.hasTag("getBeforeExplosionNotifications")}
    set getBeforeExplosionNotifications(value: boolean){value?this.player.addTag("getBeforeExplosionNotifications"):this.player.removeTag("getBeforeExplosionNotifications")}
    get getBeforeExplosionNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getBeforeExplosionNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getBeforeExplosionNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getBeforeExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getBeforeChatSendNotifications(){return this.player.hasTag("getBeforeChatSendNotifications")}
    set getBeforeChatSendNotifications(value: boolean){value?this.player.addTag("getBeforeChatSendNotifications"):this.player.removeTag("getBeforeChatSendNotifications")}
    get getBeforeChatSendNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getBeforeChatSendNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getBeforeChatSendNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getBeforeChatSendNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getPlayerGameModeChangeNotifications(){return this.player.hasTag("getPlayerGameModeChangeNotifications")}
    set getPlayerGameModeChangeNotifications(value: boolean){value?this.player.addTag("getPlayerGameModeChangeNotifications"):this.player.removeTag("getPlayerGameModeChangeNotifications")}
    get getPlayerGameModeChangeNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getPlayerGameModeChangeNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getPlayerGameModeChangeNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getPlayerGameModeChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getWeatherChangeNotifications(){return this.player.hasTag("getWeatherChangeNotifications")}
    set getWeatherChangeNotifications(value: boolean){value?this.player.addTag("getWeatherChangeNotifications"):this.player.removeTag("getWeatherChangeNotifications")}
    get getWeatherChangeNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getWeatherChangeNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getWeatherChangeNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getWeatherChangeNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getLeverActionNotifications(){return this.player.hasTag("getLeverActionNotifications")}
    set getLeverActionNotifications(value: boolean){value?this.player.addTag("getLeverActionNotifications"):this.player.removeTag("getLeverActionNotifications")}
    get getLeverActionNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getLeverActionNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getLeverActionNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getLeverActionNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getMessageRecieveNotifications(){return this.player.hasTag("getMessageRecieveNotifications")}
    set getMessageRecieveNotifications(value: boolean){value?this.player.addTag("getMessageRecieveNotifications"):this.player.removeTag("getMessageRecieveNotifications")}
    get getMessageRecieveNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getMessageRecieveNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getMessageRecieveNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getMessageRecieveNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getBlockInteractTriggerExplosionNotifications(){return this.player.hasTag("getBlockInteractTriggerExplosionNotifications")}
    set getBlockInteractTriggerExplosionNotifications(value: boolean){value?this.player.addTag("getBlockInteractTriggerExplosionNotifications"):this.player.removeTag("getBlockInteractTriggerExplosionNotifications")}
    get getBlockInteractTriggerExplosionNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getBlockInteractTriggerExplosionNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getBlockInteractTriggerExplosionNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getBlockInteractTriggerExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
    get getEntityInteractTriggerExplosionNotifications(){return this.player.hasTag("getEntityInteractTriggerExplosionNotifications")}
    set getEntityInteractTriggerExplosionNotifications(value: boolean){value?this.player.addTag("getEntityInteractTriggerExplosionNotifications"):this.player.removeTag("getEntityInteractTriggerExplosionNotifications")}
    get getEntityInteractTriggerExplosionNotificationsNotificationSound(){return JSON.parse(String(this.player.getDynamicProperty("getEntityInteractTriggerExplosionNotificationsNotificationSound")??'{"soundId": "none"}'))}
    set getEntityInteractTriggerExplosionNotificationsNotificationSound(value: {soundId: string, pitch?: number, volume?: number}){this.player.setDynamicProperty("getEntityInteractTriggerExplosionNotificationsNotificationSound", JSON.stringify(value, undefined, 0))}
}
Object.defineProperties(Entity.prototype, {
    playerNotifications: {
        get: function playerNotifications(): PlayerNotifications{
            return new PlayerNotifications(this as Entity)
        },
        configurable: true,
        enumerable: true
    }
});
export function notificationsSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    const noti = new PlayerNotifications(sourceEntity)
    form2.title("Notifications Settings")
    form2.toggle("§l§fGet notified when players run chat commands§r§f", noti.getAllChatCommands);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getAllChatCommandsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getAllChatCommandsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getAllChatCommandsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when players send chat messages§r§f", noti.getAllChatMessages);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getAllChatMessagesNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getAllChatMessagesNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getAllChatMessagesNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a game rule is changed§r§f", noti.getGameRuleChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getGameRuleChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getGameRuleChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getGameRuleChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a block explodes§r§f", noti.getBlockExplodeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBlockExplodeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBlockExplodeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBlockExplodeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a button is pushed§r§f", noti.getButtonPushNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getButtonPushNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getButtonPushNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getButtonPushNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity takes damage§r§f", noti.getEntityHurtNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityHurtNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityHurtNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityHurtNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is loaded§r§f", noti.getEntityLoadNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityLoadNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityLoadNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityLoadNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is removed§r§f", noti.getEntityRemoveNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityRemoveNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityRemoveNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityRemoveNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is spawned§r§f", noti.getEntitySpawnNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntitySpawnNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntitySpawnNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntitySpawnNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an explosion occurs§r§f", noti.getExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getExplosionNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player changes dimensions§r§f", noti.getPlayerDimensionChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getPlayerDimensionChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getPlayerDimensionChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getPlayerDimensionChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified the tick before an explosion occurs§r§f", noti.getBeforeExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBeforeExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBeforeExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBeforeExplosionNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified the tick before a chat message is sent§r§f", noti.getBeforeChatSendNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBeforeChatSendNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBeforeChatSendNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBeforeChatSendNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player switches gamemodes§r§f", noti.getPlayerGameModeChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getPlayerGameModeChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getPlayerGameModeChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getPlayerGameModeChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when the weather changes§r§f", noti.getWeatherChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getWeatherChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getWeatherChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getWeatherChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player interacts with a lever§r§f", noti.getLeverActionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getLeverActionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getLeverActionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getLeverActionNotificationsNotificationSound.pitch));
    form2.toggle("§l§8Get notified when a message is received (Internal; Might not even do anything)§r§8", noti.getMessageRecieveNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getMessageRecieveNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getMessageRecieveNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getMessageRecieveNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player interacts with an explosive block§r§f", noti.getBlockInteractTriggerExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBlockInteractTriggerExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBlockInteractTriggerExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBlockInteractTriggerExplosionNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player interacts with an explosive entity§r§f", noti.getEntityInteractTriggerExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityInteractTriggerExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityInteractTriggerExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityInteractTriggerExplosionNotificationsNotificationSound.pitch));
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [
            getAllChatCommands,
            getAllChatCommandsSoundID,
            getAllChatCommandsVolume,
            getAllChatCommandsPitch,
            getAllChatMessages,
            getAllChatMessagesSoundID,
            getAllChatMessagesVolume,
            getAllChatMessagesPitch,
            getGameRuleChangeNotifications,
            getGameRuleChangeNotificationsSoundID,
            getGameRuleChangeNotificationsVolume,
            getGameRuleChangeNotificationsPitch,
            getBlockExplodeNotifications,
            getBlockExplodeNotificationsSoundID,
            getBlockExplodeNotificationsVolume,
            getBlockExplodeNotificationsPitch,
            getButtonPushNotifications,
            getButtonPushNotificationsSoundID,
            getButtonPushNotificationsVolume,
            getButtonPushNotificationsPitch,
            getEntityHurtNotifications,
            getEntityHurtNotificationsSoundID,
            getEntityHurtNotificationsVolume,
            getEntityHurtNotificationsPitch,
            getEntityLoadNotifications,
            getEntityLoadNotificationsSoundID,
            getEntityLoadNotificationsVolume,
            getEntityLoadNotificationsPitch,
            getEntityRemoveNotifications,
            getEntityRemoveNotificationsSoundID,
            getEntityRemoveNotificationsVolume,
            getEntityRemoveNotificationsPitch,
            getEntitySpawnNotifications,
            getEntitySpawnNotificationsSoundID,
            getEntitySpawnNotificationsVolume,
            getEntitySpawnNotificationsPitch,
            getExplosionNotifications,
            getExplosionNotificationsSoundID,
            getExplosionNotificationsVolume,
            getExplosionNotificationsPitch,
            getPlayerDimensionChangeNotifications,
            getPlayerDimensionChangeNotificationsSoundID,
            getPlayerDimensionChangeNotificationsVolume,
            getPlayerDimensionChangeNotificationsPitch,
            getBeforeExplosionNotifications,
            getBeforeExplosionNotificationsSoundID,
            getBeforeExplosionNotificationsVolume,
            getBeforeExplosionNotificationsPitch,
            getBeforeChatSendNotifications,
            getBeforeChatSendNotificationsSoundID,
            getBeforeChatSendNotificationsVolume,
            getBeforeChatSendNotificationsPitch,
            getPlayerGameModeChangeNotifications,
            getPlayerGameModeChangeNotificationsSoundID,
            getPlayerGameModeChangeNotificationsVolume,
            getPlayerGameModeChangeNotificationsPitch,
            getWeatherChangeNotifications,
            getWeatherChangeNotificationsSoundID,
            getWeatherChangeNotificationsVolume,
            getWeatherChangeNotificationsPitch,
            getLeverActionNotifications,
            getLeverActionNotificationsSoundID,
            getLeverActionNotificationsVolume,
            getLeverActionNotificationsPitch,
            getMessageRecieveNotifications,
            getMessageRecieveNotificationsSoundID,
            getMessageRecieveNotificationsVolume,
            getMessageRecieveNotificationsPitch,
            getBlockInteractTriggerExplosionNotifications,
            getBlockInteractTriggerExplosionNotificationsSoundID,
            getBlockInteractTriggerExplosionNotificationsVolume,
            getBlockInteractTriggerExplosionNotificationsPitch,
            getEntityInteractTriggerExplosionNotifications,
            getEntityInteractTriggerExplosionNotificationsSoundID,
            getEntityInteractTriggerExplosionNotificationsVolume,
            getEntityInteractTriggerExplosionNotificationsPitch
        ] = t.formValues;
        noti.getAllChatCommands=Boolean(getAllChatCommands)
        noti.getAllChatCommandsNotificationSound={
            soundId: String(getAllChatCommandsSoundID==""?"none":getAllChatCommandsSoundID),
            volume: Number.isNaN(Number(getAllChatCommandsVolume))?1:Math.min(Math.max(Number(getAllChatCommandsVolume), 0), 1),
            pitch: Number.isNaN(Number(getAllChatCommandsPitch))?1:Math.min(Math.max(Number(getAllChatCommandsPitch), 0), 255)
        }
        noti.getAllChatMessages=Boolean(getAllChatMessages)
        noti.getAllChatMessagesNotificationSound={
            soundId: String(getAllChatMessagesSoundID==""?"none":getAllChatMessagesSoundID),
            volume: Number.isNaN(Number(getAllChatMessagesVolume))?1:Math.min(Math.max(Number(getAllChatMessagesVolume), 0), 1),
            pitch: Number.isNaN(Number(getAllChatMessagesPitch))?1:Math.min(Math.max(Number(getAllChatMessagesPitch), 0), 255)
        }
        noti.getGameRuleChangeNotifications=Boolean(getGameRuleChangeNotifications)
        noti.getGameRuleChangeNotificationsNotificationSound={
            soundId: String(getGameRuleChangeNotificationsSoundID==""?"none":getGameRuleChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getGameRuleChangeNotificationsVolume))?1:Math.min(Math.max(Number(getGameRuleChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getGameRuleChangeNotificationsPitch))?1:Math.min(Math.max(Number(getGameRuleChangeNotificationsPitch), 0), 255)
        }
        noti.getBlockExplodeNotifications=Boolean(getBlockExplodeNotifications)
        noti.getBlockExplodeNotificationsNotificationSound={
            soundId: String(getBlockExplodeNotificationsSoundID==""?"none":getBlockExplodeNotificationsSoundID),
            volume: Number.isNaN(Number(getBlockExplodeNotificationsVolume))?1:Math.min(Math.max(Number(getBlockExplodeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBlockExplodeNotificationsPitch))?1:Math.min(Math.max(Number(getBlockExplodeNotificationsPitch), 0), 255)
        }
        noti.getButtonPushNotifications=Boolean(getButtonPushNotifications)
        noti.getButtonPushNotificationsNotificationSound={
            soundId: String(getButtonPushNotificationsSoundID==""?"none":getButtonPushNotificationsSoundID),
            volume: Number.isNaN(Number(getButtonPushNotificationsVolume))?1:Math.min(Math.max(Number(getButtonPushNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getButtonPushNotificationsPitch))?1:Math.min(Math.max(Number(getButtonPushNotificationsPitch), 0), 255)
        }
        noti.getEntityHurtNotifications=Boolean(getEntityHurtNotifications)
        noti.getEntityHurtNotificationsNotificationSound={
            soundId: String(getEntityHurtNotificationsSoundID==""?"none":getEntityHurtNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityHurtNotificationsVolume))?1:Math.min(Math.max(Number(getEntityHurtNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityHurtNotificationsPitch))?1:Math.min(Math.max(Number(getEntityHurtNotificationsPitch), 0), 255)
        }
        noti.getEntityLoadNotifications=Boolean(getEntityLoadNotifications)
        noti.getEntityLoadNotificationsNotificationSound={
            soundId: String(getEntityLoadNotificationsSoundID==""?"none":getEntityLoadNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityLoadNotificationsVolume))?1:Math.min(Math.max(Number(getEntityLoadNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityLoadNotificationsPitch))?1:Math.min(Math.max(Number(getEntityLoadNotificationsPitch), 0), 255)
        }
        noti.getEntityRemoveNotifications=Boolean(getEntityRemoveNotifications)
        noti.getEntityRemoveNotificationsNotificationSound={
            soundId: String(getEntityRemoveNotificationsSoundID==""?"none":getEntityRemoveNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityRemoveNotificationsVolume))?1:Math.min(Math.max(Number(getEntityRemoveNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityRemoveNotificationsPitch))?1:Math.min(Math.max(Number(getEntityRemoveNotificationsPitch), 0), 255)
        }
        noti.getEntitySpawnNotifications=Boolean(getEntitySpawnNotifications)
        noti.getEntitySpawnNotificationsNotificationSound={
            soundId: String(getEntitySpawnNotificationsSoundID==""?"none":getEntitySpawnNotificationsSoundID),
            volume: Number.isNaN(Number(getEntitySpawnNotificationsVolume))?1:Math.min(Math.max(Number(getEntitySpawnNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntitySpawnNotificationsPitch))?1:Math.min(Math.max(Number(getEntitySpawnNotificationsPitch), 0), 255)
        }
        noti.getExplosionNotifications=Boolean(getExplosionNotifications)
        noti.getExplosionNotificationsNotificationSound={
            soundId: String(getExplosionNotificationsSoundID==""?"none":getExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getExplosionNotificationsVolume))?1:Math.min(Math.max(Number(getExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getExplosionNotificationsPitch))?1:Math.min(Math.max(Number(getExplosionNotificationsPitch), 0), 255)
        }
        noti.getPlayerDimensionChangeNotifications=Boolean(getPlayerDimensionChangeNotifications)
        noti.getPlayerDimensionChangeNotificationsNotificationSound={
            soundId: String(getPlayerDimensionChangeNotificationsSoundID==""?"none":getPlayerDimensionChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getPlayerDimensionChangeNotificationsVolume))?1:Math.min(Math.max(Number(getPlayerDimensionChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getPlayerDimensionChangeNotificationsPitch))?1:Math.min(Math.max(Number(getPlayerDimensionChangeNotificationsPitch), 0), 255)
        }
        noti.getBeforeExplosionNotifications=Boolean(getBeforeExplosionNotifications)
        noti.getBeforeExplosionNotificationsNotificationSound={
            soundId: String(getBeforeExplosionNotificationsSoundID==""?"none":getBeforeExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getBeforeExplosionNotificationsVolume))?1:Math.min(Math.max(Number(getBeforeExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBeforeExplosionNotificationsPitch))?1:Math.min(Math.max(Number(getBeforeExplosionNotificationsPitch), 0), 255)
        }
        noti.getBeforeChatSendNotifications=Boolean(getBeforeChatSendNotifications)
        noti.getBeforeChatSendNotificationsNotificationSound={
            soundId: String(getBeforeChatSendNotificationsSoundID==""?"none":getBeforeChatSendNotificationsSoundID),
            volume: Number.isNaN(Number(getBeforeChatSendNotificationsVolume))?1:Math.min(Math.max(Number(getBeforeChatSendNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBeforeChatSendNotificationsPitch))?1:Math.min(Math.max(Number(getBeforeChatSendNotificationsPitch), 0), 255)
        }
        noti.getPlayerGameModeChangeNotifications=Boolean(getPlayerGameModeChangeNotifications)
        noti.getPlayerGameModeChangeNotificationsNotificationSound={
            soundId: String(getPlayerGameModeChangeNotificationsSoundID==""?"none":getPlayerGameModeChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getPlayerGameModeChangeNotificationsVolume))?1:Math.min(Math.max(Number(getPlayerGameModeChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getPlayerGameModeChangeNotificationsPitch))?1:Math.min(Math.max(Number(getPlayerGameModeChangeNotificationsPitch), 0), 255)
        }
        noti.getWeatherChangeNotifications=Boolean(getWeatherChangeNotifications)
        noti.getWeatherChangeNotificationsNotificationSound={
            soundId: String(getWeatherChangeNotificationsSoundID==""?"none":getWeatherChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getWeatherChangeNotificationsVolume))?1:Math.min(Math.max(Number(getWeatherChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getWeatherChangeNotificationsPitch))?1:Math.min(Math.max(Number(getWeatherChangeNotificationsPitch), 0), 255)
        }
        noti.getLeverActionNotifications=Boolean(getLeverActionNotifications)
        noti.getLeverActionNotificationsNotificationSound={
            soundId: String(getLeverActionNotificationsSoundID==""?"none":getLeverActionNotificationsSoundID),
            volume: Number.isNaN(Number(getLeverActionNotificationsVolume))?1:Math.min(Math.max(Number(getLeverActionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getLeverActionNotificationsPitch))?1:Math.min(Math.max(Number(getLeverActionNotificationsPitch), 0), 255)
        }
        noti.getMessageRecieveNotifications=Boolean(getMessageRecieveNotifications)
        noti.getMessageRecieveNotificationsNotificationSound={
            soundId: String(getMessageRecieveNotificationsSoundID==""?"none":getMessageRecieveNotificationsSoundID),
            volume: Number.isNaN(Number(getMessageRecieveNotificationsVolume))?1:Math.min(Math.max(Number(getMessageRecieveNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getMessageRecieveNotificationsPitch))?1:Math.min(Math.max(Number(getMessageRecieveNotificationsPitch), 0), 255)
        }
        noti.getBlockInteractTriggerExplosionNotifications=Boolean(getBlockInteractTriggerExplosionNotifications)
        noti.getBlockInteractTriggerExplosionNotificationsNotificationSound={
            soundId: String(getBlockInteractTriggerExplosionNotificationsSoundID==""?"none":getBlockInteractTriggerExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getBlockInteractTriggerExplosionNotificationsVolume))?1:Math.min(Math.max(Number(getBlockInteractTriggerExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBlockInteractTriggerExplosionNotificationsPitch))?1:Math.min(Math.max(Number(getBlockInteractTriggerExplosionNotificationsPitch), 0), 255)
        }
        noti.getEntityInteractTriggerExplosionNotifications=Boolean(getEntityInteractTriggerExplosionNotifications)
        noti.getEntityInteractTriggerExplosionNotificationsNotificationSound={
            soundId: String(getEntityInteractTriggerExplosionNotificationsSoundID==""?"none":getEntityInteractTriggerExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityInteractTriggerExplosionNotificationsVolume))?1:Math.min(Math.max(Number(getEntityInteractTriggerExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityInteractTriggerExplosionNotificationsPitch))?1:Math.min(Math.max(Number(getEntityInteractTriggerExplosionNotificationsPitch), 0), 255)
        }
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function antispamSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    form2.title("Anti-Spam Settings [§cExperimental§r]")
    form2.toggle("§l§fAnti-Spam Enabled§r§f", config.antiSpamSystem.antispamEnabled);
    form2.toggle("§l§fReset Anti-Spam Mute Timer Upon Attempted Message Send While Muted§r§f", config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute);
    form2.textField("§l§fWait time before player can send another chat message in seconds§r§f", "60", String(config.antiSpamSystem.waitTimeAfterAntispamActivation));
    form2.textField("§f(The anti-spam will only activate if the player sends a number of messages equal to (§bMessage count to trigger anti-spam§f) and those messages each had a delay of at most (§bMaximum time between messages§f) seconds between them)\n§lMaximum time between messages, §r§f", "5", String(config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam));
    form2.slider("§l§fMessage count to trigger anti-spam, defaults to 4§r§f", 1, 100, 1, config.antiSpamSystem.antispamTriggerMessageCount);
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {moderationSettings(sourceEntity); return};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ antispamEnabled, restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute, waitTimeAfterAntispamActivation, maxTimeBewteenMessagesToTriggerAntiSpam, antispamTriggerMessageCount ] = t.formValues;
        config.antiSpamSystem.antispamEnabled=antispamEnabled as boolean
        config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute=restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute as boolean
        config.antiSpamSystem.waitTimeAfterAntispamActivation=isNaN(Number(waitTimeAfterAntispamActivation))?60:Number(waitTimeAfterAntispamActivation)
        config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam=isNaN(Number(maxTimeBewteenMessagesToTriggerAntiSpam))?5:Number(maxTimeBewteenMessagesToTriggerAntiSpam)
        config.antiSpamSystem.antispamTriggerMessageCount=Number(antispamTriggerMessageCount)
        moderationSettings(sourceEntity)
}).catch(e => {
    console.error(e, e.stack);
});}
export function personalSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    "andexdbSettings:autoEscapeChatMessages"
    "andexdbSettings:autoURIEscapeChatMessages"
    "andexdbSettings:allowChatEscapeCodes"
    form2.title("Personal Settings")
    form2.textField("§l§fTime Zone§r§f\nTime zone as hour for difference from UTC (decimals are allowed), the default is 0. ", "number", String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for your chat ranks, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for your custom chat names, default is undefined:", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§frankDisplaySeparator§r§f\nSeparator that appears between your ranks, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? " "));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between your name and and your chat message, default is \" \"", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator")?undefined:String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? " "));
    form2.toggle("§l§fdoNotSetNameTag§r§f\nStops your name tag from having chat ranks added to it, this is usefull if you want to change your name tag, since otherwise it would keep resetting your name tag, default is false", sourceEntity.hasTag("doNotSetNameTag"));
    form2.textField("§l§fdebugStickUseCooldown§r§f\nCooldown between changing the block state of a block with a debug stick after you have just changed that state on the same block, default is 4", "number; default: 4", !!!sourceEntity.getDynamicProperty("debugStickUseCooldown")?undefined:String(sourceEntity.getDynamicProperty("debugStickUseCooldown") ?? 4));
    form2.textField("§l§fdebugStickHoldDuration§r§f\nTime after the actionbar for changing a block state with the debug stick appears before the actionbar can be changed again, default is 10", "number; default: 10", !!!sourceEntity.getDynamicProperty("debugStickHoldDuration")?undefined:String(sourceEntity.getDynamicProperty("debugStickHoldDuration") ?? 10));/*
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn locations for the gametest structure, this is used when spawning in no ai entities or spawning in simulated player", "x, y, z", Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {}).join(", "));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\nDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fsendMessageOnInvalidChatCommand§r§f\nMakes the chat command still send as a chat message if that specific chat command does not exist, default is false", Boolean(world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\nAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));*/
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ timeZone, chatRankPrefix, chatSudoPrefix, rankDisplayPrefix, rankDisplaySuffix, rankDisplaySeparator, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, doNotSetNameTag, debugStickUseCooldown, debugStickHoldDuration ] = t.formValues;
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:timeZone", timeZone==""?undefined:timeZone)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatRankPrefix", chatRankPrefix==""?undefined:chatRankPrefix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatSudoPrefix", chatSudoPrefix==""?undefined:chatSudoPrefix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix", rankDisplayPrefix==""?undefined:rankDisplayPrefix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix", rankDisplaySuffix==""?undefined:rankDisplaySuffix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator", rankDisplaySeparator==""?undefined:rankDisplaySeparator)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix", nameDisplayPrefix==""?undefined:nameDisplayPrefix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix", nameDisplaySuffix==""?undefined:nameDisplaySuffix)
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator==""?undefined:chatNameAndMessageSeparator)
        doNotSetNameTag as boolean?tryrun(()=>{sourceEntity.removeTag("doNotSetNameTag")}):tryrun(()=>{sourceEntity.addTag("doNotSetNameTag")})
        sourceEntity.setDynamicProperty("debugStickUseCooldown", debugStickUseCooldown==""?undefined:debugStickUseCooldown)
        sourceEntity.setDynamicProperty("debugStickHoldDuration", debugStickHoldDuration==""?undefined:debugStickHoldDuration)/*
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes)
        world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix)
        world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix)
        if(String(gametestStructureDefaultSpawnLocation) != ""){world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2])})}
        world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled)
        world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)
        world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand)
        world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
        world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
        world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
        world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData)*/
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function extraFeaturesSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData();
    form.title("Extra Features Settings");
    form.body("Extra features are optional features that can be enabled but are disabled by default.");
    form.button("World Border System", "textures/ui/worldsIcon");
    form.button("Shop System", "textures/ui/store_home_icon");
    form.button("Back", "textures/ui/arrow_left");/*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    forceShow(form, (sourceEntity as Player)).then(ra => {let r = (ra as ActionFormResponse); 
        // This will stop the code when the player closes the form
        if (r.canceled) return;

        let response = r.selection;
        switch (response) {
            case 0:
                worldBorderSettingsDimensionSelector(sourceEntity)
            break;
            case 1:
                mainShopSystemSettings(sourceEntity)
            break;
            case 2:
                settings(sourceEntity)
            break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function worldBorderSettingsDimensionSelector(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ActionFormData();
    form2.button("Overworld")
    form2.button("Nether")
    form2.button("The End")
    form2.button("Back")
    forceShow(form2, (sourceEntity as Player)).then(t => {
        if (t.canceled||t.selection==3) {extraFeaturesSettings(sourceEntity); return;};
        worldBorderSettings(sourceEntity, t.selection); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function worldBorderSettings(sourceEntitya: Entity|executeCommandPlayerW|Player, dimension: number = 0){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    const configobj = config.worldBorder[dimensionse[dimension]]
    form2.title(`${["Overworld", "Nether", "The End"][dimension]} World Border Settings`)
    form2.toggle(`§l§fEnabled§r§f\nWhether or not the ${["overworld", "nether", "the end"][dimension]} world border is enabled, default is false`, configobj.enabled)
    form2.toggle(`§l§fPrevent World Interaction§r§f\nWhether or not to prevent players form interacting with the world when outside of the ${["overworld", "nether", "the end"][dimension]} world border, default is false`, configobj.preventWorldInteractionOutsideBorder)
    form2.toggle(`§l§fShow Red Screen Outline For When Outside Border§r§f\nWhether or not to show a red outline around the screen for players that are outside of the ${["overworld", "nether", "the end"][dimension]} world border, default is true`, configobj.showRedScreenOutlineWhenOutsideBorder)
    form2.toggle(`§l§fShow Border Particles§r§f\nWhether or not to show border particles on the boundaries of the ${["overworld", "nether", "the end"][dimension]} world border, default is true`, configobj.showBorderParticles)/*
    form2.toggle(`§l§fWarn Players With Actionbar§r§f\nWhether or not to show a warning in the actionbar when the player in outside of the world border, default is false`, configobj.showActionbarWarningWhenOutsideBorder)
    form2.toggle(`§l§fWarn Players In Chat§r§f\nWhether or not to show a warning in the chat when the player in outside of the world border, default is false`, configobj.warnPlayersInChat)*/
    form2.dropdown(`§l§fMode§r§f\nThe mode of the world border, default is Yeet Players`, ["Teleport Players", "Yeet Players", "Damage Players"], configobj.mode)
    form2.textField(`§l§fFrom§r§f\nThe first corner of the world border, each of the values in this should be smaller than their corresponding values in the "To" property, default is "-29999984 -29999984"`, "x z", `${configobj.from.x} ${configobj.from.z}`)
    form2.textField(`§l§fTo§r§f\nThe first corner of the world border, each of the values in this should be larger than their corresponding values in the "From" property, default is "29999984 29999984"`, "x z", `${configobj.to.x} ${configobj.to.z}`)
    form2.textField(`§l§fTint Intensity§r§f\nThe intensity of the screen tint that appears when you are outside of the world border (this value controls the intensity by changing how many particles will spawn), the default is 1`, "float", String(configobj.tintIntensity))
    form2.textField(`§l§fBuffer§r§f\n(§cONLY APPLIES TO DAMAGE MODE§f)\nThe distance outside of the border that a player must be to start taking damage, the default is 5`, "float", String(configobj.buffer))
    form2.textField(`§l§fDamage§r§f\n(§cONLY APPLIES TO DAMAGE MODE§f)\nThe amount of damage to apply, the default is 1`, "float", String(configobj.damage))
    form2.textField(`§l§fHorizontal Knockback§r§f\n(§bONLY APPLIES TO YEET MODE§f)\nThe amount of horizontal knockback to apply, the default is 2.5`, "float", String(configobj.knockbackH))
    form2.textField(`§l§fVertical Knockback§r§f\n(§bONLY APPLIES TO YEET MODE§f)\nThe amount of vertical knockback to apply, the default is 1.25`, "float", String(configobj.knockbackV))
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(t => {
        if (t.canceled) {worldBorderSettingsDimensionSelector(sourceEntity); return;};/*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*//*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
    
        let [ enabled, preventWorldInteraction, showRedScreenOutlineWhenOutsideBorder, showBorderParticles/*, showActionbarWarningWhenOutsideBorder, warnPlayersInChat*/, mode, from, to, tintIntensity, buffer, damage, knockbackH, knockbackV ] = t.formValues as [ enabled: boolean, preventWorldInteraction: boolean, showRedScreenOutlineWhenOutsideBorder: boolean, showBorderParticles: boolean/*, showActionbarWarningWhenOutsideBorder: boolean, warnPlayersInChat: boolean*/, mode: 0|1|2, from: `${number|null} ${number|null}`|"", to: `${number|null} ${number|null}`|"", tintIntensity: `${number}`|"", buffer: string, damage: string, knockbackH: string, knockbackV: string ];
        configobj.enabled=enabled
        configobj.preventWorldInteractionOutsideBorder=preventWorldInteraction
        configobj.showRedScreenOutlineWhenOutsideBorder=showRedScreenOutlineWhenOutsideBorder
        configobj.showBorderParticles=showBorderParticles/*
        configobj.showActionbarWarningWhenOutsideBorder=showActionbarWarningWhenOutsideBorder
        configobj.warnPlayersInChat=warnPlayersInChat*/
        configobj.mode=mode
        configobj.from=from==""?undefined:{x: JSON.parse(from.split(" ")[0]), z: JSON.parse(from.split(" ")[1])}
        configobj.to=to==""?undefined:{x: JSON.parse(to.split(" ")[0]), z: JSON.parse(to.split(" ")[1])}
        configobj.tintIntensity=tintIntensity==""?undefined:Number(tintIntensity)
        configobj.buffer=buffer==""?undefined:Number(buffer)
        configobj.damage=damage==""?undefined:Number(damage)
        configobj.knockbackH=knockbackH==""?undefined:Number(knockbackH)
        configobj.knockbackV=knockbackV==""?undefined:Number(knockbackV)
        worldBorderSettingsDimensionSelector(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function evalAutoScriptSettings(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.title("§r§0Eval Auto Script Settings (§nDEPRECATED§r§0)"); 
    form2.textField("evalBeforeEvents:chatSend", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:chatSend") ?? ""));
    form2.textField("evalBeforeEvents:dataDrivenEntityTrggerEvent", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:dataDrivenEntityTriggerEvent") ?? ""));
    form2.textField("evalBeforeEvents:effectAdd", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:effectAdd") ?? ""));
    form2.textField("evalBeforeEvents:entityRemove", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:entityRemove")));
    form2.textField("evalBeforeEvents:explosion", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:explosion")));
    form2.textField("evalBeforeEvents:itemDefinitionEvent", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent") ?? ""));
    form2.textField("evalBeforeEvents:itemUse", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemUse") ?? ""));
    form2.textField("evalBeforeEvents:itemUseOn", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:itemUseOn") ?? ""));
    form2.textField("evalBeforeEvents:pistonActivate", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:pistonActivate") ?? ""));
    form2.textField("evalBeforeEvents:playerBreakBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerBreakBlock") ?? ""));
    form2.textField("evalBeforeEvents:playerInteractWithBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithBlock") ?? ""));
    form2.textField("evalBeforeEvents:playerInteractWithEntity", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerInteractWithEntity") ?? ""));
    form2.textField("evalBeforeEvents:playerLeave", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerLeave") ?? ""));
    form2.textField("evalBeforeEvents:playerPlaceBlock", "JavaScript Script API Code", String(world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock") ?? ""));
    form2.textField("evalAfterEvents:blockExplode", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:blockExplode") ?? ""));
    form2.textField("evalAfterEvents:playerLeave", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:playerLeave") ?? ""));
    form2.textField("evalAfterEvents:entityDie", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:entityDie") ?? ""));/*
    form2.textField("Slot Number", "Slot Number", "0");
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    form2.toggle("Debug2", false);*/
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) {settings(sourceEntity); return;};
    
        let [ becs, beddete, beea, beer, bee, beide, beiu, beiuo, bepa, bepbb, bepiwb, bepiwe, bepl, beppb, aebe, aepl, aeed ] = t.formValues;
        world.setDynamicProperty("evalBeforeEvents:chatSend", becs)
        world.setDynamicProperty("evalBeforeEvents:dataDrivenEntityTrggerEvent", beddete)
        world.setDynamicProperty("evalBeforeEvents:effectAdd", beea)
        world.setDynamicProperty("evalBeforeEvents:entityRemove", beer)
        world.setDynamicProperty("evalBeforeEvents:explosion", bee)
        world.setDynamicProperty("evalBeforeEvents:itemDefinitionEvent", beide)
        world.setDynamicProperty("evalBeforeEvents:itemUse", beiu)
        world.setDynamicProperty("evalBeforeEvents:itemUseOn", beiuo)
        world.setDynamicProperty("evalBeforeEvents:pistonActivate", bepa)
        world.setDynamicProperty("evalBeforeEvents:playerBreakBlock", bepbb)
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithBlock", bepiwb)
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithEntity", bepiwe)
        world.setDynamicProperty("evalBeforeEvents:playerLeave", bepl)
        world.setDynamicProperty("evalBeforeEvents:playerPlaceBlock", beppb)
        world.setDynamicProperty("evalAfterEvents:blockExplode", aebe)
        world.setDynamicProperty("evalAfterEvents:playerLeave", aepl)
        world.setDynamicProperty("evalAfterEvents:entityDie", aeed)
        settings(sourceEntity); 
}).catch(e => {
    console.error(e, e.stack);
});}
export function manageGameRulesUI(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    const ruleNames = Object.getOwnPropertyNames(mcServer.GameRules.prototype).filter(r=>r!="constructor").sort((a, b) => -+(typeof world.gameRules[a] != typeof world.gameRules[b])*((2*+(typeof world.gameRules[a] == "number"))-1))
    const ruleValues = world.gameRules
    form2.title("Manage Game Rules")
    ruleNames.forEach(r=>{if(typeof ruleValues[r] == "number"){form2.textField(r, "number", String(ruleValues[r]))}else{form2.toggle(r, Boolean(ruleValues[r]));}})
    form2.submitButton("Save")
    forceShow(form2, (sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        try{t.formValues.forEach((v, i)=>{
            if(ruleValues[ruleNames[i]]!=v){
                ruleValues[ruleNames[i]]=typeof ruleValues[ruleNames[i]] == "number"?Number(v):v
            }
        })}catch(e){(sourceEntity as Player).sendMessage("§c"+e+" "+e.stack)}
}).catch(e => {
    console.error(e, e.stack);
});}
export function scriptEvalRunWindow(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData();
    form.title("Script Evaluate Run Window");
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.textField("Script", "JavaScript")
    form.submitButton("Run")

forceShow(form, (sourceEntity as Player)).then(ro => {
    let r = (ro as ModalFormResponse)
    if (r.canceled) return;

    let runScriptForEval = r.formValues;
    eval(String(runScriptForEval.join("\n")))
}).catch(e => {
  console.error(e, e.stack);
});}/*
export function customFormUIEditor(sourceEntity: Entity|Player){
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break; 
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break; 
        }}); 
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/
export function terminal(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    system.run(() => {
        let form = new ModalFormData();
        form.title("Command Runner / Terminal");
        form.textField("Run Command", "Run Command");
        form.textField("Run Delay", "Run Delay");
        form.toggle("Debug", false);
        form.submitButton("Run")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [commandId, commandDelay, debug] = r.formValues; /*
            console.warn(r.formValues);*/
            system.runTimeout(() => {(sourceEntity as Player).sendMessage(String(
            (sourceEntity).runCommand(String(commandId)).successCount));}, Number(commandDelay))
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function chatMessageNoCensor(sourceEntitya: Entity|executeCommandPlayerW|Player, bypassChatInputRequests = false){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers()
        form.title("Chat");
        form.textField("Chat Message / Command", "Chat Message / Command");
        form.dropdown("As Player", playerList.map(p=>p.name), playerList.indexOf(sourceEntity as Player));
        form.submitButton("Send")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [message, asPlayer] = r.formValues; /*
            console.warn(r.formValues);*/
            chatMessage({cancel: false, message: message as string, sender: playerList[asPlayer as number]??sourceEntity as Player}, bypassChatInputRequests)
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function chatSendNoCensor(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers()
        form.title("Chat");
        form.textField("Chat Message", "Chat Message");
        form.dropdown("As Player", playerList.map(p=>p.name), playerList.indexOf(sourceEntity as Player));
        form.submitButton("Send")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [message, asPlayer] = r.formValues; /*
            console.warn(r.formValues);*/
            chatSend({returnBeforeChatSend: false, player: playerList[asPlayer as number]??sourceEntity as Player, newMessage: message as string, event: {cancel: false, message: message as string, sender: playerList[asPlayer as number]??sourceEntity as Player}, eventData: {cancel: false, message: message as string, sender: playerList[asPlayer as number]??sourceEntity as Player}})
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function chatCommandRunner(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers()
        form.title("Chat Command Runner");
        form.textField("Chat Command", "Chat Command");
        form.dropdown("As Player", playerList.map(p=>p.name), playerList.indexOf(sourceEntity as Player));
        form.submitButton("Run Chat Command")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [message, asPlayer] = r.formValues; /*
            console.warn(r.formValues);*/
            chatCommands({returnBeforeChatSend: false, player: playerList[asPlayer as number]??sourceEntity as Player, newMessage: message as string, event: {cancel: false, message: message as string, sender: playerList[asPlayer as number]??sourceEntity as Player}, eventData: {cancel: false, message: message as string, sender: playerList[asPlayer as number]??sourceEntity as Player}, fromExecute: true})
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function mapArtGenerator(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    srun(() => {
        let form = new ModalFormData();
        form.title("Map Art Generator [§cExperimental§r]");
        form.textField("§fFor info on how to use this generator, go to §bhttps://sites.google.com/view/8craftermods/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("Chunk Index x", "integer", String(coords.getChunkIndex(sourceEntity.location).x));
        form.textField("Chunk Index y", "integer", String(coords.getChunkIndex(sourceEntity.location).y));
        form.textField("Offset x", "integer", "0");
        form.textField("Offset z", "integer", "0");
        form.dropdown("Alignment Mode", ["Chunk Grid", "Map Grid"], 1);
        form.dropdown("Dimension", main.dimensions.map(d=>dimensionTypeDisplayFormatting[d.id]), main.dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Generate Map Art")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, chunkx, chunky, offsetx, offsetz, alignmentmode, dimension] = r.formValues; /*
            console.warn(r.formValues);*/
            if(String(snbt).includes("#")){(sourceEntity as Player).sendMessage("§6Warning: The snbt was censored! ")}
            let newsnbta = JSON.parse((snbt as string).replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'))
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            //console.warn(JSONStringify(Object.assign(mcMath.Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, coords.chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), {dimension: dimensions[dimension as number]??sourceEntity.dimension, y: (dimensions[dimension as number]??sourceEntity.dimension).heightRange.max-((newsnbta.size[1]??1) as number)})))
            //console.warn(JSONStringify(newsnbta))
            generateNBTFileD(Object.assign(mcMath.Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, coords.chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor((Number(chunkx) / 8)+0.5)*8-4)):Number(chunkx)), y: (alignmentmode==1?((Math.floor((Number(chunky) / 8)+0.5)*8)-4):Number(chunky))}).from), {dimension: main.dimensions[dimension as number]??sourceEntity.dimension, y: (main.dimensions[dimension as number]??sourceEntity.dimension).heightRange.max-((newsnbta.size[1]??1) as number)}), newsnbta, sourceEntity as Player)
            //console.warn(JSONStringify([mcMath.Vector3Utils.add({x: Number(offsetx), y: 0, z: Number(offsetz)}, coords.chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from), coords.chunkIndexToBoundingBox({x: (alignmentmode==1?((Math.floor(Number(chunkx) / 8)*8)+4):Number(chunkx)), y: (alignmentmode==1?((Math.floor(Number(chunky) / 8)*8)+4):Number(chunky))}).from]))
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function mapArtGeneratorB(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    srun(() => {
        let form = new ModalFormData();
        form.title("Map Art Generator [§cExperimental§r]");
        form.textField("To use this generator you must first use something like cubical.xyz to convert an image to a minecraft structure, then save that structure as a .nbt file, then convert that .nbt file to SNBT format, then paste the SNBT into the text box below. \nNote: When pasting into the text box the game might freeze for a few minutes until it finishes pasting, and then it will unfreeze. \nSNBT of the .nbt file", "SNBT Data");
        form.textField("Chunk Index x", "integer", String(Math.floor(coords.getChunkIndex(sourceEntity.location).x/8)));
        form.textField("Chunk Index y", "integer", String(Math.floor(coords.getChunkIndex(sourceEntity.location).y/8)));
        form.dropdown("Dimension", main.dimensions.map(d=>dimensionTypeDisplayFormatting[d.id]), main.dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Generate Map Art")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, chunkx, chunky, dimension] = r.formValues; /*
            console.warn(r.formValues);*/
            if(String(snbt).includes("#")){(sourceEntity as Player).sendMessage("§6Warning: The snbt was censored! ")}
            let newsnbta = JSON.parse((snbt as string).replace(/(['"])?([a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*([\"\'\`funIN\-0-9\{\[])/g, '"$2":$4'))
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            generateNBTFileB(Object.assign(coords.chunkIndexToBoundingBox({x: chunkx as number, y: chunky as number}).from, {dimension: main.dimensions[dimension as number]??sourceEntity.dimension, y: (main.dimensions[dimension as number]??sourceEntity.dimension).heightRange.max-((newsnbta.size[1]??1) as number)}), newsnbta)
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
//evaluateParameters("{a: \"a\", \"b\": \"b\"}", [{type: "json"}])
export function nbtStructureLoader(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    srun(() => {
        let form = new ModalFormData();
        form.title("Java NBT Structure Loader [§cExperimental§r]");
        form.textField("§fFor info on how to use this loader, go to §bhttps://sites.google.com/view/8craftermods/debug-sticks-add-on/andexdbnbtstructureloader§f\nNote: When pasting the nbt data into the text box the game might freeze for anywhere from a few seconds to half a hour depending on how much text is being pasted while it is pasting, and then it will unfreeze. \nNBT Data", "NBT Data");
        form.textField("spawn position x", "integer", String(sourceEntity.location.x));
        form.textField("spawn position y", "integer", String(sourceEntity.location.y));
        form.textField("spawn position z", "integer", String(sourceEntity.location.z));
        form.dropdown("Dimension", main.dimensions.map(d=>dimensionTypeDisplayFormatting[d.id]), main.dimensions.indexOf(sourceEntity.dimension));
        form.submitButton("Load Java NBT Structure")
        forceShow(form, sourceEntity as any).then(ra => {let r = ra as ModalFormResponse
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [snbt, x, y, z, dimension] = r.formValues; /*
            console.warn(r.formValues);*/
            if(String(snbt).includes("#")){(sourceEntity as Player).sendMessage("§6Warning: The snbt was censored! ")}
            let newsnbta = JSON.parse((snbt as string).replace(/(?<=[,\{][\s\n]*?)(['"])?(?<vb>[a-zA-Z0-9_]+)(['"])?[\s\n]*:[\s\n]*(?<vd>false|true|undefined|NULL|Infinity|-Infinity|[\-\+]?[0-9]+|"(?:[^"]|(?<=([^\\])(\\\\)*?\\)")*"|'(?:[^']|(?<=([^\\])(\\\\)*?\\)')*')(?=[\s\n]*?[,\}])/g, '"$<vb>":$<vd>'))
            //let newsnbta = JSONParse((snbt as string).replaceAll(/(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(?<prefix>[\{\,])[\s\n]*(?<identifier>[\-\_a-zA-Z0-9\.\+]*)[\s\n]*\:[\s\n]*(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g, "$<prefix>\"$<identifier>\":"))
            generateNBTFileD({dimension: main.dimensions[dimension as number]??sourceEntity.dimension, x: (Number(x)??sourceEntity.location.x), y: (Number(y)??sourceEntity.location.y), z: (Number(z)??sourceEntity.location.z)}, newsnbta, sourceEntity as Player)
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });})/*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/}
export function playerController(sourceEntitya: Entity|executeCommandPlayerW|Player, message: string = ""){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    let playerList = world.getPlayers()
    let targetList = [playerList[0].nameTag]
    let componentList = [playerList[0].getComponents[0]]
    let dimension = ""
    let spawnXPosition = ""
    let spawnYPosition = ""
    let spawnZPosition = ""
    for (const index in playerList) {/*
        console.warn(index);*/
        if (Number(index) != 0) {
        targetList = String([String(targetList), playerList[index].nameTag]).split(",");/*
        targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
        }/*
        console.warn(targetList);*/
    }/*
    console.warn(targetList);
    console.warn(String(targetList).split(","));
    console.warn(String(targetList));
    console.warn([String(targetList)]);*/
    function playerControllerFormPopup(playerTargetB, playerViewerB) {
        let form = new ModalFormData();
        try {dimension = String(playerList[playerTargetB].getSpawnPoint().dimension.id);} catch(e){dimension = ""}
        try {spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);} catch(e){spawnXPosition = ""}
        try {spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);} catch(e){spawnYPosition = ""}
        try {spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);} catch(e){spawnZPosition = ""}
        let playerCurrentNameTag = ""
        try {playerCurrentNameTag = String(playerList[playerTargetB].nameTag);}catch (e) {playerCurrentNameTag = "";}
        form.title("Player Controller");
        form.toggle("Change Name Tag", false)
        form.toggle("Multiline Name Tag", false)
        form.textField("Name Tag", "Name Tag", playerCurrentNameTag)
        form.textField("Trigger Event", "Trigger Event")
        form.textField("addExperience", "Experience Amount")
        form.textField("addLevels", "Level Amount")
        form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlotIndex)
        form.slider("§4Scale", 0, 10, 0.5)
        form.toggle("Is Sneaking", playerList[playerTargetB].isSneaking)
        form.toggle("Clear Velocity", false)
        form.toggle("Extinguish Fire", false)
        form.toggle("Kill", false)
        form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", false)
        form.toggle("Set On Fire", false)
        form.textField("Set On Fire - Seconds", "Time To Set On Fire For")
        form.toggle("Set On Fire - Use Effects", false)
        form.toggle("Add Effect", false)
        form.textField("Effect To Add", "Effect To Add")
        form.textField("Ticks Of Effect", "Ticks Of Effect")
        form.textField("Effect Amplifier", "Effect Amplifier")
        form.toggle("Show Particles Of Effect", true)
        form.toggle("Add tag", false)
        form.textField("Tag To Add", "Tag To Add")
        form.toggle("Remove Effect", false)
        form.textField("Effect To Remove", "Effect To Remove")
        form.toggle("Remove tag", false)
        form.textField("Tag To Remove", "Tag To Remove")/*
        form2.dropdown("damageType", ["entity", "projectile"], 0)
        form2.dropdown("damageCause", ["anvil", "none"], 0)*/
        form.toggle("§eapplyImpulse", false)
        form.textField("§eX Velocity", "§eX Velocity"/*, String(playerList[playerTargetB].getVelocity().x)*/)
        form.textField("§eY Velocity", "§eY Velocity"/*, String(playerList[playerTargetB].getVelocity().y)*/)
        form.textField("§eZ Velocity", "§eZ Velocity"/*, String(playerList[playerTargetB].getVelocity().z)*/)
        form.toggle("applyKnockback", false)
        form.textField("directionX", "directionX")
        form.textField("directionZ", "directionZ")
        form.textField("horizontalStrength", "horizontalStrength")
        form.textField("verticalStrength", "verticalStrength")
        form.toggle("Set Rotation", false)
        form.textField("X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x))
        form.textField("Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y))
        form.toggle("Teleport", false)
        form.textField("Teleport Dimension", "Dimension", playerList[playerTargetB].dimension.id)
        form.textField("Teleport X Coordinate", "X Coordinate", String(playerList[playerTargetB].location.x))
        form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerList[playerTargetB].location.y))
        form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerList[playerTargetB].location.z))
        form.textField("Teleport X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x))
        form.textField("Teleport Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y))
        form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], 0)
        form.toggle("Teleport - checkForBlocks", false)
        form.toggle("Teleport - keepVelocity", false)
        form.toggle("Try Teleport", false)
        form.textField("Try Teleport Dimension", "§4Dimension", playerList[playerTargetB].dimension.id)
        form.textField("Try Teleport X Coordinate", "§4X Coordinate", String(playerList[playerTargetB].location.x))
        form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", String(playerList[playerTargetB].location.y))
        form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", String(playerList[playerTargetB].location.z))
        form.toggle("Try Teleport - checkForBlocks", false)
        form.toggle("Try Teleport - keepVelocity", false)
        form.toggle("Set Operator", playerList[playerTargetB].isOp())
        form.toggle("Set Spawn Point", false)
        form.textField("Spawn Dimension", "Spawn Dimension", dimension)
        form.textField("Spawn X Coordinate", "Spawn X Coordinate", spawnXPosition)
        form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", spawnYPosition)
        form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", spawnZPosition)
        form.toggle("Start Item Cooldown", false)
        form.textField("Item Category", "Item Category")
        form.textField("Tick Duration", "Tick Duration")
        form.toggle("Send Message", false)
        form.textField("Message To Send", "Message To Send")
        form.toggle("§4Open The Item Modification Form Afterwards", false)
        form.toggle("resetLevel", false)
        form.toggle("§4Debug", false)

        forceShow(form, playerList[playerViewerB]).then(r => {
            if (r.canceled) return;

            let [ changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug ] = (r as ModalFormResponse).formValues;
            let newNameTag = String(nameTag)
            if (Boolean(multilineNameTag) == true) {newNameTag = String(nameTag).split("\\\\newline").join("\n");}
/*      
            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
            scale.value = Number(scaleValue);*//**/
            if (Boolean(changeNameTag) == true) {
            try {playerList[playerTargetB].setOp(Boolean(setOp))} catch(e){console.error(e, e.stack);}
        }/**/
            if (Boolean(changeNameTag) == true) {
                try {playerList[playerTargetB].nameTag = String(newNameTag);} catch(e){console.error(e, e.stack);}
            }
            playerList[playerTargetB].isSneaking = Boolean(isSneaking);
            playerList[playerTargetB].selectedSlotIndex = Number(selectedSlotIndex);
            if (Boolean(addEffect) == true) {
                try {playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), {amplifier: Number(effectAmplifier), showParticles: Boolean(effectShowEffectParticles)});} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(applyImpulse) == true) {
                try {playerList[playerTargetB].applyImpulse({ x: Number(velocityX), y: Number(velocityY), z: Number(velocityZ) });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(applyKnockback) == true) {
                try {playerList[playerTargetB].applyKnockback(Number(kockbackDirectionX), Number(knockbackDirectionZ), Number(knockbackHorizontalStrength), Number(knockbackVerticalStrength));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(addTag) == true) {
                try {playerList[playerTargetB].addTag(String(tagToAdd));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(removeTag) == true) {
                try {playerList[playerTargetB].removeTag(String(tagToRemove));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(removeEffect) == true) {
                try {playerList[playerTargetB].removeEffect(String(effectToRemove));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(setSpawnPoint) == true) {
                try {playerList[playerTargetB].setSpawnPoint({dimension: world.getDimension(String(spawnDimension)), x: Number(spawnX), y: Number(spawnY), z: Number(spawnZ) });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(teleport) == true) {
                try {playerList[playerTargetB].teleport({x: Number(teleportX), y: Number(teleportY), z: Number(teleportZ) }, {checkForBlocks: Boolean(teleportCheckForBlocks), dimension: world.getDimension(String(teleportDimension)), keepVelocity: Boolean(teleportKeepVelocity), rotation: {x: Number(teleportRotX), y: Number(teleportRotY)} });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(tryTeleport) == true) {
                try {playerList[playerTargetB].tryTeleport({x: Number(tryTeleportX), y: Number(tryTeleportY), z: Number(tryTeleportZ) }, {checkForBlocks: Boolean(tryTeleportCheckForBlocks), dimension: world.getDimension(String(tryTeleportDimension)), keepVelocity: Boolean(tryTeleportKeepVelocity) });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(setOnFire) == true) {
                try {playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(setRot) == true) {
                try {playerList[playerTargetB].setRotation({ x: Number(rotX), y: Number(rotY) });} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(resetLevel) == true) {
                try {playerList[playerTargetB].resetLevel();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(kill) == true) {
                try {playerList[playerTargetB].kill();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(remove) == true) {
                try {playerList[playerTargetB].remove();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(clearVelocity) == true) {
                try {playerList[playerTargetB].clearVelocity();} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(extinguishFire) == true) {
                try {playerList[playerTargetB].extinguishFire();} catch(e){console.error(e, e.stack);}
            }
            if (triggerEvent !== undefined) {
                try {playerList[playerTargetB].triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}
            }
            if (addExperience !== undefined) {
                try {playerList[playerTargetB].addExperience(Number(addExperience));} catch(e){console.error(e, e.stack);}
            }
            if (setItemCooldown !== undefined) {
                try {playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));} catch(e){console.error(e, e.stack);}
            }
            if (addLevels !== undefined) {
                try {playerList[playerTargetB].addExperience(Number(addLevels));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(sendMessage) == true) {
                try {playerList[playerTargetB].sendMessage(String(messageToSend));} catch(e){console.error(e, e.stack);}
            }
            if (Boolean(isSneaking) == true) {
                playerList[playerTargetB].isSneaking = true
                try {playerList[playerTargetB].addTag("isSneaking");} catch(e){console.error(e, e.stack);}  /*
                if (playerList[playerTargetB].hasTag("isSneaking")) {
                  system.runInterval( () => {
                  playerList[playerTargetB].isSneaking == true
                  if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                  return
                  }
                  }, 2)
                }*/
            } else { try {playerList[playerTargetB].removeTag("isSneaking"); playerList[playerTargetB].isSneaking = false} catch(e){console.error(e, e.stack);} }

        }).catch(e => {
        console.error(e, e.stack);
    })}
    let showMenuForm2 = sourceEntity
    if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
        let message2 = message.slice(8, message.length)
        let message3 = message2.split("|")
        let playerTargetB = Number(message3[0])
        let playerViewerB = Number(message3[1])
        playerControllerFormPopup(playerTargetB, playerViewerB)
        showMenuForm2 = playerList[playerViewerB]
    } else {
    form2.title("Player Controller");
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    forceShow(form2, playerList[playerList.findIndex((x) => x == sourceEntity)]).then(t => {
        if ((t as ModalFormResponse).canceled)
            return;
            let [playerTarget, playerViewer] = (t as ModalFormResponse).formValues;
            let playerTargetB = Number(playerTarget)
            let playerViewerB = Number(playerViewer) 
            playerControllerFormPopup(playerTargetB, playerViewerB)
}).catch(e => {
console.error(e, e.stack);
})}}
export function inventoryController(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.textField("Slot Number", "Slot Number", "0");
    form2.dropdown("Slot Type", ["Inventory", "Equipment"], 0)
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    form2.toggle("Debug2", false);
    form2.show(sourceEntity as any).then(t => {
        if (t.canceled)
            return;
            let [slotNumber, slotType, playerTarget, playerViewer, debug2] = t.formValues;
            let playerTargetB = Number(playerTarget)
            let playerViewerB = Number(playerViewer)
    let inventory: any
    inventory = players[playerTargetB].getComponent("inventory") as EntityInventoryComponent;/*
    try{inventory = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};*/
    let item = inventory.container.getItem(Number(slotNumber));
    let equipmentPlayerSlotsList = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Mainhand, EquipmentSlot.Offhand]
    if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equippable") as EntityEquippableComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};
    function getDurability() { try {return item.getComponent("minecraft:durability") as ItemDurabilityComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }; return undefined};}
    function getEnchantments() { try {return item.getComponent("minecraft:enchantments") as ItemEnchantableComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }; return undefined};}
    const durability = getDurability()
    function itemNameTextCalculator(){
    try{if (item.nameTag == undefined) {
        return undefined;
    } else {
    if (item.nameTag != undefined) {
        return item.nameTag;
    }}} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }; return undefined};}
    let itemNameTextField = itemNameTextCalculator();/*
    console.warn(itemNameTextCalculator());*/
    function itemLoreTextCalculator(){
    try{if (item.getLore() == undefined) {
        return undefined;
    } else {
    if (item.getLore() != undefined) {
        return Array(item.getLore().toString()).join("");
    }}} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }; return undefined};}
    let itemLoreTextField = itemLoreTextCalculator();
    let currentValueItemAmount = 0
    try{currentValueItemAmount = item.amount} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); };/* return 0*/};
    let currentValueItemType = undefined
    try{currentValueItemType = item.typeId} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); };/* return 0*/};
    let itemKeepOnDeath = false
    try{itemKeepOnDeath = item.keepOnDeath} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); };/* return false*/};
    let form = new ModalFormData();/*
    console.warn(item.nameTag);*//*
    console.warn(Array(item.getLore().toString()).join(""));*/
    form.title("Item Modifier / Lore");
    form.textField("Item Type: " + currentValueItemType + "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField/*(String(item.nameTag))*/);
    form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", itemLoreTextField);
    form.textField("Can Destroy", "Can Destroy", ""/*(String(item.getCanDestroy()))*/);
    form.textField("Can Place On", "Can Place On", ""/*(String(item.getCanPlaceOn()))*/);
    form.textField("Trigger Event", "Trigger Event", "");
    form.toggle("Set Count", false);
    form.slider("Count", 0, 255, 1, currentValueItemAmount);
    form.toggle("keepOnDeath", (itemKeepOnDeath));
    function getItemLockMode(mode?: Number, input?: Number) {try{if (mode == 1) {
    try{if(item.lockMode == "inventory") {
        return 0
    } else{
        if(item.lockMode == "none") {return 1} else{
            if(item.lockMode == "slot") {return 2}}}} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }; return 1}}
            else {if (mode == 0) {if(input == 0) {
                return ItemLockMode.inventory
            } else{
                if(input == 1) {return ItemLockMode.none} else{
                    if(input == 2) {return ItemLockMode.slot}}}}}} catch(e){console.error(e, e.stack); return undefined};}
    let itemLockModeIndex = Number(getItemLockMode(1))
    form.dropdown("lockMode", [ "inventory", "none", "slot" ], Number((itemLockModeIndex)));
    form.toggle("setLore", false);
    form.toggle("clearLore", false);
    form.toggle("New Item", false);
    form.textField("Item Type", "Item Type", "");
    form.textField("Item Count", "Item Count", "1");/*
    form.textField("Item Data", "Trigger Event", "");*/
    form.toggle("Move Item", false);
    form.textField("From Slot", "From Slot", "0");
    form.textField("To Slot", "To Slot", "1");
    form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("From Contriner Player", String(targetList).split(","), 0)
    form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("To Container Player", String(targetList).split(","), 0)
    form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.toggle("Swap Items", false);
    form.textField("Slot", "Slot", "0");
    form.textField("Other Slot", "Other Slot", "1");
    form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("Container Player", String(targetList).split(","), 0)
    form.textField("Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("Other Container Player", String(targetList).split(","), 0)
    form.textField("Other Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.toggle("Transfer Item", false);
    form.textField("From Slot", "From Slot", "0");
    form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("From Container Player", String(targetList).split(","), 0)
    form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0)
    form.dropdown("To Container Player", String(targetList).split(","), 0)
    form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z)
    form.toggle("Debug", false);

    forceShow(form, players[playerViewerB]).then(r => {
        // This will stop the code when the player closes the form
        if (r.canceled) return;
    
        // This will assign every input their own variable
        let [ itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, setAmount, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount/*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug ] = (r as ModalFormResponse).formValues;/*
        console.warn(r.formValues);*/
    
        /*let item = inventory.container.getItem(Number(slotNumber));
        if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};*/
        let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({x: Number(String(transferFromContainerBlock).split(", ")[1]), y: Number(String(transferFromContainerBlock).split(", ")[2]), z: Number(String(transferFromContainerBlock).split(", ")[3])})
        let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({x: Number(String(transferToContainerBlock).split(", ")[1]), y: Number(String(transferToContainerBlock).split(", ")[2]), z: Number(String(transferToContainerBlock).split(", ")[3])})
        let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({x: Number(String(moveFromContainerBlock).split(", ")[1]), y: Number(String(moveFromContainerBlock).split(", ")[2]), z: Number(String(moveFromContainerBlock).split(", ")[3])})
        let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({x: Number(String(moveToContainerBlock).split(", ")[1]), y: Number(String(moveToContainerBlock).split(", ")[2]), z: Number(String(moveToContainerBlock).split(", ")[3])})
        let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({x: Number(String(swapContainerBlock).split(", ")[1]), y: Number(String(swapContainerBlock).split(", ")[2]), z: Number(String(swapContainerBlock).split(", ")[3])})
        let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({x: Number(String(swapOtherContainerBlock).split(", ")[1]), y: Number(String(swapOtherContainerBlock).split(", ")[2]), z: Number(String(swapOtherContainerBlock).split(", ")[3])})
        let durability2 = getDurability()
        let enchantments2 = getEnchantments()/*
        for (const index in inventory.) {
            if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }*/
        let newItemNameTag = String(itemName).split("\\\\newline")
        try {item.nameTag = newItemNameTag.join("\n");} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack);}; }
        if (Boolean(setLore) == true) {
            try {item.setLore(String(itemLore).split("\\\\newline"));} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack);}; }
        }
        if (Boolean(clearLore) == true) {
            try {item.setLore();} catch(e){console.error(e, e.stack);}
        }
        try{item.lockMode = String(getItemLockMode(0, Number(lockMode))) as ItemLockMode;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack);}; }
        try{item.keepOnDeath = Boolean(keepOnDeath);} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack);}; }
        if (Boolean(setAmount) == true) {try{item.amount = Number(amount);} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)};}}
        if (String(canDestroy) !== "") {try {item.setCanDestroy(String(canDestroy).split(", "))} catch(e){console.error(e, e.stack);};/*String[String(canDestroy)]*/;}
        if (String(canPlaceOn) !== "") {try {item.setCanPlaceOn(String(canPlaceOn).split(", "))} catch(e){console.error(e, e.stack);};}
        if (String(triggerEvent) !== "") {try{item.triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}}/*
        try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*//*
        let enchantment = new Enchantment("fire_aspect", 4)
        enchantment.level = 5
        try{ const enchantments3 = enchantments2.enchantments; enchantments3.addEnchantment(enchantment); enchantments2.enchantments = enchantments3} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
        if (Boolean(newItem) == true) {
            try {item = new ItemStack(String(newItemType), Number(newItemCount));} catch(e){console.error(e, e.stack);}
        }
        if(sourceEntity.hasTag("scriptDebugger")) { console.warn(item.typeId) }
        if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equippable") as EntityEquippableComponent; a.setEquipment(equipmentPlayerSlotsList[Number(slotNumber)], item.clone());} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};} else {
        try{inventory.container.setItem(Number(slotNumber), item);} catch(e){console.error(e, e.stack);}
        }/*
        try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
        if (Boolean(moveItem) == true) {/*
            let moveFromSlotB: any
            moveFromSlotB = undefined*/
            let moveFromContainerB: any
            moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory") as EntityInventoryComponent;
            switch(moveFromContainerType){
                case 4:
                    moveFromContainerB = moveFromContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            let moveToContainerB: any
            moveToContainerB = players[Number(moveToContainer)].getComponent("inventory") as EntityInventoryComponent;
            switch(moveToContainerType){
                case 4:
                    moveToContainerB = moveToContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            try {moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(swapItems) == true) {/*
            let moveFromSlotB: any
            moveFromSlotB = undefined*/
            let swapContainerB: any
            let mode = 0
            swapContainerB = players[Number(swapContainer)].getComponent("inventory") as EntityInventoryComponent;
            let itemA: any
            itemA = undefined
            if (Number(swapSlot) > 35 && Number(swapContainerType) == 0) { try{swapContainerB = players[playerTargetB].getComponent("equippable") as EntityEquippableComponent; swapSlot = Number(swapSlot) - 36; mode = 1; itemA = swapContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapSlot)]).clone()} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};
            switch(swapContainerType){
                case 4:
                    swapContainerB = swapContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            let swapOtherContainerB: any
            swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory") as EntityInventoryComponent;
            let itemB: any
            itemB = undefined
            if (Number(swapOtherSlot) > 35) { try{swapOtherContainerB = players[playerTargetB].getComponent("equippable") as EntityEquippableComponent; swapOtherSlot = Number(swapOtherSlot) - 36; if(mode == 1) {mode = 2;} else {mode = 3}; itemB = swapOtherContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)]).clone()} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};
            switch(swapOtherContainerType){
                case 4:
                    swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            try {if (itemB == undefined){itemB = swapOtherContainerB.container.getItem(Number(swapOtherSlot)).clone()}} catch(e){console.error(e, e.stack);}
            try {if (itemA == undefined){itemA = swapContainerB.container.getItem(Number(swapSlot)).clone()}} catch(e){console.error(e, e.stack);}
            switch(mode){
                case 0:
                    console.warn("Mode: 0")
                    try {swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB);} catch(e){console.error(e, e.stack);}
                break;
                case 1:
                    console.warn("Mode: 1")
                    try {swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);} catch(e){console.error(e, e.stack);}
                    try {swapOtherContainerB.container.setItem(Number(swapOtherSlot), itemA);} catch(e){console.error(e, e.stack);}
                break;
                case 3:
                    console.warn("Mode: 3")
                    try {swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemA);} catch(e){console.error(e, e.stack);}
                    try {swapContainerB.container.setItem(Number(swapSlot), itemB);} catch(e){console.error(e, e.stack);}
                break;
                case 2:
                    console.warn("Mode: 2")
                    try {swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapSlot)], itemA);} catch(e){console.error(e, e.stack);}
                    try {swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);} catch(e){console.error(e, e.stack);}
                break;
            }
            
        }
        if (Boolean(transferItem) == true) {/*
            let moveFromSlotB: any
            moveFromSlotB = undefined*/
            let transferFromContainerB: any
            transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory") as EntityInventoryComponent;
            switch(transferFromContainerType){
                case 4:
                    transferFromContainerB = transferFromContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            let transferToContainerB: any
            transferToContainerB = players[Number(transferToContainer)].getComponent("inventory") as EntityInventoryComponent;
            switch(transferToContainerType){
                case 4:
                    transferToContainerB = transferToContainerBlockB.getComponent("inventory") as BlockInventoryComponent;
                break;
            }
            try {transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(debug) == true) {
            console.warn("Form Values", (r as ModalFormResponse).formValues);
            console.warn(["Item Components: ", item.getComponents()]);
            console.warn(item.getTags());
            console.warn(players);
            console.warn(players[0]);
            console.warn(players[1]);/*
            try {console.warn(item.getCanDestroy());} catch(e){
                console.error(e, e.stack)};
            try {console.warn(item.getCanPlaceOn());} catch(e){
                console.error(e, e.stack)};*/
            console.warn(item.isStackable);
            console.warn(item.maxAmount);
            console.warn(item.type);
            console.warn(item.typeId);
            console.warn(item.nameTag);
            console.warn(item.getLore());
            try {console.warn(["Damage: ", durability.damage]);} catch(e){console.error(e, e.stack)};
            try {console.warn(["Damage Chance: ", durability.getDamageChance()]);} catch(e){console.error(e, e.stack)};
            try {console.warn(["Damage Range: ", durability.getDamageChanceRange()]);} catch(e){console.error(e, e.stack)};
            try {console.warn(["Max Durability: ", durability.maxDurability]);} catch(e){console.error(e, e.stack)};
            let componentList = [item.getComponents()[0].typeId]
            for (const index in players) {
                if (Number(index) != 0) {
                componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                }
            }
            console.warn(String(["Item Components: " + String(componentList)]));
        }
    
        // Do something
    }).catch(e => {
        console.error(e, e.stack);
    });
}).catch(e => {
    console.error(e, e.stack);
});}
export function entityController(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
}
export function editorStick(sourceEntitya: Entity|executeCommandPlayerW|Player, message: string = ""){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData();
    let playerList = world.getPlayers()
    let block = sourceEntity.getBlockFromViewDirection()
    let block2 = block.block
    let allCoordinates = []
    if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) { allCoordinates = message.slice(12).split("|");  block2 = world.getDimension(allCoordinates[0]).getBlock({x: allCoordinates[1], y: allCoordinates[2], z: allCoordinates[3]})}
    form.title("Editor Stick");
    form.submitButton("Save")
    let blockStatesFullList: any/*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates()); } catch(e){if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";} else  {blockStatesFullList = "§r§cThis block has no block states. §f";}}/*
    for (const index in block.block.permutation.getAllStates()) {*//*
        console.warn(index);*//*
        if (Number(index) != 0) {*//*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*//*
        }*//*
        console.warn(targetList);*//*
    }*/
    try { form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + mcMath.Vector3Utils.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId) } catch(e){console.error(e, e.stack); form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");}/*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", false)
    try {form.textField("List Of Block Properties: " + blockStatesFullList/*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state") } catch(e){console.error(e, e.type/*e.stack*/); console.warn("test: " + String(e).slice(67)/*e.stack*/); form.textField("Block Property Identifier", "bool_state, num_state, str_state");}
    form.textField("Block Property Value", "true, 1, \"North\"")
    form.toggle("setProperty Enabled", false)/*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*//*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", block2.isWaterlogged)/*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", false)/*
    let rawtextf = "["
    function evalRawText(rawtextf: string, rt: RawMessage){
        
    rawtextf = rawtextf + "{"
    let ic = 0; 
    if(rt?.rawtext != undefined){
        rawtextf = rawtextf + "["
        rt?.rawtext.forEach((rt, ib)=>{
            rawtextf = evalRawText(rawtextf, rt); 
        }); 
        rawtextf = rawtextf + "]"
    }
    if(rt?.score != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", score: {name: \"" + rt.score.name.replaceAll("\"", "\\\"") + "\", objective: \"" + rt.score.objective.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.text != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", text: \"" + rt.text.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.translate != undefined){
        if(ic == 0){
            ic = 1
            rawtextf = rawtextf + "translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
        }else{
            rawtextf = rawtextf + ", translate: \"" + rt.translate.replaceAll("\"", "\\\"") + "\"}"
        }
    }
    if(rt?.with != undefined){
        if(typeof rt.with == typeof ["hisa", "sahi"]){
            let abdc: string[]
            abdc = []; 
            Array((rt.with as string[])).forEach((rtwh)=>{abdc.push("\"" + String(rtwh).replaceAll("\"", "\\\"") + "\""); }); 
            if(ic == 0){
                ic = 1
                rawtextf = rawtextf + "with: [" + abdc.join(", ") + "]}"
            }else{
                rawtextf = rawtextf + ", with: [" + abdc.join(", ") + "]}"
            }
        }
    }
    rawtextf = rawtextf + "}"
    return rawtextf
    }
    block2.getComponent("sign").getRawText(SignSide.Front)?.rawtext.forEach((rt, i)=>{
        rawtextf = evalRawText(rawtextf, rt); 
    }); 
    rawtextf = rawtextf + "]"*/
    try{
        if(block2.getComponent("fluidContainer") != undefined){
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluidContainer").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluidContainer").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluidContainer").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluidContainer").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, `${block2.getComponent("fluidContainer").fluidColor.red}, ${block2.getComponent("fluidContainer").fluidColor.green}, ${block2.getComponent("fluidContainer").fluidColor.blue}, ${block2.getComponent("fluidContainer").fluidColor.alpha}`)
            form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluidContainer").fillLevel}`, 0, 6, 1, block2.getComponent("fluidContainer").fillLevel)
            form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluidContainer").getFluidType()=="Potion"}`, `item type`)
        }else{
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
        }
    }catch{
        form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
        form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
        form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
    }
    form.toggle("setSignFrontRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)))}else{form.textField(`§4Sign Front RawText`, `§r§4Unavailable`)}
    form.toggle("setSignBackRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)))}else{form.textField(`§4Sign Back RawText`, `§r§4Unavailable`)}
    form.toggle("setSignFrontText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front))}else{form.textField(`§4Sign Front Text`, `§r§4Unavailable`)}
    form.toggle("setSignBackText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back))}else{form.textField(`§4Sign Back Text`, `§r§4Unavailable`)}
    form.toggle("setSignFrontTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front))}else{form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignBackTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back))}else{form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed)

forceShow(form, playerList[playerList.findIndex((x) => x == sourceEntity)]).then(ro => {
    let r = (ro as ModalFormResponse)
    if (r.canceled) return;

    let [
        setType,
        setTypeEnabled,
        blockPropertyIdentifier,
        blockPropertyValue,
        setPropertyEnabled/*,
        selectedSlotIndex*/,
        isWaterlogged/*,
        clearVelocity*/,
        debug,
        fluidContainerColor,
        fluidContainerFillLevel,
        potionType,
        signFrontRawTextEnabled,
        signFrontRawText,
        signBackRawTextEnabled,
        signBackRawText,
        signFrontTextEnabled,
        signFrontText,
        signBackTextEnabled,
        signBackText,
        signFrontTextColorEnabled,
        signFrontTextColor,
        signBackTextColorEnabled,
        signBackTextColor,
        setSignIsWaxed
    ] = (r as ModalFormResponse).formValues as [
        setType: string,
        setTypeEnabled: boolean,
        blockPropertyIdentifier: string,
        blockPropertyValue: string,
        setPropertyEnabled: boolean/*,
        selectedSlotIndex: string*/,
        isWaterlogged: boolean/*,
        clearVelocity: boolean*/,
        debug: boolean,
        fluidContainerColor: string,
        fluidContainerFillLevel: number,
        potionType: string,
        signFrontRawTextEnabled: boolean,
        signFrontRawText: string,
        signBackRawTextEnabled: boolean,
        signBackRawText: string,
        signFrontTextEnabled: boolean,
        signFrontText: string,
        signBackTextEnabled: boolean,
        signBackText: string,
        signFrontTextColorEnabled: boolean,
        signFrontTextColor: string,
        signBackTextColorEnabled: boolean,
        signBackTextColor: string,
        setSignIsWaxed: boolean
    ];
    let blockPropertyValue2: any
    blockPropertyValue2 = ""
    let blockPropertyValueArray: Array<any>
    blockPropertyValueArray = String(blockPropertyValue).split(", ")
    let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length
    if(block2.getComponent("fluidContainer") != undefined){
        if((c=>`${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluidContainer").fluidColor)!=fluidContainerColor.split(",").map(v=>v.trim()).join()){
            block2.getComponent("fluidContainer").fluidColor={red: fluidContainerColor.split(",")[0].toNumber(), green: fluidContainerColor.split(",")[1].toNumber(), blue: fluidContainerColor.split(",")[2].toNumber(), alpha: fluidContainerColor.split(",")[3].toNumber()};
        };
        if(fluidContainerFillLevel!=block2.getComponent("fluidContainer").fillLevel){
            block2.getComponent("fluidContainer").fillLevel = fluidContainerFillLevel;
        };
        if(potionType!=""){
            block2.getComponent("fluidContainer").setPotion(new ItemStack(potionType, 255));
        };
    };
    if(signFrontRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front); }
    if(signBackRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back); }
    if(signFrontTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front); }
    if(signBackTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back); }
    if(block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed)); }
    DyeColor.Blue//make it save this DyeColor in the imports from @minecraft/server. 
    if(signFrontTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back); }
    if(signBackTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front); }
    for (let index in blockPropertyValueArray) {
    if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
        blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1))
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index])
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index])
    } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
            blockPropertyValueArray[index] = String(blockPropertyValueArray[index])
        }}}} }; /*
    if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
        blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
    } else {
    if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
        blockPropertyValue2 = Number(blockPropertyValue)
    } else {
    if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
        blockPropertyValue2 = Boolean(blockPropertyValue)
    } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
            blockPropertyValue2 = String(blockPropertyValue)
        }}}}*/
    if (setTypeEnabled == true) { try { block2.setType(BlockTypes.get(String(setType))/*String(setType)*/) } catch(e){console.error(e, e.stack)} }; /*
    try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
    if (setPropertyEnabled == true) { switch(blockPropertyValueLength) {
        case 1:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] })/*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/ ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 2:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 3:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 4:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 5:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 6:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 7:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 8:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 9:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 10:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        default:
        break;/*
        break;*/
    } }; 
    try { block2.setWaterlogged(Boolean(isWaterlogged)) } catch ( e ) { console.error(e, e.stack) }/*
    GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
      
        test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
      
      })
        .maxTicks(400)
        .structureName("gametests:mediumglass");*//*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
/*BlockType.arguments({id: "minecraft:grass"})*/
  // Do something
}).catch(e => {
  console.error(e, e.stack);
});}
export function editorStickMenuB(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData();
    let playerList = world.getPlayers()
    form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id))
    form.textField("Block X", "Block X", String(sourceEntity.location.x))
    form.textField("Block Y", "Block Y", String(sourceEntity.location.y))
    form.textField("Block Z", "Block Z", String(sourceEntity.location.z))
    form.submitButton("Edit")

form.show(sourceEntity as any).then(r => {
    if (r.canceled) return;

    let [ blockDimension, blockX, blockY, blockZ ] = r.formValues;/*
    let blockPropertyValue2: any
    sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:"*//*"aslk"*//* + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ)*/
    editorStickB(sourceEntity, {dimension: world.getDimension(String(blockDimension)), x: Number(blockX), y: Number(blockY), z: Number(blockZ)})
}).catch(e => {
  console.error(e, e.stack);
});}
export function editorStickMenuC(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya as Player
    let form = new ModalFormData();
    let playerList = world.getPlayers()
    form.toggle("includeLiquidBlocks", true)
    form.toggle("includePassableBlocks", true)
    form.textField("maxDistance ( Optional )", "maxDistance ( Optional )")

forceShow(form, sourceEntity).then(r => {
    if (r.canceled) return;

    let [ includeLiquidBlocks, includePassableBlocks, maxDistance ] = r.formValues;
    editorStickC(sourceEntitya, includeLiquidBlocks as boolean, includePassableBlocks as boolean, maxDistance==""?undefined:Number(maxDistance))
}).catch(e => {
  console.error(e, e.stack);
});
}
export function editorStickB(sourceEntitya: Entity|executeCommandPlayerW|Player, dimensionLocation: DimensionLocation = {x: sourceEntitya.location.x, y: sourceEntitya.location.y, z: sourceEntitya.location.z, dimension: sourceEntitya.dimension}){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData();
    let playerList = world.getPlayers()/*
    let block = sourceEntity.getBlockFromViewDirection({includeLiquidBlocks: true, includePassableBlocks: true})*/
    let block2: Block/* = block.block*/
    block2 = dimensionLocation.dimension.getBlock(dimensionLocation)
    form.title("Editor Stick B");
    form.submitButton("Save")
    let blockStatesFullList: any/*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates()); } catch(e){if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";} else  {blockStatesFullList = "§r§cThis block has no block states. §f";}}/*
    for (const index in block.block.permutation.getAllStates()) {*//*
        console.warn(index);*//*
        if (Number(index) != 0) {*//*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*//*
        }*//*
        console.warn(targetList);*//*
    }*/
    try { form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + mcMath.Vector3Utils.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nsetType", "Block Type", block2.typeId) } catch(e){console.error(e, e.stack); form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");}/*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", false)
    try {form.textField("List Of Block Properties: " + blockStatesFullList/*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state") } catch(e){console.error(e, e.type/*e.stack*/); console.warn("test: " + String(e).slice(67)/*e.stack*/); form.textField("Block Property Identifier", "bool_state, num_state, str_state");}
    form.textField("Block Property Value", "true, 1, \"North\"")
    form.toggle("setProperty Enabled", false)/*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*//*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", block2.isWaterlogged)/*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", false)
    try{
        if(block2.getComponent("fluidContainer") != undefined){
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluidContainer").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluidContainer").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluidContainer").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluidContainer").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, `${block2.getComponent("fluidContainer").fluidColor.red}, ${block2.getComponent("fluidContainer").fluidColor.green}, ${block2.getComponent("fluidContainer").fluidColor.blue}, ${block2.getComponent("fluidContainer").fluidColor.alpha}`)
            form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluidContainer").fillLevel}`, 0, 6, 1, block2.getComponent("fluidContainer").fillLevel)
            form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluidContainer").getFluidType()=="Potion"}`, `item type`)
        }else{
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
        }
    }catch{
        form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
        form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
        form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
    }
    form.toggle("setSignFrontRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)))}else{form.textField(`§4Sign Front RawText`, `§r§4Unavailable`)}
    form.toggle("setSignBackRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)))}else{form.textField(`§4Sign Back RawText`, `§r§4Unavailable`)}
    form.toggle("setSignFrontText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front))}else{form.textField(`§4Sign Front Text`, `§r§4Unavailable`)}
    form.toggle("setSignBackText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back))}else{form.textField(`§4Sign Back Text`, `§r§4Unavailable`)}
    form.toggle("setSignFrontTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front))}else{form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignBackTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back))}else{form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed)

forceShow(form, sourceEntity as Player).then(r => {
    if (r.canceled) return;

    let [
        setType,
        setTypeEnabled,
        blockPropertyIdentifier,
        blockPropertyValue,
        setPropertyEnabled/*,
        selectedSlotIndex*/,
        isWaterlogged/*,
        clearVelocity*/,
        debug,
        fluidContainerColor,
        fluidContainerFillLevel,
        potionType,
        signFrontRawTextEnabled,
        signFrontRawText,
        signBackRawTextEnabled,
        signBackRawText,
        signFrontTextEnabled,
        signFrontText,
        signBackTextEnabled,
        signBackText,
        signFrontTextColorEnabled,
        signFrontTextColor,
        signBackTextColorEnabled,
        signBackTextColor,
        setSignIsWaxed
    ] = (r as ModalFormResponse).formValues as [
        setType: string,
        setTypeEnabled: boolean,
        blockPropertyIdentifier: string,
        blockPropertyValue: string,
        setPropertyEnabled: boolean/*,
        selectedSlotIndex: string*/,
        isWaterlogged: boolean/*,
        clearVelocity: boolean*/,
        debug: boolean,
        fluidContainerColor: string,
        fluidContainerFillLevel: number,
        potionType: string,
        signFrontRawTextEnabled: boolean,
        signFrontRawText: string,
        signBackRawTextEnabled: boolean,
        signBackRawText: string,
        signFrontTextEnabled: boolean,
        signFrontText: string,
        signBackTextEnabled: boolean,
        signBackText: string,
        signFrontTextColorEnabled: boolean,
        signFrontTextColor: string,
        signBackTextColorEnabled: boolean,
        signBackTextColor: string,
        setSignIsWaxed: boolean
    ];
    let blockPropertyValue2: any
    blockPropertyValue2 = ""
    let blockPropertyValueArray: Array<any>
    blockPropertyValueArray = String(blockPropertyValue).split(", ")
    let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length
    if(block2.getComponent("fluidContainer") != undefined){
        if((c=>`${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluidContainer").fluidColor)!=fluidContainerColor.split(",").map(v=>v.trim()).join()){
            block2.getComponent("fluidContainer").fluidColor={red: fluidContainerColor.split(",")[0].toNumber(), green: fluidContainerColor.split(",")[1].toNumber(), blue: fluidContainerColor.split(",")[2].toNumber(), alpha: fluidContainerColor.split(",")[3].toNumber()};
        };
        if(fluidContainerFillLevel!=block2.getComponent("fluidContainer").fillLevel){
            block2.getComponent("fluidContainer").fillLevel = fluidContainerFillLevel;
        };
        if(potionType!=""){
            block2.getComponent("fluidContainer").setPotion(new ItemStack(potionType, 255));
        };
    };
    if(signFrontRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front); }
    if(signBackRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back); }
    if(signFrontTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front); }
    if(signBackTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back); }
    if(block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed)); }
    DyeColor.Blue//make it save this DyeColor in the imports from @minecraft/server. 
    if(signFrontTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back); }
    if(signBackTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front); }
    for (let index in blockPropertyValueArray) {
    if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
        blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1))
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index])
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index])
    } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
            blockPropertyValueArray[index] = String(blockPropertyValueArray[index])
        }}}} }; 
    if (setTypeEnabled == true) { try { block2.setType(BlockTypes.get(String(setType))/*String(setType)*/) } catch(e){console.error(e, e.stack)} }; 
    if (setPropertyEnabled == true) { switch(blockPropertyValueLength) {
        case 1:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] })/*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/ ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 2:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 3:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 4:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 5:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 6:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 7:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 8:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 9:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 10:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        default:
        break;/*
        break;*/
    } }; 
    try { block2.setWaterlogged(Boolean(isWaterlogged)) } catch ( e ) { console.error(e, e.stack) }/*
    GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
      
        test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
      
      })
        .maxTicks(400)
        .structureName("gametests:mediumglass");*//*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
/*BlockType.arguments({id: "minecraft:grass"})*/
  // Do something
}).catch(e => {
  console.error(e, e.stack);
});}
export function editorStickC(sourceEntitya: Entity|executeCommandPlayerW|Player, includeLiquidBlocks=false, includePassableBlocks=false, maxDistance=undefined){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya as Player
    let form = new ModalFormData();/*
    console.warn(maxDistance)*/
    let block = sourceEntitya.dimension.getBlockFromRay(sourceEntitya.location, sourceEntitya.getViewDirection(), {includeLiquidBlocks: includeLiquidBlocks, includePassableBlocks: includePassableBlocks, maxDistance: maxDistance})
    let block2 = block.block
    form.title("Editor Stick C");
    let blockStatesFullList: any/*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates()); } catch(e){if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";} else  {blockStatesFullList = "§r§cThis block has no block states. §f";}}/*
    for (const index in block.block.permutation.getAllStates()) {*//*
        console.warn(index);*//*
        if (Number(index) != 0) {*//*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*//*
        }*//*
        console.warn(targetList);*//*
    }*/
    try { form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + mcMath.Vector3Utils.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId) } catch(e){console.error(e, e.stack); form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");}/*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", false)
    try {form.textField("List Of Block Properties: " + blockStatesFullList/*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state") } catch(e){console.error(e, e.type/*e.stack*/); console.warn("test: " + String(e).slice(67)/*e.stack*/); form.textField("Block Property Identifier", "bool_state, num_state, str_state");}
    form.textField("Block Property Value", "true, 1, \"North\"")
    form.toggle("setProperty Enabled", false)/*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*//*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", block2.isWaterlogged)/*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", false)
    form.toggle("setWaterContainerProperties Enabled", false)
    try{
        if(block2.getComponent("fluidContainer") != undefined){
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluidContainer").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluidContainer").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluidContainer").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluidContainer").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, `${block2.getComponent("fluidContainer").fluidColor.red}, ${block2.getComponent("fluidContainer").fluidColor.green}, ${block2.getComponent("fluidContainer").fluidColor.blue}, ${block2.getComponent("fluidContainer").fluidColor.alpha}`)
            form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluidContainer").fillLevel}`, 0, 6, 1, block2.getComponent("fluidContainer").fillLevel)
            form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluidContainer").getFluidType()=="Potion"}`, `item type`)
        }else{
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
        }
    }catch{
        form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`)
        form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, 0, 0)
        form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`)
    }
    form.toggle("setSignFrontRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)))}else{form.textField(`§4Sign Front RawText`, `§r§4Unavailable`)}
    form.toggle("setSignBackRawText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)))}else{form.textField(`§4Sign Back RawText`, `§r§4Unavailable`)}
    form.toggle("setSignFrontText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front))}else{form.textField(`§4Sign Front Text`, `§r§4Unavailable`)}
    form.toggle("setSignBackText Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back))}else{form.textField(`§4Sign Back Text`, `§r§4Unavailable`)}
    form.toggle("setSignFrontTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front))}else{form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignBackTextColor Enabled", false)
    if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back))}else{form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`)}
    form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed)

forceShow(form, sourceEntity).then(r => {
    if (r.canceled) return;

    let [
        setType,
        setTypeEnabled,
        blockPropertyIdentifier,
        blockPropertyValue,
        setPropertyEnabled/*,
        selectedSlotIndex*/,
        isWaterlogged/*,
        clearVelocity*/,
        debug,
        fluidContainerColor,
        fluidContainerFillLevel,
        potionType,
        signFrontRawTextEnabled,
        signFrontRawText,
        signBackRawTextEnabled,
        signBackRawText,
        signFrontTextEnabled,
        signFrontText,
        signBackTextEnabled,
        signBackText,
        signFrontTextColorEnabled,
        signFrontTextColor,
        signBackTextColorEnabled,
        signBackTextColor,
        setSignIsWaxed
    ] = (r as ModalFormResponse).formValues as [
        setType: string,
        setTypeEnabled: boolean,
        blockPropertyIdentifier: string,
        blockPropertyValue: string,
        setPropertyEnabled: boolean/*,
        selectedSlotIndex: string*/,
        isWaterlogged: boolean/*,
        clearVelocity: boolean*/,
        debug: boolean,
        fluidContainerColor: string,
        fluidContainerFillLevel: number,
        potionType: string,
        signFrontRawTextEnabled: boolean,
        signFrontRawText: string,
        signBackRawTextEnabled: boolean,
        signBackRawText: string,
        signFrontTextEnabled: boolean,
        signFrontText: string,
        signBackTextEnabled: boolean,
        signBackText: string,
        signFrontTextColorEnabled: boolean,
        signFrontTextColor: string,
        signBackTextColorEnabled: boolean,
        signBackTextColor: string,
        setSignIsWaxed: boolean
    ];
    let blockPropertyValue2: any
    blockPropertyValue2 = ""
    let blockPropertyValueArray: Array<any>
    blockPropertyValueArray = String(blockPropertyValue).split(", ")
    let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length
    if(block2.getComponent("fluidContainer") != undefined){
        if((c=>`${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluidContainer").fluidColor)!=fluidContainerColor.split(",").map(v=>v.trim()).join()){
            block2.getComponent("fluidContainer").fluidColor={red: fluidContainerColor.split(",")[0].toNumber(), green: fluidContainerColor.split(",")[1].toNumber(), blue: fluidContainerColor.split(",")[2].toNumber(), alpha: fluidContainerColor.split(",")[3].toNumber()};
        };
        if(fluidContainerFillLevel!=block2.getComponent("fluidContainer").fillLevel){
            block2.getComponent("fluidContainer").fillLevel = fluidContainerFillLevel;
        };
        if(potionType!=""){
            block2.getComponent("fluidContainer").setPotion(new ItemStack(potionType, 255));
        };
    };
    if(signFrontRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front); }
    if(signBackRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back); }
    if(signFrontTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front); }
    if(signBackTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back); }
    if(block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed)); }
    DyeColor.Blue//make it save this DyeColor in the imports from @minecraft/server. 
    if(signFrontTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back); }
    if(signBackTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front); }
    for (let index in blockPropertyValueArray) {/*
        console.warn(blockPropertyValueArray)*//*
        console.warn(blockPropertyValueArray[index])*/
    if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
        console.warn("string")
        blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1))/*
        console.warn(blockPropertyValueArray[index])*/
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index])
    } else {
    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index])
    } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
            blockPropertyValueArray[index] = String(blockPropertyValueArray[index])/*
            console.warn("other")*/
        }}}} }; /*
    if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
        blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
    } else {
    if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
        blockPropertyValue2 = Number(blockPropertyValue)
    } else {
    if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
        blockPropertyValue2 = Boolean(blockPropertyValue)
    } else {
        if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
            blockPropertyValue2 = String(blockPropertyValue)
        }}}}*/
    if (setTypeEnabled == true) { try { block2.setType(BlockTypes.get(String(setType))/*String(setType)*/) } catch(e){console.error(e, e.stack)} }; /*
    try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
    if (setPropertyEnabled == true) { switch(blockPropertyValueLength) {
        case 1:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] })/*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/ ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 2:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 3:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 4:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 5:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 6:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 7:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 8:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 9:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        case 10:
            try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }) ) } catch ( e ) { console.error(e, e.stack) }
        break;
        default:
        break;/*
        break;*/
    } }; 
    try { block2.setWaterlogged(Boolean(isWaterlogged)) } catch ( e ) { console.error(e, e.stack) }/*
    GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
      
        test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
      
      })
        .maxTicks(400)
        .structureName("gametests:mediumglass");*//*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
/*BlockType.arguments({id: "minecraft:grass"})*/
  // Do something
}).catch(e => {
  console.error(e, e.stack);
});
}/*
export function evalAutoScriptSettings(sourceEntity: Entity|Player){}*/
export async function managePlayers(sourceEntitya: Entity|executeCommandPlayerW|Player, pagen: number=0, maxplayersperpage: number = config.ui.pages.maxPlayersPerManagePlayersPage??10, search?: {value: string, caseSensitive?: boolean, searchLastOnlineDates?: boolean, searchLastOnlineTimes?: boolean, searchNames?: boolean, searchIds?: boolean}): Promise<0|1>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData; 
    const page = Math.max(0, pagen)
    const savedPlayers = savedPlayer.getSavedPlayers().filter((p) =>
        !!search
            ? search.caseSensitive==true 
                ? `${(search.searchNames??true)?p.name+"\n":""}${(search.searchIds??true)?p.id+"\n":""}${
                        p.isOnline
                            ? ""
                            : ((search.searchLastOnlineDates??false)||(search.searchLastOnlineTimes??false))
                            ? new Date(p.lastOnline).toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates&&search.searchLastOnlineTimes?"toTimezoneDateTime":search.searchLastOnlineDates?"toTimezoneDate":search.searchLastOnlineTimes?"toTimezoneTime":"toTimezoneDateTime"]()
                            : ""
                }`.includes(search.value)
                : `${(search.searchNames??true)?p.name+"\n":""}${(search.searchIds??true)?p.id+"\n":""}${
                        p.isOnline
                            ? ""
                            : ((search.searchLastOnlineDates??false)||(search.searchLastOnlineTimes??false))
                            ? new Date(p.lastOnline).toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates&&search.searchLastOnlineTimes?"toTimezoneDateTime":search.searchLastOnlineDates?"toTimezoneDate":search.searchLastOnlineTimes?"toTimezoneTime":"toTimezoneDateTime"]()
                            : ""
                }`.toLowerCase().includes(search.value.toLowerCase())
            : true
    )
    const numsavedplayers = savedPlayers.length
    const numonlinesavedplayers = savedPlayers.filter(_=>_.isOnline).length
    const numofflinesavedplayers = savedPlayers.filter(_=>!_.isOnline).length
    form.title(`${!!search?"Search Results":"Manage Players"} ${Math.min(numsavedplayers, (page*maxplayersperpage)+1)}-${Math.min(numsavedplayers, (page+1)*maxplayersperpage)} of ${numsavedplayers}`); 
    const numpages = Math.ceil(numsavedplayers/maxplayersperpage)
    if(!!search){
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive??false)}`)
    }
    form.button("Search", "textures/ui/spyglass_flat"); 
    form.button(((page!=0)?"§0":"§8")+"Previous Page", "textures/ui/arrow_left"); 
    form.button(((page<(numpages-1))?"§0":"§8")+"Next Page", "textures/ui/arrow_right"); 
    let displayPlayers = [
        ...savedPlayer
            .getSavedPlayersAlphabeticalOrder()
            .filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort(
                (a: savedPlayer, b: savedPlayer) => b.lastOnline - a.lastOnline
            ),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort(
                (a: savedPlayer, b: savedPlayer) => b.lastOnline - a.lastOnline
            ),
    ]
        .filter((p) =>
            !!search
                ? search.caseSensitive==true 
                    ? `${(search.searchNames??true)?p.name+"\n":""}${(search.searchIds??true)?p.id+"\n":""}${
                        p.isOnline
                            ? ""
                            : ((search.searchLastOnlineDates??false)||(search.searchLastOnlineTimes??false))
                            ? new Date(p.lastOnline).toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates&&search.searchLastOnlineTimes?"toTimezoneDateTime":search.searchLastOnlineDates?"toTimezoneDate":search.searchLastOnlineTimes?"toTimezoneTime":"toTimezoneDateTime"]()
                            : ""
                    }`.includes(search.value)
                    : `${(search.searchNames??true)?p.name+"\n":""}${(search.searchIds??true)?p.id+"\n":""}${
                        p.isOnline
                            ? ""
                            : ((search.searchLastOnlineDates??false)||(search.searchLastOnlineTimes??false))
                            ? new Date(p.lastOnline).toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates&&search.searchLastOnlineTimes?"toTimezoneDateTime":search.searchLastOnlineDates?"toTimezoneDate":search.searchLastOnlineTimes?"toTimezoneTime":"toTimezoneDateTime"]()
                            : ""
                    }`.toLowerCase().includes(search.value.toLowerCase())
                : true
        )
        .slice(page * maxplayersperpage, (page + 1) * maxplayersperpage); 
    displayPlayers.forEach((p)=>{form.button(`${p.name}\n${ban.testForBannedPlayer(p)?"Banned":p.isOnline?"Online":new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline?"textures/ui/online":p.isBanned?"textures/ui/Ping_Offline_Red_Dark":"textures/ui/offline")}); 
    const numplayersonpage = displayPlayers.length
    let players = displayPlayers; 
    form.button("Manage Bans"); 
    form.button("Back", "textures/ui/arrow_left"); 
    form.button("Close", "textures/ui/crossout"); 
    return await forceShow(form, sourceEntity as Player).then(async ra=>{
        let r = (ra as ActionFormResponse); 
        if(r.canceled){return 1}; 
        switch(r.selection){
            case 0: {
                const rb = await tryget(async ()=>await new ModalFormData().title("Search").textField("", "Search", search?.value??"").toggle("Case Sensitive", search?.caseSensitive??false).toggle("Search Player Names", search?.searchNames??true).toggle("Search Player IDs", search?.searchIds??true).toggle("Search Last Online Dates", search?.searchLastOnlineDates??false).toggle("Search Last Online Times", search?.searchLastOnlineTimes??false).submitButton("Search").forceShow(sourceEntity as Player))
                if(!!!rb||rb?.canceled==true){
                    return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                };
                return await managePlayers(sourceEntity, undefined, maxplayersperpage, {value: rb.formValues[0] as string, caseSensitive: rb.formValues[1] as boolean, searchNames: rb.formValues[2] as boolean, searchIds: rb.formValues[3] as boolean, searchLastOnlineDates: rb.formValues[4] as boolean, searchLastOnlineTimes: rb.formValues[5] as boolean});/*
                return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
                    if(r.selection==0){
                        return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                    }else{
                        return 0;
                    }
                })*/
            }
            break;
            case 1:
                return await managePlayers(sourceEntity, Math.max(0, page-1))
            break;
            case 2: 
                return await managePlayers(sourceEntity, Math.min(numpages-1, page+1))
            break; 
            case numplayersonpage+3: 
                let form6 = new ActionFormData; 
                form6.title("Manage Bans"); 
                ban.getValidBans().idBans.forEach((p)=>{form6.button(`${p.playerId}\nValid`, "textures/ui/online")}); 
                ban.getExpiredBans().idBans.forEach((p)=>{form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
                ban.getValidBans().nameBans.forEach((p)=>{form6.button(`${p.playerName}\nValid`, "textures/ui/online")}); 
                ban.getExpiredBans().nameBans.forEach((p)=>{form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
                let banList = ban.getValidBans().idBans.concat(ban.getExpiredBans().idBans).concat(ban.getValidBans().nameBans).concat(ban.getExpiredBans().nameBans)
                form6.button("Add ID Ban"); 
                form6.button("Add Name Ban"); 
                form6.button("Back"); 
                return await forceShow(form6, sourceEntity as Player).then(async ga=>{let g = (ga as ActionFormResponse); 
                    if(g.canceled){return 1}; 
                    switch(g.selection){
                        case banList.length: 
                        let form5 = new ModalFormData; form5.title(`Add ID Ban`); form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer"); form5.textField("Ban Time (In Minutes)", "Decimal"); form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
                        form5.submitButton("Ban")
                        return await forceShow(form5, sourceEntity as Player).then(async ha=>{let h = (ha as ModalFormResponse); 
                            if(h.canceled){return};
                            ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), playerId: String(h.formValues[0]), originalPlayerName: undefined, type: "id", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "banId:"+Date.now()+":"+String(h.formValues[0]), unbanDate: Number(h.formValues[1])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[2])})
                            return await managePlayers(sourceEntity, page, maxplayersperpage, search)
                        }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
                        break
                        case banList.length+1: 
                        let form6 = new ModalFormData; form6.title(`Add Name Ban`); form6.textField("Player Name\nThis is the name of the player. ", "String"); form6.textField("Ban Time (In Minutes)", "Decimal"); form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
                        form6.submitButton("Ban")
                        return await forceShow(form6, sourceEntity as Player).then(async ha=>{let h = (ha as ModalFormResponse); 
                            if(h.canceled){return};
                            ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), originalPlayerId: undefined, playerName: String(h.formValues[0]), type: "name", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "ban:"+Date.now()+":"+String(h.formValues[0]), unbanDate: Number(h.formValues[1])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[2])})
                            return await managePlayers(sourceEntity, page, maxplayersperpage, search)
                        }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
                        break
                        case banList.length+2: 
                        return await managePlayers(sourceEntity, page, maxplayersperpage, search)
                        break/*
                        case banList.length+3: 
                        managePlayers(sourceEntity, page, maxplayersperpage, search)
                        break
                        case banList.length+4: 
                        managePlayers(sourceEntity, page, maxplayersperpage, search)*/
                        break
                        default: 
                        let form4 = new ActionFormData; form4.title(`Manage Ban`); let ba = banList[g.selection]; let timeRemaining = ba.timeRemaining; form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate)+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleString()+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)<0?" GMT":" GMT+")+Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate)+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleString()+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)<0?" GMT":" GMT+")+Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)}\n§r§b${ba.type=="id"?"playerId":"originalPlayerId"}: §6${ba.type=="id"?ba.playerId:ba.originalPlayerId}\n§r§b${ba.type=="id"?"originalPlayerName":"playerName"}: §6${ba.type=="id"?ba.originalPlayerName:ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${/*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/""}`); form4.button("Unban"); form4.button("Back")
                        return await forceShow(form4, sourceEntity as Player).then(ha=>{let h = (ha as ActionFormResponse); 
                            if(h.canceled){return};
                            if(h.selection==0){banList[g.selection].remove(); managePlayers(sourceEntity, page, maxplayersperpage, search)};
                            if(h.selection==1){managePlayers(sourceEntity, page, maxplayersperpage, search)};
                        }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
                    }; 
                }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
                return 1;
            break; 
            case numplayersonpage+4: 
            return 1;
            break; 
            case numplayersonpage+5: 
            return 0;
            break; 
            default: 
            if((await managePlayers_managePlayer(sourceEntity, players[r.selection-3]))==1){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        }
    }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }) as 0|1; 
}
/**
 * 
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity 
 * @param player 
 * @returns 
 */
export async function managePlayers_managePlayer(sourceEntity: Entity, player: savedPlayer): Promise<0|1>{
    let form2 = new ActionFormData;
    form2.title(player.name);
    form2.body(`UUID: ${player.id}\n${player.isOnline?"Online":"Last Online: "+new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player)?"ID BANNED":ban.testForIdBannedPlayer(player)?"NAME BANNED":""}`);
    form2.button("Clear Data");
    form2.button("Show Data");
    form2.button("Check Inventory");
    if(semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")){form2.button("Copy Inventory To Chest");}
    form2.button("Manage Bans");
    form2.button("Edit Money");
    form2.button("§4Manage Permissions§f(§cCOMING SOON!§f)");
    form2.button("§4Manage Hotbar Presets§f(§cCOMING SOON!§f)");
    form2.button("§4Manage Private Warps§f(§cCOMING SOON!§f)");
    form2.button("Manage Homes");
    form2.button("Back", "textures/ui/arrow_left"); 
    form2.button("Close", "textures/ui/crossout"); 
    return await forceShow(form2, sourceEntity as Player).then(async ga=>{let g = (ga as ActionFormResponse); 
        if(g.canceled){return 1}; 
        switch(g.selection){
            case 0: 
                let form3 = new MessageFormData; form3.title("Confirm Player Data Clear"); form3.body(`Are you sure you want to clear all of ${player.name}'s saved player data?\nThis action cannot be undone.`); form3.button2("Clear All Data"); form3.button1("Cancel")
                return await forceShow(form3, sourceEntity as Player).then(ha=>{let h = (ha as MessageFormResponse); 
                    if(h.canceled||h.selection==0){
                        return 1;
                    };
                    if(h.selection==1){
                        player.remove();
                        return 1;
                    };
                }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
            break
            case 1: 
                let form4 = new ActionFormData; form4.title(`${player.name}'s Saved Player Data`); form4.body(`${/*arrayModifier(*/JSON.stringify(player).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")/*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`); form4.button("Done")
                return await forceShow(form4, sourceEntity as Player).then(()=>1).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
            break
            case 2: 
            let slotsArray = []; 
            let text = ""; 
            if(semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")){
                const items = player.getItems(sourceEntity);
                Object.entries(items).forEachB((item) => {
                    if (!!item[1]) {
                        slotsArray = slotsArray.concat(
                            String(
                                "slot: " +
                                    item[0] +
                                    "§r§f, item: " +
                                    item[1].typeId +
                                    "§r§f, amount: " +
                                    item[1].amount +
                                    "§r§f, nameTag: " +
                                    item[1].nameTag +
                                    "§r§f, lore: " +
                                    JSONStringify(item[1].getLore() ?? [], true) +
                                    "§r§f, enchantments: " +
                                    JSONStringify(tryget(()=>item[1].getComponent("enchantable").getEnchantments()) ?? "N/A", true)
                            )
                        );
                    } else {
                        slotsArray = slotsArray.concat(
                            "slot: " + item[0] + ", item: minecraft:air"
                        );
                    }
                });
            }else{
                let items = player.items.inventory.concat(
                    player.items.equipment
                );
                items.forEach((item) => {
                    if (item.count != 0) {
                        slotsArray = slotsArray.concat(
                            String(
                                "slot: " +
                                    item.slot +
                                    ", item: " +
                                    item.id +
                                    "§r§f, amount: " +
                                    item.count +
                                    ", nameTag: " +
                                    item.name +
                                    "§r§f, lore: " +
                                    JSONStringify(item.lore ?? [], true) +
                                    "§r§f, enchantments: " +
                                    JSON.stringify(item.enchants ?? "N/A")
                            )
                        );
                    } else {
                        slotsArray = slotsArray.concat(
                            "slot: " + item.slot + ", item: minecraft:air"
                        );
                    }
                });
            }
            text = String(
                "(format_version: " +
                    player.format_version +
                    ") " +
                    player.name +
                    (world
                        .getAllPlayers()
                        .find((p) => p.id == player.id) != undefined
                        ? " (Online)"
                        : " (last seen: " +
                            new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone) +
                            ")"
                    ) +
                    " Items: \n" +
                    slotsArray.join("§r§f\n")
            );
            let form5 = new ActionFormData; form5.title(`${player.name}'s Saved Inventory Data`); form5.body(`${text}`); form5.button("Done")
            return await forceShow(form5, sourceEntity as Player).then(ha=>{
                return 1;
            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
            break
            case semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")?3:-3: {
                const items = player.getItems(sourceEntity);
                const block2 = sourceEntity.dimension.getBlock(sourceEntity.location);
                const block = sourceEntity.dimension.getBlock(Vector.add(sourceEntity.location, Vector.up));
                if(!!!block.getComponent("inventory")){
                    block.setType("barrel");
                };
                if(!!!block2.getComponent("inventory")){
                    block2.setType("barrel");
                };
                const bc = block.getComponent("inventory").container;
                const bc2 = block2.getComponent("inventory").container;
                for(let i = 0; i<27; i++){
                    bc.setItem(i, items[i]);
                };
                for(let i = 27; i<36; i++){
                    bc2.setItem(i-27, items[i]);
                };
                for(let i = 0; i<6; i++){
                    bc2.setItem(i+9, items[cmdutils.EquipmentSlots[i]]);
                };
                bc2.setItem(15, items.Cursor);
                return await managePlayers_managePlayer(sourceEntity, player);
            }
            break
            case +semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")+3: 
                if((await managePlayers_managePlayer_manageBans(sourceEntity, player))==1){
                    return await managePlayers_managePlayer(sourceEntity, player);
                }else{
                    return 0;
                };
            break
            case +semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")+4: {
                try{
                    return await new ModalFormData().textField("Money", "int", MoneySystem.get(player.id).money.toString()).forceShow(sourceEntity as Player).then(async r=>{
                        if(!!r.formValues[0].toBigInt()){
                            MoneySystem.get(player.id).setMoney(r.formValues[0].toBigInt())
                        }else{
                            await showMessage(sourceEntity as Player, "Invalid Input", "The value you have inputted is not a valid amount of money.", "Okay", "Cancel")
                        }
                        return 1;
                    })
                }catch(e){
                    console.error(e, e?.stack)
                    return 1;
                }
            }
            break
            case +semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")+8:
                if((await managePlayers_managePlayer_manageHomes(sourceEntity, player))==1){
                    return await managePlayers_managePlayer(sourceEntity, player);
                }else{
                    return 0;
                };
            return 1;
            break
            case +semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")+9: 
            return 1;
            break
            case +semver.satisfies(player.player_save_format_version??"0.0.0", ">=1.5.0")+11: 
            return 0;
            break
            default: 
            return 1;
        }; 
    }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }) as 0|1; 
}
export async function managePlayers_managePlayer_manageBans(sourceEntity: Entity, player: savedPlayer): Promise<0|1>{
    let form6 = new ActionFormData; 
    form6.title(player.name); 
    player.idBans.valid.forEach((p)=>{form6.button(`${p.playerId}\nValid`, "textures/ui/online")}); 
    player.idBans.expired.forEach((p)=>{form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
    player.nameBans.valid.forEach((p)=>{form6.button(`${p.playerName}\nValid`, "textures/ui/online")}); 
    player.nameBans.expired.forEach((p)=>{form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red")}); 
    let banList = player.idBans.valid.concat(player.idBans.expired).concat(player.nameBans.valid).concat(player.nameBans.expired)
    form6.body(`UUID: ${player.id}\n${player.isOnline?"Online":"Last Online: "+new Date(Number(player.lastOnline)+(Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0)*3600000)).toLocaleString()}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player)?"\n\nID BANNED":ban.testForIdBannedPlayer(player)?"\n\nNAME BANNED":""}`)
    form6.button("Add ID Ban"); 
    form6.button("Add Name Ban"); 
    form6.button("Back", "textures/ui/arrow_left"); 
    form6.button("Close", "textures/ui/crossout"); 
    return await forceShow(form6, sourceEntity as Player).then(async ga=>{let g = (ga as ActionFormResponse); 
        if(g.canceled){return 1;}; 
        switch(g.selection){
            case banList.length: 
            let form5 = new ModalFormData; form5.title(`Add ID Ban`); form5.textField("Ban Time (In Minutes)", "Decimal"); form5.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
            form5.submitButton("Ban")
            return await forceShow(form5, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                if(h.canceled){return 1;};
                ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), playerId: player.id, originalPlayerName: player.name, type: "id", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "banId:"+Date.now()+":"+player.id, unbanDate: Number(h.formValues[0])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[1])})
                return 1;
            }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
            break
            case banList.length+1: 
            let form6 = new ModalFormData; form6.title(`Add Name Ban`); form6.textField("Ban Time (In Minutes)", "Decimal"); form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"")
            form6.submitButton("Ban")
            return await forceShow(form6, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                if(h.canceled){return 1;};
                ban.saveBan({removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), originalPlayerId: player.id, playerName: player.name, type: "name", bannedById: sourceEntity.id, bannedByName: (sourceEntity as Player)?.name??sourceEntity?.nameTag, banId: "ban:"+Date.now()+":"+player.name, unbanDate: Number(h.formValues[0])*60000+Date.now(), format_version: format_version, reason: String(h.formValues[1])})
                return 1;
            }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
            break
            case banList.length+2: 
                return 1;
            break
            case banList.length+3: 
                return 0;
            break/*
            case banList.length+3: 
            managePlayers(sourceEntity)
            break
            case banList.length+4: 
            managePlayers(sourceEntity)*/
            break
            default: 
            let form4 = new ActionFormData; form4.title(`Manage Bans`); let ba = banList[g.selection]; let timeRemaining = ba.timeRemaining; form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(ba.banDate).formatDateTime(sourceEntity.timeZone)+(sourceEntity.timeZone<0?" GMT":" GMT+")+sourceEntity.timeZone}\n§r§bunbanDate: §q${new Date(ba.unbanDate).formatDateTime(sourceEntity.timeZone)+(sourceEntity.timeZone<0?" GMT":" GMT+")+sourceEntity.timeZone}\n§r§b${ba.type=="id"?"playerId":"originalPlayerId"}: §6${ba.type=="id"?ba.playerId:ba.originalPlayerId}\n§r§b${ba.type=="id"?"originalPlayerName":"playerName"}: §6${ba.type=="id"?ba.originalPlayerName:ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${/*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/""}`); form4.button("Unban"); form4.button("Back")
            return await forceShow(form4, sourceEntity as Player).then(ha=>{let h = (ha as ActionFormResponse); 
                if(h.canceled){return 1;};
                if(h.selection==0){banList[g.selection].remove(); return 1;};
                if(h.selection==1){return 1;};
            }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
        }; 
    }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }) as 0|1; 
}
export async function managePlayers_managePlayer_manageHomes(sourceEntity: Entity, player: savedPlayer): Promise<0|1>{
    let form6 = new ActionFormData; 
    form6.title(player.name);
    const homes = cmds.HomeSystem.getHomesForPlayer(player.id);
    homes.forEach(h=>form6.button(`${h.name}\n${main.dimensionTypeDisplayFormattingE[dimensionse[dimensions.indexOf(h.location.dimension)]]}§r ${cmds.vTStr(Vector.floor(h.location))}`));
    form6.button("Back", "textures/ui/arrow_left"); 
    form6.button("Close", "textures/ui/crossout"); 
    return await forceShow(form6, sourceEntity as Player).then(async ga=>{let g = (ga as ActionFormResponse); 
        if(g.canceled){return 1;}; 
        switch(g.selection){
            case homes.length: 
                return 1;
            break
            case homes.length+1: 
                return 0;
            break
            default: 
                return await new ActionFormData()
                    .body(`Home Name: ${homes[g.selection].name}\nLocation: ${main.dimensionTypeDisplayFormattingE[dimensionse[dimensions.indexOf(homes[g.selection].location.dimension)]]}§r ${cmds.vTStr(homes[g.selection].location)}\nFormat Version: ${homes[g.selection].format_version}\nHome Format Version: ${homes[g.selection].home_format_version}`)
                    .button("Teleport")
                    .button("§cEdit")
                    .button("Delete")
                    .button("Back", "textures/ui/arrow_left")
                    .button("Close", "textures/ui/crossout")
                    .forceShow(sourceEntity as Player).then(async h=>{
                        if(h.canceled){return 1;};
                        if(h.selection==0){
                            sourceEntity.teleport(homes[g.selection].location, {dimension: homes[g.selection].location.dimension})
                            return 1;
                        };
                        if(h.selection==1){
                            new ModalFormData().textField;
                            return 1;
                        };
                        if(h.selection==2){
                            if((await showMessage(sourceEntity as Player, "Are You Sure?", "Are you sure you want to delete this home!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection==1){
                                homes[g.selection].remove()
                            }
                            return 1;
                        };
                        if(h.selection==3){
                            return 1;
                        };
                        if(h.selection==4){
                            return 0;
                        };
                    }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }); 
        }; 
    }).catch(async (e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); formError.button2("Close"); return await forceShow(formError, sourceEntity as Player).then(r=>{return +(r.selection==0)}); }) as 0|1; 
}
export function getAllBuiltInCommandsCategories(){let set = new Set() as Set<string>; commands.map(v=>v.category).forEach(v=>typeof v == "string"?set.add(v):v.forEach(v=>set.add(v))); return [...set]}
export const commandCategories = ["items","misc","invsee","players","containers/inventories","entities","warps","world","server","system","uis","worldedit","shop_system","dangerous","Entity Scale Add-On","built-in","custom","all"]
export const commandCategoriesDisplay = [{name: "Items", icon: ""},{name: "Misc"},{name: "Invsee"},{name: "Players"},{name: "Containers/Inventories"},{name: "Entities"},{name: "Warps"},{name: "World"},{name: "Server"},{name: "System"},{name: "UIs"},{name: "World Edit"},{name: "Shop System"},{name: "§4Dangerous"},{name: "§6Entity Scale Add-On"},{name: "All Built-In"},{name: "Custom"},{name: "All"}]
export function manageCommands(sourceEntitya: Entity|executeCommandPlayerW|Player){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData; 
    form.title("Manage Commands"); 
    let defaultCommands = command.getDefaultCommands(); 
    //defaultCommands.forEach((p)=>{form.button(`${p.formatting_code+p.commandName}\n${p.type+": "+(p.settings.enabled?"enabled":"disabled")+"; "+p.command_version}`/*, "textures/ui/online"*/)}); 
    let customCommands = command.getCustomCommands(); 
    //customCommands.forEach((p)=>{form.button(`${p.formatting_code+p.commandName}\n${p.type+": "+(p.settings.enabled?"enabled":"disabled")+"; "+p.command_version}`/*, "textures/ui/online"*/)}); 
    let commandsList = defaultCommands.concat(customCommands); 
    //form.button("Add Custom Command"); 
    commandCategoriesDisplay.forEach((p)=>{form.button(p.name, p.icon)}); 
    form.button("Back"); 
    forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ActionFormResponse); 
        if(r.canceled){return}; 
        switch(r.selection){
            case commandCategories.length: 
                mainMenu(sourceEntity)
            break; 
            default: 
                let category = commandCategories[r.selection]; 
                let categoryDisplay = commandCategories[r.selection]; 
                let commandsListB = category=="all"?commandsList:category=="built-in"?defaultCommands:category=="custom"?customCommands:command.getDefaultCommandsOfCategory(category); 
                let formB = new ActionFormData; 
                form.title(`Manage ${categoryDisplay}§r Commands`); 
                commandsListB.forEach((p)=>{formB.button(`${p.formatting_code+p.commandName}\n${p.type+": "+(p.settings.enabled?"enabled":"disabled")+"; "+p.command_version}`/*, "textures/ui/online"*/)}); 
                if(category=="custom"||category=="all"){
                    formB.button("Add Custom Command"); 
                }
                formB.button("Back"); 
                forceShow(formB, sourceEntity as Player).then(ra=>{
                    let r = (ra as ActionFormResponse); 
                    if(r.canceled){manageCommands(sourceEntity); return}; 
                    switch(r.selection){
                        case commandsListB.length+(+(category!="custom"&&category!="all")): 
                            let form5 = new ModalFormData; form5.title(`Add Custom Command`); form5.textField("Command Name§c*", "mycommand"); form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", ["commands", "javascript"]); form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", "1.0.0"); form5.textField("Formatting Code§c*", "required: string", "§r§f"); form5.textField("Description", "string"); form5.textField("Formats", "JSON", "[\"myCommand\", \"myCommand <string: string> [integer: int]\"]"); form5.textField("Command Prefix (leave blank to use default)", "default"); form5.toggle("Enable Automatic Parameter Evaluation", true)
                            form5.submitButton("Create Command")
                            forceShow(form5, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                                if(h.canceled){manageCommands(sourceEntity); return};
                                if(!!!h.formValues[0]){let formErrora = new MessageFormData; formErrora.body(`Required parameter 'Command Name' was left blank`); formErrora.title("Error"); formErrora.button1("Back"); formErrora.button2("Cancel"); forceShow(formErrora, sourceEntity as Player).then(()=>{manageCommands(sourceEntity); return}); return}
                                if(!!command.getCustomCommands().find(v=>v.commandName==String(h.formValues[0]))){let formError = new MessageFormData; formError.body(`There is already a custom command with the name '${String(h.formValues[0]).replaceAll("'", "\\'")}`); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return}); manageCommands(sourceEntity); return}; 
                                new command({commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[2]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])] as "commands" | "javascript", description: String(h.formValues[4]), type: "custom", formatting_code: String(h.formValues[3]), formats: JSONParse(h.formValues[5]==""?"undefined":String(h.formValues[5]??"undefined")), customCommandPrefix: String(h.formValues[6]), customCommandParametersEnabled: Boolean(h.formValues[7]), customCommandId: "customCommand:"+String(h.formValues[0]), format_version: format_version}).save()
                                manageCommands(sourceEntity)
                            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                        break
                        case commandsListB.length+1-+(category!="custom"&&category!="all"): 
                            manageCommands(sourceEntity)
                        break; 
                        default: 
                            let commandsItem = commandsListB[r.selection]; 
                            let form2 = new ActionFormData; 
                            form2.title(commandsItem.commandName); 
                            form2.body(`Command Name: ${commandsItem.commandName}\nType: ${commandsItem.type}\nCommand Version: ${commandsItem.command_version}\nCustom Command Id: ${commandsItem.customCommandId}\nCommand Settings Id: ${commandsItem.commandSettingsId}\nCategor${typeof commandsItem.category == "string"?"y":"ies"}: ${JSONStringify(commandsItem.category)}\n\nDescription: ${commandsItem.description}\nFormats: ${JSONStringify(commandsItem.formats)}`)
                            if(commandsItem.type=="custom"){form2.button("Delete Command")}; 
                            if(commandsItem.type=="custom"){form2.button("Edit Command")}; 
                            if(commandsItem.type=="custom"){form2.button("Edit Code")}; 
                            form2.button("Show Info"); 
                            form2.button("Settings"); 
                            form2.button("Back"); 
                            forceShow(form2, sourceEntity as Player).then(ga=>{let g = (ga as ActionFormResponse); 
                                if(g.canceled){manageCommands(sourceEntity); return}; 
                                switch(g.selection+(Number(commandsItem.type!="custom")*3)){
                                    case 0: 
                                    let form3 = new MessageFormData; form3.title("Confirm Deletion of Command"); form3.body(`Are you sure you want to delete the custom ${commandsItem.commandName} command?\nThis action cannot be undone.`); form3.button2("Delete Command"); form3.button1("Cancel")
                                    forceShow(form3, sourceEntity as Player).then(ha=>{let h = (ha as MessageFormResponse); 
                                        if(h.canceled){return};
                                        if(h.selection==0){manageCommands(sourceEntity)};
                                        if(h.selection==1){commandsItem.remove(); manageCommands(sourceEntity)};
                                    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                                    break
                                    case 1: 
                                    let form5 = new ModalFormData; form5.title(`Edit Custom Command`); form5.textField("Command Name§c*", "mycommand", commandsItem.commandName); form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", ["commands", "javascript"], ["commands", "javascript"].findIndex(v=>v==commandsItem.customCommandType)); form5.slider("Number of Code Lines", 1, 100, 1, Number(commandsItem.customCommandCodeLines??1)); form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", String(commandsItem.command_version)); form5.textField("Formatting Code§c*", "required: string", commandsItem.formatting_code); form5.textField("Description", "string", commandsItem.description); form5.textField("Formats", "JSON", JSONStringify(commandsItem.formats)); form5.textField("Command Prefix (leave blank to use default)", "default", commandsItem.customCommandPrefix); form5.toggle("Enable Automatic Parameter Evaluation", commandsItem.customCommandParametersEnabled); form5.textField("Parameters for Automatic Parameter Evaluation (requires enable automatic parameter evaluation to be enabled)\nThis is a list of strings stating the parameter types, valid values are \"presetText\", \"number\", \"boolean\", \"string\", and\"json\". \npresetText matches a string of text with no quotation marks or spaces in it\nnumber matches a number, boolean matches a boolean\nstring matches either a string of text with no quotation marks or spaces, or a string of text inside of quotation marks that may include spaces and also escape characters\njson matches a JSON array, object, or string\nthis list should always start with presetText to match the command name\nfor example: if you have the command 'say hi \"test stuff\" 9768 true 8 {\"some\": \"thing\", \"a\": [1, 2, 3, 4, 5]} [1, 2, 3, 4, \"5\"]' and you set this value to [\"presetText\", \"presetText\", \"string\", \"number\", \"boolean\", \"string\", \"json\", \"json\"] then it would return [\"say\", \"hi\", \"test stuff\", 9768, true, \"8\", {\"some\": \"thing\", \"a\": [1, 2, 3, 4, 5]}, [1, 2, 3, 4, \"5\"]]", "JSON", JSONStringify(commandsItem.customCommandParametersList??["presetText"]))
                                    form5.submitButton("Save")
                                    forceShow(form5, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                                        if(h.canceled){return};
                                        if(!!!h.formValues[0]){let formErrora = new MessageFormData; formErrora.body(`Required parameter 'Command Name' was left blank`); formErrora.title("Error"); formErrora.button1("Back"); forceShow(formErrora, sourceEntity as Player).then(()=>{manageCommands(sourceEntity); return}); return}
                                        if((!!command.getCustomCommands().find(v=>v.commandName==String(h.formValues[0])))&&(String(h.formValues[0])!=commandsItem.commandName)){
                                            let formError = new MessageFormData; formError.body(`There is already a custom command with the name '${String(h.formValues[0]).replaceAll("'", "\\'")}, saving this will overwrite it, are you sure you want to do this?\nThis action cannot be undone.`); formError.title("Error"); formError.button2("Confirm"); formError.button1("Cancel"); 
                                            forceShow(formError, sourceEntity as Player).then(sa=>{console.warn((sa as MessageFormResponse).selection)
                                                if((sa as MessageFormResponse).selection == 0){
                                                    manageCommands(sourceEntity); 
                                                    return
                                                }else{
                                                    if(String(h.formValues[0])!=commandsItem.commandName){
                                                        JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9]))
                                                        JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined"))
                                                        commandsItem.remove(); 
                                                        commandsItem.settings.remove(); 
                                                        new commandSettings("customCommandSettings:"+String(h.formValues[0])).save(commandsItem.settings.toJSON()); 
                                                        commandsItem = new command({commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])] as "commands" | "javascript", customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:"+String(h.formValues[0]), commandSettingsId: "customCommandSettings:"+String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9])), format_version: format_version}); 
                                                        commandsItem.save(); 
                                                    };
                                                }
                                            }); 
                                            manageCommands(sourceEntity); 
                                        }else{
                                            if(String(h.formValues[0])!=commandsItem.commandName){
                                                JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9]))
                                                JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined"))
                                                commandsItem.remove(); 
                                                commandsItem.settings.remove(); 
                                                new commandSettings("customCommandSettings:"+String(h.formValues[0])).save(commandsItem.settings.toJSON()); 
                                                commandsItem = new command({commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])] as "commands" | "javascript", customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:"+String(h.formValues[0]), commandSettingsId: "customCommandSettings:"+String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9])), format_version: format_version}); 
                                                commandsItem.save(); 
                                            }else{
                                            JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9]))
                                            JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined"))
                                            new command({commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])] as "commands" | "javascript", customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6]==""?"undefined":String(h.formValues[6]??"undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:"+String(h.formValues[0]), commandSettingsId: "customCommandSettings:"+String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9]==""?"[]":String(h.formValues[9])), format_version: format_version}).save()}
                                            manageCommands(sourceEntity)
                                        }
                                    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                                    break
                                    case 2: 
                                    let form7 = new ModalFormData; form7.title(`Editing Code for ${commandsItem.commandName}`); if(commandsItem.customCommandCodeLines==1||commandsItem.customCommandCodeLines==0||!!!commandsItem.customCommandCodeLines){form7.textField("Line "+0+"\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}.", commandsItem.customCommandType=="commands"?"Minecraft Command":"JavaScript Code", commandsItem.code[0])}else{for(let i = 0; i<commandsItem.customCommandCodeLines; i++){form7.textField("Line "+i+(i==0?"\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}.":""), commandsItem.customCommandType=="commands"?"Minecraft Command":"JavaScript Code", commandsItem.code[i])}}
                                    form7.submitButton("Save")
                                    forceShow(form7, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                                        if(h.canceled){manageCommands(sourceEntity); return};
                                        h.formValues.forEach((v, i)=>{world.setDynamicProperty("customCommandCode:"+commandsItem.commandName+":"+i, v)})
                                        world.getDynamicPropertyIds().filter(v=>((v.startsWith("customCommandCode:"+commandsItem.commandName+":"))&&(Number(v.slice(("customCommandCode:"+commandsItem.commandName+":").length))>=commandsItem.customCommandCodeLines))).forEach(v=>world.setDynamicProperty(v))
                                        manageCommands(sourceEntity)
                                    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                                    break
                                    case 3: 
                                    let form4 = new ActionFormData; form4.title(`${commandsItem.commandName} Command Info`); form4.body(`§r§f${/*arrayModifier(*/JSON.stringify(commandsItem).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")/*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`); form4.button("Done")
                                    forceShow(form4, sourceEntity as Player).then(ha=>{let h = (ha as ActionFormResponse); 
                                        if(h.canceled){manageCommands(sourceEntity); return};
                                        manageCommands(sourceEntity)
                                    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                                    break
                                    case 4: 
                                    let form6 = new ModalFormData; form6.title(`Command Settings for ${commandsItem.type} ${commandsItem.commandName}`); form6.textField("Required Tags", "JSON", JSONStringify(commandsItem.settings.requiredTags??["canUseChatCommands"])); form6.slider("Required Permission Level", 0, 15, 1, Number(commandsItem.settings.requiredPermissionLevel??0)); form6.toggle("Requires OP", commandsItem.settings.requiresOp); form6.toggle("Enabled", commandsItem.settings.enabled)
                                    form6.submitButton("Save")
                                    forceShow(form6, sourceEntity as Player).then(ha=>{let h = (ha as ModalFormResponse); 
                                        if(h.canceled){manageCommands(sourceEntity); return};
                                        commandsItem.settings.save({requiredTags: h.formValues[0]==""?(commandsItem.type=="built-in"?tryget(()=>commandsItem.settings.defaultSettings.requiredTags)??[]:[]):JSONParse(String(h.formValues[0])), requiredPermissionLevel: Number(h.formValues[1]), requiresOp: Boolean(h.formValues[2]), enabled: Boolean(h.formValues[3]), settings_version: command_settings_format_version, format_version: format_version})
                                        manageCommands(sourceEntity)
                                    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                                    break
                                    case 5: 
                                    manageCommands(sourceEntity)
                                    break
                                    default: 
                                }; 
                            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
                    }
                }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
        }
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
//1320
//2013
export async function onlinePlayerSelector(sourceEntitya: Entity|executeCommandPlayerW|Player, backFunction: Function = mainMenu, ...functionargs: any): Promise<Player|undefined>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData; 
    form.title("Select Player"); 
    let playerslist = world.getAllPlayers(); 
    playerslist.forEach((p)=>{form.button(`${p.name}\n${p.id}`/*, "textures/ui/online"*/)}); 
    form.button("Back"); 
    return await forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ActionFormResponse); 
        if(r.canceled){return}; 
        switch(r.selection){
            case playerslist.length: 
            return tryget(()=>backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)]))))
            break
            default: 
            return playerslist[r.selection]
        }
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export async function itemSelector<FuncType extends (...args: any) => FuncReturnType, FuncReturnType extends any>(sourceEntitya: Entity|executeCommandPlayerW|Player, targetPlayer: Entity|Player, backFunction?: FuncType, ...functionargs: any): Promise<{
    slot: number | EquipmentSlot;
    item: ContainerSlot;
}>{
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData; 
    form.title("Select Item"); 
    let itemsList = [] as {slot: number|EquipmentSlot, item: ContainerSlot}[]; 
    for(let i = 0; i<targetPlayer.getComponent("inventory").inventorySize; i++){itemsList.push({slot: i, item: targetPlayer.getComponent("inventory").container.getSlot(i)})}; 
    let equipmentList = [] as {slot: number|EquipmentSlot, item: ContainerSlot}[]; 
    for(let i = 0; i<6; i++){equipmentList.push({slot: [EquipmentSlot.Mainhand, EquipmentSlot.Offhand, EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet][i], item: targetPlayer.getComponent("equippable").getEquipmentSlot([EquipmentSlot.Mainhand, EquipmentSlot.Offhand, EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet][i])})}; 
    let slotsList = equipmentList.concat(itemsList); 
    slotsList.forEach((p)=>{if(p.item.hasItem()){form.button(`${p?.slot}: ${p?.item?.typeId}\n${p?.item?.amount}; ${p?.item?.nameTag}`/*, "textures/ui/online"*/)}else{form.button(`${p?.slot}: empty\n0; `/*, "textures/ui/online"*/)}}); 
    form.button("Back"); 
    let r = await forceShow(form, sourceEntity as Player)
    try{
        if(r.canceled){return undefined}; 
        switch(r.selection){
            case slotsList.length: 
            return backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)]))) as any
            break
            default: 
            return slotsList[r.selection]
        }
    }catch(e){
        let formError = new MessageFormData;
        formError.body(e+e.stack);
        formError.title("Error");
        formError.button1("Done");
        await forceShow(formError, sourceEntity as Player)
        return e;
    }; 
}
export async function itemEditorTypeSelection(sourceEntitya: Entity|executeCommandPlayerW|Player, targetPlayer: Entity|Player, item: {slot: number|EquipmentSlot, item: ContainerSlot}, selectionItems?: {edit?: {f: Function, a?: any[]}, editCode?: {f: Function, a?: any[]}, editDynamicProperties?: {f: Function, a?: any[]}, editEnchantments?: {f: Function, a?: any[]}, newItem?: {f: Function, a?: any[]}, transfer?: {f: Function, a?: any[]}, clone?: {f: Function, a?: any[]}, delete?: {f: Function, a?: any[]}}, backFunction: Function = mainMenu, ...functionargs: any){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ActionFormData; 
    form.title("§eItem Editor §f[§cAlpha§f]"); 
    form.button((!item.item.hasItem()?"§c":"")+"Edit Item"/*, "textures/ui/online"*/); 
    form.button((!item.item.hasItem()||item.item?.isStackable?"§c":"")+"Edit Code"+(item.item?.isStackable?"\n(Item Must Be Non-Stackable)":"")/*, "textures/ui/online"*/); 
    form.button((!item.item.hasItem()||item.item?.isStackable?"§c":"§e")+"Edit Dynamic Properties"+(item.item?.isStackable?"\n(Item Must Be Non-Stackable)":"")/*, "textures/ui/online"*/);
    form.button((!item.item.hasItem()?"§c":"§c")+"Edit Enchantments"/*, "textures/ui/online"*/);
    form.button("New Item"/*, "textures/ui/online"*/); 
    form.button((!item.item.hasItem()?"§c":"§c")+"Transfer Item"/*, "textures/ui/online"*/); 
    form.button((!item.item.hasItem()?"§c":"§c")+"Clone Item"/*, "textures/ui/online"*/); 
    form.button((!item.item.hasItem()?"§c":"§c")+"Delete Item"/*, "textures/ui/online"*/); 
//    form.button("Ban Item"/*, "textures/ui/online"*/); 
    form.button("Back"); 
    let result: any; 
    result = undefined
    return forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ActionFormResponse); 
        if(r.canceled){return}; 
        switch(r.selection){
            case 0: 
            if(item.item?.hasItem()){result = !!selectionItems?.edit?.f?selectionItems?.edit?.f(...selectionItems?.edit?.a??[(sourceEntity as Player), (sourceEntity as Player)]):itemEditor(sourceEntity, targetPlayer, item.item)}else{backFunction(...functionargs??(sourceEntity as Player))}
            break; 
            case 1: 
            if(item.item?.hasItem()&&(!item.item?.isStackable)){result = !!selectionItems?.editCode?.f?selectionItems?.editCode?.f(...selectionItems?.editCode?.a??[(sourceEntity as Player), (sourceEntity as Player)]):itemCodePropertyEditor(sourceEntity, item.item)}else{backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)])))}
            break; 
            case 2: 
            if(item.item?.hasItem()&&(!item.item?.isStackable)){result = !!selectionItems?.editDynamicProperties?.f?selectionItems?.editDynamicProperties?.f(...selectionItems?.editDynamicProperties?.a??[(sourceEntity as Player), (sourceEntity as Player)]):itemDynamicPropertyEditor(sourceEntity, item.item)}else{backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)])))}
            break; 
            case 4: 
            result = !!selectionItems?.editCode?.f?selectionItems?.editCode?.f(...selectionItems?.editCode?.a??[(sourceEntity as Player), (sourceEntity as Player)]):newItemInSlot(sourceEntity, item.item)
            break; 
            case 5: 
            result = backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)])))
            break; 
            default: 
            result = backFunction(...(functionargs.length==0?[(sourceEntity as Player)]:(functionargs??[(sourceEntity as Player)])))
        }
        return result
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export async function itemEditor(sourceEntitya: Entity|executeCommandPlayerW|Player, targetPlayer: Entity|Player, item: ContainerSlot){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData; 
    form.title("Edit Item"); 
    form.textField("Item Name (escape characters such as \\n are allowed)", "string", !!!item.nameTag?undefined:item.nameTag); 
    form.textField("Item Lore (escape characters such as \\n are allowed)(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getLore())); 
    form.slider("Amount", 0, 255, 1, item.amount); 
    form.textField("Can Destroy (escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getCanDestroy())); 
    form.textField("Can Place On (escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getCanPlaceOn())); 
    form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory].indexOf(item.lockMode)); 
    form.toggle("Keep On Death", item.keepOnDeath); 
    form.textField((!!!item.getItem().getComponent("cooldown")?"§c(UNAVAILABLE)§f ":"")+"Set Cooldown (In Ticks)", "ticks"); 
    form.textField((!!!item.getItem().getComponent("durability")?"§c(UNAVAILABLE)§f ":"")+"Set Damage", "int", String(item.getItem().getComponent("durability")?.damage)); 
    form.submitButton("Done")
    let result: any; 
    result = undefined
    return forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ModalFormResponse); 
        if(r.canceled){return}; 
        let [name, lore, count, canDestroy, canPlaceOn, lockMode, keepOnDeath, cooldown, durability] = r.formValues
        try{if(String(name)!=item.nameTag){item.nameTag=String(name)}}catch(e){console.error(e, e.stack)}
        try{if(JSONParse((String(lore)==""?"[]":String(lore)))!=item.getLore()){item.setLore(JSONParse(String(lore)))}}catch(e){console.error(e, e.stack)}
        try{if(Number(count)!=item.amount){item.amount=Number(count)}}catch(e){console.error(e, e.stack)}
        try{if(JSONParse((String(canDestroy)==""?"[]":String(canDestroy)))!=item.getCanDestroy()){item.setCanDestroy(JSONParse(String(canDestroy)))}}catch(e){console.error(e, e.stack)}
        try{if(JSONParse((String(canPlaceOn)==""?"[]":String(canPlaceOn)))!=item.getCanPlaceOn()){item.setCanPlaceOn(JSONParse(String(canPlaceOn)))}}catch(e){console.error(e, e.stack)}
        try{if([ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)]!=item.lockMode){item.lockMode=[ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)]}}catch(e){console.error(e, e.stack)}
        try{if(Boolean(keepOnDeath)!=item.keepOnDeath){item.keepOnDeath=Boolean(keepOnDeath)}}catch(e){console.error(e, e.stack)}
        if(!!item.getItem().getComponent("cooldown")){try{if(String(cooldown)!=""){(targetPlayer as Player).startItemCooldown(item.getItem().getComponent("cooldown").cooldownCategory, Number(cooldown))}}catch(e){console.error(e, e.stack)}}
        if(!!item.getItem().getComponent("durability")){try{if(Number(durability)!=item.getItem().getComponent("durability").damage){const a = item.getItem(); a.getComponent("durability").damage=Number(durability); item.setItem(a)}}catch(e){console.error(e, e.stack)}}
        return result
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export function itemDynamicPropertyEditor(sourceEntitya: Entity|executeCommandPlayerW|Player, item: ContainerSlot){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let formb = new ActionFormData; 
    formb.title("Item Dynamic Property Editor"); 
    formb.button("Add Property")
    formb.button("§cEdit Property")
    formb.button("§cRemove Property")
    formb.button("Back")
    forceShow(formb, sourceEntity as Player).then(ba=>{
        let b = (ba as ActionFormResponse); 
        if(b.canceled){return}; 
        let form = new ModalFormData; 
        form.title("Item Dynamic Property Editor"); 
        let properties = item.getDynamicPropertyIds()
        switch(b.selection){
            case 0: 
            form.textField("Property Name", "string"); 
            form.textField("Property Value", "string|number|boolean|vector3json"); 
            form.dropdown("Property Type", ["String", "Number", "Boolean", "Vector3"]); 
            form.submitButton("Add Property")
            forceShow(form, sourceEntity as Player).then(ra=>{
                let r = (ra as ModalFormResponse); 
                if(r.canceled){return}; 
                let [name, value, type] = r.formValues
                try{item.setDynamicProperty(String(name), Number(type)==0?String(value):Number(type)==1?Number(value):Number(type)==2?Boolean(value):JSONParse(String(value)))}catch(e){console.error(e, e.stack)}
            }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
        }
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export function itemCodePropertyEditor(sourceEntitya: Entity|executeCommandPlayerW|Player, item: ContainerSlot){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData; 
    form.title("Code Editor"); 
    form.textField("Item Use Code", "JavaScript", String(item.getDynamicProperty("code"))); 
    form.textField("Item Use On Code", "JavaScript", !!item.getDynamicProperty("itemUseOnCode")?String(item.getDynamicProperty("itemUseOnCode")):undefined); 
    form.submitButton("Done")
    forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ModalFormResponse); 
        if(r.canceled){return}; 
        let [code, itemUseOnCode] = r.formValues
        try{if(String(code)!=String(item.getDynamicProperty("code"))){item.setDynamicProperty("code", String(code))}}catch(e){console.error(e, e.stack)}
        try{if(itemUseOnCode==""?undefined:String(itemUseOnCode)!=String(item.getDynamicProperty("itemUseOnCode"))){item.setDynamicProperty("itemUseOnCode", itemUseOnCode==""?undefined:String(itemUseOnCode))}}catch(e){console.error(e, e.stack)}
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export function newItemInSlot(sourceEntitya: Entity|executeCommandPlayerW|Player, item: ContainerSlot){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData; 
    form.title("New Item"); 
    form.textField("Item Type", "Item Id", "minecraft:grass_block"); 
    form.textField("Count", "int", "1"); 
    form.submitButton("Create Item")
    forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ModalFormResponse); 
        if(r.canceled){return}; 
        let [type, count] = r.formValues
        try{item.setItem(new ItemStack(String(type), Number(count)))}catch(e){console.error(e, e.stack)}
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
export function createExplosion(sourceEntitya: Entity|executeCommandPlayerW|Player, parameterDefaults?: {x?: number, y?: number; z?: number, dimension?: Dimension, radius?: number, explosionOptions?: ExplosionOptions, source?: string}){
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya
    let form = new ModalFormData; 
    form.title("Create Explosion"); 
    form.textField("x", "number", String(parameterDefaults?.x??sourceEntity.location.x)); 
    form.textField("y", "number", String(parameterDefaults?.y??sourceEntity.location.y)); 
    form.textField("z", "number", String(parameterDefaults?.z??sourceEntity.location.z)); 
    form.textField("dimension", "dimensionId", String(parameterDefaults?.dimension?.id??sourceEntity.dimension.id)); 
    form.textField("radius", "number", String(parameterDefaults?.radius??1)); 
    form.textField("source", "targetSelector", parameterDefaults?.source); 
    form.toggle("allowUnderwater", parameterDefaults?.explosionOptions?.allowUnderwater??false); 
    form.toggle("breaksBlocks", parameterDefaults?.explosionOptions?.breaksBlocks??true); 
    form.toggle("causesFire", parameterDefaults?.explosionOptions?.causesFire??false); 
    form.submitButton("Create")
    forceShow(form, sourceEntity as Player).then(ra=>{
        let r = (ra as ModalFormResponse); 
        if(r.canceled){return}; 
        let [x, y, z, dimension, radius, source, allowUnderwater, breaksBlocks, causesFire] = r.formValues
        try{world.getDimension(String(dimension)).createExplosion({x: Number(x), y: Number(y), z: Number(z)}, Number(radius), {allowUnderwater: Boolean(allowUnderwater), breaksBlocks: Boolean(breaksBlocks), causesFire: Boolean(causesFire), source: source==""?undefined:targetSelectorAllListC(String(source), "", `${sourceEntity.location.x} ${sourceEntity.location.y} ${sourceEntity.location.z}`, sourceEntity)[0]})}catch(e){console.error(e, e.stack)}
    }).catch((e)=>{let formError = new MessageFormData; formError.body(e+e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity as Player).then(()=>{return e}); }); 
}
