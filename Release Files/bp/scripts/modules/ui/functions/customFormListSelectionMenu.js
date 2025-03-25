import { Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, FormCancelationReason, MessageFormData, MessageFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { mainMenu } from "./mainMenu";
import { showCustomFormUI } from "./showCustomFormUI";
import { customFormUIEditor } from "./customFormUIEditor";
import { customFormUIEditorCode } from "./customFormUIEditorCode";
import { addNewCustomFormUI } from "./addNewCustomFormUI";
import { customFormUICodes } from "../constants/customFormUICodes";
//salo
export function customFormListSelectionMenu(player) {
    let a = world
        .getDynamicPropertyIds()
        .filter((dpi) => dpi.startsWith("customUI:"));
    let b;
    b = [];
    let form1234 = new ActionFormData();
    a.forEach((aelement, i) => {
        b[i] = String(world.getDynamicProperty(aelement));
        form1234.button(customFormUICodes.action.buttons.positions.main_only + aelement.slice(9), String(world.getDynamicProperty(`customUIIcon:${aelement.slice(9)}`) ??
            "textures/ui/book_edit_default"));
    });
    form1234.title(customFormUICodes.action.titles.formStyles.medium + "Custom Form UI Editor");
    form1234.button(customFormUICodes.action.buttons.positions.main_only + "Add New", "textures/ui/color_plus");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    let form123456 = new ActionFormData();
    form123456.title(customFormUICodes.action.titles.formStyles.gridMenu + "Edit Custom Form UI");
    form123456.button(customFormUICodes.action.buttons.positions.main_only + "Edit Elements", "textures/ui/color_plus");
    form123456.button(customFormUICodes.action.buttons.positions.main_only + "Edit Code", "textures/ui/color_plus");
    form123456.button(customFormUICodes.action.buttons.positions.main_only + "View", "textures/ui/color_plus");
    form123456.button(customFormUICodes.action.buttons.positions.main_only + "Delete", "textures/ui/icon_trash");
    form123456.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    forceShow(form1234, player).then((t) => {
        if (t.canceled &&
            t.cancelationReason == FormCancelationReason.UserClosed) {
            return;
        }
        switch (true) {
            case t.selection == a.length:
                addNewCustomFormUI(player, true);
                showCustomFormUI(a[t.selection].slice(9), player);
                break;
            case t.selection == a.length + 1:
                mainMenu(player);
                break;
            default:
                forceShow(form123456, player).then((v) => {
                    if (v.canceled &&
                        v.cancelationReason == FormCancelationReason.UserClosed) {
                        return;
                    }
                    switch (v.selection) {
                        case 0:
                            customFormUIEditor(a[t.selection], player, true);
                            break;
                        case 1:
                            customFormUIEditorCode(a[t.selection], player, true);
                            break;
                        case 2:
                            showCustomFormUI(a[t.selection].slice(9), player);
                            break;
                        case 3:
                            let form12345678 = new MessageFormData();
                            form12345678.title("Confirm Custom UI Deletion");
                            form12345678.body(`Are you sure you want to delete the custom UI ${a[t.selection]}`);
                            form12345678.button1("Cancel");
                            form12345678.button2("Confirm");
                            forceShow(form12345678, player).then((u) => {
                                if (u.canceled &&
                                    u.cancelationReason ==
                                        FormCancelationReason.UserClosed) {
                                    return;
                                }
                                switch (u.selection) {
                                    case 0:
                                        customFormListSelectionMenu(player);
                                        break;
                                    case 1:
                                        world.setDynamicProperty(a[t.selection]);
                                        world
                                            .getDynamicPropertyIds()
                                            .filter((dpi) => dpi.startsWith("customUIElement:" +
                                            a[t.selection].slice(9) +
                                            "|"))
                                            .forEach((k) => {
                                            world.setDynamicProperty(k);
                                        });
                                        world
                                            .getDynamicPropertyIds()
                                            .filter((dpi) => dpi.startsWith("customUICode:" +
                                            a[t.selection].slice(9) +
                                            "|"))
                                            .forEach((k) => {
                                            world.setDynamicProperty(k);
                                        });
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
//# sourceMappingURL=customFormListSelectionMenu.js.map