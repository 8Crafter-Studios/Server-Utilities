import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";
import { editAreasForCustomCategory } from "./editAreasForCustomCategory";
import { manageCustomAreaCategories } from "./manageCustomAreaCategories";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
/**
 *
 * @todo Make this menu have pages.
 * @param sourceEntitya
 * @returns
 */
export async function editCustomAreas(sourceEntitya) {
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
    form.title(customFormUICodes.action.titles.formStyles.medium + "Custom Areas");
    form.body("Choose custom area category to manage areas for.");
    customAreaCategories.forEach((c) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + c.id, c.icon_path ?? "textures/ui/xyz_axis");
    });
    form.button(customFormUICodes.action.buttons.positions.left_side_only + "Manage Custom Area Categories", "textures/ui/pencil_edit_icon");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh All Categories And Areas", "textures/ui/refresh");
    return await forceShow(form, sourceEntity).then(async (l) => {
        if (l.selection === customAreaCategories.length) {
            if ((await manageCustomAreaCategories(sourceEntity)) === 1) {
                return await editCustomAreas(sourceEntity);
            }
            else {
                return 0;
            }
            ;
        }
        ;
        if (l.canceled || l.selection === customAreaCategories.length + 1)
            return 1;
        if (l.selection === customAreaCategories.length + 2)
            return 0;
        if (l.selection === customAreaCategories.length + 3) {
            ProtectedAreas.load();
            return await editCustomAreas(sourceEntity);
        }
        ;
        try {
            if ((await editAreasForCustomCategory(sourceEntity, customAreaCategories[l.selection].id)) === 1) {
                return await editCustomAreas(sourceEntity);
            }
            else {
                return 0;
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
}
//# sourceMappingURL=editCustomAreas.js.map