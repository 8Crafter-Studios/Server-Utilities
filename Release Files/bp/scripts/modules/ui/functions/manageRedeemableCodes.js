import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { RedeemableCode } from "modules/main/classes/RedeemableCode";
import { itemSelector } from "./itemSelector";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function manageRedeemableCodes(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManageRedeemableCodesUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessmanageRedeemableCodesUI", "Okay", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    else if (!sourceEntity.hasTag("admin")) {
        const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following tag to access this menu: admin", "Okay", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Redeemable Codes");
    const codes = RedeemableCode.getAll();
    codes.forEach((c) => form.button(customFormUICodes.action.buttons.positions.main_only + c.code));
    form.button(customFormUICodes.action.buttons.positions.main_only + "Add Redeemable Codes", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch ((!!codes[r.selection] ? "code" : undefined) ?? ["newCode", "back", "close"][r.selection - codes.length]) {
            case "code":
                const code = codes[r.selection];
                const codesb = codes.filter((c) => c !== code);
                const item = code.getItem(sourceEntity.dimensionLocation);
                switch (["loadItem", "delete", "back", "close"][(await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.medium + "Redeemable Code Details", `${code.code}\nItem Type: ${item.typeId}`, [customFormUICodes.action.buttons.positions.main_only + "Load Item", "textures/ui/structure_block_load"], [customFormUICodes.action.buttons.positions.main_only + "Delete", "textures/ui/trash_default"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"])).selection ?? 2]) {
                    case "loadItem": {
                        sourceEntity.inventory.container.addItem(item);
                        return await manageRedeemableCodes(sourceEntity);
                    }
                    case "delete": {
                        if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to delete this code!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                            code.remove();
                        }
                        return await manageRedeemableCodes(sourceEntity);
                    }
                    case "back":
                        return await manageRedeemableCodes(sourceEntity);
                    case "close":
                        return 0;
                    default:
                        throw new Error("Invalid selection: " + r.selection);
                }
            case "newCode": {
                if (!sourceEntity.hasTag("admin")) {
                    if ((await showMessage(sourceEntity, "Error", `§cSorry but you do not have permission to create a new code.`, "Back", "Close"))
                        .selection === 0) {
                        return await manageRedeemableCodes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                const item = await itemSelector(sourceEntity, sourceEntity, () => undefined);
                if (item === undefined) {
                    return await manageRedeemableCodes(sourceEntity);
                }
                const r = await new ModalFormData()
                    .title(customFormUICodes.modal.titles.formStyles.medium + "New Code")
                    .textField(`§l§fPlease enter the code below.`, "Code")
                    .submitButton("Create Code")
                    .forceShow(sourceEntity);
                if (r.canceled) {
                    return await manageRedeemableCodes(sourceEntity);
                }
                if (r.formValues?.[0] === "") {
                    if ((await showMessage(sourceEntity, "Error", `§cPlease specify a code.`, "Back", "Close")).selection === 0) {
                        return await manageRedeemableCodes(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                RedeemableCode.addCode(r.formValues?.[0], item.item.getItem(), sourceEntity.dimensionLocation);
                return await manageRedeemableCodes(sourceEntity);
            }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=manageRedeemableCodes.js.map