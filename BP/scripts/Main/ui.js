import { Player, system, world, Entity, Block, BlockPermutation, BlockTypes, DyeColor, ItemStack, SignSide, Vector, Dimension, BlockInventoryComponent, EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, ItemDurabilityComponent, ItemEnchantableComponent, ItemLockMode, ContainerSlot } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData, ModalFormResponse, ActionFormResponse, MessageFormResponse, FormCancelationReason } from "@minecraft/server-ui";
import { JSONParse, JSONStringify, arrayModifier, format_version, getUICustomForm, targetSelectorAllListC } from "Main";
import { editAreas, editAreasMainMenu } from "./spawn_protection";
import { savedPlayer } from "./player_save";
import { ban, ban_format_version } from "./ban";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "Main";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
import { command, commandSettings, command_settings_format_version, commands, commands_format_version } from "Main/commands";
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
export const ui_format_version = "1.7.0";
//${se}console.warn(JSON.stringify(evaluateParameters(["presetText", "string", "json", "number", "boolean", "string", "presetText", "presetText"], "test test [{\"test\": \"test\"}, [\"test\", \"test\"] , \"test\", \"test\"] 1 true \"test \\\"test\" test test"))); 
/**
 * Returns the sum of a and b
 * @param {ModalFormData|ActionFormData|MessageFormData} form
 * @param {Player} player
 * @param {number} timeout If set to true, the function will return an array
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse|undefined} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
export async function forceShow(form, player, timeout) {
    const timeoutTicks = system.currentTick + (timeout ?? 9999);
    while (system.currentTick <= timeoutTicks) {
        const r = await form.show(player);
        if (r.cancelationReason != "UserBusy" || r.canceled == false) {
            return r;
        }
    }
}
export const customFormDataTypes = [ModalFormData, ActionFormData, MessageFormData];
export const customFormDataTypeIds = ["ModalFormData", "ActionFormData", "MessageFormData"];
export const customElementTypes = [ModalFormData.prototype.title, ModalFormData.prototype.textField, ModalFormData.prototype.dropdown, ModalFormData.prototype.toggle, ModalFormData.prototype.slider, ActionFormData.prototype.body, ActionFormData.prototype.button, MessageFormData.prototype.button1, MessageFormData.prototype.button2];
export const customElementTypeIds = ["title", "textField", "dropdown", "toggle", "slider", "body", "button", "button1", "button2"];
export function editCustomFormUI(UIId) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let variableList = "formType, formTitle";
    let form12 = new ModalFormData();
    let form1234 = new ModalFormData();
    let indexList;
    indexList = [];
    let indexListB;
    indexListB = [];
    form12.dropdown("Form Type", customFormDataTypeIds, Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0]));
    form12.textField("Form Title (JavaScript Code)", "\"My Form\" or {rawtext: [{text: \"hi\"}]}", String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|"));
    customUI.optionElements.forEach((element, index) => {
        form12.dropdown("§lElement " + Number(element.index) + "§r§f\nElement Type", customElementTypeIds, element.typeIndex);
        form12.textField("Element Argument 1", "JavaScript Code", element.args[0]?.toString());
        form12.textField("Element Argument 2", "JavaScript Code", element.args[1]?.toString());
        form12.textField("Element Argument 3", "JavaScript Code", element.args[2]?.toString());
        form12.textField("Element Argument 4", "JavaScript Code", element.args[3]?.toString());
        form12.textField("Element Argument 5", "JavaScript Code", element.args[4]?.toString());
        form12.toggle("Remove Element " + element.index);
        indexList.push(element.index);
        variableList = variableList + ", elementType" + index + ", elementArgumentA" + index + ", elementArgumentB" + index + ", elementArgumentC" + index + ", elementArgumentD" + index + ", elementArgumentE" + index + ", removeElement" + index;
    });
    customUI.codeValues.forEach((element, index) => {
        if (index == 0) {
            form1234.textField("The response variable is \"r\", if ActionFormData or MessageFormData was chosen then r.selection can be used to see which button was chosen, and if ModalFormData was chosen then r.formValues can be used to get an array containing the values of the form. \nCode Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);
        }
        else {
            form1234.textField("Code Line " + Number(customUI.codeIds[index].split("|")[1]), "JavaScript Code", element);
        }
        form1234.toggle("Remove Code Line " + Number(customUI.codeIds[index].split("|")[1]));
        indexListB.push(Number(customUI.codeIds[index].split("|")[1]));
    });
    form1234.toggle("New Code Line");
    form1234.textField("New Code Line Index", "Number", String(((indexListB[indexListB.length - 1] ?? 0) + 1)));
    form12.toggle("New Element");
    form12.textField("New Element Index", "Number", String(((indexList[indexList.length - 1] ?? 0) + 1)));
    return { form: form12, variableList: variableList, indexList: indexList, formB: form1234, indexListB: indexListB };
}
export function showCustomFormUI(UIId, player) {
    let customUI = getUICustomForm("customUIElement:" + UIId, "customUICode:" + UIId);
    let form12345678 = new customFormDataTypes[Number(String(world.getDynamicProperty("customUI:" + UIId)).split("|")[0])]();
    eval(`form12345678.title(${String(world.getDynamicProperty("customUI:" + UIId)).split("|").slice(1).join("|")})`);
    customUI.optionElements.forEach((v, i) => { try {
        eval("form12345678." + v.code.replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")").replaceAll(", )", ")"));
    }
    catch (e) {
        console.error(e, e.stack);
    } }); /*
    form12.title({rawtext: [{text: "hi"}]})*/
    let rb;
    forceShow(form12345678, player).then((r) => { try {
        rb = r;
        eval(customUI.code);
    }
    catch (e) {
        console.error(e, e.stack);
    } });
    return { form: form12345678, customUI: customUI, optionElements: customUI.optionElements, formResponse: rb };
}
export function customFormUIEditor(UIId, player, goBackToMenu = false) {
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9);
    let form = editCustomFormUI(formId);
    forceShow(form.form, player).then(to => {
        let t = to;
        if (t.canceled)
            return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`);
        let elementValues = t.formValues.slice(2, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 7) {
                case 0:
                    world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i + 1, i + 6).join("|")}`);
                    break;
                case 6:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 7)]}`);
                    }
                    ;
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length - 1]) ?? ((form.indexList[form.indexList.length - 1] ?? -1) + 1))}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
;
export function customFormUIEditorCode(UIId, player, goBackToMenu = false) {
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = UIId.slice(9);
    let form = editCustomFormUI(formId);
    forceShow(form.formB, player).then(to => {
        let t = to;
        if (t.canceled)
            return;
        let elementValues = t.formValues.slice(0, -2);
        console.warn(elementValues);
        elementValues.forEach((v, i) => {
            switch (i % 2) {
                case 0:
                    world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`, `${String(elementValues[i])}`);
                    break;
                case 1:
                    if (Boolean(v) == true) {
                        world.setDynamicProperty(`customUICode:${formId}|${form.indexListB[Math.floor(i / 2)]}`);
                    }
                    ;
                    break;
            }
        });
        if (t.formValues[t.formValues.length - 2]) {
            world.setDynamicProperty(`customUICode:${formId}|${(Number(t.formValues[t.formValues.length - 1]) ?? ((form.indexListB[form.indexListB.length - 1] ?? -1) + 1))}`, "");
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
;
export function addNewCustomFormUI(player, goBackToMenu = false) {
    let form12345 = new ModalFormData();
    form12345.textField("Name", "myForm");
    forceShow(form12345, player).then((t) => {
        if (t.canceled)
            return;
        let ta = t;
        try {
            world.setDynamicProperty(`customUI:${String(ta.formValues[0]).replaceAll("|", "\\vls")}`, "0|\"My Form\"");
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ;
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    });
}
;
export function customFormListSelectionMenu(player) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUI:")));
    let b;
    b = [];
    let form1234 = new ActionFormData();
    a.forEach((aelement, i) => { b[i] = String(world.getDynamicProperty(aelement)); form1234.button(aelement.slice(9), String(world.getDynamicProperty(`customUIIcon:${aelement.slice(9)}`) ?? "textures/ui/book_edit_default")); });
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
    forceShow(form1234, player).then((t) => {
        let ta = t;
        if (ta.canceled && ta.cancelationReason == FormCancelationReason.UserClosed) {
            return;
        }
        ;
        switch (true) {
            case (ta.selection == a.length):
                addNewCustomFormUI(player, true);
                showCustomFormUI(a[ta.selection].slice(9), player);
                break;
            case (ta.selection == a.length + 1):
                mainMenu(player);
                break;
            default:
                forceShow(form123456, player).then((v) => {
                    let va = v;
                    if (va.canceled && va.cancelationReason == FormCancelationReason.UserClosed) {
                        return;
                    }
                    ;
                    switch (va.selection) {
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
                            forceShow(form12345678, player).then((u) => {
                                let ua = u;
                                if (ua.canceled && ua.cancelationReason == FormCancelationReason.UserClosed) {
                                    return;
                                }
                                ;
                                switch (ua.selection) {
                                    case 0:
                                        customFormListSelectionMenu(player);
                                        break;
                                    case 1:
                                        world.setDynamicProperty(a[ta.selection]);
                                        world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUIElement:" + a[ta.selection].slice(9) + "|"))).forEach((k) => { world.setDynamicProperty(k); });
                                        world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("customUICode:" + a[ta.selection].slice(9) + "|"))).forEach((k) => { world.setDynamicProperty(k); });
                                        customFormListSelectionMenu(player);
                                        break;
                                    default:
                                        customFormListSelectionMenu(player);
                                        break;
                                }
                            });
                            break;
                        case 4:
                            customFormListSelectionMenu(player);
                            break;
                    }
                });
                break;
        }
    });
}
;
export function mainMenu(sourceEntity) {
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
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color"); /*
    form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/
    form.button("Player Controller", "textures/ui/controller_glyph_color");
    form.button("Entity Controller", "textures/ui/controller_glyph_color_switch");
    form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
    form.button("§4Dimension Options§f(§cComing Soon!§f)§b", "textures/ui/icon_setting");
    form.button("§4Create Explosion(§cComing Soon!§f)§b", "textures/blocks/tnt_side");
    form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
    form.button("§4World Debug§f(§cComing Soon!§f)§b", "textures/ui/xyz_axis.png");
    form.button("§4Dimension Debug§f(§cComing Soon!§f)§b", "textures/ui/NetherPortal");
    form.button("Inventory Transfer", "textures/ui/NetherPortal");
    form.button("Run Command", "textures/ui/ImpulseSquare.png");
    form.button("Script Eval", "textures/ui/RepeatSquare.png");
    form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
    form.button("Manage Custom UIs", "textures/ui/feedIcon");
    form.button("Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Manage Players", "textures/ui/user_icon_white");
    form.button("§eManage Commands §f[§6Beta§f]", "textures/ui/chat_keyboard_hover");
    form.button("§eItem Editor §f[§cAlpha§f]", "textures/ui/chat_keyboard_hover");
    forceShow(form, players[players.findIndex((x) => x == sourceEntity)]).then(ra => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                editorStick(sourceEntity);
                break;
            case 1:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 2:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 3:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:debugScreen saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 4:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 5:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:playerDebug saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 6:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebug saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break; /*

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
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 8:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:entityController saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 9:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:worldOptions saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 10:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:dimensionOptions saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 11:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:createExplosion saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 12:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:fillBlocks saqw"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 15:
                try {
                    (sourceEntity).runCommand(String("/scriptevent andexdb:inventoryTransfer saih"));
                }
                // Do something
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                // Do something when button 2 is pressed
                break;
            case 16:
                terminal(sourceEntity);
                break;
            case 17:
                scriptEvalRunWindow(sourceEntity);
                break;
            case 18:
                editAreasMainMenu(sourceEntity);
                break;
            case 19:
                customFormListSelectionMenu(sourceEntity);
                break;
            case 20:
                settings(sourceEntity);
                break;
            case 21:
                managePlayers(sourceEntity);
                break;
            case 22:
                manageCommands(sourceEntity);
                break;
            case 23:
                try {
                    uis.itemSelector(sourceEntity, sourceEntity).then(a => { if (!!a) {
                        uis.itemEditorTypeSelection(sourceEntity, sourceEntity, a);
                    } });
                }
                catch { }
                break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function settings(sourceEntity) {
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Settings");
    form.body("Choose menu to open. ");
    form.button("Global Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Eval Auto Execute Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Personal Settings", "textures/ui/settings_glyph_color_2x"); /*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                globalSettings(sourceEntity);
                break;
            case 1:
                evalAutoScriptSettings(sourceEntity);
                break;
            case 2:
                personalSettings(sourceEntity);
                break;
            default:
        }
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function globalSettings(sourceEntity) {
    let form2 = new ModalFormData();
    "andexdbSettings:autoEscapeChatMessages";
    "andexdbSettings:autoURIEscapeChatMessages";
    "andexdbSettings:allowChatEscapeCodes";
    form2.title("Global Settings");
    form2.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"));
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before chat ranks in chat messages, default is \"[\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after chat ranks in chat messages, default is \"§§r§§f]\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before player's names in chat messages, default is \"<\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after player's names in chat messages, default is \"§§r§§f>\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn locations for the gametest structure, this is used when spawning in no ai entities or spawning in simulated player", "x, y, z", Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {}).join(", "));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\nDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fsendMessageOnInvalidChatCommand§r§f\nMakes the chat command still send as a chat message if that specific chat command does not exist, default is false", Boolean(world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\nAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));
    forceShow(form2, sourceEntity).then(to => {
        let t = to;
        if (t.canceled)
            return; /*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [chatCommandPrefix, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix, rankDisplayPrefix, rankDisplaySuffix, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, gametestStructureDefaultSpawnLocation, chatCommandsEnbaled, disableCustomChatMessages, sendMessageOnInvalidChatCommand, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, autoSavePlayerData, bepl, beppb, aebe, aepl] = t.formValues;
        world.setDynamicProperty("andexdbSettings:chatCommandPrefix", chatCommandPrefix);
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes);
        world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix);
        world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix);
        world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix);
        world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix);
        world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix);
        world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix);
        world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator);
        if (String(gametestStructureDefaultSpawnLocation) != "") {
            world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", { x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2]) });
        }
        world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled);
        world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages);
        world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand);
        world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting);
        world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages);
        world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages);
        world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes);
        world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData);
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function personalSettings(sourceEntity) {
    let form2 = new ModalFormData();
    "andexdbSettings:autoEscapeChatMessages";
    "andexdbSettings:autoURIEscapeChatMessages";
    "andexdbSettings:allowChatEscapeCodes";
    form2.title("Personal Settings");
    form2.textField("§l§fTime Zone§r§f\nTime zone as hour for difference from UTC (decimals are allowed), the default is 0. ", "number", String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for your chat ranks, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for your custom chat names, default is undefined:", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between player's names and player's chat messages, default is \" \"", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ? undefined : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? " "));
    form2.textField("§l§fdebugStickUseCooldown§r§f\nCooldown between changing the block state of a block with a debug stick after you have just changed that state on the same block, default is 4", "number; default: 4", !!!sourceEntity.getDynamicProperty("debugStickUseCooldown") ? undefined : String(sourceEntity.getDynamicProperty("debugStickUseCooldown") ?? 4));
    form2.textField("§l§fdebugStickHoldDuration§r§f\nTime after the actionbar for changing a block state with the debug stick appears before the actionbar can be changed again, default is 10", "number; default: 10", !!!sourceEntity.getDynamicProperty("debugStickHoldDuration") ? undefined : String(sourceEntity.getDynamicProperty("debugStickHoldDuration") ?? 10)); /*
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
    forceShow(form2, sourceEntity).then(to => {
        let t = to;
        if (t.canceled)
            return; /*
        GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [timeZone, chatRankPrefix, chatSudoPrefix, rankDisplayPrefix, rankDisplaySuffix, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, debugStickUseCooldown, debugStickHoldDuration] = t.formValues;
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:timeZone", timeZone == "" ? undefined : timeZone);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatRankPrefix", chatRankPrefix == "" ? undefined : chatRankPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatSudoPrefix", chatSudoPrefix == "" ? undefined : chatSudoPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix", rankDisplayPrefix == "" ? undefined : rankDisplayPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix", rankDisplaySuffix == "" ? undefined : rankDisplaySuffix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix", nameDisplayPrefix == "" ? undefined : nameDisplayPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix", nameDisplaySuffix == "" ? undefined : nameDisplaySuffix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator == "" ? undefined : chatNameAndMessageSeparator);
        sourceEntity.setDynamicProperty("debugStickUseCooldown", debugStickUseCooldown == "" ? undefined : debugStickUseCooldown);
        sourceEntity.setDynamicProperty("debugStickHoldDuration", debugStickHoldDuration == "" ? undefined : debugStickHoldDuration); /*
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
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function evalAutoScriptSettings(sourceEntity) {
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.title("Eval Auto Script Settings");
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
    form2.textField("evalAfterEvents:entityDie", "JavaScript Script API Code", String(world.getDynamicProperty("evalAfterEvents:entityDie") ?? "")); /*
    form2.textField("Slot Number", "Slot Number", "0");
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    form2.toggle("Debug2", false);*/
    forceShow(form2, sourceEntity).then(to => {
        let t = to;
        if (t.canceled)
            return;
        let [becs, beddete, beea, beer, bee, beide, beiu, beiuo, bepa, bepbb, bepiwb, bepiwe, bepl, beppb, aebe, aepl, aeed] = t.formValues;
        world.setDynamicProperty("evalBeforeEvents:chatSend", becs);
        world.setDynamicProperty("evalBeforeEvents:dataDrivenEntityTrggerEvent", beddete);
        world.setDynamicProperty("evalBeforeEvents:effectAdd", beea);
        world.setDynamicProperty("evalBeforeEvents:entityRemove", beer);
        world.setDynamicProperty("evalBeforeEvents:explosion", bee);
        world.setDynamicProperty("evalBeforeEvents:itemDefinitionEvent", beide);
        world.setDynamicProperty("evalBeforeEvents:itemUse", beiu);
        world.setDynamicProperty("evalBeforeEvents:itemUseOn", beiuo);
        world.setDynamicProperty("evalBeforeEvents:pistonActivate", bepa);
        world.setDynamicProperty("evalBeforeEvents:playerBreakBlock", bepbb);
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithBlock", bepiwb);
        world.setDynamicProperty("evalBeforeEvents:playerInteractWithEntity", bepiwe);
        world.setDynamicProperty("evalBeforeEvents:playerLeave", bepl);
        world.setDynamicProperty("evalBeforeEvents:playerPlaceBlock", beppb);
        world.setDynamicProperty("evalAfterEvents:blockExplode", aebe);
        world.setDynamicProperty("evalAfterEvents:playerLeave", aepl);
        world.setDynamicProperty("evalAfterEvents:entityDie", aeed);
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function scriptEvalRunWindow(sourceEntity) {
    let form = new ModalFormData();
    form.title("Script Evaluate Run Window");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    forceShow(form, sourceEntity).then(ro => {
        let r = ro;
        if (r.canceled)
            return;
        let runScriptForEval = r.formValues;
        eval(String(runScriptForEval.join("\n")));
    }).catch(e => {
        console.error(e, e.stack);
    });
} /*
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
export function terminal(sourceEntity) {
    system.run(() => {
        let form = new ModalFormData();
        form.title("Command Runner / Terminal");
        form.textField("Run Command", "Run Command");
        form.textField("Run Delay", "Run Delay");
        form.toggle("Debug", false);
        form.show(sourceEntity).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [commandId, commandDelay, debug] = r.formValues; /*
            console.warn(r.formValues);*/
            system.runTimeout(() => {
                sourceEntity.sendMessage(String((sourceEntity).runCommand(String(commandId)).successCount));
            }, Number(commandDelay));
            // Do something
        }).catch(e => {
            console.error(e, e.stack);
        });
    }); /*
try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
// Do something
catch(e) {
console.error(e, e.stack);
};*/
}
export function playerController(sourceEntity, message = "") {
    let form2 = new ModalFormData();
    let playerList = world.getPlayers();
    let targetList = [playerList[0].nameTag];
    let componentList = [playerList[0].getComponents[0]];
    let dimension = "";
    let spawnXPosition = "";
    let spawnYPosition = "";
    let spawnZPosition = "";
    for (const index in playerList) { /*
        console.warn(index);*/
        if (Number(index) != 0) {
            targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
            targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
        } /*
        console.warn(targetList);*/
    } /*
    console.warn(targetList);
    console.warn(String(targetList).split(","));
    console.warn(String(targetList));
    console.warn([String(targetList)]);*/
    function playerControllerFormPopup(playerTargetB, playerViewerB) {
        let form = new ModalFormData();
        try {
            dimension = String(playerList[playerTargetB].getSpawnPoint().dimension.id);
        }
        catch (e) {
            dimension = "";
        }
        try {
            spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
        }
        catch (e) {
            spawnXPosition = "";
        }
        try {
            spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
        }
        catch (e) {
            spawnYPosition = "";
        }
        try {
            spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
        }
        catch (e) {
            spawnZPosition = "";
        }
        let playerCurrentNameTag = "";
        try {
            playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
        }
        catch (e) {
            playerCurrentNameTag = "";
        }
        form.title("Player Controller");
        form.toggle("Change Name Tag", false);
        form.toggle("Multiline Name Tag", false);
        form.textField("Name Tag", "Name Tag", playerCurrentNameTag);
        form.textField("Trigger Event", "Trigger Event");
        form.textField("addExperience", "Experience Amount");
        form.textField("addLevels", "Level Amount");
        form.slider("Selected Slot", 0, 56, 1, playerList[playerTargetB].selectedSlot);
        form.slider("§4Scale", 0, 10, 0.5);
        form.toggle("Is Sneaking", playerList[playerTargetB].isSneaking);
        form.toggle("Clear Velocity", false);
        form.toggle("Extinguish Fire", false);
        form.toggle("Kill", false);
        form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", false);
        form.toggle("Set On Fire", false);
        form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
        form.toggle("Set On Fire - Use Effects", false);
        form.toggle("Add Effect", false);
        form.textField("Effect To Add", "Effect To Add");
        form.textField("Ticks Of Effect", "Ticks Of Effect");
        form.textField("Effect Amplifier", "Effect Amplifier");
        form.toggle("Show Particles Of Effect", true);
        form.toggle("Add tag", false);
        form.textField("Tag To Add", "Tag To Add");
        form.toggle("Remove Effect", false);
        form.textField("Effect To Remove", "Effect To Remove");
        form.toggle("Remove tag", false);
        form.textField("Tag To Remove", "Tag To Remove"); /*
        form2.dropdown("damageType", ["entity", "projectile"], 0)
        form2.dropdown("damageCause", ["anvil", "none"], 0)*/
        form.toggle("§eapplyImpulse", false);
        form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
        form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
        form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
        form.toggle("applyKnockback", false);
        form.textField("directionX", "directionX");
        form.textField("directionZ", "directionZ");
        form.textField("horizontalStrength", "horizontalStrength");
        form.textField("verticalStrength", "verticalStrength");
        form.toggle("Set Rotation", false);
        form.textField("X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
        form.textField("Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
        form.toggle("Teleport", false);
        form.textField("Teleport Dimension", "Dimension", playerList[playerTargetB].dimension.id);
        form.textField("Teleport X Coordinate", "X Coordinate", String(playerList[playerTargetB].location.x));
        form.textField("Teleport Y Coordinate", "Y Coordinate", String(playerList[playerTargetB].location.y));
        form.textField("Teleport Z Coordinate", "Z Coordinate", String(playerList[playerTargetB].location.z));
        form.textField("Teleport X Rotation", "X Rotation", String(playerList[playerTargetB].getRotation().x));
        form.textField("Teleport Y Rotation", "Y Rotation", String(playerList[playerTargetB].getRotation().y));
        form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], 0);
        form.toggle("Teleport - checkForBlocks", false);
        form.toggle("Teleport - keepVelocity", false);
        form.toggle("Try Teleport", false);
        form.textField("Try Teleport Dimension", "§4Dimension", playerList[playerTargetB].dimension.id);
        form.textField("Try Teleport X Coordinate", "§4X Coordinate", String(playerList[playerTargetB].location.x));
        form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", String(playerList[playerTargetB].location.y));
        form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", String(playerList[playerTargetB].location.z));
        form.toggle("Try Teleport - checkForBlocks", false);
        form.toggle("Try Teleport - keepVelocity", false);
        form.toggle("Set Operator", playerList[playerTargetB].isOp());
        form.toggle("Set Spawn Point", false);
        form.textField("Spawn Dimension", "Spawn Dimension", dimension);
        form.textField("Spawn X Coordinate", "Spawn X Coordinate", spawnXPosition);
        form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", spawnYPosition);
        form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", spawnZPosition);
        form.toggle("Start Item Cooldown", false);
        form.textField("Item Category", "Item Category");
        form.textField("Tick Duration", "Tick Duration");
        form.toggle("Send Message", false);
        form.textField("Message To Send", "Message To Send");
        form.toggle("§4Open The Item Modification Form Afterwards", false);
        form.toggle("resetLevel", false);
        form.toggle("§4Debug", false);
        forceShow(form, playerList[playerViewerB]).then(r => {
            if (r.canceled)
                return;
            let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlot, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug] = r.formValues;
            let newNameTag = String(nameTag);
            if (Boolean(multilineNameTag) == true) {
                newNameTag = String(nameTag).split("\\\\newline").join("\n");
            }
            /*
                        let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
                        scale.value = Number(scaleValue);*/ /**/
            if (Boolean(changeNameTag) == true) {
                try {
                    playerList[playerTargetB].setOp(Boolean(setOp));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /**/
            if (Boolean(changeNameTag) == true) {
                try {
                    playerList[playerTargetB].nameTag = String(newNameTag);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            playerList[playerTargetB].isSneaking = Boolean(isSneaking);
            playerList[playerTargetB].selectedSlot = Number(selectedSlot);
            if (Boolean(addEffect) == true) {
                try {
                    playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), { amplifier: Number(effectAmplifier), showParticles: Boolean(effectShowEffectParticles) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(applyImpulse) == true) {
                try {
                    playerList[playerTargetB].applyImpulse({ x: Number(velocityX), y: Number(velocityY), z: Number(velocityZ) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(applyKnockback) == true) {
                try {
                    playerList[playerTargetB].applyKnockback(Number(kockbackDirectionX), Number(knockbackDirectionZ), Number(knockbackHorizontalStrength), Number(knockbackVerticalStrength));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(addTag) == true) {
                try {
                    playerList[playerTargetB].addTag(String(tagToAdd));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(removeTag) == true) {
                try {
                    playerList[playerTargetB].removeTag(String(tagToRemove));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(removeEffect) == true) {
                try {
                    playerList[playerTargetB].removeEffect(String(effectToRemove));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setSpawnPoint) == true) {
                try {
                    playerList[playerTargetB].setSpawnPoint({ dimension: world.getDimension(String(spawnDimension)), x: Number(spawnX), y: Number(spawnY), z: Number(spawnZ) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(teleport) == true) {
                try {
                    playerList[playerTargetB].teleport({ x: Number(teleportX), y: Number(teleportY), z: Number(teleportZ) }, { checkForBlocks: Boolean(teleportCheckForBlocks), dimension: world.getDimension(String(teleportDimension)), keepVelocity: Boolean(teleportKeepVelocity), rotation: { x: Number(teleportRotX), y: Number(teleportRotY) } });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(tryTeleport) == true) {
                try {
                    playerList[playerTargetB].tryTeleport({ x: Number(tryTeleportX), y: Number(tryTeleportY), z: Number(tryTeleportZ) }, { checkForBlocks: Boolean(tryTeleportCheckForBlocks), dimension: world.getDimension(String(tryTeleportDimension)), keepVelocity: Boolean(tryTeleportKeepVelocity) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setOnFire) == true) {
                try {
                    playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setRot) == true) {
                try {
                    playerList[playerTargetB].setRotation({ x: Number(rotX), y: Number(rotY) });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(resetLevel) == true) {
                try {
                    playerList[playerTargetB].resetLevel();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(kill) == true) {
                try {
                    playerList[playerTargetB].kill();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(remove) == true) {
                try {
                    playerList[playerTargetB].remove();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(clearVelocity) == true) {
                try {
                    playerList[playerTargetB].clearVelocity();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(extinguishFire) == true) {
                try {
                    playerList[playerTargetB].extinguishFire();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (triggerEvent !== undefined) {
                try {
                    playerList[playerTargetB].triggerEvent(String(triggerEvent));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (addExperience !== undefined) {
                try {
                    playerList[playerTargetB].addExperience(Number(addExperience));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (setItemCooldown !== undefined) {
                try {
                    playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (addLevels !== undefined) {
                try {
                    playerList[playerTargetB].addExperience(Number(addLevels));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(sendMessage) == true) {
                try {
                    playerList[playerTargetB].sendMessage(String(messageToSend));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(isSneaking) == true) {
                playerList[playerTargetB].isSneaking = true;
                try {
                    playerList[playerTargetB].addTag("isSneaking");
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*
                if (playerList[playerTargetB].hasTag("isSneaking")) {
                  system.runInterval( () => {
                  playerList[playerTargetB].isSneaking == true
                  if (playerList[playerTargetB].hasTag("isSneaking") == false) {
                  return
                  }
                  }, 2)
                }*/
            }
            else {
                try {
                    playerList[playerTargetB].removeTag("isSneaking");
                    playerList[playerTargetB].isSneaking = false;
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
    let showMenuForm2 = sourceEntity;
    if (message.startsWith("players:") && "0123456789".includes(message.charAt(8)) && "0123456789".includes(message.charAt(message.length)) && message.includes("|")) {
        let message2 = message.slice(8, message.length);
        let message3 = message2.split("|");
        let playerTargetB = Number(message3[0]);
        let playerViewerB = Number(message3[1]);
        playerControllerFormPopup(playerTargetB, playerViewerB);
        showMenuForm2 = playerList[playerViewerB];
    }
    else {
        form2.title("Player Controller");
        form2.dropdown("Player Target", String(targetList).split(","), 0);
        form2.dropdown("Player Viewer", String(targetList).split(","), 0);
        forceShow(form2, playerList[playerList.findIndex((x) => x == sourceEntity)]).then(t => {
            if (t.canceled)
                return;
            let [playerTarget, playerViewer] = t.formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            playerControllerFormPopup(playerTargetB, playerViewerB);
        }).catch(e => {
            console.error(e, e.stack);
        });
    }
}
export function inventoryController(sourceEntity) {
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    form2.textField("Slot Number", "Slot Number", "0");
    form2.dropdown("Slot Type", ["Inventory", "Equipment"], 0);
    form2.dropdown("Player Target", String(targetList).split(","), 0);
    form2.dropdown("Player Viewer", String(targetList).split(","), 0);
    form2.toggle("Debug2", false);
    form2.show(sourceEntity).then(t => {
        if (t.canceled)
            return;
        let [slotNumber, slotType, playerTarget, playerViewer, debug2] = t.formValues;
        let playerTargetB = Number(playerTarget);
        let playerViewerB = Number(playerViewer);
        let inventory;
        inventory = players[playerTargetB].getComponent("inventory"); /*
        try{inventory = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};*/
        let item = inventory.container.getItem(Number(slotNumber));
        let equipmentPlayerSlotsList = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Mainhand, EquipmentSlot.Offhand];
        if (Number(slotType) == 1) {
            try {
                let a = players[playerTargetB].getComponent("equippable");
                item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)]);
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
            }
            ;
        }
        ;
        function getDurability() { try {
            return item.getComponent("minecraft:durability");
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            }
            ;
            return undefined;
        } ; }
        function getEnchantments() { try {
            return item.getComponent("minecraft:enchantments");
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            }
            ;
            return undefined;
        } ; }
        const durability = getDurability();
        function itemNameTextCalculator() {
            try {
                if (item.nameTag == undefined) {
                    return undefined;
                }
                else {
                    if (item.nameTag != undefined) {
                        return item.nameTag;
                    }
                }
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
                return undefined;
            }
            ;
        }
        let itemNameTextField = itemNameTextCalculator(); /*
        console.warn(itemNameTextCalculator());*/
        function itemLoreTextCalculator() {
            try {
                if (item.getLore() == undefined) {
                    return undefined;
                }
                else {
                    if (item.getLore() != undefined) {
                        return Array(item.getLore().toString()).join("");
                    }
                }
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
                return undefined;
            }
            ;
        }
        let itemLoreTextField = itemLoreTextCalculator();
        let currentValueItemAmount = 0;
        try {
            currentValueItemAmount = item.amount;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            }
            ; /* return 0*/
        }
        ;
        let currentValueItemType = undefined;
        try {
            currentValueItemType = item.typeId;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            }
            ; /* return 0*/
        }
        ;
        let itemKeepOnDeath = false;
        try {
            itemKeepOnDeath = item.keepOnDeath;
        }
        catch (e) {
            if (Boolean(debug2) == true) {
                console.error(e, e.stack);
            }
            ; /* return false*/
        }
        ;
        let form = new ModalFormData(); /*
        console.warn(item.nameTag);*/ /*
        console.warn(Array(item.getLore().toString()).join(""));*/
        form.title("Item Modifier / Lore");
        form.textField("Item Type: " + currentValueItemType + "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField /*(String(item.nameTag))*/);
        form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", itemLoreTextField);
        form.textField("Can Destroy", "Can Destroy", "" /*(String(item.getCanDestroy()))*/);
        form.textField("Can Place On", "Can Place On", "" /*(String(item.getCanPlaceOn()))*/);
        form.textField("Trigger Event", "Trigger Event", "");
        form.toggle("Set Count", false);
        form.slider("Count", 0, 255, 1, currentValueItemAmount);
        form.toggle("keepOnDeath", (itemKeepOnDeath));
        function getItemLockMode(mode, input) {
            try {
                if (mode == 1) {
                    try {
                        if (item.lockMode == "inventory") {
                            return 0;
                        }
                        else {
                            if (item.lockMode == "none") {
                                return 1;
                            }
                            else {
                                if (item.lockMode == "slot") {
                                    return 2;
                                }
                            }
                        }
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                        ;
                        return 1;
                    }
                }
                else {
                    if (mode == 0) {
                        if (input == 0) {
                            return ItemLockMode.inventory;
                        }
                        else {
                            if (input == 1) {
                                return ItemLockMode.none;
                            }
                            else {
                                if (input == 2) {
                                    return ItemLockMode.slot;
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.error(e, e.stack);
                return undefined;
            }
            ;
        }
        let itemLockModeIndex = Number(getItemLockMode(1));
        form.dropdown("lockMode", ["inventory", "none", "slot"], Number((itemLockModeIndex)));
        form.toggle("setLore", false);
        form.toggle("clearLore", false);
        form.toggle("New Item", false);
        form.textField("Item Type", "Item Type", "");
        form.textField("Item Count", "Item Count", "1"); /*
        form.textField("Item Data", "Trigger Event", "");*/
        form.toggle("Move Item", false);
        form.textField("From Slot", "From Slot", "0");
        form.textField("To Slot", "To Slot", "1");
        form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("From Contriner Player", String(targetList).split(","), 0);
        form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("To Container Player", String(targetList).split(","), 0);
        form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.toggle("Swap Items", false);
        form.textField("Slot", "Slot", "0");
        form.textField("Other Slot", "Other Slot", "1");
        form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("Container Player", String(targetList).split(","), 0);
        form.textField("Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("Other Container Player", String(targetList).split(","), 0);
        form.textField("Other Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.toggle("Transfer Item", false);
        form.textField("From Slot", "From Slot", "0");
        form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("From Container Player", String(targetList).split(","), 0);
        form.textField("From Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], 0);
        form.dropdown("To Container Player", String(targetList).split(","), 0);
        form.textField("To Container Block", "overworld, 500, 60, 500", players[playerTargetB].dimension.id + ", " + players[playerTargetB].location.x + ", " + players[playerTargetB].location.y + ", " + players[playerTargetB].location.z);
        form.toggle("Debug", false);
        forceShow(form, players[playerViewerB]).then(r => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            // This will assign every input their own variable
            let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, setAmount, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug] = r.formValues; /*
            console.warn(r.formValues);*/
            /*let item = inventory.container.getItem(Number(slotNumber));
            if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};*/
            let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferFromContainerBlock).split(", ")[1]), y: Number(String(transferFromContainerBlock).split(", ")[2]), z: Number(String(transferFromContainerBlock).split(", ")[3]) });
            let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(transferToContainerBlock).split(", ")[1]), y: Number(String(transferToContainerBlock).split(", ")[2]), z: Number(String(transferToContainerBlock).split(", ")[3]) });
            let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveFromContainerBlock).split(", ")[1]), y: Number(String(moveFromContainerBlock).split(", ")[2]), z: Number(String(moveFromContainerBlock).split(", ")[3]) });
            let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({ x: Number(String(moveToContainerBlock).split(", ")[1]), y: Number(String(moveToContainerBlock).split(", ")[2]), z: Number(String(moveToContainerBlock).split(", ")[3]) });
            let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapContainerBlock).split(", ")[1]), y: Number(String(swapContainerBlock).split(", ")[2]), z: Number(String(swapContainerBlock).split(", ")[3]) });
            let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({ x: Number(String(swapOtherContainerBlock).split(", ")[1]), y: Number(String(swapOtherContainerBlock).split(", ")[2]), z: Number(String(swapOtherContainerBlock).split(", ")[3]) });
            let durability2 = getDurability();
            let enchantments2 = getEnchantments(); /*
            for (const index in inventory.) {
                if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
                }
            }*/
            let newItemNameTag = String(itemName).split("\\\\newline");
            try {
                item.nameTag = newItemNameTag.join("\n");
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
            }
            if (Boolean(setLore) == true) {
                try {
                    item.setLore(String(itemLore).split("\\\\newline"));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
            }
            if (Boolean(clearLore) == true) {
                try {
                    item.setLore();
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            try {
                item.lockMode = String(getItemLockMode(0, Number(lockMode)));
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
            }
            try {
                item.keepOnDeath = Boolean(keepOnDeath);
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                }
                ;
            }
            if (Boolean(setAmount) == true) {
                try {
                    item.amount = Number(amount);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    ;
                }
            }
            if (String(canDestroy) !== "") {
                try {
                    item.setCanDestroy(String(canDestroy).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ; /*String[String(canDestroy)]*/
                ;
            }
            if (String(canPlaceOn) !== "") {
                try {
                    item.setCanPlaceOn(String(canPlaceOn).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
            }
            if (String(triggerEvent) !== "") {
                try {
                    item.triggerEvent(String(triggerEvent));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
            try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/ /*
            let enchantment = new Enchantment("fire_aspect", 4)
            enchantment.level = 5
            try{ const enchantments3 = enchantments2.enchantments; enchantments3.addEnchantment(enchantment); enchantments2.enchantments = enchantments3} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
            if (Boolean(newItem) == true) {
                try {
                    item = new ItemStack(String(newItemType), Number(newItemCount));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (sourceEntity.hasTag("scriptDebugger")) {
                console.warn(item.typeId);
            }
            if (Number(slotType) == 1) {
                try {
                    let a = players[playerTargetB].getComponent("equippable");
                    a.setEquipment(equipmentPlayerSlotsList[Number(slotNumber)], item.clone());
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                ;
            }
            else {
                try {
                    inventory.container.setItem(Number(slotNumber), item);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
            try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
            if (Boolean(moveItem) == true) { /*
                let moveFromSlotB: any
                moveFromSlotB = undefined*/
                let moveFromContainerB;
                moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                switch (moveFromContainerType) {
                    case 4:
                        moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                        break;
                }
                let moveToContainerB;
                moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                switch (moveToContainerType) {
                    case 4:
                        moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(swapItems) == true) { /*
                let moveFromSlotB: any
                moveFromSlotB = undefined*/
                let swapContainerB;
                let mode = 0;
                swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                let itemA;
                itemA = undefined;
                if (Number(swapSlot) > 35 && Number(swapContainerType) == 0) {
                    try {
                        swapContainerB = players[playerTargetB].getComponent("equippable");
                        swapSlot = Number(swapSlot) - 36;
                        mode = 1;
                        itemA = swapContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapSlot)]).clone();
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                    ;
                }
                ;
                switch (swapContainerType) {
                    case 4:
                        swapContainerB = swapContainerBlockB.getComponent("inventory");
                        break;
                }
                let swapOtherContainerB;
                swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                let itemB;
                itemB = undefined;
                if (Number(swapOtherSlot) > 35) {
                    try {
                        swapOtherContainerB = players[playerTargetB].getComponent("equippable");
                        swapOtherSlot = Number(swapOtherSlot) - 36;
                        if (mode == 1) {
                            mode = 2;
                        }
                        else {
                            mode = 3;
                        }
                        ;
                        itemB = swapOtherContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)]).clone();
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                    ;
                }
                ;
                switch (swapOtherContainerType) {
                    case 4:
                        swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    if (itemB == undefined) {
                        itemB = swapOtherContainerB.container.getItem(Number(swapOtherSlot)).clone();
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    if (itemA == undefined) {
                        itemA = swapContainerB.container.getItem(Number(swapSlot)).clone();
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                switch (mode) {
                    case 0:
                        console.warn("Mode: 0");
                        try {
                            swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 1:
                        console.warn("Mode: 1");
                        try {
                            swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapOtherContainerB.container.setItem(Number(swapOtherSlot), itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 3:
                        console.warn("Mode: 3");
                        try {
                            swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapContainerB.container.setItem(Number(swapSlot), itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 2:
                        console.warn("Mode: 2");
                        try {
                            swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapSlot)], itemA);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        try {
                            swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                }
            }
            if (Boolean(transferItem) == true) { /*
                let moveFromSlotB: any
                moveFromSlotB = undefined*/
                let transferFromContainerB;
                transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                switch (transferFromContainerType) {
                    case 4:
                        transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                        break;
                }
                let transferToContainerB;
                transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                switch (transferToContainerType) {
                    case 4:
                        transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                        break;
                }
                try {
                    transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(debug) == true) {
                console.warn("Form Values", r.formValues);
                console.warn(["Item Components: ", item.getComponents()]);
                console.warn(item.getTags());
                console.warn(players);
                console.warn(players[0]);
                console.warn(players[1]); /*
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
                try {
                    console.warn(["Damage: ", durability.damage]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                try {
                    console.warn(["Damage Chance: ", durability.getDamageChance()]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                try {
                    console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                try {
                    console.warn(["Max Durability: ", durability.maxDurability]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                ;
                let componentList = [item.getComponents()[0].typeId];
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
    });
}
export function entityController(sourceEntity) { }
export function editorStick(sourceEntity, message = "") {
    let form = new ModalFormData();
    let playerList = world.getPlayers();
    let block = sourceEntity.getBlockFromViewDirection();
    let block2 = block.block;
    let allCoordinates = [];
    if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
        allCoordinates = message.slice(12).split("|");
        block2 = world.getDimension(allCoordinates[0]).getBlock({ x: allCoordinates[1], y: allCoordinates[2], z: allCoordinates[3] });
    }
    form.title("Editor Stick");
    let blockStatesFullList; /*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {
        BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
    }
    catch (e) {
        if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
            blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
        }
        else {
            blockStatesFullList = "§r§cThis block has no block states. §f";
        }
    } /*
    for (const index in block.block.permutation.getAllStates()) {*/ /*
        console.warn(index);*/ /*
    if (Number(index) != 0) {*/ /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
    console.warn(targetList);*/ /*
}*/
    try {
        form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nblockFace: " + block.face + "\nblockFaceLocation: { x: " + block.faceLocation.x + ", y: " + block.faceLocation.y + ", z: " + block.faceLocation.z + " }\nsetType", "Block Type", block2.typeId);
    }
    catch (e) {
        console.error(e, e.stack);
        form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");
    } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", false);
    try {
        form.textField("List Of Block Properties: " + blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state");
    }
    catch (e) {
        console.error(e, e.type /*e.stack*/);
        console.warn("test: " + String(e).slice(67) /*e.stack*/);
        form.textField("Block Property Identifier", "bool_state, num_state, str_state");
    }
    form.textField("Block Property Value", "true, 1, \"North\"");
    form.toggle("setProperty Enabled", false); /*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", block2.isWaterlogged); /*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", false); /*
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
    form.toggle("setWaterContainerProperties Enabled", false);
    try {
        if (block2.getComponent("waterContainer") != undefined) {
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`);
        }
    }
    catch {
        form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`);
    }
    form.toggle("setSnowContainerProperties Enabled", false);
    if (block2.getComponent("snowContainer") != undefined) {
        form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setLavaContainerProperties Enabled", false);
    if (block2.getComponent("lavaContainer") != undefined) {
        form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setPotionContainerProperties Enabled", false);
    if (block2.getComponent("potionContainer") != undefined) {
        form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontRawText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)));
    }
    else {
        form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackRawText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)));
    }
    else {
        form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front));
    }
    else {
        form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back));
    }
    else {
        form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontTextColor Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front));
    }
    else {
        form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackTextColor Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back));
    }
    else {
        form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed);
    forceShow(form, playerList[playerList.findIndex((x) => x == sourceEntity)]).then(ro => {
        let r = ro;
        if (r.canceled)
            return;
        let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*, selectedSlot*/, isWaterlogged /*, clearVelocity*/, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
        let blockPropertyValue2;
        blockPropertyValue2 = "";
        let blockPropertyValueArray;
        blockPropertyValueArray = String(blockPropertyValue).split(", ");
        let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
        if (waterContainerEnabled && block2.getComponent("waterContainer") != undefined) {
            block2.getComponent("waterContainer").setCustomColor({ red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3]) });
            block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]);
        }
        if (snowContainerEnabled && block2.getComponent("snowContainer") != undefined) {
            block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]);
        }
        if (lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined) {
            block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]);
        }
        if (potionContainerEnabled && block2.getComponent("potionContainer") != undefined) {
            block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]);
            block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255));
        }
        if (signFrontRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
        }
        if (signBackRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back);
        }
        if (signFrontTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
        }
        if (signBackTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
        }
        if (block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed));
        }
        DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server. 
        if (signFrontTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back);
        }
        if (signBackTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front);
        }
        for (let index in blockPropertyValueArray) {
            if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1));
            }
            else {
                if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
                    blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                }
                else {
                    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
                        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                    }
                    else {
                        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                            blockPropertyValueArray[index] = String(blockPropertyValueArray[index]);
                        }
                    }
                }
            }
        }
        ; /*
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
        if (setTypeEnabled == true) {
            try {
                block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        ; /*
        try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
        if (setPropertyEnabled == true) {
            switch (blockPropertyValueLength) {
                case 1:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 2:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 3:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 4:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 5:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 6:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 7:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 8:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 9:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 10:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                default:
                    break; /*
                break;*/
            }
        }
        ;
        try {
            block2.setWaterlogged(Boolean(isWaterlogged));
        }
        catch (e) {
            console.error(e, e.stack);
        } /*
        GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
          
            test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
          
          })
            .maxTicks(400)
            .structureName("gametests:mediumglass");*/ /*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
        /*BlockType.arguments({id: "minecraft:grass"})*/
        // Do something
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function editorStickMenuB(sourceEntity) {
    let form = new ModalFormData();
    let playerList = world.getPlayers();
    form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id));
    form.textField("Block X", "Block X", String(sourceEntity.location.x));
    form.textField("Block Y", "Block Y", String(sourceEntity.location.y));
    form.textField("Block Z", "Block Z", String(sourceEntity.location.z));
    form.show(sourceEntity).then(r => {
        if (r.canceled)
            return;
        let [blockDimension, blockX, blockY, blockZ] = r.formValues; /*
        let blockPropertyValue2: any
        sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:"*/ /*"aslk"*/ /* + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ)*/
        editorStickB(sourceEntity, { dimension: world.getDimension(String(blockDimension)), x: Number(blockX), y: Number(blockY), z: Number(blockZ) });
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function editorStickMenuC(sourceEntity) { }
export function editorStickB(sourceEntity, dimensionLocation) {
    let form = new ModalFormData();
    let playerList = world.getPlayers(); /*
    let block = sourceEntity.getBlockFromViewDirection({includeLiquidBlocks: true, includePassableBlocks: true})*/
    let block2; /* = block.block*/
    block2 = dimensionLocation.dimension.getBlock(dimensionLocation);
    form.title("Editor Stick B");
    let blockStatesFullList; /*
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
    try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
    try {
        BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
    }
    catch (e) {
        if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {
            blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";
        }
        else {
            blockStatesFullList = "§r§cThis block has no block states. §f";
        }
    } /*
    for (const index in block.block.permutation.getAllStates()) {*/ /*
        console.warn(index);*/ /*
    if (Number(index) != 0) {*/ /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
    console.warn(targetList);*/ /*
}*/
    try {
        form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nsetType", "Block Type", block2.typeId);
    }
    catch (e) {
        console.error(e, e.stack);
        form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", "minecraft:air");
    } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
    form.toggle("setType Enabled", false);
    try {
        form.textField("List Of Block Properties: " + blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ + "\nBlock Property Identifier", "bool_state, num_state, str_state");
    }
    catch (e) {
        console.error(e, e.type /*e.stack*/);
        console.warn("test: " + String(e).slice(67) /*e.stack*/);
        form.textField("Block Property Identifier", "bool_state, num_state, str_state");
    }
    form.textField("Block Property Value", "true, 1, \"North\"");
    form.toggle("setProperty Enabled", false); /*
    try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
    try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
    /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
    form.slider("Selected Slot", 0, 56, 1)*/
    form.toggle("isWaterlogged", block2.isWaterlogged); /*
    form.toggle("Clear Velocity", false)*/
    form.toggle("Debug", false);
    form.toggle("setWaterContainerProperties Enabled", false);
    try {
        if (block2.getComponent("waterContainer") != undefined) {
            form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`);
        }
        else {
            form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`);
        }
    }
    catch {
        form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`);
    }
    form.toggle("setSnowContainerProperties Enabled", false);
    if (block2.getComponent("snowContainer") != undefined) {
        form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setLavaContainerProperties Enabled", false);
    if (block2.getComponent("lavaContainer") != undefined) {
        form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setPotionContainerProperties Enabled", false);
    if (block2.getComponent("potionContainer") != undefined) {
        form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`);
    }
    else {
        form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontRawText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)));
    }
    else {
        form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackRawText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)));
    }
    else {
        form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front));
    }
    else {
        form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackText Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back));
    }
    else {
        form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
    }
    form.toggle("setSignFrontTextColor Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front));
    }
    else {
        form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignBackTextColor Enabled", false);
    if (block2.getComponent("sign") != undefined) {
        form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back));
    }
    else {
        form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
    }
    form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed);
    forceShow(form, sourceEntity).then(r => {
        if (r.canceled)
            return;
        let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*, selectedSlot*/, isWaterlogged /*, clearVelocity*/, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed] = r.formValues;
        let blockPropertyValue2;
        blockPropertyValue2 = "";
        let blockPropertyValueArray;
        blockPropertyValueArray = String(blockPropertyValue).split(", ");
        let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
        if (waterContainerEnabled && block2.getComponent("waterContainer") != undefined) {
            block2.getComponent("waterContainer").setCustomColor({ red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3]) });
            block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]);
        }
        if (snowContainerEnabled && block2.getComponent("snowContainer") != undefined) {
            block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]);
        }
        if (lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined) {
            block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]);
        }
        if (potionContainerEnabled && block2.getComponent("potionContainer") != undefined) {
            block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]);
            block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255));
        }
        if (signFrontRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
        }
        if (signBackRawTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back);
        }
        if (signFrontTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
        }
        if (signBackTextEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
        }
        if (block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed));
        }
        DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server. 
        if (signFrontTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back);
        }
        if (signBackTextColorEnabled && block2.getComponent("sign") != undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) { /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/
            block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front);
        }
        for (let index in blockPropertyValueArray) {
            if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1));
            }
            else {
                if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
                    blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                }
                else {
                    if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
                        blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                    }
                    else {
                        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                            blockPropertyValueArray[index] = String(blockPropertyValueArray[index]);
                        }
                    }
                }
            }
        }
        ;
        if (setTypeEnabled == true) {
            try {
                block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        ;
        if (setPropertyEnabled == true) {
            switch (blockPropertyValueLength) {
                case 1:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 2:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 3:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 4:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 5:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 6:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 7:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 8:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 9:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                case 10:
                    try {
                        block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    break;
                default:
                    break; /*
                break;*/
            }
        }
        ;
        try {
            block2.setWaterlogged(Boolean(isWaterlogged));
        }
        catch (e) {
            console.error(e, e.stack);
        } /*
        GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
          
            test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
          
          })
            .maxTicks(400)
            .structureName("gametests:mediumglass");*/ /*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
        /*BlockType.arguments({id: "minecraft:grass"})*/
        // Do something
    }).catch(e => {
        console.error(e, e.stack);
    });
}
export function editorStickC(sourceEntity) { } /*
export function evalAutoScriptSettings(sourceEntity: Entity|Player){}*/
export function managePlayers(sourceEntity) {
    let form = new ActionFormData;
    form.title("Manage Players");
    let onlinePlayers = savedPlayer.getSavedPlayersAlphabeticalOrder().filter(_ => _.isOnline);
    onlinePlayers.forEach((p) => { form.button(`${p.name}\n${ban.testForBannedPlayer(p) ? "Banned" : "Online"}`, "textures/ui/online"); });
    let offlinePlayers = savedPlayer.getSavedPlayers().filter(_ => !_.isOnline).sort((a, b) => 1 - (2 * Number(a.lastOnline < b.lastOnline))).sort((a, b) => 1 - (2 * Number(Number(a.isBanned) > Number(b.isBanned))));
    offlinePlayers.forEach((p) => { form.button(`${p.name}\n${ban.testForBannedPlayer(p) ? "Banned" : "Online: " + new Date(Number(p.lastOnline) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString()}`, p.isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline"); });
    let players = onlinePlayers.concat(offlinePlayers);
    form.button("Manage Bans");
    form.button("Back");
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        switch (r.selection) {
            case players.length:
                let form6 = new ActionFormData;
                form6.title("Manage Bans");
                ban.getValidBans().idBans.forEach((p) => { form6.button(`${p.playerId}\nValid`, "textures/ui/online"); });
                ban.getExpiredBans().idBans.forEach((p) => { form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red"); });
                ban.getValidBans().nameBans.forEach((p) => { form6.button(`${p.playerName}\nValid`, "textures/ui/online"); });
                ban.getExpiredBans().nameBans.forEach((p) => { form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red"); });
                let banList = ban.getValidBans().idBans.concat(ban.getExpiredBans().idBans).concat(ban.getValidBans().nameBans).concat(ban.getExpiredBans().nameBans);
                form6.button("Add ID Ban");
                form6.button("Add Name Ban");
                form6.button("Back");
                forceShow(form6, sourceEntity).then(ga => {
                    let g = ga;
                    if (g.canceled) {
                        return;
                    }
                    ;
                    switch (g.selection) {
                        case banList.length:
                            let form5 = new ModalFormData;
                            form5.title(`Add ID Ban`);
                            form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
                            form5.textField("Ban Time (In Minutes)", "Decimal");
                            form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"");
                            forceShow(form5, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                ban.saveBan({ removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), playerId: String(h.formValues[0]), originalPlayerName: undefined, type: "id", bannedById: sourceEntity.id, bannedByName: sourceEntity?.name ?? sourceEntity?.nameTag, banId: "banId:" + Date.now() + ":" + String(h.formValues[0]), unbanDate: Number(h.formValues[1]) * 60000 + Date.now(), format_version: format_version, reason: String(h.formValues[2]) });
                                managePlayers(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case banList.length + 1:
                            let form6 = new ModalFormData;
                            form6.title(`Add Name Ban`);
                            form6.textField("Player Name\nThis is the name of the player. ", "String");
                            form6.textField("Ban Time (In Minutes)", "Decimal");
                            form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", "\"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}\"");
                            forceShow(form6, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                ban.saveBan({ removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), originalPlayerId: undefined, playerName: String(h.formValues[0]), type: "name", bannedById: sourceEntity.id, bannedByName: sourceEntity?.name ?? sourceEntity?.nameTag, banId: "ban:" + Date.now() + ":" + String(h.formValues[0]), unbanDate: Number(h.formValues[1]) * 60000 + Date.now(), format_version: format_version, reason: String(h.formValues[2]) });
                                managePlayers(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case banList.length + 2:
                            managePlayers(sourceEntity);
                            break; /*
                            case banList.length+3:
                            managePlayers(sourceEntity)
                            break
                            case banList.length+4:
                            managePlayers(sourceEntity)*/
                            break;
                        default:
                            let form4 = new ActionFormData;
                            form4.title(`Manage Ban`);
                            let ba = banList[g.selection];
                            let timeRemaining = ba.timeRemaining;
                            form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) < 0 ? " GMT" : " GMT+") + Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) < 0 ? " GMT" : " GMT+") + Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0)}\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${ba.type == "id" ? "originalPlayerName" : "playerName"}: §6${ba.type == "id" ? ba.originalPlayerName : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${ /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/""}`);
                            form4.button("Unban");
                            form4.button("Back");
                            forceShow(form4, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                if (h.selection == 0) {
                                    banList[g.selection].remove();
                                    managePlayers(sourceEntity);
                                }
                                ;
                                if (h.selection == 1) {
                                    managePlayers(sourceEntity);
                                }
                                ;
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                    }
                    ;
                }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                break;
            case players.length + 1:
                mainMenu(sourceEntity);
                break;
            default:
                let player = players[r.selection];
                let form2 = new ActionFormData;
                form2.title(player.name);
                form2.body(`UUID: ${player.id}\n${player.isOnline ? "Online" : "Last Online: " + new Date(Number(player.lastOnline) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString()}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player) ? "ID BANNED" : ban.testForIdBannedPlayer(player) ? "NAME BANNED" : ""}`);
                form2.button("Clear Data");
                form2.button("Show Data");
                form2.button("Check Inventory");
                form2.button("Manage Bans");
                form2.button("Back");
                forceShow(form2, sourceEntity).then(ga => {
                    let g = ga;
                    if (g.canceled) {
                        return;
                    }
                    ;
                    switch (g.selection) {
                        case 0:
                            let form3 = new MessageFormData;
                            form3.title("Confirm Player Data Clear");
                            form3.body(`Are you sure you want to clear all of ${player.name}'s saved player data?\nThis action cannot be undone.`);
                            form3.button2("Clear All Data");
                            form3.button1("Cancel");
                            forceShow(form3, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                if (h.selection == 0) {
                                    managePlayers(sourceEntity);
                                }
                                ;
                                if (h.selection == 1) {
                                    player.remove();
                                    managePlayers(sourceEntity);
                                }
                                ;
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 1:
                            let form4 = new ActionFormData;
                            form4.title(`${player.name}'s Saved Player Data`);
                            form4.body(`${ /*arrayModifier(*/JSON.stringify(player).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"") /*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`);
                            form4.button("Done");
                            forceShow(form4, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                managePlayers(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 2:
                            let slotsArray = [];
                            let text = "";
                            let items = player.items.inventory.concat(player.items.equipment);
                            items.forEach((item) => { if (item.count != 0) {
                                slotsArray = slotsArray.concat(String("slot: " + item.slot + ", item: " + item.id + "§r§f, amount: " + item.count + ", nameTag: " + item.name + "§r§f, lore: " + item.lore + "§r§f, enchantments: " + JSON.stringify(item.enchants ?? []) ?? "[]"));
                            }
                            else {
                                slotsArray = slotsArray.concat("slot: " + item.slot + ", item: minecraft:air");
                            } });
                            text = String("(format_version: " + player.format_version + ") " + player.name + (world.getAllPlayers().find((p) => (p.id == player.id)) != undefined ? " (Online)" : " (last seen: " + new Date(Number(player.lastOnline) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + ")") + " Items: \n" + slotsArray.join("§r§f\n"));
                            let form5 = new ActionFormData;
                            form5.title(`${player.name}'s Saved Inventory Data`);
                            form5.body(`${text}`);
                            form5.button("Done");
                            forceShow(form5, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                managePlayers(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 3:
                            let form6 = new ActionFormData;
                            form6.title(player.name);
                            player.idBans.valid.forEach((p) => { form6.button(`${p.playerId}\nValid`, "textures/ui/online"); });
                            player.idBans.expired.forEach((p) => { form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red"); });
                            player.nameBans.valid.forEach((p) => { form6.button(`${p.playerName}\nValid`, "textures/ui/online"); });
                            player.nameBans.expired.forEach((p) => { form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red"); });
                            let banList = player.idBans.valid.concat(player.idBans.expired).concat(player.nameBans.valid).concat(player.nameBans.expired);
                            form6.body(`UUID: ${player.id}\n${player.isOnline ? "Online" : "Last Online: " + new Date(Number(player.lastOnline) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString()}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player) ? "\n\nID BANNED" : ban.testForIdBannedPlayer(player) ? "\n\nNAME BANNED" : ""}`);
                            form6.button("Add ID Ban");
                            form6.button("Add Name Ban");
                            form6.button("Back");
                            forceShow(form6, sourceEntity).then(ga => {
                                let g = ga;
                                if (g.canceled) {
                                    return;
                                }
                                ;
                                switch (g.selection) {
                                    case banList.length:
                                        let form5 = new ModalFormData;
                                        form5.title(`Add ID Ban`);
                                        form5.textField("Ban Time (In Minutes)", "Decimal");
                                        form5.textField("Reason", "Text");
                                        forceShow(form5, sourceEntity).then(ha => {
                                            let h = ha;
                                            if (h.canceled) {
                                                return;
                                            }
                                            ;
                                            ban.saveBan({ removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), playerId: player.id, originalPlayerName: player.name, type: "id", bannedById: sourceEntity.id, bannedByName: sourceEntity?.name ?? sourceEntity?.nameTag, banId: "banId:" + Date.now() + ":" + player.id, unbanDate: Number(h.formValues[0]) * 60000 + Date.now(), format_version: format_version, reason: String(h.formValues[1]) });
                                            managePlayers(sourceEntity);
                                        }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                                        break;
                                    case banList.length + 1:
                                        let form6 = new ModalFormData;
                                        form6.title(`Add Name Ban`);
                                        form6.textField("Ban Time (In Minutes)", "Decimal");
                                        form6.textField("Reason", "Text");
                                        forceShow(form6, sourceEntity).then(ha => {
                                            let h = ha;
                                            if (h.canceled) {
                                                return;
                                            }
                                            ;
                                            ban.saveBan({ removeAfterBanExpires: false, ban_format_version: ban_format_version, banDate: Date.now(), originalPlayerId: player.id, playerName: player.name, type: "name", bannedById: sourceEntity.id, bannedByName: sourceEntity?.name ?? sourceEntity?.nameTag, banId: "ban:" + Date.now() + ":" + player.name, unbanDate: Number(h.formValues[0]) * 60000 + Date.now(), format_version: format_version, reason: String(h.formValues[1]) });
                                            managePlayers(sourceEntity);
                                        }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                                        break;
                                    case banList.length + 2:
                                        managePlayers(sourceEntity);
                                        break; /*
                                        case banList.length+3:
                                        managePlayers(sourceEntity)
                                        break
                                        case banList.length+4:
                                        managePlayers(sourceEntity)*/
                                        break;
                                    default:
                                        let form4 = new ActionFormData;
                                        form4.title(`Manage Ban`);
                                        let ba = banList[g.selection];
                                        let timeRemaining = ba.timeRemaining;
                                        form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) < 0 ? " GMT" : " GMT+") + Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate) + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) * 3600000)).toLocaleString() + (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0) < 0 ? " GMT" : " GMT+") + Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0)}\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${ba.type == "id" ? "originalPlayerName" : "playerName"}: §6${ba.type == "id" ? ba.originalPlayerName : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${ /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/""}`);
                                        form4.button("Unban");
                                        form4.button("Back");
                                        forceShow(form4, sourceEntity).then(ha => {
                                            let h = ha;
                                            if (h.canceled) {
                                                return;
                                            }
                                            ;
                                            if (h.selection == 0) {
                                                banList[g.selection].remove();
                                                managePlayers(sourceEntity);
                                            }
                                            ;
                                            if (h.selection == 1) {
                                                managePlayers(sourceEntity);
                                            }
                                            ;
                                        }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                                }
                                ;
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 4:
                            managePlayers(sourceEntity);
                            break;
                        default:
                    }
                    ;
                }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export function manageCommands(sourceEntity) {
    let form = new ActionFormData;
    form.title("Manage Commands");
    let defaultCommands = command.getDefaultCommands();
    defaultCommands.forEach((p) => { form.button(`${p.formatting_code + p.commandName}\n${p.type + ": " + (p.settings.enabled ? "enabled" : "disabled") + "; " + p.command_version}` /*, "textures/ui/online"*/); });
    let customCommands = command.getCustomCommands();
    customCommands.forEach((p) => { form.button(`${p.formatting_code + p.commandName}\n${p.type + ": " + (p.settings.enabled ? "enabled" : "disabled") + "; " + p.command_version}` /*, "textures/ui/online"*/); });
    let commandsList = defaultCommands.concat(customCommands);
    form.button("Add Custom Command");
    form.button("Back");
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        switch (r.selection) {
            case commandsList.length:
                let form5 = new ModalFormData;
                form5.title(`Add Custom Command`);
                form5.textField("Command Name§c*", "mycommand");
                form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", ["commands", "javascript"]);
                form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", "1.0.0");
                form5.textField("Formatting Code§c*", "required: string", "§r§f");
                form5.textField("Description", "string");
                form5.textField("Formats", "JSON", "[\"myCommand\", \"myCommand <string: string> [integer: int]\"]");
                form5.textField("Command Prefix (leave blank to use default)", "default");
                form5.toggle("Enable Automatic Parameter Evaluation", true);
                forceShow(form5, sourceEntity).then(ha => {
                    let h = ha;
                    if (h.canceled) {
                        return;
                    }
                    ;
                    if (!!!h.formValues[0]) {
                        let formErrora = new MessageFormData;
                        formErrora.body(`Required parameter 'Command Name' was left blank`);
                        formErrora.title("Error");
                        formErrora.button1("Back");
                        formErrora.button2("Cancel");
                        forceShow(formErrora, sourceEntity).then(() => { manageCommands(sourceEntity); return; });
                        return;
                    }
                    if (!!command.getCustomCommands().find(v => v.commandName == String(h.formValues[0]))) {
                        let formError = new MessageFormData;
                        formError.body(`There is already a custom command with the name '${String(h.formValues[0]).replaceAll("'", "\\'")}`);
                        formError.title("Error");
                        formError.button1("Done");
                        forceShow(formError, sourceEntity).then(() => { return; });
                        manageCommands(sourceEntity);
                        return;
                    }
                    ;
                    new command({ commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[2]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])], description: String(h.formValues[4]), type: "custom", formatting_code: String(h.formValues[3]), formats: JSONParse(h.formValues[5] == "" ? "undefined" : String(h.formValues[5] ?? "undefined")), customCommandPrefix: String(h.formValues[6]), customCommandParametersEnabled: Boolean(h.formValues[7]), customCommandId: "customCommand:" + String(h.formValues[0]), format_version: format_version }).save();
                    manageCommands(sourceEntity);
                }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                break;
            case commandsList.length + 1:
                mainMenu(sourceEntity);
                break;
            default:
                let commandsItem = commandsList[r.selection];
                let form2 = new ActionFormData;
                form2.title(commandsItem.commandName);
                form2.body(`Command Name: ${commandsItem.commandName}\nType: ${commandsItem.type}\nCommand Version: ${commandsItem.command_version}\nCustom Command Id: ${commandsItem.customCommandId}\nCommand Settings Id: ${commandsItem.commandSettingsId}\nDescription: ${commandsItem.description}\nFormats: ${JSONStringify(commandsItem.formats)}`);
                if (commandsItem.type == "custom") {
                    form2.button("Delete Command");
                }
                ;
                if (commandsItem.type == "custom") {
                    form2.button("Edit Command");
                }
                ;
                if (commandsItem.type == "custom") {
                    form2.button("Edit Code");
                }
                ;
                form2.button("Show Info");
                form2.button("Settings");
                form2.button("Back");
                forceShow(form2, sourceEntity).then(ga => {
                    let g = ga;
                    if (g.canceled) {
                        return;
                    }
                    ;
                    switch (g.selection + (Number(commandsItem.type != "custom") * 3)) {
                        case 0:
                            let form3 = new MessageFormData;
                            form3.title("Confirm Deletion of Command");
                            form3.body(`Are you sure you want to delete the custom ${commandsItem.commandName} command?\nThis action cannot be undone.`);
                            form3.button2("Delete Command");
                            form3.button1("Cancel");
                            forceShow(form3, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                if (h.selection == 0) {
                                    manageCommands(sourceEntity);
                                }
                                ;
                                if (h.selection == 1) {
                                    commandsItem.remove();
                                    manageCommands(sourceEntity);
                                }
                                ;
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 1:
                            let form5 = new ModalFormData;
                            form5.title(`Edit Custom Command`);
                            form5.textField("Command Name§c*", "mycommand", commandsItem.commandName);
                            form5.dropdown("Command Code Type (commands means the command just runs a list of minecraft commands, and javascript means that the command runs a list of javascript scripts/code)", ["commands", "javascript"], ["commands", "javascript"].findIndex(v => v == commandsItem.customCommandType));
                            form5.slider("Number of Code Lines", 1, 100, 1, Number(commandsItem.customCommandCodeLines ?? 1));
                            form5.textField("Command Version§c*", "SemVer String; ex. 1.7.0-beta.1.2.a.b.c.d", String(commandsItem.command_version));
                            form5.textField("Formatting Code§c*", "required: string", commandsItem.formatting_code);
                            form5.textField("Description", "string", commandsItem.description);
                            form5.textField("Formats", "JSON", JSONStringify(commandsItem.formats));
                            form5.textField("Command Prefix (leave blank to use default)", "default", commandsItem.customCommandPrefix);
                            form5.toggle("Enable Automatic Parameter Evaluation", commandsItem.customCommandParametersEnabled);
                            form5.textField("Parameters for Automatic Parameter Evaluation (requires enable automatic parameter evaluation to be enabled)\nThis is a list of strings stating the parameter types, valid values are \"presetText\", \"number\", \"boolean\", \"string\", and\"json\". \npresetText matches a string of text with no quotation marks or spaces in it\nnumber matches a number, boolean matches a boolean\nstring matches either a string of text with no quotation marks or spaces, or a string of text inside of quotation marks that may include spaces and also escape characters\njson matches a JSON array, object, or string\nthis list should always start with presetText to match the command name\nfor example: if you have the command 'say hi \"test stuff\" 9768 true 8 {\"some\": \"thing\", \"a\": [1, 2, 3, 4, 5]} [1, 2, 3, 4, \"5\"]' and you set this value to [\"presetText\", \"presetText\", \"string\", \"number\", \"boolean\", \"string\", \"json\", \"json\"] then it would return [\"say\", \"hi\", \"test stuff\", 9768, true, \"8\", {\"some\": \"thing\", \"a\": [1, 2, 3, 4, 5]}, [1, 2, 3, 4, \"5\"]]", "JSON", JSONStringify(commandsItem.customCommandParametersList ?? ["presetText"]));
                            forceShow(form5, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                if (!!!h.formValues[0]) {
                                    let formErrora = new MessageFormData;
                                    formErrora.body(`Required parameter 'Command Name' was left blank`);
                                    formErrora.title("Error");
                                    formErrora.button1("Back");
                                    forceShow(formErrora, sourceEntity).then(() => { manageCommands(sourceEntity); return; });
                                    return;
                                }
                                if ((!!command.getCustomCommands().find(v => v.commandName == String(h.formValues[0]))) && (String(h.formValues[0]) != commandsItem.commandName)) {
                                    let formError = new MessageFormData;
                                    formError.body(`There is already a custom command with the name '${String(h.formValues[0]).replaceAll("'", "\\'")}, saving this will overwrite it, are you sure you want to do this?\nThis action cannot be undone.`);
                                    formError.title("Error");
                                    formError.button2("Confirm");
                                    formError.button1("Cancel");
                                    forceShow(formError, sourceEntity).then(sa => {
                                        console.warn(sa.selection);
                                        if (sa.selection == 0) {
                                            manageCommands(sourceEntity);
                                            return;
                                        }
                                        else {
                                            if (String(h.formValues[0]) != commandsItem.commandName) {
                                                JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9]));
                                                JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined"));
                                                commandsItem.remove();
                                                commandsItem.settings.remove();
                                                new commandSettings("customCommandSettings:" + String(h.formValues[0])).save(commandsItem.settings.toJSON());
                                                commandsItem = new command({ commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])], customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:" + String(h.formValues[0]), commandSettingsId: "customCommandSettings:" + String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9])), format_version: format_version });
                                                commandsItem.save();
                                            }
                                            ;
                                        }
                                    });
                                    manageCommands(sourceEntity);
                                }
                                else {
                                    if (String(h.formValues[0]) != commandsItem.commandName) {
                                        JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9]));
                                        JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined"));
                                        commandsItem.remove();
                                        commandsItem.settings.remove();
                                        new commandSettings("customCommandSettings:" + String(h.formValues[0])).save(commandsItem.settings.toJSON());
                                        commandsItem = new command({ commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])], customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:" + String(h.formValues[0]), commandSettingsId: "customCommandSettings:" + String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9])), format_version: format_version });
                                        commandsItem.save();
                                    }
                                    else {
                                        JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9]));
                                        JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined"));
                                        new command({ commandName: String(h.formValues[0]), commands_format_version: commands_format_version, command_version: String(h.formValues[3]), customCommandType: ["commands", "javascript"][Number(h.formValues[1])], customCommandCodeLines: Number(h.formValues[2]), description: String(h.formValues[5]), type: "custom", formatting_code: String(h.formValues[4]), formats: JSONParse(h.formValues[6] == "" ? "undefined" : String(h.formValues[6] ?? "undefined")), customCommandPrefix: String(h.formValues[7]), customCommandParametersEnabled: Boolean(h.formValues[8]), customCommandId: "customCommand:" + String(h.formValues[0]), commandSettingsId: "customCommandSettings:" + String(h.formValues[0]), customCommandParametersList: JSONParse(h.formValues[9] == "" ? "[]" : String(h.formValues[9])), format_version: format_version }).save();
                                    }
                                    manageCommands(sourceEntity);
                                }
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 2:
                            let form7 = new ModalFormData;
                            form7.title(`Editing Code for ${commandsItem.commandName}`);
                            if (commandsItem.customCommandCodeLines == 1 || commandsItem.customCommandCodeLines == 0 || !!!commandsItem.customCommandCodeLines) {
                                form7.textField("Line " + 0 + "\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}.", commandsItem.customCommandType == "commands" ? "Minecraft Command" : "JavaScript Code", commandsItem.code[0]);
                            }
                            else {
                                for (let i = 0; i < commandsItem.customCommandCodeLines; i++) {
                                    form7.textField("Line " + i + (i == 0 ? "\nUse ${params[index]} to acess the value of a parameter or to access a javascript variable use ${javascript code}." : ""), commandsItem.customCommandType == "commands" ? "Minecraft Command" : "JavaScript Code", commandsItem.code[i]);
                                }
                            }
                            forceShow(form7, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                h.formValues.forEach((v, i) => { world.setDynamicProperty("customCommandCode:" + commandsItem.commandName + ":" + i, v); });
                                world.getDynamicPropertyIds().filter(v => ((v.startsWith("customCommandCode:" + commandsItem.commandName + ":")) && (Number(v.slice(("customCommandCode:" + commandsItem.commandName + ":").length)) >= commandsItem.customCommandCodeLines))).forEach(v => world.setDynamicProperty(v));
                                manageCommands(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 3:
                            let form4 = new ActionFormData;
                            form4.title(`${commandsItem.commandName} Command Info`);
                            form4.body(`§r§f${ /*arrayModifier(*/JSON.stringify(commandsItem).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"") /*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`);
                            form4.button("Done");
                            forceShow(form4, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                manageCommands(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 4:
                            let form6 = new ModalFormData;
                            form6.title(`Command Settings for ${commandsItem.type} ${commandsItem.commandName}`);
                            form6.textField("Required Tags", "JSON", JSONStringify(commandsItem.settings.requiredTags ?? ["canUseChatCommands"]));
                            form6.slider("Required Permission Level", 0, 15, 1, Number(commandsItem.settings.requiredPermissionLevel ?? 0));
                            form6.toggle("Requires OP", commandsItem.settings.requiresOp);
                            form6.toggle("Enabled", commandsItem.settings.enabled);
                            forceShow(form6, sourceEntity).then(ha => {
                                let h = ha;
                                if (h.canceled) {
                                    return;
                                }
                                ;
                                commandsItem.settings.save({ requiredTags: h.formValues[0] == "" ? [] : JSONParse(String(h.formValues[0])), requiredPermissionLevel: Number(h.formValues[1]), requiresOp: Boolean(h.formValues[2]), enabled: Boolean(h.formValues[3]), settings_version: command_settings_format_version, format_version: format_version });
                                manageCommands(sourceEntity);
                            }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
                            break;
                        case 5:
                            manageCommands(sourceEntity);
                            break;
                        default:
                    }
                    ;
                }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export async function onlinePlayerSelector(sourceEntity, backFunction = mainMenu, ...functionargs) {
    let form = new ActionFormData;
    form.title("Select Player");
    let playerslist = world.getAllPlayers();
    playerslist.forEach((p) => { form.button(`${p.name}\n${p.id}` /*, "textures/ui/online"*/); });
    form.button("Back");
    return forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        switch (r.selection) {
            case playerslist.length:
                return backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
                break;
            default:
                return playerslist[r.selection];
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export async function itemSelector(sourceEntity, targetPlayer, backFunction = mainMenu, ...functionargs) {
    let form = new ActionFormData;
    form.title("Select Item");
    let itemsList = [];
    for (let i = 0; i < targetPlayer.getComponent("inventory").inventorySize; i++) {
        itemsList.push({ slot: i, item: targetPlayer.getComponent("inventory").container.getSlot(i) });
    }
    ;
    let equipmentList = [];
    for (let i = 0; i < 6; i++) {
        equipmentList.push({ slot: [EquipmentSlot.Mainhand, EquipmentSlot.Offhand, EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet][i], item: targetPlayer.getComponent("equippable").getEquipmentSlot([EquipmentSlot.Mainhand, EquipmentSlot.Offhand, EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet][i]) });
    }
    ;
    let slotsList = equipmentList.concat(itemsList);
    slotsList.forEach((p) => { if (p.item.hasItem()) {
        form.button(`${p?.slot}: ${p?.item?.typeId}\n${p?.item?.amount}; ${p?.item?.nameTag}` /*, "textures/ui/online"*/);
    }
    else {
        form.button(`${p?.slot}: empty\n0; ` /*, "textures/ui/online"*/);
    } });
    form.button("Back");
    return forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        switch (r.selection) {
            case slotsList.length:
                return backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
                break;
            default:
                return slotsList[r.selection];
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export async function itemEditorTypeSelection(sourceEntity, targetPlayer, item, selectionItems, backFunction = mainMenu, ...functionargs) {
    let form = new ActionFormData;
    form.title("§eItem Editor §f[§cAlpha§f]");
    form.button((!item.item.hasItem() ? "§c" : "") + "Edit Item" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() ? "§c" : "") + "Edit Code" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() || !item.item?.isStackable ? "§c" : "") + "§eEdit Dynamic Properties" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() ? "§c" : "") + "§cEdit Enchantments" /*, "textures/ui/online"*/);
    form.button("New Item" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() ? "§c" : "") + "§cTransfer Item" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() ? "§c" : "") + "§cClone Item" /*, "textures/ui/online"*/);
    form.button((!item.item.hasItem() ? "§c" : "") + "§cDelete Item" /*, "textures/ui/online"*/);
    //    form.button("Ban Item"/*, "textures/ui/online"*/); 
    form.button("Back");
    let result;
    result = undefined;
    return forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        switch (r.selection) {
            case 0:
                if (item.item?.hasItem()) {
                    result = !!selectionItems?.edit?.f ? selectionItems?.edit?.f(...selectionItems?.edit?.a ?? [sourceEntity, sourceEntity]) : itemEditor(sourceEntity, targetPlayer, item.item);
                }
                else {
                    backFunction(...functionargs ?? sourceEntity);
                }
                break;
            case 1:
                if (item.item?.hasItem() && item.item?.isStackable) {
                    result = !!selectionItems?.editCode?.f ? selectionItems?.editCode?.f(...selectionItems?.editCode?.a ?? [sourceEntity, sourceEntity]) : itemCodePropertyEditor(sourceEntity, item.item);
                }
                else {
                    backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
                }
                break;
            case 2:
                if (item.item?.hasItem() && item.item?.isStackable) {
                    result = !!selectionItems?.editDynamicProperties?.f ? selectionItems?.editDynamicProperties?.f(...selectionItems?.editDynamicProperties?.a ?? [sourceEntity, sourceEntity]) : itemDynamicPropertyEditor(sourceEntity, item.item);
                }
                else {
                    backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
                }
                break;
            case 4:
                result = !!selectionItems?.editCode?.f ? selectionItems?.editCode?.f(...selectionItems?.editCode?.a ?? [sourceEntity, sourceEntity]) : newItemInSlot(sourceEntity, item.item);
                break;
            case 5:
                result = backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
                break;
            default:
                result = backFunction(...(functionargs.length == 0 ? [sourceEntity] : (functionargs ?? [sourceEntity])));
        }
        return result;
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export async function itemEditor(sourceEntity, targetPlayer, item) {
    let form = new ModalFormData;
    form.title("Edit Item");
    form.textField("Item Name (escape characters such as \\n are allowed)", "string", !!!item.nameTag ? undefined : item.nameTag);
    form.textField("Item Lore (escape characters such as \\n are allowed)(set to [] to clear)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getLore()));
    form.slider("Amount", 0, 127, 1, item.amount);
    form.textField("Can Destroy (escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getCanDestroy()));
    form.textField("Can Place On (escape characters such as \\n are allowed)", "[\"Line 1\", \"Line 2\"...]", JSONStringify(item.getCanPlaceOn()));
    form.dropdown("Item Lock Mode", [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory], [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][item.lockMode]);
    form.toggle("Keep On Death", item.keepOnDeath);
    form.textField((!!!item.getItem().getComponent("cooldown") ? "§c(UNAVAILABLE)§f " : "") + "Set Cooldown (In Ticks)", "ticks");
    form.textField((!!!item.getItem().getComponent("durability") ? "§c(UNAVAILABLE)§f " : "") + "Set Damage", "int", String(item.getItem().getComponent("durability")?.damage));
    let result;
    result = undefined;
    return forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        let [name, lore, count, canDestroy, canPlaceOn, lockMode, keepOnDeath, cooldown, durability] = r.formValues;
        try {
            if (String(name) != item.nameTag) {
                item.nameTag = String(name);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse((String(lore) == "" ? "[]" : String(lore))) != item.getLore()) {
                item.setLore(JSONParse(String(lore)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (Number(count) != item.amount) {
                item.amount = Number(count);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse((String(canDestroy) == "" ? "[]" : String(canDestroy))) != item.getCanDestroy()) {
                item.setCanDestroy(JSONParse(String(canDestroy)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (JSONParse((String(canPlaceOn) == "" ? "[]" : String(canPlaceOn))) != item.getCanPlaceOn()) {
                item.setCanPlaceOn(JSONParse(String(canPlaceOn)));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if ([ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)] != item.lockMode) {
                item.lockMode = [ItemLockMode.none, ItemLockMode.slot, ItemLockMode.inventory][Number(lockMode)];
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (Boolean(keepOnDeath) != item.keepOnDeath) {
                item.keepOnDeath = Boolean(keepOnDeath);
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (!!item.getItem().getComponent("cooldown")) {
            try {
                if (String(cooldown) != "") {
                    targetPlayer.startItemCooldown(item.getItem().getComponent("cooldown").cooldownCategory, Number(cooldown));
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (!!item.getItem().getComponent("durability")) {
            try {
                if (Number(durability) != item.getItem().getComponent("durability").damage) {
                    const a = item.getItem();
                    a.getComponent("durability").damage = Number(durability);
                    item.setItem(a);
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        return result;
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export function itemDynamicPropertyEditor(sourceEntity, item) {
    let formb = new ActionFormData;
    formb.title("Item Dynamic Property Editor");
    formb.button("Add Property");
    formb.button("Edit Property");
    formb.button("Remove Property");
    formb.button("Back");
    forceShow(formb, sourceEntity).then(ba => {
        let b = ba;
        if (b.canceled) {
            return;
        }
        ;
        let form = new ModalFormData;
        form.title("Item Dynamic Property Editor");
        let properties = item.getDynamicPropertyIds();
        switch (b.selection) {
            case 0:
                form.textField("Property Name", "string");
                form.textField("Property Value", "string|number|boolean|vector3json");
                form.dropdown("Property Type", ["String", "Number", "Boolean", "Vector3"]);
                forceShow(form, sourceEntity).then(ra => {
                    let r = ra;
                    if (r.canceled) {
                        return;
                    }
                    ;
                    let [name, value, type] = r.formValues;
                    try {
                        item.setDynamicProperty(String(name), Number(type) == 0 ? String(value) : Number(type) == 1 ? Number(value) : Number(type) == 2 ? Boolean(value) : JSONParse(String(value)));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export function itemCodePropertyEditor(sourceEntity, item) {
    let form = new ModalFormData;
    form.title("Code Editor");
    form.textField("Item Use Code", "JavaScript", String(item.getDynamicProperty("code")));
    form.textField("Item Use On Code", "JavaScript", String(item.getDynamicProperty("itemUseOnCode")));
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        let [code, itemUseOnCode] = r.formValues;
        try {
            if (String(code) != String(item.getDynamicProperty("code"))) {
                item.setDynamicProperty("code", String(code));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
        try {
            if (String(itemUseOnCode) != String(item.getDynamicProperty("itemUseOnCode"))) {
                item.setDynamicProperty("itemUseOnCode", String(itemUseOnCode));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export function newItemInSlot(sourceEntity, item) {
    let form = new ModalFormData;
    form.title("New Item");
    form.textField("Item Type", "Item Id", "minecraft:grass_block");
    form.textField("Count", "int", "1");
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        let [type, count] = r.formValues;
        try {
            item.setItem(new ItemStack(String(type), Number(count)));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
export function createExplosion(sourceEntity, parameterDefaults) {
    let form = new ModalFormData;
    form.title("New Item");
    form.textField("x", "number", String(parameterDefaults?.x ?? sourceEntity.location.x));
    form.textField("y", "number", String(parameterDefaults?.y ?? sourceEntity.location.y));
    form.textField("z", "number", String(parameterDefaults?.z ?? sourceEntity.location.z));
    form.textField("dimension", "dimensionId", String(parameterDefaults?.dimension?.id ?? sourceEntity.dimension.id));
    form.textField("radius", "number", String(parameterDefaults?.radius ?? 1));
    form.textField("source", "targetSelector");
    form.toggle("allowUnderwater", parameterDefaults?.explosionOptions?.allowUnderwater ?? false);
    form.toggle("breaksBlocks", parameterDefaults?.explosionOptions?.breaksBlocks ?? true);
    form.toggle("causesFire", parameterDefaults?.explosionOptions?.causesFire ?? false);
    forceShow(form, sourceEntity).then(ra => {
        let r = ra;
        if (r.canceled) {
            return;
        }
        ;
        let [x, y, z, dimension, radius, source, allowUnderwater, breaksBlocks, causesFire] = r.formValues;
        try {
            world.getDimension(String(dimension)).createExplosion({ x: Number(x), y: Number(y), z: Number(z) }, Number(radius), { allowUnderwater: Boolean(allowUnderwater), breaksBlocks: Boolean(breaksBlocks), causesFire: Boolean(causesFire), source: targetSelectorAllListC(String(source), "", `${sourceEntity.location.x} ${sourceEntity.location.y} ${sourceEntity.location.z}`, sourceEntity)[0] });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }).catch((e) => { let formError = new MessageFormData; formError.body(e + e.stack); formError.title("Error"); formError.button1("Done"); forceShow(formError, sourceEntity).then(() => { return e; }); });
}
