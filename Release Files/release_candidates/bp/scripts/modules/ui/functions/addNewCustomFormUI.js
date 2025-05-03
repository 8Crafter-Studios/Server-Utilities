import { Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormListSelectionMenu } from "./customFormListSelectionMenu";
export function addNewCustomFormUI(player, goBackToMenu = false) {
    let form12345 = new ModalFormData();
    form12345.textField("Name", "myForm");
    form12345.submitButton("Create Form");
    forceShow(form12345, player).then((t) => {
        if (t.canceled)
            return;
        let ta = t;
        try {
            world.setDynamicProperty(`customUI:${String(ta.formValues[0]).replaceAll("|", "\\vls")}`, '0|"My Form"');
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (goBackToMenu == true) {
            customFormListSelectionMenu(player);
        }
    });
}
//# sourceMappingURL=addNewCustomFormUI.js.map