import { Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, FormCancelationReason, MessageFormData, MessageFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { mainMenu } from "./mainMenu";
import { showCustomFormUI } from "./showCustomFormUI";
import { customFormUIEditor } from "./customFormUIEditor";
import { customFormUIEditorCode } from "./customFormUIEditorCode";
import { addNewCustomFormUI } from "./addNewCustomFormUI";
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
        form1234.button(aelement.slice(9), String(world.getDynamicProperty(`customUIIcon:${aelement.slice(9)}`) ??
            "textures/ui/book_edit_default"));
    });
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
        if (ta.canceled &&
            ta.cancelationReason == FormCancelationReason.UserClosed) {
            return;
        }
        switch (true) {
            case ta.selection == a.length:
                addNewCustomFormUI(player, true);
                showCustomFormUI(a[ta.selection].slice(9), player);
                break;
            case ta.selection == a.length + 1:
                mainMenu(player);
                break;
            default:
                forceShow(form123456, player).then((v) => {
                    let va = v;
                    if (va.canceled &&
                        va.cancelationReason == FormCancelationReason.UserClosed) {
                        return;
                    }
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
                                if (ua.canceled &&
                                    ua.cancelationReason ==
                                        FormCancelationReason.UserClosed) {
                                    return;
                                }
                                switch (ua.selection) {
                                    case 0:
                                        customFormListSelectionMenu(player);
                                        break;
                                    case 1:
                                        world.setDynamicProperty(a[ta.selection]);
                                        world
                                            .getDynamicPropertyIds()
                                            .filter((dpi) => dpi.startsWith("customUIElement:" +
                                            a[ta.selection].slice(9) +
                                            "|"))
                                            .forEach((k) => {
                                            world.setDynamicProperty(k);
                                        });
                                        world
                                            .getDynamicPropertyIds()
                                            .filter((dpi) => dpi.startsWith("customUICode:" +
                                            a[ta.selection].slice(9) +
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