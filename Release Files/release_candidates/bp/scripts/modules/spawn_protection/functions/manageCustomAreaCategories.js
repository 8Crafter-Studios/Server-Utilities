import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";
import { editCustomAreaCategory } from "./editCustomAreaCategory";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { newCustomAreaCategory } from "./newCustomAreaCategory";
/**
 *
 * @todo Make this menu have pages.
 * @param sourceEntitya
 * @returns
 */
export async function manageCustomAreaCategories(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (arguments.length !== 1) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Function argument [0] (sourceEntitya) expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            getDetailedType(sourceEntity) +
            ".");
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.manageProtectedAreas") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.manageProtectedAreas", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const customAreaCategories = ProtectedAreas.areas.advancedAreaCategories;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Custom Area Categories");
    form.body("Choose custom area category to edit.");
    customAreaCategories.forEach((c) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + c.id, c.icon_path ?? "textures/ui/xyz_axis");
    });
    form.button(customFormUICodes.action.buttons.positions.main_only + "New Category", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh All Categories And Areas", "textures/ui/refresh");
    const r = await forceShow(form, sourceEntity);
    if (r.canceled)
        return 1;
    switch ((customAreaCategories[r.selection] !== undefined ? "edit" : undefined) ??
        [
            "new",
            "back",
            "close",
            "refresh",
        ][r.selection - customAreaCategories.length]) {
        case "edit":
            if ((await editCustomAreaCategory(sourceEntity, customAreaCategories[r.selection].id)) === 1) {
                return await manageCustomAreaCategories(sourceEntity);
            }
            else {
                return 0;
            }
        case "new":
            if ((await newCustomAreaCategory(sourceEntity)) === 1) {
                return await manageCustomAreaCategories(sourceEntity);
            }
            else {
                return 0;
            }
        case "back":
            return 1;
        case "close":
            return 0;
        case "refresh":
            ProtectedAreas.load();
            return await manageCustomAreaCategories(sourceEntity);
        default:
            throw new Error("Invalid selection: " + r.selection);
    }
}
//# sourceMappingURL=manageCustomAreaCategories.js.map