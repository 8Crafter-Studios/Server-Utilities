import { Player, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { protectedAreaCategories, ProtectedAreas } from "init/variables/protectedAreaVariables";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 *
 * @todo Make this menu have pages.
 * @param player
 * @param prefix
 * @returns
 */
export async function editAreas(player, prefix) {
    if (arguments.length !== 1) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
    }
    if (!(player instanceof Player)) {
        throw new TypeError("Invalid Player. Function argument [0] (player) expected an instance of the Player class, but instead got " +
            getDetailedType(player) +
            ".");
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(player, "andexdb.manageProtectedAreas") == false) {
            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.manageProtectedAreas", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const areas = [...ProtectedAreas.areas[prefix].overworld, ...ProtectedAreas.areas[prefix].nether, ...ProtectedAreas.areas[prefix].the_end];
    // let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    // let b = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    areas.forEach((a, i) => {
        /*console.warn(aelement.slice(22)); */ form1234.button(customFormUICodes.action.buttons.positions.main_only + a.id, a.icon_path ?? "textures/ui/area_xyz");
        // b[i] = String(world.getDynamicProperty("v2:" + prefix + ":" + a.id));
    });
    if (areas.length === 0) {
        form1234.body("No areas in this built-in category were found.");
    }
    form1234.button(customFormUICodes.action.buttons.positions.main_only + "Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh All Categories And Areas", "textures/ui/refresh");
    form1234.title(customFormUICodes.action.titles.formStyles.medium + prefix);
    return await forceShow(form1234, player).then(async (t) => {
        if (t.canceled)
            return 1;
        switch ((!!areas[t.selection] ? "area" : undefined) ??
            ["new", "back", "close", "refresh"][t.selection - areas.length]) {
            case "new":
                form12345.title("New Protected Area");
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("From", "x1, y1, z1");
                form12345.textField("To", "x2, y2, z2");
                form12345.dropdown("Dimension", ["Overworld", "Nether", "The End"], dimensions.indexOf(player.dimension));
                form12345.dropdown("Mode", ["Protection", "Anti-Protection"]);
                form12345.textField("Icon Path (Optional)", "text");
                form12345.submitButton("Add");
                return await forceShow(form12345, player).then(async (q) => {
                    if (q.canceled)
                        return await editAreas(player, prefix);
                    const [id, from, to, dimension, mode, icon_path] = q.formValues;
                    const newValue = {
                        from: {
                            x: Number(String(from).split(",")[0]),
                            y: Number(String(from).split(",")[1]),
                            z: Number(String(from).split(",")[2]),
                        },
                        to: {
                            x: Number(String(to).split(",")[0]),
                            y: Number(String(to).split(",")[1]),
                            z: Number(String(to).split(",")[2]),
                        },
                        dimension: dimension,
                        mode: mode,
                        icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                    };
                    world.setDynamicProperty("v2:" + prefix + id, JSON.stringify(newValue));
                    ProtectedAreas.areas[prefix][dimensionse[dimension]].push({ id, ...newValue });
                    return await editAreas(player, prefix);
                });
            case "back": /*
    editPistonExtensionAreas(player)*/ /*
                    screenForm123(); */
                return 1;
            case "close":
                return 0;
            case "refresh":
                ProtectedAreas.load();
                return await editAreas(player, prefix);
            case "area":
                const currentArea = areas[t.selection];
                form1234567.title(customFormUICodes.action.titles.formStyles.medium + currentArea.id);
                form1234567.body(currentArea.id);
                form1234567.button(customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/book_edit_default");
                form1234567.button(customFormUICodes.action.buttons.positions.main_only + "Delete", /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
                form1234567.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", 
                /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left");
                form1234567.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                return await forceShow(form1234567, player).then(async (w) => {
                    if (w.canceled) {
                        return await editAreas(player, prefix);
                    }
                    switch (w.selection) {
                        case 0: {
                            const defaults = areas[Number(t.selection)];
                            form12345.title("Edit Protected Area");
                            form123456.textField("From", "x1, y1, z1", `${defaults.from.x}, ${defaults.from.y}, ${defaults.from.z}`);
                            form123456.textField("To", "x2, y2, z2", `${defaults.to.x}, ${defaults.to.y}, ${defaults.to.z}`);
                            form123456.dropdown("Dimension", ["Overworld", "Nether", "The End"], defaults.dimension);
                            form123456.dropdown("Mode", ["Protection", "Anti-Protection"], defaults.mode);
                            form123456.textField("Icon Path (Optional)", "text", defaults.icon_path ?? "");
                            form123456.submitButton("Save");
                            return await forceShow(form123456, player).then(async (q) => {
                                if (q.canceled)
                                    return await editAreas(player, prefix);
                                const [from, to, dimension, mode, icon_path] = q.formValues;
                                const newValue = {
                                    from: {
                                        x: Number(String(from).split(",")[0]),
                                        y: Number(String(from).split(",")[1]),
                                        z: Number(String(from).split(",")[2]),
                                    },
                                    to: {
                                        x: Number(String(to).split(",")[0]),
                                        y: Number(String(to).split(",")[1]),
                                        z: Number(String(to).split(",")[2]),
                                    },
                                    dimension: dimension,
                                    mode: mode,
                                    icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                                };
                                if (defaults.dimension === dimension) {
                                    ProtectedAreas.areas[prefix][dimensionse[dimension]].splice(ProtectedAreas.areas[prefix][dimensionse[dimension]].findIndex(a => a.id === defaults.id), 1, {
                                        id: defaults.id,
                                        ...newValue,
                                    });
                                }
                                else {
                                    ProtectedAreas.areas[prefix][dimensionse[defaults.dimension]].splice(ProtectedAreas.areas[prefix][dimensionse[defaults.dimension]].findIndex(a => a.id === defaults.id), 1);
                                    ProtectedAreas.areas[prefix][dimensionse[dimension]].push({
                                        id: defaults.id,
                                        ...newValue,
                                    });
                                }
                                world.setDynamicProperty("v2:" + prefix + ":" + defaults.id, JSON.stringify(newValue));
                                return await editAreas(player, prefix);
                            });
                        }
                        case 1:
                            world.setDynamicProperty(areas[t.selection].id, undefined);
                            ProtectedAreas.areas[prefix][dimensionse[areas[t.selection].dimension]].splice(ProtectedAreas.areas[prefix][dimensionse[areas[t.selection].dimension]].findIndex(a => a.id === areas[t.selection].id), 1);
                            return await editAreas(player, prefix);
                        case 2:
                            return await editAreas(player, prefix);
                        case 3:
                            return 0;
                    }
                });
            default:
                return 1;
        }
    });
}
//# sourceMappingURL=editAreas.js.map