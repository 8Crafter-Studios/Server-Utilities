import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { spawnProtectionTypeList } from "./spawnProtectionTypeList";
import { editAreas } from "./editAreas";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";
import { editCustomAreas } from "./editCustomAreas";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
export async function editAreasMainMenu(sourceEntitya) {
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
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Protected Areas");
    form.body("Choose area category to manage areas for.");
    spawnProtectionTypeList.forEach((s) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + s, "textures/ui/xyz_axis");
    });
    form.button(customFormUICodes.action.buttons.positions.main_only + "Custom", "textures/ui/permissions_custom_dots");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh All Categories And Areas", "textures/ui/refresh");
    return await forceShow(form, sourceEntity).then(async (l) => {
        if (l.selection === spawnProtectionTypeList.length) {
            if ((await editCustomAreas(sourceEntity)) === 1) {
                return await editAreasMainMenu(sourceEntity);
            }
            else {
                return 0;
            }
        }
        ;
        if (l.canceled || l.selection === spawnProtectionTypeList.length + 1)
            return 1;
        if (l.selection === spawnProtectionTypeList.length + 2)
            return 0;
        if (l.selection === spawnProtectionTypeList.length + 3) {
            ProtectedAreas.load();
            return await editAreasMainMenu(sourceEntity);
        }
        ;
        try {
            if ((await editAreas(sourceEntity, spawnProtectionTypeList[l.selection].slice(0, -1))) === 1) {
                return await editAreasMainMenu(sourceEntity);
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
//# sourceMappingURL=editAreasMainMenu.js.map