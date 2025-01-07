import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { addonDebugUI } from "./addonDebugUI";
export async function advancedSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    form.title("Advanced Settings");
    form.button("Debug", "textures/ui/icon_setting");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await addonDebugUI(sourceEntity)) == 1) {
                    return await advancedSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1:
                return 1;
            case 2:
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
//# sourceMappingURL=advancedSettings.js.map